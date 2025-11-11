import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../src/components/Layout';
import { FormatToString } from '../../../src/utils/formatter/formatter';
import { Navigate, useNavigate } from 'react-router-dom';
import Accordion from '../../../src/components/UI/Accordion/accordion_offer';
import { GetStore, SaveStore, GetPromo, GetAppliedPromo } from '../../../src/utils/store/store';
import { useCreateBookingMutation, useGetOffersMutation } from '../../../src/services/itinerary/itinerary';
import { DEFENSE_CATEGORY, PARTIAL_PAYMENT, SAFETY_PROTECTION, UPGRADE } from '../../../src/constants/offerConstants';
// import { TiggerGAClickEvent } from '../../../src/components/Analytics/events';
import { getRefUrl } from '../../../src/utils/user/user';
import { CheckDevice } from '../../../src/utils/deviceType/device';

const toDate = (dateStr: any) => {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day).toDateString().split(' ')
  } else return new Date().toDateString().split(' ')
}

type Props = {}


const ActiveButton = ({
  children,
  className = '',
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`bg-brand-primary border-2 border-brand-primary text-xs text-white font-bold px-4 py-2 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const InactiveButton = ({
  children,
  className = '',
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`border-2 border-brand-primary text-xs text-brand-primary font-bold px-6 py-2 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const OfferText = ({ data }: any) => {
  return (
    <div className="flex">
      <img
        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
        className="h-2 mt-1 mr-1"
        alt="Cruise"
      />
      <p className="text-xs font-semibold">
        {data}
      </p>
    </div>
  ); ``
}

const BookNowOffer = ({ data, onChange, selectedOffer }: any) => {

  const [showDetails, setShowDetails] = useState(false)
  const [selected, setSelected] = useState(false)
  return (
    <div className="border-2 border-gray-200/40 grid grid-cols-3 mt-4 px-2 py-3 lg:px-5 rounded">
      <div className="col-span-2">
        <p className="text-base font-bold">{data?.title}</p>
        <p className="text-xxs font-semibold mt-1 text-gray-800">
          {data?.info && data?.info[0]}
        </p>
        {!showDetails && <p
          className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
          DETAILS
        </p>}
        {showDetails && (
          <div className="mt-2">
            {data?.info?.map((info: any, index: number) => (
              <OfferText key={index} data={info} />
            ))}
            <p
              onClick={() => setShowDetails(false)}
              className="text-xxs text-brand-primary underline mt-3 font-semibold cursor-pointer"
            >
              SEE LESS
            </p>
          </div>
        )}
      </div>
      <div className="text-right">
        {selectedOffer === data?.id ? (
          <ActiveButton onClick={() => onChange(PARTIAL_PAYMENT, "")}>Selected</ActiveButton>
        ) : (
          <InactiveButton className='' onClick={() => onChange(PARTIAL_PAYMENT, data?.id)}>Select</InactiveButton>
        )}
      </div>
    </div>
  );
}

const AppliedOffer = ({ data }: any) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div className="border-2 border-brand-sky/50 bg-brand-sky/5 grid grid-cols-3 mt-4 px-2 py-3 lg:px-5 rounded">
      <div className="col-span-2">
        <p className="text-base font-bold">{data?.title}</p>
        <p className="text-xxs font-semibold mt-1 text-gray-800">
          {data?.info && data?.info[0]}
        </p>
        {!showDetails && <p className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer">
          DETAILS
        </p>}
        {showDetails && (
          <div className="mt-2">
            {data?.info?.map((info: any, index: number) => (
              <OfferText key={index} data={info} />
            ))}
            <p
              onClick={() => setShowDetails(false)}
              className="text-xxs text-brand-primary underline mt-3 font-semibold cursor-pointer"
            >
              SEE LESS
            </p>
          </div>
        )}
      </div>
      <div className="text-right">
        <ActiveButton className='px-5'>Applied</ActiveButton>
      </div>
    </div>
  );
}

const DefenseOffer = ({ onChange, selectedOffer }: any) => {
  const [showDetails, setShowDetails] = useState(false)
  const [selected, setSelected] = useState(false)

  return (
    <div className="border-2 border-gray-200/40 grid grid-cols-3 mt-4 px-2 py-3 lg:px-5 rounded">
      <div className="col-span-2">
        <p className="text-base font-bold">10% off for Defence Personal</p>
        <p className="text-xxs font-semibold mt-1 text-gray-800">
          Special discount for room fare
        </p>
        {!showDetails && (
          <p
            onClick={() => setShowDetails(true)}
            className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer"
          >
            DETAILS
          </p>
        )}
        {showDetails && (
          <div className="mt-2">
            <div className="flex items-center mt-3">
              {/* <input type="checkbox" onChange={(event:any) => {
                if (!event.target.checked) {
                  onChange(DEFENSE_CATEGORY, '');
                }
              }}/> */}
              <p className="text-xs ml-1 text-xs font-semibold text-gray-600">
                I am Defence Personal
              </p>
            </div>
            <select
              className="rounded text-sm py-1.5 flex justify-between w-3/4 mt-3"
              onChange={(event: any) => {
                onChange(DEFENSE_CATEGORY, event.target.value)
                setShowDetails(false);
              }}
              value={selectedOffer}
            >
              <option disabled value="">Choose Category</option>
              <option value="Indian Army">Indian Army</option>
              <option value="Indian Navy">Indian Navy</option>
              <option value="Indian Air Force">Indian Air Force</option>
              <option value="Indian Coast Gaurd">Indian Coast Gaurd</option>
              <option value="Paramilitary Forces">Paramilitary Forces</option>
              <option value="Under Traniee Cadets">Under Traniee Cadets</option>
            </select>
            <p className="italic text-xxs text-gray-600 font-semibold leading-3 mt-2">
              Note: Guests using the defence discount must carry valid defence
              ID during check-in onboard MV Empress.
            </p>
            <p
              onClick={() => setShowDetails(false)}
              className="text-xxs text-brand-primary underline mt-3 font-semibold cursor-pointer"
            >
              SEE LESS
            </p>
          </div>
        )}
      </div>
      <div className="text-right">
        {selectedOffer ? (
          <ActiveButton
            onClick={() => {
              setShowDetails(false);
              onChange(DEFENSE_CATEGORY, '');
            }}
          >
            Selected
          </ActiveButton>
        ) : (
          <InactiveButton
            className=""
            onClick={() => {
              setShowDetails(true);
            }}
          >
            Select
          </InactiveButton>
        )}
      </div>
    </div>
  );
}

const PromoCodeApplied = ({ promoCode, offers }: any) => {
  return (
    <div className="border-2 border-gray-200/40 grid grid-cols-3 mt-4 px-2 py-3 lg:px-5 rounded">
      <div className="col-span-2">
        <p className="text-base font-bold">{promoCode[0].title}</p>
        <p className="text-xxs font-semibold mt-1 text-gray-800">
          {promoCode[0].info[0]}
        </p>
      </div>
      <div className="text-right">
        <ActiveButton
        >
          Applied
        </ActiveButton>
        <p className="text-lg mt-2 font-bold text-right">
          {`₹ ${((promoCode[0].offer_pct * offers?.total_cabin_fare).toFixed(2) || 0)}`}
        </p>
      </div>
    </div>
  );
}

export const SafetyProtection = ({ data, onChange, selectedOffer }: any) => {
  const [showDetails, setShowDetails] = useState(false)
  const [selected, setSelected] = useState(false)
  return (
    <div className="border-2 border-gray-200/40 grid grid-cols-3 mt-4 px-2 py-3 lg:px-5 rounded">
      <div className="col-span-2">
        <p className="text-base font-bold">Secure my trip</p>
        <p className="text-xxs font-semibold mt-1 text-gray-800">
          {data?.title}
        </p>
      </div>
      <div className="text-right">
        {selectedOffer ? (
          <ActiveButton
            onClick={() => {
              onChange(SAFETY_PROTECTION, '');
            }}
          >
            Selected
          </ActiveButton>
        ) : (
          <InactiveButton
            className=""
            onClick={() => {
              onChange(SAFETY_PROTECTION, data?.id);
            }}
          >
            Select
          </InactiveButton>
        )}
        <p className="text-lg mt-2 font-bold text-right">
          {`₹ ${(data?.amout || 0)}`}
        </p>
      </div>
    </div>
  );
}

const UpgradeRoomOffer = ({ offer, roomNumber, room, selected, setSelected }: any) => {
  const [showDetails, setShowDetails] = useState(false)
  let roomName = offer?.name.split(" ")
  const currentRoom = `${roomName[0]} ${roomName[1]}`;
  return (
    <div
      className={`grid grid-cols-3 px-2 py-3 lg:px-5 ${selected === offer?.code && 'bg-brand-sky/10'
        }`}
    >
      <div className="col-span-2">
        <p className="text-base font-bold">
          {`Upgrade room ${roomNumber} to ${offer?.name}`}
        </p>
        <p className="text-xxs font-semibold mt-1 text-gray-800">
          {`Current: ${currentRoom}`}
        </p>
        {!showDetails && (
          <p
            onClick={() => setShowDetails(true)}
            className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer"
          >
            DETAILS
          </p>
        )}
        {showDetails && (
          <div className="mt-2">
            <div className="flex">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                className="h-2 mt-1 mr-1"
                alt="Cruise"
              />
              <p className="text-xs font-semibold">
                Valid on all 5-night sailings from 1st October.
              </p>
            </div>
            <div className="flex">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                className="h-2 mt-1 mr-1"
                alt="Cruise"
              />
              <p className="text-xs font-semibold">
                Limited availability per sailing.
              </p>
            </div>
            <div className="flex">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                className="h-2 mt-1 mr-1"
                alt="Cruise"
              />
              <p className="text-xs font-semibold">
                Full payment must be made at the time of booking.
              </p>
            </div>
            <div className="flex">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                className="h-2 mt-1 mr-1"
                alt="Cruise"
              />
              <p className="text-xs font-semibold">
                Valid on first-come, first-served basis only.
              </p>
            </div>
            <div className="flex">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                className="h-2 mt-1 mr-1"
                alt="Cruise"
              />
              <p className="text-xs font-semibold">
                Available upgrade if for Interior Stateroom to Ocean View
                Stateroom only.
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-icon.svg"
                className="h-3 mr-1"
                alt="Cruise"
              />
              <p className="text-xxs font-semibold italic text-gray-200">
                Offer Terms and Conditions
              </p>
            </div>
            <p
              onClick={() => setShowDetails(false)}
              className="text-xxs text-brand-primary underline mt-2 font-semibold"
            >
              SEE LESS
            </p>
          </div>
        )}
      </div>
      <div className="text-right">
        {selected === offer?.code ? (
          <ActiveButton
            onClick={() => {
              setSelected(UPGRADE, { code: room.selected, pricing_id: room.pricing_id }, roomNumber - 1);
            }}
          >
            Selected
          </ActiveButton>
        ) : (
          <InactiveButton
            className=""
            onClick={() => {
              setSelected(UPGRADE, { code: offer.code, pricing_id: offer.pricing_id }, roomNumber - 1);
            }}
          >
            Select
          </InactiveButton>
        )}
        <p className="text-xl font-bold mt-2">{
          offer?.cabin_fare === 0 ? 'FREE' : `₹ ${FormatToString(offer?.cabin_fare)}`
        }</p>
        <p className="text-xs mb-0 font-semibold text-gray-100 line-through">
          {offer?.actual_cabin_fare !== 0 && `₹ ${FormatToString(offer?.actual_cabin_fare)}`}
        </p>
      </div>
    </div>
  );
}
const UpgradeRoom = ({ room, roomNumber, onChange, selectedOffer }: any) => {
  const [selected, setSelected] = useState()
  return (
    <div>
      {room?.upgrades.length ? room?.upgrades.map((upgrade: any, index: number) => (
        <UpgradeRoomOffer key={index} offer={upgrade} roomNumber={roomNumber} room={room} selected={selectedOffer.selected} setSelected={onChange} />
      )) : <p className='p-4 text-xs'>No upgrades available</p>}

      {/* <div className="bg-brand-sky/10 grid grid-cols-3 px-2 py-3 lg:px-5 border-t border-gray-200/25">
        <div className="col-span-2">
          <p className="text-base font-bold">
            Upgrade room 1 to Interior Upper Deck 9
          </p>
          <p className="text-xxs font-semibold mt-1 text-gray-800">
            Current: Interior Standard Deck 4
          </p>
          <p className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer">
            DETAILS
          </p>
        </div>
        <div className="text-right">
          <button className="bg-brand-primary text-xs text-white font-bold px-8 py-2 rounded">
            Selected
          </button>
          <p className="text-xl font-bold mt-2">₹10,104</p>
          <p className="text-xs mb-0 font-semibold text-gray-100 line-through">
            ₹37,648
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-2 py-3 lg:px-5">
        <div className="col-span-2">
          <p className="text-base font-bold">
            Upgrade room 1 to Ocean View Standard Deck 4
          </p>
          <p className="text-xxs font-semibold mt-1 text-gray-800">
            Current: Interior Standard Deck 4
          </p>
          <p className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer">
            DETAILS
          </p>
        </div>
        <div className="text-right">
          <button className="border-2 border-brand-primary text-xs text-brand-primary font-bold px-8 py-2 rounded">
            Select
          </button>
          <p className="text-xl font-bold mt-2">Free</p>
          <p className="text-xs mb-0 font-semibold text-gray-100 line-through">
            ₹37,648
          </p>
        </div>
      </div> */}
    </div>
  );
}

const DEFAULT_OFFERS: {
  rooms: any[];
  payment_option: any;
  applied_offers: any[];
  protection_plan: any;
  total_cabin_fare: number;
  total: number
} = {
  rooms: [],
  payment_option: {},
  applied_offers: [],
  protection_plan: { amout: '', id: '', nights: 0, title: '' },
  total: 0
};

const promo = GetPromo();

const DEFAULT_SELECTED_OFFERS: {
  rooms: any[];
  payment_option_id: string;
  protection_plan_id: string;
  defence_category: string;
  promo_code: string;
  device:string,
} = {
  rooms: [],
  payment_option_id: '',
  protection_plan_id: '',
  defence_category: '',
  device:CheckDevice(),
  promo_code: (promo && promo[0] && promo[0].coupon_code) || 0
};

export default function Offers({ }: Props) {
  // const {id}=useParams();
  const store = GetStore();
  const promo_code = GetPromo();
  const is_applied_promo = GetAppliedPromo();
  const Itinerary = store.itinerary
  const [getOffers] = useGetOffersMutation()
  const [createBooking] = useCreateBookingMutation()
  const [offers, setOffers] = useState(DEFAULT_OFFERS)
  const [selectedOffers, setSelectedOffers] = useState(DEFAULT_SELECTED_OFFERS)
  const [totalCabinFare, setTotalCabinFare] = useState(0)
  const [isPartial, setIsPartial] = useState(false);
  const [dueAmount, setDueAmount] = useState(0);
  const start_date = Itinerary?.start_date
  let navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (store && store?.rooms && store?.itinerary) {
      // console.log(store)
      // const rooms = store.rooms.map((room:any)=>{
      //   delete room.pricings;
      //   return room
      // }) 

      const _payload = { id: store.itinerary.itinerary_id, data: { ...store, website: getRefUrl() } };
      getOffers(_payload)
        .unwrap()
        .then((res: any) => {
          setOffers(res);
          setSelectedOffers({ ...DEFAULT_SELECTED_OFFERS, rooms: res.rooms });
          setTotalCabinFare(res?.total_cabin_fare)
        })
        .catch((res: any) => {
          console.log('Error: ', res)
        })
    }
  }, [])

  const onOfferUpdate = (key: any, value: any, index?: any) => {
    let selectedOffer = selectedOffers;
    switch (key) {
      case SAFETY_PROTECTION:
        // TiggerGAClickEvent({ event: `apply_offer`, type: "safety protection" })
        selectedOffer.protection_plan_id = value
        setSelectedOffers({ ...selectedOffer })
        break;
      case DEFENSE_CATEGORY:
        // TiggerGAClickEvent({ event: `apply_offer`, type: "defence category" })
        selectedOffer.defence_category = value
        setSelectedOffers({ ...selectedOffer })
        break;
      case PARTIAL_PAYMENT:
        if (value) {
          setIsPartial(true);
        } else {
          setIsPartial(false);
        }
        // TiggerGAClickEvent({ event: `apply_offer`, type: "partial payment" })
        selectedOffer.payment_option_id = value
        setSelectedOffers({ ...selectedOffer })
        break;
      case UPGRADE:
        if (!isNaN(index) && index >= 0) {
          // TiggerGAClickEvent({ event: `apply_offer`, type: "upgrade room" })
          let currentRooms = [...selectedOffer.rooms.map((room: any) => { return { ...room } })]
          currentRooms[index].selected = value.code;
          currentRooms[index].pricing_id = value.pricing_id;
          setSelectedOffers({ ...selectedOffer, rooms: currentRooms });
        }
        break;
      default: return null
    }
  }


  useEffect(() => {
    let total = offers?.total

    if (is_applied_promo) {
      total = parseInt((offers?.total - (promo_code[0].offer_pct * offers?.total_cabin_fare)).toFixed(0))
    }

    let getUpgradeRooms = selectedOffers.rooms.filter(
      (room: any, index: number) => {
        if (offers.rooms[index]?.selected)
          return room.selected !== offers.rooms[index]?.selected;
      }
    );
    if (getUpgradeRooms) {
      getUpgradeRooms.forEach((upgradeRoom: any) => {
        let getUpgrades = offers.rooms.find(
          (room: any) => room.seq === upgradeRoom.seq
        );
        let getUpgradePrice = getUpgrades.upgrades.find(
          (upgrade: any) => upgrade.code === upgradeRoom.selected
        );
        if (getUpgradePrice && getUpgradePrice.cabin_fare) {
          let discounts = 0;
          if(selectedOffers.defence_category){
            discounts = (getUpgradePrice.cabin_fare * 0.1).toFixed()
          }
          total = total + (getUpgradePrice.cabin_fare - discounts);
        }
      });
    }
    if (selectedOffers.defence_category) {
      let discount = (offers?.total_cabin_fare * 0.1).toFixed()
      total = total - parseInt(discount)
    }
    if (selectedOffers.payment_option_id) {
      let due = (total * 0.75).toFixed();
      setDueAmount(parseInt(due));
      total = total - parseInt(due)
    }
    if (selectedOffers.protection_plan_id) {
      total = total + parseInt(offers.protection_plan?.amout)
    }
    setTotalCabinFare(total)
  }, [selectedOffers])


  const proceedToSummary = () => {
    const _payload = {
      id: store.itinerary.itinerary_id,
      data: { ...selectedOffers, website: getRefUrl() },
      promo_code:
        (promo_code && promo_code[0] && promo_code[0].offer_pct) || null
    };
    createBooking(_payload)
      .unwrap()
      .then((res: any) => {
        console.log('success: ', res)
        SaveStore({ ...store, total_cabin_fare: res.total, booking: res });
        navigate('/payment-summary')
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }
  return (
    <Layout>
      <main className="container mx-auto py-16 grid lg:grid-cols-5 lg:gap-2 lg:pt-36 lg:pb-28">
        <div className="mx-4 lg:pb-0 lg:py-0 lg:col-span-2  w-full ">
          <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-2 fixed lg:sticky lg:top-40 lg:bottom-40 lg:mb-3.5 bg-white z-10 lg:z-0 w-full left-0 lg:left-auto border-gray-200/20  lg:w-10/12'>
            <div className='grid grid-cols-10 px-4 lg:pt-6 pb-0 pt-4'>
              <div className='col-span-7 lg:col-span-10'>
                <div className='flex '>
                  <img
                    src="assets/icons/footer/chevon-down.svg"
                    alt="arrow"
                    onClick={() => navigate('/upcoming-cruises')}
                    className={`mt-1 col-span-1 mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 lg:hidden`}
                  />
                  <p className='text-sm col-span-8 font-bold leading-5 lg:text-2xl'>{Itinerary?.ports?.map((port: any, index: number) => {
                    return (
                      <span key={index}>
                        <span>{port['name']}</span>
                        {index < Itinerary?.ports.length - 1 && (
                          <span className="mx-1">-</span>
                        )}
                      </span>
                    );
                  })}</p>
                </div>

                <div className='grid grid-cols-2 mt-2'>
                  <div className='flex'>
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                      className="h-3 mr-1 mt-0.5 lg:h-4"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold">
                      {toDate(start_date)[2]} {toDate(start_date)[1]} {toDate(start_date)[3]}
                    </p>
                  </div>
                  <div className="flex ">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                      className="h-3 mr-1 mt-0.5 lg:h-4"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold">
                      {`${store?.rooms?.length} Rooms`}
                    </p>
                  </div>
                </div>
              </div>
              <div className='md:block hidden border-b-2 col-span-10 my-3 border-gray-100/20' />
              <div className='col-span-3 lg:col-span-10'>
                  <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                    Total Fare
                  </p>
                  <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                    {`₹ ${totalCabinFare >= 0 &&
                      FormatToString(totalCabinFare)
                      }`}
                  </p>
                  {isPartial && (
                    <p className="text-danger text-sm">{`Due Amount ₹ ${dueAmount > 0 && FormatToString(dueAmount)
                      }`}</p>
                  )}
                  {selectedOffers.defence_category &&
                    <p className='lg:text-xs text-xxs font-semibold mt-1 text-right lg:text-left mb-1'>(10% off applied on the cabin fare only)</p>
                  }
              </div>
            </div>
            <div className='grid grid-cols-1 lg:mt-2 bg-brand-sky/5 px-2 py-1 mt-4'>
              <p className='text-xxs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
            </div>
          </div>
        </div>
        <div className="mx-4 mb-4 lg:col-span-3 mt-32 lg:mt-0">
          <div className="mt-4 lg:mt-0 flex justify-between items-center">
            <h1 className="text-xl font-bold lg:text-3xl">
              Offers just for you
            </h1>
            <div onClick={() => proceedToSummary()} className="cursor-pointer flex justify-between items-center">
              <p className="text-sm mr-2 font-semibold text-brand-primary lg:text-lg">
                Skip
              </p>
              <img
                src="assets/icons/footer/chevon-down.svg"
                alt="arrow"
                className={`self-center justify-self-end mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full -rotate-90`}
              />
            </div>
          </div>
          {offers?.rooms.map((room: any, index: number) => (
            <Accordion
              title={`Room ${index + 1}`}
              selectedRoom={''}
              openByDefault={true}
              className=""
              key={index}
            >
              <UpgradeRoom key={index} room={room} roomNumber={index + 1} onChange={onOfferUpdate} selectedOffer={selectedOffers.rooms[index]} />
            </Accordion>
          ))}

          {offers && offers?.payment_option && (
            <BookNowOffer data={offers.payment_option} onChange={onOfferUpdate} selectedOffer={selectedOffers.payment_option_id} />
          )}

          {offers &&
            offers?.applied_offers &&
            offers?.applied_offers.map((offer: any, index: number) => (
              <AppliedOffer key={index} data={offer} onChange={onOfferUpdate} selectedOffer={selectedOffers} />
            ))}

          {is_applied_promo ? <PromoCodeApplied promoCode={promo_code} offers={offers} /> :
            <DefenseOffer onChange={onOfferUpdate} selectedOffer={selectedOffers.defence_category} />
          }

          {offers && offers?.protection_plan && (
            <SafetyProtection data={offers.protection_plan} onChange={onOfferUpdate} selectedOffer={selectedOffers.protection_plan_id} />
          )}

          <div className=" mt-4">
            <button onClick={() => proceedToSummary()} className="text-white bg-brand-primary font-semibold px-8 py-3 rounded w-full">
              Proceed to Book
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}