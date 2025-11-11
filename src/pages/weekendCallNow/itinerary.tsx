import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// @ts-ignore
import Header from "./component/header";
import Footer from "../../components/Footer/footer";
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import { useGetItineraryMutation, useCabinPricingMutation, useCreateBookingMutation, useGetUpgradeMutation } from '/src/services/weekend/weekend';
// @ts-ignore
import { ADD_ADULT, ADD_ROOM, ADD_CHILDREN, ADD_INFANT, REMOVE_ROOM, SELECT_CATEGORY } from '/src/constants/itineraryConstants';
import moment from 'moment';
import { isRoomSelected, checkLastRoom, checkOffers, checkCabin } from '../../../src/utils/rooms/room';
import RoomCard from './component/RoomCard';
import { SaveStore, GetStore } from '../../../src/utils/store/store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css'
// @ts-ignore
import { FormatAmount } from '/src/utils/formatter/formatter';
import { TiggerGAViewItem, TiggerGAAddToCartCabin, TiggerFBViewEvent, TiggerFBAddToCardEvent } from '../../..//src/components/Analytics/events';
import { CheckDevice } from '../../utils/deviceType/device';
import { getPreviousPathname } from '../../../src/utils/getPriviousPath';
type Props = {};

const CardDesign = ({ item, selectedItinerary, setSelectedItinerary }: any) => {
  let bg = 'bg-white'
  let icon = ''
  if (item?.tags) {
    let tag = item?.tags[0];
    if (tag == 'Flash Sale') {
      if (item.itinerary_id == selectedItinerary.itinerary_id) {
        bg = '#0079D0';
        icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-selected.svg';
      } else {
        bg = 'linear-gradient(90deg, rgba(255, 255, 255, 0) 78.9%, #009821 85.95%) ';
        icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-color.svg';
      }
    } else if (tag == 'Lowest Price') {
      if (item.itinerary_id == selectedItinerary.itinerary_id) {
        bg = '#0079D0';
        icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/lowprices-selected.svg';
      } else {
        bg = 'linear-gradient(90deg, rgba(255, 255, 255, 0) 78.9%, #93288E 89.75%)';
        icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/lowprices-color.svg';
      }
    } else if (tag == 'Fast Selling') {
      if (item.itinerary_id == selectedItinerary.itinerary_id) {
        bg = '#0079D0';
        icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-selected.svg';
      } else {
        bg = 'linear-gradient(90deg, rgba(255, 255, 255, 0) 78.9%, #FF6B00 89.75%)';
        icon = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-color.svg';
      }
    } else {
      if (item.itinerary_id == selectedItinerary.itinerary_id) {
        bg = '#0079D0';
        icon = '';
      } else {
        bg = '';
      }
    }
  }
  return (
    <div
      onClick={() => setSelectedItinerary(item)}
      className={`flex items-center py-3 border border-gray-400 cursor-pointer  ${selectedItinerary.itinerary_id == item.itinerary_id ? 'text-white' : 'text-black'}`}
      style={{
        background: `${bg}`
      }}
    >
      <div className='flex w-[40%] lg:w-[40%] pl-4'>
        <img className='h-4 lg:h-6 mr-2' src={`${selectedItinerary.itinerary_id == item.itinerary_id ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-white.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-icon.svg'}`} alt="" />
        <p className='text-sm lg:text-base font-semibold'>{moment(item.start_date, 'DD/MM/YYYY').format('DD MMMM, YYYY')}</p>
      </div>
      <div className='w-[40%] lg:w-[30%] text-right'>
        <p className='text-xxs lg:text-xs'>Starting from {item?.discount_pct != 0 ? <span className='line-through'> ₹ {FormatAmount(item?.actual_starting_fare)} </span> : null}<span></span></p>
        <p className='text-sm lg:text-base font-semibold'> ₹ {FormatAmount(item.starting_fare)}</p>
      </div>
      <div className='w-[20%] lg:w-[30%] flex justify-end items-center pr-6'>
        {icon ?
          <div className='bg-white h-8 w-8 rounded-xl flex justify-center items-center'>
            <img className='h-5' src={icon} />
          </div>
          : null
        }
      </div>
    </div>
  )
}

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

  const [departurePortList, setDeparturePortList] = useState<any>();
  const [departurePort, setDeparturePort] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState<any>();
  const [monthList, setMonthList] = useState<any>();
  const [filterItineraryList, setFilterItineraryList] = useState<any[]>();
  const [filterMonthItineraryList, setFilterMonthItineraryList] = useState<any[]>();

  useEffect(() => {
    window.scrollTo(0, 0)
    localStorage.setItem('previousURL', window.location.href);
    getPreviousPathname();
  }, [])

  // console.log('roh ', selectedRooms);

  useEffect(() => {
    setLoading(true)
    let night = searchParams.get('n');
    let round_trip = searchParams.get('rt');
    let route_id = searchParams.get('route_id');
    let itinerary = searchParams.get('itinerary');
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
        // const uniqueStartingPorts = Array.from(new Set(newArray.filter((item: any) => item.nights === 2).map((item: any) => item.starting_port.name)));
        // if (itinerary && (newArray.some((e: any) => e.itinerary_id === itinerary))) {
        //   let a = newArray.find((e: any) => e.itinerary_id === itinerary)
        //   setActiveDate(moment(a?.start_date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'))
        //   setSelectedItinerary(a)
        //   setDeparturePort(a.starting_port.name)
        // }
        // else if (store.itinerary && (newArray.some((e: any) => e.itinerary_id === store.itinerary.itinerary_id))) {
        //   setActiveDate(moment(store.itinerary.start_date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'))
        //   setSelectedItinerary(store.itinerary)
        //   setDeparturePort(store.itinerary.starting_port.name)
        // } else {
        //   setActiveDate(moment(newArray[0].start_date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'))
        //   setSelectedItinerary(newArray[0])
        //   setDeparturePort(uniqueStartingPorts[0])
        // }
        // setDeparturePortList(uniqueStartingPorts)



      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }, [])

  useEffect(() => {
    let itinerary = searchParams.get('itinerary');
    let selectedIti = [];
    let depPort = ''
    if (itineraryList) {
      const uniqueStartingPorts = Array.from(new Set(itineraryList.map(item => item.starting_port.name)));
      setDeparturePortList(uniqueStartingPorts)

      if (itinerary && (itineraryList.some((e: any) => e.itinerary_id === itinerary))) {
        selectedIti = itineraryList.find((e: any) => e.itinerary_id === itinerary)
        depPort = selectedIti?.starting_port?.name
      }
      else if (store.itinerary && (itineraryList.some((e: any) => e.itinerary_id === store.itinerary.itinerary_id))) {
        selectedIti = store?.itinerary
        depPort = store?.itinerary?.starting_port?.name
      } else {
        
        let defPort = 'Chennai'
        // let defPort = uniqueStartingPorts[1]
        // let filItiList = itineraryList?.filter(item => item.starting_port.name == depPort)
        // selectedIti = itineraryList[0]
        selectedIti = itineraryList?.filter(item => item.starting_port.name == defPort)[0]
        depPort = defPort
      }
      setDeparturePort(depPort)

      let iti: any = []
      if (departurePort == 'any') {
        iti = itineraryList
      } else {
        iti = itineraryList?.filter(item => item.starting_port.name == depPort)
      }

      let mon = iti?.map((item: any) => moment(item.start_date, 'DD/MM/YYYY').format('MMM, YY'))
      const uniqueArray = Array.from(new Set(mon));
      setMonthList(uniqueArray)
      setSelectedMonth(moment(selectedIti?.start_date, 'DD/MM/YYYY').format('MMM, YY'))
      setFilterItineraryList(iti)

      setSelectedItinerary(selectedIti)

      let itinerar = iti?.filter(item => moment(item.start_date, 'DD/MM/YYYY').format('MMM, YY') == moment(selectedIti?.start_date, 'DD/MM/YYYY').format('MMM, YY'))
      if (itinerar) {
        setFilterMonthItineraryList(itinerar)
        setSelectedItinerary(selectedIti)
      }
    }
  }, [itineraryList])


  // useEffect(() => {
  //   let iti: any = []
  //   if (departurePort == 'any') {
  //     iti = itineraryList
  //   } else {
  //     iti = itineraryList?.filter(item => item.starting_port.name == departurePort)
  //   }
  //   let mon = iti?.map((item: any) => moment(item.start_date, 'DD/MM/YYYY').format('MMM, YY'))
  //   const uniqueArray = Array.from(new Set(mon));
  //   setMonthList(uniqueArray)
  //   setSelectedMonth(moment(selectedItinerary?.start_date, 'DD/MM/YYYY').format('MMM, YY'))
  //   setFilterItineraryList(iti)
  // }, [departurePort])

  // useEffect(() => {
  //   let iti = filterItineraryList?.filter(item => moment(item.start_date, 'DD/MM/YYYY').format('MMM, YY') == selectedMonth)
  //   if (iti) {
  //     setFilterMonthItineraryList(iti)
  //     setSelectedItinerary(selectedItinerary)
  //   }
  // }, [selectedMonth])

  const onChangePort = (port: any) => {
    let iti = itineraryList?.filter(item => item.starting_port.name == port)
    let mon = iti?.map((item: any) => moment(item.start_date, 'DD/MM/YYYY').format('MMM, YY'))
    const uniqueArray = Array.from(new Set(mon));
    setMonthList(uniqueArray)
    setSelectedMonth(uniqueArray[0])
    setFilterItineraryList(iti)
    setDeparturePort(port)

    // console.log('roh mont', iti);
    onChangeMonth(uniqueArray[0], iti)
  }

  const onChangeMonth = (month: any, filItiList: any) => {
    let iti = filItiList?.filter(item => moment(item.start_date, 'DD/MM/YYYY').format('MMM, YY') == month)
    if (iti) {
      setFilterMonthItineraryList(iti)
      setSelectedItinerary(iti[0])
      setSelectedMonth(month)
    }
  }

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
          if (selectedItinerary?.itinerary_id == store?.itinerary?.itinerary_id) {
            setSelectedRooms(JSON.parse(JSON.stringify(store.rooms)))
          } else {
            let resp = JSON.parse(JSON.stringify(res?.pricings));
            resp[0].selected = resp[0].pricings[0].code
            resp[0].category_details = resp[0].pricings[0]
            setSelectedRooms(resp)
          }
        })
        .catch((res: any) => {
          console.log('Error: asdghj ', res)
        })
      setLoading(false);
    }
  }, [selectedItinerary])
  useEffect(() => {
    if (selectedRooms && selectedRooms && selectedItinerary) {
      const names = selectedItinerary.ports
        .filter((item: any) => item.name !== "At Sea")
        .map((item: any, index: any, arr: any) => {
          const isLast = index === arr.length - 1;
          const name = isLast ? item.name : item.name + ` - `;
          return index === 0 || isLast ? name : name;
        })
        .join(" ");

      let totalFare = 0;
      let itemData = selectedRooms?.map((v: any) => {
        totalFare = totalFare + (v?.category_details?.total + v?.category_details?.gst);
        return {
          item_id: selectedItinerary.itinerary_id,
          item_name: names,
          item_category: selectedItinerary.nights + ' nights',
          item_category2: selectedItinerary.start_date,
          item_category3: v?.category_details?.code,
          item_list_name: v?.category_details?.name,
          item_variant: 'cabin',
          price: v?.category_details?.total,
        }
      })

      const GAData = {
        currency: "INR",
        value: totalFare,
        items: itemData,
        name: names
      }
      if (totalFare) {
        TiggerGAViewItem(GAData)
        // TiggerFBViewEvent()
      }
    }
  }, [selectedRooms, selectedItinerary])

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
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
    setLoading(false);
  }


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
          Room[index].errMsg = ''
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
          if (Room[index].adults) {
            Room[index].errMsg = '';
          } else {
            Room[index].errMsg = 'Select an adult';
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
          if (Room[index].adults) {
            Room[index].errMsg = '';
          } else {
            Room[index].errMsg = 'Select an adult';
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

  const proceedToBilling = async () => {
    if (isRoomSelected(selectedRooms)) {
      setLoadingBooking(true)

      const names = selectedItinerary?.ports
        .filter((item: any) => item.name !== "At Sea")
        .map((item: any, index: any, arr: any) => {
          const isLast = index === arr.length - 1;
          const name = isLast ? item.name : item.name + ` - `;
          return index === 0 || isLast ? name : name;
        })
        .join(" ");

      let totalFare = 0;
      let itemData = selectedRooms?.map((v: any) => {
        totalFare = totalFare + (v?.category_details?.total + v?.category_details?.gst);
        return {
          item_id: selectedItinerary.itinerary_id,
          item_name: names,
          item_category: selectedItinerary.nights + ' nights',
          item_category2: selectedItinerary.start_date,
          item_category3: v.category_details.code,
          item_list_name: v.category_details.name,
          item_variant: 'cabin',
          price: v.category_details.total,
        }
      })

      const GAData = {
        currency: "INR",
        value: totalFare,
        items: itemData
      }
      TiggerGAAddToCartCabin(GAData)
      // TiggerFBAddToCardEvent()

      const callUpgrade = await checkUpgrade()
      let _payload = {
        id: selectedItinerary?.itinerary_id,
        data: {
          "auto_assign_rooms": true,
          rooms: callUpgrade.rooms,
          device: CheckDevice(),
        }
      };
      await createBooking(_payload)
        .unwrap()
        .then((res: any) => {
          SaveStore({ itinerary: selectedItinerary, rooms: callUpgrade.rooms, booking: res, GAData: itemData });
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

  // console.log('roh sele', selectedItinerary, selectedRooms);

  return (
    <div className='pb-56 lg:pb-0'>
      <Header isVideo={false} />
      {loading ?
        <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/80 z-50'>
          <img
            className='w-32 lg:w-44'
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
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
              onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
            />
            <h1 className="text-xl font-medium lg:text-3xl ">
              Select Itinerary
            </h1>
          </div>



          <div className='grid grid-cols-10 mt-4 gap-8'>
            <div className='col-span-10 lg:col-span-6'>
              <div className=' shadow-allSide border lg:border-0 border-gray-300 rounded pt-4'>
                <div className='px-4'>
                  <p className='font-semibold text-base lg:text-lg'>Departure Ports: </p>
                </div>
                <div className='flex mt-2'>
                  {departurePortList?.map((item: any) =>
                    <div
                      onClick={() => onChangePort(item)}
                      className={`${item == departurePort ? 'bg-brand-primary text-white' : 'bg-gray-400 text-gray-100'} w-full px-4 py-3 lg:py-4 flex justify-center cursor-pointer font-semibold text-sm lg:text-base`}
                    >
                      <p>{item}</p>
                    </div>
                  )}
                </div>
                <div className='px-4 my-4'>
                  {selectedItinerary?.itinerary_id == '86025f26-e82e-4906-b1c0-424765cb785e' &&
                    <p className="text-xs lg:text-sm">
                      <span className='font-semibold'>Note:</span> The chosen itinerary permits only individuals aged 18 years and above to embark on the voyage
                    </p>
                  }
                </div>
                <div className='px-4 my-4'>
                  <p className='text-sm lg:text-base font-semibold'>{selectedItinerary?.nights} Nights: <span className='text-brand-primary'>{selectedItinerary?.portName}</span></p>
                </div>
                <div className='overflow-x-scroll overflow-hidden pt-0 pb-1.5'>
                  <div className='whitespace-nowrap'>
                    {monthList?.map((item: any) => {
                      return (
                        <div
                          onClick={() => onChangeMonth(item, filterItineraryList)}
                          className={`cursor-pointer inline-block px-2 lg:px-3 bg-gray-400/60 py-3 lg:py-3.5 mx-0.5 ${item == selectedMonth ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-100'}`}
                        >
                          <p className='text-xs font-semibold'>{item}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className=''>

                  {filterMonthItineraryList?.map(item => {
                    return (
                      <CardDesign item={item} selectedItinerary={selectedItinerary} setSelectedItinerary={setSelectedItinerary} />
                    )
                  })}
                </div>
                <div className='flex justify-between items-center py-4 lg:py-6 px-4 lg:px-12'>
                  <div className='flex items-center mr-3 lg:mr-0'>
                    <div className='bg-brand-green rounded h-5 w-5 lg:h-7 lg:w-7 flex items-center justify-center mr-1.5 lg:mr-3'>
                      <img className='h-3 lg:h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/flashsale-white.svg" alt="" />
                    </div>
                    <p className='text-xs lg:text-base  font-medium'>Flash Sale</p>
                  </div>
                  <div className='flex items-center mr-3 lg:mr-0'>
                    <div className='bg-brand-secondary rounded h-5 w-5 lg:h-7 lg:w-7 flex items-center justify-center mr-1.5 lg:mr-3'>
                      <img className='h-3 lg:h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fast-fill-white.svg" alt="" />
                    </div>
                    <p className='text-xs lg:text-base  font-medium'>Fast Selling</p>
                  </div>
                  <div className='flex items-center mr-3 lg:mr-0'>
                    <div className='bg-brand-primary rounded h-5 w-5 lg:h-7 lg:w-7 flex items-center justify-center mr-1.5 lg:mr-3'>
                      <img className='h-3 lg:h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/lowprices-white.svg" alt="" />
                    </div>
                    <p className='text-xs lg:text-base  font-medium'>Best Price</p>
                  </div>
                </div>
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
                    selectedItinerary={selectedItinerary}
                  // fetchCabinPricing={fetchCabinPricing}
                  />
                );
              })}
              <div className="my-4 flex justify-center">
                <button
                  disabled={!checkLastRoom(selectedRooms)}
                  className={`border border-brand-primary text-brand-primary rounded text-base lg:text-base px-5 lg:px-6 py-3 font-medium  disabled:border-brand-primary/40 disabled:text-brand-primary/40
                
                `}
                  onClick={() => onRoomChange(ADD_ROOM, 0)}
                >
                  + Add Cabin
                </button>
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
                      <p className='text-sm font-medium'>{selectedItinerary?.nights}N/{selectedItinerary?.nights + 1}D</p>
                      <p className='text-lg font-bold mt-2'>{selectedItinerary?.date}</p>
                      <div className='flex mt-3'>
                        <div className='flex items-center mr-4'>
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                            className="h-3 lg:h-3 mr-2"
                            alt="Cruise"
                          />
                          <p className='text-xs font-medium'>{selectedRooms?.length} {selectedRooms?.length > 1 ? 'Cabins' : 'Cabin'}</p>
                        </div>
                        <div className='flex items-center'>
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-icon.svg"
                            className="h-3 lg:h-3 mr-2 ml-1"
                            alt="Cruise"
                          />
                          <p className='text-xs font-medium'>{selectedRooms.reduce((sum: any, item: any) => sum + item.adults + item.children + item.infants, 0)} Guest</p>
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium '>Total Price</p>
                      {selectedItinerary?.discount_pct != 0 ?
                        <p className='text-sm mt-2 text-gray-100 line-through'>₹ {FormatAmount(selectedRooms?.reduce((sum, item) => sum + (item?.category_details?.actual_total ? item?.category_details?.actual_total + item?.category_details?.gst : 0), 0))}</p>
                        : null}
                      <p className='text-lg font-bold text-brand-primary'>₹ {FormatAmount(selectedRooms?.reduce((sum, item) => sum + (item?.category_details?.total ? item?.category_details?.total + item?.category_details?.gst : 0), 0))}</p>
                      <p className='text-sm font-medium mt-2 text-[#094E9E]'>Inclusive All Charges *</p>
                    </div>
                  </div>
                </div>
                <div className='mt-8'>
                  <button
                    disabled={loadingBooking || !checkCabin(selectedRooms)}
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

      <div className='fixed w-full bottom-0 z-30 lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px] '>
        <div className='bg-white px-4 py-4 '>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-xs font-semibold'>{selectedItinerary?.nights}N/{selectedItinerary?.nights + 1}D</p>
            <p className='text-xs font-semibold'>Total Price</p>
          </div>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-base font-bold'>{selectedItinerary?.date}</p>
            <div className='text-right'>
              {selectedItinerary?.discount_pct != 0 ?
                <p className='text-sm text-gray-100 line-through'>₹ {FormatAmount(selectedRooms?.reduce((sum, item) => sum + (item?.category_details?.actual_total ? item?.category_details?.actual_total + item?.category_details?.gst : 0), 0))}</p>
                : null}
              <p className='text-lg font-bold text-brand-primary'>₹ {FormatAmount(selectedRooms?.reduce((sum, item) => sum + (item?.category_details?.total ? item?.category_details?.total + item?.category_details?.gst : 0), 0))}</p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                className="h-2 mr-1"
                alt="Cruise"
              />
              <p className='text-xxs font-semibold'>{selectedRooms?.length} {selectedRooms?.length > 1 ? 'Cabins' : 'Cabin'} </p>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-icon.svg"
                className="h-2 mr-1 ml-2"
                alt="Cruise"
              />
              <p className='text-xxs font-semibold'> {selectedRooms.reduce((sum: any, item: any) => sum + item.adults + item.children + item.infants, 0)} Guest</p>
            </div>
            <p className='text-xxs font-semibold text-[#094E9E]'>Inclusive All Charges *</p>
          </div>
          <div className='mt-3'>
            <button
              disabled={loadingBooking || !checkCabin(selectedRooms)}
              onClick={() => proceedToBilling()}
              className="text-white bg-brand-primary font-semibold px-4 py-2.5 rounded w-full disabled:bg-brand-primary/30">
              {loadingBooking ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
      {/* <div className='hidden lg:block'>
        <Footer />
      </div> */}
    </div>
  );
}