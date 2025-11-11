import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import Banner from '../../components/banner';
import { useForm } from 'react-hook-form';
import Modal from '../../components/UI/ModalCenter';
import OtpInput from 'react18-input-otp';
import Modal2 from "../../components/UI/ModalCenter";
import Destination from './Destination/index';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

const banner = {
  images: [
    {
      url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-event-banner-jan%2725-desktop.webp',
      link: '#',
      altTag: 'National Tourism Day'
    },
  ],
  mobileImages: [
    {
      url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-event-banner-jan%2725-mobile.webp',
      link: '#',
      altTag: 'National Tourism Day'
    },
  ]
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px'

const NationalTourismDay = () => {
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


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


  const mobileValid = (event: any) => {
    if ((event.keyCode > 64 && event.keyCode < 91)) {
      event.preventDefault();
    }
  }

  const submitForm = (data: any) => {
    let link = document.location.href;
    const cleanedUrl = getCurrentUrlWithCampaign();
    const _payload = {
      phoneNumber: data.phone_number,
      website: cleanedUrl,
      pageCode: 'national_tourism_day',
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

    // exitIntent(_payload)
    //   .unwrap()
    //   .then((res: any) => {
    //     setLoading(false)
    //     setShowPhoneModal(true)
    //     setSuccess(`Thank you for your details, sailor! Our cruise expert will contact you shortly.`)
    //   })
    //   .catch((res: any) => {
    //     setLoading(false)
    //     // console.log('Error: ', res)
    //   })
  }



  const onSubmitOTP = (data: any) => {
    setPhoneNumber(data.phone_number);
    const cleanedUrl = getCurrentUrlWithCampaign();
    const _payload = { phoneNumber: data.phone_number, countryCode: country, website: cleanedUrl || window.location.href };
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
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/tourism%2725-bg-desktop.webp"
          alt="Tourism 2025"
          className="absolute top-0 left-0 w-full h-full object-contain lg:block hidden"
        />
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/tourism%2725-bg-mobile.webp"
          alt="Tourism 2025"
          className="absolute top-0 left-0 w-full h-full object-contain lg:hidden block"
        />

        <div className="relative z-10 lg:mx-44 mt-18 flex flex-col items-center justify-center px-6 lg:px-0">
          <div className="text-center">
            <h1 className="text-[20px] lg:text-[42px] text-black mb-4 lg:mb-36 font-playfair leading-normal">
              An exclusive celebration for the{" "}
              <span className="text-[#E12C2E] text-[20px] lg:text-[42px] text-black mb-4 lg:mb-36 font-playfair leading-normal" style={{fontFamily:'Playfair Display'}}>tourism and hospitality trade!</span>
            </h1>

            <div className="flex justify-center items-center ">
              <p className="font-playfair text-[16px] lg:text-[26px] text-black max-w-4xl mx-auto text-justify-center lg:mt-[-110px] leading-[1.50] font-semibold">
                This National Tourism Day, enjoy incredible savings on 25 reserved
                interior cabins. Experience the joy of cruising as you set sail on an
                adventure starting 25th January 2025.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center mb-[175px] ">
            <h2 className="text-[22px] lg:text-[42px] font-semibold text-black mb-8">
              National Tourism Day Exclusive
            </h2>

            <ul className="text-left text-base lg:text-lg text-black space-y-4 max-w-4xl mx-auto leading-relaxed">
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">🌟</span>
                <div className='text-[16px] lg:text-[24px] w-full leading-[1.75]'>
                  The Offer Begins{" "}
                  <span className="font-semibold">On 25th January 2025</span> And Is
                  Applicable To All Sailings Starting From 25th January.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">🌟</span>
                <div className='text-[16px] lg:text-[24px] w-full leading-[1.75]'>
                  <span className="font-semibold">25 Interior Cabins</span> Will Be
                  Exclusively Reserved For Tourism And Hospitality Professionals.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">🌟</span>
                <div className='text-[16px] lg:text-[24px] w-full leading-[1.75]'>
                  These Cabins Will Be Available At A{" "}
                  <span className="font-semibold">Never Seen Before Price</span>.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">🌟</span>
                <div className='text-[16px] lg:text-[24px] w-full leading-[1.75]'>
                  Send Your Booking Request To{" "}
                  <a
                    href="mailto:Cruiseholidays@Cordeliacruises.com"
                    className="text-[#3D58DB] underline"
                  >
                    Cruiseholidays@Cordeliacruises.com
                  </a>{" "}
                  And Secure Your Spot For An Extraordinary Cruise Experience!
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-1 lg:mt-20">
        <Destination />
        <div className="flex justify-center lg:mb-[130px] mb:0">
          <a
            href="/upcoming-cruises?da=25012025&db=30012026"
            className="bg-brand-primary text-white px-6 py-4 mt-14 text-lg font-bold rounded-md"
          >
            BOOK YOUR CRUISE
          </a>
        </div>
      </section>

      {/* 
      <div className="lg:pt-14 px-4 relative h-screen lg:-mt-[60px] -mt-[63px] -mb-[63px] lg:-mb-[60px] lg:z-0 z-10">
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/tourism%2725-itinerary-bg-desktop.webp"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover lg:block hidden"
          style={{
            zIndex: -1, // Keep image in the background
          }}
        />
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/images/tourism%2725-itinerary-bg-mobile.webp"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover lg:hidden block"
          style={{
            zIndex: -1,
          }}
        />
        <div className="container mx-auto">
          <div className="lg:text-center mb-10 lg:mb-16">
            <p className="text-xl lg:text-3xl font-bold mb-6 font-outfit text-black pt-10 lg:pt-0 text-center justify-center">
              Cruise Journey on Jan 24th 2024 - Jan 27th 2024 (3N/4D)
            </p>
            <div className="w-full lg:w-[77%] mx-auto">
              <p className="text-sm lg:text-[18px] font-outfit leading-7 lg:leading-8 text-black text-center justify-center">
                If you think you’ve done all the Holi shenanigans, come aboard our premium cruise for a crazy surprise.
              </p>
            </div>
          </div>
          <div >
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/tourism'25-itinerary-desktop.webp"
              alt=""
              className='hidden lg:block'
            />

            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/tourism'25-itinerary-mobile.webp"
              alt=""
              className='lg:hidden block'
            />


            <div className="flex justify-center lg:mt-[40px] mt-0">
              <a
                href="/upcoming-cruises?itinerary_id=ee08b299-967e-486f-897c-9fc0d8bb1959"
                className="bg-white text-black px-6 py-4 mt-14 text-lg font-bold rounded-md"
              >
                BOOK YOUR CRUISE
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <Modal2 show={showSuccessModal} align={'center'} className="w-[85%] lg:w-[40%] relative border-t-4 border-brand-primary" onClose={() => setShowSuccessModal(false)}>
        <div className='w-full h-full bg-white shadow-lg'>
          <div className='p-2 border-b border-gray-300 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900 flex-grow text-center'>Success!</h2>
            <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='p-4 h-[100px]'>
            <p className='text-md text-gray-700 text-center font-semibold'>{success}</p>
          </div>
        </div>
      </Modal2>
    </Layout>
  );
};

export default NationalTourismDay;
