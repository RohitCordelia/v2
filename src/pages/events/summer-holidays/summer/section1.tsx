import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../index.css'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type Props = {};

const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/section01_01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/section01_01.webp",
    }
]

export default function Section1({ }: Props) {
    let bannerBackground = {
        backgroundImage: `${window.innerWidth > 640 ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/background-01.webp)' : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/background-mobile-01.webp)'}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        height: '100%'
    }
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    return (
        <div className="pb-0 lg:pb-28 px-6 lg:px-4 lg:pt-2 relative" style={bannerBackground}>
            <div className='container mx-auto pt-7 lg-pt-16'>
                <div className='text-center mb-10 lg:mb-16'>
                    <h1 className='text-2xl lg:text-5xl font-medium text-[#034858] font-lobster lg:block hidden'
                    >A Summer Vacation Cruise!</h1>
                     <h1 className='text-2xl lg:text-5xl font-medium text-[#034858] font-lobster lg:hidden block'
                    >Summer Dreams Set  Sail</h1>
                    {/* <p className='lg:text-[18px] text-[#034858] font-outfit mt-5'>Your kids will rave about it, saying <span className='font-lobster'>#SeaMyVacay!</span></p> */}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center'>
                    <div className='relative'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/section01_01.webp" alt="" />
                        <img className='absolute -top-2 -right-4 w-[40px] lg:w-[60px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/black-glass.svg" alt="" />
                    </div>
                    <div className=''>
                        <div className='w-[90%] lg:w-full'>
                        <p className='text-base lg:text-2xl lg:!leading-10 capitalize font-outfit font-normal'>It’s that time of the year when you get to make your child’s dream come true aboard a cruise — <span className='text-[#034858] font-lobster'>It’s summer!</span></p>
                        <div className='mt-6'>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <p className='text-lg lg:text-2xl font-semibold font-outfit'>⚓ Sailings Start April Onwards.</p>
                            </div>
                        </div>
                        </div>
                        <div className='flex justify-start lg:justify-start block lg:hidden'>
                            <a href="/upcoming-cruises?itinerary_id=ef230437-108f-4d74-ad3c-6de6e3c2e59a" className='bg-brand-primary px-8 py-2.5 lg:py-3.5 mt-6 text-lg font-semibold text-white rounded-md'>Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <img className='absolute right-0 top-[410px] lg:top-52 w-[70px] lg:w-[150px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/summer-element-01.webp" alt="" />
            <img className='hidden lg:block absolute left-0 -bottom-16 z-10 w-[180px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/summer-element-02.webp" alt="" />
        </div>
    );
}
