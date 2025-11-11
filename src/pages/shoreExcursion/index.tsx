import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../src/components/Layout';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { GetStore, SaveStore } from '../../../src/utils/store/store';
import { useUpdateShoreExcursionMutation } from '../../../src/services/itinerary/itinerary';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import Modal from '../../../src/components/UI/ModalCenter';
import { ADD_ADULT, ADD_CHILDREN, REMOVE_ADULT, REMOVE_CHILDREN } from '../../../src/constants/itineraryConstants';
import ReadMore from '../../../src/utils/read';
import { FormatAmount, FormatPrice } from '../../utils/formatter/formatter';
import "./index.css"
import ShoreExcursionHeader from './shoreExHeader';
// @ts-ignore
import { TiggerGAAddToCartCabin, TiggerGAViewItem } from '/src/components/Analytics/events';
import Button from '../../components/UI/Button';

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
  const GAStore = store.GAData
  const [shoreEx, setShoreEx] = useState([])
  const [tempShoreEx, setTempShoreEx] = useState([])
  const [Loading, setLoading] = useState(false)
  const [SelectedPort, setSelectedPort] = useState();
  const [SelectedGST, setSelectedGST] = useState(0);
  const [activePortIndex, setActivePortIndex] = useState(0);
  const [Inclusive, setInclusive] = useState('')
  const [guestModal, setGuestModal] = useState(false)
  const [selectedShoreEx, setSelectedShoreEx] = useState<undefined>();
  const [selectedShoreExIndex, setSelectedShoreExIndex] = useState();
  const [shoreExAmount, setShoreExAmount] = useState([]);
  const [breakupModal, setBreakupModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateShoreExcursion] = useUpdateShoreExcursionMutation()
  const start_date = Itinerary?.start_date
  const end_date = Itinerary?.end_date

  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (breakupModal || guestModal)
      document.body.classList.add('!overflow-hidden');
    else document.body.classList.remove('!overflow-hidden');
  }, [breakupModal, guestModal]);

  useEffect(() => {
    if (store && store?.rooms && store?.itinerary) {
      let res = store?.shore_excursions;
      let newArray = []
      if (res?.guest_updated) {
        newArray = res.ports
      } else {
        let bookingGuest = store?.booking?.guests;
        let adult = bookingGuest?.adults?.map((v: any) => {
          return {
            guest_id: v.id,
            selected: false,
            port_id: null,
            port_code: null,
            shore_ex_id: null,
            name: v?.name
          }
        })
        let children = bookingGuest?.children?.map((v: any) => {
          return {
            selected: false,
            port_id: null,
            port_code: null,
            shore_ex_id: null,
            guest_id: v.id,
            name: v?.name
          }
        })
        newArray = res.ports.map((item: any) => {
          return {
            ...item,
            shore_excursions: item?.shore_excursions.map((excursion: any) => {
              return {
                ...excursion,
                adult_count: 0,
                children_count: 0,
                adults: adult,
                children: children,
              };
            })
          };
        });
      }

      setShoreEx(JSON.parse(JSON.stringify(newArray)));
      setTempShoreEx(newArray);
    }
  }, [])

  useEffect(() => {
    let val = shoreEx[activePortIndex]
    setSelectedPort(val?.port_name)
    setSelectedGST(val?.gst_pct)
  }, [activePortIndex, shoreEx])

  useEffect(() => {
    if (!SelectedPort) {
      setSelectedPort(tempShoreEx[0]?.port_name)
      setSelectedGST(tempShoreEx[0]?.gst_pct)
    }
  }, [tempShoreEx])

  const changeSelectedPort = (val: any) => {
    setSelectedPort(val.port_name)
    setSelectedGST(val.gst_pct)
  }

  const InclusiveDetail = () => {
    if (Inclusive) {
      let x = Inclusive.terms[0].split('_');
      return x.map((v: any, i: any) =>
        <div className='flex mb-2'>
          <img className='mr-2 h-4 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
          <p className='text-sm font-semibold'>{v}</p>
        </div>
      )
    }
  }

  if (Loading) {
    return <p>Loading...</p>
  }

  const onSelectGuest = (portIndex: any, shoreExIndex: any) => {

    let shore = shoreEx[portIndex]?.shore_excursions[shoreExIndex];
    let GAItem = {
      item_id: shore.id,
      item_name: shore.title,
      item_category: shore.adult_price + ' adult price',
      item_category2: shore.child_price + ' childen price',
      item_category3: shore.code,
      item_list_name: shore.description,
      item_variant: 'shore excursion',
      price: 0,
    }

    const GADataShore = {
      currency: "INR",
      value: FormatAmount(Math.round(store.booking.sub_total) + shoreExAmount.adult + shoreExAmount.children),
      items: GAItem
    }

    TiggerGAViewItem(GADataShore)

    setGuestModal(true);
    setSelectedShoreEx(shoreEx[portIndex].shore_excursions[shoreExIndex]);
    setSelectedShoreExIndex(shoreExIndex);
  }

  let indexsss = shoreEx.findIndex((x: any) => x.port_name === SelectedPort);

  const onSelectShoreEx = (selected: any, v: any, guestindex: any, guestType: any) => {
    let excursions = tempShoreEx
    const updatedExcursions: any = excursions.map((item: any, id: any) => {
      if (id === indexsss) {
        const updatedShoreExcursions = item.shore_excursions.map((excursion: any, idx: any) => {
          const updatedAdults = excursion[guestType].map((adult: any, i: any) => {
            if (i === guestindex) {
              if (idx === selectedShoreExIndex) {
                if (selected) {
                  if (guestType == 'adults') {
                    excursion.adult_count = excursion.adult_count + 1
                  }
                  if (guestType == 'children') {
                    excursion.children_count = excursion.children_count + 1
                  }
                } else {
                  if (guestType == 'adults') {
                    excursion.adult_count = excursion.adult_count - 1
                  }
                  if (guestType == 'children') {
                    excursion.children_count = excursion.children_count - 1
                  }
                }
                return { ...adult, selected: selected, shore_ex_id: selected ? selectedShoreEx.id : null, port_code: selected ? selectedShoreEx.code : null };
              } else {
                return { ...adult, selected: selected, port_code: selected ? selectedShoreEx.code : null };
              }
            }
            return adult;
          });
          return { ...excursion, [guestType]: updatedAdults };
        });
        return { ...item, shore_excursions: updatedShoreExcursions };
      }
      return item;
    });
    setTempShoreEx(updatedExcursions)
    let selec = updatedExcursions[indexsss].shore_excursions[selectedShoreExIndex];
    setSelectedShoreEx(selec);
  }

  const onSelectAll = (selected: any, guestType: any) => {
    let excursions = tempShoreEx;
    const updatedExcursions: any = excursions.map((item: any, id: any) => {
      if (id === indexsss) {
        const updatedShoreExcursions = item.shore_excursions.map((excursion: any, idx: any) => {
          const updatedAdults = excursion[guestType].map((adult: any, i: any) => {
            if (idx === selectedShoreExIndex) {
              if (!selected && !adult.shore_ex_id) {

              } else {
                if (selected) {
                  if (!adult.selected) {
                    if (guestType == 'adults') {
                      excursion.adult_count = excursion.adult_count + 1
                    }
                    if (guestType == 'children') {
                      excursion.children_count = excursion.children_count + 1
                    }
                  }
                }
                else {
                  if (guestType == 'adults') {
                    excursion.adult_count = excursion.adult_count - 1
                  }
                  if (guestType == 'children') {
                    excursion.children_count = excursion.children_count - 1
                  }
                }

                return { ...adult, selected: selected, shore_ex_id: selected && !adult.selected ? selectedShoreEx.id : null, port_code: selected ? selectedShoreEx.code : null };
              }
            }
            else {
              if (!adult.shore_ex_id) {
                return { ...adult, selected: selected, port_code: selected ? selectedShoreEx.code : null };
              }
            }
            return adult;
          });
          return { ...excursion, [guestType]: updatedAdults };
        });
        return { ...item, shore_excursions: updatedShoreExcursions };
      }
      return item;
    });
    setTempShoreEx(updatedExcursions)
    let selec = updatedExcursions[indexsss].shore_excursions[selectedShoreExIndex];
    setSelectedShoreEx(selec);
  }


  useEffect(() => {
    if (shoreEx) {
      let a: any = {
        'port_code': [],
        'adult': 0,
        'children': 0,
      }
      shoreEx.map((port, idx) => {
        port.shore_excursions.map((ex, idxx) => {
          if (ex.adult_count || ex.children_count) {
            let ab = {
              code: ex.code,
              adult: ex.adult_count,
              children: ex.children_count
            }
            a.port_code.push(ab)
            a.adult = a.adult + (ex.adult_price * ex.adult_count)
            a.children = a.children + (ex.child_price * ex.children_count)
          }
        })
      })
      setShoreExAmount(a)
    }
  }, [shoreEx])


  const proceedToPayment = async () => {
    let GAItem = JSON.parse(JSON.stringify(GAStore));

    const transformedShoreEx = shoreEx?.flatMap((item: any) =>
      item.shore_excursions.flatMap((excursion: any) =>
        [...excursion.adults, ...excursion.children].reduce((acc, entry) => {
          if (entry.shore_ex_id !== null) {
            const foundShoreEx = acc.find((a: any) => a.id === entry.shore_ex_id);
            if (foundShoreEx) {
              foundShoreEx.guests.push({ id: entry.guest_id });
            } else {
              acc.push({
                id: entry.shore_ex_id,
                guests: [{ id: entry.guest_id }],
              });
            }
          }
          return acc;
        }, [])
      )
    );

    if (transformedShoreEx.length) {
      shoreEx.map((port, idx) => {
        port.shore_excursions.map((ex, idxx) => {
          if (ex.adult_count || ex.children_count) {
            let data = {
              item_id: ex.id,
              item_name: ex.title,
              item_category: ex.adult_count + ' adult',
              item_category2: ex.children_count + ' children',
              item_category3: ex.code,
              item_list_name: ex.description,
              item_variant: 'shore excursion',
              price: (ex.adult_count ? ex.adult_price * ex.adult_count : 0) + (ex.children_count ? ex.child_price * ex.children_count : 0),
            }
            GAItem.push(data)
          }
        })
      })

      const GADataShore = {
        currency: "INR",
        value: FormatAmount(Math.round(store.booking.sub_total) + shoreExAmount.adult + shoreExAmount.children),
        items: GAItem
      }

      TiggerGAAddToCartCabin(GADataShore)
    }

    let _payload = {
      id: store?.booking?.id,
      data: {
        shore_excursions: transformedShoreEx
      }
    };

    await updateShoreExcursion(_payload)
      .unwrap()
      .then((res: any) => {
        let updatedShoreEx = store?.shore_excursions;
        updatedShoreEx.guest_updated = true
        updatedShoreEx.ports = shoreEx

        SaveStore({ ...store, shore_excursions: updatedShoreEx, GADataShoreEx: GAItem });
        navigate('/payment-summary?booking_id=' + store?.booking?.id)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const skip = () => {
    navigate('/payment-summary?booking_id=' + store?.booking?.id)
  }

  // const ShoreExcursionHeader = () => {
  //   return (
  //     <div>
  //       {shoreEx?.length ? shoreEx.map((val: any, i: number) => {
  //         return (
  //           <button
  //             onClick={() => changeSelectedPort(val)}
  //             className={`lg:text-base text-xs font-bold border-2 py-2.5 px-5 mr-1 rounded ${SelectedPort === val.port_name ? 'text-white border-brand-primary bg-brand-primary' : 'text-brand-primary border-brand-primary'}`}
  //           >
  //             {val.port_name}
  //           </button>
  //         )
  //       }) : null}
  //     </div>
  //   )
  // }

  const saveGuestSelection = () => {
    setGuestModal(false)
    setShoreEx(JSON.parse(JSON.stringify(tempShoreEx)))
  }

  const cancelGuestSelection = () => {
    setGuestModal(false)
    setTempShoreEx(JSON.parse(JSON.stringify(shoreEx)))
  }

  const portList = Itinerary?.ports
    .filter((val: any) => val.name !== 'At Sea')
    .map((val: any) => val.name)
    .join(' | ');

  const isLong = portList?.length > 150;

  return (
    <Layout>
      <div className='bg-gray-100/5'>
        <main className="container mx-auto py-16 lg:pt-36 lg:pb-28 relative grid grid-cols-3 gap-4">
          <div className="mx-4 lg:pb-0 lg:py-0 lg:col-span-1 hidden lg:block w-full mb-[18rem] md:mb-72">
            <div className='fixed lg:sticky lg:top-36 lg:bottom-40 left-0 lg:left-auto'>
              <div className='mb-12 flex items-center cursor-pointer' onClick={() => navigate(-1)}>
                <img
                  src="assets/icons/footer/chevon-down-black.svg"
                  alt="arrow"
                  className={`rotate-90 mr-2 mt-0.5 h-3`}
                />
                <h1 className="text-xl font-bold lg:text-2xl ">
                  Explore Shore Excursions
                </h1>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-none lg:mb-3.5 bg-white z-10 lg:z-0 w-full lg:w-11/12 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_7px_2px] rounded-lg'>
                <div className='grid grid-cols-10 lg:pt-6 pb-0 pt-5'>
                  <div className='px-4 col-span-10 lg:col-span-10'>
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
                    <div className='border-b col-span-10 my-3 border-gray-100/20' />
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
                    <div className='border-b col-span-10 my-3 border-gray-100/20' />
                    <div className='flex'>
                      <div className='flex items-center'>
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                          className="h-3 mr-1 mt-0.5 lg:h-4"
                          alt="Cruise"
                        />
                        <p className="text-xs lg:text-base font-semibold">
                          {toDate(start_date)[2]} {toDate(start_date)[1]} {toDate(start_date)[3]}
                        </p>
                      </div>
                      <div className='mx-3'>
                        <p className='text-xl'>-</p>
                      </div>
                      <div className='flex items-center justify-end'>
                        <p className="text-xs lg:text-base font-semibold">
                          {toDate(end_date)[2]} {toDate(end_date)[1]} {toDate(end_date)[3]}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3">
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
                  <div className=' border-b col-span-10 mt-4 mb-2 border-gray-100/20' />
                  <div className='px-4 col-span-10 lg:col-span-10 mt-3'>
                    <div className='flex flex-col  justify-between'>
                      <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                        Total Cabins Fare
                      </p>
                      <div>
                        {Itinerary?.discount_pct != 0 ?
                          <p className="text-xs text-right lg:text-left lg:text-base font-semibold text-gray-200 line-through">
                            {`₹ ${FormatAmount(store.booking.actual_sub_total)}`}
                          </p>
                          : null
                        }
                        {store?.booking?.payment_option_rule ?
                          <div>
                            <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                              {`₹ ${FormatAmount(store.booking.sub_total * 0.25)}`}
                            </p>
                            <p className="text-danger text-xs lg:text-sm">{`Due Amount ₹ ${FormatAmount(store.booking.sub_total * 0.75)}`}</p>
                          </div>
                          :
                          <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                            {`₹ ${FormatAmount(store.booking.sub_total)}`}
                          </p>
                        }
                      </div>
                    </div>
                    {shoreExAmount?.port_code?.length ?
                      <div>
                        <div className='flex items-center justify-between mt-2'>
                          <p className="text-sm font-semibold">
                            Shore Excursions
                          </p>
                          <p className="text-sm font-semibold">
                            {`₹ ${shoreExAmount.adult + shoreExAmount.children}`}
                          </p>
                        </div>
                        {shoreExAmount?.port_code.map((x, i) =>
                          <div key={i} className='flex items-center justify-between mt-2'>
                            <p className="text-sm font-semibold">
                              {x.code} : <span className='text-gray-100 text-sm'>Adult x {x.adult}, Children x {x.children}</span>
                            </p>
                          </div>
                        )}

                      </div>
                      : null}
                  </div>
                </div>
                <div className='grid grid-cols-1 lg:mt-4 bg-brand-sky/5 px-2 py-2'>
                  <p className='text-xs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
                </div>
                {shoreExAmount?.port_code?.length ?
                  <div>
                    <div className='flex items-center justify-between px-4 py-4'>
                      <p className="text-lg font-bold">
                        Total Fare
                      </p>
                      <div>
                        <p className="text-lg font-bold text-brand-primary">
                          {`₹ ${Math.round(store.booking.sub_total * (store?.booking?.payment_option_rule ? 0.25 : 1)) + Math.round(shoreExAmount.adult) + Math.round(shoreExAmount.children)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  : null}
              </div>
            </div>
          </div>


          <div className="mx-4 mb-4 lg:col-span-2 col-span-3 lg:mt-0 ">
            <div className="mt-4 lg:mt-0 flex justify-end items-center">
              {/* <button onClick={() => proceedToPayment()} className="text-white hidden lg:block bg-brand-primary font-semibold px-10 py-3.5 rounded mr-7 text-sm">
                Continue
              </button> */}
              <Button text='Continue' handleClick={() => proceedToPayment()} className='mr-7 hidden lg:block' />
              <div className="cursor-pointer flex justify-between items-center w-full lg:w-auto">
                <div className='flex items-center lg:hidden' onClick={() => navigate(-1)}>
                  <img src="assets/icons/footer/chevon-down-black.svg" className='rotate-90 mr-2 mt-0.5' alt="" />
                  <h1 className="text-lg font-medium">
                    Explore Shore Excursions
                  </h1>
                </div>
                <p className="text-sm mr-2 font-semibold underline lg:text-base" onClick={() => skip()}>
                  Skip
                </p>
              </div>
            </div>
            <div className='mt-6 lg:mt-8'>
              <div className=''>
                <ShoreExcursionHeader ports={shoreEx} callback={(e) => setActivePortIndex(e)} />
              </div>
              <div className='bg-white top-shadow1'>
                <div className='grid grid-cols-1 lg:px-8 pt-6 lg:pt-8'>
                  {shoreEx[indexsss]?.shore_excursions ? shoreEx[indexsss]?.shore_excursions.map((v: any, i: number) => {
                    const adu = v?.adults?.every(adult => adult.selected === true)
                    const chil = v?.children?.every(children => children.selected === true)
                    return (
                      <div key={i} className='lg:shadow-[rgba(67,_71,_85,_0.25)_0px_0px_0.25em,_rgba(90,_125,_188,_0.05)_0px_0.25em_1em] lg:rounded-md relative grid grid-cols-9 lg:mb-8 border-b border-gray-100/40 lg:border-none mb-6' key={i}>
                        <div className='lg:col-span-4 col-span-9 shore-ex grid grid-cols-9'>
                          <div className='col-span-4 lg:col-span-9 shoreEx'>
                            <Glider
                              hasArrows
                              hasDots
                              scrollLock
                              slidesToShow={1}
                            >
                              {v.images.map((v: any, i: number) =>
                                <img key={i} className='w-full h-full min-h-[230px] lg:min-h-[400px] rounded-l-md' src={v} />
                              )}
                            </Glider>
                          </div>
                          <div className='col-span-5 lg:hidden px-3 py-2'>
                            <h1 className='text-sm font-bold'>{v.title}</h1>
                            <div className='mt-2'>
                              <ReadMore text={v.description} />
                            </div>
                          </div>
                        </div>
                        <div className='lg:col-span-5 col-span-9 pb-3 lg:pt-3 pt-0 relative'>
                          <div className='col-span-2 px-4 hidden lg:block'>
                            <p className='text-base font-bold'>{v.title}</p>
                            <div className='mt-2'>
                              <ReadMore text={v.description} />
                            </div>
                          </div>
                          {!v.children_allowed ?
                            <div className='px-4 lg:mt-3 mb-3 lg:mb-0 flex items-center lg:border-none lg:border-t border-gray-100/20 pt-5 lg:pt-0'>
                              <img className='h-4 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/child-not-allowed-icon.svg" alt="" />
                              <p className='text-xs underline font-semibold'>Child below 12 years are not allowed</p>
                            </div>
                            : null
                          }
                          <div className='lg:absolute lg:bottom-0 lg:right-0 w-full lg:py-4'>
                            <div className='lg:border-b col-span-10 border-gray-100/20 lg:mb-3 mb-1 lg:mt-3 mt-0' />
                            <div className='px-4 py-2 lg:py-0'>
                              <div className='flex justify-between items-center'>
                                <h1 className='text-xs font-semibold'>Transferred by: <span
                                  className='text-brand-primary font-bold'>{v.transfer_types[0]?.name}</span></h1>
                                <p className='text-sm font-bold'>₹ {v.adult_price} / Adult</p>
                              </div>
                              <div className='flex justify-between items-center mt-1 lg:mt-0'>
                                <h1 className='text-xs font-semibold'>Capicity: <span>{v.remaining_capacity}/{v.total_capacity}</span></h1>
                                {v.children_allowed ?
                                  <p className='text-sm font-bold'>₹ {v.child_price} / Children</p>
                                  : null}
                              </div>
                              <div className='flex justify-between items-center mt-3'>
                                <div>
                                  {/* <button
                                    disabled={(adu && chil) && !(v.adult_count || v.children_count) ? true : false}
                                    onClick={() => onSelectGuest(indexsss, i)} className={`border border-brand-primary font-semibold px-6 lg:px-4 py-2.5 rounded text-xs lg:text-sm ${v.adult_count || v.children_count ? 'text-brand-primary' : 'text-white bg-brand-primary'} disabled:bg-brand-primary/50 disabled:border-brand-primary/50`}>
                                    {v.adult_count || v.children_count ? 'View Guest' : 'Select Guests'}
                                  </button> */}
                                  <Button text={v.adult_count || v.children_count ? 'View Guest' : 'Select Guests'} size='sm' type={v.adult_count || v.children_count ? 'secondary' : 'primary'} handleClick={() => onSelectGuest(indexsss, i)} />
                                </div>
                                <div>
                                  <button className="bg-gray-200/20 font-semibold px-4 lg:px-4 py-2 rounded text-xxs">
                                    Adult {v.adult_count}
                                  </button>
                                </div>
                                {v.children_allowed ?
                                  <div>
                                    <button className="bg-gray-200/20 font-semibold px-4 lg:px-4 py-2 rounded text-xxs">
                                      Children {v.children_count}
                                    </button>
                                  </div>
                                  : null}
                              </div>
                              <div className='mt-3 flex'>
                                <p className='font-semibold cursor-pointer text-brand-primary text-xs lg:text-sm' onClick={() => setInclusive(v)}
                                >Tour Instructions</p>
                                <img className='w-4 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }) : null}
                </div>
              </div>
            </div>
          </div>

          <Modal show={!!Inclusive} align={'center'} className="max-h-[60%] h-full drop-shadow bg-white w-[90%] lg:w-2/4 center bottom-2/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => setInclusive()}>
            <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
              <h1 className='text-base font-semibold'>Tour Instructions</h1>
              <svg
                onClick={() => setInclusive('')}
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
            </div>
          </Modal>


          <Modal show={guestModal} align={'center'} className="max-h-[75vh] lg:max-h-[80vh] h-full drop-shadow bg-white w-[90%] lg:w-6/12 center bottom-2/4 rounded-lg lg:rounded-2xl border overflow-hidden left-0 right-0 m-auto" onClose={() => cancelGuestSelection()}>
            <div className='relative h-full'>
              <div className='top-0 w-full'>
                <div className='pt-2 lg:pt-6 pb-2 lg:pb-5 px-4 lg:px-6 flex lg:items-center justify-between'>
                  <h1 className='text-base lg:text-xl font-semibold'>{selectedShoreEx?.title}</h1>
                  <svg
                    onClick={() => cancelGuestSelection()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black cursor-pointer mt-1 lg:mt-0"
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
                <div className='px-4 lg:px-6'>
                  <div className='flex'>
                    <div onClick={() => document.getElementById('adults')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'start'
                    })}
                      className='border lg:border-2 cursor-pointer border-brand-primary px-3 lg:px-5 py-1.5 rounded text-xs lg:text-base text-gray-100 font-semibold'
                      style={{
                        border: 'double 2px transparent',
                        backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                      }}
                    >
                      Adult <span className='text-brand-primary text-sm lg:text-lg font-semibold'>{selectedShoreEx?.adult_count}</span> / {selectedShoreEx?.adults?.length}
                    </div>
                    {selectedShoreEx?.children_allowed ?
                      <div onClick={() => document.getElementById('children')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'start'
                      })}
                        className='border lg:border-2 cursor-pointer border-brand-primary px-5 py-1 lg:py-1.5 rounded text-xs lg:text-base text-gray-100 font-semibold ml-4'
                        style={{
                          border: 'double 2px transparent',
                          backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                        }}
                      >
                        Children <span className='text-brand-primary text-sm lg:text-lg font-semibold'>{selectedShoreEx?.children_count}</span> / {selectedShoreEx?.children.length}
                      </div>
                      : null}
                  </div>
                </div>
                <div className='flex bg-brand-sky/10 px-6 py-1.5 mt-4 mb-3'>
                  <img className='w-4 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                  <p className='text-xs lg:text-sm font-semibold'>Each Guest Is Limited To Selecting A Single Shore Excursion Per Port</p>
                </div>
              </div>
              <div className='pb-3 h-[calc(100%-270px)] overflow-y-scroll'>
                <div id='adults' className='px-4 lg:px-6'>
                  <div className='flex items-center mb-4'>
                    <h1 className='text-lg lg:text-xl font-semibold'>Adult</h1>
                    <div className='flex items-start ml-6'>
                      <input
                        checked={selectedShoreEx?.adults?.every(adult => adult.selected === true)}
                        type="checkbox"
                        className="rounded-sm cursor-pointer w-4 h-4 lg:w-5 lg:h-5 text-brand-primary"
                        onChange={(e) => {
                          onSelectAll(e.target.checked, 'adults')
                        }}
                      />
                      <p className={`text-xs lg:text-sm ml-2 font-medium text-gray-600`}>Select All</p>
                    </div>
                  </div>
                  {selectedShoreEx?.adults.map((v: any, i: number) => {
                    // console.log('roh-all', selectedShoreEx.children_allowed);

                    if (v.shore_ex_id) {
                      return (
                        <div key={i}>
                          <div className='flex items-center mb-3'>
                            <input
                              checked={v.selected}
                              type="checkbox"
                              className="rounded-sm mr-3 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 text-brand-primary"
                              onChange={(e) => {
                                onSelectShoreEx(e.target.checked, v, i, 'adults')
                              }}
                            />
                            <p className={`text-sm lg:text-lg ml-2 font-medium`}>{v?.name} <span className='text-brand-primary font-semibold'>({v.port_code})</span></p>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div>
                          <div className='flex items-center mb-3'>
                            <input
                              disabled={v.selected}
                              checked={v.selected}
                              type="checkbox"
                              className="rounded-sm mr-3 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 disabled:text-brand-primary/40"
                              onChange={(e) => {
                                onSelectShoreEx(e.target.checked, v, i, 'adults')
                              }}
                            />
                            <p className={`text-sm lg:text-lg ml-2 font-medium ${v?.selected ? 'text-gray-100' : ''}`}>{v?.name} {v.port_code && <span className='text-brand-primary font-semibold'>({v.port_code})</span>} </p>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
                {selectedShoreEx?.children_allowed && selectedShoreEx?.children.length ?
                  <div id='children'>
                    <div className='border-b border-gray-100/20 my-6' />
                    <div className='px-4 lg:px-6'>
                      <div className='flex items-center mb-4'>
                        <h1 className='text-lg lg:text-xl font-semibold'>Children</h1>
                        <div className='flex items-start ml-6'>
                          <input
                            checked={selectedShoreEx?.children?.every(adult => adult.selected === true)}
                            type="checkbox"
                            className="rounded-sm cursor-pointer w-4 h-4 lg:w-5 lg:h-5 text-brand-primary"
                            onChange={(e) => {
                              onSelectAll(e.target.checked, 'children')
                            }}
                          />
                          <p className={`text-xs lg:text-sm ml-2 font-medium text-gray-600`}>Select All</p>
                        </div>
                      </div>
                      {selectedShoreEx?.children.map((v: any, i: number) => {
                        if (v.shore_ex_id) {
                          return (
                            <div key={i}>
                              <div className='flex items-center mb-3'>
                                <input
                                  checked={v.selected}
                                  type="checkbox"
                                  className="rounded-sm mr-3 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 text-brand-primary"
                                  onChange={(e) => {
                                    onSelectShoreEx(e.target.checked, v, i, 'children')
                                  }}
                                />
                                <p className={`text-sm lg:text-lg ml-2 font-medium`}>{v?.name} <span className='text-brand-primary font-semibold'>({v.port_code})</span></p>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div>
                              <div className='flex items-center mb-3'>
                                <input
                                  disabled={v.selected}
                                  checked={v.selected}
                                  type="checkbox"
                                  className="rounded-sm mr-3 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 disabled:text-brand-primary/40"
                                  onChange={(e) => {
                                    onSelectShoreEx(e.target.checked, v, i, 'children')
                                  }}
                                />
                                <p className={`text-sm lg:text-lg ml-2 font-medium ${v?.selected ? 'text-gray-100' : ''}`}>{v?.name} {v?.port_code && <span className='text-brand-primary font-semibold'>({v.port_code})</span>} </p>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                  : null}
              </div>
              <div className='absolute bottom-0 py-3 left-0 right-0 text-center border-t border-gray-100/20 bg-white'>
                <Button text='Save' size='base' handleClick={() => saveGuestSelection()} className='px-10' />
              </div>
            </div>
          </Modal>
        </main>
      </div>

      <div className='fixed w-full bottom-0 z-30 lg:hidden'>
        <div className='grid grid-cols-5 bg-white px-4 py-4 shadow-[rgba(0,0,0,0.14)_5px_-2px_5px] border-t border-gray-100/20'>
          <div className='col-span-3 self-center'>
            <p className='text-brand-primary text-base font-bold'>Total Fare: ₹ {FormatAmount(Math.round(store.booking.sub_total * (store?.booking?.payment_option_rule ? 0.25 : 1)) + shoreExAmount.adult + shoreExAmount.children)}</p>
            <div className='flex items-center mt-1'
              onClick={() => {
                setBreakupModal(true)
              }}
            >
              <p className='text-xs font-semibold'>View Price Breakup</p>
              <img
                src="assets/icons/footer/chevon-down-black.svg"
                alt="arrow"
                className={`rotate-180 ml-1 h-1.5`}
              />
            </div>
          </div>
          <div className='col-span-2'>
            <Button text='Continue' size='base' handleClick={() => proceedToPayment()} className='!py-2' />
          </div>
        </div>
      </div>

      <Modal show={breakupModal} align={'center'} className="drop-shadow modal-open bg-white w-full center bottom-0 rounded-lg lg:rounded-2xl border right-0 m-auto absolute" onClose={() => setBreakupModal(false)}>
        <div className='relative h-full'>
          <div onClick={() => setBreakupModal(false)} className='flex items-center justify-center shadow-md absolute -top-4 left-0 right-0 mx-auto bg-white w-10 h-10 rounded-full '>
            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/down-arrow-icon.svg" alt="" />
          </div>
          <div className=''>
            <div className='px-4'>
              <div className='pt-10'>
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
              <div className='border-b my-2 border-gray-100/20' />
                    <div className='flex flex-col items-start'>
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
              {/* <p className=' font-bold text-lg pt-10'>{Itinerary?.ports?.map((port: any, index: number) => {
                return (
                  <span key={index}>
                    <span>{port['name']}</span>
                    {index < Itinerary?.ports.length - 1 && (
                      <span className="mx-1">-</span>
                    )}
                  </span>
                );
              })}</p> */}
              <div className='flex mt-2'>
                <div className='flex items-center'>
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                    className="mr-1 mt-0.5 h-4"
                    alt="Cruise"
                  />
                  <p className="text-base font-semibold">
                    {toDate(start_date)[2]} {toDate(start_date)[1]} {toDate(start_date)[3]}
                  </p>
                </div>
                <div className='mx-3'>
                  <p className='text-xl'>-</p>
                </div>
                <div className='flex items-center justify-end'>
                  <p className="text-base font-semibold">
                    {toDate(end_date)[2]} {toDate(end_date)[1]} {toDate(end_date)[3]}
                  </p>
                </div>
              </div>
              <div className="flex mt-3">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                  className="mr-1 mt-0.5 h-4"
                  alt="Cruise"
                />
                <p className="text-base font-semibold">
                  {`${store?.rooms?.length} Rooms`}
                </p>
              </div>
            </div>
            <div className=' border-b my-5 border-gray-100/20' />
            <div className='px-4 mb-5'>
              <div className='flex items-center justify-between'>
                <p className="font-semibold">
                  Total Cabins Fare
                </p>

                {store?.booking?.payment_option_rule ?
                  <div className='flex flex-col items-end'>
                    <p className="font-semibold">
                      {`₹ ${FormatAmount(store.booking.sub_total * 0.25)}`}
                    </p>
                    <p className="text-danger text-xs">{`Due Amount ₹ ${FormatAmount(store.booking.sub_total * 0.75)}`}</p>
                  </div>
                  :
                  <p className="font-semibold">
                    {`₹ ${FormatAmount(store.booking.sub_total)}`}
                  </p>
                }
              </div>
              {shoreExAmount?.port_code?.length ?
                <div>
                  <div className='flex items-center justify-between mt-2'>
                    <p className=" font-semibold">
                      Shore Excursions
                    </p>
                    <p className=" font-semibold">
                      {`₹ ${shoreExAmount.adult + shoreExAmount.children}`}
                    </p>
                  </div>
                  {shoreExAmount?.port_code.map((x, i) =>
                    <div className='flex items-center justify-between mt-2'>
                      <p className="text-sm font-semibold">
                        {x.code} : <span className='text-gray-100 '>Adult x {x.adult}, Children x {x.children}</span>
                      </p>
                    </div>
                  )}

                </div>
                : null}
            </div>

            <div className='px-2 py-2 bg-brand-sky/5'>
              <p className='text-xs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
            </div>
            <div className='px-4'>
              {shoreExAmount?.port_code?.length ?
                <div>
                  <div className='flex items-center justify-between pt-4'>
                    <p className="text-lg font-bold">
                      Total Fare
                    </p>
                    <p className="text-lg font-bold text-brand-primary">
                      {`₹ ${FormatAmount(Math.round(store.booking.sub_total * (store?.booking?.payment_option_rule ? 0.25 : 1)) + shoreExAmount.adult + shoreExAmount.children)}`}
                    </p>
                  </div>
                </div>
                : null}
              <button onClick={() => proceedToPayment()} className="text-white w-full bg-brand-primary font-semibold my-5 py-3 rounded mr-3 text-sm">
                Continue
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}