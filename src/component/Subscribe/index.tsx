import React, { useState, useEffect } from 'react';
import { useSubscribeMutation } from '../../../src/services/auth/auth';
import { useForm } from 'react-hook-form';
import Modal2 from "../../components/UI/ModalCenter";

type Props = {};

export default function Subscribe({ }: Props) {
    let bannerBackground = {
        backgroundImage: `${window.innerWidth > 640 ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/newsletter-background.webp)' : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/newsletter-background-mobile.webp)'}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '100%'
    }
    const [useSubscribe] = useSubscribeMutation()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitForm = (data: any) => {
        setLoading(true)
        const _payload = {
            email: data.email,
            source: 'website'
        };

        useSubscribe(_payload)
            .unwrap()
            .then((res: any) => {
                setLoading(false)
                setShowSuccessModal(true)
                setSuccess(res?.message || 'Subscription created successfully')
            })
            .catch((res: any) => {
                setLoading(false)
                setShowSuccessModal(true)
                setSuccess(res?.data?.errors || 'Something went wrong, please try again later.')
            })
    }

    return (
        <div className="pt-24 lg:pt-28 pb-16 lg:pb-14 px-4" style={bannerBackground}>
            <div className='container mx-auto '>
                <div className='grid grid-cols-3 w-full'>
                    <div className='col-span-3 lg:col-span-2'>
                        <h2 className='text-2xl lg:text-4xl font-medium lg:mb-3 lg:mt-10'>Get Cruise Deals Directly</h2>
                        <h2 className='text-2xl lg:text-4xl font-medium mb-5'>In Your Inbox</h2>
                        <div className='mb-7 w-[98%] lg:w-2/3'>
                            <p className='lg:text-lg text-sm lg:leading-7'>Subscribe now and set sail on a journey of endless adventure with our exclusive cruise newsletter</p>
                        </div>
                        <form className=''>
                            <div className='grid grid-cols-8'>
                                <div className='col-span-8 lg:col-span-4'>
                                    <input
                                        type='email'
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Enter a valid email address',
                                            },
                                        })}
                                        className='py-2.5 lg:py-[17px] px-4 w-full rounded lg:rounded-none lg:rounded-l focus:outline-none border'
                                        placeholder='Enter your email address'
                                    />
                                    {errors.email && (
                                        <p className="text-base text-danger mt-2">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className='col-span-8 lg:col-span-3 mt-3 lg:mt-0'>
                                    <button
                                        disabled={loading}
                                        onClick={handleSubmit(submitForm)}
                                        className='w-full lg:w-[70%] py-2.5 lg:py-4 lg:px-10 bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white rounded lg:rounded-none lg:rounded-r text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed'
                                    >
                                        {loading ? (
                                            <span className="loading-elipses">Loading</span>
                                        ) : (
                                            'Subscribe'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='hidden lg:block text-right'>
                        <img className='h-[90%]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/newsletter-image.webp" alt="Cordelia Cruises Newsletter"
                            title='Cordelia-Cruises-Newsletter' />
                    </div>
                </div>
            </div>
            <Modal2 show={showSuccessModal} align={'center'} className="w-[85%] lg:w-[40%] relative rounded-md overflow-hidden" onClose={() => setShowSuccessModal(false)}>
                <div className='w-full h-full bg-white shadow-lg'>
                    <div className='absolute right-3 top-3'>
                        <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='min-h-[100px] px-5 rounded-md overflow-hidden flex items-center justify-center'>
                        <p className='text-md text-gray-700 text-center font-semibold'>{success}</p>
                    </div>
                </div>
            </Modal2>
        </div>
    );
}
