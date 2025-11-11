import React, { useState } from 'react'
import { Input } from '../../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import {
  FullName,
  Cvv,
  CardNumber,
  AnyValidString,
} from '../../../../src/utils/validations/formValidations';
import { FormatCardNumber, UnFormatCardNumber } from '../../../../src/utils/formatter/formatter';
import { useInitiatePaymentMutation } from '../../../../src/services/payments/payment';
import Modal from '../../../components/UI/Modal';
import Button from '../../../components/UI/Button';

function Card({ store, paymentData, billingAddress, promo_code, selectedRoom }: any) {
  const [cardError, setCardError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardModal, setCardModal] = useState(false);

  const [initiatePayment] = useInitiatePaymentMutation();

  const {
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {}
  });

  const {
    register: registerCard,
    handleSubmit: handleCardSubmit,
    setValue: setCardValue,
    formState: { errors: errorsCard }
  } = useForm({
    defaultValues: {
      cardnumber: '',
      ccname: '',
      cvc: '',
      expiry: ''
    }
  });

  const onSubmitCard = () => {
    handleCardSubmit(onPayViaCard)()
  };
  let bookingId:any
  let paymentId:any
  
  if(store?.bookings){
    bookingId = store?.bookings?.id
  }else{
    bookingId = store?.booking?.id
  }
  if(paymentData?.pg_data?.payment_id){
    paymentId = paymentData?.pg_data.payment_id
  }else{
    paymentData?.payment_id
  }
  const onPayViaCard = (data: any) => {
    let date = data.expiry.split('-');
    const _payload = {
      payment_id: paymentId,
      booking_id: bookingId,
      billing_address: billingAddress,
      payment_mode: 'Debit Card',
      card_no: UnFormatCardNumber(data.cardnumber),
      cvv: data.cvc,
      expiry: `${date[1]}/${date[0]}`,
      promo_code: promo_code,
      ...(selectedRoom?.number && { room_no: selectedRoom.number })
    };
    setLoading(true);
    initiatePayment(_payload)
      // .unwrap()
      .then((res: any) => {
        if (res?.data?.pg_data?.extra_info?.data?.redirectUrl) {
          window.location = res?.data?.pg_data?.extra_info?.data?.redirectUrl;
          setCardError(null)
        }else{
          setCardError(res?.error?.data?.message?.nimbbl_consumer_message)
        }
        setLoading(false);
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setCardError(res)
        setLoading(false);
      });
  };

  return (
    <div className='relative w-full pb-2 lg:pb-0'>
      <div className="hidden md:block">
        <p className="text-base font-bold">Enter Your Card Details </p>
      </div>
      <div className="mt-4 flex">
        <img
          className="h-8 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mastercard-logo.svg"
          alt=""
        />
        <img
          className="h-8 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/amex-logo.svg"
          alt=""
        />
        <img
          className="h-8 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dinnersclub-logo.svg"
          alt=""
        />
        <img
          className="h-8 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/visa-logo.svg"
          alt=""
        />
        <img
          className="h-8 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/rupay-logo.svg"
          alt=""
        />
      </div>
      <div>
        <div className='mt-4'>
          <p className='font-medium text-xxs'>Please ensure your card is enabled for online transactions.<span className='text-brand-primary font-semibold cursor-pointer' onClick={() => setCardModal(true)}> Know More</span></p>
        </div>
        {cardError &&
          <div className='mt-4'>
            <span className='text-xs font-semibold text-danger leading-3'>{cardError}</span>
          </div>
        }
        <div className="mt-4 grid gap-0">
          <Input
            type="text"
            register={registerCard}
            validation={CardNumber}
            name="cardnumber"
            inputClassName="border bg-white border-[#d9d9d9] rounded-md text-sm !py-3 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-0"
            placeholder="Card Number"
            maxLength="19"
            onChange={(event: any) => {
              setCardValue(
                'cardnumber',
                FormatCardNumber(event.target.value)
              )
            }}
            inputMode="numeric"
            autoComplete="cc-number"
            error={errorsCard && errorsCard?.cardnumber}
            errorText={errorsCard && errorsCard.cardnumber?.message}
          />
          <Input
            type="text"
            register={registerCard}
            validation={FullName}
            name="ccname"
            inputClassName="border bg-white border-[#d9d9d9] rounded-md text-sm !py-3 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-0"
            placeholder="Card Name"
            error={errorsCard && errorsCard?.ccname}
            errorText={errorsCard && errorsCard.ccname?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="month"
              register={registerCard}
              validation={AnyValidString}
              name="expiry"
              inputClassName="border bg-white border-[#d9d9d9] rounded-md text-sm !py-3 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-0"
              placeholder="Expiry"
              autoComplete="cc-exp"
              error={errorsCard && errorsCard?.expiry}
              errorText={errorsCard && errorsCard.expiry?.message}
            />
            <Input
              type="text"
              register={registerCard}
              validation={Cvv}
              name="cvc"
              inputClassName="border bg-white border-[#d9d9d9] rounded-md text-sm !py-3 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-0"
              placeholder="CVV"
              maxLength="3"
              inputMode="numeric"
              autoComplete="cc-csc"
              error={errorsCard && errorsCard?.cvc}
              errorText={errorsCard && errorsCard.cvc?.message}
            />
          </div>
        </div>

        {/* <button
          onClick={handleSubmit(onSubmitCard)}
          className="bg-brand-primary rounded w-full text-white text-sm lg:text-base py-3 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="loading-elipses">Loading</span>
          ) : (
            'Proceed to Payment'
          )}
        </button> */}
        <Button text='Proceed to Payment' isLoading={loading} disabled={loading} handleClick={handleSubmit(onSubmitCard)} className='w-full mt-3' />
        <div className='flex justify-center mt-4'>
          <img className='w-2/4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-secure-payment.svg" alt="" />
        </div>
        <div className='flex justify-center items-center mt-3 mb-3'>
          <p className='text-sm text-gray-100'>Our payment partners are</p>
          <img className='w-16' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pci-dss.webp" alt="" />
        </div>
      </div>

      <Modal show={cardModal} align={'center'} className=" bg-white w-full h-[90%] lg:w-2/4 center bottom-0 lg:h-2/3 lg:bottom-1/4 lg:left-1/4 rounded-t-lg lg:rounded border overflow-hidden	" onClose={() => setCardModal(false)}>
        <div className='border-b border-gray-300 p-4 mb-4 flex items-center cursor-pointer' onClick={() => setCardModal(false)}>
          <img
            src="assets/icons/footer/chevon-down-black.svg"
            alt="arrow"
            className={`self-center justify-self-end mr-2 rotate-90`}
          />
          <h1 className='text-lg font-semibold'>Back</h1>
        </div>
        <div className='overflow-scroll px-4 h-[90%] pb-5 lg:pb-10'>
          <p className='text-sm leading-6 font-semibold'>As per latest RBI guidelines, your banks may disable your credit/debit cards for online transactions by default if – (a) your card is newly issued/renewed/re-issued, or (b) your card has not been used for online transactions. Don’t worry! You can follow the steps listed below to enable your cards and enjoy quick and convenient payments with Cordelia Cruises. </p>

          <p className='text-base font-bold mt-3'>SBI Bank – Credit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to SBI Card app/website; (b) Navigate to “Cards Usage” section; (c) Click on “Manage card transactions”; (d) Enable your card (e) Enter OTP to confirm changes </p>

          <p className='text-base font-bold mt-3'>SBI Bank – Debit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to SBI YONO app/internet banking portal; (b) Navigate to “Service Requests” section; (c) Click on “ATM/Debit cards> Usage”; (d) Enable your card; (e) Enter OTP to confirm changes </p>

          <p className='text-base font-bold mt-3'>ICICI Bank – Credit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Log in to the ICICI mobile app/internet banking; (b) Navigate to ‘Cards’ section (c) Click on ‘Manage Card' (d) Enable your card. Note: Internet banking users may have to verify the request with an OTP. </p>

          <p className='text-base font-bold mt-3'>ICICI Bank – Debit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to the ICICI mobile app/internet banking; (b) Navigate to “Card Services”; (c) Select “Modify Debit Card Limit” option; (d) Select "Domestic card limit" option; (e) Set the limit and enable your card </p>

          <p className='text-base font-bold mt-3'>HDFC Bank – Credit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to HDFC internet banking; (b) Under “Cards” option select “Request > Set Card Usage”; (c) Enable your card. Note: Internet banking users may have to verify the request with an OTP. </p>

          <p className='text-base font-bold mt-3'>HDFC Bank – Debit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to HDFC internet banking; (b) Navigate to Debit Cards section and select “Request > Set Card usage”; (d) Under “Daily Domestic usage > Online Usage, select “ON” button to enable the card. Note: Internet banking users may have to verify the request with an OTP. </p>

          <p className='text-base font-bold mt-3'>AXIS Bank – Credit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to your Axis mobile app/internet banking; (b) Under ‘Services’, click on “Manage credit card usage > Domestic Usage”; (d) Enable your card and submit </p>

          <p className='text-base font-bold mt-3'>AXIS Bank – Debit Card </p>
          <p className='text-sm leading-6 font-semibold'>(a) Login to your Axis mobile app; (b) Under ‘Services’ option, select “Manage usage”; (d) Select the debit card and click “Continue”; (e) Enable your card. Note: Internet banking users may have to verify the request with an OTP. </p>

          <p className='text-base font-bold mt-3'>Other Banks </p>
          <p className='text-sm leading-6 font-semibold'>Please login to your bank’s mobile app/internet banking portal and follow appropriate steps. </p>

          <p className='text-sm leading-6 font-semibold italic mt-3'>Disclaimer: The steps mentioned below are for your general guidance and may be subject to the discretion/policy of your bank/card issuer. Cordelia is not responsible for the factual accuracy or change in the process or any processes specific to your bank/card issuer. We request you to reach out to your bank for the latest process.</p>
        </div>
      </Modal>
    </div>
  )
}

export default Card