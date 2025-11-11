import React, { useState, useEffect } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookNow } from './extraElement';
// import "./slick-customized.css"

type Props = {};

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
export default function Gateway({ }: Props) {

    const [setting, setSetting] = useState<any>({});

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
    };
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: false,
        dots: false,
    };

    return (
        <div className='pt-10'>
            <div className='mobile-slider'>
                <Slider {...setting}>
                    {couple.map((val: any, i: any) => {
                        return (
                            <div className=''>
                                <div className='mx-2 rounded shadow-md mb-2 relative'>
                                    <img className='rounded-md' src={val.image} alt="" />
                                    <div
                                        className='absolute text-center w-full bottom-5 left-0'
                                    >
                                        <p className='text-2xl lg:text-2xl w-full font-semibold lg:font-medium font-outfit text-white'>{val.title}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </Slider>
            </div>
            <BookNow/>
        </div>
    );
}