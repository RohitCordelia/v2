import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function DownloadApp({ }: Props) {
    let bannerBackground = {
        backgroundImage: `url(https://images.cordeliacruises.com/cordelia_v2/public/images/awards-background.webp)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '100%'
    }

    return (
        <div className="mx-auto px-4 w-full py-20 lg:pt-24 lg:pb-32" style={bannerBackground}>
            <div className='container mx-auto'>
            <h2 className='text-2xl lg:text-4xl font-medium mb-10 lg:mb-16'>Awards & Recognitions</h2>
            <div className='lg:hidden flex justify-center items-end mb-5 pb-5 border-b border-b-black/10 lg:border-0'>
                <img className='h-40' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/great-place-to-work-logo.svg" alt="GPTWs awards"
                title='awards-won-by-CordeliaCruise' />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-4'>
                <div className='hidden lg:flex justify-center lg:justify-start w-full lg:w-[78%] lg:border-r lg:border-r-black/30 items-end'>
                    <img className='h-40' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/great-place-to-work-logo.svg" alt="GPTWs awards"
                    title='awards-won-by-CordeliaCruise' />
                </div>
                <div className='flex justify-center items-center'>
                    <img className='w-48' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Highsea.svg" alt="Satte awards"
                    title='awards-won-by-CordeliaCruise' />
                </div>
                <div className='flex justify-center items-center'>
                    <img className='w-48' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Bestcruise.svg" alt="Cordelia cruise won awards"
                    title='awards-won-by-CordeliaCruise' />
                </div>
                <div className='flex justify-center items-center'>
                    <img className='w-48' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Maritime.svg" alt="Cordelia cruise won awards"
                    title='awards-won-by-CordeliaCruise' />
                </div>
                <div className='flex justify-center items-center'>
                    <img className='w-48' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Excellence.svg" alt="Cordelia cruise won awards"
                    title='awards-won-by-CordeliaCruise' />
                </div>
                <div className='hidden lg:flex justify-center items-center'>
                    <img className='w-48' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Iconicholoday.svg" alt="Cordelia cruise won awards"
                    title='awards-won-by-CordeliaCruise' />
                </div>
            </div>
            <div className='lg:hidden flex justify-center items-center py-5'>
                <img className='lg:w-48 w-[44%] max-w-[192px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Iconicholoday.svg" alt="Cordelia cruise won awards"
                title='awards-won-by-CordeliaCruise' />
            </div>
            </div>
        </div>
    );
}
