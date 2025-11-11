import React, { ReactNode, useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetStore } from '../../../src/utils/store/store';
import { FormatCardNumber, UnFormatCardNumber } from '../../../src/utils/formatter/formatter';
import { Input } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  FullName,
  Cvv,
  CardNumber,
  AnyValidString,
  SelectAnyValue,
  UPIValidation,
} from '../../../src/utils/validations/formValidations';
import { FormatAmount } from '../../../src/utils/formatter/formatter';
import Select from '../../../src/components/UI/Forms/Inputs/select';
import {
  useCompletePaymentMutation,
  useInitiatePaymentMutation,
} from '../../../src/services/payments/payment';
import {
  BANK_QUICK_PAYMENTS,
  CARD,
  EMI,
  NET_BANKING,
  UPI,
  WALLET,
  WALLET_QUICK_PAYMENTS
} from '../../../src/constants/billingConstants';
import Modal from '../../components/UI/Modal';
// import { TiggerFBCheckoutEvent, TiggerGACheckoutEvent } from '../../../src/components/Analytics/events';
type Props = {};

export default function PaymentMethod({ }: Props) {
  const { state } = useLocation();
  const { paymentData, billingAddress, bookingData: store, payment_for, promo_code } = state;

  const [loading, setLoading] = useState(false);
  const getStore = GetStore();
  const [completePayment] = useCompletePaymentMutation();
  const [initiatePayment] = useInitiatePaymentMutation();
  const [paymentRadio, setPaymentRadio] = useState('');
  const [UPIList, setUPIList] = useState<any[]>([]);
  const [BankList, setBankList] = useState<any[]>([]);
  const [BankQuickList, setBankQuickList] = useState<any[]>([]);
  const [WalletList, setWalletList] = useState<any[]>([]);
  const [WalletQuickList, setWalletQuickList] = useState<any[]>([]);
  const [EMIOption, setEMIOption] = useState<any>(null);
  const [cardModal, setCardModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cardError, setCardError] = useState(null);
  const [portName, setPortName] = useState('');
  const [hideBreakup, setHideBreakup] = useState(true);
  const [hideCabin, setHideCabin] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (store) {
      let portName = store.itinerary.ports
        .map((item: any, index: any, arr: any) => {
          const isLast = index === arr.length - 1;
          const name = isLast ? item.name : item.name + ` -`;
          return index === 0 || isLast ? `${name}` : `${name}`;
        })
        .join(" ")

      setPortName(portName)
    }
  }, [store])

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
    formState: { errors: errorsUPI }
  } = useForm({
    defaultValues: {
      upi: ''
    }
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
  const {
    register: registerWallet,
    handleSubmit: handleWalletSubmit,
    setValue: setWalletValue,
    formState: { errors: errorsWallet }
  } = useForm({
    defaultValues: {
      wallet: ''
    }
  });
  const {
    handleSubmit: handleEMISubmit,
  } = useForm({});

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (store && store.booking.split_payment_options.available && payment_for === 'split_payment') {
      let obj = store.booking.split_payment_options.options.find(o => o.paid === false);
      setTotalAmount(obj.amount)
    } else {
      setTotalAmount(store.booking.total)
    }
  }, [store])

  useEffect(() => {
    if (paymentData) {
      let UPIlist: any[] = paymentData.pg_data?.payment_modes?.filter(
        (data: any) =>
          data.payment_mode === 'UPI' &&
          data.extra_info.hasOwnProperty('vpa_id')
      );
      setUPIList(UPIlist);
      // let isBank: any[]= paymentData.pg_data?.payment_modes?.filter(
      //     (data:any) =>
      //       data.payment_mode === 'Netbanking'
      //   );
      if (paymentData.pg_data?.banks?.bank_list.length) {
        setBankList(paymentData.pg_data.banks.bank_list);
        setBankQuickList(
          paymentData.pg_data.banks?.bank_list?.filter((bank: any) =>
            BANK_QUICK_PAYMENTS.includes(bank.bank_name)
          )
        );
      }
      // let isWallet: any[]= paymentData.pg_data?.payment_modes?.filter(
      //     (data:any) =>
      //       data.payment_mode === 'Wallet'
      //   );

      if (paymentData.pg_data?.wallets?.wallet_list.length) {
        setWalletList(paymentData.pg_data.wallets.wallet_list);
        setWalletQuickList(
          paymentData.pg_data.wallets?.wallet_list?.filter((wallet: any) =>
            WALLET_QUICK_PAYMENTS.includes(wallet.wallet_name)
          )
        );
      }

      if (paymentData.pg_data?.paylater_options && paymentData.pg_data?.paylater_options[0]?.option_name) {
        setEMIOption(paymentData.pg_data?.paylater_options[0].option_name)
      }
    }
  }, [paymentData]);


  const onSubmitUPI = () => {
    handleSubmitUPI(onPayViaUPI)()
  };

  const onSubmitCard = () => {
    handleCardSubmit(onPayViaCard)()
  };

  const onSubmitBank = () => {
    handleBankSubmit(onPayViaNetbanking)()
  };

  const onSubmitWallet = () => {
    handleWalletSubmit(onPayViaWallet)()
  };

  const onSubmitEMI = () => {
    handleEMISubmit(onPayViaEMI)()
  };

  const onPayViaUPI = (data: any) => {
    const _payload = {
      flow: 'collect',
      booking_id: store.booking.id,
      payment_id: paymentData.payment_id,
      payment_mode: 'UPI',
      billing_address: billingAddress,
      upi_id: data.upi,
      promo_code: promo_code
    };
    setLoading(true);
    completePayment(_payload)
      .unwrap()
      .then((res: any) => {
        // SaveStore({ ...store, invoice: res });
        navigate(`/transaction-enquiry?payment_id=${paymentData.payment_id}`);
        // if (res.pg_data.extra_info.data.redirectUrl) {
        //     window.location = res.pg_data.extra_info.data.redirectUrl;
        //   }
        setLoading(false);
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        // navigate('/payment-success')
        setLoading(false);
      });
  };

  const onPayViaCard = (data: any) => {
    let date = data.expiry.split('-');
    const _payload = {
      payment_id: paymentData.payment_id,
      booking_id: store.booking.id,
      billing_address: billingAddress,
      payment_mode: 'Debit Card',
      card_no: UnFormatCardNumber(data.cardnumber),
      cvv: data.cvc,
      expiry: `${date[1]}/${date[0]}`,
      promo_code: promo_code
    };
    setLoading(true);
    initiatePayment(_payload)
      .unwrap()
      .then((res: any) => {
        if (res.pg_data.extra_info.data.redirectUrl) {
          window.location = res.pg_data.extra_info.data.redirectUrl;
        }
        setLoading(false);
        setCardError(null)
      })
      .catch((res: any) => {
        console.log('Error: ', res);
        setCardError(res.data.message)
        setLoading(false);
      });
  };

  const onPayViaNetbanking = (data: any) => {
    const _payload = {
      payment_id: paymentData.payment_id,
      booking_id: store.booking.id,
      billing_address: billingAddress,
      payment_mode: 'Netbanking',
      bank: data.bank,
      promo_code: promo_code
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

  const onPayViaWallet = (data: any) => {
    const _payload = {
      payment_id: paymentData.payment_id,
      booking_id: store.booking.id,
      billing_address: billingAddress,
      payment_mode: 'Wallet',
      bank: data.wallet,
      promo_code: promo_code
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

  const onPayViaEMI = () => {
    const _payload = {
      payment_id: paymentData.payment_id,
      booking_id: store.booking.id,
      billing_address: billingAddress,
      payment_mode: EMIOption,
      promo_code: promo_code
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
  console.log('roh store', store, portName);

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        {paymentData ? (
          <div className="">
            <div className="pb-3 flex items-center cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <img
                src="assets/icons/footer/chevon-down-black.svg"
                alt="arrow"
                className={`self-center justify-self-end mr-2 rotate-90`}
              />
              <p className="text-base font-bold">Select Payment Method</p>
            </div>
            

            {/* Net Banking */}
            {!promo_code &&
              <div className="border-x-2 border-t-2 border-gray-300 rounded-t p-3 mt-10">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setPaymentRadio(NET_BANKING)}
                >
                  {paymentRadio === NET_BANKING ? (
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg"
                      className="h-3 lg:h-4 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                  ) : (
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg"
                      className="h-3 lg:h-4 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                  )}
                  <p className="text-base font-bold">Net Banking</p>
                </div>
                {paymentRadio === NET_BANKING && (
                  <div>
                    {/* <div className="mt-4 flex flex-wrap"> Net Banking</div> */}
                    <div className="mt-4 grid grid-cols-2 gap-2 gap-y-3">
                      {BankQuickList?.map((bank: any, index: number) => {
                        return (
                          <div
                            className="mx-2 cursor-pointer flex flex-col items-center justify-around"
                            key={index}
                            onClick={() => setBankValue('bank', bank.bank_name)}
                          >
                            <img
                              src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/${bank.bank_name}.svg`}
                              // style={{
                              //     width: 57,
                              //     height: 57,
                              // }}
                              alt={bank.bank_name}
                              className="self-center mx-auto max-h-5 mb-2"
                            />
                            <p className="text-sm">{bank.bank_name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <Select
                      name="bank"
                      options={BankList.map((bank: any) => {
                        return { code: bank.bank_name, name: bank.bank_name };
                      })}
                      register={registerBank}
                      validation={SelectAnyValue}
                      selectClassName="border-0 bg-gray-400 rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
                      placeholder="Select Bank"
                      error={errorsBank && errorsBank?.bank}
                      errorText={errorsBank && errorsBank.bank?.message}
                    />
                    <button
                      onClick={handleSubmit(onSubmitBank)}
                      className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading-elipses">Loading</span>
                      ) : (
                        'Verify & Pay'
                      )}
                    </button>
                  </div>
                )}
              </div>
            }

            {/* Card */}
            <div className="border-x-2 border-t-2 border-gray-300 rounded-t p-3">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setPaymentRadio(CARD)}
              >
                {paymentRadio === CARD ? (
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg"
                    className="h-3 lg:h-4 mr-2 cursor-pointer"
                    alt="Cruise"
                  />
                ) : (
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg"
                    className="h-3 lg:h-4 mr-2 cursor-pointer"
                    alt="Cruise"
                  />
                )}
                <p className="text-base font-bold">Credit Card / Debit Card</p>
              </div>
              {paymentRadio === CARD && (
                <div>
                  <div className='mt-2'>
                    <p className='font-medium text-xs'>Please ensure your card can be used for online transactions and you have the required transaction limit for making this payment. <span className='text-brand-primary font-semibold cursor-pointer' onClick={() => setCardModal(true)}> Know More</span></p>
                  </div>
                  <div className='flex items-center mt-2'>
                    <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/images/visa-logo.webp" alt="" />
                    <img className='h-4 ml-3' src="https://images.cordeliacruises.com/cordelia_v2/public/images/master-card-logo.webp" alt="" />
                  </div>
                  {cardError &&
                    <div className='mt-4'>
                      <span className='text-xs font-semibold text-danger leading-3'>{cardError}</span>
                    </div>
                  }
                  <div className="mt-4 grid gap-0">
                    {/* <div></div> */}
                    <Input
                      type="text"
                      register={registerCard}
                      validation={CardNumber}
                      name="cardnumber"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
                      placeholder="Card Number"
                      maxLength="19"
                      onChange={(event: any) =>
                        setCardValue(
                          'cardnumber',
                          FormatCardNumber(event.target.value)
                        )
                      }
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
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
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
                        inputClassName="border-0 bg-gray-400 rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
                        placeholder="2022-12"
                        autoComplete="cc-exp"
                        error={errorsCard && errorsCard?.expiry}
                        errorText={errorsCard && errorsCard.expiry?.message}
                      />
                      <Input
                        type="text"
                        register={registerCard}
                        validation={Cvv}
                        name="cvc"
                        inputClassName="border-0 bg-gray-400 rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
                        placeholder="CVV"
                        maxLength="4"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        error={errorsCard && errorsCard?.cvc}
                        errorText={errorsCard && errorsCard.cvc?.message}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit(onSubmitCard)}
                    className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading-elipses">Loading</span>
                    ) : (
                      'Verify & Pay'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* UPI */}
            {!promo_code &&
              totalAmount < 100000 ?
              <div className="border-x-2 border-t-2 border-gray-300 rounded-t p-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setPaymentRadio(UPI)}
                >
                  {paymentRadio === UPI ? (
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg"
                      className="h-3 lg:h-4 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                  ) : (
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg"
                      className="h-3 lg:h-4 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                  )}
                  <p className="text-base font-bold">UPI</p>
                </div>
                {paymentRadio === UPI && (
                  <div>
                    <div className="mt-4 grid grid-cols-2">
                      {UPIList?.map((upi: any, index: number) => {
                        return (
                          <div
                            className="flex flex-col items-center mx-3 mb-4 justify-around cursor-pointer"
                            key={index}
                            onClick={() => {
                              setValueUPI('upi', upi.extra_info.vpa_id);
                              handleSubmit(onSubmitUPI)();
                            }}
                          >
                            <img
                              src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/${upi.extra_info.vpa_provider}-logo.svg`}
                              className="max-h-5 mb-2"
                              alt={upi.extra_info.vpa_provider}
                            />
                            <p className="text-sm">
                              {upi.extra_info.vpa_provider}
                            </p>
                            <p className="text-sm font-bold">
                              {upi.extra_info.vpa_id}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <Input
                      type="text"
                      register={registerUPI}
                      validation={UPIValidation}
                      name="upi"
                      inputClassName="border-0 bg-gray-400 rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100 w-full mt-2"
                      placeholder="Enter your UPI ID"
                      error={errorsUPI && errorsUPI?.upi}
                      errorText={errorsUPI && errorsUPI.upi?.message}
                    />

                    <button
                      onClick={handleSubmit(onSubmitUPI)}
                      className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading-elipses">Loading</span>
                      ) : (
                        'Verify & Pay'
                      )}
                    </button>
                  </div>
                )}
              </div>
              : null
            }

            {/* Pay lated start */}
            {!promo_code &&
              EMIOption && <div className="border-2 border-gray-300 rounded-b p-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setPaymentRadio(EMI)}
                >
                  {paymentRadio === EMI ? (
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-select.svg"
                      className="h-3 lg:h-4 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                  ) : (
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/button-unselect.svg"
                      className="h-3 lg:h-4 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                  )}
                  <p className="text-base font-bold">Cruise Now Pay Later</p>
                </div>
                {paymentRadio === EMI && (
                  <div>
                    <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-2 gap-y-3">
                      <div
                        className="mx-2 cursor-pointer flex flex-col items-center justify-around"
                      >
                        <img
                          src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/sankash-logo.png`}
                          alt={EMIOption}
                          className="self-center mx-auto max-h-10 h-10 mb-2"
                        />
                        <p className="text-sm text-center"> {`Pay Via ${EMIOption} EMI option`}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit(onSubmitEMI)}
                      className="bg-brand-primary w-full text-white text-sm py-4 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading-elipses">Loading</span>
                      ) : (
                        'Verify & Pay'
                      )}
                    </button>
                  </div>
                )}
              </div>}
          </div>
        ) : null}
      </main>


      <Modal show={cardModal} align={'center'} className=" bg-white w-full h-[90%] lg:w-2/4 center bottom-0 lg:h-2/3 lg:bottom-1/4 lg:left-1/4 rounded-t-lg lg:rounded border overflow-hidden	" onClose={() => setCardModal(false)}>
        <div className='border-b border-gray-300 p-4 mb-4 flex items-center' onClick={() => setCardModal(false)}>
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
    </Layout>
  );
}
