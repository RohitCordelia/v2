import React, { useState } from 'react';
import "./index.css"
import "../../../../components/banner/index"
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReactPlayer = React.lazy(() => import("react-player/vimeo"));
type Props = {
    banners: any,
    mobileBanners: any,
    data: {
        title: string
        subTitle: string
        image: string
        mobileImage: string
        guestReaction: any
        images:any
        mobileImages:any
    }
};

export default function Banner({
    banners,
    mobileBanners,
    data: {
        title = "",
        subTitle = "",
        image = "",
        mobileImage = "",
        guestReaction = "",
        images="",
        mobileImages="",
    }
}: Props) {
    let navigate = useNavigate()
    const sliderSettings = {
        infinite: true,
        slidesToShow: 1,
        speed: 300,
        cssEase: "ease-out",
        dots: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    infinite: false,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="lg:mt-[70px] mt-12">
            <Slider autoplay={true} autoplaySpeed={4000} {...sliderSettings} className={
                "bannerCarouselSlider packagesCardSlider"
            }>

                {window.innerWidth < 640 ? mobileImages.map((data: any) => {
                    return <a href={data.link} className='cursor-pointer'><img className="w-full h-full" src={data.url} alt={data.altTag}></img></a>
                }) : images.map((data: any) => {
                    return <a href={data.link} className='cursor-pointer' style={{ height: '100%' }}><img style={{ height: '100%' }} src={data.url} alt={data.altTag} className="banner-image"></img></a>
                })}
            </Slider>
            <div className="container mx-auto lg:my-10 my-6 px-4 lg:px-0">
                <h1 className='text-2xl lg:text-4xl font-semibold'>{title}</h1>
            </div>
        </div>
    );
}
