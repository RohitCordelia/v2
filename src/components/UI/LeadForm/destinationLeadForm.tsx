import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PhoneCode from "../Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import Button from '../Button';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../../services/OTPLessAuth/OTPLessAuth';
import { getCurrentUrlWithCampaign } from '../../../utils/user/user';
import OtpInput from 'react18-input-otp';
import Modal from '../../../components/UI/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { GetAuth, SaveAuth, SaveContact } from '../../../utils/store/store';
import { getSessionTime } from '../../../utils/algorithms';

type Props = {};

export type RegistrationFormFields = {
    firstName: string;
    countryCode: string;
    phoneNumber: string;
};

const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#f5f5f5', height: '48px', border: 0 }),
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
    })
};

export default function DestinationLeadForm(props: Props) {
    const END_TIMER = 0;

    const [country, setCountry] = useState('+91');
    const [otpReqId, setOtpReqId] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [otp, setOtp] = useState('');
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [timer, setTimer] = useState<number>(30);

    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const Auth = GetAuth();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        formState: { errors, isValid }
    } = useForm<RegistrationFormFields>({
        mode: 'onChange',
        defaultValues: {
            firstName: "",
            countryCode: "",
            phoneNumber: ""
        }
    });

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

    useEffect(() => {
        if (submitted) {
            reset({
                firstName: '',
                phoneNumber: ""
            });
        }
    }, [submitted]);

    const onSubmit = (data: any) => {
        setLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();

        const _payload = {
            fullName: data.firstName,
            phoneNumber: data.phoneNumber,
            countryCode: country,
            website: cleanedUrl || window.location.href,
            pageCode: 'destination'
        };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTPModal(true);
                setOtpReqId(response?.result?.requestId)
            })
            .catch((response) => {
                setError('phoneNumber', { type: 'custom', message: response?.message || 'Error! Please try after some time.' });
            })
            .finally(() => setLoading(false));
    };

    const resendOTP = () => {
        setOtp('');
        setOtpError('');
        setTimer(30);
        onSubmit({ phoneNumber: watch()?.phoneNumber });
    };

    const submitOtp = (data: any) => {
        setOtp('')
        setTimer(30);
        setVerifyLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()
        const _payload = {
            requestId: otpReqId,
            otp: otp,
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
                    SaveContact({ data: data?.phoneNumber })
                    window.dispatchEvent(new Event("authChanged"));
                }
                setShowOTPModal(false)
                setSubmitted(true);
            })
            .catch((response) => {
                setOtpError(response?.data?.message || 'Failed to verify OTP');
            })
            .finally(() => setVerifyLoading(false));
    }

    return (
        <div className="container mx-auto my-12 lg:mb-20">
            <div className="p-4 lg:p-0 rounded-xl drop-shadow-infoCard bg-white">
                <form onSubmit={handleSubmit(onSubmit)} name="WebToLeads443730000221833354">
                    <div className="grid grid-cols-1 lg:grid-cols-11 lg:gap-4">
                        <div className='col-span-5 hidden lg:inline-block'>
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/call-back-image.webp "
                                className="w-full h-full"
                                alt="Cruise"
                                loading="lazy"
                            />
                        </div>
                        <div className='col-span-6 lg:p-8'>
                            <h3 className="text-xl lg:text-4xl mb-2 font-medium lg:mb-2">
                                Get in touch with us
                            </h3>
                            <p className="text-xs lg:text-base leading-4 opacity-[76%] mb-4 lg:mb-8 lg:w-full">
                                To make your seacation safe and memorable, we have implemented all the essential protocols.
                            </p>
                            <div className={`grid grid-cols-1 mb-4 relative `}>
                                <div className="grid grid-cols-1 relative">
                                    <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                                    <input
                                        className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                                        type="text"
                                        placeholder="First Name"
                                        {...register("firstName", { required: true })}
                                        onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, ""))}
                                    ></input>
                                </div>
                            </div>
                            <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                                <div className="lg:col-span-2 col-span-3">
                                    <div className={`grid grid-cols-1 `}>
                                        <Select
                                            menuPortalTarget={document.body}
                                            menuPosition={'fixed'}
                                            value={{ label: country }}
                                            maxMenuHeight={190}
                                            options={PhoneCode}
                                            onChange={item => setCountry(item.value)}
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>
                                <div className="lg:col-span-7 col-span-7">
                                    <div className={`grid grid-cols-1 relative `}>
                                        <div className="grid grid-cols-1 relative">
                                            <input
                                                className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                                                type="text"
                                                placeholder="Phone Number"
                                                {...register('phoneNumber', {
                                                    required: "Please enter a valid mobile number",
                                                    pattern: {
                                                        value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/,
                                                        message: "Please enter a valid mobile number",
                                                    },
                                                    maxLength: country === "+91" ? 10 : 12,
                                                })}
                                                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {errors && errors.phoneNumber && <p className='text-xs text-danger'>Enter 10 digit mobile number.</p>}
                            <Button text='Submit' disabled={!isValid} className='mt-4 lg:w-auto lg:px-20' />
                            {submitted && <div className="text-center text-ls text-j-black">
                                <div
                                    className="flex flex-col justify-between text-brand-green"
                                    style={{ maxHeight: "100%" }}
                                >
                                    <div className="pt-10">We have received your message, We will get back to you shortly.</div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </form>
            </div>



            <Modal
                show={showOTPModal}
                align={'center'}
                className="drop-shadow bg-white w-[90%]  lg:w-2/6 center  lg:top-1/5 lg:bottom-1/6
                      lg:left-1/3 left-4 lg:h-auto rounded-lg lg:rounded-lg border mt-20"
            >
                <div
                    className=" p-1 flex justify-start  items-center"
                    onClick={() => {
                        setShowOTPModal(false)
                        setOtp('');
                        setOtpError('');
                    }}
                >
                    <div className="self-center mt-4 ml-3 font-bold cursor-pointer">
                        <img src='https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/cordelia_v2/public/assets/back-arrow-icon.svg' alt='backIcon' />
                    </div>
                </div>
                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3">
                    <p>Verify your phone number</p>
                </div>
                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                    <p className="px-2 text-sm">
                        We've sent a 4-digit code to{' '}
                        <span className="font-semibold">{watch().phoneNumber}</span>{' '}
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
                            setOtpError('');
                            setOtp(otp);
                        }}
                        numInputs={4}
                        separator={<span className="px-2"></span>}
                        containerStyle=" mx-auto"
                        inputStyle={{
                            margin: window.innerWidth > 640 ? '10px' : '3px',
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
                <div className="lg:px-10 px-4">
                    <Button text='Verify & Continue' disabled={(otp.toString().length < 4) || verifyLoading} isLoading={verifyLoading} handleClick={() => {
                        handleSubmit(submitOtp)();
                    }} className='w-full' />
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
                    </div>
                </div>
                <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
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
            </Modal>
        </div>
    );
}
