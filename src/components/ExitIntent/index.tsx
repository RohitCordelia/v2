import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { SetCookie, GetCookie, setCookieSec } from '../../../src/utils/store/store';
import "./index.css"
import { Email, PhoneOptional } from '../../utils/validations/formValidations';
import PhoneCode from '../../../src/components/UI/Forms/Inputs/phoneCodes.json'
import Select from "react-select";
import moment from 'moment';
import Button from '../UI/Button';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import OtpInput from 'react18-input-otp';
import { GetAuth, SaveAuth, SaveContact } from '../../utils/store/store';
import { getSessionTime } from '../../utils/algorithms';

type Props = {};

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        // backgroundColor: '#f5f5f5',
        height: '40px',
        border: 0,
        // zIndex: 10000 // Ensure it's above other elements within the same modal
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        // zIndex: 9999 // Keep options above any other element in the dropdown
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '298px',
        zIndex: 9999, // Keep the dropdown menu above other elements
    })
};

export default function ExitIntent(props: Props) {
    const END_TIMER = 0;

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm();

    const [country, setCountry] = useState('+91');
    const [agentExitClass, setExitClassModal] = useState('')
    const [loading, setLoading] = useState(false)

    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otpReqId, setOtpReqId] = useState<any>();
    const [otpError, setOtpError] = useState('');
    const [otp, setOtp] = useState('');
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [timer, setTimer] = useState<number>(30);

    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const Auth = GetAuth();

    const currentTime = moment();
    const startTime = moment("10:00 PM", "hh:mm A"); // Set your desired start time
    const endTime = moment("06:00 AM", "hh:mm A");  // Set your desired end time
    const nightTime = endTime.isBefore(startTime) &&
        (currentTime.isBetween(startTime, moment('11:59 PM', 'hh:mm A')) ||
            currentTime.isBetween(moment('12:00 AM', 'hh:mm A'), endTime)) ||
        currentTime.isBetween(startTime, endTime);

    useEffect(() => {
        if (isOtpSent) {
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
    }, [isOtpSent, timer]);

    useEffect(() => {
        if (!GetCookie('_exit')) {
            const timer = setTimeout(() => {
                setExitClassModal('visible');
            }, 20000);
            return () => clearTimeout(timer);
        }
    }, []);

    const getModalContent = () => {
        const exitStatus = GetCookie('_exit');
        // if (exitStatus === '1') {
        if (!exitStatus) {
            // return nightTime ? {
            //     img: "https://images.cordeliacruises.com/cordelia_v2/public/images/moonlight-saving-exit-intent-01-feb-2025.webp",
            //     imgTitle: "",
            //     imageAlt: "",
            //     title: "Exclusive Offer Get Upto 25% Off",
            //     subtitle2: "Use Code : MIDNIGHTSALE to get the deal",
            // } : {
            //     img: "http://images.cordeliacruises.com/cordelia_v2/public/images/companion-sail-exit-intent-new-feb'25.webp",
            //     imgTitle: "",
            //     imageAlt: "",
            //     title: "Companion Sails Free",
            //     subtitle1: "Explore now!",
            //     subtitle2: "Cruise with your companion on these special sailings.",
            // };
            // return {
            //     img: "https://images.cordeliacruises.com/cordelia_v2/public/images/Friday31_Exit_intent_512+x+459.webp",
            //     imgTitle: "",
            //     imageAlt: "",
            //     title: "Friday the 13th Cruise",
            //     subtitle1: "The Weekend You Weren't Ready For",
            // };
            // } else if (exitStatus === '2') {
            // } else if (exitStatus === '1') {
        } else {
            // return nightTime ? {
            //     img: "https://images.cordeliacruises.com/cordelia_v2/public/images/moonlight-saving-exit-intent-02-feb-2025.webp",
            //     imgTitle: "",
            //     imageAlt: "",
            //     title: "Exclusive Offer Get Upto 25% Off",
            //     subtitle2: "Use Code : MIDNIGHTSALE to get the deal",
            // } : {
            //     img: "http://images.cordeliacruises.com/cordelia_v2/public/images/pay3-sail4-exit-intent-image-feb-07.webp",
            //     imgTitle: "",
            //     imageAlt: "",
            //     title: "Pay for 3N sail for 4N",
            //     subtitle1: "Stay updated on",
            //     subtitle2: "Enjoy 4 nights at the cost of just 3 nights!",
            // };
            // return {
            //     img: "https://images.cordeliacruises.com/cordelia_v2/public/images/companion-sailfree-exit-intent-june.webp",
            //     imgTitle: "",
            //     imageAlt: "",
            //     title: "Weekend Sailaway Deal",
            //     subtitle1: "Companion Sails Free",
            // };
        }
        return {
            img: "http://images.cordeliacruises.com/cordelia_v2/public/images/Lakshadweep-Exit-Intent.webp",
            imgTitle: "",
            imageAlt: "",
            title: "Your Island Escape Awaits",
            subtitle1: "Don’t miss limited-time offers on Lakshadweep Cruises.",
        };
    };

    const { img, imageAlt, imgTitle, title, subtitle1, subtitle2 } = getModalContent();

    // useEffect(() => {
    //     const handleMouseOut = (e: MouseEvent) => {
    //         if ((!e.toElement && !e.relatedTarget) &&
    //             ((GetCookie('_exit') === '1' && !GetCookie('_exitime')) ||
    //             (GetCookie('_exit') === '2' && !GetCookie('_exitime')))) {
    //             setExitClassModal('visible');
    //         }
    //     };

    //     document.addEventListener('mouseout', handleMouseOut);
    //     return () => document.removeEventListener('mouseout', handleMouseOut);
    // }, []);

    // useEffect(() => {
    //     if (window.innerWidth < 640) {
    //         const handleScroll = () => {
    //             if ((GetCookie('_exit') === '1' && !GetCookie('_exitime')) ||
    //                 (GetCookie('_exit') === '2' && !GetCookie('_exitime'))) {
    //                 setExitClassModal('visible');
    //             }
    //         };
    //         window.addEventListener("scroll", handleScroll);
    //         return () => window.removeEventListener("scroll", handleScroll);
    //     }
    // }, []);

    const closeIntentModal = () => {
        if (!GetCookie('_exit')) {
            SetCookie('_exit', 1, 1);
            // setTimeout(() => {
            //     setExitClassModal('visible')
            // }, 30000);
            setCookieSec('_exitime', true, 90);
        }
        // else if (GetCookie('_exit') == '1') {
        //     setCookieSec('_exitime', true, 90);
        //     SetCookie('_exit', 2, 1);
        // }
        setExitClassModal('');
    }

    const submitForm = (data: any) => {
        setLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();

        const _payload = {
            email: data.email,
            phoneNumber: data.phone_number,
            countryCode: country,
            website: cleanedUrl || window.location.href,
            pageCode: 'exit_intent'
        };

        SetCookie('_exit', true, 90)

        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setIsOtpSent(true);
                setOtpReqId(response?.result?.requestId)
                setTimer(30);
                // setExitClassModal('')
            })
            .catch((response) => {
                setError('phone_number', { type: 'custom', message: response?.message || 'Error! Please try after some time.' });
            })
            .finally(() => setLoading(false));

        // const cleanedUrl = getCurrentUrlWithCampaign();

        // const _payload = {
        //     email: data.email,
        //     phone_number: data.phone_number,
        //     website: cleanedUrl,
        //     country_code: country
        // };

        // setLoading(true)
        // SetCookie('_exit', true, 90)
        // exitIntent(_payload)
        //     .unwrap()
        //     .then((res: any) => {
        //         setLoading(false)
        //         setExitClassModal('')
        //     })
        //     .catch((res: any) => {
        //         setLoading(false)
        //         setExitClassModal('')
        //         // console.log('Error: ', res)
        //     })
    }

    const resendOTP = () => {
        setOtp('');
        setOtpError('');
        setTimer(30);
        submitForm({ phone_number: watch()?.phone_number });
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
                setLoading(false)
                setExitClassModal('')
                setVerifyLoading(false)
            })
            .catch((response) => {
                setOtpError(response?.data?.message || 'Failed to verify OTP');
                setVerifyLoading(false)
            });
    }

    return (
        <div className={`${agentExitClass} exit-intent-popup !z-50`}>
            <div className="newsletter bg-white rounded-md w-[95%] lg:w-[55%]">
                <div className='grid grid-cols-2'>
                    <div className='hidden lg:flex h-full'>
                        <img src={img} alt={imageAlt} title={imgTitle} className='h-full rounded-md' />
                    </div>
                    <div className='col-span-2 lg:col-span-1 relative'>
                        <div className='absolute right-4 top-2'>
                            <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => closeIntentModal()}>X</p>
                        </div>
                        <div className='items-center text-center px-4 pb-4 pt-8'>

                            <div className='px-2'>
                                <h2 className='text-2xl font-semibold'>{title}</h2>
                                {!isOtpSent && <p className='text-sm text-[#575656] mt-2'>{subtitle1}</p>}
                                {!isOtpSent && <p className='text-sm mt-0 font-semibold text-[#3A3A3A]'>{subtitle2}</p>}
                            </div>
                            {!isOtpSent ?
                                <form className='text-left mt-5'>
                                    <label className='text-xs font-semibold text-gray-100'>Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='Email Address'
                                        className='border-1 border-gray-100/50 w-full mt-0 rounded-md h-11 mb-2'
                                        {...register('email', Email)}
                                    />
                                    {errors.email && <p className='text-xs text-danger'>Email is required.</p>}
                                    <label className='text-xs font-semibold text-gray-100'>Mobile Number</label>
                                    <div className='flex gap-1'>
                                        <div>
                                            <Select
                                                value={{ label: country || 'Select Country' }}
                                                options={PhoneCode}
                                                onChange={(item) => setCountry(item.value)}
                                                menuPosition="absolute"
                                                maxMenuHeight={300}
                                                styles={customStyles}
                                                className='border-1 border-gray-100/50 w-[100px] mt-0 rounded-md h-11'
                                            />
                                        </div>
                                        <div className='w-full'>

                                            <input
                                                type='text'
                                                maxLength={10}
                                                placeholder='Mobile number'
                                                className='border-1 border-gray-100/50 w-full mt-0 rounded-md h-11'
                                                {...register('phone_number', {
                                                    required: "Please enter a valid mobile number",
                                                    pattern: {
                                                        value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                                                        message: "Please enter a valid mobile number",
                                                    },
                                                    maxLength: country === "+91" ? 10 : 12, // Set maxLength to 10 for +91 and 12 for others
                                                })}
                                                maxLength={country === "+91" ? 10 : 12}
                                                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, "")}
                                            />
                                        </div>
                                    </div>
                                    {errors.phone_number && <p className='text-xs text-danger mt-1'>Mobile number is required.</p>}
                                    <Button text='Subscribe' disabled={loading} isLoading={loading} handleClick={handleSubmit(submitForm)} className='w-full mt-5' />
                                </form>
                                : (
                                    <div>
                                        <div className="text-center px-4 mt-2">
                                            <p className="px-2 text-sm">
                                                We've sent a 4-digit code to{' '}
                                                <span className="font-semibold">{watch().phone_number}</span>{' '}
                                                <span className="block">
                                                    Enter the code below to continue.
                                                </span>
                                            </p>
                                            <div className='flex justify-center items-center gap-1 mt-2 cursor-pointer' onClick={() => {
                                                setIsOtpSent(false);
                                                setOtp('');
                                                setOtpError('');
                                            }}>
                                                <p className='text-sm text-brand-primary font-semibold'>Change Number</p>
                                                <img className='h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-gradient.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="flex justify-around mt-4 lg:mt-2 mb-2 lg:px-4">
                                            <OtpInput
                                                autoComplete="one-time-code"
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
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    color: 'black',
                                                    fontSize: ' 0.875rem',
                                                    borderRadius: 4,
                                                    border: '1px solid #E6E8EC',
                                                    backgroundColor: '#F5F5F5'
                                                }}
                                                isInputNum={true}
                                            />
                                        </div>
                                        {otpError ? <p className='flex flex-wrap justify-center text-red text-sm mt-2 mb-2' >{otpError}</p> : null}
                                        <div className="lg:px-10 px-4">
                                            <Button text='Verify & Continue' disabled={(otp.toString().length < 4) || verifyLoading} isLoading={verifyLoading} handleClick={() => {
                                                handleSubmit(submitOtp)();
                                            }} className='w-full' />
                                        </div>
                                        <div className="">
                                            <div className="mt-4 text-center">
                                                {timer === END_TIMER ? (
                                                    <p
                                                        className=" cursor-pointer text-xs underline text-brand-primary"
                                                        onClick={resendOTP}
                                                    >
                                                        Didn't receive the code?
                                                    </p>
                                                ) : (
                                                    <p className="text-xs font-semibold">
                                                        Didn't receive the code? Resend in{' '}
                                                        <span className="underline">{`00:${String(timer).padStart(2, "0")}`}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
