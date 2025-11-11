import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../index.css'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../../components/UI/ModalCenter';

type Props = {};

const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-03.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-04.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-05.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-05.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-06.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-06.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-07.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-07.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-08.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/control-cruise-gallery-pop-image-08.webp",
    }
]

export default function Section3({ }: Props) {
    const [videoPlay, setVideoPlay] = useState<any>(false);
    const [thumbnailPosition, setThumbnailPosition] = useState<any>('right');
    const [sliderIndex, setSliderIndex] = useState<any>(0);

    useEffect(() => {
        if (window.innerWidth > 640) {
            setThumbnailPosition('right')
        } else {
            setThumbnailPosition('bottom')
        }
    }, [])

    return (
        <div className="pt-12 lg:pt-20 pb-16 lg:pb-16 px-4 relative">
            <div className='container mx-auto'>
                <div className='text-center mb-10 lg:mb-16'>
                    <p className='text-2xl lg:text-4xl font-extrabold italic font-montserrat uppercase text-[#2155D9]'>Photo Gallery</p>
                </div>
                <div className='hidden lg:block'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <img
                                onClick={() => {
                                    setSliderIndex(1)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-01.webp" alt="" />
                            <img
                                onClick={() => {
                                    setSliderIndex(3)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-03.webp" alt="" />
                        </div>
                        <div>
                            <img
                                onClick={() => {
                                    setSliderIndex(2)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-02.webp" alt="" />
                            <img
                                onClick={() => {
                                    setSliderIndex(4)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-04.webp" alt="" />
                        </div>
                        <div>
                        <img
                                onClick={() => {
                                    setSliderIndex(5)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-05.webp" alt="" />
                        </div>
                    </div>
                </div>
                <div className='lg:hidden'>
                    <div className='grid grid-cols-2 gap-x-2'>
                        <div>
                            <img
                                onClick={() => {
                                    setSliderIndex(1)
                                    setVideoPlay(true)
                                }}
                                className='mb-2 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-mobile-01.webp" alt="" />
                            <img
                                onClick={() => {
                                    setSliderIndex(3)
                                    setVideoPlay(true)
                                }}
                                className='mb-2 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-mobile-03.webp" alt="" />
                        </div>
                        <div>
                            <img
                                onClick={() => {
                                    setSliderIndex(2)
                                    setVideoPlay(true)
                                }}
                                className='mb-2 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-mobile-02.webp" alt="" />
                            <img
                                onClick={() => {
                                    setSliderIndex(4)
                                    setVideoPlay(true)
                                }}
                                className='mb-2 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-mobile-04.webp" alt="" />
                        </div>
                        <div className='col-span-2'>
                            <img
                                onClick={() => {
                                    setSliderIndex(5)
                                    setVideoPlay(true)
                                }}
                                className='mb-2 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-gallery-mobile-05.webp" alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={() => {
                            setSliderIndex(1)
                            setVideoPlay(true)
                        }}
                        className='border-2 border-brand-primary px-4 lg:px-6 py-2.5 lg:py-3 mt-6 text-sm lg:text-base font-bold text-brand-primary rounded-md uppercase'
                    >
                        View Gallery
                    </button>
                </div>
            </div>
            <Modal show={videoPlay} align={'center'} className="w-full lg:w-2/3 relative" onClose={() => setVideoPlay(false)}>
                <div className=' w-full h-full bg-white p-3 pr-[7px] rounded-lg'>
                    <div
                        className='absolute right-0 lg:-right-10 -top-20 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full'
                        onClick={() => setVideoPlay(false)}
                    >
                        <p className='text-sm lg:text-2xl'> X </p>
                    </div>

                    <ImageGallery
                        items={Image}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={5000}
                        thumbnailPosition={thumbnailPosition}
                        startIndex={sliderIndex - 1}
                        lazyLoad={true}
                    />
                </div>
            </Modal>
        </div>
    );
}
