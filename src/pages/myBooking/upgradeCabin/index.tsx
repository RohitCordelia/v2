import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout';
import Modal from '../../components/UI/ModalCenter';
import { useGetItineraryListMutation } from '../../services/upcomingCruise/upcomingCruise';
import "./index.css";
import ItineraryCard from './component/itineraryCard';
import Calendar from './component/calendar';
import moment from 'moment';
import Banner from '../../component/Banner';
import { GetAuth, SaveAB, GetAB } from '../../utils/store/store';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../..//component/Login';

type Props = {}

const banner = {
    "images": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-itinerary-new-banner-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/kidsail-offer-itinerary-new-banner-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        },
    ],
    "mobileImages": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-itinerary-new-banner-mobile.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/kidsail-offer-itinerary-new-banner-mobile.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        }
    ],
}

export default function PaymentSuccess({ }: Props) {
    const monthParam = new window.URLSearchParams(window.location.search).get('m');
    const yearParam = new window.URLSearchParams(window.location.search).get('y');
    const dateAfterParam = new window.URLSearchParams(window.location.search).get('da');
    const dateBeforeParam = new window.URLSearchParams(window.location.search).get('db');
    const startSelector = new window.URLSearchParams(window.location.search).get('start');
    const portSelector = new window.URLSearchParams(window.location.search).get('port');
    const nightSelector = new window.URLSearchParams(window.location.search).get('n');
    const destinationPortsSelector = new window.URLSearchParams(window.location.search).get('destinationPorts');
    const itinerarySelector = new window.URLSearchParams(window.location.search).get('itinerary_id');
    const AUTH = GetAuth();
    const ab = GetAB();
    let navigate = useNavigate()
    const [getItinerary] = useGetItineraryListMutation()
    const [itineraryData, setItineraryData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [portsList, setPortsList] = useState<any>();
    const [dateFilter, setDateFilter] = useState<boolean>(false);
    const [mainFilter, setMainFilter] = useState<boolean>(false);
    const [datesToHighlight, setDatesToHighlight] = useState<any>([]);
    const [startDateFilter, setStartDateFilter] = useState<any>();
    const [endDateFilter, setEndDateFilter] = useState<any>();
    const [tempStartDateFilter, setTempStartDateFilter] = useState<any>();
    const [tempEndDateFilter, setTempEndDateFilter] = useState<any>();
    const [filteredItineraryData, setFilteredItineraryData] = useState<any>(null);

    const [origin, setOrigin] = useState<any>();
    const [destination, setDestination] = useState();
    const [tripType, setTripType] = useState<any>();
    const [noOfNight, setNoOfNight] = useState<any>();

    const [originFilter, setOriginFilter] = useState<any>([]);
    const [tempOriginFilter, setTempOriginFilter] = useState<any>([]);
    const [destinationFilter, setDestinationFilter] = useState<any>([]);
    const [tempDestinationFilter, setTempDestinationFilter] = useState<any>([]);
    const [tripTypeFilter, setTripTypeFilter] = useState<any>([]);
    const [tempTripTypeFilter, setTempTripTypeFilter] = useState<any>([]);
    const [noOfNightFilter, setNoOfNightFilter] = useState<any[]>([]);
    const [tempNoOfNightFilter, setTempNoOfNightFilter] = useState<any[]>([]);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [selectedItinerary, setSelectedItinerary] = useState<string>('');

    useEffect(() => {
        if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) { } else {
            if (!ab) {
                // const array = [1, 2];
                const array = [1];
                const randomNumber = array[Math.floor(Math.random() * array.length)];
                SaveAB(randomNumber)
            }
        }
    }, [])

    useEffect(() => {
        if (startSelector) {
            let arr = originFilter;
            arr.push(startSelector)
            setTempOriginFilter([...arr])
        }
        if (portSelector) {
            let arr = destinationFilter;

            arr.push(portSelector)
            setTempDestinationFilter([...arr])
        }
        if (destinationPortsSelector) {
            var array = destinationPortsSelector.split(",");
            setTempDestinationFilter([...array])
        }
        if (nightSelector) {
            var array = nightSelector.split(",").map(Number);
            setTempNoOfNightFilter([...array])
        }
    }, [startSelector, portSelector, destinationPortsSelector, nightSelector])

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isLoading ? 'hidden' : 'auto';
    }, [isLoading])

    useEffect(() => {
        setIsLoading(true)
        getItinerary()
            .unwrap()
            .then((res: any) => {
                setItineraryData(res)
                const filteredItineraries = res?.itineraries.map((itinerary: any) => itinerary.start_date);
                setDatesToHighlight(filteredItineraries)
                if (res && res.ports) {
                    setPortsList(res.ports)
                }
                setIsLoading(false)
                window.scroll({
                    top: 0,
                    left: 0
                });
            })
            .catch((res: any) => {
                setIsLoading(false)
                console.log('Error: ', res)
            })
    }, [])

    useEffect(() => {
        handleFilterItinerary()
    }, [itineraryData])

    useEffect(() => {
        let origin: any = []
        if (itineraryData && itineraryData.ports) {
            origin = itineraryData.ports.filter((port: any) => port.origin)
        }
        setOrigin(origin)

        let destination: any = []
        if (itineraryData && itineraryData.ports) {
            destination = itineraryData.ports.filter((port: any) => port.destination)
        }
        setDestination(destination)

        let trip: any = []
        if (itineraryData && itineraryData.itineraries) {
            trip = itineraryData.itineraries.map((item: any) => item.trip_type).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
        }
        setTripType(trip)

        let night: any = []
        if (itineraryData && itineraryData.itineraries) {
            night = [...new Set(itineraryData.itineraries.map((item: any) => item.nights))].sort((a, b) => a - b);
            // night = itineraryData.itineraries.map((item: any) => item.nights).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
        }
        setNoOfNight(night)
    }, [itineraryData])

    const handleFilterItinerary = (e: any = null) => {
        let result = itineraryData?.itineraries
        if (itinerarySelector) {
            result = result?.filter((itinerary: any) => itinerary.itinerary_id === itinerarySelector)
        }
        if (monthParam && yearParam) {
            let monthParams: number = +monthParam;
            let yearParams: number = +yearParam;
            result = result?.filter((item: any) => {
                const itemDate = moment(item.start_date, "DD/MM/YYYY");
                const itemMonth = itemDate.month() + 1; // month() is 0-indexed, so we add 1
                const itemYear = itemDate.year();
                return itemYear > yearParams || (itemYear === yearParams && itemMonth > monthParams);
            });
        }
        if (dateAfterParam) {
            const formattedDateAfterParam = moment(dateAfterParam, "DDMMYYYY");
            result = result?.filter((item: any) => {
                const itemDate = moment(item.start_date, "DD/MM/YYYY");
                return itemDate.isAfter(formattedDateAfterParam);
            });
        }
        if (dateBeforeParam) {
            const formattedDateBeforeParam = moment(dateBeforeParam, "DDMMYYYY");
            result = result?.filter((item: any) => {
                const itemDate = moment(item.start_date, "DD/MM/YYYY");
                return itemDate.isBefore(formattedDateBeforeParam);
            });
        }

        if (tempOriginFilter && tempOriginFilter.length) {
            result = result?.filter((o: any) => {
                if (tempOriginFilter?.includes(o.starting_port.name)) {
                    return true
                }
            });
            setOriginFilter(tempOriginFilter)
        }
        if (tempDestinationFilter && tempDestinationFilter.length) {
            result = result?.filter((item: any) => {
                for (let i = 0; i < item.ports.length; i++) {
                    if (tempDestinationFilter?.includes(item.ports[i].name)) {
                        return true
                    }
                }
            });
            setDestinationFilter(tempDestinationFilter)
        }

        if (tempNoOfNightFilter && tempNoOfNightFilter.length) {
            result = result?.filter((o: any) => {
                if (tempNoOfNightFilter?.includes(o.nights)) {
                    return true
                }
            });
            setNoOfNightFilter(tempNoOfNightFilter)
        }
        if (tempTripTypeFilter && tempTripTypeFilter.length) {
            result = result?.filter((o: any) => {
                if (tempTripTypeFilter?.includes(o.trip_type)) {
                    return true
                }
            });
            setTripTypeFilter(tempTripTypeFilter)
        }

        if (tempStartDateFilter && tempEndDateFilter) {
            result = result.filter((item: any) => {
                const itemDate = moment(item.start_date, 'DD/MM/YYYY');
                setStartDateFilter(tempStartDateFilter)
                setEndDateFilter(tempEndDateFilter)
                return itemDate.isBetween(moment(tempStartDateFilter, 'DD/MM/YYYY'), moment(tempEndDateFilter, 'DD/MM/YYYY'), null, '[]');
            });
        }
        setFilteredItineraryData(result)
    }

    const setTempFilterData = async (name: any, value: any) => {
        if (name == 'destination') {
            let arr: any = JSON.parse(JSON.stringify(tempDestinationFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempDestinationFilter([...arr])
        }
        if (name == 'origin') {
            let arr: any = JSON.parse(JSON.stringify(tempOriginFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempOriginFilter([...arr])
        }
        if (name == 'trip') {
            let arr: any = JSON.parse(JSON.stringify(tempTripTypeFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempTripTypeFilter([...arr])
        }
        if (name == 'night') {
            let arr: any = JSON.parse(JSON.stringify(tempNoOfNightFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempNoOfNightFilter([...arr])
        }
    }

    const DateFilter = (e: any) => {
        let startDate = e[0]?.format('DD/MM/YYYY')
        let endDate = e[1]?.format('DD/MM/YYYY')
        setTempStartDateFilter(startDate)
        setTempEndDateFilter(endDate)
    }

    const ResetFilter = () => {
        setOriginFilter([])
        setTripTypeFilter([])
        setNoOfNightFilter([])
        setTempOriginFilter([])
        setTempTripTypeFilter([])
        setTempNoOfNightFilter([])

        let result = itineraryData?.itineraries
        if (tempStartDateFilter && tempEndDateFilter) {
            result = result.filter((item: any) => {
                const itemDate = moment(item.start_date, 'DD/MM/YYYY');
                setStartDateFilter(tempStartDateFilter)
                setEndDateFilter(tempEndDateFilter)
                return itemDate.isBetween(moment(tempStartDateFilter, 'DD/MM/YYYY'), moment(tempEndDateFilter, 'DD/MM/YYYY'), null, '[]');
            });
        }

        if (tempDestinationFilter && tempDestinationFilter.length) {
            result = result?.filter((item: any) => {
                for (let i = 0; i < item.ports.length; i++) {
                    if (tempDestinationFilter?.includes(item.ports[i].name)) {
                        return true
                    }
                }
            });
            setDestinationFilter(tempDestinationFilter)
        }

        setFilteredItineraryData(result)
    }

    const onLogin = (itinerary_id) => {
        setSelectedItinerary(itinerary_id)
        setShowLoginModal(true)
    }

    return (
        <Layout>
            {isLoading ?
                <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/90 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            <div className='pt-[52px] pb-24 lg:pt-[70px] lg:pb-36'>
                <Banner data={banner} />
                <div className="container mx-auto px-4 lg:px-0">
                    <div className="mx-auto px-4 lg:px-32 text-center pt-8 lg:pt-16 pb-6 lg:pb-10">
                        <h1 className='font-semibold text-2xl lg:text-3xl'>Explore Cruise Holidays</h1>
                    </div>
                    <div className='flex justify-center'>
                        <div onClick={() => setDateFilter(true)} className='w-[300px] border border-gray-400 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium'>
                            <div className='flex items-center'>
                                <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/destination-upcoming-icon.svg" alt="" />
                                <p>Destinations</p>
                            </div>
                            <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg" alt="" />
                        </div>
                        <div onClick={() => setDateFilter(true)} className='w-[300px] border border-gray-400 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium'>
                            <div className='flex items-center'>
                                <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-upcoming-icon.svg" alt="" />
                                <p>Dates</p>
                            </div>
                            <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg" alt="" />
                        </div>
                    </div>
                    <div className='flex justify-center flex-wrap gap-2 mt-5'>
                        {destinationFilter && destinationFilter.map((val: any) => {
                            return (
                                <div
                                    className='border lg:border-1 border-brand-primary px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold text-brand-primary'>
                                    <p>{val}</p>
                                </div>
                            )
                        })}
                        {startDateFilter && endDateFilter ?
                            <>
                                <div
                                    className='border lg:border-1 border-brand-primary px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold text-brand-primary'>
                                    <p>{startDateFilter} - {endDateFilter}</p>
                                </div>
                            </>
                            : null
                        }
                        {startDateFilter || endDateFilter || destinationFilter.length ?
                            <div
                                onClick={() => {
                                    setOriginFilter([])
                                    setTempOriginFilter([])
                                    setTripTypeFilter([])
                                    setTempTripTypeFilter([])
                                    setNoOfNightFilter([])
                                    setTempNoOfNightFilter([])
                                    setDestinationFilter([])
                                    setTempDestinationFilter([])
                                    setStartDateFilter(null)
                                    setEndDateFilter(null)
                                    setFilteredItineraryData(itineraryData?.itineraries)
                                }}
                                className='flex items-center cursor-pointer border lg:border-1 border-brand-primary px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold text-brand-primary'>
                                <p>Clear All</p>
                                <span className='font-bold ml-2'>X</span>
                            </div>
                            : null
                        }
                    </div>

                    <div className='flex justify-between mt-8'>
                        <div>
                            <p className='text-sm lg:text-lg font-semibold'>Cruise Search Results ({filteredItineraryData?.length})</p>
                        </div>
                        <div onClick={() => setMainFilter(true)} className='flex items-center cursor-pointer'>
                            <p className='text-base lg:text-lg font-semibold'>Filter</p>
                            <img className='h-2.5 lg:h-3.5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/filter-icon.svg" alt="" />
                        </div>
                    </div>

                    <div className='mt-4'>
                        {filteredItineraryData && filteredItineraryData.map((val: any, i: any) => (
                            <ItineraryCard data={val} callBack={onLogin} />
                        ))}
                    </div>
                    {itinerarySelector ?
                        <div className='text-center'>
                            <button
                                className='text-brand-primary border-1 border-brand-primary px-6 text-sm font-semibold py-2 rounded'
                                onClick={() => {
                                    navigate('/upcoming-cruises')
                                    // setFilteredItineraryData(itineraryData?.itineraries)
                                    window.location.reload();
                                }}
                            >
                                View All Itineraries
                            </button>
                        </div>
                        : null}
                </div>
            </div>

            <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} selectedItinerary={selectedItinerary} />

            <Modal show={mainFilter} align={'center'} className="max-h-[70%] overflow-y-scroll no-scrollbar drop-shadow bg-white w-[90%] lg:w-[40%] center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => {
                setMainFilter(false)
                setTempTripTypeFilter([...tripTypeFilter])
                setTempOriginFilter([...originFilter])
                setTempNoOfNightFilter([...noOfNightFilter])
            }}>
                <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>Filters</h1>
                    <svg
                        onClick={() => setMainFilter(false)}
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
                <div className='px-6 pb-8'>
                    <div>
                        <p className='font-semibold'>Trip Type</p>
                        <div className='flex mt-2'>
                            {tripType && tripType.map((val: any) => {
                                let name = null;
                                let icon = null;
                                let activeIcon = null;
                                if (val == 'round') {
                                    name = 'Round Trip'
                                    icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-black-icon.svg'
                                    activeIcon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-purple-icon.svg'
                                } else if (val == 'one_way') {
                                    name = 'One Way Trip'
                                    icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-black-icon.svg'
                                    activeIcon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg'
                                }
                                return (
                                    <div onClick={() => setTempFilterData('trip', val)} className={`flex items-center cursor-pointer px-5 py-1.5 rounded mr-2 border ${tempTripTypeFilter.includes(val) ? 'border-brand-primary text-brand-primary' : 'bg-gray-100/5 border-gray-100/5 text-black'}`}>
                                        <img className='mr-2' src={`${tempTripTypeFilter.includes(val) ? activeIcon : icon}`} alt="" />
                                        <p className='text-xxs lg:text-sm font-normal'>{name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Number of Nights</p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {noOfNight && noOfNight.map((val: any) => {
                                return (
                                    <div onClick={() => setTempFilterData('night', val)} className={`flex items-center cursor-pointer px-5 py-1.5 rounded border ${tempNoOfNightFilter.includes(val) ? 'border-brand-primary text-brand-primary' : 'bg-gray-100/5 border-gray-100/5 text-black'}`}>
                                        <p className='text-xxs lg:text-sm font-normal'>{val} Nights</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Departure Port</p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {origin && origin.map((val: any, i: number) => {
                                return (
                                    <div onClick={() => setTempFilterData('origin', val.name)} key={i} className={`flex items-center cursor-pointer px-5 py-1.5 rounded border ${tempOriginFilter.includes(val.name) ? 'border-brand-primary text-brand-primary' : 'bg-gray-100/5 border-gray-100/5 text-black'}`}>
                                        <p className='text-xxs lg:text-sm font-normal'>{val.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='border-t border-gray-300 my-4 w-full' />
                    <div className='flex justify-center gap-4'>
                        <div className='mt-3 w-[150px]'>
                            <button
                                onClick={() => {
                                    ResetFilter()
                                }}
                                className='bg-gray-300 py-3 rounded w-full'
                            >
                                Reset All
                            </button>
                        </div>
                        <div className='mt-3 w-[150px]'>
                            <button
                                onClick={() => {
                                    handleFilterItinerary('click')
                                    setMainFilter(false)
                                }}
                                className='bg-brand-primary py-3 rounded text-white w-full'
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal show={dateFilter} align={'center'} className="max-h-[90%] overflow-y-scroll no-scrollbar drop-shadow w-[90%] lg:w-2/4 center bottom-1/4 overflow-hidden left-0 right-0 m-auto" onClose={() => {
                setDateFilter(false)
                setTempDestinationFilter([...destinationFilter])
            }}>
                <div className='overflow-scroll no-scrollbar h-[99%]'>
                    <div className='justify-center hidden lg:flex'>
                        <div className='w-[300px] bg-white border rounded-l border-gray-400 shadow-allSide px-8 py-3.5 text-gray-100 text-lg font-medium flex items-center justify-between'>
                            <div className='flex items-center'>
                                <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/destination-upcoming-icon.svg" alt="" />
                                <p>Destinations</p>
                            </div>
                            <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg" alt="" />
                        </div>
                        <div className='w-[300px] bg-white border rounded-r border-gray-400 shadow-allSide px-8 py-3.5 text-gray-100 text-lg font-medium flex items-center justify-between'>
                            <div className='flex items-center'>
                                <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-upcoming-icon.svg" alt="" />
                                <p>Dates</p>
                            </div>
                            <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg" alt="" />
                        </div>
                        {/* <div onClick={() => setDateFilter(true)} className='w-[300px] border border-gray-400 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium'>
                            <div className='flex items-center'>
                                <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/destination-upcoming-icon.svg" alt="" />
                                <p>Destinations</p>
                            </div>
                            <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg" alt="" />
                        </div>
                        <div onClick={() => setDateFilter(true)} className='w-[300px] border border-gray-400 shadow-allSide px-4 lg:px-8 py-4 cursor-pointer flex items-center justify-between text-gray-100 text-sm lg:text-lg font-medium'>
                            <div className='flex items-center'>
                                <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-upcoming-icon.svg" alt="" />
                                <p>Dates</p>
                            </div>
                            <img className='h-4 lg:h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-arow-booking-icon.svg" alt="" />
                        </div> */}
                    </div>
                    <div className='bg-white mt-4 h-[85%] rounded'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-6 py-6'>
                            <div>
                                <p className='font-semibold'>Select Destination</p>
                                <div className='flex flex-wrap mt-3'>
                                    {portsList && portsList.map((val: any, i: number) => {
                                        return (
                                            <div onClick={() => setTempFilterData('destination', val.name)} key={i} className={`text-xxs cursor-pointer font-medium px-3 lg:px-5 py-1.5 mr-3 mb-3 rounded lg:text-sm border ${tempDestinationFilter.includes(val.name) ? 'border-brand-primary text-brand-primary' : 'bg-gray-100/5 border-gray-100/5 text-black'} `}>
                                                <p className='text-xs lg:text-sm'>{val.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='calendar-box lg:pl-10'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-semibold'>Select Sailing Dates</p>
                                    <div className='flex items-center'>
                                        <div className='w-[17px] h-[17px] rounded-full bg-[#fde1da]' />
                                        <p className='font-normal text-sm ml-1.5'>Sailing Date</p>
                                    </div>
                                </div>
                                <Calendar datesToHighlight={datesToHighlight} setDateFilter={DateFilter} selectedStartDate={startDateFilter} selectedEndDate={endDateFilter} />
                            </div>
                        </div>
                        <div className='w-full px-4 pb-6'>
                            <button
                                onClick={() => {
                                    handleFilterItinerary('click')
                                    setDateFilter(false)
                                }}
                                className='bg-brand-primary py-3 rounded text-white w-full'
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}