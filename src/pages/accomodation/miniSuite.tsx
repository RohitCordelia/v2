import React from 'react'
import Glider from 'react-glider';
import Accordian from '/src/components/UI/Accordion/accordion_basic';

type Props = {
    className: string
};

const Amenities = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-icon.svg',
        content: 'Jaw dropping view'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-icon.svg',
        content: 'Private balcony'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sitting-area-icon.svg',
        content: 'Comfortable sitting area'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shower-icon.svg',
        content: 'Shower'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-icon.svg',
        content: 'Television'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-icon.svg',
        content: 'Intercom'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-icon.svg',
        content: 'Secure safe for your valuables'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-icon.svg',
        content: 'Hairdryer (on request)'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-icon.svg',
        content: 'vanity area'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bottle-icon.svg',
        content: 'Two complimentary bottles of water'
    },
]

const Privileges = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Priority embarkation and disembarkation'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Porter services'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Complimentary Wi-Fi*'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Complimentary laundry services*'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Reserved section at the Marquee Theatre'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Complimentary Bridge Tour*'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Butler service*'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Breakfast & lunch at the specialty restaurant'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'An evening cocktail experience with the Captain'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'A bottle of sparkling wine and a luscious fruit basket on the first evening of your holiday'
    },
]

export default function MiniSuite({
    className = ''
}: Props) {
    return (
        <div className={`${className}`}>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md'>
                <div>
                    <Glider
                        hasArrows
                        hasDots
                        scrollLock
                        slidesToShow={1}
                    >
                        <div>
                            <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-room-1.webp" />
                        </div>
                        <div>
                            <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-room-2.webp" />
                        </div>
                        <div>
                            <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-room-3.webp" />
                        </div>
                    </Glider>
                </div>
                <div className='py-8 px-6'>
                    <h1 className='text-xl lg:text-3xl font-semibold'>Mini Suite</h1>
                    <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                    Experience premium accommodation onboard with a private balcony for you to sit back and enjoy panoramic views of the ocean from your happy place.
                    </p>
                    <div className='flex items-center mt-4 lg:mt-[5.3rem]'>
                        <img className='lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg" />
                        <p className='text-base lg:text-lg font-bold ml-2 lg:ml-3'>Ocean View available</p>
                    </div>
                    <div className='border-t-2 my-5 border-gray-300' />
                    {/* <div className='flex items-center mt-4'>
                        <img className='lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg" />
                        <p className='text-base lg:text-lg font-bold ml-2 lg:ml-3'>Amenities</p>
                    </div> */}
                    <Accordian
                        leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                        openByDefault={false}
                        title="Amenities"
                        titleClass="lg:text-lg text-base font-bold"
                        mainClass="cursor-pointer"
                    >
                        <div className='mt-4'>
                            {Amenities.map((val, i) =>
                                <div className='flex items-center py-3' key={i}>
                                    <img className='lg:h-4' src={val.icon} />
                                    <p className='text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                </div>
                            )}
                        </div>
                    </Accordian>
                    {/* <div className='border-t-2 my-5 border-gray-300' />
                    <div className='flex items-center mt-4'>
                        <img className='lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg" />
                        <p className='text-base lg:text-lg font-bold ml-2 lg:ml-3'>Privileges</p>
                    </div> */}
                    {/* <Accordian
                        leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                        openByDefault={false}
                        disable={true}
                        title="Privileges"
                        titleClass="lg:text-lg text-base font-bold"
                        mainClass="cursor-pointer"
                    >
                        <div className='mt-4'>
                            {Privileges.map((val, i) =>
                                <div className='flex items-center py-3' key={i}>
                                    <img className='lg:h-3' src={val.icon} />
                                    <p className='text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                </div>
                            )}
                        </div>
                    </Accordian> */}
                    <div className='border-t-2 my-5 border-gray-300' />
                    <Accordian
                        leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/accessible-icon.svg"
                        openByDefault={false}
                        title="Accessible Staterooms Available"
                        titleClass="lg:text-lg text-base font-bold"
                        mainClass="cursor-pointer"
                    >
                        <div className='mt-4'>
                            <p className='text-base font-semibold'>Accessibility is our top-most priority when it comes to our staterooms. That’s why we’ve made them all wheelchair-accessible to ensure utmost comfort for you and your loved ones.</p>
                        </div>
                    </Accordian>
                    <div className='border-t-2 my-5 border-gray-300' />
                    <Accordian
                        leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-room.svg"
                        openByDefault={false}
                        title="Safe & Sanitised Staterooms"
                        titleClass="lg:text-lg text-base font-bold"
                        mainClass="cursor-pointer"
                    >
                        <div className='mt-4'>
                            <p className='text-base font-semibold'>Our staterooms are cleaned and sanitized before and after every journey, because your health & safety is our prime responsibility.</p>
                        </div>
                    </Accordian>
                    <div className='border-t-2 my-5 border-gray-300' />
                    <div className='py-5 pt-7 text-center'>
                        <a href="/upcoming-cruises" 
                        className='lg:text-lg text-base text-white font-bold bg-brand-primary py-4 px-20 lg:px-16 rounded'>Find a Cruise</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
