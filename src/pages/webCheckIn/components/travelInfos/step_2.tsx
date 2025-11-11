import React, { useEffect, useState } from 'react';
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Tick from "../../../../utils/lottie/Tick.json";
import Button from '../../../../components/UI/Button';

export default function Step2({ guestData, idError }: any) {
    const navigate = useNavigate();

    const handleFileChange = (event: any) => {
        navigate("/profile-preview", { state: { data: guestData, error: '' } })
    };
    const handleFileUpload = (event: any) => {
        navigate("/profile-upload", { state: { file: event.target.files[0], data: guestData } })
    };

    return (
        <>
            <div className='mt-8 mb-6'>
                <div className='flex items-center'>
                    <p className='font-bold' >2. Snap your selfie</p>
                    {guestData?.web_checkin_step == 'step_3' || idError?.web_checkin_step == 'step_3' ?
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
                {guestData?.web_checkin_step == 'step_3' && guestData?.web_checkin_guest_picture == '#' ?
                    <p className='text-sm font-semibold'>Profile photo has been successfully uploaded.</p>
                    :
                    <>
                        <p className='font-medium text-gray-100 text-xs lg:text-sm mt-3 leading-[25px]' >Snap Your Picture Now and Enjoy Quick Boarding on Sail Day</p>
                        {idError?.profileError ? <div className={`${idError?.skipPhoto ? 'border-brand-green/70 bg-brand-green/20' : 'border-brand-secondary/70 bg-brand-secondary/20'} px-3 py-3 rounded-md border items-center mt-3`} >
                            <div className='grid grid-cols-11'>
                                {idError?.skipPhoto ? null :
                                    <div className="lg:col-span-1 col-span-1">
                                        <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                    </div>
                                }
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
                            ) : idError?.guestPhoto ?
                                <img src={idError?.guestPhoto} className='rounded-md' alt="Uploaded Preview" />
                                :
                                <img className='lg:h-[112px] h-[96px] my-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/profile-checkin-image.svg' />
                            }
                        </div>
                        <div className='flex flex-wrap justify-center'>
                            {idError?.profileSkip ? <>
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer lg:bottom-[-15px] bottom-[-12px] bg-brand-primary text-white items-center rounded-[3px] flex gap-2 lg:py-2 py-1 lg:px-8 px-6"
                                >
                                    Upload
                                </label>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileUpload}
                                />
                            </> : (
                                // <button
                                //     disabled={guestData?.web_checkin_step != "live_photo" }
                                //     onClick={handleFileChange}
                                //     className='cursor-pointer lg:bottom-[-15px] bottom-[-12px] bg-brand-primary disabled:bg-brand-primary/40 text-white items-center rounded-[3px] flex gap-2 lg:py-2 py-1 lg:px-8 px-6 lg:text-xs text-xxs font-semibold'
                                // >
                                //     Capture
                                // </button>
                                <Button text='Capture' size='sm' disabled={guestData?.web_checkin_step != "live_photo"} handleClick={handleFileChange} />
                            )}
                        </div>
                    </>
                }
            </div>
        </>
    );
}