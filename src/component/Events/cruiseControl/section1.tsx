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
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-image.webp",
    },
]

export default function Section1({ }: Props) {
    let bannerBackground = {
        backgroundImage: `${window.innerWidth > 640 ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-background.webp)' : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-mobile-background.webp)'}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        height: '100%'
    }
    return (
        <div className="pb-16 lg:pb-32 px-6 lg:px-4 pt-5 lg:pt-2 relative" style={bannerBackground}>
            <div className='container mx-auto pt-0 lg:pt-6'>
                <div className='text-center mb-10 lg:mb-16 mt-10 lg:mt-16'>
                    <h1 className='text-2xl lg:text-4xl text-white font-montserrat font-extrabold uppercase italic'>Cruise Control 5.0 is here </h1>
                    <h1 className='text-sm lg:text-base font-montserrat font-medium mt-2 text-white'>Put your dancing shoes on and come aboard to lose control</h1>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center'>
                    <div>
                        <ImageGallery
                            items={Image}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            autoPlay={false}
                            slideInterval={5000}
                            lazyLoad={true}
                            showThumbnails={false}
                        />
                    </div>
                    <div className='w-[90%] lg:w-[90%]'>
                        <div className='flex items-center'>
                            <p className='text-xl lg:text-3xl lg:!leading-10 capitalize font-outfit font-normal text-white'>It’s going to be a blast!</p>
                        </div>
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit text-white'>5 stages</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit text-white'>30+ artists</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit text-white'>Multi-genre festival</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit text-white'>48 hours of non-stop music</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
