import React, { ReactNode, useEffect, useState, useRef } from 'react'
import Select from "react-select";
import PhoneCode from "../../../components/UI/Forms/Inputs/phoneCodes.json";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from 'joi';
import { useForm, Controller } from 'react-hook-form';
import { useVerifyGSTINMutation, useVerifyPanMutation, useSaveAgentMutation } from '../../../services/groupEnquiry/groupEnquiry';
import { SaveEnquiry, GetEnquiry } from '../../../utils/store/store';
const ReactPlayer = React.lazy(() => import("react-player/youtube"));

type Props = {}

export type RegistrationFormFields = {
    fullName: string;
    email: string;
    phoneNumber: string;
};

export default function RegisterAgent({ guestType, setGuestType, onRegister }: any) {
    const [country, setCountry] = useState('+91');
    const [isGstVerified, setIsGstVerified] = useState<any>(false);
    const [gstVerifiedFailMsg, setGstVerifiedFailMsg] = useState<any>('');
    const [isGstLoading, setIsGstLoading] = useState<any>(false);
    const [isPanVerified, setIsPanVerified] = useState<any>(null);
    const [panVerifiedFailMsg, setPanVerifiedFailMsg] = useState<any>('');
    const [isPanLoading, setIsPanLoading] = useState<any>(false);
    const [verifyGSTIN] = useVerifyGSTINMutation()
    const [verifyPan] = useVerifyPanMutation()
    const [saveAgent, { isLoading: loadingSaveAgent }] = useSaveAgentMutation()
    const EnquiryStore = GetEnquiry();

    const customStyles = {
        control: (styles: any) => ({ ...styles, backgroundColor: '#f5f5f5', height: '49px', border: 0 }),
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

    const schema = Joi.object({
        first_name: Joi.string().required().messages({
            'string.empty': `First name cannot be empty`,
            'any.required': `First name is required`
        }),
        last_name: Joi.string().required().messages({
            'string.empty': `Last name cannot be empty`,
            'any.required': `Last name is required`
        }),
        travel_agency_attributes: Joi.string().required().messages({
            'string.empty': `Company Name cannot be empty`,
            'any.required': `Company Name is required`
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
        gstin: Joi.string()
            .pattern(/^[A-Z0-9]{15}$/i)
            .required()
            .messages({
                'string.pattern.base': 'GSTIN must be a 15-character alphanumeric value.',
                'string.empty': 'GSTIN cannot be empty.',
                'any.required': 'GSTIN is required.',
            }),
        pan: Joi.string()
            .pattern(/^[A-Z0-9]{10}$/i)
            .required()
            .messages({
                'string.pattern.base': 'Pan must be a 15-character alphanumeric value.',
                'string.empty': 'Pan cannot be empty.',
                'any.required': 'Pan is required.',
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
        resolver: joiResolver(schema),
        defaultValues: {
            email: EnquiryStore.agentEmail,
            first_name: '',
            pan: '',
            travel_agency_attributes: '',
            last_name: '',
            mobile: '',
            gstin: ''
        }
    });
    const onSubmit = (data: any) => {
        const _payload = {
            "verification_id": EnquiryStore?.verificationId,
            "first_name": data?.first_name,
            "last_name": data?.last_name,
            "email": data?.email,
            "country_code": country,
            "phone_number": data?.mobile,
            "pan": data?.pan,
            "gstin": data?.gstin,
            "travel_agency_attributes": {
                "name": data?.travel_agency_attributes
            }
        }
        saveAgent(_payload)
            .unwrap()
            .then((res: any) => {
                console.log('roh res', res);
                SaveEnquiry(_payload)
                onRegister()
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
    }

    const checkVerifyGST = (e: any) => {
        if (e && e.length == 15) {
            setIsGstLoading(true)
            const _payload = {
                gstin: e
            };
            verifyGSTIN(_payload)
                .unwrap()
                .then((res: any) => {
                    setIsGstVerified(true)
                    setGstVerifiedFailMsg('Verified')
                    setIsGstLoading(false)
                })
                .catch((res: any) => {
                    setIsGstLoading(false)
                    setGstVerifiedFailMsg('Invalid GSTIN')
                    setIsGstVerified(false)
                    console.log('Error: ', res);
                });
        } else {
            setIsGstLoading(false)
            setIsGstVerified(false)
            setGstVerifiedFailMsg('')
        }
    }

    const checkVerifyPan = (e: any) => {
        if (e && e.length == 10) {
            setIsPanLoading(true)
            const _payload = {
                pan: e
            };
            verifyPan(_payload)
                .unwrap()
                .then((res: any) => {
                    setIsPanVerified(true)
                    setPanVerifiedFailMsg('Verified')
                    setIsPanLoading(false)
                })
                .catch((res: any) => {
                    setIsPanLoading(false)
                    setPanVerifiedFailMsg('Invalid Pan Number')
                    setIsPanVerified(false)
                    console.log('Error: ', res);
                });
        } else {
            setIsPanLoading(false)
            setIsPanVerified(false)
            setPanVerifiedFailMsg('')
        }
    }

    return (
        <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
            <p className='text-xl font-bold'>Register</p>
            <div className='grid grid-cols-1 gap-4 mt-4 overflow-hidden overflow-y-scroll lg:max-h-[calc(100vh-500px)] no-scrollbar'>
                <div className=''>
                    <Controller
                        name="gstin"
                        control={control}
                        render={({ field }) => (
                            <div className='flex w-full items-center relative '>
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="GST Number"
                                    className="bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0"
                                    onChange={(e) => {
                                        setValue('gstin', e.target.value)
                                        checkVerifyGST(e.target.value)
                                        if (/^[A-Z0-9]{15}$/i.test(e.target.value)) {
                                            clearErrors('gstin');
                                        }
                                    }}
                                />
                                {isGstLoading &&
                                    <div role="status" className='absolute right-2'>
                                        <svg aria-hidden="true" className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                }
                            </div>
                        )}
                    />
                    {errors?.gstin && <p className="text-xs text-danger mt-1">{errors?.gstin?.message}</p>}
                    <p className={`${isGstVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mt-0.5`}>{gstVerifiedFailMsg}</p>
                </div>
                <div className=''>
                    <Controller
                        name="pan"
                        control={control}
                        render={({ field }) => (
                            <div className='flex w-full items-center relative '>
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="Pan Number"
                                    className="bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0"
                                    onChange={(e) => {
                                        setValue('pan', e.target.value)
                                        checkVerifyPan(e.target.value)
                                        if (/^[A-Z0-9]{10}$/i.test(e.target.value)) {
                                            clearErrors('pan');
                                        }
                                    }}
                                />
                                {isPanLoading &&
                                    <div role="status" className='absolute right-2'>
                                        <svg aria-hidden="true" className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                }
                            </div>
                        )}
                    />
                    {errors?.pan && <p className="text-xs text-danger mt-1">{errors?.pan?.message}</p>}
                    <p className={`${isPanVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mt-0.5`}>{panVerifiedFailMsg}</p>
                </div>
                <div className=''>
                    <Controller
                        name="travel_agency_attributes"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder="Company Name"
                                className='bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.travel_agency_attributes && <p className="text-xs text-danger mt-1">{errors?.travel_agency_attributes?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                placeholder="First Name"
                                className='bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
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
                                className='bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                            />
                        )}
                    />
                    {errors?.last_name && <p className="text-xs text-danger mt-1">{errors?.last_name?.message}</p>}
                </div>
                <div className=''>
                    <Controller
                        defaultValue={EnquiryStore?.email}
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                disabled={true}
                                type='text'
                                {...field}
                                placeholder="Email"
                                className='bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-sm placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
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
                                maxMenuHeight={290}
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
                                            placeholder="Mobile Number"
                                            className='bg-[#f1f1f1] px-3 border-none rounded-md text-base !py-3 placeholder:text-xs placeholder:text-gray-100/70 w-full focus:outline-none focus:ring-0'
                                        />
                                    )}
                                />
                                {errors?.mobile && <p className="text-xs text-danger mt-1">{errors?.mobile?.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <button
                    disabled={loadingSaveAgent}
                    className='w-full py-3 px-4 disabled:bg-brand-primary/30 bg-brand-primary text-white rounded'
                >
                    {loadingSaveAgent ? 'Loading...' : 'Submit'}
                </button>
                <div className='text-center mt-5 lg:mt-10 pb-5 lg:pb-0'>
                    <p className='text-xs lg:text-sm'>
                        {/* Do you have an Account?
                        <span onClick={() => setGuestType(2)} className='text-brand-primary underline cursor-pointer'> Login </span>
                        <span className='text-gray-100'> or </span> */}
                        <span onClick={() => {
                            setGuestType(1)
                            SaveEnquiry(null)
                        }}
                            className='text-brand-primary underline font-semibold cursor-pointer'
                        >
                            Continue as Guest
                        </span>
                    </p>
                </div>
            </div>
        </form>
    );
}