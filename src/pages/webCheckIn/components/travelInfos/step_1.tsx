import React, { useEffect, useState } from 'react';
import '../../index.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useRemoveDocumentMutation, useUpgradeWebChekinDataMutation, useVerifyDocumentNumberMutation } from '../../../../services/webCheckIn/webCheckIn';
import { Player } from '@lottiefiles/react-lottie-player';
import Tick from "../../../../utils/lottie/Tick.json";
import Button from '../../../../components/UI/Button';

const DocTypeSelection = {
    aadhar_card: ["front", "back"],
    pan_card: ["front"],
    driving_license: ["front"],
    election_id: ["front"],
    passport: ["front", "back"]
}

const options = [
    { value: 'passport', label: 'Passport' },
    { value: 'aadhar_card', label: 'Aadhaar Card' },
    { value: 'pan_card', label: 'Pan Card' },
    { value: 'election_id', label: "Voter's ID" },
    { value: 'driving_license', label: 'Driving Licence' },
    { value: 'birth_certificate', label: 'Birth Certificate' },
    // { value: 'intl_passport', label: 'International Passport' },
];
const optionForInternational = [
    { value: 'passport', label: 'Passport' },
    // { value: 'intl_passport', label: 'International Passport' },
];

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
        // width: '800px',
        zIndex: 999
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '350px',
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

export default function Step1({ guestData, bookingData, idError }: any) {
    const [country, setCountry] = useState('+91');
    const [docType, setDocType] = useState('adharcard');
    const [detailVerified, setDetailVerified] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>();
    const [file, setFile] = useState<any>(null);
    const [docfile, setDocFile] = useState<any>(null);
    const [error, setErrors] = useState<any>(null);
    const [docBackfile, setDocBackFile] = useState<any>(null);
    const [selectCountry, setSelectCountry] = useState('');
    const [state, setState] = useState([])
    const [docNumber, setDocNumber] = useState<any>('')
    const [docNumberError, setDocNumberError] = useState<any>(null)
    const [disableDropdown, setDisableDropdown] = useState(false)
    const navigate = useNavigate();

    const [verifyDocumentNumber] = useVerifyDocumentNumberMutation();

    const docData = JSON.parse(localStorage.getItem("doc_detail") || "{}");

    useEffect(() => {
        // debugger
        if (guestData?.web_checkin_doc_type || idError?.step1?.type || idError?.step1?.doc_verification_disabled) {
            setDetailVerified(true)
            if (idError?.step1?.type == 'birth_certificate') {
                setSelectedOption({ value: 'birth_certificate', label: 'Birth Certificate' })
            } else if (idError?.step1?.type == 'intl_passport') {
                setSelectedOption({ value: 'intl_passport', label: 'International Passport' })
            } else {
                const result = options.find(option => option.value === guestData?.web_checkin_doc_type);
                setSelectedOption(result)
            }
            setDisableDropdown(true)
        }
    }, [])

    const handleFileChangeDoc = async (event: any, side: any) => {
        navigate("/id-preview", { state: { file: event.target.files[0], type: selectedOption?.value, data: guestData, error: '', side: side } })
    };

    const SingleSideDoc = () => {
        if (guestData?.web_checkin_doc_verified) {
            return (
                <div className='shadow-allSide rounded-md pb-4 col-span-2' >
                    <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                        <div className='flex flex-col text-sm' >
                            <p className=' text-lg font-bold'>{
                                guestData?.web_checkin_doc_type == 'pan_card' ? 'Pan Card'
                                    : guestData?.web_checkin_doc_type == 'aadhar_card' ? 'Aadhaar Card'
                                        : guestData?.web_checkin_doc_type == 'driving_license' ? 'Driving License'
                                            : 'Passport'
                            }</p>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                        <p className=' text-sm '>Full Name</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {docData?.name_on_card}
                        </div>
                    </div>
                    {docData?.gender &&
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Gender</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {docData?.gender}
                            </div>
                        </div>
                    }
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
                        <p className=' text-sm '>{
                            guestData?.web_checkin_doc_type == 'pan_card' ? 'Pan Card'
                                : guestData?.web_checkin_doc_type == 'aadhar_card' ? 'Aadhaar Card'
                                    : guestData?.web_checkin_doc_type == 'driving_license' ? 'Driving License'
                                        : 'Passport'
                        }</p>
                        <div className=' text-sm cursor-pointer font-bold ' >
                            {docData?.id_number}
                        </div>
                    </div>
                </div>
            )
        } else if (guestData?.web_checkin_doc_number && guestData?.web_checkin_doc_url && !guestData?.web_checkin_doc_verified) {
            return (
                <img className='mt-3' src={guestData?.web_checkin_doc_url} alt="" />
            )
        } else {
            return (
                <div className='flex flex-col gap-3 mt-5 px-12 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary'>
                    <img className='h-12' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/passport-id-image.svg' alt="Default Preview" />
                    <p className='text-xs font-semibold'>Upload government photo ID</p>
                    <p className='text-[9px] text-gray-100 text-center font-semibold'>Please upload document to proceed. Ensure the image is clear and all details are visible</p>
                    <label htmlFor="file-uploadd" className="border border-brand-primary text-brand-primary items-center rounded-md flex gap-2 py-1 px-2 cursor-pointer">
                        <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg' alt="Upload Icon" />
                        <p className='text-xs'>Upload</p>
                    </label>
                    <input
                        id="file-uploadd"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e: any) => handleFileChangeDoc(e, 'front')}
                        accept="image/*"
                    />
                </div>
            )
        }
    }

    const DoubleSideDoc = () => {

        let selectedOption = options.find(option => option.value === guestData?.web_checkin_doc_type);
        const Front = () => {
            if (guestData?.web_checkin_doc_verified) {
                return (
                    <div className='shadow-allSide rounded-md pb-4 col-span-2' >
                        <div className='flex flex-wrap justify-between bg-[#fff4f3] items-center px-4 py-3 rounded-t-md ' >
                            <div className='flex flex-col text-sm' >
                                <p className=' text-lg font-bold'>{selectedOption?.label}</p>
                                <p className='text-xs text-gray-100 font-semibold'>Front View</p>
                            </div>
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
                                {docData?.date_of_birth}
                                {/* {new Date(docData?.date_of_birth).toLocaleDateString('en-GB').replaceAll("/", "/")} */}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>Citizenship</p>
                            <div className=' text-sm cursor-pointer font-bold ' >
                                {guestData?.citizenship}
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ' >
                            <p className=' text-sm '>{selectedOption?.label}</p>
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
                            {/* <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                                <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' /> <p className='text-xs' >Scan </p>
                            </div> */}
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
                                <p className=' text-lg font-bold'>{selectedOption?.label}</p>
                                <p className='text-xs text-gray-100 font-semibold'>Back View</p>
                            </div>
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
                        {/* <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                            <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' />  <p className='text-xs' >Scan </p>
                        </div> */}
                    </div>
                )
            }
        }

        if (guestData?.doc_number_verification_pending) {
            if (guestData?.web_checkin_doc_url != '#') {
                return (
                    <img src={guestData?.web_checkin_doc_url} alt="" />
                )
            }
            if (guestData?.web_checkin_doc_2_url != '#') {
                return (
                    <img src={guestData?.web_checkin_doc_2_url} alt="" />
                )
            }
        } else {

            return (
                <div className='grid grid-cols-2 mt-3 gap-3'>
                    <Front />
                    <Back />
                </div>
            )
        }
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
                    navigate('/checkInGuestDetail', {
                        state: {
                            data: res?.data?.guest,
                            // document_details: res?.data?.document_details,
                            cabin: '1',
                            currentStep: 1
                        }
                    })
                })
                .catch((res: any) => {
                    if (res.data.status === 'failure') {
                        let errorObj = {
                            step1: {
                                docError: res?.data?.message,
                                skip_doc_verification: true
                            }
                        }
                        navigate('/checkInGuestDetail', { state: { data: guestData, cabin: '1', error: errorObj, currentStep: 1 } })
                    }
                });
        } else {
            setDocNumberError('Please enter document number')
        }
    }
    // console.log('roh bookingData', bookingData?.is_international);

    return (
        <>
            <div>
                <div className='flex items-center'>
                    <p className='font-bold' >1. Scan your ID <span className='text-brand-orange'>*</span></p>
                    {guestData?.web_checkin_step == 'live_photo' || guestData?.web_checkin_step == 'offline_photo' || guestData?.web_checkin_step == 'step_3' ?
                        <div className='w-[25px] ml-3'>
                            <Player
                                src={Tick}
                                className="player"
                                loop
                                autoplay
                            />
                        </div>
                        : null
                    }
                </div>
                {guestData?.web_checkin_doc_verified && !docData?.id_number ? (
                    <p className='text-sm font-semibold'>The document ID verification has been successfully completed.</p>
                ) :
                    <>
                        <p className='font-medium text-gray-100 text-xs lg:text-sm my-3 leading-[25px]' >Make your boarding process seamless and efficient by scanning your ID in advance.</p>
                        {/* {!detailVerified ? ( */}
                        <>
                            <Select
                                isDisabled={disableDropdown}
                                value={selectedOption}
                                onChange={setSelectedOption}
                                options={bookingData?.is_international ? optionForInternational : options}
                                styles={customStyless}
                                isSearchable={false}
                            />
                            {idError && idError?.step1 && idError?.step1?.docError && idError?.step1?.type != 'birth_certificate' && idError?.step1?.type != 'intl_passport' ?
                                <div className='px-3 py-3 rounded-md border items-center border-brand-secondary/70 bg-brand-secondary/20 mt-3' >
                                    <div className='grid grid-cols-11 items-center'>
                                        <div className="lg:col-span-1 col-span-1">
                                            <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                        </div>
                                        <div className="lg:col-span-10 col-span-9">
                                            <p className='text-xxs font-semibold' >{idError?.step1?.docError}</p>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                        </>
                        {/* ) : null} */}

                        {idError?.step1 && idError?.step1?.doc_url ?
                            <img className='w-full mt-3' src={idError?.step1?.doc_url} alt="" />
                            : null}

                        {
                            idError && idError?.step1?.doc_verification_disabled ? null :
                                idError && idError?.step1?.skip_doc_verification && (selectedOption?.value || idError?.step1?.type) ? (
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
                                ) : selectedOption?.value == 'passport' || selectedOption?.value == 'aadhar_card' ? (
                                    <DoubleSideDoc />
                                ) : selectedOption?.value == 'election_id' || selectedOption?.value == 'pan_card' || selectedOption?.value == 'driving_license' || selectedOption?.value == 'intl_passport' || selectedOption?.value == 'birth_certificate' ? (
                                    <SingleSideDoc />
                                ) : null

                        }
                    </>
                }
            </div>
        </>
    );
}