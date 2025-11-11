import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

export default function SafetyProtocols({ }: Props) {

    return (
        <div className="px-4 py-10 lg:py-16 lg:mt-32 mb-0 bg-gray-300/20">
            <div className='container mx-auto'>
                <div className='flex items-end'>
                    <h2 className='text-2xl lg:text-4xl font-medium'>Safety Protocols</h2>
                    {/* <a className='lg:text-lg text-sm lg:leading-7 ml-5 font-semibold underline text-brand-primary'>Learn More</a> */}
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-3 lg:gap-28 gap-0 mt-8'>
                    <div className="flex">
                        <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fresh-filtered-air.svg"
                            alt="safety protocol"
                            title='Filtered-air-on-cruise'
                            className="lg:h-24 h-14"
                            loading="lazy"
                        />
                        <h1 className={`text-sm lg:text-lg font-semibold self-center`} > 100% Fresh and Filtered Air </h1>
                    </div>
                    <div className="flex">
                        <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/completely-sanitized.svg"
                            alt="safety protocol"
                            title='Safety-protocol'
                            className="lg:h-24 h-14"
                            loading="lazy"
                        />
                        <h1 className={`text-sm lg:text-lg font-semibold self-center`} > Completely Sanitized </h1>
                    </div>
                    <div className='col-span-2 lg:col-span-1 mt-4 lg:mt-0'>
                        <div className="flex justify-center">
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/elevated-protocols.svg"
                                alt="safety protocol"
                                title='Safety-protocol'
                                className="lg:h-24 h-14"
                                loading="lazy"
                            />
                            <h1 className={`text-sm lg:text-lg font-semibold self-center w-[40%] lg:w-full`} > Elevated Health Protocols </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
