import React, { useState, useEffect } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

type Props = {
    data: any;
};

export default function PortCards({ data }: Props) {

    const SamplePrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8 rotate-90 ' src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt="Previous" />
            </div>
        );
    };

    const SampleNextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8 -rotate-90 ' src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt="Next" />
            </div>
        );
    };

    const [setting, setSetting] = useState<any>({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    });

    useEffect(() => {
        const updateSettings = () => {
            window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings);
        };
        updateSettings();
        window.addEventListener("resize", updateSettings);
        return () => window.removeEventListener("resize", updateSettings);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow style={{ display: data.length > 1 ? 'block' : 'none' }} />,
        prevArrow: <SamplePrevArrow style={{ display: data.length > 1 ? 'block' : 'none' }} />,
    };

    const sliderSettings = {
        className: "center",
        centerMode: true,
        centerPadding: "20px",
        autoplaySpeed: 5000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    return (
        <div className='pt-6 lg:pt-10 px-2'>
            <div className='mobile-slider custom-slider'>
                <Slider {...setting}>
                    {data.map((val: any, i: number) => (
                        <div key={i}>
                            <div className='mx-2 rounded shadow-md mb-2 bg-white p-4 flex flex-col'>
                                {/* Image Slider */}
                                <div className="w-full !h-[200px]">
                                    <Slider
                                        dots={false}
                                        infinite={true}
                                        speed={500}
                                        slidesToShow={1}
                                        slidesToScroll={1}
                                        autoplay={false}
                                    >
                                        {val.image.map((img: string) => (
                                            <div key={img}>
                                                <img className='w-full h-[200px] object-cover' src={img} alt="slide" />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                {/* Text Content (Now correctly placed below the image) */}
                                <div className='mt-6'>
                                    <p className='text-sm lg:text-base font-semibold uppercase text-black'>{val.title}</p>
                                    <p className='mt-1 text-xs lg:text-sm lg:leading-6 text-gray-600'>{val.subTitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

