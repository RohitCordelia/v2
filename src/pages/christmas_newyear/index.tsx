import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import content1 from '/src/pages/home/content.json';
// @ts-ignore
import Banner from '/src/components/banner';
// @ts-ignore
import Christmas from '../../component/Events/christmas';
import Newyear from '../../component/Events/newyear';
import ExitIntent from "../../components/ExitIntent";
import './index.css'
import Modal from '../../components/UI/ModalCenter';
import Select from "react-select";
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import { Input } from '../../components/UI/Forms/Inputs';
import { Phone } from '../../../src/utils/validations/formValidations';
import OtpInput from 'react18-input-otp';
import { useForm } from 'react-hook-form';
import { useExitIntentMutation } from '../../../src/services/auth/auth';
import { getCurrentUrlWithCampaign } from "../../utils/user/user";
import { useGenerateOtpMutation, useVerifyOtpMutation } from "../../services/OTPLessAuth/OTPLessAuth";
import { getSessionTime } from '../../utils/algorithms';

const query = new window.URLSearchParams(window.location.search).get('q');

type Props = {};

const CONTENT: any = content1

export default function Home(props: Props) {
    const [events, setEvents] = useState('');
    const [leadId, setLeadId] = useState(null)
    const [country, setCountry] = useState('+91');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [showPhoneModal, setShowPhoneModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [otpReqId, setOtpReqId] = useState<any>();

    const [exitIntent] = useExitIntentMutation()
    // const [sendOTP] = useSendOTPMutation();
    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    var [timer, setTimer] = useState<number>(30);
    const TIMER_DURATION = 30
    const END_TIMER = 0
    const currentUrl = window.location.href;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

    useEffect(() => {
        if (showPhoneModal) {
            if (timer && timer !== END_TIMER) {
                var tempTimer = setInterval(
                    () => setTimer(timer - 1),
                    // () => setTimer(moment(timer, TIMER_FORMAT).subtract(1, 's').format('mm : ss')),
                    1000
                );
                return function cleanup() {
                    clearInterval(tempTimer);
                };
            }
        }
    }, [showPhoneModal, timer]);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (query) {
            setEvents(query)
            document.getElementById(query)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
            })
        } else {
            setEvents('christmas')
        }
    }, [])

    useMetaTags({
        title: 'Plan Your Luxurious Cruise Vacation Holiday On  a Ship | Cordelia Cruises',
        description: 'Looking for a cruise holiday? Book luxury vacation cruises ship to stunning destinations with comfort stays, entertainment, dining and fun activities at Cordelia',
        metas: [
            {
                name: 'keywords',
                content:
                    'cordelia, cordelia cruises, cordelia cruise ship, cordelia cruises website, cruise cordelia, cordelia cruises ship, cruise ship cordelia, cruise entertainment, cruise dining, cruise activities, cruise stay, cruise accomodation, luxurious cruise, cordeliacruises'
            },
        ],
    })

    const banner = {
        "images": [
            {
                "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/celebration_web.webp",
                "link": "#",
                "altTag": "Summer"
            }
        ],
        "mobileImages": [
            {
                "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/celebration_mobile.webp",
                "link": "#",
                "altTag": "Summer"
            }
        ]
    }

    const mobileValid = (event: any) => {
        if ((event.keyCode > 64 && event.keyCode < 91)) {
            event.preventDefault();
        }
    }
    const handleEditPhone = () => {
        setShowOTP(false)
        setOtp("")
    }
    const submitForm = (data: any) => {
        let link = document.location.href;
        const cleanedUrl = getCurrentUrlWithCampaign();

        const _payload = {
            email: data.email,
            phone_number: data.phone_number,
            country_code: country,
            website: cleanedUrl
        };

        exitIntent(_payload)
            .unwrap()
            .then((res: any) => {
                setLoading(false)
                setShowPhoneModal(true)
                setSuccess(`Thank you for your details, sailor! Our cruise expert will contact you shortly.`)
            })
            .catch((res: any) => {
                setLoading(false)
                // console.log('Error: ', res)
            })
    }

    const onSubmitOTP = (data: any) => {
        const cleanedUrl = getCurrentUrlWithCampaign();
        setPhoneNumber(data.phone_number);
        const _payload = {
            phoneNumber: data.phone_number,
            countryCode: country,
            website: cleanedUrl || window.location.href
        };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTP(true);
                setOtpReqId(response?.result?.requestId);
            })
            .catch((response) => {
                // setError('phone_number', { type: 'custom', message: 'Failed to send OTP' });
            })
    }
    const onVerifyOTP = () => {
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
                setLeadId(response.lead_id)
                setShowPhoneModal(false);
                setShowSuccessModal(true)
            })
            .catch((response) => {
                // setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
    }

    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    }

    return (
        <Layout>
            <main>
                <section>
                    <Banner data={banner} />
                </section>
                {leadId == null ?
                    <div className="lg:mx-44 shadow-allSide p-6 mt-[50px]">
                        <form className='' onSubmit={handleSubmit(submitForm)}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                                <div>
                                    <label className='text-sm font-semibold text-gray-100'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
                                        {...register('name', { required: "Name is required." })}
                                    />
                                    {errors.name && <p className='text-xs text-danger'>{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className='text-sm font-semibold text-gray-100'>Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='Email Address'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
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
                                    <label className='text-sm font-semibold text-gray-100'>Mobile Number</label>
                                    <input
                                        type='text'
                                        maxLength={10}
                                        placeholder='Mobile number'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
                                        {...register('phone_number', {
                                            required: "Mobile number is required.",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Enter a valid 10-digit mobile number."
                                            }
                                        })}
                                        onKeyDown={mobileValid}
                                    />
                                    {errors.phone_number && <p className='text-xs text-danger'>{errors.phone_number.message}</p>}
                                </div>
                            </div>
                            <div className="text-center mt-4 lg:mt-3">
                                <button
                                    type="submit"
                                    className="bg-brand-primary px-12 text-white text-sm py-3.5 font-bold rounded disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading-elipses">Loading</span>
                                    ) : (
                                        'Know Price'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    : null
                }
                {/* <LeadGenForm /> */}
                <section className="py-20 !pt-24 relative">
                    <div className="text-center relative">
                        <div className="container mx-auto px-4 lg:px-32 text-center">
                            <h1 className='text-2xl lg:text-4xl lg:font-medium px-4 leading-7'>Holiday Events On The Ocean</h1>
                            {/* <p className='lg:text-lg text-sm lg:leading-7 mt-6 lg:w-[90%] w-full lg:mx-auto'>Here’s a list of the fun, frolic & festivities we have planned for this December aboard the Empress.</p> */}
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center">
                            <div className="px-1 mb-2">
                                <button
                                    onClick={() => {
                                        setEvents('christmas')
                                        document.getElementById('christmas')?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                            inline: 'start',
                                        })
                                    }}
                                    className={`${events == 'christmas' ? 'text-white bg-brand-primary' : 'text-brand-primary'} border-2 border-brand-primary px-5 py-2.5 rounded-lg font-semibold`}
                                >
                                    Christmas
                                </button>
                            </div>
                            <div className="px-1 mb-2">
                                <button
                                    onClick={() => {
                                        setEvents('newyear')
                                        document.getElementById('newyear')?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                            inline: 'start',
                                        })
                                    }}
                                    className={`${events == 'newyear' ? 'text-white bg-brand-primary' : 'text-brand-primary'} border-2 border-brand-primary px-5 py-2.5 rounded-lg font-semibold`}
                                >
                                    New Year
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <img className='hidden lg:block absolute bottom-0 right-0 h-[37%]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/christmas-element-01.svg" alt="" /> */}
                    {/* <img className='absolute top-36 lg:top-16 left-4 lg:left-36 h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-06.svg" alt="" />
                    <img className='absolute bottom-44 lg:bottom-20 right-4 lg:right-28 h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-07.svg" alt="" /> */}
                </section>
                <section
                    id="christmas"
                    style={{
                        scrollMarginTop: '70px'
                    }}
                >
                    <Christmas />
                </section>
                <section
                    id="newyear"
                    style={{
                        scrollMarginTop: '70px'
                    }}
                >
                    <Newyear />
                </section>
                {/* <section className="mt-14 lg:mt-24">
                    <LeadForm />
                </section>
                <section className="mt-64 lg:mt-28 pb-28">
                    <DownloadApp />
                </section> */}
            </main>
            <ExitIntent />

            <Modal show={showSuccessModal} align={'center'} className="w-[40%] relative border-t-4 border-brand-primary" onClose={() => setShowSuccessModal(false)}>
                <div className='w-full h-full bg-white  shadow-lg'>
                    <div className='p-2 border-b border-gray-300 flex items-center justify-between'>
                        <h2 className='text-lg font-semibold text-gray-900 flex-grow text-center'>Success!</h2>
                        <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='p-4 h-[100px]'>
                        <p className='text-md text-gray-700 text-center'>{success}</p>
                    </div>
                </div>
            </Modal>
            <Modal show={showPhoneModal} align={'center'} className="drop-shadow  w-[90%] mt-[26%] md:mt-[0px] lg:w-2/4 center top-1/3 lg:top-1/4 lg:left-1/4 h-screen lg:h-1/2 rounded-t-lg " onClose={() => setShowPhoneModal(false)}>
                <div className='py-8 px-6 bg-white rounded-md '>

                    <div>
                        <form>
                            <button className="float-right font-black " onClick={() => setShowPhoneModal(false)}>X</button>
                            <h2 className='text-xl font-bold'>Please verify mobile number to see your exclusive offers</h2>
                            <p className='text-xs font-semibold mt-5'>Mobile Number</p>
                            <div className="grid grid-cols-9 lg:grid-cols-9 gap-1 mt-1">
                                <div className="lg:col-span-2 col-span-3">
                                    <div className={`grid grid-cols-1 mb-6 `}>
                                        <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                                        <Select
                                            // menuPortalTarget={document.body}
                                            // menuPosition="fixed"
                                            isDisabled={showOTP}
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
                                            <Input
                                                disabled={showOTP}
                                                onClickRightIcon={() => handleEditPhone()}
                                                id="phone_number"
                                                iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                                                name="phone_number"
                                                validation={Phone}
                                                register={register}
                                                inputClassName={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                                                type="tel"
                                                placeholder="Phone Number"
                                                error={errors && errors.phone_number}
                                                errorText={errors && errors.phone_number?.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-6 lg:mb-4'>
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
                            </div>
                            {!showOTP &&
                                <div className='w-full text-center'>
                                    <button
                                        onClick={handleSubmit(onSubmitOTP)}
                                        className="font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                                        Send OTP
                                    </button>
                                </div>
                            }
                        </form>

                        {showOTP &&
                            <div>
                                <div className='mt-4 text-center'>
                                    {timer === END_TIMER ? <p className='text-brand-primary' onClick={() => resendOTP()}>Resend OTP</p> : <p className='text-sm font-semibold'>Resend OTP in <span className='text-brand-primary'>{`00:${timer}`}</span></p>}
                                    {/* <p >Edit mobile number</p> */}
                                </div>
                                <div className='w-full text-center'>
                                    {errors && errors.otp && <p className="text-xs text-danger mt-1">{errors.otp?.message}</p>}
                                    <button onClick={() => onVerifyOTP()} className="mt-4 text-center font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                                        Verify
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}
