import React, { useEffect, useState } from 'react';
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import Step1 from './step_1'
import Step2 from './step_2'
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Checkbox, Input } from '../../../../components/UI/Forms/Inputs';
import { LastName, Email, FullName, SelectAnyValue } from '../../../../utils/validations/formValidations';
import PhoneCode from '../../../../components/UI/Forms/Inputs/phoneCodes.json';
import { Select as SelectField } from '../../../../components/UI/Forms/Inputs';
import CountryStates from "../../../../components/UI/Forms/Inputs/country-states.json";
import StateCities from "../../../../components/UI/Forms/Inputs/state-cities.json";
import { useUpgradeWebChekinDataMutation } from '../../../../services/webCheckIn/webCheckIn';
import Button from '../../../../components/UI/Button';

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: '#f5f5f5',
        height: '48px',
        border: 10,
        boxShadow: 'none',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        width: '800px',
        zIndex: 999
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '300px',
        zIndex: 9999
    }),
    menuPortal: (base: any) => ({
        ...base,
        zIndex: 9999
    }),
    indicatorSeparator: (styles: any) => ({
        ...styles,
        marginRight: '-36px',
    }),
};
let mealList = [
    { code: 'Vegetarian', name: 'Vegetarian' },
    { code: 'Jain', name: 'Jain' },
    { code: 'Non. Veg', name: 'Non-Vegetarian' },
    { code: 'Gluten Free', name: 'Gluten Free' }
]

export default function TravelInfo({ guestData, bookingData, idError, document_details }: any) {
    const navigate = useNavigate();
    const [country, setCountry] = useState('');
    const [countryName, setCountryName] = useState('');
    const [stateName, setStateName] = useState('');
    const [selectCountry, setSelectCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([])
    const [error, setErrors] = useState<any>(null);
    const [upgradeWebChekinData] = useUpgradeWebChekinDataMutation();

    const docData = JSON.parse(localStorage.getItem("doc_detail") || "{}");

    useEffect(() => {
        if (guestData) {
            const states: any = CountryStates?.countries?.find((c: any) => c.country.toLowerCase() === guestData?.country.toLowerCase());
            setState(states?.states)
            setCountry(guestData?.country_code ? guestData?.country_code : '+91')
        }
        if(guestData && guestData?.state){
            setStateName(guestData.state)
        }
    }, [guestData])

    let defaultValues = {
        name: guestData?.name,
        email: bookingData?.created_via == 'B2C' || bookingData?.created_via == 'STAFF_NEW' ? guestData?.email : null,
        meal: guestData?.meal,
        country: guestData?.country,
        phone_number: bookingData?.created_via == 'B2C' || bookingData?.created_via == 'STAFF_NEW' ? guestData?.phone : null,
        state: guestData?.state,
        city: guestData?.city,
        emerg_phone_number: '',
        emerg_full_name: '',
        declaration_accepted: null,
        alternate_phone: null,
        alternate_phone_country_code: '+91'
    }

    const submitData = () => {
        const formData: any = new FormData();
        formData.append(`guest[id]`, guestData.id);
        formData.append(`guest[country]`, watch().country);
        formData.append(`guest[state]`, watch().state);
        formData.append(`guest[meal]`, watch().meal);
        formData.append(`guest[city]`, watch().city);
        formData.append(`guest[email]`, watch().email);
        formData.append(`guest[phone]`, watch().phone_number);
        formData.append(`guest[emergency_phone]`, watch().emerg_phone_number);
        formData.append(`guest[emergency_name]`, watch().emerg_full_name);
        formData.append(`guest[alternate_phone]`, watch().alternate_phone);
        formData.append(`guest[alternate_phone_country_code]`, watch().alternate_phone_country_code);
        // formData.append(`guest[emergency_phone_country_code]`, watch().emerg_full_name);
        // formData.append(`guest[alternate_email]`, watch().emerg_full_name);
        // formData.append(`guest[emergency_phone_whatsapp]`, watch().emerg_full_name);
        formData.append(`guest[declaration_accepted]`, watch().declaration_accepted);
        if(guestData?.web_checkin_doc_type == "passport"){
            formData.append(`guest[web_checkin_doc_number]`, docData?.id_number);
            formData.append(`guest[passport_expiry_date]`, docData?.date_of_expiry);
            formData.append(`guest[passport_issue_date]`, docData?.date_of_issue);
        }
        const _payload = {
            id: bookingData?.number,
            data: formData
        };

        setLoading(true)
        upgradeWebChekinData(_payload)
            .unwrap()
            .then((res: any) => {
                if (res.data.status === 'failure') {
                    setErrors(res.data.message)
                } else {
                    // setCurrentStep(2)
                    navigate('/checkInGuestDetail', {
                        state: {
                            data: res?.data,
                            currentStep: 2
                        }
                    })
                }
                setLoading(false)
            })
            .catch((res: any) => {
                if (res.data.status === 'failure') {
                    setErrors(res.data.message)
                }
                setLoading(false)
                console.log('Error: ', res);
            });
    }
    const {
        register,
        watch,
        handleSubmit,
        getValues,
        setValue,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm({
        defaultValues
    });

    const handleCheckboxChange = (e: any) => {
        const isChecked = e.target.checked;
        // if (isChecked) {
        //   setPrimaryKey(prefix);
        // } else {
        setValue(`declaration_accepted`, isChecked);
        // }
    };

    return (
        <>
            {loading ?
                <div className='h-full w-full flex justify-center items-center overflow-hidden fixed top-0 left-0 bg-black/90 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            <div className="lg:shadow-allSide lg:mx-12 lg:p-10 rounded-2xl mt-12 ">
                <p className='text-sm font-normal mb-2'>Field marked as <span className='text-brand-orange'>*</span> are required.</p>
                <div className="grid grid-cols-2 lg:gap-24 pb-4 border-b border-b-secondary">
                    <div className="col-span-2 lg:col-span-1">
                        <Step1 guestData={guestData} bookingData={bookingData} idError={idError} />
                        <Step2 guestData={guestData} idError={idError} />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div>
                            <p className='font-bold' >3. Personal Details</p>
                            <div>
                                <div className="mt-2 ">
                                    <label className='text-sm font-medium'>Full Name <span className='text-brand-orange'>*</span></label>
                                    <Input
                                        disabled={true}
                                        type="text"
                                        register={register}
                                        onChange={(e: any) => setValue('name', e.target.value)}
                                        name="name"
                                        inputClassName="mt-1 border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full"
                                        placeholder="name"
                                        className='!mb-2'
                                    />
                                </div>
                                <div className="mt-2 ">
                                    <label className='text-sm font-medium col-span-12 mb-1'>Email <span className='text-brand-orange'> * <span className='text-xs'>(To Receive your boarding pass on Email)</span></span></label>
                                    <Input
                                        disabled={bookingData?.created_via == 'B2C' || bookingData?.created_via == 'STAFF_NEW' ? true : false}
                                        type="email"
                                        register={register}
                                        validation={Email}
                                        onChange={(e: any) => setValue('email', e.target.value)}
                                        name="email"
                                        inputClassName="mt-1 border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full"
                                        placeholder="Email"
                                        className='!mb-2'
                                    />
                                    <div>
                                        {errors && errors.email && (
                                            <p className="text-sm mt-1 text-danger">
                                                Enter a valid email id.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-10 mt-3 lg:grid-cols-9">
                                    <label className='text-sm font-medium col-span-12 mb-1'>Phone Number <span className='text-brand-orange'> * <span className='text-xs'>(To Receive your boarding pass on WhatsApp)</span></span></label>
                                    <div className="lg:col-span-2 col-span-3">
                                        <div className={`grid grid-cols-1 `}>
                                            <Select
                                                menuPortalTarget={document.body}
                                                // menuPosition={'fixed'}
                                                value={{ label: country }}
                                                maxMenuHeight={290}
                                                options={PhoneCode}
                                                isDisabled={bookingData?.created_via == 'B2B' || bookingData?.created_via == 'ADMIN' || bookingData?.created_via == 'API' ? false : true}
                                                // onChange={item => setCountry(item.value)}
                                                styles={customStyles}
                                                className='h-11 rounded-l-md overflow-hidden'
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-7">
                                        <div className={`grid grid-cols-1 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <div>
                                                    <input
                                                        disabled={bookingData?.created_via == 'B2C' || bookingData?.created_via == 'STAFF_NEW' ? true : false}
                                                        className={`border-0 disabled:cursor-not-allowed bg-gray-400 rounded-r-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        {...register('phone_number', {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 10,
                                                            pattern: {
                                                                value: /^[0-9]+$/, // Regex to allow only numbers
                                                                message: 'Please enter only numbers'
                                                            }
                                                        })}
                                                    ></input>
                                                    <div>
                                                        {errors && errors.phone_number && (
                                                            <p className="text-sm mt-1 text-danger">
                                                                Enter 10 digit mobile number.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-10 mt-3 lg:grid-cols-9">
                                    <label className='text-sm font-medium col-span-12 mb-1'>Alternate Phone Number</label>
                                    <div className="lg:col-span-2 col-span-3">
                                        <div className={`grid grid-cols-1 `}>
                                            <Select
                                                menuPortalTarget={document.body}
                                                // menuPosition={'fixed'}
                                                value={{ label: country }}
                                                maxMenuHeight={290}
                                                options={PhoneCode}
                                                name='alternate_phone_country_code'
                                                isDisabled={bookingData?.created_via == 'B2B' || bookingData?.created_via == 'ADMIN' || bookingData?.created_via == 'API' ? false : true}
                                                onChange={item => setValue('alternate_phone_country_code', item.value)}
                                                styles={customStyles}
                                                className='h-11 rounded-l-md overflow-hidden'
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-7">
                                        <div className={`grid grid-cols-1 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <div>
                                                    <input
                                                        className={`border-0 disabled:cursor-not-allowed bg-gray-400 rounded-r-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        {...register('alternate_phone', {
                                                            required: false,
                                                            minLength: 10,
                                                            maxLength: 10,
                                                            pattern: {
                                                                value: /^[0-9]+$/, // Regex to allow only numbers
                                                                message: 'Please enter only numbers'
                                                            }
                                                        })}
                                                    ></input>
                                                    <div>
                                                        {errors && errors.alternate_phone && (
                                                            <p className="text-sm mt-1 text-danger">
                                                                Enter 10 digit mobile number.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 ">
                                    <label className='text-sm font-medium mb-2'>Meal Type</label>
                                    <SelectField
                                        name={`meal`}
                                        defaultValue={guestData !== null ? guestData?.meal : null}
                                        options={mealList}
                                        validation={SelectAnyValue}
                                        selectClassName="mt-1 border-0 bg-gray-400 disabled:cursor-not-allowed rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full"
                                        className='!mb-2'
                                        placeholder="Select Meal"
                                        error={errors && errors?.meal}
                                        errorText='Please select meal'
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label className='text-sm font-medium'>Country</label>
                                    <select
                                        disabled={guestData?.country}
                                        value={guestData?.country ? guestData?.country : countryName}
                                        name='country'
                                        className='mt-1 border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full'
                                        onChange={(event) => {
                                            const states: any = CountryStates?.countries?.find((c: any) => c.country.toLowerCase() === (event.target.value ? event.target.value : guestData.country).toLowerCase());
                                            setState(states?.states)
                                            setValue('country', states?.states)
                                            setCountryName(states?.country)
                                        }}
                                    >
                                        <option selected value="" disabled className='text-gray-100'>{"Select Country"}</option>
                                        {
                                            CountryStates?.countries?.map((country) => {
                                                return <option value={country.country}>{country.country}</option>
                                            })
                                        }
                                    </select>
                                    {errors && errors?.country && <p className="text-xs text-danger mt-1">Please select country</p>}
                                </div>
                                <div className='mt-2'>
                                    <label className='text-sm font-medium mb-2'>State</label>
                                    <select
                                        disabled={guestData?.state}
                                        defaultValue={guestData ? guestData?.state : null}
                                        name='state'
                                        className='mt-1 border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full'
                                        onChange={(event) => {
                                            setStateName(event.target.value)
                                            setValue('state', event.target.value)
                                        }}
                                    >
                                        <option className='text-gray-100' selected value="" disabled>{"Select State"}</option>
                                        {
                                            state?.map((country: any) => {
                                                return <option selected={guestData && guestData?.state?.toLowerCase() == country?.toLowerCase() ? true : false} value={country}>{country}</option>
                                            })
                                        }
                                    </select>
                                    {errors && errors?.state && <p className="text-xs text-danger mt-1">Please Select state</p>}
                                </div>
                                <div className="mt-2 ">
                                    <label className='text-sm font-medium mb-2'>City</label>
                                    <select
                                        disabled={guestData?.city}
                                        defaultValue={guestData ? guestData?.city : null}
                                        name='city'
                                        className='mt-1 border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full'
                                        onChange={(event) => {
                                            // setSelectCountry(event.target.value)
                                            setValue('city', event.target.value)
                                        }}
                                    >
                                        <option className='text-gray-100' selected value="" disabled>{"Select City"}</option>
                                        {
                                            StateCities[stateName]?.map((city: any) => {
                                                return <option selected={guestData && guestData?.city?.toLowerCase() == city?.toLowerCase() ? true : false} value={city}>{city}</option>
                                            })
                                        }
                                    </select>
                                    {errors && errors.city && <p className="text-xs text-danger mt-1">Please enter city</p>}
                                </div>
                            </div>
                        </div>
                        {/* emergency detail  */}
                        <div className='mt-8 ' >
                            <p className='font-bold' >4. Add Emergency Contact</p>
                            <div className='mt-4 p-4 rounded-md bg-[#fff4f3] italic'>
                                <p className='text-xs lg:text-sm'>Please ensure that the emergency contact details provided for a person who is not present on the sailing.</p>
                            </div>
                            <div>
                                <div className="mt-4 ">
                                    <Input
                                        type="text"
                                        {...register('emerg_full_name', {
                                            required: false
                                        })}
                                        validation={FullName}
                                        onChange={(e: any) => setValue('emerg_full_name', e.target.value)}
                                        inputClassName="border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-6 lg:pl-6 placeholder:text-sm lg:placeholder:text-sm placeholder:text-gray-100 w-full"
                                        placeholder="Full Name"
                                        error={errors && errors?.emerg_full_name && errors?.emerg_full_name}
                                        errorText={errors && errors?.emerg_full_name?.message}
                                    />
                                </div>
                                <div className="grid grid-cols-10 mt-3 lg:grid-cols-9">
                                    <div className="lg:col-span-2 col-span-3">
                                        <div className={`grid grid-cols-1 `}>
                                            <Select
                                                menuPortalTarget={document.body}
                                                // menuPosition={'fixed'}
                                                value={{ label: country }}
                                                maxMenuHeight={290}
                                                options={PhoneCode}
                                                // isDisabled={true}
                                                // onChange={item => setCountry(item.value)}
                                                styles={customStyles}
                                                className='h-11 lg:h-12 rounded-l-md overflow-hidden'
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-7">
                                        <div className={`grid grid-cols-1 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <div>
                                                    <input
                                                        // name={'emerg_phone_number'}
                                                        className={`border-0 bg-gray-400 rounded-r-md text-sm lg:pl-6 lg:text-base !py-3 px-6 placeholder:text-sm lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        {...register('emerg_phone_number', {
                                                            required: false,
                                                            minLength: 10,
                                                            maxLength: 10
                                                        })}
                                                    ></input>
                                                    <div>
                                                        {errors && errors.emerg_phone_number && (
                                                            <p className="text-xs mt-1 text-danger">
                                                                Enter 10 digit mobile number.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-4'>
                                    <Checkbox id="whatsapp_checkbox" label='Same as WhatsApp Number' labelClassName='text-black text-xs lg:text-sm' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <p className='font-bold'>Health Declaration</p>
                    {/* <p className='font-medium text-gray-100 text-xs lg:text-sm my-3 leading-[25px]'>In the last 8 days before your journey, have you had any of the symptoms? (Please mark yes or no against each symptom)</p> */}
                    <div className='my-4'>
                        <div className='flex items-start'>
                            <input
                                name='declaration_accepted'
                                type="checkbox"
                                className="rounded-sm cursor-pointer w-4 h-4 lg:w-5 lg:h-5 text-brand-primary"
                                onChange={(e) => {
                                    setValue(`declaration_accepted`, e.target.checked);
                                }}
                            />
                            <p className={`text-xs lg:text-sm ml-2 font-medium text-gray-600`}>I hereby declare that I am in good health and free from any contagious diseases or conditions that may pose a risk to others.</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-center text-danger mt-4 '>{error}</p>
            <div className='flex justify-center mt-7' >
                <Button text='Continue' disabled={loading} isLoading={loading} handleClick={handleSubmit(submitData)} className='w-[27%] mt-3' />
            </div>
        </>
    );
}