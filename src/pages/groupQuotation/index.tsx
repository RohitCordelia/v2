import React, { ReactNode, useEffect, useState, useRef } from 'react'
import Select from "react-select";
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import ExitIntent from "../../components/ExitIntent";
import "./index.css"
import Header from "../../components/Header/header";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from 'joi';
import { useForm, Controller } from 'react-hook-form';
import { useSendOtpMutation, useSaveEnquiryGuestMutation, useVerifyOtpMutation } from '../../services/groupEnquiry/groupEnquiry';
import Modal from '../../components/UI/Modal/newModal';
import OtpInput from 'react18-input-otp';
import RegisterAgent from './component/registerAgent'
import AgentEnquiry from './component/agentEnquiry'
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetItineraryMutation } from '../../services/weekend/weekend';
import moment from 'moment';
import { SaveEnquiry, GetEnquiry } from '../../utils/store/store';
import Button from '../../components/UI/Button';
const ReactPlayer = React.lazy(() => import("react-player/youtube"));

type Props = {}

export type RegistrationFormFields = {
    fullName: string;
    email: string;
    phoneNumber: string;
};
function EnquirySuccessContainer({ enquirySuccess, guestType }: any) {
    let navigate = useNavigate()
    return (
        <div className='mt-10 px-5 flex flex-col items-center justify-center text-cente h-[80%]'>
            <img className='h-[70px] w-[70px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" alt="" />
            <div className='px-5'>
                <p className='text-3xl leading-10 font-semibold mt-7'>{guestType == 1 ? 'Thank you for reaching out to us!' : 'Thank you for contacting us! '}</p>
            </div>
            <p className='text-sm leading-6 mt-3'>{guestType == 1 ? 'Your inquiry has been successfully registered and is currently being processed. Our team will get back to you with the details shortly to ensure a seamless experience for you.' : 'We’ve received your inquiry and are processing it right away. Our Preferred Sales Agent will get back to you shortly with the information you need to assist your clients effortlessly.'}</p>
            <p className='font-bold text-brand-primary text-sm mt-5'>Enquiry ID {enquirySuccess}</p>
            <Button text='Go Back to Homepage' handleClick={() => navigate('/')} className='w-full mt-10' />
        </div>
    )
}

function GuestContailer({ control, errors, handleSubmit, onSubmit, loadingGuestEnquiry }: any) {
    const [getItinerary, { isLoading: loadingQuotationData }] = useGetItineraryMutation()
    const [destination, setDestination] = useState<any>();

    const monthArray = [
        {
            value: 'January',
            label: 'January'
        },
        {
            value: 'February',
            label: 'February'
        },
        {
            value: 'March',
            label: 'March'
        },
        {
            value: 'April',
            label: 'April'
        },
        {
            value: 'May',
            label: 'May'
        },
        {
            value: 'June',
            label: 'June'
        },
        {
            value: 'July',
            label: 'July'
        },
        {
            value: 'August',
            label: 'August'
        },
        {
            value: 'September',
            label: 'September'
        },
        {
            value: 'October',
            label: 'October'
        },
        {
            value: 'November',
            label: 'November'
        },
        {
            value: 'December',
            label: 'December'
        },
    ]

    useEffect(() => {
        let url: any = `pagination=true`
        getItinerary(url)
            .unwrap()
            .then((res: any) => {
                let destination = res.ports.map((item: any) => {
                    return {
                        value: item.name,
                        label: item.name
                    }
                })
                setDestination(destination)
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
    }, [])

    const [country, setCountry] = useState('+91');
    const customStyles = {
        control: (styles: any) => ({ ...styles, backgroundColor: '#f6f6f6', height: '49px', border: 0 }),
        option: (provided: any, state: any) => ({
            ...provided,
            borderBottom: '1px dotted #ccc',
            padding: 10,
            zIndex: 999,
            fontSize: '14px'
        }),
        menu: (styles: any) => ({
            ...styles,
            width: '400px',
            height: '230px',
            zIndex: 9999
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        placeholder: (defaultStyles: any) => {
            return {
                ...defaultStyles,
                fontSize: 14,
                color: '#a1a1a1'
            }
        },
    };
    const options = [
        { value: 'MICE', label: 'MICE' },
        { value: 'Group', label: 'Group' },
        { value: 'Charter', label: 'Charter' },
        { value: 'Individual', label: 'Individual' },
        { value: 'Wedding', label: 'Wedding' },
        { value: 'Corporate', label: 'Corporate' },
        { value: 'Other', label: 'Other' },
    ];
    const nightOption = [
        { value: '2', label: '2 Nights' },
        { value: '3', label: '3 Nights' },
        { value: '4', label: '4 Nights' },
        { value: '5', label: '5 Nights' },
    ];

    const currentYear = new Date().getFullYear();
    const sailingYear = Array.from({ length: 3 }, (_, index) => {
        const year = currentYear + index;
        return { value: year.toString(), label: year.toString() };
    });

    return (
        <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-4 mt-4 overflow-hidden overflow-y-scroll lg:max-h-[calc(100vh-400px)] no-scrollbar'>
                <div className=''>
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder="First Name"
                                className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.first_name && <p className="text-xs text-danger mt-1">{errors?.first_name?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder="Last Name"
                                className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.last_name && <p className="text-xs text-danger mt-1">{errors?.last_name?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder="Email"
                                className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.email && <p className="text-xs text-danger mt-1">{errors?.email?.message}</p>}
                </div>
                <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                    <div className="lg:col-span-2 col-span-3">
                        <div className={`grid grid-cols-1 `}>
                            <Select
                                menuPortalTarget={document.body}
                                menuPosition={'fixed'}
                                value={{ label: country }}
                                maxMenuHeight={230}
                                options={PhoneCode}
                                onChange={item => setCountry(item.value)}
                                styles={customStyles}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-7 col-span-7">
                        <div className={`grid grid-cols-1 relative `}>
                            <div className="grid grid-cols-1 relative">
                                <Controller
                                    name="mobile"
                                    control={control}
                                    rules={{
                                        required: 'Mobile number is required',
                                        pattern: {
                                          value: /^[0-9]{10}$/,
                                          message: 'Mobile number must be exactly 10 digits',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="tel"
                                            inputMode="numeric"
                                            maxLength={10}
                                            pattern="[0-9]*"
                                            {...field}
                                            placeholder="Mobile Number"
                                            className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                                            onChange={(e) => {
                                                const onlyNums = e.target.value.replace(/\D/g, '');
                                                if (/^\d{0,10}$/.test(onlyNums)) {
                                                  field.onChange(onlyNums);
                                                }
                                            }}
                                            value={field.value}
                                        />
                                    )}
                                />
                                {errors?.mobile && <p className="text-xs text-danger mt-1">{errors?.mobile?.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <Controller
                        name="event_type"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={options}
                                placeholder="Event Type"
                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                onBlur={field.onBlur}
                                maxMenuHeight={230}
                                value={field.value}
                                styles={customStyles}
                            />
                        )}
                    />
                    {errors?.event_type && <p className="text-xs text-danger mt-1">{errors?.event_type?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="destination"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={destination}
                                placeholder="Select Destination"
                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                onBlur={field.onBlur}
                                maxMenuHeight={230}
                                value={field.value}
                                styles={customStyles}
                            />
                        )}
                    />
                    {errors?.destination && <p className="text-xs text-danger mt-1">{errors?.destination?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="night_count"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={nightOption}
                                placeholder="Select Nights"
                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                onBlur={field.onBlur}
                                maxMenuHeight={230}
                                value={field.value}
                                styles={customStyles}
                            />
                        )}
                    />
                    {errors?.night_count && <p className="text-xs text-danger mt-1">{errors?.night_count?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="sailing_month"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={monthArray}
                                placeholder="Select Sailing Month"
                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                onBlur={field.onBlur}
                                maxMenuHeight={230}
                                value={field.value}
                                styles={customStyles}
                            />
                        )}
                    />
                    {errors?.sailing_month && <p className="text-xs text-danger mt-1">{errors?.sailing_month?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="sailing_year"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={sailingYear}
                                placeholder="Sailing Year"
                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                onBlur={field.onBlur}
                                maxMenuHeight={230}
                                value={field.value}
                                styles={customStyles}
                            />
                        )}
                    />
                    {errors?.sailing_year && <p className="text-xs text-danger mt-1">{errors?.sailing_year?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="pax_count"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder="Total Guest"
                                className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.pax_count && <p className="text-xs text-danger mt-1">{errors?.pax_count?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="cabin_count"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder=" Number of Cabins (minimum 16 cabins required)"
                                className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.cabin_count && <p className="text-xs text-danger mt-1">{errors?.cabin_count?.message}</p>}
                </div>
            </div>
            <div className='mt-6'>
                <Button text={loadingGuestEnquiry ? 'Loading' : 'Submit'} disabled={loadingGuestEnquiry} className='w-full' />
            </div>
        </form>
    );
}

function AgentContainer({ agentEmail, setAgentEmail, setGuestType, onAgentLogin, loadingSendOtp }: any) {
    const [agentError, setAgentError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className='mt-6 lg:mt-10'>
            <p className='text-xl font-bold'>Login</p>
            <div className='mt-2'>
                <input
                    value={agentEmail}
                    onChange={(e: any) => { setAgentEmail(e.target.value) }}
                    type='text'
                    name='email'
                    placeholder="Email"
                    className='bg-[#eeeeee] px-3 border-none shadow-allSide rounded-md text-base !py-3 placeholder:text-xs placeholder:text-gray-100/70 w-full'
                />
                {agentError && <p className="text-xs text-danger mt-1">{agentError}</p>}
            </div>
            <div className='mt-6'>
                <Button
                    text={loadingSendOtp ? 'Loading...' : 'Submit'}
                    disabled={loadingSendOtp}
                    handleClick={() => {
                    if (!agentEmail.trim()) {
                        setAgentError('Email is required');
                        return;
                    } else if (!validateEmail(agentEmail)) {
                        setAgentError('Please enter a valid email address');
                        return;
                    } else {
                        setAgentError('');
                        onAgentLogin();
                    }
                    }}
                    className="w-full"
                />
            </div>
            <div className='text-center mt-14'>
                <p className='text-sm '>
                    {/* Don`t have an Account?
                    <span onClick={() => setGuestType(3)} className='text-brand-primary underline cursor-pointer'> Register </span>
                    <span className='text-gray-100'> or </span> */}
                    <span onClick={() => setGuestType(1)} className='text-brand-primary font-semibold underline cursor-pointer'>Continue as Guest</span>
                </p>
            </div>
        </div>
    )
}

export default function PaymentSuccess({ }: Props) {
    const [country, setCountry] = useState('+91');
    const [guestType, setGuestType] = useState(1);
    const [agentEmail, setAgentEmail] = useState('');
    const [verifyOtpModal, setVerifyOtpModal] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [otp, setOtp] = useState('');
    var [timer, setTimer] = useState<number>(0);
    var [verificationId, setVerificationId] = useState<string>('');
    var [enquirySuccess, setEnquirySuccess] = useState<string>('');
    var [internalAgent, setInternalAgent] = useState<boolean>(false);

    const playerRef = useRef();
    const EnquiryStore = GetEnquiry();

    const [sendOtp, { isLoading: loadingSendOtp }] = useSendOtpMutation()
    const [verifyOtp, { isLoading: loadingVerifyOtp }] = useVerifyOtpMutation()
    const [saveEnquiryGuest, { isLoading: loadingGuestEnquiry }] = useSaveEnquiryGuestMutation()
    let otpWidth = window.innerWidth > 640 ? '10px' : '3px'
    const END_TIMER = 0;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
        useEffect(()=>{
            setOtp("")
            setAgentEmail("")
        },[guestType])
    // useEffect(() => {
    //     if (EnquiryStore && EnquiryStore?.guestType) {
    //         setGuestType(EnquiryStore?.guestType)
    //     }
    // }, [EnquiryStore])

    useEffect(() => {
        if (verifyOtpModal) {
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
    }, [verifyOtpModal, timer]);

    const schema = Joi.object({
        first_name: Joi.string().required().messages({
            'string.empty': `First name cannot be empty`,
            'any.required': `First name is required`
        }),
        last_name: Joi.string().required().messages({
            'string.empty': `Last name cannot be empty`,
            'any.required': `Last name is required`
        }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
            }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.empty': 'Mobile number is required',
                'string.pattern.base': 'Mobile number must be exactly 10 digits',
                'any.required': 'Mobile number is required',
            }),
        event_type: Joi.object({
            value: Joi.string().required(),
            label: Joi.string().required(),
        })
            .required()
            .messages({
                'any.required': 'Event Type is required',
                'object.base': 'Please select a valid Event Type',
            }),
        sailing_month: Joi.object({
            value: Joi.string().required(),
            label: Joi.string().required(),
        })
            .required()
            .messages({
                'any.required': 'Sailing month is required',
                'object.base': 'Please select a valid Sailing month',
            }),
        sailing_year: Joi.object({
            value: Joi.string().required(),
            label: Joi.string().required(),
        })
            .required()
            .messages({
                'any.required': 'Sailing year is required',
                'object.base': 'Please select a Sailing year',
            }),
        night_count: Joi.object({
            value: Joi.string().required(),
            label: Joi.string().required(),
        })
            .required()
            .messages({
                'any.required': 'Night count is required',
                'object.base': 'Please select a valid Night count',
            }),
        destination: Joi.object({
            value: Joi.string().required(),
            label: Joi.string().required(),
        })
            .required()
            .messages({
                'any.required': 'Destination is required',
                'object.base': 'Please select a valid Destination',
            }),
        pax_count: Joi.string().required().messages({
            'string.empty': `Total guest cannot be empty`,
            'any.required': `Total guest is required`
        }),
        cabin_count: Joi.number()
        .min(16) // Minimum numeric value of 16
        .required()
        .messages({
            'number.base': `Number of cabins cannot be empty`,
            'number.min': `Number of cabins must be at least 16`,
            'any.required': `Number of cabins is required`, 
        }),
    })

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        clearErrors,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(schema)
    });

    const onSubmit = (data: any) => {
        const _payload = {
            "first_name": data?.first_name,
            "last_name": data?.last_name,
            "country_code": country,
            "email": data?.email,
            "phone_number": data?.mobile,
            "event_type": data?.event_type?.value,
            "sailing_month": data?.sailing_month?.value,
            "sailing_year": data?.sailing_year?.value,
            "destination": data?.destination?.value,
            "night_count": data?.night_count?.value,
            "pax_count": data?.pax_count,
            "cabin_count": data?.cabin_count,
        }
        saveEnquiryGuest(_payload)
            .unwrap()
            .then((res: any) => {
                if (res && res?.data && res?.data?.number) {
                    setEnquirySuccess(res?.data?.number)
                }
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
    }

    const onAgentLogin = () => {
        SaveEnquiry(null)
        const _payload = {
            email: agentEmail
        }
        sendOtp(_payload)
            .unwrap()
            .then((res: any) => {
                setVerifyOtpModal(true)
                setTimer(10)
                setVerificationId(res?.data?.verification_id)
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
    }

    const onAgentVerifyOtp = () => {
        const _payload = {
            "verification_id": verificationId,
            "otp": otp
        }

        verifyOtp(_payload)
            .unwrap()
            .then((res: any) => {
                if (!res?.data?.agent && !res?.data?.internal_agent) {
                    let data = {
                        email: agentEmail,
                        guestType: 3,
                        verificationId: verificationId
                    }
                    SaveEnquiry(data)
                    setGuestType(3)
                } else {
                    setGuestType(4)
                    SaveEnquiry({ ...res?.data, guestType: 4 })
                }
                setVerifyOtpModal(false)
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
    }

    return (
        <>
            <Header headerAnimation={''} />
            <div className="lg:h-screen lg:flex">
                <div className="w-full lg:w-3/5 items-center justify-center relative">
                    <div className="w-full h-full max-h-full flex items-center justify-center pt-12 lg:pt-[70px] lg:h-auto" style={{ height: 'calc(100vh - 20.6%)' }}>
                        <img className='h-full w-full object-cover hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Home_Web_New_Banner.webp" alt="" />
                        <img className='h-full w-full object-cover lg:hidden' src="https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Home_Web_New_Banner.webp" alt="" />
                    </div>
                    <div className='hidden lg:block text-sm 2xl:text-xl border-r border-black/10'>
                        <div className='flex justify-between items-center py-3 px-5 gap-3 bg-[#EA725B]/10'>
                            <div>
                                <p className='font-bold'>For Cruise-related Enquiries, you can connect with us at</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-2'>
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg" alt="call icon" />
                                    <a href='tel:+912265545206' className='text-brand-primary font-semibold'>022-65545206</a>
                                </div>
                                <p className='font-bold'>For B2B Enquiries</p>
                            </div>
                        </div>
                        <div className='flex gap-2 px-5'>
                            <div className='basis-[45%] 2xl:basis-1/2 py-3 border-r border-black/10'>
                                <div className='mb-2'>
                                    <span className='font-bold'>Wedding: </span>
                                    <a href='mailto:weddings@cordeliacruises.com' className='mb-2'>weddings@cordeliacruises.com</a>
                                </div>
                                <div className='mb-2'>
                                    <span className='font-bold'>Corporate: </span>
                                    <a href='mailto:corporate@cordeliacruises.com' className='mb-2'>corporate@cordeliacruises.com</a>
                                </div>
                            </div>
                            <div className='pl-2 py-3'>
                                <div className='mb-2'>
                                    <span className='font-bold'>Group: </span>
                                    <a href='mailto:group@cordeliacruises.com' className='mb-2'>group@cordeliacruises.com</a>
                                </div>
                                <div className='mb-2'>
                                    <span className='font-bold'>Other Queries: </span>
                                    <a href='mailto:travelpartners@cordeliacruises.com' className='mb-2'>travelpartners@cordeliacruises.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/5 px-5 lg:px-20 pt-6 lg:pt-32 pb-10">
                    {enquirySuccess ? (
                        <EnquirySuccessContainer enquirySuccess={enquirySuccess} guestType={guestType} />
                    ) : (
                        <>
                            <div className='mx-auto text-center'>
                                <div className='px-10 lg:px-0'>
                                    <p className='text-xl lg:text-2xl font-bold'>Group Enquiry</p>
                                    <p className='text-xs lg:text-sm'>Discover exclusive discounts and packages tailored to your needs. Get started now!</p>
                                </div>
                                <div className='mt-4'>
                                    <Button text='Cruiser' size='sm' type={guestType == 1 ? 'primary' : 'secondary'} handleClick={() => setGuestType(1)} className='w-[128px] rounded-r-none' />
                                    <Button text='Travel Agent' size='sm' type={guestType == 2 || guestType == 3 || guestType == 4 ? 'primary' : 'secondary'} handleClick={() => setGuestType(2)} className='w-[128px] rounded-l-none' />
                                </div>
                            </div>
                            <div>
                                {guestType == 1 ? (
                                    <GuestContailer
                                        control={control}
                                        errors={errors}
                                        handleSubmit={handleSubmit}
                                        onSubmit={onSubmit}
                                        loadingGuestEnquiry={loadingGuestEnquiry}
                                    />
                                ) : guestType == 2 ? (
                                    <AgentContainer
                                        agentEmail={agentEmail}
                                        setAgentEmail={setAgentEmail}
                                        setGuestType={setGuestType}
                                        onAgentLogin={onAgentLogin}
                                        loadingSendOtp={loadingSendOtp}
                                    />
                                ) : guestType == 3 ? (
                                    <RegisterAgent
                                        guestType={guestType}
                                        setGuestType={setGuestType}
                                        onRegister={() => setGuestType(4)}
                                    />
                                ) : guestType == 4 ? (
                                    <AgentEnquiry
                                        onSuccess={(e: any) => {
                                            setEnquirySuccess(e)
                                            SaveEnquiry(null)
                                        }
                                        }
                                    />
                                ) : null
                                }
                            </div>
                        </>
                    )}
                </div>

                <div className='text-sm lg:hidden'>
                    <div className='bg-[#EA725B]/10 py-3 px-5 text-center'>
                        <p className='font-bold'>For Cruise related Enquiries you can connect with us at</p>
                        <div className='flex justify-center items-center gap-3'>
                            <div className='flex items-center gap-2'>
                                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp.svg" alt="whatsapp icon" />
                                <a href='tel:+919018981190' className='text-brand-primary font-semibold'>9018981190</a>
                            </div>
                            <p className='font-bold'>For B2b Enquiries</p>
                        </div>
                    </div>
                    <div className='py-3 px-5'>
                        <div className='mb-2'>
                            <span className='font-bold'>Wedding: </span>
                            <a href='mailto:weddings@cordeliacruises.com' className='mb-2'>weddings@cordeliacruises.com</a>
                        </div>
                        <div className='mb-2'>
                            <span className='font-bold'>Corporate: </span>
                            <a href='mailto:corporate@cordeliacruises.com' className='mb-2'>corporate@cordeliacruises.com</a>
                        </div>
                        <div className='mb-2'>
                            <span className='font-bold'>Group: </span>
                            <a href='mailto:group@cordeliacruises.com' className='mb-2'>group@cordeliacruises.com</a>
                        </div>
                        <div className='mb-2'>
                            <span className='font-bold'>Other Queries: </span>
                            <a href='mailto:travelpartners@cordeliacruises.com' className='mb-2'>travelpartners@cordeliacruises.com</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <main className=" pt-24 lg:pt-20">
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 lg:col-span-7'>
                        <div className="aspect-video-custom hidden lg:block">
                            <ReactPlayer
                                ref={playerRef}
                                volume={1}
                                url={"https://www.youtube.com/watch?v=7HJcYTyZcX4"}
                                width="100%"
                                height="100%"
                                controls={false}
                                muted={true}
                                playing={false}
                                playsinline
                                progressInterval={1000}
                            />
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-5 px-5 lg:px-20 py-10 lg:py-20'>
                        <div className='px-5 lg:px-20 mx-auto text-center'>
                            <p className='text-2xl font-bold'>Group Enquiry</p>
                            <p className='text-sm'>Discover exclusive discounts and packages tailored to your needs. Get started now!</p>
                            <div className='mt-4'>
                                <button
                                    onClick={() => setGuestType(1)}
                                    className={`border text-sm font-semibold py-2 rounded-l w-[90px] ${guestType == 1 ? 'bg-brand-primary border-brand-primary text-white' : ''}`}
                                >
                                    Guest
                                </button>
                                <button
                                    onClick={() => setGuestType(2)}
                                    className={`border text-sm font-semibold py-2 rounded-r w-[90px] ${guestType == 2 || guestType == 3 ? 'bg-brand-primary border-brand-primary text-white' : ''}`}
                                >
                                    B2B Agent
                                </button>
                            </div>
                        </div>
                        <div>
                            {guestType == 1 ? (
                                <GuestContailer
                                    control={control}
                                    errors={errors}
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                />
                            ) : guestType == 2 ? (
                                <AgentContainer
                                    agentEmail={agentEmail}
                                    setAgentEmail={setAgentEmail}
                                    setGuestType={setGuestType}
                                    onAgentLogin={onAgentLogin}
                                    loadingSendOtp={loadingSendOtp}
                                />
                            ) : guestType == 3 ? (
                                <RegisterAgent />
                            ) : null}
                        </div>
                    </div>
                </div>
            </main> */}

            <Modal
                show={verifyOtpModal}
                align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[300px] max-h-[85vh] lg:w-[40%]"
                onClose={() => setVerifyOtpModal(false)
                }
            >
                <div className='lg:px-6 py-4'>
                    <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3">
                        <p> Verify OTP </p>
                    </div>
                    <div className="text-center lg:px-4 px:6 mt-3 lg:mt-4">
                        <p className="px-2 text-sm">
                            You will receive a 6-digit code for your Email Address {agentEmail}
                        </p>
                    </div>
                    <div className="flex justify-around mt-8 lg:mt-4 mb-4">
                        <OtpInput
                            autoComplete="one-time-code"
                            value={otp}
                            onChange={(otp: string) => {
                                setOtpError('')
                                setOtp(otp);
                            }}
                            numInputs={6}
                            containerStyle="mx-auto"
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
                    <div className="lg:px-10 px-4">
                        <Button text='Verify' disabled={otp.toString().length < 6} handleClick={onAgentVerifyOtp} className='w-full' />
                    </div>
                    <div className="mt-4 text-center">
                        {timer === END_TIMER ? (
                            <p
                                className={`cursor-pointer underline text-sm font-semibold ${loadingSendOtp ? 'text-brand-primary/30' : 'text-brand-primary'}`}
                                onClick={() => {
                                    onAgentLogin();
                                    setOtp('');
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
                    </div>
                    <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                        <p className='text-xs lg:text-sm'>
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
        </>
    );
}