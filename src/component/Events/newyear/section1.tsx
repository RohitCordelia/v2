import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageGallery from "react-image-gallery";
import Modal from '../../../components/UI/ModalCenter';

type Props = {};

const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Newyear'25-image-new-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Newyear'25-image-new-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/newyear'25-image-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/newyear'25-image-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/newyear'25-image-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/newyear'25-image-03.webp",
    },
]

export default function Section1({ }: Props) {
    let bannerBackground = {
        backgroundImage: `${window.innerWidth > 640 ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/newyear%2725-background.webp)' : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/newyear%2725-mobile-background.webp)'}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        height: '100%'
    }
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    return (
        <div className="pb-24 lg:pb-32 px-6 lg:px-4 pt-5 lg:pt-2" style={bannerBackground}>
            <div className='container mx-auto pt-12 lg:pt-14'>
                <div className='text-center mb-10 lg:mb-16'>
                    <h1 className='text-5xl lg:text-6xl font-medium text-white event-name font-outfit'
                    >New Year</h1>
                    <h1 className='text-5xl lg:text-7xl font-medium text-white event-name'
                        style={{
                            lineHeight: '0.4'
                        }}
                    >~</h1>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 '>
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
                    <div className='w-[90%] lg:w-[80%]'>
                        <p className='text-xl lg:text-3xl text-white lg:!leading-10 capitalize font-outfit font-medium'>Party In Style At Sea</p>
                        <div className='mt-6 lg:mt-10'>
                            <div className='flex items-center mb-3 lg:mb-5'>
                                <p className='ml-2 text-base lg:text-[1.4rem] !leading-6 lg:!leading-[2.6rem] text-white font-outfit font-medium'>Bring in the New Year with unforgettable moments – vibrant ambiance, gourmet dining, electrifying shows, signature beverages, and more await you and your loved ones. Come aboard!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
