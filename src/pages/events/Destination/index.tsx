import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';

const ReactPlayer = React.lazy(() => import("react-player/vimeo"));
type Props = {};

const India = [
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-image.webp',
        "title": "Mumbai",
        "subtitle": "India’s most fascinating melting pot and city of dreams, Mumbai’s spirit is eternal."
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/goa-image.webp',
        "title": "Goa",
        "subtitle": "A premier tourist destination, Goa is more than its beaches, historical charm, nightlife … it’s a vibe."
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp',
        "title": "Kochi",
        "subtitle": "Kochi is popular to as a gateway to discover God’s own Country, Kerala."
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-image.webp',
        "title": "Chennai",
        "subtitle": "A dynamic and culturally rich destination, where tradition meets modernity, Chennai will captivate you."
    },
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-image.webp',
        "title": "Lakshadweep",
        "subtitle": "Pristine coral islands, lagoon beauty and a lot more, Lakshadweep is as serene as it gets."
    }
]

const Dubai = [
    {
        "image": "https://images.cordeliacruises.com/cordelia_v2/public/images/dubai-image.webp",
        "title": "Dubai",
        "subtitle": "A dazzling metropolis, where skyscrapers touch the clouds, shopping is an art form, and luxury is a way of life."
    }
]

const Srilanka = [
    {
        "image": "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-image.webp",
        "title": "Hambantota",
        "subtitle": "Sri Lanka's southern charm, Hambantota is a backdrop of tropical splendor.This city boasts golden beaches, historic wonders, and more."
    },
    {
        "image": "https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna-image.webp",
        "title": "Jaffna",
        "subtitle": "A cultural treasure trove of Sri Lanka, this vibrant city is known for its historic temples, bustling markets and the list goes on."
    },
    {
        "image": "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-image.webp",
        "title": "Trincomalee",
        "subtitle": "A symphony of pristine beaches, ancient temples, and a welcoming local vibe. Trincomalee is a breath of fresh sea breeze."
    },
]

const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 1,
    speed: 1000,
    arrows: false,
    dots: true,
};



export default function Overview({ }: Props) {
    const [destination, setDestination] = useState('India');
    let navigate = useNavigate()

    const WebContainer = ({ destination }: any) => {
        if (destination === 'India') {
            return (
                <div className='grid gap-4 grid-cols-3 '>
                    <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-image.webp" imgAlt='Cruise from Mumbai' imgTittle='Cruise-From-Mumbai' title="Mumbai" subtitle="India’s most fascinating melting pot and city of dreams, Mumbai’s spirit is eternal." />
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/goa-dekstop-image.webp" imgAlt='Goa Cruises' imgTittle='Mumbai-To-Goa' title="Goa" subtitle="A premier tourist destination, Goa is more than its beaches, historical charm, nightlife … it’s a vibe." />
                    </div>
                    <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-dekstop-image.webp" imgAlt='Kochi Tourism' imgTittle='Cordelia-Cruises-To-Kochi' title="Kochi" subtitle="Kochi is popular to as a gateway to discover God’s own Country, Kerala." />
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-dekstop-image.webp" imgAlt='Chennai Cruises' imgTittle='Cruises-From-South-India' title="Chennai" subtitle="A dynamic and culturally rich destination, where tradition meets modernity, Chennai will captivate you." />
                    </div>
                    <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-image.webp" imgAlt='Lakshadweep Tourism' imgTittle='Cruise-To-Lakshadweep' title="Lakshadweep" subtitle="Pristine coral islands, lagoon beauty and a lot more, Lakshadweep is as serene as it gets." />
                    </div>
                </div>
            )
        } else if (destination === 'Dubai') {
            return (
                <div className='grid gap-4 grid-cols-2'>
                    <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/duabi-new-image.webp" imgAlt='' imgTittle='' title="Dubai" subtitle="A dazzling metropolis, where skyscrapers touch the clouds, shopping is an art form, and luxury is a way of life. " />
                    </div>
                    {/* <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/khorfakkan-new-image.webp" title="Khor Fakkan" subtitle="Dive into coral reefs, or simply unwind on the golden shores. Khor Fakkan is a perfect blend of tranquility and adventure. " />
                    </div> */}
                </div>
            )
        } else {
            return (
                <div className='grid gap-4 grid-cols-2 '>
                    <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-image.webp" imgAlt='' imgTittle='' title="Hambantota" subtitle="Sri Lanka's southern charm, Hambantota is a backdrop of tropical splendor.This city boasts golden beaches, historic wonders, and more. " />
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna-image.webp" imgAlt='' imgTittle='' title="Jaffna" subtitle="A cultural treasure trove of Sri Lanka, this vibrant city is known for its historic temples, bustling markets and the list goes on. " />
                    </div>
                    <div>
                        <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-image.webp" imgAlt='' imgTittle='' title="Trincomalee" subtitle="A symphony of pristine beaches, ancient temples, and a welcoming local vibe. Trincomalee is a breath of fresh sea breeze. " />
                    </div>
                </div>
            )
        }
    }

    const MobileContainer = ({ destination }: any) => {
        let desArray = []
        if (destination === 'India') {
            desArray = India
        } else if (destination === 'Dubai') {
            desArray = Dubai
        } else {
            desArray = Srilanka
        }

        return (
            <div className='mobile-slider'>
                <Slider autoplay={true} autoplaySpeed={4000} {...sliderSettings} className={
                    "bannerCarouselSlider packagesCardSlider"
                }>
                    {desArray.map((data: any) => {
                        return (
                            <div className='px-2' onClick={() => navigate(`/destination?d=${data.title}`)}>
                                <div className='relative group mb-4'>
                                    <img src={data.image} className='h-[350px] w-full rounded-xl' alt="" />
                                    <div className='absolute bottom-0 rounded-xl z-10 px-4 w-full'
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                        }}
                                    >
                                        <h1 className='text-white text-2xl mb-2'>{data.title}</h1>
                                        <p className='text-white text-sm mb-6'>{data.subtitle}</p>
                                    </div>
                                    <div
                                        className=' absolute top-0 left-0 rounded-xl h-full bg-black/40 w-full'
                                    />
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        )
    }
    return (
        <div className="px-4 relative">
            <div className='container mx-auto'>
                <div className='lg:grid lg:grid-cols-4'>
                    <div className='lg:col-span-3'>
                        <h1 className='text-2xl lg:text-4xl lg:font-medium'>Destinations</h1>
                        <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Discover the breathtaking beauty of both Indian and International destinations with Cordelia Cruises.</p>
                    </div>
                </div>
                <div className='pb-9 pt-7'>
                    <button
                        onClick={() => setDestination('India')}
                        className={`w-[100px] lg:w-[170px] lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2 lg:py-3 px-2 lg:px-4 rounded ${destination == 'India' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-1`}
                    >
                        India
                    </button>
                    {/* <button
                        onClick={() => setDestination('Dubai')}
                        className={`w-[100px] lg:w-[170px] lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2 lg:py-3 px-2 lg:px-4 rounded ${destination == 'Dubai' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-1`}
                    >
                        Dubai
                    </button> */}
                    {/* <button
                        onClick={() => setDestination('Srilanka')}
                        className={`w-[100px] lg:w-[170px] lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2 lg:py-3 px-2 lg:px-4 rounded ${destination == 'Srilanka' ? 'text-white bg-brand-primary' : 'text-brand-primary'} `}
                    >
                        Sri Lanka
                    </button> */}
                </div>
                {window.innerWidth > 640 ?
                    <WebContainer destination={destination} />
                    : <MobileContainer destination={destination} />
                }
            </div>
            <div className='absolute -top-44 right-0 hidden lg:block'>
                <img className='h-72' src="https://images.cordeliacruises.com/cordelia_v2/public/images/element-02.webp"  alt='Cordelia Cruises' title='Cordelia-Cruises' />
            </div>
        </div>
    );
}
