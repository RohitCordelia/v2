import React, { useEffect, useState } from 'react';
import '../index.css'
import { Layout } from '../../../components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetBoardingPassMutation } from '../../../services/webCheckIn/webCheckIn';
import { createReturn } from 'typescript';

interface BoardingProps {
    guestData: any,
}

export default function BoardingPass({ guestData }: BoardingProps) {
    const navigate = useNavigate();
    const [data, setData] = useState<any>([])
    const [getBoardingPass] = useGetBoardingPassMutation()
    let bookingData = JSON.parse(window.localStorage.getItem('webChekInData'))

    const ScrollToTop = () => {
        const { pathname } = useLocation();
        useEffect(() => {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(0, 0);
                });
            }, 0);
        }, [pathname]);
        return null;
    };
    ScrollToTop()

    useEffect(() => {
        const getData = async () => {
            const id = bookingData?.id
            const _payload = { id: id };
            await getBoardingPass(_payload)
                .unwrap()
                .then((res: any) => {
                    let a = res.find((guest: any) => guest.guest_id == guestData.id)
                    setData(a)
                })
                .catch((res: any) => {
                    console.log('Error: ', res)
                })
        }
        getData()
    }, [])

    const parts = bookingData?.itinerary?.name.split('-');
    const firstText = parts[0];
    const lastText = parts[parts.length - 1];

    const time = (dateTime: any) => {
        const dateObj = new Date(dateTime);
        const day = dateObj.toLocaleDateString('en-GB', { weekday: 'short' });
        const dayNum = dateObj.toLocaleDateString('en-GB', { day: '2-digit' });
        const month = dateObj.toLocaleDateString('en-GB', { month: 'short' });
        const year = dateObj.getFullYear();
        const time = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }).replace('AM', 'am').replace('PM', 'pm');

        const formattedDate = `${day} ${dayNum} ${month} ${year} IST ${time}`;
        return formattedDate;
    }

    const handleDownload = async () => {
        const fileUrl = data?.boarding_pass_doc_url;
        window.open(fileUrl, '_blank');
    };

    let bannerBackground = {
        backgroundImage: `url(https://images.cordeliacruises.com/cordelia_v2/public/assets/boarding-pass-new-bg.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '100%'
    }

    return (
        <>
            <div className=" bg-gray-50 lg:mb-40">
                <div className="lg:mt-6 bg-gray-50 lg:mx-[17%] lg:mb-40 ">
                    <div className='grid grid-cols-2'>
                        <div className="lg:col-span-1 col-span-2 shadow-allSide">
                            <div className='flex flex-wrap justify-between px-4 pt-4 pb-3' >
                                <img className="h-9" src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo.svg' />
                                <div className=' text-end'>
                                    <p className='text-xs font-semibold' >Booking Id</p>
                                    <p className='text-sm font-bold gradient-text ' >{data?.booking_number}</p>
                                </div>
                            </div>
                            <div
                                style={{
                                    background: 'linear-gradient(90deg, rgba(156,47,137,1) 0%, rgba(214,96,102,1) 100%)'
                                }}
                                className='relative py-4'
                            >

                                <div className='bg-white opacity-10 mx-10 my-6 h-[50px] absolute' />
                                <div>
                                    <div className='grid grid-cols-3 bg-white/10  py-4 pl-4 pr-[12px] rounded-xl mx-4 text-white items-center'>
                                        <div className="lg:col-span-1 col-span-1">
                                            <p className='text-xxs text-white/60' >Departure port</p>
                                            <p className='text-sm font-semibold' >{data?.departure_port}</p>
                                            <p className='text-[11px]'>{data?.embarkation_date}</p>
                                            <p className='text-[11px]'>{data?.embarkation_time} Hrs</p>
                                        </div>
                                        <div className="lg:col-span-1 col-span-1 flex flex-wrap">
                                            <p className='text-white/60' >.......</p>
                                            <img className='h-9' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-boardingpass-icon.svg' />
                                            <p className='text-white/60' >......</p>
                                        </div>
                                        <div className="lg:col-span-1 text-end col-span-1">
                                            <p className='text-xxs text-white/60' >Arrival port</p>
                                            <p className='text-sm font-semibold' >{data?.arrival_port}</p>
                                            <p className='text-[11px]'>{data?.disembarkation_date}</p>
                                            <p className='text-[11px]'>{data?.disembarkation_time} Hrs</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-4 px-4 text-center text-white' >
                                    <p className='text-[11px] font-semibold' >Halting Ports: {data?.halting_ports}</p>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-3 pt-6 pb-4 px-5 gap-2 items-center'>
                                    <div className="lg:col-span-2 col-span-2 bg-gray-400 rounded-xl px-4  py-4">
                                        <p className='text-xs font-semibold text-gray-200' >Name</p>
                                        <p className='text-xs font-bold mt-1' >{data?.guest_fname} {data?.guest_lname}</p>
                                    </div>
                                    <div className="lg:col-span-1 col-span-1 flex flex-wrap items-center h-full rounded-xl border border-gradient-to-r from-[#EA725B] to-[#92278F] bg-clip-text text-transparent">
                                        <img src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/${data?.guest_type?.toLowerCase()}-${data?.gender?.toLowerCase()}-icon.svg`} />
                                        <div>
                                            <p className='text-xs font-semibold text-gray-200 mt-1' >{data?.gender?.charAt(0) + data?.gender?.slice(1)?.toLowerCase()}</p>
                                            <p className='text-xs font-bold text-gray-200 gradient-text' >{data?.guest_type?.charAt(0) + data?.guest_type?.slice(1)?.toLowerCase()}</p>
                                        </div>

                                    </div>
                                </div>
                                <div className='mx-5'>
                                    <div className='grid grid-cols-3 py-3 px-6 bg-gray-400 rounded-xl px-4 gap-2  items-center'>
                                        <div className="lg:col-span-1 col-span-1">
                                            <p className='text-xs font-semibold text-gray-200' >Deck</p>
                                            <p className='text-xs font-bold mt-1' >{data?.deck_no}</p>
                                        </div>
                                        <div className="lg:col-span-1 col-span-1">
                                            <p className='text-xs font-semibold text-gray-200' >Stateroom</p>
                                            <p className='text-xs font-bold mt-1' >{data?.state_room}</p>
                                        </div>
                                        <div className="lg:col-span-2  col-span-1">
                                            {/*  */}
                                            <p className='text-xs font-semibold text-gray-200' >Cabin Category</p>
                                            <p className='text-xs font-bold mt-1' >{data?.cabin_category}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-5 mt-4' >
                                    <div className='bg-gray-400 rounded-xl px-4 pt-4 '>
                                        <div className='grid grid-cols-3   items-center'>
                                            <div className="lg:col-span-2 col-span-2">
                                                <p className='text-xs font-semibold text-gray-200' >Check-in Time</p>
                                                <p className='text-xs font-bold mt-1' >Slot {data?.check_in_group} ( {data?.check_in_time} )</p>
                                            </div>

                                            {/* <div className="lg:col-span-1 col-span-1">
                                                        <p className='text-xs font-semibold text-gray-200' >Muster Station</p>
                                                        <p className='text-xs font-bold mt-1' >10</p>
                                                    </div> */}
                                        </div>
                                        <div className='grid grid-cols-1 py-3  items-center'>
                                            <div className="lg:col-span-1 col-span-1 mb-2">
                                                <p className='text-xs font-semibold text-gray-200' >Port </p>
                                                <p className='text-xs font-bold mt-1 leading-[20px]' >{data?.port}</p>
                                            </div>
                                            <div className='flex items-end gap-[6px]'>
                                                <a href={data?.direction_link} target='_blank' className='underline text-brand-blue font-bold text-xs'>View Direction</a>
                                                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/direction-boarding-pass-icon.svg" alt="Map direction" />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='grid grid-cols-2 py-3 px-10 mt-7 items-center'>
                                    <div className="lg:col-span-1 col-span-1">
                                        <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/ship-name-icon.svg' />
                                        <p className='text-xl text-brand-primary font-bold mt-1 gradient-text' >MV EMPRESS</p>
                                    </div>

                                    <div className="lg:col-span-1 col-span-1 items-end ml-8 ">
                                        <div className='object-contain' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: data?.boarding_pass_qr_svg }}
                                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                            />
                                            <style jsx>{`
                                                    .object-contain svg {
                                                    width: 100%;
                                                    height: auto;
                                                    max-width: 100%;
                                                    max-height: 100%;
                                                    display: block;
                                                    }
                                                        .svg-container svg {
                                                    width: 100%;
                                                    height: auto;
                                                    object-fit: contain;
                                                    }
                                                    `}</style>
                                        </div>

                                        {/* <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/boardingpass-dummy-qr.svg' /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 col-span-2 mt-4 text-center mb-6 lg:mb-44">
                            <button onClick={handleDownload}
                                className=" bg-brand-gradient rounded-md text-white cursor-pointer mt-3 py-2 font-semibold px-6 text-sm">
                                <div className='flex gap-1 items-center ' >
                                    <div className='flex gap-2' ><p className='mt-[2px]'> Download Boarding Pass</p> <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/download-checkin-icon.svg' /> </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}