import { title } from 'process';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    image: string;
    imgAlt: string;
    imgTittle: string;
    title: string;
    subtitle: string;
    destination: string;
};

export default function Cards({
    image = "",
    imgAlt = "",
    imgTittle = "",
    title = "",
    subtitle = "",
    destination = ""
}: Props) {
    let navigate = useNavigate()
    return (
        <div className='relative group mb-4 overflow-hidden cursor-pointer'>
            <img src={image} alt={imgAlt} title={imgTittle} className='w-full h-full object-cover' />

            <div
                className='absolute bottom-0 px-3.5 pb-2 pt-32 w-full rounded-lg z-10'
                style={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                }}
            >
                <h2 className='text-white text-4xl lg:mb-[-110px] group-hover:opacity-0 transition-opacity duration-300'>
                    {title}
                </h2>
                <h2 className='text-white text-4xl mb-4 opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out'>
                    {title}
                </h2>
                <p className='text-white opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out mb-4'>
                    {subtitle}
                </p>
            </div>
            <div className='hidden group-hover:block absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/40' />
        </div>
    );
}
