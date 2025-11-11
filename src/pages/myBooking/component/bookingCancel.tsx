import React, { useState } from 'react';
import { Layout } from '../../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBookingByIdQuery, useGetItineraryQuery } from '../../../services/itinerary/itinerary';
import { FormatPrice, FormatToString } from '../../../utils/formatter/formatter';
import { Player } from '@lottiefiles/react-lottie-player';
import success from "../../../utils/lottie/success.json";
import { GetManageDetail } from '../../../utils/store/store';

const BookingCancel = () => {
  // function handleHover(): void {
  //     throw new Error('Function not implemented.');
  // }
  let booking: any = JSON.parse(localStorage.getItem('bookingStatus'));
  const ManageDetail = GetManageDetail();
  let myBooking: any = ManageDetail.myBooking;

  let param: any = '/' + myBooking[0]?.itinerary_id

  const { data, isSuccess } = useGetItineraryQuery(param)
  const navigate = useNavigate();

  const startDate = (date: any) => {
    const [startDateStr, endDateStr] = date?.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr?.split('/');
      return `${month} ${day}`;
    }
    const formattedStartDate = formatDate(startDateStr);
    // const formattedEndDate = formatDate(endDateStr);
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

  const goToBookings = () => {
    localStorage.removeItem('getBookings')
    navigate('/manage-booking')
  }

  const Status = new window.URLSearchParams(window.location.search).get('status');

  const itineraryName =
    myBooking[0]?.nights_count > 5
      ? `${myBooking[0]?.ports[0]} - ${myBooking[0]?.ports[myBooking[0]?.ports.length - 1]}`
      : myBooking[0]?.route;

  return (
    <div>
      <Layout>
        <div className="flex justify-center items-center">
          <div className="lg:mt-28 mt-20  justify-center items-center p-2 lg:w-[60%]">
            <div className='lg:my-4 my-3 flex justify-center'> <img className='h-16'
              src='https://images.cordeliacruises.com/cordelia_v2/public/assets/failed-payment-icon.svg' /> </div>
            <p className=" text-center text-[22px] font-mono font-bold">
              {Status === 'cancelBooking' ? ' Booking Cancelled' : "Your cabin has been removed"}   </p>

            <div className=" lg:mx-44 mx-4">
              <div className=" mt-4 shadow-allSide p-4">
                <div className="flex border-gray-300 ">
                  <div className="w-[100%] font-bold text-[18px]">
                    {itineraryName}
                  </div>
                  {/* <div className="w-[40%]">
                    <img
                      className="w-[160px] p-2 rounded-xl"
                      src={myBooking[0]?.image}
                      alt=""
                    />
                  </div> */}
                </div>
                <div className="mt-4 p-1 border-dashed border-y py-4 ">
                  <div className=" justify-between lg:gap-[200px] text-gray-700 flex ">
                    <p className=" text-sm text-gray-200">Departure Port</p>
                    <p className=" text-sm text-gray-200">Arrival Port</p>
                  </div>
                  <div className=" justify-between gap-[] text-black flex mt-2">
                    <p className="font-bold text-lg">{myBooking[0].ports[0]}</p>
                    <span>.........</span>
                    <img
                      className="w-[50px] -mt-3"
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sailing-cruise-cruise-icon.svg"
                      alt=""
                    />
                    <span>.........</span>
                    <p className="font-bold text-lg">{myBooking[0].ports[myBooking[0].ports.length - 1]}</p>
                  </div>
                  <div className=" justify-between gap-[100px] text-black flex">
                    <p className=" text-[14px] font-medium lg:w-[82px]	">{data?.start_date}</p>
                    <p className=" text-[14px] font-medium	lg:w-[82px] w-[102px]">{data?.end_date}</p>
                  </div>

                </div>
                <div className="grid grid-cols-3 py-3" >
                  <div className="col-span-2">
                    <p className="text-sm lg:text-lg font-semibold">{`Total Amount Paid`}</p>
                    <p className="text-sm lg:text-md text-gray-100 font-semibold mt-1">Cancellation Charges</p>
                    {/* <p className="text-sm lg:text-md text-gray-100   font-semibold mt-1">GST</p> */}
                  </div>
                  <div className="text-right">
                    {/* <p className="text-sm lg:text-lg text-brand-primary font-bold">{`₹ ${FormatPrice(myBooking[0]?.price_details)}`}</p> */}
                    <p className="text-sm lg:text-md text-gray-100 font-semibold mt-1">{`₹ ${Status === 'cancelBooking' ? FormatPrice( myBooking[0]?.price_details) :  FormatPrice(booking.data?.fee_details?.fee == undefined ? booking.data?.fee_details?.refund_details.cancellation_amount : myBooking[0]?.price_details)}`}</p>
                    {/* <p className="text-sm lg:text-md text-gray-100 font-semibold mt-1">{`₹ ${Status === 'cancelBooking' ? FormatPrice(booking.refund.fee) : FormatPrice(booking?.data?.fee_details?.fee)}`}</p> */}
                    <p className="text-sm lg:text-md text-gray-100 font-semibold mt-1">{`₹ ${Status === 'cancelBooking' ? FormatPrice(booking.refund.fee) :  FormatPrice(booking.data?.fee_details?.fee == undefined ? booking.data?.fee_details?.refund_details?.fee : booking.data?.fee_details?.fee)}`}</p>
                    {/* <p className="text-sm lg:text-md text-gray-100 font-semibold mt-1">{`₹ ${Status === 'cancelBooking' ? FormatPrice(booking.total_fares.gst) : FormatPrice(booking?.data.total_fares.gst)}`}</p> */}
                  </div>
                </div>
              </div>
              <div>

                <div className="grid grid-cols-3 px-4 py-3 bg-brand-secondary/[0.1] items-end">
                  <div className="col-span-2">
                    <p className="text-base lg:text-md font-bold">Amount Refundable</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base lg:text-lg font-bold text-brand-primary">{`₹ ${Status === 'cancelBooking' ? FormatPrice(booking?.refund?.refund_amount) : FormatPrice(booking?.data?.fee_details?.total_refund == undefined ? booking?.data?.fee_details?.refund_details?.refund_amount : booking?.data?.fee_details?.total_refund)}`}</p>
                  </div>
                </div>
                <div className=" mt-4">
                  <div className="flex gap-3 ">
                    {/* <a
                      onClick={() => navigate('/manage-booking/refund-status', { state: { booking } })}
                      className={`border lg:text-md text-sm w-full font-semibold rounded-[5px] pt-2 pt-3 pb-2  text-center border-brand-primary text-brand-primary`}
                    >
                      View Refund Status
                    </a> */}
                    {/* <a
                      target="_blank"
                      href={`${Status === 'cancelBooking' ? booking?.invoice : booking?.data?.invoices[0]}`}
                      className={`border lg:text-md text-sm w-full font-semibold rounded-[5px] py-3 text-center bg-brand-primary text-white border-brand-primary`}
                    >
                      Credit Note
                    </a> */}
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

export default BookingCancel;