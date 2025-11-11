import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../index.css'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../../components/UI/ModalCenter';

type Props = {};

export default function Section2({ }: Props) {
    return (
        <div className="pt-20 lg:pt-0 pb-16 lg:pb-28 px-4 relative" style={{
            backgroundImage: innerWidth > 640 ? 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/background-02.webp")' : 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/explore-background.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            height: '100%'
        }}>
            <div className='container mx-auto'>
                <div className='text-center mb-10 lg:mb-16'>
                    <h1 className='text-2xl lg:text-5xl font-medium text-[#034858] font-lobster'>Explore. Express. Enjoy!</h1>
                    <div className='w-full lg:w-[55%] mx-auto block lg:hidden'>
                        <p className='lg:text-[18px] text-[#034858] font-outfit mt-5'>Come aboard for an unforgettable summer vacation and leave with the excitement to proudly say <span className='font-lobster'>#SeaMyVacay!</span></p>
                    </div>
                </div>
                <div className='grid lg:grid-cols-3 gap-3'>
                    <div className='relative'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/explore-image-01.webp" alt="" />
                        <div className='absolute bottom-0 px-3.5 pb-8 pt-14 w-full rounded-lg z-10'
                            style={{
                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                            }}
                        >
                            <h1 className='text-white text-xl mb-2 font-outfit'>Starry, Starry Night </h1>
                            <p className='text-white font-outfit text-xs lg:text-base'>Unfold the mysteries of the stars and constellations</p>
                        </div>
                    </div>
                    <div className='relative'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/explore-image-02.webp" alt="" />
                        <div className='absolute bottom-0 px-3.5 pb-8 pt-14 w-full rounded-lg z-10'
                            style={{
                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                            }}
                        >
                            <h1 className='text-white text-xl mb-2 font-outfit'>Art Splash </h1>
                            <p className='text-white font-outfit text-xs lg:text-base'>Let your creativity make waves at the art workshop</p>
                        </div>
                    </div>
                    <div className='relative'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/explore-image-03.webp" alt="" />
                        <div className='absolute bottom-0 px-3.5 pb-8 pt-14 w-full rounded-lg z-10'
                            style={{
                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                            }}
                        >
                            <h1 className='text-white text-xl mb-2 font-outfit'>Empress Wonder land</h1>
                            <p className='text-white font-outfit text-xs lg:text-base'>Human Statue, Jugglers, Dwarf, Balloon Sculptor, Unicycle Artist</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <a href="/upcoming-cruises?da=31032025" className='bg-brand-primary px-6 lg:px-10 py-2.5 lg:py-4 mt-16 text-lg font-semibold text-white rounded-md'>Book Your Cruise</a>
                </div>
            </div>
                <img className='absolute bottom-10 right-0 lg:right-32 h-[40px] lg:h-[90px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/glassses-2.webp" alt="" />
                <img className='absolute bottom-0 left-0 lg:left-32 h-[80px] lg:h-[160px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/safe-balloon-element.webp" alt="" />
                <img className='absolute top-44 right-8 h-[60px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/star-fish-element.webp" alt="" />
        </div>
    );
}
