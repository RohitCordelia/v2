import React, { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from "../../../components/UI/Modal/newModal";
import Modal2 from "../../../components/UI/ModalCenter";
import OtpInput from 'react18-input-otp';
import Select from 'react-select';
import PhoneCode from '../../../components/UI/Forms/Inputs/phoneCodes.json';
import Button from "../Button";
import { getCurrentUrlWithCampaign } from "../../../utils/user/user";
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../../services/OTPLessAuth/OTPLessAuth';
import { GetAuth, SaveAuth, SaveContact } from '../../../utils/store/store';
import { getSessionTime } from '../../../utils/algorithms';

type Props = {
    page_code: any;
    type?: string;
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px'

export default function LeadGenForm({ page_code, type }: Props) {
    const END_TIMER = 0;

    var [timer, setTimer] = useState<number>(30);
    const [loading, setLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [success, setSuccess] = useState('')
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [leadId, setLeadId] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [country, setCountry] = useState('+91');
    const [otpReqId, setOtpReqId] = useState<any>();

    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const Auth = GetAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        if (showOTPModal) {
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
    }, [showOTPModal, timer]);

    const submitForm = (data: any) => {
        setLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();

        const _payload = {
            phoneNumber: data.phone_number,
            website: cleanedUrl || window.location.href,
            pageCode: page_code,
            fullName: data.name,
            email: data.email,
            companyName: null,
            eventType: null,
            countryCode: country
        };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setOtpReqId(response?.result?.requestId)
                setShowOTPModal(true);
            })
            .catch((response) => {
                setErrorMsg(response?.data?.message);
            })
            .finally(() => setLoading(false));
    }

    const submitOtp = () => {
        setVerifyLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()

        const _payload = {
            otp: otp,
            requestId: otpReqId,
            website: cleanedUrl,
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
                    SaveContact({ data: watch()?.phone_number })
                    window.dispatchEvent(new Event("authChanged"));
                }

                setLeadId(response?.result?.leadId)
                setShowOTPModal(false)
                setShowSuccessModal(true)
                setSuccess(`You are one step closer to your cruise vacation. Our experts will contact you shortly.`)
            })
            .catch((response) => {
                setOtpError(response?.data?.message || 'Failed to verify OTP');
                // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
            .finally(() => setVerifyLoading(false));
    }

    const resendOTP = () => {
        setOtp('');
        setTimer(30);
        setOtpError('');
        submitForm({ phone_number: watch()?.phone_number });
    }
    const customStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: '#fff',
            height: '56px',
            // border: 10,
            border: '1px solid rgb(112 112 112 / 0.1)',
            // border: 'none', // Remove border
            boxShadow: 'none',
            borderRadius: '4px 0px 0px 4px',
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
            ...base,
            zIndex: 9999
        }),
        indicatorSeparator: (styles: any) => ({
            ...styles,
            marginRight: '-36px', // Add your desired left margin here
        }),
    };
    return (
        <>
            {leadId == null ?
                <div className={`shadow-allSide p-6 rounded-md ${type === "blog" ? '!lg:m-0' : 'mx-4 lg:mx-44'}`}>
                    <>
                        <form className='' onSubmit={handleSubmit(submitForm)}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                                <div>
                                    <label className='text-sm font-semibold mb-0.5'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('name', { required: "Name is required." })}
                                        onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, ""))}
                                    />
                                    {errors.name && <p className='text-xs text-danger'>{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className='text-sm font-semibold mb-0.5'>Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='Email Address'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('email', {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Enter a valid email address."
                                            }
                                        })}
                                    />
                                    {errors.email && <p className='text-xs text-danger'>{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className='text-sm font-semibold'>Phone Number</label>
                                    <div className="flex">
                                        <div className="lg:col-span-2 col-span-2">
                                            <div className={`grid grid-cols-1 gap-4 w-[72px] shadow-allSide overflow-hidden`}>
                                                <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                                                <Select
                                                    menuPortalTarget={document.body}
                                                    menuPosition={'fixed'}
                                                    value={{ label: country }}
                                                    maxMenuHeight={290}
                                                    options={PhoneCode}
                                                    onChange={item => setCountry(item?.value)}
                                                    styles={customStyles}
                                                />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-7 col-span-7 w-full">
                                            <input
                                                id="phone_number"
                                                iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                                                name="phone_number"
                                                {...register('phone_number', {
                                                    required: "Please enter a valid mobile number",
                                                    pattern: {
                                                        value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                                                        message: "Please enter a valid mobile number",
                                                    },
                                                    maxLength: country === "+91" ? 10 : 12, // Set maxLength to 10 for +91 and 12 for others
                                                })}
                                                maxLength={country === "+91" ? 10 : 12} // Ensure that maxLength is correctly set
                                                className="border border-gray-100/10 shadow-allSide w-full mt-0 rounded-r-md h-14 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                                                type="tel"
                                                placeholder="Phone Number"
                                                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                                            />
                                            {errors.phone_number && (
                                                <span className="text-danger text-xs">
                                                    {errors.phone_number && <p className='text-xs text-danger'>{errors.phone_number.message}</p>}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4 lg:mt-3">
                                <Button text="Submit" disabled={loading} isLoading={loading} className="px-12" />
                            </div>
                            {errorMsg &&
                                <div className="text-center mt-4">
                                    <p className="text-sm font-semibold text-danger">{errorMsg}</p>
                                </div>
                            }
                        </form>

                        <Modal
                            show={showOTPModal}
                            align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
                            maxHeight='100vh'
                        >
                            <div className="w-full relative">
                                <button
                                    onClick={() => {
                                        setShowOTPModal(false)
                                        setOtp('');
                                        setTimer(30);
                                    }}
                                    className="absolute -top-3 -right-2 text-3xl text-gray-600 hover:text-gray-900"
                                >
                                    &times;
                                </button>
                                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3">
                                    <p>Verify your phone number</p>
                                </div>

                                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                                    <p className="px-2 text-sm">
                                        We've sent a 4-digit code to{' '}
                                        <span className="font-semibold">{watch().phone_number}</span>{' '}
                                        <span className="block">
                                            Enter the code below to continue.
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                                    <OtpInput
                                        autoComplete="one-time-code"
                                        // isDisabled={!showOTP}
                                        value={otp}
                                        onChange={(otp: string) => {
                                            setOtpError('')
                                            setOtp(otp);
                                        }}
                                        numInputs={4}
                                        separator={<span className="px-2"></span>}
                                        containerStyle=" mx-auto"
                                        inputStyle={{
                                            margin: otpWidth,
                                            width: '3rem',
                                            height: '3rem',
                                            color: 'black',
                                            fontSize: ' 0.875rem',
                                            borderRadius: 4,
                                            border: '1px solid #E6E8EC',
                                            backgroundColor: '#F5F5F5'
                                        }}
                                        isInputNum={true}
                                    />
                                </div>

                                {otpError ? <p className='flex flex-wrap justify-center text-red text-sm mt-4 mb-4' >{otpError}</p> : null}
                                {errors && errors?.phone_number?.message ? <p className='flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4' >{errors?.phone_number?.message}</p> : null}
                                <div className="lg:px-10 px-4">
                                    <Button text="Verify & Continue" disabled={(otp.toString().length < 4) || verifyLoading} isLoading={verifyLoading} handleClick={handleSubmit(submitOtp)} className="w-full" />
                                </div>

                                <div className="mb-8">
                                    <div className="mt-4 text-center">
                                        {timer === END_TIMER ? (
                                            <p
                                                className=" cursor-pointer underline text-brand-primary"
                                                onClick={resendOTP}
                                            >
                                                Didn't receive the code?
                                            </p>
                                        ) : (
                                            <p className="text-sm font-semibold">
                                                Didn't receive the code? Resend in{' '}
                                                <span className="underline">{`00:${String(timer).padStart(2, "0")}`}</span>
                                            </p>
                                        )}
                                        {/* <p >Edit mobile number</p> */}
                                    </div>
                                </div>
                                <div className="text-center px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                                    <p className='text-xs lg:text-sm'>
                                        By verifying, you agree to our{' '}
                                        <Link
                                            to={'/terms-condition'}
                                            target="_blank"
                                            className="text-brand-primary italic"
                                        >
                                            [Terms & Conditions]
                                        </Link>{' '}
                                        and{' '}
                                        <a
                                            href={
                                                'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                                            }
                                            target="_blank"
                                            className="text-brand-primary italic"
                                        >
                                            [Privacy Policy]
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                        </Modal>
                    </>
                </div>
                :
                null
            }
            <Modal2 show={showSuccessModal} align={'center'} className="w-[85%] lg:w-[40%] relative rounded-md overflow-hidden" onClose={() => setShowSuccessModal(false)}>
                <div className='w-full h-full bg-white shadow-lg'>
                    <div className='absolute right-3 top-3'>
                        <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 lg:pb-0 rounded-md overflow-hidden'>
                        <p className='text-md text-gray-700 text-center font-semibold'>{success}</p>
                    </div>
                </div>
            </Modal2>
        </>
    );
}