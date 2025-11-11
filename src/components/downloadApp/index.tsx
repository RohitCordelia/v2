import React, { useState, useEffect } from 'react';
import PhoneCode from "/src/components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '/src/services/auth/auth';
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

export default function DownloadApp() {
    const [sendMessage] = useSendMessageMutation();
    const [country, setCountry] = useState('+91');
    const [submitted, setSubmitted] = useState(false);
    let bannerBackground = {
        backgroundImage: `url(https://images.cordeliacruises.com/cordelia_v2/public/images/download-cordelia-app-desktop.webp)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '100%'
    }

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
        const _payload = { phone: contact.phoneNumber, country_code: country, template: 'send_app_link' };
        sendMessage(_payload)
            .unwrap()
            .then((response) => {
                setSubmitted(true);
            })
            .catch((response) => {
                console.log('reserr', response);
            })
    }
    return (
        <div className="container mx-auto my-12 mb-40 border rounded-xl" style={bannerBackground}>
            <div className="m-4 grid grid-cols-9 gap-10 min-h-[380px]">
                <div className='col-span-5 px-6 py-14 flex items-center'>
                    <div>
                        <h3 className="text-4xl text-white mb-4 font-medium">
                            Download <br /> Cordelia Xperience App
                        </h3>
                        <p className="text-sm leading-7 mb-4 text-white">
                            The Perfect Cruise Getaway is Just a Click Away! Download the Cordelia Xperience App and plan your dream cruise getaway. Sailings, Entertainment, Shores, & more! Explore it all on the Cordelia Xperience app.
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                                <div className="lg:col-span-2 col-span-3">
                                    <div className={`grid grid-cols-1 `}>
                                        <Select
                                            menuPortalTarget={document.body}
                                            menuPosition={'fixed'}
                                            value={{ label: country }}
                                            maxMenuHeight={190}
                                            options={PhoneCode}
                                            onChange={item => setCountry(item.value)}
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-8 lg:col-span-7 col-span-7'>
                                    <div className='col-span-6'>
                                        <input
                                            className='py-3 px-4 w-full rounded-l focus:outline-none'
                                            placeholder="Mobile Number"
                                            {...register("phoneNumber", {
                                                required: true, minLength: 10,
                                                maxLength: 10
                                            })}
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <button className='py-3 px-4 bg-brand-secondary text-white rounded-r'>Get App</button>
                                    </div>
                                </div>
                            </div>
                            {errors && errors.phoneNumber && <p className='text-sm mt-1 text-white'>Enter 10 digit mobile number.</p>}
                            {submitted && <div className="text-center text-ls text-j-black">
                                <div
                                    className="flex justify-center items-center mt-4"
                                    style={{ maxHeight: "100%" }}
                                >
                                    <img
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-success-icon.svg"
                                        className="h-8 mr-2"
                                        alt="Cruise"
                                    />
                                    <div className="text-white">App link has sent to your mobile number.</div>
                                </div>
                            </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
