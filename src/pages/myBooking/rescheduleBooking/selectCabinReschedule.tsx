import React, { useEffect, useState } from 'react';
import { Layout } from '../../../components/Layout';
import { useNavigate } from 'react-router-dom';
import {
  GetManageDetail,
  GetStore,
  SaveManageDetail,
  SaveStore
} from '../../../utils/store/store';
import { useRescheduleCheckAvailabilityMutation, useGetReschedulePolicyMutation } from '../../../services/profile/profile';
import DeckSelection from './deckSelection';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../../components/UI/Button';

const SelectCabinReschedule = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<any>(false);
  const [cabins, setCabins] = useState<any[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<number>(0);
  const [deckModal, setDeckModal] = useState<boolean>(false);
  const [storeState, setStoreState] = useState(() => {
    const stored = localStorage.getItem('store');
    return stored ? JSON.parse(stored) : {};
  });

  const [rooms, setRooms] = useState([]);
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(false);
  const [newCabin, setNewCabin] = useState(false);
  const [rescheduleCheckAvailability] =
    useRescheduleCheckAvailabilityMutation();
  const [cancelPolicy, setCancelPolicy] = useState([]);

  const store = GetStore();
  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail.myBooking;
  let booking: any = ManageDetail.getBooking;
  let rescheduleBooking: any = ManageDetail.rescheduleBooking;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const rescheduleCheckAvailabilityApi = () => {
      setLoading(true);
      rescheduleCheckAvailability({
        booking_id: bookingRoute[0]?.booking_id,
        itinerary_id: rescheduleBooking.itinerary_id
      })
        .then((res) => {
          setLoading(false)
          setCabins(res?.data?.booking?.rooms_availability);
          setCancelPolicy(res?.data?.booking?.rooms_availability[0].policies)
          SaveManageDetail({
            ...ManageDetail,
            rescheduleCabinAvailability: {
              cabinAvailability:
                res?.data?.booking?.rooms_availability[selectedCabin],
              itinerary_id: res?.data?.booking?.itinerary_id
            }
          });
          SaveStore({
            ...store,
            rooms: res?.data?.booking?.rooms_availability,
            oldRooms: res?.data?.booking?.rooms_availability
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };

    rescheduleCheckAvailabilityApi();
  }, []);

  // Function to update a single cabin in the cabins array
  const updateCabinInArray = (updatedCabin: any) => {
    setCabins((prevCabins) => {
      return prevCabins.map((cabin: any) =>
        cabin.booking_room_id === updatedCabin.booking_room_id
          ? { ...cabin, ...updatedCabin }
          : cabin
      )
    });
  };

  // Function to update cabins when localStorage changes
  const updateCabinFromLocalStorage = (selectedCabin: number) => {
    const storedCabin = localStorage.getItem('store');
    if (storedCabin) {
      try {
        const parsedStore = JSON.parse(storedCabin);
        if (parsedStore.rooms.length > 0) {
          updateCabinInArray(parsedStore.rooms[selectedCabin]);
        }
        setStoreState(parsedStore);
      } catch (error) {
        console.error('Error parsing selected cabin from localStorage:', error);
      }
    }
  };

  useEffect(() => {
    updateCabinFromLocalStorage(selectedCabin);
  }, []);

  useEffect(() => {
    const transformCabinsToRooms = (cabins: any[]) =>
      cabins?.map((cabin, idx) => ({
        room_type: cabin.code,
        old_room_no: store.oldRooms[idx].current_room_number,
        room_no: store.rooms[idx].current_room_number,
      }));

    const transformedRooms: any = transformCabinsToRooms(cabins);
    setRooms(transformedRooms);
  }, [cabins]);

  // Track changes in cabins when `available_rooms` is `false`
  useEffect(() => {
    // Check if all cabins with `current_room_available: false` have been changed
    const allChangesMade = cabins?.every((cabin, idx) => {
      if (!cabin.current_room_available) {
        return (
          cabin.current_room_number !== store.oldRooms[idx]?.current_room_number
        );
      }
      return true;
    });

    setIsContinueDisabled(!allChangesMade);
  }, [cabins, store.oldRooms]);

  const onClose = () => {
    ;
    updateCabinFromLocalStorage(selectedCabin);
  }

  const changeDeck = (index: number) => {
    setSelectedCabin(index);
    setDeckModal(true);
  };

  const hasRepeatedRoom = (arr) => {
    const seenRooms = new Set();
    return arr.some((obj) => {
      if (seenRooms.has(obj.current_room_number)) {
        return true; // Found a repeated room
      }
      seenRooms.add(obj.current_room_number);
      return false;
    });
  };

  const onContinue = () => {
    if (!hasRepeatedRoom(cabins)) {
      let rescheduleData = {
        itinerary_id: rescheduleBooking.itinerary_id,
        booking_id: bookingRoute[0]?.booking_id,
        rooms
      };
      navigate('/manage-booking/payment-summery', {
        state: { type: 'reschedule', rescheduleData }
      });
    } else {
      toast.error("Each cabin must have a unique room number. Please select distinct room numbers.", {
        duration: 5000,
        position: 'bottom-left',
      })
    }
  };

  return (
    <Layout>
      <Toaster />
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center overflow-hidden absolute top-0 bottom-0 left-0 bg-black/80 z-50">
          <img
            className="w-32 lg:w-44"
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
            alt=""
          />
        </div>
      ) : null}

      <div className="mb-36 lg:mt-28 mt-20 px-4 lg:px-40">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
            alt="arrow"
            className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
          />
          <p className="text-xl font-bold lg:text-xl ">Select Cabin</p>
        </div>

        <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cabins?.map((cabin: any, index: any) => (
            <div
              key={cabin.id}
              className={`bg-white rounded-lg shadow-allSide`}
            >
              <div className="flex justify-between border-b-1 border-[#F2F2F2]">
                <p className="p-4 text-xl font-bold">Cabin {index + 1}</p>
                {cabin?.current_room_available || newCabin ? (
                  <div className="flex items-center gap-1 font-semibold mt-1 p-4">

                    <img
                      className="h-6"
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/available-bed-icon.svg"
                    />
                    {/* <p className="text-brand-green">
                      0{cabin?.available_beds}
                    </p> */}
                    Cabin is Available
                  </div>
                ) : (
                  <div className="flex items-center mr-[10px]">
                    <img
                      className="mr-[5px] h-5"
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg"
                    />
                    <span className="font-semibold">Cabin is Not Available</span>
                  </div>
                )
                  // : cabin.current_room_number !== newCabin ? (
                  //   <div className="flex items-center gap-1 font-semibold mt-1 p-4">

                  //     <img
                  //       className="h-6"
                  //       src="https://images.cordeliacruises.com/cordelia_v2/public/assets/available-bed-icon.svg"
                  //     />
                  //     {/* <p className="text-brand-green">
                  //       0{cabin?.available_beds}
                  //     </p> */}
                  //     Cabin is Available
                  //   </div>
                  // )
                }
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="mt-[27px]">
                  <p className=" p-1 flex items-center absolute mt-[-32px] ">
                    <span className="material-icons mr-2">
                      <img
                        className="h-5 "
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg"
                      />
                    </span>{' '}
                    {cabin?.name}
                  </p>

                  <p className=" p-1 flex items-center">
                    <span className="material-icons mr-2">
                      <img
                        className="h-5"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-modify-icon.svg"
                      />
                    </span>{' '}
                    {cabin?.guest_count} Guests
                  </p>
                  <p className=" p-1 flex items-center">
                    <span className="material-icons mr-2">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/findcruise-new-icon.svg" />
                    </span>{' '}
                    Deck: {cabin?.current_deck}
                  </p>
                  <p className=" p-1 flex items-center">
                    <span className="material-icons mr-2">
                      <img
                        className="h-5"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-modify-icon.svg"
                      />
                    </span>{' '}
                    Room No: {cabin?.current_room_number}
                  </p>
                </div>
                <div>
                  {/* <button
                    className={`block  border-2 rounded border-brand-primary text-brand-primary px-5 py-3 font-bold`}
                    onClick={() => changeDeck(index)}
                  >
                    Change Deck
                  </button> */}
                  <Button text='Change Deck' type='secondary' handleClick={() => changeDeck(index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center my-8">
          {/* <button
            className={`block w-full lg:w-auto border-2 rounded border-brand-primary bg-brand-primary text-white px-10 py-3 font-bold disabled:bg-brand-primary/60 disabled:border-brand-primary/60 disabled:cursor-not-allowed`}
            onClick={() => onContinue()}
            disabled={isContinueDisabled}
          >
            Continue
          </button> */}
          <Button text='Continue' disabled={isContinueDisabled} handleClick={() => onContinue()} className='w-full lg:w-auto px-10' />
        </div>
        <div className="mt-10 bg-white rounded-lg w-full max-w-[705px] ">
          <h3 className="text-xl md:text-2xl font-bold mb-4 underline">Reschedule Policy</h3>
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
                  <tr key={index} className="border-b border-gray-300 text-gray-700 ">
                    <td className="p-3 text-sm md:text-base border-r border-gray-300">
                      {item?.days_to_depature}</td>
                    <td className="p-3 text-sm md:text-base">{item?.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-5 text-gray-700 space-y-2 text-sm md:text-base">
            {cancelPolicy?.terms?.map((item: any, index: any) => (
              <li className="p-1 text-sm md:text-base">
                •
                &nbsp;{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {cabins?.length > 0 && <DeckSelection
        deckModal={deckModal}
        setDeckModal={setDeckModal}
        selectedCabin={selectedCabin}
        cabins={cabins}
        setCabins={setCabins}
        onClose={onClose}
        setNewCabin={setNewCabin}
      />}
    </Layout>
  );
};

export default SelectCabinReschedule;
