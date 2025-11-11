import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import { useForm } from 'react-hook-form';
import Select from "react-select";
import PhoneCode from "/src/components/UI/Forms/Inputs/phoneCodes.json";
import { useSendEnquiryMutation } from '/src/services/auth/auth';
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export type RegistrationFormFields = {
    fullName: string;
    email: string;
    phoneNumber: string;
};

const enquiry = [
    { code: 'cruise_wedding', name: 'Cruise wedding' },
    { code: 'group_booking', name: 'Group booking' },
    { code: 'corporate_event', name: 'Corporate event' },
]

const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#ffffff', border: '2px solid #ccc', height: '48px' }),
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
    dropdownIndicator: (styles: any) => ({
        ...styles,
        padding: '1px'
    })
};

export default function PaymentSuccess({ }: Props) {
    const [sendEnquiry, response] = useSendEnquiryMutation();
    const [country, setCountry] = useState('+91');
    const [enquiryAbout, setEnquiryAbout] = useState('cruise_wedding');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<RegistrationFormFields>({
        mode: 'onChange',
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: ""
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    let weddingImg = '';
    let groupImg = '';
    let corporateImg = '';
    if (width && width >= 640) {
        weddingImg = 'https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-weddings-desktop.webp';
        groupImg = 'https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-mumbai-itinerary-desktop-image-01.webp';
        corporateImg = 'https://images.cordeliacruises.com/cordelia_v2/public/images/corporate-bookings-desktop.webp';
    } else {
        weddingImg = 'https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-weddings-mobile.webp';
        groupImg = 'https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-mumbai-itinerary-mobile-image-01.webp';
        corporateImg = 'https://images.cordeliacruises.com/cordelia_v2/public/images/corporate-bookings-mobile.webp';
    }

    const onSubmit = (contact: any) => {
        const _payload = {
            name: contact.fullName,
            email: contact.email,
            phone_number: contact.phoneNumber,
            country_code: country,
            booking_type: enquiryAbout
        };

        sendEnquiry(_payload)
            .unwrap()



    }

    // console.log('res', response);
    return (
        <Layout>
            <main className="container mx-auto pt-24 pb-14 lg:pt-36 lg:pb-24 px-3">
                <h1 className='text-2xl lg:text-5xl font-semibold'>Group Cruise Bookings</h1>
                {/* <p className='text-sm lg:text-2xl font-medium mt-2 lg:mt-6'>Book 5 rooms or more rooms with Cordelia Cruises</p> */}
                <div className='rounded-lg border-2 border-gray-300/40 shadow-md mt-7 lg:mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2'>
                    <div className='py-5 px-4'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='text-xl lg:text-3xl font-semibold'>Plan your Group Cruise Today</h2>
                            <div className='mt-5 lg:mt-10'>
                                <p className='text-sm lg:text-lg lg:font-semibold font-medium mb-2 lg:mb-4'>Full Name</p>
                                <input
                                    type="text"
                                    className='rounded-md text-sm py-3 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-2 border-gray-100/30 w-full'
                                    placeholder='Full Name'
                                    {...register("fullName", {
                                        required: true
                                    })}
                                />
                                {errors && errors.fullName && <p className='text-xs text-brand-primary'>Enter full name</p>}
                            </div>
                            <div className='mt-5 lg:mt-7'>
                                <p className='text-sm lg:text-lg lg:font-semibold font-medium mb-2 lg:mb-4'>Mobile Number</p>
                                <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                                    <div className="lg:col-span-2 col-span-3">
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
                                    <div className="lg:col-span-7 col-span-7">
                                        <input
                                            className={`rounded-md text-sm py-3 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-2 border-gray-100/30 w-full`}
                                            type="text"
                                            placeholder="Mobile Number"
                                            {...register("phoneNumber", {
                                                required: true, minLength: 10,
                                                maxLength: 10
                                            })}
                                        ></input>
                                        {errors && errors.phoneNumber && <p className='text-xs text-brand-primary'>Enter 10 digit mobile number.</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 lg:mt-7'>
                                <p className='text-sm lg:text-lg lg:font-semibold font-medium mb-2 lg:mb-4'>Email</p>
                                <input
                                    type="email"
                                    className='rounded-md text-sm py-3 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-2 border-gray-100/30 w-full'
                                    placeholder='Email'
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        },
                                    })}
                                />
                                {errors && errors.email && <p className='text-xs text-brand-primary'>Enter correct email</p>}
                            </div>
                            <div className='mt-5 lg:mt-7'>
                                <p className='text-sm lg:text-lg lg:font-semibold font-medium mb-2 lg:mb-4'>Enquiring about</p>
                                {enquiry.map((val, i) =>
                                    <div key={i} className='flex items-center mb-1 lg:mb-3 cursor-pointer' onClick={() => setEnquiryAbout(val.code)}>
                                        {val.code === enquiryAbout ?
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg"
                                                className="h-3 lg:h-5 mr-2 cursor-pointer"
                                                alt="CordeliaCruises"
                                                title='Cordelia-Cruises'
                                            /> :
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg"
                                                className="h-3 lg:h-5 mr-2 cursor-pointer"
                                                alt="CordeliaCruises"
                                                title='Cordelia-Cruises'
                                            />
                                        }
                                        <p className='text-sm lg:text-lg font-semibold text-brand-primary'>{val.name}</p>
                                    </div>
                                )}
                                {/* <button
                                    disabled={response.isLoading}
                                    className='w-full text-sm lg:text-lg text-white bg-brand-primary rounded py-3 lg:py-4 mt-4 lg:mt-6'>
                                    Submit
                                </button> */}
                                <button
                                    disabled={response.isLoading}
                                    className={`w-full text-sm lg:text-lg text-white rounded py-3 lg:py-4 mt-4 lg:mt-6 inline-flex items-center justify-center px-3 ${response.isLoading ? 'bg-brand-primary/30' : 'bg-brand-primary'}`}>
                                    {response.isLoading && <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>}
                                    Submit
                                </button>
                                {response.isSuccess && <p className='text-xs text-center font-semibold mt-2 text-brand-primary'>Message successfully sent!</p>}
                            </div>
                        </form>
                    </div>
                    <div className='hidden lg:inline-block'>
                        <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/images/form-image-desktop.webp"
                            className="w-full"
                            alt="CruiseImage"
                            title='CordeliaCruiseImage'
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-10 lg:mt-16'>
                    <div className='rounded border-2 border-gray-300/40 shadow-md mt-7'>
                        <img className='w-full h-[200px] rounded' src='https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-weddings-desktop.webp' />
                        <div className='px-4 py-5'>
                            <h3 className='text-xl font-semibold mb-3'>Cruise Wedding</h3>
                            <div className='flex items-center mb-2'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="CordeliaCruises"
                                    title='Cordelia-Cruises'
                                />
                                <a href="tel:+912268811111" className='text-sm font-semibold'>+9122 68811111</a>
                            </div>
                            <div className='flex items-center mb-2'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp-icon.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="Cruises"
                                    title='Chat-with-us'
                                />
                                <a href="https://wa.me/7738850000" className='text-sm font-semibold'>7738850000</a>
                            </div>
                            <div className='flex items-center mb-4'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="Email"
                                    title='write-to-us'
                                />
                                <a href="mailto:weddings@cordeliacruises.com" className='text-sm font-semibold'>weddings@cordeliacruises.com</a>
                            </div>
                            <p className='text-xs font-semibold text-gray-100'>Open Mon-Sun 9 AM - 9 PM </p>
                        </div>
                    </div>
                    <div className='rounded border-2 border-gray-300/40 shadow-md mt-7'>
                        <img className='w-full h-[200px] rounded' src='https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-mumbai-itinerary-desktop-image-01.webp' />
                        <div className='px-4 py-5'>
                            <h3 className='text-xl font-semibold mb-3'>Group Bookings</h3>
                            <div className='flex items-center mb-2'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="CordeliaCruises"
                                    title='Cordelia-Cruises'
                                />
                                <a href="tel:+912268811111" className='text-sm font-semibold'>+9122 68811111</a>
                            </div>
                            <div className='flex items-center mb-2'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp-icon.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="Cruises"
                                    title='Chat-with-us'
                                />
                                <a href="https://wa.me/7738850000" className='text-sm font-semibold'>7738850000</a>
                            </div>
                            <div className='flex items-center mb-4'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="Email"
                                    title='write-to-us'
                                />
                                <a href="mailto:groups@cordeliacruises.com" className='text-sm font-semibold'>groups@cordeliacruises.com</a>
                            </div>
                            <p className='text-xs font-semibold text-gray-100'>Open Mon-Sun 9 AM - 9 PM </p>
                        </div>
                    </div>
                    <div className='rounded border-2 border-gray-300/40 shadow-md mt-7'>
                        <img className='w-full h-[200px] rounded' src='https://images.cordeliacruises.com/cordelia_v2/public/images/corporate-bookings-desktop.webp' alt='Corporate event' title='Group-events-Cordelia-Cruise' />
                        <div className='px-4 py-5'>
                            <h3 className='text-xl font-semibold mb-3'>Corporate Bookings</h3>
                            <div className='flex items-center mb-2'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="CordeliaCruises"
                                    title='Cordelia-Cruises'
                                />
                                <a href="tel:+912268811111" className='text-sm font-semibold'>+9122 68811111</a>
                            </div>
                            <div className='flex items-center mb-2'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp-icon.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="Cruises"
                                    title='Chat-with-us'
                                />
                                <a href="https://wa.me/7738850000" className='text-sm font-semibold'>7738850000</a>
                            </div>
                            <div className='flex items-center mb-4'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail.svg"
                                    className="h-3 lg:h-4 mr-2"
                                    alt="Email"
                                    title='write-to-us'
                                />
                                <a href="mailto:corporates@cordeliacruises.com" className='text-sm font-semibold'>corporates@cordeliacruises.com</a>
                            </div>
                            <p className='text-xs font-semibold text-gray-100'>Open Mon-Sun 9 AM - 9 PM </p>
                        </div>
                    </div>
                </div>
                <div className='mt-10 lg:py-10 text-center'>
                    <p className='text-sm lg:text-2xl italic text-center font-semibold'>Our Travel partners can connect with us at</p>
                    <a href="mailto:travelpartners@cordeliacruises.com" className='text-sm lg:text-2xl italic text-center text-brand-primary font-semibold'>travelpartners@cordeliacruises.com</a>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}