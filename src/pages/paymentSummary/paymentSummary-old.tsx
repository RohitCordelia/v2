import React, { ReactNode, useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import Accordian from '../../components/UI/Accordion/accordion_basic';
import { useNavigate } from 'react-router-dom';
import { GetContact, GetStore } from '../../../src/utils/store/store';
import { FormatCardNumber, FormatToString, FormatPrice, UnFormatCardNumber, ordinal_suffix_of } from '../../../src/utils/formatter/formatter';
import { useGetBookingDetailMutation } from '../../../src/services/itinerary/itinerary';
import { Input } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { FullName, Phone, Email, Pincode, PanNo, GSTIN, Address } from '../../../src/utils/validations/formValidations';
import { useGetAddressFromPincodeQuery, useVerifyPanMutation, useVerifyGSTMutation, useInitPaymentNewMutation, useApplyCouponMutation, useRemoveCouponMutation } from '../../../src/services/payments/payment';
import { TiggerFBCheckoutEvent, TiggerGACheckoutEvent } from '../../../src/components/Analytics/events';
import Modal from '../../components/UI/ModalCenter';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { TiggerGAInitiatePayment } from '../../../src/components/Analytics/events';

type Props = {};

function removeByClass(obj: any) {
  if (obj && obj.length) {
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].paid == false) {
        return i
      }
    }

  }
}

const couponArray: any = [
  // 'ICICI10',
  // 'HDFC10',
  // 'SBI10'
]

export default function PaymentSummary({ }: Props) {
  const [getBookingDetail, { isLoading: loadingQuotationData }] = useGetBookingDetailMutation()

  const store = GetStore();
  const [gst, setGst] = useState<any>(false);
  const [nri, setNri] = useState<any>(false);
  const [consent, setConsent] = useState<any>(false);
  const [panCard, setPanCard] = useState<any>(true);
  const [PanTaxAmount, setPanTaxAmount] = useState<any>();
  const [billingAddress, setBillingAddress] = useState<any>();
  const [pincode, setPincode] = useState<string>('');
  const [isPanVerified, setIsPanVerified] = useState<any>(false);
  const [panVerifiedFailMsg, setPanVerifiedFailMsg] = useState<any>('');
  const [isPanLoading, setIsPanLoading] = useState<any>(false);
  const [isGstVerified, setIsGstVerified] = useState<any>(false);
  const [gstVerifiedFailMsg, setGstVerifiedFailMsg] = useState<any>('');
  const [isGstLoading, setIsGstLoading] = useState<any>(false);

  const [SelectSplitModal, setSelectSplitModal] = useState<any>(false);
  const [PaymentType, setPaymentType] = useState<any>(null);
  const [SplitModal, setSplitModal] = useState<any>(false);
  const [checkSplitPayment, setCheckSplitPayment] = useState<any>(false);
  const [Loading, setLoading] = useState<any>(false);
  const [couponCode, setCouponCode] = useState<any>('');
  const [couponApplied, setCouponApplied] = useState<any>(false);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<any>('');
  const [bookingData, setBookingData] = useState<any>();
  const [taxRegime, setTaxRegime] = useState<any>('new_regime');
  const [isAbove7L, setIsAbove7L] = useState<any>(false);
  const [tcsObject, setTcsObject] = useState<any>();
  const [travelExpense, setTravelExpense] = useState<any>(false);

  const [completePayment] = useInitPaymentNewMutation();
  const [applyCoupon] = useApplyCouponMutation();
  const [removeCoupon] = useRemoveCouponMutation();
  const [verifyPan] = useVerifyPanMutation();
  const [verifyGST] = useVerifyGSTMutation();

  const BOOKING_ID = new window.URLSearchParams(window.location.search).get('booking_id');



  const { data: addressData } = useGetAddressFromPincodeQuery(
    pincode,
    { skip: !!!pincode || pincode.length !== 6 }
  );

  useEffect(() => {
    const _payload = {
      booking_id: BOOKING_ID,
    };
    getBookingDetail(_payload)
      .unwrap()
      .then((res: any) => {
        setBookingData(res)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }, [])

  useEffect(() => {
    if (bookingData && bookingData?.booking) {
      setValue('billing_address.address2', bookingData?.booking.billing_address.address === '-' ? '' : bookingData?.booking.billing_address.address)
      if (bookingData?.booking.billing_address.pan) {
        setIsPanVerified(true)
        setPanVerifiedFailMsg('Verified')
      }
      setValue('billing_address.pan', bookingData?.booking.billing_address.pan === '-' ? '' : bookingData?.booking.billing_address.pan)
      setValue('billing_address.name', bookingData?.booking.billing_address.name === '-' ? '' : bookingData?.booking.billing_address.name)
      setValue('billing_address.phone', bookingData?.booking.billing_address.phone === '-' ? '' : bookingData?.booking.billing_address.phone)
      setValue('billing_address.email', bookingData?.booking.billing_address.email === '-' ? '' : bookingData?.booking.billing_address.email)
      setValue('billing_address.pincode', bookingData?.booking.billing_address.pincode === '-' ? '' : bookingData?.booking.billing_address.pincode)
      setPincode(bookingData?.booking.billing_address.pincode)
    }
    if (bookingData && bookingData?.booking?.card_offer_applied) {
      setCouponCode(bookingData.booking.discounts[0].coupon_code)
      setCouponApplied(true);
      setCouponAppliedMessage('Coupon Applied Successfully');
    }


    if (bookingData?.booking?.is_international && bookingData?.booking?.status == 'ON_HOLD') {
      // bookingData?.booking?.total > 700000 ? setIsAbove7L(true) : setIsAbove7L(false)
      if (bookingData?.booking?.total > 700000) {
        setIsAbove7L(true)
        setTravelExpense(false)
      } else {
        setIsAbove7L(false)
      }
    } else {
      setTravelExpense(bookingData?.booking?.billing_address?.expense_above_7l != null ? !bookingData?.booking?.billing_address?.expense_above_7l : false)
    }
  }, [bookingData])

  useEffect(() => {
    if (bookingData?.booking.is_international) {
      if (isAbove7L) {
        setTcsObject(bookingData?.booking.tcs)
      } else if (nri) {
        setTravelExpense(false)
        setTcsObject(bookingData?.booking.tcs)
      } else if (travelExpense) {
        setTcsObject(bookingData?.booking.tcs_with_pan)
      } else {
        setTcsObject(bookingData?.booking.tcs)
      }
    }
  }, [bookingData, travelExpense, nri])

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      billing_address: {
        name: '',
        phone: '',
        email: '',
        pincode: '',
        address1: '',
        address2: '',
        gstin: '',
        gstName: '',
        pan: '',
        pan_name: '',
        international: ''
      },
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    register('billing_address.address1', { required: { value: true, message: "Please enter a valid pincode" } });
    // TiggerFBCheckoutEvent();
    // TiggerGACheckoutEvent();
  }, []);

  useEffect(() => {
    if (bookingData?.booking?.split_payment && bookingData?.booking?.status === "RESERVED") {
      let a = getValues('billing_address');
      setBillingAddress(a)
      setSplitModal(true)
      setPaymentType('split_payment')
    }
  }, [bookingData])

  useEffect(() => {
    if (addressData && addressData?.codes[0]) {
      clearErrors('billing_address.pincode')
      clearErrors('billing_address.address1')
      setValue(
        'billing_address.address1',
        `${addressData?.codes[0].city}, ${addressData?.codes[0].state}, ${addressData?.codes[0].country}`
      );
    } else if (addressData && addressData?.codes.length === 0) {
      setError('billing_address.pincode', { type: 'custom', message: 'Please enter a valid pincode' });
    }
  }, [addressData]);

  useEffect(() => {
    if (checkSplitPayment) {
      const GAData = {
        currency: "INR",
        value: bookingData?.booking?.total,
        items: store.GADataShoreEx
      }
      TiggerGAInitiatePayment(GAData)
      initPayment()
    }
  }, [checkSplitPayment])

  const proceedToPay = (data: any) => {
    setBillingAddress(data.billing_address)
    if (bookingData?.booking?.split_payment_options?.available) {
      if (bookingData?.booking?.split_payment && bookingData?.booking?.status === 'RESERVED') {
        setSplitModal(true)
        setPaymentType('split_payment')
      } else {
        setSelectSplitModal(true)
      }
    } else {
      setCheckSplitPayment(true);
    }
  }

  const initPayment = () => {
    // let billing = {'expense_above_7l': isAbove7L ? true : travelExpense ? false : true, tax_regime: taxRegime, ...billingAddress}
    let billing = {}
    if (!nri && bookingData?.booking?.is_international) {
      billing = { 'expense_above_7l': !travelExpense, tax_regime: taxRegime, ...billingAddress }
    } else {
      billing = { ...billingAddress }
    }
    const _payload = {
      booking_id: bookingData?.booking.id,
      billing_address: billing,
      payment_for: PaymentType
    };

    setLoading(true);
    completePayment(_payload)
      .unwrap()
      .then((res: any) => {
        setLoading(false);
        navigate('/payment-method', { state: { paymentData: res, billingAddress: billingAddress, bookingData: bookingData, payment_for: PaymentType, promo_code: couponCode } });
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setLoading(false);
      });
  }


  const PaymentProcess = () => {
    const GAData = {
      currency: "INR",
      value: bookingData?.booking?.total,
      items: store.GADataShoreEx
    }
    if (PaymentType == "single_payment") {
      TiggerGAInitiatePayment(GAData)
    } else if (PaymentType == "split_payment") {
      let res = bookingData?.booking?.split_payment_options?.options
      const firstItem = res[0];
      if (!firstItem.paid) {
        TiggerGAInitiatePayment(GAData)
      }
    }
    if (PaymentType === 'single_payment') {
      initPayment();
    }
    else if (PaymentType === 'split_payment') {
      setSelectSplitModal(false)
      setSplitModal(true)
    }
  }

  const splitPaymentRedirect = () => {
    initPayment();
  }

  const splitPaymentDesign = () => {
    let res: any = []
    if (bookingData?.booking?.is_international && bookingData?.booking?.status === "ON_HOLD") {
      res = tcsObject?.split_payment_options?.options
    } else {
      res = bookingData?.booking?.split_payment_options?.options
    }

    // let res = []
    // if (bookingData?.booking?.is_international && bookingData?.booking?.status === "ON_HOLD") {
    //   if (panCard) {
    //     res = bookingData?.booking?.tcs_with_pan?.split_payment_options.options
    //   } else {
    //     res = bookingData?.booking?.tcs?.split_payment_options.options
    //   }
    // } else {
    //   res = bookingData?.booking?.split_payment_options?.options
    // }


    return res?.map((val: any, key: any) => {
      return key === removeByClass(res) ?
        <div className='flex justify-between px-3 py-3 rounded border border-brand-primary mb-2'>
          <p className='text-sm font-semibold text-brand-primary'>{ordinal_suffix_of(key + 1)} Transaction</p>
          <p className='text-sm font-semibold text-brand-primary'>₹ {val.amount}</p>
        </div> :
        <div className='flex justify-between px-3 py-3 rounded border border-gray-200 mb-2'>
          <p className='text-sm font-semibold text-gray-100'>{ordinal_suffix_of(key + 1)} Transaction</p>
          <p className='text-sm font-semibold text-gray-100'>₹ {val.amount}</p>
        </div>
    }
    )
  }

  const ShoreEx = () => {
    if (bookingData?.booking.shore_excursions) {
      return bookingData?.booking.shore_excursions.map((v: any, i: number) =>
        <div key={i} className="relative mb-6">
          <Glider
            hasArrows
            hasDots
            scrollLock
            slidesToShow={1}
          >
            {v.images.map((v: any, i: number) =>
              <img className='w-full !h-[180px] rounded-lg' src={v} />
            )}
          </Glider>
          <div className='absolute top-0 bottom-0 left-0 right-0 px-4 py-4 bg-black/60 rounded-lg'>
            <p className='font-semibold text-white text-sm'>{v.title}</p>
            <div className='flex items-center mt-3'>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calender-white.svg"
                className="h-3 mr-3 mt-0.5 lg:h-3"
                alt="Cruise"
              />
              <p className='text-white text-xs font-medium'>{v.date}</p>
            </div>
            <div className='flex items-center mt-3'>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-icon-white.svg"
                className="h-3 mr-3 mt-0.5 lg:h-3"
                alt="Cruise"
              />
              <p className='text-white text-xs font-semibold'>{v.hours} Hrs {v.minutes ? v.minutes + ' Min' : ''}</p>
            </div>
            <div className='flex items-center mt-3'>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-white.svg"
                className="h-3 mr-3 mt-0.5 lg:h-3"
                alt="Cruise"
              />
              <p className='text-white text-xs font-semibold'>{v.guests.length} Guests</p>
            </div>
          </div>
        </div>
      )
    }
  }

  const checkVerifyPan = () => {
    if (getValues('billing_address.pan') && getValues('billing_address.pan').length == 10) {
      setIsPanLoading(true)
      const _payload = {
        pan: getValues('billing_address.pan')
      };
      verifyPan(_payload)
        .unwrap()
        .then((res: any) => {
          setIsPanVerified(true)
          setPanVerifiedFailMsg('Verified')
          setIsPanLoading(false)
        })
        .catch((res: any) => {
          setIsPanLoading(false)
          setPanVerifiedFailMsg('Invalid PAN Number')
          console.log('Error: ', res);
        });
    } else {
      setIsPanLoading(false)
      setIsPanVerified(false)
      setPanVerifiedFailMsg('')
    }
  }

  const checkVerifyGST = () => {
    if (getValues('billing_address.gstin') && getValues('billing_address.gstin').length == 15) {
      setIsGstLoading(true)
      const _payload = {
        gstin: getValues('billing_address.gstin')
      };
      verifyGST(_payload)
        .unwrap()
        .then((res: any) => {
          setIsGstVerified(true)
          setGstVerifiedFailMsg('Verified')
          setIsGstLoading(false)
        })
        .catch((res: any) => {
          setIsGstLoading(false)
          setGstVerifiedFailMsg('Invalid GSTIN')
          console.log('Error: ', res);
        });
    } else {
      setIsGstLoading(false)
      setIsGstVerified(false)
      setGstVerifiedFailMsg('')
    }
  }

  if (loadingQuotationData && !bookingData) {
    return (
      <p>Loading...</p>
    )
  }


  if (!bookingData) {
    return (
      <p>Loading</p>
    )
  }
  console.log('roh bookingData', bookingData);

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="assets/icons/footer/chevon-down.svg"
              alt="arrow"
              onClick={() => navigate('/offers')}
              className={`self-center justify-self-start mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 mb-2 lg:hidden`}
            />
            <h1 className="text-xl font-medium mb-3 lg:text-3xl">
              Payment Summary
            </h1>
          </div>

          <div className="border border-gray-400 shadow-allSide rounded-lg mb-4">
            <div className="grid grid-cols-2 border-b border-gray-300 px-6 py-3">
              <div className="">
                <p className="text-xxs lg:text-sm text-gray-100 font-semibold">ORDER ID</p>
                <p className="text-base lg:text-xl text-brand-primary font-bold mt-0.5">{`${bookingData?.booking?.number}`}</p>
              </div>
              <div className="text-right">
                <p className="text-xxs lg:text-sm text-gray-100 font-semibold">
                  Grand Total
                </p>
                {bookingData?.itinerary?.discount_pct != 0 ?
                  <p className="text-xs lg:text-base text-gray-100 font-semibold line-through">{`₹ ${FormatPrice(
                    bookingData?.booking?.actual_total
                  )}`}</p>
                  : null}
                <p className="text-base lg:text-2xl text-brand-primary font-bold">{`₹ ${FormatPrice(
                  bookingData?.booking?.total
                )}`}</p>
              </div>
            </div>


            <div className="grid grid-cols-9 mt-3 gap-4 lg:gap-10 lg:p-10 p-4">
              <div className='flex justify-between col-span-9 lg:col-span-5'>
                <div className="pr-2 lg:pr-0 w-1/2">
                  {bookingData?.itinerary?.ports.map(
                    (val: any, i: any) =>
                      val.name !== 'At Sea' && (
                        <div key={i} className="mb-2 lg:mb-3">
                          {i === 0 ? (
                            <div>
                              <div className="flex items-center mb-1 lg:mb-2">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg"
                                  className="h-3 mr-2 lg:h-4"
                                  alt="Cruise"
                                />
                                <p className="text-xxs lg:text-sm text-gray-100 font-semibold">
                                  DEPARTURE
                                </p>
                              </div>
                              <p className="text-xs lg:text-base font-medium">{`${val.name}, ${val.country}`}</p>
                              <p className="text-xs lg:text-base font-medium">{`${val.departure || val.arrival}`}</p>
                            </div>
                          ) : i !== 0 &&
                            bookingData?.itinerary?.ports.length - 1 === i ? (
                            <div className='pt-2'>
                              <div className="flex items-center mb-1 lg:mb-2">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg"
                                  className="h-3 mr-2 lg:h-4"
                                  alt="Cruise"
                                />
                                <p className="text-xxs lg:text-sm text-gray-100 font-semibold">
                                  ARRIVAL
                                </p>
                              </div>
                              <p className="text-xs lg:text-base font-semibold">{`${val.name}, ${val.country}`}</p>
                              <p className="text-xs lg:text-base font-semibold">{`${val.arrival}`}</p>
                            </div>
                          ) : (
                            <div className='py-2'>
                              <div className="flex items-start">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg"
                                  className="h-3 mr-2 mt-0.5 lg:h-4"
                                  alt="Cruise"
                                />
                                <div>
                                  <p className="text-xxs lg:text-sm text-gray-100 font-semibold">{`${val.name}, ${val.country}`}</p>
                                  <p className="text-xxs lg:text-sm text-gray-100 font-semibold">{`${val.arrival}`}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>

                <div className="w-1/2 pl-6 lg:pl-0">
                  {bookingData?.booking?.rooms.map((room: any, index: number) => {
                    const TotalGuest = room.guests;
                    const roomName = room.category_name
                    return (
                      <div className="mb-3" key={index}>
                        <p className="text-xxs lg:text-sm text-gray-100 font-semibold mb-2">{`CABIN ${index + 1
                          }`}</p>
                        <div className="flex items-center">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-icon.svg"
                            className="h-3 lg:h-4 mr-2 ml-1"
                            alt="Cruise"
                          />
                          <p className="text-xs lg:text-base font-semibold">
                            {`${TotalGuest} Guests`}{' '}
                          </p>
                        </div>
                        <div className="flex items-center mt-1">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                            className="h-3 lg:h-4 mr-2"
                            alt="Cruise"
                          />
                          <p className="text-xs lg:text-base font-semibold">{roomName}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='lg:pl-16 lg:pr-6 lg:pb-3 col-span-9 lg:col-span-4'>
                <ShoreEx />
              </div>
            </div>
          </div>

          <div className="border border-gray-400 shadow-allSide rounded-lg px-4 lg:px-6 py-4 lg:py-6 mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 cursor-pointer"
                onChange={(e) => {
                  setValue('billing_address.international', `${e.target.checked ? true : false}`)
                  setNri(e.target.checked)
                  setIsPanVerified(e.target.checked)
                }}
              />
              <h1 className={`text-lg lg:text-2xl font-semibold`}>I am a NRI</h1>
            </div>
            {bookingData?.booking?.is_international &&
              <p className='text-sm lg:text-lg mt-2 lg:mt-4 leading-7 lg:leading-8 lg:pr-6'><span className='font-semibold'>Important Notice:</span> For an NRI (Non-Residential Indian) <span className='font-semibold text-brand-primary'>20% TCS (Tax Collected at Source) will be imposed on the Total</span></p>
            }
          </div>

          {bookingData?.booking?.is_international && !nri &&
            <>
              <div className="border border-gray-400 shadow-allSide rounded-lg mb-4">
                <div className='border-b border-gray-300 px-4 lg:px-6 py-4 lg:py-6'>
                  <h1 className='text-lg lg:text-2xl font-semibold'>TCS (Tax Collected at Source) Charges</h1>
                </div>
                <div className=' px-4 lg:px-6 py-4 lg:py-6'>
                  <h1 className='text-base lg:text-xl font-semibold'>Select Tax Regime</h1>
                  <div className='flex mt-4'>
                    <div className={`flex items-center ${'old_regime' == taxRegime ? 'border border-brand-primary text-brand-primary' : 'bg-gray-400'}  rounded-lg cursor-pointer px-2 lg:px-6 py-3 mr-2 lg:mr-4`} onClick={() => setTaxRegime('old_regime')}>
                      <input className='text-brand-primary mr-2' type="radio" name='tax_regime' checked={'old_regime' == taxRegime ? true : false} />
                      <p className='text-sm lg:text-lg font-semibold'>Old Tax Regime</p>
                    </div>
                    <div className={`flex items-center ${'new_regime' == taxRegime ? 'border border-brand-primary text-brand-primary' : 'bg-gray-400'}  rounded-lg cursor-pointer px-2 lg:px-6 py-3`} onClick={() => setTaxRegime('new_regime')}>
                      <input className='text-brand-primary mr-2' type="radio" name='tax_regime' checked={'new_regime' == taxRegime ? true : false} />
                      <p className='text-sm lg:text-lg font-semibold'>New Tax Regime</p>
                    </div>
                  </div>
                </div>
                <div className='px-4 lg:px-6 py-4 lg:py-6 border-t border-gray-300'>
                  <h1 className='text-base lg:text-xl font-semibold'>Applicable Travel Expenses</h1>
                  <div className={`flex items-center ${isAbove7L ? 'cursor-not-allowed text-gray-100' : 'cursor-pointer'} my-4`}
                    onClick={() => {
                      isAbove7L ? null : setTravelExpense(!travelExpense)
                    }}
                  >
                    <input className={`text-brand-primary ${isAbove7L ? 'cursor-not-allowed text-gray-100' : 'cursor-pointer'} mr-2`} disabled={isAbove7L ? true : false} type="radio" name='travel_expense' checked={travelExpense} />
                    <p className='text-base lg:text-lg font-semibold'>If Travel Expenses less than 7 Lakhs?</p>
                  </div>
                  <p className='text-gray-600 lg:pr-10 leading-7 lg:leading-8 text-sm lg:text-lg'>I declare that my current Financial Year's Travel Expense is &lt; (less than) 7 Lakhs and </p>
                  <p className='text-gray-600 lg:pr-10 leading-7 lg:leading-8 text-sm lg:text-lg'>I agree to pay <span className={`font-semibold ${travelExpense ? 'text-brand-primary' : 'text-gray-700'}`}>5% TCS (Tax Collected at Source) that is applicable on the Total</span></p>
                  <p className='text-black lg:pr-10 leading-7 lg:leading-8 text-sm lg:text-lg mt-4'><span className='font-semibold'>Important Notice:  </span> If your Current Financial Year's Travel Expense exceeds 7 Lakhs then a</p>
                  <p className={`${travelExpense ? 'text-gray-700' : 'text-brand-primary'} lg:pr-10 leading-7 lg:leading-8 text-sm lg:text-lg font-semibold`}>20% TCS (Tax Collected at Source) will be imposed on the Total</p>
                </div>
              </div>
              <div className="border-2 border-brand-primary rounded-lg mb-4 grid gap-8 lg:gap-2 grid-cols-3 px-6 py-6">
                <div className="flex col-span-3 lg:col-span-1">
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tax-charge.svg"
                    className="h-4 lg:h-5 mr-2 mt-0"
                    alt="Cruise"
                  />
                  <div>
                    <p className='text-sm lg:text-[1.10rem] text-brand-primary font-bold leading-4'>Tax Charges</p>
                    <p className='text-xs lg:text-base mt-3'> Tax collection at the source is mandatory as per government regulations</p>
                  </div>
                </div>
                <div className="flex col-span-3 lg:col-span-1">
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/claim-credit.svg"
                    className="h-4 lg:h-5 mr-2 mt-0"
                    alt="Cruise"
                  />
                  <div>
                    <p className='text-sm lg:text-[1.10rem] text-brand-primary font-bold leading-4'>Claiming your credit</p>
                    <p className='text-xs lg:text-base mt-3'>TCS collected is claimable as a credit against the tax payable during return filing.</p>
                    <p className='text-xs lg:text-base mt-1 font-semibold'>(Applicable for Indians Only)</p>
                  </div>
                </div>
                <div className="flex col-span-3 lg:col-span-1">
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tcs-collect.svg"
                    className="h-4 lg:h-4 mr-2 mt-0"
                    alt="Cruise"
                  />
                  <div>
                    <p className='text-sm lg:text-[1.10rem] text-brand-primary font-bold leading-4'>TCS is collected via Cordelia Cruise</p>
                    <p className='text-xs lg:text-base mt-3'>TCS credits reflect quarterly in Form 26AS, detailing deductions, collections, and payments, including seller-collected TCS. These updates aid in tracking and verifying tax statements.</p>
                  </div>
                </div>
              </div>
            </>
          }



          <div className='border border-gray-400 rounded-lg shadow-allSide'>
            <div className="">
              <Accordian
                mainClass='cursor-pointer px-6 py-6'
                openByDefault={true}
                title="PRICE DETAILS"
                titleClass="text-brand-primary text-sm lg:text-lg font-bold"
              >
                <div className='border-t mt-5 pt-5 border-gray-300'>
                  {bookingData?.booking?.rooms.map((room: any, index: number) => {
                    return (
                      <div className="grid grid-cols-3" key={index}>
                        <div className="col-span-2">
                          <p className="text-sm lg:text-lg font-semibold">{`CABIN ${index + 1
                            } FARE`}</p>
                          <p className="text-sm lg:text-lg font-semibold mt-1.5">
                            Service Charge & Levies
                          </p>
                          <p className="text-sm lg:text-lg font-semibold mt-1.5">
                            Fuel Surcharge
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-lg font-semibold">{`₹ ${FormatPrice(room.actual_cabin_fare)}`}</p>
                          <p className="text-sm lg:text-lg font-semibold mt-1.5">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                          <p className="text-sm lg:text-lg font-semibold mt-1.5">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p>
                        </div>
                      </div>
                    );
                  })}
                  {bookingData?.booking.protection_plan && bookingData?.booking.protection_plan.amount > 0 ?
                    <div className="grid grid-cols-3 mt-3">
                      <div className="col-span-2">
                        <p className="text-sm lg:text-lg font-semibold">Protection Plan:</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm lg:text-lg font-semibold">₹{FormatPrice(bookingData?.booking.protection_plan.amount)}</p>
                      </div>
                    </div>
                    : null
                  }
                  {bookingData?.booking?.cabin_fare_discount != 0 ?
                    <div className="grid grid-cols-3 mt-3">
                      <div className="col-span-2">
                        <p className="text-sm lg:text-lg font-semibold">Discount:</p>
                        {bookingData?.booking?.discount_text && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{bookingData?.booking?.discount_text}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm lg:text-lg font-semibold text-brand-green">- ₹{FormatToString(bookingData?.booking.cabin_fare_discount)}</p>
                      </div>
                    </div>
                    : null
                  }

                  {bookingData?.booking.shore_excursion_net_total ?
                    <div className="grid grid-cols-3 mt-3">
                      <div className="col-span-2">
                        <p className="text-sm lg:text-lg font-semibold">Shore Excursions:</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm lg:text-lg font-semibold">₹{FormatToString(bookingData?.booking.shore_excursion_net_total)}</p>
                      </div>
                    </div>
                    : null
                  }

                  {bookingData?.booking && bookingData?.booking.total_discounts ?
                    <div className="grid grid-cols-3 mt-3">
                      <div className="col-span-2">
                        <p className="text-sm lg:text-lg font-semibold">Total Discount:</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm lg:text-lg font-semibold">{`- ₹ ${FormatToString(parseInt(
                          bookingData?.booking.total_discounts
                        ).toFixed())}`}</p>
                      </div>
                    </div>
                    : null
                  }

                  <div className="grid grid-cols-3 mt-3">
                    <div className="col-span-2">
                      <p className="text-sm lg:text-lg font-semibold">Sub-total:</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm lg:text-lg font-semibold">{`₹ ${FormatToString(parseInt(
                        bookingData?.booking?.sub_total
                      ).toFixed())}`}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 mt-3">
                    <div className="col-span-2">
                      <p className="text-sm lg:text-lg font-semibold">Taxes:</p>
                      <p className="text-sm lg:text-lg text-gray-100 font-semibold mt-1">
                        GST:
                      </p>
                      {bookingData?.booking.shore_excursion_gst ? <p className="text-sm lg:text-lg text-gray-100 font-semibold mt-1.5">
                        Shore Excursion:
                      </p> : null}
                    </div>
                    <div className="text-right">
                      <p className="text-sm lg:text-lg font-bold">
                        {`₹ ${FormatToString((bookingData?.booking?.gst + (bookingData?.booking?.shore_excursion_gst || 0)).toFixed())}`}</p >
                      {
                        bookingData && bookingData?.booking && bookingData?.booking?.gst ?
                          <p className="text-sm lg:text-lg text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(bookingData?.booking?.gst.toFixed())}`}</p>
                          : null
                      }
                      {bookingData?.booking?.shore_excursion_gst ? <p className="text-sm lg:text-lg text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(bookingData?.booking?.shore_excursion_gst.toFixed())}`}</p> : null}
                    </div>
                  </div>
                  {tcsObject &&
                    <>
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-base lg:text-xl font-bold">Total:</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base lg:text-xl font-bold">{`₹ ${FormatToString(
                            bookingData?.booking?.total
                          )}`}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-lg font-semibold">TCS:</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-lg font-semibold">{`₹ ${FormatToString(parseInt(
                            tcsObject.amount
                          ).toFixed())}`}</p>
                        </div>
                      </div>
                    </>
                  }
                  <div className="grid grid-cols-3 items-end mt-3">
                    <div className="col-span-2">
                      <p className="text-base lg:text-2xl font-bold text-brand-primary">Grand Total:</p>
                    </div>
                    <div className="text-right">
                      {bookingData?.itinerary?.discount_pct != 0 ? <p className="text-sm lg:text-base line-through font-semibold text-gray-100">{`₹ ${FormatToString(
                        bookingData?.booking?.actual_total + (tcsObject?.amount || 0)
                      )}`}</p>
                        : null
                      }
                      <p className="text-base lg:text-2xl font-bold text-brand-primary">{`₹ ${FormatToString(
                        bookingData?.booking?.total + (tcsObject?.amount || 0)
                      )}`}</p>
                    </div>
                  </div>
                </div >
              </Accordian >
            </div >

            <div className="border-t border-gray-300">
              <Accordian
                mainClass="cursor-pointer px-6 py-5"
                openByDefault={false}
                title="Cancellation and Reschedule Policy"
                titleClass="text-sm font-semibold lg:text-base"
              >
                <div className='px-6 mt-6'>
                  <p className='text-xs font-bold underline'>CANCELLATION FEE</p>
                  <table className='w-full lg:w-1/2 mt-2'>
                    <tr>
                      <th className='w-1/2 border'>Days To Depature</th>
                      <th className='w-1/2 border'>Fee</th>
                    </tr>
                    <tr>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>31 days and above to departure	</td>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>0% of cabin fare (Full Refund)</td>
                    </tr>
                    <tr>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>21 to 30 days to departure	</td>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>75% of cabin fare</td>
                    </tr>
                    <tr>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>0 to 20 days to departure	</td>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>100% of cabin fare</td>
                    </tr>
                  </table>
                  <ul className='list-disc text-sm font-semibold mt-2'>
                    <li>Cancellation is only allowed for a complete cabin.</li>
                    <li>Partial individual cancellation is not allowed. <br />For e.g. In case 4 PAX are booked in a cabin and 2PAX want to cancel, cancellation will be for entire cabin.</li>
                    <li>Service Charges, Levies & fuel charges will be refunded.</li>
                    <li>In case of NO SHOW Service Charges, Levies & Fuel charges will be refunded.</li>
                    <li>In case of death or major illness of a passenger, 100% refund will be made for a cabin with valid proof. <br />This will be applicable for existing customers. <br />Cancellation should be informed before departure via Email or Call to Customer care.</li>
                    <li>Refund will be processed within 15 working days from the cancellation date.</li>
                  </ul>
                  <p className='text-xs font-bold underline uppercase mt-3'>Rescheduling Fee</p>
                  <table className='w-full lg:w-1/2 mt-2'>
                    <tr>
                      <th className='w-1/2 border'>Days to depature</th>
                      <th className='w-1/2 border'>Fee</th>
                    </tr>
                    <tr>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>31 days and above</td>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>INR 2000 per cabin + Fare difference, if any</td>
                    </tr>
                    <tr>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>21 -30 days to departure</td>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>INR 7000 per cabin + Fare difference, if any</td>
                    </tr>
                    <tr>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>0 to 20 day to departure</td>
                      <td className='w-1/2 border text-sm px-3 font-semibold'>No rescheduling permitted. It shall be treated as a cancellation</td>
                    </tr>
                  </table>
                  <ul className='list-disc text-sm font-semibold mt-2'>
                    <li>Rescheduled itinerary must commence within 6 months from the original itinerary date.</li>
                    <li>Fare difference (Difference in Cabin Fare, Service charges & Levies, Taxes & Fuel charges) if any will be payable by the customer.</li>
                    <li>There will be no refund in case of date change from higher cabin fare to lower cabin fare date.</li>
                    <li>GST will be applicable on any payable amount.</li>
                    <li>Free rescheduling – in case of death of immediate family member or severe illness with valid death certificate. Cabin fare applicable if any.</li>
                  </ul>
                </div>
              </Accordian>
            </div>
            < div className="border-t border-gray-300 p-6 py-5" >
              <a href="https://images.cordeliacruises.com/static/insurance_web_document.pdf" target="_blank" className="text-sm font-semibold lg:text-base">Cordelia Cruises Insurance Benefit Document</a>
            </div >
            <div className="border-t border-gray-300 p-6 py-5">
              <a href='https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/static/Other_Policy.pdf' target="_blank" className="text-sm font-semibold lg:text-base">Other Additional Charges</a>
            </div>
          </div>
        </div >




        {bookingData?.booking?.split_payment && bookingData?.booking?.status === "RESERVED" ? null :
          <>
            <div className='mt-4'>
              <Accordian
                openByDefault={true}
                title="Billing Details"
                titleClass="text-base font-bold lg:text-xl"
                mainClass="border-1 shadow-allSide px-4 lg:px-6 pt-6 pb-3 rounded-lg border-gray-300 cursor-pointer"
              >
                <div className="border-t mt-6 border-gray-300">
                  <div className='grid lg:grid-cols-2 lg:gap-4 mt-6'>
                    <Input
                      type="text"
                      register={register}
                      validation={FullName}
                      onChange={(e: any) => setValue('billing_address.name', e.target.value)}
                      name="billing_address.name"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                      placeholder="Full Name"
                      error={
                        errors &&
                        errors?.billing_address &&
                        errors?.billing_address.name
                      }
                      errorText={errors && errors.billing_address?.name?.message}
                    />
                    <Input
                      type="tel"
                      register={register}
                      validation={Phone}
                      onChange={(e: any) => setValue('billing_address.phone', e.target.value)}
                      maxLength={'10'}
                      name="billing_address.phone"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                      placeholder="Phone Number"
                      error={
                        errors &&
                        errors?.billing_address &&
                        errors?.billing_address.phone
                      }
                      errorText={errors && errors.billing_address?.phone?.message}
                    />
                  </div>
                  <div className='grid lg:grid-cols-2 lg:gap-4'>
                    <Input
                      type="email"
                      register={register}
                      validation={Email}
                      onChange={(e: any) => setValue('billing_address.email', e.target.value)}
                      name="billing_address.email"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                      placeholder="Email"
                      error={
                        errors &&
                        errors?.billing_address &&
                        errors?.billing_address.email
                      }
                      errorText={errors && errors.billing_address?.email?.message}
                    />
                    <Input
                      type="text"
                      register={register}
                      validation={Address}
                      onChange={(e: any) => setValue('billing_address.address2', e.target.value)}
                      name="billing_address.address2"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                      placeholder="Address"
                      error={
                        errors &&
                        errors?.billing_address &&
                        errors?.billing_address.address2
                      }
                      errorText={errors && errors.billing_address?.address2?.message}
                    />
                  </div>
                  <div className='grid lg:grid-cols-2 lg:gap-4'>
                    <div>
                      <Input
                        type="pincode"
                        register={register}
                        validation={Pincode}
                        onChange={(e: any) => {
                          setPincode(e.target.value)
                          setValue('billing_address.pincode', e.target.value)
                        }}
                        name="billing_address.pincode"
                        inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                        placeholder="Pincode"
                        maxLength='6'
                        inputMode="numeric"
                        autoComplete="postal-code"
                        error={
                          errors &&
                          errors?.billing_address &&
                          errors?.billing_address.pincode || errors?.billing_address?.address1
                        }
                        errorText={errors && errors.billing_address?.pincode?.message || errors?.billing_address?.address1?.message}
                      />
                      {!!addressData && addressData?.codes[0] &&
                        <p className='mb-4'>{`${addressData?.codes[0].city}, ${addressData?.codes[0].state}, ${addressData?.codes[0].country}`}</p>
                      }
                    </div>
                    <div>
                      {!nri ?
                        <>
                          <div className='flex w-full items-center relative mb-4'>
                            <Input
                              type="text"
                              register={register}
                              // validation={PanNo}
                              maxLength='10'
                              onChange={(e: any) => {
                                setValue('billing_address.pan', e.target.value)
                                checkVerifyPan()
                              }}
                              name="billing_address.pan"
                              inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full uppercase placeholder:capitalize"
                              className='w-full mb-0'
                              placeholder="Pan number"
                              error={
                                errors &&
                                errors?.billing_address &&
                                errors?.billing_address.pan
                              }
                              errorText={errors && errors.billing_address?.pan?.message}
                            />
                            {isPanLoading &&
                              <div role="status" className='absolute right-2'>
                                <svg aria-hidden="true" className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                              </div>
                            }
                          </div>
                          <p className={`${isPanVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mb-4`}>{panVerifiedFailMsg}</p>
                        </>
                        : null
                      }
                    </div>
                  </div>
                </div>
              </Accordian>
            </div>
          </>
        }

        {!nri &&
          <div>
            <div className={`border p-4 lg:p-6 mt-4 rounded-lg border-gray-400 shadow-allSide`}>
              <p className={`italic text-xxs lg:text-xs font-semibold mb-2`}>Kindly submit GST details for seamless filing of your tax return</p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  onChange={(e) => setGst(e.target.checked)}
                />
                <p className={`text-base lg:text-xl font-bold`}>I Have a GST Number</p>
              </div>
              {gst && (
                <div className="border-t mt-3 border-gray-300">
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <div className='flex items-center relative mt-4'>
                        <Input
                          type="text"
                          register={register}
                          validation={GSTIN}
                          maxLength='15'
                          name="billing_address.gstin"
                          inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base py-3.5 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full uppercase placeholder:capitalize"
                          className='w-full mb-0'
                          onChange={(e: any) => {
                            setValue('billing_address.gstin', e.target.value)
                            checkVerifyGST()
                          }}
                          placeholder="GSTIN"
                          error={
                            errors &&
                            errors?.billing_address &&
                            errors?.billing_address.gstin
                          }
                          errorText={errors && errors.billing_address?.gstin?.message}
                        />
                        {isGstLoading &&
                          <div role="status" className='absolute right-2'>
                            <svg aria-hidden="true" className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                          </div>
                        }
                      </div>
                      <p className={`${isGstVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mt-0.5`}>{gstVerifiedFailMsg}</p>
                    </div>
                    <Input
                      type="text"
                      register={register}
                      validation={FullName}
                      name="billing_address.gstName"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base py-3.5 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full mt-4"
                      placeholder="Name"
                      error={
                        errors &&
                        errors?.billing_address &&
                        errors?.billing_address.gstName
                      }
                      errorText={errors && errors.billing_address?.gstName?.message}
                    />
                  </div>

                  <p className="italic text-xxs font-semibold">
                    Note: GST Number once submitted will not be subject to change.
                  </p>
                </div>
              )}
            </div>
          </div>
        }

        <div>
          <div className={`border p-4 lg:p-6 mt-4 rounded border-gray-400 shadow-allSide`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                onChange={(e) => setConsent(e.target.checked)}
              />
              <p className={`lg:text-xl text-sm font-bold`}>By clicking Agree and Continue, I hereby:</p>
            </div>
            <div className="border-t mt-6 border-gray-300">
              <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-3 mb-2 leading-5">
                Agree and consent to the Privacy Policy, Cancellation and Rescheduling Policy, Passenger Cruise Ticket Contract  and all other Terms and Conditions as appear hereinabove and on website www.cordeliacruises.com.
              </p>
              {bookingData && bookingData?.booking && bookingData?.booking.is_international ? (
                <div>
                  <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-3 mb-2">
                    Agree to pay TCS charges applicable as per below:
                  </p>
                  <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-0 mb-0.5">
                    In the financial year, if the Tour expenses are less than 7 lacs then 5% TCS will be levied
                  </p>
                  <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-0 mb-0.5">
                    In the financial year, if the Tour expenses are more than 7 lacs then 20% TCS will be levied
                  </p>
                  <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-0 mb-0">
                    TCS will apply to the total cost (i.e.((Cabin fare + Service Charge & Levies + Fuel charge) *GST)*TCS)
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='"mt-4"'>
          {consent ?
            <button
              onClick={handleSubmit(proceedToPay)}
              className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
              disabled={Loading || !isPanVerified || (gst ? !isGstVerified : null)}
            >
              {Loading ? (
                <span className="loading-elipses">Loading</span>
              ) : (
                'Proceed to payment'
              )}

            </button>
            :
            <button
              className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
              disabled={true}
            >
              Proceed to payment
            </button>
          }
        </div>
      </main >

      <Modal show={SelectSplitModal} align={'center'} className=" bg-white w-[90%] lg:w-2/4 center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto	" onClose={() => setSelectSplitModal(false)}>
        <div className='border-brand-primary p-4 mb-4 flex items-center text-center bg-brand-primary text-white' onClick={() => setSelectSplitModal(false)}>
          <p className='text-xs font-semibold'>Some cards and UPI have transaction limits that may cause the payment to fail.</p>
        </div>
        <div className='pb-5 lg:pb-10'>
          <h1 className='text-lg font-semibold text-center pb-5 pt-2'>How would you like to pay?</h1>
          <div className='flex items-start border-t p-5' onClick={() => setPaymentType('single_payment')}>
            <img className='mt-1'
              src={PaymentType === 'single_payment' ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg'}
              alt="" />
            <div className='ml-2'>
              <p className='text-sm font-semibold'>Pay in single transaction</p>
              <p className='text-xxs font-semibold'>I can pay {`₹ ${FormatToString(
                bookingData?.booking?.total + (tcsObject?.amount || 0)
              )}`} in one transaction</p>
            </div>
          </div>
          <div className='flex items-start border-t pt-5 px-5' onClick={() => setPaymentType('split_payment')}>
            <img className='mt-1'
              src={PaymentType === 'split_payment' ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg'}
              alt="" />
            <div className='ml-2'>
              <p className='text-sm font-semibold'>Split payment</p>
              <p className='text-xxs font-semibold'>Split into multiple transaction of less than Rs. 50,000 each</p>
            </div>
          </div>
          {PaymentType ?
            <div className='flex items-start pt-5 px-5' >
              <button
                onClick={PaymentProcess}
                className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3"
                disabled={Loading}
              >
                {Loading ? (
                  <span className="loading-elipses">Loading</span>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
            : null
          }
        </div>
      </Modal>

      <Modal show={SplitModal} align={'center'} className=" w-[90%] lg:w-2/4 center bg-white overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[80%] relative" onClose={() => setSplitModal(false)}>
        <div className='border-b border-gray-300 p-4 mb-4 flex items-center' onClick={() => setSplitModal(false)}>
          <img
            src="assets/icons/footer/chevon-down-black.svg"
            alt="arrow"
            className={`self-center justify-self-end mr-5 rotate-90`}
          />
          <h1 className='text-lg font-semibold'>Your Split Payment</h1>
        </div>
        <div className='overflow-scroll h-[90%] lg:h-[85%] pb-5 lg:pb-2 px-4'>
          <div className='flex items-center justify-between p-5 pt-1'>
            <p className='font-bold text-lg'>Grand Total</p>
            <p className='font-bold text-lg'>{`₹ ${FormatToString(
              bookingData?.booking?.total + (tcsObject?.amount || 0)
            )}`}</p>
          </div>
          {splitPaymentDesign()}
          <div className='flex items-start pt-2' >
            <button
              onClick={splitPaymentRedirect}
              className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3"
              disabled={Loading}
            >
              {Loading ? (
                <span className="loading-elipses">Loading</span>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </Layout >
  );
}
