import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function Alcohal({ }: Props) {

    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <Layout>
            <main className="pt-14 pb-24 lg:pt-[70px] lg:pb-36">
                <div>
                    <img onClick={() => navigate('/upcoming-cruises')} className='cursor-pointer'
                        src={`${window.innerWidth > 640 ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-beverage-pack-desktop.webp' : 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-beverage-pack-mobile.webp'}`}
                        alt="" />
                </div>
                <div className='text-center bg-[#D9D9D9]/20 py-14 lg:py-16 mx-auto relative'>
                    <div className='w-[80%] lg:w-full mx-auto'>
                        <h1 className='text-xl lg:text-4xl'>Introducing our all-new beverage packages!</h1>
                    </div>
                    <div className='w-[85%] lg:w-[39%] mx-auto mt-6'>
                        <p className='text-sm lg:text-lg leading-6 lg:leading-8'>Just when you thought our luxury cruise couldn’t get any better, we stirred up even more excitement for your unforgettable voyage.</p>
                    </div>
                    <img className='absolute -bottom-10 lg:-bottom-20 lg:left-0 h-20 lg:h-44' src="https://images.cordeliacruises.com/cordelia_v2/public/images/Asset-01.webp" alt="" />
                </div>


                <div className='container mx-auto mt-16'>
                    <div className='w-[80%] lg:w-full mx-auto'>
                        <h1 className='text-xl capitalize lg:text-4xl text-center'>Choose from a range of beverage categories</h1>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 mt-12 shadow-xl rounded-xl px-3 lg:px-0 relative'>
                        <div className='rounded-t-xl lg:rounded-xl lg:rounded-tr-none' style={{
                            background: 'linear-gradient(180deg, #171717 0%, rgba(0, 0, 0, 0.99) 26.8%, rgba(47, 47, 47, 0.88) 32.16%, #989898 37.19%, rgba(253, 253, 253, 0.11) 53.02%, rgba(191, 191, 191, 0.11) 64.85%, #FEC759 71.47%, #FEE181 85.94%, #FEC34B 98.96%)'
                        }}>
                            <div className='flex justify-between items-center px-8 h-[120px] lg:h-[200px] relative'>
                                <div>
                                    <p className='text-lg lg:text-3xl uppercase font-semibold text-white'>Regular</p>
                                    <p className='text-sm lg:text-xl font-medium mt-1 lg:mt-2 text-white'>All-inclusive*</p>
                                </div>
                                <div className='absolute right-14'>
                                    <img className='w-[50px] lg:w-[85px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/regular-drink-image.webp" alt="" />
                                </div>
                            </div>
                            <div className='flex justify-between items-center px-8 h-[120px] lg:h-[200px] relative'>
                                <div>
                                    <p className='text-lg lg:text-3xl uppercase font-semibold'>PREMIUM</p>
                                    <p className='text-sm lg:text-xl font-medium mt-1 lg:mt-2'>Additional <span className='font-bold'>$30</span> per day*</p>
                                </div>
                                <div className='absolute right-14'>
                                    <img className='w-[50px] lg:w-[70px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/premium-drink-image.webp" alt="" />
                                </div>
                            </div>
                            <div className='flex justify-between items-center px-8 h-[120px] lg:h-[200px] relative'>
                                <div>
                                    <p className='text-lg lg:text-3xl uppercase font-semibold'>LUXURY</p>
                                    <p className='text-sm lg:text-xl font-medium mt-1 lg:mt-2'>Additional <span className='font-bold'>$55</span> per day*</p>
                                </div>
                                <div className='absolute right-6'>
                                    <img className='w-[100px] lg:w-[165px]' src="https://images.cordeliacruises.com/cordelia_v2/public/images/luxury-drink-image.webp" alt="" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='px-8 lg:px-14 py-8 lg:py-14 lg:rounded-tr-xl' style={{
                                backgroundImage: 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/beverages-background.webp")'
                            }}>
                                <p className='text-lg lg:text-3xl text-white font-semibold'>Beverages list</p>
                                <div className='grid grid-cols-2 mt-8'>
                                    <div>
                                        <div className='flex items-center'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Vodka</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Rum</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>GIN</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Whiskey</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Tequila</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex items-center'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Brandy</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Wines</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Beer</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Cocktails</p>
                                        </div>
                                        <div className='flex items-center mt-3 lg:mt-6'>
                                            <img className='h-5 mr-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/drink-icon.svg" alt="" />
                                            <p className='text-sm lg:text-xl text-white'>Mocktails</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='px-8 lg:px-14 py-8 lg:py-14'>
                                <p className='text-brand-primary italic font-bold text-xs lg:text-lg'><span className='text-black'>Important Note:</span> Premium and Luxury packages are available at an additional cost</p>
                            </div>
                        </div>
                        <img className='absolute -bottom-5 lg:-bottom-12 right-0 lg:-right-12 h-16 lg:h-48' src="https://images.cordeliacruises.com/cordelia_v2/public/images/Asset-02.webp" alt="" />
                    </div>
                    <div className='text-center mt-12 lg:mt-20'>
                        <a target='_blank' href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Alcohol-Package-T&C's.pdf" className='bg-brand-primary px-8 lg:px-10 py-3 lg:py-5 text-white rounded lg:rounded-lg font-semibold text-sm lg:text-2xl'>Check T&C's</a>
                    </div>
                </div>


                <div className='mt-16 lg:mt-36 container mx-auto px-4 lg:px-28'>
                    <div className='px-4 lg:px-10 pt-14 pb-20 relative rounded-lg' style={{
                        backgroundImage: innerWidth > 640 ? 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/things-remember-background.webp")' : 'url("https://images.cordeliacruises.com/cordelia_v2/public/images/things-remember-mobile-background.webp")'
                    }}>
                        <img className='absolute top-0 right-0 h-16 lg:h-44' src="https://images.cordeliacruises.com/cordelia_v2/public/images/things-element.webp" alt="" />
                        <h1 className='text-xl lg:text-3xl'>A few things to remember for a smooth sail</h1>
                        <ul className='mt-4 lg:mt-12 list-disc px-2'>
                            <li className='text-sm lg:text-xl'>Min age for onboard alcohol consumption is <span className='text-brand-primary font-semibold'>21 years.</span></li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'><span className='text-brand-primary font-semibold'>All occupants in a cabin</span> from the same group must book the <span className='text-brand-primary font-semibold'>all-Inclusive package</span></li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'><span className='text-brand-primary font-semibold'>Alcoholic drinks available</span> in any bar when the ship is not in port.</li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'>Choose from 10 beverage categories, upgrade to <span className='text-brand-primary font-semibold'>premium or luxury.</span></li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'><span className='text-brand-primary font-semibold'>Brand/ Item</span> mentioned may change subject to availability on the cruise without <span className='text-brand-primary font-semibold'>any prior intimation</span></li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'>Guest should strictly adhere to <span className='text-brand-primary font-semibold'>'Responsible service and consumption of alcohol'</span> policy.</li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'><span className='text-brand-primary font-semibold'>Cordelia reserves</span> a right to change <span className='text-brand-primary font-semibold'>rates or any item available</span> in the package without prior notice.</li>
                            <li className='text-sm lg:text-xl mt-4 lg:mt-7 lg:!leading-10'>Alcohol service will start only when the ship has sailed <span className='text-brand-primary font-semibold'>12 nautical miles</span> away from the coast.</li>
                        </ul>
                        <img className='absolute -bottom-7 lg:-bottom-14 h-20 lg:h-32' src="https://images.cordeliacruises.com/cordelia_v2/public/images/Asset-03.webp" alt="" />
                    </div>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}