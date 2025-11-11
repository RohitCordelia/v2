import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../components/UI/ModalCenter';

type Props = {};

export default function Section2({ }: Props) {
    return (
        <div className="pt-10 lg:pt-0 pb-16 lg:pb-20 px-4 relative" style={{
            backgroundImage: innerWidth > 640 ? 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/christmas%2724-background.webp")' : 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/christmas%2724-mobile-background.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            height: '100%' 
        }}>
            <div className='container mx-auto pt-2 lg:pt-36 pb-6 lg:pb-14'>
                <div className='lg:text-center mb-10 lg:mb-16'>
                    <p className='text-xl lg:text-3xl font-bold mb-3 lg:mb-6 font-outfit text-white'>Cruise with us on - Dec 23rd 2024 (4N/5D)</p>
                    <div className='w-full lg:w-[77%] mx-auto'>
                        <p className='text-sm lg:text-[18px] font-outfit leading-6 lg:leading-8 text-white'>Come aboard with your loved ones and transform your celebration into memories that will last a lifetime!</p>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/christmas%2724-itinerary.webp" alt="" />
                    <div className='flex justify-center'>
                        <a href="/upcoming-cruises?itinerary_id=6e5b315d-0e6c-4cc9-abb8-9cffbce1afed" className='bg-brand-primary px-6 py-3 mt-10 text-base font-bold text-white rounded-md uppercase'>Book Your cruise</a>
                    </div>
                </div>
                <div className='lg:hidden'>
                    <div className='mb-16'>
                        <a href="/upcoming-cruises?itinerary_id=6e5b315d-0e6c-4cc9-abb8-9cffbce1afed" className='bg-brand-primary px-6 py-3 mt-20 text-xs font-semibold text-white rounded uppercase'>Book Your cruise</a>
                    </div>
                    <div className='relative'>
                        <img className='' src="https://images.cordeliacruises.com/cordelia_v2/public/images/christmas%2724-itinerary-mobile.webp" alt="" />
                    </div>
                </div>
            </div>
            <img className='absolute h-[60px] lg:h-[120px] -top-[50px] lg:-top-[33px] right-0' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/xmas%2724-element-03.svg" alt="" />
        </div>
    );
}
