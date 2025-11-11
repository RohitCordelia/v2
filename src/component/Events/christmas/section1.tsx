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
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/xmas%2724-image-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/xmas%2724-image-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/xmas%2724-image-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/xmas%2724-image-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/xmas%2724-image-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/xmas%2724-image-03.webp",
    },
]

export default function Section1({ }: Props) {
    return (
        <div className="pb-24 lg:pb-10 px-6 lg:px-4 pt-5 lg:pt-2 relative">
            <div className='container mx-auto pt-0 lg:pt-6'>
                <div className='text-center mb-10 lg:mb-16'>
                    <h1 className='text-5xl lg:text-7xl font-medium text-white event-name font-outfit'
                    >Christmas</h1>
                    <h1 className='text-5xl lg:text-7xl font-medium text-white event-name'
                        style={{
                            lineHeight: '0.4'
                        }}
                    >~</h1>
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
                            <p className='text-xl lg:text-3xl lg:!leading-10 capitalize font-outfit font-semibold'>Merriment In The Air</p>
                        </div>
                        <div className='mt-3 lg:mt-8'>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <p className='ml-2 text-base lg:text-2xl !leading-6 lg:!leading-10 font-outfit font-medium'>We’ve got it all planned for you and your loved ones — festive decorations, world-class cuisine, thrilling entertainment, exotic beverages, and more. Come aboard!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className='absolute h-[20px] lg:h-[30px] top-0 lg:top-10 left-10' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/xmas%2724-bell-element.svg" alt="" />
            <img className='absolute h-3 lg:h-16 top-0 lg:-top-24 right-5 lg:right-24' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/xmas%2724-bell-element-02.svg" alt="" />
            <img className='absolute h-[140] lg:h-[300] top-0 lg:-top-16 left-5 lg:left-10 hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/xmas%2724-element-01.svg" alt="" />
            <img className='absolute h-[140] lg:h-[300] top-7 lg:top-10 right-5 lg:right-10 hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/xmas%2724-element-02.svg" alt="" />
            <img className='absolute h-[20px] lg:h-[40px] top-[28rem] lg:top-36 right-0 lg:right-[30rem]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/xmas%2724-leaf-element.svg" alt="" />
            {/* <img className='absolute h-4 lg:h-4 top-[456px] lg:top-80 right-10 lg:right-36' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-07.svg" alt="" /> */}
        </div>
    );
}
