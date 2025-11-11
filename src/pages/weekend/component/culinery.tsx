import React, { useState, useEffect } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import "./slick-customized.css"

type Props = {};

const restaurant = [
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/starlight-weekend-v2-image.webp',
        "mobileImage": 'https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/cordelia_v2/public/images/Starlight-weekend-v2-mobile-image.webp',
        "title": "The Starlight Restaurant",
        "subTitle": "Experience waterfront dining amidst the enchanting ambient Starlight, our two-storey restaurant, featuring exquisite global cuisines. "
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/chopstix-weekend-v2-image.webp',
        "mobileImage": 'https://images.cordeliacruises.com/cordelia_v2/public/images/chopstix-weekend-v2-mobile-image.webp',
        "title": "Chopstix",
        "subTitle": "Enjoy Pan-Asian cuisine at our speciality restaurant, offering a scenic setting and a delectable menu that will delight your taste buds. "
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/foodcourt-weekend-v2-image.webp',
        "mobileImage": 'https://images.cordeliacruises.com/cordelia_v2/public/images/foodcourt-weekend-v2-mobile-image.webp',
        "title": "Food Court",
        "subTitle": "Savour the flavours of Indian and International cuisines, while you immerse in the tranquillity of the open sea. "
    },
]
const bars = [
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/pool-bar-weekend-v2-image.webp',
        "mobileImage": 'https://images.cordeliacruises.com/cordelia_v2/public/images/pool-bar-weekend-v2-mobile-image.webp',
        "title": "The Pool Bar",
        "subTitle": "With stunning sunsets for the background, the Pool Bar is perfect for gatherings, pool parties and sundowners. "
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/connexions-bar-weekend-v2-image.webp',
        "mobileImage": 'https://images.cordeliacruises.com/cordelia_v2/public/images/connexions-bar-weekend-v2-mobile-image.webp',
        "title": "Connexions Bar",
        "subTitle": "Our fine selection of beverages, when paired with impressive live performances and music, will make every moment spent at the Connexions Bar feel like a celebration. The perfect venue for family get-togethers, seminars, and sangeet functions."
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansclub-weekend-v2-image.webp',
        "mobileImage": 'https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansclub-weekend-v2-mobile-image.webp',
        "title": "Chairman's Club",
        "subTitle": "As the name suggests, everything about our Chairman’s Club oozes luxury and finesse of the highest degree. Perfect for small functions, casual meetings, or even intimate receptions. Get ready to savour the finest beverages in this modern and chic venue."
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/dome-weekend-v2-image.webp',
        "mobileImage": 'https://images.cordeliacruises.com/cordelia_v2/public/images/dome-weekend-v2-mobile-image.webp',
        "title": "The Dome",
        "subTitle": "Dance the night away at our late-night bar. This lively spot offers the finest selection of beverages and even houses a private area for larger groups. Your go-to destination for parties onboard."
    },
]
export default function Weekend({ }: Props) {

    const [setting, setSetting] = useState<any>({});
    const [type, setType] = useState('Restaurants');

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, [])

    const settings = {
        dots: true,
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
        dots: true,
    };

    let desArray = []
    if (type === 'Restaurants') {
        desArray = restaurant
    } else {
        desArray = bars
    }

    return (
        <div>
            <div className='pb-12 pt-7'>
                <button
                    onClick={() => setType('Restaurants')}
                    className={` lg:text-lg min-w-[100px] text-xs font-semibold border-2 border-brand-primary py-2.5 lg:py-3 px-6 lg:px-12 rounded ${type == 'Restaurants' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-4`}
                >
                    Restaurants
                </button>
                <button
                    onClick={() => setType('Bars')}
                    className={` lg:text-lg min-w-[100px] text-xs font-semibold border-2 border-brand-primary py-2.5 lg:py-3 px-6 lg:px-12 rounded ${type == 'Bars' ? 'text-white bg-brand-primary' : 'text-brand-primary'}`}
                >
                    Bars
                </button>
            </div>

            <div className='mobile-slider custom-slider' >
                <Slider {...setting}>
                    {desArray.map((val: any, i: any) => {
                        return (
                            <div className=''>
                                <div className='mx-2 rounded shadow-md mb-2'>
                                    <img src={`${window.innerWidth > 640 ? val.image : val.mobileImage}`} className='' alt="" />
                                    <div className='px-6 text-left py-6'>
                                        <p className='text-lg lg:text-xl font-semibold font-outfit'>{val.title}</p>
                                        <p className='font-outfit mt-3 text-sm lg:text-base lg:leading-7 text-gray-600'>{val.subTitle}</p>
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