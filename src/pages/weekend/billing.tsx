import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Input } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import {
  FullName,
  Phone,
  Email,
  GSTIN,
  Required
} from '../../../src/utils/validations/formValidations';
import {
  useVerifyPanMutation,
  useVerifyGSTMutation,
  useInitPaymentNewMutation
} from '../../../src/services/payments/payment';
import { GetStore, SaveStore } from '../../../src/utils/store/store';
import Accordian from '../../components/UI/Accordion/accordion_basic';
import { useGetBookingDetailMutation } from '../../../src/services/itinerary/itinerary';
import Modal from '../../components/UI/Modal';
import {
  FormatCardNumber,
  FormatToString,
  UnFormatCardNumber,
  ordinal_suffix_of
} from '../../../src/utils/formatter/formatter';
import { FormatAmount } from '../../../src/utils/formatter/formatter';
import Header from './component/header';
import {
  TiggerGAInitiatePayment,
  TiggerFBCompleteRegistrationEvent
} from '../../../src/components/Analytics/events';
import { getPreviousPathname } from '../../../src/utils/getPriviousPath';
import toast, { Toaster } from 'react-hot-toast';
import {
  useGetCoupon2nMutation,
  useApplyNewCoupon2nMutation,
  useRemoveNewCoupon2nMutation
} from '../../services/weekend/weekend';
import Select from "react-select";
import phoneCodes from "../../components/UI/Forms/Inputs/phoneCodes.json";

type Props = {};

function removeByClass(obj: any) {
  if (obj && obj.length) {
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].paid == false) {
        return i;
      }
    }
  }
}

const amenities = [
  {
    title: 'Bathroom, Vanity Area',
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-cabin.svg'
  },
  {
    title: 'Television',
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-cabin.svg'
  },
  {
    title: 'Intercom',
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-cabin.svg'
  },
  {
    title: 'Secure Locker',
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/secure-safe-cabin.svg'
  },
  {
    title: '2 Water Bottles',
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/waterbottles-cabin.svg'
  },
  {
    title: 'Dining',
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/dining-area-cabin.svg'
  }
];

export default function WeekendBilling({}: Props) {
  const store = GetStore();
  const [getBookingDetail, { isLoading: loadingQuotationData }] =
    useGetBookingDetailMutation();

  const { itinerary, rooms, booking } = store;
  let navigate = useNavigate();

  const [loading, setLoading] = useState<any>(false);
  const [isPanVerified, setIsPanVerified] = useState<any>(null);
  const [panVerifiedFailMsg, setPanVerifiedFailMsg] = useState<any>('');
  const [isPanLoading, setIsPanLoading] = useState<any>(false);

  const [concent, setConcent] = useState<any>(false);
  const [gst, setGst] = useState<any>(false);
  const [isGstVerified, setIsGstVerified] = useState<any>(false);
  const [gstVerifiedFailMsg, setGstVerifiedFailMsg] = useState<any>('');
  const [isGstLoading, setIsGstLoading] = useState<any>(false);
  const [hideBreakup, setHideBreakup] = useState<any>(true);
  const [bookingData, setBookingData] = useState<any>(true);
  const [billingAddress, setBillingAddress] = useState();
  const [SplitModal, setSplitModal] = useState<any>(false);
  const [PaymentType, setPaymentType] = useState<any>(null);
  const [isCoupon, setIsCoupon] = useState<any>(false);
  const [checkSplitPayment, setCheckSplitPayment] = useState<any>(false);
  const [SelectSplitModal, setSelectSplitModal] = useState<any>(false);
  const [gstData, setGstData] = useState<any>([]);
  const [panName, setPanName] = useState<any>('');
  const [isCouponError, setIsCouponError] = useState<any>(false);
  const [countryCode, setCountryCode] = useState("+91");

  const [couponApplied, setCouponApplied] = useState<any>(false);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<any>('');
  const [couponCode, setCouponCode] = useState<any>('');
  const [getDetailLoading, setGetDetailLoading] = useState<any>();
  const [selectedCoupon, setSelectedCoupon] = useState<any>();
  const [couponList, setCouponList] = useState<any>();

  const [verifyPan] = useVerifyPanMutation();
  const [verifyGST] = useVerifyGSTMutation();
  const [completePayment] = useInitPaymentNewMutation();
  const [applyNewCoupon] = useApplyNewCoupon2nMutation();
  const [removeNewCoupon] = useRemoveNewCoupon2nMutation();
  const [getCoupon] = useGetCoupon2nMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const defaultFormValues = {
    billing_address: {
      name: '',
      phone: '',
      country_code: '',
      email: '',
      pan: '',
      gstin: '',
      gstName: ''
    }
  };
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
        country_code: '',
        email: '',
        pan: '',
        gstin: '',
        gstName: ''
      }
    }
  });

  const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#fff', height: '56px', width:'94px', marginBottom:'14px' }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted #ccc',
      padding: 10,
    }),
    menu: (styles: any) => ({
      ...styles,
      width: 'auto',
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: '1px'
    })
  };

  useEffect(() => {
    const _payload = {
      booking_id: booking?.id
    };
    getBookingDetail(_payload)
      .unwrap()
      .then((res: any) => {
        setBookingData(res);
      })
      .catch((res: any) => {
        console.log('Error: ', res);
      });
    localStorage.setItem('previousURL', window.location.href);
    // getPreviousPathname();
  }, []);

  useEffect(() => {
    let data = booking?.id;
    getCoupon(data)
      .unwrap()
      .then((res: any) => {
        setCouponList(res?.data?.coupons);
      })
      .catch((res: any) => {
        console.log('Error: ', res);
      });
  }, []);

  useEffect(() => {
    if (bookingData && bookingData?.booking && !isCoupon) {
      console.log(isCoupon)
      setValue(
        'billing_address.name',
        bookingData?.booking.billing_address.name === '-'
          ? ''
          : bookingData?.booking.billing_address.name
      );
      setValue('billing_address.country_code', bookingData?.billing_address?.country_code || '');
      setValue(
        'billing_address.pan',
        bookingData?.booking.billing_address.pan === '-'
          ? ''
          : bookingData?.booking.billing_address.pan
      );
      if (bookingData?.booking.billing_address.pan) {
        setIsPanVerified(true);
      } else {
        setIsPanVerified(false);
      }
      setValue(
        'billing_address.phone',
        bookingData?.booking.billing_address.phone === '-'
          ? ''
          : bookingData?.booking.billing_address.phone
      );
      setValue(
        'billing_address.email',
        bookingData?.booking.billing_address.email === '-'
          ? ''
          : bookingData?.booking.billing_address.email
      );
      if (bookingData?.booking.billing_address?.gstin) {
        setGst(true);
        setValue(
          'billing_address.gstin',
          bookingData?.booking.billing_address.gstin === '-'
            ? ''
            : bookingData?.booking.billing_address.gstin
        );
        setValue(
          'billing_address.gstName',
          bookingData?.booking.billing_address.name === '-'
            ? ''
            : bookingData?.booking.billing_address.name
        );
        setIsPanVerified(true);
      }
    }

    if (bookingData?.booking?.discounts[0]?.coupon_code) {
      setCouponCode(bookingData?.booking?.discounts[0]?.coupon_code);
      setCouponApplied(true);
      // setIsCoupon(false)
      // setCouponAppliedMessage('Coupon Applied Successfully');
    }
  }, [bookingData]);
  useEffect(() => {
    if (bookingData?.booking?.discounts[0]?.coupon_code) {
      applyCouponCode(bookingData?.booking?.discounts[0]?.coupon_code);
    }
  }, [couponApplied]);

  useEffect(() => {
    if (
      bookingData?.booking?.split_payment &&
      bookingData?.booking?.status === 'RESERVED'
    ) {
      let billingData = getValues('billing_address');
      setBillingAddress(billingData);
      setSplitModal(true);
      setPaymentType('split_payment');
    }
  }, [bookingData]);

  const checkVerifyPan = () => {
    if (
      getValues('billing_address.pan') &&
      getValues('billing_address.pan').length == 10
    ) {
      setIsPanLoading(true);
      const _payload = {
        pan: getValues('billing_address.pan')
      };
      verifyPan(_payload)
        .unwrap()
        .then((res: any) => {
          setIsPanVerified(true);
          setPanName(res);
          setValue('billing_address.name', res?.name);
          setPanVerifiedFailMsg('Verified');
          setIsPanLoading(false);
          toast.success('Name is updated as per the Pan Card', {
            duration: 3000,
            position: 'bottom-right',
            style: {
              background: '#11b843',
              color: '#fff'
            }
          });
        })
        .catch((res: any) => {
          setIsPanLoading(false);
          setPanVerifiedFailMsg('Invalid PAN Number');
          console.log('Error: ', res);
        });
    } else {
      setIsPanLoading(false);
      setIsPanVerified(false);
      setPanVerifiedFailMsg('');
    }
  };
  const handleSetNAme = () => {
    setValue('billing_address.name', panName?.name);
  };
  const checkVerifyGST = () => {
    if (
      getValues('billing_address.gstin') &&
      getValues('billing_address.gstin').length == 15
    ) {
      setIsGstLoading(true);
      const _payload = {
        gstin: getValues('billing_address.gstin')
      };
      verifyGST(_payload)
        .unwrap()
        .then((res: any) => {
          setGstData(res);
          setValue('billing_address.gstName', res?.name);
          setIsGstVerified(true);
          setGstVerifiedFailMsg('Verified');
          setIsGstLoading(false);
        })
        .catch((res: any) => {
          setIsGstLoading(false);
          setGstVerifiedFailMsg('Invalid GSTIN');
          console.log('Error: ', res);
        });
    } else {
      setIsGstLoading(false);
      setIsGstVerified(false);
      setGstVerifiedFailMsg('');
    }
  };
  const proceedToPay = (data: any) => {
    setBillingAddress(data.billing_address);
    if (bookingData?.booking?.split_payment_options?.available) {
      if (
        bookingData?.booking?.split_payment &&
        bookingData?.booking?.status === 'RESERVED'
      ) {
        setSplitModal(true);
        setPaymentType('split_payment');
      } else {
        setSelectSplitModal(true);
      }
    } else {
      setCheckSplitPayment(true);
    }
  };
  const PaymentProcess = () => {
    if (PaymentType === 'single_payment') {
      initPayment();
    } else if (PaymentType === 'split_payment') {
      setSelectSplitModal(false);
      setSplitModal(true);
    }
  };
  const initPayment = () => {
    console.log('roh billingAddress', billingAddress);
    
    const GAData = {
      currency: 'INR',
      value: bookingData?.booking?.total,
      items: store.GAData,
      name: store.GAData[0].item_name
    };

    const GAEnhancedData = {
      "email": billingAddress.email,
      "phone_number": billingAddress.phone
    }

    TiggerGAInitiatePayment(GAData, GAEnhancedData);
    // TiggerFBCompleteRegistrationEvent();

    const _payload = {
      booking_id: bookingData?.booking.id,
      billing_address: billingAddress,
      payment_for: PaymentType
    };
    setLoading(true);
    completePayment(_payload)
      .unwrap()
      .then((res: any) => {
        setLoading(false);
        navigate('/payment-method', {
          state: {
            // paymentData: res,
            // billingAddress: billingAddress,
            // bookingData: bookingData,
            // payment_for: PaymentType
            paymentData: res, 
            billingAddress: billingAddress, 
            bookingData: bookingData, 
            payment_for: PaymentType, 
            promo_code: couponCode, 
            currentPayble: (bookingData?.booking?.current_payable), 
            quotation: false 
          }
        });
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setLoading(false);
      });
  };
  const splitPaymentDesign = () => {
    let res: any = [];
    res = bookingData?.booking?.split_payment_options?.options;
    if (res) {
      return res?.map((val: any, key: any) => {
        return key === removeByClass(res) ? (
          <div className="flex justify-between px-3 py-3 rounded border border-brand-primary mb-2">
            <p className="text-sm font-semibold text-brand-primary">
              {ordinal_suffix_of(key + 1)} Transaction
            </p>
            <p className="text-sm font-semibold text-brand-primary">
              ₹ {val.amount}
            </p>
          </div>
        ) : (
          <div className="flex justify-between px-3 py-3 rounded border border-gray-200 mb-2">
            <p className="text-sm font-semibold text-gray-100">
              {ordinal_suffix_of(key + 1)} Transaction
            </p>
            <p className="text-sm font-semibold text-gray-100">
              ₹ {val.amount}
            </p>
          </div>
        );
      });
    }
  };
  const splitPaymentRedirect = () => {
    initPayment();
  };
  const gstChecked = (e: any) => {
    setGst(e.target.checked);
    if (e.target.checked === false) {
      setValue('billing_address.gstName', '');
      setValue('billing_address.gstin', '');
      setGstVerifiedFailMsg('');
    }
  };

  useEffect(() => {
    if (checkSplitPayment) {
      initPayment();
    }
  }, [checkSplitPayment]);

  const applyCouponCode = (coupon: any) => {
    setGetDetailLoading(true);
    const _payload = {
      id: booking?.id,
      data: {
        coupon_code: coupon
      }
    };
    applyNewCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        setIsCouponError(false);

        setGetDetailLoading(false);
        setBookingData(res.data);
        setCouponApplied(true);
        setCouponAppliedMessage(res.message);
      })
      .catch((res: any) => {
        setIsCouponError(true);
        setCouponAppliedMessage(res.data.message);

        setGetDetailLoading(false);
        console.log('Error: ', res);
      });
  };

  const removeCouponCode = (coupon: any) => {
    setGetDetailLoading(true);
    const _payload = {
      id: booking.id,
      data: {
        coupon_code: coupon
      }
    };
    removeNewCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        setSelectedCoupon('');
        setCouponCode('');
        setBookingData(res.data);
        setGetDetailLoading(false);
        setCouponApplied(false);
        setCouponAppliedMessage('');
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setGetDetailLoading(false);
      });
  };

  const CouponUI = () => {
    const couponInput = () => {
      return (
        <>
          <div className="mt-3 flex">
            <div className="rounded-l-md px-3 w-full placeholder:text-xs border-0 bg-gray-400 flex items-center">
              <input
                disabled={couponApplied}
                className={`w-full text-sm placeholder:text-gray-100/[0.62] lg:text-base placeholder:text-gray-100 bg-white/0 border-0 active:border-0 border-transparent focus:border-transparent focus:ring-0 py-3.5`}
                type="text"
                value={couponCode}
                name="couponss"
                placeholder="Have a coupon code"
                onChange={(e) => {
                   
                  setCouponCode(e.target.value);
                }}
              />
              {couponApplied && (
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    setIsCoupon(true);
                    removeCouponCode(couponCode);
                  }}
                >
                  X
                </span>
              )}
            </div>
            <button
              disabled={couponApplied}
              onClick={() => applyCouponCode(couponCode)}
              className="bg-brand-primary w-[100px] rounded-r-md text-white text-xs py-2 font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
            >
              {!'couponLoading' ? (
                <span className="loading-elipses">Loading</span>
              ) : (
                'Apply'
              )}
            </button>
          </div>
          {couponAppliedMessage ? (
            <p
              className={`${
                isCouponError ? 'text-danger' : 'text-success'
              } 'mt-2 text-sm font-medium'`}
            >
              {couponAppliedMessage}
            </p>
          ) : null}
        </>
      );
    };
    const listUI = () => {
      if (couponList) {
        return (
          <div className="my-3 shadow-allSide px-3 py-3">
            <p className="text-lg font-semibold">Coupon Code</p>
            {couponList?.map((val: any, index: any) => (
              <div
                className="border border-dotted rounded mt-3 py-3 px-3"
                key={index}
              >
                <div className="flex">
                  <input
                    type="radio"
                    className="mt-1 w-[13px] h-[13px] rounded-full cursor-pointer"
                    name="coupon"
                    id=""
                    checked={val.coupon_code == couponCode && couponApplied}
                    onClick={() => {
                      setSelectedCoupon(val);
                      setIsCoupon(true);
                      setCouponCode(val.coupon_code);
                      applyCouponCode(val.coupon_code);
                    }}
                  />
                  <div className="ml-2 w-full">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold">
                          {val.coupon_code}
                        </p>
                        {val.coupon_code == couponCode && couponApplied ? (
                          <div
                            onClick={() => removeCouponCode(val.coupon_code)}
                            className="bg-gray-100 h-3 w-3 ml-2 cursor-pointer flex items-center justify-center p-1 rounded-full"
                          >
                            <p className=" text-white text-xxxs leading-[17]">
                              x
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <p className="text-sm font-semibold">
                        ₹ {val.discount_for_booking}
                      </p>
                    </div>
                    <p className="text-xs font-normal">{val.description}</p>
                  </div>
                </div>
              </div>
            ))}
            {couponInput()}
          </div>
        );
      }
    };
    return <div>{listUI()}</div>;
  };

  console.log('roh date', moment(itinerary?.end_date, 'DD/MM/YYYY').format('ddd'), moment(itinerary?.ports[0].departure).format('hh:mm A'));
  

  return (
    <>
      <Header isVideo={false} />
      <Toaster />
      <main className="container mx-auto pt-20 pb-44 lg:pb-20 lg:pt-28 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
              alt="arrow"
              onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 h-6 p-1`}
            />
            <h1 className="text-xl  font-medium lg:text-3xl">
              Billing Details
            </h1>
          </div>
          <div className="grid grid-cols-12 mt-4">
            <div className="col-span-12 lg:col-span-5 lg:pl-10 lg:order-2">
              <div className="px-4 py-4 lg:py-6 border border-[#185DA0]/20 rounded-t shadow-sm bg-[#F4F8FF]">
                <div className="flex justify-between items-start">
                  <p className="text-base lg:text-xl  font-semibold">
                    {itinerary?.portName}
                  </p>
                  <div
                    className="flex items-center bg-[#185DA0] px-3 py-1.5 lg:px-4 lg:py-1.5 rounded cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    <p className="text-white text-sm lg:text-base mr-1 lg:mr-2">
                      Edit
                    </p>
                    <img
                      className="lg:w-3"
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex items-start justify-between mt-4 lg:mt-8">
                  <div className="text-center">
                    <p className="text-xs lg:text-sm  font-semibold">
                      {moment(itinerary?.start_date, 'DD/MM/YYYY').format(
                        'MMM Do, YYYY'
                      )}
                    </p>
                    <p className="text-xxs text-gray-100 font-semibold">
                      {moment(itinerary?.start_date, 'DD/MM/YYYY').format('ddd')},  {moment(itinerary?.ports[0].departure).format('hh:mm A')}
                      {/* {moment(
                        itinerary?.ports[0].departure,
                        'ddd, DD MMM HH:ss A'
                      ).format('dddd hh:ss A')} */}
                    </p>
                  </div>
                  <div className="w-[40%] text-center relative -mt-[5px] lg:-mt-[3px]">
                    <p className="text-gray-200 whitespace-nowrap overflow-hidden">
                      ------------------------------
                    </p>
                    <img
                      className="absolute"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs lg:text-sm  font-semibold">
                      {moment(itinerary?.end_date, 'DD/MM/YYYY').format(
                        'MMM Do, YYYY'
                      )}
                    </p>
                    <p className="text-xxs text-gray-100 font-semibold">
                    {moment(itinerary?.end_date, 'DD/MM/YYYY').format('ddd')},  {moment(itinerary?.ports[itinerary?.ports.length - 1].arrival).format('hh:mm A')}
                      {/* {moment(
                        itinerary?.ports[itinerary?.ports.length - 1].arrival,
                        'ddd, DD MMM HH:ss A'
                      ).format('dddd hh:ss A')} */}
                    </p>
                  </div>
                </div>
                {/* <div className='flex justify-between'>
                                    <p className='text-xxs text-gray-100 font-semibold'>
                                        {itinerary?.ports[0].arrival}
                                    </p>
                                    <p className='text-xxs text-gray-100 font-semibold'>
                                        {itinerary?.ports[itinerary?.ports.length-1].arrival}
                                    </p>
                                </div> */}
              </div>
              <div className="border-x border-[#185DA0]/20 py-2">
                <div className="flex flex-wrap">
                  {amenities?.map((item: any) => {
                    return (
                      <div className="px-2 lg:px-3 py-1.5 mr-1 flex items-center">
                        <img
                          className="h-5 lg:h-4 mr-1 lg:mr-2"
                          src={item.icon}
                          alt=""
                        />
                        <p className="text-xxs text-gray-600 font-medium">
                          {item.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {store?.rooms?.map((room: any, i: any) => {
                return (
                  <div className="px-4 py-4 lg:py-6 border border-[#185DA0]/20 shadow-sm bg-[#F4F8FF] flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                          className="h-3 lg:h-3 mr-2"
                          alt="Cruise"
                        />
                        <p className="text-xs lg:text-sm font-medium">
                          Cabin {i + 1}
                        </p>
                      </div>
                      <p className="text-sm lg:text-base font-semibold mt-1">
                        {room.selected_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-medium">Guest No</p>
                      <p className="text-sm lg:text-base font-bold text-brand-primary mt-1">
                        {room.adults + room.children + room.infants}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* <div className='px-4 py-3 border border-t-0 border-[#185DA0]/20 rounded-b lg:rounded-none shadow-sm flex items-center'>
                                <div className='flex items-center'>
                                    <img className='mr-2 lg:h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg" alt="" />
                                    <p className='text-xs lg:text-base  font-medium'>{rooms?.length} Cabins</p>
                                </div>
                                <div className='flex items-center ml-5'>
                                    <img className='mr-2 lg:h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-icon.svg" alt="" />
                                    <p className='text-xs lg:text-base  font-medium'>{rooms.reduce((sum: any, item: any) => sum + item.adults + item.children + item.infants, 0)} Guests</p>
                                </div>
                            </div> */}

              {CouponUI()}

              <div className="mt-4">
                <div className=" py-4 lg:py-6 border border-gray-400 bg-white rounded shadow-allSide">
                  <div className="px-4 flex items-start justify-between border-b border-gray-300 pb-4 lg:pb-6">
                    <p className="text-base lg:text-xl font-bold">
                      Price Details
                    </p>
                    <p
                      onClick={() => setHideBreakup(!hideBreakup)}
                      className="text-sm lg:text-base text-[#008CFF] font-medium cursor-pointer"
                    >
                      {hideBreakup
                        ? 'View Price Breakup'
                        : 'Hide Price Breakup'}
                    </p>
                  </div>

                  {!hideBreakup && (
                    <div className="pt-6">
                      {bookingData?.booking?.rooms?.map(
                        (room: any, index: any) => {
                          const TotalGuest = room.guests;
                          const category = room.category_details;
                          return (
                            <div className="mb-3 px-4">
                              <div className="flex justify-between mb-1">
                                <p className="text-sm lg:text-base  mb-0.5 font-medium">
                                  {room.category_name} Cabin
                                </p>
                                <p className="text-sm lg:text-base  mb-0.5 font-medium">
                                  ₹ {FormatAmount(room.actual_cabin_fare)}
                                </p>
                              </div>
                              <div className="flex justify-between mb-1">
                                <p className="text-sm lg:text-base  mb-0.5 font-medium">
                                  Service Charge & Levies
                                </p>
                                <p className="text-sm lg:text-base  mb-0.5 font-medium">
                                  ₹ {FormatAmount(room.service_charges)}
                                </p>
                              </div>
                              <div className="flex justify-between mb-1">
                                <p className="text-sm lg:text-base  mb-0.5 font-medium">
                                  Fuel Surcharge
                                </p>
                                <p className="text-sm lg:text-base  mb-0.5 font-medium">
                                  ₹ {FormatAmount(room.fuel_surcharge)}
                                </p>
                              </div>
                              {/* <div className='flex justify-between'>
                                                            <p className="text-sm lg:text-base  font-medium">Sub-total</p>
                                                            <p className="text-sm lg:text-base  font-medium">₹ {FormatAmount(room.total)}</p>
                                                        </div> */}
                            </div>
                          );
                        }
                      )}

                      {/* {booking.cabin_fare_discount ?
                                                <div className='px-4 pb-3'>
                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <p className="text-sm lg:text-base  mb-0.5 font-semibold text-brand-green">Discount</p>
                                                            {booking?.discount_text ? <p className="text-xxs lg:text-xs  mb-0.5 font-semibold text-gray-100">{booking?.discount_text}</p> : null}
                                                        </div>
                                                        <p className="text-sm lg:text-base  mb-0.5 font-semibold text-brand-green">- ₹ {FormatAmount(booking.cabin_fare_discount)}</p>
                                                    </div>
                                                </div>
                                                : null
                                            } */}
                      {bookingData?.booking?.discounts[0]?.amount ||
                      bookingData?.booking.cabin_fare_discount > 0 ? (
                        <div className="grid grid-cols-3 px-4 pb-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-base font-semibold">
                              Total Cabin Fare Discount:
                            </p>
                            {bookingData?.booking?.discount_text && (
                              <p className="text-sm lg:text-sm font-semibold text-gray-100">
                                {bookingData?.booking?.discount_text}
                              </p>
                            )}
                            {bookingData?.booking?.discounts &&
                              bookingData?.booking?.discounts[0] && (
                                <p className="text-sm lg:text-sm font-semibold text-gray-100">
                                  {
                                    bookingData?.booking?.discounts[0]
                                      ?.coupon_code
                                  }
                                </p>
                              )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-base font-semibold text-brand-green">
                              - ₹
                              {FormatAmount(
                                (+bookingData?.booking.cabin_fare_discount ||
                                  0) +
                                  (+bookingData?.booking?.discounts[0]
                                    ?.amount || 0)
                              )}
                            </p>
                            {bookingData?.booking.cabin_fare_discount > 0 && (
                              <p className="text-sm lg:text-sm font-semibold text-gray-100">
                                - ₹
                                {FormatAmount(
                                  bookingData?.booking.cabin_fare_discount
                                )}
                              </p>
                            )}
                            {bookingData?.booking?.discounts &&
                              bookingData?.booking?.discounts[0] && (
                                <p className="text-sm lg:text-sm font-semibold text-gray-100">
                                  - ₹
                                  {FormatAmount(
                                    bookingData?.booking?.discounts[0]?.amount
                                  )}
                                </p>
                              )}
                          </div>
                        </div>
                      ) : null}
                      <div className="px-4 pb-3">
                        <div className="flex justify-between">
                          <p className="text-sm lg:text-base  mb-0.5 font-semibold">
                            Sub-total
                          </p>
                          <p className="text-sm lg:text-base  mb-0.5 font-semibold">
                            ₹ {FormatAmount(bookingData?.booking.sub_total)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#F4F8FF] px-4 py-3">
                        <div className="flex justify-between mb-1">
                          <p className="text-sm lg:text-base  mb-0.5 font-medium">
                            Taxes
                          </p>
                          <p className="text-sm lg:text-base  mb-0.5 font-medium">
                            ₹ {FormatAmount(bookingData?.booking?.gst)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">
                            GST
                          </p>
                          <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">
                            ₹ {FormatAmount(bookingData?.booking?.gst)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="px-4 pt-2 lg:pt-4">
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-base lg:text-2xl font-bold">
                        Total Fare
                      </p>
                      <div className="text-right">
                        {itinerary?.discount_pct != 0 ? (
                          <p className="text-sm lg:text-base font-semibold text-gray-100 line-through">
                            ₹ {FormatAmount(bookingData?.booking?.actual_total)}
                          </p>
                        ) : null}
                        <p className="text-base lg:text-2xl font-bold text-brand-primary">
                          ₹ {FormatAmount(bookingData?.booking?.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 hidden lg:block">
                  {concent ? (
                    <button
                      disabled={
                        loading ||
                        (gst ? !isGstVerified : null) ||
                        !isPanVerified
                      }
                      onClick={handleSubmit(proceedToPay)}
                      className="text-white bg-brand-primary font-semibold px-4 py-3 rounded w-full disabled:bg-brand-primary/40"
                    >
                      Proceed to payment
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      className="text-white font-semibold px-4 py-3 rounded w-full bg-brand-primary/40"
                    >
                      Proceed to payment
                    </button>
                  )}
                </div>
              </div>

              {/* <div className='py-3 shadow-allSide mt-4 border border-gray-300 lg:hidden'>
                                <Accordian
                                    mainClass='cursor-pointer'
                                    openByDefault={true}
                                    title="Price Details"
                                    titleClass="text-base lg:text-lg  font-semibold px-4"
                                >
                                    <div className='border-t border-gray-300 my-3' />
                                    <div className='px-4'>
                                        {booking?.rooms?.map((room: any, index: any) => {
                                            const category = room.category_details
                                            return (
                                                <div className='mb-3'>
                                                    <div className='flex justify-between mb-1'>
                                                        <p className="text-xs font-medium  mb-0.5">{`Cabin ${index + 1}`} Fare</p>
                                                        <p className="text-xs font-medium  mb-0.5">₹ {room.cabin_fare}</p>
                                                    </div>
                                                    <div className='flex justify-between mb-1'>
                                                        <p className="text-xs font-medium  mb-0.5">Service Charge & Levies</p>
                                                        <p className="text-xs font-medium  mb-0.5">₹ {room.service_charges}</p>
                                                    </div>
                                                    <div className='flex justify-between mb-1'>
                                                        <p className="text-xs font-medium  mb-0.5">Fuel Surcharge</p>
                                                        <p className="text-xs font-medium  mb-0.5">₹ {room.fuel_surcharge}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className='flex justify-between mb-1'>
                                            <p className="text-xs font-medium  mb-0.5">Sub-total</p>
                                            <p className="text-xs font-medium  mb-0.5">₹ {booking?.sub_total}</p>
                                        </div>
                                    </div>
                                    <div className='bg-[#F4F8FF] px-4 py-3'>
                                        <div className='flex justify-between mb-1'>
                                            <p className="text-xs font-medium  mb-0.5">Taxes</p>
                                            <p className="text-xs font-medium  mb-0.5">₹ {booking?.gst}</p>
                                        </div>
                                        <div className='flex justify-between mb-1'>
                                            <p className="text-xs text-gray-200 font-medium  mb-0.5">GST</p>
                                            <p className="text-xs text-gray-200 font-medium  mb-0.5">₹ {booking?.gst}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-3 px-4'>
                                        <p className="text-base font-semibold  mb-0.5">Total Fare</p>
                                        <p className="text-base font-semibold  mb-0.5">₹ {booking?.total}</p>
                                    </div>
                                </Accordian>
                            </div> */}
            </div>
            <div className="col-span-12 lg:col-span-7 mt-4 lg:mt-0">
              <Input
                type="text"
                register={register}
                validation={FullName}
                onChange={(e: any) =>
                  setValue('billing_address.name', e.target.value)
                }
                name="billing_address.name"
                minLength={3}
                inputClassName="border text-gray-200 border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                placeholder="Full Name as per Pan Card*"
                className="mb-2 lg:mb-4"
                error={
                  errors &&
                  errors?.billing_address &&
                  errors?.billing_address.name
                }
                errorText={errors && errors.billing_address?.name?.message}
              />
              <div className='flex gap-3'>
                <Select
                  name='billing_address.country_code'
                  defaultValue={'+91'}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  value={{ label: billingAddress?.country_code || countryCode }}
                  maxMenuHeight={190}
                  options={phoneCodes}
                  onChange={(e: any) => {
                    setCountryCode( e.value)
                    setValue('billing_address.country_code', e.value )
                  }}
                  styles={customStyles}
                  // isDisabled={true}
                />
                <div className="grid lg:grid-cols-2 lg:gap-4 w-full">
                  <Input
                    type="tel"
                    register={register}
                    validation={Phone}
                    onChange={(e: any) =>
                      setValue('billing_address.phone', e.target.value)
                    }
                    maxLength={'10'}
                    name="billing_address.phone"
                    inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                    className="mb-2 lg:mb-4"
                    placeholder="Phone Number*"
                    error={
                      errors &&
                      errors?.billing_address &&
                      errors?.billing_address.phone
                    }
                    errorText={errors && errors.billing_address?.phone?.message}
                  />
                  <Input
                    type="email"
                    register={register}
                    validation={Email}
                    onChange={(e: any) =>
                      setValue('billing_address.email', e.target.value)
                    }
                    name="billing_address.email"
                    inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                    className="mb-2 lg:mb-4"
                    placeholder="Email*"
                    error={
                      errors &&
                      errors?.billing_address &&
                      errors?.billing_address.email
                    }
                    errorText={errors && errors.billing_address?.email?.message}
                  />
                </div>
              </div>
              <div>
                <div className="flex w-full items-center relative">
                  <Input
                    type="text"
                    register={register}
                    // validation={PanNo}
                    maxLength="10"
                    onChange={(e: any) => {
                      setValue('billing_address.pan', e.target.value);
                      checkVerifyPan();
                    }}
                    name="billing_address.pan"
                    inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full uppercase placeholder:capitalize"
                    className="w-full mb-0 lg:mb-2"
                    placeholder="Pan number*"
                    error={
                      errors &&
                      errors?.billing_address &&
                      errors?.billing_address.pan
                    }
                    errorText={errors && errors.billing_address?.pan?.message}
                  />
                  {isPanLoading && (
                    <div role="status" className="absolute right-2 top-4">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  )}
                  {isPanVerified ? (
                    <div className="absolute right-2 top-4">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-vaild.svg" />
                    </div>
                  ) : null}
                  {panVerifiedFailMsg === 'Invalid PAN Number' ? (
                    <div className="absolute right-2 top-4 ">
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-invaild.svg" />
                    </div>
                  ) : null}
                </div>
                {/* {getValues('billing_address.name') && getValues('billing_address.pan') ?
                                getValues('billing_address.name') != panName?.name ?   <p onClick={handleSetNAme} className={`text-xs font-semibold text-brand-primary cursor-pointer mb-4`}>Click to Update Full Name as per the Pan Card</p> : null : null} */}
                {/* <p className={`${isPanVerified ? 'text-success' : 'text-danger'} text-xs lg:font-semibold capitalize mt-0.5`}>{panVerifiedFailMsg}</p> */}
              </div>

              <div
                className={`border-2 p-4 mt-2 rounded border-gray-400 shadow-allSide`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    onChange={gstChecked}
                    checked={gst}
                  />
                  <p className={`text-sm lg:text-lg font-semibold `}>
                    I Have a GST Number
                  </p>
                </div>
                <p className={` text-xxs lg:text-sm mt-2 text-gray-100`}>
                  Kindly submit GST details for seamless filing of your tax
                  return
                </p>
                {gst && (
                  <div className="border-t mt-3 border-gray-300">
                    <div className="flex items-center relative mt-4">
                      <Input
                        type="text"
                        register={register}
                        validation={GSTIN}
                        maxLength="15"
                        name="billing_address.gstin"
                        inputClassName="border border-gray-300/80 shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full uppercase placeholder:capitalize"
                        className="w-full mb-0"
                        onChange={(e: any) => {
                          setValue('billing_address.gstin', e.target.value);
                          checkVerifyGST();
                        }}
                        placeholder="GSTIN*"
                        error={
                          errors &&
                          errors?.billing_address &&
                          errors?.billing_address.gstin
                        }
                        errorText={
                          errors && errors.billing_address?.gstin?.message
                        }
                      />
                      {isGstLoading && (
                        <div role="status" className="absolute right-2">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p
                      className={`${
                        isGstVerified ? 'text-success' : 'text-danger'
                      } text-xs lg:font-semibold capitalize mt-0.5`}
                    >
                      {gstVerifiedFailMsg}
                    </p>
                    <Input
                      type="text"
                      register={register}
                      disabled
                      validation={Required}
                      name="billing_address.gstName"
                      inputClassName="border border-gray-300/80 bg-disableColor text-gray-200  shadow-allSide rounded-md text-sm lg:text-base py-3.5 lg:py-4 lg:text-base px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full mt-2"
                      placeholder="Name*"
                      error={
                        errors &&
                        errors?.billing_address &&
                        errors?.billing_address.gstName
                      }
                      errorText={
                        errors && errors.billing_address?.gstName?.message
                      }
                    />

                    <p className="text-xxs lg:text-sm text-gray-100 mt-3 mb-2">
                      Note: GST Number once submitted will not be subject to
                      change.
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`border-2 p-4 mt-4 rounded border-gray-400 shadow-allSide`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    onChange={(e) => setConcent(e.target.checked)}
                  />
                  <p className={`text-sm lg:text-lg font-semibold `}>
                    By clicking Agree and Continue, I hereby:
                  </p>
                </div>
                <p
                  className={` text-xxs lg:text-sm mt-2 text-gray-100 lg:leading-6`}
                >
                  Agree and consent to the Privacy Policy, Cancellation and
                  Rescheduling Policy, Passenger Cruise Ticket Contract and all
                  other Terms and Conditions as appear hereinabove and on
                  website www.cordeliacruises.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed w-full bottom-0 z-30 lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]">
        <div className="bg-white px-4 py-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-semibold">
              {itinerary?.nights}N/{itinerary?.nights + 1}D
            </p>
            <p className="text-xs font-semibold">Total Price</p>
          </div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-base font-bold">{itinerary?.date}</p>
            <div className="text-right">
              {itinerary?.discount_pct != 0 ? (
                <p className="text-xs lg:text-base font-semibold text-gray-100 line-through">
                  ₹ {FormatAmount(bookingData?.booking?.actual_total)}
                </p>
              ) : null}
              <p className="text-base font-bold text-brand-primary">
                ₹ {FormatAmount(bookingData?.booking?.total)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                className="h-2 mr-1"
                alt="Cruise"
              />
              <p className="text-xxs font-semibold">{rooms?.length} Cabins</p>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-icon.svg"
                className="h-2 mr-1 ml-2"
                alt="Cruise"
              />
              <p className="text-xxs font-semibold">
                {rooms?.reduce(
                  (sum: any, item: any) =>
                    sum + item.adults + item.children + item.infants,
                  0
                )}{' '}
                Guest
              </p>
            </div>
            <p className="text-xxs font-semibold text-[#094E9E]">
              Inclusive All Charges *
            </p>
          </div>
          <div className="mt-3">
            {concent ? (
              <button
                disabled={
                  loading || (gst ? !isGstVerified : null) || !isPanVerified
                }
                onClick={handleSubmit(proceedToPay)}
                className="text-white bg-brand-primary font-semibold px-4 py-2.5 rounded w-full disabled:bg-brand-primary/40"
              >
                Proceed to payment
              </button>
            ) : (
              <button
                disabled={true}
                className="text-white font-semibold px-4 py-2.5 rounded w-full bg-brand-primary/40"
              >
                Proceed to payment
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={SelectSplitModal}
        align={'center'}
        className=" bg-white w-[90%] lg:w-2/4 center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto	"
        onClose={() => setSelectSplitModal(false)}
      >
        <div
          className="border-brand-primary p-4 mb-4 flex items-center text-center bg-brand-primary text-white"
          onClick={() => setSelectSplitModal(false)}
        >
          <p className="text-xs font-semibold">
            Some cards and UPI have transaction limits that may cause the
            payment to fail.
          </p>
        </div>
        <div className="pb-5 lg:pb-10">
          <h1 className="text-lg font-semibold text-center pb-5 pt-2">
            How would you like to pay?
          </h1>
          <div
            className="flex items-start border-t p-5"
            onClick={() => setPaymentType('single_payment')}
          >
            <img
              className="mt-1"
              src={
                PaymentType === 'single_payment'
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg'
              }
              alt=""
            />
            <div className="ml-2">
              <p className="text-sm font-semibold">Pay in single transaction</p>
              <p className="text-xxs font-semibold">
                I can pay {bookingData?.booking?.total} in one transaction
              </p>
            </div>
          </div>
          <div
            className="flex items-start border-t pt-5 px-5"
            onClick={() => setPaymentType('split_payment')}
          >
            <img
              className="mt-1"
              src={
                PaymentType === 'split_payment'
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg'
              }
              alt=""
            />
            <div className="ml-2">
              <p className="text-sm font-semibold">Split payment</p>
              <p className="text-xxs font-semibold">
                Split into multiple transaction of less than Rs. 50,000 each
              </p>
            </div>
          </div>
          {PaymentType ? (
            <div className="flex items-start pt-5 px-5">
              <button
                onClick={PaymentProcess}
                className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-elipses">Loading</span>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          ) : null}
        </div>
      </Modal>

      <Modal
        show={SplitModal}
        align={'center'}
        className=" bg-white w-[90%] lg:w-2/4 center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto	"
        onClose={() => setSplitModal(false)}
      >
        <div
          className="border-b border-gray-300 p-4 mb-4 flex items-center"
          onClick={() => setSplitModal(false)}
        >
          <img
            src="assets/icons/footer/chevon-down-black.svg"
            alt="arrow"
            className={`self-center justify-self-end mr-5 rotate-90`}
          />
          <h1 className="text-lg font-semibold">Your Split Payment</h1>
        </div>
        <div className="pb-5 lg:pb-10 px-4">
          <div className="flex items-center justify-between p-5 pt-1">
            <p className="font-bold text-lg">Grand Total</p>
            <p className="font-bold text-lg">{`₹ ${bookingData?.booking?.total}`}</p>
          </div>
          {splitPaymentDesign()}
          <div className="flex items-start pt-2">
            <button
              onClick={splitPaymentRedirect}
              className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-elipses">Loading</span>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
