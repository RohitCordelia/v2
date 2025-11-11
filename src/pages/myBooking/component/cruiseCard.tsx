import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { FormatAmount } from '../../../../src/utils/formatter/formatter';
import { useNavigate } from 'react-router-dom';
import { useGetBookingDetailMutation } from '../../../services/itinerary/itinerary';
import Modal from '../../../components/UI/ModalCenter';
import { GetManageDetail, SaveManageDetail } from '../../../utils/store/store';
import Button from '../../../components/UI/Button';
type Props = {}
interface DateComponentProps {
    dateRange: string;
}
export default function CruiseCard({ data, bookingData }: any) {
    const [detailModal, setDetailModal] = useState(false);
    const navigate = useNavigate();
    const ManageDetail = GetManageDetail();
    const [getBookingDetail] = useGetBookingDetailMutation();
    const [isExpanded, setIsExpanded] = useState(false);

    const monthMap: any = {
        "Jan": "Jan",
        "Feb": "Feb",
        "Mar": "Mar",
        "Apr": "Apr",
        "May": "May",
        "Jun": "Jun",
        "Jul": "Jul",
        "Aug": "Aug",
        "Sep": "Sep",
        "Oct": "Oct",
        "Nov": "Nov",
        "Dec": "Dec"
    };
    const DateComponent: React.FC<DateComponentProps> = ({ dateRange }) => {
        const [start, end] = dateRange.split(" - ");
        const [startDay, startMonth] = start.split('/');
        const [endDay, endMonth] = end.split('/');
        const startMonthFormatted = monthMap[startMonth];
        const endMonthFormatted = monthMap[endMonth];
        return (
            <div className="bg-brand-yellow flex flex-wrap text-sm font-semibold justify-center text-center lg:px-2 py-1 lg:py-[8px] rounded-md items-center gap-1 lg:gap-2 w-24 lg:w-28">
                <div className="flex-col lg:leading-[17px] justify-center">
                    <p>{startMonthFormatted}</p>
                    <p className="font-bold">{startDay}</p>
                </div>
                <img
                    className='lg:h-[7px]'
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/itinerary-arrow-icon.svg"
                    alt="backIcon"
                />
                <div className="flex-col lg:leading-[17px] justify-center">
                    <p>{endMonthFormatted}</p>
                    <p className="font-bold">{endDay}</p>
                </div>
            </div>
        );
    };
    const goToDetail = (id: any) => {
        navigate('/manage-booking/booking-details', { state: { id } });
        const bookingdata = bookingData.filter((booking: any) => booking.booking_id === id);
        SaveManageDetail({
            ...ManageDetail,
            myBooking: bookingdata
        });
    }
    const handleDuePayment = async (id: any) => {
        let payload = {
            booking_id: id
        }
        await getBookingDetail(payload)
            .unwrap()
            .then((res: any) => {
                console.log(res);
                // localStorage.setItem('getBooking', JSON.stringify(res));
                SaveManageDetail({
                    ...ManageDetail,
                    getBooking: res
                });
                navigate(`/manage-booking/payment-summery?booking_id=${id}`, { state: { res: res, type: 'due' } })
            })
            .catch((res: any) => {
                console.log('Error: ', res);
            });
    };

    const itineraryName =
        data?.nights_count > 5
            ? `${data?.ports[0]} - ${data?.ports[data?.ports.length - 1]}`
            : data?.ports.map((p: any) => p).join(' - ');

    const portList = data?.ports
        .filter((val: any) => val !== 'At Sea')
        .map((val: any) => val)
        .join(' | ');

    const isLong = portList?.length > 150;

    return (
        <>
            <div className="grid grid-cols-10 mb-4 relative">
                <div className='col-span-10 lg:col-span-2 h-[70px]'>
                    <div className='absolute left-0 top-4 lg:top-6 w-full lg:w-auto'>
                        <div className='relative z-10'>
                            <img className='w-[435px] h-[170px] lg:h-[270px] rounded-t-lg' src={data?.image} alt="" />
                            <div className='absolute bottom-0 left-0 right-0 h-[140px] flex items-end' style={{
                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0) 100%, rgba(0,212,255,0) 100%)'
                            }}>
                                <div className='flex items-center justify-between px-3 lg:px-6 w-full pb-3 lg:pb-6'>
                                    {/* {data?.ports.map((val: any, i: any) => {
                                            if (val.name != 'At Sea')
                                                return (
                                                    <p className='text-xs text-white lg:text-lg font-semibold'>{val} {data.ports.length != (i + 1) ? <span>-&nbsp;</span> : null}</p>
                                                    )
                                                    })} */}
                                    <p className='text-xs text-white lg:text-lg font-semibold'>{itineraryName} &nbsp;({data?.nights_count}N/{data?.nights_count + 1}D)</p>
                                </div>
                            </div>
                        </div>
                        <div className='text-center py-2 flex justify-center rounded-b-lg px-4' style={{
                            background: 'linear-gradient(90deg, #e9d4e8 0%, #f9d5ce 100%)'
                        }}>
                            <p className='text-xs lg:text-base font-semibold'>Booking ID: {data.booking_number}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-10 lg:col-span-8 shadow-allSide pt-40 lg:pt-6 min-h-[360px] '>
                    <div className="flex flex-wrap items-center justify-between ml-4 lg:ml-0 lg:pl-60">
                        <div className='flex lg:items-center lg:gap-4'>
                            <DateComponent dateRange={data?.sailing_date} />
                            {data?.ship?.name && (
                                <div
                                    className="hidden lg:flex gap-1 rounded-[32px] py-1 px-2 border lg:border-2  items-center basis-auto justify-end lg:py-1 lg:px-4"
                                    style={{
                                        border: '2px solid transparent',
                                        backgroundImage:
                                            'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                                        backgroundClip: 'padding-box, border-box',
                                        backgroundOrigin: 'border-box'
                                    }}
                                >
                                    <div className="w-4 lg:w-8">
                                        <img
                                            src={
                                            'https://images.cordeliacruises.com/cordelia_v2/public/assets/new-flow-icons_gradient.svg'
                                            }
                                            alt="cruise_icon"
                                        />
                                    </div>
                                    <div className="text-xxs lg:text-sm text-brand-primary font-bold">
                                        {data?.ship?.name}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={` ${data.status === 'CONFIRMED' ? 'bg-brand-green  ' : data.status == 'CANCELLED' ? 'bg-danger' : 'bg-red'}  lg:mr-[-25px] lg:absolute lg:top-6 lg:right-6  ml-7 flex flex-wrap text-sm font-semibold justify-center text-center h-9 px-8 rounded-l-3xl items-center gap-2`}>
                            <p className="font-bold text-white">{data.status}</p>
                        </div>
                    </div>
                    {data?.ship?.name && <div className='lg:hidden flex justify-end mt-3 mx-4'>
                        <div className='flex gap-1 rounded-[32px] w-max py-1 px-2 border lg:border-2 border-brand-primary items-center basis-auto justify-end lg:py-1 lg:px-4'>
                            <div className='w-4 lg:w-8'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/assets/new-flow-icons_gradient.svg"} alt="cruise_icon" />
                            </div>
                            <div className='text-xxs lg:text-sm text-brand-primary font-bold'>{data?.ship?.name}</div>
                        </div>
                    </div>}
                    <div className='pl-4 lg:pl-60'>
                        <div className='mt-5'>
                            <p className='text-xs lg:text-sm text-gray-100 font-normal'>Visiting Ports</p>
                            <div className='flex flex-wrap'>
                                {/* {data?.ports.reduce((acc: any, port: any, index: number) => {
                                    if (index > 0) {
                                        acc.push(<span key={`sep-${index}`} style={{ margin: '0 4px' }}>|</span>);
                                    }
                                    acc.push(<p key={`port-${index}`}>{port}</p>);
                                    return acc;
                                }, [])} */}
                                <p className="text-xs lg:text-sm font-medium !leading-5">
                                    <span className='mr-2'>{isLong && !isExpanded ? portList?.slice(0, window.innerWidth > 765 ? 65 : 40) + '...' : portList}</span>
                                    {isLong && (
                                        <span
                                            onClick={() => setIsExpanded(prev => !prev)}
                                            className="text-xs lg:text-sm text-brand-primary font-bold cursor-pointer inline-block"
                                        >
                                            {isExpanded ? 'View less' : 'View more'}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className='border-t border-gray-300 my-5 w-[96%]' />
                    </div>

                    <div className='flex flex-wrap gap-6 pl-4 lg:pl-60'>
                        <div className='flex flex-wrap text-sm font-semibold items-start gap-2'>
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/nights-booking-icon.svg"
                                alt="backIcon"
                                className='h-5'
                            />
                            <div className="flex-col gap-2">
                                <p className='text-xs text-gray-100'>Total Nights</p>
                                <p className="text-sm font-bold">{data?.nights_count}N/{data?.nights_count + 1}D</p>
                            </div>
                        </div>

                        <div className='flex flex-wrap text-sm font-semibold items-start gap-2'>
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg"
                                alt="backIcon"
                                className='h-5'
                            />
                            <div className="flex-col">
                                <p className='text-xs text-gray-100'>Total Cabins</p>
                                <p className="text-sm font-bold"> {data?.cabins_count < 10 ? `0${data?.cabins_count}` : data?.cabins_count}</p>
                            </div>
                        </div>
                        <div className='flex flex-wrap text-sm font-semibold items-start gap-2'>
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-booking-icon.svg"
                                alt="backIcon"
                                className='h-5'
                            />
                            <div className="flex-col">
                                <p className='text-xs text-gray-100'>Total Guests</p>
                                <p className="text-sm font-bold">
                                    {data?.guests_count < 10 ? `0${data?.guests_count}` : data?.guests_count}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-wrap text-sm font-semibold items-start gap-2'>
                            <img
                                src={data?.trip_type === 'round' ? "https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-booking-icon.svg" : "https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-booking-icon.svg"}
                                alt="backIcon"
                                className='h-5'
                            />
                            <div className="flex-col">
                                <p className='text-xs text-gray-100'>Trip Type</p>
                                <p className="text-sm font-bold">{data?.trip_type === 'round' ? 'Round Trip' : 'One Way Trip'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='pl-4 lg:pl-60'>
                        <div className='border-t border-gray-300 my-5 w-[96%]' />
                    </div>
                    <div className='flex flex-wrap justify-between my-4 pl-4 lg:pl-60 pr-4'>
                        <div className="flex-col gap-2">
                            <p className='text-xs text-gray-200 font-semibold'>Grand Total</p>
                            <p className="text-xl lg:text-2xl font-bold">₹{data.price_details.toLocaleString('en-IN')}</p>
                        </div>
                        <div className='flex lg:flex-wrap gap-1 lg:gap-3 my-2' >
                            {/* <button
                                // onClick={() => setDetailModal(true)}
                                onClick={() => goToDetail(data.booking_id)}
                                className={`mb-2 lg:mb-4 lg:text-md text-xs font-semibold border-2 border-brand-primary py-2 lg:py-2 px-4 lg:px-6 rounded text-brand-primary`}
                            >
                                View Details
                            </button> */}
                            <Button text='View Details' size='sm' type='secondary' handleClick={() => goToDetail(data.booking_id)} className='lg:mb-4' />

                            {data.status === 'RESERVED' ? 
                            // <button
                            //     onClick={() => handleDuePayment(data.booking_id)}
                            //     className={`mb-2 uppercase lg:mb-4 lg:text-md lg:w-[135px] text-xs font-semibold bg-brand-primary py-2 lg:py-2 px-4 lg:px-6 rounded text-white`}
                            // >
                            //     Pay Due
                            // </button> 
                            <Button text='Pay Due' size='sm' handleClick={() => handleDuePayment(data.booking_id)} className='uppercase lg:mb-4 lg:w-[135px]' />
                            : null}
                        </div>
                    </div>
                    {data?.shore_excursion?.length > 0 ?
                        <div className='flex justify-center pl-4 lg:pl-60 pr-6 mt-2'>
                            <div className='flex items-center justify-center bg-lightBlue rounded-t-xl w-full'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/shoreex-booking%20icon.svg"
                                    alt="backIcon"
                                />
                                <p className='flex flex-wrap font-semibold text-sm py-2 text-textBlue justify-center'>
                                    Shore Excursions Booked for Guests
                                </p>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
            <Modal show={detailModal} align={'center'} className=" w-[90%] lg:w-[45%] center overflow-hidden no-scrollbar left-0 right-0 m-auto top-0 bottom-0 h-[30%] relative" onClose={() => {
                setDetailModal(false)
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setDetailModal(false)
                    }}>X</p>
                </div>
                <div className='overflow-scroll no-scrollbar h-[90%] lg:h-[85%]  px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded justify-center'>
                    <div className='mt-10'>
                        <p className='text-xl font-semibold'>Manage your booking with ease. Download our app now!</p>
                        <div className='flex mt-6 justify-center lg:justify-center'>
                            <a
                                target='_blank' href="https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp"
                            >
                                <img className='mr-4' src="https://images.cordeliacruises.com/cordelia_v2/public/images/google-play-store-logo.webp" alt="" />
                            </a>
                            <a
                                target='_blank' href="https://apps.apple.com/in/app/cordelia-cruises/id1589910857"
                            >
                                <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/apple-app-store-logo.webp" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    );
}