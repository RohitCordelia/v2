import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Modal from '../UI/ModalCenter';
import { FullName } from '../../utils/validations/formValidations';
import Select from 'react-select';
import PhoneCode from '../../components/UI/Forms/Inputs/phoneCodes.json';
import OtpInput from 'react18-input-otp';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import { GetAuth, SaveAuth, SaveContact } from '../../utils/store/store';
import { Link } from 'react-router-dom';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

type Props = {
  title?: string;
  titleClassName?: string;
  subTitle?: string;
  btnText?: string;
  submitClassName?: string;
  btnStyle?: {};
  desktopMode?: boolean;
  showTitle?: boolean;
  isBirthday?: boolean;
  footerText?: string;
  pageCode?: string;
};

export type RegistrationFormFields = {
  firstName: string;
  countryCode: string;
  phoneNumber: string;
};

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f5f5f5',
    height: '48px',
    border: '1px solid rgb(112 112 112 / 10%)',
    borderRight: 'none',
    borderRadius: '6px 0 0 6px'
    //   zIndex: 10001 // Optional but helps when inside stacking contexts
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted #ccc',
    padding: 10,
    zIndex: 999 // Optional
  }),
  menu: (styles: any) => ({
    ...styles,
    width: '300px',
    zIndex: 9999 // Doesn't always affect portal-rendered menus
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 10001 // ✅ This is critical!
  })
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px';

const RequestACallback = ({
  title,
  titleClassName,
  subTitle,
  btnText,
  submitClassName,
  btnStyle,
  desktopMode = false,
  showTitle = true,
  isBirthday = false,
  footerText,
  pageCode,
}: Props) => {
  const [showRequestACallback, setShowRequestACallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [country, setCountry] = useState('+91');
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [leadId, setLeadId] = useState(null);
  const [timer, setTimer] = useState<number>(30);
  const [otpReqId, setOtpReqId] = useState<any>();
  const END_TIMER = 0;
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const Auth = GetAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset
  } = useForm();

  useEffect(() => {
    if (showOTPModal) {
      if (timer && timer !== END_TIMER) {
        var tempTimer = setInterval(() => setTimer(timer - 1), 1000);
        return function cleanup() {
          clearInterval(tempTimer);
        };
      }
    }
  }, [showOTPModal, timer]);

  const submitForm = (data: any) => {
    setLoading(true);
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      phoneNumber: data.phone_number,
      website: cleanedUrl || window.location.href,
      pageCode: pageCode || 'upc_rc',
      fullName: data.name,
      email: data.email,
      companyName: null,
      eventType: null,
      countryCode: country
    };
    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setShowOTPModal(true);
        setOtp('');
        setOtpReqId(response?.result?.requestId);
      })
      .catch((response) => {
        setErrorMsg(response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const submitOtp = () => {
    setVerifyLoading(true);
    const cleanedUrl = getCurrentUrlWithCampaign();
    const sessionTime = getSessionTime()
    const _payload = {
      requestId: otpReqId,
      otp: otp,
      website: cleanedUrl || window.location.href,
      sessionTime: sessionTime
    };
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        sessionStorage.removeItem("_st");
        if (!Auth?.token) {
          const resData = {
            exp: response?.result?.exp,
            is_profile_completed: response?.result?.isProfileCompleted,
            lead_id: response?.result?.leadId,
            token: response?.result?.token,
            refreshToken: response?.result?.refreshToken
          }
          SaveAuth(resData)
          SaveContact({ data: watch()?.phone_number })
          window.dispatchEvent(new Event("authChanged"));
        }

        setLeadId(response.lead_id);
        setShowOTPModal(false);
        handleCloseReqCallback();
        setShowSuccessModal(true);
        setSuccess(
          `You are one step closer to your cruise vacation. Our experts will contact you shortly.`
        );
      })
      .catch((response) => {
        setOtpError('Invalid OTP');
        // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
      })
      .finally(() => setVerifyLoading(false));
  };

  const resendOTP = () => {
    setOtp('');
    setOtpError('');
    setTimer(30);
    submitForm({ phone_number: watch()?.phone_number });
  };

  const handleCloseReqCallback = () => {
    setShowRequestACallback(false);
    clearErrors();
    reset();
  };

  return (
    <div>
      <div className="bg-white rounded-md">
        {showTitle && (
          <div
            className={`border-b border-gray-300 p-4 flex flex-col items-start gap-2 justify-between  ${
              desktopMode ? 'lg:justify-center' : ''
            }`}
          >
            <h1
              className={`text-2xl font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1 ${titleClassName}`}
              style={{ color: 'transparent' }}
            >
              {title || 'Request a Callback'}
            </h1>
            {subTitle && <p className='text-xs font-medium'>{subTitle}</p>}
            {/* <svg
              onClick={handleCloseReqCallback}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
          </div>
        )}
        <div className={desktopMode ? 'lg:py-4 lg:px-8 p-4' : 'p-4'}>
          <form className="text-gray-100" onSubmit={handleSubmit(submitForm)}>
            <div
              className={
                desktopMode ? 'lg:flex lg:justify-between lg:gap-4' : ''
              }
            >
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/3' : ''}`}>
                <label className="text-sm font-semibold mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('name', { required: 'Name is required.' })}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, ""))}
                />
                {errors.name && (
                  <p className="text-xs text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/3' : ''}`}>
                <label className="text-sm font-semibold mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Enter a valid email address.'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/3' : ''}`}>
                <label className="text-sm font-semibold block mb-1">
                  Mobile Number
                </label>
                <div className="flex">
                  <div className="lg:col-span-2 col-span-2 w-[33%]">
                    <div
                      className={`grid grid-cols-1 gap-4 w-full h-[48px] bg-gray-400 overflow-hidden rounded-l-md`}
                    >
                      <input type="hidden" id="zc_gad" name="zc_gad" value="" />
                      <Select
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        value={{ label: country }}
                        maxMenuHeight={290}
                        options={PhoneCode}
                        onChange={(item) => setCountry(item?.value)}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 col-span-7 w-[78%]">
                    <input
                      id="phone_number"
                      {...register('phone_number', {
                        required: 'Please enter a valid mobile number',
                        pattern: {
                          value:
                            country === '+91' ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                          message: 'Please enter a valid mobile number'
                        },
                        maxLength: country === '+91' ? 10 : 12 // Set maxLength to 10 for +91 and 12 for others
                      })}
                      maxLength={country === '+91' ? 10 : 12} // Ensure that maxLength is correctly set
                      className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                      type="tel"
                      placeholder="Mobile Number"
                      onInput={(e) =>
                        (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""))
                      }
                    />
                    {errors.phone_number && (
                      <span className="text-danger text-xs">
                        {errors.phone_number && (
                          <p className="text-xs text-danger">
                            {errors.phone_number.message}
                          </p>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {isBirthday && (
                <div className="text-center mt-4 lg:mt-3">
                  <Button
                    text={btnText || "Submit"}
                    size={desktopMode ? 'base' : 'sm'}
                    disabled={loading}
                    isLoading={loading}
                    className={`px-12 ${submitClassName}`}
                    btnStyle={btnStyle}
                  />
                </div>
              )}
            </div>
            {!isBirthday && (
              <div className="text-center mt-4 lg:mt-3">
                <Button
                  text={btnText || "Submit"}
                  size={desktopMode ? 'base' : 'sm'}
                  disabled={loading}
                  isLoading={loading}
                  className={`px-12 ${submitClassName}`}
                  btnStyle={btnStyle}
                />
              </div>
            )}
            {errorMsg && (
              <div className="text-center mt-4">
                <p className="text-sm font-semibold text-danger">{errorMsg}</p>
              </div>
            )}
          </form>

          {footerText && <p className='text-xs font-medium italic mt-5'>{footerText}</p>}

          <Modal
            show={showOTPModal}
            onClose={() => setShowOTPModal(false)}
            align={'center'}
            className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
            maxHeight="100vh"
          >
            <div
              className=" p-1 flex justify-end items-center"
              onClick={() => setShowOTPModal(false)}
            >
              <div className="self-center mr-3 mt-3 font-bold cursor-pointer">
                <img className='w-4 h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg' alt='closeIcon' />
              </div>
            </div>
            <div className="w-full text-black">
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                  setTimer(30);
                  setOtpError('');
                }}
                className="absolute top-3 right-4 text-2xl"
              >
                &times;
              </button>
              <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                <p>Verify your phone number</p>
              </div>

              <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
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
                  // isDisabled={!showOTP}
                  value={otp}
                  onChange={(otp: string) => {
                    setOtpError('');
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

              {otpError ? (
                <p className="flex flex-wrap justify-center text-red text-sm mt-4 mb-4">
                  {otpError}
                </p>
              ) : null}
              {errors && errors?.phone_number?.message ? (
                <p className="flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4">
                  {errors?.phone_number?.message}
                </p>
              ) : null}
              <div className="lg:px-10 px-4">
                <Button
                  text="Verify & Continue"
                  disabled={(otp.toString().length < 4) || verifyLoading}
                  isLoading={verifyLoading}
                  handleClick={handleSubmit(submitOtp)}
                  className="w-full"
                />
              </div>

              <div className="mb-8">
                <div className="mt-4 text-center">
                  {timer === END_TIMER ? (
                    <p
                      className=" cursor-pointer underline text-brand-primary"
                      onClick={resendOTP}
                    >
                      Didn't receive the code?
                    </p>
                  ) : (
                    <p className="text-sm font-semibold">
                      Didn't receive the code? Resend in{' '}
                      <span className="underline">{`00:${String(timer).padStart(2, "0")}`}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                <p className='text-xs lg:text-sm'>
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
            </div>
          </Modal>
        </div>
      </div>
      <Modal
        show={showSuccessModal}
        align={'center'}
        className="w-[85%] lg:w-[40%] relative rounded-md overflow-hidden"
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="w-full h-full bg-white shadow-lg">
          <div className="absolute right-3 top-3">
            <svg
              onClick={() => setShowSuccessModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-md overflow-hidden">
            <div className="flex justify-center mb-5">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/icon_success_green.svg"
                alt="success_icon"
              />
            </div>
            <p className="text-md text-gray-700 text-center font-semibold">
              {success}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RequestACallback;
