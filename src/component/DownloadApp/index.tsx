import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneCode from "/src/components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '/src/services/auth/auth';
// import { TiggerGAClickEvent } from "../../components/Analytics/events";

export type RegistrationFormFields = {
    phoneNumber: string;
};

const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#f5f5f5', height: '48px', border: 0 }),
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
    })
};

type Props = {};

export default function DownloadApp({ }: Props) {
    const [sendMessage] = useSendMessageMutation();
    const [country, setCountry] = useState('+91');
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<RegistrationFormFields>({
        mode: 'onChange',
        defaultValues: {
            phoneNumber: ""
        }
    });

    useEffect(() => {
        if (submitted) {
            reset({
                phoneNumber: ""
            });
        }
    }, [submitted]);

    const onSubmit = (contact: any) => {
        const _payload = { phone: contact.phoneNumber, template: 'send_app_link' };
        sendMessage(_payload)
            .unwrap()
            .then((response: any) => {
                setSubmitted(true);
            })
            .catch((response: any) => {
                console.log('reserr', response);
            })
    }
    return (
        <div className="">
            <div className='grid grid-cols-5'>
                <div className='relative col-span-5 lg:col-span-2'>
                    <div className='absolute lg:-right-16 lg:-top-12 -top-56'>
                        <img className='lg:w-[500px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/app-image-new-desktop.webp" alt="Download Cordelia cruise App"
                        title='Cordelia-App' />
                    </div>
                </div>
                <div className='bg-brand-secondary/10 lg:pl-32 lg:pr-48 py-10 col-span-5 lg:col-span-3 text-center lg:text-left pt-32 lg:pt-10'>
                    <h2 className='text-xl lg:text-4xl font-semibold'>Download</h2>
                    <h2 className='text-xl lg:text-4xl font-semibold mt-3 mb-5'>Cordelia Xperience App</h2>
                    <form className='hidden lg:block' onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <div className='grid grid-cols-8'>
                                <div className='col-span-5'>
                                    <input
                                        className='py-4 px-4 w-full rounded-l focus:outline-none'
                                        placeholder="Mobile Number"
                                        {...register("phoneNumber", {
                                            required: true, minLength: 10,
                                            maxLength: 10
                                        })}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <button className='py-4 px-4 bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white rounded-r'>Get App</button>
                                </div>
                            </div>
                        </div>
                        {errors && errors.phoneNumber && <p className='text-sm mt-1 text-danger'>Enter 10 digit mobile number.</p>}
                        {submitted && <p className="text-brand-primary text-ls mt-1">App link has sent to your mobile number.</p>}
                    </form>
                    <div className='flex mt-6 justify-center lg:justify-start'>
                        <a
                            // onClick={() => TiggerGAClickEvent({ event: `download_app`, type: "side_menu" })}
                            target='_blank' href="https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp"
                        >
                            <img className='mr-4' src="https://images.cordeliacruises.com/cordelia_v2/public/images/google-play-store-logo.webp" alt="Download app from Play store"
                            title='Download-Cordelia-App' />
                        </a>
                        <a
                            // onClick={() => TiggerGAClickEvent({ event: `download_app`, type: "side_menu" })}
                            target='_blank' href="https://apps.apple.com/in/app/cordelia-cruises/id1589910857"
                        >
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/apple-app-store-logo.webp" alt="Download app from app store"
                            title='Download-Cordelia-App' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
