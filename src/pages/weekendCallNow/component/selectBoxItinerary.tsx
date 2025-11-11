import React, { ReactNode, useState, useEffect } from 'react';

export default function SelectBoxItinerary({
    selectedItinerary,
    itineraryList,
    setSelectedItinerary = () => { },
}: {
    selectedItinerary: any,
    itineraryList: any,
    setSelectedItinerary: (value?: any) => void;
}) {

    const [open, setOpen] = useState(false);
    return (
        <div className='shadow-sm rounded'>
            <div className="font-medium relative">
                <div
                    onClick={() => setOpen(!open)}
                    className={`bg-gray-400 w-full px-4 flex items-center text-sm lg:text-base py-3.5 lg:py-4 justify-between rounded ${!selectedItinerary && "text-gray-700"
                        }`}
                >

                    {selectedItinerary
                        ? selectedItinerary.date
                        : "Select departure date"}
                    <img className={`h-2 lg:h-3 ${open ? 'rotate-180' : ''}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                </div>
                <ul
                    className={`bg-white absolute border border-gray-300 rounded shadow-md w-full z-10 mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0 hidden"
                        } `}
                >
                    {itineraryList?.map((itinerary, key) => (
                        <li
                            key={key}
                            className={`p-2 text-sm
                                                ${itinerary?.date === selectedItinerary?.date ?
                                    "text-black" : 'text-gray-200'
                                }`}
                            onClick={() => {
                                setSelectedItinerary(itinerary)
                                setOpen(false)
                            }}
                        >
                            {itinerary?.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
