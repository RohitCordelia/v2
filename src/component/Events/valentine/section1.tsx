import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageGallery from "react-image-gallery";
import Modal from '../../../components/UI/ModalCenter';

type Props = {};

const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/valentine-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/valentine-image.webp",
    }
]

export default function Section1({ }: Props) {
    return (
        <div className="pb-24 lg:pb-32 px-6 lg:px-4 pt-5 lg:pt-2 relative bg-[#FFFAF5]">
            <div className='container mx-auto pt-0 lg:pt-6'>
                <div className='text-center mb-10 lg:mb-16'>
                    <h1 className='text-2xl lg:text-4xl font-medium'>With a celebration this grand, where else could love be?</h1>
                    <h1 className='text-xl lg:text-3xl font-medium mt-2 event-name'>#LoveIsAtSea</h1>
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
                        <p className='text-xl lg:text-3xl lg:!leading-10 capitalize font-outfit font-normal'>Valentine’s Day Special</p>
                        <img className='h-5 lg:h-8 ml-10' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-04.svg" alt="" />
                        </div>
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Love is in the air – Sailaway Flashmob</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Live Romantic band Set at the Pool Deck</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Masquerade Theme Party</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Salsa/Jive dance workshop</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Couple Games</p>
                            </div>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <img className='h-4 lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/wheel-pointer-icon.svg" alt="" />
                                <p className='ml-2 text-sm lg:text-xl font-outfit'>Valentine Special Karaoke</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className='absolute hidden lg:block h-3 lg:h-7 top-0 lg:top-0 left-5 lg:left-80' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-01.svg" alt="" />
            <img className='absolute h-7 lg:h-16 top-10 lg:top-16 right-5 lg:right-44' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-02.svg" alt="" />
            <img className='absolute h-7 lg:h-16 bottom-7 lg:bottom-10 left-5 lg:left-20' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-03.svg" alt="" />
            <img className='absolute h-20 lg:h-48 bottom-0 lg:bottom-0 right-0 lg:right-0' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-05.svg" alt="" />
            <img className='absolute hidden lg:block h-4 lg:h-4 top-7 lg:top-60 left-5 lg:left-20' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-06.svg" alt="" />
            <img className='absolute h-4 lg:h-4 top-[456px] lg:top-80 right-10 lg:right-36' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-07.svg" alt="" />
        </div>
    );
}
