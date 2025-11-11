import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./slick-customized.css"
import "./index.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';
import Modal from '../../components/UI/ModalCenter';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Gallery/index.css";
// import { TiggerGAClickEvent } from '../../components/Analytics/events';

type Props = {
    content: any,
    info_section: any
};

const EntertainmentImages = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-bhale-bhale-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-bhale-bhale-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-burlsque-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-burlsque-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-burlsquee-popup-web-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-burlsquee-popup-web-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cinemagic-popup-web-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cinemagic-popup-web-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-bhale-bhale-popup-web-04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-bhale-bhale-popup-web-04.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-indian-cinematic-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-indian-cinematic-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-live-music-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-live-music-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-magicin%27s-cut-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-magicin%27s-cut-popup-image.webp",
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-rock-you-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-rock-you-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Public_Stardust_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Public_Stardust_Web.webp'
    },
]

const DiningImages = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chopstix-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chopstix-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chefs-table-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chefs-table-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chefs-table-popup-web-01.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chefs-table-popup-web-01.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chop-stix-popup-web-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chop-stix-popup-web-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-food-court-popup-web-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-food-court-popup-web-03.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-starlight-popup-web-04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-starlight-popup-web-04.webp",
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-cagney-steakhouse-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-cagney-steakhouse-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-crossing-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-crossing-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-lebistro-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-lebistro-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-spinnaker-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-spinnaker-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/lacunica.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/lacunica.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-01.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-01.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-02.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-02.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/LeBistro.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/LeBistro.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sugarcane.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sugarcane.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-dawn-le-bistro-popup-web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-dawn-le-bistro-popup-web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Cagney%27s_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Cagney%27s_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FourSeasons_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FourSeasons_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_GardenCafe_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_GardenCafe_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Ginza_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Ginza_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_La_Cucina_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_La_Cucina_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Great+Outdoors_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Great+Outdoors_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Los_Lobos_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Los_Lobos_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_LeBistro_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_LeBistro_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Moderno_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Moderno_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_SevenSeas_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_SevenSeas_Web.webp'
    }
]

const ActivitiesImages = [
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-rock-climb-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-rock-climb-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-rock-climb-popup-web-06.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-rock-climb-popup-web-06.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-gym-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-gym-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-gym-popup-web-05.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-gym-popup-web-05.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-yoga-popup-image.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-yoga-popup-image.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/pool.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/pool.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-swimming-pool-popup-web-02.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-swimming-pool-popup-web-02.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/shopping.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/shopping.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-relax-popup-web-03.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-relax-popup-web-03.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-spa-popup-web-04.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-spa-popup-web-04.webp",
    },
    {
        original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-arcade-popup-web-08.webp",
        thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-arcade-popup-web-08.webp",
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PoolDeck-popup.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PoolDeck-popup.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-splash-academy-popup-image.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-splash-academy-popup-image.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/meetings.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/meetings.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/pool.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/pool.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/shopping.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/shopping.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_PopUp_Teen_Club_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_PopUp_Teen_Club_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Swimming_PopUp_Pool_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Swimming_PopUp_Pool_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Cordelia_Academy_PopUp_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Cordelia_Academy_PopUp_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_PopUp_Gym_+skills_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_PopUp_Gym_+skills_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Gaming_Arcade_PopUp_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Gaming_Arcade_PopUp_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Library_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Library_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Photo_Gallery_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Photo_Gallery_Web.webp'
    },
    {
        original: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Spa_Web.webp',
        thumbnail: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Spa_Web.webp'
    }
]

const Images = {
    Entertainment: EntertainmentImages,
    "Dining Venues": DiningImages,
    Activities: ActivitiesImages,
}

export default function Experience({
    content, info_section
}: Props) {

    const [setting, setSetting] = useState<any>({});
    const [thumbnailPosition, setThumbnailPosition] = useState<any>('right');
    const [sliderIndex, setSliderIndex] = useState<any>(0);
    const [showGallery, setShowGallery] = useState<any>(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (window.innerWidth > 640) {
            setThumbnailPosition('right')
        } else {
            setThumbnailPosition('bottom')
        }
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true
    };
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: false,
        dots: true,
    };

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, [])

    const handleClick = (info_title: string, index: number) => {
        setShowGallery(true);
        setSliderIndex(index + 1);
        setImages(Images[info_title]);
    }

    const WebContainer = () => {
        return (
            <Slider {...setting}>
                {content.map((val: any, i: any) =>
                    <Cards image={val.img_url} title={val.title} subtitle={val.sub_title} link={val.link} count={val.count} handleClick={handleClick} index={i} />
                )}
            </Slider>
        )
    }

    const MobileContainer = () => {
        return (
            <div className='mobile-slider'>
                <Slider autoplay={true} autoplaySpeed={4000} {...sliderSettings} className={
                    "bannerCarouselSlider packagesCardSlider"
                }>
                    {content.map((data: any, index: number) => {
                        return (
                            <div className='px-2' onClick={() => handleClick(data?.title, index)}>
                                <div className='relative group mb-4'>
                                    <img src={data.img_url} className='h-[350px] w-full object-cover rounded-xl' alt="" />
                                    <div className='absolute bottom-0 rounded-xl z-10 px-4 w-full'
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                        }}
                                    >
                                        <h2 className='text-white text-[5rem] font-bold'>{data.count}</h2>
                                        <h1 className='text-white text-2xl mb-2'>{data.title}</h1>
                                        {/* <p className='text-white text-sm mb-6'>{data.sub_title}</p>
                                        <div className='my-6'>
                                            <a
                                                // onClick={() => { TiggerGAClickEvent({ event: `${data.link}`, type: "info_box" }) }}
                                                href={data.link}
                                                className={`lg:text-lg text-base font-semibold border-2 border-brand-primary py-2 px-6 rounded text-white bg-brand-primary`}
                                            >
                                                Explore More
                                            </a>
                                        </div> */}
                                    </div>
                                    {/* <div
                                        className=' absolute top-0 left-0 rounded-xl h-full bg-black/60 w-full'
                                    /> */}
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        )
    }


    return (
        <>
            <div className="px-4 relative">
                <div className='container mx-auto'>
                    <h2 className='text-2xl lg:text-4xl font-medium '>{info_section.title}</h2>
                    <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5 mb-7 lg:mb-10'>{info_section.sub_title}</p>
                    {window.innerWidth > 640 ?
                        <WebContainer />
                        : <MobileContainer />
                    }
                </div>
                <div className='absolute -top-36 right-0 hidden lg:block'>
                    <img className='h-64' src="https://images.cordeliacruises.com/cordelia_v2/public/images/element-03.webp"  alt='Cordelia Cruises' title='Cordelia-Cruises' />
                </div>
            </div>

            <Modal show={showGallery} align={'center'} className="w-full lg:w-2/3 relative" onClose={() => setShowGallery(false)}>
                <div className=' w-full h-full bg-white p-3 pr-[7px] rounded-lg'>
                    <div
                        className='absolute right-0 lg:-right-10 -top-20 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full'
                        onClick={() => setShowGallery(false)}
                    >
                        <p className='text-sm lg:text-2xl'> X </p>
                    </div>

                    <ImageGallery
                        items={images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={5000}
                        thumbnailPosition={thumbnailPosition}
                        startIndex={0}
                        lazyLoad={true}
                    />
                </div>
            </Modal>
        </>
    );
}
