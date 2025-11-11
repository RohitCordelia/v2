import React, { Suspense, useEffect, useState } from "react";
import './index.css'
import { Input } from '../../components/UI/Forms/Inputs';
import OtpInput from 'react18-input-otp';
import { Phone } from "/src/utils/validations/formValidations"
import { useForm } from 'react-hook-form';
import Header from "/src/component/Header";
type Props = {};


export default function AccountDelete(props: Props) {
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [accountDelete, setAccountDelete] = useState<any>(false);
    const [loading, setLoading] = useState<any>(false);

    const {
        setError,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            phone_number: "",
            otp: ""
        }
    });

    const handleEditPhone = () => {
        setShowOTP(false)
        setOtp("")
    }

    const onSubmitOTP = (data: any) => {
        setPhoneNumber(data.phone_number);
        const _payload = {
            phone_number: data.phone_number,
            country_code: '+91'
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_payload)
        };
        fetch(process.env.REACT_APP_API_URL + 'api/v2/mobile/auth/send_otp', options)
            .then(response => response.json())
            .then(data => {
                console.log('roh resp', data)
                setShowOTP(true)
            })
            .catch(error => console.error(error));
    }

    const resendOTP = () => {
        onSubmitOTP({ phone_number: phoneNumber })
    }

    const onVerifyOTP = () => {
        const _payload = { phone_number: phoneNumber, otp: otp };
        setLoading(true)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_payload)
        };
        fetch(process.env.REACT_APP_API_URL + 'api/v2/mobile/auth/verify_otp', options)
            .then(response => response.json())
            .then(data => {
                setToken(data.token)
                setShowOTP(true)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error(error)
            });
    }

    useEffect(() => {
        if (token) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: ''
            };
            setLoading(true)
            fetch(process.env.REACT_APP_API_URL + 'api/v2/mobile/auth/delete_account', options)
                .then(response => response.json())
                .then(data => {
                    console.log('roh delete_account', data)
                    setToken('')
                    setShowOTP(false)
                    setOtp('')
                    setPhoneNumber('')
                    setValue('phone_number', '')
                    setValue('otp', '')
                    setAccountDelete(true)
                    setLoading(false)
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                });
        }
    }, [token])

    console.log('roh aaaaa', accountDelete);


    return (
        <>
            <Header headerAnimation={false} isVideo={false} />
            <div className="h-screen flex flex-col items-center justify-center px-2" style={{
                background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)'
            }}>
                <div className="box-container grid lg:grid-cols-2">
                    <div className="px-6 lg:px-10 py-16 text-center">

                        {accountDelete ?
                            <>
                                <p className="text-xl font-bold font-outfit">OTP Verified</p>
                                <div className="flex justify-between flex-col items-center w-full mt-10">
                                    <img className="w-[150px]" src="https://images.cordeliacruises.com/cordelia_v2/public/assets/success-green-check-mark-icon.svg" alt="" />
                                    <p className="mt-5 text-xl text-gray-100 font-bold">Your account has been deleted</p>
                                </div>
                            </>
                            :
                            <>
                                <p className="text-xl font-bold font-outfit">OTP Verification</p>
                                <p className="text-sm font-outfit text-gray-600">We will send you an One Time Password on this number</p>
                                <form>
                                    <div className="mt-14">
                                        <Input
                                            disabled={showOTP}
                                            onClickRightIcon={() => handleEditPhone()}
                                            id="phone_number"
                                            iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                                            name="phone_number"
                                            validation={Phone}
                                            register={register}
                                            inputClassName={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border border-gray-300 shadow-allSide lg:mb-2`}
                                            type="tel"
                                            placeholder="Phone Number"
                                            error={errors && errors.phone_number}
                                            errorText={errors && errors.phone_number?.message}
                                        />
                                    </div>
                                    <div className='flex justify-around mt-4 lg:mt-1 px-10'>
                                        <OtpInput
                                            autoComplete='one-time-code'
                                            isDisabled={!showOTP}
                                            value={otp}
                                            onChange={(otp: string) => {
                                                setOtp(otp);
                                            }}
                                            numInputs={4}
                                            separator={<span className="px-2"></span>}
                                            containerStyle=" mx-auto"
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
                                    {!showOTP &&
                                        <div className='w-full text-center mt-6'>
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
                                        <div className='mt-4 text-center flex justify-center'>
                                            <p className="text-sm mr-2">Didn't receive OTP?</p>
                                            <p className='text-brand-primary text-sm font-bold cursor-pointer'
                                                onClick={() => resendOTP()}
                                            >Resend OTP</p>
                                        </div>
                                        <div className='w-full text-center'>
                                            {errors && errors.otp && <p className="text-xs text-danger mt-1">{errors.otp?.message}</p>}
                                            <button
                                                disabled={loading}
                                                onClick={() => onVerifyOTP()}
                                                className={`${loading ? 'bg-brand-primary/40' : ''} mt-4 text-center font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed`}
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <div className="bg-brand-primary rounded-l-[130px] text-center py-10 hidden lg:block">
                        <div className="text-white text-2xl font-outfit font-bold">Delete Your Account</div>
                        <div className="text-white text-sm mt-1">Verify phone number to delete.</div>
                        <div id="orbit-system">
                            <div className="system">
                                <div className="planet">
                                    <img src="http://orig02.deviantart.net/69ab/f/2013/106/0/4/sad_man_by_agiq-d61wk0d.png" height="200px" />
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-300 text-sm mb-5">For more information please </div>
                        <a onClick={() => window.location.replace("/?contact")} className="w-full border-2 border-white text-white px-8 py-2.5 rounded-full" href="#">Contact Us</a>
                    </div>
                </div>
            </div>
        </>
    );
}
