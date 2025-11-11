import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../../../../src/components/UI/Forms/Inputs';
import { useCompletePaymentMutation, useInitiatePaymentMutation, useVerifyUPIMutation } from '../../../../src/services/payments/payment';
import {
  FullName,
  Cvv,
  CardNumber,
  AnyValidString,
  SelectAnyValue,
  UPIValidation,
} from '../../../../src/utils/validations/formValidations';
import Button from '../../../components/UI/Button';

function Upi({ store, paymentData, billingAddress, promo_code, selectedRoom }: any) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedLoading, setIsVerifiedLoading] = useState(false);
  const [verifyUpiRes, setVerifyUpiRes] = useState<any>([]);
  const [initiatePayment] = useInitiatePaymentMutation();
  const [VerifyUPI] = useVerifyUPIMutation();
  const [completePayment] = useCompletePaymentMutation();

  const {
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {}
  });

  const {
    register: registerUPI,
    handleSubmit: handleSubmitUPI,
    setValue: setValueUPI,
    getValues: getValueUpi,
    formState: { errors: errorsUPI }
  } = useForm({
    defaultValues: {
      upi: ''
    }
  });

  const onSubmitUPI = () => {
    handleSubmitUPI(onPayViaUPI)()
  };

  const onPayViaUPI = (data: any) => {
    const _payload = {
      flow: 'collect',
      booking_id: store.booking.id,
      payment_id: paymentData.payment_id,
      payment_mode: 'UPI',
      billing_address: billingAddress,
      upi_id: data.upi,
      promo_code: promo_code,
      ...(selectedRoom?.number && { room_no: selectedRoom.number })
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
        // navigate('/payment-success')
        setLoading(false);
      });
  };

  const verifyUpiSubmit = () => {
    setIsVerifiedLoading(true)
    // getValueUpi()
    const payload = {
      upi_id: getValueUpi('upi'),
      payment_id: paymentData.payment_id
    }

    VerifyUPI(payload)
      .unwrap()
      .then((res: any) => {
        if (res.status != 'failure') {
          setIsVerified(true)
        } else {
          setIsVerified(false)
        }
        setVerifyUpiRes(res)
        setIsVerifiedLoading(false)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
        setIsVerifiedLoading(false)
      })
  };

  return (
    <div className='relative w-full pb-2 lg:pb-0'>
      <div className="hidden md:block">
        <p className="text-base font-bold">Pay Using UPI </p>
      </div>
      <div className="mt-4 flex">
        <img
          className="h-9 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/gpay-upi-logo.svg"
          alt=""
        />
        <img
          className="h-9 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Bhim-upi-logo.svg"
          alt=""
        />
        <img
          className="h-9 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phonepe-upi-logo.svg"
          alt=""
        />
        <img
          className="h-9 mr-2"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/paytm-upi-logo.svg"
          alt=""
        />
      </div>
      <div className='w-full'>
        <div className='flex w-full items-center relative mt-6'>
          <div className='flex items-center w-full border bg-white border-[#d9d9d9] rounded-md'>
          <Input
            type="text"
            register={registerUPI}
            validation={UPIValidation}
            onChange={() => {
              setIsVerified(false)
              setVerifyUpiRes([])
            }}
            name="upi"
            inputClassName="border-none text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full"
            placeholder="Enter your UPI ID"
            className="mb-0 w-full"
            error={errorsUPI && errorsUPI?.upi}
            errorText={errorsUPI && errorsUPI.upi?.message}
          />
          {/* <button disabled={isVerifiedLoading} onClick={() => verifyUpiSubmit()} className='bg-brand-primary text-white rounded-r-md px-4 py-[12px] disabled:bg-brand-primary/40'>
            {!isVerifiedLoading ? 'Verify' : 'Loading...'}
          </button> */}
          <Button text={!isVerifiedLoading ? 'Verify' : 'Loading...'} size='sm' disabled={isVerifiedLoading} isLoading={isVerifiedLoading} handleClick={() => verifyUpiSubmit()} className='rounded-l-none h-12' />
          </div>
          {/* {isVerifiedLoading &&
            <div role="status" className='absolute right-2'>
              <svg aria-hidden="true" className="w-6 h-6 animate-spin dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          } */}
        </div>
      </div>

      <div>
        {isVerified && verifyUpiRes?.status == 'success' ? <p className=' font-semibold text-sm mt-1'>{verifyUpiRes?.payerAccountName}</p> :
          verifyUpiRes?.status == 'failure' ? <p className=' font-semibold text-danger text-sm mt-1'>{verifyUpiRes?.message}</p> :
            null
        }
      </div>
      <div>
        <div className='flex items-center mt-6'>
          <div className='bg-[#008CFF] w-[20px] h-[20px] flex items-center justify-center rounded-full mr-2'>
            <p className='text-white text-xxs font-semibold'>1</p>
          </div>
          <p className='text-xxs font-semibold'>Enter your UPI ID and click on Pay Now.</p>
        </div>
        <div className='flex items-center mt-2'>
          <div className='bg-[#008CFF] w-[20px] h-[20px] flex items-center justify-center rounded-full mr-2'>
            <p className='text-white text-xxs font-semibold'>2</p>
          </div>
          <p className='text-xxs font-semibold'>You will receive a request from Payment Gateway in your UPI App.</p>
        </div>
        <div className='flex items-center mt-2'>
          <div className='bg-[#008CFF] w-[20px] h-[20px] flex items-center justify-center rounded-full mr-2'>
            <p className='text-white text-xxs font-semibold'>3</p>
          </div>
          <p className='text-xxs font-semibold'>Login to UPI App by entering your mpin & authorize payment.</p>
        </div>
      </div>
      <div>
        {/* <button
          onClick={handleSubmit(onSubmitUPI)}
          className="bg-brand-primary rounded w-full text-white text-sm lg:text-base py-3 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
          disabled={loading || !isVerified}
        >
          {loading ? (
            <span className="loading-elipses ">
              Loading
            </span>
          ) : (
            'Proceed to Payment'
          )}
        </button> */}
        <Button text='Proceed to Payment' isLoading={loading} disabled={loading || !isVerified} handleClick={handleSubmit(onSubmitUPI)} className='w-full mt-3' />
        <div className='flex justify-center mt-4'>
          <img className='w-2/4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-secure-payment.svg" alt="" />
        </div>
        <div className='flex justify-center items-center mt-3 mb-3'>
          <p className='text-sm text-gray-100'>Our payment partners are</p>
          <img className='w-16' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pci-dss.webp" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Upi