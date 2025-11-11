import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import ImageGallery from "react-image-gallery";
// Import necessary styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
// import "./index.css"
type Props = {};
const Image = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo03.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo04.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo05.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo05.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo06.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/photo06.webp",
    },
]
export default function Gallery({ }: Props) {

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
        <div className="px-4 relative">
            <div className='container mx-auto '>
                <div className='grid grid-cols-3'>
                    <div className='col-span-3 lg:col-span-2'>
                        <h2 className='text-2xl lg:text-4xl lg:font-medium '>Photo Gallery</h2>
                        <div className='w-[60%] lg:w-1/2'>
                            <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5 mb-0'>Enter for a quick tour </p>
                        </div>
                    </div>
                </div>
                <div className='-mt-20 hidden lg:block'>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col justify-end">
                            <img
                                onClick={() => {
                                    setSliderIndex(1)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-01.webp"  alt="Cordelia Cruises"
                                 title='Cordelia-Cruises'
                            />
                            <img
                                onClick={() => {
                                    setSliderIndex(2)
                                    setVideoPlay(true)
                                }}
                                className='cursor-pointer'
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-02.webp"  alt="Cordelia Cruises"
                                title='Cordelia-Cruises-image'
                            />
                        </div>
                        <div className="flex flex-col justify-end">
                            <img
                                onClick={() => {
                                    setSliderIndex(3)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-03.webp" alt='Free meals on Cruise'
                                title='Cordelia-Cruise-unlimited-meals'
                            />
                            <img
                                onClick={() => {
                                    setSliderIndex(4)
                                    setVideoPlay(true)
                                }}
                                className='cursor-pointer'
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-04.webp" alt='Cruise cabin'
                                title='Cordelia-Cruise-Cabin' 
                            />
                        </div>
                        <div className="flex flex-col justify-end">
                            <img
                                onClick={() => {
                                    setSliderIndex(5)
                                    setVideoPlay(true)
                                }}
                                className='mb-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-05.webp" alt= 'Food Court on Cordelia Cruise'
                                title='Food-court-restaurant-cruise'
                            />
                            <div className='relative cursor-pointer' onClick={() => {
                                setSliderIndex(1)
                                setVideoPlay(true)
                            }}>
                                <img
                                    className='cursor-pointer'
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-06.webp" alt='Rock climbing activity on cruise'
                                    title='Adventure-Cordelia-Cruise'
                                />
                                <div className='absolute lg:mt-[-175px]   left-0 right-0 mx-auto w-28 z-10 cursor-pointer'>
                                    <p className='underline text-white text-lg font-semibold '>View Gallery</p>
                                </div>
                                <div
                                    className='hidden lg:block absolute bottom-0 left-0 w-full rounded-lg h-full'
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:hidden'>
                    <div className="grid grid-cols-2 gap-2 -mt-12">
                        <div className='flex flex-col justify-end'>
                            <img
                                onClick={() => {
                                    setSliderIndex(1)
                                    setVideoPlay(true)
                                }}
                                className='mb-2' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-01.webp" alt="Cordelia Cruises"
                                title='Cordelia-Cruises'
                            />
                            <img
                                onClick={() => {
                                    setSliderIndex(2)
                                    setVideoPlay(true)
                                }}
                                className='mb-2' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-02.webp" alt="Cordelia Cruises"
                                title='Cordelia-Cruises'
                            />
                            <img
                                onClick={() => {
                                    setSliderIndex(5)
                                    setVideoPlay(true)
                                }}
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-05.webp" alt="Food Court on Cordelia Cruise"
                                title='Food-court-restaurant-cruise'
                            />
                        </div>
                        <div className='flex flex-col justify-end'>
                            <img
                                onClick={() => {
                                    setSliderIndex(3)
                                    setVideoPlay(true)
                                }}
                                className='mb-2' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-03.webp" alt="Free meals on Cruise"
                                title='Cordelia-Cruise-unlimited-meals'
                            />
                            <img
                                onClick={() => {
                                    setSliderIndex(4)
                                    setVideoPlay(true)
                                }}
                                className='mb-2' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-04.webp" alt="Cruise cabin"
                                title='Cordelia-Cruise-Cabin'
                            />
                            <div className='relative cursor-pointer' onClick={() => {
                                setSliderIndex(1)
                                setVideoPlay(true)
                            }}>
                                <img
                                    className='cursor-pointer'
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-06.webp" alt="Rock climbing activity on cruise"
                                    title='Adventure-Cordelia-Cruise'
                                />
                                <div className='absolute bottom-5 left-0 right-0 mx-auto w-24 z-10 cursor-pointer'>
                                    <p className='underline text-white text-sm font-semibold '>View Gallery</p>
                                </div>
                                <div
                                    className='absolute bottom-0 left-0 w-full rounded-lg h-full'
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='absolute left-0 top-4 hidden lg:block'>
                    <img className='h-[230px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/gallery-element.svg" alt="Cruise images" 
                    title='Cordelia-Cruises-image'/>
                </div> */}
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
