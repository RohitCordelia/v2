import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../components/Layout';
import moment from 'moment';
type Props = {}

export default function Referral({ }: Props) {

    return (
        <Layout>
            <main className="mx-auto lg:pt-16 pt-14">
                <div className='h-[400px] bg-brand-primary flex flex-col items-center justify-center text-white text-center'>
                    <div className='w-[93%] lg:w-[50%] flex flex-col items-center justify-center'>
                        <h1 className='text-white text-2xl lg:text-[2.7rem] lg:leading-[3.8rem] font-semibold text-left'>Cordelia Cruises – Sail With Friends Referral Program</h1>
                        <p className='mt-4 text-lg text-left leading-8'>Cordelia Cruises' Referral Program allows booked guests to refer up to 5 friends and earn onboard credit for each successful referral. The program is designed to reward guests who share the joy of cruising with their loved ones.</p>
                    </div>
                </div>
                <div className='bg-[#fdf6f1] py-10'>
                    <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-allSide max-w-4xl mx-auto border border-gray-200/20">
                        <h2 className="text-4xl font-semibold text-[#c9377e] mb-4">Referrer Rewards</h2>
                        <p className="text-gray-700 mb-6 text-lg">
                            Referrers can earn onboard credit based on their cabin category for each successful referral.
                        </p>
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/20">
                            <div className="flex justify-between px-4 py-4 bg-white">
                                <h1 className="text-[#a02d6f] font-semibold text-xl">Interior Cabin</h1>
                                <p className="text-lg">₹2,000 onboard credit per successful referral</p>
                            </div>
                            <div className="flex justify-between px-4 py-4 bg-gray-100/20">
                                <h1 className="text-[#a02d6f] font-semibold text-xl">Ocean View Cabin</h1>
                                <p className="text-lg">₹3,000 onboard credit per successful referral</p>
                            </div>
                            <div className="flex justify-between px-4 py-4 bg-white">
                                <h1 className="text-[#a02d6f] font-semibold text-xl">Mini Suite</h1>
                                <p className="text-lg">₹5,000 onboard credit per successful referral</p>
                            </div>
                        </div>
                        <p className="mt-6 border-l-2 h-[60px] border-[#a02d6f] pl-4 text-lg flex flex-wrap items-center">
                            A maximum of 5 referrals per guest is allowed, with total onboard credit capped at ₹25,000.
                        </p>
                    </div>

                    <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-allSide max-w-4xl mx-auto border border-gray-200/20 mt-10">
                        <h2 className="text-4xl font-semibold text-[#c9377e] mb-6">Referee Benefits</h2>

                        <div className='bg-brand-primary/10 rounded-2xl p-6'>
                            <h1 className='text-2xl font-semibold'>Discount on Base Cabin Fare</h1>
                            <p className="mt-3 text-lg">
                                Each referred guest will receive <span className="font-semibold"> 25% OFF </span> on their <span className="font-semibold"> base cabin fare </span> when they book online using a valid referral code.
                            </p>
                        </div>
                        <p className="text-gray-700 mt-6 text-lg">
                            The discount <span className='italic'>excludes taxes and add-ons.</span>
                        </p>
                    </div>

                    <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-allSide max-w-4xl mx-auto border border-gray-200/20 mt-10">
                        <h2 className="text-4xl font-semibold text-[#c9377e] mb-6">How It Works</h2>
                        <ul className='list-decimal px-4 text-[1.1rem]'>
                            <li className='mb-2'>Guests booked on an eligible Cordelia sailing will receive a <span className='font-semibold'>unique referral code</span> via WhatsApp.</li>
                            <li className='mb-2'>They can share this code with up to <span className='font-semibold'>5 friends or family members.</span></li>
                            <li className='mb-2'>Referred guests must book their cabin <span className='font-semibold'>online only</span> at <a className='text-brand-primary underline font-semibold' href='www.cordeliacruises.com'>www.cordeliacruises.com</a> using the referral code.</li>
                            <li className='mb-2'><span className='font-semibold'>Both the referrer and the referred guest must be booked on the same sailing</span> for the reward to apply.</li>
                            <li className='mb-2'>Once the referred guest’s booking is confirmed, the referrer’s <span className='font-semibold'>onboard credit</span> will be automatically loaded onto their <span className='font-semibold'>Cruise Card</span> at check-in.</li>
                        </ul>
                    </div>

                    <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-allSide max-w-4xl mx-auto border border-gray-200/20 mt-10">
                        <h2 className="text-4xl font-semibold text-[#c9377e] mb-6">Where Onboard Credit Can Be Used</h2>
                        <div className='grid lg:grid-cols-2 gap-6 mt-3'>
                            <div>
                                <h2 className="text-xl font-semibold text-[#c9377e] mb-3">Your onboard credit can be used for:</h2>
                                <ul className='list-disc px-4 text-[1.1rem]'>
                                    <li className='mb-2'>Spa treatments (massages, facials, salon services)</li>
                                    <li className='mb-2'>Speciality dining (Chopstix, Chef's Table, International Grill, etc.)</li>
                                    <li className='mb-2'>Beverage packages upgrade</li>
                                    <li className='mb-2'>Shore excursions</li>
                                    <li className='mb-2'>Gaming Arcade</li>
                                    <li className='mb-2'>Paid entertainment (such as Burlesque shows)</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#c9377e] mb-3">Onboard credit cannot be used for:</h2>
                                <ul className='list-disc px-4 text-[1.1rem]'>
                                    <li className='mb-2'>Onboard shopping (souvenirs, retail, etc.)</li>
                                    <li className='mb-2'>Spa product purchases</li>
                                    <li className='mb-2'>Mega Housie</li>
                                    <li className='mb-2'>Casino activities or credits</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-allSide max-w-4xl mx-auto border border-gray-200/20 mt-10">
                        <h2 className="text-4xl font-semibold text-[#c9377e] mb-6">Program Conditions</h2>
                        <ul className='list-decimal px-4 text-[1.1rem]'>
                            <li className='mb-2'>The referral benefit applies <span className='font-semibold'>only after the referred booking is confirmed.</span></li>
                            <li className='mb-2'>Each referral reward is linked to the <span className='font-semibold'>referrer's cabin category.</span></li>
                            <li className='mb-2'>Bookings made through OTAs, travel agents, group tours, or charters are <span className='font-semibold'>not eligible</span> for this program.</li>
                            <li className='mb-2'>Onboard credit is <span className='font-semibold'>non-transferable, non-encashable,</span> and must be used <span className='font-semibold'>during the same sailing.</span></li>
                            <li className='mb-2'>Any unutilized onboard credit will be forfeited after disembarkation.</li>
                            <li className='mb-2'>Cancellations or modifications of the referred guest’s booking will result in the associated onboard credit being voided.</li>
                            <li className='mb-2'>Cordelia Cruises reserves the right to change, modify, or discontinue the referral program at any time without prior notice.</li>
                        </ul>
                    </div>

                    <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-allSide max-w-4xl mx-auto border border-gray-200/20 mt-10">
                        <h2 className="text-4xl font-semibold text-[#c9377e] mb-6">Need Help?</h2>
                        <p className="text-gray-700 mb-6 text-lg">
                            If you have any questions or require assistance with the Sail With Friends Referral Program, please do not hesitate to reach out to Cordelia Cruises.
                        </p>
                        <div className='grid lg:grid-cols-2 gap-6 mt-3'>
                            <div>
                                <h2 className="text-xl font-semibold text-[#c9377e] mb-3">Call Us</h2>
                                <div className="flex items-center gap-2 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V8.414a1 1 0 01-.293.707L8.121 10.707a12.003 12.003 0 005.172 5.172l1.586-1.586a1 1 0 01.707-.293h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                                    </svg>
                                    <span className='text-[1.1rem]'>022-68811190</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#c9377e] mb-3">Visit Our Website</h2>
                                <div className="flex items-center gap-2 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm0 0c1.657 0 3 3.582 3 8s-1.343 8-3 8m0-16c-1.657 0-3 3.582-3 8s1.343 8 3 8m0-16v16m-6-8h12" />
                                    </svg>
                                    <a href='www.cordeliacruises.com' className='text-[1.1rem] underline text-brand-primary font-semibold'>www.cordeliacruises.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}