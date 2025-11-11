import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
    data: any
};

const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 1,
    speed: 1000,
    autoplaySpeed: 7000,
    autoplay: true,
    arrows: false,
    dots: true,
};

const Card = ({
    content: {
        comment = '',
        user = '',
        location = '',
        image = ''
    }
}: any) => {
    return (
        <div className='bg-white min-h-[340px] mb-2 lg:min-h-auto mx-2 lg:mx-0 shadow text-center items-center flex flex-col px-6 pb-6 pt-14 lg:pt-20 relative mt-14 lg:mt-24 border border-gray-300/25 rounded-lg'>
            <h2 className='text-xl lg:text-2xl font-semibold'>{user}</h2>
            <p className='text-sm text-brand-primary font-semibold mt-2'>{location}</p>
            <div className='flex my-5'>
                <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                    className="h-6 mr-1"
                    alt="Rating"
                    title='rating-cordelia-cruises'
                />
                <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                    className="h-6 mr-1"
                    alt="Rating"
                    title='rating-cordelia-cruises'
                />
                <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                    className="h-6 mr-1"
                    alt="Rating"
                    title='rating-cordelia-cruises'
                />
                <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                    className="h-6 mr-1"
                    alt="Rating"
                    title='rating-cordelia-cruises'
                />
                <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-grey.svg"
                    className="h-6 mr-1"
                    alt="Rating"
                    title='rating-cordelia-cruises'
                />
            </div>
            <p className='text-sm lg:text-lg leading-6 lg:leading-7'>{comment}</p>
            <div className='absolute -top-10 lg:-top-12'>
                <img
                    src={image}
                    className="h-20 lg:h-24 mr-3 rounded-full"
                    alt="User Image"
                    loading="lazy"
                />
            </div>
        </div>
    )
}
export default function Overview(data: Props) {

    return (
        <div className="px-4 relative">
            <div className='container mx-auto'>
                <h2 className='text-2xl lg:text-4xl font-medium'>What Our Travellers Say</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5 mb-7'>Hear it from the ones who’ve been there and done that. </p>
                <div className='absolute right-0 hidden -top-24 lg:block'>
                    <img className='h-28' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/element-05.svg"  alt='Cordelia Cruises' title='Cordelia-Cruises' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {window.innerWidth < 640 ? (
                        <div className='mobile-slider'>
                            <Slider {...sliderSettings} className={
                                "bannerCarouselSlider packagesCardSlider"
                            }>

                                {data.data.map((val: any, i: any) => {
                                    return (
                                        <Card key={i} content={val} />
                                    )
                                })}
                            </Slider>
                        </div>
                    )
                        : data.data.map((val: any, i: number) =>
                            <Card key={i} content={val} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}
