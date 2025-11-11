import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';
import Button from '../../components/UI/Button';

const ReactPlayer = React.lazy(() => import("react-player/vimeo"));
type Props = {};

const India = [
    {
        "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-image.webp',
        "title": "Lakshadweep",
        "subtitle": "Pristine coral islands, lagoon beauty and a lot more, Lakshadweep is as serene as it gets."
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
    // {
    //     "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-image.webp',
    //     "title": "Mumbai",
    //     "subtitle": "India’s most fascinating melting pot and city of dreams, Mumbai’s spirit is eternal."
    // },
    // {
    //     "image": 'https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-image.webp',
    //     "title": "Chennai",
    //     "subtitle": "A dynamic and culturally rich destination, where tradition meets modernity, Chennai will captivate you."
    // },
]

const International = [
    {
        title: "Singapore",
        subtitle: "Step into the future with a visit to Singapore, a cosmopolitan city where modernity meets tradition. From its iconic skyline to its lush gardens, Singapore offers an extraordinary urban experience.",
        image: "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-destination-image-02.webp",
        link: "southeast-asia-cruises",
    },
    {
        title: "Malaysia",
        subtitle: "Cruise through Malaysia’s stunning coastline, where modern skylines, lush rainforests, and crystal-clear waters create an unforgettable vacation. Explore bustling markets, historic landmarks, and tropical retreats all in one voyage.",
        image: "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-malaysia-destination-image.webp",
        link: "southeast-asia-cruises",
    },
    {
        title: "Thailand",
        subtitle: "Set sail to Phuket's soft sandy beaches and take in the stunning turquoise waters, showing why it's known as Thailand's crown jewel. The adventurous, lush rainforests and the buzzing nightlife are ready to be explored.",
        image: "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-thailand-destination-image.webp",
        link: "southeast-asia-cruises",
    },
    {
        title: "Sri Lanka",
        subtitle: "Discover the enchanting island of Sri Lanka, where golden beaches meet ancient temples and lush landscapes. Sail to Trincomalee, Hambantota, and Jaffna, immersing yourself in the vibrant culture and breathtaking beauty of this tropical paradise.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-srilanka-destination-image.webp",
        link: "srilanka",
    },
    {
        title: "Puducherry",
        subtitle: "Puducherry, a charming coastal town with French colonial influences, is a serene getaway offering tranquil beaches, vibrant culture, and a blend of both traditional and European charm.",
        image: "http://images.cordeliacruises.com/cordelia_v2/public/images/pondicherry-french-town-tour-04.webp",
        link: "pondicherry",
    },
    {
        title: "Vizag",
        subtitle: "Visakhapatnam, is a coastal gem that offers pristine beaches, awe-inspiring hills, and rich cultural heritage. Explore the perfect blend of natural beauty and modern development in this vibrant city by the sea.",
        image: "http://images.cordeliacruises.com/cordelia_v2/public/images/Vizag-VIZ03.webp",
        link: "visakhapatnam",
    },
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

    const WebNewContainer = ({ destination }: any) => {
        let desArray: any = []
        if (destination === 'India') {
            desArray = India
        } else if (destination === 'International') {
            desArray = International
        }

        return (
            <Slider {...sliderSettings} slidesToShow={3} arrows={destination === 'International' ? true : false} centerMode={false} infinite={false}>
                {desArray.map((data: any) => {
                    return (
                        <div className='relative group h-[300px] !w-[96%] mb-4 rounded-lg overflow-hidden cursor-pointer' onClick={() => destination === 'International' ? navigate(`/${data.link}`) : navigate(`/destination?d=${data.title}`)}>
                            <img src={data.image} alt={data.imgAlt} title={data.imgTittle} className='w-full h-full object-cover' />
                            <div className='absolute bottom-0 px-3.5 pb-2 pt-32 w-full rounded-lg z-10'
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                }}
                            >
                                <h2 className='text-white text-4xl mb-4'>{data.title}</h2>
                                <p className='text-white !hidden group-hover:ease-in group-hover:duration-300 group-hover:!line-clamp-6'>{data.subtitle}</p>
                                <div className='mt-3 pb-3 hidden group-hover:block'>
                                    <Button text="Explore More" size="sm" />
                                </div>
                            </div>
                            <div
                                className='hidden group-hover:block absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/40'
                            />
                        </div>
                    )
                })}
            </Slider>
        );
    }

    // const WebContainer = ({ destination }: any) => {
    //     if (destination === 'India') {
    //         return (
    //             <div className='grid gap-4 grid-cols-3 '>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-image.webp" imgAlt='Cruise from Mumbai' imgTittle='Cruise-From-Mumbai' title="Mumbai" subtitle="India’s most fascinating melting pot and city of dreams, Mumbai’s spirit is eternal." />
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/goa-dekstop-image.webp" imgAlt='Goa Cruises' imgTittle='Mumbai-To-Goa' title="Goa" subtitle="A premier tourist destination, Goa is more than its beaches, historical charm, nightlife … it’s a vibe." />
    //                 </div>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-dekstop-image.webp" imgAlt='Kochi Tourism' imgTittle='Cordelia-Cruises-To-Kochi' title="Kochi" subtitle="Kochi is popular to as a gateway to discover God’s own Country, Kerala." />
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-dekstop-image.webp" imgAlt='Chennai Cruises' imgTittle='Cruises-From-South-India' title="Chennai" subtitle="A dynamic and culturally rich destination, where tradition meets modernity, Chennai will captivate you." />
    //                 </div>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-image.webp" imgAlt='Lakshadweep Tourism' imgTittle='Cruise-To-Lakshadweep' title="Lakshadweep" subtitle="Pristine coral islands, lagoon beauty and a lot more, Lakshadweep is as serene as it gets." />
    //                 </div>
    //             </div>
    //         )
    //     } else if (destination === 'International') {
    //         return (
    //             <div className='grid gap-4 grid-cols-2'>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-srilanka-destination-image.webp" imgAlt='' imgTittle='' link="srilanka" title="Sri Lanka" subtitle="Discover the enchanting island of Sri Lanka, where golden beaches meet ancient temples and lush landscapes. Sail to Trincomalee, Hambantota, and Jaffna, immersing yourself in the vibrant culture and breathtaking beauty of this tropical paradise." />
    //                 </div>
    //                 <div>
    //                     <Cards destination={destination} image="http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-destination-image-02.webp" imgAlt='' imgTittle='' link="singapore" title="Singapore" subtitle="Step into the future with a visit to Singapore, a cosmopolitan city where modernity meets tradition. From its iconic skyline to its lush gardens, Singapore offers an extraordinary urban experience." />
    //                 </div>
    //                 <div>
    //                     <Cards destination={destination} image="http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-malaysia-destination-image.webp" imgAlt='' imgTittle='' link="singapore" title="Malaysia" subtitle="Cruise through Malaysia’s stunning coastline, where modern skylines, lush rainforests, and crystal-clear waters create an unforgettable vacation. Explore bustling markets, historic landmarks, and tropical retreats all in one voyage." />
    //                 </div>
    //                 <div>
    //                     <Cards destination={destination} image="http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-thailand-destination-image.webp" imgAlt='' imgTittle='' link="singapore" title="Thailand" subtitle="Set sail to Phuket's soft sandy beaches and take in the stunning turquoise waters, showing why it's known as Thailand's crown jewel. The adventurous, lush rainforests and the buzzing nightlife are ready to be explored." />
    //                 </div>
    //             </div>
    //         )
    //     } else if (destination === 'Dubai') {
    //         return (
    //             <div className='grid gap-4 grid-cols-2'>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/duabi-new-image.webp" imgAlt='' imgTittle='' title="Dubai" subtitle="A dazzling metropolis, where skyscrapers touch the clouds, shopping is an art form, and luxury is a way of life. " />
    //                 </div>
    //                 {/* <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/khorfakkan-new-image.webp" title="Khor Fakkan" subtitle="Dive into coral reefs, or simply unwind on the golden shores. Khor Fakkan is a perfect blend of tranquility and adventure. " />
    //                 </div> */}
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className='grid gap-4 grid-cols-2 '>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-image.webp" imgAlt='' imgTittle='' title="Hambantota" subtitle="Sri Lanka's southern charm, Hambantota is a backdrop of tropical splendor.This city boasts golden beaches, historic wonders, and more. " />
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna-image.webp" imgAlt='' imgTittle='' title="Jaffna" subtitle="A cultural treasure trove of Sri Lanka, this vibrant city is known for its historic temples, bustling markets and the list goes on. " />
    //                 </div>
    //                 <div>
    //                     <Cards destination={destination} image="https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-image.webp" imgAlt='' imgTittle='' title="Trincomalee" subtitle="A symphony of pristine beaches, ancient temples, and a welcoming local vibe. Trincomalee is a breath of fresh sea breeze. " />
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

    const MobileContainer = ({ destination }: any) => {
        let desArray = []
        if (destination === 'India') {
            desArray = India
        } else if (destination === 'International') {
            desArray = International
        } else if (destination === 'Dubai') {
            desArray = Dubai
        } else {
            desArray = Srilanka
        }

        return (
            <div className='mobile-slider mb-10'>
                {/* <Slider autoplay={true} autoplaySpeed={4000} {...sliderSettings} className={ */}
                <Slider {...sliderSettings} infinite={false} className={
                    "bannerCarouselSlider packagesCardSlider"
                }>
                    {desArray.map((data: any) => {
                        return (
                            <div className='px-2' onClick={() => destination === "International" ? navigate(`/${data.link}`) : navigate(`/destination?d=${data.title}`)}>
                                <div className='relative group'>
                                    <img src={data.image} className='h-[360px] w-full rounded-xl object-cover' alt="" />
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
                        <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Discover the breathtaking beauty of both Domestic and International destinations with Cordelia Cruises.</p>
                    </div>
                </div>
                {/* <div className='pb-9 pt-7'>
                    <button
                        onClick={() => setDestination('India')}
                        className={`w-[100px] lg:w-[170px] lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2 lg:py-3 px-2 lg:px-4 rounded ${destination == 'India' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-1`}
                    >
                        India
                    </button>
                    <button
                        onClick={() => setDestination('International')}
                        className={`w-[120px] lg:w-[170px] lg:text-lg text-sm font-semibold border-2 border-brand-primary py-2 lg:py-3 px-2 lg:px-4 rounded ${destination == 'International' ? 'text-white bg-brand-primary' : 'text-brand-primary'} mr-1`}
                    >
                        International
                    </button>
                </div> */}
                <div className='my-5'>
                    <p className='text-sm lg:text-xl text-brand-primary font-bold'>Departure from Mumbai</p>
                </div>
                {window.innerWidth > 640 ?
                    // <WebContainer destination={destination} />
                    <WebNewContainer destination={"India"} />
                    : <MobileContainer destination={"India"} />
                }
                <div className='my-5'>
                    <p className='text-sm lg:text-xl text-brand-primary font-bold'>Departure from Chennai</p>
                </div>
                {window.innerWidth > 640 ?
                    // <WebContainer destination={destination} />
                    <WebNewContainer destination={"International"} />
                    : <MobileContainer destination={"International"} />
                }
            </div>
            <div className='absolute -top-[60px] lg:-top-44 right-0 lg:block'>
                <img className='h-[120px] lg:h-72' src="https://images.cordeliacruises.com/cordelia_v2/public/images/element-02.webp"  alt='Cordelia Cruises' title='Cordelia-Cruises' />
            </div>
        </div>
    );
}
