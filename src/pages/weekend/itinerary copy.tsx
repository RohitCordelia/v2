import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '/src/components/Layout';
import { useGetItineraryMutation, useCabinPricingMutation, useCreateBookingMutation, useGetUpgradeMutation } from '/src/services/weekend/weekend';
import { ADD_ADULT, ADD_ROOM, ADD_CHILDREN, ADD_INFANT, REMOVE_ADULT, REMOVE_CHILDREN, REMOVE_INFANT, REMOVE_ROOM, SELECT_CATEGORY } from '/src/constants/itineraryConstants';
import moment from 'moment';
import SelectBoxItinerary from './component/selectBoxItinerary';
import { areGuestSelected, isRoomFull, isAdultSelected, isChildSelected, isInfantSelected, isRoomSelected, checkLastRoom, checkOffers } from '../../../src/utils/rooms/room';
import RoomCard from './component/RoomCard';
import { SaveStore, GetStore } from '../../../src/utils/store/store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css'
import { CheckDevice } from '../../utils/deviceType/device';
import { ReactComponent as FastFilling } from 'https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-color.svg';
import { ReactComponent as FlashSale } from 'https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-color.svg';
type Props = {};

const count = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3
  },
  {
    number: 4
  }
]

export const DEFAULT_ROOM: any = {
  adults: 2,
  children: 0,
  infants: 0,
  seq: 1,
  selected: '',
  pricings: [],
};

export default function WeekendItinerary({ }: Props) {
  const store = GetStore();
  let navigate = useNavigate()
  let [searchParams] = useSearchParams()

  const [itineraryList, setItineraryList] = useState<any[]>();
  const [selectedItinerary, setSelectedItinerary] = useState<any>();
  const [selectedRooms, setSelectedRooms] = useState<any[]>([
    DEFAULT_ROOM
  ]);
  const [currentRoom, setCurrentRoom] = useState<number>(0)
  const [loading, setLoading] = useState<any>(false);
  const [loadingBooking, setLoadingBooking] = useState<any>(false);

  const [getItinerary, { isLoading: loadingQuotationData }] = useGetItineraryMutation()
  const [cabinPricing] = useCabinPricingMutation()
  const [createBooking] = useCreateBookingMutation()
  const [getUpgrade] = useGetUpgradeMutation();

  const [activeDate, setActiveDate] = useState<any>(new Date());
  const [hideCalendar, setHideCalendar] = useState<boolean>(false);


  useEffect(() => {
    setLoading(true)
    // let route_id = '7ec2e703-29d8-48f2-90a0-036dc324076d'
    let night = searchParams.get('n');
    let round_trip = searchParams.get('rt');
    let route_id = searchParams.get('route_id');
    let url = `${night ? 'nights=' + night + '&' : ''}pagination=false${route_id ? '&route_id=' + route_id : ''}${round_trip ? '&round_trip=' + round_trip : ''}`

    getItinerary(url)
      .unwrap()
      .then((res: any) => {
        let newArray = res.itineraries.map((item: any) => {
          return {
            ...item,
            date: `${moment(item.start_date, 'DD/MM/YYYY').format('Do MMM')} - ${moment(item.end_date, 'DD/MM/YYYY').format('Do MMM')}`,
            portName: item.ports
              .map((item: any, index: any, arr: any) => {
                const isLast = index === arr.length - 1;
                const name = isLast ? item.name : item.name + ` -`;
                return index === 0 || isLast ? `${name}` : `${name}`;
              })
              .join(" ")
          }
        })
        setItineraryList(newArray)
        setItineraryList(newArray)
        if (store.itinerary && (newArray.some((e: any) => e.itinerary_id === store.itinerary.itinerary_id))) {
          setActiveDate(moment(store.itinerary.start_date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'))
          setSelectedItinerary(store.itinerary)
        } else {
          setActiveDate(moment(newArray[0].start_date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'))
          setSelectedItinerary(newArray[0])
        }
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }, [])

  useEffect(() => {
    if (selectedItinerary) {
      setLoading(true)
      const _payload = {
        id: selectedItinerary?.itinerary_id,
        data: {
          rooms: selectedRooms,
        },
      };
      cabinPricing(_payload)
        .unwrap()
        .then((res: any) => {
          let resp = res?.pricings;
          resp[0].selected = resp[0].pricings[0].code
          resp[0].category_details = resp[0].pricings[0]
          setSelectedRooms(JSON.parse(JSON.stringify(res.pricings)))
          const timer = setTimeout(() => {
            setLoading(false);
          }, 500);
          return () => clearTimeout(timer);
        })
        .catch((res: any) => {
          console.log('Error: ', res)
        })
    }
  }, [selectedItinerary])

  useEffect(() => {
    if (store.rooms) {
      setSelectedRooms(store.rooms)
    }
  }, [])

  const onRoomChange = (type: string, index: number, value?: string, category_details?: string) => {
    const roomLength = selectedRooms.length
    let Room = selectedRooms
    switch (type) {
      case ADD_ADULT:
        if (!isNaN(index)) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          if ((value + Room[index].children + Room[index].infants) > 4) {
            Room[index].msg = 'Max';
          } else {
            Room[index].adults = value;
            Room[index].msg = '';
          }
          setSelectedRooms([...Room]);
          fetchCabinPrice()
        }
        break;
      case ADD_CHILDREN:
        if (!isNaN(index)) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          if ((value + Room[index].adults + Room[index].infants) > 4) {
            Room[index].msg = 'Max';
          } else {
            Room[index].children = value;
            Room[index].msg = '';
          }
          setSelectedRooms([...Room]);
          fetchCabinPrice()
        }
        break;
      case ADD_INFANT:
        if (!isNaN(index)) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          if ((value + Room[index].adults + Room[index].children) > 4) {
            Room[index].msg = 'Max';
          } else {
            Room[index].infants = value;
            Room[index].msg = '';
          }
          setSelectedRooms([...Room]);
          fetchCabinPrice()
        }
        break;
      case SELECT_CATEGORY:
        if (!isNaN(index) && value) {
          Room[index].selected = value;
          Room[index].category_details = category_details;
          setSelectedRooms([...Room]);
        }
        break;
      case ADD_ROOM:
        if (roomLength < 4) {
          Room.push({
            ...DEFAULT_ROOM,
            adults: 0,
            children: 0,
            infants: 0,
            seq: roomLength + 1,
            selected: '',
            category_details: ''
          });
          setSelectedRooms([...Room]);
          setCurrentRoom(currentRoom + 1);
        }
        break;
      case REMOVE_ROOM:
        Room.splice(index, 1);
        setSelectedRooms([...Room]);
        setCurrentRoom(index - 1);
        break;
      default:
        break;
    }
  }

  const fetchCabinPrice = () => {
    setLoading(true)
    const _payload = {
      id: selectedItinerary?.itinerary_id,
      data: {
        rooms: selectedRooms,
      },
    };
    cabinPricing(_payload)
      .unwrap()
      .then((res: any) => {
        setSelectedRooms(JSON.parse(JSON.stringify(res.pricings)))
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const proceedToBilling = async () => {
    if (isRoomSelected(selectedRooms)) {
      setLoadingBooking(true)
      const callUpgrade = await checkUpgrade()
      let _payload = {
        id: selectedItinerary?.itinerary_id,
        data: {
          "auto_assign_rooms": true,
          rooms: callUpgrade.rooms,
          device:CheckDevice(),
        }
      };
      await createBooking(_payload)
        .unwrap()
        .then((res: any) => {
          SaveStore({ itinerary: selectedItinerary, rooms: callUpgrade.rooms, booking: res });
          navigate('/billing-detail')
        })
        .catch((res: any) => {
          console.log('Error: ', res)
        })
      setLoadingBooking(false)
    }
  }

  const checkUpgrade = async () => {
    const _payload = {
      id: selectedItinerary.itinerary_id,
      data: {
        itinerary: selectedItinerary,
        rooms: selectedRooms
      }
    };
    return await getUpgrade(_payload)
      .unwrap()
      .then((res: any) => {
        return res
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const tileContent = ({ date }: any) => {
    const formattedDate = moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
    let availableDates = itineraryList?.find((x: any) => x.start_date === moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'));
    if (availableDates) {
      let tags = availableDates.tags[0]
      if (tags == 'Flash Sale') {
        return availableDates.start_date == moment(activeDate).format('DD/MM/YYYY') ?
          <div className='flex justify-end absolute bottom-[8px] right-[8px] lg:right-[28px]'>
            <img className='h-[12px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-white.svg" alt="" />
          </div>
          :
          <div className='flex justify-end absolute bottom-[8px] right-[8px] lg:right-[28px]'>
            <img className='h-[12px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-color.svg" alt="" />
          </div>
      } else if (tags == 'Fast Selling') {
        return availableDates.start_date == moment(activeDate).format('DD/MM/YYYY') ?
          <div className='flex justify-end absolute bottom-[8px] right-[8px] lg:right-[28px]'>
            <img className='h-[12px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-white.svg" alt="" />
          </div>
          :
          <div className='flex justify-end absolute bottom-[8px] right-[8px] lg:right-[28px]'>
            <img className='h-[12px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-color.svg" alt="" />
          </div>
      } else if (tags == 'Lowest Price') {
        return availableDates.start_date == moment(activeDate).format('DD/MM/YYYY') ?
          <div className='flex justify-end absolute bottom-[8px] right-[8px] lg:right-[28px]'>
            <img className='h-[12px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/lowprices-white.svg" alt="" />
          </div>
          :
          <div className='flex justify-end absolute bottom-[8px] right-[8px] lg:right-[28px]'>
            <img className='h-[12px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/lowprices-color.svg" alt="" />
          </div>
      }
    }
  };

  // console.log('roh selectedRooms', selectedRooms);

  return (
    <Layout>
      {loading ?
        <div className='h-full flex justify-center items-center overflow-hidden fixed bg-black/50 z-50'>
          <img
            style={{
              mixBlendMode: 'multiply'
            }}
            className='w-full lg:w-6/12'
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-logo-animation-2.gif"
            alt=""
          />
        </div>
        : null
      }
      <main className="container mx-auto pt-20 pb-2 lg:pb-20 lg:pt-28 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
              alt="arrow"
              // onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
            />
            <h1 className="text-xl font-medium lg:text-3xl ">
              Select Itinerary
            </h1>
          </div>


          
          <div className='grid grid-cols-10 mt-4 gap-8'>
            <div className='col-span-10 lg:col-span-6'>
              <div className='lg:hidden mb-4'>
                <p className='text-sm font-semibold'>{selectedItinerary?.nights} Nights: <span className='text-brand-primary'>{selectedItinerary?.portName}</span></p>
              </div>
              <div className='shadow-allSide border lg:border-0 border-gray-300 rounded '>
                <div className='px-4 py-4 lg:py-6 lg:px-6'>
                  <p className='font-semibold text-base lg:text-lg'>Choose a prefect sailing date</p>
                </div>
                {hideCalendar ?
                  <div className='px-4 lg:px-6 pb-4 lg:pb-6'>
                    <div className='bg-gray-400 px-4 py-3 rounded mt-2 cursor-pointer flex items-center justify-between' onClick={() => setHideCalendar(false)}>
                      <p className=' font-medium'>{selectedItinerary?.date}</p>
                      <img className='h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-icon.svg" alt="" />
                    </div>
                  </div>
                  :
                  <div>
                    <Calendar
                      onChange={(props) => {
                        let availableDates = itineraryList?.find((x: any) => x.start_date === moment(props, 'DD/MM/YYYY').format('DD/MM/YYYY'));
                        setSelectedRooms([DEFAULT_ROOM])
                        setSelectedItinerary(availableDates)
                        setActiveDate(props)
                        setHideCalendar(true)
                      }}
                      value={activeDate}
                      next2Label={null}
                      prev2Label={null}
                      formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                      tileClassName={({ activeStartDate, date, view }) => {
                        let availableDates = itineraryList?.find((x: any) => x.start_date === moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'));
                        if (availableDates) {
                          let tags = availableDates.tags[0]
                          if (tags == 'Flash Sale') {
                            return 'flash-tags'
                          } else if (tags == 'Lowest Price') {
                            return 'lowest-tags'
                          } else if (tags == 'Fast Selling') {
                            return 'fast-tags'
                          } else {
                            return 'available-tags'
                          }
                        } else {
                          return 'non-highlight'
                        }
                      }}
                      tileContent={tileContent}
                      tileDisabled={(props) => {
                        return !itineraryList?.some((disabledDate: any) =>
                          moment(props.date, 'DD/MM/YYYY').format('DD/MM/YYYY') === disabledDate.start_date
                        );
                      }}
                    />

                    <div className='flex items-center px-4 py-4 lg:py-6 lg:px-6'>
                      <div className='flex items-center mr-3 lg:mr-14 lg:mb-4'>
                        <div className='bg-brand-green rounded h-5 w-5 lg:h-7 lg:w-7 flex items-center justify-center mr-1.5 lg:mr-3'>
                          <img className='h-3 lg:h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-white.svg" alt="" />
                        </div>
                        <p className='text-xs lg:text-base  font-medium'>Flash Sale</p>
                      </div>
                      <div className='flex items-center mr-3 lg:mr-14 lg:mb-4'>
                        <div className='bg-brand-secondary rounded h-5 w-5 lg:h-7 lg:w-7 flex items-center justify-center mr-1.5 lg:mr-3'>
                          <img className='h-3 lg:h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-white.svg" alt="" />
                        </div>
                        <p className='text-xs lg:text-base  font-medium'>Fast Selling</p>
                      </div>
                      <div className='flex items-center mr-3 lg:mr-14 lg:mb-4'>
                        <div className='bg-brand-primary rounded h-5 w-5 lg:h-7 lg:w-7 flex items-center justify-center mr-1.5 lg:mr-3'>
                          <img className='h-3 lg:h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/lowprices-white.svg" alt="" />
                        </div>
                        <p className='text-xs lg:text-base  font-medium'>Lowest Price</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
              {selectedRooms.map((room: any, index: number) => {
                return (
                  <RoomCard
                    room={room}
                    index={index}
                    key={index}
                    currentRoom={currentRoom}
                    onRoomChange={onRoomChange}
                    selectedRooms={selectedRooms}
                  // fetchCabinPricing={fetchCabinPricing}
                  />
                );
              })}
              <div className="my-4 flex justify-center lg:justify-start">
                <button
                  disabled={!checkLastRoom(selectedRooms)}
                  className={`border border-brand-primary text-brand-primary rounded text-base lg:text-base px-5 lg:px-6 py-3 font-medium  disabled:border-brand-primary/40 disabled:text-brand-primary/40
                
                `}
                  onClick={() => onRoomChange(ADD_ROOM, 0)}
                >
                  + Add Cabin
                </button>
                {/* <button
                  onClick={() => onRoomChange(ADD_ROOM, 0)}
                  className="bt more-bt flex"
                >
                  <span className="fl"></span>
                  <span className="sfl"></span>
                  <span className="cross"></span>
                  <i></i>
                  <p className='text-base lg:text-base  font-medium'>Add Cabin</p>
                </button> */}
              </div>
            </div>
            <div className='col-span-4 hidden lg:block'>
              <div className=' sticky top-40 mb-20'>
                <div className='rounded shadow-allSide'>
                  <div className='grid grid-cols-7 items-center'>
                    <div className='col-span-3 h-[150px] w-[150px] '>
                      <img className='h-full w-full rounded-tl' src={selectedItinerary?.image_url} alt="" />
                    </div>
                    <div className='col-span-4'>
                      <p className='text-[1.35rem] font-medium  break-words'>{selectedItinerary?.nights} Nights: <span className='text-brand-primary font-semibold'>{selectedItinerary?.portName}</span></p>
                    </div>
                  </div>
                  <div className='flex py-4 justify-between px-4 border-t border-gray-300'>
                    <div>
                      <p className='text-sm font-medium'>{selectedItinerary?.nights} Nights - {selectedRooms?.length} Cabins</p>
                      <p className='text-lg font-bold mt-2'>{selectedItinerary?.date}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium '>Total Price</p>
                      <p className='text-lg mt-2 font-bold text-brand-primary'>₹ {selectedRooms?.reduce((sum, item) => sum + (item?.category_details?.total ? item?.category_details?.total + + item?.category_details?.gst : 0), 0)}</p>
                      <p className='text-sm font-medium text-gray-200'>Inclusive All Charges *</p>
                    </div>
                  </div>
                </div>
                <div className='mt-8'>
                  <button
                    disabled={loadingBooking}
                    onClick={() => proceedToBilling()}
                    className="text-white bg-brand-primary font-semibold px-4 py-3 rounded w-full disabled:bg-brand-primary/40">
                    {loadingBooking ? 'Loading...' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className='fixed w-full bottom-0 z-30 lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]'>
        {/* <div className='bg-[#F4F8FF] px-4 py-2 shadow-[rgba(0,0,0,0.14)_5px_-2px_5px] text-center'>
          <p className='text-xs font-semibold text-[#094E9E]'>Inclusive All Charges</p>
        </div> */}
        <div className='bg-white px-4 py-4'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-xs font-semibold'>{selectedItinerary?.nights} Nights - {selectedRooms?.length} Cabins</p>
            <p className='text-xs font-semibold'>Total Price</p>
          </div>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-base font-bold'>{selectedItinerary?.date}</p>
            <p className='text-base font-bold text-brand-primary'>₹ {selectedRooms?.reduce((sum, item) => sum + (item?.category_details?.total ? item?.category_details?.total + item?.category_details?.gst : 0), 0)}</p>
          </div>
          <div className='flex justify-end items-center'>
            <p className='text-xxs font-semibold text-gray-200'>Inclusive All Charges *</p>
          </div>
          <div className='mt-3'>
            <button
              disabled={loadingBooking}
              onClick={() => proceedToBilling()}
              className="text-white bg-brand-primary font-semibold px-4 py-2.5 rounded w-full disabled:bg-brand-primary/30">
              {loadingBooking ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

