import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Layout } from '../../components/Layout';
import { useGetViewItineraryMutation } from '../../services/upcomingCruise/upcomingCruise';
import Banner from './component/banner';
import { useNavigate } from 'react-router-dom';
import CruiseHighlights from './component/cruiseHighlight';
import ShoreExContainer from './component/shoreExContainer';
import { FormatAmount } from '../../utils/formatter/formatter';
import Tooltip from '../../components/UI/Tooltip/ShoreEx';
import { GetStore } from '../../utils/store/store';
import './index.css'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

type Props = {};

export default function ViewItinerary({ }: any) {
    const store = GetStore();
    const [getViewItinerary] = useGetViewItineraryMutation();
    let navigate = useNavigate();
    const itineraryId = new window.URLSearchParams(window.location.search).get(
        'id'
    );

    const [isLoading, setIsLoading] = useState<any>();
    const [view, setView] = useState<any>(false);
    const [itineraryData, setItineraryData] = useState<any>();
    const [isFixed, setIsFixed] = useState(false);
    const [marginTop, setMarginTop] = useState('32px');

    const scrollDivRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (scrollDivRef.current) {
                const scrollTop = window.scrollY;
                console.log('roh scr', scrollTop);
                
                if (scrollTop >= 420) {
                    setIsFixed(true);
                    setMarginTop('160px')
                } else {
                    setIsFixed(false);
                    setMarginTop('32px')
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const _payload = {
            itinerary_id: itineraryId
        };
        setIsLoading(true);
        getViewItinerary(_payload)
            .unwrap()
            .then((res: any) => {
                setItineraryData(res);
                setIsLoading(false);
            })
            .catch((res: any) => {
                setIsLoading(false);
                console.log('Error: ', res);
            });
    }, []);

    const scrollIntoViewWithOffset = (selector: any, offset: any) => {
        const blue = document.getElementById(selector);
        if (blue) {
            let position = blue!.getBoundingClientRect();
            window.scrollTo({ top: position.top + window.scrollY - offset, behavior: 'smooth' });
        }
    }

    const PortCard = ({ port }: any) => {
        return (
            <div className="mb-2">
                <div className="">
                    <div className="flex items-center">
                        <div className="bg-brand-gradient rounded-md flex flex-col w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] items-center justify-center">
                            <p className="text-white text-xs lg:text-sm">Day</p>
                            <p className="text-white text-sm lg:text-lg font-bold">
                                {port.day}
                            </p>
                        </div>
                        <div className="ml-4">
                            <p className="text-base lg:text-xl font-semibold">
                                {port?.name != 'At Sea' ? port?.name + ' Port' : port?.name}
                            </p>
                            <p className="text-xs lg:text-base text-brand-orange-text font-medium mt-0.5">
                                {port?.title}{' '}
                            </p>
                        </div>
                    </div>
                    <div className="py-4 lg:py-8">
                        <p className="text-gray-100 text-xs lg:text-base leading-6">
                            {port.description}
                        </p>
                    </div>
                    {port.images && port.images.length ? (
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            {port.images.map((val: any) => (
                                <div>
                                    <img src={val} alt="" />
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>

                {port.shore_excursions && port.shore_excursions.length ? (
                    <div className="">
                        <div className='flex'>
                        <Tooltip text="A shore excursion is a group tour or activity aimed at cruise travelers who can spend time in each port they're visiting on their itinerary. <br/> All shore excursions are available at an additional cost.">
                                <div className="flex items-center">
                                    <p className="text-xl font-bold">Shore Excursions</p>
                                    <img
                                        className="ml-2 h-6"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-purple-icon.svg"
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                        </div>
                        <div className='mb-8'>
                            <ShoreExContainer shoreEx={port.shore_excursions} />
                        </div>
                    </div>
                ) : null}
            </div>
        );
    };

    let data = [
        'Inclusive of all meals at food court & starlight restaurant',
        'Jain food available at starlight',
        'All inclusive unlimited beverages package'
    ];

    const inclusionData = [
        {
            night: 2,
            shows: [
                { name: 'Indian Cinemagic', status: true },
                { name: 'Balle Balle', status: true },
                { name: 'Burlesque Show*', status: true },
                { name: 'Romance In Bollywood', status: false },
                { name: 'Magician’s Cut', status: false },
                { name: 'Magical Evening*', status: true },
                { name: 'Magical Workshop*', status: false }
            ]
        },
        {
            night: 3,
            shows: [
                { name: 'Indian Cinemagic', status: true },
                { name: 'Balle Balle', status: true },
                { name: 'Burlesque Show*', status: true },
                { name: 'Romance In Bollywood', status: false },
                { name: 'Magician’s Cut', status: true },
                { name: 'Magical Evening*', status: false },
                { name: 'Magical Workshop*', status: true }
            ]
        },
        {
            night: 4,
            shows: [
                { name: 'Indian Cinemagic', status: true },
                { name: 'Balle Balle', status: true },
                { name: 'Burlesque Show*', status: true },
                { name: 'Romance In Bollywood', status: true },
                { name: 'Magician’s Cut', status: true },
                { name: 'Magical Evening*', status: true },
                { name: 'Magical Workshop*', status: false }
            ]
        },
        {
            night: 5,
            shows: [
                { name: 'Indian Cinemagic', status: true },
                { name: 'Balle Balle', status: true },
                { name: 'Burlesque Show*', status: true },
                { name: 'Romance In Bollywood', status: true },
                { name: 'Magician’s Cut', status: true },
                { name: 'Magical Evening*', status: true },
                { name: 'Magical Workshop*', status: true }
            ]
        },
    ]

    const Inclusion = () => {
        let inclusion: any = inclusionData.find((data: any) => data.night == itineraryData?.nights);
        return inclusion?.shows?.map((val: any, i: number) => {
            return (
                <div className={`${i == 1 || i == 3 || i == 5 ? 'bg-gray-400' : ''} grid grid-cols-5 gap-[1px]`}>
                    <div className="col-span-3 lg:py-6 py-3 rounded-s-md ">
                        <p className="text-center text-sm lg:text-md font-semibold">
                            {val.name}
                        </p>
                    </div>
                    <div className="col-span-2 rounded-s-md border-l border-gray-300">
                        <div className="py-3 lg:py-3 flex justify-center text-center">
                            <img
                                className="h-6 lg:h-7"
                                src={`${val.status ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/itinerary-tick-icon.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/itinerary-close-icon.svg'}`}
                                alt="rightTick"
                            />
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className={`${isFixed ? 'lg:hidden' : ''}`}>
            <Header headerAnimation={''} isVideo={false} />
            </div>
            <main className="pt-[53px] pb-24 lg:pt-[70px] lg:pb-36">
                <Banner image={itineraryData?.banner_img_urls} />
                <div
                    className={`${isFixed ? 'lg:fixed lg:top-[0px]' : ''} lg:w-full lg:shadow py-6 mt-5 lg:mt-0 border bg-white z-10 lg:border-0 border-gray-300 shadow-allSide mx-4 lg:mx-0`}
                    ref={scrollDivRef}
                    style={{
                        transition: 'position 0.3s ease-in-out',
                    }}
                >
                    <div className={`container mx-auto px-4 lg:px-0 lg:flex justify-between`}>
                        <div className="flex items-center justify-between">
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-wrap">
                                        {itineraryData?.ports.map((val: any, i: any) => {
                                            return (
                                                <p className="text-base lg:text-xl font-bold">
                                                    {val.name}
                                                    {itineraryData.ports.length != i + 1 ? (
                                                        <span> -&nbsp;</span>
                                                    ) : null}
                                                </p>
                                            );
                                        })}
                                        <p className="text-xl font-bold text-brand-primary ml-1 hidden lg:block">
                                            {itineraryData?.nights}N/{itineraryData?.nights+1}D
                                        </p>
                                    </div>
                                    <p className="text-xs font-bold bg-brand-yellow lg:hidden px-2 py-1.5 rounded">
                                        {itineraryData?.nights}N/{itineraryData?.nights+1}D
                                    </p>
                                </div>
                                <div className="border-t border-gray-300 mt-5 w-full lg:hidden" />
                                <div className="lg:flex mt-3 lg:mt-3">
                                    <div className="flex items-center mr-6">
                                        <img
                                            className="mr-1 h-6"
                                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/embark-booking-icon.svg"
                                            alt=""
                                        />
                                        <p className="text-sm lg:text-base font-semibold">
                                            Embarkation:{' '}
                                            <span className="text-brand-primary font-semibold">
                                                {moment(itineraryData?.start_date, 'YYYY-MM-DD hh:mm A').format('MMM Do, hh:mm A')}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center mt-3 lg:mt-0">
                                        <img
                                            className="mr-1 h-6"
                                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/disembark-booking-icon.svg"
                                            alt=""
                                        />
                                        <p className="text-sm lg:text-base font-semibold">
                                            Disembarkation:{' '}
                                            <span className="text-brand-primary font-semibold">
                                                {moment(itineraryData?.end_date, 'YYYY-MM-DD hh:mm A').format('MMM Do, hh:mm A')}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-3 lg:mt-3">
                                    <div className='flex items-center'>
                                        <p className="text-xs lg:text-sm font-medium text-gray-100">
                                            Visiting Ports:
                                        </p>
                                        <div className="flex flex-wrap ml-2">
                                            {itineraryData?.ports.map((val: any, i: any) => {
                                                if (val.name != 'At Sea')
                                                    return (
                                                        <div>
                                                            <p className="text-xs lg:text-sm font-medium">
                                                                {val.name}{' '}
                                                                {itineraryData.ports.length != i + 1 ? (
                                                                    <span>| </span>
                                                                ) : null}
                                                            </p>
                                                        </div>
                                                    );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center cursor-pointer mt-3 lg:mt-3 lg:hidden"
                                    onClick={() => navigate('/upcoming-cruises')}
                                >
                                    <p className="text-sm lg:text-lg font-medium text-brand-blue-2">
                                        Change Itinerary
                                    </p>
                                    <img
                                        className="h-4 lg:h-6 ml-2"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-itinerary-icon.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='border-l border-gray-300 px-6 hidden lg:block' />
                        <div className=' hidden lg:flex'>
                            <div className='w-[200px]'>
                                <p className='text-xxs text-gray-1100'>Starting From</p>
                                <div className=''>
                                    {itineraryData?.discount_pct != 0 ?
                                        <p className='text-base text-gray-1100 line-through ml-1'>₹{FormatAmount(itineraryData?.actual_starting_fare)}</p>
                                        : null
                                    }
                                    <p className='text-3xl font-bold'>₹{FormatAmount(itineraryData?.starting_fare)}</p>
                                </div>
                                <p className='text-xs text-gray-1100'>Excl. GST Per Person in Double Occupancy</p>
                            </div>
                            <div className='flex flex-col items-center ml-4'>
                                <div className="hidden lg:block ">
                                    <p
                                        onClick={() => navigate('/upcoming-cruises/selectCabin?id=' + itineraryId)}
                                        className="text-sm lg:text-base cursor-pointer border-1 border-brand-primary bg-brand-primary text-white w-[200px] text-center py-3 font-semibold rounded"
                                    >
                                        View Cabins
                                    </p>
                                </div>
                                <div
                                    className="flex items-center cursor-pointer mt-3 lg:mt-3"
                                    onClick={() => navigate('/upcoming-cruises')}
                                >
                                    <p className="text-sm lg:text-lg font-medium text-brand-blue-2">
                                        Change Itinerary
                                    </p>
                                    <img
                                        className="h-4 lg:h-6 ml-2"
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-itinerary-icon.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`container mx-auto px-4 lg:px-0`} style={{
                    marginTop: marginTop
                }}>
                    <div className="shadow-allSide rounded-lg">
                        <div className="px-4 lg:px-8 py-4 lg:py-8 border-b border-gray-300">
                            <p className="text-base lg:text-2xl font-bold">
                                Your Cruise Highlight
                            </p>
                        </div>
                        <div className="pb-4 mt-6 lg:mt-8">
                            <CruiseHighlights />
                        </div>
                    </div>

                    <div className={` ${!view ? 'relative overflow-hidden lg:h-[740px] h-[600px]' : null} pb-3 shadow-allSide rounded-lg mt-4 `} >
                        <div className="px-4 lg:px-8 py-4 lg:py-8 border-b border-gray-300">
                            <p className="text-base lg:text-2xl font-bold">Itinerary</p>
                            <p className="text-sm lg:text-base font-normal text-gray-100 mt-2">
                                Day wise details of your package
                            </p>
                        </div>
                        <div className="px-4 lg:px-8 mt-10" id='itinerary'>
                            {itineraryData?.ports?.map((val: any, i: number) => (
                                <PortCard port={val} />
                            ))}
                        </div>
                        {!view ?
                            <>
                                <div className="cloudy-effect absolute bottom-0 left-0 w-full h-20"></div>
                                <div
                                    style={{
                                        background: 'linear-gradient(0deg, rgb(255 255 255) 60%, rgb(255 255 255 / 40%) 100%, rgb(255 255 255 / 0%) 100%)'
                                        // background: '#ccc'
                                    }}
                                    className="absolute bottom-4 left-3 w-full flex flex-wrap gap-2 cursor-pointer items-center"
                                    onClick={() => setView(!view)}
                                >
                                    <p className="text-brand-blue-2 font-semibold ml-6 text-sm lg:text-lg underline ">{`View Full Itinerary`}</p>
                                    <img className='h-4 lg:h-6 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/click-arrow-booking.svg" />
                                </div>
                            </>
                            : null
                        }
                        {view ?
                            <div className="flex flex-wrap gap-2 items-center cursor-pointer mb-4 " onClick={() => {
                                setView(!view)
                                scrollIntoViewWithOffset('itinerary', 260)
                            }}>
                                <p className="text-brand-blue-2 font-semibold ml-6 text-sm lg:text-lg underline ">{`Hide Itinerary`}</p>
                                <img className='h-4 lg:h-6 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/click-arrow-booking.svg" />
                            </div>

                            : null}
                    </div>

                    <div className="grid grid-cols-10 mb-4 gap-4 mt-5 rounded-sm">
                        <div className="col-span-10 lg:col-span-5  lg:py-6 py-4  shadow-allSide rounded-md">
                            <div className='px-4 lg:px-8'>
                                <p className="text-base lg:text-2xl font-bold">Inclusions</p>
                            </div>
                            <div className="border-b border-gray-300 mx-4 my-4"></div>
                            <div className="lg:mx-6 mx-6 lg:mt-4">
                                {data?.map((data: any) => (
                                    <div className='flex items-start mb-2'>
                                        <img
                                            className='h-6 lg:h-8 mr-2'
                                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/access-tick-booking.svg"
                                            alt="rightTick"
                                        />
                                        <p className="text-sm lg:text-base text-gray-100">
                                            {data}
                                        </p>
                                    </div>
                                ))}
                                <p className="text-brand-secondary font-semibold mt-1 ml-8 text-xs lg:text-sm italic">
                                    Note: Regular beverage package included.*
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 items-end">
                                <a target='_blank' href=" https://images.cordeliacruises.com/cordelia_v2/public/pdf/inclusion-exclusions-new-dec'24.pdf" className="text-brand-blue-2 font-semibold ml-6 mt-5 text-sm lg:text-lg underline ">{`View Inclusions & Exclusions`}</a>
                                <img className='h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/click-arrow-booking.svg" />
                            </div>
                        </div>

                        <div className="col-span-10 lg:col-span-5 shadow-allSide border border-gray-300 rounded-t-md">
                            <div className="grid grid-cols-5 rounded-sm ">
                                <div className="col-span-3 lg:py-6 py-3 bg-brand-primary rounded-tl-md ">
                                    <p className="text-center text-sm lg:text-lg font-semibold text-white ">
                                        Entertainment Shows
                                    </p>
                                </div>
                                <div className="col-span-2 lg:py-6 py-3 bg-brand-primary ml-[1px] rounded-tr-md">
                                    <p className="text-center text-sm lg:text-lg font-semibold text-white">
                                        {itineraryData?.nights} Night
                                    </p>
                                </div>
                            </div>
                            <Inclusion />
                        </div>
                    </div>
                </div>
            </main>

            <div className='fixed w-full bottom-0 bg-white z-[29] lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]'>
                <div className='bg-white px-6 py-2 '>
                    <div className='flex justify-between items-center mb-1'>
                        <div>
                            <div>
                                <p className='text-xxs text-gray-1100'>Starting From</p>
                                <div className='flex items-center'>
                                    <p className='text-xl font-bold'>₹{FormatAmount(itineraryData?.starting_fare)}</p>
                                    {itineraryData?.discount_pct != 0 ?
                                        <p className='text-xs text-gray-1100 line-through ml-1'>₹{FormatAmount(itineraryData?.actual_starting_fare)}</p>
                                        : null
                                    }
                                </div>
                                <p className='text-xxs text-gray-1100'>Excl. GST Per Person in Double Occupancy</p>
                            </div>
                        </div>
                        <div className=''>
                            <button
                                style={{
                                    textWrap: 'nowrap'
                                }}
                                onClick={() => window.open('/upcoming-cruises/selectCabin?id=' + itineraryId, '_blank')}
                                className="text-white text-sm bg-brand-primary font-semibold px-7 py-2.5 rounded-sm w-full disabled:bg-brand-primary/30">
                                {'View Cabins'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
