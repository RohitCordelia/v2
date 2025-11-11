import React, { useEffect, useState, useRef, ReactNode } from 'react';
import Layout from '../../component/Layout';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/ModalCenter';
// import RequestACallback from '../../components/RequestACallback';
import {
  BirthdayStep1,
  BirthdayStep2,
  BirthdayStep3,
  BirthdayStep4
} from '../../components/Icon';
import ItineraryTabs from './component/ItineraryTabs';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from 'react18-input-otp';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import PhoneCode from '../../components/UI/Forms/Inputs/phoneCodes.json';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import {
  useSendOTPMutation,
  useVerifyOTPMutation
} from '../../services/auth/auth';
import classNames from 'classnames';
import CountdownTimer from './component/CountdownTimer';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';

const offerSteps = [
  {
    icon: <BirthdayStep2 className="w-12 h-12 lg:w-24 lg:h-24" />,
    title: '4-in-1 Deal Reveal',
    desc: 'Get all 4 offers revealed upfront'
  },
  {
    icon: <BirthdayStep3 className="w-12 h-12 lg:w-24 lg:h-24" />,
    title: 'Pick the best cabins',
    desc: 'Lock the best cabins before they sell out'
  },
  {
    icon: <BirthdayStep4 className="w-12 h-12 lg:w-24 lg:h-24" />,
    title: 'Save more, instantly',
    desc: 'Enjoy exclusive Early Access savings'
  },
  {
    icon: <BirthdayStep1 className="w-12 h-12 lg:w-24 lg:h-24" />,
    title: 'Be First in Line',
    desc: 'Extra Birthday Bonus available for bookings during Aug 28 - Aug 31'
  }
];

const Birthday = () => {
  let navigate = useNavigate();

  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;
    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.top <= -750) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout footerClassName="!mt-0">
      <main className="mb-20 lg:mb-40">
        <div
          className="relative h-screen !bg-cover z-[2]"
          style={{
            background:
              innerWidth > 600
                ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/NewBGBday.webp)'
                : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/NewOnlyBGBannerMobile.webp)'
          }}
        >
          <div className="absolute top-[60%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5">
            <img
              src={
                innerWidth > 600
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/NewTextBday.webp'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/images/NewBgOnlyTextMobile.webp'
              }
              alt=""
            />
          </div>
          {/* <div ref={wrapperRef}></div>
          <div
            // className=" px-4 lg:px-0 flex justify-self-center lg:w-[85%]"
            className={classNames(
              'flex justify-between items-center py-4 shadow-all bg-white mx-auto z-50 px-4 !p-0 lg:px-0 justify-self-center ',
              {
                'fixed top-0 left-0 w-full px-14 rounded-none border-gray-100 lg:w-full shadow-allSide lg:!px-20':
                  isSticky && !isMobile,
                'rounded-xl px-4 border border-gray-100 absolute bottom-5 left-0 right-0 lg:bottom-8 w-[90%]':
                  !isSticky
              }
            )}
          >
            {isSticky && (
              <span
                className="bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text font-bold text-xl italic pr-1 basis-1/5 font-playfairDisplay"
                style={{ color: 'transparent' }}
              >
                Get Early Access
              </span>
            )}
            <RequestACallback
              showTitle={false}
              submitClassName="w-full rounded-full"
              desktopMode={innerWidth > 600}
              isBirthday={true}
              isSticky={isSticky}
            />
          </div> */}
          <div className="container flex justify-between items-center py-4 shadow-all bg-white mx-auto z-50 px-4 !p-0 lg:px-0 justify-self-center">
            <div
              className="px-4 text-center border border-gray-300 py-3 backdrop-blur-sm absolute bottom-0 left-1/2 -translate-x-1/2 text-black w-full rounded-none bg-[#fff6f6]"
              style={{
                boxShadow: '-20px 20px 20px 0px #dcdcdc1f inset'
              }}
            >
              <h1
                className="italic text-base lg:text-xl mb-2 font-bold font-openSans bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1 flex justify-center items-center gap-2"
                style={{ color: 'transparent' }}
              >
                Registration for Early Access is Now Closed
              </h1>
              <p className="text-sm lg:text-base font-medium">
                Missed it? Don't worry, the{' '}
                <span className="font-bold">
                  Public Sale starts 1 September
                </span>{' '}
                with a new offer revealed each week.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="lg:hidden flex justify-between items-center px-4 py-2 bg-white w-full fixed top-0 z-[1] shadow-md">
          <span
            className="bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text font-bold text-xl italic pr-1 font-playfairDisplay"
            style={{ color: 'transparent' }}
          >
            Get Early Access
          </span>
          <Button
            text="Sign Up"
            size="sm"
            handleClick={() => scrollTo(0, 0)}
            className="rounded-full"
          />
        </div> */}
        {/* <div className="hidden lg:flex justify-between items-center px-4 lg:px-20 py-2 bg-white w-full fixed top-[65px] z-[1] shadow-md">
          <span
            className="bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text font-bold text-xl italic pr-1 lg:basis-1/5"
            style={{ color: 'transparent' }}
          >
            Ready to Cruise?
          </span>
          <RequestACallback
            showTitle={false}
            submitClassName="w-full rounded-full"
            desktopMode={innerWidth > 600}
            isBirthday={true}
            isSticky={true}
          />
        </div> */}
        {showTimer && (
          <div className="flex flex-col justify-center items-center mt-8 px-4 lg:px-0 text-center">
            <h2 className="text-[22px] lg:text-3xl font-bold pb-4 lg:pb-6">
              Registration ends in:
            </h2>
            <CountdownTimer
              targetDate={new Date('2025-08-27T23:59:59')}
              onEnd={() => {
                setShowTimer(false);
                console.log('Countdown Finished!');
              }}
            />
            <div
              className="mt-2 lg:mt-4 flex justify-center rounded-md py-1.5 w-full lg:w-[40%]"
              style={{
                border: 'double 2px transparent',
                backgroundImage:
                  'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            >
              <p className="text-xs lg:text-sm">
                <span className="font-semibold">Early Access:</span> Aug 28 -
                Aug 31 | <span className="font-semibold">Public Sale:</span>{' '}
                Sept 1 - Sept 28
              </p>
              {/* {' | '}
              <p className="text-xxs">
                <span className="font-semibold">Public Sale:</span> Sept 1 -
                Sept 28
              </p> */}
            </div>
          </div>
        )}
        <div className="!bg-contain !bg-no-repeat pb-5 bg-none lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Birthday_BG_New_1.webp)]">
          <div className="bg-contain bg-no-repeat bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_BG_New_Mob.webp)] lg:bg-none">
            <div className="px-4 lg:py-11 lg:pb-16">
              <div className="pt-8 container mx-auto">
                <div className="text-center">
                  <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                    Why Join{' '}
                    <span
                      className="italic font-playfairDisplay font-extrabold block lg:inline bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                      style={{
                        color: 'transparent'
                      }}
                    >
                      Early Access?
                    </span>
                  </h2>
                  <p className="text-xxs lg:text-lg pb-8 lg:pb-20">
                    Your golden ticket to the biggest cruise celebration of the
                    year!
                  </p>
                </div>
                <div className="flex gap-3 lg:gap-4 flex-wrap">
                  {offerSteps.map((offerStep) => (
                    <div
                      key={offerStep.title}
                      className={`basis-[165px] lg:basis-[250px] flex flex-col flex-1 rounded-md border border-gray-300 text-center px-1.5 py-6 lg:p-6 backdrop-blur-sm transition-all ease-in duration-150 group`}
                      onClick={() => {}}
                      style={{
                        boxShadow: '-20px 20px 20px 0px #dcdcdc1f inset'
                      }}
                    >
                      <div className="mx-auto mb-5 lg:my-6">
                        {offerStep.icon}
                      </div>
                      <span className="text-sm lg:text-xl font-bold text-brand-primary">
                        {offerStep.title}
                      </span>
                      <p className="text-xs lg:text-base leading-5 pt-1.5">
                        {offerStep.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 mb-10 pt-10 rounded-md container mx-auto lg:px-0 lg:pt-0 lg:mb-32 overflow-hidden">
              <div className="rounded-md overflow-hidden">
                <img
                  src={
                    innerWidth > 600
                      ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/NewMidScrollWeb.webp'
                      : 'https://images.cordeliacruises.com/cordelia_v2/public/images/NewMidScrollBannerMobile.webp'
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="text-center px-4 container mx-auto">
            <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
              Find Your{' '}
              <span
                className="italic font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                style={{
                  color: 'transparent'
                }}
              >
                Perfect Sailing Escape
              </span>
            </h2>
            <p className="text-xxs lg:text-lg pb-8 lg:pb-20 lg:px-20">
              Pick your perfect sailing length and enjoy the best of
              destinations, entertainment, and luxury onboard.
            </p>
          </div>
          <div>
            <ItineraryTabs type='nights' />
          </div>
          <div className="mx-4">
            <div
              className="px-4 mt-10 container mx-auto rounded-md border border-gray-300 py-6 lg:p-6 backdrop-blur-sm bg-[#f5f5f5]"
              style={{
                boxShadow: '-20px 20px 20px 0px #dcdcdc1f inset'
              }}
            >
              <p className="text-base lg:text-xl font-bold">Note:</p>
              <ul className="text-xs lg:text-base">
                <li>
                  By registering, you agree to receive communications about
                  Cordelia Cruises' 4th Anniversary Sale and related offers.{' '}
                  <span className="block">
                    Refer to{' '}
                    <a
                      href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf"
                      target="_blank"
                      className="text-brand-primary font-semibold"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

// lead form

type Props = {
  titleClassName?: string;
  submitClassName?: string;
  btnStyle?: {};
  desktopMode?: boolean;
  showTitle?: boolean;
  isBirthday?: boolean;
  isSticky?: boolean;
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
    zIndex: 10001 // âœ… This is critical!
  })
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px';

const RequestACallback = ({
  titleClassName,
  submitClassName,
  btnStyle,
  desktopMode = false,
  showTitle = true,
  isBirthday = false,
  isSticky = false
}: Props) => {
  const [isSendOtpLoading, setIsSendOtpLoading] = useState(false);
  const [isVerifyLaoding, setIsVerifyLaoding] = useState(false);
  const [showRequestACallback, setShowRequestACallback] = useState(false);
  const [country, setCountry] = useState('+91');
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState<ReactNode>(null);
  const [failure, setFailure] = useState<ReactNode>(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [leadId, setLeadId] = useState(null);
  const [otpReqId, setOtpReqId] = useState<any>();
  const [timer, setTimer] = useState<number>(30);
  const END_TIMER = 0;

  // const [sendOTP] = useSendOTPMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

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
    setIsSendOtpLoading(true);
    setErrorMsg(null);
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      phoneNumber: data.phone_number,
      website: cleanedUrl || window.location.href,
      pageCode: 'cordelia_birthday',
      fullName: data.name,
      email: data.email,
      companyName: null,
      eventType: null,
      countryCode: country
    };
    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setIsSendOtpLoading(false);
        setShowOTPModal(true);
        setOtp('');
        setOtpReqId(response?.result?.requestId);
      })
      .catch((response) => {
        setErrorMsg(response?.data?.message);
      })
      .finally(() => setIsSendOtpLoading(false));
  };

  const submitOtp = () => {
    setIsVerifyLaoding(true);
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      // phoneNumber: watch().phone_number,
      // countryCode: country,
      requestId: otpReqId,
      otp: otp,
      website: cleanedUrl || window.location.href,
      pageCode: 'cordelia_birthday'
    };
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        setIsVerifyLaoding(false);
        setLeadId(response.lead_id);
        setShowOTPModal(false);
        handleCloseReqCallback();
        setShowSuccessModal(true);
        setSuccess(
          <>
            <span className="block text-4xl font-playfairDisplay">
              You're in! 🎉
            </span>
            <span className="block text-xl my-5">
              You'll get Early Access to all 4 offers from Aug 28 - Aug 31.
            </span>
            <span className="text-gray-200">
              Look out for an email/WhatsApp confirmation.
            </span>
          </>
        );
      })
      .catch((response) => {
        handleCloseReqCallback();
        setShowOTPModal(false);
        setShowFailureModal(true);
        setFailure(
          <>
            <span className="block text-xl my-5">
              You've already registered for Cordelia Cruises' Early Access - 4th
              Anniversary Sale.
            </span>
            <span className="block text-xl my-5">
              Stay tuned: We'll email and WhatsApp you the private link when it
              goes LIVE.
            </span>
          </>
        );
        // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
        // setErrorMsg(response?.data?.message);
      })
      .finally(() => setIsVerifyLaoding(false));
  };

  const resendOTP = () => {
    setOtp('');
    setOtpError('');
    setTimer(30);
    submitForm({ phone_number: watch()?.phone_number });
  };

  const handleCloseReqCallback = () => {
    setShowRequestACallback(false);
    setErrorMsg(null);
    clearErrors();
    reset();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-md">
        {showTitle && (
          <div
            className={`border-b border-gray-300 p-4 flex items-center justify-between ${
              desktopMode ? 'lg:justify-center' : ''
            }`}
          >
            <h1
              className={`text-2xl font-bold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text ${titleClassName}`}
              style={{ color: 'transparent' }}
            >
              Request a Callback
            </h1>
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
        <div
          className={desktopMode ? 'lg:py-4 lg:px-8 p-4' : 'p-4'}
          style={{ padding: isSticky ? '1rem 0 0 0' : undefined }}
        >
          <form className="text-gray-100" onSubmit={handleSubmit(submitForm)}>
            <div
              className={
                desktopMode
                  ? 'lg:flex lg:justify-between lg:gap-4 items-center'
                  : ''
              }
            >
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/4' : ''}`}>
                {!isSticky && (
                  <label className="text-sm font-semibold mb-1 block">
                    Full Name
                  </label>
                )}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('name', { required: 'Name is required.' })}
                />
                {errors.name && (
                  <p className="text-xs text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/3' : ''}`}>
                {!isSticky && (
                  <label className="text-sm font-semibold mb-1 block">
                    Email Address
                  </label>
                )}
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
                {!isSticky && (
                  <label className="text-sm font-semibold block mb-1">
                    Mobile Number
                  </label>
                )}
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
                <div
                  className={`text-center mt-4 ${
                    !isSticky ? 'lg:mt-3' : 'lg:mt-0 lg:mb-4'
                  }`}
                >
                  <Button
                    text="Sign Up"
                    size={desktopMode ? 'base' : 'sm'}
                    disabled={isSendOtpLoading}
                    isLoading={isSendOtpLoading}
                    className={`px-12 lg:w-max w-full ${submitClassName}`}
                    btnStyle={btnStyle}
                  />
                </div>
              )}
            </div>
            {!isBirthday && (
              <div className="text-center mt-4 lg:mt-3">
                <Button
                  text="Submit"
                  size={desktopMode ? 'base' : 'sm'}
                  disabled={false}
                  isLoading={false}
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

          <Modal
            show={showOTPModal}
            align={'center'}
            className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
            maxHeight="100vh"
          >
            <div className="w-full text-black relative">
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                }}
                className="absolute -top-3 right-4 text-3xl"
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
                  disabled={otp.toString().length < 4}
                  handleClick={handleSubmit(submitOtp)}
                  className="w-full"
                  isLoading={isVerifyLaoding}
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
                      <span className="underline">{`00:${String(timer).padStart(
                        2,
                        '0'
                      )}`}</span>
                    </p>
                  )}
                  {/* <p >Edit mobile number</p> */}
                </div>
              </div>
              <div className="text-center lg:px-4 px-0 mb-3 lg:mb-4 text-xs text-gray-100">
                <p>
                  By verifying, you agree to our{' '}
                  <Link
                    to={'/terms-condition'}
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    [Terms & Conditions]
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
        className="w-[85%] lg:w-[60%] relative rounded-lg overflow-hidden"
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
          <div
            className="min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-xl overflow-hidden"
            style={{
              border: 'double 4px transparent',
              backgroundImage:
                'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="flex justify-center mb-10">
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
      <Modal
        show={showFailureModal}
        align={'center'}
        className="w-[85%] lg:w-1/2 relative rounded-lg overflow-hidden"
        onClose={() => setShowFailureModal(false)}
      >
        <div className="w-full h-full bg-white shadow-lg">
          <div className="absolute right-3 top-3">
            <svg
              onClick={() => setShowFailureModal(false)}
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
          <div
            className="min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-lg overflow-hidden"
            style={{
              border: 'double 4px transparent',
              backgroundImage:
                'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="flex justify-center mb-5">
              {/* <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/icon_success_green.svg"
                alt="success_icon"
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M50 75C51.4166 75 52.605 74.52 53.565 73.56C54.525 72.6 55.0033 71.4133 55 70V50C55 48.5833 54.52 47.3967 53.56 46.44C52.6 45.4833 51.4133 45.0033 50 45C48.5866 44.9967 47.4 45.4767 46.44 46.44C45.48 47.4033 45 48.59 45 50V70C45 71.4166 45.48 72.605 46.44 73.565C47.4 74.525 48.5866 75.0033 50 75ZM50 35C51.4166 35 52.605 34.52 53.565 33.56C54.525 32.6 55.0033 31.4133 55 30C54.9966 28.5867 54.5166 27.4 53.56 26.44C52.6033 25.48 51.4166 25 50 25C48.5833 25 47.3966 25.48 46.44 26.44C45.4833 27.4 45.0033 28.5867 45 30C44.9966 31.4133 45.4766 32.6017 46.44 33.565C47.4033 34.5283 48.59 35.0067 50 35ZM50 100C43.0833 100 36.5833 98.6866 30.5 96.06C24.4167 93.4333 19.125 89.8716 14.625 85.375C10.125 80.8783 6.56334 75.5866 3.94 69.5C1.31667 63.4133 0.00333966 56.9133 6.32911e-06 50C-0.003327 43.0867 1.31001 36.5867 3.94 30.5C6.57 24.4133 10.1317 19.1217 14.625 14.625C19.1183 10.1283 24.41 6.56667 30.5 3.94C36.59 1.31333 43.09 0 50 0C56.91 0 63.41 1.31333 69.5 3.94C75.59 6.56667 80.8816 10.1283 85.375 14.625C89.8683 19.1217 93.4316 24.4133 96.0649 30.5C98.6983 36.5867 100.01 43.0867 99.9999 50C99.9899 56.9133 98.6766 63.4133 96.0599 69.5C93.4433 75.5866 89.8816 80.8783 85.375 85.375C80.8683 89.8716 75.5766 93.435 69.5 96.065C63.4233 98.695 56.9233 100.007 50 100Z"
                  fill="#008CFF"
                />
              </svg>
            </div>
            <p className="text-md text-gray-700 text-center font-semibold">
              {failure}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Birthday;
