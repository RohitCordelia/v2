import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Tooltip from '../../../components/UI/Tooltip/ShoreEx';
import { SaveStore, GetAuth, GetAB } from '../../../utils/store/store';
import { FormatAmount } from '../../../../src/utils/formatter/formatter';
type Props = {}

export default function ItineraryCard({ data, callBack }: any) {
    const AUTH = GetAuth();
    const ab = GetAB();

    const [showPrice, setShowPrice] = useState<boolean>(true);

    useEffect(() => {
        if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {
            setShowPrice(true)
        } else {
            if (ab == 1) {
                setShowPrice(false)
            } else {
                setShowPrice(true)
            }
        }
    })

    const BookNow = (itinerary_id: any) => {
        SaveStore({ itinerary: data });
        // navigate('/upcoming-cruises/selectCabin?id=' + itinerary_id)
        window.open('/upcoming-cruises/selectCabin?id=' + itinerary_id, '_blank')
    }
    const ViewItinerary = (itinerary_id: any) => {
        SaveStore({ itinerary: data });
        window.open('/upcoming-cruises/itinerary?id=' + itinerary_id, '_blank')
        // navigate('/upcoming-cruises/itinerary?id=' + itinerary_id)
    }

    const TagDesign = (tag: any) => {
        if (tag == 'Flash Sale') {
            return (
                <div className='relative'>
                    <p className='absolute top-[3px] lg:top-[6px] text-xxs lg:text-xs font-bold italic text-white left-[23px] lg:left-[33px]'>Flash Sale</p>
                    <img className='w-[90px] lg:w-[120px]' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/flash-selling-tag.svg' alt="" />
                </div>
            )
        } else if (tag == 'Lowest Price') {
            return (
                <div className='relative'>
                    <p className='absolute top-[3px] lg:top-[6px] text-xxs lg:text-xs font-bold italic text-white left-[14px] lg:left-[26px]'>Lowest Price</p>
                    <img className='w-[90px] lg:w-[120px]' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/best-price-tag.svg' alt="" />
                </div>
            )
        } else if (tag == 'Fast Selling') {
            return (
                <div className='relative'>
                    <p className='absolute top-[3px] lg:top-[6px] text-xxs lg:text-xs font-bold italic text-white left-[18px] lg:left-[31px]'>Fast Selling</p>
                    <img className='w-[90px] lg:w-[120px]' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-selling-tag.svg' alt="" />
                </div>
            )
        }
    }
    return (
        <div className="grid grid-cols-10 mb-4 relative">
            <div className='col-span-10 lg:col-span-2 h-[70px]'>
                <div className='absolute left-0 top-4 lg:top-6 w-full lg:w-auto'>
                    <div className='relative z-10'>
                        <img className='w-[435px] h-[170px] lg:h-[270px] rounded-t-lg' src={data?.image_url} alt="" />
                        <div className='absolute bottom-0 left-0 right-0 h-[140px] flex items-end' style={{
                            background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                        }}>
                            <div className='flex items-center justify-between px-3 lg:px-6 w-full pb-3 lg:pb-6'>
                                <div className='flex flex-wrap pr-6'>
                                    {data?.ports.map((val: any, i: any) => {
                                        if (val.name != 'At Sea')
                                            return (
                                                <p className='text-xs text-white lg:text-lg font-semibold'>{val.name} {data.ports.length != (i + 1) ? <span>-&nbsp;</span> : null}</p>
                                            )
                                    })}
                                    <p className='text-xs text-white lg:text-lg font-semibold'>&nbsp;({data?.nights}N/{data?.nights + 1}D)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center py-2 flex justify-between rounded-b-lg px-4' style={{
                        background: 'linear-gradient(90deg, #e9d4e8 0%, #f9d5ce 100%)'
                    }}>
                        <div className='flex items-center'>
                            <p className='text-xs lg:text-base font-semibold'>{moment(data.start_date, 'DD/MM/YYYY').format('DD MMM YYYY')}</p>
                            <img
                                className='h-4 lg:h-6 px-2'
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-black-icon.svg"
                                alt="backIcon"
                            />
                            <p className='text-xs lg:text-base font-semibold'>{moment(data.end_date, 'DD/MM/YYYY').format('DD MMM YYYY')}</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <img className='h-4 lg:h-6 mt-[2px]' src={`${data?.trip_type == "round" ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-purple-icon.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg'}`} alt="" />
                            <p className='text-xs lg:text-base ml-2 font-semibold'>{data?.trip_type == "round" ? 'Round Trip' : 'One Way Trip'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-span-10 lg:col-span-8 shadow-allSide pt-40 lg:pt-6 py-6 min-h-[360px] '>
                <div className='grid grid-cols-3 items-center mt-3'>
                    <div className='lg:pl-52 col-span-3 relative flex'>
                        {data?.nights > 2 ?
                            <Tooltip text="A shore excursion is a group tour or activity aimed at cruise travelers who can spend time in each port they're visiting on their itinerary. <br/> All shore excursions are available at an additional cost.">
                                <div className='px-4 lg:px-6 w-fit py-1.5 rounded-r-full cursor-pointer bg-brand-blue/20 flex items-center'>
                                    <p className='text-xxs lg:text-sm text-brand-blue font-semibold'>Shore Excursions Available</p>
                                    <img className='h-5 ml-1 lg:ml-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/shoreex-info-icon.svg" alt="" />
                                </div>
                            </Tooltip>
                            : null
                        }
                        <div className='absolute right-0 top-1'>
                            {TagDesign(data?.tags[0])}
                        </div>
                    </div>
                </div>

                <div className='pl-4 lg:pl-60'>
                    <div className='mt-5'>
                        <p className='text-xs lg:text-sm text-gray-100 font-normal'>Visiting Ports</p>
                        <div className='flex flex-wrap'>
                            {data?.ports.map((val: any, i: any) => {
                                if (val.name != 'At Sea')
                                    return (
                                        <div>
                                            <p className='text-xs lg:text-base font-medium'>{val.name} {data.ports.length != (i + 1) ? <span>| </span> : null}</p>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                    <div className='border-t border-gray-300 my-4 w-[96%]' />
                </div>
                {/* Web Design */}
                <div className='pl-4 lg:pl-60 hidden lg:block'>
                    <div className='grid grid-cols-12 items-end'>
                        <div className='col-span-5 pb-4'>
                            {data && data.offers_available && data.offers_available.length ?
                                <div>
                                    <p className='text-xxs lg:text-sm text-brand-blue font-medium mb-2'>Available Offers</p>
                                    {data.offers_available.slice(0, 2).map((val: any, i: any) => (
                                        <div className='flex items-center mt-2' key={i}>
                                            <img className='mr-2 h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg" alt="" />
                                            <p className='text-xs lg:text-sm font-semibold text-brand-green-text'>{val}</p>
                                        </div>
                                    ))}
                                </div>
                                : null
                            }
                        </div>
                        <div className='col-span-7 text-right flex flex-col items-end pr-4 lg:pr-6'>
                            {showPrice ?
                                <>
                                    <div className=''>
                                        <p className="text-xxs text-gray-100 mb-1.5">Starting From</p>
                                        {data?.discount_pct != 0 ?
                                            <p className="text-xs line-through text-gray-100">{`₹${FormatAmount(data?.actual_per_guest_per_night)}`}</p>
                                            : null}
                                        <p className="text-[1.6rem] font-bold mb-1">{`₹${FormatAmount(data?.per_guest_per_night)}`}</p>
                                        <p className="text-xxs mb-0 text-gray-100">Excl. GST Per Person in Double Occupancy</p>
                                    </div>
                                    <div className='mt-3 flex'>
                                        <button onClick={() => BookNow(data.itinerary_id)} className='text-xs cursor-pointer min-w-[130px] text-center lg:text-base border-1 border-brand-primary text-brand-primary px-4 py-2 font-semibold rounded'>BOOK NOW</button>
                                        <button onClick={() => ViewItinerary(data.itinerary_id)} className='text-xs min-w-[140px] text-center lg:text-base cursor-pointer border-1 border-brand-primary bg-brand-primary text-white px-4 py-2 font-semibold rounded ml-4'>VIEW ITINERARY</button>
                                    </div>
                                </>
                                :
                                <div className='mt-3 flex'>
                                    <button onClick={() => callBack(data?.itinerary_id)} className='text-xs min-w-[180px] text-center lg:text-base cursor-pointer border-1 border-brand-primary bg-brand-primary text-white px-4 py-2 font-semibold rounded ml-4'>Reveal Prices</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile Design */}
                <div className='lg:hidden'>
                    <div className='grid grid-cols-2 items-center relative'>
                        <div className='px-4'>
                            {data && data.offers_available && data.offers_available.length ?
                                <div>
                                    <p className='text-xs text-brand-blue font-normal mb-1'>Available Offers</p>
                                    {data.offers_available.slice(0, 2).map((val: any, i: any) => (
                                        <div className='flex items-center' key={i}>
                                            <img className='mr-2 h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg" alt="" />
                                            <p className='text-xxs font-semibold text-brand-green-text'>{val}</p>
                                        </div>
                                    ))}
                                </div>
                                : null
                            }
                        </div>
                        {showPrice ?
                            <>
                                <div>
                                    <div className='pr-4 lg:pr-6 text-right px-4'>
                                        <p className="text-xxs mb-0 text-gray-100">Starting From</p>
                                        {data?.discount_pct != 0 ?
                                            <p className="text-xxs lg:text-xs mb-0.5 line-through text-gray-100">{`₹${FormatAmount(data?.actual_per_guest_per_night)}`}</p>
                                            : null}
                                        <p className="text-sm lg:text-[1.6rem] font-bold mb-1">{`₹${FormatAmount(data?.per_guest_per_night)}`}</p>
                                        <p className="text-xxs lg:text-xxs mb-0 text-gray-100">Excl. GST Per Person in Double Occupancy</p>
                                    </div>
                                </div>
                                <div className='col-span-2 px-4 flex mt-2'>
                                    <button onClick={() => BookNow(data.itinerary_id)} className='text-xs cursor-pointer w-full text-center lg:text-base border-1 border-brand-primary text-brand-primary px-4 py-2 font-semibold rounded'>BOOK NOW</button>
                                    <button onClick={() => ViewItinerary(data.itinerary_id)} className='text-xs w-full text-center lg:text-base cursor-pointer border-1 border-brand-primary bg-brand-primary text-white px-4 py-2 font-semibold rounded ml-4'>VIEW ITINERARY</button>
                                </div>
                            </>
                            :
                            <div className='pr-4 lg:pr-6 text-right'>
                                <button onClick={() => callBack(data?.itinerary_id)} className='text-xs w-full text-center lg:text-base cursor-pointer border-1 border-brand-primary bg-brand-primary text-white px-2 py-2 font-semibold rounded'>Reveal Prices</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}