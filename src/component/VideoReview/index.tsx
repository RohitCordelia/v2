import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./slick-customized.css"
import "./index.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from '../../components/UI/Modal';

const ReactPlayer = React.lazy(() => import("react-player/youtube"));

type Props = {
    data: {
        guestReaction: any,
        guestReactionTitle: any
    }
};

export default function VideoReview({
    data: {
        guestReaction = "",
        guestReactionTitle = ""
    }
}: Props) {

    const [setting, setSetting] = useState<any>({});
    const [videoPlay, setVideoPlay] = useState<any>(null);

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


    return (
        <div className="px-4">
            <div className='container mx-auto mobile-slider'>
                {/* <h2 className='text-2xl lg:text-4xl font-medium'>What Our Travellers Say</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5 mb-7'>Hear it from the ones who’ve been there and done that. </p> */}
                <h2 className='text-[22px] lg:text-4xl font-medium mb-5 lg:mb-10'>The Destination Of Your Dreams</h2>
                <Slider {...setting}>
                    {guestReaction.map((val:any, i:any) =>
                        <div className='aspect-video px-1 rounded-xl overflow-hidden'>
                            <ReactPlayer
                                light={val.img}
                                url={val.video}
                                width='100%'
                                height='100%'
                                playing={true}
                                loop={true}
                                controls={false}
                            />
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    );
}
