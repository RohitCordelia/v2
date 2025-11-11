import { title } from 'process';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    image: string;
    imgAlt:string;
    imgTittle:string;
    link?:string;
    title: string;
    subtitle: string;
    destination: string;
};

export default function Cards({
    image = "",
    imgAlt="",
    imgTittle="",
    link="",
    title = "",
    subtitle = "",
    destination = ""
}: Props) {
    let navigate = useNavigate()
    return (
        <div className='relative group mb-4 rounded-lg overflow-hidden cursor-pointer' onClick={() => destination === 'International' ? navigate(`/${link}`) : navigate(`/destination?d=${title}`)}>
            <img src={image} alt={imgAlt} title={imgTittle} className='w-full' />
            <div className='absolute bottom-0 px-3.5 pb-2 pt-32 w-full rounded-lg z-10'
                style={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                }}
            >
                <h2 className='text-white text-4xl mb-4'>{title}</h2>
                <p className='text-white hidden group-hover:block group-hover:ease-in group-hover:duration-300'>{subtitle}</p>
                <div className='mt-3 pb-3 hidden group-hover:block'>
                    <button
                        className={`lg:text-lg text-base font-semibold border-2 border-brand-primary py-2.5 px-6 rounded text-white bg-brand-primary`}
                    >
                        Explore More
                    </button>
                </div>
            </div>
            <div
                className='hidden group-hover:block absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/40'
            />
        </div>
    );
}
