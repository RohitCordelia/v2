import React, { Suspense, useEffect, useState } from "react";
import { Layout } from '/src/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../../component/Banner';
import Gallery from "./gallery";
import Destination from "./destination";
import InfoSection from "../../components/InfoSection/infoSection";
import LeadGenForm from "../../components/UI/LeadForm";

const banner = {
    "title": "",
    "images": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-year'25-desktop-banner.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        // {
        //     "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/celebration_web.webp",
        //     "link": "#",
        //     "altTag": "",
        //     "type": "image",
        //     "thumbnail": ""
        // },
    ],
    "mobileImages": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-year'25-mobile-banner.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        // {
        //     "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/celebration_mobile.webp",
        //     "link": "",
        //     "altTag": "",
        //     "type": "image",
        //     "thumbnail": ""
        // },

    ],
};
const Info_Indigo = {
    "info_section": {
        "title": "Sail In Style And Comfort",
        "sub_title": "Embark on a journey like no other with Cordelia Cruises. Enjoy premium amenities on board as you take unforgettable excursions to the stunning shores."
    },
    "info_cards": [
        {
            "link": "food-beverage",
            "title": "Exquisite Cuisine",
            "img_alt": "Exquisite Cuisine",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/food-experiences-default.webp",
            "sub_title": "Get ready to savour mouthwatering  dishes while enjoying breathtaking views of the ocean. We've handpicked the best flavours of the season to tantalise your taste buds."
        },
        {
            "link": "accommodation",
            "title": "Premium Accommodations",
            "img_alt": "Premium Accommodations",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/accomodation-srilanka.webp",
            "sub_title": "Relax and unwind as you sail. The Empress and its crew will provide you with exceptional hospitality throughout your journey."
        },
        {
            "link": "destination",
            "title": "Exciting Destinations",
            "img_alt": "Exciting Destinations",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/destination-srilanka.webp",
            "sub_title": "Set out on an unforgettable as you explore new and exciting destinations with your loved ones on our cruise."
        },
        {
            "link": "entertainment",
            "title": "Endless Entertainment",
            "img_alt": "Endless Entertainment",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/entertainment-srilanka.webp",
            "sub_title": "From exclusive entertainment shows at the Marquee Theatre to enthralling live music, mesmerising magic shows and professional theatrical performances. We have endless entertainment to enchant you throughout your stay."
        },
        {
            "link": "wedding",
            "title": "Destination Wedding",
            "img_alt": "Destination Wedding",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/wedding-srilanka.webp",
            "sub_title": "Embark on a special journey to solemnise your auspicious wedding vows in the middle of the gorgeous ocean. Let the wedding vows meet the ocean views on the most beautiful travel destination in India."
        },
        {
            "link": "corporate",
            "title": "Corporate Events",
            "img_alt": "Corporate Events",
            "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/corprate-srilanka.webp",
            "sub_title": "Take your corporate events, meetings and incentive trips to the next level onboard the Empress. Cruise to gorgeous destinations with your team for the perfect offsite."
        }
    ],
}
export default function index() {

    return (
        <>
            <Layout>
                <main>
                    <div className="md:mt-16 mt-12">
                        <Banner data={banner ? banner : ''} clickable={false} />
                        <LeadGenForm page_code='Indigo' />
                    </div>

                    <div className="relative text-center py-10 px-4 md:px-8 bg-white">
                        <h1
                            className="text-2xl lg:text-4xl lg:font-medium px-4 leading-7"
                        >
                            This year, let your resolutions take you places—literally!
                        </h1>
                        <p className="text-black md:text-lg  md:font-medium mt-2 md:mt-4 mx-auto max-w-screen-sm">
                            Step aboard Cordelia Cruises and experience unmatched luxury, breathtaking views, and unforgettable adventures on the high seas.
                        </p>
                        <h5
                            className="text-black text-lg lg:text-xl  font-bold mt-2 md:mt-2 mx-auto max-w-screen-sm"
                        >
                            Only the best way to elevate your holiday.
                        </h5>
                        <p
                            className="text-black md:text-lg  md:font-medium mt-2 md:mt-2 mx-auto max-w-screen-sm"
                        >
                            All-inclusive Beverage Package* | World-class Cuisine | Captivating Entertainment
                        </p>
                    </div>

                    <section>
                        <div
                            className="w-full h-full md:mt-[0px] mt-10 md:px-0 md:py-28"
                        >
                            <Link to="/upcoming-cruises">
                                <img
                                    className="hidden md:block w-full"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/indigo-offer-banner-new-desktop-02.webp"
                                    alt=""
                                />

                                <img
                                    className="block md:hidden w-full mt-[55px]"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/indigo-offer-banner-new-mobile-02.webp"
                                    alt=""
                                />
                            </Link>
                        </div>

                    </section>
                    <section className="mb-28 mt-6 lg:mt-0">
                        <Destination />
                    </section>

                    <section className="mb-28">
                        <section>
                            {<Suspense fallback={<div>Loading.....</div>}>
                                <InfoSection content={Info_Indigo.info_cards} info_section={Info_Indigo.info_section} />
                            </Suspense>}
                        </section>


                    </section>

                    <section className="mb-48">
                        <Gallery />
                    </section>
                </main>
            </Layout>
        </>
    );
}
