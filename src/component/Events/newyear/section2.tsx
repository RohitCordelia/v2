import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../components/UI/ModalCenter';

type Props = {};

export default function Section2({ }: Props) {
    return (
        <div className="pt-10 lg:pt-12 pb-16 lg:pb-10 px-4 relative">
            <div className='container mx-auto'>
                <div className='lg:text-center mb-10 lg:mb-16'>
                    <p className='text-xl lg:text-3xl font-bold mb-6 font-outfit'>Cruise on Dec 27th 2024 - Jan 01st 2025 (5N/6D)</p>
                    <p className='hidden lg:block text-sm lg:text-[18px] leading-7 capitalize font-outfit'>Enter 2025 in style aboard the Empress and make it grand with all the luxurious experiences that await you.</p>
                </div>
                <div className='hidden lg:block'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/newyear'25-new-itinerary-desktop.webp" alt="" />
                    <div className='flex justify-center'>
                        <a href="/upcoming-cruises?itinerary_id=c886833b-306e-4ce2-ae56-4faeaa77981c" className='bg-brand-primary px-6 py-3 mt-20 text-base font-bold text-white rounded-md uppercase'>Book Your cruise</a>
                    </div>
                    <img className='absolute top-44 left-0 w-[7%]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/newyear-element.svg" alt="" />
                    <img className='absolute bottom-48 right-28 w-8' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/paper-element-4.svg" alt="" />
                    <img className='absolute top-24 left-48 w-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/paper-element-2.svg" alt="" />
                    <img className='absolute top-0 right-12 w-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/paper-element-3.svg" alt="" />
                    <img className='absolute bottom-48 left-72 right-0 mx-auto w-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/paper-element-5.svg" alt="" />
                </div>
                <div className='lg:hidden'>
                    <div className='mb-16'>
                        <a href="/upcoming-cruises?itinerary_id=c886833b-306e-4ce2-ae56-4faeaa77981c" className='bg-brand-primary px-6 py-3 mt-20 text-xs font-semibold text-white rounded uppercase'>Book Your cruise</a>
                    </div>
                    <div className='relative'>
                        <img className='' src="https://images.cordeliacruises.com/cordelia_v2/public/images/newyear'25-new-itinerary-mobile.webp" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
