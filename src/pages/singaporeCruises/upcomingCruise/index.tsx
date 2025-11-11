import React, { useState, useEffect } from 'react';
import { useGetItineraryQuery } from '../../../services/itinerary/itinerary';
import CruiseCard from './cruiseCard';
import Modal from '../../../components/UI/Modal';
import { useNavigate } from 'react-router-dom';

type Props = {
    template: any
    port_codes: any
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

}: Props) {

    const [filterModal, setFilterModal] = useState(false);
    const [itineraryData, setItineraryData] = useState();
    const [originFilter, setOriginFilter] = useState('All');
    const [destinationFilter, setDestinationFilter] = useState('All');
    const [themeFilter, setThemeFilter] = useState('All');
    const [theme, setTheme] = useState();
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();

    let param = ''
    if (template === 2) {
        param = '?pagination=false&port_codes=' + port_codes
    }
    const { data, isSuccess } = useGetItineraryQuery(param)
    let navigate = useNavigate()
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

    useEffect(() => {
        setItineraryData(data && data.itineraries)
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

    return (
        <section className='container mx-auto'>
            <div className="py-5 px-3">
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl lg:text-4xl font-medium mb-4 mt-10'>10 Day of Exploring</h1>
                </div>
                <div className='flex items-center mb-6'>
                    <p onClick={() => setFilterModal(true)} className='lg:text-sm text-xs text-brand-primary font-semibold mr-2 cursor-pointer'>Filter by origin, destination or offers</p>
                    <img
                        src="/assets/images/icons/arrow_left.svg"
                        className="h-2"
                        alt="Cruise"
                    />
                </div>
                {!isSuccess ? <DateLoader /> :
                    itineraryData && itineraryData.length ? itineraryData.slice(0, 5).map((val: any, i: number) =>
                        <CruiseCard key={i} content={val} />
                    ) : (
                        <div className='text-center'>
                            <p className='text-xs font-bold text-[red]'>No result found, please clear filters.</p>
                        </div>
                    )
                }
                <div className='text-center mt-7'>
                    <button className="rounded-sm bg-brand-primary text-white py-3 font-bold px-8 text-xs lg:text-base" onClick={() => navigate('/upcoming-cruises')}>See More</button>
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
                                        className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${val.name === originFilter ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-100'}`}
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
                                        className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${val.name === destinationFilter ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-100'}`}
                                    >{val.name}</button>
                                ))}
                            </div>
                        </div>
                        <div className='px-4 mb-3'>
                            <h1 className='text-sm font-semibold mb-2'>Filter by Event</h1>
                            <div className='flex flex-wrap'>
                                {theme && theme.map((val, i) =>
                                (
                                    <button
                                        key={i}
                                        onClick={() => setThemeFilter(val.name)}
                                        className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${val.name === themeFilter ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-100'}`}
                                    >{val.name}</button>
                                )
                                )}
                            </div>
                        </div>
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
                            className='rounded w-2/3 lg:w-auto bg-brand-primary text-white text-sm font-medium px-5 py-2 mr-3 mb-2'>Show Cruises</button>
                    </div>
                </div>
            </Modal>

        </section>
    );
}
