import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import ImageGallery from "react-image-gallery";
// Import necessary styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";
import Button from '../../components/UI/Button';

type Props = { page?: string; ship?: string; };

const EmpressImages = [
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

const SkyImages = [
    // {
    //     original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Credit_The+Moneta1_Sky.webp",
    //     thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Credit_The+Moneta1_Sky.webp",
    // },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sky_PopUp_Game_of_+skills_Web-1.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sky_PopUp_Game_of_+skills_Web-1.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_Sugarcane_MojitoBar.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_Sugarcane_MojitoBar.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_KidsPool_01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_KidsPool_01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_SportsComplex_Basketball.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_SportsComplex_Basketball.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Suite_SE_LivingRm_Sky.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Suite_SE_LivingRm_Sky.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sky_PopUp_Game_of_+skills_Web.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sky_PopUp_Game_of_+skills_Web.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Topsiders1_Sky.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Topsiders1_Sky.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_SportsComplex_Pickleball.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_SportsComplex_Pickleball.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_Suite_SB_Bedroom.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Web_Image+Pop+up_Suite_SB_Bedroom.webp",
    },
]

const SunImages = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_PopUp_Game_of_+skills_Web_1.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_PopUp_Game_of_+skills_Web_1.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Cordelia_Academy_PopUp_Web.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Cordelia_Academy_PopUp_Web.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Swimming_PopUp_Pool_Web.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Swimming_PopUp_Pool_Web.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_SpinnakerLoungePopUp_web.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_SpinnakerLoungePopUp_web.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Public_Stardust_Web.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Public_Stardust_Web.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_PopUp_Game_of_+skills_Web_6.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_PopUp_Game_of_+skills_Web_6.webp",
    },
]

export default function Gallery({ page, ship }: Props) {

    const [videoPlay, setVideoPlay] = useState<any>(false);
    const [thumbnailPosition, setThumbnailPosition] = useState<any>('right');
    const [sliderIndex, setSliderIndex] = useState<any>(0);

    const navigate = useNavigate();

    const Images = ship == "empress" ? EmpressImages : ship == "sky" ? SkyImages : ship === "sun" ? SunImages : EmpressImages;

    useEffect(() => {
        if (window.innerWidth > 640) {
            setThumbnailPosition('right')
        } else {
            setThumbnailPosition('bottom')
        }
    }, []);

    return (
        <div className="px-4 relative">
            <div className='container mx-auto '>
                <div className='grid grid-cols-3 relative z-10'>
                    <div className='col-span-3 lg:col-span-2'>
                        <h2 className='text-2xl lg:text-4xl lg:font-medium '>Photo Gallery</h2>
                        <div className='w-[60%] lg:w-1/2 mb-4'>
                            <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5 mb-0'>{ship == "empress" ? "Catch a glimpse of the Empress" : ship == "sky" ? "Catch a glimpse of the Sky" : ship == "sun" ? "Explore the Sun" :  "Enter for a quick tour"}</p>
                        </div>
                        {page == "ship" && 
                            <Button text='Cruise Now' type='secondary' size='base' handleClick={() => navigate("/upcoming-cruises")} className='mr-2 lg:mr-4 mb-2 lg:mb-4' />
                        }
                    </div>
                </div>
                <div className='-mt-20 hidden lg:block'>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col justify-end">
                            <div className='mb-4 cursor-pointer rounded-md overflow-hidden h-[246px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(1)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_gallery-image-01.webp" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_gallery-image-01.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-01.webp"}  alt="Cordelia Cruises"
                                    title='Cordelia-Cruises'
                                />
                            </div>
                            <div className='cursor-pointer rounded-md overflow-hidden h-[234px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(2)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover'
                                    src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_web_Image2.jpg" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-02.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-02.webp"} alt="Cordelia Cruises"
                                    title='Cordelia-Cruises-image'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-end">
                            <div className='mb-4 cursor-pointer rounded-md overflow-hidden h-[286px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(3)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_web_Image5.jpg" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-03.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-03.webp"} alt='Free meals on Cruise'
                                    title='Cordelia-Cruise-unlimited-meals'
                                />
                            </div>
                            <div className='cursor-pointer rounded-md overflow-hidden h-[270px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(4)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover'
                                    src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_web_Image4.jpg" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-04.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-04.webp"} alt='Cruise cabin'
                                    title='Cordelia-Cruise-Cabin' 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-end">
                            <div className='mb-4 cursor-pointer rounded-md overflow-hidden h-[282px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(5)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-penthouse-bacony-web-image-01.webp" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-05.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-05.webp"} alt= 'Food Court on Cordelia Cruise'
                                    title='Food-court-restaurant-cruise'
                                />
                            </div>
                            <div className='relative cursor-pointer' onClick={() => {
                                setSliderIndex(1)
                                setVideoPlay(true)
                            }}>
                                <img
                                    className='cursor-pointer rounded-md'
                                    src={ship === "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_gallery-image-06.webp" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_gallery-image-06.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-06.webp"} alt='Rock climbing activity on cruise'
                                    title='Adventure-Cordelia-Cruise'
                                />
                                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-auto h-max z-10 cursor-pointer'>
                                    <p className='text-white text-lg font-semibold'>View More</p>
                                </div>
                                <div
                                    className='hidden lg:block absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/75'
                                    // style={{
                                    //     background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                    // }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:hidden lg:mt-8'>
                    <div className="grid grid-cols-2 gap-2 -mt-12">
                        <div className='flex flex-col justify-end'>
                            <div className='mb-2 rounded-md overflow-hidden h-[116px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(1)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_gallery-mobile-01.webp" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_gallery-image-01.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-01.webp"} alt="Cordelia Cruises"
                                    title='Cordelia-Cruises'
                                />
                            </div>
                            <div className='mb-2 rounded-md overflow-hidden h-[110px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(2)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_web_Image2.jpg" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-02.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-02.webp"} alt="Cordelia Cruises"
                                    title='Cordelia-Cruises'
                                />
                            </div>
                            <div className='rounded-md overflow-hidden h-[132px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(5)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover'
                                    src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-penthouse-bacony-web-image-01.webp" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-03.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-05.webp"} alt="Food Court on Cordelia Cruise"
                                    title='Food-court-restaurant-cruise'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-end'>
                            <div className='mb-2 rounded-md overflow-hidden h-[135px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(3)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Mobile_Image5.jpg" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-04.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-03.webp"} alt="Free meals on Cruise"
                                    title='Cordelia-Cruise-unlimited-meals'
                                />
                            </div>
                            <div className='mb-2 rounded-md overflow-hidden h-[127px]'>
                                <img
                                    onClick={() => {
                                        setSliderIndex(4)
                                        setVideoPlay(true)
                                    }}
                                    className='w-full h-full object-cover' src={ship == "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Sky_Gallary_Mobile_Image4.jpg" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_gallery-image-05.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-04.webp"} alt="Cruise cabin"
                                    title='Cordelia-Cruise-Cabin'
                                />
                            </div>
                            <div className='relative cursor-pointer' onClick={() => {
                                setSliderIndex(1)
                                setVideoPlay(true)
                            }}>
                                <img
                                    className='cursor-pointer rounded-md'
                                    src={ship === "sky" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_gallery-image-06.webp" : ship === "sun" ? "https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sun_gallery-image-06.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-06.webp"} alt="Rock climbing activity on cruise"
                                    title='Adventure-Cordelia-Cruise'
                                />
                                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-auto h-max  z-10 cursor-pointer'>
                                    <p className='text-white text-sm font-semibold'>View More</p>
                                </div>
                                <div
                                    className='absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/75'
                                    // style={{
                                    //     background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                    // }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute left-0 top-4 hidden lg:block'>
                    <img className='h-[230px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/gallery-element.svg" alt="Cruise images" 
                    title='Cordelia-Cruises-image'/>
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
                        items={Images}
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
