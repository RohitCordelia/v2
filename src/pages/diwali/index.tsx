import React, { Suspense, useEffect, useState } from "react";
import { Layout } from '/src/components/Layout';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useExitIntentMutation } from '../../../src/services/auth/auth';
import Modal from '../../components/UI/ModalCenter';
import Select from "react-select";
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import { Input } from '../../components/UI/Forms/Inputs';
import { Phone } from '../../../src/utils/validations/formValidations';
import OtpInput from 'react18-input-otp';
import { getCurrentUrlWithCampaign } from "../../utils/user/user";
import { useGenerateOtpMutation, useVerifyOtpMutation } from "../../services/OTPLessAuth/OTPLessAuth";
import { getSessionTime } from '../../utils/algorithms';
 
export default function Diwali() {
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
    var [timer, setTimer] = useState<number>(30);
    const [otpReqId, setOtpReqId] = useState<any>();

    // const [sendOTP] = useSendOTPMutation();
    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [exitIntent] = useExitIntentMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [bgImage, setBgImage] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const TIMER_DURATION = 30
    const END_TIMER = 0
    const currentUrl = window.location.href;

    useEffect(() => {
        // Function to switch background images based on screen size
        const updateBgImage = () => {
            if (window.innerWidth < 768) {
                // Mobile background image
                setBgImage("url('https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-itinerary-bg-mobile.webp')");
            } else {
                // Desktop background image
                setBgImage("url('https://images.cordeliacruises.com/cordelia_v2/public/images/diwali%2724-itinerary-bg.webp')");
            }
        };

        // Set the initial background image
        updateBgImage();

        // Update background image on window resize
        window.addEventListener("resize", updateBgImage);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", updateBgImage);
    }, []);
    console.log('roh banne', bgImage);

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


    }, []);

    const mobileValid = (event: any) => {
        if ((event.keyCode > 64 && event.keyCode < 91)) {
            event.preventDefault();
        }
    };

    const handleEditPhone = () => {
        setShowOTP(false)
        setOtp("")
    };

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
    };

    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    };

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
        setPhoneNumber(data.phone_number);
        const _payload = { phoneNumber: data.phone_number, countryCode: country };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTP(true);
                setOtpReqId(response?.result?.requestId);
            })
            .catch((response) => {
                // setError('phone_number', { type: 'custom', message: 'Failed to send OTP' });
            })
    };

    const onVerifyOTP = () => {
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()
        const _payload = {
            requestId: otpReqId,
            otp: otp,
            website: cleanedUrl || currentUrl,
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
    };

    const images = [
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-image-01.webp",
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-image-02.webp",
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-image-03.webp",
        // "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-image-04.webp",
    ];

    const SamplePrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-lg p-2 cursor-pointer z-10"
            >
                {/* Rotate to display left arrow */}
                <span>
                    <img
                        className="h-3 lg:h-2 rotate-90"
                        src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg"
                    />
                </span>
            </div>
        );
    };

    const SampleNextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white w-8 h-8 flex justify-center items-center rounded-full shadow-lg p-2 cursor-pointer z-10 font-bold"
            >
                {/* Keep it as-is for the right arrow */}
                <span>
                    <img
                        className="h-3 lg:h-2 -rotate-90"
                        src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg"
                    />
                </span>
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const PhotoGallryimages = [
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-popup-image-01.webp",
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-popup-image-02.webp",
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-popup-image-03.webp",
        "https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-popup-image-04.webp",
    ];

    let bannerBackground = {
        backgroundImage: `${window.innerWidth > 640 ? "url(https://images.cordeliacruises.com/cordelia_v2/public/images/diwali%2724-itinerary-bg.webp)" : "url(https://images.cordeliacruises.com/cordelia_v2/public/images/diwali%2724-itinerary-bg-mobile.webp)"}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        height: '100%'
    };

    return (
        <>
            <Layout>
                <main>
                    <section>
                        <div
                            className="w-full h-full md:mt-[65px] mt-10"
                            style={{
                                background: 'linear-gradient(rgb(0 0 0 / 90%) 0%, rgba(9, 9, 121, 0) 40%, rgba(0, 212, 255, 0) 100%)',
                            }}
                        >
                            {/* Desktop banner */}
                            <a href="/upcoming-cruises?itinerary_id=3655b3af-b74a-4e81-9113-abcb49a54008">
                                <img
                                    className="hidden md:block w-full"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali_banner_web.webp"
                                    alt=""
                                />
                            </a>

                            {/* Mobile banner */}
                            <a href="/upcoming-cruises?itinerary_id=3655b3af-b74a-4e81-9113-abcb49a54008">
                                <img
                                    className="block md:hidden w-full"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali_banner_mobile.webp"
                                    alt=""
                                />
                            </a>
                        </div>
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
                            : ""}
                        {leadId == null ?
                            <div className="mt-[19px] ml-[330px] mb-[-128px] w-[51px] md:w-[80px] md:mb-0 md:mt-[-60px] md:ml-auto relative">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-element-01.svg"
                                    className="block w-full md:w-auto max-w-full h-auto"
                                />
                            </div> :
                            <div className="mt-[19px] ml-[330px] mb-[-128px] w-[51px] md:w-[80px] md:mb-[-70px] md:ml-auto relative">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-element-01.svg"
                                    className="block w-full md:w-auto max-w-full h-auto"
                                />
                            </div>}
                    </section>
                    {/* diwali */}
                    <div className="mt-[80px] md:mt-[0px]">
                        <h1 className="text-center font-bold md:text-6xl text-[#ea580c]/75 text-[42px]">Diwali</h1>
                        <h1 className="text-center font-bold text-6xl text-[#ea580c] mt-[-23px]">~</h1>

                        <div className="diwali-section flex flex-col md:flex-row justify-center items-center p-8 relative mt-[-73px]">

                            {/* Diwali Image on the left in mobile view */}
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-element-02.svg"
                                className="w-[50px] hidden md:block mt-[-300px] " />

                            {/* Slider on top in mobile view */}
                            <div className="w-full md:w-[40%] md:ml-[69px] relative order-1 md:order-none mb-5 md:mb-0 mt-[75px]">
                                <Slider {...settings}>
                                    {images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Diwali Slide ${index + 1}`} className="rounded-lg shadow-md w-full" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            {/* Description below the slider in mobile view */}
                            <div className="hidden md:flex mt-[113px] w-full md:w-1/2 md:pl-10 flex-col justify-center order-3 md:order-none">
                                <p className="md:text-2xl md:font-bold md:mt-[-37px] text-[17px] font-medium">
                                    Everything To Make Your Festivities Special
                                </p>
                                <p className="md:text-xl font-semibold md:mt-5 text-[16px] font-normal">
                                    Celebrations take on a whole new meaning
                                </p>
                                <p className="md:text-xl font-semibold md:mt-4 text-[16px] font-normal">
                                    as you enjoy Indian and international cuisine,
                                </p>
                                <p className="md:text-xl font-semibold md:mt-4 text-[16px] font-normal">
                                    a game of cards, exotic beverages, thrilling
                                </p>
                                <p className="md:text-xl font-semibold md:mt-4 text-[16px] font-normal">
                                    performances, and much more
                                </p>
                                <p className="md:text-xl font-semibold md:mt-4 text-[16px] font-normal">
                                    —all aboard the majestic Empress.
                                </p>
                            </div>

                            <div className="mt-[30px] flex flex-col justify-center order-3 md:hidden">
                                <p className="w-[343px] text-black font-outfit text-[22px] font-medium leading-[25px] capitalize">
                                    Everything To Make Your Festivities Special
                                </p>
                                <p className="w-[343px] text-black font-outfit text-[16px] font-medium leading-[25px] capitalize md:text-xl font-semibold md:mt-5">
                                    Celebrations take on a whole new meaning as you enjoy Indian and international cuisine, a game of cards, exotic beverages, thrilling performances, and much more
                                </p>
                                <p className="w-[343px] text-black font-outfit text-[16px] font-medium leading-[25px] capitalize md:text-xl font-semibold md:mt-5">
                                    — all aboard the majestic Empress.
                                </p>
                            </div>

                        </div>
                    </div>
                    {/*end{code} */}
                    {/* banner */}
                    <div >
                        {/* Rangoli Image */}
                        <div>
                            <img
                                className="w-[204px] ml-[65px] mt-[-174px] md:w-[204px] md:ml-[65px] md:mt-[-174px]"
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-rangoli-element.svg"
                                alt="Diwali Rangoli"
                            />
                        </div>
                        {/* Sweet and Lamp Images */}
                        <div className="mt-[-52px]">
                            <div className="flex">
                                <div>
                                    <img
                                        className="pt-[10px] ml-[21px] w-[101px] md:w-[174px] md:ml-[57px] mt-[-10px]"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-sweet-element-3.svg"
                                        alt="Diwali Sweet"
                                    />
                                </div>
                                <div className="md:relative md:ml-auto">
                                    <img
                                        className="ml-[185px] w-[78px] md:w-[134px] mb-[20px] mt-[-10px] md:mt-[-22px]"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-lamp-element-04.svg"
                                        alt="Diwali Lamp"
                                    />
                                </div>
                            </div>

                            {/* Background Section */}
                            <div
                                className="bg-cover bg-center text-white py-16 px-4 text-center md:mt-[-27px] mt-[-28px]"
                                style={bannerBackground}
                            >
                                <h2 className="text-2xl font-bold mb-8 text-center md:text-3xl">
                                    Cruise on Oct 28th 2024 - Nov 1st 2024 (4N/5D)
                                </h2>
                                <p className="text-lg mb-2 text-center">
                                    The festival of lights shines even brighter aboard India’s top cruise as it sails under a vast starlit sky. Come aboard
                                </p>
                                <p className="text-lg mb-10 text-center">
                                    with your loved ones to experience festivities like never before. You don’t want to miss this.
                                </p>

                                {/* Mobile and Desktop Images */}
                                <div className="flex flex-wrap justify-center items-center gap-8">
                                    {/* Mobile Image */}
                                    <img
                                        className="w-[100%] md:hidden"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-itinerary-mobile.webp"
                                        alt="Diwali Itinerary Mobile"
                                    />

                                    {/* Desktop Image */}
                                    <img
                                        className="hidden md:block w-[1013px] mt-[-37px]"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-itinerary.webp"
                                        alt="Diwali Itinerary Desktop"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* photo */}
                    <div className="bg-white py-12 px-4">
                        <img className="w-[50px] md:ml-[238px] md:mt-[35px] mt-[-38px]" src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-fly-element-05.svg" />

                        <h2 className="md:text-4xl text-2xl font-bold text-center md:mb-8 md:mt-[-50px] m-[-39px]">Photo Gallery</h2>
                        <div>
                            <img className="md:w-[60px] w-[40px] md:ml-[335px] ml-[330px] mt-[-60px] md:hidden md:mt-[-20px]  md:mt-hidden lg:mt-hidden" src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-element-02.svg" />
                        </div>

                        <div className="hidden lg:flex justify-center gap-4 flex-wrap w-full mx-auto mt-[71px]">
                            <div className="relative w-full lg:w-1/4 ml-[70px]">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-01.webp"
                                    className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                            <div className="flex flex-col w-full lg:w-1/4 gap-4">
                                <div className="relative">
                                    <img
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-02.webp"
                                        className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                </div>
                                <div className="relative">
                                    <img
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-03.webp"
                                        className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="relative w-full lg:w-1/4">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-04.webp"
                                    className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                            <div className="">
                                <img
                                    className="w-[60px] md:w-[70px] md:mt-[130px] mt-[20px]"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-element-02.svg"
                                    alt="Decorative Element"
                                />
                            </div>
                        </div>

                        <div className="lg:hidden flex flex-col gap-4 justify-center w-full mx-auto mt-[37px]">
                            <div className="relative w-full">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-mobile-01.webp"
                                    className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative w-1/2">
                                    <img
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-mobile-02.webp"
                                        className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                </div>
                                <div className="relative w-1/2">
                                    <img
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-mobile-03.webp"
                                        className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                </div>
                            </div>

                            <div className="relative w-full ">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/diwali'24-gallery-mobile-04.webp"
                                    className="rounded-lg w-full h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                        </div>

                        <div>
                            <img className="w-[60px] md:w-[70px] mt-[-20px]  md:mt-[-170px] " src="https://images.cordeliacruises.com/cordelia_v2/public/assets/diwali'24-cracker-element-06.svg" />
                        </div>


                        <div className="flex justify-center items-center md:mt-28">
                            <button
                                className="relative bg-purple-800 text-brand-primary font-bold text-xl py-4 px-8 border-4 border-brand-primary rounded tracking-wide hover:bg-purple-700 transition duration-300"
                                onClick={() => setIsPopupOpen(true)}
                            >
                                VIEW GALLERY
                            </button>
                        </div>
                    </div>
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                            <button
                                className="absolute top-6 right-6 z-50 text-white bg-red-500 border-2 border-white rounded-full p-3 hover:bg-red-600 transition duration-300"
                                onClick={() => setIsPopupOpen(false)}
                            >
                                X
                            </button>
                            <div className="w-full max-w-3xl px-4">
                                <Slider {...settings}>
                                    {PhotoGallryimages.map((image, index) => (
                                        <div key={index} className="relative flex justify-center items-center">
                                            <img
                                                src={image}
                                                alt={`Popup Slide ${index + 1}`}
                                                className="w-full h-auto md:h-[60vh] lg:h-[80vh] object-cover rounded-lg" // Change to h-auto for mobile
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )}
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

                </main>

            </Layout>

        </>
    );
}
