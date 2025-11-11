import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css'
import { Layout } from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
const NextArrow = (props: { className: any; style: any; onClick: any }) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', right: '10px' }}
            onClick={onClick}
        >
            <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/side-arrow-icon-1.svg"
                alt="Next"
                className="h-4"
            />
        </div>
    );
};
const PrevArrow = (props: { className: any; style: any; onClick: any }) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
            onClick={onClick}
        >
            <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/side-arrow-icon-2.svg"
                alt="Previous"
                className="h-4"
            />
        </div>
    );
};
export default function WebCheckIn() {
    const [cabin, setCabin] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    let chekinData = data;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: (
            <NextArrow className={undefined} style={undefined} onClick={undefined} />
        ),
        prevArrow: (
            <PrevArrow className={undefined} style={undefined} onClick={undefined} />
        ),
        responsive: [
            {
                breakpoint: 1024, // Tablets & smaller screens
                settings: {
                    slidesToShow: 4, // Show 3 items on screens < 1024px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Mobile screens
                settings: {
                    slidesToShow: 3, // Show 3 items on mobile
                    slidesToScroll: 1,
                },
            },
        ],
    };

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });

        const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
            (day % 10 === 2 && day !== 12) ? 'nd' :
                (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        return `${day}${suffix} ${month}`;
    }

    return (
        <>
            <Layout >
                <div className="lg:mt-28 mt-16 bg-gray-50 lg:mx-44 mx-4 mb-40 ">
                    <div className="bg-white rounded-md py-4 m-0 flex flex-col md:flex-row gap-12 cursor-pointer"
                        onClick={() => navigate(-1)}>
                        <div className=" top-4 left-4 flex items-center gap-3">
                            <img
                                className=""
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                                alt="Back"
                                title="Back"
                            />
                            <h1 className="text-xl md:text-2xl font-bold">Web Check-in</h1>
                        </div>
                    </div>
                    <div className="shadow-allSide rounded-md w-full lg:px-6 lg:py-6 py-4 px-5 pt-4 mt-3 ">
                        <div className='' >
                            <h1 className="text-xl font-bold lg:text-2xl mb-5">
                                Booking ID: {data?.number}
                            </h1>
                            <div className="grid font-semibold text-sm lg:text-lg grid-cols-10 w-full gap-3 lg:gap-8 my-3">
                                <div className="col-span-10 lg:col-span-6">
                                    {window.innerWidth > 640 ?
                                        <div className='flex flex-wrap gap-1'>
                                            <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/location-checkin-icons.svg' />
                                            <p>{data?.itinerary?.name}</p>
                                        </div>
                                        : <div className='grid grid-cols-10'>
                                            <div className="col-span-1 lg:col-span-1">
                                                <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/location-checkin-icons.svg' />
                                            </div>
                                            <div className="col-span-9 lg:col-span-9">
                                                <p>{data?.itinerary?.name}</p>
                                            </div>
                                        </div>}
                                </div>
                                <div className="col-span-10 lg:col-span-4">
                                    <div className='flex flex-wrap gap-1'>
                                        <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg' />
                                        <p>{data?.rooms?.length} Cabins</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-10 text-sm lg:text-lg font-semibold gap-3 lg:gap-8 w-full mt-3 my-3">
                                <div className="col-span-10 lg:col-span-6">
                                    <div className='flex flex-wrap  gap-1'>
                                        <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-checkin-icons.svg' />
                                        {formatDate(data?.itinerary.start_time)} - {formatDate(data?.itinerary.end_time)}
                                    </div>
                                </div>
                                <div className="col-span-10 lg:col-span-4">
                                    <div className='flex flex-wrap gap-1'>
                                        <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-booking-icon.svg' />
                                        <p>{data?.total_guest_count} Guests</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bg-[#fff4f3] p-4 rounded-md mt-6 shadow-sm">
                        <p className="text-lg lg:text-md font-bold flex items-center gap-4 mb-2">
                            <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg' alt='noteIcon' />
                            Important Note:
                        </p>
                        <ul className="list-disc lg:mx-16 ml-12 italic text-sm text-gray-100 font-semibold text-red">
                            <li>Make sure to have passports and travel documents handy for International Sailings</li>
                        </ul>
                    </div> */}
                    <div className="">
                        {data?.rooms.length > 5 ?
                            <div className='px-8 mt-8'>
                                <Slider {...settings}>
                                    {data?.rooms.map((data: any, index: any) => {
                                        return (
                                            <div className='px-2'>
                                                <Button text={`Cabin 0${index + 1}`} type={index + 1 == cabin ? 'primary' : 'secondary'} handleClick={() => setCabin(index + 1)} className='whitespace-nowrap w-full' />
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div> :
                            <div className='flex lg:mt-10 mt-3 lg:gap-5 gap-3 flex-wrap'>
                                {data?.rooms.map((data: any, index: number) => (
                                    <Button text={`Cabin 0${index + 1}`} type={index + 1 == cabin ? 'primary' : 'secondary'} handleClick={() => setCabin(index + 1)} className='mt-3' />
                                ))}
                            </div>}
                    </div>

                    {window.innerWidth > 640 ?
                        <div className='px-6 py-6  flex flex-wrap items-center gap-12 rounded-md mt-6  shadow-allSide' >
                            <div className="text-lg lg:text-md font-semibold flex items-center gap-2 mb-2">
                                <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg' alt='noteIcon' />
                                <p>{chekinData?.rooms[cabin - 1]?.category}</p>
                            </div>

                            <div className="text-lg lg:text-md font-semibold flex items-center gap-2 mb-2">
                                <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-booking-icon.svg' alt='noteIcon' />
                                <p>{chekinData?.rooms[cabin - 1]?.guests?.length} Guests</p>
                            </div>
                            <div className="text-lg lg:text-md font-semibold flex items-center gap-2 mb-2">
                                <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/findcruise-menu-icon.svg' alt='noteIcon' />
                                <p>Deck: {chekinData?.rooms[cabin - 1]?.deck_no}</p>
                            </div>
                            <div className="text-lg lg:text-md font-semibold flex items-center gap-2 mb-2">
                                <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg' alt='noteIcon' />
                                <p>Cabin No: {chekinData?.rooms[cabin - 1]?.number}</p>
                            </div>
                        </div>
                        :
                        <div className='px-4 py-6 mt-6  shadow-allSide rounded-md' >
                            <div className=' grid grid-cols-3 items-center rounded-md' >
                                <div className="col-span-2 text-sm lg:text-md font-semibold flex items-center gap-2 mb-2">
                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg' alt='noteIcon' />
                                    <p>{chekinData?.rooms[cabin - 1]?.category}</p>
                                </div>
                                <div className="col-span-1 text-sm lg:text-md font-semibold flex items-center gap-2 mb-2">
                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/findcruise-menu-icon.svg' alt='noteIcon' />
                                    <p>Deck: {chekinData?.rooms[cabin - 1]?.deck_no}</p>
                                </div>

                            </div>
                            <div className='  grid grid-cols-3 items-center rounded-md ' >
                                <div className="col-span-2 text-sm lg:text-md font-semibold flex items-center gap-2 mb-2">
                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-booking-icon.svg' alt='noteIcon' />
                                    <p>{chekinData?.rooms[cabin - 1]?.guests?.length} Guests</p>
                                </div>
                                <div className=" col-span-1 text-sm lg:text-md font-semibold flex items-center gap-2 mb-2">
                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg' alt='noteIcon' />
                                    <p>Room No: {chekinData?.rooms[cabin - 1]?.number}</p>
                                </div>
                            </div>
                        </div>
                    }


                    {
                        chekinData?.rooms?.map((room: any, index: number) => {
                            if (cabin === index + 1) {
                                return (
                                    room?.guests?.map((data: any, index: number) => (
                                        <>
                                            <div className="shadow-allSide lg:mt-8 mt-4 pb-4 rounded-md overflow-hidden">
                                                <div className="flex flex-wrap justify-between lg:px-6 px-4 py-4 bg-[#EEE]">
                                                    <div className='flex flex-wrap gap-6 justify-between'>
                                                        <div className=''>
                                                            <p className='lg:text-lg text:lg font-bold'>{data?.name}</p>
                                                            <span className='text-gray-100 lg:text-md text-sm'>{`${data?.type?.charAt(0) + data?.type?.slice(1).toLowerCase()}- ${data?.gender?.charAt(0) + data?.gender?.slice(1).toLowerCase()} `}</span>
                                                            {chekinData?.created_via === "B2C" && data?.phone &&
                                                                <span className='text-gray-100 lg:text-md text-sm'>| {data?.country_code} {data?.phone?.toString().slice(0, 2) + '*'.repeat(data?.phone.toString().length - 5) + data?.phone.toString().slice(-3)}</span>
                                                            }
                                                            {/* <p className='font-semibold lg:text-md text-sm'>DOB: {new Date(data?.date_of_birth).toLocaleDateString('en-GB')}</p> */}
                                                        </div>
                                                        {/* {data?.complete ? null : <div className='' >
                                                            <div className="bg-[#fff4f3] lg:w-[520px] px-4 py-4 rounded-md">
                          
                                                                <div className='flex flex-wrap  gap-4' > 
                                                                <div className="col-span-3 lg:w-[325px] text-xs font-semibold lg:col-span-2">
                                                                Do you want to proceed with the same mobile number for Guest 1 and Guest 3?
                                                                </div> 
                                                                <div className="text-sm font-bold lg:pl-4  ">
                                                                <div className='flex flex-wrap gap-4' >
                                                                <div className='flex gap-2 text-brand-green' >
                                                                <p>YES</p>
                                                                <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-vaild.svg'  />
                                                                </div>
                                                                <div className='flex gap-2 text-danger' >
                                                                <p>NO</p>
                                                                <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-invaild.svg'  />
                                                                </div>
                                                                </div>
                                                                </div> 
                                                                </div>
                                                
                                                            </div>
                                                        </div>} */}
                                                    </div>

                                                    {/* {window.innerWidth > 640 &&
                                                        <div className="">
                                                            {data?.complete ? 
                                                                <div
                                                                    className="w-full bg-brand-primary  text-brand-primary rounded-md text-white border border-brand-primary cursor-pointer mt-3 py-2 font-semibold px-4 px-4 lg:text-sm text-xs"
                                                                >
                                                                    <div className='flex gap-1 items-center ' >

                                                                        <div className='flex gap-2' >  <p className='mt-[2px]' > Download Boarding Pass</p> <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/download-checkin-icon.svg' /> </div>
                                                                    </div>

                                                                </div> 
                                                                :
                                                                <div
                                                                    className="w-full bg-brand-primary underline text-brand-primary rounded-md text-white border border-brand-primary cursor-pointer mt-3 py-2 font-semibold px-4 px-4 lg:text-sm text-xs"
                                                                    onClick={() => navigate('/checkInGuestDetail', { state: { data: data, cabin: index + 1, currentStep: 1 } })}
                                                                >
                                                                    <div className='flex gap-1 items-center ' >
                                                                        <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/check-in-start-icon.svg' />
                                                                        <p> Let’s Start</p>
                                                                    </div>

                                                                </div>
                                                            }
                                                        </div>
                                                    } */}
                                                </div>
                                                <div className="grid grid-cols-3 lg:grid-cols-2 gap-4 p-4">
                                                    {/* <div className={`col-span-3 lg:col-span-1 shadow-allSide  py-4 px-6 rounded-lg border ${data?.travel_info ? 'border-brand-green' : 'border-gray-400'} relative `}>
                                                        <p className='text-sm font-bold'  >Guest Verification</p>
                                                        <p className='text-xs font-semibold text-gray-100 mt-1'  >Scan Your Passport, Take a Selfie, and Add Your Personal Details</p>
                                                        {data?.travel_info ? <div className='absolute top-8 left-[-10px]' ><img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/yes-checkin-icon.svg' /></div> :
                                                            <p className='absolute top-8 px-2 bg-white py-1 left-[-11px] font-semibold rounded-full text-xxs shadow-allSide' >
                                                                1
                                                            </p>}
                                                    </div> */}
                                                    <p className='col-span-3 lg:col-span-2 text-sm font-bold ml-1'>Please complete the following steps to get a Boarding Pass:</p>
                                                    <div className={`col-span-3 lg:col-span-1 shadow-allSide p-4 rounded-lg border-2 ${data?.travel_info ? 'border-brand-green' : 'border-gray-400'}`}>
                                                        <div className='flex gap-3'>
                                                            {data?.web_checkin_done ?
                                                                <div className='self-center'>
                                                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/yes-checkin-icon.svg' />
                                                                </div>
                                                                :
                                                                <p className='px-2 bg-white py-1 font-semibold rounded-full text-xxs self-center w-6 h-6 border border-[#f2f2f2]'>1</p>
                                                            }
                                                            <div>
                                                                <p className='text-sm font-bold'>Guest Verification</p>
                                                                <p className='text-xs font-semibold text-gray-100 mt-1'>Scan your government photo ID, take a selfie, and add your personal details.</p>
                                                            </div>
                                                            <div className='hidden lg:block'>
                                                                {!data?.web_checkin_done &&
                                                                    <Button
                                                                        handleClick={() => {
                                                                            localStorage.removeItem('guest_doc_detail')
                                                                            localStorage.removeItem('doc_detail')
                                                                            navigate('/checkInGuestDetail', { state: { data: data, cabin: cabin, currentStep: 1 } })
                                                                        }}
                                                                        text='Start Verification'
                                                                        size='sm'
                                                                        className='w-max mt-3'
                                                                    />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="lg:hidden ml-9 inline-block">
                                                            {!data?.web_checkin_done &&
                                                                <div
                                                                    onClick={() => {
                                                                        localStorage.removeItem('guest_doc_detail')
                                                                        localStorage.removeItem('doc_detail')
                                                                        navigate('/checkInGuestDetail', { state: { data: data, cabin: cabin, currentStep: 1 } })
                                                                    }}
                                                                    className="w-full bg-brand-tertiary rounded-md text-white border border-brand-tertiary cursor-pointer mt-3 py-2 font-semibold px-4 lg:text-sm text-xs"
                                                                >
                                                                    <p>Start Verification</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className={`col-span-3 lg:col-span-1 shadow-allSide p-4 rounded-lg border ${data?.travel_info ? 'border-brand-green' : 'border-gray-400'}`}>
                                                        <div className='flex gap-3'>
                                                            {data?.web_checkin_done ?
                                                                <div className='self-center'>
                                                                    <img className='h-5' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/yes-checkin-icon.svg' />
                                                                </div>
                                                                :
                                                                <p className='px-2 bg-white py-1 font-semibold rounded-full text-xxs self-center w-6 h-6 border border-[#f2f2f2]'>2</p>
                                                            }
                                                            <div>
                                                                <p className='text-sm font-bold'>Boarding Pass</p>
                                                                <p className='text-xs font-semibold text-gray-100 mt-1'>Boarding pass is a digital document with essential travel details, required for boarding.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* {window.innerWidth > 640 && data?.complete && 
                                                    <div className='lg:inline-flex lg:justify-center lg:w-full'>
                                                        <div
                                                            className="bg-brand-primary rounded-md text-white border border-brand-primary cursor-pointer mt-3 py-2 font-semibold px-4 lg:text-sm text-xs mx-4"
                                                        >
                                                            <div className='flex gap-1 items-center'>
                                                                <div className='flex gap-2'> 
                                                                    <p className='mt-[2px]'> Download Boarding Pass</p>
                                                                    <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/download-checkin-icon.svg' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                } */}
                                                {(data?.travel_info && data?.health_form && data?.arrival_time !== '') || data?.web_checkin_done &&
                                                    <div className='lg:inline-flex lg:justify-center lg:w-full'>
                                                        <div
                                                            onClick={() => window.open(data?.boarding_pass_doc_url, '_blank')}
                                                            className="bg-brand-gradient rounded-md text-white border cursor-pointer mt-3 py-3 font-semibold px-4 flex justify-center mx-4 text-sm"
                                                        >
                                                            <div className='flex gap-1 items-center ' >
                                                                <div className='flex gap-2' >
                                                                    <p className='mt-[2px]' > Download Boarding Pass</p>
                                                                    <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/download-checkin-icon.svg' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                        </>
                                    ))
                                )
                            }
                        })
                    }
                </div>
            </Layout >
        </>
    );
}