import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProfileImgUploadMutation, useVerifyDocumentMutation } from '../../../src/services/webCheckIn/webCheckIn';
import { Camera } from "react-camera-pro";

export default function IdPreview() {
    const camera = useRef(null);
    let navigate = useNavigate()
    let location = useLocation();

    const [loading, setLoading] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const [verifyDocument] = useVerifyDocumentMutation();
    const [profileImgUpload] = useProfileImgUploadMutation();

    let bookingData = JSON.parse(window.localStorage.getItem('webChekInData'))
    const { data } = location.state || {};

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = () => {
        setLoading(true)
        if (capturedImage) {
            const formData: any = new FormData();
            formData.append(`guest_id`, data.id);
            formData.append(`image`, capturedImage);

            const _payload = {
                id: bookingData.number,
                data: formData
            };
            profileImgUpload(_payload)
                .unwrap()
                .then((res: any) => {
                    console.log(res);
                    setLoading(false)
                    navigate('/checkInGuestDetail', { state: { data: res?.data?.guest, cabin: '1', currentStep: 1 } })
                })
                .catch((res: any) => {
                    console.log('Error: ', res);
                    let errorObj = {
                        profileError: res?.data?.message,
                        profileSkip: res?.data?.data?.skip_live_photo_verification,
                        skipPhoto: res?.data?.data?.skip_photo,
                        guestPhoto: res?.data?.data?.guest?.web_checkin_guest_picture,
                        web_checkin_step: res?.data?.data?.guest?.web_checkin_step
                    }
                    navigate('/checkInGuestDetail', { state: { data: data, cabin: '1', error: errorObj, currentStep: 1 } })
                });
        }
    };

    const cropToCircle = (base64Image: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Image;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) return resolve(base64Image);

                const size = Math.min(img.width, img.height);
                canvas.width = size;
                canvas.height = size;

                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                const offsetX = (img.width - size) / 2;
                const offsetY = (img.height - size) / 2;

                ctx.drawImage(
                    img,
                    offsetX, offsetY, size, size,
                    0, 0, size, size
                );

                resolve(canvas.toDataURL("image/png"));
            };
        });
    };

    const handleCapture = async () => {
        const photo = camera.current?.takePhoto();
        if (photo) {
            const circularPhoto: any = await cropToCircle(photo);

            setCapturedImage(circularPhoto);
        }
    };

    return (
        <>
            <Layout>
                <div className="lg:mt-28 mt-20 bg-gray-50 lg:mx-[25%] mx-4 mb-40 ">
                    <div>
                        <div className='text-center flex flex-col gap-6' >
                            <h1 className='lg:text-2xl text-lg font-bold'>Preview Your Photo</h1>
                            <p className='text-xs font-semibold lg:text-black text-gray-100 lg:mx-12 leading-[25px]'>
                                Please position your face within the circle to ensure the captured image is sharp and clear for maximum legibility.
                            </p>

                            <div className='flex justify-center lg:mx-44 my-4'>
                                {capturedImage ? (
                                    <img className="rounded-full w-72 h-72 object-cover" src={capturedImage} alt="Captured" />
                                ) : (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Camera
                                            facingMode="user"
                                            ref={camera}
                                            aspectRatio={1 / 1}
                                            className="w-full h-full object-cover"
                                            style={{ transform: "scaleX(-1)" }}
                                            errorMessages={{
                                                noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                                                permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                                            }}
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="relative w-full h-full">
                                                {/* Blurred layer with circular hole */}
                                                <div
                                                    className="absolute inset-0 rounded-lg"
                                                    // style={{
                                                    //     backdropFilter: "blur(18px)",
                                                    //     WebkitBackdropFilter: "blur(28px)",
                                                    //     maskImage: "radial-gradient(circle 126px at center, transparent 100%, white 100%)",
                                                    //     WebkitMaskImage: "radial-gradient(circle 126px at center, transparent 100%, white 100%)",
                                                    // }}
                                                    style={{
                                                        background: '#fff',
                                                        backdropFilter: 'blur(18px)',
                                                        maskImage: "radial-gradient(circle 125px at center, transparent 100%, white 100%)",
                                                        WebkitMaskImage: "radial-gradient(circle 125px at center, transparent 100%, white 100%)",
                                                        borderRadius: '0px',
                                                        margin: '-10px',
                                                    }}
                                                />

                                                {/* Circle outline */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-[250px] h-[250px] rounded-full border-1 border-black border-dotted" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-wrap gap-5 justify-center'>
                                {capturedImage ? (
                                    <>
                                        <div className='flex flex-wrap justify-center' onClick={() => setCapturedImage(null)} >
                                            <label htmlFor="file-upload" className="lg:w-[200px] w-[155px] cursor-pointer border border-brand-primary text-brand-primary rounded-[3px] flex gap-2 py-3 px-6 justify-center items-center" >
                                                <p className='text-lg font-semibold'>Re-Upload</p>
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            type="button"
                                            className="lg:w-[200px] w-[155px] text-white bg-[#93288E] font-semibold rounded-md text-lg px-6 py-3 flex items-center justify-center"
                                        >
                                            {loading ? (
                                                <svg aria-hidden="true" role="status" className="inline w-6 h-6 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                            ) : "Proceed"}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleCapture}
                                        type="button"
                                        className="lg:w-[200px] w-[155px] text-white bg-[#93288E] font-semibold rounded-md text-lg px-6 py-3 flex items-center justify-center"
                                    >
                                        Capture
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}