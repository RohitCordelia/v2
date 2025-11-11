import React, { useEffect, useState } from 'react';
import Modal from '../../../components/UI/Modal';
import Button from '../../../components/UI/Button';
import Select from 'react-select';
import PhoneCode from '../../../components/UI/Forms/Inputs/phoneCodes.json';
import { useForm } from 'react-hook-form';
import OtpInput from 'react18-input-otp';
import { Link } from 'react-router-dom';
import { GetContact } from '../../../utils/store/store';
import { useSendOTPMutation, useVerifyOTPMutation } from '../../../services/auth/auth';
import { useCreateCouponMutation } from '../../../services/cms/cms';
import { SetLocalStorage, GetLocalStorage, SaveContact } from '../../../utils/store/store';
import { getCurrentUrlWithCampaign } from '../../../utils/user/user';
import { useNavigate } from 'react-router-dom';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../../services/OTPLessAuth/OTPLessAuth';

type ModalBodyProps = {
  step: number;
  offerStep: any;
  couponCreated: boolean;
  totalDiscount: number;
  couponCode: any;
  createdCouponCode: string;
  couponPct: any;
  handleSubmit: any;
  submitData: (data: any) => void;
  country: string;
  setCountry: (value: string) => void;
  register: any;
  errors: any;
  otp: string;
  setOtp: (value: string) => void;
  otpError: string;
  setOtpError: (value: string) => void;
  watch: any;
  createCouponCode: (data: any) => void;
  loadingCreate: boolean;
  calculateDiscountPercentage: (data: any) => void;
};

type CountdownProps = {
  isOfferModal?: boolean;
  setIsOfferModal?: (value: boolean) => void;
  selectedOffer?: any;
};

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f5f5f5',
    height: '48px',
    border: 10,
    boxShadow: 'none',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted #ccc',
    padding: 10,
    zIndex: 999
  }),
  menu: (styles: any) => ({
    ...styles,
    width: '300px',
    zIndex: 9999
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    marginRight: '-36px',
  }),
};

const ModalBody: React.FC<ModalBodyProps> = ({
  step,
  offerStep,
  couponCreated,
  totalDiscount,
  couponCode,
  createdCouponCode,
  couponPct,
  handleSubmit,
  submitData,
  country,
  setCountry,
  register,
  errors,
  otp,
  setOtp,
  otpError,
  setOtpError,
  watch,
  createCouponCode,
  loadingCreate,
  calculateDiscountPercentage
}) => {
  const [copied, setCopied] = useState(false);
  let otpWidth = window.innerWidth > 640 ? '10px' : '3px';

  const mobileValid = (event: any) => {
    if ((event.keyCode > 64 && event.keyCode < 91)) {
      event.preventDefault();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode || createdCouponCode).then(() => {
      setCopied(true);
    });
  };

  if (step == 2) {
    return (
      <>
        <div className=" flex gap-3 justify-center font-bold self-center px-4 pb-2 lg:pb-3">
          <img
            className="h-10 w-10"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-logo-new-icon.svg"
            alt="exclaimation"
          />
        </div>
        <div className=" flex gap-3 justify-center text-xl font-bold self-center px-2 lg:pb-3">
          <p> Login/Register </p>
        </div>
        <div className="flex justify-center self-center mt-3">
        </div>
        <div className="text-center lg:px-16 px-4 mt-3 lg:mt-4">
          <p className="px-2 text-sm">
            You will receive a 4-digit code for your mobile number verification.
          </p>
        </div>
        <form onSubmit={handleSubmit(submitData)} method="post">
          <div className="grid grid-cols-9 lg:grid-cols-9 lg:px-12 px-4 my-2">
            <div className="col-span-9">
              <div className={`grid grid-cols-1 relative `}>
                <div className="grid grid-cols-1 relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...register('name', {
                      required: "Name is required.",
                    })}
                    className="rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2"
                    placeholder="Full Name"
                  />
                  {errors.name && (
                    <span className="text-danger text-xs">{errors.name.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-9 lg:grid-cols-9 lg:px-12 px-4 my-2">
            <div className="col-span-9">
              <div className={`grid grid-cols-1 relative `}>
                <div className="grid grid-cols-1 relative">
                  <input
                    id="email"
                    name="email"
                    {...register('email', {
                      required: "Email is required.",
                    })}
                    className="rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2"
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="text-danger text-xs">{errors.email.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-9 lg:grid-cols-9 lg:px-12 px-4 my-2">
            <div className="lg:col-span-2 col-span-2">
              <div className={`grid grid-cols-1 `}>
                <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                <Select
                  menuPortalTarget={document.body}
                  value={{ label: country }}
                  maxMenuHeight={290}
                  options={PhoneCode}
                  onChange={(item: any) => setCountry(item?.value)}
                  styles={customStyles}
                />
              </div>
            </div>
            <div className="lg:col-span-7 col-span-7">
              <div className={`grid grid-cols-1 relative `}>
                <div className="grid grid-cols-1 relative">
                  <input
                    id="phone_number"
                    name="phone_number"
                    {...register('phone_number', {
                      required: "Please enter a valid mobile number",
                      pattern: {
                        value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/,
                        message: "Please enter a valid mobile number",
                      },
                      maxLength: country === "+91" ? 10 : 12,
                    })}
                    maxLength={country === "+91" ? 10 : 12}
                    className="rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2"
                    type="tel"
                    placeholder="Phone Number"
                    onKeyDown={mobileValid}
                  />
                  {errors.phone_number && (
                    <span className="text-danger text-xs">{errors.phone_number.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:px-10 px-4 pb-6">
            <Button text='Continue' className='w-full' />
          </div>
          <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
            <p>
              By verifying, you agree to our{' '}
              <Link
                to={'/terms-condition'}
                target="_blank"
                className="text-brand-primary italic"
              >
                [Terms and Conditions]
              </Link>{' '}
              and{' '}
              <a
                href={
                  'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                }
                target="_blank"
                className="text-brand-primary italic"
              >
                [Privacy Policy]
              </a>
              .
            </p>
          </div>
        </form>
      </>
    )
  } else if (step == 3 || offerStep == 3) {
    return (
      <>
        <div className=" flex gap-3 justify-center font-bold self-center px-4 pb-2 lg:pb-3">
          <img
            className="h-10 w-10"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-logo-new-icon.svg"
            alt="exclaimation"
          />
        </div>
        <div className=" flex gap-3 justify-center text-xl font-bold self-center px-2 lg:pb-3">
          <p>Verify your phone number</p>
        </div>
        <div className="flex justify-center self-center mt-3">
        </div>
        <div className="text-center lg:px-16 px-4 mt-3 lg:mt-4">
          <p className="px-2 text-sm">
            We've sent a 4-digit code to{' '}
            <span className="font-semibold">{watch().phone_number}</span>{' '}
            <span className="block">
                Enter the code below to continue.
            </span>
          </p>
        </div>
        <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
          <OtpInput
            autoComplete="one-time-code"
            value={otp}
            onChange={(otp: string) => {
              setOtpError('')
              setOtp(otp);
            }}
            numInputs={4}
            separator={<span className="px-2"></span>}
            containerStyle=" mx-auto"
            inputStyle={{
              margin: otpWidth,
              width: '3rem',
              height: '3rem',
              color: 'black',
              fontSize: ' 0.875rem',
              borderRadius: 4,
              border: '1px solid #E6E8EC',
              backgroundColor: '#F5F5F5'
            }}
            isInputNum={true}
          />
        </div>
        {otpError ? <p className='flex flex-wrap justify-center text-red text-sm mt-4 mb-4' >{otpError}</p> : null}
        {errors && errors?.phone_number?.message ? <p className='flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4' >{errors?.phone_number?.message}</p> : null}
        <div className="lg:px-10 px-4 pb-6">
          <Button text='Verify & Continue' disabled={otp.toString().length < 4}
            handleClick={() => {
              handleSubmit(submitData)();
            }} className='w-full' />
        </div>
        <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
          <p>
            By verifying, you agree to our{' '}
            <Link
              to={'/terms-condition'}
              target="_blank"
              className="text-brand-primary italic"
            >
              [Terms and Conditions]
            </Link>{' '}
            and{' '}
            <a
              href={
                'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
              }
              target="_blank"
              className="text-brand-primary italic"
            >
              [Privacy Policy]
            </a>
            .
          </p>
        </div>
      </>
    )
  } else if (step == 4 || offerStep == 4) {
    return (
      <>
        <div className=" flex gap-3 justify-center font-bold self-center px-4 pb-2 lg:pb-2">
          <img
            className="h-10 w-10"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/birthday-gift-offer-icon.svg"
            alt="exclaimation"
          />
        </div>
        <div className="text-center lg:px-16 px-8 mt-3 lg:mt-2">
          <p className="px-2 text-sm">
            {GetLocalStorage('msg') ? GetLocalStorage('msg') : 'Surprise Gift for you'}
          </p>
        </div>
        <div className=" flex gap-3 justify-center text-xl font-bold self-center px-2">
          <p>You Got </p>
        </div>
        <div className=" flex gap-3 justify-center text-brand-orange text-xl font-bold self-center px-2 lg:pb-3">
          <p>{couponPct}% Extra Off!</p>
        </div>
        <div className=" flex gap-3 justify-center text-xl font-bold self-center px-2 mb-1">
          <p className='text-sm text-gray-100 font-semibold'>Use Coupon Code</p>
        </div>
        <div className="grid grid-cols-5 text-center mb-3 lg:mb-4 w-max mx-auto">
          <div className='col-span-3 border-1 roudned border-dashed border-gray-200 p-4'>
            <p className='text-xl capitalize font-bold text-brand-primary'>{couponCode}</p>
          </div>
          <button
            onClick={handleCopy}
            className={`col-span-2 font-semibold text-sm transition ${copied
              ? "bg-brand-green text-white"
              : "bg-brand-gradient text-white"
              }`}
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100 leading-6">
          <p>
            At payment, apply this code for extra savings. <br /> Valid only till Aug 31.
          </p>
        </div>
      </>
    )
  }
};


const OfferModal: React.FC<CountdownProps> = ({ isOfferModal, setIsOfferModal, selectedOffer }) => {

  const contact = GetContact();
  const [country, setCountry] = useState('+91');
  const [step, setStep] = useState(2);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [createdCouponCode, setCreatedCouponCode] = useState<string>('');
  const [otpError, setOtpError] = useState('');
  const [couponCreated, setCouponCreated] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpReqId, setOtpReqId] = useState<any>();
  const offerStep = GetLocalStorage('sff');
  const couponCode = GetLocalStorage('cc');
  const couponPct = GetLocalStorage('cp');

  let navigate = useNavigate();
  
  // const [sendOTP] = useSendOTPMutation();
  // const [verifyOTP] = useVerifyOTPMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [createCoupon, { isLoading: loadingCreate }] = useCreateCouponMutation();

  useEffect(() => {
    setStep(2)
  }, [isOfferModal])

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      dob: ''
    }
  });

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num
        .toString()
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }
    return num;
  };

  const randomString = (length: number): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const calculateDiscountPercentage = (data: any) => {

    const [year, month, day] = data.dob.split("-").map(Number);

    const dd = reduceToSingleDigit(
      day.toString().split("").map(Number).reduce((a, b) => a + b, 0)
    );

    const mm = reduceToSingleDigit(
      month.toString().split("").map(Number).reduce((a, b) => a + b, 0)
    );

    const yyyy = reduceToSingleDigit(
      year.toString().split("").map(Number).reduce((a, b) => a + b, 0)
    );

    const total = reduceToSingleDigit(dd + mm + yyyy);
    console.log('roh sad', total);

    const totalPercentage = total + 4;
    setTotalDiscount(totalPercentage);

    const cc = `CORD4${randomString(7)}`;
    setCreatedCouponCode(cc);
    return [totalPercentage, cc, setStep(2)];
  };

  const submitData = (data: any) => {
    const cleanedUrl = getCurrentUrlWithCampaign();
    if (step == 2) {
      const _payload = {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone_number,
        website: cleanedUrl || window.location.href,
        countryCode: country,
        pageCode: 'cordelia_birthday',
      };
      generateOtp(_payload)
        .unwrap()
        .then((response) => {
          setStep(3);
          setOtpReqId(response?.result?.requestId);
        })
        .catch((response) => {
          setError('phone_number', { type: 'custom', message: response?.data?.message || 'Enter valid 10 digit mobile number' });
        });
    }

    if (step == 3) {
      const _payload = {
        // countryCode: country,
        // phoneNumber: data.phone_number,
        requestId: otpReqId,
        otp: otp,
        website: cleanedUrl || window.location.href,
      };
      verifyOtp(_payload)
        .unwrap()
        .then((response) => {
          SaveContact({ data: data?.phone_number });
          SetLocalStorage('sff', 3);
          navigate('/select-itinerary', {
            state: { itinerary: selectedOffer.itinerary }
          });
        })
        .catch((response) => {
          setOtpError(response?.data?.message || 'Failed to verify OTP');
        });
    }
  };

  const createCouponCode = () => {
    let couponObject = {
      "description": 'Apply and get instant discount',
      "discount_type": 'Percentage',
      "discount_amount": null,
      "coupon_code": createdCouponCode,
      "applies_to": ['special_fare'],
      "portals": ['b2c-q', 'b2c-weekend-flow'],
      "discount_pct": totalDiscount,
      "max_discount": null,
      "limit_per_user": 1,
      "is_public": false,
      "disable_for_other_offers": false,
      "disable_for_partial_payment": false,
      "active": true,
      "success_message": 'Coupon applied',
      "valid_from": '2025-08-28 00:00:00 +05:30',
      "valid_till": '2025-08-31 23:45:00 +05:30',
      "rules_json": [],
      "is_unique": true,
      "phone_number": getValues('phone_number')
    };



    const _payload = {
      coupon: couponObject
    };

    createCoupon(_payload)
      .unwrap()
      .then((res: any) => {
        if (res?.status == 'already present') {
          SetLocalStorage('msg', 'You have already generated your Birthday Bonus Coupon');
          SetLocalStorage('sff', 4);
          SetLocalStorage('cc', res?.data?.coupon?.coupon_code);
          SetLocalStorage('cp', res?.data?.coupon?.discount_pct);
          setStep(4);
        } else {
          SetLocalStorage('sff', 4);
          SetLocalStorage('cc', createdCouponCode);
          SetLocalStorage('cp', totalDiscount);
          setStep(4);
        }

      })
      .catch((res: any) => {
        console.log('Errorsada: ', res);
      });
  };

  const handleCloseOfferModal = () => {
    setIsOfferModal && setIsOfferModal(false);
    clearErrors();
    reset();
    setOtp('');
  }

  return (
    <>
      <Modal
        show={isOfferModal}
        align={'center'}
        className="drop-shadow bg-white w-[90%] lg:w-2/6 center lg:h-auto rounded-lg lg:rounded-lg border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        onClose={handleCloseOfferModal}
      >
        <div
          className=" p-1 flex justify-end items-center"
          onClick={handleCloseOfferModal}
        >
          <div className="self-center mr-3 mt-3 font-bold cursor-pointer">
            <img className='w-4 h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg' alt='closeIcon' />
          </div>
        </div>
        <ModalBody
          step={step}
          offerStep={offerStep}
          couponCreated={couponCreated}
          totalDiscount={totalDiscount}
          couponCode={couponCode}
          createdCouponCode={createdCouponCode}
          couponPct={couponPct}
          handleSubmit={handleSubmit}
          submitData={submitData}
          country={country}
          setCountry={setCountry}
          register={register}
          errors={errors}
          otp={otp}
          setOtp={setOtp}
          otpError={otpError}
          setOtpError={setOtpError}
          watch={watch}
          createCouponCode={createCouponCode}
          loadingCreate={loadingCreate}
          calculateDiscountPercentage={calculateDiscountPercentage}
        />
      </Modal>
    </>
  );
};

export default OfferModal;
