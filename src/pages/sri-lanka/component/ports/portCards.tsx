import React, { useState, useEffect } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./slick-customized.css"

type Props = {
    data: any
};

const couple = [
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-entertain-v2-01.webp',
        "title": "Burlesque",
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-entertain-v2-02.webp',
        "title": "Balle Balle",
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-entertain-v2-03.webp',
        "title": "Indian Cinemagic",
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-entertain-v2-04.webp',
        "title": "Live Music",
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-entertain-v2-05.webp',
        "title": "Magic Show",
    }
]
export default function PortCards({ data }: Props) {

    const [setting, setSetting] = useState<any>({});

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, [])

    const SamplePrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8 rotate-90' src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt="CruiseToSriLanka" title='Cruise-To-SriLanka' />
            </div>
        )
    }

    function SampleNextArrow(props: any) {
        const { className, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8 -rotate-90' src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt="CruiseToSriLanka" title='Cruise-To-SriLanka' />
            </div>
        )
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: false,
        dots: false,
    };

    

    return (
        <div className='pt-6 lg:pt-10 px-2'>
            <div className='mobile-slider custom-slider' >
                <Slider {...setting}>
                    {data.map((val: any, i: any) => {
                        return (
                            <div className=''>
                                <div className='mx-2 rounded shadow-md mb-2'>
                                    <img src={`${val.image }`} className='' alt={val.imageAlt} title={val.imageTitle} />
                                    <div className='px-4 lg:px-6 text-left py-4 lg:py-6'>
                                        <p className='text-sm lg:text-base font-semibold uppercase'>{val.title}</p>
                                        <p className='mt-3 text-xs lg:text-sm lg:leading-6 text-gray-600'>{val.subTitle}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    )}
                </Slider>
            </div>
        </div>
    );
}