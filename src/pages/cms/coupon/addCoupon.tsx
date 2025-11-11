import React, { ReactNode, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { useForm, Controller } from 'react-hook-form';
import { useGetCouponMutation, useCreateCouponMutation } from '../../../services/cms/cms';
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from 'joi';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetItineraryMutation } from '../../../services/weekend/weekend';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';

type Props = {}
export type AddBannerForm = {
    type: string;
};

export const areChecked = (json: any, key: any) => {
    const hasKey = json.some((item: any) => item.key == key);
    return hasKey
};

const Portal = [
    { label: "B2C - Regular Flow", value: "b2c-normal-flow" },
    { label: "B2C - Weekend Flow", value: "b2c-weekend-flow" },
    { label: "B2C - Mobile App", value: "b2c-m" },
    { label: "B2C - Quotation Flow", value: "b2c-q" },
    { label: "B2B - Agent Portal", value: "b2b" },
]

const FareType = [
    { label: 'Special Fare', value: 'special_fare' },
    { label: 'Normal Fare', value: 'normal_fare' },
    // { label: 'Visa Fare', value: 'visa_fare' }
]

const ruleOption1 = [
    { label: 'In', value: 'In' }
];
const nightCountOption = [
    2, 3, 4, 5, 6
];
const paxType = [
    { label: 'Adult', value: 'ADULT' },
    { label: 'Child', value: 'CHILD' },
    { label: 'Infant', value: 'INFANT' },
];

const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#ffffff', marginTop: '4px', padding: '6px 0', border: '1px solid #E6E8EC', boxShadow: '0px 0.996px 20.6px 3px rgba(0, 0, 0, 0.06)' }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        zIndex: 999
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '100%',
        zIndex: 9999,
        fontSize: '14px'
    }),
    dropdownIndicator: (styles: any) => ({
        ...styles,
        padding: '1px'
    })
};

export default function AddCoupon({ }: Props) {

    let navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [discountType, setDiscountType] = useState('');
    const [nightCountValue, setNightCountValue] = useState('');
    const [jsonRule, setJsonRule] = useState<any>([]);
    const [itineraryList, setItineraryList] = useState<any>();
    const [bookingDateInputValue, setBookingDateInputValue] = useState<any>([null, null]);
    const [sailingDateInputValue, setSailingDateInputValue] = useState<any>([null, null]);

    const [bookingStartDate, bookingEndDate] = bookingDateInputValue;
    const [sailingStartDate, sailingEndDate] = sailingDateInputValue;

    const [getItinerary, { isLoading: loadingQuotationData }] = useGetItineraryMutation()
    const [createCoupon, { isLoading: loadingCreate }] = useCreateCouponMutation()

    useEffect(() => {
        setLoading(true)
        let url: any = `pagination=true`
        getItinerary(url)
            .unwrap()
            .then((res: any) => {
                let newArray = res.itineraries.map((item: any) => {
                    return {
                        ...item,
                        date: `${moment(item.start_date, 'DD/MM/YYYY').format('Do MMM')} - ${moment(item.end_date, 'DD/MM/YYYY').format('Do MMM')}`,
                        portName: item.ports
                            .map((item: any, index: any, arr: any) => {
                                if (item.name != 'At Sea') {
                                    const isLast = index === arr.length - 1;
                                    const name = isLast ? item.name : item.name + ` -`;
                                    return index === 0 || isLast ? `${name}` : `${name}`;
                                }
                            })
                            .join(" ")
                    }
                })

                setItineraryList(newArray)
            })
            .catch((res: any) => {
                setLoading(false)
                console.log('Error: ', res)
            })
    }, [])

    const schema = Joi.object({
        description: Joi.string().required(),
        coupon_code: Joi.string().pattern(/^[A-Za-z0-9]*$/).required().messages({
            'string.pattern.base': 'No special characters allowed',
            'string.empty': `Coupon code is required`,
            'any.required': 'Coupon code is required',
        }),
        limit_per_user: Joi.number().required().min(1).messages({
            'number.base': 'Limit per user must be a number',
            'number.empty': `Limit per user is required`,
            'number.min': 'Limit per user must be greater than 0.',
            'any.required': `Limit per user is required`
        }),
        applies_to: Joi.any().required(),
        portals: Joi.any().required(),
        discount_type: Joi.object({
            label: Joi.string().required(),
            value: Joi.string().required()
        }).required(),
        discount_pct: Joi.number().when('discount_type.value', {
            is: 'Percentage',
            then: Joi.number().required().max(100).min(1).messages({
                'number.base': 'Discount percentage must be a number',
                'number.empty': `Discount percentage is required`,
                'number.max': 'Discount percentage must not be greater than 100.',
                'number.min': 'Discount percentage must be greater than 0.',
                'any.required': `Discount percentage is required`
            }),
            otherwise: Joi.number()
        }),
        max_discount: Joi.number().when('discount_type.value', {
            is: 'Percentage',
            then: Joi.number().required().min(1).messages({
                'number.base': 'Discount amount must be a number',
                'number.empty': `Discount amount is required`,
                'number.min': 'Discount amount must be greater than 0.',
                'any.required': `Discount amount is required`
            }),
            otherwise: Joi.number()
        }),
        discount_amount: Joi.number().when('discount_type.value', {
            is: 'Flat',
            then: Joi.number().required().min(1).messages({
                'number.base': 'Discount amount must be a number',
                'number.empty': `Discount amount is required`,
                'number.min': 'Discount amount must be greater than 0.',
                'any.required': `Discount amount is required`
            }),
            otherwise: Joi.number()
        }),
        valid_from: Joi.any().required(),
        valid_till: Joi.any().required(),

        success_message: Joi.string().required(),
        is_public: Joi.any().optional(),
    });

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
        resolver: joiResolver(schema),
    });

    const AddJsonKey = (key: any, checked: any) => {
        if (checked) {
            let newRule = [...jsonRule]
            let rule = {
                "key": key,
                "operator": null,
                "value": null
            }
            newRule.push(rule)
            setJsonRule(newRule);
        } else {
            let newRule = [...jsonRule]
            const filteredArray = newRule.filter(item => item.key !== key);
            setJsonRule(filteredArray);
        }
    }
    const AddOperator = (key: any, value: any) => {
        let newRule = [...jsonRule]
        const updatedArray = newRule.map(item =>
            item.key === key ? { ...item, operator: value } : item
        );
        setJsonRule(updatedArray);
    }
    const AddJsonValueInArray = (key: any, states: any) => {
        setJsonRule((prevArray: any) =>
            prevArray.map((obj: any) =>
                obj.key === key
                    ? { ...obj, value: [...(obj.value || []), states] }
                    : obj
            )
        );
        setNightCountValue('')
    }
    const AddJsonValueInString = (key: any, states: any) => {
        setJsonRule((prevArray: any) =>
            prevArray.map((obj: any) =>
                obj.key === key
                    ? { ...obj, value: states }
                    : obj
            )
        );
    }
    const AddJsonValueInDate = (key: any, start: any, end: any, updateState: any) => {
        let date = `${moment(start).format('DD/MM/YYYY')}-${moment(end).format('DD/MM/YYYY')}`
        setJsonRule((prevArray: any) =>
            prevArray.map((obj: any) =>
                obj.key === key
                    ? { ...obj, value: [...(obj.value || []), date] }
                    : obj
            )
        );
        updateState([null, null])
    }

    const minNightOperator = jsonRule.find((obj: any) => obj.key === "night_count")?.operator;
    const minNightValue = jsonRule.find((obj: any) => obj.key === "night_count")?.value;

    const transactionAmountOperator = jsonRule.find((obj: any) => obj.key === "transaction_amount")?.operator;
    const transactionAmountValue = jsonRule.find((obj: any) => obj.key === "transaction_amount")?.value;

    const itineraryOperator = jsonRule.find((obj: any) => obj.key === "itineraries")?.operator;
    const itineraryValue = jsonRule.find((obj: any) => obj.key === "itineraries")?.value;

    const paxTypeOperator = jsonRule.find((obj: any) => obj.key === "pax_types")?.operator;
    const paxTypeValue = jsonRule.find((obj: any) => obj.key === "pax_types")?.value;

    const minPaxOperator = jsonRule.find((obj: any) => obj.key === "minimum_pax_count")?.operator;
    const minPaxValue = jsonRule.find((obj: any) => obj.key === "minimum_pax_count")?.value;

    const minPaxCabinOperator = jsonRule.find((obj: any) => obj.key === "minimum_pax_count_per_cabin")?.operator;
    const minPaxCabinValue = jsonRule.find((obj: any) => obj.key === "minimum_pax_count_per_cabin")?.value;

    const bookingDateOperator = jsonRule.find((obj: any) => obj.key === "booking_dates")?.operator;
    const bookingDateValue = jsonRule.find((obj: any) => obj.key === "booking_dates")?.value;

    const sailingDateOperator = jsonRule.find((obj: any) => obj.key === "sailing_dates")?.operator;
    const sailingDateValue = jsonRule.find((obj: any) => obj.key === "sailing_dates")?.value;

    const onSubmit = (data: any) => {
        let ruleValidation = false
        for (let rule of jsonRule) {
            if (rule.operator === null || rule.value === null) {
                ruleValidation = true
                rule.errorMessage = "Error: Operator or value is null";
            } else {
                delete rule.errorMessage;
            }
        }

        console.log('roh aa', jsonRule, ruleValidation);
        if (!ruleValidation) {
            const applies_to = data.applies_to.map((item: any) => item.value);
            const portals = data.portals.map((item: any) => item.value);

            let couponObject = {
                "description": data.description,
                "discount_type": data.discount_type.value,
                "discount_amount": +data.discount_amount || null,
                "coupon_code": data.coupon_code,
                "applies_to": applies_to,
                "portals": portals,
                "discount_pct": +data.discount_pct || null,
                "max_discount": +data.max_discount || null,
                "limit_per_user": data.limit_per_user,
                "is_public": data.is_public || false,
                "active": true,
                "success_message": data.success_message,
                "valid_from": moment(data.valid_from, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z (zz)').format('YYYY-MM-DD HH:mm:ss Z'),
                "valid_till": moment(data.valid_till, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z (zz)').format('YYYY-MM-DD HH:mm:ss Z'),
                "rules_json": jsonRule,
            }

            const _payload = {
                coupon: couponObject
            }

            createCoupon(_payload)
                .unwrap()
                .then((res: any) => {
                    localStorage.setItem('toasterShown', 'true');
                    navigate('/cms/coupon')
                })
                .catch((res: any) => {
                    console.log('Error: ', res);
                    if (res.status == 401) {
                        navigate('/cms/login')
                    }
                });
        }
    }

    function checkError(key: any) {
        const rule = jsonRule.find(r => r.key == key);
        if (rule && rule.errorMessage) {
            return rule.errorMessage;
        }
    }

    // console.log('roh json rule', jsonRule);
    return (
        <Layout>
            <div className='flex justify-between'>
                <p className='text-2xl font-semibold'>Add Coupon</p>
                <div onClick={() => navigate('/cms/coupon')} className='flex items-center cursor-pointer font-bold text-sm gap-1 bg-[#e6f7f9] border-[2px] border-brand-sky px-3 py-1.5 text-brand-sky rounded-lg'>
                    <p>List</p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-5 mt-5 shadow-allSide px-6 py-6 rounded'>

                <form className='' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Coupon Message *</label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type='text'
                                        {...field}
                                        placeholder="Coupon Message"
                                        className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                    />
                                )}
                            />
                            {errors && errors?.description ? <p className="text-xs text-danger mt-1">Coupon message is required</p> : null}
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Coupon Code *</label>
                            <Controller
                                name="coupon_code"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type='text'
                                        {...field}
                                        placeholder="Coupon Code"
                                        className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                    />
                                )}
                            />
                            {errors && errors?.coupon_code ? <p className="text-xs text-danger mt-1">{errors?.coupon_code?.message}</p> : null}
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Limit Per User *</label>
                            <Controller
                                name="limit_per_user"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type='text'
                                        {...field}
                                        placeholder="Limit Per User"
                                        className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                    />
                                )}
                            />
                            {errors && errors?.limit_per_user ? <p className="text-xs text-danger mt-1">{errors?.limit_per_user?.message}</p> : null}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Fare Type *</label>
                            <Controller
                                name="applies_to"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={FareType}
                                        placeholder={<p className='text-xs lg:text-sm'>Select...</p>}
                                        styles={customStyles}
                                    />
                                )}
                            />
                            {errors && errors?.applies_to ? <p className="text-xs text-danger mt-1">Fare type is required</p> : null}
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Booking Portal *</label>
                            <Controller
                                name="portals"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={Portal}
                                        placeholder={<p className='text-xs lg:text-sm'>Select...</p>}
                                        styles={customStyles}
                                    />
                                )}
                            />
                            {errors && errors?.portals ? <p className="text-xs text-danger mt-1">Booking portal is required</p> : null}
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Discount Type *</label>
                            <Controller
                                name="discount_type"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={[
                                            { label: 'Flat', value: 'Flat' },
                                            { label: 'Percentage', value: 'Percentage' },
                                        ]}
                                        onChange={(v) => {
                                            setDiscountType(v.value)
                                            setValue('discount_type', v)
                                        }}
                                        placeholder={<p className='text-xs lg:text-sm'>Select...</p>}
                                        styles={customStyles}
                                    />
                                )}
                            />
                            {errors && errors?.discount_type ? <p className="text-xs text-danger mt-1">Discount type is required</p> : null}
                        </div>
                        {discountType == 'Flat' ? (
                            <>
                                <div>
                                    <label className='text-sm font-medium text-gray-100'>Discount Amount *</label>
                                    <Controller
                                        name="discount_amount"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type='text'
                                                {...field}
                                                placeholder="Maximum Discount Amount"
                                                className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                            />
                                        )}
                                    />
                                    {errors && errors?.discount_amount ? <p className="text-xs text-danger mt-1">{errors?.discount_amount?.message}</p> : null}
                                </div>
                            </>
                        ) : discountType == 'Percentage' ? (
                            <>
                                <div>
                                    <label className='text-sm font-medium text-gray-100'>Discount % *</label>
                                    <Controller
                                        name="discount_pct"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type='text'
                                                {...field}
                                                placeholder="Discount Percentage"
                                                className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                            />
                                        )}
                                    />
                                    {errors && errors?.discount_pct ? <p className="text-xs text-danger mt-1">{errors?.discount_pct?.message}</p> : null}
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-100'>Maximum Discount Amount *</label>
                                    <Controller
                                        name="max_discount"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type='text'
                                                {...field}
                                                placeholder="Maximum Discount Amount"
                                                className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                            />
                                        )}
                                    />
                                    {errors && errors?.max_discount ? <p className="text-xs text-danger mt-1">Maximum discount amount is required</p> : null}
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium text-gray-100'>Valid From *</label>
                            <Controller
                                name="valid_from"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 48 48"
                                            >
                                                <mask id="ipSApplication0">
                                                    <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                                        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                                        <path
                                                            fill="#fff"
                                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                                        ></path>
                                                    </g>
                                                </mask>
                                                <path
                                                    fill="currentColor"
                                                    d="M0 0h48v48H0z"
                                                    mask="url(#ipSApplication0)"
                                                ></path>
                                            </svg>
                                        }
                                        showIcon
                                        className='border border-gray-300 bg-white shadow-allSide w-full !py-3 mt-1 rounded'
                                    />
                                )}
                            />
                            {errors && errors?.valid_from ? <p className="text-xs text-danger mt-1">Valid from is required</p> : null}
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium text-gray-100'>Valid Till *</label>
                            <Controller
                                name="valid_till"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 48 48"
                                            >
                                                <mask id="ipSApplication0">
                                                    <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                                        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                                        <path
                                                            fill="#fff"
                                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                                        ></path>
                                                    </g>
                                                </mask>
                                                <path
                                                    fill="currentColor"
                                                    d="M0 0h48v48H0z"
                                                    mask="url(#ipSApplication0)"
                                                ></path>
                                            </svg>
                                        }
                                        showIcon
                                        className='border border-gray-300 bg-white shadow-allSide w-full !py-3 mt-1 rounded'
                                    />
                                )}
                            />
                            {errors && errors?.valid_till ? <p className="text-xs text-danger mt-1">Valid till is required</p> : null}
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-100'>Success Message *</label>
                            <Controller
                                name="success_message"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type='text'
                                        {...field}
                                        placeholder="Success Message"
                                        className='px-3 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                    />
                                )}
                            />
                            {errors && errors?.success_message ? <p className="text-xs text-danger mt-1">Success message is required</p> : null}
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-100 mr-3'>For Public</label>
                            <Controller
                                name="is_public"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (e.target.checked) {
                                                setValue('is_public', true)
                                            } else {
                                                setValue('is_public', false)
                                            }
                                        }}
                                    />
                                )}
                            />
                            {errors && errors?.is_public ? <p className="text-xs text-danger mt-1">Select is public</p> : null}
                        </div>
                    </div>

                    <div className='border-t border-gray-300 my-6' />
                    <div className=''>
                        <h1 className='text-xl'>Coupon Rule</h1>
                    </div>
                    {/* Night Counts */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('night_count', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Minimum nights in booking</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={minNightOperator || ''}
                                onChange={(e) => AddOperator('night_count', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="in">In</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center mt-2 flex-wrap'>
                                {nightCountOption.map((val) => (
                                    <div className='flex items-center mb-0.5 mr-0.5 px-5 py-2 shadow-allSide border border-gray-300 rounded-full'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            value={val}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (e.target.checked) {
                                                    setJsonRule((prevArray: any) =>
                                                        prevArray.map((obj: any) =>
                                                            obj.key === 'night_count'
                                                                ? { ...obj, value: [...(obj.value || []), value] }
                                                                : obj
                                                        )
                                                    );
                                                } else {
                                                    setJsonRule((prevArray: any) =>
                                                        prevArray.map((obj: any) =>
                                                            obj.key === 'night_count'
                                                                ? { ...obj, value: obj.value.filter((item: any) => item !== value) }
                                                                : obj
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        <p className='ml-2'>{val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {checkError('night_count') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Booking Date */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('booking_dates', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Booking Date</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={bookingDateOperator || ''}
                                onChange={(e) => AddOperator('booking_dates', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="in">In</option>
                                <option value="not in">Not In</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center w-full'>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={bookingStartDate}
                                    endDate={bookingEndDate}
                                    onChange={(date) => {
                                        if (date[0] && date[1]) {
                                            AddJsonValueInDate('booking_dates', date[0], date[1], setBookingDateInputValue)
                                        } else {
                                            setBookingDateInputValue(date)
                                        }
                                    }}
                                    placeholderText='Date'
                                    className='border border-gray-300 bg-white shadow-allSide w-full !py-3 mt-1 rounded'
                                />
                            </div>
                            <div className='flex flex-wrap mt-1'>
                                {bookingDateValue && bookingDateValue.map((v: any) => <p className='border mr-2 px-2 mb-0.5'>{v}</p>)}
                            </div>
                        </div>
                        {checkError('booking_dates') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Sailing Date */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('sailing_dates', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Sailing Date</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={sailingDateOperator || ''}
                                onChange={(e) => AddOperator('sailing_dates', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="in">In</option>
                                <option value="not in">Not In</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center w-full'>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={sailingStartDate}
                                    endDate={sailingEndDate}
                                    onChange={(date) => {
                                        if (date[0] && date[1]) {
                                            AddJsonValueInDate('sailing_dates', date[0], date[1], setSailingDateInputValue)
                                        } else {
                                            setSailingDateInputValue(date)
                                        }
                                    }}
                                    placeholderText='Date'
                                    className='border border-gray-300 bg-white shadow-allSide w-full !py-3 mt-1 rounded'
                                />
                            </div>
                            <div className='flex flex-wrap mt-1'>
                                {sailingDateValue && sailingDateValue.map((v: any) => <p className='border mr-2 px-2 mb-0.5'>{v}</p>)}
                            </div>
                        </div>
                        {checkError('sailing_dates') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Transaction Amount */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('transaction_amount', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Transaction Amount</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={transactionAmountOperator || ''}
                                onChange={(e) => AddOperator('transaction_amount', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="equals">Equal</option>
                                <option value="gt">Greater than</option>
                                <option value="gte">Greater than or equal</option>
                                <option value="lt">Less than</option>
                                <option value="lte">Less than or equal</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center'>
                                <input
                                    value={transactionAmountValue}
                                    type='text'
                                    placeholder="Enter Value"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^\.0-9]/g, '')
                                        AddJsonValueInString('transaction_amount', value)
                                    }
                                    }
                                    className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                />
                            </div>
                        </div>
                        {checkError('transaction_amount') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Itineraries */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('itineraries', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Itinerary</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={itineraryOperator || ''}
                                onChange={(e) => AddOperator('itineraries', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="in">In</option>
                                <option value="not in">Not In</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center'>
                                <select
                                    className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                    onChange={(e) => AddJsonValueInArray('itineraries', e.target.value)}
                                >
                                    <option value="" disabled selected>Select an option</option>
                                    {itineraryList && itineraryList.map((v: any, i: any) => (
                                        <option value={v.seq_no}>{v.seq_no}: {v.portName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-wrap mt-1'>
                                {itineraryValue && itineraryValue.map((v: any) => <p className='border mr-2 px-2 mb-0.5'>{v}</p>)}
                            </div>
                        </div>
                        {checkError('itineraries') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Pax type */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('pax_types', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Pax Type</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={paxTypeOperator || ''}
                                onChange={(e) => AddOperator('pax_types', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="in">In</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center mt-2 flex-wrap'>
                                {paxType.map((val) => (
                                    <div className='flex items-center mb-0.5 mr-0.5 px-5 py-2 shadow-allSide border border-gray-300 rounded-full'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            value={val.value}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (e.target.checked) {
                                                    setJsonRule((prevArray: any) =>
                                                        prevArray.map((obj: any) =>
                                                            obj.key === 'pax_types'
                                                                ? { ...obj, value: [...(obj.value || []), value] }
                                                                : obj
                                                        )
                                                    );
                                                } else {
                                                    setJsonRule((prevArray: any) =>
                                                        prevArray.map((obj: any) =>
                                                            obj.key === 'pax_types'
                                                                ? { ...obj, value: obj.value.filter((item: any) => item !== value) }
                                                                : obj
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        <p className='ml-2'>{val.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {checkError('pax_types') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Minimum pax count */}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('minimum_pax_count', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Minimum Pax Count</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={minPaxOperator || ''}
                                onChange={(e) => AddOperator('minimum_pax_count', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="equals">Equal</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center'>
                                <input
                                    value={minPaxValue}
                                    type='text'
                                    placeholder="Enter Value"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^\.0-9]/g, '')
                                        AddJsonValueInString('minimum_pax_count', value)
                                    }
                                    }
                                    className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                />
                            </div>
                        </div>
                        {checkError('minimum_pax_count') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Minimum pax count per cabin*/}
                    <div className='grid grid-cols-7 gap-x-4 mt-4 items-start border border-gray-300 py-2 px-4 rounded shadow-allSide'>
                        <div className='flex items-center col-span-2 mt-9'>
                            <input
                                type="checkbox"
                                className="mr-3 cursor-pointer"
                                onChange={(e) => AddJsonKey('minimum_pax_count_per_cabin', e.target.checked)}
                            />
                            <p className='text-lg font-medium text-gray-100'>Minimum Pax Count Per Cabin</p>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium text-gray-100'>Operator</label>
                            <select
                                className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                value={minPaxCabinOperator || ''}
                                onChange={(e) => AddOperator('minimum_pax_count_per_cabin', e.target.value)}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="equals">Equal</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm font-medium text-gray-100'>Value</label>
                            <div className='flex items-center'>
                                <input
                                    value={minPaxCabinValue}
                                    type='text'
                                    placeholder="Enter Value"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^\.0-9]/g, '')
                                        AddJsonValueInString('minimum_pax_count_per_cabin', value)
                                    }
                                    }
                                    className='px-3 mr-2 placeholder:text-gray-100/[0.62] border border-gray-300 mt-1 shadow-allSide rounded-md text-sm !py-3 lg:text-base placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full'
                                />
                            </div>
                        </div>
                        {checkError('minimum_pax_count_per_cabin') ?
                            <div className='col-span-7'>
                                <p className='text-sm font-medium text-danger'>This section cannot be empty!</p>
                            </div>
                            : null
                        }
                    </div>
                    <div className='col-span-2 mt-4'>
                        <button className='py-4 px-4 disabled:bg-brand-primary/30 bg-brand-primary text-white rounded'>Submit</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </Layout>
    );
}