import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../src/components/Layout';
import { FormatToString } from '../../../src/utils/formatter/formatter';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { GetStore, SaveStore, GetPromo, GetAppliedPromo } from '../../../src/utils/store/store';
import { useCreateBookingMutation, useGetOffersMutation, useGetShoreExMutation } from '../../../src/services/itinerary/itinerary';
import { DEFENSE_CATEGORY, PARTIAL_PAYMENT, SAFETY_PROTECTION, UPGRADE } from '../../../src/constants/offerConstants';
// import { TiggerGAClickEvent } from '../../../src/components/Analytics/events';
import { getRefUrl } from '../../../src/utils/user/user';
import { CheckDevice } from '../../../src/utils/deviceType/device';
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
          // <ActiveButton onClick={() => onChange(PARTIAL_PAYMENT, "")}>Selected</ActiveButton>
          <Button text='Selected' size='sm' handleClick={() => onChange(PARTIAL_PAYMENT, "")} />
        ) : (
          // <InactiveButton className='' onClick={() => onChange(PARTIAL_PAYMENT, data?.id)}>Select</InactiveButton>
          <Button text='Select' size='sm' type='secondary' handleClick={() => onChange(PARTIAL_PAYMENT, data?.id)} className='w-[92px]' />
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


const DEFAULT_OFFERS: {
  payment_option: any;
  applied_offers: any[];
  protection_plan: any;
  total_cabin_fare: number;
  total: number
} = {
  payment_option: {},
  applied_offers: [],
  protection_plan: { amout: '', id: '', nights: 0, title: '' },
  total: 0
};

const promo = GetPromo();

const DEFAULT_SELECTED_OFFERS: {
  payment_option_id: string;
  protection_plan_id: string;
  defence_category: string;
  promo_code: string;
  device: string,
  rooms: [];
  shore_excursions: []
} = {
  payment_option_id: '',
  protection_plan_id: '',
  defence_category: '',
  promo_code: (promo && promo[0] && promo[0].coupon_code) || 0,
  rooms: [],
  device: CheckDevice(),
  shore_excursions: []
};

export default function Offers({ }: Props) {
  const store = GetStore();
  const promo_code = GetPromo();
  const is_applied_promo = GetAppliedPromo();
  const Itinerary = store.itinerary
  const [getOffers] = useGetOffersMutation()
  const [createBooking] = useCreateBookingMutation()
  const [offers, setOffers] = useState(DEFAULT_OFFERS)
  const [selectedOffers, setSelectedOffers] = useState(DEFAULT_SELECTED_OFFERS)
  const [totalCabinFare, setTotalCabinFare] = useState()
  const [isPartial, setIsPartial] = useState(false);
  const [dueAmount, setDueAmount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const start_date = Itinerary?.start_date
  let navigate = useNavigate()
  let location = useLocation()
  const [getShoreEx] = useGetShoreExMutation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let prefix = location.state?.prefix;

  useEffect(() => {
    if (store && store?.rooms && store?.itinerary) {
      let res = location.state?.offers
      
      setOffers(res);
      setSelectedOffers({ ...DEFAULT_SELECTED_OFFERS });

      // const _payload = { id: store.itinerary.itinerary_id, data: { ...store, website: getRefUrl() } };
      // getOffers(_payload)
      //   .unwrap()
      //   .then((res: any) => {
      //     if(!res.offers_present){
      //       proceedToSummary()
      //     }
      //     console.log('roh-res', res);

      //     setOffers(res);
      //     setSelectedOffers({ ...DEFAULT_SELECTED_OFFERS });
      //   })
      //   .catch((res: any) => {
      //     console.log('Error: ', res)
      //   })
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
      default: return null
    }
  }


  useEffect(() => {
    let total = store.totalCabinFare + (store.shoreExcursionFare || 0)

    if (is_applied_promo) {
      total = parseInt((total - (promo_code[0].offer_pct * total)).toFixed(0))
    }
    if (selectedOffers.defence_category) {
      let discount = (total * 0.1).toFixed()
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
    total = total.toFixed(2)

    setTotalCabinFare(total)
  }, [selectedOffers])


  const proceedToSummary = async () => {
    let selectedOffer = selectedOffers
    selectedOffer.rooms = store.rooms
    // selectedOffer.shore_excursions = store.shore_excursions

    const guestDocDetails = localStorage.getItem("guest_doc_detail") && JSON.parse(localStorage.getItem("guest_doc_detail"))?.[prefix];
    let docType = guestDocDetails?.web_checkin_doc_type || "";
    let docNumber = guestDocDetails?.front_img?.id_number || guestDocDetails?.back_img?.id_number || "";
    let guestFileId = guestDocDetails?.guest_file_id || "";
    
    let _payload = {
      id: store.itinerary.itinerary_id,
      data: {
        ...selectedOffer,
        website: getRefUrl(),
        doc_number: docNumber,
        doc_type: docType,
        guest_file_id: guestFileId
      },
      promo_code:
        (promo_code && promo_code[0] && promo_code[0].offer_pct) || null
    };
    console.log(guestDocDetails?.[prefix], 'guestDocDetails local', _payload, prefix)

    await createBooking(_payload)
      .unwrap()
      .then((res: any) => {
        console.log('roh-book', res);
        checkShorEx(res)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const checkShorEx = async (bookingRes: any) => {
    const _payload = { id: bookingRes.id };
    await getShoreEx(_payload)
      .unwrap()
      .then((res: any) => {
        if (res.ports && res.ports.length) {
          SaveStore({ ...store, shore_excursions: res, booking: bookingRes });
          navigate('/shore-excursions', { state: { shoreEx: res, booking: bookingRes } })
        } else {
          navigate('/payment-summary?booking_id=' + bookingRes.id)
        }
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const portList = Itinerary?.ports
    .filter((val: any) => val.name !== 'At Sea')
    .map((val: any) => val.name)
    .join(' | ');

  const isLong = portList?.length > 150;

  return (
    <Layout>
      <main className="container mx-auto py-16 grid lg:grid-cols-5 lg:gap-2 lg:pt-36 lg:pb-28">
        <div className="mx-4 lg:pb-0 lg:py-0 lg:col-span-2  w-full ">
          <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-2 fixed lg:sticky lg:top-40 lg:bottom-40 lg:mb-3.5 bg-white z-10 lg:z-0 w-full left-0 lg:left-auto border-gray-200/20  lg:w-10/12'>
            <div className='grid grid-cols-10 px-4 lg:pt-6 pb-0 pt-4'>
              <div className='col-span-10 flex lg:block items-start'>
                <img
                  src="assets/icons/footer/chevon-down.svg"
                  alt="arrow"
                  onClick={() => navigate(-1)}
                  className={`mt-1 col-span-1 mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 lg:hidden`}
                />
                <div className='w-full'>
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
                <p className="text-[17px] font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
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

              <div className='hidden lg:block col-span-3 lg:col-span-10'>
                <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                  Total Fare
                </p>
                <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                  {`₹ ${totalCabinFare >= 0 &&
                    FormatToString(totalCabinFare)
                    }`}
                </p>
                {isPartial && (
                  <p className="text-danger text-xs lg:text-sm">{`Due Amount ₹ ${dueAmount > 0 && FormatToString(dueAmount)
                    }`}</p>
                )}
                {selectedOffers.defence_category &&
                  <p className='lg:text-xs text-xxs font-semibold mt-1 text-right lg:text-left mb-1'>(10% off applied on the cabin fare only)</p>
                }
              </div>
            </div>
            <div className='grid grid-cols-1 lg:mt-2 bg-brand-sky/5 px-2 py-1 mt-1'>
              <p className='text-xxs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
            </div>
          </div>
        </div>
        <div className="mx-4 mb-4 lg:col-span-3 mt-48 lg:mt-0">
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


          {offers && offers?.payment_option && (
            <BookNowOffer data={offers.payment_option} onChange={onOfferUpdate} selectedOffer={selectedOffers.payment_option_id} />
          )}

          {offers &&
            offers?.applied_offers &&
            offers?.applied_offers.map((offer: any, index: number) => (
              <AppliedOffer key={index} data={offer} onChange={onOfferUpdate} selectedOffer={selectedOffers} />
            ))}

          {/* {store?.itinerary?.itinerary_id !== '7c173130-df01-4a72-bdec-4a33cbac1047' ? 
          is_applied_promo ? <PromoCodeApplied promoCode={promo_code} offers={offers} /> :
            <DefenseOffer onChange={onOfferUpdate} selectedOffer={selectedOffers.defence_category} />
          : null } */}

          {offers && offers?.protection_plan && offers?.protection_plan?.title ? (
            <SafetyProtection data={offers.protection_plan} onChange={onOfferUpdate} selectedOffer={selectedOffers.protection_plan_id} />
          ) : null}

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