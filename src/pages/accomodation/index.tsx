import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import InteriorStateroom from './interiorStateroom'
import OceanView from './oceanView'
import MiniSuite from './miniSuite'
import Suite from './suite'
import ChairmanSuite from './chairmanSuite'
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";
type Props = {}

export default function Accomodation({ }: Props) {
    useMetaTags({
        title: 'Discover Luxurious Ship Cabins and Cruise Rooms at Cordelia',
        description: 'Experience relaxation and elegance in our cruise cabins and rooms. Choose from cozy staterooms or luxurious ship rooms for a memorable stay with Cordelia Cruises',
        metas: [
            {
                name: 'keywords',
                content:
                    'cordelia, cordelia cruises, cordelia cruise ship, cordelia cruises website, cruise cordelia, cordelia cruises ship, cruise ship cordelia, cruise entertainment, cruise dining, cruise activities, cruise stay, cruise accommodation, luxurious cruise, cordeliacruises'
            },
        ],
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <h1 className='text-2xl lg:text-4xl font-semibold'>Accommodation</h1>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>Our premium and stylish yet comfortable cruise ship staterooms will help you re-energize after a day full of entertainment and activities onboard.</p>
                <div className='border-t-2 my-10 border-gray-300' />
                <div className='grid grid-cols-2 gap-4'>
                    <ChairmanSuite className='col-span-2 lg:col-span-1' />
                    <Suite className='col-span-2 lg:col-span-1' />
                    <MiniSuite className='col-span-2 lg:col-span-1' />
                    <OceanView className='col-span-2 lg:col-span-1' />
                    <InteriorStateroom className='col-span-2 lg:col-span-1' />
                </div>
                <div className='border-t-2 my-10 lg:mt-20 border-gray-300' />
                <div>
                    <h1 className='text-2xl lg:text-4xl font-semibold'>Perks included with Interior & Ocean view staterooms</h1>
                    <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>Our Interior & Ocean View Staterooms now come with a host of perks when you go for upper and premium decks. Check out the table below for more details.</p>

                    <table className='table-auto border-collapse border border-brand-sky text-center mt-5 lg:mt-12'>
                        <tr className=''>
                            <td className='py-5 text-xs lg:text-lg font-bold bg-brand-sky/10 border border-brand-sky w-2/5'></td>
                            <td className='py-5 text-xs lg:text-lg font-bold bg-brand-sky/10 border border-brand-sky w-1/5'>Standard</td>
                            <td className='py-5 text-xs lg:text-lg font-bold bg-brand-sky/10 border border-brand-sky w-1/5'>UpperDeck</td>
                            <td className='py-5 text-xs lg:text-lg font-bold bg-brand-sky/10 border border-brand-sky w-1/5'>Premium</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-lg font-bold border border-brand-sky text-left'>Deck</td>
                            <td className='py-3 px-1 text-xs lg:text-lg font-bold border border-brand-sky'>3&4</td>
                            <td className='py-3 px-1 text-xs lg:text-lg font-bold border border-brand-sky'>7</td>
                            <td className='py-3 px-1 text-xs lg:text-lg font-bold border border-brand-sky'>8&9</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Help Desk on Deck 8 (Embarkation day - 2 PM - 10 PM) Sea Day (9 am - 1 PM and 5 - 9 PM) Port Day ( 4 pm - 9 pm)</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>No Access</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>No Access</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Will have access</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Help Desk on Deck 5</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>24 hours</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>24 hours</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>24 hours</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Terminal Check-in Counter</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Regular</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Regular</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Regular</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Exclusive Access to Dome (10am to 5 pm) with tea and coffee services</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>No</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>No</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Bottle of water</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Two bottle of 500ml per person per day</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Three bottle of 500ml per person per day</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Four bottle of 500ml per person per day</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Toiletries</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Basic</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Basic</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Premium</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Deck 5 (Starlight - Portside)</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>No</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>No</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Deck 4 (Starlight)</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                        </tr>
                        <tr className=''>
                            <td className='py-3 px-2 text-xs lg:text-base font-bold border border-brand-sky text-left'>Deck 10 (Food Court)</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                            <td className='py-3 px-2 text-xs lg:text-base font-semibold border border-brand-sky'>Yes</td>
                        </tr>
                    </table>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}