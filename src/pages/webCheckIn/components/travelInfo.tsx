import React, { useEffect, useState } from 'react';
import '../index.css'
import { Input } from '../../../components/UI/Forms/Inputs';
import Select from 'react-select';
import { LastName, Email, FullName, SelectAnyValue } from '../../../utils/validations/formValidations';
import PhoneCode from '../../../components/UI/Forms/Inputs/phoneCodes.json';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Select as SelectField } from '../../../../src/components/UI/Forms/Inputs';
import { useRemoveDocumentMutation, useUpgradeWebChekinDataMutation, useVerifyDocumentNumberMutation } from '../../../../src/services/webCheckIn/webCheckIn';
import CountryStates from "../../../components/UI/Forms/Inputs/country-states.json";
import Button from '../../../components/UI/Button';

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
const customStyless = {
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
        display: 'none',
        marginRight: '-36px',
    }),
};

interface TravelInfoProps {
    setCurrentStep: (step: number) => void;
    guestData: any
    bookingData: any
    idError: any
}

export default function TravelInfo({ setCurrentStep, guestData, bookingData, idError }: TravelInfoProps) {
    const [country, setCountry] = useState('+91');
    const [docType, setDocType] = useState('adharcard');
    const [detailVerified, setDetailVerified] = useState(false);
    const [removeDocument] = useRemoveDocumentMutation();
    const [verifyDocumentNumber] = useVerifyDocumentNumberMutation();
    const [upgradeWebChekinData] = useUpgradeWebChekinDataMutation();
    const [selectedOption, setSelectedOption] = useState<any>();
    const [file, setFile] = useState<any>(null);
    const [docfile, setDocFile] = useState<any>(null);
    const [error, setErrors] = useState<any>(null);
    const [docBackfile, setDocBackFile] = useState<any>(null);
    const [selectCountry, setSelectCountry] = useState('');
    const [state, setState] = useState([])
    const [docNumber, setDocNumber] = useState<any>('')
    const [docNumberError, setDocNumberError] = useState<any>(null)
    const [stepNo, setStepNo] = useState(1)
    const navigate = useNavigate();

    const docData = JSON.parse(localStorage.getItem("doc_detail") || "{}");

    const handleFileChange = (event: any) => {
        // navigate("/id-preview", { state: { file: event.target.files[0], type: 'profile', data: guestData, error: '' } })
        navigate("/profile-preview", { state: { data: guestData, error: '' } })
    };

    const handleFileChangeDocPass = (event: any) => {
        navigate("/id-preview", { state: { file: event.target.files[0], type: selectedOption?.value, data: guestData, error: '' } })
    };

    const handleFileChangeDoc = async (event: any, side: any) => {
        // if (guestData?.web_checkin_doc_type !== null) {
        // let _payload = {
        //     id: bookingData?.number,
        //     guest_id: guestData.id,
        // };
        // await removeDocument(_payload)
        //     .unwrap()
        //     .then((res: any) => {

        //     })
        //     .catch((res: any) => {
        //         console.log('Error: ', res)

        //     })
        // }
        navigate("/id-preview", { state: { file: event.target.files[0], type: selectedOption?.value, data: guestData, error: '', side: side } })
    };

    useEffect(() => {
        // setDocType('passport')
        if (guestData?.web_checkin_doc_type) {
            // setDocType(guestData?.web_checkin_doc_type)
            setDetailVerified(true)
            setSelectedOption({ value: guestData?.web_checkin_doc_type, label: guestData?.web_checkin_doc_type })
        }
    }, [])

    let defaultValues = {
        email: guestData?.email,
        meal: guestData?.meal,
        country: guestData?.country,
        phone_number: guestData?.phone,
        state: guestData?.state,
        city: guestData?.city,
        emerg_email: '',
        emerg_phone_number: '',
        emerg_full_name: ''
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
    const steps = [
        { name: "Initiated", title: 'Travel Info' },
        { name: "Processed", title: 'Arrival Time' },
        { name: "Credited", title: 'Health Form' },
    ];
    const options = [
        { value: 'passport', label: 'Passport' },
        { value: 'aadhar_card', label: 'Aadhaar Card' },
        { value: 'pan_card', label: 'Pan Card' },
        { value: 'election_id', label: "Voter's ID" },
        { value: 'driving_license', label: 'Driving Licence' },
    ];
    let mealList = [
        { code: 'Vegetarian', name: 'Vegetarian' },
        { code: 'Jain', name: 'Jain' },
        { code: 'Non. Veg', name: 'Non-Vegetarian' },
        { code: 'Gluten Free', name: 'Gluten Free' }
    ]
    useEffect(() => {
        if (guestData) {
            const states: any = CountryStates?.countries?.find((c: any) => c.country.toLowerCase() === guestData?.country.toLowerCase());
            setState(states?.states)
        }
    }, [guestData, country])

    const submitData = (data: any) => {
        const formData: any = new FormData();
        formData.append(`guest[id]`, guestData.id);
        formData.append(`guest[country]`, watch().country);
        formData.append(`guest[state]`, watch().state);
        formData.append(`guest[meal]`, watch().meal);
        formData.append(`guest[city]`, watch().city);
        formData.append(`guest[email]`, watch().email);
        formData.append(`guest[phone]`, watch().phone_number);
        formData.append(`guest[emergency_phone]`, watch().emerg_phone_number);
        formData.append(`guest[emergency_email]`, watch().emerg_email);
        formData.append(`guest[emergency_namel]`, watch().emerg_full_name);
        const _payload = {
            id: bookingData?.number,
            data: formData
        };
        upgradeWebChekinData(_payload)
            .unwrap()
            .then((res: any) => {
                if (res.data.status === 'failure') {
                    setErrors(res.data.message)
                } else {
                    setCurrentStep(2)
                }
            })
            .catch((res: any) => {
                if (res.data.status === 'failure') {
                    setErrors(res.data.message)
                }
                console.log('Error: ', res);
            });
    };

    const FrontBackDetails = () => {
        return (
            <div className='mt-5' >
                <div className='shadow-allSide rounded-md pb-4' >
                    <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                        <div className='flex flex-col text-sm' >
                            <p className=' text-lg font-bold'>Aadhaar</p>
                            <p className='text-xs text-gray-100 font-semibold'>Front View</p>
                        </div>
                        <div className='underline text-xs cursor-pointer font-bold text-brand-primary' onClick={() => setDetailVerified(false)} >
                            Remove
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Full Name</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {guestData?.name}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Gender</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {guestData?.gender}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>DOB</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {new Date(guestData?.date_of_birth).toLocaleDateString('en-GB').replaceAll("/", "/")}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Citizenship</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {guestData?.citizenship}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Aadhaar Card</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {guestData?.web_checkin_doc_number}
                        </div>
                    </div>
                </div>
                <div className='shadow-allSide rounded-md mt-4 pb-4' >
                    <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                        <div className='flex flex-col text-sm' >
                            <p className=' text-lg font-bold'>Aadhaar</p>
                            <p className='text-xs text-gray-100 font-semibold'>Back View</p>
                        </div>
                        <div className='underline text-xs cursor-pointer font-bold text-brand-primary' onClick={() => setDetailVerified(false)} >
                            Remove
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Address</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            Do.No.61-2-124, Gachibowli
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>City</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {guestData?.city}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>State</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {guestData?.state}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Postal Code</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            500032
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const FrontDetails = () => {
        return (
            <div className='mt-5' >
                <div className='shadow-allSide rounded-md pb-4' >
                    <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                        <div className='text-sm' >
                            <p className=' text-lg font-bold'>Passport</p>
                        </div>
                        <div className='underline text-xs cursor-pointer font-bold text-brand-primary' onClick={() => setDetailVerified(false)} >
                            Remove
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Full Name</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            Justin Saris
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Gender</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            Male
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>DOB</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            25/08/1996
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Citizenship</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            Indian
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Passport</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            W654256
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Issue Date</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            26/11/2022
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Expiry Date</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            26/11/2032
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SingleSideDoc = () => {
        return (
            <div className='flex flex-col gap-3 mt-5 px-12 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary'>
                <img className='h-12' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/passport-id-image.svg' alt="Default Preview" />
                <p className='text-xs font-semibold'>{selectedOption?.value === 'pancard' ? 'Upload/ Scan PAN Card' : 'Upload/ Scan Passport'}</p>
                <p className='text-[9px] text-gray-100 text-center font-semibold'>Please upload {selectedOption?.value === 'pancard' ? 'PAN Card' : 'Passport'} image or scan your passport to proceed. Ensure the image is clear and all details are visible</p>
                <label htmlFor="file-uploadd" className="border border-brand-primary text-brand-primary items-center rounded-md flex gap-2 py-1 px-2 cursor-pointer">
                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' alt="Upload Icon" />
                    <p className='text-xs'>Upload</p>
                </label>
                <input
                    id="file-uploadd"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChangeDocPass}
                    accept="image/*"
                />
            </div>
        )
    }

    const DoubleSideDoc = () => {
        const Front = () => {
            if (guestData?.web_checkin_doc_verified) {
                return (
                    <div className='shadow-allSide rounded-md pb-4 col-span-2' >
                        <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                            <div className='flex flex-col text-sm' >
                                <p className=' text-lg font-bold'>Aadhaar</p>
                                <p className='text-xs text-gray-100 font-semibold'>Front View</p>
                            </div>
                            {/* <div className='underline text-xs cursor-pointer font-bold text-brand-primary' onClick={() => setDetailVerified(false)} >
                                Remove
                            </div> */}
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Full Name</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.name_on_card}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Gender</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.gender}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>DOB</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {new Date(docData?.date_of_birth).toLocaleDateString('en-GB').replaceAll("/", "/")}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Citizenship</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {guestData?.citizenship}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Aadhaar Card</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.id_number}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className='flex flex-col gap-2 lg:px-[45px] px-[38px] lg:py-16 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary'>
                            <img className='lg:h-12 h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/front-view-id-image.svg' alt="Default Preview" />
                            <p className='text-xs font-bold'>Front View ID</p>
                            <label htmlFor="file-upload-doc" className="border border-brand-primary text-brand-primary items-center rounded-md flex gap-2 py-1 px-2 cursor-pointer">
                                <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' alt="Upload Icon" />
                                <p className='text-xs'>Upload</p>
                            </label>
                            <input
                                id="file-upload-doc"
                                name="file-upload-doc"
                                type="file"
                                className="sr-only"
                                onChange={(e: any) => handleFileChangeDoc(e, 'front')}
                                accept="image/*"
                            />
                            <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                                <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' /> <p className='text-xs' >Scan </p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        const Back = () => {
            if (guestData?.web_checkin_doc_2_verified) {
                return (
                    <div className='shadow-allSide rounded-md mt-4 pb-4 col-span-2'>
                        <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                            <div className='flex flex-col text-sm' >
                                <p className=' text-lg font-bold'>Aadhaar</p>
                                <p className='text-xs text-gray-100 font-semibold'>Back View</p>
                            </div>
                            {/* <div className='underline text-xs cursor-pointer font-bold text-brand-primary' onClick={() => setDetailVerified(false)} >
                                Remove
                            </div> */}
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Address</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.address}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>City</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.district}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>State</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.state}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Postal Code</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.pincode}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='flex flex-col gap-2 lg:px-[45px] px-[33px] lg:py-16 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary' >
                        <img className='lg:h-12 h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/back-view-id-image.svg' />
                        <p className='text-xs font-bold'>Back View ID</p>
                        <div className="border border-brand-primary text-brand-primary  rounded-md  py-1 px-2" >
                            <input
                                id="file-upload-doc2"
                                name="file-upload-doc2"
                                type="file"
                                className="sr-only"
                                onChange={(e: any) => handleFileChangeDoc(e, 'back')}
                                accept="image/*"
                            />
                            <label htmlFor="file-upload-doc2" className='flex flex-wrap gap-2 items-center'>
                                <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' />  <p className='text-xs' >Upload </p>
                            </label>
                        </div>
                        <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                            <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' />  <p className='text-xs' >Scan </p>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className='grid grid-cols-2 mt-3 gap-3'>
                <Front />
                <Back />
            </div>
        )
    }

    const OnSubmitDocNumberVerification = () => {
        if (docNumber && selectedOption) {

            const formData: any = new FormData();
            formData.append(`guest[id]`, guestData.id);
            formData.append(`guest[web_checkin_doc_type]`, selectedOption?.value);
            formData.append(`guest[web_checkin_doc_number]`, docNumber);


            const _payload = {
                id: bookingData.number,
                data: formData
            }
            verifyDocumentNumber(_payload)
                .unwrap()
                .then((res: any) => {
                    if (res.data.status === 'failure') {
                        setErrors(res.data.message)
                    } else {
                        setCurrentStep(2)
                    }
                })
                .catch((res: any) => {
                    if (res.data.status === 'failure') {
                        setErrors(res.data.message)
                    }
                    console.log('Error: ', res);
                });
        } else {
            setDocNumberError('Please enter document number')
        }

    }

    const DocumentNumber = () => {
        return (
            <div className='mt-3'>
                <label className='font-semibold text-gray-100 text-sm'>Document Number</label>
                <input
                    className={`border-0 bg-gray-400 rounded-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                    type="text"
                    value={docNumber}
                    placeholder="Enter Document Number"
                    onChange={(e) => setDocNumber(e.target.value)}
                />
                <div>
                    {docNumberError && (
                        <p className="text-sm mt-1 text-danger">
                            {docNumberError}
                        </p>
                    )}
                </div>
                <Button text='Capture' size='sm' handleClick={OnSubmitDocNumberVerification} className='mt-2' />
            </div>
        )
    }

    return (
        <>
            <div className="lg:shadow-allSide lg:mx-12 lg:px-10 py-10 rounded-2xl mt-12 ">
                <div className="grid grid-cols-2 lg:gap-24">
                    <div className="col-span-2 lg:col-span-1">
                        <div>
                            <p className='font-bold' >1. Scan your ID</p>
                            <p className='font-semibold text-gray-100 text-sm mt-3 leading-[25px]' >Make your boarding process seamless and efficient by scanning your ID in advance.</p>
                            {!detailVerified ? (
                                <>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        styles={customStyless}
                                        isSearchable={false}
                                    />
                                    {idError?.docError ?
                                        <div className='px-3 py-3 rounded-md border items-center border-brand-secondary/70 bg-brand-secondary/20 mt-3' >
                                            <div className='grid grid-cols-11 items-center'>
                                                <div className="lg:col-span-1 col-span-1">
                                                    <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                                </div>
                                                <div className="lg:col-span-10 col-span-9">
                                                    <p className='text-xxs font-semibold' >{idError?.docError}</p>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                    }
                                </>
                            ) : null}
                            {idError && idError?.skip_doc_verification && selectedOption?.value ? (
                                <div className='mt-3'>
                                    <label className='font-semibold text-gray-100 text-sm'>Document Number</label>
                                    <input
                                        className={`border-0 bg-gray-400 rounded-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                                        type="text"
                                        value={docNumber}
                                        placeholder="Enter Document Number"
                                        onChange={(e) => setDocNumber(e.target.value)}
                                    />
                                    <div>
                                        {docNumberError && (
                                            <p className="text-sm mt-1 text-danger">
                                                {docNumberError}
                                            </p>
                                        )}
                                    </div>
                                    <Button text='Capture' size='sm' handleClick={OnSubmitDocNumberVerification} className='mt-2' />
                                </div>
                            ) : selectedOption?.value == 'election_id' || selectedOption?.value == 'pan_card' || selectedOption?.value == 'driving_licence' || selectedOption?.value == 'aadhar_card' ? (
                                <DoubleSideDoc />
                            ) : selectedOption?.value == 'passport' ? (
                                <SingleSideDoc />
                            ) : null}
                            {/* {
                                detailVerified ? docType === "passport" ? <FrontDetails /> : <FrontBackDetails /> :
                                    <div className='mt-5' >
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            styles={customStyless}
                                            isSearchable={false}
                                        />
                                        {idError?.docError ?
                                            <div className='px-3 py-3 rounded-md border items-center border-brand-secondary/70 bg-brand-secondary/20 mt-3' >
                                                <div className='grid grid-cols-11 items-center'>
                                                    <div className="lg:col-span-1 col-span-1">
                                                        <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                                    </div>
                                                    <div className="lg:col-span-10 col-span-9">
                                                        <p className='text-xxs font-semibold' >{idError?.docError}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                        {selectedOption?.value == 'election_id' || selectedOption?.value == 'pan_card' || selectedOption?.value == 'driving_licence' || selectedOption?.value == 'aadhar_card' ? (
                                            <div className='flex flex-wrap mt-3 gap-3'>
                                                <div className='flex flex-col gap-2 lg:px-[45px] px-[38px] lg:py-16 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary'>
                                                    <img className='lg:h-12 h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/front-view-id-image.svg' alt="Default Preview" />
                                                    <p className='text-xs font-bold'>Front View ID</p>
                                                    <label htmlFor="file-upload-doc" className="border border-brand-primary text-brand-primary items-center rounded-md flex gap-2 py-1 px-2 cursor-pointer">
                                                        <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' alt="Upload Icon" />
                                                        <p className='text-xs'>Upload</p>
                                                    </label>
                                                    <input
                                                        id="file-upload-doc"
                                                        name="file-upload-doc"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={(e: any) => handleFileChangeDoc(e, 'front')}
                                                        accept="image/*"
                                                    />
                                                    <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                                                        <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' /> <p className='text-xs' >Scan </p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-2 lg:px-[45px] px-[33px] lg:py-16 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary' >
                                                    <img className='lg:h-12 h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/back-view-id-image.svg' />
                                                    <p className='text-xs font-bold'>Back View ID</p>
                                                    <div className="border border-brand-primary text-brand-primary  rounded-md  py-1 px-2" >
                                                        <input
                                                            id="file-upload-doc2"
                                                            name="file-upload-doc2"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={(e: any) => handleFileChangeDoc(e, 'back')}
                                                            accept="image/*"
                                                        />
                                                        <label htmlFor="file-upload-doc2" className='flex flex-wrap gap-2 items-center'>
                                                            <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' />  <p className='text-xs' >Upload </p>
                                                        </label>
                                                    </div>
                                                    <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                                                        <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' />  <p className='text-xs' >Scan </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : selectedOption?.value == 'passport' ? (
                                            <div className='flex flex-col gap-3 mt-5 px-12 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary'>
                                                <img className='h-12' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/passport-id-image.svg' alt="Default Preview" />
                                                <p className='text-xs font-semibold'>{selectedOption?.value === 'pancard' ? 'Upload/ Scan PAN Card' : 'Upload/ Scan Passport'}</p>
                                                <p className='text-[9px] text-gray-100 text-center font-semibold'>Please upload {selectedOption?.value === 'pancard' ? 'PAN Card' : 'Passport'} image or scan your passport to proceed. Ensure the image is clear and all details are visible</p>
                                                <label htmlFor="file-uploadd" className="border border-brand-primary text-brand-primary items-center rounded-md flex gap-2 py-1 px-2 cursor-pointer">
                                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' alt="Upload Icon" />
                                                    <p className='text-xs'>Upload</p>
                                                </label>
                                                <input
                                                    id="file-uploadd"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChangeDocPass}
                                                    accept="image/*"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                            } */}
                        </div>




                        <div className='mt-8 mb-6' >
                            <p className='font-bold' >2. Add Your Photo</p>
                            <p className='font-semibold text-gray-100 text-sm mt-3 leading-[25px]' >Snap Your Picture Now and Enjoy Quick Boarding on Sail Day</p>
                            {idError?.profileError ? <div className='px-3 py-3 rounded-md border items-center border-brand-secondary/70 bg-brand-secondary/20 mt-3' >
                                <div className='grid grid-cols-11'>
                                    <div className="lg:col-span-1 col-span-1">
                                        <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                    </div>
                                    <div className="lg:col-span-10 col-span-9">
                                        <p className='text-xxs font-semibold' >{idError?.profileError}</p>
                                    </div>
                                </div>
                            </div>
                                : null
                            }
                            <div className={`flex flex-col lg:mx-28 mx-24 justify-center items-center lg:rounded-lg rounded-md  ${guestData?.web_checkin_guest_picture !== '#' ? 'rounded-md' : 'border border-dashed border-brand-primary '}bg-gray-400 mt-8 mb-4 `} >
                                {guestData?.web_checkin_guest_picture !== '#' ? (
                                    <img src={guestData?.web_checkin_guest_picture} className='rounded-md' alt="Uploaded Preview" />
                                ) : (<img className='lg:h-[112px] h-[96px] my-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/profile-checkin-image.svg' />
                                )}
                            </div>
                            <div className='flex flex-wrap justify-center'>
                                {/* <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer lg:bottom-[-15px] bottom-[-12px] bg-brand-primary text-white items-center rounded-[3px] flex gap-2 lg:py-2 py-1 lg:px-8 px-6"
                                > */}
                                <p onClick={handleFileChange} className='cursor-pointer lg:bottom-[-15px] bottom-[-12px] bg-brand-primary text-white items-center rounded-[3px] flex gap-2 lg:py-2 py-1 lg:px-8 px-6 lg:text-xs text-xxs font-semibold'>Capture</p>
                                {/* </label>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div>
                            <p className='font-bold' >3. Personal Details</p>
                            <div>
                                <div className="mt-4 ">
                                    <Input
                                        type="email"
                                        register={register}
                                        validation={Email}
                                        onChange={(e: any) => setValue('email', e.target.value)}
                                        name="email"
                                        inputClassName="border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full"
                                        placeholder="Email"
                                        error={errors && errors?.email}
                                        errorText={errors ? errors?.email?.message : null}
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
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-7">
                                        <div className={`grid grid-cols-1 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <div>
                                                    <input
                                                        className={`border-0 bg-gray-400 rounded-md lg:pl-6 text-sm lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        {...register('phone_number', {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 10
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
                                <div className="mt-4 ">
                                    <SelectField
                                        name={`meal`}
                                        defaultValue={guestData !== null ? guestData?.meal : null}
                                        options={mealList}
                                        register={register}
                                        validation={SelectAnyValue}
                                        selectClassName="border-0 bg-gray-400 disabled:cursor-not-allowed rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full"
                                        className='!mb-4'
                                        placeholder="Select Meal"
                                        error={errors && errors?.meal}
                                        errorText='Please select meal'
                                    />
                                </div>
                                <div className='mt-4'>
                                    <select
                                        disabled
                                        defaultValue={guestData !== null ? guestData?.country : null}
                                        name={`country`}
                                        className='border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full'
                                        onChange={(event) => {
                                            const states: any = CountryStates?.countries?.find((c: any) => c.country.toLowerCase() === (event.target.value ? event.target.value : guestData.country).toLowerCase());
                                            setState(states?.states)
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
                                <div className='mt-4'>
                                    <select
                                        disabled
                                        defaultValue={guestData ? guestData.state : null}
                                        name={`state`}
                                        className='border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md lg:pl-6 text-sm cursor-pointer lg:text-sm !py-3 placeholder:text-xs lg:placeholder:text-sm  placeholder:text-gray-200 w-full'
                                        onChange={(event) => {
                                            setSelectCountry(event.target.value)
                                        }}
                                    >
                                        <option className='text-gray-100' selected value="" disabled>{"Select State"}</option>
                                        {
                                            state?.map((country: any) => {
                                                return <option selected={guestData && guestData.state == country ? true : false} value={country}>{country}</option>
                                            })
                                        }
                                    </select>
                                    {errors && errors?.country && <p className="text-xs text-danger mt-1">Please Select state</p>}
                                </div>
                                {/* <div className="mt-4 ">
                      <Input
                        type="text"
                        register={register}
                        validation={LastName}
                        onChange={(e: any) => setValue('state', e.target.value)}
                        name="state"
                        inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:pl-6 lg:text-base !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full"
                        placeholder="Select State"
                        // error={errors && errors?.state && errors?.state}
                      />
                        {errors && errors.state && <p className="text-xs text-danger mt-1">Please select state</p>}
                    </div> */}
                                <div className="mt-4 ">
                                    <Input
                                        disabled
                                        type="text"
                                        register={register}
                                        validation={LastName}
                                        onChange={(e: any) => setValue('city', e.target.value)}
                                        name="city"
                                        inputClassName="border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md text-xs lg:pl-6 lg:text-sm !py-3 px-6 placeholder:text-xs lg:placeholder:text-sm placeholder:text-gray-100 w-full"
                                        placeholder="City"
                                    />
                                    {errors && errors.city && <p className="text-xs text-danger mt-1">Please enter city</p>}
                                </div>
                                {/* <div className="mt-4 ">
                  <Input
                    type="text"
                    disabled
                    register={register}
                    validation={LastName}
                    onChange={(e: any) => setValue('postal_code', e.target.value)}
                    name="postal_code"
                    inputClassName="border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md text-sm lg:pl-6 lg:text-base !py-3 px-6 placeholder:text-sm lg:placeholder:text-sm placeholder:text-gray-100 w-full"
                    placeholder="Postal Code"
                  />
                  {errors && errors.postal_code && <p className="text-xs text-danger mt-1">Please enter postal code</p>}
                </div> */}
                            </div>
                        </div>
                        {/* emergency detail  */}
                        <div className='mt-8 ' >
                            <p className='font-bold' >4. Add Emergency Contact</p>
                            <div>
                                <div className="mt-4 ">
                                    <Input
                                        type="text"
                                        register={register}
                                        validation={FullName}
                                        // onChange={(e: any) => setValue('emerg_full_name', e.target.value)}
                                        name="emerg_full_name"
                                        inputClassName="border-0 disabled:cursor-not-allowed bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-6 lg:pl-6 placeholder:text-sm lg:placeholder:text-sm placeholder:text-gray-100 w-full"
                                        placeholder="Full Name"
                                        error={errors && errors?.emerg_full_name && errors?.emerg_full_name}
                                        errorText={errors && errors?.emerg_full_name?.message}
                                    />
                                </div>
                                <div className="mt-4 ">
                                    <Input
                                        type="email"
                                        register={register}
                                        validation={Email}
                                        // onChange={(e: any) => setValue('emerg_email', e.target.value)}
                                        name="emerg_email"
                                        inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base lg:pl-6 !py-3 px-6 placeholder:text-sm lg:placeholder:text-sm  placeholder:text-gray-200 w-full"
                                        placeholder="Email"
                                        error={errors && errors?.emerg_email}
                                        errorText={errors && errors?.emerg_email?.message}
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
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-7">
                                        <div className={`grid grid-cols-1 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <div>
                                                    <input
                                                        // name={'emerg_phone_number'}
                                                        className={`border-0 bg-gray-400 rounded-md text-sm lg:pl-6 lg:text-base !py-3 px-6 placeholder:text-sm lg:placeholder:text-sm placeholder:text-gray-100 w-full`}
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        {...register('emerg_phone_number', {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 10
                                                        })}
                                                    ></input>
                                                    <div>
                                                        {errors && errors.emerg_phone_number && (
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-center text-danger mt-4 '>{error}</p>
            <div className='flex justify-center mt-7' >
                <button
                    //  disabled={true}
                    onClick={handleSubmit(submitData)}
                    className="bg-brand-primary w-[27%] disabled:bg-brand-primary/60 disabled:cursor-not-allowed text-brand-primary rounded-md text-white  cursor-pointer mt-3 py-3 font-semibold px-4 flex justify-center mx-5 text-md"
                >
                    <div className='flex gap-1 items-center ' >
                        Continue
                    </div>
                </button>
            </div>
        </>
    );
}