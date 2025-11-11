import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormatAmount, FormatPrice, FormatToString } from '../../../src/utils/formatter/formatter';
import { useCabinCancellationMutation, useCancelBookingMutation, useCancellationSummaryMutation } from '../../../src/services/profile/profile';
import Modal from '../../components/UI/Modal';
import { GetManageDetail } from '../../utils/store/store';
import Button from '../../components/UI/Button';
interface Cabin {

}

const CancellationSummary: React.FC = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const { type, res } = location.state || {};
  const [view, setView] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail.myBooking;
  let booking: any = ManageDetail.getBooking;

  const [cancelBooking] = useCancelBookingMutation();
  const [cabinCancellation] = useCabinCancellationMutation();
  const [cancelSummary] = useCancellationSummaryMutation();
  const [cancelPolicy, setCancelPolicy] = useState([]);

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

  const selectGuest = (id: any) => {
    navigate(`/manage-booking/guest-detail`, { state: { id } });
  }
  const selectCabin = (id: any) => {
    navigate(`/manage-booking/select-cabin`, { state: { id } });
  }
  const startDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr.split('/');
      return `${day} ${month} ${year} `;
    }
    const formattedStartDate = formatDate(startDateStr);
    // const formattedEndDate = formatDate(endDateStr);
    return (
      <span className="">{formattedStartDate}</span>
    );
  };
  const endDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr.split('/');
      return `${day} ${month} ${year} `;
    }
    const formattedEndDate = formatDate(endDateStr);
    return (
      <span className=""> {formattedEndDate}</span>
    );
  };
  let runningTotal = 0;
  let shoreExGst = 0;
  if (booking?.shore_excursion) {
    if (booking?.shore_excursion.length > 0) {
      booking?.shore_excursion.map((item: any, index: number) => {
        runningTotal += item.total;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(runningTotal)}`}
          </p>
        );
      });
      booking?.shore_excursion.map((item: any, index: number) => {
        shoreExGst += item.gst;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(shoreExGst)}`}
          </p>
        );
      });
    }
  }

  const cancelMyBooking = () => {
    setIsLoadingApi(true)
    cancelBooking(booking?.id)
      .unwrap()
      .then((res: any) => {
        localStorage.setItem('bookingStatus', JSON.stringify(res));
        setIsLoadingApi(false)
        navigate('/manage-booking/booking-status?status=cancelBooking')
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }
  const cancelPartialCabin = () => {
    let data = {
      bkroom_id: res?.data?.cabin_fares[0].id
    }
    let _payload = {
      id: booking?.id,
      data: data
    }
    setIsLoadingApi(true)
    cabinCancellation(_payload)
      .unwrap()
      .then((res: any) => {
        localStorage.setItem('bookingStatus', JSON.stringify(res));
        setIsLoadingApi(false)
        navigate('/manage-booking/booking-status?status=removeCabin')
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const getCancelPolicy = async () => {
    await cancelSummary(booking?.id)
      .unwrap()
      .then((res: any) => {
        setCancelPolicy(res?.data?.policies)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  useEffect(() => {
    getCancelPolicy()
  }, [])


  const rescheduleBooking = async () => {
    let type = 'rescheduleBooking';
    navigate('/manage-booking/reschedule')
  }

  const itineraryName =
    booking?.nights > 5
      ? `${booking?.ports[0]} - ${booking?.ports[booking?.ports.length - 1]}`
      : booking?.route;

  return (
    <Layout>
      <div className="mb-28 lg:mt-28 mt-20 px-4 lg:px-40">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
            alt="arrow"
            onClick={() => navigate(-1)}
            className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
          />
          <p className="text-xl font-bold lg:text-xl ">
            Cancellation Summary
          </p>
        </div>

        <div className="grid lg:px-3 grid-cols-12 ">
        
          <div className="col-span-12 lg:col-span-8 mt-4 lg:mt-0">
            <div className="relative mt-4 flex flex-wrap justify-center lg:h-30 inline-block h-full">


              {/* <img
                src={
                  window.innerWidth > 640
                    ? "https://images.cordeliacruises.com/cordelia_v2/public/images/payment-itinerary-image.webp"
                    : "https://images.cordeliacruises.com/cordelia_v2/public/images/modfiy-booking-image-mobile.webp"
                }
                alt="img"
                className="w-full h-auto object-cover"
              /> */}

              {/* Overlay Content */}

              <div
                className="lg:absolute top-0 left-0 w-full items-start lg:items-center justify-center lg:justify-start text-black p-4 lg:p-6 shadow-lg"
              >
                <div className='flex'>
                  <img
                    src={
                      window.innerWidth > 640
                        ? "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-mumbai-itinerary-desktop-image-01.webp"
                        : "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-mumbai-itinerary-desktop-image-01.webp"
                    }
                    alt="img"
                    className="w-[150px] h-[80px] object-cover rounded-lg"
                  />
                  <div className='ml-3 font-bold'>
                    <h1 className="lg:text-[22px] text-[10px] text-[#009A2B]">Booking ID: {booking?.number}</h1>
                    <p className='lg:text-[16px] text-[12px] ' >{itineraryName}&nbsp;({booking?.nights}N/{booking?.nights+1}D)</p>
                  </div>
                </div>

                <div className='lg:flex text-gray-100  mt-4 gap-[50px] '>
                  <div className=' lg:block hidden lg:text-[14px] text-[11px]' >
                    <div className="flex items-center gap-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-checkin-icons.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>{startDate(booking?.sailing_date)} - {endDate(booking?.sailing_date)}</p>
                    </div>
                    <div className="flex items-center gap-2 lg:mt-3">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/nights-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>{booking?.nights} Night[s]</p>
                    </div>
                  </div>
                  <div className='lg:hidden block flex lg:text-[14px] text-[11px]' >
                    <div className="flex items-center gap-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-checkin-icons.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>{startDate(booking?.sailing_date)} - {endDate(booking?.sailing_date)}</p>
                    </div>
                    <div className="flex items-center gap-2 lg:mt-3 ml-[27px]">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/nights-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>{booking?.nights} Night[s]</p>
                    </div>
                  </div>

                  <div className=' lg:block hidden lg:text-[14px] text-[11px]'>
                    <div className="flex items-center gap-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>Empress</p>
                    </div>
                    <div className="flex items-center gap-2 lg:mt-4">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-icon.svg" className="w-[20.1px] h-[21.83px]" />
                      <p>{bookingRoute[0]?.guests_count} Guest[s]</p>
                    </div>
                  </div>

                  <div className='lg:hidden block flex lg:text-[14px] text-[11px]'>
                    <div className="flex items-center gap-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>Empress</p>
                    </div>
                    <div className="flex items-center gap-2 lg:mt-4 ml-[121px]">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-icon.svg" className="w-[20.1px] h-[21.83px]" />
                      <p className='ml-[5px]'>{bookingRoute[0]?.guests_count} Guest[s]</p>
                    </div>
                  </div>



                  <div className=' lg:block hidden lg:text-[14px] text-[11px]'>
                    <div className="flex items-center gap-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>Round Trip</p>
                    </div>
                    <div className="flex items-center gap-2 lg:mt-3">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>{bookingRoute[0]?.cabins_count} Cabin[s]</p>
                    </div>
                  </div>

                  <div className='lg:hidden block flex lg:text-[14px] text-[11px]'>
                    <div className="flex items-center gap-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>Round Trip</p>
                    </div>
                    <div className="flex items-center gap-2 lg:mt-3 ml-[103px]">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-booking-icon.svg" className="w-[30.83px] h-[30.83px]" />
                      <p>{bookingRoute[0]?.cabins_count} Cabin[s]</p>
                    </div>
                  </div>


                </div>
              </div>


            </div>
          </div>
        </div>
        <p className='text-xl font-bold py-3 lg:hidden block mt-[30px]' >Refund Summary</p>
        <div className='pb-4 lg:w-[32%] lg:float-right lg:mt-0 mt-[10px]'>
          <div className='border-gray-400 shadow-allSide rounded-lg mb-4 overflow-hidden'>
            <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>                
              <p className='text-lg font-bold'>Price Details</p>
              {!view ?
                <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>View Price Breakup</p> :
                <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>Hide Price Breakup</p>
              }  
            </div>
            {
              type === 'removeCabin' ?
                <>
                  {view ? <div className='py-4'>
                    <div className='px-3'>
                      {res?.data?.cabin_fares?.map((room: any, index: number) => {
                        return (
                          <div className="grid grid-cols-3 mb-2" key={index}>
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">{`CABIN  FARE`}</p>
                              <p className="text-sm lg:text-sm font-semibold">Service Charge & Levies</p>
                              <p className="text-sm lg:text-sm font-semibold">Fuel Surcharge</p>
                              {room.discount ? <p className="text-sm lg:text-sm font-semibold">Discount</p> : null}
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(room.cabin_fare).toFixed())}`}</p>
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(room.service_charges).toFixed())}`}</p>
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(room.fuel_surcharge).toFixed())}`}</p>
                              {room.discount ? <p className="text-sm lg:text-sm font-semibold">{`- ₹ ${FormatToString(parseInt(room.discount).toFixed())}`}</p> : null}
                            </div>
                          </div>
                        );
                      })}
                      {booking?.shore_excursion ?
                        booking?.shore_excursion.length > 0 ?
                          <div className="grid grid-cols-3 mb-1" >
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Shore Excursions Total (inclusive of GST)</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">{runningTotal}</p>
                            </div>
                          </div>
                          : null
                        : null
                      }
                      {booking?.shore_excursion ?
                        booking?.shore_excursion.length > 0 ?
                          <div className="grid grid-cols-3 mb-2" >
                            <div className="col-span-2">
                              {booking?.shore_excursion.map((item: any) => (
                                <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                  {item?.code}
                                </p>
                              ))}
                            </div>
                            <div className="text-right">
                              {booking?.shore_excursion.map((item: any) => (
                                <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">{`₹ ${FormatPrice(item.total)}`}</p>
                              ))}
                              {/* <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                    <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p> */}
                            </div>
                          </div>
                          : null
                        : null
                      }

                      {booking?.protection_plan && booking?.protection_plan.amount > 0 ?
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(booking?.protection_plan.amount)}</p>
                          </div>
                        </div>
                        : null
                      }
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                            res?.data?.cabin_fares[0].price.total
                          ).toFixed())}`}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                          <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                          {/* {booking?.shore_excursion && booking?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                      Shore Excursions
                    </p> : null} */}
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">₹{FormatAmount(res?.data?.cabin_fares[0]?.gst)}</p>
                          <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(res?.data?.cabin_fares[0]?.gst)}</p>
                          {/* {booking?.shore_excursion && booking?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(shoreExGst)}</p>
                      : null} */}
                        </div>

                      </div>
                    </div>
                  </div > : null}
                  <div className="grid grid-cols-3 px-3 py-3 mb-2" >
                    <div className="col-span-2">
                      <p className="text-md lg:text-md font-semibold">{`Total Amount Paid`}</p>
                      {/* <p className="text-md lg:text-md font-semibold">{`Cancel Amount`}</p> */}
                      <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">Cancellation Charges (inclusive of GST)<br /> (Note: Reschedule and Reinstate Fees are non-refundable) </p>
                      {/* <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">GST</p> */}
                    </div>
                    <div className="text-right">
                      <p className="text-md lg:text-sm text-brand-primary font-bold">{`₹ ${FormatPrice(res.data.fee_details.cancellation_amount == undefined ? res.data.fee_details.total_paid : res.data.fee_details.cancellation_amount)}`}</p>
                      {/* <p className="text-md lg:text-sm text-brand-primary font-bold">{`₹ ${FormatPrice(res.data.fee_details.cancellation_amount == undefined? res.data.fee_details.total_paid:res.data.fee_details.cancellation_amount)}`}</p> */}
                      <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(res.data.fee_details.fee)}`}</p>
                      {/* <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(res.data.total_fares.gst)}`}</p> */}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3 bg-brand-secondary/[0.1] items-end">
                    <div className="col-span-2">
                      <p className="text-base lg:text-md font-bold">Amount Refundable</p>
                    </div>
                    <div className="text-right">

                      {booking?.amount_paid ? <p className="text-base lg:text-lg font-bold text-brand-primary">{`₹ ${type === 'removeCabin' ? FormatPrice(res.data.fee_details.refund_amount == undefined ? res.data.fee_details.total_refund : res.data.fee_details.refund_amount) : FormatPrice(res.data.fee_details.total_refund)}`}</p> : null}
                    </div>
                  </div>
                </> :
                <>
                  {view ? <div className='py-4'>
                    <div className='px-3'>
                      {booking?.rooms?.map((room: any, index: number) => {
                        return (
                          <div className="grid grid-cols-3 mb-2" key={index}>
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">{`CABIN ${index + 1} FARE`}</p>
                              <p className="text-sm lg:text-sm font-semibold">Service Charge & Levies</p>
                              <p className="text-sm lg:text-sm font-semibold">Fuel Surcharge</p>
                              {room.discount ? <p className="text-sm lg:text-sm font-semibold">Discount</p> : null}
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.actual_cabin_fare)}`}</p>
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p>
                              {room.discount ? <p className="text-sm lg:text-sm font-semibold">{`- ₹ ${FormatPrice(room.discount)}`}</p> : null}
                            </div>
                          </div>
                        );
                      })}
                      {booking?.shore_excursion ?
                        booking?.shore_excursion.length > 0 ?
                          <div className="grid grid-cols-3 mb-1" >
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Shore Excursions Total (inclusive of GST)</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">{runningTotal}</p>
                            </div>
                          </div>
                          : null
                        : null
                      }
                      {booking?.shore_excursion ?
                        booking?.shore_excursion.length > 0 ?
                          <div className="grid grid-cols-3 mb-2" >
                            <div className="col-span-2">
                              {booking?.shore_excursion.map((item: any) => (
                                <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                  {item?.code}
                                </p>
                              ))}
                            </div>
                            <div className="text-right">
                              {booking?.shore_excursion.map((item: any) => (
                                <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">{`₹ ${FormatPrice(item.total)}`}</p>
                              ))}
                              {/* <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                    <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p> */}
                            </div>
                          </div>
                          : null
                        : null
                      }

                      {booking?.protection_plan && booking?.protection_plan.amount > 0 ?
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(booking?.protection_plan.amount)}</p>
                          </div>
                        </div>
                        : null
                      }
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                            booking?.sub_total
                          ).toFixed())}`}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                          <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                          {/* {booking?.shore_excursion && booking?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                      Shore Excursions
                    </p> : null} */}
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">₹{FormatAmount(booking?.gst)}</p>
                          <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(booking?.gst)}</p>
                          {/* {booking?.shore_excursion && booking?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(shoreExGst)}</p>
                      : null} */}
                        </div>

                      </div>
                    </div>
                  </div > : null}
                  <div className="grid grid-cols-3 px-3 py-3 mb-2" >
                    <div className="col-span-2">
                      <p className="text-md lg:text-md font-semibold">{`Total Amount Paid`}</p>
                      <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">Cancellation Charges (inclusive of GST)<br /> (Note: Reschedule and Reinstate Fees are non-refundable) </p>
                      {/* <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">GST</p> */}
                    </div>
                    <div className="text-right">
                      <p className="text-md lg:text-sm text-brand-primary font-bold">{`₹ ${FormatPrice(booking?.amount_paid)}`}</p>
                      <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(res.data.fee_details.fee)}`}</p>
                      {/* <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(res.data.total_fares.gst)}`}</p> */}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-4 py-3 bg-brand-secondary/[0.1] items-end">
                    <div className="col-span-2">
                      <p className="text-base lg:text-md font-bold">Amount Refundable</p>
                    </div>
                    <div className="text-right">

                      {booking?.amount_paid ? <p className="text-base lg:text-md font-bold text-brand-primary">{`₹ ${type === 'removeCabin' ? FormatPrice(res.data.fee_details.refund_amount) : FormatPrice(res.data.fee_details.total_refund)}`}</p> : null}
                    </div>
                  </div>
                </>
            }
          </div>
          <div className="col-span-12 lg:col-span-4 lg:order-2 order-2 ">          
            <div className=" flex justify-center text-center">
              <Button text={type === 'removeCabin' ? 'Cancel Cabin' : 'Cancel Booking'} handleClick={() => setShow(!show)} className='w-full' />
            </div>
          </div>
        </div>

        <div className="lg:mt-80 mt-10 bg-white rounded-lg w-full max-w-[621px] ml-3">
          <h3 className="text-xl md:text-2xl font-bold mb-4 underline">Cancellation Policy</h3>
          <div className="col-span-2 overflow-x-auto">
            <table className="border border-gray-300 rounded-lg w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-3 text-left text-sm md:text-base border-r border-gray-300">Days to Departure</th>
                  <th className="p-3 text-left text-sm md:text-base">Cancellation Fee</th>
                </tr>
              </thead>
              <tbody>
                {cancelPolicy?.fees?.map((item: any, index: any) => (
                  <tr key={index} className="border-b border-gray-300 text-gray-700">
                    <td className="p-3 text-sm md:text-base border-r border-gray-300">{item?.days_to_depature}</td>
                    <td className="p-3 text-sm md:text-base">{item?.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-5 text-gray-700 space-y-2 text-sm md:text-base">
            {cancelPolicy?.terms?.map((item: any, index: any) => (
              <li className="p-1 text-sm md:text-base">•&nbsp;{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        show={show}
        align={'center'}
        className="drop-shadow bg-white lg:w-[36%] center py-8 lg:top-[15%] top-[20%] lg:bottom-1/6
          lg:left-[31%] left-4 right-4 lg:h-auto rounded-lg lg:rounded-lg border mt-20"
        onClose={() => setShow(false)}
      >
        <div
          className="flex justify-between items-center"
        >
          <div
            onClick={() => {
              setShow(false)
            }}
            className="absolute ml-[94%] mt-[-21px] font-bold cursor-pointer "
          >
            X
          </div>
        </div>
        <div className=" flex gap-3 justify-center text-lg font-bold self-center px-4 ">
          <p>{type === 'removeCabin' ? 'Cabin Cancellation' : 'Are You Sure You Want to Cancel ?'} </p>
        </div>

        <div className="text-center lg:px-3 px:12 mt-2 lg:mt-4">
          <p className="px-2 text-sm">
            {
              type === 'removeCabin' ?  'Are you sure you want to cancel this cabin cancellation charges are applicable.': "We noticed you're about to cancel your booking. Would you like to reschedule it to another date instead?"
            }
            {/* Are you sure you want to Cancel this {type === 'removeCabin' ? 'cabin' : 'booking'}? Cancellation Charges are applicable. */}
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mt-4 px-4">
          {/* <button
            className={`text-brand-primary border border-brand-primary w-32  disabled:bg-brand-primary/10   text-sm py-3 px-8 rounded font-bold`}
            onClick={() => {
              setShow(!show)
            }}
          >
            No
            relative bg-brand-primary disabled:bg-brand-primary/10 w-32 text-white text-sm py-3 px-8 rounded font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed
          </button> */}
          <Button text='Cancel Anyway' size='sm' type='secondary' isLoading={isLoadingApi} handleClick={type === 'removeCabin' ? cancelPartialCabin : cancelMyBooking} className='relative w-50' />

          {booking?.actions?.reschedule && booking.status !=='RESERVED' &&
          <Button text='Reschedule Booking' size='sm' disabled={isLoadingApi} handleClick={rescheduleBooking} className='relative w-50' />
          }
        </div>


      </Modal>
    </Layout>
  );
};

export default CancellationSummary;