import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function Section4({ }: Props) {

    return (
        <div className="pt-12 lg:pt-16 pb-16 lg:pb-10 px-4 bg-[#FFFAF5] -mb-10 lg:mb-0 relative">
            <div className='container mx-auto'>
                <div className='text-center mb-10 lg:mb-16 px-3 lg:px-0'>
                    <p className='text-xl lg:text-3xl font-semibold lg:font-semibold font-outfit'>Valentine’s Special Bar Drinks</p>
                    <p className='text-base lg:text-xl font-light lg:font-extralight font-outfit mt-4'>Get high on emotions and revel in the spirit of love.</p>
                    <div className='flex items-start lg:items-center mt-3 lg:mt-6 justify-center'>
                        <img className='mr-1 lg:mr-2 w-7 mt-1 lg:mt-0 lg:w-10' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Alcohol-icon.svg" alt="" />
                        <p className='text-base lg:text-xl font-light lg:font-medium font-outfit mt-2'>All-inclusive alcohol beverage package*</p>
                    </div>
                </div>
            </div>
            <img className='absolute h-4 lg:h-8 top-7 lg:top-20 right-5 lg:right-80' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-08.svg" alt="" />
            <img className='absolute hidden lg:block h-4 bottom-24 left-20' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-06.svg" alt="" />
            <img className='absolute hidden lg:block h-4 bottom-24 right-20' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-06.svg" alt="" />
            <img className='absolute hidden lg:block h-4 top-20 left-80' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/love-element-07.svg" alt="" />
        </div>
    );
}
