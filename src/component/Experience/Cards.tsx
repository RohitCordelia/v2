import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { TiggerGAClickEvent } from '../../components/Analytics/events';

type Props = {
    image: string;
    title: string;
    subtitle: string;
    link: string;
    count?: string;
    handleClick?: (title: string, index: number) => void;
    index: number;
};

export default function Cards({
    image = "",
    title = "",
    subtitle = "",
    link = "",
    count = "",
    handleClick,
    index = 0,
}: Props) {
    let navigate = useNavigate();

    return (
        <div className='relative group mb-4 mx-2 rounded-xl cursor-pointer' onClick={() => handleClick && handleClick(title, index)}>
            <img className='h-[380px] lg:h-[420px] w-full object-cover rounded-xl' src={image} alt="" />
            <div className='absolute bottom-0 px-3 pb-2 pt-36 w-full rounded-xl z-10'
                style={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                }}
            >
                <h2 className='text-white text-[5rem] font-bold'>{count}</h2>
                <h2 className='text-white text-3xl mb-4'>{title}</h2>
                {/* <p className='text-white hidden group-hover:block'>{subtitle}</p> */}
                {/* <div className='mt-6 pb-5 hidden group-hover:block'>
                    <a
                        // onClick={() => { TiggerGAClickEvent({ event: `${link}`, type: "info_box" }) }}
                        href={link}
                        className={`lg:text-lg text-base font-semibold border-2 border-brand-primary py-2 px-6 rounded text-white bg-brand-primary`}
                    >
                        Explore More
                    </a>
                </div> */}
            </div>
            {/* <div
                    className='hidden group-hover:block absolute top-0 left-0 w-full rounded-md h-full bg-black/40'
                /> */}
        </div>
    );
}
