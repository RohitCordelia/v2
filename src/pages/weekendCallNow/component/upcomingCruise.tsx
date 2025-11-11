import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';
import { FormatAmount } from '../../../../src/utils/formatter/formatter';
import { TiggerFBContactEvent } from '../../../../src/components/Analytics/events';

// import "./slick-customized.css"

type Props = {
    itineraryList: any
};

interface SliderRefType {
    slickGoTo: (index: number) => void;
}

export default function WeekendUpcomingCruise({ itineraryList }: Props) {
    const sliderRef = useRef<SliderRefType | null>(null);

    const [setting, setSetting] = useState<any>({});
    console.log('roh itineraryList', itineraryList);

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, [])

    useEffect(() => {
        sliderRef.current?.slickGoTo(0);
    }, [])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
    };
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: false,
        centerPadding: "30px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: false,
        dots: false,
    };

    return (
        <div className='mt-9'>
            <div className='mobile-slider custom-slider'>
                <Slider {...setting}
                    ref={sliderRef}
                >
                    {itineraryList?.slice(0, 6).map((val: any, i: any) => {
                        return (
                            <div className=''>
                                <div className='mx-2 rounded-lg shadow-md'>
                                    <img className='w-full rounded-t-md' src={val.image_url} alt="" />
                                    <div className='py-3 lg:py-6 bg-white text-center'>
                                        <div className='px-4'>
                                            <p className='text-base lg:text-lg w-full font-semibold font-outfit'>{val.portName}</p>
                                        </div>
                                        <div className='flex items-start justify-between bg-[#F0F5FF] py-2 lg:py-4 px-4 my-3 lg:my-6'>
                                            <div className='text-center'>
                                                <p className='text-xs lg:text-sm font-outfit font-medium'>{moment(val.start_date, 'DD/MM/YYYY').format('DD MMM, YYYY')}</p>
                                                <p className='text-xxs lg:text-xs font-outfit font-medium text-gray-100 '>{moment(val.start_date, 'DD/MM/YYYY').format('dddd')}</p>
                                            </div>
                                            <div className='w-[30%] text-center relative mt-1 lg:mt-[3px]'>
                                                <p className='text-gray-200 whitespace-nowrap overflow-hidden'>------------------------------</p>
                                                <img className='absolute'
                                                    style={{
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)'
                                                    }}
                                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                                                />
                                            </div>
                                            <div className='text-center'>
                                                <p className='text-xs lg:text-sm font-outfit font-medium'>{moment(val.end_date, 'DD/MM/YYYY').format('MMM Do, YYYY')}</p>
                                                <p className='text-xxs lg:text-xs font-outfit font-medium text-gray-100 '>{moment(val.end_date, 'DD/MM/YYYY').format('dddd')}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center px-4'>
                                            <div className='flex flex-col items-start'>
                                                {/* <p className='text-xs text-gray-100 font-medium lg:mb-2'>Starting From</p> */}
                                                {val?.discount_pct != 0 ? <p className='text-xs text-gray-100 font-medium line-through'>₹ {FormatAmount(val?.actual_starting_fare)}</p> : null}
                                                <p className='text-lg lg:text-2xl w-full font-semibold font-outfit'>₹ {FormatAmount(val.starting_fare)}</p>
                                            </div>  
                                                <a href="tel:022-69315865"    
                                                onClick={() => {
                                                    // TiggerFBContactEvent()
                                                    return false;
                                                  }} className="cursor-pointer rounded bg-brand-primary font-outfit text-white py-2 lg:py-3.5 font-semibold lg:text-lg px-5 lg:px-10">Call Now</a></div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                    <div className='h-full rounded relative'>
                        <img className='absolute top-0 w-full h-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-viewall-mobile.webp" alt="" />
                        <div className='bg-black/70 absolute top-0 w-full h-full rounded-md' />
                        <div className='mx-2 rounded shadow-md flex items-center justify-center absolute'
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <a href="/select-itinerary?n=2,3&rt=true" className='border-2 border-white rounded text-white px-6 py-2.5 font-outfit font-medium'>View All</a>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
}