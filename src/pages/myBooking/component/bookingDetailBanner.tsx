import React from 'react';
import { GetManageDetail } from '../../../utils/store/store';

const BookingDetailBanner = ({ type }: { type: 'modify' | 'reschedule' }) => {
  const ManageDetail = GetManageDetail();
  let myBooking: any = ManageDetail.myBooking;

  const bannerImg =
    type === 'modify'
      ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/booking-banner-desktop.webp'
      : 'https://images.cordeliacruises.com/cordelia_v2/public/images/booking-details-image-desktop.webp';

  const bannerImgMobile =
    type === 'modify'
      ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/modfiy-booking-image-mobile.webp'
      : 'https://images.cordeliacruises.com/cordelia_v2/public/images/booking-detail-image.webp';

  function formatDate(dateStr: any) {
    const [day, month, year] = dateStr.split('/');
    return `${day}th ${month} `;
  }

  const startDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');
    const formattedStartDate = formatDate(startDateStr);
    return <span className="">{formattedStartDate}</span>;
  };

  const endDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');
    const formattedEndDate = formatDate(endDateStr);
    return <span className=""> {formattedEndDate}</span>;
  };

  const itineraryName =
    myBooking[0]?.nights_count > 5
      ? `${myBooking[0]?.ports[0]} - ${myBooking[0]?.ports[myBooking[0]?.ports.length - 1]}`
      : myBooking[0]?.route;
  return (
    // <div className="relative mt-4 flex flex-wrap justify-center h-30 inline-block">
    //   {window.innerWidth > 640 ? (
    //     <img src={bannerImg} alt="img" className="rounded-md" />
    //   ) : (
    //     <img src={bannerImgMobile} alt="img" className="" />
    //   )}
    //   <div className="absolute lg:left-0 w-full text-white top-0 lg:px-6 lg:py-6 px-5 pt-2 ">
    //     <div className="">
    //       <h1 className="text-lg font-medium lg:text-2xl ">
    //         Booking ID: {myBooking[0]?.booking_number}
    //       </h1>
    //       <div className="grid font-semibold text-sm lg:text-md grid-cols-4 w-full gap-3 lg:gap-0 mt-3">
    //         <div className="col-span-4 lg:col-span-2">
    //           {window.innerWidth > 640 ? (
    //             <div className="flex flex-wrap gap-1">
    //               <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-modify-orange-icon.svg" />
    //               <p>{myBooking[0]?.route}</p>
    //             </div>
    //           ) : (
    //             <div className="grid grid-cols-10">
    //               <div className="col-span-1 lg:col-span-1">
    //                 <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-modify-orange-icon.svg" />
    //               </div>
    //               <div className="col-span-9 lg:col-span-9">
    //                 <p>{myBooking[0]?.route}</p>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //         <div className="col-span-4 lg:col-span-2">
    //           <div className="flex flex-wrap gap-1">
    //             <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-orange-icon.svg" />
    //             <p>{myBooking[0]?.cabins_count} Cabins</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="grid grid-cols-4 text-sm lg:text-md font-semibold gap-3 lg:gap-0 w-full mt-3 lg:mt-3">
    //         <div className="col-span-4 lg:col-span-2">
    //           <div className="flex flex-wrap  gap-1">
    //             <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/date-modify-orange-icon.svg" />
    //             {startDate(myBooking[0]?.sailing_date)}-
    //             {endDate(myBooking[0]?.sailing_date)}
    //           </div>
    //         </div>
    //         <div className="col-span-4 lg:col-span-2">
    //           <div className="flex flex-wrap gap-1">
    //             <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-orange-icon.svg" />
    //             <p>{myBooking[0]?.guests_count} Guests</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="relative my-5 rounded-md overflow-hidden h-52">
      {window.innerWidth > 640 ? (
        <img
          className="w-full h-full object-cover"
          src={bannerImg}
          alt="Background"
        />
      ) : (
        <img
          className="w-full h-full object-cover"
          src={bannerImgMobile}
          alt="Background"
        />
      )}
      <div className="absolute w-full h-full p-6 sm:p-8 top-0 text-white lg:flex lg:flex-col lg:justify-center bg-[#00000060]">
        <div>
          <p className="text-md lg:text-2xl font-playfairDisplay font-bold leading-tight mb-5">
            {type === "reschedule" && "Existing "} Booking ID: {myBooking[0]?.booking_number}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-6 text-xs lg:text-base">
            <div className="flex items-center gap-3">
              <img
                className="h-6"
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-modify-orange-icon.svg"
                alt="Location Icon"
              />
              <p>{itineraryName}</p>
            </div>
            <div className="flex items-center gap-3">
              <img
                className="h-6"
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-orange-icon.svg"
                alt="Cabin Icon"
              />
              <p>{myBooking[0]?.cabins_count} Cabins</p>
            </div>
            <div className="flex items-center gap-3">
              <img
                className="h-6"
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/date-modify-orange-icon.svg"
                alt="Calendar Icon"
              />
              <p>
                {startDate(myBooking[0]?.sailing_date)}-
                {endDate(myBooking[0]?.sailing_date)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                className="h-6"
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-orange-icon.svg"
                alt="Guests Icon"
              />
              <p>{myBooking[0]?.guests_count} Guests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailBanner;
