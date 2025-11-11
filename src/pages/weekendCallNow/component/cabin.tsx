import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookNow } from './extraElement';
// import "./slick-customized.css"
import Modal from '../../../components/UI/ModalCenter';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type Props = {};

interface SliderRefType {
    slickGoTo: (index: number) => void;
}

const cabin = [
    {
        'name': 'Interior Stateroom',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend-mobile.webp',
        'subtitle': 'Not only are they budget-friendly, our Interior Staterooms have everything you need to make your journey and stay onboard truly special.',
        'itinerary': [
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': '2 Water Bottles',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },

            // {
            //     'title': 'Twin beds',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-04.webp",
            },
        ]
    },
    {
        'name': 'Ocean View Stateroom',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend-mobile.webp',
        'subtitle': 'Talk about a private and cozy cabin of your own with a picturesque view of the sea, because that’s what our Ocean View Staterooms are all about!',
        'itinerary': [
            {
                'title': 'Window',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': '2 Water Bottles',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
            // {
            //     'title': 'Twin beds',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-04.webp",
            },
        ]
    },
    {
        'name': 'Mini Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-cabin-weekend-mobile.webp',
        'subtitle': 'Experience premium accommodation onboard with a private balcony for you to sit back and enjoy panoramic views of the ocean from your happy place.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': '2 Water Bottles',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': 'Jaw dropping view',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/droppingview-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Shower',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shower-weekend-icon.svg',
            // },
            // {
            //     'title': 'Sitting Area',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sittingarea-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
            // {
            //     'title': 'Vanity',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vanity-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-05.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-05.webp",
            },
        ],
        'note': 'No sofa sitting area in 7186, 7188, 7686, 7688, 7690, 8686, 9684 cabins.'
    },
    {
        'name': 'Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend-mobile.webp',
        'subtitle': 'Get ready to make your cruise journey oh so Suite! Furnished with world-class amenities and classy exuberance.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Living Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Refrigerator',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
            },
            {
                'title': 'Tea/Coffee Making Facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': '2 Water Bottles',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
            {
                'title': 'Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
            },

            // {
            //     'title': 'Ocean view bedroom',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oceanview-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },

        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-05.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-05.webp",
            },
        ],
    },
]
export default function CabinCategory({ }: Props) {
    const sliderRef = useRef<SliderRefType | null>(null);

    const [setting, setSetting] = useState<any>({});
    const [type, setType] = useState('Mini Suit');
    const [cabinModal, setCabinModal] = useState(false);
    const [activeCabin, setActiveCabin] = useState('');
    const [activeCabinArr, setActiveCabinArr] = useState<any>();

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, [])

    useEffect(() => {
        if (activeCabin) {
            let arr = cabin.find((cab) => cab.name == activeCabin)
            setActiveCabinArr(arr)
        }
    }, [cabinModal])
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: window.innerWidth > 640 ? "100px" : "20px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: true,
        dots: true,
    };
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: window.innerWidth > 640 ? "100px" : "20px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: false,
        dots: true,
    };

    useEffect(() => {
        sliderRef.current?.slickGoTo(2);
    }, [])

    return (
        <div>
            <div className='pb-6 lg:pb-12 pt-7'>
                <button
                    onClick={() => {
                        sliderRef.current?.slickGoTo(0);
                        setType('Interior')
                    }}
                    className={`mb-2 lg:mb-4 lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2.5 lg:py-3 px-10 lg:px-12 rounded ${type == 'Interior' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-2`}
                >
                    Interior
                </button>
                <button
                    onClick={() => {
                        sliderRef.current?.slickGoTo(1);
                        setType('Ocean View')
                    }}
                    className={`mb-2 lg:mb-4 lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2.5 lg:py-3 px-10 lg:px-12 rounded ${type == 'Ocean View' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-2`}
                >
                    Ocean View
                </button>
                <button
                    onClick={() => {
                        sliderRef.current?.slickGoTo(2);
                        setType('Mini Suit')
                    }}
                    className={`mb-2 lg:mb-4 lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2.5 lg:py-3 px-10 lg:px-12 rounded ${type == 'Mini Suit' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-2`}
                >
                    Mini Suite
                </button>
                <button
                    onClick={() => {
                        sliderRef.current?.slickGoTo(3);
                        setType('Suit')
                    }}
                    className={`mb-2 lg:mb-4 lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2.5 lg:py-3 px-10 lg:px-12 rounded ${type == 'Suit' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-2`}
                >
                    Suite
                </button>
            </div>

            <div className='mobile-slider cabin mb-4'>
                <Slider
                    {...setting}
                    ref={sliderRef}
                >
                    {cabin.map((val: any, i: any) => {
                        return (
                            <div onClick={() => {
                                setCabinModal(true)
                                setActiveCabin(val.name)
                            }}>
                                <div className='lg:flex mr-4 lg:mr-10 cursor-pointer shadow-box rounded-lg bg-white'>
                                    <div className='w-full lg:w-[48%]'>
                                        <img className='h-full w-full rounded-t' src={window.innerWidth > 640 ? val.image : val.mobileImage} alt="" />
                                    </div>
                                    <div className='w-full lg:w-[52%] text-left px-2 lg:px-4 py-2 lg:py-6'>
                                        <p className='text-lg lg:text-2xl font-semibold font-outfit'>{val.name}</p>
                                        <div className='min-h-[70px] lg:min-h-[90px]'>
                                            <p className='font-outfit mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'>{val.subtitle}</p>
                                        </div>
                                        <div className='texts'>
                                        <div className='flex flex-wrap mt-3 lg:mt-4 '>
                                            {val.itinerary.slice(0, 6).map((item: any) => {
                                                return (
                                                    <div className='bg-gray-400 rounded-md px-2 lg:px-2 py-1.5 mr-2 lg:mr-2 mb-2 lg:mb-4 flex items-center'>
                                                        <img className='h-5 lg:h-6 mr-1 lg:mr-2' src={item.icon} alt="" />
                                                        <p className='text-xs lg:text-sm font-outfit font-medium'>{item.title}</p>
                                                    </div>
                                                )
                                            })}
                                            <div onClick={() => {
                                                setCabinModal(true)
                                                setActiveCabin(val.name)
                                            }} className='bg-brand-primary rounded-md px-3 lg:px-4 cursor-pointer py-1.5 mr-2 lg:mr-4 mb-2 lg:mb-4 flex items-center'>
                                                <p className='text-xs lg:text-sm font-outfit font-medium text-white'>View All</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </Slider>
            </div>
            <div className=''>
                <BookNow />
            </div>

            <Modal show={cabinModal} align={'center'} className=" w-[90%] lg:w-3/4 center overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[80%] relative" onClose={() => {
                setCabinModal(false)
                setActiveCabin('')
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setCabinModal(false)
                        setActiveCabin('')
                    }}>X</p>
                </div>
                {activeCabinArr &&
                    <div className='overflow-scroll h-[90%] lg:h-[85%]  px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded'>
                        <div className='w-[55%] hidden lg:block'>
                            <ImageGallery
                                items={activeCabinArr?.imageArr}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                autoPlay={true}
                                slideInterval={5000}
                                thumbnailPosition={'bottom'}
                                startIndex={0}
                                lazyLoad={true}
                            />
                        </div>
                        <div className='w-full lg:w-[45%] '>
                            <div className='text-left px-2 lg:px-8 py-2 lg:py-6'>
                                <p className='text-lg lg:text-2xl font-semibold font-outfit'>{activeCabinArr?.name}</p>
                                <p className='font-outfit mt-2 lg:mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'>{activeCabinArr?.subtitle}</p>
                                <div className='w-full mt-3 lg:hidden'>
                                    <ImageGallery
                                        items={activeCabinArr?.imageArr}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        autoPlay={true}
                                        slideInterval={5000}
                                        startIndex={0}
                                        lazyLoad={true}
                                        showThumbnails={false}
                                    />
                                </div>
                                <div className='flex flex-wrap mt-3 lg:mt-4'>
                                    {activeCabinArr?.itinerary.map((item: any) => {
                                        return (
                                            <div className='border border-gray-600 rounded-md px-2 lg:px-3 py-1 lg:py-1.5 mr-2 lg:mr-4 mb-2 lg:mb-4 flex items-center'>
                                                <img className='h-4 lg:h-6 mr-1 lg:mr-2' src={item.icon} alt="" />
                                                <p className='text-xxs lg:text-sm font-outfit font-medium'>{item.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                {activeCabinArr.note &&
                                    <div>
                                        <p className='font-outfit mt-2 lg:mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'><span className='text-brand-primary font-semibold'>Note: </span>{activeCabinArr.note}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    );
}