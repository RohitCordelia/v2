import React, { ReactNode, useEffect, useState, useRef } from 'react'
import Select from "react-select";
import PhoneCode from "../../../components/UI/Forms/Inputs/phoneCodes.json";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from 'joi';
import { useForm, Controller } from 'react-hook-form';
import { useSaveEnquiryGuestMutation, useSaveEnquiryAgentMutation } from '../../../services/groupEnquiry/groupEnquiry';
import OtpInput from 'react18-input-otp';
import { useGetItineraryMutation } from '../../../services/weekend/weekend';
import moment from 'moment';
import { SaveEnquiry, GetEnquiry } from '../../../utils/store/store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {}

export type RegistrationFormFields = {
    fullName: string;
    email: string;
    phoneNumber: string;
};

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

export default function AgentEnquiry({ onSuccess }: any) {
    const [getItinerary, { isLoading: loadingQuotationData }] = useGetItineraryMutation()
    const [saveEnquiryGuest, { isLoading: loadingGuestEnquiry }] = useSaveEnquiryGuestMutation()
    const [enquiryAgent, { isLoading: loadingAgentEnquiry }] = useSaveEnquiryAgentMutation()
    const [destination, setDestination] = useState<any>();
    const [country, setCountry] = useState('+91');
    const EnquiryStore = GetEnquiry();

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

    useEffect(() => {
        if (EnquiryStore && EnquiryStore.agent) {
            setValue('first_name', EnquiryStore.agent.first_name)
            setValue('last_name', EnquiryStore.agent.last_name)
            setValue('email', EnquiryStore.agent.email)
            setValue('mobile', EnquiryStore.agent.phone_number)
        }
    }, [EnquiryStore])

    const onSubmit = (data: any) => {
        const guestData = {
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

        if (EnquiryStore?.internal_agent) {
            let _payload = {
                ...guestData,
                requested_by: data?.email
            };

            saveEnquiryGuest(_payload)
                .unwrap()
                .then((res: any) => {
                    if (res && res?.data && res?.data?.number) {
                        onSuccess(res?.data?.number)
                    }
                })
                .catch((res: any) => {
                    console.log('Error: ', res)
                })
        } else {
            let _payload = {
                token: EnquiryStore?.login_response?.token || null,
                data: guestData
            };
            enquiryAgent(_payload)
                .unwrap()
                .then((res: any) => {
                    if (res && res?.data && res?.data?.number) {
                        onSuccess(res?.data?.number)
                    }
                })
                .catch((res: any) => {
                    console.log('Error: ', res)
                })
        }
    }

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
                                placeholder="Requester's First Name"
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
                                placeholder="Requester's Last Name"
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
                                placeholder="Requester's Email"
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
                                    render={({ field }) => (
                                        <input
                                            type='text'
                                            {...field}
                                            placeholder="Requester's Mobile Number"
                                            className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
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
                                placeholder="Number of Cabins (minimum 16 cabins required)"
                                className='bg-[#f6f6f6] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.cabin_count && <p className="text-xs text-danger mt-1">{errors?.cabin_count?.message}</p>}
                </div>
            </div>
            <div className='mt-6'>
                <button
                    disabled={loadingGuestEnquiry || loadingAgentEnquiry}
                    className='w-full py-3 px-4 disabled:bg-brand-primary/30 bg-brand-primary text-white rounded'
                >
                    {loadingGuestEnquiry || loadingAgentEnquiry ? 'Loading' : 'Submit'}
                </button>
            </div>
        </form>
    );
}