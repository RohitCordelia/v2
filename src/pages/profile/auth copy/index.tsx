import React, { ReactNode, useEffect, useState } from 'react';
import Modal from '../../../components/UI/Modal';
import { Layout } from '../../../components/Layout';
import Select from 'react-select';
import PhoneCode from '../../../components/UI/Forms/Inputs/phoneCodes.json';
import { useForm } from 'react-hook-form';
import OtpInput from 'react18-input-otp';
import { Input } from '../../../components/UI/Forms/Inputs';
import {
  FirstName,
  LastName,
  Phone,
  Email,
  date,
} from '../../../utils/validations/formValidations';
import { useSendOTPMutation, useVerifyOTPMutation } from '../../../services/auth/auth';
import { useUpdateUserProfileMutation, useGetUserProfileMutation } from '../../../services/profile/profile';
import { SaveAuth, SaveContact } from '../../../utils/store/store';
import { indicatorSeparatorCSS } from 'react-select/dist/declarations/src/components/indicators';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button';
import { TiggerGAForm } from '../../../components/Analytics/events';
import { getCurrentUrlWithCampaign } from '../../../utils/user/user';

type Props = {
  setAuthModal: any;
  authModal: any;
  setToken: any;
  token: any;
  type?: string;
  selectedItinerary?: string;
};

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f5f5f5',
    height: '48px',
    border: 10,
    // border: 'none', // Remove border
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
    marginRight: '-36px', // Add your desired left margin here
  }),
};
export type RegistrationFormFields = {
  phone_number: any;
};

export default function ProfileAuth({ setAuthModal, authModal, setToken, token, type, selectedItinerary }: Props) {
  const END_TIMER = 0;
  const [showType, setShowType] = useState('mobile');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showOTP, setShowOTP] = useState(true);
  const [resendTimer, setResendTimer] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otp, setOtp] = useState('');
  const [country, setCountry] = useState('+91');
  var [timer, setTimer] = useState<number>(30);

  const [phoneNumber, setPhoneNumber] = useState('')
  const [record, setRecord] = useState({
    dob: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: ""
  })

  const [numRecord, setNumRecord] = useState({
    dob: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: ""
  })


  const [sendOTP] = useSendOTPMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation()
  const [verifyOTP] = useVerifyOTPMutation();
  const [userProfile, setUserProfile] = useState({})
  const [profileData, setProfileData] = useState<any>([]);
  const navigate = useNavigate();

  let userData: any = JSON.parse(localStorage.getItem('auth'));
  const [getUserProfile] = useGetUserProfileMutation()

  const getBookingData = async () => {
    await getUserProfile(userData?.lead_id)
      .unwrap()
      .then((res: any) => {
        setProfileData(res)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  useEffect(() => {
    getBookingData()
  }, [])

  const fName = profileData?.first_name;
  const lName = profileData?.last_name;
  const userEmail = profileData?.email;
  const userDob = profileData?.dob;
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
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
  
  function getCleanedUTMUrl() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const seenKeys = new Set();
    const result = {};
  
    for (const [key, value] of params.entries()) {
      if (!seenKeys.has(key)) {
        result[key] = value;
        seenKeys.add(key);
      }
    }
  
    const cleanQuery = new URLSearchParams(result).toString();
    const cleanedUrl = `${url.origin}${url.pathname}?${cleanQuery}`;
  
    return { utmParams: result, cleanedUrl };
  }
  
  const submitData = (data: any) => {
    const cleanedUrl = getCurrentUrlWithCampaign();
    // const { cleanedUrl } = getCleanedUTMUrl();

    data.phone_number = phoneNum
    setPhoneNumber(data?.phone_number)
    const _payload = { phone_number: data.phone_number, website: cleanedUrl || window.location.href, country_code: country, itinerary_id: selectedItinerary };
    sendOTP(_payload)
      .unwrap()
      .then((response) => {
        setShowOTPModal(true);
        setAuthModal(false);
      })
      .catch((response) => {
        setError('phone_number', { type: 'custom', message: response?.data?.message || 'Enter valid 10 digit mobile number' });
      })
  };


  useEffect(() => {
    if (showOTPModal) {
      if (timer && timer !== END_TIMER) {
        var tempTimer = setInterval(
          () => setTimer(timer - 1),
          1000
        );
        return function cleanup() {
          clearInterval(tempTimer);
          setResendTimer(false)
        };
      }
    }
  }, [showOTPModal, resendTimer, timer]);

  const resendOTP = () => {
    submitData({ phone_number: watch()?.phone_number, itinerary_id: selectedItinerary });
    // setTimer(TIMER_DURATION);
    // onSubmitOTP({ phone_number: phone_number })
  };
  const submitOtp = (data: any) => {
    data.phone_number = phoneNumber
    const cleanedUrl = getCurrentUrlWithCampaign();
    const _payload = { country_code: country, phone_number: data.phone_number, otp: otp, website: cleanedUrl };

    verifyOTP(_payload)
      .unwrap()
      .then((response) => {
        setShowOTPModal(false)
        SaveAuth(response)
        SaveContact({ data: data?.phone_number })
        if (response?.is_profile_completed) {
          setToken(true)
        }
        if (!response?.is_profile_completed && type !== "reveal") {
          setShowDetailModal(true)
          setToken(true)
        }
        getBookingData()
        TiggerGAForm(data)

        selectedItinerary && navigate(0);
        // custom event
        window.dispatchEvent(new Event("authChanged"));
      })
      .catch((response) => {
        setOtpError(response?.data?.message)
      })
    // setShowOTPModal(false)
    // setShowDetailModal(true)

  }
  const submitDetailData = (data: any) => {
    const _payload = { id: userData.lead_id, data: data };
    updateUserProfile(_payload)
      .unwrap()
      .then((response) => {
        setShowDetailModal(false)
        // setToken(true)  
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const mobileValid = (event: any) => {
    if ((event.keyCode > 64 && event.keyCode < 91)) {
      event.preventDefault();
    }
  }
  useEffect(() => {
    if (fName) {
      setValue('first_name', fName);
    }
  }, [fName, setValue]);
  useEffect(() => {
    if (lName) {
      setValue('last_name', lName);
    }
  }, [lName, setValue]);

  useEffect(() => {
    if (userEmail) {
      setValue('email', userEmail);
    }
  }, [userEmail, setValue]);

  useEffect(() => {
    if (userDob) {
      setValue('dob', userDob);
    }
  }, [userDob, setValue]);

  let otpWidth = window.innerWidth > 640 ? '10px' : '3px'
  const phoneNum = watch('phone_number');

  return (
    <>
      <Modal
        show={authModal}
        align={'center'}
        className="drop-shadow bg-white w-[90%] lg:w-2/6 center  lg:top-1/5 lg:bottom-1/6 lg:left-1/3 left-4 lg:h-auto rounded-lg lg:rounded-lg border mt-20"
        onClose={() => setAuthModal(true)}
      >
        <div
          className=" p-1 flex justify-end  items-center"
          onClick={() => setAuthModal(false)}
        >
          <div className="self-center mr-3 mt-3 font-bold cursor-pointer">
            <img className='w-4 h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg' alt='closeIcon' />

          </div>
        </div>
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
          {/* <button
            disabled
            className={`${showType !== 'email'
                ? 'bg-white border border-gray-100'
                : 'bg-brand-primary text-white'
              } disabled:cursor-not-allowed rounded-l cursor-pointer text-sm lg:text-sm px-4 py-3 h-10  lg:px-6 lg:py-2.5 font-bold`}
            onClick={() => setShowType('email')}
          // disabled={!areGuestSelected(room)}
          >
            Email
          </button> */}
          {/* <button
            className={`${showType !== 'mobile'
                ? 'bg-white border border-gray-100'
                : 'bg-brand-primary text-white'
              } disabled:cursor-not-allowed rounded-r cursor-pointer text-xs lg:text-sm px-4 py-1  h-10 lg:px-6 lg:py-2.5 font-bold`}
            onClick={() => setShowType('mobile')}
          // disabled={!areGuestSelected(room)}
          >
            Mobile
          </button> */}
        </div>
        <div className="text-center lg:px-16 px-8 mt-3 lg:mt-4">
          <p className="px-2 text-sm">
            You will receive a 4-digit code for your mobile number verification.
          </p>
        </div>
        <div className="grid grid-cols-9 lg:grid-cols-9 lg:px-12 px-4 my-4">
          <div className="lg:col-span-2 col-span-2">
            <div className={`grid grid-cols-1 `}>
              <input type='hidden' id="zc_gad" name="zc_gad" value="" />
              <Select
                menuPortalTarget={document.body}
                // menuPosition={'fixed'}
                value={{ label: country }}
                maxMenuHeight={290}
                options={PhoneCode}
                onChange={item => setCountry(item?.value)}
                styles={customStyles}
              />
            </div>
          </div>
          <div className="lg:col-span-7 col-span-7">
            <div className={`grid grid-cols-1 relative `}>
              <div className="grid grid-cols-1 relative">
                {/* <input
          id="phone_number"
          iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
          name="phone_number"
          {...register('phone_number', {
            required: "Please enter a valid mobile number",
            pattern: {
              value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 10-12 digits
              message: "Please enter a valid mobile number",
            },
            maxLength: country === "+91" ? 10 : 12,
          })}
          maxLength={country === "+91" ? 10 : 12}
          className="rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2"
          type="tel"
          placeholder="Phone Number"
        /> */}
                <input
                  id="phone_number"
                  iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                  name="phone_number"
                  {...register('phone_number', {
                    required: "Please enter a valid mobile number",
                    pattern: {
                      value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                      message: "Please enter a valid mobile number",
                    },
                    maxLength: country === "+91" ? 10 : 12, // Set maxLength to 10 for +91 and 12 for others
                  })}
                  maxLength={country === "+91" ? 10 : 12} // Ensure that maxLength is correctly set
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
          <Button text='Continue' handleClick={() => phoneNum.length >= 6 && country != "+91" ? submitData(numRecord) : handleSubmit(submitData)()} className='w-full' />
        </div>
        <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
          <p>
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
        {/* <div className="flex flex-wrap justify-center items-center mt-5">
          <div className="border-b my-3 w-24 border-black"></div>
          <p className="mx-4">or</p>{' '}
          <div className="border-b my-3 w-24 border-black"></div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center items-center mb-4 mt-5">
          <img
            className="cursor-pointer"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/google-new-login.svg"
            alt="googleIcon"
          />
          <img
            className="cursor-pointer"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fb-new-login.svg"
            alt="faceBookIcon"
          />
          <img
            className="cursor-pointer"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/x-new-login.svg"
            alt="tweeterIcon"
          />
        </div> */}
      </Modal>
      <Modal
        show={showOTPModal}
        align={'center'}
        className="drop-shadow bg-white w-[90%]  lg:w-2/6 center  lg:top-1/5 lg:bottom-1/6
     lg:left-1/3 left-4 lg:h-auto rounded-lg lg:rounded-lg border mt-20"
      // onClose={() => setShowOTPModal(false)}
      >
        <div
          className=" p-1 flex justify-start  items-center"
          onClick={() => {
            setShowOTPModal(false)
            setAuthModal(true)
            setOtp('');
          }}
        >
          <div className="self-center mt-4 ml-3 font-bold cursor-pointer">
            <img src='https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/cordelia_v2/public/assets/back-arrow-icon.svg' alt='backIcon' />
          </div>
        </div>
        <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3">
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
          <Button text='Verify' disabled={otp.toString().length < 4} handleClick={() => {
              if (phoneNumber?.length !== 10) {
                submitOtp(record);
              } else {
                handleSubmit(submitOtp)();
              }
            }} className='w-full' />
        </div>
        {showOTP && (
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
        )}
        <div className="text-center lg:px-8 px-4 mb-3 lg:mb-4 text-xs text-gray-100">
          <p>
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
      </Modal>
      <Modal
        show={showDetailModal}
        align={'center'}
        className="drop-shadow bg-white w-[90%] lg:w-2/6 center  lg:top-1/5 lg:bottom-1/6
     lg:left-1/3 left-4 lg:h-auto rounded-lg lg:rounded-lg border mt-20"
        onClose={() => setShowDetailModal(true)}
      >
        <div
          className=" p-1 flex justify-end  items-center"
          onClick={() => setShowDetailModal(false)}
        >
          <div className="self-center mr-3 mt-3 font-bold cursor-pointer">
            <img className='w-4 h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg' alt='closeIcon' />

          </div>
        </div>

        <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3">
          <p> Let’s get started </p>
        </div>
        <div className='mt-4 mx-8' >
          <Input
            type="text"
            register={register}
            validation={FirstName}
            onChange={(e: any) => setValue('first_name', e.target.value)}
            name="first_name"
            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="First Name"
            error={errors && errors?.first_name && errors?.first_name}
            errorText={errors && errors?.first_name?.message}
          />
        </div>
        <div className='mt-4 mx-8' >
          <Input
            type="text"
            register={register}
            validation={LastName}
            onChange={(e: any) => setValue('last_name', e.target.value)}
            name="last_name"
            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="Last Name"
            error={errors && errors?.last_name && errors?.last_name}
            errorText={errors && errors?.last_name?.message}
          />
        </div>
        <div className='mt-4 mx-8' >
          <Input
            type="email"
            register={register}
            validation={Email}
            onChange={(e: any) => setValue('email', e.target.value)}
            name="email"
            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="Email"
            error={
              errors &&
              errors?.email
            }
            errorText={errors && errors?.email?.message}
          />
        </div>
        <div className="grid grid-cols-10 px-8 mt-3 lg:grid-cols-9">
          <div className="lg:col-span-2 col-span-3">
            <div className={`grid grid-cols-1 `}>
              <Select
                menuPortalTarget={document.body}
                // menuPosition={'fixed'}
                isDisabled={true}
                value={{ label: country }}
                maxMenuHeight={290}
                options={PhoneCode}
                // onChange={item => setCountry(item.value)}
                styles={customStyles}
              />
            </div>
          </div>
          <div className="lg:col-span-7 col-span-7">
            <div className={`grid grid-cols-1 relative `}>
              <div className="grid grid-cols-1 relative">
                <div>
                  <input
                    disabled
                    className={`border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full`}
                    type="text"
                    placeholder="Phone Number"
                    {...register('phone_number', {
                      required: true,
                      minLength: 10,
                      maxLength: 10
                    })}
                  ></input>
                  <div>
                    {errors && errors.phone_number && country === "+91" && (
                      <p className="text-sm mt-1 text-danger">
                        Enter 10 digit mobile number.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 mx-8' >
          <Input
            // defaultValue={tempData !== null ? DateFormate(tempData.passport_issue_date) : null}
            type='date'
            max='9999-12-31'
            validation={date}
            register={register}
            name={`dob`}
            inputClassName="border-0 bg-gray-400 text-gray-100 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="DOB"
            error={
              errors && errors?.dob
            }
            errorText="Please enter a valid date"
          />
        </div>


        <div className="px-8">
          <Button text='Continue' handleClick={handleSubmit(submitDetailData)} className='w-full' />
        </div>
        <div className='mt-4 text-center text-gray-100 underline cursor-pointer font-semibold mb-4 mx-8' onClick={() => { setShowDetailModal(false) }} >
          Skip
        </div>
      </Modal>
    </>
  );
}