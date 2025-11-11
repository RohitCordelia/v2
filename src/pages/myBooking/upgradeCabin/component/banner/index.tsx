import React, { useEffect, useState, useRef } from 'react';
import "./index.css"
import "./slick-customized.css"
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = {
    "images": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/party-weekend-banner.webp",
            "link": "#",
            "type": "image",
            "altTag": "Summer",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/couple-weekend-banner.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },
    ],
    "subTitle": "",
    "mobileImages": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/party-weekend-mobile-banner.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/couple-weekend-banner-mobile.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },

    ],
}

interface SliderRefType {
    slickGoTo: (index: number) => void;
    slickNext: () => void;
    slickPlay: () => void;
    slickPause: () => void;
}

export default function Banner({ image }: any) {
    const { images, mobileImages } = data
    const sliderRef = useRef<SliderRefType | null>(null);

    const [bannerIndex, setBannerIndex] = useState<any>(0);
    const [bannerImage, setBannerImage] = useState<any>({});

    const SamplePrevArrow = (props: any) => {
        const { className, style, onClick, currentSlide } = props;
        return (
            <div onClick={() => {
                currentSlide == 0 ?
                    sliderRef.current?.slickGoTo(bannerImage.length) :
                    sliderRef.current?.slickGoTo(bannerIndex - 1)
            }} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/left-arrow.svg' />
            </div>
        )
    }

    function SampleNextArrow(props: any) {
        const { className, style, onClick, currentSlide } = props;
        return (
            <div onClick={() => {
                currentSlide == (bannerImage.length - 1) ?
                    sliderRef.current?.slickGoTo(0) :
                    sliderRef.current?.slickGoTo(bannerIndex + 1)
            }} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/right-arrow.svg' />
            </div>
        )
    }

    const sliderSettings = {
        infinite: false,
        slidesToShow: 1,
        speed: 300,
        dots: true,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    useEffect(() => {
        if (window.innerWidth > 640) {
            setBannerImage(images)
        } else {
            setBannerImage(mobileImages)
        }
    }, [])

    return (
        <>
            <div className="mt-0 homepage-banner">
                <Slider
                    ref={sliderRef}
                    arrows={window.innerWidth > 640 ? true : false}
                    autoplay={true}
                    autoplaySpeed={4500}
                    pauseOnHover={false}
                    {...sliderSettings}
                    className={
                        "bannerCarouselSlider packagesCardSlider"
                    }
                >
                    {image && image.length && image.map((slide: any, index: any) => {
                        let img = ''
                        if(window.innerWidth > 640){
                            img = slide.web
                        }else{
                            img = slide.mobile
                        }
                        return (
                            <div key={index} className='relative'>
                                <img src={img} alt={`Image ${index}`} />
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    );
}
