import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import Accordian from '../../components/UI/Accordion/accordion_basic';
import { useNavigate } from 'react-router-dom';
import { GetContact, GetStore } from '../../../src/utils/store/store';
import { FormatCardNumber, FormatToString, FormatPrice, UnFormatCardNumber, FormatAmount, ordinal_suffix_of } from '../../../src/utils/formatter/formatter';
import { useGetBookingDetailMutation } from '../../../src/services/itinerary/itinerary';
import { Input } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { FullName, Phone, Email, Pincode, PanNo, GSTIN, Address, Required } from '../../../src/utils/validations/formValidations';
import { useGetAddressFromPincodeQuery, useVerifyPanMutation, useVerifyGSTMutation, useInitPaymentNewMutation, useApplyCouponMutation, useRemoveCouponMutation, useGetCouponMutation, useApplyNewCouponMutation, useRemoveNewCouponMutation } from '../../../src/services/payments/payment';
import { TiggerFBCheckoutEvent } from '../../../src/components/Analytics/events';
import Modal from '../../components/UI/ModalCenter';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { TiggerGAInitiatePayment } from '../../../src/components/Analytics/events';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import Select from "react-select";
import phoneCodes from "../../components/UI/Forms/Inputs/phoneCodes.json";
import Button from '../../components/UI/Button';

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

const TimelineLoader = () => {
  return (
    <>
      <div className="px-6 py-4 max-w-sm w-full mx-auto shadow-allSide">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-10 py-1">
            <div className="h-4 bg-gray-300 rounded-full"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-300 rounded-full col-span-2"></div>
                <div className="h-4 bg-gray-300 rounded-full col-span-1"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-full"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-300 rounded-full col-span-2"></div>
                <div className="h-4 bg-gray-300 rounded-full col-span-1"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 max-w-sm w-full mx-auto shadow-allSide mt-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-10 py-1">
            <div className="h-4 bg-gray-300 rounded-full"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-300 rounded-full col-span-2"></div>
                <div className="h-4 bg-gray-300 rounded-full col-span-1"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded-full"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-300 rounded-full col-span-2"></div>
                <div className="h-4 bg-gray-300 rounded-full col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
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
  const [isPanVerified, setIsPanVerified] = useState<any>(null);
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
  const [isCouponError, setIsCouponError] = useState<any>(false);
  const [bookingData, setBookingData] = useState<any>();
  const [taxRegime, setTaxRegime] = useState<any>('new_regime');
  const [isAbove7L, setIsAbove7L] = useState<any>(false);
  const [tcsObject, setTcsObject] = useState<any>();
  const [reserveTcsObject, setReserveTcsObject] = useState<any>();
  const [travelExpense, setTravelExpense] = useState<any>(false);
  const [selectedCabin, setSelectedCabin] = useState<any>(0);
  const [taxType, setTaxType] = useState<any>('tcs');
  const [knowMoreTcs, setKnowMoreTcs] = useState<any>(false);
  const [guestDetailModal, setGuestDetailModal] = useState<any>(false);
  const [selectedGuest, setSelectedGuest] = useState<any>(0);
  const [priceBreakupModal, setPriceBreakupModal] = useState<any>(false);
  const [reserveBooking, setReserveBooking] = useState<any>(false);
  const [gstData, setGstData] = useState<any>([]);
  const [panName, setPanName] = useState<any>('');
  const [couponList, setCouponList] = useState<any>();
  const [selectedCoupon, setSelectedCoupon] = useState<any>();
  const [getDetailLoading, setGetDetailLoading] = useState<any>();
  const [isCoupon, setIsCoupon] = useState<any>(false);
  const [cancellationPolicy, setCancellationPolicy] = useState([]);
  const [reschedulePolicy, setReschedulePolicy] = useState([]);
  const [roomAvailableModal, setRoomAvailableModal] = useState<any>(false);

  const [completePayment] = useInitPaymentNewMutation();
  const [applyCoupon] = useApplyCouponMutation();
  const [removeCoupon] = useRemoveCouponMutation();
  const [verifyPan] = useVerifyPanMutation();
  const [verifyGST] = useVerifyGSTMutation();
  const [getCoupon] = useGetCouponMutation();
  const [applyNewCoupon] = useApplyNewCouponMutation();
  const [removeNewCoupon] = useRemoveNewCouponMutation();
  const [countryCode, setCountryCode] = useState('+91');

  const BOOKING_ID = new window.URLSearchParams(window.location.search).get('booking_id');

  useEffect(() => {
    let data = BOOKING_ID;
    getCoupon(data)
      .unwrap()
      .then((res: any) => {
        setCouponList(res?.data?.coupons)
      })
      .catch((res: any) => {
        console.log('Error: ', res);
      });
  }, [])

  const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#f5f5f5', height: '52px', width: '90px', marginBottom: '14px' }),
    option: (provided: any, state: any) => ({
      ...provided,
      // borderBottom: '1px dotted #ccc',
      padding: 10,
    }),
    menu: (styles: any) => ({
      ...styles,
      width: '300px',
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: '1px'
    })
  };

  const { data: addressData } = useGetAddressFromPincodeQuery(
    pincode,
    { skip: !!!pincode || pincode.length !== 6 }
  );

  useEffect(() => {
    setGetDetailLoading(true)
    const _payload = {
      booking_id: BOOKING_ID,
    };
    getBookingDetail(_payload)
      .unwrap()
      .then((res: any) => {
        setGetDetailLoading(false)
        setBookingData(res)
        setCancellationPolicy(res?.booking?.cancellation_policy)
        setReschedulePolicy(res?.booking?.reschedule_policy)
      })
      .catch((res: any) => {
        setGetDetailLoading(false)
        console.log('Error: ', res)
      })
  }, [])

  useEffect(() => {
    if (bookingData && bookingData?.booking && !isCoupon) {
      setValue('billing_address.address2', bookingData?.booking.billing_address.address === '-' ? '' : bookingData?.booking.billing_address.address)
      if (bookingData?.booking.billing_address.pan) {
        setIsPanVerified(true)
        setPanVerifiedFailMsg('Verified')
      } else {
        setIsPanVerified(false)
      }
      setValue('billing_address.pan', bookingData?.booking.billing_address.pan === '-' ? '' : bookingData?.booking.billing_address.pan)
      setValue('billing_address.name', bookingData?.booking.billing_address.name === '-' ? '' : bookingData?.booking.billing_address.name)
      setValue('billing_address.phone', bookingData?.booking.billing_address.phone === '-' ? '' : bookingData?.booking.billing_address.phone)
      setValue('billing_address.country_code', bookingData?.booking.billing_address.country_code === null ? '+91' : bookingData?.booking.billing_address.country_code)
      setValue('billing_address.email', bookingData?.booking.billing_address.email === '-' ? '' : bookingData?.booking.billing_address.email)
      setValue('billing_address.pincode', bookingData?.booking.billing_address.pincode === '-' ? '' : bookingData?.booking.billing_address.pincode)
      setPincode(bookingData?.booking.billing_address.pincode)
      if (bookingData?.booking.billing_address?.gstin) {
        setIsGstVerified(true)
        setGst(true)
        setValue('billing_address.gstin', bookingData?.booking.billing_address.gstin === '-' ? '' : bookingData?.booking.billing_address.gstin)
        setValue('billing_address.gstName', bookingData?.booking.billing_address.name === '-' ? '' : bookingData?.booking.billing_address.name)
      }
    }

    if (bookingData?.booking?.enable_tcs && bookingData?.booking?.status == 'ON_HOLD') {
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

    if (bookingData?.booking?.payment_option_rule != null) {
      setReserveBooking(true)
    }

    if (bookingData?.booking?.discounts[0]?.coupon_code) {
      setCouponCode(bookingData?.booking?.discounts[0]?.coupon_code)
      setCouponApplied(true);
    }
  }, [bookingData])

  useEffect(() => {
    if (bookingData?.booking?.discounts[0]?.coupon_code) {
      applyCouponCode(bookingData?.booking?.discounts[0]?.coupon_code)
    }
  }, [couponApplied])
  useEffect(() => {
    if (bookingData?.booking.enable_tcs) {
      if (reserveBooking) {
        if (taxType == 'tcs') {
          if (isAbove7L) {
            setReserveTcsObject(bookingData?.booking.payment_option_tcs_response.tcs)
          } else if (nri) {
            setTravelExpense(false)
            setReserveTcsObject(bookingData?.booking.payment_option_tcs_response.tcs)
          } else if (travelExpense) {
            setReserveTcsObject(bookingData?.booking.payment_option_tcs_response.tcs_with_pan)
          } else {
            setReserveTcsObject(bookingData?.booking.payment_option_tcs_response.tcs)
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
          setTcsObject(bookingData?.booking.tcs)
        } else if (nri) {
          setTravelExpense(false)
          setTcsObject(bookingData?.booking.tcs)
        } else if (travelExpense) {
          setTcsObject(bookingData?.booking.tcs_with_pan)
        } else {
          setTcsObject(bookingData?.booking.tcs)
        }
      } else {
        const data = {
          "pct": 0,
          "amount": 0,
          "split_payment_options": bookingData?.booking?.split_payment_options
        }
        setTcsObject(data)
      }
    }
  }, [bookingData, travelExpense, nri, taxType, reserveBooking])

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
        international: '',
        country_code: countryCode
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
        items: store?.GADataShoreEx,
        name: store && store?.GAData ? store?.GAData[0]?.item_name : ''
      }
      const GAEnhancedData = {
        "email": billingAddress.email,
        "phone_number": billingAddress.phone
      }
      TiggerGAInitiatePayment(GAData, GAEnhancedData)
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
    if (!nri && bookingData?.booking?.enable_tcs) {
      if (taxType == 'tcs') {
        billing = { 'expense_above_7l': !travelExpense, tax_regime: taxRegime, tds_opted: false, ...billingAddress }
      } else {
        billing = { 'expense_above_7l': null, tax_regime: taxRegime, tds_opted: true, ...billingAddress }
      }
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
        navigate('/payment-method', { state: { paymentData: res, billingAddress: billing, bookingData: bookingData, payment_for: PaymentType, promo_code: couponCode, tcs: (tcsObject?.amount || 0), currentPayble: (bookingData?.booking?.current_payable + (reserveTcsObject?.amount || 0)), reserveBooking: reserveBooking, quotation: false } });
      })
      .catch((res: any) => {
        if (res?.data?.message == 'selected room not available') {
          setRoomAvailableModal(true)
        }
        console.log('Error: ', res);
        setLoading(false);
      });
  }

  const PaymentProcess = () => {
    const GAData = {
      currency: "INR",
      value: bookingData?.booking?.total,
      items: store?.GADataShoreEx,
      name: store && store?.GAData ? store?.GAData[0]?.item_name : ''
    }
    const GAEnhancedData = {
      "email": billingAddress.email,
      "phone_number": billingAddress.phone
    }
    if (PaymentType == "single_payment") {
      TiggerGAInitiatePayment(GAData, GAEnhancedData)
    } else if (PaymentType == "split_payment") {
      let res = bookingData?.booking?.split_payment_options?.options
      const firstItem = res[0];
      if (!firstItem.paid) {
        TiggerGAInitiatePayment(GAData, GAEnhancedData)
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
    if (bookingData?.booking?.enable_tcs && bookingData?.booking?.status === "ON_HOLD") {
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
          setValue('billing_address.name', res?.name)
          setIsPanVerified(true)
          setPanName(res)
          setPanVerifiedFailMsg('Verified')
          setIsPanLoading(false)
          toast.success('Name is updated as per the Pan Card', {
            duration: 3000,
            position: 'bottom-right',
            style: {
              background: '#17cc4e',
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

  if (loadingQuotationData && !bookingData) {
    return (
      <p>Loading...</p>
    )
  }
  const gstChecked = (e: any) => {
    setGst(e.target.checked)

    if (e.target.checked === false) {
      setValue('billing_address.gstName', '');
      setValue('billing_address.gstin', '');
      setGstVerifiedFailMsg('')
    }
  }

  const applyCouponCode = (coupon: any) => {
    setGetDetailLoading(true)
    const _payload = {
      id: BOOKING_ID,
      data: {
        "coupon_code": coupon
      }
    }
    applyNewCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        setIsCouponError(false)
        setGetDetailLoading(false)
        setBookingData(res.data)
        setCouponApplied(true);
        setCouponAppliedMessage(res.message);
      })
      .catch((res: any) => {
        setIsCouponError(true)
        setCouponAppliedMessage(res.data.message)
        setGetDetailLoading(false)
        console.log('roh Error: ', res.data.message);
      });
  }
  const removeCouponCode = (coupon: any) => {
    setGetDetailLoading(true)
    const _payload = {
      id: BOOKING_ID,
      data: {
        "coupon_code": coupon
      }
    }
    removeNewCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        setSelectedCoupon('')
        setCouponCode('')
        setBookingData(res.data)
        setGetDetailLoading(false)
        setCouponApplied(false);
        setCouponAppliedMessage('');
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setGetDetailLoading(false)
      });
  }

  if (!bookingData) {
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
            {/* <button
              disabled={couponApplied}
              onClick={() => {
                setIsCoupon(true);
                applyCouponCode(couponCode)
              }
              }
              className="bg-brand-primary w-[100px] rounded-r-md text-white text-xs py-2 font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
            >
              {!'couponLoading' ? (
                <span className="loading-elipses">Loading</span>
              ) : (
                'Apply'
              )}
            </button> */}
            <Button text='Apply' handleClick={() => {
              setIsCoupon(true);
              applyCouponCode(couponCode)
            }} size='xs' disabled={couponApplied} className='w-[100px] rounded-l-none' />
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
                      setIsCoupon(true);
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

  const portTimeline = () => {
    if (bookingData?.itinerary?.nights > 5) {
      return (
        <div className='w-full'>
          <div className='flex items-start justify-between py-1'>
            <div className='flex items-center gap-1 lg:gap-2'>
              <img className='h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" alt="" />
              <p className='text-xxs lg:text-xs text-brand-primary font-semibold uppercase'>
                Departure Port
              </p>
            </div>
            <div className='w-[30%] lg:w-[60%] text-center relative -mt-[0px] lg:-mt-[0px]'>
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
            <div className='flex items-center gap-1 lg:gap-2'>
              <img className='h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" alt="" />
              <p className='text-xxs lg:text-xs text-brand-primary font-semibold uppercase'>
                Arrival Port
              </p>
            </div>
          </div>
          <div className='flex items-start justify-between pb-1.5'>
            <div className=''>
              <p className='text-sm lg:text-base font-bold mt-0.5'>
                {bookingData?.itinerary?.ports[0]?.name}
              </p>
              <p className='text-xs lg:text-sm font-semibold mt-0.5'>
                {bookingData?.itinerary?.ports[0]?.departure}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm lg:text-base font-bold mt-0.5'>
                {bookingData?.itinerary?.ports[bookingData?.itinerary?.ports.length - 1]?.name}
              </p>
              <p className='text-xs lg:text-sm font-semibold mt-0.5'>
                {bookingData?.itinerary?.ports[bookingData?.itinerary?.ports.length - 1]?.arrival}
              </p>
            </div>
          </div>
        </div>
      )
    } else {
      return bookingData?.itinerary?.ports.map(
        (val: any, i: any) =>
          val.name !== 'At Sea' && (
            <div key={i} className="w-[21%]">
              {i === 0 ? (
                <div className=''>
                  <div className='h-[30px] flex items-center relative'>
                    <p className='absolute left-0 top-[1px] whitespace-nowrap text-brand-primary'>---------------------------</p>
                    <img className='h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" alt="" />
                  </div>
                  <div className='pr-10'>
                    <p className='text-sm text-brand-primary font-medium'>DEPARTURE</p>
                    <p className='text-base font-semibold'>{val.name}</p>
                    <p className='text-base font-semibold'>{val.departure}</p>
                  </div>
                </div>
              )
                : i !== 0 && bookingData?.itinerary?.ports.length - 1 === i ? (
                  <div className=''>
                    <div className='h-[30px] flex items-center relative'>
                      <img className='h-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" alt="" />
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
      )

    }
  }

  return (
    <Layout>
      <Toaster />
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

          <div className='grid grid-cols-3 gap-6'>
            <div className="col-span-3 lg:col-span-2 mb-4">
              <div className='border-gray-400 shadow-allSide rounded-lg'>
                <div className="grid grid-cols-2 border-b border-gray-300 px-6 py-6">
                  <div className="">
                    <p className="text-xxs lg:text-sm text-gray-100 font-semibold">ORDER ID</p>
                    <p className="text-base lg:text-xl font-semibold mt-0.5">{`${bookingData?.booking?.number}`}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xxs lg:text-sm text-gray-100 font-semibold">
                      Total
                    </p>
                    <div className='flex justify-end items-center'>
                      {bookingData?.itinerary?.discount_pct != 0 ?
                        <p className="text-xs lg:text-base text-gray-100 font-semibold line-through mr-2">{`₹ ${FormatPrice(
                          bookingData?.booking?.actual_total
                        )}`}</p>
                        : null}
                      <p className="text-base lg:text-xl font-semibold">{`₹ ${FormatPrice(
                        bookingData?.booking?.total
                      )}`}</p>
                    </div>
                  </div>
                </div>
                {/* web timeline */}
                <div className='px-6 py-6'>
                  <div className='flex'>
                    {portTimeline()}
                    {/* {bookingData?.itinerary?.ports.map(
                      (val: any, i: any) =>
                        val.name !== 'At Sea' && (
                          <div key={i} className="w-[21%]">
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
                              : i !== 0 && bookingData?.itinerary?.ports.length - 1 === i ? (
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
                    )} */}
                  </div>
                </div>
                {/* mobile timeline */}
                {/* <div className='px-6 py-6 lg:hidden'>
                  <div className=''>
                    {bookingData?.itinerary?.ports.map(
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
                              : i !== 0 && bookingData?.itinerary?.ports.length - 1 === i ? (
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
                </div> */}
                <div className='border-b col-span-10 border-gray-100/20' />
                <div className='flex flex-col items-start px-6 py-6'>
                  <p className="text-xs lg:text-sm font-medium text-gray-100">
                    Visiting Ports:
                  </p>
                  <div className="flex">
                    <p className="text-xs lg:text-sm font-medium !leading-5">
                      {bookingData?.itinerary?.ports
                        .filter((val: any) => val.name !== 'At Sea')
                        .map((val: any) => val.name)
                        .join(' | ')}
                    </p>
                  </div>
                </div>

                <div className='border-t border-gray-300'>
                  <div className='grid grid-cols-4 py-6'>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 lg:border-r lg:border-gray-300'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/nights-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Total Nights</p>
                        <p className='text-sm font-medium'>{bookingData?.itinerary?.nights}N/{bookingData?.itinerary?.nights + 1}D</p>
                      </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 lg:border-r lg:border-gray-300'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cabins-new-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Total Cabins</p>
                        <p className='text-sm font-medium'>{bookingData?.booking?.rooms?.length}</p>
                      </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 lg:border-r lg:border-gray-300 mt-4 lg:mt-0'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-new-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Total Guests</p>
                        <p className='text-sm font-medium'>{(bookingData?.booking?.guests?.adults?.length) + (bookingData?.booking?.guests?.children?.length) + (bookingData?.booking?.guests?.infants?.length)}</p>
                      </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1 flex items-center px-6 mt-4 lg:mt-0'>
                      <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-name-icon.svg" alt="" />
                      <div>
                        <p className='text-xs text-gray-100'>Cruise</p>
                        <p className='text-sm font-medium'>{bookingData?.itinerary?.ship?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-gray-400 shadow-allSide rounded-lg mt-6'>
                <div className='border-b border-gray-300 px-6 py-6'>
                  <p className='text-base lg:text-xl font-semibold'>Accomodation Details</p>
                </div>
                <div>
                  <div className='flex px-4 lg:px-5 py-6'>
                    {bookingData?.booking?.rooms.map((v: any, i: any) => (
                      // <div className={`border lg:border-2 cursor-pointer ${i == selectedCabin ? 'bg-brand-primary text-white' : 'text-brand-primary'} border-brand-primary px-4 lg:px-7 py-2 lg:py-3 mx-1 lg:mx-1.5 rounded`} onClick={() => setSelectedCabin(i)}>
                      //   <p className='text-xs lg:text-base font-semibold'>Cabin {i + 1}</p>
                      // </div>
                      <Fragment key={i}>
                        <Button text={`Cabin ${i + 1}`} type={i == selectedCabin ? 'primary' : 'secondary'} handleClick={() => setSelectedCabin(i)} className='mx-1 lg:mx-1.5' />
                      </Fragment>
                    ))}
                  </div>
                  <div className='px-4 lg:px-6 pb-6'>
                    <div className='flex justify-between'>
                      <div>
                        <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Deck No</p>
                        <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].ship_room?.deck_no}</p>
                        <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin Category</p>
                        <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].category_name}</p>
                      </div>
                      <div>
                        <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Room No</p>
                        <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].ship_room?.number}</p>
                        <p className='text-gray-100 text-xs lg:text-sm font-medium'>Guest No</p>
                        <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.booking?.rooms[selectedCabin].guests}</p>
                      </div>
                      <div>
                        <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Ship Name</p>
                        <p className='text-xs lg:text-base font-medium mt-1.5'>{bookingData?.itinerary?.ship?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='border-y border-gray-300 py-6 px-4 lg:px-6'>
                  <div className='flex justify-between'>
                    <p className='text-base lg:text-lg font-semibold'>Guest Details</p>
                    <p onClick={() => setGuestDetailModal(true)} className='text-brand-primary cursor-pointer font-semibold text-xs lg:text-sm underline'>Know More</p>
                  </div>
                </div>
                <div className='flex border-t border-gray-300'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 w-full'>
                    {bookingData?.booking?.rooms[selectedCabin].guest_details.map((v: any, i: number) => (
                      <div className={`grid grid-cols-2 py-2.5 lg:py-4 px-4 lg:px-5 ${(i == 0 || i == 3 || i == 4 || i == 7) ? 'lg:bg-gray-300/70' : ''} border-b border-gray-300 lg:border-0`}>
                        <div>
                          <p className='text-xs lg:text-sm text-gray-100'>Guest {i + 1}</p>
                          <p className='text-sm lg:text-base inline-block whitespace-nowrap overflow-hidden w-[140px] mt-1' style={{
                            textOverflow: 'ellipsis'
                          }}>{v.name}</p>
                        </div>
                        <div>
                          <p className='text-xs lg:text-sm text-gray-100'>Shore Excursions</p>
                          <p className='text-sm lg:text-base mt-1'>{v?.hold_excursions?.length ? v?.hold_excursions?.map((vs: any) => vs.code) : '-'}</p>
                        </div>
                      </div>
                    ))}
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
                      setGst(false)
                    }}
                  />
                  <p className='text-base lg:text-xl font-semibold'>I am a NRI</p>
                </div>
                {bookingData?.booking?.enable_tcs &&
                  <p className='text-sm lg:text-base mt-2 lg:mt-4 leading-6 lg:leading-8'><span className='font-semibold'>Important Notice:</span> For an NRI (Non-Residential Indian) <span className='font-semibold text-brand-primary'>20% TCS (Tax Collected at Source) will be imposed on the Total</span></p>
                }
              </div>

              {bookingData?.booking?.enable_tcs && !nri &&
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
                      <p className='text-base lg:text-xl font-semibold'>Select Tax Regime</p>
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
                            placeholder={!nri ? "Full Name as per Pan Card" : "Full Name as per Government ID"}
                            error={
                              errors &&
                              errors?.billing_address &&
                              errors?.billing_address.name
                            }
                            errorText={errors && errors.billing_address?.name?.message}
                          />

                          <div className='flex items-center gap-2 lg:gap-4'>
                            <Select
                              name='billing_address.country_code'
                              defaultValue={'billing_address.country_code' || '+91'}
                              menuPortalTarget={document.body}
                              menuPosition={'fixed'}
                              value={{ label: countryCode }}
                              maxMenuHeight={190}
                              options={phoneCodes}
                              onChange={(e: any) => {
                                setCountryCode(e.value)
                                setValue('billing_address.country_code', e.value)
                              }}

                              styles={customStyles}
                            />

                            <Input
                              type="tel"
                              name="billing_address.phone"
                              inputClassName="!w-full border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 md:w-[215px] w-[218px]"
                              placeholder="Phone Number"
                              {...register(`billing_address.phone`, {
                                required: "Please enter a valid mobile number",
                                pattern: {
                                  value: countryCode === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                                  message: "Please enter a valid mobile number",
                                },
                                maxLength: countryCode === "+91" ? 10 : 12, // Set maxLength to 10 for +91 and 12 for others
                              })}
                              maxLength={countryCode === "+91" ? 10 : 12}
                              onChange={(e: any) => setValue('billing_address.phone', e.target.value)}
                              error={
                                errors &&
                                errors?.billing_address &&
                                errors?.billing_address.phone
                              }
                              errorText={errors && errors.billing_address?.phone?.message}
                            />
                          </div>
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
                            disabled={gstData?.address ? true : false}
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
                                <div className='flex w-full items-center relative '>
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

                                {/* <p className={`${isPanVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mb-4`}>{panVerifiedFailMsg}</p> */}
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
              <div className='lg:hidden'>
                {CouponUI()}
              </div>
              <div className='border rounded-lg border-gray-400 shadow-allSide mt-6'>
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

                        <thead>
                          <tr>
                            <th className='w-1/2 border'>Days To Depature</th>
                            <th className='w-1/2 border'>Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            cancellationPolicy?.fees?.map((item: any, index: any) => (
                              <tr key={index} >
                                <td className='w-1/2 border'>{item?.days_to_depature}</td>
                                <td className='w-1/2 border'>{item?.fee}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      <ul className='list-disc text-sm font-semibold mt-2 ml-3'>
                        {
                          cancellationPolicy?.terms?.map((item: any, index: any) => (
                            <li>{item}</li>
                          ))
                        }
                      </ul>
                      <p className='text-xs font-bold underline uppercase mt-3'>Rescheduling Fee</p>
                      <table className='w-full lg:w-1/2 mt-2'>
                        <thead>
                          <tr>
                            <th className='w-1/2 border'>Days to depature</th>
                            <th className='w-1/2 border'>Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            reschedulePolicy?.fees?.map((item: any, index: any) => (
                              <tr key={index} >
                                <td className='w-1/2 border'>{item?.days_to_depature}</td>
                                <td className='w-1/2 border'>{item?.fee}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      <ul className='list-disc text-sm font-semibold mt-2 ml-3'>
                        {
                          reschedulePolicy?.terms?.map((item: any, index: any) => (
                            <li>{item}</li>
                          ))
                        }
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
                          checked={gst}
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
                            inputClassName="border-0 bg-disableColor text-gray-200 bg-gray-400 rounded-md text-sm lg:text-base py-3.5 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full mt-4"
                            placeholder="Name"
                          // error={
                          //   errors &&
                          //   errors?.billing_address &&
                          //   errors?.billing_address.gstName
                          // }
                          // errorText={errors && errors.billing_address?.gstName?.message}
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
                    {bookingData && bookingData?.booking && bookingData?.booking.enable_tcs ? (
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
              <div className='fixed lg:sticky top-28 pb-4'>
                {getDetailLoading ?
                  <TimelineLoader />
                  :
                  <div>
                    <div className='border-gray-400 shadow-allSide rounded-lg mb-4 '>
                      <div className='border-b border-gray-300 px-3 py-3'>
                        <p className='text-lg font-bold'>Price Details</p>
                      </div>
                      <div className='py-3 px-3'>
                        {bookingData?.booking?.rooms.map((room: any, index: number) => {
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
                        {bookingData?.booking.protection_plan && bookingData?.booking.protection_plan.amount > 0 ?
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(bookingData?.booking.protection_plan.amount)}</p>
                            </div>
                          </div>
                          : null
                        }
                        {bookingData?.booking?.discounts[0]?.amount || bookingData?.booking.cabin_fare_discount > 0 ?
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Total Cabin Fare Discount:</p>
                              {bookingData?.booking?.discount_text && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{bookingData?.booking?.discount_text}</p>}
                              {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{bookingData?.booking?.discounts[0]?.coupon_code}</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold text-brand-green">- ₹{FormatAmount((+bookingData?.booking.cabin_fare_discount || 0) + (+bookingData?.booking?.discounts[0]?.amount || 0))}</p>
                              {bookingData?.booking.cabin_fare_discount > 0 && <p className="text-xxs lg:text-sm font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking.cabin_fare_discount)}</p>}
                              {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-xxs lg:text-sm font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking?.discounts[0]?.amount)}</p>}
                            </div>
                          </div>
                          : null
                        }

                        {bookingData?.booking.shore_excursion_net_total ?
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Shore Excursions:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">₹{FormatToString(bookingData?.booking.shore_excursion_net_total)}</p>
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
                              bookingData?.booking?.sub_total
                            ).toFixed())}`}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                            <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1">
                              GST:
                            </p>
                            {bookingData?.booking.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">
                              Shore Excursion GST:
                            </p> : null}
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-bold">
                              {`₹ ${FormatToString((bookingData?.booking?.gst + (bookingData?.booking?.shore_excursion_gst || 0)).toFixed())}`}</p >
                            {
                              bookingData && bookingData?.booking && bookingData?.booking?.gst ?
                                <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(bookingData?.booking?.gst.toFixed())}`}</p>
                                : null
                            }
                            {bookingData?.booking?.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(bookingData?.booking?.shore_excursion_gst.toFixed())}`}</p> : null}
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
                                  bookingData?.booking?.total
                                )}`}</p>
                              </div>
                            </div>
                            {tcsObject.amount ?
                              <div className="grid grid-cols-3 mt-3">
                                <div className="col-span-2">
                                  <p className="text-sm lg:text-sm font-semibold">TCS:</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                                    tcsObject.amount
                                  ).toFixed())}`}</p>
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
                            {bookingData?.itinerary?.discount_pct != 0 ? <p className="text-sm lg:text-base line-through font-semibold text-gray-100">{`₹ ${FormatToString(
                              bookingData?.booking?.actual_total + (tcsObject?.amount || 0)
                            )}`}</p>
                              : null
                            }
                            <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatToString(
                              bookingData?.booking?.total + (tcsObject?.amount || 0)
                            )}`}</p>
                          </div>
                        </div>
                        {reserveBooking ?
                          <div className="flex justify-between items-start mt-3">
                            <div className="col-span-2">
                              <p className="text-base lg:text-xl font-bold text-brand-primary">Current Payble:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatAmount(
                                bookingData?.booking?.current_payable + (reserveTcsObject?.amount || 0)
                              )}`}</p>
                            </div>
                          </div>
                          : null
                        }
                      </div >
                    </div>

                    {CouponUI()}


                    <div className='mt-3'>
                      {/* {consent ?
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
                        // <Button text='Proceed to payment' handleClick={handleSubmit(proceedToPay)} isLoading={Loading} disabled={!consent && (Loading || !isPanVerified || (gst ? !isGstVerified : null))} className='w-full mt-3' />
                      } */}
                      <Button text='Proceed to payment' handleClick={handleSubmit(proceedToPay)} isLoading={Loading} disabled={!consent || (Loading || !isPanVerified || (gst ? !isGstVerified : null))} className='w-full mt-3' />
                    </div>
                  </div>
                }
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
                <p className='text-base font-bold text-brand-primary'>Current Payble: ₹{FormatAmount(bookingData?.booking?.current_payable + (reserveTcsObject?.amount || 0))}</p>
                :
                <p className='text-base font-bold text-brand-primary'>Grand Total: ₹{FormatPrice(bookingData?.booking?.total)}</p>
              }
              {priceBreakupModal &&
                <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer' onClick={() => setPriceBreakupModal(false)}>Hide Price Breakup</p>
              }
              {!priceBreakupModal &&
                <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer' onClick={() => setPriceBreakupModal(1)} >View Price Breakup</p>
              }
            </div>
            <div className=''>
              <Button text='Continue' size='sm' disabled={!consent || (Loading || !isPanVerified || (gst ? !isGstVerified : null))} isLoading={Loading} handleClick={handleSubmit(proceedToPay)} />
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
            {bookingData?.booking?.rooms.map((room: any, index: number) => {
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
            {bookingData?.booking.protection_plan && bookingData?.booking.protection_plan.amount > 0 ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm lg:text-sm font-semibold">₹{FormatPrice(bookingData?.booking.protection_plan.amount)}</p>
                </div>
              </div>
              : null
            }
            {bookingData?.booking?.discounts[0]?.amount || bookingData?.booking.cabin_fare_discount > 0 ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm font-semibold">Total Cabin Fare Discount:</p>
                  {bookingData?.booking?.discount_text && <p className="text-sm font-semibold text-gray-100">{bookingData?.booking?.discount_text}</p>}
                  {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-sm font-semibold text-gray-100">{bookingData?.booking?.discounts[0]?.coupon_code}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-brand-green">- ₹{FormatAmount((+bookingData?.booking.cabin_fare_discount || 0) + (+bookingData?.booking?.discounts[0]?.amount || 0))}</p>
                  {bookingData?.booking.cabin_fare_discount > 0 && <p className="text-sm font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking.cabin_fare_discount)}</p>}
                  {bookingData?.booking?.discounts && bookingData?.booking?.discounts[0] && <p className="text-sm font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.booking?.discounts[0]?.amount)}</p>}
                </div>
              </div>
              : null
            }

            {bookingData?.booking.shore_excursion_net_total ?
              <div className="grid grid-cols-3 mt-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-sm font-semibold">Shore Excursions:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm lg:text-sm font-semibold">₹{FormatToString(bookingData?.booking.shore_excursion_net_total)}</p>
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
                  bookingData?.booking?.sub_total
                ).toFixed())}`}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-3">
              <div className="col-span-2">
                <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1">
                  GST:
                </p>
                {bookingData?.booking.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">
                  Shore Excursion:
                </p> : null}
              </div>
              <div className="text-right">
                <p className="text-sm lg:text-sm font-bold">
                  {`₹ ${FormatToString((bookingData?.booking?.gst + (bookingData?.booking?.shore_excursion_gst || 0)).toFixed())}`}</p >
                {
                  bookingData && bookingData?.booking && bookingData?.booking?.gst ?
                    <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(bookingData?.booking?.gst.toFixed())}`}</p>
                    : null
                }
                {bookingData?.booking?.shore_excursion_gst ? <p className="text-sm lg:text-sm text-gray-100 font-semibold mt-1.5">{`₹ ${FormatToString(bookingData?.booking?.shore_excursion_gst.toFixed())}`}</p> : null}
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
                      bookingData?.booking?.total
                    )}`}</p>
                  </div>
                </div>
                {tcsObject.amount ?
                  <div className="grid grid-cols-3 mt-3">
                    <div className="col-span-2">
                      <p className="text-sm lg:text-sm font-semibold">TCS:</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                        tcsObject.amount
                      ).toFixed())}`}</p>
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
                {bookingData?.itinerary?.discount_pct != 0 ? <p className="text-sm lg:text-base line-through font-semibold text-gray-100">{`₹ ${FormatToString(
                  bookingData?.booking?.actual_total + (tcsObject?.amount || 0)
                )}`}</p>
                  : null
                }
                <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatToString(
                  bookingData?.booking?.total + (tcsObject?.amount || 0)
                )}`}</p>
              </div>
            </div>
          </div >
        </div>
      </Modal>

      <Modal show={guestDetailModal} align={'center'} className=" w-[90%] lg:w-2/4 center bg-white overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[70%] lg:h-[80%] relative" onClose={() => setGuestDetailModal(false)}>
        <div className=' p-4 flex items-center justify-end'>
          <img
            onClick={() => setGuestDetailModal(false)}
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/x-icon.svg"
            alt="arrow"
            className={`cursor-pointer h-4`}
          />
        </div>
        <div className='overflow-scroll h-[90%] lg:h-[90%] pb-5 lg:pb-2 px-6'>
          <div className='overflow-hidden overflow-x-scroll w-full pb-2'>
            <div className=''>
              {bookingData?.booking?.rooms[selectedCabin].guest_details.map((v: any, i: number) => (
                <div className={`inline-block border lg:border-2 border-brand-primary rounded cursor-pointer px-4 lg:px-6 py-2 lg:py-3 mr-1.5 lg:mr-3 ${selectedGuest == i ? 'bg-brand-primary text-white' : 'text-brand-primary'}`} onClick={() => setSelectedGuest(i)}>
                  <p className='text-xs lg:text-sm font-semibold'>Guest {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-6'>
            <div className='grid grid-cols-3 lg:grid-cols-4 gap-3'>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Full Name</p>
                <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].name}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Gender</p>
                <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].gender}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>DOB</p>
                <p className='text-xs lg:text-base font-medium break-words'>{moment(bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].date_of_birth).format('DD/MM/YYYY')}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Meal</p>
                <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].meal}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Mobile</p>
                <p className='text-xs lg:text-base font-medium break-words'>{(bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].phone) || '-'}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Email</p>
                <p className='text-xs lg:text-base font-medium break-words'>{(bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].email) || '-'}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Address</p>
                <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].city}</p>
              </div>
              <div>
                <p className='text-xxs lg:text-sm text-gray-100'>Citizenship</p>
                <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].citizenship}</p>
              </div>

              {bookingData?.itinerary?.is_international ?
                <>
                  <div>
                    <p className='text-xxs lg:text-sm text-gray-100'>Passport Number</p>
                    <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].passport_number}</p>
                  </div>
                  <div>
                    <p className='text-xxs lg:text-sm text-gray-100'>Passport Issue Date</p>
                    <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].passport_issue_date}</p>
                  </div>
                  <div>
                    <p className='text-xxs lg:text-sm text-gray-100'>Passport Expiry Date</p>
                    <p className='text-xs lg:text-base font-medium break-words'>{bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].passport_expiry_date}</p>
                  </div>
                </>
                : null}
            </div>
          </div>
          {bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].hold_excursions && bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].hold_excursions.length ?
            <div className='border-t border-gray-300 py-6 mt-6'>
              <h1 className='text-base lg:text-xl font-semibold'>Shore Excursions</h1>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3'>
                {bookingData?.booking?.rooms[selectedCabin].guest_details[selectedGuest].hold_excursions.map((v: any, i: number) => (
                  <div className='border border-gray-300 rounded bg-gray-400 px-4 py-4'>
                    <h1 className='text-sm lg:text-lg font-semibold mb-3'>{v.code}</h1>
                    {/* {v.inclusions.map((data: any, index: number) => ( */}
                    <div className='flex items-center'>
                      {/* <img className='h-2.5 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" /> */}
                      <p className='text-xs lg:text-base'>{v.title}</p>
                    </div>
                    {/* ))} */}
                    <div className='flex items-center border-t border-gray-300 pt-3 mt-3'>
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                        className="h-3 mr-1 lg:h-4"
                        alt="Cruise"
                      />
                      <p className='text-sm lg:text-base font-semibold'>Duration: {v.hours} Hours</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            : null}
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



      <Modal
        show={roomAvailableModal}
        align={'center'}
        className=" bg-white w-[90%] lg:w-[34%] center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto"
        onClose={() => {
          setCheckSplitPayment(false)
          setRoomAvailableModal(false)
        }}
      >
        <div className='p-4 flex items-center justify-end'>
          <img
            onClick={() => {
              setCheckSplitPayment(false)
              setRoomAvailableModal(false)
            }}
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/x-icon.svg"
            alt="arrow"
            className={`cursor-pointer h-3`}
          />
        </div>
        <div className='flex items-center flex-col pb-5 lg:pb-10 w-full'>
          <img className='h-20' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sold.svg" alt="" />
          <div className='px-4 lg:px-16 text-center'>
            <h1 className='text-xl font-bold py-6'>Unfortunately, the Cabin you've selected has been sold out</h1>
            <p className='text-gray-100'>This choice isn’t available anymore.</p>
            <p className='text-gray-100'>Browse from our available cabins instead</p>
            <Button 
              text='Explore Other Cabins'
              handleClick={() => {
                navigate(`/upcoming-cruises/itinerary?id=${bookingData?.itinerary?.itinerary_id}`)
              }}
              size='medium'
              className='rounded-full !py-3 mt-6'
            />
          </div>
        </div>
      </Modal>

    </Layout >
  );
}
