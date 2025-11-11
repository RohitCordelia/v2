
import Select from 'react-select';
import { Layout } from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCancellationSummaryMutation, usePartialCancellationFeesMutation } from '../../../src/services/profile/profile';
import toast, { Toaster } from 'react-hot-toast';
import { GetManageDetail, SaveManageDetail } from '../../utils/store/store';
import BookingDetailBanner from './component/bookingDetailBanner';

export default function ModifyBooking() {
  const navigate = useNavigate();
  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail.myBooking;
  let getBooking: any = ManageDetail.getBooking;
  const [data, setData] = useState('')

  const [cancellationSummary] = useCancellationSummaryMutation();
  const [partialCancellationFees] = usePartialCancellationFeesMutation();

  const location = useLocation();


    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api/v2/bookings/${getBooking?.id}/shore_excursions`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const result = await response.json();
        // const hasRemainingPax = result.ports.some(port => {
        //   const { adults, children } = port.remaining_pax_to_book;
        //   return adults > 0 || children > 0;
        // });
        const hasRemainingPax = result?.ports?.some((port:any)=> port.is_remaining )
        // console.log(hasRemainingPax,'=========>>>>');
        setData(hasRemainingPax);
      } catch (err) {
        console.log(err, "Error");
      }
    }
  
    useEffect(() => {
      fetchData();
    }, [getBooking?.id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const startDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');
    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr.split('/');
      return `${day}th ${month} `;
    }
    const formattedStartDate = formatDate(startDateStr);
    return (
      <span className="">{formattedStartDate}</span>
    );
  };
  const endDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');
    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr.split('/');
      return `${day}th ${month} `;
    }
    const formattedEndDate = formatDate(endDateStr);
    return (
      <span className=""> {formattedEndDate}</span>
    );
  };
  const manageGuest = () => {
    let type = 'guest'
    navigate('/manage-booking/manage-guestcabin', { state: { type } });
  }
  const manageCabin = () => {
    let type = 'cabin'
    navigate('/manage-booking/manage-guestcabin', { state: { type } })
  }
  const assignCabin = () => {
    navigate('/manage-booking/assignCabin')
  }
  const updateGuest = () => {
    navigate('/manage-booking/updateGuest')
  }
  const rescheduleBooking = async () => {
    let type = 'rescheduleBooking';
    navigate('/manage-booking/reschedule')
    // await cancellationSummary(bookingRoute[0]?.booking_id)
    //   .unwrap()
    //   .then((res: any) => {
    //     if (res && res.data) {
    //       navigate('/manage-booking/reschedule', { state: { res, type } })
    //     }
    //   })
    //   .catch((res: any) => {
    //     toast.error(res?.data?.message, {
    //       duration: 3000,
    //       position: 'top-center',
    //     })
    //   });
  }
  // const cancelBooking = async () => {
  //   let type = 'cancelBooking';
  //   await cancellationSummary(bookingRoute[0]?.booking_id)
  //     .unwrap()
  //     .then((res: any) => {
  //       if (res && res.data) {
  //         navigate('/manage-booking/cancellation-summery', { state: { res, type } })
  //       }
  //     })
  //     .catch((res: any) => {
  //       toast.error(res?.data?.message, {
  //         duration: 3000,
  //         position: 'top-center',
  //       })
  //     });
  // }
  const removeCabin = async () => {
    let type = 'removeCabin';
    navigate('/manage-booking/manage-guestcabin', { state: { type } })
  }

  const handleBookNow = () => {
    // navigate('/manage-booking/shore-excursions')

    const guestsArray = [];
    const errors = [];
    let hasError = true;

    ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
      if (Array.isArray(room.guest_details)) {
        room.guest_details.forEach((guest, guestIndex) => {
          if (guest.first_name && guest.last_name) {
            guestsArray.push({
              ...guest,
            });
            hasError = false;
          } else {
            errors.push(`Room ${roomIndex + 1}, Guest ${guestIndex + 1}: Please fill guest name.`);
          }
        });
      }
    });
    
    if (hasError) {
      toast.error('Please fill all guest details', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }else{
      navigate('/manage-booking/shore-excursions')
    }

  }
  const manageUpgradeCabin = () => {
    let type = 'upgradeCabin'
    navigate('/upgrade-cabin/manage-upgrade', { state: { type } })
  }

  return (
    <Layout>
      <Toaster />

      <section className="mb-28 mt-20 lg:mt-24 px-4 lg:px-[170px]">
        <div>
          <div className="flex items-center lg:py-2">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
              alt="arrow"
              onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
            />
            <p className="text-xl font-bold lg:text-xl ">
              Modify Booking
            </p>
          </div>

          <BookingDetailBanner type='modify' />
          {/* <div className="relative mt-4 flex flex-wrap justify-center h-30 inline-block">
            {window.innerWidth > 640 ?
              <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/booking-banner-desktop.webp" alt="img" className="rounded-md" /> :
              <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/modfiy-booking-image-mobile.webp" alt="img" className="" />
            }
            <div className="absolute lg:left-0 w-full text-white top-0 lg:px-6 lg:py-6 px-5 pt-2 ">

              <div className='' >
                <h1 className="text-lg font-medium lg:text-2xl ">
                  Booking ID: {bookingRoute[0]?.booking_number}
                </h1>
                <div className="grid font-semibold text-sm lg:text-md grid-cols-4 w-full gap-3 lg:gap-0 mt-3">
                  <div className="col-span-4 lg:col-span-2">
                    {window.innerWidth > 640 ?
                      <div className='flex flex-wrap gap-1'>
                        <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/location-modify-orange-icon.svg' />
                        <p>{bookingRoute[0]?.route}</p>
                      </div>
                      : <div className='grid grid-cols-10'>
                        <div className="col-span-1 lg:col-span-1">
                          <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/location-modify-orange-icon.svg' />
                        </div>
                        <div className="col-span-9 lg:col-span-9">
                          <p>{bookingRoute[0]?.route}</p>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <div className='flex flex-wrap gap-1'>
                      <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-orange-icon.svg' />
                      <p>{bookingRoute[0]?.cabins_count} Cabins</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 text-sm lg:text-md font-semibold gap-3 lg:gap-0 w-full mt-3 lg:mt-3">
                  <div className="col-span-4 lg:col-span-2">
                    <div className='flex flex-wrap  gap-1'>
                      <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/date-modify-orange-icon.svg' />
                      {startDate(bookingRoute[0]?.sailing_date)}-{endDate(bookingRoute[0]?.sailing_date)}
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <div className='flex flex-wrap gap-1'>
                      <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-orange-icon.svg' />
                      <p>{bookingRoute[0]?.guests_count} Guests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <p className="text-lg font-bold lg:text-xl lg:mt-4 mt-3 py-3 ">
            What would you like to modify?
          </p>

          <div className="grid grid-cols-12 mt-3 lg:gap-4 gap-3 ">

            {getBooking?.actions?.add_pax && getBooking.status !=='RESERVED' ?
              <div className="col-span-6 lg:col-span-3 lg:order-2 ">
                <div className='flex border-2 border-gray-400 flex-col items-center cursor-pointer justify-center gap-2 lg:px-10 px-6 rounded-md lg:py-8 py-5 shadow-allSide' onClick={manageGuest}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-icon.svg' />
                  <p className='lg:text-[18px] text-sm text-center font-semibold'>Add New Guest</p>
                </div>
              </div>
              : null
            }
            {/* {getBooking?.actions?.add_new_cabin ?
              <div className="col-span-6 lg:col-span-3 lg:order-2 ">
                <div className='flex border-2 border-gray-400 flex-col items-center cursor-pointer justify-center gap-2 lg:px-10 px-6 rounded-md lg:py-8 py-5 shadow-allSide' onClick={manageCabin}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg' />
                  <p className='lg:text-md text-sm font-semibold'>Add New Cabin</p>
                </div>
              </div>
              : null
            } */}

            {getBooking?.actions?.assign_cabin ?
              <div className="col-span-6 lg:col-span-3 lg:order-2 ">
                <div className='flex border-2 border-gray-400 flex-col items-center cursor-pointer justify-center gap-2 lg:px-10 px-6 rounded-md lg:py-8 py-5 shadow-allSide' onClick={assignCabin}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg' />
                  <p className='lg:text-[18px] text-sm text-center font-semibold'>Assign Cabin</p>
                </div>
              </div>
              : null
            }
            {getBooking?.actions?.update_guest ?
              <div className="col-span-6 lg:col-span-3 lg:order-2 ">
                <div className='flex border-2 border-gray-400 flex-col items-center cursor-pointer justify-center gap-2 lg:px-10 px-6 rounded-md lg:py-8 py-5 shadow-allSide' onClick={updateGuest}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg' />
                  <p className='lg:text-[18px] lg:w-[175px] w-[140px] text-sm font-semibold text-center'>Update Guest Detail</p>
                </div>
              </div>
              : null
            }
            {getBooking?.actions?.upgrade && getBooking.status !=='RESERVED' ?
              <div className="col-span-6 lg:col-span-3  lg:order-2 ">
                <div className='flex flex-col items-center cursor-pointer  justify-center gap-2 lg:px-8 py-6 rounded-md lg:py-8 py-5 shadow-allSide' onClick={manageUpgradeCabin}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/upgrade-modify-icon.svg' />
                  <p className='lg:text-[18px] text-sm text-center font-semibold'>Upgrade Cabin</p>
                </div>
              </div>
              : null
            }
            
            {getBooking?.actions?.remove_cabin ?
            <div className="col-span-6 lg:col-span-3 lg:order-2 ">
                <div className='flex flex-col items-center cursor-pointer justify-center gap-2 rounded-md lg:px-8 px-6 lg:py-8 py-5 shadow-allSide' onClick={removeCabin}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/remove-cabin-modify-icon.svg' />
                  <p className='lg:text-[18px] text-sm text-center font-semibold'>Cancel Cabin</p>
                </div>
              </div>
             : null 
            }
            {getBooking?.actions?.reschedule && getBooking.status !=='RESERVED' &&
              <div className="col-span-6 lg:col-span-3 lg:order-2">
                <div className='flex flex-col items-center cursor-pointer justify-center gap-2 lg:px-8 px-6 rounded-md lg:py-8 py-6 shadow-allSide' onClick={rescheduleBooking}>
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-icon.svg'  />
                  <p className='lg:text-[18px] lg:w-[175px] w-[140px] text-sm text-center font-semibold'>Reschedule Booking</p>
                </div>
              </div>
            }
            {/* {getBooking?.actions?.cancel ?
              <div className="col-span-6 lg:col-span-3 lg:order-2 ">
                <div className='flex border-2 border-gray-400 flex-col items-center cursor-pointer justify-center gap-2 lg:px-10 px-6 rounded-md lg:py-8 py-5 shadow-allSide' onClick={cancelBooking} >
                  <img className='h-10' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cancel-modify-icon.svg' />
                  <p className='lg:text-[18px] text-sm text-center font-semibold'>Cancel Booking</p>
                </div>
              </div>
              : null
            } */}
          </div>

          <div>
          {(getBooking?.actions?.add_shorex && getBooking.status !=='RESERVED' && data) ?
            <p className="text-xl font-bold lg:text-xl lg:mt-4 py-3 ">
              Add-On’s for this booking
            </p>
             : null
            }
            <div className="grid grid-cols-12 gap-4 mt-4">
              {(getBooking?.actions?.add_shorex && getBooking.status !=='RESERVED' && data)  ?
                <div className="col-span-12 lg:col-span-4 relative  lg:order-2 ">
                  <div className='flex flex-col items-center rounded-md lg:h-[235px] h-[255px] lg:w-[323px] w-[341px] mt-[74px] justify-center gap-2 px-3 py-3 shadow-allSide'>
                    <img className='absolute top-0 w-[300px] rounded-md' src='https://images.cordeliacruises.com/cordelia_v2/public/images/modify-shoreex-image.webp' />
                    <p className='text-md font-semibold lg:mt-[90px] mt-[100px]'>Add Shore Excursions</p>
                    <p className='lg:text-[11px] text-sm px-2 font-semibold text-center text-gray-100 '>Embark on thrilling adventures ashore with our curated shore excursions, offering unforgettable experiences at every port of call.</p>
                    <button className='text-md text-brand-primary text-[#92278F] font-bold mb-4' onClick={handleBookNow}>Book Now </button>
                  </div>
                </div>
                : null
              }
              {/* <div className="col-span-12 lg:col-span-4 relative  lg:order-2 ">
                <div className='flex flex-col items-center rounded-md h-[235px] w-[323px] mt-[74px] justify-center gap-2 px-3 py-3 shadow-allSide'>
                  <img className='absolute top-0 w-[300px] rounded-md' src='https://images.cordeliacruises.com/cordelia_v2/public/images/modify-alcohol-image.webp' />
                  <p className='text-md font-semibold mt-[90px]'>Alcohol Packages</p>
                  <p className='text-[11px] px-2 font-semibold text-center text-gray-100 '>Indulge in premium spirits, fine wines, and refreshing cocktails with our exclusive alcohol packages aboard the cruise.</p>
                  <p className='text-md text-brand-primary font-bold mb-4'>Book Now</p>

                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative  lg:order-2 ">
                <div className='flex flex-col items-center rounded-md h-[235px] w-[323px] mt-[74px] justify-center gap-2 px-3 py-3 shadow-allSide'>
                  <img className='absolute top-0 w-[300px] rounded-md' src='https://images.cordeliacruises.com/cordelia_v2/public/images/modify-special-image.webp' />
                  <p className='text-md font-semibold mt-[90px]'>Special Request for Special Event</p>
                  <p className='text-[11px] px-2 font-semibold text-center text-gray-100 '>Planning a memorable occasion often involves special requests to make the event unique and personal.</p>
                  <p className='text-md text-brand-primary font-bold mb-4'>Book Now</p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative  lg:order-2 ">
                <div className='flex flex-col items-center rounded-md h-[235px] w-[323px] mt-[74px] justify-center gap-2 px-3 py-3 shadow-allSide'>
                  <img className='absolute top-0 w-[300px] rounded-md' src='https://images.cordeliacruises.com/cordelia_v2/public/images/modify-liveshow-image.webp' />
                  <p className='text-md font-semibold mt-[90px]'>Exclusive Live Show at Sea</p>
                  <p className='text-[11px] font-semibold text-center text-gray-100 '>Join us for an evening of unparalleled entertainment aboard our luxury cruise! Our exclusive paid show promises a night of mesmerizing performances</p>
                  <p className='text-md text-brand-primary font-bold mb-4'>Book Now</p>

                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative  lg:order-2 ">
                <div className='flex flex-col items-center rounded-md h-[235px] w-[323px] mt-[74px] justify-center gap-2 px-3 py-3 shadow-allSide'>
                  <img className='absolute top-0 w-[300px] rounded-md' src='https://images.cordeliacruises.com/cordelia_v2/public/images/modify-spa-image.webp' />
                  <p className='text-md font-semibold mt-[90px]'>Our Luxurious Spa Packages</p>
                  <p className='text-[11px] px-2 font-semibold text-center text-gray-100 '>Revitalize your voyage with our Spa packages, providing blissful treatments and serene experiences amidst the waves.</p>
                  <p className='text-md text-brand-primary font-bold mb-4'>Book Now</p>
                </div>
              </div> */}
            </div>
          </div>


        </div>
      </section>
    </Layout>
  );
}
