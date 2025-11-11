import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProfileImgUploadMutation, useVerifyDocumentMutation } from '../../../src/services/webCheckIn/webCheckIn';
import compressFile from './components/compressFile';
import enhancedImage from './components/enhancedImage';
import Button from '../../components/UI/Button';




export default function IdPreview() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()
    let location = useLocation();
    const [verifyDocument] = useVerifyDocumentMutation();
    const [profileImgUpload] = useProfileImgUploadMutation();
    let bookingData = JSON.parse(window.localStorage.getItem('webChekInData'))
    const { file, type, data, side } = location.state || {};
    let docType;
    if (type === 'profile') {
        docType = 'Photo'
    } else if (type === 'aadhar_card') {
        docType = 'Aadhaar Card'
    } else if (type === 'passport') {
        docType = 'Passport'
    } else if (type === 'pan_card') {
        docType = 'Pan Card'
    } else if (type === 'election_id') {
        docType = `Voter's ID`
    } else if (type === 'driving_license') {
        docType = `Driving License`
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async () => {
        if (file) {
            setLoading(true)
            let docFile = null
            if (file.type.startsWith('image/')) {
                if (file.size > (1048000 * 3)) {
                    docFile = await compressFile(file);
                } else if (file.size < (1048000)) {
                    docFile = await enhancedImage(file);
                } else {
                    docFile = file
                }
            } else {
                docFile = file
            }

            if (docFile.size < (1048000 * 5)) {
                const formData: any = new FormData();
                formData.append(`guest[id]`, data.id);
                formData.append(`guest[web_checkin_doc_type]`, type);
                formData.append(`guest[document1]`, docFile);
                formData.append(`guest[page]`, side);

                //                 const url = URL.createObjectURL(docFile);
                // const a = document.createElement("a");
                // a.href = url;
                // a.download = `newenhanced-${file.name}`;
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
                // URL.revokeObjectURL(url);
                const _payload = {
                    id: bookingData.number,
                    data: formData
                };
                verifyDocument(_payload)
                    .unwrap()
                    .then((res: any) => {
                        if (side == 'front') {
                            const selectedDetails = {
                                name_on_card: res?.data?.response?.document_details?.name_on_card,
                                year_of_birth: res?.data?.response?.document_details?.year_of_birth,
                                id_number: res?.data?.response?.document_details?.id_number,
                                date_of_birth: res?.data?.response?.document_details?.date_of_birth,
                                gender: res?.data?.response?.document_details?.gender,
                                ...(type === 'passport' && {
                                    date_of_expiry: res?.data?.response?.document_details?.date_of_expiry,
                                    date_of_issue: res?.data?.response?.document_details?.date_of_issue
                                })

                            };
                            window.localStorage.setItem("doc_detail", JSON.stringify(selectedDetails));
                        }
                        if (side == 'back') {
                            const existingData = JSON.parse(localStorage.getItem("doc_detail") || "{}");
                            const newData = {
                                address: res?.data?.response?.document_details?.address,
                                district: res?.data?.response?.document_details?.district,
                                fathers_name: res?.data?.response?.document_details?.fathers_name,
                                id_number: res?.data?.response?.document_details?.id_number,
                                pincode: res?.data?.response?.document_details?.pincode,
                                state: res?.data?.response?.document_details?.state
                            };
                            const mergedData = { ...existingData, ...newData };

                            localStorage.setItem("doc_detail", JSON.stringify(mergedData));
                        }
                        setLoading(false)
                        navigate('/checkInGuestDetail', {
                            state: {
                                data: res?.data?.response?.guest,
                                document_details: res?.data?.response?.document_details,
                                cabin: '1',
                                currentStep: 1
                            }
                        })
                    })
                    .catch((res: any) => {
                        setLoading(false)
                        console.log('roh Error: ', res);
                        let errorObj = {
                            step1: {
                                docError: res?.data?.message,
                                skip_doc_verification: res?.data?.data?.skip_doc_verification,
                                doc_verification_disabled: res?.data?.data?.doc_verification_disabled,
                                doc_url: type == 'birth_certificate' || type == 'intl_passport' ? res?.data?.data?.guest?.web_checkin_doc_url : null,
                                type: type == 'birth_certificate' || type == 'intl_passport' ? type : null
                            }
                        }
                        navigate('/checkInGuestDetail', { state: { data: data, cabin: '1', error: errorObj, currentStep: 1 } })
                    });
            } else {
                let errorObj = {
                    step1: {
                        docError: 'File exceeds the size limit. Max size: 5MB.',
                        errorType: 'fileExceed'
                    }
                }
                setLoading(false)
                navigate('/checkInGuestDetail', { state: { data: data, cabin: '1', error: errorObj, currentStep: 1 } })
            }
        }
    };

    return (
        <>
            <Layout >
                <div className="lg:mt-28 mt-20 bg-gray-50 lg:mx-[25%] mx-4 mb-40 ">
                    <div>
                        <div className='text-center flex flex-col gap-6' >
                            <h1 className='lg:text-2xl text-lg font-bold' >{`Preview Your ${docType}`}</h1>
                            <p className='text-xs font-semibold lg:text-black text-gray-100 lg:mx-12 leading-[25px]' >Please ensure that the scanned image is very clear to maintain legibility and detail/ The uploaded file should be less than 5MB in size to meet the requirements.</p>
                            <div className='flex justify-center lg:mx-44 my-6'>
                                <img className='' src={file?.type == 'application/pdf' ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-boarding-icon.svg' : URL.createObjectURL(file ? file : null)} />
                            </div>
                            <div className='flex flex-wrap gap-5 justify-center' >
                                {/* <div className='flex flex-wrap justify-center' onClick={() => navigate(-1)} >
                                    <label htmlFor="file-upload" className="lg:w-[200px] w-[155px] cursor-pointer lg:bottom-[-15px] bottom-[-12px] border border-brand-primary text-brand-primary items-center justify-center rounded-[3px] flex gap-2 lg:py-2 py-3 lg:px-8 px-6" >
                                        <p className='lg:text-lg text-lg font-semibold' >{'Re-Upload'} </p>
                                    </label>
                                </div> */}
                                <Button disabled={loading} text='Re-Upload' type='secondary' handleClick={() => navigate(-1)} className='lg:w-[200px] w-[155px] mt-2' />
                                {/* <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="lg:w-[200px] w-[155px] text-white bg-[#93288E] hover:bg-[#93288E]  font-semibold rounded-md text-lg px-5 py-4 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700  justify-center flex gap-2 lg:py-2 py-3 lg:px-8 px-6 items-center">
                                    {
                                        loading ? <svg aria-hidden="true" role="status" className="inline w-6 h-6 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg> : 'Proceed'
                                    }
                                </button> */}
                                <Button disabled={loading} isLoading={loading} text='Proceed' handleClick={handleSubmit} className='lg:w-[200px] w-[155px] mt-2' />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </>
    );
}