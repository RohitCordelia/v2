import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export default function AboutUs({ }: Props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    let jurgen = '';
    let oneel = '';
    let nishikant = '';
    if (width && width >= 640) {
        jurgen = 'https://images.cordeliacruises.com/cordelia_v2/public/images/jurgen-bailom-desktop.webp';
        oneel = 'https://images.cordeliacruises.com/cordelia_v2/public/images/oneel-verma-desktop.webp';
        nishikant = 'https://images.cordeliacruises.com/cordelia_v2/public/images/nishant-upadhyay-desktop.webp';
    } else {
        jurgen = 'https://images.cordeliacruises.com/cordelia_v2/public/images/jurgen-bailom.webp';
        oneel = 'https://images.cordeliacruises.com/cordelia_v2/public/images/oneel-verma.webp';
        nishikant = 'https://images.cordeliacruises.com/cordelia_v2/public/images/nishant-upadhyay.webp';
    }

    return (
        <Layout>
            <main className="container mx-auto pt-24 pb-24 lg:pt-36 lg:pb-36 px-3">
                <h1 className='text-3xl font-semibold'>About Us</h1>
                <p className='text-base lg:text-lg font-medium mt-3 lg:mt-6 !leading-7'>We are the only domestic ocean cruise operator in India as of December 31, 2024 (Source: CRISIL Report),
                    offering luxurious and inherent Indian experiences. We believe this enables us to set industry benchmarks,
                    foster brand loyalty, and establish pricing standards, thereby strengthening our market presence and creating
                    a strong competitive position.</p>

                <p className='text-base lg:text-lg font-medium mt-3 lg:mt-6 !leading-7'>Cordelia Cruises by Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited) is India’s premium cruise line. True to its name,
                    Cordelia aspires to promote and drive the cruise culture in India through experiences that are stylish,
                    luxurious and most importantly, inherently Indian. Cordelia is a cruise line for Indians catering to the way
                    Indians love to holiday.</p>

                <p className='text-base lg:text-lg font-medium mt-3 lg:mt-6 !leading-7'>Our cruise vessel primarily sails to domestic destinations such as Mumbai (Maharashtra), Goa, Kochi (Kerala),
                    Chennai (Tamil Nadu), Lakshadweep, Visakhapatnam (Andhra Pradesh), and Puducherry. We also offer
                    international itineraries, including Hambantota, Trincomalee, and Jaffna (Sri Lanka) and have also sold cruise
                    tickets for our first-time sail to destinations such as Phuket (Thailand), Singapore, Kuala Lumpur and Langkawi
                    (Malaysia). Our itineraries are designed to showcase India’s coastal regions and cultural heritage, providing
                    guests with an enriching travel experience and establishing ourselves as the go-to choice for luxury and
                    cultural cruising.</p>

                {/* <div className='border-t-2 my-10 border-gray-300' />

                <h2 className='text-3xl font-semibold'>Our Leadership</h2>
                <div className='rounded-lg border-2 border-gray-300/40 shadow-md mt-7 lg:mt-14 grid grid-cols-1 lg:gap-10 lg:grid-cols-3'>
                    <div>
                        <img
                            src={jurgen}
                            className="w-full"
                            alt="Jurgen-Bailom"
                            title='Jurgen-Bailom'
                        />
                    </div>
                    <div className='py-8 px-4 col-span-2'>
                        <h3 className='text-2xl lg:text-3xl font-semibold'>Mr. Jurgen Bailom</h3>
                        <p className='mt-6 lg:leading-8 leading-7 lg:font-semibold font-medium lg:text-lg text-base'>Mr. Jurgen Bailom, President and CEO, Waterways Leisure Tourism In his role as
                            President and CEO of Waterways Cruises, Mr. Bailom is spearheading the launch
                            of this world-class cruise experience in India. Being an industry veteran, he has
                            played an instrumental role in the selection of the first ship, its refurbishment,
                            bringing on board like-minded partners, ensuring the first cruise is ready to set
                            sail and making the experience one-of-its-kind for Indian travellers - amongst
                            others.
                        </p>
                    </div>
                </div>


                <div className='rounded-lg border-2 border-gray-300/40 shadow-md mt-7 lg:mt-14 grid grid-cols-1 lg:gap-10 lg:grid-cols-3'>
                    <div>
                        <img
                            src={nishikant}
                            className="w-full"
                            alt="NishikantUpadhyay"
                            title='Nishikant-Upadhyay'
                        />
                    </div>
                    <div className='py-8 px-4 col-span-2'>
                        <h3 className='text-2xl lg:text-3xl font-semibold'>Mr. Nishikant Upadhyay</h3>
                        <p className='mt-5 lg:leading-8 leading-7 lg:font-semibold font-medium lg:text-lg text-base'>Chief Financial Officer, CA. Nishikant Upadhyay leads the financial accounting, taxation and legal departments at Cordelia Cruises. He has over 30 years of multicultural experience in steering strategic financial goals with hands-on experience in end-to-end finalization of accounts & financial statements, treasury management, finance & accounts operations, and policies & procedures. He has experience making high-stakes decisions on operational & cost improvement initiatives, global footprint rationalization, corporate turn-arounds, mergers and acquisitions, and IPOs using experience-backed judgment. CA. Nishikant Upadhyay is a Fellow Chartered Accountant from ICAI - India and has completed his Bachelor of Science (Botany, Chemistry & Zoology), India, and Financial Modeling from IMT Ghaziabad.
                            He loves to fly and has an NCC – Air Wing “C” Certificate along with a Solo Gliding Certificate.
                        </p>
                    </div>
                </div> */}
            </main>
            <ExitIntent />
        </Layout>
    );
}