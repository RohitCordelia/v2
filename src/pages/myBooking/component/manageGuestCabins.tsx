import React, { useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePartialCancellationFeesMutation } from '../../../../src/services/profile/profile';
import { GetManageDetail, SaveManageDetail } from '../../../utils/store/store';
import Button from '../../../components/UI/Button';


const ManageGuestCabin: React.FC = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const [partialCancellationFees] = usePartialCancellationFeesMutation()
  const { type } = location.state || {};

  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail.myBooking;

  let booking: any = ManageDetail.getBooking;

  // let booking: any = JSON.parse(localStorage.getItem('getBooking'));
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

  const selectGuest = (id: any, bedCount: number, index: number) => {
    navigate(`/manage-booking/guest-detail`, { state: { id, bedCount, index } });
  }

  const selectRemoveCabin = async (cabinData: any) => {
    let data = {
      bkroom_id: cabinData?.id,
      room_no: cabinData?.ship_room?.number
    }
    let _payload = {
      data: data,
      id: booking?.id
    }
    console.log(_payload)
    await partialCancellationFees(_payload)
      .unwrap()
      .then((res: any) => {
        if (res) {
          console.log(res.data);
          // setBookingData(res.data);
          navigate('/manage-booking/cancellation-summery', { state: { res, type } })
        }
      })
      .catch((res: any) => {
        console.log('Error: ', res);
      });
    // navigate(`/my-booking/select-cabin`, { state: { id } });
  }
  // cancelBooking
  // removeCabin
  const selectCabin = () => {

  }
  const selectType = () => {
    switch (type) {
      case 'guest':
        return 'Add New Guest'
      case 'cabin':
        return 'Add New Cabin'
      case 'removeCabin':
        return 'Cancel Cabin'
      default:
        return null;
    }
  }

  return (
    <Layout>
      <div className="mb-36 lg:mt-28 mt-20 px-4 lg:px-40">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
            alt="arrow"
            onClick={() => navigate(-1)}
            className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
          />
          <p className="text-xl font-bold lg:text-xl ">
            {selectType()}
          </p>
        </div>
        {
          type === 'cabin' ? <div className='flex bg-brand-secondary/[0.1] items-center justify-between mt-4' >
            <div className='flex gap-3 items-start lg:py-4 px-2 py-2  rounded-md lg:px-5 ' >
              <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg' alt='noteIcon' />
              <div className='flex flex-col gap-1' >
                <p className='font-bold' >Important Note: </p>
                <p className='text-brand-secondary italic font '> *Additional Charges Applicable for Upgrade Cabin*</p>
              </div>
            </div>
            <div>
              <div onClick={selectCabin} className='bg-brand-primary cursor-pointer text-white px-9 py-2 mr-4 rounded'>
                Add New Cabin
              </div>
            </div>
          </div> : null}
        {type === 'guest' || type === 'removeCabin' ?
          <div className='flex gap-3 items-start lg:py-4 px-2 py-2 mt-4 rounded-md lg:px-5 bg-brand-secondary/[0.1]' >
            <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg' alt='noteIcon' />
            <div className='flex flex-col gap-1' >
              <p className='font-bold' >Important Note: </p>
              <p className='text-brand-secondary italic font '>{type === 'removeCabin' ? '*Cancellation Charges for Cancel Cabin*' : '*Additional Charges Applicable for Upgrade Cabin*'}</p>
            </div>
          </div> : null
        }

        <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {booking?.rooms?.map((cabin: any, index: any) => (
            <div>
              <div
                key={cabin.id}
                className={`bg-white ${type === 'removeCabin' ? 'rounded-t-lg' : 'md:rounded-lg'} shadow-allSide lg:mb-0 ${cabin?.ship_room?.beds === 2 && booking?.available_rooms_count[index]?.available_beds == 0 ? 'lg:mb-0 mb-[80px]' : 'lg:mb-0 mb-[0px]'}`}

              >
                {/* <div className="flex justify-between border-b-1 border-indigo-500">
                  <p className="p-4 text-xl font-bold">
                    Cabin {index + 1}
                  </p>
                  {
                    type === 'guest' ?
                      booking.available_rooms_count[index].available_beds > 0 ? (
                        <div className="flex items-center gap-1 font-semibold mt-2 p-4">
                          Available:
                          <img className='h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/available-bed-icon.svg" />
                          <p className='text-brand-green' > 0{booking.available_rooms_count[index].available_beds}</p>
                        </div>
                      ) : (
                        <div className="flex items-center  mr-[10px]">
                          <img className='mr-[5px] h-5'
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg" />
                          <span className="font-semibold ">No Beds Available</span>
                        </div>
                      ) : null
                  }
                </div> */}




                <div className="flex justify-between border-b-1 border-[#F2F2F2]">
                  <p className="p-4 text-xl font-bold">Cabin {index + 1}</p>
                  {type === 'guest' ? (
                    booking.available_rooms_count[index]?.available_beds > 0 ? (
                      <div className="flex items-center gap-1 font-semibold mt-1 p-4">
                        Available:
                        <img
                          className="h-6"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/available-bed-icon.svg"
                        />
                        <p className="text-brand-green">
                          0{booking.available_rooms_count[index]?.available_beds}
                        </p>
                      </div>
                    ) : (cabin?.ship_room?.beds === 3 && booking?.available_rooms_count[index]?.available_beds == 0) ? (
                      <div className="flex items-center mr-[10px]">
                        <img
                          className="mr-[5px] h-5"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg"
                        />
                        <span className="font-semibold">
                          No Beds Available
                        </span>
                        <span className=''>
                          <p className="absolute mt-[30px] bg-[#EA725B1A] h-[161px] w-[258px] ml-[-248px] ">
                            <span className='flex mt-[44px] text-center'>The current cabin is fully  occupied. Please proceed to Upgrade Cabin </span>
                          </p>
                        </span>
                      </div>
                    ) : (cabin?.ship_room?.beds === 2 && booking?.available_rooms_count[index]?.available_beds == 0) ? (
                      <div className="flex items-center mr-[10px]">
                        <img
                          className="mr-[5px] h-5"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg"
                        />
                        <span className="font-semibold">
                          No Beds Available
                        </span>
                        <span className=''>
                          <p className="lg:block hidden absolute mt-[30px] bg-[#EA725B1A] h-[158px] w-[258px] ml-[-248px] rounded-[0px_0px_10px_0px] ">
                            <span className='flex mt-[44px] text-center'>The current cabin is fully occupied. Please proceed to Upgrade Cabin </span>
                          </p>
                            <p className="lg:hidden block absolute mt-[187px] bg-[#EA725B1A] h-[80px] w-[92%]  left-1/2 transform -translate-x-1/2 px-4 rounded-[0px_0px_11px_11px]">
                            <span className='flex justify-center items-center h-full text-center'>The current cabin is fully occupied. Please proceed to Upgrade Cabin</span>
                          </p>



                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center mr-[10px]">
                        <img
                          className="mr-[5px] h-5"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg"
                        />
                        <span className="font-semibold">
                          No Beds Available
                        </span>
                      </div>
                    )
                  ) : null}
                </div>
                <div className='flex justify-between items-center p-4'>
                  <div className='mt-[27px]'>
                    <p className=" p-1 flex items-center absolute mt-[-32px] ">
                      <span className="material-icons mr-2">
                        <img className='h-5 '
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg" />
                      </span>{' '}
                      {cabin?.category_name}
                    </p>
                    {type !== 'removeCabin' ? <p className=" p-1 flex items-center">
                      <span className="material-icons mr-2">
                        <img className='h-5'
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-icon.svg" /></span> {cabin?.guests} Guests
                    </p> : null}
                    <p className=" p-1 flex items-center">
                      <span className="material-icons mr-2">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/findcruise-new-icon.svg" />
                      </span> Deck: {cabin?.ship_room?.deck_no}
                    </p>
                    <p className=" p-1 flex items-center">
                      <span className="material-icons mr-2">
                        <img className='h-5'
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg" />
                      </span> Room No: {cabin?.ship_room?.number}
                    </p>
                  </div>

                  {type === 'guest' && booking?.available_rooms_count[index]?.available_beds > 0 ?
                    <div className="flex  py-[3.6rem]">
                      {/* <button className="border border-brand-primary text-brand-primary font-bold text-sm lg:px-4 px-4 lg:py-3 py-2 rounded w-[141px] absolute lg:ml-[-177px] ml-[-132px] lg:mt-[-22px] mt-[-21px]" onClick={() => selectGuest(cabin?.id, booking.available_rooms_count[index].available_beds, index)} >
                        Add New Guest
                      </button> */}
                      <Button text='Add New Guest' size='sm' type='secondary' handleClick={() => selectGuest(cabin?.id, booking.available_rooms_count[index].available_beds, index)}  />
                    </div> : null}
                  {type === 'removeCabin' ?
                    <div className="">
                      <Button text='Cancel Cabin' size='sm' type='secondary' handleClick={() => selectRemoveCabin(cabin)}  />
                    </div> : null}
                </div>
              </div>
              <div>
                {type === 'removeCabin' ?
                  cabin?.guest_details?.map((guest: any, guestIndex: number) => (
                    <div
                      key={index}
                      className={`flex w-full px-6 py-3 justify-between flex-wrap ${[0, 3, 4, 7, 8].includes(guestIndex) ? 'bg-gray-400' : ''
                        }`}
                    >
                      <div className="flex text-sm font-semibold flex-col gap-2">
                        <p className="text-gray-100"> {guest.type.charAt(0) + guest.type.slice(1).toLowerCase()} </p>
                        <p> {guest?.name}</p>
                      </div>
                      <div className="flex text-sm font-semibold flex-col gap-2">
                        <p className="text-gray-100">Gender </p>
                        <p> {guest?.gender} </p>
                      </div>
                      <div className="flex text-sm font-semibold flex-col gap-2">
                        <p className="text-gray-100">Age </p>
                        <p> {guest?.age} </p>
                      </div>
                    </div>
                  )) : null}
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default ManageGuestCabin;