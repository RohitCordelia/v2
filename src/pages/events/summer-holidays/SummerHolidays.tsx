import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import Banner from '/src/components/banner';
// @ts-ignore
import ExitIntent from "../../../components/ExitIntent";
import Summer from './summer'
import LeadGenForm from "../../../components/UI/LeadForm";

type Props = {};


export default function SummerHolidays(props: Props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useMetaTags({
        title: 'Plan Your Luxurious Cruise Vacation Holiday On  a Ship | Cordelia Cruises',
        description: 'Looking for a cruise holiday? Book luxury vacation cruises ship to stunning destinations with comfort stays, entertainment, dining and fun activities at Cordelia',
        metas: [
            {
                name: 'keywords',
                content:
                    'cordelia, cordelia cruises, cordelia cruise ship, cordelia cruises website, cruise cordelia, cordelia cruises ship, cruise ship cordelia, cruise entertainment, cruise dining, cruise activities, cruise stay, cruise accomodation, luxurious cruise, cordeliacruises'
            },
        ],
    })
    const banner = {
        "images": [
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-where-else-desktop-banner.webp",
                "link": "#",
                "altTag": "Summer"
            },
        ],
        "mobileImages": [
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-where-else-offer-image.webp",
                "link": "#",
                "altTag": "Summer"
            },
        ]
    }

    return (
        <Layout>
            <main>
                <section>
                    <Banner data={banner} />
                </section>
                <LeadGenForm page_code={"summer-holidays"} />

                <section
                    id="summer"
                    style={{
                        scrollMarginTop: '70px'
                    }}>
                    <Summer />
                </section>
            </main>
            <ExitIntent />
        </Layout>
    );
}
