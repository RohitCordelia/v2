import React from 'react'
import Glider from 'react-glider';
import Accordian from '/src/components/UI/Accordion/accordion_basic';

type Props = {
    className: string
};

const Amenities = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg',
        content: 'Twin beds that can be converted to a Queen-size bed'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-icon.svg',
        content: 'Bathroom and vanity area'
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
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-icon.svg',
        content: 'Hairdryer (on request)'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-icon.svg',
        content: 'Secure safe for your valuables'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bottle-icon.svg',
        content: 'Two complimentary bottles of water'
    },
]

const Privileges = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Terminal Check-in Counter'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Toiletries'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Deck 4 (Starlight)'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Deck 10 (Food Court)'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
        content: 'Help Desk on Deck 5'
    },
]

export default function OceanView({
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
                            <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-room-1.webp" />
                        </div>
                        <div>
                            <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-room-2.webp" />
                        </div>
                        <div>
                            <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-room-3.webp" />
                        </div>
                    </Glider>
                </div>
                <div className='py-8 px-6'>
                    <h1 className='text-xl lg:text-3xl font-semibold'>Oceanview Stateroom</h1>
                    <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                        Talk about a private and cozy cabin of your own amidst the sea, because that’s exactly what our ocean view staterooms are all about!
                    </p>
                    <div className='flex items-center mt-5'>
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
                        leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/interconnected-room-icon.svg"
                        openByDefault={false}
                        title="Interconnected Staterooms"
                        titleClass="lg:text-lg text-base font-bold"
                        mainClass="cursor-pointer"
                    >
                        <div className='mt-4'>
                            <p className='text-base font-semibold'>We’ve designed our staterooms in an interconnected way so that the entire family or group can be around each other during the journey</p>
                        </div>
                    </Accordian>
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
