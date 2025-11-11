import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import content1 from '/src/pages/home/content.json';
// @ts-ignore
import Banner from '/src/components/banner';
// @ts-ignore
import ExitIntent from "../../components/ExitIntent";
// import './index.css'
import Modal from '../../components/UI/ModalCenter';
import Select from "react-select";
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import { Input } from '../../components/UI/Forms/Inputs';
import { Phone } from '../../../src/utils/validations/formValidations';
import OtpInput from 'react18-input-otp';
import { useForm } from 'react-hook-form';
import NorthRegion from "./north/NorthRegion";
import SelectBoxCabin from "../weekend/component/selectBoxCabin";
import StateCity from '../../components/UI/Forms/Inputs/state-cities.json'
import { getCurrentUrlWithCampaign } from "../../utils/user/user";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { GetAuth, SaveAuth, SaveContact } from '../../utils/store/store';
import { getSessionTime } from '../../utils/algorithms';

type Props = {};

const CONTENT: any = content1

let otpWidth = window.innerWidth > 640 ? '10px' : '3px'

export default function Home(props: Props) {
    const [events, setEvents] = useState('NorthRegion');
    const [leadId, setLeadId] = useState(null)
    const [country, setCountry] = useState('+91');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [otpError, setOtpError] = useState('');
    const [showPhoneModal, setShowPhoneModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otpReqId, setOtpReqId] = useState<any>();

    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const Auth = GetAuth();

    var [timer, setTimer] = useState<number>(30);
    const TIMER_DURATION = 30
    const END_TIMER = 0
    const currentUrl = window.location.href;

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        const stateList = Object.keys(StateCity);
        setStates(stateList);
    }, []);

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities(StateCity[state] || []);
    };

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
                "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-itinerary-new-banner-desktop.webp",
                "link": "#",
                "altTag": ""
            },
            {
                "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/kidsail-offer-itinerary-new-banner-desktop.webp",
                "link": "#",
                "altTag": ""
            },
        ],
        "mobileImages": [

            {
                "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-itinerary-new-banner-mobile.webp",
                "link": "#",
                "altTag": ""
            },
            {
                "url": " https://images.cordeliacruises.com/cordelia_v2/public/images/kidsail-offer-itinerary-new-banner-mobile.webp",
                "link": "#",
                "altTag": ""
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
            phoneNumber: data.phone_number,
            countryCode: country,
            organization: data.organization,
            fullName: data.name,
            state: data.state,
            city: data.city,
            website: cleanedUrl,
            pageCode: 'b2b_satte',
        };

        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTPModal(true);
                setOtpReqId(response?.result?.requestId)
                // setSuccess(`Thank you for your details, sailor! Our cruise expert will contact you shortly.`)
            })
            .catch((response) => {
                // setErrorMsg(response?.data?.message);
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
                setOtpReqId(response?.result?.requestId)
                setShowOTP(true)
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
                setLeadId(response?.result?.leadId)
                setShowPhoneModal(false);
                setShowSuccessModal(true)
            })
            .catch((response) => {
            })
    }
    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    }

    const submitOtp = () => {
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()
        const _payload = {
            requestId: otpReqId,
            otp: otp,
            website: cleanedUrl || window.location.href,
            sessionTime: sessionTime
        };
        verifyOtp(_payload)
            .unwrap()
            .then((response) => {
                sessionStorage.removeItem("_st");
                setLeadId(response?.result?.leadId)
                setShowOTPModal(false)
                setShowSuccessModal(true)
                setSuccess(`You are one step closer to your cruise vacation. Our experts will contact you shortly.`)
            })
            .catch((response) => {
                // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
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
                                    <label className='text-sm font-semibold'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='Full Name'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('name', {
                                            required: "Name is required.",
                                            minLength: {
                                                value: 3,
                                                message: "Name is required."
                                            }
                                        })}
                                        onInput={(e) => {
                                            let value = e.target.value;
                                            if (value.length === 1 && value === ' ') {
                                                e.target.value = '';
                                            } else {
                                                e.target.value = value.replace(/[^a-zA-Z\s]/g, '')
                                                    .replace(/\s+/g, ' ')
                                                    .trimStart();
                                            }
                                        }}
                                    />
                                    {errors.name && <p className='text-xs text-danger'>{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className='text-sm font-semibold'>Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='Email Address'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('email', {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Enter a valid email address."
                                            }
                                        })}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.trimStart();
                                        }}
                                    />
                                    {errors.email && <p className='text-xs text-danger'>{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className='text-sm font-semibold'>Mobile Number</label>
                                    <input
                                        type='text'
                                        maxLength={10}
                                        placeholder='Mobile number'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('phone_number', {
                                            required: "Mobile number is required.",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Enter a valid 10-digit mobile number."
                                            }
                                        })}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.trimStart();
                                        }}
                                        onKeyDown={mobileValid}
                                    />
                                    {errors.phone_number && <p className='text-xs text-danger'>{errors.phone_number.message}</p>}
                                </div>

                                <div>
                                    <label className='text-sm font-semibold'>Organization Name</label>
                                    <input
                                        type='text'
                                        placeholder='Organization Name'
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('organization', {
                                            required: "Organization Name is required.",
                                            minLength: {
                                                value: 3,
                                                message: "Organization Name is required."
                                            }
                                        })}
                                        onInput={(e) => {
                                            let value = e.target.value;
                                            if (value.length === 1 && value === ' ') {
                                                e.target.value = '';
                                            } else {
                                                e.target.value = value.replace(/[^a-zA-Z\s]/g, '')
                                                    .replace(/\s+/g, ' ')
                                                    .trimStart();
                                            }
                                        }}
                                    // {...register('organization', { required: "Organization Name is required." })}
                                    />
                                    {errors.organization && <p className='text-xs text-danger'>{errors.organization.message}</p>}
                                </div>
                                <div>
                                    <label className='text-sm font-semibold'>State</label>
                                    <select
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('state', { required: "State is required." })}
                                        value={selectedState}
                                        onChange={handleStateChange}

                                    >
                                        <option value="">Choose a State</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && <p className='text-xs text-danger'>{errors.state.message}</p>}
                                </div>

                                <div>
                                    <label className='text-sm font-semibold'>City</label>
                                    <select
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('city', { required: "City is required." })}
                                        disabled={!selectedState}
                                    >
                                        <option value="">Choose a City</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    {errors.city && <p className='text-xs text-danger'>{errors.city.message}</p>}
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
                                        'Request a Call Back'
                                    )}
                                </button>
                            </div>
                        </form>
                        <Modal
                            show={showOTPModal}
                            align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
                            maxHeight='100vh'
                        >
                            <div className="w-full">
                                <button
                                    onClick={() => {
                                        setShowOTPModal(false)
                                        setOtp('');
                                    }}
                                    className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
                                >
                                    &times;
                                </button>
                                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-[33px]">
                                    <p> Verify OTP </p>
                                </div>

                                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                                    <p className="px-2 text-sm">
                                        You will receive a 4-digit code for your phone number {watch().phone_number}
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
                                    {/* <button
                                        onClick={handleSubmit(submitOtp)}
                                        className={`bg-brand-primary disabled:bg-brand-primary/60 w-full text-white text-sm py-3.5 px-8 rounded font-bold disabled:cursor-not-allowed`}
                                        disabled={otp.toString().length < 4}
                                    >
                                        Verify
                                    </button> */}
                                    <Button text="Verify" disabled={otp.toString().length < 4} handleClick={handleSubmit(submitOtp)} className="w-full" />
                                </div>

                                <div className="mb-8">
                                    <div className="mt-4 text-center">
                                        {timer === END_TIMER ? (
                                            <p
                                                className=" cursor-pointer underline text-brand-primary"
                                                onClick={() => {
                                                    resendOTP();
                                                    setOtp('');
                                                    setTimer(30)
                                                }}
                                            >
                                                Resend OTP
                                            </p>
                                        ) : (
                                            <p className="text-sm underline font-semibold">
                                                Resend With{' '}
                                                <span className="">{`00:${timer}`}</span>
                                            </p>
                                        )}
                                        {/* <p >Edit mobile number</p> */}
                                    </div>
                                </div>
                                <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                                    <p>
                                        By entering the OTP and clicking continue, I confirm that I have
                                        read, understood and agree with the{' '}
                                        <Link
                                            to={'/terms-condition'}
                                            target="_blank"
                                            className="text-brand-primary italic"
                                        >
                                            Terms and Conditions
                                        </Link>{' '}
                                        and{' '}
                                        <a
                                            href={
                                                'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                                            }
                                            target="_blank"
                                            className="text-brand-primary italic"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                        </Modal>
                    </div> : null}

                <section className="md:py-2 md:pt-14 pt-4 relative">
                    <div className="text-center relative">
                        <div className="container mx-auto px-4 lg:px-32 text-center">
                            <h1 className='text-2xl lg:text-4xl lg:font-medium px-4 leading-7 text-[#000000] text-[18px] md:text-[50px] font-openSans'>Sales Support Tailored to Your Needs</h1>
                        </div>
                    </div>
                </section>
                <section
                    id="NorthRegion"
                    style={{ scrollMarginTop: '70px' }}
                    className={`${events === 'NorthRegion' ? 'block' : 'hidden'}`}
                >
                    <NorthRegion />
                </section>
            </main>
            <ExitIntent />

            <Modal show={showSuccessModal} align={'center'} className="lg:w-[40%] w-[85%] relative border-t-4 border-brand-primary" onClose={() => setShowSuccessModal(false)}>
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
                                        <SelectBoxCabin
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
