import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
import content1 from '../../../src/pages/home/content.json';
import Banner from '../../component/Banner';
import Header from './component/header'
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "../../../src/constants/userConstants";
import { saveRefUrl } from "../../../src/utils/user/user";
import Ports from "./component/ports";
import "./index.css"
import Modal from '../../components/UI/ModalCenter';
import LeadGenForm from "../../components/UI/LeadForm";

// @ts-ignore
const Overview = React.lazy(() => import("/src/components/Overview"));
// @ts-ignore
const Testimonials = React.lazy(() => import("/src/components/testimonials"));
// @ts-ignore
const InfoSection = React.lazy(() => import("/src/components/InfoSection/infoSection"));
type Props = {};

const CONTENT: any = content1

const banner = {
  "title": "",
  "images": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Lakshadweep_desktop_16.webp",
      "link": "#",
      "altTag": "Srilanka June",
      "type": "image",
      "thumbnail": ""
    },
  ],
  "mobileImages": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep_mobile_16.webp",
      "link": "#",
      "altTag": "Srilanka June",
      "type": "image",
      "thumbnail": ""
    },
  ],
}
const Info_Lakshadweep={
  "info_section": {
    "title": "Sail In Style And Comfort",
    "sub_title": "Embark on a journey like no other with Cordelia Cruises. Enjoy premium amenities on board as you take unforgettable excursions to the stunning shores of Lakshadweep."
},
"info_cards": [
    {
        "link": "food-beverage",
        "title": "Exquisite Cuisine",
        "img_alt": "Exquisite Cuisine",
        "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/food-experiences-default.webp",
        "sub_title": "Get ready to savour mouthwatering summer dishes while enjoying breathtaking views of the ocean. We've handpicked the best flavours of the season to tantalise your taste buds."
    },
    {
        "link": "accommodation",
        "title": "Premium Accommodations",
        "img_alt": "Premium Accommodations",
        "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/accomodation-srilanka.webp",
        "sub_title": "Relax and unwind as you sail to Lakshadweep. The Empress and its crew will provide you with exceptional hospitality throughout your journey."
    },
    {
        "link": "destination",
        "title": "Exciting Destinations",
        "img_alt": "Exciting Destinations",
        "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/destination-srilanka.webp",
        "sub_title": "Set out on an unforgettable summer vacation as you explore new and exciting destinations with your loved ones on our cruise."
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
],}
export default function GoaCruises(props: Props) {
  const [description, setDescription] = useState<any>(false);

  useMetaTags({
    title: 'Book Chennai to Sri Lanka Cruise Packages At Best Price | Cordelia',
    description: 'Experience the beauty and culture of Sri Lanka on our exclusive Chennai to Sri Lanka Cruises. Find the best Cruise Price and embark on an adventure of a lifetime. ',
    metas: [
      {
        name: 'keywords',
        content:
          'chennai to sri lanka cruise, sri lanka cruise, ship from chennai to sri lanka, chennai to sri Lanka cruise price, cruise packages from chennai to sri lanka, chennai to sri lanaka ship travel time, chennai to sri lanka ship fare, cruise ship from chennai to sri lanka, chennai to sri lanka cruise booking, chennai to sri lanka cruise fare, chennai to sri lanka ship ticket booking'
      },
    ],
  })

  const personaSelector = new window.URLSearchParams(window.location.search).get(PERSONA_KEY);
  let PERSONA = DEFAULT
  if (personaSelector && ALL_PERSONAS.includes(personaSelector)) {
    PERSONA = personaSelector
  }

  const eventSelector = new window.URLSearchParams(window.location.search).get(EVENT_KEY);
  let EVENT = 'srilanka'
  if (eventSelector && ALL_EVENTS.includes(eventSelector)) {
    EVENT = eventSelector
  }

  useEffect(() => {
    saveRefUrl(window.location.href)
  }, [])

  const data = {
    "title": "DISCOVER THE BEST OF THE INDIAN WEST COAST ON OUR LAKSHADWEEP CRUISE",
    "vidUrl": "https://www.youtube.com/watch?v=e8E9cPLnr2Q",
    "subTitle": "Dive into crystal-clear turquoise waters teeming with marine life and unwind on pristine beaches where silken sand meets swaying palms. Explore unique coral reefs, witness vibrant culture, and savour fresh seafood delicacies. A voyage to a top cruising destination like Lakshadweep aboard our cruise ship is more than just a journey —it’s an experience you’ll cherish for years to come.",
    "vidThumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/Lakshadweep_video_thumbnail.webp"
  }

  const offers = [
    // {
    //   title: '10% Early Bird Discount',
    //   description: [
    //     'Receive 10% off by booking your cruise at least 60 days before the sailing date',
    //     'A discount of 10% will be applied to the cabin fare only',
    //     'The offer applies only to sailings scheduled 60 days or more from the date of booking',
    //     'Offer valid for bookings done till August 2024',
    //   ]
    // },
    {
      title: 'All-Inclusive Beverage Package',
      description: [
        "Select beverages and mixers will be included in your Cordelia cruise price at no extra charges for all guests (Adults only)",
        "Kids will be served non-alcoholic beverages only",
        "The package can be upgraded at an additional cost at the time of booking or onboard",
        "Operational as per bar timings",
        "This is an inclusive package along with your cruise booking",
        "Offer applies to all the sailings",
      ]
    },
    {
      title: 'Book Now, Pay Later',
      description: [
        "Book your cabin by paying just 25%",
        "Make a full payment 60 days before your sailing date",
        "The offer applies only to sailings scheduled 60 days or more from the date of booking",
      ]
    },
    {
      title: 'Kids Sail Free',
      description: [
        "Valid for all kids under the age of 12",
        "The kids must travel as 3rd or 4th guests",
        "Service charges, levies, and fuel charges are applicable with the GST",
        "Offer applies to all the sailings",
      ]
    }
  ]

  return (
    <>
      <Header isVideo={true} />
      <main>
        <section className="">
          <Banner data={banner ? banner : ''} clickable={false} />
          <LeadGenForm page_code='Lakshadweep' />
        </section>
        <section>
          {<Overview data={data} event={EVENT} />}
        </section>
        <section>
          <Ports />
        </section>
        <section>
          <div className="container mx-auto lg:mt-28 px-4 lg:px-0">
            <div className='grid grid-cols-1'>
              <h2 className='text-2xl lg:text-4xl lg:font-medium leading-7'>
                Our best cruise packages come with exciting offers:
              </h2>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 py-5 gap-5 pt-10'>
              {offers.map((val, index) => (
                <div className="flex justify-between shadow-allSide" key={index}>
                  <div className="border border-gray-300 w-full flex justify-between items-center px-4 py-3.5 rounded-l">
                    <div className='flex items-center'>
                      <p className='lg:text-base text-xs font-semibold text-gray-1100 uppercase'>{val.title}</p>
                      <img className='lg:h-5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" />
                    </div>
                    <p className='lg:text-sm text-xxs ml-4 text-brand-primary font-semibold underline whitespace-nowrap cursor-pointer' onClick={() => setDescription(val.description)}>View More</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {CONTENT[EVENT][PERSONA].template === 1 ? (
          <>
            <section>
              {<Suspense fallback={<div>Loading.....</div>}>
                <Testimonials data={CONTENT[EVENT][PERSONA].testimonials} />
              </Suspense>}
            </section>

            <section>
              {<Suspense fallback={<div>Loading.....</div>}>
                <InfoSection content={Info_Lakshadweep.info_cards} info_section={Info_Lakshadweep.info_section} />
              </Suspense>}
            </section>
          </>
        ) : (
          <>
            <section>
              <section>
                {<Suspense fallback={<div>Loading.....</div>}>
                  <InfoSection content={Info_Lakshadweep.info_cards} info_section={Info_Lakshadweep.info_section} />
                </Suspense>}
              </section>
            </section>

          </>
        )}
      </main>

      <Modal show={description} align={'center'} className="w-full lg:w-2/4 relative" onClose={() => setDescription(false)}>
        <div className=' w-full h-full bg-white'>
          <div className=' p-4 pb-0 flex items-center justify-end'>
            <svg
              onClick={() => setDescription(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="px-10 pb-6">
            {description && description?.map((val) => (
              <ul className="list-disc">
                <li className="mb-2 text-sm lg:text-base">{val}</li>
              </ul>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
