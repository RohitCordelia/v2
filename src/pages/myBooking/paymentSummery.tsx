import React, { ReactNode, useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import Accordian from '../../components/UI/Accordion/accordion_basic';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetStore, SaveStore } from '../../../src/utils/store/store';
import { FormatToString, FormatPrice, FormatAmount } from '../../../src/utils/formatter/formatter';
import { useGetItineraryQuery } from '../../../src/services/itinerary/itinerary';
import { Input } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { Email } from '../../../src/utils/validations/formValidations';
import { useGetAddressFromPincodeQuery, useVerifyPanMutation, useVerifyGSTMutation, useApplyCouponMutation, useRemoveCouponMutation, useInitPaymentNewMutation } from '../../../src/services/payments/payment';
import { useBookingPaymentNewMutation, useReschedulePricingMutation, useRescheduleConfirmMutation } from '../../../src/services/profile/profile';
import toast, { Toaster } from 'react-hot-toast';
import { useGetBookingByIdQuery, useGetBookingDetailMutation } from '../../../src/services/itinerary/itinerary';
import Select from "react-select";
import phoneCodes from "../../components/UI/Forms/Inputs/phoneCodes.json";

type Props = {};
import { GetManageDetail, SaveManageDetail } from '../../utils/store/store';
import Button from '../../components/UI/Button';

export default function PaymentSummary({ }: Props) {
  const store = GetStore();
  const [gst1, setGst] = useState<any>(false);
  const [nri, setNri] = useState<any>(false);
  const [consent, setConsent] = useState<any>(false);
  const [pincode, setPincode] = useState<string>('');
  const [isPanVerified, setIsPanVerified] = useState<any>(null);
  const [panVerifiedFailMsg, setPanVerifiedFailMsg] = useState<any>('');
  const [isPanLoading, setIsPanLoading] = useState<any>(false);
  const [isGstVerified, setIsGstVerified] = useState<any>(false);
  const [PaymentType, setPaymentType] = useState<any>('');
  const [checkSplitPayment, setCheckSplitPayment] = useState<any>(false);
  const [Loading, setLoading] = useState<any>(false);
  const [couponCode, setCouponCode] = useState<any>('');
  // const [data, setdata] = useState<any>();
  const [isAbove7L, setIsAbove7L] = useState<any>(false);
  const [tcsObject, setTcsObject] = useState<any>();
  const [reserveTcsObject, setReserveTcsObject] = useState<any>();
  const [travelExpense, setTravelExpense] = useState<any>(false);
  const [taxType, setTaxType] = useState<any>('tcs');
  const [reserveBooking, setReserveBooking] = useState<any>(false);
  const [gstData, setGstData] = useState<any>([]);
  const [panName, setPanName] = useState<any>('');
  const [reschedulePriceDetails, setReschedulePriceDetails] = useState({});
  const [newBookingData, setNewBookingData] = useState({});
  const [newBookingId, setNewBookingId] = useState("");
  const [countryCode, setCountryCode] = useState('+91');

  const [bookingPaymentNew] = useBookingPaymentNewMutation();
  const [completePayment] = useInitPaymentNewMutation()
  const [verifyPan] = useVerifyPanMutation();
  const [getBookingDetail] = useGetBookingDetailMutation();
  const [reschedulePricing] = useReschedulePricingMutation();
  const [rescheduleConfirm] = useRescheduleConfirmMutation();

  let location = useLocation()

  const BOOKING_ID = new window.URLSearchParams(window.location.search).get('booking_id');

  const { resp, res, type, upgradeCabin_data, selectedRoom, extraGuestData, rescheduleData, upgradeShore_data, guestRecord, selectedCabinName, curreentIndex, guestData } = location.state || {}
  // const { booking, itinerary } = res || {};

  // const { booking, itinerary } = res;
  useEffect(()=>{
    setNri(guestData?.guests[0]?.is_nri)
  },[])

  const extraGuests_data = extraGuestData;

  // const { data } = res;
  const ManageDetail = GetManageDetail();
  let bookingRoute: any = ManageDetail.myBooking;
  let getBooking: any = ManageDetail.getBooking;
  let rescheduleBooking: any = ManageDetail.rescheduleBooking;
  let newBookingsData = store?.newBookings;

  // const { resp, res, type, upgradeCabin_data, selectedRoom, upgradeShore_data, guestRecord } = location.state || {}

  const uniqueCodes = [...new Set(guestRecord?.map(item => item.GADataShore.code))];


  const booking = res?.booking || null;
  const itinerary = res?.itinerary || null;

  // const ManageDetail = GetManageDetail();
  // let bookingRoute: any = ManageDetail.myBooking;
  // let getBooking: any = ManageDetail.getBooking;
  const getStore = GetStore();
  // const { data } = useGetBookingByIdQuery(bookingRoute[0]?.booking_id, { skip: !bookingRoute[0]?.booking_id });
  let dueBookingId = getBooking?.booking ? getBooking?.booking?.id : getBooking?.id;
  const { data } = type == "due" ? useGetBookingByIdQuery(dueBookingId, { skip: !dueBookingId }) : useGetBookingByIdQuery(bookingRoute[0]?.booking_id, { skip: !bookingRoute[0]?.booking_id });

  if (data) {
    const { itinerary, ...booking } = data;
    var bookings = {
      booking: booking,
      itinerary: itinerary,
      // payment: res
    }
  }
  const { data: addressData } = useGetAddressFromPincodeQuery(
    pincode,
    { skip: !!!pincode || pincode.length !== 6 }
  );

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      }, 0);
    }, [pathname]);

    return null;
  };
  ScrollToTop()


  // let manageBooking = JSON.parse(localStorage.getItem('manageBooking')) || {};

  // // Ensure `manageBooking` has the expected structure
  // manageBooking.getBooking = manageBooking.getBooking || {};
  // manageBooking.myBooking = manageBooking.myBooking || {};

  // // Set the `upgradeCabin_data` under the `upgradeCabin` key in `getBooking`
  // manageBooking.getBooking.upgradeCabin = upgradeCabin_data;

  // // Set the `extraGuests_data` under the `extraGuests` key in `getBooking`
  // manageBooking.getBooking.extraGuests = extraGuests_data;

  // // Update the `manageBooking` key in localStorage
  // localStorage.setItem('manageBooking', JSON.stringify(manageBooking));


  //   // Store `upgradeCabin_data` in a separate key
  // localStorage.setItem('upgradeCabin', JSON.stringify(upgradeCabin_data));

  // // Store `extraGuests_data` in a separate key
  // localStorage.setItem('extraGuests', JSON.stringify(extraGuests_data));


  // Safely store `upgradeCabin_data` in a separate key
  if (upgradeCabin_data && typeof upgradeCabin_data === 'object') {
    localStorage.setItem('upgradeCabin', JSON.stringify(upgradeCabin_data));
  } else {
    console.warn("Invalid upgradeCabin_data, storing as an empty object.");
    localStorage.setItem('upgradeCabin', JSON.stringify({}));
  }

  // Safely store `extraGuests_data` in a separate key
  if (extraGuests_data && typeof extraGuests_data === 'object') {
    localStorage.setItem('extraGuests', JSON.stringify(extraGuests_data));
  } else {
    console.warn("Invalid extraGuests_data, storing as an empty object.");
    localStorage.setItem('extraGuests', JSON.stringify({}));
  }

  let updatedUpgradeShoreData = { ...upgradeShore_data };
  updatedUpgradeShoreData.guestRecord = guestRecord || [];
  localStorage.setItem('upgradeShore_data', JSON.stringify(updatedUpgradeShoreData));

  const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#f5f5f5', height: '56px', width:'94px', marginBottom:'14px' }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted #ccc',
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


  useEffect(() => {
    if (type) {
      setPaymentType(type)
    } else {
      setPaymentType('extra_guests')
    }
  }, [type])

  useEffect(() => {
    if (data) {
      const { itinerary, ...booking } = data; // Destructure data to extract booking info

      // Setting the form values
      setValue('billing_address.name', booking.billing_address.name || '');
      setValue('billing_address.phone', booking.billing_address.phone || '');
      setValue('billing_address.country_code', booking.billing_address.country_code || '');
      setValue('billing_address.email', booking.billing_address.email || '');
      setValue('billing_address.pan', booking.billing_address.pan || '');
      setValue('billing_address.pincode', booking.billing_address.pincode || '');
      setValue('billing_address.address2', booking.billing_address.address || '');

      setPincode(booking.billing_address.pincode); // Set pincode directly for later use
      setIsPanVerified(booking.billing_address.pan ? true : false);
      setIsGstVerified(booking.billing_address.gstin ? true : false);

      if (booking.billing_address?.gstin) {
        setGst(true);  // If GST is present, update accordingly
        setValue('billing_address.gstin', booking.billing_address.gstin);
      }

      if (booking?.enable_tcs && booking?.status === 'ON_HOLD') {
        setIsAbove7L(booking.total > 700000);
      } else {
        setTravelExpense(booking?.billing_address?.expense_above_7l !== null ? !booking.billing_address.expense_above_7l : false);
      }

      if (booking?.payment_option_rule != null) {
        setReserveBooking(true);
      }

      if (booking?.discounts[0]?.coupon_code) {
        setCouponCode(booking.discounts[0].coupon_code);
      }
    }
  }, [data]);

  useEffect(() => {
    const reschedulePricingData = () => {
      reschedulePricing(rescheduleData)
        .unwrap()
        .then(res => {
          setReschedulePriceDetails(res);
        })
        .catch(error => {
          console.error(error);
        });
    }

    if (PaymentType === "reschedule") {
      reschedulePricingData();
    }
  }, [PaymentType])

  const { data: newData, isLoading: newDataLoading } = useGetBookingByIdQuery(newBookingId, {
    skip: !newBookingId
  })

  const { itinerary: newItinerary, ...newBooking } = newData || {};
  var newBookings = {
    booking: newBooking,
    itinerary: newItinerary,
  }

  if (newBookings.booking && newBookings.itinerary) {
    SaveStore({ ...store, newBookings });
  }

  useEffect(() => {
    if (newData) {
      const { itinerary, ...booking } = newData;
      var bookings = {
        booking: booking,
        itinerary: itinerary,
      }
      setNewBookingData(bookings);
    }
  }, [newData])

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
        gstin: '',
        gstName: '',
        pincode: '',
        address1: '',
        address2: '',
        pan: '',
        pan_name: "",
        international: '',
        expense_above_7l: false,
        tax_regime: "",
        tds_opted: false,
        country_code: '',
      },
    }
  });

  // const proceedToPay = (data: any) => {
  //   const _payload = {
  //     booking_id: bookingRoute[0].booking_id,
  //     billing_address: data?.billing_address,
  //     payment_for: PaymentType,
  //     medium: "website",
  //     payment: {
  //       booking_id: bookingRoute[0].booking_id,
  //       payment_for: "extra_guests",
  //       medium: "website"
  //     }
  //   };

  //   bookingPaymentNew(_payload)
  //     .unwrap()
  //     .then((resp: any) => {
  //       if (resp?.pg_data?.callback_url) {
  //         window.location.href = resp?.pg_data?.callback_url;
  //       } else {
  //         setLoading(false);
  //         navigate('/payment-method', {
  //           state: {
  //             paymentData: resp,
  //             billingAddress: data?.billing_address,
  //             bookingData: bookings,
  //             payment_for: PaymentType,
  //             promo_code: couponCode,
  //             tcs: (tcsObject?.amount || 0),
  //             currentPayble: (booking?.total - booking?.amount_paid + (reserveTcsObject?.amount || 0)),
  //             reserveBooking: reserveBooking,
  //             quotation: false
  //           }
  //         });
  //       }
  //     })
  //     .catch((res: any) => {
  //       setLoading(false);
  //     });
  // }


  const proceedToPay = (data: any) => {
    let _payload;

    if (PaymentType === "extra_guests") {
      // Payload for "extra_guests"
      _payload = {
        booking_id: bookingRoute[0].booking_id,
        billing_address: data?.billing_address,
        payment_for: "extra_guests",
        medium: "website",
        payment: {
          booking_id: bookingRoute[0].booking_id,
          payment_for: "extra_guests",
          medium: "website",
        },
      };
    } else if (PaymentType === "upgrade_cabin") {
      // Payload for "upgrade_cabin"
      _payload = {
        booking_id: bookingRoute[0].booking_id,
        bkroom_id: getBooking?.rooms[curreentIndex]?.id,
        room_no: selectedRoom?.number,
        billing_address: data?.billing_address,
        payment_for: "upgrade_cabin",
        medium: "website",
        payment: {
          booking_id: bookingRoute[0].booking_id,
        },
      };
    } else if (PaymentType === "shore_excusions") {

      _payload = {
        booking_id: bookingRoute[0].booking_id,
        billing_address: data?.billing_address,
        payment_for: "shore_excursions",
        medium: "website",
        payment: {
          booking_id: bookingRoute[0].booking_id,
        },
      };
    }
    else if (PaymentType === "due") {
      _payload = {
        // booking_id: bookingRoute[0].booking_id,
        booking_id: getBooking?.booking ? getBooking?.booking?.id : getBooking?.id,
        billing_address: data?.billing_address,
        payment_for: PaymentType,
        medium: "website",
        payment: {
          // booking_id: bookingRoute[0].booking_id,
          booking_id: getBooking?.booking?.id,
          medium: "website"
        }
      };
    } else {
      console.error("Invalid PaymentType:", PaymentType);
      return;
    }

    bookingPaymentNew(_payload)
      .unwrap()
      .then((resp: any) => {
        if (resp?.pg_data?.callback_url) {
          window.location.href = resp?.pg_data?.callback_url;
        } else {
          setLoading(false);
          navigate("/payment-method", {
            state: {
              paymentData: resp,
              billingAddress: data?.billing_address,
              bookingData: bookings,
              payment_for: PaymentType,
              promo_code: couponCode,
              tcs: tcsObject?.amount || 0,
              reserveBooking: reserveBooking,
              quotation: false,
              upgradeCabin_data: upgradeCabin_data,
              selectedRoom: selectedRoom,
              extraGuests_data: extraGuests_data,
              upgradeShore_data: upgradeShore_data,
              guestRecord: guestRecord ? guestRecord : null,
              selectedCabinName: selectedCabinName,
              currentPayble: PaymentType === "upgrade_cabin"
                ? upgradeCabin_data?.total_payable
                : PaymentType === "extra_guests"
                  ? extraGuests_data?.data?.total
                  : PaymentType === "shore_excusions"
                    ? upgradeShore_data?.due_amount
                    : booking?.total - booking?.amount_paid + (reserveTcsObject?.amount || 0),
            },
          });
        }
      })
      .catch((res: any) => {
        setLoading(false);
      });
  };


  const proceedToPayReschedule = async () => {
    setLoading(true);

    try {
      const rescheduleConfirmPayload = {
        ...rescheduleData,
        payment_option_id: reschedulePriceDetails.payment_option_id,
      };

      // Call `rescheduleConfirm` API
      const res = await rescheduleConfirm(rescheduleConfirmPayload).unwrap();

      if (!res?.booking_id) {
        throw new Error("Booking ID not found in response");
      }

      setNewBookingId(res.booking_id)

      let reschedulePricingData = {
        total_amount_paid: res.total_amount_paid,
        revised_itinerary_amount: res.revised_itinerary_amount,
        fare_difference: res.fare_difference,
        reschedule_fee: res.reschedule_fee,
        reschedule_gst: res.reschedule_gst,
        payable: res.payable,
        differential_amount: res.differential_amount,
        total: res.total,
      }

      SaveStore({ ...store, reschedulePricingData });

      if (!newBookingData) {
        console.error("Booking details are not available yet");
        return;
      }

      // Prepare payment payload
      const paymentPayload = {
        booking_id: res.booking_id,
        billing_address: data?.billing_address,
        // payment_for:
        //   bookingRoute[0].status === "CONFIRMED"
        //     ? "confirmed_reschedule"
        //     : "partial_reschedule",
        // medium: "website",
        // payment: {
        //   booking_id: res.booking_id,
        // },
      };

      // Call `completePayment` API
      const paymentResponse = await completePayment(paymentPayload).unwrap();
      if (paymentResponse?.pg_data?.callback_url) {
        window.location.href = paymentResponse.pg_data.callback_url;
      } else {
        navigate('/payment-method', {
          state: {
            paymentData: paymentResponse,
            billingAddress: data?.billing_address,
            bookingData: newBookingsData,
            payment_for: PaymentType,
            promo_code: couponCode,
            tcs: tcsObject?.amount || 0,
            currentPayble: booking?.total - booking?.amount_paid + (reserveTcsObject?.amount || 0),
            reserveBooking: reserveBooking,
            quotation: false,
            reschedulePricingData,
          },
        });
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setLoading(false);
    }
  };

  let runningTotal = 0;
  let shoreExGst = 0;
  if (booking?.shore_excursions) {
    if (booking?.shore_excursions.length > 0) {
      booking?.shore_excursions.map((item: any, index: number) => {
        runningTotal += item.amount;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(runningTotal)}`}
          </p>
        );
      });
      booking?.shore_excursions.map((item: any, index: number) => {
        shoreExGst += item.gst;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(shoreExGst)}`}
          </p>
        );
      });
    }
  }

  const [priceDetails, setPriceDetails] = useState<any>(null);
  useEffect(() => {
    const { res } = location.state || {};
    if (res?.data) {
      const {
        total,
        portCharges,
        fuelSurcharge,
        gratuity,
        gst,
        individual,
        discounts,
        taxes,
      } = res.data;


      // Structure the data to match your UI
      const extractedData = {
        total,
        portCharges,
        fuelSurcharge,
        gratuity,
        gst,
        individual,
        discounts,
        taxes,
      };

      // Set the data to state
      setPriceDetails(extractedData);
    }

    if (res?.booking) {
      const {
        current_payable,
        sub_total,
        gst,
        total,
        discounts,
        rooms,
        status,
        due_amount,
      } = res.booking;

      // Structure the data to match your UI
      const extractedData = {
        total,
        gst,
        discounts,
        sub_total,
        current_payable,
        status,
        due_amount,
      };

      // Set the data to state
      setPriceDetails(extractedData);
    }
  }, [location.state]);
  return (
    <Layout>
      <Toaster />
      <main className="container mx-auto lg:py-24 py-20 lg:pt-24 px-3">

        <div>
          <div className="flex items-center ">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
              alt="arrow"
              onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
            />
            <p className="text-lg font-bold lg:text-xl ">
              Payment Summary
            </p>
          </div>

          <div className='grid grid-cols-3 lg:gap-6'>
            <div className="col-span-3 lg:col-span-2 lg:mb-4 order-2 lg:order-1">
              <>
                <div className='mt-4'>
                  <Accordian
                    openByDefault={true}
                    title="Billing Details"
                    titleClass="text-base font-bold lg:text-xl"
                    mainClass=" shadow-allSide px-4 lg:px-6 pt-6 pb-3 rounded-lg border-gray-300 cursor-pointer"
                  >
                    <div className=" mt-6 border-gray-300">
                      <Input
                        type="text"
                        register={register}
                        name="billing_address.name"
                        inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                        placeholder="Full Name as per Pan Card"
                        disabled
                      />
                      <div className='grid lg:grid-cols-2 lg:gap-4 mt-6'>
                        <div className='flex items-center gap-2 lg:gap-4'>
                          {/* <Input
                            type="country_code"
                            register={register}
                            onChange={(e: any) => setValue('billing_address.country_code', e.target.value)}
                            name="billing_address.country_code"
                            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-[80px] md:mr-[60px]"
                            placeholder="Code"
                            disabled
                          /> */}
                          <Select
                            name='billing_address.country_code'
                            defaultValue={'+91'}
                            menuPortalTarget={document.body}
                            menuPosition={'fixed'}
                            value={{ label: data?.billing_address?.country_code || countryCode }}
                            maxMenuHeight={190}
                            options={phoneCodes}
                            onChange={(e: any) => {
                              setCountryCode( e.value)
                              setValue('billing_address.country_code', e.value )
                            }}
                            styles={customStyles}
                            isDisabled={true}
                          />
                          <Input
                            type="tel"
                            register={register}
                            onChange={(e: any) => setValue('billing_address.phone', e.target.value)}
                            name="billing_address.phone"
                            inputClassName="!w-full border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 md:w-[210px] w-[255px]"
                            placeholder="Phone"
                            className='w-full'
                            disabled
                          />
                        </div>

                        <Input
                          type="email"
                          register={register}
                          validation={Email}
                          onChange={(e: any) => setValue('billing_address.email', e.target.value)}
                          name="billing_address.email"
                          inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 md:w-[323px] w-full"
                          placeholder="Email"
                          disabled
                        />
                      </div>

                      <div className='flex w-full items-center relative '>
                        <Input
                          type="text"
                          register={register}
                          maxLength='10'
                          name="billing_address.pan"
                          inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full uppercase placeholder:capitalize"
                          className='w-full mb-0'
                          placeholder="Pan No"
                          disabled
                        />
                        {isPanVerified ? <div className='absolute right-2 top-4' ><img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/PAN-vaild.svg' /></div> : null}
                      </div>
                      {booking?.billing_address?.gstin && booking?.billing_address?.gstin != "" ?
                        <div className='grid lg:grid-cols-1 mt-4 lg:gap-4'>
                          <Input
                            type="text"
                            register={register}
                            maxLength='15'
                            name="billing_address.gstin"
                            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base py-3.5 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full uppercase placeholder:capitalize"
                            className='w-full mb-0'
                            placeholder="GSTIN"
                            disabled
                          />
                        </div>
                        : null
                      }
                      <div className='grid lg:grid-cols-2 mt-4 lg:gap-4'>
                        <Input
                          type="text"
                          register={register}
                          name="billing_address.address2"
                          inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                          placeholder="Address"
                          disabled
                        />
                        <Input
                          type="pincode"
                          register={register}
                          name="billing_address.pincode"
                          inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-4 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
                          placeholder="Postal Code"
                          maxLength='6'
                          inputMode="numeric"
                          autoComplete="postal-code"
                          disabled
                        />
                      </div>
                    </div>
                  </Accordian>
                </div>
              </>
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
                      Agree and consent to the Privacy Policy, Cancellation and Rescheduling Policy, Passenger Cruise Ticket Contract  and all other Terms and Conditions as appear hereinabove and on website https://www.cordeliacruises.com.
                    </p>
                    {data && data?.booking && data?.booking.enable_tcs ? (
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

              {/* <div className="my-4 lg:hidden">
                {
                  consent ? (
                    <button
                      onClick={type === "reschedule" ? handleSubmit(proceedToPayReschedule) : handleSubmit(proceedToPay)}
                      className="bg-brand-primary w-full text-white text-sm py-3.5 px-8 rounded font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                      disabled={Loading || !isPanVerified || (gst1 ? !isGstVerified : null)}
                    >
                      {Loading ? (
                        <span className="loading-elipses">Loading</span>
                      ) : (
                        'Proceed to Payment'
                      )}
                    </button>
                  ) : (
                    <button
                      className="bg-brand-primary w-full text-white text-sm py-3.5 px-8 rounded font-bold disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                      disabled={true}
                    >
                      Proceed to Payment
                    </button>
                  )
                }
              </div> */}
            </div>
            <div className="col-span-3 lg:col-span-1 mt-4 order-1 lg:order-2">
              <div className=' top-30 lg:pb-4'>
                <div className='border-gray-400 shadow-allSide rounded-lg mb-4 overflow-hidden'>
                  <div className='border-b border-gray-300 px-3 py-3'>
                    <p className='text-lg font-bold'>Price Details</p>
                  </div>
                  {type === 'reschedule' ? (
                    <div className="pt-3">
                      <div className="px-3">
                        <>
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">
                                Total Amount Paid
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(
                                  reschedulePriceDetails?.total_amount_paid || 0
                                )}`}
                              </p>
                            </div>
                          </div>
                          {/* New itinerary amount */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">
                                New Itinerary Amount
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(
                                  reschedulePriceDetails?.revised_itinerary_amount || 0
                                )}`}
                              </p>
                            </div>
                          </div>
                          {/* <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                Service Charge & Levies
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                ₹ {FormatAmount(reschedulePriceDetails?.total_fuel_surcharge)}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                Fuel Surcharge
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                ₹ {FormatAmount(reschedulePriceDetails?.total_service_charges)}
                              </p>
                            </div>
                          </div> */}
                          {/* Fare Diff */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">
                                Fare Difference
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(
                                  reschedulePriceDetails?.fare_difference || 0
                                )}`}
                              </p>
                            </div>
                          </div>
                        </>
                      </div>
                      <div className='p-3 bg-[#F6F9FF]'>
                        {/* Rescheduling Charges */}
                        <div className="grid grid-cols-3 mb-2">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">
                              Rescheduling Charges
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatAmount(
                                reschedulePriceDetails?.reschedule_fee || 0
                              )}`}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                              GST
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                              ₹ {FormatAmount(reschedulePriceDetails?.reschedule_gst)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-brand-secondary/[0.1]">
                        <div className="flex justify-between py-1">
                          <div className="col-span-2">
                            <p className="text-md lg:text-lg font-bold">
                              Amount Payable
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                              reschedulePriceDetails?.payable
                            )}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : type === "upgrade_cabin" ? (
                    <div className="pt-3">
                      <div className="px-3">
                        <>
                          {/* Cabin Upgrade Charges */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Cabin Upgrade Charges</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(upgradeCabin_data?.cabin_fare_diff || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* GST */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`}
                              </p>
                            </div>
                          </div>
                          <div className='flex justify-between py-1'>
                            <div className="col-span-2">
                              <p className="text-md lg:text-lg font-bold">Amount Payable</p>
                            </div>
                            <div className="text-right">
                              <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                                upgradeCabin_data?.total_payable
                              )}`}</p>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  ) : type === "extra_guests" ? (
                    <>
                      {/* Cabin 1 Fare */}
                      <div className="pt-3">
                        <div className="px-3">

                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Cabin Fare</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.fare || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* Service Charge & Levies */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Service Charge & Levies</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.gratuity + extraGuests_data?.data?.individual?.[0]?.portCharges || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* Fuel Surcharge */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Fuel Surcharge</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.fuelSurcharge || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* Discount */}
                          {extraGuests_data?.data?.individual?.[0]?.discount > 0 && (
                            <div className="grid grid-cols-3 mb-2">
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">Discount</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.discount || 0)}`}
                                </p>
                              </div>
                            </div>
                          )}
                          {/* Sub-total */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.individual?.[0]?.total || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* Taxes */}
                          {/* {extraGuests_data?.data?.individual?.[0]?.taxes && extraGuests_data?.data?.individual?.[0]?.taxes.length > 0 && ( */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* )} */}
                          {/* GST */}
                          <div className="grid grid-cols-3 mb-2">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`}
                              </p>
                            </div>
                          </div>
                          {/* Amount Payable */}
                        </div>
                      </div>
                      <div className="flex justify-between px-4 py-2 bg-brand-secondary/[0.1]">
                        <div className="col-span-2">
                          <p className="text-md lg:text-lg font-bold">Amount Payable</p>
                        </div>
                        <div className="text-right">
                          <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(extraGuests_data?.data?.total || 0)}`}</p>
                        </div>
                      </div>
                    </>
                  ) : type == "shore_excusions" ? (
                    <>
                      <div className="pt-3">
                        <div className="px-3">
                          {uniqueCodes?.map((code, i) => {
                            const adultCount = guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;
                            const childrenCount = guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                            const adultPrice = guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                            const childrenPrice = guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                            const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                            return (
                              <div key={i} className='flex items-center justify-between'>
                                <p className="text-sm font-semibold">

                                  {code} : <span className='text-gray-100 text-sm'>{adultCount == 0 ? null : `Adult x ${adultCount}`},{childrenCount == 0 ? null : `Children x ${childrenCount}`}  </span>
                                </p>
                                <p className="text-sm font-semibold">{`₹ ${FormatAmount(totalPrice)}`}</p>

                              </div>
                            );
                          })}

                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                                upgradeShore_data?.shore_excursion_net_total
                              ).toFixed())}`}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                GST
                              </p>
                              {booking?.shore_excursions && booking?.shore_excursions.length > 0 ? <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                                Shore Excursions
                              </p> : null}
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">₹{FormatAmount(upgradeShore_data?.shore_excursion_gst)}</p>
                              <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(upgradeShore_data?.shore_excursion_gst)}</p>


                              {booking?.shore_excursions && booking?.shore_excursions.length > 0 ? <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹{FormatAmount(shoreExGst)}</p>
                                : null}
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="flex justify-between px-4 py-2 bg-brand-secondary/[0.1]">
                        <div className="col-span-2">
                          <p className="text-md lg:text-lg font-bold">Amount Payable</p>
                        </div>
                        <div className="text-right">
                          <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(upgradeShore_data?.due_amount || 0)}`}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="pt-3">
                      <div className="px-3">
                        {data?.rooms?.map((room: any, index: number) => {
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
                                {room.discount ? (
                                  <p className="text-sm lg:text-sm font-semibold mt-1">
                                    Discount
                                  </p>
                                ) : null}
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`₹ ${FormatPrice(
                                    priceDetails?.individual ? priceDetails?.individual[0]?.fare : room?.cabin_fare
                                  )}`}
                                </p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">
                                  {`₹ ${FormatPrice(
                                    priceDetails?.gratuity +
                                    priceDetails?.portCharges || room?.service_charges
                                  )}`}
                                </p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">
                                  {`₹ ${FormatPrice(
                                    priceDetails?.fuelSurcharge || room?.fuel_surcharge
                                  )}`}
                                </p>
                                {priceDetails?.discounts.length > 0 ? (
                                  <p className="text-sm lg:text-sm font-semibold mt-1">{`- ₹ ${FormatPrice(
                                    priceDetails?.discounts[0].amount || room?.discount
                                  )}`}</p>
                                ) : null}
                              </div>
                              {/* <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`₹ ${FormatPrice(
                                    priceDetails?.individual[0]?.fare
                                  )}`}
                                </p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">
                                  {`₹ ${FormatPrice(
                                    priceDetails?.gratuity +
                                    priceDetails?.portCharges
                                  )}`}
                                </p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">
                                  {`₹ ${FormatPrice(
                                    priceDetails?.fuelSurcharge
                                  )}`}
                                </p>
                                {priceDetails?.discounts ? (
                                  <p className="text-sm lg:text-sm font-semibold mt-1">{`- ₹ ${FormatPrice(
                                    priceDetails?.discounts
                                  )}`}</p>
                                ) : null}
                              </div> */}
                            </div>
                          );
                        })}
                        {data?.shore_excursion ? (
                          data?.shore_excursion.length > 0 ? (
                            <div className="grid grid-cols-3 mb-1">
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`Shore Excursions Total`}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {runningTotal}
                                </p>
                              </div>
                            </div>
                          ) : null
                        ) : null}
                        {data?.shore_excursion ? (
                          data?.shore_excursion.length > 0 ? (
                            <div className="grid grid-cols-3 mb-2">
                              <div className="col-span-2">
                                {data?.shore_excursion.map((item: any) => (
                                  <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                    {item?.code}
                                  </p>
                                ))}
                              </div>
                              <div className="text-right">
                                {data?.shore_excursion.map((item: any) => (
                                  <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">{`₹ ${FormatPrice(
                                    item.amount
                                  )}`}</p>
                                ))}
                              </div>
                            </div>
                          ) : null
                        ) : null}

                        {data?.protection_plan &&
                          data?.protection_plan.amount > 0 ? (
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">
                                Protection Plan:
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">
                                ₹ {FormatPrice(data?.protection_plan.amount)}
                              </p>
                            </div>
                          </div>
                        ) : null}

                        {(data?.discounts && data?.discounts[0]?.amount) ||
                          data?.cabin_fare_discount > 0 ? (
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">
                                Total Cabin Fare Discount:
                              </p>
                              {data?.discount_text && (
                                <p className="text-xxs lg:text-sm font-semibold text-gray-100">
                                  {data?.discount_text}
                                </p>
                              )}
                              {data?.discounts && data?.discounts[0] && (
                                <p className="text-xxs lg:text-sm font-semibold text-gray-100">
                                  {data?.discounts[0]?.coupon_code}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold text-brand-green">
                                - ₹
                                {FormatAmount(
                                  (+data.cabin_fare_discount || 0) +
                                  (+data?.discounts[0]?.amount || 0)
                                )}
                              </p>
                              {data.cabin_fare_discount > 0 && (
                                <p className="text-xxs lg:text-sm font-semibold text-gray-100">
                                  - ₹{FormatAmount(data.cabin_fare_discount)}
                                </p>
                              )}
                              {data?.discounts && data?.discounts[0] && (
                                <p className="text-xxs lg:text-sm font-semibold text-gray-100">
                                  - ₹{FormatAmount(data?.discounts[0]?.amount)}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : null}
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">
                              Sub-total
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              {`₹ ${FormatToString(parseInt(data?.sub_total).toFixed())}`}
                              {/* {`₹ ${FormatToString(
                                parseInt(
                                  priceDetails?.individual ? priceDetails?.individual[0]?.total : priceDetails?.sub_total
                                ).toFixed()
                              )}`} */}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">
                              Taxes:
                            </p>
                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                              GST
                            </p>
                            {data?.shore_excursion &&
                              data?.shore_excursion.length > 0 ? (
                              <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                                Shore Excursions
                              </p>
                            ) : null}
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">
                              ₹{FormatAmount(priceDetails?.gst)}
                            </p>
                            <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                              ₹ {FormatAmount(priceDetails?.gst)}
                            </p>
                            {data?.shore_excursion &&
                              data?.shore_excursion.length > 0 ? (
                              <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                ₹ {FormatAmount(shoreExGst)}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-brand-secondary/[0.1] mt-2">
                        <div className="flex justify-between py-1">
                          <div className="col-span-2">
                            <p className="text-md lg:text-lg font-bold">
                              Grand Total
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-md lg:text-lg font-bold text-brand-primary">
                              {`₹ ${FormatAmount(priceDetails?.total)}`}
                            </p>
                          </div>
                        </div>
                        {data?.amount_paid ?
                          <div className='flex justify-between py-1'>
                            <div className="col-span-2">
                              <p className="text-md lg:text-lg font-bold">Amount Paid</p>
                            </div>
                            <div className="text-right">
                              <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                                data?.amount_paid
                              )}`}</p>
                            </div>
                          </div>
                          : null
                        }
                        {data?.due_amount ?
                          <div className="flex justify-between py-1">
                            <div className="col-span-2">
                              <p className="text-md lg:text-lg font-bold">
                                Amount Payable
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                                data?.due_amount
                              )}`}</p>
                            </div>
                          </div>
                          : null
                        }
                      </div>
                    </div>
                  )}
                </div>

                <div className={`lg:my-4 md:relative md:my-0 md:px-0 md:bottom-auto md:w-auto fixed bottom-0 left-0 w-full bg-white ${innerWidth > 600 ? 'z-10' : 'z-30'}`}>
                  {/* {consent ? (
                    <Button text='Proceed to Payment' disabled={Loading || (!isPanVerified && !nri && (gst1 ? !isGstVerified : false))} isLoading={Loading} handleClick={type === "reschedule" ? handleSubmit(proceedToPayReschedule) : handleSubmit(proceedToPay)} className={`w-full ${innerWidth < 600 ? 'rounded-none' : ''}`} />
                  ) : (
                    <Button text='Proceed to Payment' disabled={true} className={`w-full ${innerWidth < 600 ? 'rounded-none' : ''}`} />
                  )} */}
                  <Button text='Proceed to Payment' disabled={!consent || (Loading || (!isPanVerified && !nri && (gst1 ? !isGstVerified : false)))} isLoading={Loading} handleClick={type === "reschedule" ? handleSubmit(proceedToPayReschedule) : handleSubmit(proceedToPay)} className='w-full rounded-none lg:rounded-md' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout >
  );
}