import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../index.css'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type Props = {};

const textHoli = {
    background: '-webkit-linear-gradient(0deg, #000000 0%, #48abe0 100%)',
    textAlign: 'center'
}

const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-03.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-04.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-05.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-05.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-06.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-06.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-07.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-07.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-08.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/holi-gallery-pop-image-08.webp",
    },
]

export default function Section1({ }: Props) {
    let bannerBackground = {
        backgroundImage: `${window.innerWidth > 640 ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-artist-background.webp)' : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-artist-mobile-background.webp)'}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        height: '100%'
    }
    return (
        <div className="pb-24 lg:pb-32 px-6 lg:px-4 pt-5 lg:pt-2 relative" style={bannerBackground}>
            <div className='container mx-auto pt-0 lg:pt-6'>
                <div className='text-center mb-10 lg:mb-16 lg:mt-16'>
                    <h1 className='text-2xl lg:text-4xl font-extrabold italic text-[#2155D9] uppercase font-montserrat'>Look who’s on board for the party! </h1>
                </div>
                <div className='grid grid-cols-2 text-center lg:grid-cols-3 gap-6 lg:gap-12 lg:px-48'>
                    <div className='flex flex-wrap justify-center items-start'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/sagar-wali-image.webp" alt="" />
                        <img className='mt-8 w-5/6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sagar-wali-qawwali.svg" alt="" />
                    </div>
                    <div className='flex flex-wrap justify-center items-start'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/dj-chetas-image.webp" alt="" />
                        <img className='mt-8 w-3/6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dj-chetas-logo.svg" alt="" />
                    </div>
                    <div className='flex flex-wrap justify-center items-start'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/king-image.webp" alt="" />
                        <img className='mt-8 w-4/6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/KING.svg" alt="" />
                    </div>
                    <div className='flex flex-wrap justify-center items-start relative lg:hidden'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/many-more-image-mobile.webp" alt="" />
                        <div className='absolute top-[65px] w-full flex justify-center'>
                            <p className='text-white text-xl font-montserrat font-bold'>+Many More</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
