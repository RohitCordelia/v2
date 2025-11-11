import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../src/components/Layout';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { GetStore, SaveStore } from '../../../src/utils/store/store';
import { useGetShoreExMutation } from '../../../src/services/itinerary/itinerary';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import Modal from '../../../src/components/UI/ModalCenter';
import { ADD_ADULT, ADD_CHILDREN, REMOVE_ADULT, REMOVE_CHILDREN } from '../../../src/constants/itineraryConstants';
import ReadMore from '../../../src/utils/read';
type Props = {}

const toDate = (dateStr: any) => {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day).toDateString().split(' ')
  } else return new Date().toDateString().split(' ')
}

export const DEFAULT_SHORE_EX: any = {
  adults_count: 0,
  children_count: 0,
  infants_count: 0,
  id: '',
  guests: [],
};

export const isAdultDisable = (selected: any, total: any, totalAdultCount: any) => {
  if (selected === total || total === totalAdultCount) {
    return true;
  } else return false;
}
export const isChildrenDisable = (selected: any, total: any, totalChildrenCount: any) => {
  if (selected === total || totalChildrenCount === total) {
    return true;
  } else return false;
}

export default function Offers({ }: Props) {
  const store = GetStore();
  const Itinerary = store.itinerary
  const [shoreEx, setShoreEx] = useState([])
  const [Loading, setLoading] = useState(false)
  const [Inclusive, setInclusive] = useState()
  const [selectedShoreEx, setSelectedShoreEx] = useState<any[]>([]);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalAdult, setTotalAdult] = useState(0);
  const [TotalChildren, setTotalChildren] = useState(0);
  const [SelectedPort, setSelectedPort] = useState();
  const [SelectedGST, setSelectedGST] = useState(0);
  const [TotalItineraryAdult, setTotalItineraryAdult] = useState(0);
  const [TotalItineraryChildren, setTotalItineraryChildren] = useState(0);
  const [totalAdultCount, setTotalAdultCount] = useState<number>(0);
  const [totalChildrenCount, setTotalChildrenCount] = useState<number>(0);

  const start_date = Itinerary?.start_date

  let navigate = useNavigate()

  const [getShoreEx] = useGetShoreExMutation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (store && store?.rooms && store?.itinerary) {
      setLoading(true)
      const _payload = { id: store.itinerary.itinerary_id };
      getShoreEx(_payload)
        .unwrap()
        .then((res: any) => {
          setLoading(false)
          if (res.ports && res.ports.length) {
            setShoreEx(res.ports);
          } else {
            navigate('/offers')
          }
        })
        .catch((res: any) => {
          console.log('Error: ', res)
        })
    }
  }, [])

  useEffect(() => {
    setSelectedPort(shoreEx[0]?.port_name)
    setSelectedGST(shoreEx[0]?.gst_pct)
  }, [shoreEx])

  useEffect(() => {
    let adult = 0
    let children = 0

    store.rooms.forEach((v) => {
      adult += v.adults;
      children += v.children;
    });

    setTotalItineraryAdult(adult)
    setTotalItineraryChildren(children)
  }, [store])

  useEffect(() => {
    if (selectedShoreEx) {
      let sum = 0;
      let adult = 0
      let children = 0

      selectedShoreEx.forEach((v) => {
        sum = v.amount + (v.amount * SelectedGST);
        adult += v.adults_count;
        children += v.children_count;
      });
      setTotalAdult(adult)
      setTotalChildren(children)
      setTotalAmount(sum)
    }
  }, [selectedShoreEx])


  const InclusiveDetail = () => {
    if (Inclusive) {
      // return Inclusive.terms.map((v: any, i: any) =>
      //   <div className='flex items-center mb-2' key={i}>
      //     <img className='mr-2 h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
      //     <p className='text-sm font-semibold'>{v}</p>
      //   </div>
      // )
      let x = Inclusive.terms[0].split('_');
      return x.map((v, i) =>
        <div className='flex mb-2'>
          <img className='mr-2 h-4 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
          <p className='text-sm font-semibold'>{v}</p>
        </div>
      )
    }
  }

  const onRoomChange = (type: string, index: number, value?: string) => {
    let Room = selectedShoreEx
    let selectedRoom = Room?.find((o: any) => o.id === value?.id);
    let indexs = Room.findIndex(x => x.id === value?.id);
    // debugger
    let totalAdultsCount = totalAdultCount
    let totalChildrensCount = totalChildrenCount
    switch (type) {
      case ADD_ADULT:
        if (selectedRoom) {
          totalAdultsCount = totalAdultsCount + 1;
          Room[indexs].adults_count = Room[indexs].adults_count + 1;
          Room[indexs].amount = Room[indexs].amount + value?.adult_price
          setSelectedShoreEx([...Room]);
          setTotalAdultCount(totalAdultsCount);
        } else {
          totalAdultsCount = totalAdultsCount + 1;
          Room.push({
            id: value?.id,
            adults_count: 1,
            children_count: 0,
            infants_count: 0,
            guest: [],
            amount: value?.adult_price
          });
          setTotalAdultCount(totalAdultsCount);
          setSelectedShoreEx([...Room]);
        }
        break;
      case REMOVE_ADULT:
        if (Room[indexs].adults_count > 0) {
          if (Room[indexs].adults_count > 1) {
            totalAdultsCount = totalAdultsCount - 1;
            Room[indexs].adults_count = Room[indexs].adults_count - 1;
            Room[indexs].amount = Room[indexs].amount - value?.adult_price
            setTotalAdultCount(totalAdultsCount);
            setSelectedShoreEx([...Room]);
          } else {
            totalAdultsCount = totalAdultsCount - 1;
            Room.splice(indexs, 1);
            setTotalAdultCount(totalAdultsCount);
            setSelectedShoreEx([...Room]);
            setTotalChildrenCount(0)
          }
        }
        break;

      case ADD_CHILDREN:
        if (selectedRoom) {
          totalChildrensCount = totalChildrensCount + 1;
          Room[indexs].children_count = Room[indexs].children_count + 1;
          Room[indexs].amount = Room[indexs].amount + value?.child_price
          setSelectedShoreEx([...Room]);
          setTotalChildrenCount(totalChildrensCount)
        }
        break;
      case REMOVE_CHILDREN:
        if (Room[indexs].children_count > 0) {
          totalChildrensCount = totalChildrensCount - 1;
          Room[indexs].children_count = Room[indexs].children_count - 1;
          Room[indexs].amount = Room[indexs].amount - value?.child_price
          setSelectedShoreEx([...Room]);
          setTotalChildrenCount(totalChildrensCount)
        }
        break;
    }
  }

  const ShoreExcursion = () => {
    let indexsss = shoreEx.findIndex(x => x.port_name === SelectedPort);
    return (
      <div className='grid grid-cols-1'>
        {shoreEx[indexsss]?.shore_excursions ? shoreEx[indexsss]?.shore_excursions.map((v: any, i: number) => {
          console.log('cccc', v);

          let selectedRoom = selectedShoreEx?.find((o: any) => o.id === v.id);
          return (
            <div className='shadow rounded-md mb-4 relative grid grid-cols-5' key={i}>
              <div className='lg:col-span-2 col-span-5 shore-ex grid grid-cols-9'>
                <div className='col-span-4 lg:col-span-9'>
                  <Glider
                    hasArrows
                    hasDots
                    scrollLock
                    slidesToShow={1}
                  >
                    {v.images.map((v: any, i: number) =>
                      <img className='w-full h-full min-h-[230px] lg:min-h-[370px]' src={v} />
                    )}
                  </Glider>
                </div>
                <div className='col-span-5 lg:hidden px-3'>
                  <p className='text-sm font-bold'>{v.title}</p>
                  <div className='mt-2'>
                    <ReadMore text={v.description} />
                  </div>
                </div>
              </div>
              <div className='lg:col-span-3 col-span-5 pb-3 lg:pt-3 pt-0'>
                <div className='col-span-2 px-4 hidden lg:block'>
                  <p className='text-base font-bold'>{v.title}</p>
                  <div className=''>
                    <ReadMore text={v.description} />
                  </div>
                </div>
                <div className='border-b col-span-10 border-gray-100/20 lg:mb-3 mb-1 lg:mt-3 mt-0' />
                <div className='grid grid-cols-2 px-4'>
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-gray-500">Adult</p>
                    <p className="text-xxs font-semibold text-gray-200">12 & Above</p>
                    <div className="flex items-center ">
                      <button disabled={selectedRoom && selectedRoom?.adults_count > 0 ? false : true}
                        onClick={() => onRoomChange(REMOVE_ADULT, i, v)}
                        className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <p className="text-base mr-3 font-bold">{selectedRoom?.adults_count || 0}</p>
                      <button disabled={isAdultDisable(selectedRoom?.adults_count, TotalItineraryAdult, totalAdultCount)}
                        onClick={() => onRoomChange(ADD_ADULT, i, v)}
                        className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-gray-500">Children</p>
                    <p className="text-xxs font-semibold text-gray-200">
                      2 Years - 12 Years
                    </p>
                    <div className="flex items-center ">
                      <button disabled={selectedRoom && selectedRoom?.children_count > 0 || selectedRoom?.children_count ===
                        TotalItineraryChildren ? false : true}
                        onClick={() => onRoomChange(REMOVE_CHILDREN, i, v)}
                        className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <p className="text-base mr-3 font-bold">{selectedRoom?.children_count || 0}</p>
                      <button disabled={isChildrenDisable(selectedRoom?.children_count || 0, TotalItineraryChildren,
                        totalChildrenCount)} onClick={() => onRoomChange(ADD_CHILDREN, i, v)}
                        className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {!v.children_allowed ?
                  <div className='px-4 mt-2 flex items-center'>
                    <img className='h-4 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/child-not-allowed-icon.svg" alt="" />
                    <p className='text-xs underline font-semibold'>Child below 12 years are not allowed</p>
                  </div>
                  : null
                }
                <div className='border-b col-span-10 border-gray-100/20 lg:mb-2 lg:my-3 my-2 mb-1' />
                <div className='px-4'>
                  <div className='flex justify-between items-center'>
                    <p className='text-xs font-semibold'>Transferred by: <span
                      className='text-brand-primary font-bold'>{v.transfer_types[0].name}</span></p>
                    <p className='text-sm font-bold'>₹ {v.adult_price} / Adult</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-xs font-semibold'>Capicity: <span>{v.remaining_capacity}/{v.total_capacity}</span></p>
                    <p className='text-sm font-bold'>₹ {v.child_price} / Children</p>
                  </div>
                  {/* <div className='mb-3 mt-5'>
                    <p className='rounded-md font-semibold cursor-pointer text-white bg-brand-primary inline px-3 py-2  text-sm' onClick={() => setInclusive(v)}
                    >Inclusions</p>
                  </div> */}
                  <div className='lg:mt-3 mt-1 flex'>
                    <p className='font-semibold cursor-pointer text-brand-primary text-sm' onClick={() => setInclusive(v)}
                    >Tour Instructions</p>
                    <img className='w-4 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          )
        }
        ) : null}
      </div>
    );
  }

  const proceedToOffer = () => {
    SaveStore({ ...store, shore_excursions: selectedShoreEx, shoreExcursionFare: TotalAmount });
    navigate('/offers')
  }

  const skip = () => {
    navigate('/offers')
  }

  const changeSelectedPort = (val) => {
    setSelectedPort(val.port_name)
    setSelectedGST(val.gst_pct)
  }

  const ShoreExcursionHeader = () => {
    return (
      <div>
        {shoreEx?.length ? shoreEx.map((val: any, i: number) => {
          return (
            <button
              onClick={() => changeSelectedPort(val)}
              className={`lg:text-base text-xs font-bold border-2 py-2.5 px-5 mr-1 rounded ${SelectedPort === val.port_name ? 'text-white border-brand-primary bg-brand-primary' : 'text-brand-primary border-brand-primary'}`}
            // className=' text-brand-primary border-brand-primary '
            >
              {val.port_name}
            </button>
          )
        }) : null}
      </div>
    )
  }

  if (Loading) {
    return <p>Loading...</p>
  }

  let indexsss = shoreEx.findIndex(x => x.port_name === SelectedPort);
  return (
    <Layout>
      <main className="container mx-auto py-16 lg:pt-36 lg:pb-28 relative grid grid-cols-3">
        <div className="mx-4 lg:pb-0 lg:py-0 lg:col-span-1 hidden lg:block w-full mb-[18rem] md:mb-72">
          <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-2 fixed lg:sticky lg:top-40 lg:bottom-40 lg:mb-3.5 bg-white z-10 lg:z-0 w-full left-0 lg:left-auto border-gray-200/20  lg:w-10/12'>
            <div className='grid grid-cols-10 px-4 lg:pt-6 pb-0 pt-5'>
              <div className='col-span-10 lg:col-span-10'>
                <div className='flex items-center'>
                  <img
                    src="assets/icons/footer/chevon-down.svg"
                    alt="arrow"
                    onClick={() => navigate('/offers')}
                    className={`mt-1 col-span-1 mr-2 bg-brand-primary h-4 w-4 p-1 rounded-full rotate-90 lg:hidden`}
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

                <div className='flex mt-2'>
                  <div className='flex mr-5'>
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
              <div className=' border-b-2 col-span-10 mt-4 mb-2 border-gray-100/20' />
              <div className='col-span-10 lg:col-span-10'>
                <div className='flex items-center justify-between'>
                  <p className="text-lg font-semibold">
                    Total Fare
                  </p>
                  <p className="text-lg font-semibold text-brand-primary">
                    {`₹ ${store.totalCabinFare}`}
                  </p>
                </div>
                {TotalAmount ?
                  <>
                    <div className='flex items-center justify-between mt-2'>
                      <p className="text-lg font-semibold">
                        Shore Excursions
                      </p>
                      <p className="text-lg font-semibold">
                        {`₹ ${TotalAmount}`}
                      </p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className="text-xs font-semibold text-gray-800">
                        (Inc GST)
                      </p>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <p className="text-sm font-semibold text-gray-800">
                        Adult x {TotalAdult}, Children x {TotalChildren}
                      </p>
                    </div>
                  </>
                  : null
                }
              </div>
              <div className='col-span-10 lg:col-span-10 mt-3 mb-4'>
                <button onClick={() => proceedToOffer()} className="text-white bg-brand-primary font-semibold px-8 py-3 rounded w-full">
                  Continue to Book
                </button>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:mt-2 bg-brand-sky/5 px-2 py-2'>
              <p className='text-xs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
            </div>
          </div>
        </div>
        <div className="mx-4 mb-4 lg:col-span-2 col-span-3 lg:mt-0 ">
          <div className="mt-4 lg:mt-0 flex justify-between items-center">
            <h1 className="text-xl font-bold lg:text-3xl">
              Explore Shore Excursions
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
          <div className='py-3 pb-4'>
            <ShoreExcursionHeader />
          </div>
          <div className='grid grid-cols-1'>
            {shoreEx[indexsss]?.shore_excursions ? shoreEx[indexsss]?.shore_excursions.map((v: any, i: number) => {
              console.log('cccc', v);

              let selectedRoom = selectedShoreEx?.find((o: any) => o.id === v.id);
              return (
                <div className='shadow rounded-md mb-4 relative grid grid-cols-5' key={i}>
                  <div className='lg:col-span-2 col-span-5 shore-ex grid grid-cols-9'>
                    <div className='col-span-4 lg:col-span-9'>
                      <Glider
                        hasArrows
                        hasDots
                        scrollLock
                        slidesToShow={1}
                      >
                        {v.images.map((v: any, i: number) =>
                          <img className='w-full h-full min-h-[230px] lg:min-h-[370px]' src={v} />
                        )}
                      </Glider>
                    </div>
                    <div className='col-span-5 lg:hidden px-3'>
                      <p className='text-sm font-bold'>{v.title}</p>
                      <div className='mt-2'>
                        <ReadMore text={v.description} />
                      </div>
                    </div>
                  </div>
                  <div className='lg:col-span-3 col-span-5 pb-3 lg:pt-3 pt-0'>
                    <div className='col-span-2 px-4 hidden lg:block'>
                      <p className='text-base font-bold'>{v.title}</p>
                      <div className=''>
                        <ReadMore text={v.description} />
                      </div>
                    </div>
                    <div className='border-b col-span-10 border-gray-100/20 lg:mb-3 mb-1 lg:mt-3 mt-0' />
                    <div className='grid grid-cols-2 px-4'>
                      <div>
                        <p className="text-xs lg:text-sm font-semibold text-gray-500">Adult</p>
                        <p className="text-xxs font-semibold text-gray-200">12 & Above</p>
                        <div className="flex items-center ">
                          <button disabled={selectedRoom && selectedRoom?.adults_count > 0 ? false : true}
                            onClick={() => onRoomChange(REMOVE_ADULT, i, v)}
                            className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <p className="text-base mr-3 font-bold">{selectedRoom?.adults_count || 0}</p>
                          <button disabled={isAdultDisable(selectedRoom?.adults_count, TotalItineraryAdult, totalAdultCount)}
                            onClick={() => onRoomChange(ADD_ADULT, i, v)}
                            className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm font-semibold text-gray-500">Children</p>
                        <p className="text-xxs font-semibold text-gray-200">
                          2 Years - 12 Years
                        </p>
                        <div className="flex items-center ">
                          <button disabled={selectedRoom && selectedRoom?.children_count > 0 || selectedRoom?.children_count ===
                            TotalItineraryChildren ? false : true}
                            onClick={() => onRoomChange(REMOVE_CHILDREN, i, v)}
                            className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded mr-3 bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <p className="text-base mr-3 font-bold">{selectedRoom?.children_count || 0}</p>
                          <button disabled={isChildrenDisable(selectedRoom?.children_count || 0, TotalItineraryChildren,
                            totalChildrenCount)} onClick={() => onRoomChange(ADD_CHILDREN, i, v)}
                            className="w-5 h-5 lg:w-7 lg:h-7 leading-none text-white rounded bg-brand-primary disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    {!v.children_allowed ?
                      <div className='px-4 mt-2 flex items-center'>
                        <img className='h-4 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/child-not-allowed-icon.svg" alt="" />
                        <p className='text-xs underline font-semibold'>Child below 12 years are not allowed</p>
                      </div>
                      : null
                    }
                    <div className='border-b col-span-10 border-gray-100/20 lg:mb-2 lg:my-3 my-2 mb-1' />
                    <div className='px-4'>
                      <div className='flex justify-between items-center'>
                        <p className='text-xs font-semibold'>Transferred by: <span
                          className='text-brand-primary font-bold'>{v.transfer_types[0].name}</span></p>
                        <p className='text-sm font-bold'>₹ {v.adult_price} / Adult</p>
                      </div>
                      <div className='flex justify-between items-center'>
                        <p className='text-xs font-semibold'>Capicity: <span>{v.remaining_capacity}/{v.total_capacity}</span></p>
                        <p className='text-sm font-bold'>₹ {v.child_price} / Children</p>
                      </div>
                      {/* <div className='mb-3 mt-5'>
                    <p className='rounded-md font-semibold cursor-pointer text-white bg-brand-primary inline px-3 py-2  text-sm' onClick={() => setInclusive(v)}
                    >Inclusions</p>
                  </div> */}
                      <div className='lg:mt-3 mt-1 flex'>
                        <p className='font-semibold cursor-pointer text-brand-primary text-sm' onClick={() => setInclusive(v)}
                        >Tour Instructions</p>
                        <img className='w-4 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            ) : null}
          </div>
        </div>
        {TotalAdult ?
          <div className='fixed w-full bottom-3 z-50 px-4 lg:hidden'>
            <div className='grid grid-cols-5 bg-white px-3 py-3 rounded shadow-md border border-gray-400'>
              <div className='col-span-3'>
                <p className='text-brand-primary text-sm font-bold'>Total Fare: ₹ {TotalAmount + store.totalCabinFare} </p>
                <p className='text-xs font-semibold'>Adult x {TotalAdult}, Children x {TotalChildren}</p>
              </div>
              <div className='col-span-2'>
                <button
                  onClick={() => proceedToOffer()}
                  className="text-white bg-brand-primary font-semibold px-4 py-2 rounded w-full">
                  Continue
                </button>
              </div>
            </div>
          </div>
          : null}
      </main>

      <Modal show={Inclusive} align={'center'} className="max-h-[60%] h-full drop-shadow bg-white w-[90%] lg:w-2/4 center bottom-2/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => setInclusive()}>
        <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
          <h1 className='text-lg font-semibold'>Tour Instructions</h1>
          <svg
            onClick={() => setInclusive()}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-black cursor-pointer"
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
        <div className='px-6 pb-3 lg:h-[98%] h-[82%] overflow-y-scroll'>
          <InclusiveDetail />
          {/* <div className='py-3 border-t mt-3'>
            <div className='flex items-center mt-1'>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                className="h-4 mr-1 lg:h-4"
                alt="Cruise"
              />
              <p className='font-bold'>Duration: {Inclusive?.hours} Hours {Inclusive?.minutes} Minutes</p>
            </div>
          </div> */}
        </div>
      </Modal>
    </Layout>
  );
}