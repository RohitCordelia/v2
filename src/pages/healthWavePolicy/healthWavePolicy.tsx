import React, { useEffect, useState } from 'react'
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { Layout } from '/src/components/Layout';
const ReactPlayer = React.lazy(() => import("react-player/vimeo"));
import ExitIntent from "../../components/ExitIntent";
import "./index.css";

type Props = {}

const highlight = [
    {
        'title': '100% Fresh & Filtered Air',
        'subTitle': 'Our HVAC system continuously intakes 100% fresh ocean air, filtering it for supply to all indoor cabins and areas.',
        'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/fresh-filtered-air.svg',
        'iconAlt':'FilteredAir',
        'iconTitle':'Filtered-Air-On-Cruise'
    },
    {
        'title': 'Completely Sanitized',
        'subTitle': 'The entire ship is sanitized and disinfected thoroughly prior to sailing, and during regular intervals daily.',
        'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/completely-sanitized.svg',
        'iconAlt':'SanitizedCabins',
        'iconTitle':'Sanitized-cruise-cabins'
    },
    {
        'title': 'Elevated Health Protocols',
        'subTitle': 'More doctors and nurses, upgraded facilities, equipment, and sound care plans.',
        'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/elevated-protocols.svg',
        'iconAlt':'safety protocol',
        'iconTitle':'safety-protocol'
    },
    {
        'title': 'Mandatory Web Check - in',
        'subTitle': 'All guests must check-in online. This will help obtain boarding passes and streamline check-ins at the port.',
        'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/web-check-in.svg',
        'iconAlt':'WebCheckIn',
        'iconTitle':'Web-check-in'
    },
    {
        'title': 'Bookings For Shore Excursion',
        'subTitle': 'Guests pre-registered for shore excursions are to be allowed to disembark at port of calls.',
        'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shore-excursions.svg',
        'iconAlt':'adventureActivities',
        'iconTitle':'Cruise-Adventure-activities'
    }
]

const protocols = [
    {
        'title': 'Web Check-in',
        'content': [
            'It is mandatory for all our guests to check-in online and obtain their cruise boarding pass.',
            'Post online check-in, guests will receive a designated time to report to the cruise terminal for a security check and embarkation protocols.',
            'All guests must fill in a pre-travel health questionnaire online and carry it with them during embarkation.',
        ]
    },
    {
        'title': 'At the Port Gate',
        'content': [
            'Guests are expected to arrive at the cruise terminal as per the designated time.',
            'Temperature and health checks will be conducted at various stages during embarkation.',
            'Cruise terminals have been upgraded with advanced technology at the security check to reduce contamination risks.',
            'Luggage will be treated and sanitized at designed areas.',
            'Our terminals feature airport-style entry, exit and luggage management.'
        ]
    },
    {
        'title': 'Transfers from the Gate to Terminal',
        'content': [
            'Additional buses will be operational from the gate to the terminal.',
        ]
    },
    {
        'title': 'At the Cruise Terminal',
        'content': [
            'Additional waiting areas and lounges will be available at the terminal.',
            'Multiple sanitization booths have been set up at the terminal.',
            'Thermal cameras have be installed at the terminal for temperature checks.',
            'All protocols will be followed during shore excursions and only passengers with a prior booking made via Cordelia Cruises will be allowed to disembark for the same.'
        ]
    },
    {
        'title': 'At the Cruise Terminal',
        'content': [
            'All Staterooms will be sanitized prior to check-in. ',
            'Self-scan cruise cards will ensure a complete contactless embarkation process.',
            'Multiple check-in zones will ensure proper social distancing.',
            'The Empress will be completely sanitized before boarding begins.',
            'Please activate your cruise card at the reception for all onboard purchases.',
            'Guests will be greeted to a warm ‘Namaste’ onboard by our crew.',
            'All public areas will be frequently sanitized.'
        ]
    },
]

export default function Destination({ }: Props) {
    const [valetOpen, setValetOpen] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <h1 className='text-2xl lg:text-4xl font-semibold'>Our Healthy Waves Policy</h1>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                    Given that safety is paramount and a non-negotiable factor especially in today’s unprecedented times, Cordelia Cruises have implemented all the standard protocols for our crew members and guests, to make your seacation safe and memorable!
                </p>
                <div className='border-t-2 my-10 border-gray-300' />
                {/* <div className="grid lg:grid-cols-7">
                    <div className="col-span-1" />
                    <div className="col-span-5 lg:text-center">
                        <h1 className='text-2xl lg:text-4xl font-semibold'>Your safety is our priority</h1>
                        <div className='player-wrapper lg:mt-10 mt-5'>
                            <ReactPlayer className='react-player' light='https://images.cordeliacruises.com/cordelia_v2/public/images/safety-protocol-desktop.webp' url='https://vimeo.com/771043125' width='100%' height='100%' controls />
                        </div>
                    </div>
                </div> */}

                <div className='mt-10'>
                    <h2 className='text-2xl lg:text-4xl font-semibold'>Highlights</h2>
                    <div className='grid lg:grid-cols-3 gap-4 mt-10'>
                        {highlight.map((val, i) => (
                            <div className='border border-gray-300/30 lg:text-center shadow-md px-2 py-4 lg:px-6'>
                                <div className='grid lg:grid-cols-1 grid-cols-4' key={i}>
                                    <div className='lg:col-span-1'>
                                        <img className='h-28 inline-block' src={val.icon} alt={val.iconAlt} title={val.iconTitle}/>
                                    </div>
                                    <div className='col-span-3 lg:col-span-1'>
                                        <div className='lg:h-14 mb-3'>
                                            <h3 className='text-xl text-brand-primary font-semibold'>{val.title}</h3>
                                        </div>
                                        <p className='lg:text-base text-sm text-gray-600 font-semibold lg:leading-8'>{val.subTitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='mt-10 lg:mt-20'>
                        <a href="https://images.cordeliacruises.com/static/infographic.pdf" target="_blank" className='bg-brand-primary m-auto text-white text-base font-semibold px-12 py-4 flex justify-center lg:w-1/3 w-full'>
                            <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/download-icon.svg" />
                            Download Safety Protocols
                        </a>
                    </div> */}
                </div>

                <div className='grid lg:grid-cols-2 gap-8 mt-10 lg:mt-20'>
                    {protocols.map((val, i) => (
                        <div className='border border-gray-300/30 shadow-md px-6 py-6' key={i}>
                            <h3 className='text-xl lg:text-2xl text-brand-primary font-semibold mb-6'>{val.title}</h3>
                            {val.content?.map((v, k) => (
                                <div className='flex mb-4' key={k}>
                                    <img className='h-3 mr-2 mt-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt='CordeliaCruises' title='Cordelia-Cruises'/>
                                    <p className='font-semibold text-gray-700/90'>{v}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}