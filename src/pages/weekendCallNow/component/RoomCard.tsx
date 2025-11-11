import React, { useState } from 'react';
import SelectBoxCabin from './selectBoxCabin';
import { ADD_ADULT, ADD_CHILDREN, ADD_INFANT, REMOVE_ROOM } from '/src/constants/itineraryConstants';

const count = [
    {
        number: 0
    },
    {
        number: 1
    },
    {
        number: 2
    },
    {
        number: 3
    },
    {
        number: 4
    }
]

const CountDropdown = ({ add, type, onRoomChange, index }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <div className='shadow-sm rounded w-[100%]'>
            <div className="font-medium relative">
                <div
                    onClick={() => setOpen(!open)}
                    className={`bg-gray-400 w-full px-4 flex items-center text-sm lg:text-lg  py-3 justify-between rounded }`}
                >
                    {type
                        ? type
                        : 0}
                    <img className={`h-2 lg:h-2.5 ${open ? 'rotate-180' : ''}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                </div>
                <ul
                    className={`bg-white absolute border border-gray-300 rounded shadow-md w-full z-10 mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0 hidden"
                        } `}
                >
                    {count?.map((item: any, key: any) => (
                        <li
                            key={key}
                            className={`p-2 text-sm ${item?.number === type ? "bg-gray-400" : 'black'}`}
                            onClick={() => {
                                onRoomChange(add, index, item?.number)
                                setOpen(false)
                            }}
                        >
                            {item?.number}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default function RoomCard({
    room,
    index,
    currentRoom,
    onRoomChange = () => { },
    selectedRooms,
    selectedItinerary
}: {
    room: any;
    index: number;
    currentRoom: number;
    onRoomChange: (type: string, index: number, value?: string) => void;
    selectedRooms: any,
    selectedItinerary:any
}) {

    const isFirstCabin = index === 0
    return (
        <div>
            <div className={`border lg:border-0 border-gray-300 px-4 lg:px-6 shadow-allSide mt-4 rounded text-sm py-4 lg:py-6`}>
                <div className="mb-4">
                    <div className='flex items-center justify-between'>
                        <div className=''>
                            <p className="text-base lg:text-lg font-semibold">Cabin {index + 1}</p>
                            <p className={`text-xs lg:text-sm font-medium  ${room.msg ? 'text-danger' : 'text-gray-200'} `}>Accommodates Maximum 4 Guests</p>
                        </div>
                        {!isFirstCabin && (
                            <div
                                className="cursor-pointer"
                                onClick={() => onRoomChange(REMOVE_ROOM, index)}
                            >
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/delete-icon.svg"
                                    className="w-5 mr-2"
                                    alt="Cruise"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                    <div className='border-b my-3 border-gray-300' />
                    <div className='grid grid-cols-3 gap-2 lg:gap-16'>
                        <div className='col-span-1 block lg:text-left justify-between items-center mb-3'>
                            <div className='mb-3'>
                                <p className="text-sm lg:text-lg  lg:mb-1 font-semibold lg:font-medium text-gray-500">Adult</p>
                                <p className="text-xxs lg:text-sm  text-gray-200">12 Years & Above</p>
                            </div>
                            <CountDropdown add={ADD_ADULT} type={room?.adults} onRoomChange={onRoomChange} index={index} />
                        </div>
                        {selectedItinerary?.itinerary_id != '86025f26-e82e-4906-b1c0-424765cb785e' ? 
                        <>
                        
                        <div className='col-span-1 block lg:text-left justify-between items-center mb-3'>
                            <div className='mb-3'>
                                <p className="text-sm lg:text-lg  lg:mb-1 font-semibold lg:font-medium text-gray-500">Child</p>
                                <p className="text-xxs lg:text-sm  text-gray-200">
                                    2 Years - 12 Years
                                </p>
                            </div>
                            <CountDropdown add={ADD_CHILDREN} type={room?.children} onRoomChange={onRoomChange} index={index} />
                        </div>
                        <div className='col-span-1 block lg:text-left justify-between items-center'>
                            <div className='mb-3'>
                                <p className="text-sm lg:text-lg  lg:mb-1 font-semibold lg:font-medium text-gray-500">Infant</p>
                                <p className="text-xxs lg:text-sm  text-gray-200">
                                    6 Months - 2 Years
                                </p>
                            </div>
                            <CountDropdown add={ADD_INFANT} type={room?.infants} onRoomChange={onRoomChange} index={index} />
                        </div>
                        </> 
                        :null }
                    </div>
                    {room.errMsg ? 
                        <p className='text-xs lg:text-sm font-medium text-danger'>{room.errMsg}</p>
                    : null}
                </div>
                <div>
                    <p className="text-sm lg:text-lg  mb-2 font-semibold lg:font-medium text-gray-500">Select Cabin</p>
                    <SelectBoxCabin
                        cabin={room?.pricings}
                        selectedRooms={selectedRooms}
                        roomIndex={index}
                        selectedCategory={room.selected}
                        onRoomChange={onRoomChange}
                    />
                    {/* <p className='text-xs lg:text-sm font-medium text-danger'>{room?.pricings && room?.pricings?.length > 0 ? null : 'No Cabin Available'}</p> */}
                </div>

            </div>
        </div>
    );
};