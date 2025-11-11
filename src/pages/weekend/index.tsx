import React, { useState, useEffect } from 'react';
// @ts-ignore
import Layout from '../../component/Layout';
import Banner from './component/Banner'
import Culinery from './component/culinery'
import Gateway from './component/gateway'
import WeekendUpcomingCruise from './component/upcomingCruise'
import './index.css'
import Marquee from "react-fast-marquee";
// @ts-ignore
import { useGetItineraryMutation } from '/src/services/weekend/weekend';
import moment from 'moment';
import { BookNow } from './component/extraElement';
import CabinCategory from './component/cabin';
import { FormatAmount } from '../../../src/utils/formatter/formatter';
import Header from './component/header'
import Footer from '../../../src/components/Footer/footer';
import { getPreviousPathname } from '../../../src/utils/getPriviousPath';
import { TiggerFBContactEvent } from '../../../src/components/Analytics/events';

type Props = {};

const banner = {
    "images": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Family-weekend-desktop.webp",
            "link": "#",
            "type": "image",
            "altTag": "Family",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Friends-weekend-desktop.webp",
            "link": "#",
            "type": "image",
            "altTag": "Friends",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-landing-page-couple-desktop-banner.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },
    ],
    "subTitle": "",
    "mobileImages": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Family-weekend-mobile.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Friends-weekend-mobile.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-landing-page-couple-mobile-banner.webp",
            "link": "#",
            "type": "image",
            "altTag": "Holi",
            "thumbnail": ""
        },
    ],
}

export default function Weekend({ }: React.ReactElement<any>) {

    const [loading, setLoading] = useState<any>(false);
    const [itineraryList, setItineraryList] = useState<any[]>();
    const [selectedItinerary, setSelectedItinerary] = useState<any>();

    const [getItinerary, { isLoading: loadingQuotationData }] = useGetItineraryMutation()

    useEffect(() => {
        setLoading(true)
        let url = `nights=2,3&pagination=false&round_trip=true`
        getItinerary(url)
            .unwrap()
            .then((res: any) => {
                let newArray = res.itineraries.map((item: any) => {
                    return {
                        ...item,
                        date: `${moment(item.start_date, 'DD/MM/YYYY').format('Do MMM')} - ${moment(item.end_date, 'DD/MM/YYYY').format('Do MMM')}`,
                        portName: item.ports
                            .map((item: any, index: any, arr: any) => {

                                if (item.name != 'At Sea') {
                                    const isLast = index === arr.length - 1;
                                    const name = isLast ? item.name : item.name + ` -`;
                                    return index === 0 || isLast ? `${name}` : `${name}`;
                                }
                            })
                            .join(" ")
                    }
                })

                const uniqueStartingPorts = Array.from(new Set(newArray.map(item => item.starting_port.name)));
                let defPort = uniqueStartingPorts[0]
                let selectedIti = newArray?.filter(item => item.starting_port.name == defPort)[0]
                
                setItineraryList(newArray)
                setSelectedItinerary(selectedIti)
                setLoading(false)
            })
            .catch((res: any) => {
                setLoading(false)
                console.log('Error: ', res)
            })
        localStorage.setItem('previousURL', window.location.href);
        getPreviousPathname();
    }, [])


    return (
        <>
            <Header isVideo={true} />
            {loading ?
                <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/80 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            <Banner itinerary={selectedItinerary} data={banner} />
            <div className='pt-8'>
                <section className='relative'>
                    <div className="mx-auto px-4 lg:px-32 text-center pt-8 lg:pt-16 pb-6 lg:pb-10">
                        <p className='font-semibold text-2xl lg:text-4xl'> <span className='font-bold text-brand-primary'>WEEKEND FUN </span> THAT DOESN’T END</p>
                        <p className='text-gray-100 font-outfit text-sm lg:text-lg lg:leading-8 mt-3'>From chilling by the pool to dancing the night away, welcome to a weekend filled with endless possibilities. </p>
                    </div>

                    <Marquee
                        pauseOnHover={true}
                        speed={130}
                        pauseOnClick={true}
                    >
                        <img
                            className='h-[350px] lg:h-[500px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/onboard-activity-autoscroll-new-oct-image.webp"
                            style={{
                                marginRight: '-20px',
                                marginLeft: '-20px'
                            }}
                            alt=""
                        />
                    </Marquee>
                    <div className='hidden lg:block'>
                        <BookNow />
                    </div>
                    <div className='absolute top-28 lg:top-0 left-0 -z-10'>
                        <img className='w-full h-[460px] lg:h-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-element.webp" alt="" />
                    </div>
                </section>

                <section className='relative'>
                    <div className="container mx-auto px-4 text-center py-16">
                        <p className='font-semibold text-2xl lg:text-4xl'><span className='font-bold text-brand-primary'>STAY IN STYLE</span></p>
                        <p className='text-gray-100 font-outfit text-sm lg:text-lg lg:leading-8 mt-3'>From cozy Staterooms to lavish Suites, choose from a range of ocean and interior facing options for you to rest and recharge. </p>
                        <CabinCategory />
                    </div>
                    <div className='absolute left-0 bottom-16 hidden lg:block -z-10'>
                        <img className='w-[450px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-01.svg" alt="" />
                    </div>
                    <div className='absolute left-0 bottom-20 lg:bottom-16 lg:hidden'>
                        <img className='w-[100px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-mobile-01.svg" alt="" />
                    </div>
                </section>

                <section className='mb-0 lg:mb-10'>
                    <div className='relative'>
                        <a href="/select-itinerary?n=2,3&rt=true">
                            <img className='w-full hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-bannerv2-01.webp" alt="" />
                            <img className='w-full lg:hidden' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-bannerv2-mobile-01.webp" alt="" />
                        </a>
                        <div className='absolute top-0 left-0'
                            style={{
                                top: '50%',
                                transform: 'translate(0, -50%)'
                            }}
                        >
                            {/* <div className='lg:pl-52 pl-6'>
                                <div className='w-[50%] lg:w-[70%]'>
                                    <p className='text-white lg:!leading-[3rem] text-xl lg:w-full lg:text-4xl font-semibold font-outfit mb-6 lg:mb-10'>LOOKING TO SAIL BEYOND THE WEEKEND? </p>
                                </div>
                                <a className='bg-white text-[#2989E2] px-8 py-3 text-base lg:text-2xl rounded font-semibold font-outfit' href="">Explore More</a>
                            </div> */}
                        </div>
                    </div>
                </section>

                <section className='relative'>
                    <div className="container mx-auto px-4 text-center py-16">
                        <div className='px-14'>
                            <p className='font-semibold text-2xl lg:text-4xl'>NON-STOP <span className='font-bold text-brand-primary'>ENTERTAINMENT</span></p>
                        </div>
                        <p className='text-gray-100 font-outfit text-sm lg:text-lg lg:leading-8 mt-3'>Enjoy thrilling performances that’ll have you tapping your feet and wanting for more.</p>
                        <Gateway />
                    </div>
                    <div className='absolute top-0 right-0 hidden lg:block'>
                        <img className='h-[110px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-02.svg" alt="" />
                    </div>
                    <div className='absolute top-6 right-0 lg:hidden'>
                        <img className='h-[35px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-mobile-02.svg" alt="" />
                    </div>
                </section>

                <section className='relative'>
                    <div className="container mx-auto px-4 text-center pb-8 lg:pb-16">
                        <p className='font-bold text-brand-primary text-2xl lg:text-4xl'>OFFERS & UPGRADES </p>
                        <p className='text-gray-100 font-outfit text-sm lg:text-lg lg:leading-8 mt-3'>A thrilling cruise with awesome deals sets the stage for an excellent weekend.</p>
                        <div className='grid-cols-3 gap-5 mt-12 hidden lg:grid'>
                            <div className='relative'>
                                <a href="/select-itinerary?n=2,3&rt=true">
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-new-v3-01.webp" alt="" />
                                </a>
                            </div>
                            <div className='relative'>
                                <a href="/select-itinerary?n=2,3&rt=true">
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/kids-offer-new-v2-02.webp" alt="" />
                                </a>
                            </div>
                            <div className='relative'>
                                <a href="/select-itinerary?n=2,3&rt=true">
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/upgrade-offer-new-v2-03.webp" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className='lg:hidden mb-4'>
                            <div className='relative mb-4 mt-8'>
                                <a href="/select-itinerary?n=2,3&rt=true">
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-new-v2-mobile.webp" alt="" />
                                </a>
                            </div>
                            <div className='relative mb-4'>
                                <a href="/select-itinerary?n=2,3&rt=true">
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/kids-offer-new-v2-mobile.webp" alt="" />
                                </a>
                            </div>
                            <div className='relative'>
                                <a href="/select-itinerary?n=2,3&rt=true">
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/upgrade-offer-new-v2-mobile.webp" alt="" />
                                </a>
                            </div>
                        </div>
                        <BookNow />
                    </div>
                    <div className='absolute -top-56 left-0 hidden lg:block'>
                        <img className='h-[280px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-element-03.webp" alt="" />
                    </div>
                    <div className='absolute -top-32 left-0 lg:hidden'>
                        <img className='h-[100px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-element-mobile-03.webp" alt="" />
                    </div>
                </section>

                <section className='relative'>
                    <div className="container mx-auto px-4 text-center pb-8 lg:pb-16">
                        <p className='font-bold text-brand-primary text-2xl lg:text-4xl'>EAT. SIP. CHILL. REPEAT. </p>
                        <div className='lg:px-36'>
                            <p className='text-gray-100 font-outfit text-sm lg:text-lg lg:leading-8 mt-3'>Relish a wide range of mouth-watering food that makes you go ‘wow’ and take the fun to a higher level with unlimited beverage package* at our bars. </p>
                        </div>
                        <Culinery />
                    </div>
                    <div className='absolute -top-56 right-0 hidden lg:block'>
                        <img className='h-[380px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-element-04.webp" alt="" />
                    </div>
                </section>


                <section className='mb-20 lg:mb-28 mt-14'>
                    <div className='relative'>
                        <a href="/select-itinerary?n=2,3&rt=true">
                            <img className='w-full hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-bannerv2-02.webp" alt="" />
                            <img className='w-full lg:hidden' src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-bannerv2-mobile-02.webp" alt="" />
                        </a>
                        {/* <div className='absolute top-0 left-0'
                            style={{
                                top: '50%',
                                transform: 'translate(0, -50%)'
                            }}
                        >
                            <div className='lg:pl-52 pl-6'>
                                <div className='w-[50%] lg:w-[70%]'>
                                    <p className='text-white lg:!leading-[3rem] text-xl lg:w-full lg:text-4xl font-semibold font-outfit mb-6 lg:mb-10'>READY TO CRUISE THE WEEKEND? </p>
                                </div>
                                <a className='bg-white text-brand-orange px-8 py-3 text-base lg:text-2xl rounded font-semibold font-outfit' href="">Let's Cruise!</a>
                            </div>
                        </div> */}
                    </div>
                </section>


                <section className='relative'>
                    <div className="container mx-auto px-4 text-center py-16">
                        <p className='font-semibold uppercase text-2xl lg:text-4xl'>Upcoming <span className='font-bold text-brand-primary'>Weekend Cruises</span></p>
                        <p className='text-gray-100 font-outfit text-sm lg:text-lg lg:leading-8 mt-3'>Save the date, pack your bags, and set sail!</p>
                        <WeekendUpcomingCruise itineraryList={itineraryList} />
                    </div>
                    <img className='absolute left-0 top-0 w-[580px] lg:w-[550px] -z-10' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruises-bg-element.webp" alt="" />
                    <div className='absolute top-2 right-0 hidden lg:block'>
                        <img className="h-[180px]" src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-05.svg" alt="" />
                    </div>
                </section>







                <section>
                    <div className=" mx-auto text-center pt-0 lg:pt-16 lg:-mb-16">
                        <p className='font-semibold text-2xl lg:text-4xl'>KNOW YOUR <span className='font-bold text-brand-primary'>CRUISE</span></p>
                        <div className='hidden lg:block'>
                            <img className='w-full mt-10' src="https://images.cordeliacruises.com/cordelia_v2/public/images/empress-image-desktop-new-16-v2.webp" alt="" />
                        </div>
                        <div className='lg:hidden mt-6'>
                            <div className='px-10'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-weekend-icon.svg" alt="" />
                                        <div className='text-left ml-4'>
                                            <p className='text-lg font-outfit font-semibold text-brand-primary'>1910</p>
                                            <p className='text-xs font-outfit font-medium'>Guest Capacity</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-weekend-icon.svg" alt="" />
                                        <div className='text-left ml-4'>
                                            <p className='text-lg font-outfit font-semibold text-brand-primary'>11</p>
                                            <p className='text-xs font-outfit font-medium'>Decks</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between mt-8'>
                                    <div className='flex items-center'>
                                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/restaurant-weekend-icon.svg" alt="" />
                                        <div className='text-left ml-4'>
                                            <p className='text-lg font-outfit font-semibold text-brand-primary'>All Meals</p>
                                            <p className='text-xs font-outfit font-medium'> Includes</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-weekend-icon.svg" alt="" />
                                        <div className='text-left ml-4'>
                                            <p className='text-lg font-outfit font-semibold text-brand-primary'>796</p>
                                            <p className='text-xs font-outfit font-medium'>Cabins</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img className='w-full mt-0 -mb-14' src="https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mobile-image.webp" alt="" />
                        </div>
                    </div>
                </section>
            </div>


            <div className='fixed w-full bottom-0 z-30 lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]'>
                <div className='bg-white px-4 py-4 rounded-t-md'>
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-xs font-semibold'>{selectedItinerary?.nights}N/{selectedItinerary?.nights + 1}D</p>
                        {/* <p className='text-xs font-semibold'>{selectedItinerary?.nights} Nights - 1 Cabins</p> */}
                        <p className='text-xs font-semibold'>Price Starts from</p>
                    </div>
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-base font-bold'>{selectedItinerary?.date}</p>
                        <p className='text-lg font-bold text-brand-primary'>{selectedItinerary?.discount_pct != 0 ? <span className='font-medium text-sm line-through text-gray-100'>₹ {selectedItinerary?.actual_starting_fare}</span> : null} ₹ {FormatAmount(selectedItinerary?.starting_fare)}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-xxs font-semibold'>{selectedItinerary?.nights} Nights - 1 Cabins</p>
                        <p className='text-xxs font-semibold '>Per person</p>
                    </div>
                    <div className='mt-3'>
                    <a
                            href='/select-itinerary?n=2,3&rt=true'
                            className="text-white flex justify-center bg-brand-primary font-semibold px-4 py-2.5 rounded w-full disabled:bg-brand-primary/40">
                            Book Now
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
        // </Layout>
    );
}