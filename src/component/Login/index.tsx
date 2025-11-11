import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/ModalCenter';
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { useForm } from 'react-hook-form';
import OtpInput from 'react18-input-otp';
import { GetAuth, SaveAuth, SaveContact } from '../../utils/store/store';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from 'joi';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

const customStyles = {
    control: (styles: any, { isDisabled }: any) => ({
        ...styles,
        backgroundColor: isDisabled ? 'rgb(232, 240, 254)' : '#f5f5f5',
        height: '48px', border: 0
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        zIndex: 999
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '300px',
        zIndex: 9999
    }),
    menuPortal: (base: any) => ({
        ...base, zIndex: 9999
    })
};

const LoginModal = ({ show, handleClose, selectedItinerary }: any) => {
    const currentUrl = window.location.href;
    const TIMER_DURATION = 30
    const END_TIMER = 0

    const [country, setCountry] = useState('+91');
    const [timer, setTimer] = useState<number>(30);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
    const [otpReqId, setOtpReqId] = useState<any>();

    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const Auth = GetAuth();

    useEffect(() => {
        if (show) {
            setTimer(TIMER_DURATION);
        }
    }, [show])

    useEffect(() => {
        if (show && showOTP) {
            if (timer && timer !== END_TIMER) {
                var tempTimer = setInterval(
                    () => setTimer(timer - 1),
                    1000
                );
                return function cleanup() {
                    clearInterval(tempTimer);
                };
            }
        }
    }, [show, timer, showOTP]);

    const handleEditPhone = () => {
        setShowOTP(false)
        setOtp("")
    }

    const schema = Joi.object({
        phone_number: Joi.string().required().length(10).messages({
            'string.base': 'Mobile number must be a string',
            'string.empty': 'Mobile number is required',
            'string.length': 'Mobile number must be exactly 10 digits',
            'any.required': 'Mobile number is required'
        }),
        otp: Joi.number().optional().min(4).messages({
            'number.base': 'Limit per user must be a number',
            'number.empty': `Limit per user is required`,
            'any.required': `Limit per user is required`
        }),
    });

    const {
        setError,
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        resolver: joiResolver(schema),
    });

    const [numRecord, setNumRecord] = useState({
        phone_number: ""
    })
    const phoneNum = watch('phone_number');

    const onSubmitOTP = (data: any, event: React.FormEvent) => {
        event.preventDefault();
        const cleanedUrl = getCurrentUrlWithCampaign();
        data.phone_number = phoneNum;
        setLoadingOtp(true);
        setPhoneNumber(data.phone_number);
        const _payload = {
            phoneNumber: data.phone_number,
            countryCode: country,
            website: cleanedUrl,
            itineraryId: selectedItinerary
        };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setOtpReqId(response?.result?.requestId)
                setShowOTP(true)
                setTimer(TIMER_DURATION)
            })
            .catch((response) => {
                console.log('roh response', response);
                setError('phone_number', { type: 'custom', message: response?.message || 'Failed to send OTP' });
            })
            .finally(() => setLoadingOtp(false));
    }

    const onVerifyOTP = () => {
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()
        setLoadingVerifyOtp(true);
        const _payload = {
            otp: otp,
            website: cleanedUrl,
            itineraryId: selectedItinerary,
            requestId: otpReqId,
            sessionTime: sessionTime
        };
        verifyOtp(_payload)
            .unwrap()
            .then((response) => {
                sessionStorage.removeItem("_st");
                if (!Auth?.token) {
                    const resData = {
                        exp: response?.result?.exp,
                        is_profile_completed: response?.result?.isProfileCompleted,
                        lead_id: response?.result?.leadId,
                        token: response?.result?.token,
                        refreshToken: response?.result?.refreshToken
                    }
                    SaveAuth(resData)
                    SaveContact({ data: phoneNumber })
                    window.dispatchEvent(new Event("authChanged"));
                }
                handleClose(false)
            })
            .catch((response) => {
                setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
            .finally(() => setLoadingVerifyOtp(false));
    }
    const handleSubmitClick = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form behavior that causes refresh
        if (phoneNum.length >= 6 && country !== "+91") {
            onSubmitOTP(numRecord, e);
        } else {
            handleSubmit(onSubmitOTP)(e);
        }
    }

    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    }

    return (
        <div>
            <Modal show={show} align={'center'} className=" w-full lg:w-[40%] center overflow-hidden no-scrollbar left-0 right-0 m-auto top-0 bottom-0 h-full max-h-[450px] lg:max-h-[520px] relative" onClose={() => {
                handleClose(false)
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => { handleClose(false) }}>X</p>
                </div>
                <div className='overflow-scroll no-scrollbar h-auto px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded pt-10'>
                    <div className='py-4 px-2 lg:px-6'>
                        <div>
                            <form>
                                <p className='text-xl font-bold'>Please verify mobile number to see your exclusive offers</p>
                                <p className='text-xs font-semibold mt-5'>Mobile Number</p>
                                <div className="grid grid-cols-9 lg:grid-cols-9 gap-1 mt-1">
                                    <div className="lg:col-span-2 col-span-3">
                                        <div className={`grid grid-cols-1 mb-6 `}>
                                            <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                                            <Select
                                                isDisabled={showOTP}
                                                placeholder="Phone Number"
                                                value={{ label: country }}
                                                maxMenuHeight={190}
                                                options={PhoneCode}
                                                onChange={(item: any) => setCountry(item.value)}
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-6">
                                        <div className={`grid grid-cols-1 mb-4 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <div className={`grid grid-cols-1 mb-4 relative`} >
                                                    <div className="grid grid-cols-1 relative">
                                                        {showOTP && (
                                                            <img
                                                                onClick={() => handleEditPhone()}
                                                                src='https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg'
                                                                alt="start"
                                                                className={`absolute top-4 right-3 cursor-pointer`}
                                                            />
                                                        )}
                                                        <input
                                                            className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2 ${errors ? "border border-danger" : ""}`}
                                                            type='tel'
                                                            id={'phone_number'}
                                                            placeholder={'Phone Number'}
                                                            // onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                            // {...register('phone_number', {
                                                            //     required: true,
                                                            //     minLength: 10,
                                                            //     maxLength: 10
                                                            // })}
                                                            {...register('phone_number', {
                                                                required: "Please enter a valid mobile number",
                                                                pattern: {
                                                                    value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                                                                    message: "Please enter a valid mobile number",
                                                                },
                                                                maxLength: country === "+91" ? 10 : 12, // Set maxLength to 10 for +91 and 12 for others
                                                            })}
                                                            maxLength={country === "+91" ? 10 : 12} // Ensure that maxLength is correctly set
                                                            disabled={showOTP}
                                                        ></input>
                                                    </div>
                                                    {(errors?.phone_number ||
                                                        (country === "+91" && phoneNum?.length < 10) ||
                                                        (country !== "+91" && phoneNum?.length < 6)
                                                    ) && (
                                                            <p className='text-xs text-danger mt-1'>
                                                                {country === "+91" && phoneNum?.length < 10
                                                                    ? "Please enter a 10 digit mobile number."
                                                                    : "Please enter a valid mobile number."
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showOTP && <div className='mb-6 lg:mb-4'>
                                    <p className='text-xs font-semibold'>Enter OTP</p>
                                    <div className='flex justify-around mt-4 lg:mt-1'>
                                        <OtpInput
                                            autoComplete='one-time-code'
                                            isDisabled={!showOTP}
                                            value={otp}
                                            onChange={(otp: string) => {
                                                setOtp(otp);
                                            }}
                                            numInputs={4}
                                            separator={<span className="px-5"></span>}
                                            containerStyle="w-fit mx-auto"
                                            inputStyle={{
                                                width: "3rem",
                                                height: "3rem",
                                                color: "black",
                                                fontSize: " 0.875rem",
                                                borderRadius: 4,
                                                border: "1px solid #E6E8EC",
                                                backgroundColor: "#F5F5F5",
                                            }}
                                            isInputNum={true}
                                        />
                                    </div>
                                </div>}
                                {!showOTP &&
                                    <div className='w-full text-center'>
                                        <button
                                            // onClick={handleSubmit(onSubmitOTP)}
                                            // onClick={() => phoneNum.length >= 6 && country != "+91" ? onSubmitOTP(numRecord) : handleSubmit(onSubmitOTP)()}
                                            onClick={handleSubmitClick}
                                            className="font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                                            disabled={loadingOtp}
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                }
                            </form>

                            {showOTP &&
                                <div>
                                    <div className='mt-4 text-center'>
                                        {timer === END_TIMER ? <p className='text-brand-primary' onClick={() => resendOTP()}>Resend OTP</p> : <p className='text-sm font-semibold'>Resend OTP in <span className='text-brand-primary'>{`00:${timer}`}</span></p>}
                                    </div>
                                    <div className='w-full text-center'>
                                        {errors && errors.otp && <p className="text-xs text-danger mt-1">{errors.otp?.message}</p>}
                                        <button
                                            onClick={() => onVerifyOTP()}
                                            className="my-4 text-center font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                                            disabled={loadingVerifyOtp}
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LoginModal;