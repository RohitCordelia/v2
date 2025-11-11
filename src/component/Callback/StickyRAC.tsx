import React, { useEffect, useState } from 'react';
import BottomSheet from '../BottomSheet';
import { useForm } from 'react-hook-form';
import {
  useGenerateOtpMutation,
  useVerifyOtpMutation
} from '../../services/OTPLessAuth/OTPLessAuth';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import Select from 'react-select';
import PhoneCode from '../../components/UI/Forms/Inputs/phoneCodes.json';
import OtpInput from 'react18-input-otp';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import { getSessionTime } from '../../utils/algorithms';

const StickyRAC = () => {
  const [showRequestACallback, setShowRequestACallback] = useState(false);
  const [pageCode, setPageCode] = useState('upc_rc');
  const [country, setCountry] = useState('+91');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [success, setSuccess] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [otpReqId, setOtpReqId] = useState<any>();
  const [timer, setTimer] = useState<number>(30);
  const END_TIMER = 0;

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

  useEffect(() => {
    if (showRequestACallback) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showRequestACallback]);

  let otpWidth = window.innerWidth > 640 ? '10px' : '3px';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset
  } = useForm();

  const handleOpenReqCallback = () => {
    setShowRequestACallback(true);
    setPageCode('upc_rc');
  };

  const handleCloseReqCallback = () => {
    setShowRequestACallback(false);
    clearErrors();
    reset();
  };

  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

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
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      phoneNumber: data.phone_number,
      website: cleanedUrl || window.location.href,
      pageCode: pageCode,
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
      });
  };

  const submitOtp = () => {
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
        setLeadId(response.lead_id);
        setShowOTPModal(false);
        handleCloseReqCallback();
        setShowSuccessModal(true);
        setSuccess(
          `You are one step closer to your cruise vacation. Our experts will contact you shortly.`
        );
      })
      .catch((response) => {
        // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
      });
  };

  const resendOTP = () => {
    submitForm({ phone_number: watch()?.phone_number });
  };

  return (
    <div>
      <Modal
        show={innerWidth > 600 && showRequestACallback}
        align="center"
        onClose={handleCloseReqCallback}
      >
        <div className="bg-white w-[450px] rounded-md">
          <div className="border-b border-gray-300 p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold font-openSans">
              Request a Callback
            </h1>
            <svg
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
            </svg>
          </div>
          <div className="p-4">
            <form className="" onSubmit={handleSubmit(submitForm)}>
              <div className="">
                <div className="mb-2">
                  <label className="text-sm font-semibold mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                    {...register('name', { required: 'Name is required.' })}
                    onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, ""))}
                  />
                  {errors.name && (
                    <p className="text-xs text-danger">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-2">
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
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Enter a valid email address.'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-danger">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold block mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="lg:col-span-2 col-span-2 w-[22%]">
                      <div
                        className={`grid grid-cols-1 gap-4 w-full h-[48px] bg-gray-400 overflow-hidden rounded-l-md`}
                      >
                        <input
                          type="hidden"
                          id="zc_gad"
                          name="zc_gad"
                          value=""
                        />
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
                              country === '+91'
                                ? /^[0-9]{10}$/
                                : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                            message: 'Please enter a valid mobile number'
                          },
                          maxLength: country === '+91' ? 10 : 12 // Set maxLength to 10 for +91 and 12 for others
                        })}
                        maxLength={country === '+91' ? 10 : 12} // Ensure that maxLength is correctly set
                        className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                        type="tel"
                        placeholder="Phone Number"
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
              </div>
              <div className="text-center mt-4 lg:mt-3">
                <Button
                  text="Submit"
                  disabled={false}
                  isLoading={false}
                  className="px-12"
                />
              </div>
              {errorMsg && (
                <div className="text-center mt-4">
                  <p className="text-sm font-semibold text-danger">
                    {errorMsg}
                  </p>
                </div>
              )}
            </form>

            <Modal
              show={showOTPModal}
              align={'center'}
              className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
              maxHeight="100vh"
            >
              <div className="w-full relative">
                <button
                  onClick={() => {
                    setShowOTPModal(false);
                    setOtp('');
                  }}
                  className="absolute -top-5 right-4 text-[40px] text-black"
                >
                  &times;
                </button>
                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                  <p> Verify OTP </p>
                </div>

                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                  <p className="px-2 text-sm">
                    You will receive a 4-digit code for your phone number{' '}
                    {watch().phone_number}
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
                    text="Verify"
                    disabled={otp.toString().length < 4}
                    handleClick={handleSubmit(submitOtp)}
                    className="w-full"
                  />
                </div>

                <div className="mb-8">
                  <div className="mt-4 text-center">
                    {timer === END_TIMER ? (
                      <p
                        className=" cursor-pointer underline text-brand-primary"
                        onClick={() => {
                          resendOTP();
                          setOtp('');
                          setTimer(30);
                        }}
                      >
                        Resend OTP
                      </p>
                    ) : (
                      <p className="text-sm underline font-semibold">
                        Resend With <span className="">{`00:${timer}`}</span>
                      </p>
                    )}
                    {/* <p >Edit mobile number</p> */}
                  </div>
                </div>
                <div className="text-center lg:px-4 px-0 mb-3 lg:mb-4 text-xs text-gray-100">
                  <p>
                    By entering the OTP and clicking continue, I confirm that I
                    have read, understood and agree with the{' '}
                    <Link
                      to={'/terms-condition'}
                      target="_blank"
                      className="text-brand-primary italic"
                    >
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <a
                      href={
                        'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                      }
                      target="_blank"
                      className="text-brand-primary italic"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Modal>

      <BottomSheet
        isOpen={innerWidth < 600 && showRequestACallback}
        setIsOpen={handleCloseReqCallback}
        onClose={handleCloseReqCallback}
        title="Request a Callback"
        hasBtns={false}
      >
        <div className="pt-5">
          <form className="" onSubmit={handleSubmit(submitForm)}>
            <div className="">
              <div className="mb-2">
                <label className="text-sm font-semibold mb-1 block">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('name', { required: 'Name is required.' })}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, ""))}
                />
                {errors.name && (
                  <p className="text-xs text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-2">
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
              <div className="mb-2">
                <label className="text-sm font-semibold block mb-1">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="lg:col-span-2 col-span-2 w-[30%] lg:w-[22%]">
                    <div
                      className={`grid grid-cols-1 gap-4 bg-gray-400 w-full h-[48px] overflow-hidden rounded-l-md`}
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
                  <div className="lg:col-span-7 col-span-7 w-[70%] lg:w-[78%]">
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
                      placeholder="Phone Number"
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
            </div>
            <div className="text-center pt-5 lg:mt-3 border-t border-gray-300">
              <Button
                text="Submit"
                disabled={false}
                isLoading={false}
                className="px-12 w-full"
              />
            </div>
            {errorMsg && (
              <div className="text-center mt-4">
                <p className="text-sm font-semibold text-danger">{errorMsg}</p>
              </div>
            )}
          </form>

          <BottomSheet
            isOpen={showOTPModal}
            setIsOpen={handleCloseReqCallback}
            onClose={() => {
              setShowOTPModal(false);
              setOtp('');
            }}
            title="Request a Callback"
            hasBtns={false}
          >
            <div className="w-full">
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                }}
                className="hidden lg:block absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                <p> Verify OTP </p>
              </div>

              <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                <p className="px-2 text-sm">
                  You will receive a 4-digit code for your phone number{' '}
                  {watch().phone_number}
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
                  text="Verify"
                  disabled={otp.toString().length < 4}
                  handleClick={handleSubmit(submitOtp)}
                  className="w-full"
                />
              </div>

              <div className="mb-8">
                <div className="mt-4 text-center">
                  {timer === END_TIMER ? (
                    <p
                      className=" cursor-pointer underline text-brand-primary"
                      onClick={() => {
                        resendOTP();
                        setOtp('');
                        setTimer(30);
                      }}
                    >
                      Resend OTP
                    </p>
                  ) : (
                    <p className="text-sm underline font-semibold">
                      Resend With <span className="">{`00:${timer}`}</span>
                    </p>
                  )}
                  {/* <p >Edit mobile number</p> */}
                </div>
              </div>
              <div className="text-center lg:px-4 px-0 mb-3 lg:mb-4 text-xs text-gray-100">
                <p>
                  By entering the OTP and clicking continue, I confirm that I
                  have read, understood and agree with the{' '}
                  <Link
                    to={'/terms-condition'}
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <a
                    href={
                      'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                    }
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </BottomSheet>
        </div>
      </BottomSheet>

      <Modal
        show={showSuccessModal}
        align={'center'}
        className="w-[85%] lg:w-[40%] relative border-t-4 border-brand-primary rounded-md overflow-hidden"
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

      <div
        onClick={handleOpenReqCallback}
        className="fixed left-0 bottom-[3%] z-30 bg-gradient-to-t from-[#92278F] via-[#D1527D] to-[#EA725B] font-bold text-white lg:py-10 py-6 px-2 lg:px-3 rounded-r-md cursor-pointer text-xxs lg:text-base"
        style={{ writingMode: 'sideways-lr' }}
      >
        Request a callback
      </div>
    </div>
  );
};

export default StickyRAC;
