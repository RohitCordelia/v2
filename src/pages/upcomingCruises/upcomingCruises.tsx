import React, { useEffect, useState, useRef } from 'react'
import { Layout } from '../../../src/components/Layout';
import { Room } from '../../../src/utils/interfaces/itineraryInterface';
import { useGetPricingMutation, useGetCabinImageQuery } from '../../../src/services/itinerary/itinerary'
import { useGetAllItineraryQuery, useGetUpgradeMutation } from '../../../src/services/itinerary/itinerary'
import Accordian from '../../components/UI/Accordion/accordion_1'
import CountDown from './countdown'
import { ADD_ADULT, ADD_ROOM, ADD_CHILDREN, ADD_INFANT, REMOVE_ADULT, REMOVE_CHILDREN, REMOVE_INFANT, REMOVE_ROOM, SELECT_CATEGORY } from '/src/constants/itineraryConstants';
import { FormatToString, FormatPrice } from '../../../src/utils/formatter/formatter';
import Modal from '../../components/UI/Modal';
import { useNavigate } from 'react-router-dom';
import { GetAuth, SaveAuth, SaveContact, SaveStore, SavePromo, GetPromo, GetAppliedPromo } from '../../../src/utils/store/store';
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { useForm } from 'react-hook-form';
import { Input } from '../../components/UI/Forms/Inputs';
import { Phone } from '../../../src/utils/validations/formValidations';
import OtpInput from 'react18-input-otp';
import { useSendOTPMutation, useVerifyOTPMutation, useVerifyTruecallerQuery, useSignInMutation } from '../../../src/services/auth/auth';
import { areGuestSelected, isRoomFull, isAdultSelected, isChildSelected, isInfantSelected, isRoomSelected, checkLastRoom, checkOffers } from '../../../src/utils/rooms/room';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { TRUECALLER_URL } from '../../../src/utils/config';
import { generateRandomString } from '../../../src/utils/algorithms';
import Tooltip from "../../components/UI/Tooltip";
import { TiggerFBLeadEvent, TiggerFBViewEvent, TiggerFBLocationEvent } from '../../../src/components/Analytics/events';
import { getCurrentUrlWithCampaign, getRefUrl } from '../../../src/utils/user/user';
import useMetaTags from 'react-metatags-hook'
// @ts-ignore
import { TiggerGAAddToCartCabin, TiggerGAViewItem } from '/src/components/Analytics/events';
import { Player } from '@lottiefiles/react-lottie-player';
import promo_popup from '../../utils/lottie/promo_popup.json';
import percentage_popup from '../../utils/lottie/percentage.json';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

const toDate = (dateStr: { split: (arg0: string) => [any, any, any]; }) => {
  const [day, month, year] = dateStr.split("/")
  return new Date(year, month - 1, day).toDateString().split(' ')
}
const toYear = (dateStr: { split: (arg0: string) => [any, any, any]; }) => {
  const [day, month, year] = dateStr.split("/")
  const yrs = year.split("")
  return yrs[2] + yrs[3];
}

type Props = {}

const DateCard = ({ refs, itinerarySelector, itinerary, selectedItinerary, setSelectedItinerary }: any) => {
  const start_date = itinerary?.start_date
  return (
    <div
      ref={itinerarySelector === itinerary?.id ? refs : null}
      className={`border border-gray-300 cursor-pointer w-16 h-16 lg:w-24 lg:h-24 rounded overflow-hidden relative inline-block mr-1 ${selectedItinerary?.itinerary_id === itinerary.itinerary_id
        ? 'bg-white shadow border-2 !border-brand-primary'
        : ' bg-gray-400'
        }`}
      onClick={() => setSelectedItinerary(itinerary)}
    >
      {itinerary && itinerary.events[0] && itinerary.events[0].name ?
        itinerary.itinerary_id === '7c173130-df01-4a72-bdec-4a33cbac1047' ?
          <div className='absolute lg:-top-0 lg:-left-4 -top-[9px] -left-[17px] lg:h-4 h-3 w-24 bg-danger rotate-[325deg]'>
            <p className='lg:text-xxs text-xxxs font-bold ml-[11px] mt-[1px] text-white'>Sunburn</p>
            {/* <img className='h-5 ml-[12px] -mt-[2px] rotate-[35deg]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sunburnXcordelia.svg" alt="" /> */}
          </div>
          : (
            <div className='absolute -top-3 -left-4 h-4 w-24 bg-danger rotate-[325deg]'>
              <p className='text-xxs font-bold ml-[11px] mt-[1px] text-white'>Deal</p>
              {/* <img className='h-5 ml-[12px] -mt-[2px] rotate-[35deg]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sunburnXcordelia.svg" alt="" /> */}
            </div>
          ) : null
      }
      <div className="flex flex-col items-center justify-center">
        <p className={`text-xs lg:text-sm font-bold pt-2 lg:pt-4 ${selectedItinerary?.itinerary_id === itinerary.itinerary_id ? 'text-black' : 'text-gray-100'}`}>
          {toDate(start_date)[0]}
        </p>
        <p className={`text-xs lg:text-sm font-bold ${selectedItinerary?.itinerary_id === itinerary.itinerary_id ? 'text-black' : 'text-gray-100'}`}>
          {toDate(start_date)[2]} {toDate(start_date)[1]} `{toYear(start_date)}
        </p>
        <div className="flex items-center">
          <p className={`text-xs lg:text-sm font-bold mr-1 ${selectedItinerary?.itinerary_id === itinerary.itinerary_id ? 'text-black' : 'text-gray-100'}`}>
            {itinerary.nights}
          </p>
          <div>
            <Tooltip text="Nights">
              <img
                src="/assets/images/icons/moon_icon.svg"
                className="h-2 lg:h-3"
                alt='Cordelia Cruises night'
                title='Cordelia-Cruises-night'
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

const DateLoader = () => {
  return (
    <>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
      <div className=" w-16 h-16 rounded inline-block bg-black/10 mr-1 animate-pulse"></div>
    </>
  );
};


export const TimeLineItem = ({
  port = {},
  index = 0,
  portLength = 0
}: {
  port: any;
  index: number;
  portLength: number;
}) => {
  const isLastPort = index === portLength - 1;
  const isFirstPort = index === 0;
  if (port['name'] !== 'At Sea')
    return (
      <li className="relative flex items-baseline gap-3 pb-5">
        <div
          className={`${!isLastPort &&
            'after:absolute after:left-[5.5px] lg:after:left-[7px] after:h-full after:border-l-2 after:border-dotted'
            }`}
        >
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-icon.svg"
            className="h-3 lg:h-4"
            alt='Cordelia Cruises time'
            title='Cordelia-Cruises-time'
          />
        </div>
        <div className="flex items-center">
          <p className="text-xs lg:text-base font-semibold min-w-[140px] lg:min-w-[240px]">
            {isFirstPort && port['departure']
              ? port['departure']
              : port['arrival']}
          </p>
          <div className="flex items-center ml-4">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg"
              className="h-3 lg:h-4"
              alt='Cordelia Cruises location'
              title='Cordelia-Cruises-location'
            />
            <p className="text-xs lg:text-base font-bold ml-1 lg:ml-2">{port['name']}</p>
          </div>
        </div>
      </li>
    );
  else return (<></>)
};

const TimeLineLoader = () => {
  return (
    <>
      <li className="w-full h-32 rounded inline-block bg-black/10 mr-1 animate-pulse"></li>
    </>
  );
};


const getFilteredCabinImage = (setViewImage: any, value?: string, getCabinImage?: any, setFilteredCabinImage?: any) => {
  const res = getCabinImage.find((b: any) => { return b.code == value; });
  setFilteredCabinImage(res);
  setViewImage(true);
}

const CategoryItem = ({
  id,
  code,
  name,
  price,
  rounded,
  actualPrice,
  roomIndex,
  selectedCategory,
  perGuestPrice,
  getCabinImage,
  setFilteredCabinImage,
  onRoomChange = () => { },
  setViewImage = () => { },
  selectedItinerary
}: {
  id: string;
  code: string;
  name: string;
  price: any;
  rounded: number;
  actualPrice: any;
  roomIndex: number;
  selectedCategory: string;
  perGuestPrice: string;
  getCabinImage: any[];
  setFilteredCabinImage: any;
  onRoomChange: (type: string, index: number, value?: string, category_details?: string) => void;
  setViewImage: (value: boolean) => void;
  selectedItinerary: any[];
}) => {

  return (
    <div className="border border-gray-300 mb-2 rounded">
      <div className='flex items-center justify-between px-2 py-2'>
        <div className='flex items-center'>
          <p className="text-sm lg:text-base font-bold mr-2">{name}</p>
          <div className='flex items-center cursor-pointer' onClick={() => getFilteredCabinImage(setViewImage, code, getCabinImage, setFilteredCabinImage)}>
            <p className="text-xxs lg:text-xs font-semibold underline">Images</p>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/view-icon.svg"
              className="h-2 ml-1"
              alt="Cruise"
            />
          </div>
        </div>
        {rounded ?
          <div className='flex items-center gap-1' >
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-green-color-icon.svg"
              className="h-3 ml-3 lg:ml-4 lg:h-4"
              alt="Cruise"
            />

            <p className="text-xxs lg:text-xs font-bold text-brand-green-text ">{rounded}% Discount</p>
          </div> : null}
      </div>
      <div className='border-t border-gray-300' />
      <div className="grid grid-cols-6 cursor-pointer"
        onClick={() => onRoomChange(SELECT_CATEGORY, roomIndex, code, id)}
      >
        {/* <div className='flex items-center ml-2'> */}
        {/* {code === selectedCategory ? (
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg"
              className="h-3 lg:h-4 mr-1"
              alt="Cruise"
            />
          ) : (
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg"
              className="h-3 lg:h-4 mr-1"
              alt="Cruise"
            />
          )} */}
        {/* <input className='text-brand-primary' type="radio" name={`room_category`} value={name} checked={code === selectedCategory ? true : false} /> */}
        {/* <p className='text-xs lg:text-sm text-brand-primary font-semibold'>Select</p> */}
        {/* </div> */}
        <div className='py-2 col-span-3 flex px-2 items-center'>
          <input className='text-brand-primary mr-2' type="radio" name={`room_category`} value={name} checked={code === selectedCategory ? true : false} />
          <div>
            <p className="text-xs lg:text-sm font-bold">{`₹${perGuestPrice}`}</p>
            <p className="text-xxxs lg:text-xs font-semibold text-gray-100 leading-3">Per Guest/Night</p>
          </div>
        </div>
        <div className='col-span-3 text-center border border-brand-primary bg-[#FFF9F8] py-2 px-2 lg:py-3 sm:py-0 flex items-center justify-between'>
          <p className="text-xxs font-semibold text-gray-100 leading-3">Sub-Total</p>
          <div className='text-right'>
            {selectedItinerary?.discount_pct != 0 ? <p className="text-xxs lg:text-sm mb-0 line-through text-gray-100">{`₹${actualPrice}`}</p> : null}
            <p className="text-xs lg:text-base font-bold mb-0">{`₹${price}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomCard = ({
  room,
  index,
  currentRoom,
  rounded,
  getCabinImage,
  setFilteredCabinImage,
  isPromoApplied,
  PROMO_CODE,
  onRoomChange = () => { },
  fetchCabinPricing = () => { },
  checkLogin = () => { },
  setViewImage = () => { },
  selectedItinerary
}: {
  room: Room;
  currentRoom: number;
  index: number;
  rounded: number;
  getCabinImage: any[];
  setFilteredCabinImage: any;
  isPromoApplied: boolean;
  PROMO_CODE: any,
  onRoomChange: (type: string, index: number, value?: string) => void;
  fetchCabinPricing: (value: any) => void;
  checkLogin: () => void;
  setViewImage: (value: boolean) => void;
  selectedItinerary: any;
}) => {
  // console.log('roh sel', selectedItinerary);

  let selectedRoom = room.pricings?.find((o: any) => o.code === room.selected);
  const isFirstCabin = index === 0
  return (
    <Accordian
      title={`Room ${index + 1}`}
      openByDefault={index === currentRoom}
      selectedRoom={selectedRoom || ''}
      contentClassName="!p-0"
    >
      <div className={`grid grid-cols-10 text-sm gap-2 pt-2 ${isFirstCabin && 'pb-2'}`}>
        <div className="col-span-10 lg:col-span-3 grid lg:flex lg:flex-col items-start grid-cols-3 px-2 lg:px-4 lg:mt-4" style={{
          alignItems: 'start'
        }}>
          <div>
            <p className="text-xs lg:text-sm font-semibold text-gray-500">Adult</p>
            <p className="text-xxs font-semibold text-gray-200 mb-1">12 & Above</p>
            <div className="flex items-center ">
              <button
                className="w-5 h-5 lg:w-7 lg:h-7 text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                onClick={() => onRoomChange(REMOVE_ADULT, index)}
                disabled={!isAdultSelected(room)}
              >
                -
              </button>
              <p className="text-base mr-3 font-bold">{room.adults}</p>
              <button
                className="w-5 h-5 lg:w-7 lg:h-7 text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                onClick={() => onRoomChange(ADD_ADULT, index)}
                disabled={isRoomFull(room)}
              >
                +
              </button>
            </div>
          </div>
          {selectedItinerary?.itinerary_id != '86025f26-e82e-4906-b1c0-424765cb785e' &&
            <>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-500 lg:mt-2">Children</p>
                <p className="text-xxs font-semibold text-gray-200 mb-1">
                  2 Years - 12 Years
                </p>
                <div className="flex items-center ">
                  <button
                    className="w-5 h-5 lg:w-7 lg:h-7 text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                    onClick={() => onRoomChange(REMOVE_CHILDREN, index)}
                    disabled={!isChildSelected(room)}
                  >
                    -
                  </button>
                  <p className="text-base mr-3 font-bold">{room.children}</p>
                  <button
                    className="w-5 h-5 lg:w-7 lg:h-7 text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                    onClick={() => onRoomChange(ADD_CHILDREN, index)}
                    disabled={!isAdultSelected(room) || isRoomFull(room)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-500 lg:mt-2">Infants</p>
                <p className="text-xxs  font-semibold text-gray-200 mb-1">
                  6 Months - 2 Years
                </p>
                <div className="flex items-center ">
                  <button
                    className="w-5 h-5 lg:w-7 lg:h-7 text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                    onClick={() => onRoomChange(REMOVE_INFANT, index)}
                    disabled={!isInfantSelected(room)}
                  >
                    -
                  </button>
                  <p className="text-base mr-3 font-bold">{room.infants}</p>
                  <button
                    className="w-5 h-5 lg:w-7 lg:h-7 text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                    onClick={() => onRoomChange(ADD_INFANT, index)}
                    disabled={!isAdultSelected(room) || isRoomFull(room)}
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          }
        </div>
        <div className="col-span-10 lg:col-span-7 px-2">
          {/* {areGuestSelected(room) && <p className="underline text-xs font-bold lg:text-base lg:font-bold">Room Category</p>} */}
          {room.pricings && room.pricings.length > 0 ? (
            <div className="h-full pt-4 ">
              <CountDown PROMO_CODE={PROMO_CODE} />
              {room.pricings.map((category: any) => {
                return (
                  <CategoryItem
                    key={category.id}
                    id={category}
                    rounded={rounded}
                    code={category.code}
                    roomIndex={index}
                    name={category.name}
                    price={FormatPrice(isPromoApplied ? category.discounted_total : category.total)}
                    actualPrice={FormatPrice(isPromoApplied ? category.discounted_total : category.actual_total)}
                    perGuestPrice={FormatPrice(isPromoApplied ? category.discounted_per_guest : category.per_guest)}
                    onRoomChange={onRoomChange}
                    selectedCategory={room.selected}
                    setViewImage={setViewImage}
                    getCabinImage={getCabinImage}
                    setFilteredCabinImage={setFilteredCabinImage}
                    selectedItinerary={selectedItinerary}
                  />
                );
              })}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-8" style={{ color: 'red' }}>
              <button
                className={`${areGuestSelected(room) ? 'bg-brand-primary text-white' : 'text-gray-100 disabled:cursor-not-allowed'} rounded cursor-pointer text-xs lg:text-sm px-10 py-2 lg:px-14 lg:py-3 font-bold `}
                onClick={() => checkLogin()}
                disabled={!areGuestSelected(room)}
              >
                {areGuestSelected(room) ? 'See Prices' : 'Choose Guest'}
              </button>
            </div>
          )}
        </div>
        {!isFirstCabin && (
          <div
            className="col-span-8 bg-gray-300 p-2 text-sm text-brand-primary font-semibold cursor-pointer flex"
            onClick={() => onRoomChange(REMOVE_ROOM, index)}
          >
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/remove-icon.svg"
              className="w-3 mr-2"
              alt="Cruise"
              loading="lazy"
            />
            Remove Room
          </div>
        )}
      </div>
    </Accordian>
  );
};

export const DEFAULT_ROOM: Room = {
  adults: 0,
  children: 0,
  infants: 0,
  seq: 1,
  selected: '',
  pricings: [],
  category_details: ''
};

const TIMER_DURATION = 30
const END_TIMER = 0

export default function UpcomingCruises({ }: Props) {
  useMetaTags({
    title: 'Book a Cruise For Luxurious Vacation Holidays | Cordelia Cruises',
    description: 'Discover and book upcoming cruises online and find exclusive deals on ship ticket booking, including last minute cruises, for exciting destinations.',
    metas: [
      {
        name: 'keywords',
        content:
          'cordelia, cordelia cruises, cordelia cruise ship, cordelia cruises website, cruise cordelia, cordelia cruises ship, cruise ship cordelia, cruise entertainment, cruise dining, cruise activities, cruise stay, cruise accomodation, luxurious cruise, cordeliacruises'
      },
    ],
  })

  const currentUrl = window.location.href;
  const startSelector = new window.URLSearchParams(window.location.search).get('start');
  const portSelector = new window.URLSearchParams(window.location.search).get('port');
  const destinationPortsSelector = new window.URLSearchParams(window.location.search).get('destinationPorts');
  const itinerarySelector = new window.URLSearchParams(window.location.search).get('itinerary_id');
  const [selectedItinerary, setSelectedItinerary] = useState<any>();
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([
    DEFAULT_ROOM
  ]);
  const [viewImage, setViewImage] = useState(false);
  const [getCabinImage, setCabinImage] = useState<any>();
  const [filteredCabinImage, setFilteredCabinImage] = useState<any[]>();
  const [filterModal, setFilterModal] = useState(false);
  const [filteredItineraryData, setFilteredItineraryData] = useState<any>();
  const [originFilter, setOriginFilter] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState([]);
  const [themeFilter, setThemeFilter] = useState([]);
  const [cabinModal, setCabinModal] = useState(false);

  const [theme, setTheme] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<number>(0)
  const { data: itineraryData, isSuccess } = useGetAllItineraryQuery();
  const [getPrice, result] = useGetPricingMutation();
  let navigate = useNavigate()
  const [country, setCountry] = useState('+91');
  const [showOTP, setShowOTP] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [intervaltc, setIntervaltc] = useState(1000);
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [discountModal, setDiscountModal] = useState(false);
  const [otpReqId, setOtpReqId] = useState<any>();
  // const [sendOTP] = useSendOTPMutation();
  // const [verifyOTP] = useVerifyOTPMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const AUTH = GetAuth();
  const PROMO_CODE = GetPromo();
  const IS_APPLIED_PROMO = GetAppliedPromo();
  const [getUpgrade] = useGetUpgradeMutation();
  const [signIn] = useSignInMutation();

  const myRef = useRef();
console.log('roh aaa', selectedRooms);

  useEffect(() => {
    if (myRef && myRef.current) {
      myRef?.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }

  }, [selectedItinerary])

  var [timer, setTimer] = useState<number>(30);
  const { data: cabinImage } = useGetCabinImageQuery()

  useEffect(() => {
    if (startSelector) {
      let arr = originFilter;
      arr.push(startSelector.toUpperCase())
      setOriginFilter([...arr])
    }
    if (portSelector) {
      let arr = destinationFilter;
      arr.push(portSelector.toUpperCase())
      setDestinationFilter([...arr])
    }
    if (destinationPortsSelector) {
      var array = String.prototype.toUpperCase.apply(destinationPortsSelector).split(",");
      setDestinationFilter([...array])
    }

  }, [startSelector, portSelector, destinationPortsSelector])

  // Truecaller
  const [requestID, setRequestID] = useState<string>();
  const { data: truecallerVerifiction, error, isLoading, isError, status } = useVerifyTruecallerQuery(
    { truecaller_nonce: requestID, website: getRefUrl() },
    { skip: !requestID, pollingInterval: intervaltc }
  );


  useEffect(() => {
    if (truecallerVerifiction) {
      setIntervaltc(0)
      SaveAuth(truecallerVerifiction)

      SaveStore({ itinerary: selectedItinerary, rooms: selectedRooms });
      SaveContact({ phone: truecallerVerifiction.phone_number, first_name: truecallerVerifiction.first_name, last_name: truecallerVerifiction.last_name })
      fetchCabinPricing(truecallerVerifiction)

      // Add condition for verification successfull, failed or skipped
    }
    if (error && error.status === 422) {
      // if click on use another number
      setIntervaltc(0)
      setShowPhoneModal(true);

      SaveStore({ itinerary: selectedItinerary, rooms: selectedRooms });
      setTimer(TIMER_DURATION);
    }
    if (error && error.status === 400) {
      // if click on use another number
      setIntervaltc(1000)
    }

  }, [truecallerVerifiction, isError, status, error])

  useEffect(() => {
    if (cabinImage && cabinImage.categories) {
      setCabinImage(cabinImage.categories)
    }
  }, [cabinImage]);

  useEffect(() => {
    if (showPhoneModal) {
      if (timer && timer !== END_TIMER) {
        var tempTimer = setInterval(
          () => setTimer(timer - 1),
          // () => setTimer(moment(timer, TIMER_FORMAT).subtract(1, 's').format('mm : ss')),
          1000
        );
        return function cleanup() {
          clearInterval(tempTimer);
        };
      }
    }
  }, [showPhoneModal, timer]);

  // useEffect(() => {
  //   TiggerFBViewEvent();
  // }, [])

  // useEffect(() => {
  //   if (selectedItinerary) {
  //     TiggerGAItineraryEvent({ event: selectedItinerary.itinerary_id, type: 'Selected Itinerary' })
  //   }
  // }, [selectedItinerary])

  useEffect(() => {
    let a: any = []
    if (itineraryData && itineraryData.events) {
      a = itineraryData.events
    }

    setTheme(a);

    let origin: any = []
    if (itineraryData && itineraryData.ports) {
      origin = itineraryData.ports.filter((port: any) => port.origin)
    }
    setOrigin(origin)

    let destination: any = []
    if (itineraryData && itineraryData.ports) {
      destination = itineraryData.ports.filter((port: any) => port.destination)
    }
    setDestination(destination)
  }, [itineraryData])

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      phone_number: "",
      otp: ""
    }
  });

  const onDateChange = (itinerary: any) => {
    ResetRoomSelection();
    setSelectedItinerary(itinerary)
  }

  const ResetRoomSelection = () => {
    let Room = selectedRooms.map((room) => { return { ...room, pricings: [], selected: '', category_details: '' } })
    setSelectedRooms([...Room])
  }

  const onRoomChange = (type: string, index: number, value?: string, category_details?: string) => {
    // if(selectedRooms.length && selectedRooms[selectedRooms.length - 1])
    const roomLength = selectedRooms.length
    let Room = selectedRooms
    switch (type) {
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
      case ADD_ADULT:
        if (!isNaN(index) && !isRoomFull(Room[index])) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].adults = Room[index].adults + 1;
          setSelectedRooms([...Room]);
        }
        break;
      case REMOVE_ADULT:
        if (!isNaN(index) && Room[index].adults !== 0) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].adults = Room[index].adults - 1;
          setSelectedRooms([...Room]);
        }
        if (!isNaN(index) && Room[index].adults === 0) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].children = 0;
          Room[index].infants = 0;
          setSelectedRooms([...Room]);
        }

        break;
      case ADD_CHILDREN:
        if (!isNaN(index) && !isRoomFull(Room[index])) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].children = Room[index].children + 1;
          setSelectedRooms([...Room]);
        }
        break;
      case REMOVE_CHILDREN:
        if (!isNaN(index) && Room[index].children !== 0) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].children = Room[index].children - 1;
          setSelectedRooms([...Room]);
        }
        break;
      case ADD_INFANT:
        if (!isNaN(index) && !isRoomFull(Room[index])) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].infants = Room[index].infants + 1;
          setSelectedRooms([...Room]);
        }
        break;
      case REMOVE_INFANT:
        if (!isNaN(index) && Room[index].infants !== 0) {
          Room[index].pricings = []
          Room[index].selected = ''
          Room[index].category_details = ''
          Room[index].infants = Room[index].infants - 1;
          setSelectedRooms([...Room]);
        }
        break;
      case SELECT_CATEGORY:
        if (!isNaN(index) && value) {
          Room[index].selected = value;
          Room[index].category_details = category_details;
          setSelectedRooms([...Room]);
        }
        break;
      default:
        break;
    }
  }

  const checkLogin = () => {
    if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {
      fetchCabinPricing();
      if (selectedItinerary?.discount_pct > 0) {
        setDiscountModal(true)
      }
      // console.log('roh selec', selectedItinerary);

    } else {
      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      var android = /Android/i.test(navigator.userAgent)
      // Generate a random string for request, we will use this request for verifying login
      var requestID = generateRandomString(16);
      // Check if the device is iOS or not 
      if (!iOS && android) {
        window.location.href = TRUECALLER_URL(requestID);
        setTimeout(function () {
          if (document.hasFocus()) {
            // Truecaller is not available on the current device
            setShowPhoneModal(true);
            setTimer(TIMER_DURATION);
          } else {
            // Truecaller is avaliable and login has opened
            setRequestID(requestID)
          }
        }, 600);
      } else {
        setShowPhoneModal(true);
        setTimer(TIMER_DURATION);
      }
    }
  }

  const fetchCabinPricing = (response: any) => {
    // TiggerGAClickEvent({ event: `see price`, type: "see_price" })

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
      totalFare = totalFare + v.category_details.total;
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
      items: itemData,
      name: names
    }
    TiggerGAViewItem(GAData)

    let token = AUTH?.token || response.token;
    const _payload = {
      token: token,
      id: selectedItinerary.itinerary_id,
      data: {
        rooms: selectedRooms,
        website: getRefUrl()
      },
    };

    getPrice(_payload)
      .unwrap()
      .then((response: any) => {
        if (response.pricings[0].pricings.length == 0) {
          setCabinModal(true)
          return false;
        }
        setSelectedRooms(JSON.parse(JSON.stringify(response.pricings)))
        SavePromo(response.promo_codes)
      })
      .catch((response: any) => {
        console.log(response);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const proceedToOffers = () => {

    if (isRoomSelected(selectedRooms)) {
      if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {

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
          totalFare = totalFare + v.category_details.total;
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

        let upg = false;
        setNextLoading(true)
        const _payload = { id: selectedItinerary.itinerary_id, data: { itinerary: selectedItinerary, rooms: selectedRooms, website: getRefUrl() } };
        getUpgrade(_payload)
          .unwrap()
          .then((res: any) => {

            SaveStore({ itinerary: selectedItinerary, rooms: res.rooms, totalCabinFare: res.total, actualTotalCabinFare: res.actual_total, GAData: itemData });
            res.rooms.map((val: any) => {
              if (val.upgrades.length) {
                upg = true;
              }
            })
            setNextLoading(false)
            if (!upg) {
              navigate('/cabin')
            } else {
              navigate('/upgrade-room', { state: { upgrade: res } })
            }
          })
          .catch((res: any) => {
            console.log('Error: ', res)
          })
      }
      else {
        // var iOS =
        //   !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        var android = /Android/i.test(navigator.userAgent)
        // Generate a random string for request, we will use this request for verifying login
        var requestID = generateRandomString(16);
        // Check if the device is iOS or not 
        if (!iOS && android) {
          window.location.href = TRUECALLER_URL(requestID);
          setTimeout(function () {
            if (document.hasFocus()) {
              // Truecaller is not available on the current device
              setShowPhoneModal(true);
              setTimer(TIMER_DURATION);
            } else {
              // Truecaller is avaliable and login has opened
              setRequestID(requestID)
            }
          }, 600);
        } else {
          setShowPhoneModal(true);
          setTimer(TIMER_DURATION);
        }
      }
    }




    // // var iOS =
    // //   !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    // var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // // Generate a random string for request, we will use this request for verifying login
    // var requestID = generateRandomString(16);
    // // Check if the device is iOS or not 
    // if (!iOS) {
    //   window.location.href = TRUECALLER_URL(requestID);
    //   setTimeout(function () {
    //     if (document.hasFocus()) {
    //       // Truecaller is not available on the current device
    //       if (isRoomSelected(selectedRooms)) {
    //         SaveStore({ itinerary: selectedItinerary, rooms: selectedRooms });
    //         if (!AUTH?.token) {
    //           setShowPhoneModal(true);
    //           setTimer(TIMER_DURATION);
    //         } else if (AUTH.exp < Math.round(+new Date() / 1000)) {
    //           setShowPhoneModal(true);
    //           setTimer(TIMER_DURATION);
    //         } else {
    //           navigate('/offers');
    //         }
    //       }
    //     } else {
    //       // Truecaller is avaliable and login has opened
    //       setRequestID(requestID)
    //     }
    //   }, 600);
    // } else if (isRoomSelected(selectedRooms)) {
    //   SaveStore({ itinerary: selectedItinerary, rooms: selectedRooms });
    //   if (!AUTH?.token) {
    //     setShowPhoneModal(true);
    //     setTimer(TIMER_DURATION);
    //   } else if (AUTH.exp < Math.round(+new Date() / 1000)) {
    //     setShowPhoneModal(true);
    //     setTimer(TIMER_DURATION);
    //   } else {
    //     navigate('/offers');
    //   }
    // }
  };
  const resendOTP = () => {
    setTimer(TIMER_DURATION);
    onSubmitOTP({ phone_number: phoneNumber })
  }
  const customStyles = {
    control: (styles: any, { isDisabled }: any) => ({
      ...styles,
      backgroundColor: isDisabled ? 'rgb(232, 240, 254)' : '#f5f5f5',
      height: '48px', border: 0
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted #ccc',
      padding: 10,
      zIndex: 999
    }),
    menu: (styles: any) => ({
      ...styles,
      width: '300px',
      zIndex: 9999
    }),
    menuPortal: (base: any) => ({
      ...base, zIndex: 9999
    })
  };

  const onSubmitOTP = (data: any) => {
    const cleanedUrl = getCurrentUrlWithCampaign();
    setPhoneNumber(data.phone_number);
    // TiggerFBLeadEvent({ phoneNumber: data.phone_number });
    const _payload = { phoneNumber: data.phone_number, countryCode: country, website: cleanedUrl || window.location.href };
    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setShowOTP(true);
        setOtpReqId(response?.result?.requestId);
      })
      .catch((response) => {
        setError('phone_number', { type: 'custom', message: 'Failed to send OTP' });
      })
  }

  const onVerifyOTP = () => {
    const cleanedUrl = getCurrentUrlWithCampaign();
    const sessionTime = getSessionTime()
    const _payload = {
      otp: otp,
      website: cleanedUrl,
      requestId: otpReqId,
      sessionTime: sessionTime
    };
    // TiggerFBLocationEvent()
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        sessionStorage.removeItem("_st");
        setShowPhoneModal(false);
        SaveAuth(response)
        SaveContact({ phone: phoneNumber })
        fetchCabinPricing(response)
        if (selectedItinerary?.discount_pct > 0) {
          setDiscountModal(true)
        }
      })
      .catch((response) => {
        setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
      })
  }

  useEffect(() => {
    if (itineraryData?.itineraries) {
      handleSearch()
    }
  }, [itineraryData])

  const setFilterData = async (name, value) => {
    if (name == 'origin') {
      let arr = originFilter;
      if (arr.includes(value.toUpperCase())) {
        arr = arr.filter(item => item !== value.toUpperCase())
      } else {
        arr.push(value.toUpperCase())
      }
      setOriginFilter([...arr])
    }
    if (name == 'destination') {
      let arr = destinationFilter;
      if (arr.includes(value.toUpperCase())) {
        arr = arr.filter(item => item !== value.toUpperCase())
      } else {
        arr.push(value.toUpperCase())
      }
      setDestinationFilter([...arr])
    }
    if (name == 'theme') {
      let arr = themeFilter;
      if (arr.includes(value.toUpperCase())) {
        arr = arr.filter(item => item !== value.toUpperCase())
      } else {
        arr.push(value.toUpperCase())
      }
      setThemeFilter([...arr])
    }
  }

  const handleSearch = (e: any) => {
    console.log('roh aaa');
    
    let result = itineraryData?.itineraries
    if (originFilter && originFilter.length) {
      result = result?.filter(o => {
        if (originFilter?.includes(o.starting_port.name.toUpperCase())) {
          return true
        }
        // o.starting_port.name.toUpperCase() == originFilter.toUpperCase()
      }
      );
    }
    if (destinationFilter && destinationFilter.length) {
      // result = result?.filter(item => item.ports.find((text: { name: string; }) => text.name.toUpperCase() === destinationFilter.toUpperCase()));
      result = result?.filter(item => {
        for (let i = 0; i < item.ports.length; i++) {
          if (destinationFilter?.includes(item.ports[i].name.toUpperCase())) {
            return true
          }
        }
      });
    }
    if (themeFilter && themeFilter.length) {
      result = result?.filter(o => {
        for (let i = 0; i < o.events.length; i++) {
          if (themeFilter?.includes(o.events[i].name.toUpperCase())) {
            return true
          }
        }
      }
      );
    }

    if (e == 'click') {
      setSelectedItinerary(result[0])
    }
    else if (result && itinerarySelector) {
      const selectedItinerary = result.find((itinerary: any) => itinerary.itinerary_id === itinerarySelector)
      setSelectedItinerary(selectedItinerary)
    } else {
      setSelectedItinerary(result[0])
    }

    setFilteredItineraryData(result)
    setFilterModal(false)
  }

  const handleEditPhone = () => {
    setShowOTP(false)
    setOtp()
  }

  var rounded: any;

  if (selectedItinerary?.discount_pct > 0) {
    var multiplied = selectedItinerary?.discount_pct * 100;
    rounded = Math.round(multiplied);
  }

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36">
        <div className=" px-3">
          <h1 className="text-xl font-medium mb-3 lg:text-3xl">Upcoming Cruises</h1>
          <div className="flex items-center mb-4">
            <p
              onClick={() => setFilterModal(true)}
              className="lg:text-sm text-xs text-brand-primary font-medium mr-2 cursor-pointer"
            >
              Filter by origin, destination or offers
            </p>
            <img
              src="/assets/images/icons/arrow_left.svg"
              className="h-2"
              alt="CordeliaCruise"
              title='Cordelia-Cruises'
            />
          </div>

          {/* Calender section */}
          <div className="overflow-hidden overflow-x-scroll no-scrollbar pb-4 w-full" draggable="true">
            <div className="whitespace-nowrap">
              {!isSuccess ? (
                <DateLoader />
              ) : (
                filteredItineraryData?.length ? (filteredItineraryData?.map((itinerary: any) => {
                  return (
                    <div ref={selectedItinerary?.itinerary_id === itinerary?.itinerary_id ? myRef : null} className='inline-block'>
                      <DateCard
                        refs={myRef}
                        itinerarySelector={itinerarySelector}
                        itinerary={itinerary}
                        selectedItinerary={selectedItinerary}
                        key={itinerary.itinerary_id}
                        setSelectedItinerary={onDateChange}
                      />
                    </div>
                  );
                })) : <p className='text-sm'>No result found, please clear filters</p>
              )}
            </div>
          </div>
        </div>

        {/* Sunburn */}
        {selectedItinerary && selectedItinerary.itinerary_id === 'c7555215-b9f3-4c12-b0c6-0137d8ebd38c' ?
          <div className='py-4 px-4'>
            <h1 className="text-xs lg:text-base bg-danger text-white px-4 py-1 inline-block">
              <div className='flex items-center'>
                <img className='mr-2 h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sunburn_icon.svg" alt="" />
                Sunburn Cruises
              </div>
            </h1>
          </div>
          : null
        }
        {/* Timeline design */}
        {selectedItinerary && selectedItinerary.events[0] && selectedItinerary.events[0].name &&
          <div className='py-4 px-4'>
            <p className="text-xs lg:text-base bg-brand-sky inline-block text-white px-4 py-1">
              {selectedItinerary.events[0].name}
            </p>
          </div>
        }
        <div className='grid lg:grid-cols-2'>
          <div className="mx-4 pt-3">
            <ul>
              <h2 className='font-semibold mb-2 lg:text-xl lg:mb-3'>Itinerary</h2>
              {!selectedItinerary ? (
                <TimeLineLoader />
              ) : (
                selectedItinerary?.ports.map((port: any, index: number) => {
                  return (
                    <TimeLineItem
                      port={port}
                      key={index}
                      index={index}
                      portLength={selectedItinerary?.ports.length}
                    />
                  );
                })
              )}
            </ul>
            {selectedItinerary?.itinerary_id == '86025f26-e82e-4906-b1c0-424765cb785e' ?
              <div className='p2-4 px-4'>
                <p className="text-xs lg:text-sm">
                  <span className='font-semibold'>Note:</span> The chosen itinerary permits only individuals aged 18 years and above to embark on the voyage
                </p>
              </div>
              :
              <div className='px-4'>
                <h3 className="font-semibold lg:text-2xl lg:mt-4">
                  Onboard Offerings
                </h3>
                <ul className="list-disc lg:ml-6 ml-4 lg:text-sm text-xs lg:mt-4 mt-2 lg:leading-6 leading-4">
                  <li>Inclusive of all meals at Food Court & Starlight restaurant</li>
                  <li>Jain food available at Starlight</li>
                  {selectedItinerary?.is_international && selectedItinerary?.itinerary_id != 'e0f0a383-bd12-4415-badb-38e92e4e3892' ? null :  <li>All-inclusive beverage package</li>}
                  {/* {selectedItinerary?.is_international && selectedItinerary?.itinerary_id != 'e0f0a383-bd12-4415-badb-38e92e4e3892' ?
                    <li>Inclusive of VISA</li>
                    : null
                  } */}
                </ul>
                {/* {selectedItinerary?.is_international && selectedItinerary?.itinerary_id != 'e0f0a383-bd12-4415-badb-38e92e4e3892' ?
                  <p className='text-xs font-medium mt-1'>(Applicable for limited inventory & 5-night sailings only.)</p>
                  : null
                } */}
               {selectedItinerary?.is_international && selectedItinerary?.itinerary_id != 'e0f0a383-bd12-4415-badb-38e92e4e3892' ? null :
                <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Inclusion&Exclusions-sep-2024.pdf" target="_blank">
                  <p className="lg:text-sm text-xs text-brand-violet lg:mt-4 mt-2 ml-0 lg:ml-0 underline cursor-pointer">
                    View Inclusions & Exclusions{' '}
                  </p>
                </a>}
              </div>
            }
          </div>


          <div className="mx-5 relative">
            {selectedRooms.map((room: Room, index: number) => {
              return (
                <RoomCard
                  room={room}
                  index={index}
                  key={index}
                  rounded={rounded}
                  currentRoom={currentRoom}
                  onRoomChange={onRoomChange}
                  fetchCabinPricing={fetchCabinPricing}
                  checkLogin={checkLogin}
                  setViewImage={setViewImage}
                  setFilteredCabinImage={setFilteredCabinImage}
                  getCabinImage={getCabinImage}
                  isPromoApplied={IS_APPLIED_PROMO}
                  PROMO_CODE={PROMO_CODE}
                  selectedItinerary={selectedItinerary}
                />
              );
            })}
            <div className="my-4">
              <button
                disabled={!checkLastRoom(selectedRooms)}
                className={`bg-gray-300 rounded text-xs lg:text-sm px-4 lg:px-6 py-2 font-bold ${!checkLastRoom(selectedRooms) ? 'bg-gray-300/30 text-gray-100' : ''}`}
                // onClick={() => checkLastRoom()}
                onClick={() => onRoomChange(ADD_ROOM, 0)}
              >
                + Add Another Room
              </button>
            </div>
            { }
            <div className="mt-10 lg:mb-5">
              <button className={`bg-brand-primary text-white rounded text-xs lg:text-base py-4 font-bold w-full disabled:bg-brand-primary/10`}
                onClick={proceedToOffers} disabled={!checkOffers(selectedRooms) || nextLoading}>
                Continue Booking
              </button>
            </div>
          </div>
        </div>
      </main>

      <Modal show={viewImage} align={'center'} className="w-full lg:w-2/4 p-5  bottom-1/4 lg:bottom-16 lg:left-1/4 h-auto" onClose={() => setViewImage(false)}>
        <p className='text-white text-2xl font-bold absolute lg:-right-5 right-10 -top-20 lg:-top-10 cursor-pointer'
          onClick={() => setViewImage(false)}
        >X</p>
        <div className=''>
          <Glider
            hasArrows
            scrollLock
            slidesToShow={1}
          >
            {filteredCabinImage && filteredCabinImage.images.map((val: any, i: number) => (
              <div key={i}>
                <img className='w-full' src={val} />
              </div>
            ))}
          </Glider>
        </div>
      </Modal>
      <Modal show={showPhoneModal} align={'center'} className="drop-shadow bg-white w-full lg:w-2/4 center top-1/3 lg:top-1/4 lg:left-1/4 h-screen lg:h-1/2 rounded-t-lg lg:rounded border " onClose={() => setShowPhoneModal(false)}>
        <div className='py-8 px-6'>

          <div>
            <form>
              <p className='text-xl font-bold'>Please verify mobile number to see your exclusive offers</p>
              <p className='text-xs font-semibold mt-5'>Mobile Number</p>
              <div className="grid grid-cols-9 lg:grid-cols-9 gap-1 mt-1">
                <div className="lg:col-span-2 col-span-3">
                  <div className={`grid grid-cols-1 mb-6 `}>
                    <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                    <Select
                      // menuPortalTarget={document.body}
                      // menuPosition="fixed"
                      isDisabled={showOTP}
                      value={{ label: country }}
                      maxMenuHeight={190}
                      options={PhoneCode}
                      onChange={(item: any) => setCountry(item.value)}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-6">
                  <div className={`grid grid-cols-1 mb-4 relative `}>
                    <div className="grid grid-cols-1 relative">
                      <Input
                        disabled={showOTP}
                        onClickRightIcon={() => handleEditPhone()}
                        id="phone_number"
                        iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                        name="phone_number"
                        validation={Phone}
                        register={register}
                        inputClassName={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                        type="tel"
                        placeholder="Phone Number"
                        error={errors && errors.phone_number}
                        errorText={errors && errors.phone_number?.message}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mb-6 lg:mb-4'>
                <p className='text-xs font-semibold'>Enter OTP</p>
                <div className='flex justify-around mt-4 lg:mt-1'>
                  <OtpInput
                    autoComplete='one-time-code'
                    isDisabled={!showOTP}
                    value={otp}
                    onChange={(otp: string) => {
                      setOtp(otp);
                    }}
                    numInputs={4}
                    separator={<span className="px-5"></span>}
                    containerStyle="w-fit mx-auto"
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      color: "black",
                      fontSize: " 0.875rem",
                      borderRadius: 4,
                      border: "1px solid #E6E8EC",
                      backgroundColor: "#F5F5F5",
                    }}
                    isInputNum={true}
                  />
                </div>
              </div>
              {!showOTP &&
                <div className='w-full text-center'>
                  <button
                    onClick={handleSubmit(onSubmitOTP)}
                    className="font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                    Send OTP
                  </button>
                </div>
              }
            </form>

            {showOTP &&
              <div>
                <div className='mt-4 text-center'>
                  {timer === END_TIMER ? <p className='text-brand-primary' onClick={() => resendOTP()}>Resend OTP</p> : <p className='text-sm font-semibold'>Resend OTP in <span className='text-brand-primary'>{`00:${timer}`}</span></p>}
                  {/* <p >Edit mobile number</p> */}
                </div>
                <div className='w-full text-center'>
                  {errors && errors.otp && <p className="text-xs text-danger mt-1">{errors.otp?.message}</p>}
                  <button onClick={() => onVerifyOTP()} className="mt-4 text-center font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                    Verify
                  </button>
                </div>
              </div>
            }
          </div>



        </div>
      </Modal>
      <Modal show={filterModal} align={'center'} className="drop-shadow bg-white w-full lg:w-2/4 center bottom-0 lg:bottom-1/4 lg:left-1/4 lg:h-auto rounded-t-lg lg:rounded border " onClose={() => setFilterModal(false)}>
        <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
          <h1 className='text-lg font-semibold'>Upcoming Cruises</h1>
          <svg
            onClick={() => setFilterModal(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className='h-full'>
          <div className='h-4/6'>
            <div className='px-4 mb-3'>
              <h1 className='text-sm font-semibold mb-2'>Filter by Origin</h1>
              <div className='flex flex-wrap'>
                {origin && origin.map((val: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setFilterData('origin', val.name)}
                    className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${originFilter.includes(val.name.toUpperCase()) ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-100'}`}
                  >{val.name}</button>
                ))}
              </div>
            </div>
            <div className='px-4 mb-3'>
              <h1 className='text-sm font-semibold mb-2'>Filter by Destination</h1>
              <div className='flex flex-wrap'>
                {destination && destination.map((val: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setFilterData('destination', val.name)}
                    className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${destinationFilter.includes(val.name.toUpperCase()) ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-100'}`}
                  >{val.name}</button>
                ))}
              </div>
            </div>
            <div className='px-4 mb-3'>
              <h1 className='text-sm font-semibold mb-2'>Filter by Theme</h1>
              <div className='flex flex-wrap'>
                {theme && theme.map((val: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setFilterData('theme', val.name)}
                    className={`rounded-full text-xxs font-medium px-5 py-1 mr-3 mb-2 lg:text-sm ${themeFilter.includes(val.name.toUpperCase()) ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-100'}`}
                  >{val.name}</button>
                ))}
              </div>
            </div>
          </div>
          <div className='flex items-center px-4 lg:border-t lg:pt-2 justify-between'>
            <p className='w-1/3 text-sm underline font-semibold cursor-pointer'
              onClick={() => {
                setOriginFilter([])
                setDestinationFilter([])
                setThemeFilter([])
                // setFilterModal(false)
                // setSelectedItinerary(data && data.itineraries)
              }}
            >CLEAR ALL</p>
            <button
              onClick={() => handleSearch('click')}
              className='rounded w-2/3 lg:w-auto bg-brand-primary text-white text-sm font-medium px-5 py-2 mr-3 mb-2'>Show Cruises</button>
          </div>
        </div>
      </Modal>

      <Modal
        show={discountModal}
        align={'center'}
        className="relative drop-shadow center top-1/4 lg:w-[35%] w-[90%] left-0 right-0 mx-auto my-auto rounded-lg lg:rounded "
        onClose={() => setDiscountModal(false)}
      >
        <div className='relative'>
          <img className='w-full' src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/offer-popup-desktop-new-image.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/offer-popup-mobile-new-image.webp"} alt="discount" />
          <img onClick={() => setDiscountModal(false)} className='absolute h-3 w-3 top-4 right-4 cursor-pointer' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/close-white-icon.svg" alt="discount" />
          <div className='mt-2 absolute lg:bottom-4 bottom-3 flex flex-col justify-center items-center w-full lg:mb-3 mb-1 '>
            <h1 className="mt-2 lg:mt-2 lg:text-2xl text-xl text-white font-semibold">
              Congratulations!
            </h1>
            <p className="mt-1 lg:mt-3 lg:text-4xl text-white text-3xl font-extrabold">
              YOU SAVED {rounded}%
            </p>
            <div className='flex flex-wrap gap-3 items-center text-white' > <div>___</div><div className='lg:mt-3 text-white' >
              On Your Sailing!</div><div>___</div></div>
          </div>
        </div>

      </Modal>
      <Modal show={cabinModal} align={'center'} className="bg-white mx-3 h-[25%] lg:w-2/5 center bottom-1/3 lg:h-[25%] lg:bottom-1/3 lg:left-1/3 rounded-xl lg:rounded-xl border overflow-hidden	" onClose={() => setCabinModal(false)}>
        <div className=' p-1 flex justify-end  items-center' onClick={() => setCabinModal(false)}>
          <div className='self-center mr-3 font-bold cursor-pointer' >X</div>

        </div>
        <div className=' flex gap-3 justify-center font-bold self-center px-4 lg:pb-3'>
          <img className='h-8 w-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-icon.svg' alt='exclaimation' />
          <h1 className='text-2xl' >Cabins Not Available</h1>
        </div>
        <div className='text-center font-semibold lg:px-16 px:12 mt-3 lg:mt-2'>
          <p className='px-2' >We're sorry, but we don't have any <span className='text-brand-violet font-bold' > cabins available </span>  for the  <span className='font-bold text-brand-violet' > guest configuration </span> you have selected.</p>
        </div>
      </Modal>
    </Layout>
  );
}