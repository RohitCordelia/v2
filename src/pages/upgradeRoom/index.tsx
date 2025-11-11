import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../src/components/Layout';
import { FormatToString, FormatPrice } from '../../../src/utils/formatter/formatter';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Accordion from '../../../src/components/UI/Accordion/accordion_offer';
import { GetStore, SaveStore, GetPromo, GetAppliedPromo } from '../../../src/utils/store/store';
import { useGetUpgradeMutation } from '../../../src/services/itinerary/itinerary';
import { UPGRADE } from '../../../src/constants/offerConstants';
// import { TiggerGAClickEvent } from '../../../src/components/Analytics/events';
import { getRefUrl } from '../../../src/utils/user/user';
import Button from '../../components/UI/Button';

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
      className={`bg-brand-gradient text-xs text-white font-bold px-4 py-2 rounded ${className}`}
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

const UpgradeRoomOffer = ({ offer, roomNumber, room, selected, setSelected }: any) => {
  const [showDetails, setShowDetails] = useState(false)
  const store = GetStore();
  // let roomName = offer?.name.split(" ")
  // const currentRoom = `${roomName[0]} ${roomName[1]}`;
  const currentRoom = offer?.name;
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
          // <ActiveButton
          //   onClick={() => {
          //     setSelected(UPGRADE, { code: room.selected, pricing_id: room.pricing_id }, roomNumber - 1);
          //   }}
          // >
          //   Selected
          // </ActiveButton>
          <Button text='Selected' size='sm' handleClick={() => setSelected(UPGRADE, { code: room.selected, pricing_id: room.pricing_id }, roomNumber - 1)} />
        ) : (
          // <InactiveButton
          //   className=""
          //   onClick={() => {
          //     setSelected(UPGRADE, { code: offer.code, pricing_id: offer.pricing_id, new_category: offer }, roomNumber - 1);
          //   }}
          // >
          //   Select
          // </InactiveButton>
          <Button text='Select' size='sm' type='secondary' handleClick={() => setSelected(UPGRADE, { code: offer.code, pricing_id: offer.pricing_id, new_category: offer }, roomNumber - 1)} className='w-[93px]' />
        )}
        <p className="text-xl font-bold mt-2">{
          offer?.cabin_fare === 0 ? 'FREE' : `₹ ${FormatPrice(offer?.cabin_fare)}`
        }</p>
        <p className="text-xs mb-0 font-semibold text-gray-100 line-through">
          {store?.itinerary?.discount_pct !== 0 && offer?.actual_cabin_fare != 0 ? `₹ ${FormatPrice(offer?.actual_cabin_fare)} ` : null}
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
    </div>
  );
}

const DEFAULT_OFFERS: {
  fuel_surcharge: number;
  lead_id: any;
  rooms: any[];
  service_charge: number;
  total_cabin_fare: number;
  total: number
  actual_total: number
} = {
  fuel_surcharge: 0,
  lead_id: '',
  rooms: [],
  service_charge: 0,
  total_cabin_fare: 0,
  total: 0,
  actual_total: 0
};

const promo = GetPromo();

const DEFAULT_SELECTED_OFFERS: {
  rooms: any[];
  promo_code: string;
} = {
  rooms: [],
  promo_code: (promo && promo[0] && promo[0].coupon_code) || 0
};

export default function Offers({ }: Props) {
  // const {id}=useParams();
  const store = GetStore();
  const promo_code = GetPromo();
  const is_applied_promo = GetAppliedPromo();
  const Itinerary = store.itinerary
  const [getUpgrade] = useGetUpgradeMutation()
  const [Loading, setLoading] = useState(false)
  const [offers, setOffers] = useState(DEFAULT_OFFERS)
  const [selectedOffers, setSelectedOffers] = useState(DEFAULT_SELECTED_OFFERS)
  const [totalCabinFare, setTotalCabinFare] = useState(0)
  const [actualTotalCabinFare, setActualTotalCabinFare] = useState(0)
  const [isPartial, setIsPartial] = useState(false);
  const [dueAmount, setDueAmount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const start_date = Itinerary?.start_date
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (store && store?.rooms && store?.itinerary) {
      let res = location.state.upgrade
      setOffers(res);
      setSelectedOffers({ ...DEFAULT_SELECTED_OFFERS, rooms: res.rooms });
      setTotalCabinFare(res?.total)
      setActualTotalCabinFare(res?.actual_total)
      SaveStore({ ...store, rooms: res.rooms, totalCabinFare: res?.total });
    }
  }, [])

  const onOfferUpdate = (key: any, value: any, index?: any) => {
    let selectedOffer = selectedOffers;
    switch (key) {
      case UPGRADE:
        if (!isNaN(index) && index >= 0) {
          if (value.new_category) {

            // TiggerGAClickEvent({ event: `apply_offer`, type: "upgrade room" })
            let currentRooms = [...selectedOffer.rooms.map((room: any) => { return { ...room } })]
            currentRooms[index].selected = value.code;
            currentRooms[index].pricing_id = value.pricing_id;
            currentRooms[index].category_details = value.new_category;
            currentRooms[index].selected_name = value.new_category.name;
            setSelectedOffers({ ...selectedOffer, rooms: currentRooms });
          } else {
            let res = location.state.upgrade
            setSelectedOffers({ ...DEFAULT_SELECTED_OFFERS, rooms: res.rooms });
          }
        }
        break;
      default: return null
    }
  }

  useEffect(() => {
    let total = offers?.total
    let actualTotal = offers?.actual_total

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
          total = total + (getUpgradePrice.cabin_fare - discounts);
          actualTotal = actualTotal + (getUpgradePrice.cabin_fare - discounts);
        }
      });
    }
    setTotalCabinFare(total)
    setActualTotalCabinFare(actualTotal)
  }, [selectedOffers])

  const proceedToSummary = () => {
    const _payload = {
      id: store.itinerary.itinerary_id,
      data: { ...selectedOffers, website: getRefUrl() },
      totalCabinFare: totalCabinFare
    };
    SaveStore({ ...store, rooms: selectedOffers.rooms, totalCabinFare: totalCabinFare, actualTotalCabinFare: actualTotalCabinFare });
    navigate('/cabin')
  }

  const skip = () => {
    navigate('/cabin')
  }

  const portList = Itinerary?.ports
    .filter((val: any) => val.name !== 'At Sea')
    .map((val: any) => val.name)
    .join(' | ');

  const isLong = portList?.length > 150;

  if (Loading) {
    return <p>Loading...</p>
  }
  return (
    <Layout>
      <main className="container mx-auto py-16 grid lg:grid-cols-5 lg:gap-2 lg:pt-36 lg:pb-28">
        <div className="mx-4 lg:pb-0 lg:py-0 lg:col-span-2  w-full ">
          <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-2 fixed lg:sticky lg:top-40 lg:bottom-40 lg:mb-3.5 bg-white z-10 lg:z-0 w-full left-0 lg:left-auto border-gray-200/20  lg:w-10/12'>
            <div className='grid grid-cols-10 px-4 lg:pt-6 pb-0 pt-2'>
              <div className='col-span-10 flex lg:block items-start'>
                <img
                  src="assets/icons/footer/chevon-down.svg"
                  alt="arrow"
                  onClick={() => navigate(-1)}
                  className={`mt-1 col-span-1 mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 lg:hidden`}
                />
                <div>
                  <div className='flex items-start justify-between py-1'>
                    <div className=''>
                      <p className='text-xxs lg:sm text-brand-primary font-bold'>
                        Departure
                      </p>
                    </div>
                    <div className='w-[50%] text-center relative -mt-[0px] lg:-mt-[0px]'>
                      <p className='text-gray-200 whitespace-nowrap overflow-hidden text-xxs'>--------------------------------------------------------------</p>
                      <img className='absolute h-7'
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                      />
                    </div>
                    <div className='text-right'>
                      <p className='text-xxs lg:sm text-brand-primary font-bold'>
                        Arrival
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start justify-between pb-1.5'>
                    <div className=''>
                      <p className='text-base lg:text-xl font-bold'>
                        {Itinerary?.ports[0]?.name}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-base lg:text-xl font-bold'>
                        {Itinerary?.ports[Itinerary?.ports.length - 1]?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-b col-span-10 mb-2 border-gray-100/20' />
              <div className='flex flex-col items-start col-span-7 lg:col-span-10'>
                <p className="text-xs lg:text-sm font-medium text-gray-100">
                  Visiting Ports:
                </p>
                <div className="flex">
                  <p className="text-xs lg:text-xs font-medium !leading-5">
                    <span className='mr-2'>{isLong && !isExpanded ? portList?.slice(0, window.innerWidth > 765 ? 65 : 40) + '...' : portList}</span>
                    {isLong && (
                      <span
                        onClick={() => setIsExpanded(prev => !prev)}
                        className="text-xs lg:text-xs text-brand-primary font-bold cursor-pointer inline-block"
                      >
                        {isExpanded ? 'View less' : 'View more'}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className='col-span-3 lg:col-span-10 lg:hidden'>
                <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                  Total Fare
                </p>
                {Itinerary?.discount_pct != 0 ? <p className="text-xs text-right lg:text-left lg:text-base font-semibold text-gray-200 line-through">
                  {`₹ ${actualTotalCabinFare >= 0 && FormatPrice(actualTotalCabinFare)}`}
                </p> : null}
                <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                  {`₹ ${totalCabinFare >= 0 && FormatPrice(totalCabinFare)}`}
                </p>
                {isPartial && (
                  <p className="text-danger text-sm">{`Due Amount ₹ ${dueAmount > 0 && FormatPrice(dueAmount)
                    }`}</p>
                )}
                {selectedOffers.defence_category &&
                  <p className='lg:text-xs text-xxs font-semibold mt-1 text-right lg:text-left mb-1'>(10% off applied on the cabin fare only)</p>
                }
              </div>
            </div>
            <div className='border-b col-span-10 my-1.5 border-gray-100/20' />

            <div className='col-span-10 px-4'>
              <div className='grid grid-cols-2'>
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


            <div className='hidden lg:block border-b col-span-10 my-3 border-gray-100/20' />
            <div className='col-span-3 lg:col-span-10 px-4 pb-3 hidden lg:block'>
              <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                Total Fare
              </p>
              {Itinerary?.discount_pct != 0 ? <p className="text-xs text-right lg:text-left lg:text-base font-semibold text-gray-200 line-through">
                {`₹ ${actualTotalCabinFare >= 0 && FormatPrice(actualTotalCabinFare)}`}
              </p> : null}
              <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                {`₹ ${totalCabinFare >= 0 && FormatPrice(totalCabinFare)}`}
              </p>
              {isPartial && (
                <p className="text-danger text-sm">{`Due Amount ₹ ${dueAmount > 0 && FormatPrice(dueAmount)
                  }`}</p>
              )}
              {selectedOffers.defence_category &&
                <p className='lg:text-xs text-xxs font-semibold mt-1 text-right lg:text-left mb-1'>(10% off applied on the cabin fare only)</p>
              }
            </div>
            <div className='grid grid-cols-1 lg:mt-2 bg-brand-sky/5 px-2 py-1 mt-1'>
            <p className='text-xxs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
          </div>
          </div>
          
        </div>
        <div className="mx-4 mb-4 lg:col-span-3 mt-44 lg:mt-0">
          <div className={` ${isExpanded ? 'mt-32' : 'mt-4'} lg:mt-0 flex justify-between items-center`}>
            <h1 className="text-xl font-bold lg:text-3xl">
              Upgrade Room
            </h1>
            <div onClick={() => skip()} className="cursor-pointer flex justify-between items-center">
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

          <div className=" mt-4">
            {/* <button onClick={() => proceedToSummary()} className="text-white bg-brand-primary font-semibold px-8 py-3 rounded w-full">
              Proceed to Book
            </button> */}
            <Button text='Proceed to Book' handleClick={() => proceedToSummary()} className='w-full' />
          </div>
        </div>
      </main>
    </Layout>
  );
}