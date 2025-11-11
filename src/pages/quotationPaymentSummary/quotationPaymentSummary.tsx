import React, { useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import Accordian from '../../components/UI/Accordion/accordion_basic';
import { useNavigate } from 'react-router-dom';
import { FormatToString, ordinal_suffix_of, FormatPrice, FormatAmount } from '../../../src/utils/formatter/formatter';
import { Input } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { FullName, Phone, Email, Pincode, GSTIN, Address, PanNo, Required } from '../../../src/utils/validations/formValidations';
import Modal from '../../components/UI/ModalCenter';
import { useGetAddressFromPincodeQuery, useInitPaymentNewMutation , useApplyCouponMutation, useRemoveCouponMutation, useGetCouponMutation, useApplyNewCouponMutation, useRemoveNewCouponMutation, useVerifyPanMutation, useVerifyGSTMutation } from '../../../src/services/payments/payment';
import { useGetBookingByQuotationsMutation } from '../../../src/services/itinerary/itinerary';
import { setCouponCodeProp } from '../../../src/services/itinerary/itinerarySlice';
import { useDispatch, useSelector } from 'react-redux'
import { CheckDevice } from '../../../src/utils/deviceType/device';
import toast, { Toaster } from 'react-hot-toast';

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

export default function QuotationPaymentSummary({ }: Props) {
  const dispatch = useDispatch();
  const ItineraryProp = useSelector((state: any) => state.Itinerary);

  const [billingAddress, setBillingAddress] = useState<any>();
  const [pincode, setPincode] = useState<string>('');
  const [gst, setGst] = useState<any>(false);
  const [nri, setNri] = useState<any>(false);
  const [consent, setConsent] = useState<any>(false);

  const [SelectSplitModal, setSelectSplitModal] = useState<any>(false);
  const [booking, setBooking] = useState<any>([]);
  const [PaymentType, setPaymentType] = useState<any>(null);
  const [SplitModal, setSplitModal] = useState<any>(false);
  const [checkSplitPayment, setCheckSplitPayment] = useState<any>(false);
  const [Loading, setLoading] = useState<any>(false);
  const [couponCode, setCouponCode] = useState<any>('');
  const [couponApplied, setCouponApplied] = useState<any>(false);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<any>('');
  const [isCouponError, setIsCouponError] = useState<any>(false);
  const [quotationData, setQuotationData] = useState<any>();
  const [bookingLoading, setBookingLoading] = useState<any>(false);
  const [couponLoading, setCouponLoading] = useState<any>(false);
  const [couponList, setCouponList] = useState<any>();
  const [selectedCoupon, setSelectedCoupon] = useState<any>();
  const [isPanLoading, setIsPanLoading] = useState<any>(false);
  const [isPanVerified, setIsPanVerified] = useState<any>(null);
  const [panVerifiedFailMsg, setPanVerifiedFailMsg] = useState<any>('');
  const [isGstVerified, setIsGstVerified] = useState<any>(false);
  const [gstVerifiedFailMsg, setGstVerifiedFailMsg] = useState<any>('');
  const [getDetailLoading, setGetDetailLoading] = useState<any>();
  const [isCoupon, setIsCoupon] = useState<any>(false);


  const [isGstLoading, setIsGstLoading] = useState<any>(false);
  const [taxRegime, setTaxRegime] = useState<any>('new_regime');
  const [isAbove7L, setIsAbove7L] = useState<any>(false);
  const [tcsObject, setTcsObject] = useState<any>();
  const [travelExpense, setTravelExpense] = useState<any>(false);
  const [taxType, setTaxType] = useState<any>('tcs');
  const [knowMoreTcs, setKnowMoreTcs] = useState<any>(false);
  const [priceBreakupModal, setPriceBreakupModal] = useState<any>(false);
  const [reserveBooking, setReserveBooking] = useState<any>(false);
  const [gstData, setGstData] = useState<any>([]);
  const [panName, setPanName] = useState<any>('');
  const [reserveTcsObject, setReserveTcsObject] = useState<any>();

  const QUOTATION_ID = new window.URLSearchParams(window.location.search).get('id');
  const PAYMENT_OPTION_ID = new window.URLSearchParams(window.location.search).get('payment_option_id');

  const [completePayment] = useInitPaymentNewMutation();
  const [applyCoupon] = useApplyCouponMutation();
  const [getBookingByQuotations] = useGetBookingByQuotationsMutation();
  const [removeCoupon] = useRemoveCouponMutation();
  const [verifyPan] = useVerifyPanMutation();
  const [verifyGST] = useVerifyGSTMutation();
  const [getCoupon] = useGetCouponMutation();
  const [applyNewCoupon] = useApplyNewCouponMutation();
  const [removeNewCoupon] = useRemoveNewCouponMutation();
console.log(quotationData?.booking);
 
  useEffect(() => {
    // let data = booking;
    // getCoupon(data)
    //   .unwrap()
    //   .then((res: any) => {
    //     setCouponList(res?.data?.coupons)
    //   })
    //   .catch((res: any) => {
    //     console.log('Error: ', res);
    //   });
  }, [])

  const { data: addressData } = useGetAddressFromPincodeQuery(
    pincode,
    { skip: !!!pincode || pincode.length !== 6 }
  );

  useEffect(() => {
    const _payload = {
      id: QUOTATION_ID,
      device: CheckDevice(),
      payment_option_id: PAYMENT_OPTION_ID
    };
    setBookingLoading(true)
    getBookingByQuotations(_payload)
      .unwrap()
      .then((res: any) => {
        if (ItineraryProp.coupon_code) {
          setCouponCode(ItineraryProp.coupon_code)
          console.log(res)
          // applyCouponCode(ItineraryProp.coupon_code, res.booking.id)
        } else {
          setBookingLoading(false)
          setQuotationData(res);
          console.log(res)
          if(res){
            getCoupon(res?.booking?.id)
              .unwrap()
              .then((res: any) => {
                setCouponList(res?.data?.coupons)
              })
              .catch((res: any) => {
                console.log('Error: ', res);
              });
          }
          setBooking(res?.booking?.id)
        }
      })
      .catch((res: any) => {
        setBookingLoading(false)
        console.log('Error: ', res)
      })
  }, [])


  useEffect(() => {
    if (quotationData && quotationData.booking && !isCoupon) {
      setValue('billing_address.pan', quotationData?.booking.billing_address.pan === '-' ? '' : quotationData?.booking.billing_address.pan)
      setValue('billing_address.name', quotationData.booking.billing_address.name === '-' ? '' : quotationData.booking.billing_address.name)
      setValue('billing_address.phone', quotationData.booking.billing_address.phone === '-' ? '' : quotationData.booking.billing_address.phone)
      setValue('billing_address.email', quotationData.booking.billing_address.email === '-' ? '' : quotationData.booking.billing_address.email)
      setValue('billing_address.pincode', quotationData.booking.billing_address.pincode === '-' ? '' : quotationData.booking.billing_address.pincode)
      setPincode(quotationData.booking.billing_address.pincode)
      if (quotationData?.booking.billing_address?.gstin) {
        setGst(true)
        setValue('billing_address.gstin', quotationData?.booking.billing_address.gstin === '-' ? '' : quotationData?.booking.billing_address.gstin)
        setValue('billing_address.gstName', quotationData?.booking.billing_address.name === '-' ? '' : quotationData?.booking.billing_address.name)
      }
    }
    if (quotationData?.booking?.enable_tcs) {
      if (quotationData?.booking?.total > 700000) {
        setIsAbove7L(true)
        setTravelExpense(false)
      } else {
        setIsAbove7L(false)
      }
    }
  if (quotationData?.booking?.discounts[0]?.coupon_code) {
      setCouponCode(quotationData?.booking?.discounts[0]?.coupon_code)
      setCouponApplied(true);
    }
    if (quotationData?.booking?.payment_option_rule != null) {
      setReserveBooking(true)
    }
  }, [quotationData])

  useEffect(()=>{
    if (quotationData?.booking?.discounts[0]?.coupon_code) {
      applyCouponCode(quotationData?.booking?.discounts[0]?.coupon_code)
    }
  },[couponApplied])

  useEffect(() => {
    if (quotationData?.booking.enable_tcs) {
      if (reserveBooking) {
        if (taxType == 'tcs') {
          console.log('roh aaaaa', quotationData?.booking.payment_option_tcs_response);
          if (isAbove7L) {
            setReserveTcsObject(quotationData?.booking.payment_option_tcs_response.tcs)
          } else if (nri) {
            setTravelExpense(false)
            setReserveTcsObject(quotationData?.booking.payment_option_tcs_response.tcs)
          } else if (travelExpense) {
            setReserveTcsObject(quotationData?.booking.payment_option_tcs_response.tcs_with_pan)
          } else {
            setReserveTcsObject(quotationData?.booking.payment_option_tcs_response.tcs)
          }
        } else {
          const data = {
            "pct": 0,
            "amount": 0,
          }
          setReserveTcsObject(data)
        }
      }
      if (taxType == 'tcs') {
        if (isAbove7L) {
          setTcsObject(quotationData?.booking.tcs)
        } else if (nri) {
          setTravelExpense(false)
          setTcsObject(quotationData?.booking.tcs)
        } else if (travelExpense) {
          setTcsObject(quotationData?.booking.tcs_with_pan)
        } else {
          setTcsObject(quotationData?.booking.tcs)
        }
      } else {
        const data = {
          "pct": 0,
          "amount": 0,
          "split_payment_options": quotationData?.booking?.split_payment_options
        }
        setTcsObject(data)
      }
    }
  }, [quotationData, travelExpense, nri, taxType])

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
    register('billing_address.address1', { required: { value: true, message: "Please enter a valid pincode" } })
  }, []);

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

  // const onGetPaymentMethods = (data: any) => {
  //   setBillingAddress(data.billing_address)
  // };

  useEffect(() => {
    if (checkSplitPayment) {
      initPayment()
    }
  }, [checkSplitPayment])

  // useEffect(() => {
  //   if (paymentData) {
  //     navigate('/quotation/payment-method', { state: { paymentData: paymentData, billingAddress: billingAddress, quotationData: quotationData } });
  //   }
  // }, [paymentData])

  const initPayment = () => {
    let billing = {}
    if (!nri && quotationData?.booking?.enable_tcs) {
      if (taxType == 'tcs') {
        billing = { 'expense_above_7l': !travelExpense, tax_regime: taxRegime, tds_opted: false, ...billingAddress }
      } else {
        billing = { 'expense_above_7l': null, tax_regime: taxRegime, tds_opted: true, ...billingAddress }
      }
    } else {
      billing = { ...billingAddress }
    }

    const _payload = {
      booking_id: quotationData?.booking.id,
      billing_address: billing,
      payment_for: PaymentType
    };
    setLoading(true);
    completePayment(_payload)
      .unwrap()
      .then((res: any) => {
        setLoading(false);
        navigate('/payment-method', { state: { paymentData: res, billingAddress: billing, bookingData: quotationData, payment_for: PaymentType, promo_code: couponCode, tcs: (tcsObject?.amount || 0), currentPayble: (quotationData?.booking?.current_payable + (reserveTcsObject?.amount || 0)), reserveBooking: reserveBooking, quotation: true } });
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setLoading(false);
      });
  }

  const proceedToPay = (data: any) => {
    setBillingAddress(data.billing_address)
    if (quotationData?.booking?.split_payment_options?.available) {
      if (quotationData?.booking?.split_payment && quotationData?.booking?.status === 'RESERVED') {
        setSplitModal(true)
        setPaymentType('split_payment')
      } else {
        setSelectSplitModal(true)
      }
    } else {
      setCheckSplitPayment(true);
    }
  }

  const PaymentProcess = () => {
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
    if (quotationData?.booking?.enable_tcs) {
      res = tcsObject?.split_payment_options?.options
    } else {
      res = quotationData?.booking?.split_payment_options?.options
    }

    if (quotationData?.booking?.split_payment_options?.options) {
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
      })
    }
  }
  const applyCouponCode = (coupon: any) => {
    setGetDetailLoading(true)
    const _payload = {
      id: booking,
      data: {
        "coupon_code": coupon
      }
    }
    applyNewCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        setIsCouponError(false)
        setGetDetailLoading(false)
        setQuotationData(res.data)
        setCouponApplied(true);
        setCouponAppliedMessage(res.message);
        console.log(res.message)
      })
      .catch((res: any) => {
        setIsCouponError(true)
        setCouponAppliedMessage(res.data.message)
        console.log(res.data.message)
        setGetDetailLoading(false)
        console.log('roh Error: ', res.data.message);
      });
  }

  const removeCouponCode = (coupon: any) => {
    setGetDetailLoading(true)
    const _payload = {
      id: booking,
      data: {
        "coupon_code": coupon
      }
    }
    removeNewCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        setSelectedCoupon('')
        setCouponCode('')
        setQuotationData(res.data)
        setGetDetailLoading(false)
        setCouponApplied(false);
        setCouponAppliedMessage('');
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setGetDetailLoading(false)
      });
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
          setPanName(res)
          setValue('billing_address.name', res?.name)
          setIsPanVerified(true)
          setPanVerifiedFailMsg('Verified')
          setIsPanLoading(false)
          toast.success('Name is updated as per the Pan Card', {
            duration: 3000,
            position: 'bottom-right',
            style: {
              background: '#11b843',
              color: '#fff',
            }
          })
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

  const handleSetNAme = () => {
    setValue('billing_address.name', panName?.name)
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
          setGstData(res)
          setValue('billing_address.address2', res?.address);
          setValue('billing_address.gstName', res?.name);
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
  const gstChecked = (e: any) => {
    setGst(e.target.checked)

    if (e.target.checked === false) {
      setValue('billing_address.gstName', '');
      setValue('billing_address.gstin', '');
      setGstVerifiedFailMsg('')
    }
  }
  const handlePincode = (e: any) => {
    setValue('billing_address.pincode', e.target.value)
    setPincode(e.target.value)
  }

  if (!quotationData) {
    return (
      <p>Loading</p>
    )
  }
  const CouponUI = () => {
    const couponInput = () => {
      return (
        <>
        <div className='mt-3 flex'>
          <div className='rounded-l-md px-3 w-full placeholder:text-xs border-0 bg-gray-400 flex items-center'>
            <input
              disabled={couponApplied}
              className={`w-full text-sm placeholder:text-gray-100/[0.62] lg:text-base placeholder:text-gray-100 bg-white/0 border-0 active:border-0 border-transparent focus:border-transparent focus:ring-0 py-3.5`}
              type="text"
              value={couponCode}
              name="couponss"
              placeholder="Have a coupon code"
              onChange={(e) => {
                setCouponCode(e.target.value)
              }}
            />
            {couponApplied &&
              <span
                className='font-bold cursor-pointer'
                onClick={() => {
                  setIsCoupon(true)
                  removeCouponCode(couponCode)
                }}
              >X</span>
            }
          </div>
          <button
            disabled={couponApplied}
            onClick={() =>{ setIsCoupon(true)
              applyCouponCode(couponCode)
            } }
            className="bg-brand-primary w-[100px] rounded-r-md text-white text-xs py-2 font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
          >
            {!'couponLoading' ? (
              <span className="loading-elipses">Loading</span>
            ) : (
              'Apply'
            )}
          </button>
        </div>
        {couponAppliedMessage ? <p className={`${isCouponError ? 'text-danger' : 'text-success'} 'mt-1.5 text-sm font-medium'`}>{couponAppliedMessage}</p> : null}
        </>
      )
    }
    const listUI = () => {
      if (couponList) {
        return (
          <div className='my-3 shadow-allSide px-3 py-3'>
            <p className='text-lg font-semibold'>Coupon Code</p>
            {couponList.map((val: any, index: any) => (
              <div className='border border-dotted rounded mt-3 py-3 px-3' key={index}>
                <div className='flex'>
                  <input
                    type="radio"
                    className='mt-1 w-[13px] h-[13px] rounded-full cursor-pointer' name="coupon" id=""
                    checked={val.coupon_code == couponCode && couponApplied}
                    onClick={() => {
                      setIsCoupon(true)
                      setSelectedCoupon(val)
                      setCouponCode(val.coupon_code)
                      applyCouponCode(val.coupon_code)
                    }}
                  />
                  <div className='ml-2 w-full'>
                    <div className='flex justify-between'>
                      <div className='flex items-center'>
                        <p className='text-sm font-semibold'>{val.coupon_code}</p>
                        {val.coupon_code == couponCode && couponApplied ?
                          <div onClick={() => removeCouponCode(val.coupon_code)} className='bg-gray-100 h-3 w-3 ml-2 cursor-pointer flex items-center justify-center p-1 rounded-full'>
                            <p className=' text-white text-xxxs leading-[17]'>x</p>
                          </div>
                          : null
                        }
                      </div>
                      <p className='text-sm font-semibold'>₹ {val.discount_for_booking}</p>
                    </div>
                    <p className='text-xs font-normal'>{val.description}</p>
                  </div>
                </div>
              </div>
            ))}
            {couponInput()}
          </div>
        )
      }
    }
    return (
      <div>
        {listUI()}
        
      </div>
    )
  }
  return (
    <Layout isLoading={bookingLoading}>
      <Toaster />
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="/assets/icons/footer/chevon-down.svg"
              alt="arrow"
              onClick={() => navigate('/offers')}
              className={`self-center justify-self-start mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 mb-2 lg:hidden`}
            />
            <h1 className="text-xl font-medium mb-3 lg:text-3xl">
              Payment Summary
            </h1>
          </div>
          <div className='grid grid-cols-3 gap-6'>
            <div className="col-span-3 lg:col-span-2 mb-4">
              <div className='border-gray-400 shadow-allSide rounded-lg'>
                <div className="grid grid-cols-2 items-center border-b border-gray-300 px-4 lg:px-6 py-6">
                  <div className="">
                    <p className="text-xxs lg:text-sm text-gray-100 font-semibold">ORDER ID</p>
                    <p className="text-base lg:text-xl font-semibold mt-0.5">{`${quotationData?.booking?.number}`}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xxs lg:text-sm text-gray-100 font-semibold">
                      Total
                    </p>
                    <div className='flex justify-end items-center'>
                      {quotationData?.itinerary?.discount_pct != 0 ?
                        <p className="text-xs lg:text-base text-gray-100 font-semibold line-through mr-2">{`₹ ${FormatPrice(
                          quotationData?.booking?.actual_total || 0
                        )}`}</p>
                        : null}
                      <p className="text-base lg:text-xl font-semibold">{`₹ ${FormatPrice(
                        quotationData?.booking?.total || 0
                      )}`}</p>
                    </div>
                  </div>
                </div>


                {/* web timeline */}
                <div className='px-6 py-6 hidden lg:block'>
                  <div className='flex'>
                    {quotationData?.itinerary?.ports.map(
                      (val: any, i: any) =>
                        val.name !== 'At Sea' && (
                          <div key={i} className="w-[20%]">
                            {i === 0 ? (
                              <div className=''>
                                <div className='h-[30px] flex items-center relative'>
                                  <p className='absolute left-0 top-[1px] whitespace-nowrap text-brand-primary'>---------------------------</p>
                                  <img className='h-5' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" alt="" />
                                </div>
                                <div className='pr-10'>
                                  <p className='text-sm text-brand-primary font-medium'>DEPARTURE</p>
                                  <p className='text-base font-semibold'>{val.name}</p>
                                  <p className='text-base font-semibold'>{val.departure}</p>
                                </div>
                              </div>
                            )
                              : i !== 0 && quotationData?.itinerary?.ports.length - 1 === i ? (
                                <div className=''>
                                  <div className='h-[30px] flex items-center relative'>
                                    <img className='h-5' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" alt="" />
                                  </div>
                                  <div className='pr-10'>
                                    <p className='text-sm text-brand-primary font-medium'>Arrival</p>
                                    <p className='text-base font-semibold'>{val.name}</p>
                                    <p className='text-base font-semibold'>{val.arrival}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className=''>
                                  <div className='h-[30px] flex items-center relative'>
                                    <p className='absolute left-0 top-[1px] whitespace-nowrap text-brand-primary'>---------------------------</p>
                                    <div className='h-[8px] w-[8px] bg-brand-primary rounded-full' />
                                  </div>
                                  <div className='pr-8'>
                                    <p className='text-sm font-medium'>{val.name}</p>
                                    <p className='text-sm font-medium'>{val.arrival}</p>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        )
                    )}
                  </div>
                </div>
                {/* mobile timeline */}
                <div className='px-6 py-6 lg:hidden'>
                  <div className=''>
                    {quotationData?.itinerary?.ports.map(
                      (val: any, i: any) =>
                        val.name !== 'At Sea' && (
                          <div key={i} className="relative">
                            {i === 0 ? (
                              <div className='flex'>
                                <div className='after:absolute after:left-[5px] after:h-full after:border-l-2 after:border-dotted'>
                                  <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg"
                                    className="h-4 mt-0.5 mr-3"
                                    alt="Cruise"
                                  />
                                </div>
                                <div>
                                  <p className='text-xs text-brand-primary font-medium'>DEPARTURE</p>
                                  <p className='text-sm font-semibold'>{val.name}</p>
                                  <p className='text-sm font-semibold'>{val.departure}</p>
                                </div>
                              </div>
                            )
                              : i !== 0 && quotationData?.itinerary?.ports.length - 1 === i ? (
                                <div className='flex pt-3'>
                                  <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg"
                                    className="h-4 mt-0.5 mr-3"
                                    alt="Cruise"
                                  />
                                  <div>
                                    <p className='text-xs text-brand-primary font-medium'>Arrival</p>
                                    <p className='text-sm font-semibold'>{val.name}</p>
                                    <p className='text-sm font-semibold'>{val.arrival}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className='flex pt-3'>
                                  <div className='after:absolute after:left-[5px] after:h-full after:border-l-2 after:border-dotted'>
                                    <div className='h-[8px] w-[8px] bg-brand-primary rounded-full mr-3 ml-0.5 mt-1' />
                                  </div>
                                  <div>
                                    <p className='text-xs font-medium'>{val.name}</p>
                                    <p className='text-xs font-medium'>{val.arrival}</p>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        )
                    )}
                  </div>
                </div>

                <div className='border-t border-gray-300'>
                  <div className='grid grid-cols-4 py-6'>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 lg:border-r lg:border-gray-300'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/nights-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Total Nights</p>
                        <p className='text-sm font-medium'>{quotationData?.itinerary?.nights}N/{quotationData?.itinerary?.nights + 1}D</p>
                      </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 lg:border-r lg:border-gray-300'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabins-new-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Total Cabins</p>
                        <p className='text-sm font-medium'>{quotationData?.booking?.rooms?.length}</p>
                      </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 lg:border-r lg:border-gray-300 mt-4 lg:mt-0'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-new-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Total Guests</p>
                        <p className='text-sm font-medium'>{(quotationData?.booking?.guests?.adults?.length) + (quotationData?.booking?.guests?.children?.length) + (quotationData?.booking?.guests?.infants?.length)}</p>
                      </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 mt-4 lg:mt-0'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-name-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Cruise</p>
                        <p className='text-sm font-medium'>{quotationData?.itinerary?.ship?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-400 shadow-allSide rounded-lg px-4 lg:px-6 py-4 lg:py-6 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 cursor-pointer"
                    onChange={(e) => {
                      setValue('billing_address.international', `${e.target.checked ? true : false}`)
                      setNri(e.target.checked)
                      setIsPanVerified(e.target.checked)
                      setTaxType('tcs')
                    }}
                  />
                  <p className='text-base lg:text-xl font-semibold'>I am a NRI</p>
                </div>
                {quotationData?.booking?.enable_tcs &&
                  <p className='text-sm lg:text-base mt-2 lg:mt-4 leading-6 lg:leading-8'><span className='font-semibold'>Important Notice:</span> For an NRI (Non-Residential Indian) <span className='font-semibold text-brand-primary'>20% TCS (Tax Collected at Source) will be imposed on the Total</span></p>
                }
              </div>


              {quotationData?.booking?.enable_tcs && !nri &&
                <div className='mt-6'>
                  <div className="border border-gray-400 shadow-allSide rounded-lg mb-4">
                    <div className='grid grid-cols-2'>
                      <div onClick={() => {
                        setTaxType('tcs')
                        setTaxRegime('new_regime')
                        setGst(false)
                      }} className={`py-3 lg:py-6 text-center cursor-pointer ${taxType == 'tcs' ? 'text-brand-primary border-b border-brand-primary' : 'bg-gray-300/25 text-gray-100'}`}>
                        <p className='text-sm lg:text-xl font-semibold lg:font-bold'>TCS (Tax Collected at Source)</p>
                      </div>
                      <div onClick={() => {
                        setTaxType('tds')
                        setTaxRegime('new_regime')
                        setGst(true)
                      }} className={`py-3 lg:py-6 text-center cursor-pointer ${taxType == 'tds' ? 'text-brand-primary border-b border-brand-primary' : 'bg-gray-300/25 text-gray-100'}`}>
                        <p className='text-sm lg:text-xl font-semibold lg:font-bold'>TDS (Tax Deducted at Source)</p>
                      </div>
                    </div>


                    {taxType == 'tcs' ?
                      <div>
                        <div className='px-4 lg:px-6 py-4 lg:py-6 border-t border-gray-300'>
                          <div className={`flex items-center ${isAbove7L ? 'cursor-not-allowed text-gray-100' : 'cursor-pointer'} my-4`}
                            onClick={() => {
                              isAbove7L ? null : setTravelExpense(!travelExpense)
                            }}
                          >
                            <input className={`text-brand-primary ${isAbove7L ? 'cursor-not-allowed text-gray-100' : 'cursor-pointer'} mr-2`} disabled={isAbove7L ? true : false} type="radio" name='travel_expense' checked={travelExpense} />
                            <p className='text-sm lg:text-lg font-semibold'>If Travel Expenses less than 7 Lakhs?</p>
                          </div>
                          <p className='text-gray-600 lg:pr-10 leading-6 lg:leading-7 text-xs lg:text-base'>I declare that total cumulative expense incurred by me on the overseas tour package in the current financial year is less than 7 lakhs</p>
                          <p className='text-black lg:pr-10 leading-6 lg:leading-7 text-xs lg:text-base mt-4'><span className='font-semibold'>Note:  </span> If your Current Financial Year's Travel Expense exceeds 7 Lakhs then a <span className={`${travelExpense ? 'text-gray-700' : 'text-brand-primary'} lg:pr-10 leading-7 lg:leading-7 text-xs lg:text-base font-semibold`}>20% TCS (Tax Collected at Source) will be levied on the Total</span></p>
                        </div>
                        <div className='px-4 lg:px-6'>
                          {knowMoreTcs ? (
                            <div className="bg-gray-400 rounded-lg mb-4 grid gap-4 lg:gap-2 grid-cols-2 px-6 py-6">
                              <div className="flex col-span-3 lg:col-span-1">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tax-charge.svg"
                                  className="h-4 lg:h-4 mr-2 mt-0"
                                  alt="Cruise"
                                />
                                <div className='lg:pr-5'>
                                  <p className='text-sm lg:text-[1rem] font-semibold leading-4'>Tax Charges</p>
                                  <p className='text-xs lg:text-sm text-gray-100 mt-3'> Tax collection at the source is mandatory as per government regulations</p>
                                </div>
                              </div>
                              <div className="flex col-span-3 lg:col-span-1 pb-3">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/claim-credit.svg"
                                  className="h-4 lg:h-4 mr-2 mt-0"
                                  alt="Cruise"
                                />
                                <div>
                                  <p className='text-sm lg:text-[1rem] font-semibold leading-4'>Claiming your credit</p>
                                  <p className='text-xs lg:text-sm text-gray-100 mt-3'>TCS collected is claimable as a credit against the tax payable during return filing. <span className='text-gray-100 mt-1 font-semibold'>(Applicable for Indians Only)</span></p>
                                </div>
                              </div>
                              <div className="flex col-span-3 lg:col-span-2 lg:border-t border-gray-300 lg:pt-6">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tcs-collect.svg"
                                  className="h-4 lg:h-4 mr-2 mt-0"
                                  alt="Cruise"
                                />
                                <div className='lg:pr-6'>
                                  <p className='text-sm lg:text-[1rem] font-semibold leading-4'>TCS is collected via Cordelia Cruise</p>
                                  <p className='text-xs lg:text-sm text-gray-100 mt-3'>TCS credits reflect quarterly in Form 26AS, detailing deductions, collections, and payments, including seller-collected TCS. These updates aid in tracking and verifying tax statements.</p>
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <p onClick={() => setKnowMoreTcs(!knowMoreTcs)} className='text-sm lg:text-base text-brand-blue underline cursor-pointer inline'>{knowMoreTcs ? 'View Less' : 'Know More'}</p>
                        </div>
                      </div>
                      : null
                    }

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
                  </div>
                </div>
              }

              {quotationData?.booking?.coupon_enabled ?
                <div>
                  <Accordian
                    openByDefault={true}
                    title="Apply Coupon Code"
                    titleClass="text-base font-bold lg:text-base"
                    mainClass="border-2 p-3 mt-4 rounded border-gray-300"
                  >
                    <div className="border-t mt-3 border-gray-300 grid grid-cols-3 gap-2">
                      <div className='col-span-2 rounded-md px-3 placeholder:text-xs  border-0 bg-gray-400 w-full mt-4 flex items-center'>
                        <input
                          disabled={couponApplied}
                          className={`w-full text-sm placeholder:text-gray-100/[0.62] lg:text-base placeholder:text-gray-100 bg-white/0 border-0 active:border-0 border-transparent focus:border-transparent focus:ring-0 py-3.5`}
                          type="text"
                          value={couponCode}
                          name="coupon"
                          placeholder="Have a coupon code"
                          onChange={(e) => {
                            setCouponCode(e.target.value)
                          }}
                        />
                      {couponApplied &&
              <span
                className='font-bold cursor-pointer'
                onClick={() => {
                  removeCouponCode(couponCode)
                }}
              >X</span>
            }
                      </div>
                      <button
                        disabled={couponApplied || couponLoading}
                        onClick={() => applyCouponCode(couponCode, quotationData?.booking.id)}
                        className="bg-brand-primary rounded-md w-full text-white text-xs py-2 font-bold mt-4 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                      >
                        {couponLoading ? (
                          <span className="loading-elipses">Loading</span>
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    {couponApplied ?
                      <div className='flex items-center mt-1'>
                        <img className='h-3 lg:h-4 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-success-coupon-icon.svg" alt="" />
                        <p className='text-success text-xxs lg:text-base font-semibold'>{couponAppliedMessage}</p>
                      </div>
                      : couponAppliedMessage ?
                        <div className='flex items-center mt-1'>
                          <img className='h-3 lg:h-4 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/invalid-coupon-icon.svg" alt="" />
                          <p className='text-danger text-xxs lg:text-base font-semibold'>{couponAppliedMessage}</p>
                        </div>
                        : null
                    }
                  </Accordian>
                </div>
                : null
              }

              <div className='mt-6'>
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
                        placeholder="Full Name as per Pan Card"
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
                        onChange={(e: any) => setValue('billing_address.email', e.target.value)}
                        validation={Email}
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
                        disabled={gst ? gstData?.address ? true : false : false}
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
                          onChange={handlePincode}
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
                          <p>{`${addressData?.codes[0].city}, ${addressData?.codes[0].state}, ${addressData?.codes[0].country}`}</p>
                        }
                      </div>
                      <div>
                        {!nri ?
                          <>
                            <div className='flex w-full items-center relative'>
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
                                <div role="status" className='absolute right-2 top-4'>
                                  <svg aria-hidden="true" className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                  </svg>
                                </div>
                              }
                              {isPanVerified ? <div className='absolute right-2 top-4' ><img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-vaild.svg' /></div> : null}
                              {panVerifiedFailMsg === 'Invalid PAN Number' ? <div className='absolute right-2 top-4 ' ><img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-invaild.svg' /></div> : null}
                            </div>
                            {/* {getValues('billing_address.name') && getValues('billing_address.pan') ?
                                getValues('billing_address.name') != panName?.name ?   <p onClick={handleSetNAme} className={`text-xs font-semibold text-brand-primary cursor-pointer mb-4`}>Click to Update Full Name as per the Pan Card</p> : null : null} */}
                            {/* <p className={`${isPanVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mt-0.5`}>{panVerifiedFailMsg}</p> */}
                          </>
                          : null}
                      </div>
                    </div>
                  </div>
                </Accordian>
              </div>
              <div className='lg:hidden'>
                {CouponUI()}
              </div>
              <div className='border border-gray-400 rounded-lg shadow-allSide mt-6'>
                <div className="">
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

              {!nri &&
                <div>
                  <div className={`border p-4 lg:p-6 mt-4 rounded-lg border-gray-400 shadow-allSide`}>
                    <p className={`italic text-xxs lg:text-xs font-semibold mb-2`}>Kindly submit GST details for seamless filing of your tax return</p>
                    <div className="flex items-center">
                      {taxType == 'tcs' ?
                        <input
                          type="checkbox"
                          className="mr-2 cursor-pointer"
                          onChange={gstChecked}
                        />
                        : null
                      }
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
                            disabled
                            validation={Required}
                            name="billing_address.gstName"
                            inputClassName="border-0 bg-disableColor text-gray-200 rounded-md text-sm lg:text-base py-3.5 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full mt-4"
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
                    {quotationData && quotationData?.booking && quotationData?.booking.enable_tcs ? (
                      <div>
                        {!nri ?
                          <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-3 mb-2">
                            Agree that the Tax Regime is selected as per my requirements.
                          </p>
                          : null
                        }
                        {taxType == 'tcs' ?
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
                          :
                          <div>
                            <p className="italic text-xxs lg:text-xs font-medium lg:font-semibold mt-3 mb-2">
                              Agree that TDS is selected as per my requirements.
                            </p>
                          </div>
                        }
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className='hidden lg:block'>
              <div className='fixed lg:sticky top-32 pb-4'>
                <div className='border-gray-400 shadow-allSide rounded-lg mb-4 '>
                  <div className='border-b border-gray-300 px-3 py-3'>
                    <p className='text-lg font-bold'>Price Details</p>
                  </div>
                  <div className='py-3 px-3'>
                    {quotationData?.booking?.rooms.map((room: any, index: number) => {
                      return (
                        <div className="grid grid-cols-3 mb-2" key={index}>
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">{`CABIN ${index + 1
                              } FARE`}</p>
                            <p className="text-sm lg:text-sm font-semibold mt-1">
                              Service Charge & Levies
                            </p>
                            <p className="text-sm lg:text-sm font-semibold mt-1">
                              Fuel Surcharge
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.actual_cabin_fare)}`}</p>
                            <p className="text-sm lg:text-sm font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                            <p className="text-sm lg:text-sm font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p>
                          </div>
                        </div>
                      );
                    })}
                    {quotationData?.booking.protection_plan && quotationData?.booking.protection_plan.amount > 0 ?
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(quotationData?.booking.protection_plan.amount)}</p>
                        </div>
                      </div>
                      : null
                    }
                    {quotationData?.booking?.cabin_fare_discount != 0 ?
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Discount:</p>
                          {quotationData?.booking?.discount_text && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{quotationData?.booking?.discount_text}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold text-brand-green">- ₹{parseInt(quotationData?.booking?.cabin_fare_discount).toFixed()}</p>
                        </div>
                      </div>
                      : null
                    }

                    {quotationData?.booking.shore_excursion_net_total ?
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Shore Excursions:</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">₹{FormatToString(quotationData?.booking.shore_excursion_net_total)}</p>
                        </div>
                      </div>
                      : null
                    }

                    {quotationData?.booking && quotationData?.booking.total_discounts ?
                      <div className="grid grid-cols-3 mt-3">
                        <div className="col-span-2">
                          <p className="text-sm lg:text-sm font-semibold">Total Discount:</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm lg:text-sm font-semibold">{`- ₹ ${FormatToString(parseInt(
                            quotationData?.booking.total_discounts
                          ).toFixed())}`}</p>
                        </div>
                      </div>
                      : null
                    }

                    <div className="grid grid-cols-3 mt-3">
                      <div className="col-span-2">
                        <p className="text-sm lg:text-sm font-semibold">Sub-total:</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                          quotationData?.booking?.sub_total
                        ).toFixed())}`}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 mt-3">
                      <div className="col-span-2">
                        <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                        <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1">
                          GST:
                        </p>
                        {quotationData?.booking.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">
                          Shore Excursion:
                        </p> : null}
                      </div>
                      <div className="text-right">
                        <p className="text-sm lg:text-sm font-bold">
                          {`₹ ${FormatToString((quotationData?.booking?.gst + (quotationData?.booking?.shore_excursion_gst || 0)).toFixed())}`}</p >
                        {
                          quotationData && quotationData?.booking && quotationData?.booking?.gst ?
                            <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(quotationData?.booking?.gst.toFixed())}`}</p>
                            : null
                        }
                        {quotationData?.booking?.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(quotationData?.booking?.shore_excursion_gst.toFixed())}`}</p> : null}
                      </div>
                    </div>
                    {tcsObject &&
                      <>
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-base lg:text-lg font-bold">Total:</p>
                          </div>
                          <div className="text-right">
                            <p className="text-base lg:text-lg font-bold">{`₹ ${FormatToString(
                              quotationData?.booking?.total
                            )}`}</p>
                          </div>
                        </div>
                        {tcsObject.amount ?
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">TCS:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatAmount(tcsObject.amount)}`}</p>
                            </div>
                          </div>
                          : null}
                      </>
                    }
                    <div className="flex justify-between items-end mt-3">
                      <div className="col-span-2">
                        <p className="text-base lg:text-xl font-bold text-brand-primary">Grand Total:</p>
                      </div>
                      <div className="text-right">
                        {quotationData?.itinerary?.discount_pct != 0 ? <p className="text-sm lg:text-base line-through font-semibold text-gray-100">{`₹ ${FormatToString(
                          quotationData?.booking?.actual_total + ((tcsObject?.amount) || 0)
                        )}`}</p>
                          : null
                        }
                        <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatToString(
                          quotationData?.booking?.total + ((tcsObject?.amount) || 0)
                        )}`}</p>
                      </div>
                    </div>
                    {reserveBooking ?
                      <div className="flex justify-between items-start mt-3">
                        <div className="col-span-2">
                          <p className="text-base lg:text-xl font-bold text-brand-primary">Current Payble:</p>
                          {/* <p className="text-sm lg:text-base font-bold text-gray-100">(25%)</p> */}
                        </div>
                        <div className="text-right">
                          <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatAmount(
                            quotationData?.booking?.current_payable + (reserveTcsObject?.amount || 0)
                          )}`}</p>
                        </div>
                      </div>
                      : null
                    }
                  </div >
                </div>
             
                {CouponUI()}

                <div className='"mt-3"'>
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
              </div>
            </div>
          </div>
        </div>
      </main>


      <div className='fixed w-full bottom-0 z-[999] lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]'>
        <div className='bg-white px-4 py-4'>
          <div className='flex justify-between items-center mb-1'>
            <div>
              {reserveBooking ?
                <p className='text-base font-bold text-brand-primary'>Current Payble: ₹{FormatAmount(quotationData?.booking?.current_payable + (reserveTcsObject?.amount || 0))}</p>
                :
                <p className='text-base font-bold text-brand-primary'>Grand Total: ₹{FormatAmount(quotationData?.booking?.total)}</p>
              }
              {priceBreakupModal &&
                <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer' onClick={() => setPriceBreakupModal(false)}>Hide Price Breakup</p>
              }
              {!priceBreakupModal &&
                <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer' onClick={() => setPriceBreakupModal(1)} >View Price Breakup</p>
              }
            </div>
            <div className='""'>
              {consent ?
                <button
                  onClick={handleSubmit(proceedToPay)}
                  className="bg-brand-primary w-full text-white text-sm py-3.5 px-8 rounded font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                  disabled={Loading || !isPanVerified || (gst ? !isGstVerified : null)}
                >
                  {Loading ? (
                    <span className="loading-elipses">Loading</span>
                  ) : (
                    'Continue'
                  )}

                </button>
                :
                <button
                  className="bg-brand-primary w-full text-white text-sm py-3.5 px-8 rounded font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                  disabled={true}
                >
                  Continue
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <Modal show={priceBreakupModal} align={'center'} className="max-h-[55%] w-full center bg-white overflow-scroll absolute pb-20 bottom-0" onClose={() => setPriceBreakupModal(false)}>
        <div className='absolute mx-auto left-0 right-0 w-full flex justify-center -top-5'>
          <div className='bg-white fixed w-[45px] h-[45px] flex items-center justify-center rounded-full shadow-allSide'>
            <img
              onClick={() => setPriceBreakupModal(false)}
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/x-icon.svg"
              alt="arrow"
              className={`cursor-pointer h-4`}
            />
          </div>
        </div>
        <div className='overflow-scroll h-[85%] pb-5 lg:pb-2 px-6'>

          <div className='py-3 px-3 pt-10'>
            {quotationData?.booking?.rooms.map((room: any, index: number) => {
              return (
                <div className="grid grid-cols-3 mb-2" key={index}>
                  <div className="col-span-2">
                    <p className="text-sm lg:text-sm font-semibold">{`CABIN ${index + 1
                      } FARE`}</p>
                    <p className="text-sm lg:text-sm font-semibold mt-1">
                      Service Charge & Levies
                    </p>
                    <p className="text-sm lg:text-sm font-semibold mt-1">
                      Fuel Surcharge
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.actual_cabin_fare)}`}</p>
                    <p className="text-sm lg:text-sm font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                    <p className="text-sm lg:text-sm font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p>
                  </div>
                </div>
              );
            })}
            {quotationData?.booking.protection_plan && quotationData?.booking.protection_plan.amount > 0 ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(quotationData?.booking.protection_plan.amount)}</p>
                </div>
              </div>
              : null
            }
            {quotationData?.booking?.cabin_fare_discount != 0 ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-sm font-semibold">Discount:</p>
                  {quotationData?.booking?.discount_text && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{quotationData?.booking?.discount_text}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm lg:text-sm font-semibold text-brand-green">- ₹{FormatToString(quotationData?.booking.cabin_fare_discount)}</p>
                </div>
              </div>
              : null
            }

            {quotationData?.booking.shore_excursion_net_total ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-sm font-semibold">Shore Excursions:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm lg:text-sm font-semibold">₹{FormatToString(quotationData?.booking.shore_excursion_net_total)}</p>
                </div>
              </div>
              : null
            }

            {quotationData?.booking && quotationData?.booking.total_discounts ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-sm font-semibold">Total Discount:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm lg:text-sm font-semibold">{`- ₹ ${FormatToString(parseInt(
                    quotationData?.booking.total_discounts
                  ).toFixed())}`}</p>
                </div>
              </div>
              : null
            }

            <div className="grid grid-cols-3 mt-3">
              <div className="col-span-2">
                <p className="text-sm lg:text-sm font-semibold">Sub-total:</p>
              </div>
              <div className="text-right">
                <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                  quotationData?.booking?.sub_total
                ).toFixed())}`}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-3">
              <div className="col-span-2">
                <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1">
                  GST:
                </p>
                {quotationData?.booking.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">
                  Shore Excursion:
                </p> : null}
              </div>
              <div className="text-right">
                <p className="text-sm lg:text-sm font-bold">
                  {`₹ ${FormatToString((quotationData?.booking?.gst + (quotationData?.booking?.shore_excursion_gst || 0)).toFixed())}`}</p >
                {
                  quotationData && quotationData?.booking && quotationData?.booking?.gst ?
                    <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(quotationData?.booking?.gst.toFixed())}`}</p>
                    : null
                }
                {quotationData?.booking?.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(quotationData?.booking?.shore_excursion_gst.toFixed())}`}</p> : null}
              </div>
            </div>
            {tcsObject &&
              <>
                <div className="grid grid-cols-3 mt-3">
                  <div className="col-span-2">
                    <p className="text-base lg:text-lg font-bold">Total:</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base lg:text-lg font-bold">{`₹ ${FormatToString(
                      quotationData?.booking?.total
                    )}`}</p>
                  </div>
                </div>
                {tcsObject.amount ?
                  <div className="grid grid-cols-3 mt-3">
                    <div className="col-span-2">
                      <p className="text-sm lg:text-sm font-semibold">TCS:</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatAmount(tcsObject.amount)}`}</p>
                    </div>
                  </div>
                  : null}
              </>
            }
            <div className="grid grid-cols-3 items-end mt-3">
              <div className="col-span-2">
                <p className="text-base lg:text-xl font-bold text-brand-primary">Grand Total:</p>
              </div>
              <div className="text-right">
                {quotationData?.itinerary?.discount_pct != 0 ? <p className="text-sm lg:text-base line-through font-semibold text-gray-100">{`₹ ${FormatToString(
                  quotationData?.booking?.actual_total + (tcsObject?.amount || 0)
                )}`}</p>
                  : null
                }
                <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatToString(
                  quotationData?.booking?.total + (tcsObject?.amount || 0)
                )}`}</p>
              </div>
            </div>
          </div >
        </div>
      </Modal>

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
              <p className='text-xxs font-semibold'>I can pay {`₹ ${quotationData?.booking?.total + (tcsObject?.amount || 0)}`} in one transaction</p>
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
            src="/assets/icons/footer/chevon-down-black.svg"
            alt="arrow"
            className={`self-center justify-self-end mr-5 rotate-90`}
          />
          <h1 className='text-lg font-semibold'>Your Split Payment</h1>
        </div>
        <div className='overflow-scroll h-[90%] lg:h-[85%] pb-5 lg:pb-2 px-4'>
          <div className='flex items-center justify-between p-5 pt-1'>
            <p className='font-bold text-lg'>Grand Total</p>
            <p className='font-bold text-lg'>{`₹ ${quotationData?.booking?.total + (tcsObject?.amount || 0)}`}</p>
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
    </Layout>
  );
}
