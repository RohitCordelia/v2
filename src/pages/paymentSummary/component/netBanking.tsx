import React, { useState, useEffect } from 'react'
import {
  BANK_QUICK_PAYMENTS,
  CARD,
  EMI,
  NET_BANKING,
  UPI,
  WALLET,
  WALLET_QUICK_PAYMENTS
} from '../../../../src/constants/billingConstants';
import Select from '../../../../src/components/UI/Forms/Inputs/select';
import { useForm } from 'react-hook-form';
import { useInitiatePaymentMutation } from '../../../../src/services/payments/payment';

import {
  FullName,
  Cvv,
  CardNumber,
  AnyValidString,
  SelectAnyValue,
  UPIValidation,
} from '../../../../src/utils/validations/formValidations';
import Button from '../../../components/UI/Button';

function NetBanking({ store, paymentData, billingAddress, promo_code, upgradeCabin_data, selectedRoom }: any) {
  const [loading, setLoading] = useState(false);
  const [BankList, setBankList] = useState<any[]>([]);
  const [BankQuickList, setBankQuickList] = useState<any[]>([]);


  const [initiatePayment] = useInitiatePaymentMutation();

  if (promo_code && typeof promo_code === 'object') {
    localStorage.setItem('upgradeCabin', JSON.stringify(promo_code));
  } else {
    console.warn("Invalid promo_code, storing as an empty object.");
    localStorage.setItem('promo_code', JSON.stringify({}));
  }

  useEffect(() => {
    if (paymentData) {
      if (paymentData.pg_data?.banks?.bank_list.length) {
        setBankList(paymentData.pg_data.banks.bank_list);
        setBankQuickList(
          paymentData.pg_data.banks?.bank_list?.filter((bank: any) =>
            BANK_QUICK_PAYMENTS.includes(bank.bank_name)
          )
        );
      }
    }
  }, [paymentData]);

  const {
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {}
  });

  const {
    register: registerBank,
    handleSubmit: handleBankSubmit,
    setValue: setBankValue,
    formState: { errors: errorsBank }
  } = useForm({
    defaultValues: {
      bank: ''
    }
  });

  const onSubmitBank = () => {
    handleBankSubmit(onPayViaNetbanking)()
  };
  let bookingId:any
  let paymentId:any
  if(store?.bookings?.book){
    bookingId = store.bookings.book.id
  }else{
    bookingId = store.booking.id
  }
  if(paymentData?.pg_data?.payment_id){
    paymentId = paymentData?.pg_data.payment_id
  }else{
    paymentData?.payment_id
  }
  const onPayViaNetbanking = (data: any) => {
    // const _payload = {
    //   // payment_id: paymentData?.payment_id,
    //   // booking_id: store.booking.id,
    //   payment_id: paymentId,
    //   booking_id: bookingId,
    //   billing_address: billingAddress,
    //   payment_mode: 'Netbanking',
    //   bank: data.bank,
    //   promo_code: promo_code,
    //   room_no:selectedRoom.number
    // };

    const _payload = {
      payment_id: paymentId,
      booking_id: bookingId,
      billing_address: billingAddress,
      payment_mode: 'Netbanking',
      bank: data.bank,
      promo_code: promo_code,
      ...(selectedRoom?.number && { room_no: selectedRoom.number }),
    };
    
    
    setLoading(true);
    initiatePayment(_payload)
      .unwrap()
      .then((res: any) => {
        if (res.pg_data.extra_info.data.redirectUrl) {
          window.location = res.pg_data.extra_info.data.redirectUrl;
        }
        setLoading(false);
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setLoading(false);
      });
  };
  return (
    <div className='relative w-full pb-2 lg:pb-0'>
      <div className="hidden md:block">
        <p className="text-base font-bold">Select Your Bank </p>
      </div>
      <div className="mt-4 flex flex-wrap mb-6">
        {BankQuickList?.map((bank: any, index: number) => {
          return (
            <div
              className="mr-2 cursor-pointer flex items-center border border-gray-300 rounded px-2 py-2"
              key={index}
              onClick={() => setBankValue('bank', bank.code)}
            >
              <img
                src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/${bank.bank_name}.svg`}
                alt={bank.bank_name}
                className="self-center mx-auto max-h-5 mr-1"
              />
              <p className="text-xs">{bank.bank_name}</p>
            </div>
          );
        })}
      </div>
      <Select
        name="bank"
        options={BankList.map((bank: any) => {
          return { code: bank.code, name: bank.bank_name };
        })}
        register={registerBank}
        validation={SelectAnyValue}
        selectClassName="border bg-white border-[#d9d9d9] rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
        placeholder="Select Bank"
        error={errorsBank && errorsBank?.bank}
        errorText={errorsBank && errorsBank.bank?.message}
      />
      {/* <button
        onClick={handleSubmit(onSubmitBank)}
        className="bg-brand-primary rounded w-full text-white text-sm lg:text-base py-3 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <span className="loading-elipses">Loading</span>
        ) : (
          'Proceed to Payment'
        )}
      </button> */}
      <Button text='Proceed to Payment' isLoading={loading} disabled={loading} handleClick={handleSubmit(onSubmitBank)} className='w-full mt-3' />
      <div className='flex justify-center mt-4'>
        <img className='w-2/4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-secure-payment.svg" alt="" />
      </div>
      <div className='flex justify-center items-center mt-3 mb-3'>
        <p className='text-sm text-gray-100'>Our payment partners are</p>
        <img className='w-16' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pci-dss.webp" alt="" />
      </div>
    </div>
  )
}

export default NetBanking