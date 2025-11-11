import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type Props = {};

const textHoli = {
    background: '-webkit-linear-gradient(0deg, #000000 0%, #48abe0 100%)',
    textAlign: 'center'
}

const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-03.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-image-04.webp",
    },
]

export default function Section1({ }: Props) {
    return (
        <div className="py-12 lg:py-20 px-6 lg:px-4 relative text-white" style={{
            backgroundImage: innerWidth > 640 ? 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-party-section-desktop-bg.webp")' : 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/week-cruise-party-section-mobile-bg.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100%' 
        }}>
            <div className='container mx-auto pt-0'>
                <div className='text-center mb-10 lg:mb-16'>
                    <h1 className='text-xl lg:text-4xl font-medium'>What Makes This Cruise <i>The</i> Weekend Plan</h1>
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
                    <div className='w-full lg:w-[90%]'>
                        <p className='text-sm lg:text-xl font-outfit'>Ditch the taxis, skip the 2 AM drives, and forget splitting
                            bills or closing tabs. This cruise is your all-access pass to a
                            weekend done right. Enjoy unlimited food and beverages, bars
                            that stay open late, and ocean views that outshine any rooftop.
                            The party doesn’t end until you do. Your cabin is just an
                            elevator ride away, and every night brings a new vibe with
                            themed parties, live DJs, and spectacular shows. One ship. One
                            weekend. Zero regrets.
                        </p>
                        {/* <div className='flex items-center'>
                            <p className='text-xl lg:text-3xl lg:!leading-10 capitalize font-outfit font-normal'>Fun Check at Pool Deck</p>
                        </div>
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Neon party</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Tropical Carnival</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>All White Party</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Summer Hawaiian Party</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>House Nation - Atrium Party</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <img className='absolute h-[140px] lg:h-[390px] top-0 lg:top-10 left-0' src="https://images.cordeliacruises.com/cordelia_v2/public/images/holi-splash-01.webp" alt="" /> */}
            {/* <img className='absolute h-3 lg:h-7 top-0 lg:top-7 left-5 lg:left-80' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-01.svg" alt="" /> */}
            {/* <img className='absolute h-7 lg:h-16 top-10 lg:top-10 right-5 lg:right-52' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-02.svg" alt="" /> */}
            {/* <img className='absolute h-7 lg:h-16 bottom-7 lg:bottom-10 left-5 lg:left-20' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-03.svg" alt="" /> */}
            {/* <img className='absolute h-[300px] lg:h-[500px] top-72 lg:top-10 right-0 lg:right-0' src="https://images.cordeliacruises.com/cordelia_v2/public/images/holi-splash-02.webp" alt="" /> */}
            {/* <img className='absolute h-4 lg:h-4 top-[456px] lg:top-80 right-10 lg:right-36' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-07.svg" alt="" /> */}
        </div>
    );
}
