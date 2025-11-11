import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formatter } from '/src/utils/formatter/formatter';
import Tooltip from '/src/components/UI/Tooltip';
const toDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day).toDateString().split(' ')
}

type Props = {
    content: {
        itinerary_id: string;
        end_date: string;
        image_url: string;
        nights: string;
        ports: string;
        start_date: string;
        starting_fare: string;
        per_guest_per_night: string;
        actual_per_guest_per_night: string;
        discount_pct: any;
        events: string;
        offers_present: boolean;
    };
};

export default function Cards({
    content: {
        itinerary_id = '',
        end_date = '',
        image_url = '',
        nights = '',
        ports = '',
        start_date = '',
        starting_fare = '',
        per_guest_per_night = '',
        actual_per_guest_per_night = '',
        discount_pct = '',
        events = '',
        offers_present = false
    }
}: Props) {

    let navigate = useNavigate()
    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    return (
        <section>
            <div className="bg-white mb-2 lg:mb-4 shadow-md border border-gray-300 rounded grid lg:grid-cols-11 grid-cols-12 cursor-pointer" onClick={() => navigate(`/upcoming-cruises?itinerary_id=${itinerary_id}`)}>
                <div className='col-span-2 w-full lg:inline-block hidden'>
                    <img
                        src={image_url}
                        className="w-full h-full rounded-lg"
                        alt="Cruise"
                        loading="lazy"
                    />
                </div>
                <div className='col-span-3 lg:col-span-2 flex items-center w-full justify-between'>
                    {events.length > 0 &&
                        <div className='h-full bg-brand-green flex items-center rounded-r  min-w-15 justify-center max-w-[25px]'>
                            <p className='-rotate-90 text-xxs text-white text-center leading-none' style={{ margin: '-15px' }}>{events[0].name}</p>
                        </div>
                    }
                    <div className='w-full'>
                        <div className='text-center px-2 py-4 lg:py-10'>
                            <p className='text-xs lg:text-2xl leading-4 font-semibold lg:ml-3'>
                                {toDate(start_date)[0]}<span className='hidden lg:inline-block'>,  </span>
                                <br className='lg:hidden' />
                                {' '}{toDate(start_date)[2]} {toDate(start_date)[1]}
                            </p>
                            <div className='flex justify-center items-center'>
                                <p className='text-xs lg:text-2xl leading-4 font-bold mr-1 text-gray-100'>{nights}</p>
                                <div>
                                    <Tooltip text="Nights">
                                        <img
                                            src="/assets/images/icons/moon_icon.svg"
                                            className="h-2 lg:h-5"
                                            alt="Cordelia Cruises"
                                            title='Cordelia-Cruises'
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-900/[0.13] col-span-5 lg:col-span-4 flex justify-center items-center w-full px-2'>
                    <p className='text-xs lg:text-2xl font-bold text-center'>
                        {JSON.parse(JSON.stringify(ports)).map((port: any, i: number) => (
                            <span key={i}>
                                <span>
                                    {/* <span>{i}</span> */}
                                    {/* <> {i === 0 ? (<>{port.name} &gt;<br /></>) : i === ports.length - 1 ? (<><br />{port.name}</>) : null} </> */}
                                    {port.name !== 'At Sea' && (
                                        <span className="ml-1" style={{ fontWeight: (i === 0 || (i !== 0 && ports.length - 1 === i)) ? "700" : "500", color: (i === 0 || (i !== 0 && ports.length - 1 === i)) ? "#000" : "gray" }}>{port.name}
                                            <span className="mx-1" style={{ color: "gray" }}>{i === ports.length - 1 ? `` : `>`}</span>
                                            <span className="mx-1" style={{ color: "gray" }}>{i !== ports.length - 1 ? (<br />) : ``}</span>
                                        </span>
                                    )}
                                </span>
                            </span>
                        ))}
                    </p>
                </div>
                <div className='col-span-3 lg:col-span-2 flex justify-end items-center w-full relative overflow-hidden'>
                    <div className='text-right lg:mr-4'>
                        <p className='text-xxs lg:text-lg font-semibold leading-5 text-gray-100'>From {discount_pct != 0 ? <span className='line-through'>₹ {actual_per_guest_per_night}</span> : null}</p>
                        <p className='text-base lg:text-3xl font-bold leading-4'> ₹ <Formatter value={per_guest_per_night} /></p>
                        <p className='text-xxs lg:text-xs font-medium text-gray-200'>Excl. GST Per Person in Double Occupancy</p>
                    </div>
                </div>
                <div className=' rounded flex justify-center items-center w-full lg:border-l lg:border-gray-100/20'>
                    {width && width >= 640 ? (
                        <a href="#" className='text-brand-primary font-bold flex items-center text-xl'>View <img
                            src="/assets/images/icons/arrow_left.svg"
                            className="h-3 ml-1"
                            alt="Cordelia Cruises"
                            title='Cordelia-Cruises'
                        /> </a>
                    ) : (

                        <img
                            src="/assets/images/icons/arrow_left.svg"
                            className="h-4"
                            alt="Cordelia Cruises"
                            title='Cordelia-Cruises'
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
