import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../components/UI/ModalCenter';

type Props = {};

export default function Section2({ }: Props) {
    return (
        <div className="pt-10 lg:pt-14 pb-16 lg:pb-20 px-4 relative" style={{
            backgroundImage: innerWidth > 640 ? 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-itinerary-bg.webp")' : 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-itinerary-bg-mobile.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100%' 
        }}>
            <div className='container mx-auto'>
                <div className='text-center mb-10 lg:mb-16'>
                    <p className='text-xl lg:text-3xl font-bold mb-6 font-outfit text-black pt-10 px-5 lg:px-0 lg:pt-0'>Your Weekend Escape Route  June 13–16, 2025</p>
                    <div className='w-full lg:w-[77%] mx-auto'>
                    <p className='text-sm lg:text-[18px] font-outfit leading-7 lg:leading-8 text-black'>You Don't Need Luck. You Need A Boarding Pass.</p>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <img src="http://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-itinerary-new-desktop.webp" alt="" className='my-0 mx-auto' />
                    <div className='flex justify-center'>
                        <a href="/upcoming-cruises?itinerary_id=6071b053-e624-4f51-8096-0837d6f9c11b" className='bg-brand-primary text-white px-6 py-4 mt-14 text-lg font-bold rounded-md'>Book Your cruise</a>
                    </div>
                    {/* <img className='absolute top-44 left-0 w-[7%]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/newyear-element.svg" alt="" /> */}
                </div>
                <div className='lg:hidden'>
                    <div className='mb-14 text-center lg:text-left'>
                        <a href="/upcoming-cruises?itinerary_id=6071b053-e624-4f51-8096-0837d6f9c11b" className='bg-brand-primary text-white px-6 py-4 mt-20 text-base font-semibold rounded'>Book Your cruise</a>
                    </div>
                    <div className='relative'>
                        <img className='' src="https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-itinerary-new-mobile.webp" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
