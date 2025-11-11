import React,{ useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePartialCancellationFeesMutation } from '../../../../src/services/profile/profile';
import { GetManageDetail, SaveManageDetail } from '../../../utils/store/store';
import Cabin from '../guestDetail';
import Button from '../../../components/UI/Button';

const ManageUpgradeCabin: React.FC = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const [partialCancellationFees] = usePartialCancellationFeesMutation()
  const { type } = location.state || {};
  // let booking: any = JSON.parse(localStorage.getItem('getBooking'));

  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail.myBooking;
  let booking: any = ManageDetail.getBooking;
  const guest_itinerary_id = booking?.itinerary_id;
  
  const selectUpgradeCabin = (guest_itinerary_id:any, index:any, guests:any, cabinBeds:any, categoryId:any)=>{
    navigate(`/upgrade-cabin/selectCabin`,{state: {guest_itinerary_id, index, guests, cabinBeds, categoryId} });
  }

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

 

  const selectType = () => {
    switch (type) {
        case 'upgradeCabin':
        return 'Upgrade Cabin'
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
        {/* {type === 'guest' || type === 'removeCabin' || type === 'upgradeCabin' ? */}
          <div className='flex gap-3 items-start lg:py-4 px-2 py-2 mt-4 rounded-md lg:px-5 bg-brand-secondary/[0.1]' >
            <img className='h-7' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg' alt='noteIcon' />
            <div className='flex flex-col gap-1' >
              <p className='font-bold' >Important Note: </p>
              <p className='text-brand-secondary italic font '>
              *Additional Charges Applicable for Upgrade Cabin*
                </p>
            </div>
          </div> 
          {/* : null
        } */}

        <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {booking?.rooms.map((cabin: any, index: any) => (
            <div>
              <div
                key={cabin.id}
                className={`bg-white ${type === 'removeCabin' ? 'rounded-t-lg' : 'rounded-lg'} shadow-allSide`}
              >
                <div className="flex justify-between border-b-1 border-indigo-500">
                  <p className="p-4 text-xl font-bold">
                    Cabin {index + 1}
                  </p>
                  {
                    type === 'guest' || type === 'upgradeCabin' ?
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
                </div>
                <div className='flex justify-between items-center p-4'>
                  <div>
                    <p className=" p-1 flex items-center">
                      <span className="material-icons mr-2">
                        <img className='h-5'
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg" />
                      </span>{' '}
                      {cabin.category_name}
                    </p>
                    {type !== 'removeCabin' ? <p className=" p-1 flex items-center">
                      <span className="material-icons mr-2">
                        <img className='h-5'
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-icon.svg" /></span> {cabin.guests} Guests
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

                    {/* {type === 'upgradeCabin' ? */}
                    <div className="">
                      {/* <button className="border border-brand-primary text-brand-primary font-bold lg:text-sm text-xs lg:px-9 lg:py-2 py-2 px-5 rounded" onClick={() => selectUpgradeCabin(guest_itinerary_id, index, cabin?.guests, cabin?.ship_room?.beds, cabin.category_id)}>
                        Upgrade Cabin
                      </button> */}
                      <Button text='Upgrade Cabin' size='sm' type='secondary' handleClick={() => selectUpgradeCabin(guest_itinerary_id, index, cabin?.guests, cabin?.ship_room?.beds, cabin.category_id)} />
                    </div> 
                    {/* : null} */}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default ManageUpgradeCabin;