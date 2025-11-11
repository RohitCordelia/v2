import React, { Suspense, useEffect, useState } from "react";
import Gallery from '../../component/Gallery';
import Destination from './Destination';
import content1 from '../../../src/pages/home/content.json';
import Banner from '../../component/Banner';
import Header from './header'
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "../../../src/constants/userConstants";
import { getCurrentUrlWithCampaign, saveRefUrl } from "../../../src/utils/user/user";
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import { useExitIntentMutation } from '../../../src/services/auth/auth';
import Select from "react-select";
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import { useForm } from 'react-hook-form';
import { Input } from '../../components/UI/Forms/Inputs';
import { Phone } from '../../../src/utils/validations/formValidations';
import OtpInput from 'react18-input-otp';
import { TiggerFBLeadEvent, TiggerFBViewEvent, TiggerFBLocationEvent } from '../../../src/components/Analytics/events';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

const Overview = React.lazy(() => import("/src/components/Overview"));
const InfoSection = React.lazy(() => import("/src/components/InfoSection/infoSection"));

type Props = {};
const CONTENT: any = content1
const banner = {
    "images": [
        {
            'url': "https://images.cordeliacruises.com/cordelia_v2/public/images/lead-gen-christmas-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/lead-gen-early-bird-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/lead-gen-new-year-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "",
            "thumbnail": ""
        },
    ],
    "mobileImages": [

        {
            "url": "https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/static/xmas_mob.webp",
            "link": "",
            "type": "image",
            "altTag": "",
            "thumbnail": ""
        },
        {
            "url": "https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/static/earlybird_mob.webp",
            "link": "",
            "type": "image",
            "altTag": "",
            "thumbnail": ""
        },
        {
            "url": "https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/static/NY_MOB.webp",
            "link": "",
            "type": "image",
            "altTag": "",
            "thumbnail": ""
        }

    ],
}
const Info_Generic = {
    "info_section": {
        "title": "Sail In Style And Comfort",
        "sub_title": "Embark on a journey like no other with Cordelia Cruises. Enjoy premium amenities on board as you take unforgettable excursions to the stunning shores."
    },
    "info_cards": [
        {
            "link": "",
            "title": "Premium Accommodations ",
            "img_alt": "",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/accomodation-mumbai-page-desktop.webp",
            "sub_title": "Wake up in your elegantly appointed room and witness the magic of the sunrise from the unending horizon, then get ready for an exhilarating day in ‘The City on the Sea’ "
        },
        {
            "link": "",
            "title": "Exquisite Cuisine",
            "img_alt": "",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cuisine-mumbai-page-desktop.webp",
            "sub_title": "Cordelia Cruises offers a fusion of Pan-Asian and Indian flavours at the all-day food court. You can also indulge in our three specialty restaurants."
        },
        {
            "link": "",
            "title": "Exciting Destinations ",
            "img_alt": "",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/destination-mumbai-page-desktop.webp",
            "sub_title": "Set out on an unforgettable adventure, exploring exciting destinations with your loved ones aboard the majestic Empress."
        },
        {
            "link": "",
            "title": "Destination Wedding",
            "img_alt": "",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/wedding-leadgen-page-desktop.webp",
            "sub_title": "Embark on a special journey to solemnise your auspicious wedding vows in the middle of the gorgeous ocean. Let the wedding vows meet the ocean views on the most beautiful travel destination in India."
        },
        {
            "link": "",
            "title": "Corporate Events",
            "img_alt": "",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/corporate-leadgen-page-desktop.webp",
            "sub_title": "Take your corporate events, meetings and incentive trips to the next level onboard the Empress. Cruise to gorgeous destinations with your team for the perfect offsite."
        },
        {
            "link": "",
            "title": "Endless entertainment",
            "img_alt": "",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/entertainment-leadgen-page-desktop.webp",
            "sub_title": "From exclusive entertainment shows at the Marquee Theatre to enthralling live music, mesmerising magic shows and professional theatrical performances. We have endless entertainment to enchant you throughout your stay."
        }
    ],
}
export default function index(props: Props) {
    let navigate = useNavigate()
    const [description, setDescription] = useState<any>(false);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [showPhoneModal, setShowPhoneModal] = useState(false)
    const [country, setCountry] = useState('+91');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [leadId, setLeadId] = useState(null)
    const [error, setError] = useState("")
    const [otpReqId, setOtpReqId] = useState<any>();
    var [timer, setTimer] = useState<number>(30);
    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [exitIntent] = useExitIntentMutation()
    const TIMER_DURATION = 30
    const END_TIMER = 0
    const currentUrl = window.location.href;
    const personaSelector = new window.URLSearchParams(window.location.search).get(PERSONA_KEY);
    let PERSONA = DEFAULT
    if (personaSelector && ALL_PERSONAS.includes(personaSelector)) {
        PERSONA = personaSelector
    }

    const eventSelector = new window.URLSearchParams(window.location.search).get(EVENT_KEY);
    let EVENT = 'srilanka'
    if (eventSelector && ALL_EVENTS.includes(eventSelector)) {
        EVENT = eventSelector
    }
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
    useEffect(() => {
        saveRefUrl(window.location.href)
    }, [])

    useEffect(() => {
        if (new URLSearchParams(window.location.search).has('contact')) {
            document.getElementById('contact')?.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            })
        }
        if (new URLSearchParams(window.location.search).has('downloadApp')) {
            document.getElementById('downloadApp')?.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            })
        }
    }, [])
    const data = {
        "title": "Sail Into A World That Dreams Are Made Of",
        "vidUrl": "https://www.youtube.com/watch?v=PR6OjCvhcPE",
        "subTitle": "What you seek awaits you here. Come aboard for an extraordinary experience that goes    beyond cruising.",
        "vidThumbnail": 'https://images.cordeliacruises.com/cordelia_v2/public/images/video-thumbnail-desktop-image.webp'

    }

    const offers = [
        // {
        //   title: '10% Early Bird Discount',
        //   description: [
        //     'Receive 10% off by booking your cruise at least 60 days before the sailing date',
        //     'A discount of 10% will be applied to the cabin fare only',
        //     'The offer applies only to sailings scheduled 60 days or more from the date of booking',
        //     'Offer valid for bookings done till August 2024',
        //   ]
        // },
        {
            title: 'All-Inclusive Beverage Package',
            description: [
                'Select spirits and mixers will be included in your Cordelia cruise price at no extra charges for all guests (Adults only)',
                'Adults over 21 years of age will be permitted to consume alcohol onboard.',
                'Kids will be served non-alcoholic beverages only',
                'The package can be upgraded at an additional cost at the time of booking or onboard',
                'Operational as per bar timings',
                'This is an inclusive package along with your cruise booking',
                'Offer applies to all the sailings',
                'Offer valid for bookings done till August 2024',
            ]
        },
        {
            title: 'Book Now, Pay Later',
            description: [
                'Book your cabin by paying just 25%',
                'Make a full payment 60 days before your sailing date',
                'The offer applies only to sailings scheduled 60 days or more from the date of booking',
                'Offer valid for bookings done till August 2024',
            ]
        },
        {
            title: 'Kids Sail Free',
            description: [
                'Valid for all kids under the age of 12',
                'The kids must travel as 3rd or 4th guests',
                'Service charges, levies, and fuel charges are applicable with the GST',
                'Offer applies to all the sailings',
                'Offer valid for bookings done till August 2024',
            ]
        }
    ]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
            website: cleanedUrl
        };

        exitIntent(_payload)
            .unwrap()
            .then((res: any) => {
                setLoading(false)
                setShowPhoneModal(true)
                setSuccess(`You are one step closer to your cruise vacation. Our experts will contact you shortly`)
            })
            .catch((res: any) => {
                setLoading(false)
                // console.log('Error: ', res)
            })
    }
    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    }
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

    const onSubmitOTP = (data: any) => {
        const cleanedUrl = getCurrentUrlWithCampaign();
        setPhoneNumber(data.phone_number);
        TiggerFBLeadEvent({ phoneNumber: data.phone_number });
        const _payload = {
            phoneNumber: data.phone_number,
            countryCode: country,
            website: cleanedUrl || window.location.href,
        };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTP(true)
                setOtpReqId(response?.result?.requestId)
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
        TiggerFBLocationEvent()
        verifyOtp(_payload)
            .unwrap()
            .then((response) => {
                sessionStorage.removeItem("_st");
                setLeadId(response?.result?.leadId)
                setShowPhoneModal(false);
                setShowSuccessModal(true)
            })
            .catch((response) => {
                // setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
    }
    return (
        <>
            <Header isVideo={true} />
            <main>
                <section className="mt-20">
                    <Banner data={banner} />
                    <div className="lg:mx-44 shadow-allSide p-6">
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
                                        className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14'
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
                                {success ? (
                                    <div className="flex flex-wrap justify-center mb-4">
                                        <p className="text-brand-green font-semibold text-center lg:text-md text-sm lg:w-[70%]">
                                            {success}
                                        </p>
                                    </div>
                                ) : null}
                                <button
                                    type="submit"
                                    className="bg-brand-primary px-12 text-white text-sm py-3.5 font-bold rounded disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading-elipses">Loading</span>
                                    ) : (
                                        'Request A Call Back'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <section>
                    {<Overview data={data} event={EVENT} />}
                </section>
                <section className="">
                    <Destination />
                </section>

                <section>
                    {<Suspense fallback={<div>Loading.....</div>}>
                        <InfoSection content={Info_Generic.info_cards} info_section={Info_Generic.info_section} />
                    </Suspense>}
                </section>
                <section className="mb-[300px]">
                    <Gallery />
                </section>
            </main>
            <Modal show={showSuccessModal} align={'center'} className="w-[40%] relative border-t-4 border-brand-primary" onClose={() => setShowSuccessModal(false)}>
                <div className='w-full h-full bg-white shadow-lg'>
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

            <Modal show={showPhoneModal} align={'center'} className="drop-shadow bg-white w-full lg:w-2/4 center top-1/3 lg:top-1/4 lg:left-1/4 h-screen lg:h-1/2 rounded-t-lg lg:rounded border " onClose={() => setShowPhoneModal(false)}>
                <div className='py-8 px-6'>

                    <div>
                        <form>
                            <p className='text-xl font-bold'>Please verify mobile number to see your exclusive offers</p>
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
                                    {/* {/ <p >Edit mobile number</p> /} */}
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
            <Modal show={description} align={'center'} className="w-full lg:w-2/4 relative" onClose={() => setDescription(false)}>
                <div className=' w-full h-full bg-white'>
                    <div className=' p-4 pb-0 flex items-center justify-end'>
                        <svg
                            onClick={() => setDescription(false)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-black cursor-pointer"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="px-10 pb-6">
                        {description && description?.map((val) => (
                            <ul className="list-disc">
                                <li className="mb-2 text-sm lg:text-base">{val}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
}
