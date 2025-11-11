import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useGetItineraryQuery } from '/src/services/itinerary/itinerary';
import Modal from '../../components/UI/Modal';
import Cards from './Cards'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import Button from '../../components/UI/Button';

type Props = {
    template?: any
    port_codes?: any
    ship?: string
    page?: string
};

const DateLoader = () => {
    return (
        <>
            <div className="border-2 border-gray-300 shadow-md w-full mb-0.5 h-64 rounded mr-1 animate-pulse p-4">
                <div className="flex-1 space-y-3 py-1">
                    <div className="h-8 bg-gray-200/40 rounded-full"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-8 bg-gray-200/40 rounded-full col-span-2"></div>
                            <div className="h-8 bg-gray-200/40 rounded-full col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-8 bg-gray-200/40 rounded-full col-span-1"></div>
                            <div className="h-8 bg-gray-200/40 rounded-full col-span-2"></div>
                        </div>
                        <div className="h-8 bg-gray-200/40 rounded-full"></div>
                        <div className="h-8 bg-gray-200/40 rounded-full"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function UpcomingCruise({
    template = '',
    port_codes = '',
    ship = 'empress',
    page,
}: Props) {
    const [filterModal, setFilterModal] = useState(false);
    const [itineraryData, setItineraryData] = useState();
    const [filteredItineraryByShipData, setFilteredItineraryByShipData] = useState([]);
    const [originFilter, setOriginFilter] = useState('All');
    const [destinationFilter, setDestinationFilter] = useState('All');
    const [themeFilter, setThemeFilter] = useState('All');
    const [theme, setTheme] = useState();
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();

    let param = '';
    if (template === 2 && port_codes) {
        param = '?pagination=false&port_codes=' + port_codes;
    } else {
        param = '?pagination=false';
    }

    const { data, isSuccess } = useGetItineraryQuery(param)
    let navigate = useNavigate()

    useEffect(() => {
        setItineraryData(data && data.itineraries)
    }, [data])

    // useEffect(() => {
    //     const filteredItineraries = itineraryData?.filter((iti: any) => {
    //         const shipName = iti?.ship?.name && iti?.ship?.name?.split(" ").length > 1 ? iti?.ship?.name?.split(" ")[1]?.toLowerCase() : iti?.ship?.name?.toLowerCase();
    //         return shipName === ship;
    //     });
    //     ship !== "" ? setFilteredItineraryByShipData(filteredItineraries) : setFilteredItineraryByShipData(itineraryData);
    // }, [ship, itineraryData])

    useEffect(() => {
        if (!itineraryData) return;
    
        let filteredItineraries: any[] = [];
    
        if (page === 'south-east-asia') {
            filteredItineraries = itineraryData?.filter((iti: any) => {
                return iti?.ports?.some((p: any) => p.name === "Singapore") && iti?.status !== "BOOKED";
            });
        } else {
            filteredItineraries = itineraryData?.filter((iti: any) => {
                const rawName = iti?.ship?.name || "";
                const shipName = rawName?.split(" ").length > 1 ? rawName?.split(" ")[1]?.toLowerCase() : rawName?.toLowerCase();
                return shipName === ship?.toLowerCase();
            });
        }
    
        if (page === 'south-east-asia' || ship !== "") {
            setFilteredItineraryByShipData(filteredItineraries);
        } else {
            setFilteredItineraryByShipData(itineraryData);
        }
    }, [ship, itineraryData, page]);
    

    useEffect(() => {
        let all = [{ name: 'All', code: 'All' }]
        let a: any = []
        if (data && data.events) {
            a = all.concat(data.events)
        }
        setTheme(a);

        let origin: any = []
        if (data && data.ports) {
            let res = data.ports.filter((port: any) => port.origin)
            origin = all.concat(res)
        }
        setOrigin(origin)

        let destination: any = []
        if (data && data.ports) {
            let res = data.ports.filter((port: any) => port.destination)
            destination = all.concat(res)
        }
        setDestination(destination)
    }, [data])

    const handleSearch = () => {
        let result = data.itineraries
        if (originFilter !== 'All') {
            result = result.filter(o =>
                o.starting_port.name.toUpperCase() == originFilter.toUpperCase()
            );
        }
        if (destinationFilter !== 'All') {
            result = result.filter(item => item.ports.find(text => text.name.toUpperCase() === destinationFilter.toUpperCase()));

        }
        if (themeFilter !== 'All') {
            result = result.filter(o =>
                o.events && o.events[0] && o.events[0]['name'].toUpperCase() == themeFilter.toUpperCase()
            );
        }
        setItineraryData(result)
        setFilterModal(false)
    }

    const sliderSettings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "30px",
        slidesToShow: 3,
        speed: 1000,
        arrows: true,
        dots: true,
        slidesToScroll: 1,
    };

    const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return new Date(year, month - 1, day).toDateString().split(' ')
    }

    return (
        <div className="px-4 z-10">
            <div className='container mx-auto'>
                <div className='lg:flex lg:justify-between lg:items-center lg:mb-5'>
                    <div className='mb-5 lg:mb-0'>
                        <h2 className='text-2xl lg:text-4xl lg:font-medium'>{`Explore ${ship === "sky" ? ' 2026' : ship === "sun" ? " 2027" : ""} Itineraries`}</h2>
                        {ship === "empress" && <div className='flex items-center my-3'>
                            <p onClick={() => setFilterModal(true)} className='lg:text-lg text-xs text-brand-primary font-semibold mr-2 cursor-pointer'>Filter by origin, destination</p>
                            <img
                                src="/assets/images/icons/arrow_left.svg"
                                className="h-2"
                                alt="Cruise"
                            />
                        </div>}
                    </div>
                    {filteredItineraryByShipData?.length > 2 && (
                        <div className="hidden lg:block">
                            <Button
                            text="View All"
                            handleClick={() =>
                                navigate(
                                ship === 'sky'
                                    ? `/upcoming-cruises?cruise=45771c0c-eb9a-44f5-b668-8c8c75b463cc`
                                    : ship === 'empress'
                                    ? `/upcoming-cruises?cruise=1a261e73-9aad-4537-8098-7de99ba803ec`
                                    : '/upcoming-cruises'
                                )
                            }
                            />
                        </div>
                    )}
                </div>
                <div>
                    {!isSuccess ? <DateLoader /> :
                        <>
                            <div className='block lg:hidden'>
                                {filteredItineraryByShipData && filteredItineraryByShipData.length ? filteredItineraryByShipData?.slice(0, 5).map((val: any, i: number) =>
                                    // <Cards key={i} content={val} />
                                    <div className='relative'>

                                        <div key={val.itinerary_id} className='relative group mb-4 h-[205px] text-center text-white overflow-hidden rounded-xl' onClick={() => navigate(`/upcoming-cruises?itinerary_id=${val.itinerary_id}`)}>
                                            <img src={(val.homepage_mobile_img_url !== "https://images.cordeliacruises.com" && val.homepage_mobile_img_url) || val.image_url} className='w-full h-full object-cover rounded-xl' alt="" />
                                            <div className='absolute bottom-0 rounded-xl z-10 p-6 w-full'
                                                style={{
                                                    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                                }}
                                            >
                                                <span className='uppercase text-xs font-semibold text-white bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] rounded-full py-1 px-5 w-max'>
                                                    {`${toDate(val.start_date)[1]} ${toDate(val.start_date)[2]}, ${toDate(val.start_date)[3]} - ${toDate(val.end_date)[1]} ${toDate(val.end_date)[2]}, ${toDate(val.end_date)[3]}`}
                                                </span>
                                                <div className='text-white mt-3'>
                                                    <p className='font-playfairDisplay font-bold'>
                                                        {val?.ports.map((v: any, i: any) => {
                                                            // if (val.name != 'At Sea')
                                                            return (
                                                                <Fragment key={i}>{v.name} {val.ports.length != (i + 1) ? '- ' : null} {" "}</Fragment>
                                                            )
                                                        })}
                                                        <span className='font-playfairDisplay font-bold'>({val?.nights}N/{val?.nights + 1}D)</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className='absolute top-0 left-0 rounded-xl h-full bg-gradient-to-b from-[rgba(0,0,0,0)_60%] to-black w-full'
                                            />
                                        </div>
                                        {val.itinerary_id == "7048202e-3632-406e-9f95-05d1f0e25ec9" ?
                                            <div className='absolute top-0 left-0 w-full h-full z-[9999] bg-white/50 flex items-center justify-center'>
                                                <img className='w-[150px] lg:w-[200px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Sold+Out.svg" alt="" />
                                            </div>
                                            : null
                                        }
                                    </div>
                                ) :
                                    <div className='text-center'>
                                        <p className='text-xs font-bold text-[red]'>No result found, please clear filters.</p>
                                    </div>}
                            </div>
                            <div className='hidden lg:block'>
                                <Slider {...sliderSettings} className={`custom-slick-slider ${filteredItineraryByShipData?.length == 2 ? "two-slides" : filteredItineraryByShipData?.length == 1 ? "one-slide" : ""}`}>
                                    {filteredItineraryByShipData && filteredItineraryByShipData?.length ? filteredItineraryByShipData?.slice(0, 5).map((val: any, i: number) => {
                                        return (
                                            <div key={val.itinerary_id} className='px-2'>
                                                <div className='relative'>
                                                    <div className='relative cursor-pointer group mb-4 h-[418px] text-center text-white overflow-hidden rounded-xl' onClick={() => navigate(`/upcoming-cruises?itinerary_id=${val.itinerary_id}`)}>
                                                        <img src={(val.homepage_desktop_img_url !== "https://images.cordeliacruises.com" && val.homepage_desktop_img_url) || val.image_url} className='w-full h-full rounded-xl object-cover' alt="" />
                                                        <div className='absolute bottom-0 rounded-xl z-10 p-10 w-full'
                                                            style={{
                                                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                                                            }}
                                                        >
                                                            <span className='uppercase text-xs font-semibold text-white bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] rounded-full py-1 px-5 w-max'>
                                                                {`${toDate(val.start_date)[1]} ${toDate(val.start_date)[2]}, ${toDate(val.start_date)[3]} - ${toDate(val.end_date)[1]} ${toDate(val.end_date)[2]}, ${toDate(val.end_date)[3]}`}
                                                            </span>
                                                            <div className='text-white mt-3'>
                                                                {val?.ports.map((v: any, i: any) => {
                                                                    // if (val.name != 'At Sea')
                                                                    return (
                                                                        <span key={i} className='font-playfairDisplay font-bold'>{v.name} {val.ports.length != (i + 1) ? <span>-&nbsp;</span> : null}</span>
                                                                    )
                                                                })}
                                                                <span className='font-playfairDisplay font-bold'>&nbsp;({val?.nights}N/{val?.nights + 1}D)</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className='absolute top-0 left-0 rounded-xl h-full bg-gradient-to-b from-[rgba(0,0,0,0)_60%] to-black w-full'
                                                        />
                                                    </div>
                                                    {val.itinerary_id == "7048202e-3632-406e-9f95-05d1f0e25ec9" ?
                                                        <div className='absolute top-0 left-0 w-full h-full z-[9999] bg-white/50 flex items-center justify-center'>
                                                            <img className='w-[150px] lg:w-[200px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Sold+Out.svg" alt="" />
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }) : (
                                        <div className='text-center'>
                                            <p className='text-xs font-bold text-[red]'>No result found, please clear filters.</p>
                                        </div>
                                    )}
                                    {filteredItineraryByShipData?.length < 3 &&
                                        <div className='custom-slide'>
                                            <div className='relative group mb-4 h-[418px] text-center text-white overflow-hidden rounded-xl'>
                                                <img className='absolute top-0 w-full h-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-viewall-mobile.webp" alt="" />
                                                <div className='bg-black/70 absolute top-0 w-full h-full rounded-md' />
                                                <div className='mx-2 rounded shadow-md flex items-center justify-center absolute'
                                                    style={{
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)'
                                                    }}
                                                >
                                                    {/* <button onClick={() => navigate('/upcoming-cruises')} className='border-2 border-white rounded text-white px-6 py-2.5 font-outfit font-medium'>View All Itineraries</button> */}
                                                    <Button
                                                        text="View All Itineraries"
                                                        handleClick={() =>
                                                            navigate(
                                                            ship === 'sky'
                                                                ? `/upcoming-cruises?cruise=45771c0c-eb9a-44f5-b668-8c8c75b463cc`
                                                                : ship === 'empress'
                                                                ? `/upcoming-cruises?cruise=1a261e73-9aad-4537-8098-7de99ba803ec`
                                                                : '/upcoming-cruises'
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    }
                                </Slider>
                            </div>
                        </>
                    }
                </div>
                <div className='mt-4 lg:hidden'>
                    <Button text="View All" handleClick={() => navigate('/upcoming-cruises')} className='w-full' />
                </div>
            </div>

            <Modal show={filterModal} align={'center'} className="drop-shadow bg-white w-full lg:w-2/4 center bottom-0 lg:bottom-1/4 lg:left-1/4 lg:h-auto rounded-t-lg lg:rounded border " onClose={() => setFilterModal(false)}>
                <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
                    <h1 className='text-lg font-semibold'>Upcoming Cruises</h1>
                    <svg
                        onClick={() => setFilterModal(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-black cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className='h-full'>
                    <div className='h-4/6'>
                        <div className='px-4 mb-3'>
                            <h1 className='text-sm font-semibold mb-2'>Filter by Origin</h1>
                            <div className='flex flex-wrap'>
                                {origin && origin.map((val, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setOriginFilter(val.name)}
                                        className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${val.name === originFilter ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-300 text-gray-100'}`}
                                    >{val.name}</button>
                                ))}
                            </div>
                        </div>
                        <div className='px-4 mb-3'>
                            <h1 className='text-sm font-semibold mb-2'>Filter by Destination</h1>
                            <div className='flex flex-wrap'>
                                {destination && destination.map((val, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setDestinationFilter(val.name)}
                                        className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${val.name === destinationFilter ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-300 text-gray-100'}`}
                                    >{val.name}</button>
                                ))}
                            </div>
                        </div>
                        {/* <div className='px-4 mb-3'>
                            <h1 className='text-sm font-semibold mb-2'>Filter by Event</h1>
                            <div className='flex flex-wrap'>
                                {theme && theme.map((val, i) =>
                                (
                                    <button
                                        key={i}
                                        onClick={() => setThemeFilter(val.name)}
                                        className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${val.name === themeFilter ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-300 text-gray-100'}`}
                                    >{val.name}</button>
                                )
                                )}
                            </div>
                        </div> */}
                    </div>
                    <div className='flex items-center px-4 lg:border-t lg:pt-2 justify-between'>
                        <p className='w-1/3 text-sm underline font-semibold cursor-pointer' onClick={() => {
                            setOriginFilter('All')
                            setDestinationFilter('All')
                            setThemeFilter('All')
                            // setFilterModal(false)
                            setItineraryData(data && data.itineraries)
                        }}>CLEAR ALL</p>
                        <button
                            onClick={handleSearch}
                            className='rounded w-2/3 lg:w-auto bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white text-sm font-medium px-5 py-2 mr-3 mb-2'>Show Cruises</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
