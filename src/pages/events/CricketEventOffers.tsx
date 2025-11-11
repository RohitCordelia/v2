import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import Banner from '../../components/banner';
import { useForm } from 'react-hook-form';
import Modal from '../../components/UI/ModalCenter';
import Select from "react-select";
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import { Input } from '../../components/UI/Forms/Inputs';
import { Phone } from '../../../src/utils/validations/formValidations';
import OtpInput from 'react18-input-otp';
import Destination from './Destination/index';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

const banner = {
  images: [
    {
      url: 'http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-cricket-event-desktop.webp',
      link: '#',
      altTag: 'Cricket Event Offers'
    },
  ],
  mobileImages: [
    {
      url: 'http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-cricket-event-mobile.webp',
      link: '#',
      altTag: 'Cricket Event Offers'
    },
  ]
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px'

const CricketEventOffers = () => {
  const [leadId, setLeadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [success, setSuccess] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [country, setCountry] = useState('+91');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [otpError, setOtpError] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpReqId, setOtpReqId] = useState<any>();

  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  var [timer, setTimer] = useState<number>(30);
  const TIMER_DURATION = 30
  const END_TIMER = 0
  const currentUrl = window.location.href;


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const customStyles = {
    control: (styles: any, { isDisabled }: any) => ({
      ...styles,
      backgroundColor: isDisabled ? 'rgb(232, 240, 254)' : '#f5f5f5',
      height: '48px', border: 0
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
      ...base, zIndex: 9999
    })
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const mobileValid = (event: any) => {
    if ((event.keyCode > 64 && event.keyCode < 91)) {
      event.preventDefault();
    }
  }

  const submitForm = (data: any) => {
    let link = document.location.href;
    const _payload = {
      phoneNumber: data.phone_number,
      website: link,
      pageCode: 'world_cup',
      fullName: data.name,
      email: data.email
    };

    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setShowOTPModal(true);
        setOtpReqId(response?.result?.requestId);
        // setSuccess(`Thank you for your details, sailor! Our cruise expert will contact you shortly.`)
      })
      .catch((response) => {
        setErrorMsg(response?.data?.message);
      })
  }

  const onSubmitOTP = (data: any) => {
    setPhoneNumber(data.phone_number);
    const _payload = { phoneNumber: data.phone_number, countryCode: country, website: window.location.href };
    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setShowOTP(true);
        setOtpReqId(response?.result?.requestId);
      })
      .catch((response) => {
        // setError('phone_number', { type: 'custom', message: 'Failed to send OTP' });
      })
  }
  const onVerifyOTP = () => {
    const sessionTime = getSessionTime()
    const _payload = {
      requestId: otpReqId,
      otp: otp,
      website: currentUrl,
      sessionTime: sessionTime
    };
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        sessionStorage.removeItem("_st");
        setLeadId(response.lead_id)
        setShowPhoneModal(false);
        setShowSuccessModal(true)
      })
      .catch((response) => {
        // setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
      })
  }
  const resendOTP = () => {
    setTimer(TIMER_DURATION);
    onSubmitOTP({ phone_number: phoneNumber })
  }

  const submitOtp = () => {
    const sessionTime = getSessionTime()
    const _payload = {
      requestId: otpReqId,
      otp: otp,
      website: window.location.href,
      sessionTime: sessionTime
    };
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        sessionStorage.removeItem("_st");
        setLeadId(response.lead_id)
        setShowOTPModal(false)
        setShowSuccessModal(true)
        setSuccess(`You are one step closer to your cruise vacation. Our experts will contact you shortly.`)
      })
      .catch((response) => {
        // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
      })
  }

  return (
    <Layout>
      <main className="my-[70px]">
        <section>
          <Banner data={banner} />
        </section>
        {leadId == null ?
          <>
            <form className='' onSubmit={handleSubmit(submitForm)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 lg:px-52 px-10">
                <div>
                  <label className='text-sm font-semibold text-gray-100'>Name</label>
                  <input
                    type='text'
                    placeholder='Name'
                    className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
                    {...register('name', { required: "Name is required." })}
                  />
                  {errors.name && <p className='text-xs text-danger'>{errors.name.message}</p>}
                </div>
                <div>
                  <label className='text-sm font-semibold text-gray-100'>Email Address</label>
                  <input
                    type='email'
                    placeholder='Email Address'
                    className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
                    {...register('email', {
                      required: "Email is required.",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Enter a valid email address."
                      }
                    })}
                  />
                  {errors.email && <p className='text-xs text-danger'>{errors.email.message}</p>}
                </div>
                <div>
                  <label className='text-sm font-semibold text-gray-100'>Mobile Number</label>
                  <input
                    type='text'
                    maxLength={10}
                    placeholder='Mobile number'
                    className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14'
                    {...register('phone_number', {
                      required: "Mobile number is required.",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit mobile number."
                      }
                    })}
                    onKeyDown={mobileValid}
                  />
                  {errors.phone_number && <p className='text-xs text-danger'>{errors.phone_number.message}</p>}
                </div>
              </div>
              <div className="text-center mt-4 lg:mt-3">
                <button
                  type="submit"
                  className="bg-brand-primary px-12 text-white text-sm py-3.5 font-bold rounded disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-elipses">Loading</span>
                  ) : (
                    'Know the Price'
                  )}
                </button>
              </div>
              {errorMsg &&
                <div className="text-center mt-4">
                  <p className="text-sm font-semibold text-danger">{errorMsg}</p>
                </div>
              }
            </form>

            <Modal
              show={showOTPModal}
              align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
              maxHeight='100vh'
            >
              <div className="w-full">
                <button
                  onClick={() => {
                    setShowOTPModal(false)
                    setOtp('');
                  }}
                  className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-[33px]">
                  <p> Verify OTP </p>
                </div>

                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                  <p className="px-2 text-sm">
                    You will receive a 4-digit code for your phone number {watch().phone_number}
                  </p>
                </div>
                <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                  <OtpInput
                    autoComplete="one-time-code"
                    // isDisabled={!showOTP}
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
                <div className="lg:px-10 px-4">
                  {/* <button
                    onClick={handleSubmit(submitOtp)}
                    className={`bg-brand-primary disabled:bg-brand-primary/60 w-full text-white text-sm py-3.5 px-8 rounded font-bold disabled:cursor-not-allowed`}
                    disabled={otp.toString().length < 4}
                  >
                    Verify
                  </button> */}
                  <Button text="Verify" disabled={otp.toString().length < 4} handleClick={handleSubmit(submitOtp)} className="w-full" />
                </div>

                <div className="mb-8">
                  <div className="mt-4 text-center">
                    {timer === END_TIMER ? (
                      <p
                        className=" cursor-pointer underline text-brand-primary"
                        onClick={() => {
                          resendOTP();
                          setOtp('');
                          setTimer(30)
                        }}
                      >
                        Resend OTP
                      </p>
                    ) : (
                      <p className="text-sm underline font-semibold">
                        Resend With{' '}
                        <span className="">{`00:${timer}`}</span>
                      </p>
                    )}
                    {/* <p >Edit mobile number</p> */}
                  </div>
                </div>
                <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                  <p className='text-xs lg:text-sm'>
                    By entering the OTP and clicking continue, I confirm that I have
                    read, understood and agree with the{' '}
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
          </>
          :
          null
        }
      </main>
      <section className="bg-white lg:py-12 py-0 text-center font-playfair lg:mx-24 p-6  mx-5 ">
        <div className="">
          <h1 className="text-[20px] lg:text-[40px]  leading-snug font-semibold">
            When Cricket Meets the Sea<span className='block' style={{ fontFamily: 'playfair' }}> Cheer for Team India and your favorite players aboard The Empress!</span>
          </h1>
          <p className="mt-6 text-[16px] lg:text-[32px] font-semibold font-playfair font-semibold">
            IND vs PAK Showdown
          </p>
          <p className="mt-4 text-[14px] lg:text-[24px] font-playfair font-semibold">
            Witness the thrill of cricket with stunning ocean views.
          </p>
          <p className="mt-4 text-[14px] lg:text-[24px] font-playfair">
            Sail. Celebrate. Cheer like never before!
          </p>
          <div className="mt-10 mb-[31px] lg:mb-0">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-ipl'25-cricket-image.svg"
              alt="Cricket on a cruise"
              className="mx-auto w-full max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* <section className="py-12 text-center font-playfair lg:mx-44 p-6  mx-5 rounded-md">
                <Destination />
                <div className="flex justify-center lg:mb-[130px] mb:0">
                    <a
                        href="/upcoming-cruises?da=25012025&db=30012026"
                        className="bg-brand-primary text-white px-6 py-4 mt-14 text-lg font-bold rounded-md"
                    >
                        BOOK YOUR CRUISE
                    </a>
                </div>
            </section> */}


      <div className="lg:pt-10 px-4 relative min-h-screen flex flex-col justify-between mb-[-61px] lg:mb-[-70px]">
        {/* Background Image for Desktop */}
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-ipl'25-itinerary-bg-desktop.webp"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover lg:block hidden"
          style={{
            zIndex: -1, // Keep image in the background
          }}
        />

        {/* Background Image for Mobile */}
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-ipl'25-itinerary-bg-mobile.webp"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover lg:hidden block"
          style={{
            zIndex: -1, // Keep image in the background
          }}
        />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-[22px] lg:text-[42px] font-bold mb-6 font-outfit text-white pt-10 lg:pt-0 text-center justify-center px-16 lg:px-0 lg:mt-[52px] mt-0">
              Cruise With Us on- February 23rd And 24th
            </p>
            <div className="w-full lg:w-[77%] mx-auto">
              <p className="text-[16px] lg:text-[24px] font-outfit leading-7 lg:leading-8 text-white text-center justify-center">
                1N | 23-24 Feb | Mumbai-At Sea-Mumbai
              </p>
            </div>
          </div>
          <div className='grid text-center justify-center lg:pb-[140px]'>
            <img
              src="http://images.cordeliacruises.com/cordelia_v2/public/images/cruise-ipl'25-itinerary-new-desktop.webp"
              alt=""
              className='hidden lg:block '
            />

            <img
              src="http://images.cordeliacruises.com/cordelia_v2/public/images/cruise-ipl'25-itinerary-new-mobile.webp"
              alt=""
              className='lg:hidden block'
            />


            <div className="flex text-center justify-center lg:mt-[50px] mt-20">

              <a
                href="/upcoming-cruises?da=22022025&db=24022025"
                className="bg-white text-black px-6 py-4 mb-14 lg:mt-[28px] text-lg font-bold rounded-md"
              >
                BOOK YOUR CRUISE
              </a>
            </div>
          </div>


        </div>
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/cruise-ipl'25-element-01.webp"
          alt=""
          className='hidden lg:block absolute left-0 bottom-[-35px]'
        />
      </div>
      <Modal show={showSuccessModal} align={'center'} className="w-[85%] lg:w-[40%] relative border-t-4 border-brand-primary" onClose={() => setShowSuccessModal(false)}>
        <div className='w-full h-full bg-white  shadow-lg'>
          <div className='p-2 border-b border-gray-300 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900 flex-grow text-center'>Success!</h2>
            <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='p-4 h-[100px]'>
            <p className='text-md text-gray-700 text-center'>{success}</p>
          </div>
        </div>
      </Modal>
      <Modal show={showPhoneModal} align={'center'} className="drop-shadow  w-[90%] mt-[26%] md:mt-[0px] lg:w-2/4 center top-1/3 lg:top-1/4 lg:left-1/4 h-screen lg:h-1/2 rounded-t-lg " onClose={() => setShowPhoneModal(false)}>
        <div className='py-8 px-6 bg-white rounded-md '>

          <div>
            <form>
              <button className="float-right font-black " onClick={() => setShowPhoneModal(false)}>X</button>
              <h2 className='text-xl font-bold'>Please verify mobile number to see your exclusive offers</h2>
              <p className='text-xs font-semibold mt-5'>Mobile Number</p>
              <div className="grid grid-cols-9 lg:grid-cols-9 gap-1 mt-1">
                <div className="lg:col-span-2 col-span-3">
                  <div className={`grid grid-cols-1 mb-6 `}>
                    <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                    <Select
                      // menuPortalTarget={document.body}
                      // menuPosition="fixed"
                      isDisabled={showOTP}
                      value={{ label: country }}
                      maxMenuHeight={190}
                      options={PhoneCode}
                      onChange={(item: any) => setCountry(item.value)}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-6">
                  <div className={`grid grid-cols-1 mb-4 relative `}>
                    <div className="grid grid-cols-1 relative">
                      <Input
                        disabled={showOTP}
                        onClickRightIcon={() => handleEditPhone()}
                        id="phone_number"
                        iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                        name="phone_number"
                        validation={Phone}
                        register={register}
                        inputClassName={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                        type="tel"
                        placeholder="Phone Number"
                        error={errors && errors.phone_number}
                        errorText={errors && errors.phone_number?.message}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mb-6 lg:mb-4'>
                <p className='text-xs font-semibold'>Enter OTP</p>
                <div className='flex justify-around mt-4 lg:mt-1'>
                  <OtpInput
                    autoComplete='one-time-code'
                    isDisabled={!showOTP}
                    value={otp}
                    onChange={(otp: string) => {
                      setOtp(otp);
                    }}
                    numInputs={4}
                    separator={<span className="px-5"></span>}
                    containerStyle="w-fit mx-auto"
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      color: "black",
                      fontSize: " 0.875rem",
                      borderRadius: 4,
                      border: "1px solid #E6E8EC",
                      backgroundColor: "#F5F5F5",
                    }}
                    isInputNum={true}
                  />
                </div>
              </div>
              {!showOTP &&
                <div className='w-full text-center'>
                  <button
                    onClick={handleSubmit(onSubmitOTP)}
                    className="font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                    Send OTP
                  </button>
                </div>
              }
            </form>

            {showOTP &&
              <div>
                <div className='mt-4 text-center'>
                  {timer === END_TIMER ? <p className='text-brand-primary' onClick={() => resendOTP()}>Resend OTP</p> : <p className='text-sm font-semibold'>Resend OTP in <span className='text-brand-primary'>{`00:${timer}`}</span></p>}
                  {/* <p >Edit mobile number</p> */}
                </div>
                <div className='w-full text-center'>
                  {errors && errors.otp && <p className="text-xs text-danger mt-1">{errors.otp?.message}</p>}
                  <button onClick={() => onVerifyOTP()} className="mt-4 text-center font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                    Verify
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CricketEventOffers;
