import React, { ReactNode, useState, useEffect } from 'react';
import { ADD_ADULT, ADD_ROOM, ADD_CHILDREN, ADD_INFANT, REMOVE_ADULT, REMOVE_CHILDREN, REMOVE_INFANT, REMOVE_ROOM, SELECT_CATEGORY } from '/src/constants/itineraryConstants';

export default function SelectBoxCabin({
    cabin,
    selectedRooms,
    roomIndex,
    selectedCategory,
    onRoomChange = () => { },
}: {
    cabin: any,
    selectedRooms: any,
    roomIndex: any,
    selectedCategory: any,
    onRoomChange: (type: string, index: number, value?: string, category_details?:any) => void;
}) {
    const [open, setOpen] = useState(false);
    let a = cabin.find(item => item.code == selectedCategory)
    
    return (
        <div className='shadow-sm rounded'>
            <div className="font-medium relative">
                <div
                    onClick={() => setOpen(!open)}
                    className={`bg-gray-400 w-full px-4 flex items-center text-sm lg:text-base py-3.5 justify-between rounded ${!selectedCategory && "text-gray-700"
                        }`}
                >
                    {a
                        ? a.name
                        : "Select Cabin"}
                    <img className={`h-2 ${open ? 'rotate-180' : ''}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                </div>
                <ul
                    className={`bg-white absolute border border-gray-300 rounded shadow-md w-full z-10 mt-2 overflow-y-auto ${open ? "max-h-36" : "max-h-0 hidden"
                        } `}
                >
                    {cabin?.map((category:any, key:any) => (
                        <li
                            key={key}
                            className={`p-2 text-sm
                                                ${category?.code === selectedCategory ?
                                    "bg-gray-400" : 'text-black'
                                }`}
                            onClick={() => {
                                onRoomChange(SELECT_CATEGORY, roomIndex, category.code, category)
                                setOpen(false)
                            }}
                        >
                            {category?.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
