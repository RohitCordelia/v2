import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
import { Layout } from '../../../src/components/Layout';
import content1 from '../../../src/pages/home/content.json';
import Banner from '../../component/Banner';
// import Header from './component/header'
import Header from '../../component/Header';
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "../../../src/constants/userConstants";
import { getCurrentUrlWithCampaign, saveRefUrl } from "../../../src/utils/user/user";
import Ports from "./component/ports";
import "./index.css"
import Modal from '../../components/UI/ModalCenter';
import LeadGenForm from "../../components/UI/LeadForm";

// @ts-ignore
const Overview = React.lazy(() => import("/src/components/Overview"));
// @ts-ignore
const GuestReview = React.lazy(() => import("/src/components/guestReview"));
// @ts-ignore
const DownloadApp = React.lazy(() => import("/src/components/downloadApp"));
// @ts-ignore
const UpcomingCruise = React.lazy(() => import("./upcomingCruise/index"));
// @ts-ignore
const Testimonials = React.lazy(() => import("/src/components/testimonials"));
// @ts-ignore
const InfoSection = React.lazy(() => import("/src/components/InfoSection/infoSection"));
// @ts-ignore
const SafetyProtocol = React.lazy(() => import("/src/components/SafetyProtocol/safetyProtocol"));
// @ts-ignore
const Promotion = React.lazy(() => import("/src/components/Promotion"));
// @ts-ignore
const PortCard = React.lazy(() => import("/src/components/PortCard"));

type Props = {};

const CONTENT: any = content1

const banner = {
  "title": "",
  "images": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/south-east-june-desktop.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/calling_desktop.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-all-cruise-feb-24-desktop-banner.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-thailand-feb-24-desktop-banner.webp",
      "link": "#",
      "altTag": "Hambantota",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-malaysia-feb-24-desktop-banner.webp",
      "link": "#",
      "altTag": "Trincomalee",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-feb-24-desktop-banner.webp",
      "link": "#",
      "altTag": "Jaffna",
      "type": "image",
      "thumbnail": ""
    }
  ],
  "mobileImages": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/south-east-june-mobile.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-destination-banner-mobile-april-11.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-all-cruise-feb-24-mobile-banner.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-thailand-feb-24-mobile-banner.webp",
      "link": "#",
      "altTag": "Hambantota",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-malaysia-feb-24-mobile-banner.webp",
      "link": "#",
      "altTag": "Trincomalee",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-feb-24-mobile-banner.webp",
      "link": "#",
      "altTag": "Jaffna",
      "type": "image",
      "thumbnail": ""
    }
  ],
}

const Info_Singapore = {
  "info_section": {
    "title": "Sail In Style And Comfort",
    "sub_title": "Embark on a journey like no other with Cordelia Cruises. Enjoy premium amenities on board as you take unforgettable excursions to the stunning shores of Singapore."
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
      "sub_title": "Relax and unwind as you sail to Singapore. The Empress and its crew will provide you with exceptional hospitality throughout your journey."
    },
    {
      "link": "destination",
      "title": "Exciting Destinations",
      "img_alt": "Exciting Destinations",
      "img_url": "https://images.cordeliacruises.com/cordelia_v2/public/images/destination-srilanka.webp",
      "sub_title": "Set out on an unforgettable vacation as you explore new and exciting destinations with your loved ones on our cruise."
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
      "sub_title": "Embark on a special journey to solemnise your auspicious wedding vows in the middle of the gorgeous ocean. Let the wedding vows meet the ocean views on the most beautiful travel destination in India and Singapore."
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

export default function Home(props: Props) {
  const [description, setDescription] = useState<any>(false);

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

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('contact')) {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    }
    if (new URLSearchParams(window.location.search).has('downloadApp')) {
      document.getElementById('downloadApp')?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    }


  }, [])
  const data = {
    "title": "An Unprecedented Voyage — An Unmissable Adventure!",
    "vidUrl": "https://www.youtube.com/watch?v=yAKu8GAim3Y",
    "subTitle": "In July 2025, for the first time ever, Cordelia Cruises will embark on a journey of a lifetime to Singapore on a 10-night sailing. Setting sail from Chennai, the Empress will whisk you away to some of the most breathtaking sights in Thailand, Malaysia, and Singapore.",
    // With the inclusion of VISA, immerse yourself in the experience, carefree!",
    "vidThumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-thumbnail-image-feb%2725.webp"
  }

  const offers = [
    {
      title: 'Get More For Less - Southeast Asia Awaits!',
      description: [
        "Valid on Interior Cabins only.",
        "Applicable sailing date: 19th July 2025.",
        "Complimentary cabin can accommodate upto 2 adults.",
        "18% GST will be applicable.",
        "This offer cannot be combined with any other existing promotions.",
      ]
    },
    {
      title: 'ALL INCLUSIVE BEVERAGE PACKAGE',
      description: [
        'Select beverages and mixers will be included in your Cordelia cruise price at no extra charges for all guests (Adults only)',
        'Kids will be served non-alcoholic beverages only',
        'The package can be upgraded at an additional cost at the time of booking or onboard',
        'Operational as per bar timings',
        'This is an inclusive package along with your cruise booking',
        'Offer applies to all the sailings'
      ]
    },
    {
      title: 'Book Now, Pay Later',
      description: [
        'Book your cabin by paying just 25%',
        'Make a full payment 60 days before your sailing date',
        'The offer applies only to sailings scheduled 60 days or more from the date of booking'
      ]
    },
    {
      title: 'Kids Sail Free',
      description: [
        'Valid for all kids under the age of 12',
        'The kids must travel as 3rd or 4th guests',
        'Service charges, levies and fuel charges are applicable with GST',
        'Offer applies to all the sailings'
      ]
    },
    {
      title: 'Unbeatable Value, Unmatched Experiences',
      description: [
        "Super Special Prices are applicable only on interior cabins.",
        "No cancellations and rescheduling will be permitted.",
        "No show refunds will not be processed.",
        "Applicable sailing dates: 19th July and 29th July 2025.",
        "This offer cannot be combined with any other existing promotions.",
      ]
    },
    {
      title: 'Unlock special deals on Southeast Asia sailing',
      description: [
        "This offer is applicable only on Ocean View Cabins.",
        "50% discount on cabin fare & ₹5,000 cashback per person.",
        "Cashback will be processed only after the sailing has been completed.",
        "Cashback is applicable only for guests who complete the sailing.",
        "Applicable sailing dates: 19th July and 29th July 2025.",
        "This offer cannot be combined with any other existing promotions.",
      ]
    },
  ]

  return (
    <>
      <Header isVideo={true} />
      <main>
        <section className="">
          <Banner data={banner ? banner : ''} />

          <LeadGenForm page_code='South East Asia' />
          {/* <div className="lg:mx-44 shadow-allSide p-6">
            <form className=''>
              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                <div>
                  <label className='text-sm font-semibold text-gray-100'>Name</label>
                  <input
                    type='text'
                    placeholder='Name'
                    className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
                    {...register('name', { required: true })}
                  />
                  {errors.name && <p className='text-xs text-danger'>Name is required.</p>}
                </div>
                <div>
                  <label className='text-sm font-semibold text-gray-100'>Email Address</label>
                  <input
                    type='email'
                    placeholder='Email Address'
                    className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14 mb-2'
                    {...register('email', { required: true })}
                  />
                  {errors.email && <p className='text-xs text-danger'>Email is required.</p>}
                </div>
                <div>
                  <label className='text-sm font-semibold text-gray-100'>Mobile Number</label>
                  <input
                    type='text'
                    maxLength={10}
                    placeholder='Mobile number'
                    className='border border-gray-100/10 shadow-allSide w-full mt-0 rounded-md h-14'
                    {...register('phone_number', { required: false })}
                    onKeyDown={(e) => {
                      mobileValid(e)
                    }}
                  />
                </div>
              </div>
              <div className="text-center mt-4 lg:mt-3">
                {success ? <div className="flex flex-wrap justify-center mb-4" > <p className="text-brand-green font-semibold text-center lg:text-md text-sm lg:w-[70%] ">  {success}  </p></div>
                  : null}
                <button
                  onClick={handleSubmit(submitForm)}
                  className="bg-brand-primary px-12 text-white text-sm py-3.5 font-bold rounded disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-elipses">Loading</span>
                  ) : (
                    'Get a quote'
                  )}
                </button>
              </div>
            </form>
          </div> */}
        </section>
        <section>
          {<Overview data={data} event={EVENT} />}
        </section>
        {/* <section>
          {<Suspense fallback={<div>Loading.....</div>}>
            <UpcomingCruise template={CONTENT[EVENT][PERSONA].template} port_codes={port_codes} />
          </Suspense>}
        </section> */}
        <section>
          <Ports />
        </section>

        <section>
          <div className="container mx-auto lg:mt-28 px-4 lg:px-0">
            <div className='grid grid-cols-1'>
              <h1 className='text-2xl lg:text-4xl lg:font-medium leading-7'>
                Avail our special offers
              </h1>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 py-5 gap-5 pt-10'>
              {offers.map((val, index) => (
                <div className="flex justify-between shadow-allSide" key={index}>
                  <div className="border border-gray-300 w-full flex justify-between items-center px-4 py-3.5 rounded-l">
                    <div className='flex items-center'>
                      <p className='lg:text-base text-xs font-semibold text-gray-1100 uppercase'>{val.title}</p>
                      <img className='lg:h-5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" />
                    </div>
                    <p className='lg:text-sm text-xxs ml-4 text-[#93288E] font-semibold underline whitespace-nowrap cursor-pointer' onClick={() => setDescription(val.description)}>View More</p>
                  </div>
                  {/* <div className="bg-brand-primary px-2 lg:px-4 py-3 lg:py-4 rounded-r">
                    <p className='lg:text-sm text-xxs font-bold text-white cursor-pointer whitespace-nowrap' onClick={() => navigate('/upcoming-cruises?destinationPorts=jaffna,hambantota,trincomalee')}>Find Cruise</p>
                  </div> */}
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
                <InfoSection content={Info_Singapore.info_cards} info_section={Info_Singapore.info_section} />
              </Suspense>}
            </section>
          </>
        ) : (
          <>
            <section>
              <section>
                {<Suspense fallback={<div>Loading.....</div>}>
                  <InfoSection content={Info_Singapore.info_cards} info_section={Info_Singapore.info_section} />
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