import React, { ReactNode, useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import { useNavigate } from 'react-router-dom';
import { FormatToString, FormatAmount } from '../../../src/utils/formatter/formatter';
import { useGetBookingDetailMutation } from '../../../src/services/itinerary/itinerary';
import { usePaymentEnquiryMutation, useInitPaymentNewMutation } from '../../../src/services/payments/payment';
import { useGetBookingByIdQuery, useGetItineraryQuery } from '../../../src/services/itinerary/itinerary';
import moment from 'moment';
import { useBookingPaymentNewMutation } from '../../../src/services/profile/profile';
import { GetManageDetail, GetStore, SaveManageDetail } from '../../utils/store/store';
import { current } from '@reduxjs/toolkit';

type Props = {};

export default function PaymentSuccess({ }: Props) {
  const booking_id = new window.URLSearchParams(window.location.search).get('booking_id');
  const payment_id = new window.URLSearchParams(window.location.search).get('payment_id');
  const Status = new window.URLSearchParams(window.location.search).get('action');

  let navigate = useNavigate();
  const [portName, setPortName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<any>();
  const [selectedCabin, setSelectedCabin] = useState<any>(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [bookingData, setBookingData] = useState<any>();
  const [tcsObject, setTcsObject] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [tcsAmount, setTcsAmount] = useState<any>(0);
  const [bookingPaymentNew] = useBookingPaymentNewMutation();
  const [paymentEnquiry] = usePaymentEnquiryMutation();
  const [completePayment] = useInitPaymentNewMutation();
  const [getBookingDetail, { isLoading: loadingQuotationData }] = useGetBookingDetailMutation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail?.myBooking;
  let booking: any = ManageDetail?.getBooking;

  const store = GetStore();
  let reschedulePricingData = store.reschedulePricingData;

  const { data } = useGetBookingByIdQuery(booking_id, { skip: !booking_id });
  // const billingAddress = data?.billing_address;
  const billingAddress = bookingData?.booking?.billing_address;

  // let param: any = `/${bookingData?.itinerary?.itinerary_id}`;
  // const itinerary = useGetItineraryQuery(param);
  const itinerary = bookingData ? bookingData?.itinerary : data?.itinerary;

  let upgradeShore_data;
  try {
    const upgradeShore = localStorage.getItem('upgradeShore_data');

    upgradeShore_data = upgradeShore ? JSON.parse(upgradeShore) : {};
  } catch (error) {
    console.error("Error parsing 'upgradeCabin' data:", error);
    upgradeShore_data = {}; // Fallback to an empty object
  }

  const uniqueCodes = [...new Set(upgradeShore_data.guestRecord?.map(item => item.GADataShore.code))];

  let newUpgradeCabin;
  try {
    const upgradeCabinRaw = localStorage.getItem('newUpgradeCabin');
    newUpgradeCabin = upgradeCabinRaw ? JSON.parse(upgradeCabinRaw) : {};
  } catch (error) {
    console.error("Error parsing 'newUpgradeCabin' data:", error);
    newUpgradeCabin = {}; // Fallback to an empty object
  }

  let upgradeCabin_data;
  try {
    const upgradeCabinRaw = localStorage.getItem('upgradeCabin');
    upgradeCabin_data = upgradeCabinRaw ? JSON.parse(upgradeCabinRaw) : {};
  } catch (error) {
    console.error("Error parsing 'upgradeCabin' data:", error);
    upgradeCabin_data = {}; // Fallback to an empty object
  }

  // Safely parse `extraGuests` data
  let extraGuests_data;
  try {
    const extraGuestsRaw = localStorage.getItem('extraGuests');
    extraGuests_data = extraGuestsRaw ? JSON.parse(extraGuestsRaw) : {};
  } catch (error) {
    console.error("Error parsing 'extraGuests' data:", error);
    extraGuests_data = {}; // Fallback to an empty object
  }

  let paymentData;
  try {
    const extraGuestsRaw = localStorage.getItem('paymentData');
    paymentData = extraGuestsRaw ? JSON.parse(extraGuestsRaw) : {};
  } catch (error) {
    console.error("Error parsing 'extraGuests' data:", error);
    paymentData = {}; // Fallback to an empty object
  }

  let selectedRoom;
  try {
    const extraGuestsRaw = localStorage.getItem('selectedRoom');
    selectedRoom = extraGuestsRaw ? JSON.parse(extraGuestsRaw) : {};
  } catch (error) {
    console.error("Error parsing 'extraGuests' data:", error);
    selectedRoom = {}; // Fallback to an empty object
  }

  let promo_code;
  try {
    const extraGuestsRaw = localStorage.getItem('promo_code');
    promo_code = extraGuestsRaw ? JSON.parse(extraGuestsRaw) : {};
  } catch (error) {
    console.error("Error parsing 'extraGuests' data:", error);
    promo_code = {}; // Fallback to an empty object
  }

  let bookingData_local;
  try {
    const extraGuestsRaw = localStorage.getItem('bookingData');
    bookingData_local = extraGuestsRaw ? JSON.parse(extraGuestsRaw) : {};
  } catch (error) {
    console.error("Error parsing 'extraGuests' data:", error);
    bookingData_local = {}; // Fallback to an empty object
  }


  useEffect(() => {
    setLoading(true)
    const _payload = {
      payment_id
    };
    paymentEnquiry(_payload)
      .unwrap()
      .then((res: any) => {
        setPaymentStatus(res)
        setLoading(false)
      })
      .catch((res: any) => {
        setLoading(false)
        console.log('Error: ', res);
      });
  }, [])

  useEffect(() => {
    setLoading(true)
    const _payload = {
      booking_id: booking_id,
      reset_tcs: false
    };
    getBookingDetail(_payload)
      .unwrap()
      .then((res: any) => {
        setLoading(false)
        setBookingData(res)
      })
      .catch((res: any) => {
        setLoading(false)
        console.log('Error: ', res)
      })
  }, [])

  useEffect(() => {
    if (bookingData?.booking?.enable_tcs) {
      if (bookingData?.booking?.payment_option_rule) {
        setTcsAmount((bookingData?.booking?.selected_tcs?.amount * 0.25))
      } else {
        setTcsAmount((bookingData?.booking?.selected_tcs))
      }
    }
  }, [bookingData])

  useEffect(() => {
    if (bookingData) {
      let portName = bookingData?.booking?.itinerary?.ports
        .map((item: any, index: any, arr: any) => {
          const isLast = index === arr.length - 1;
          const name = isLast ? item.name : item.name + ` -`;
          return index === 0 || isLast ? `${name}` : `${name}`;
        })
        .join(" ")

      setPortName(portName)
    }
  }, [bookingData])

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  // const initPayment = () => {
  //   const _payload = {
  //     booking_id: bookingData?.booking?.id,
  //     billing_address: bookingData?.booking?.billing_address,
  //     payment_for: null
  //   };
  //   if(bookingData?.booking?.status == 'RESERVED'){
  //     setPaymentLoading(true);
  //     bookingPaymentNew(_payload)
  //       .unwrap()
  //       .then((res: any) => {
  //         setPaymentLoading(false);
  //         navigate('/payment-method', {
  //           state: {
  //             paymentData: res,
  //             billingAddress: bookingData?.booking?.billing_address,
  //             bookingData: bookingData,
  //             payment_for: '',
  //             promo_code: bookingData?.booking?.couponCode,
  //             tcs: (bookingData?.booking?.selected_tcs?.amount || 0),
  //             currentPayble: (bookingData?.booking?.current_payable + tcsAmount),
  //             reserveBooking: bookingData?.booking?.payment_option_rule ? true : false,
  //             quotation: false
  //           }
  //         });
  //       })
  //       .catch((res: any) => {
  //         console.log('Error: ', res);
  //         setPaymentLoading(false);
  //       });
  //   }else{
  //     setPaymentLoading(true);
  //     completePayment(_payload)
  //       .unwrap()
  //       .then((res: any) => {
  //         setPaymentLoading(false);
  //         navigate('/payment-method', {
  //           state: {
  //             paymentData: res,
  //             billingAddress: bookingData?.booking?.billing_address,
  //             bookingData: bookingData,
  //             payment_for: '',
  //             promo_code: bookingData?.booking?.couponCode,
  //             tcs: (bookingData?.booking?.selected_tcs?.amount || 0),
  //             currentPayble: (bookingData?.booking?.current_payable + tcsAmount),
  //             reserveBooking: bookingData?.booking?.payment_option_rule ? true : false,
  //             quotation: false
  //           }
  //         });
  //       })
  //       .catch((res: any) => {
  //         console.log('Error: ', res);
  //         setPaymentLoading(false);
  //       });
  //   }

  // }

  const initPayment = () => {
    // Prepare payload
    const _payload = {
      booking_id: bookingData?.booking?.id,
      billing_address: bookingData?.booking?.billing_address,
      payment_for: null,
    };

    // Determine which data to use from localStorage
    // const localStorageData =
    //   upgradeCabin_data && Object.keys(upgradeCabin_data).length
    //     ? upgradeCabin_data
    //     : extraGuests_data;

    const localStorageData =
      upgradeCabin_data && Object.keys(upgradeCabin_data).length
        ? upgradeCabin_data
        : newUpgradeCabin && Object.keys(newUpgradeCabin).length
          ? newUpgradeCabin
          : extraGuests_data;


    // Define common navigate state
    const navigateState = {
      billingAddress: bookingData?.booking?.billing_address || billingAddress,
      upgradeCabin_data: localStorageData,
      payment_for: bookingData?.booking?.status === 'RESERVED' ? '' : Status,
      selectedRoom: selectedRoom,
      paymentData: paymentData,
      promo_code: bookingData?.booking?.couponCode || promo_code,
      bookingData: bookingData_local || bookingData,
      tcs: bookingData?.booking?.selected_tcs?.amount || 0,
      currentPayble: (bookingData?.booking?.current_payable || 0) + (tcsAmount || 0),
      reserveBooking: bookingData?.booking?.payment_option_rule ? true : false,
      quotation: false,

    };

    if (bookingData?.booking?.status === 'RESERVED') {
      setPaymentLoading(true);
      bookingPaymentNew(_payload)
        .unwrap()
        .then((res: any) => {
          setPaymentLoading(false);
          navigate('/payment-method', {
            state: { ...navigateState, paymentData: res },
          });
        })
        .catch((err: any) => {
          console.error('Error during bookingPaymentNew:', err);
          setPaymentLoading(false);
        });
    } else {
      let status = Status === 'add_shorex' ? 'shore_excusions' : Status
      navigate('/payment-method', {
        state: {
          billingAddress: billingAddress,
          upgradeCabin_data: localStorageData,
          payment_for: status,
          selectedRoom: selectedRoom,
          paymentData: paymentData,
          promo_code: promo_code,
          bookingData: bookingData_local,
          upgradeShore_data: upgradeShore_data,
          currentPayble: Status === 'add_shorex'
            ? upgradeShore_data?.due_amount
            : Status === 'add_guest'
              ? (extraGuests_data?.data?.total !== undefined && extraGuests_data?.data?.total !== null
                ? extraGuests_data?.data?.total
                : newUpgradeCabin?.data?.total)  // Fallback to newUpgradeCabin if extraGuests_data?.data?.total is not available
              : Status === 'upgrade_cabin'
                ? (upgradeCabin_data?.total_payable !== undefined && upgradeCabin_data?.total_payable !== null
                  ? upgradeCabin_data?.total_payable
                  : newUpgradeCabin?.total_payable)
                : null
        },
      });
    }
  };

  const initPaymentReschedule = () => {
    navigate('/payment-method', {
      state: {
        billingAddress: billingAddress,
        payment_for: Status,
        selectedRoom: selectedRoom,
        paymentData: paymentData,
        promo_code: promo_code,
        bookingData: bookingData_local,
        reschedulePricingData,
      },
    });
  };

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div className='text-center flex flex-col items-center'>
          <img className='h-24' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-invaild.svg" alt="" />
          <h1 className="lg:text-4xl text-3xl font-bold mt-6">Payment failed!</h1>
          {
            Status === "add_guest" ? (
              <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">
                Your payment of <span className="font-semibold">
                  {/* ₹ {FormatAmount(extraGuests_data?.data?.total || FormatAmount(newUpgradeCabin?.data?.total || 0))} */}
                  ₹ {(extraGuests_data?.data?.total === 0 || !extraGuests_data?.data?.total)
                    ? FormatAmount(newUpgradeCabin?.data?.total)
                    : FormatAmount(extraGuests_data?.data?.total)}
                </span> was failed.
              </p>
            ) : Status === "upgrade_cabin" ? (
              <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">
                Your payment of <span className="font-semibold">
                  {/* ₹ { FormatAmount(newUpgradeCabin?.total_payable) || 0}
                  ₹ {upgradeCabin_data?.total_payable === 0 
    ? FormatAmount(newUpgradeCabin?.total_payable) 
    : FormatAmount(upgradeCabin_data?.total_payable)} */}
                  ₹ {(upgradeCabin_data?.total_payable === 0 || !upgradeCabin_data?.total_payable)
                    ? FormatAmount(newUpgradeCabin?.total_payable)
                    : FormatAmount(upgradeCabin_data?.total_payable)}


                </span> was failed.
              </p>
            ) : Status === "add_shorex" ? (
              <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">
                Your payment of <span className="font-semibold">₹ {FormatAmount(upgradeShore_data?.due_amount)}</span> was failed.
              </p>
            ) : Status === "reschedule" ? (
              <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">
                Your payment of <span className="font-semibold">₹ {FormatAmount(reschedulePricingData?.payable)}</span> was failed.
              </p>
            ) : (
              <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">
                Your payment of{" "}
                <span className="font-semibold">
                  ₹{" "}
                  {(bookingData?.booking?.due_amount &&
                    FormatAmount(bookingData?.booking?.due_amount + (tcsAmount || 0))) ||
                    FormatAmount(0)}
                </span>{" "}
                was failed.
              </p>
            )
          }


          {paymentStatus && paymentStatus.transactions ? (
            <div className='mt-3'>
              <p className='text-sm font-normal'>{paymentStatus?.transactions?.[0]?.failure_reason?.nimbbl_consumer_message}</p>
              <p className='text-sm font-normal mt-1'>{paymentStatus?.transactions?.[0]?.failure_reason?.nimbbl_merchant_message}  Error Code : {paymentStatus?.transactions?.[0]?.failure_reason?.nimbbl_error_code}</p>
            </div>
          ) : null}
        </div>


        <div className='flex justify-center mt-8'>
          <button disabled={paymentLoading} onClick={() => Status === "reschedule" ? initPaymentReschedule() : initPayment()} className='bg-brand-primary disabled:bg-brand-primary/40 px-8 py-3 rounded text-white font-semibold'>Retry Payment</button>
        </div>

        <div className='grid grid-cols-2 mt-8 gap-6'>
          <div className='col-span-2 lg:col-span-1 order-last lg:order-first py-4 lg:py-6 border border-gray-300 bg-white rounded-lg shadow-allSide'>
            <div className='px-4 border-b border-gray-300 pb-4 lg:pb-6'>
              <h1 className='text-base lg:text-2xl font-bold text-brand-primary'>Booking ID: {booking?.number}</h1>
              <p className='text-base lg:text-xl mt-2 font-bold'>{itinerary?.data?.route?.name}</p>
            </div>

            <div className='flex items-start justify-between pt-6 pb-4 px-2 lg:px-8 border-b border-gray-300'>
              <div className='text-right'>
                <p className='text-xs lg:text-base text-gray-600 font-light'>Departure</p>
                <p className='text-xs lg:text-base font-semibold'>
                  {bookingData?.itinerary?.starting_port?.name || itinerary?.starting_port?.name}
                </p>
                <p className='text-xs lg:text-base font-semibold'>

                  {/* {bookingData?.itinerary?.ports?.[0]?.departure
                    ? moment(bookingData.itinerary.ports[0].departure, 'ddd, DD MMM HH:ss A').format('hh:mm A')
                    : itinerary?.data?.start_date} */}
                  {bookingData?.itinerary?.start_date
                    ? moment(bookingData?.itinerary?.start_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')
                    : moment(itinerary?.start_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')}
                </p>

                <p className='text-xs lg:text-base font-semibold'>
                  {bookingData?.itinerary 
                    ? bookingData?.itinerary?.ports[0].departure.split(" ").slice(-2).join(" ") 
                    : itinerary?.ports[0].departure.split(" ").slice(-2).join(" ")}
                </p>
              </div>
              <div className='w-[30%] text-center relative -mt-[5px] lg:-mt-[3px]'>
                <p className='text-gray-200/60 whitespace-nowrap overflow-hidden'>--------------------------</p>
                <img className='absolute h-10'
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                />
              </div>
              <div className=''>
                <p className='text-xs lg:text-base text-gray-600 font-light'>Arrival</p>
                <p className='text-xs lg:text-base font-semibold'>{itinerary?.destination_port?.name || bookingData?.itinerary?.destination_port?.name}</p>
                <p className='text-xs lg:text-base font-semibold'>
                  {bookingData?.itinerary?.end_date
                    ? moment(bookingData?.itinerary?.end_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')
                    : moment(itinerary?.end_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')}
                </p>
                <p className='text-xs lg:text-base font-semibold'>
                  {bookingData?.itinerary 
                    ? bookingData?.itinerary?.ports[bookingData?.itinerary?.ports.length - 1]?.arrival.split(" ").slice(-2).join(" ") 
                    : itinerary?.ports[itinerary?.ports.length - 1]?.arrival.split(" ").slice(-2).join(" ")}
                </p>
              </div>
            </div>

            <div className='flex items-start justify-between pt-6 pb-4 px-4 border-b border-gray-300'>
              {bookingData?.booking?.rooms.map((v: any, i: any) => (
                <div className={`border lg:border-2 cursor-pointer ${i == selectedCabin ? 'bg-brand-primary text-white' : 'text-brand-primary'} border-brand-primary px-4 lg:px-7 py-2 lg:py-3 mx-1 lg:mx-1.5 rounded`} onClick={() => setSelectedCabin(i)}>
                  <p className='text-xs lg:text-base font-semibold'>Cabin {i + 1}</p>
                </div>
              ))}
            </div>

            <div className='border-gray-400 rounded-lg'>
              <div className='border-b border-gray-300 px-6 py-6'>
                <p className='text-base lg:text-xl font-semibold'>Accomodation Details</p>
              </div>
              <div>
                <div className='px-4 lg:px-6 pt-6'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>Cabin {selectedCabin + 1}</p>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Deck No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>
                        {bookingData?.booking?.rooms[selectedCabin].ship_room?.deck_no || booking?.rooms[selectedCabin].ship_room?.deck_no || '-'}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin Category</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>
                        {bookingData?.booking?.rooms[selectedCabin].category_name || booking?.rooms[selectedCabin].category_name || '-'}
                      </p>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Room No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>
                        {bookingData?.booking?.rooms[selectedCabin].ship_room?.number || booking?.rooms[selectedCabin].ship_room?.number || '-'}
                      </p>
                    </div>
                    <div>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium'>Guest No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>
                        {bookingData?.booking?.rooms[selectedCabin].guests || booking?.rooms[selectedCabin].guests || '-'}
                        { }
                      </p>
                      {/* <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Ship Name</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.itinerary?.ship?.name}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2 lg:col-span-1 py-4 lg:py-6 border border-gray-300 bg-white rounded-lg shadow-allSide h-fit'>
            <div className='px-4 flex items-center justify-between border-b border-gray-300 pb-4 lg:pb-6'>
              <p className='text-base lg:text-2xl font-bold'>Price Details</p>
            </div>
            {
              Status === "add_guest" ? (
                <div className='pt-6'>
                  <div className='mb-3 px-4'>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">
                        Cabin {selectedCabin + 1}</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">
                        {/* {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.fare || 0)}`} */}
                        ₹ {(extraGuests_data?.data?.individual?.[0]?.fare === 0 || !extraGuests_data?.data?.individual?.[0]?.fare)
                          ? FormatAmount(newUpgradeCabin?.data?.individual?.[0]?.fare)
                          : FormatAmount(extraGuests_data?.data?.individual?.[0]?.fare)}
                      </p>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">Service Charge & Levies</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">
                        {/* {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.gratuity + extraGuests_data?.data?.individual?.[0]?.portCharges || 0)}`} */}
                        ₹ {(extraGuests_data?.data?.individual?.[0]?.gratuity + extraGuests_data?.data?.individual?.[0]?.portCharges === 0 ||
                          (!extraGuests_data?.data?.individual?.[0]?.gratuity && !extraGuests_data?.data?.individual?.[0]?.portCharges))
                          ? FormatAmount(newUpgradeCabin?.data?.individual?.[0]?.gratuity + newUpgradeCabin?.data?.individual?.[0]?.portCharges)
                          : FormatAmount(extraGuests_data?.data?.individual?.[0]?.gratuity + extraGuests_data?.data?.individual?.[0]?.portCharges)}
                      </p>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">Fuel Surcharge</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">
                        {/* {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.fuelSurcharge || 0)}`} */}
                        ₹ {(extraGuests_data?.data?.individual?.[0]?.fuelSurcharge === 0 || !extraGuests_data?.data?.individual?.[0]?.fuelSurcharge)
                          ? FormatAmount(newUpgradeCabin?.data?.individual?.[0]?.fuelSurcharge)
                          : FormatAmount(extraGuests_data?.data?.individual?.[0]?.fuelSurcharge)}
                      </p>
                    </div>
                  </div>
                  {(extraGuests_data?.data?.individual?.[0]?.discount > 0 ||
                    newUpgradeCabin?.data?.individual?.[0]?.discount > 0) && (
                      <div className="grid grid-cols-3 mb-2 px-4">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Discount</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">
                            ₹ {(extraGuests_data?.data?.individual?.[0]?.discount === 0 ||
                              !extraGuests_data?.data?.individual?.[0]?.discount)
                              ? FormatAmount(newUpgradeCabin?.data?.individual?.[0]?.discount)
                              : FormatAmount(extraGuests_data?.data?.individual?.[0]?.discount)}
                          </p>
                        </div>
                      </div>
                    )}
                  <div className='px-4 pb-3'>
                    <div className='flex justify-between'>
                      <p className="text-base lg:text-lg  font-medium">Sub-total</p>
                      <p className="text-base lg:text-lg  font-medium">
                        {/* {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.total || 0)}`} */}
                        ₹ {(extraGuests_data?.data?.individual?.[0]?.total === 0 || !extraGuests_data?.data?.individual?.[0]?.total)
                          ? FormatAmount(newUpgradeCabin?.data?.individual?.[0]?.total)
                          : FormatAmount(extraGuests_data?.data?.individual?.[0]?.total)}
                      </p>
                    </div>
                  </div>

                  <div className='bg-[#F4F8FF] px-4 py-3'>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">Taxes</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">
                        ₹ {(extraGuests_data?.data?.gst === 0 || !extraGuests_data?.data?.gst)
                          ? FormatAmount(newUpgradeCabin?.data?.gst)
                          : FormatAmount(extraGuests_data?.data?.gst)}
                      </p>
                    </div>
                    <div className='flex justify-between'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">GST</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">
                        {/* {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`} */}
                        ₹ {(extraGuests_data?.data?.gst === 0 || !extraGuests_data?.data?.gst)
                          ? FormatAmount(newUpgradeCabin?.data?.gst)
                          : FormatAmount(extraGuests_data?.data?.gst)}
                      </p>
                    </div>
                  </div>
                  <div className='px-4 pt-2 lg:pt-4'>
                    <div className='flex justify-between items-end mt-2'>
                      <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Grand Total</p>
                      <div>
                        <div className="text-right">
                          <p className="text-lg lg:text-2xl font-bold text-brand-primary">
                            {/* {`₹ ${FormatAmount(extraGuests_data?.data?.total || 0)}`} */}
                            ₹ {(extraGuests_data?.data?.total === 0 || !extraGuests_data?.data?.total)
                              ? FormatAmount(newUpgradeCabin?.data?.total)
                              : FormatAmount(extraGuests_data?.data?.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {bookingData?.booking?.payment_option_rule ?
                      <>
                        <div className='flex justify-between items-end mt-2'>
                          <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Amount Paid</p>
                          <div>
                            <div className="text-right">
                              <p className="text-lg lg:text-2xl font-bold text-brand-primary">₹ {(bookingData?.booking?.amount_paid && FormatAmount(bookingData?.booking?.amount_paid + (tcsAmount || 0))) || FormatAmount(0)}</p>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-between items-end mt-2'>
                          <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Current Payble</p>
                          <div>
                            <div className="text-right">
                              <p className="text-lg lg:text-2xl font-bold text-brand-primary">₹ {(bookingData?.booking?.due_amount && FormatAmount(bookingData?.booking?.due_amount + (tcsAmount || 0))) || FormatAmount(0)}</p>
                            </div>
                          </div>
                        </div>
                      </>
                      : null
                    }
                  </div>
                </div>
              ) :
                Status === "upgrade_cabin" ? (
                  <div className='pt-6'>
                    <div className='mb-3 px-4'>
                      <div className='flex justify-between mb-1'>
                        <p className="text-base lg:text-lg  mb-0.5 font-medium">
                          Cabin Upgrade Charges
                        </p>
                        <p className="text-base lg:text-lg  mb-0.5 font-medium">
                          {/* {`₹ ${FormatAmount(upgradeCabin_data?.cabin_fare_diff || 0)}`} */}
                          ₹ {(upgradeCabin_data?.cabin_fare_diff === 0 || !upgradeCabin_data?.cabin_fare_diff)
                            ? FormatAmount(newUpgradeCabin?.cabin_fare_diff)
                            : FormatAmount(upgradeCabin_data?.cabin_fare_diff)}
                        </p>
                      </div>
                    </div>
                    <div className='bg-[#F4F8FF] px-4 py-3'>
                      <div className='flex justify-between mb-1'>
                        <p className="text-base lg:text-lg  mb-0.5 font-medium">Taxes</p>
                        <p className="text-base lg:text-lg  mb-0.5 font-medium">
                          {/* {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`} */}
                          ₹ {(upgradeCabin_data?.gst_diff === 0 || !upgradeCabin_data?.gst_diff)
                            ? FormatAmount(newUpgradeCabin?.gst_diff)
                            : FormatAmount(upgradeCabin_data?.gst_diff)}
                        </p>
                      </div>
                      <div className='flex justify-between'>
                        <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">GST</p>
                        <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">
                          ₹ {(upgradeCabin_data?.gst_diff === 0 || !upgradeCabin_data?.gst_diff)
                            ? FormatAmount(newUpgradeCabin?.gst_diff)
                            : FormatAmount(upgradeCabin_data?.gst_diff)}
                        </p>
                      </div>
                    </div>
                    <div className='px-4 pt-2 lg:pt-4'>
                      <div className='flex justify-between items-end mt-2'>
                        <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Grand Total</p>
                        <div>
                          <div className="text-right">
                            <p className="text-lg lg:text-2xl font-bold text-brand-primary">
                              ₹ {(upgradeCabin_data?.total_payable === 0 || !upgradeCabin_data?.total_payable) ? FormatAmount(newUpgradeCabin?.total_payable)
                                : FormatAmount(upgradeCabin_data?.total_payable)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) :

                  Status == "add_shorex" ? (
                    <div className="px-4 pb-3 mt-2">

                      {uniqueCodes.map((code, i) => {
                        const adultCount = upgradeShore_data?.guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;
                        const childrenCount = upgradeShore_data?.guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                        const adultPrice = upgradeShore_data?.guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                        const childrenPrice = upgradeShore_data?.guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                        const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                        return (
                          <div key={i} className='flex items-center justify-between'>
                            <p className="text-sm lg:text-base font-medium  ml-[17px]">
                              {code} : <span className='text-sm lg:text-base font-medium'>{adultCount == 0 ? null : `Adult x ${adultCount}`} {childrenCount == 0 ? null : `Children x ${childrenCount}`}  </span>
                            </p>
                            <p className="text-sm lg:text-base font-medium mr-[18px]">{`₹ ${FormatAmount(totalPrice)}`}</p>

                          </div>
                        );
                      })}


                      <div className='px-4 pb-3'>
                        <div className='flex justify-between'>
                          <p className="text-sm lg:text-base font-medium">Sub-total</p>
                          <p className="text-sm lg:text-base font-medium">₹ {FormatAmount(upgradeShore_data?.shore_excursion_net_total)}</p>
                        </div>
                      </div>

                      <div className='bg-[#F4F8FF] px-4 py-3'>
                        <div className='flex justify-between mb-1'>
                          <p className="text-sm lg:text-base  mb-0.5 font-medium">Taxes</p>
                          <p className="text-sm lg:text-base  mb-0.5 font-medium">₹ {FormatAmount(upgradeShore_data?.shore_excursion_gst + (0 || 0))}</p>
                        </div>
                        <div className='flex justify-between'>
                          <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">GST</p>
                          <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(upgradeShore_data?.shore_excursion_gst)}</p>
                        </div>
                      </div>
                      <div className="px-4 pt-2 lg:pt-4">
                        <div className="flex justify-between items-end mt-2">
                          <p className="text-base lg:text-xl text-brand-primary font-bold">
                            Amount Payable
                          </p>
                          <div>
                            <div className="text-right">
                              <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                                upgradeShore_data?.due_amount
                              )}`}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ) : Status === 'reschedule' ? (
                    <div className="pt-6">
                      <div className="px-4">
                        <div className="flex justify-between">
                          <p className="text-base lg:text-lg  font-medium">
                            Fare Difference
                          </p>
                          <p className="text-base lg:text-lg  font-medium">
                            ₹ {FormatAmount(reschedulePricingData.fare_difference)}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex justify-between mb-1">
                          <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">
                            Rescheduling Charges
                          </p>
                          <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">
                            ₹{' '}
                            {FormatAmount(reschedulePricingData.reschedule_fee)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">
                            GST
                          </p>
                          <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">
                            ₹ {FormatAmount(reschedulePricingData.reschedule_gst)}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 pt-2 lg:pt-4">
                        <div className="flex justify-between items-end mt-2">
                          <p className="text-lg lg:text-2xl text-brand-primary font-bold">
                            Grand Total
                          </p>
                          <div>
                            <div className="text-right">
                              <p className="text-lg lg:text-2xl font-bold text-brand-primary">{`₹ ${FormatAmount(
                                reschedulePricingData.payable
                              )}`}</p>
                            </div>
                          </div>
                        </div>
                        {bookingData?.booking?.payment_option_rule ? (
                          <>
                            <div className="flex justify-between items-end mt-2">
                              <p className="text-lg lg:text-2xl text-brand-primary font-bold">
                                Amount Paid
                              </p>
                              <div>
                                <div className="text-right">
                                  <p className="text-lg lg:text-2xl font-bold text-brand-primary">
                                    ₹{' '}
                                    {(bookingData?.booking?.amount_paid &&
                                      FormatAmount(
                                        bookingData?.booking?.amount_paid +
                                        (tcsAmount || 0)
                                      )) ||
                                      FormatAmount(0)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                              <p className="text-lg lg:text-2xl text-brand-primary font-bold">
                                Current Payble
                              </p>
                              <div>
                                <div className="text-right">
                                  <p className="text-lg lg:text-2xl font-bold text-brand-primary">
                                    ₹{' '}
                                    {(bookingData?.booking?.due_amount &&
                                      FormatAmount(
                                        bookingData?.booking?.due_amount +
                                        (tcsAmount || 0)
                                      )) ||
                                      FormatAmount(0)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ) :
                    (
                      <div className='pt-6'>
                        {bookingData?.booking?.rooms?.map((room: any, index: any) => {
                          return (
                            <div className='mb-3 px-4'>
                              <div className='flex justify-between mb-1'>
                                <p className="text-base lg:text-lg  mb-0.5 font-medium">{room.category_name} Cabin</p>
                                <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.cabin_fare + room.discount)}</p>
                              </div>
                              <div className='flex justify-between mb-1'>
                                <p className="text-base lg:text-lg  mb-0.5 font-medium">Service Charge & Levies</p>
                                <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.service_charges)}</p>
                              </div>
                              <div className='flex justify-between mb-1'>
                                <p className="text-base lg:text-lg  mb-0.5 font-medium">Fuel Surcharge</p>
                                <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.fuel_surcharge)}</p>
                              </div>
                            </div>
                          )
                        })}

                        {(bookingData?.booking.cabin_fare_discount && bookingData?.booking.cabin_fare_discount != "0.0") || bookingData?.booking?.discounts[0]?.amount ?
                          <div className="grid grid-cols-3 px-4 pb-3">
                            <div className="col-span-2">
                              <p className="text-base lg:text-lg font-semibold">Total Cabin Fare Discount:</p>
                              {bookingData?.booking?.discount_text && <p className="text-sm lg:text-base font-semibold text-gray-100">{bookingData?.booking?.discount_text}</p>}
                              {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-sm lg:text-base font-semibold text-gray-100">{bookingData?.booking?.discounts[0]?.coupon_code}</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-base lg:text-lg font-semibold text-brand-green">- ₹{FormatAmount((+bookingData?.booking.cabin_fare_discount || 0) + (+bookingData?.booking?.discounts[0]?.amount || 0))}</p>
                              {bookingData?.booking.cabin_fare_discount > 0 && <p className="text-sm lg:text-base font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking.cabin_fare_discount)}</p>}
                              {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-sm lg:text-base font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking?.discounts[0]?.amount)}</p>}
                            </div>
                          </div>
                          : null
                        }

                        {bookingData?.booking?.shore_excursion_net_total ?
                          <div className='px-4 pb-3'>
                            <div className='flex justify-between'>
                              <p className="text-base lg:text-lg  mb-0.5 font-semibold">Shore Excursions</p>
                              <p className="text-base lg:text-lg  mb-0.5 font-semibold">₹ {FormatAmount(bookingData?.booking?.shore_excursion_net_total)}</p>
                            </div>
                          </div>
                          : null
                        }

                        <div className='px-4 pb-3'>
                          <div className='flex justify-between'>
                            <p className="text-base lg:text-lg  font-medium">Sub-total</p>
                            <p className="text-base lg:text-lg  font-medium">₹ {FormatAmount(bookingData?.booking?.sub_total)}</p>
                          </div>
                        </div>

                        <div className='bg-[#F4F8FF] px-4 py-3'>
                          <div className='flex justify-between mb-1'>
                            <p className="text-base lg:text-lg  mb-0.5 font-medium">Taxes</p>
                            <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(bookingData?.booking?.gst + (bookingData?.booking?.shore_excursion_gst || 0))}</p>
                          </div>
                          <div className='flex justify-between'>
                            <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">GST</p>
                            <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(bookingData?.booking?.gst)}</p>
                          </div>
                          {bookingData?.booking.shore_excursion_gst ?
                            <div className='flex justify-between'>
                              <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">Shore Excursion GST:</p>
                              <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(bookingData?.booking?.shore_excursion_gst)}</p>
                            </div>
                            : null
                          }
                        </div>
                        {bookingData?.booking?.selected_tcs?.amount ?
                          <div className='px-4 mt-3'>
                            <div className="flex justify-between">
                              <div className="col-span-2">
                                <p className="text-lg lg:text-xl font-bold">Total:</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg lg:text-xl font-bold">{`₹ ${FormatToString(
                                  bookingData?.booking?.total
                                )}`}</p>
                              </div>
                            </div>

                            <div className=" flex justify-between mt-1">
                              <div className="col-span-2">
                                <p className="text-base lg:text-lg font-semibold">TCS:</p>
                              </div>
                              <div className="text-right">
                                <p className="text-base lg:text-lg font-semibold">{`₹ ${FormatAmount(bookingData?.booking?.selected_tcs?.amount)}`}</p>
                              </div>
                            </div>
                          </div>
                          : null
                        }
                        <div className='px-4 pt-2 lg:pt-4'>
                          <div className='flex justify-between items-end mt-2'>
                            <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Grand Total</p>
                            <div>
                              <div className="text-right">
                                <p className="text-lg lg:text-2xl font-bold text-brand-primary">{`₹ ${FormatAmount(bookingData?.booking?.total + (bookingData?.booking?.selected_tcs?.amount || 0))}`}</p>
                              </div>
                            </div>
                          </div>
                          {bookingData?.booking?.payment_option_rule ?
                            <>
                              <div className='flex justify-between items-end mt-2'>
                                <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Amount Paid</p>
                                <div>
                                  <div className="text-right">
                                    <p className="text-lg lg:text-2xl font-bold text-brand-primary">₹ {(bookingData?.booking?.amount_paid && FormatAmount(bookingData?.booking?.amount_paid + (tcsAmount || 0))) || FormatAmount(0)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className='flex justify-between items-end mt-2'>
                                <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Current Payble</p>
                                <div>
                                  <div className="text-right">
                                    <p className="text-lg lg:text-2xl font-bold text-brand-primary">₹ {(bookingData?.booking?.due_amount && FormatAmount(bookingData?.booking?.due_amount + (tcsAmount || 0))) || FormatAmount(0)}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                            : null
                          }
                        </div>
                      </div>
                    )
            }


          </div>
        </div>
      </main>
    </Layout>
  );
}

//   return (
//     <Layout>
//       <main className="container mx-auto py-24 lg:pt-36 px-3">
//         <div className='text-center flex flex-col items-center'>
//           <img className='h-24' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-invaild.svg" alt="" />
//           <h1 className="lg:text-4xl text-3xl font-bold mt-6">Payment failed!</h1>
//           <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">Your payment of <span className='font-semibold'>₹ {(bookingData?.booking?.due_amount &&
//             FormatAmount(bookingData?.booking?.due_amount + (tcsAmount || 0))) ||
//             FormatAmount(0)
//           }</span> was failed.</p>
//           {paymentStatus && paymentStatus.transactions ? (
//             <div className='mt-3'>
//               <p className='text-sm font-normal'>{paymentStatus?.transactions?.[0]?.failure_reason?.nimbbl_consumer_message}</p>
//               <p className='text-sm font-normal mt-1'>{paymentStatus?.transactions?.[0]?.failure_reason?.nimbbl_merchant_message}  Error Code : {paymentStatus?.transactions?.[0]?.failure_reason?.nimbbl_error_code}</p>
//             </div>
//           ) : null}
//         </div>


//         <div className='flex justify-center mt-8'>
//           <button disabled={paymentLoading} onClick={() => {
//             initPayment()
//           }} className='bg-brand-primary disabled:bg-brand-primary/40 px-8 py-3 rounded text-white font-semibold'>Retry Payment</button>
//         </div>

//         <div className='grid grid-cols-2 mt-8 gap-6'>
//           <div className='col-span-2 lg:col-span-1 order-last lg:order-first py-4 lg:py-6 border border-gray-300 bg-white rounded-lg shadow-allSide'>
//             <div className='px-4 border-b border-gray-300 pb-4 lg:pb-6'>
//               <h1 className='text-base lg:text-2xl font-bold text-brand-primary'>Booking ID: {bookingData?.booking?.number}</h1>
//               <p className='text-base lg:text-xl mt-2 font-bold'>{portName}</p>
//             </div>

//             <div className='flex items-start justify-between pt-6 pb-4 px-2 lg:px-8 border-b border-gray-300'>
//               <div className='text-right'>
//                 <p className='text-xs lg:text-base text-gray-600 font-light'>Departure</p>
//                 <p className='text-xs lg:text-base font-semibold'>{bookingData?.itinerary?.starting_port?.name}</p>
//                 <p className='text-xs lg:text-base font-semibold'>{moment(bookingData?.itinerary?.start_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')}</p>
//                 <p className='text-xs lg:text-base font-semibold'>
//                   {/* {moment(bookingData?.itinerary?.ports[0].departure, 'ddd, DD MMM HH:ss A').format('hh:ss A')} */}
//                   {bookingData?.itinerary?.ports[0].departure.split(" ").slice(-2).join(" ")}
//                 </p>
//               </div>
//               <div className='w-[30%] text-center relative -mt-[5px] lg:-mt-[3px]'>
//                 <p className='text-gray-200/60 whitespace-nowrap overflow-hidden'>--------------------------</p>
//                 <img className='absolute h-10'
//                   style={{
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)'
//                   }}
//                   src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
//                 />
//               </div>
//               <div className=''>
//                 <p className='text-xs lg:text-base text-gray-600 font-light'>Arrival</p>
//                 <p className='text-xs lg:text-base font-semibold'>{bookingData?.itinerary?.destination_port?.name}</p>
//                 <p className='text-xs lg:text-base font-semibold'>{moment(bookingData?.itinerary?.end_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')}</p>
//                 <p className='text-xs lg:text-base font-semibold'>
//                   {/* {moment(bookingData?.itinerary?.ports[bookingData?.itinerary?.ports.length - 1].arrival, 'ddd, DD MMM HH:ss A').format('hh:ss A')} */}
//                   {bookingData?.itinerary?.ports[bookingData?.itinerary?.ports.length - 1].arrival.split(" ").slice(-2).join(" ")}
//                 </p>
//               </div>
//             </div>

//             <div className='flex items-start justify-between pt-6 pb-4 px-4 border-b border-gray-300'>
//               {bookingData?.booking?.rooms.map((v: any, i: any) => (
//                 <div className={`border lg:border-2 cursor-pointer ${i == selectedCabin ? 'bg-brand-primary text-white' : 'text-brand-primary'} border-brand-primary px-4 lg:px-7 py-2 lg:py-3 mx-1 lg:mx-1.5 rounded`} onClick={() => setSelectedCabin(i)}>
//                   <p className='text-xs lg:text-base font-semibold'>Cabin {i + 1}</p>
//                 </div>
//               ))}
//             </div>

//             <div className='border-gray-400 rounded-lg'>
//               <div className='border-b border-gray-300 px-6 py-6'>
//                 <p className='text-base lg:text-xl font-semibold'>Accomodation Details</p>
//               </div>
//               <div>
//                 <div className='px-4 lg:px-6 pt-6'>
//                   <div className='flex justify-between'>
//                     <div>
//                       <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin No</p>
//                       <p className='text-xs lg:text-base font-medium mt-1.5'>Cabin {selectedCabin + 1}</p>
//                       <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Deck No</p>
//                       <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].ship_room?.deck_no || '-'}</p>
//                     </div>
//                     <div>
//                       <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin Category</p>
//                       <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].category_name || '-'}</p>
//                       <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Room No</p>
//                       <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].ship_room?.number || '-'}</p>
//                     </div>
//                     <div>
//                       <p className='text-gray-100 text-xs lg:text-sm font-medium'>Guest No</p>
//                       <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].guests}</p>
//                       {/* <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Ship Name</p>
//                       <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.itinerary?.ship?.name}</p> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className='col-span-2 lg:col-span-1 py-4 lg:py-6 border border-gray-300 bg-white rounded-lg shadow-allSide h-fit'>
//             <div className='px-4 flex items-center justify-between border-b border-gray-300 pb-4 lg:pb-6'>
//               <p className='text-base lg:text-2xl font-bold'>Price Details</p>
//             </div>
//             <div className='pt-6'>
//               {bookingData?.booking?.rooms?.map((room: any, index: any) => {
//                 return (
//                   <div className='mb-3 px-4'>
//                     <div className='flex justify-between mb-1'>
//                       <p className="text-base lg:text-lg  mb-0.5 font-medium">{room.category_name} Cabin</p>
//                       <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.cabin_fare + room.discount)}</p>
//                     </div>
//                     <div className='flex justify-between mb-1'>
//                       <p className="text-base lg:text-lg  mb-0.5 font-medium">Service Charge & Levies</p>
//                       <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.service_charges)}</p>
//                     </div>
//                     <div className='flex justify-between mb-1'>
//                       <p className="text-base lg:text-lg  mb-0.5 font-medium">Fuel Surcharge</p>
//                       <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.fuel_surcharge)}</p>
//                     </div>
//                   </div>
//                 )
//               })}

//               {(bookingData?.booking.cabin_fare_discount && bookingData?.booking.cabin_fare_discount != "0.0") || bookingData?.booking?.discounts[0]?.amount ?
//                 <div className="grid grid-cols-3 px-4 pb-3">
//                   <div className="col-span-2">
//                     <p className="text-base lg:text-lg font-semibold">Total Cabin Fare Discount:</p>
//                     {bookingData?.booking?.discount_text && <p className="text-sm lg:text-base font-semibold text-gray-100">{bookingData?.booking?.discount_text}</p>}
//                     {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-sm lg:text-base font-semibold text-gray-100">{bookingData?.booking?.discounts[0]?.coupon_code}</p>}
//                   </div>
//                   <div className="text-right">
//                     <p className="text-base lg:text-lg font-semibold text-brand-green">- ₹{FormatAmount((+bookingData?.booking.cabin_fare_discount || 0) + (+bookingData?.booking?.discounts[0]?.amount || 0))}</p>
//                     {bookingData?.booking.cabin_fare_discount > 0 && <p className="text-sm lg:text-base font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking.cabin_fare_discount)}</p>}
//                     {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-sm lg:text-base font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking?.discounts[0]?.amount)}</p>}
//                   </div>
//                 </div>
//                 : null
//               }

//               {bookingData?.booking?.shore_excursion_net_total ?
//                 <div className='px-4 pb-3'>
//                   <div className='flex justify-between'>
//                     <p className="text-base lg:text-lg  mb-0.5 font-semibold">Shore Excursions</p>
//                     <p className="text-base lg:text-lg  mb-0.5 font-semibold">₹ {FormatAmount(bookingData?.booking?.shore_excursion_net_total)}</p>
//                   </div>
//                 </div>
//                 : null
//               }

//               <div className='px-4 pb-3'>
//                 <div className='flex justify-between'>
//                   <p className="text-base lg:text-lg  font-medium">Sub-total</p>
//                   <p className="text-base lg:text-lg  font-medium">₹ {FormatAmount(bookingData?.booking?.sub_total)}</p>
//                 </div>
//               </div>

//               <div className='bg-[#F4F8FF] px-4 py-3'>
//                 <div className='flex justify-between mb-1'>
//                   <p className="text-base lg:text-lg  mb-0.5 font-medium">Taxes</p>
//                   <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(bookingData?.booking?.gst + (bookingData?.booking?.shore_excursion_gst || 0))}</p>
//                 </div>
//                 <div className='flex justify-between'>
//                   <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">GST</p>
//                   <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(bookingData?.booking?.gst)}</p>
//                 </div>
//                 {bookingData?.booking.shore_excursion_gst ?
//                   <div className='flex justify-between'>
//                     <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">Shore Excursion GST:</p>
//                     <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(bookingData?.booking?.shore_excursion_gst)}</p>
//                   </div>
//                   : null
//                 }
//               </div>
//               {bookingData?.booking?.selected_tcs?.amount ?
//                 <div className='px-4 mt-3'>
//                   <div className="flex justify-between">
//                     <div className="col-span-2">
//                       <p className="text-lg lg:text-xl font-bold">Total:</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg lg:text-xl font-bold">{`₹ ${FormatToString(
//                         bookingData?.booking?.total
//                       )}`}</p>
//                     </div>
//                   </div>

//                   <div className=" flex justify-between mt-1">
//                     <div className="col-span-2">
//                       <p className="text-base lg:text-lg font-semibold">TCS:</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-base lg:text-lg font-semibold">{`₹ ${FormatAmount(bookingData?.booking?.selected_tcs?.amount)}`}</p>
//                     </div>
//                   </div>
//                 </div>
//                 : null
//               }
//               <div className='px-4 pt-2 lg:pt-4'>
//                 <div className='flex justify-between items-end mt-2'>
//                   <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Grand Total</p>
//                   <div>
//                     <div className="text-right">
//                       <p className="text-lg lg:text-2xl font-bold text-brand-primary">{`₹ ${FormatAmount(bookingData?.booking?.total + (bookingData?.booking?.selected_tcs?.amount || 0))}`}</p>
//                     </div>
//                   </div>
//                 </div>
//                 {bookingData?.booking?.payment_option_rule ?
//                 <>
//                   <div className='flex justify-between items-end mt-2'>
//                     <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Amount Paid</p>
//                     <div>
//                       <div className="text-right">
//                         <p className="text-lg lg:text-2xl font-bold text-brand-primary">₹ {(bookingData?.booking?.amount_paid && FormatAmount(bookingData?.booking?.amount_paid + (tcsAmount || 0))) || FormatAmount(0)}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='flex justify-between items-end mt-2'>
//                     <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Current Payble</p>
//                     <div>
//                       <div className="text-right">
//                         <p className="text-lg lg:text-2xl font-bold text-brand-primary">₹ {(bookingData?.booking?.due_amount && FormatAmount(bookingData?.booking?.due_amount + (tcsAmount || 0))) || FormatAmount(0)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//                   : null
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </Layout>
//   );
// }
