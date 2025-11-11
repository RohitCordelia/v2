import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../index.css'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../../components/UI/ModalCenter';

type Props = {};

export default function Section2({ }: Props) {
    return (
        <div className="pt-10 lg:pt-28 pb-16 lg:pb-20 px-4 relative" style={{
            backgroundImage: innerWidth > 640 ? 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-sailing-background.webp")' : 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-sailing-mobile-background.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            height: '100%' 
        }}>
            <div className='container mx-auto'>
                <div className='lg:text-center mb-10 lg:mb-12'>
                    <div className='lg:flex text-center lg:justify-center'>
                        <p className='text-2xl lg:text-4xl font-extrabold italic font-montserrat uppercase pt-10 lg:pt-0 text-[#F326DE]'>The party sets sail: </p>
                        <p className='text-2xl lg:text-4xl font-extrabold italic mb-6 font-montserrat uppercase text-[#26C2F3] lg:ml-2'>11-13 May</p>
                    </div>
                </div>
                <div className='hidden lg:block px-52'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-Itinerary.webp" alt="" />
                    <div className='flex justify-center'>
                        <a href="/upcoming-cruises?itinerary_id=86025f26-e82e-4906-b1c0-424765cb785e" className='bg-white px-6 py-4 mt-14 text-lg font-bold rounded-md uppercase'>Book Your cruise</a>
                    </div>
                </div>
                <div className='lg:hidden'>
                    <div className='relative'>
                        <img className='' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-control-Itinerary-mobile.webp" alt="" />
                    </div>
                    <div className='mb-4 pt-16 text-center'>
                        <a href="/upcoming-cruises?itinerary_id=86025f26-e82e-4906-b1c0-424765cb785e" className='bg-white px-5 py-3.5 mt-20 text-sm font-semibold rounded uppercase'>Book Your cruise</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
