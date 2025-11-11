import React, { useState } from 'react';
import { Layout } from '../../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBookingByIdQuery, useGetItineraryQuery } from '../../../services/itinerary/itinerary';
import { FormatAmount, FormatPrice, FormatToString } from '../../../utils/formatter/formatter';
import { Player } from '@lottiefiles/react-lottie-player';
import success from "../../../utils/lottie/success.json";
import { GetManageDetail, SaveManageDetail,GetStore } from '../../../utils/store/store'
import Button from 'src/components/UI/Button';


// const BookingSucces = () => {
//   const ManageDetail = GetManageDetail();
//   let myBooking: any = ManageDetail.myBooking;
//   let booking: any = ManageDetail.getBooking;
//   // let booking: any = JSON.parse(localStorage.getItem('getBooking'));
//   let upgradeShore_data: any = JSON.parse(localStorage.getItem('upgradeShore_data'));
//   const uniqueCodes = [...new Set(upgradeShore_data?.guestRecord?.map(item => item.GADataShore.code))];

//   let param: any = '/' + myBooking[0]?.itinerary_id
// import { GetManageDetail, GetStore, SaveManageDetail } from '../../../utils/store/store'
// // '../../utils/store/store';


const BookingSucces = () => {
  const Status = new window.URLSearchParams(window.location.search).get('action');
  const store = GetStore();
  const ManageDetail = GetManageDetail();
  let myBooking: any = ManageDetail.myBooking;
  let booking: any = ManageDetail.getBooking;
  let rescheduleBooking: any = ManageDetail.rescheduleBooking;
  let reschedulePricingData = store.reschedulePricingData;
  let { booking: bookingRes, itinerary: itineraryRes } = store?.newBookings || {};
  // let booking: any = JSON.parse(localStorage.getItem('getBooking'));
  // let myBooking: any = JSON.parse(localStorage.getItem('myBooking'));
  let upgradeShore_data: any = JSON.parse(localStorage.getItem('upgradeShore_data'));
  const uniqueCodes = [...new Set(upgradeShore_data?.guestRecord?.map(item => item.GADataShore.code))];
  let param: any = Status === "reschedule" ? `/${rescheduleBooking?.itinerary_id}` : `/${myBooking[0]?.itinerary_id}`;


  let upgradeCabin_data;
  try {
    const upgradeCabinRaw = localStorage.getItem('upgradeCabin');
    const newUpgradeCabinRaw = localStorage.getItem('newUpgradeCabin');

    // Check if upgradeCabinRaw is not blank or empty object string
    if (upgradeCabinRaw && upgradeCabinRaw !== '{}' && upgradeCabinRaw.trim() !== '') {
      upgradeCabin_data = JSON.parse(upgradeCabinRaw);
    } else {
      upgradeCabin_data = newUpgradeCabinRaw ? JSON.parse(newUpgradeCabinRaw) : {};
    }
  } catch (error) {
    console.error("Error parsing 'upgradeCabin' data:", error);
    upgradeCabin_data = {};
  }


  // let extraGuests_data;
  // try {
  //   const extraGuestsRaw = localStorage.getItem('extraGuests');
  //   extraGuests_data = extraGuestsRaw ? JSON.parse(extraGuestsRaw) : {};
  // } catch (error) {
  //   console.error("Error parsing 'extraGuests' data:", error);
  //   extraGuests_data = {};
  // }

  let extraGuests_data;
  try {
    const upgradeCabinRaw = localStorage.getItem('extraGuests');
    const newUpgradeCabinRaw = localStorage.getItem('newUpgradeCabin');

    // Check if upgradeCabinRaw is not blank or empty object string
    if (upgradeCabinRaw && upgradeCabinRaw !== '{}' && upgradeCabinRaw.trim() !== '') {
      extraGuests_data = JSON.parse(upgradeCabinRaw);
    } else {
      extraGuests_data = newUpgradeCabinRaw ? JSON.parse(newUpgradeCabinRaw) : {};
    }
  } catch (error) {
    console.error("Error parsing 'extraGuests' data:", error);
    extraGuests_data = {};
  }

  const [view, setView] = useState(false);
  const itinerary = useGetItineraryQuery(param);
  const navigate = useNavigate();

  const startDate = (date: any) => {
    const [startDateStr, endDateStr] = date?.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr?.split('/');
      return `${month} ${day}`;
    }
    const formattedStartDate = formatDate(startDateStr);
    return (
      <span className="text-brand-primary">{formattedStartDate}</span>
    );
  };
  const endDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr.split('/');
      return `${month} ${day}`;
    }
    const formattedEndDate = formatDate(endDateStr);
    return (
      <span className="text-brand-primary"> {formattedEndDate}</span>
    );
  };
  const booking_id = new window.URLSearchParams(window.location.search).get('id');
  const { data, isLoading: Loading } = useGetBookingByIdQuery(booking_id, { skip: !booking_id });

  const goToBookings = () => {
    localStorage.removeItem('getBookings');
    localStorage.removeItem('upgradeCabin');
    localStorage.removeItem('selectedRoom');
    localStorage.removeItem('promo_code');
    localStorage.removeItem('newUpgradeCabin');
    localStorage.removeItem('extraGuests');
    localStorage.removeItem('bookingData');
    localStorage.removeItem('paymentData');
    localStorage.removeItem('upgradeShore_data');
    localStorage.removeItem('currentPayble');
    navigate('/manage-booking')
  }

  let runningTotal = 0;
  let shoreExGst = 0;
  if (data?.shore_excursion) {
    if (data?.shore_excursion.length > 0) {
      data?.shore_excursion.map((item: any, index: number) => {
        runningTotal += item.total;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(runningTotal)}`}
          </p>
        );
      });
      data?.shore_excursion.map((item: any, index: number) => {
        shoreExGst += item.gst;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(shoreExGst)}`}
          </p>
        );
      });
    }
  }

  const itineraryName =
    itinerary?.data?.night_count > 5
      ? `${itinerary?.data?.ports[0]?.name} - ${itinerary?.data?.ports[itinerary?.data?.ports.length - 1]?.name}`
      : itinerary?.data?.route?.name;

  return (
    <div>
      <Layout>
        <div className="flex justify-center items-center">
          <div className="lg:mt-28 mt-20  justify-center items-center p-2 lg:w-[60%]">
            <div className='lg:my-4 my-3 flex justify-center'>
              <Player
                src={success}
                style={{ width: 100, height: 100 }}
                loop
                autoplay
              />
            </div>
            {/* <p className=" text-center text-[22px] font-mono font-bold">
              {Status === 'add-guest' ? 'New Guest has been added' : "New Cabin has been added"}   </p> */}


            <p className="text-center text-[22px] font-mono font-bold">
              {/* {Status === 'add-guest'
                ? 'New Guest has been added'
                : Status === 'upgrade_cabin'
                  ? 'Your Cabin has been Upgraded'
                  : Status === 'add_shorex' ? 'Shore Excursion has been added' : 'New Cabin has been added'}
            </p> */}

              {Status === 'add_guest'
                ? 'New Guest has been added'
                : Status === 'upgrade_cabin'
                  ? 'Your Cabin has been Upgraded'
                  : Status === 'reschedule'
                    ? 'Payment Successful'
                    : Status === 'add_shorex'
                      ? 'Shore Excursion has been added'
                      : 'New Cabin has been added'}
            </p>

            {Status === "reschedule" && <p className=" text-center text-[16px] mt-4 mb-8 font- font-semibold">
              Your booking has been successfully rescheduled.</p>}

            <p className=" text-center text-[16px] mt-4 mb-8 font- font-semibold">
              Updated E-Ticket has been sent to your registered mobile number and Email ID</p>
            <div className=" lg:mx-44 mx-4">
              <div className=" mt-4 shadow-allSide p-4">

                <div className="flex border-gray-300 ">

                  <div className="w-[70%] font-bold lg:text-[22px] text-[18px]">
                    <div className='text-[#1CB55A] lg:text-[20px] text-[13px]'>
                      Booking ID: {Status === "reschedule" ? bookingRes.number : booking?.number}
                    </div>
                    {itineraryName} {Status === "reschedule" ? `(${itineraryRes.nights}N/${itineraryRes.nights + 1}D)` : `(${booking.nights}N/${booking.nights+1}D)`}
                  </div>
                  <div className="w-[40%]">
                    <img
                      className="w-[160px] p-2 rounded-xl"
                      src={myBooking[0]?.image}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-4 p-1 border-dashed border-t-2 border-gray-300 py-4 ">
                  <div className=" justify-between lg:gap-[200px] text-gray-700 flex ">
                    <p className=" text-sm text-gray-200">Departure Port</p>
                    <p className=" text-sm text-gray-200">Arrival Port</p>
                  </div>
                  <div className=" justify-between text-black flex mt-2">
                    <p className="font-bold text-lg">{itinerary?.data?.starting_port?.name}</p>
                    <span>.........</span>
                    <img
                      className="w-[50px] -mt-3"
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sailing-cruise-cruise-icon.svg"
                      alt=""
                    />
                    <span>.........</span>
                    <p className="font-bold text-lg">{itinerary?.data?.destination_port?.name}</p>
                  </div>
                  <div className=" justify-between gap-[100px] text-black flex">
                    <p className=" text-[14px] font-medium lg:w-[82px]	">{itinerary?.data?.start_date}</p>
                    <p className=" text-[14px] font-medium	lg:w-[75px] w-[75px]">{itinerary?.data?.end_date}</p>
                  </div>
                </div>
              </div>
              <div>
                {Status == "upgrade_cabin" ? (
                  <>
                    {/* Cabin Upgrade Charges */}
                    <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>
                      <p className='text-lg font-bold'>Price Details</p>

                      <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>{`${!view ? 'View Price Breakup' : 'Hide Price Breakup'}`}</p>
                    </div>
                    {view ?
                      <div className='mt-2'>
                        <div className="grid grid-cols-3 mb-2 px-4">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">
                              Cabin Upgrade Charges
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(upgradeCabin_data?.cabin_fare_diff || 0)}`}
                            </p>
                          </div>
                        </div>

                        {/* GST */}
                        <div className="grid grid-cols-3 mb-2 px-4">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Taxes</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 mb-2 px-4">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                              {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      : null}

                    <div className='flex justify-between px-3 py-3 bg-brand-secondary/[0.1] '>
                      <div className="col-span-2">
                        <p className="text-md lg:text-lg font-bold">Amount Paid</p>
                      </div>
                      <div className="text-right">
                        <p className="text-md lg:text-lg font-bold text-brand-primary">
                          {`₹ ${FormatAmount(
                            upgradeCabin_data?.total_payable
                          )}`}
                        </p>
                      </div>
                    </div>
                  </>
                ) : Status == "reschedule" ? (
                  <div className='mt-4'>
                    <div className=''>
                      <div className='border-gray-400 shadow-allSide rounded-lg mb-4 '>
                        <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>
                          <p className='text-lg font-bold'>Price Details</p>

                          <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>{`${!view ? 'View Price Breakup' : 'Hide Price Breakup'}`}</p>

                        </div>
                        {view ? <div className='py-4'>
                          <div className='px-3'>
                            <div className="grid grid-cols-3 my-3">
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">Fare Difference</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                                  reschedulePricingData?.fare_difference
                                ).toFixed())}`}</p>
                              </div>
                            </div>
                            {/* Rescheduling Charges */}
                            <div className="grid grid-cols-3 mb-2 text-gray-200">
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">Rescheduling Charges</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`₹ ${FormatAmount(reschedulePricingData?.reschedule_fee || 0)}`}
                                </p>
                              </div>
                            </div>
                            {/* GST */}
                            <div className="grid grid-cols-3 mb-2 text-gray-200">
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">GST</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`₹ ${FormatAmount(reschedulePricingData?.reschedule_gst || 0)}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div > : null}
                        <div className="grid grid-cols-3 px-4 py-4  bg-brand-secondary/[0.1] items-end">
                          <div className="col-span-2">
                            <p className="text-base lg:text-lg font-bold">Amount Paid</p>
                          </div>
                          <div className="text-right">
                            <p className="text-md lg:text-lg font-bold text-brand-primary">
                              {`₹ ${FormatAmount(
                                reschedulePricingData?.payable
                              )}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                  : Status === "add_guest" ? (
                    <>
                      <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>
                        <p className='text-lg font-bold'>Price Details</p>

                        <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>{`${!view ? 'View Price Breakup' : 'Hide Price Breakup'}`}</p>
                      </div>
                      {view ? <div className='px-3 py-3'>
                        {/* Cabin 1 Fare */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Cabin Fare</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.fare || 0)}`}
                            </p>
                          </div>
                        </div>
                        {/* Service Charge & Levies */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Service Charge & Levies</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.gratuity + extraGuests_data?.data?.individual?.[0]?.portCharges || 0)}`}
                            </p>
                          </div>
                        </div>
                        {/* Fuel Surcharge */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Fuel Surcharge</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.fuelSurcharge || 0)}`}
                            </p>
                          </div>
                        </div>
                        {/* Discount */}
                        {extraGuests_data?.data?.individual?.[0]?.discount > 0 && (
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Discount</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.discount || 0)}`}
                              </p>
                            </div>
                          </div>
                        )}
                        {/* Sub-total */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.total || 0)}`}
                            </p>
                          </div>
                        </div>
                        {/* Taxes */}
                        {/* {extraGuests_data?.data?.individual?.[0]?.taxes && extraGuests_data?.data?.individual?.[0]?.taxes.length > 0 && ( */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`}
                            </p>
                          </div>
                        </div>
                        {/* )} */}
                        {/* GST */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                              {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`}
                            </p>
                          </div>
                        </div>
                        {/* Amount Payable */}

                      </div> : null}

                      <div className="flex justify-between px-3 py-3 border-t  border-gray-300 bg-brand-secondary/[0.1]  ">
                        <div className="col-span-2 ">
                          <p className="text-md lg:text-lg font-bold">Amount Paid</p>
                        </div>
                        <div className="text-right">
                          <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(extraGuests_data?.data?.total || 0)}`}</p>
                        </div>
                      </div>
                    </>

                  ) : Status === "add_shorex" ?
                    (
                      <div className='mt-4'>
                        <div className=''>
                          <div className='border-gray-400 shadow-allSide rounded-lg mb-4 '>
                            <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>
                              <p className='text-lg font-bold'>Price Details</p>
                              <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>{`${!view ? 'View Price Breakup' : 'Hide Price Breakup'}`}</p>
                            </div>
                            {view ? <div className='py-4'>
                              <div className='px-3'>

                                {uniqueCodes.map((code, i) => {
                                  const adultCount = upgradeShore_data?.guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;
                                  const childrenCount = upgradeShore_data?.guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                                  const adultPrice = upgradeShore_data?.guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                                  const childrenPrice = upgradeShore_data?.guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                                  const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                                  return (
                                    <div key={i} className='flex items-center justify-between mt-2'>
                                      <p className="text-sm font-semibold">

                                        {code} : <span className='text-gray-100 text-sm'>{adultCount == 0 ? null : `Adult x ${adultCount}`},{childrenCount == 0 ? null : `Children x ${childrenCount}`}  </span>
                                      </p>
                                      <p className="text-sm font-semibold">{`₹ ${FormatAmount(totalPrice)}`}</p>

                                    </div>
                                  );
                                })}

                                <div className="grid grid-cols-3 mt-3">
                                  <div className="col-span-2">
                                    <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                                      upgradeShore_data?.shore_excursion_net_total
                                    ).toFixed())}`}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 mt-3">
                                  <div className="col-span-2">
                                    <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                                    <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                      GST
                                    </p>
                                    {data?.shore_excursion && data?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                                      Shore Excursions
                                    </p> : null}
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm lg:text-sm font-semibold">₹{FormatAmount(upgradeShore_data?.shore_excursion_gst + (data?.shore_excursion ? shoreExGst : null))}</p>
                                    <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(upgradeShore_data?.shore_excursion_gst)}</p>

                                    {data?.shore_excursion && data?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(shoreExGst)}</p>
                                      : null}
                                  </div>
                                </div>
                              </div>
                            </div > : null}
                            <div className="grid grid-cols-3 px-4 py-4  bg-brand-secondary/[0.1] items-end">
                              <div className="col-span-2">
                                <p className="text-base lg:text-lg font-bold">Amount Paid</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                                  upgradeShore_data?.due_amount
                                ).toFixed())}`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) :
                    (
                      <div className='mt-4'>
                        <div className=''>
                          <div className='border-gray-400 shadow-allSide rounded-lg mb-4 '>
                            <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>
                              <p className='text-lg font-bold'>Price Details</p>
                              <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>{`${!view ? 'View Price Breakup' : 'Hide Price Breakup'}`}</p>
                            </div>
                            {view ? <div className='py-4'>
                              <div className='px-3'>
                                {data?.rooms?.map((room: any, index: number) => {
                                  return (
                                    <div className="grid grid-cols-3 mb-2" key={index}>
                                      <div className="col-span-2">
                                        <p className="text-sm lg:text-sm font-semibold">{`CABIN ${index + 1
                                          } FARE`}</p>
                                        <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                          Service Charge & Levies
                                        </p>
                                        <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                          Fuel Surcharge
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.actual_cabin_fare)}`}</p>
                                        <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                                        <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                                {data?.shore_excursion ?
                                  data?.shore_excursion.length > 0 ?
                                    <div className="grid grid-cols-3 mb-1" >
                                      <div className="col-span-2">
                                        <p className="text-sm lg:text-sm font-semibold">
                                          {`Shore Excursions Total`}
                                        </p>

                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm lg:text-sm font-semibold">{runningTotal}</p>
                                      </div>
                                    </div>


                                    : null : null}
                                {data?.shore_excursion ?
                                  data?.shore_excursion.length > 0 ?
                                    <div className="grid grid-cols-3 mb-2" >
                                      <div className="col-span-2">
                                        {data?.shore_excursion.map((item: any) => (
                                          <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                            {item?.code}
                                          </p>
                                        ))}
                                      </div>
                                      <div className="text-right">
                                        {data?.shore_excursion.map((item: any) => (
                                          <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">{`₹ ${FormatPrice(item.total)}`}</p>
                                        ))}
                                        {/* <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                          <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p> */}
                                      </div>
                                    </div>
                                    : null : null}

                                {data?.protection_plan && data?.protection_plan.amount > 0 ?
                                  <div className="grid grid-cols-3 mt-3">
                                    <div className="col-span-2">
                                      <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(data?.protection_plan.amount)}</p>
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
                                      data?.sub_total
                                    ).toFixed())}`}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 mt-3">
                                  <div className="col-span-2">
                                    <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                                    <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                      GST
                                    </p>
                                    {data?.shore_excursion && data?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                                      Shore Excursions
                                    </p> : null}
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm lg:text-sm font-semibold">₹{FormatAmount(data?.gst + (data?.shore_excursion ? shoreExGst : null))}</p>
                                    <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(data?.gst)}</p>

                                    {data?.shore_excursion && data?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(shoreExGst)}</p>
                                      : null}
                                  </div>
                                </div>
                              </div>
                            </div > : null}
                            <div className="grid grid-cols-3 px-4 py-4  bg-brand-secondary/[0.1] items-end">
                              <div className="col-span-2">
                                <p className="text-base lg:text-lg font-bold">Amount Paid</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                <div className="mt-4">
                  <div className="flex gap-3 ">
                    <a
                      target="_blank"
                      href={(!Status || Status === '') ? data?.invoice_url : data?.invoices[0]}
                      className={`lg:text-md text-sm w-full font-bold rounded-[5px] pt-3 pb-2  text-center text-brand-primary`}
                      style={{
                        border: 'double 2px transparent',
                        backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                      }}
                    >
                      Download Invoice
                    </a>
                    <a
                      target="_blank"
                      href={`${data?.evoucher_url}`}
                      className={`lg:text-md text-sm w-full font-bold rounded-[5px] py-3 text-center bg-brand-gradient text-white`}
                    >
                      Download E-Ticket
                    </a>
                  </div>
                  <div onClick={goToBookings} className='cursor-pointer text-brand-blue text-center mt-12 flex gap-1 items-center justify-center font-semibold mb-16'>
                    <p className=" underline ">
                      {`Go to My Bookings`}
                    </p><p className='text-brand-blue ' >{`>>`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default BookingSucces;
