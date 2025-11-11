import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import content1 from '/src/pages/home/content.json';
// @ts-ignore
import Banner from '../../component/Banner';
// @ts-ignore
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "/src/constants/userConstants";
// @ts-ignore
import { TiggerGAPersona, TiggerGATheme } from "../../../src/components/Analytics/events";
import { saveRefUrl } from "../../../src/utils/user/user";
import ExitIntent from "../../components/ExitIntent";
import Ports from "./component/ports";
import "./index.css"
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import Button from "../../components/UI/Button";

// @ts-ignore
const Overview = React.lazy(() => import("/src/components/Overview"));
// @ts-ignore
const GuestReview = React.lazy(() => import("/src/components/guestReview"));
// @ts-ignore
const DownloadApp = React.lazy(() => import("/src/components/downloadApp"));
// @ts-ignore
// const UpcomingCruise = React.lazy(() => import("/src/components/upcomingCruise"));
const UpcomingCruise = React.lazy(() => import("../../component/UpcomingCruise"));
// @ts-ignore
const Testimonials = React.lazy(() => import("/src/components/testimonials"));
// @ts-ignore
const InfoSection = React.lazy(() => import("/src/components/InfoSection/infoSection"));
// @ts-ignore
import DestinationLeadForm from "../../components/UI/LeadForm/destinationLeadForm";
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
    // {
    //   "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/srilank-new-banner-march-05-desktop.webp",
    //   "link": "#",
    //   "altTag": "CruiseToSriLanka",
    //   "titleTag":"Cruise-To-SriLanka",
    //   "type": "image",
    //   "thumbnail": ""
    // },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/SL_new_Web_2.webp",
      "link": "#",
      "altTag": "CruiseToHambantota",
      "titleTag":"Cruise-To-Hambantota",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/SL_new_Web_3.webp",
      "link": "#",
      "altTag": "CruiseToTrincomalee",
     "titleTag": "Cruise-To-Trincomalee",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/SL_new_Web_4.webp",
      "link": "#",
      "altTag": "CruiseToJaffna",
      "titleTag": "Cruise-To-Jaffna", 
      "type": "image",
      "thumbnail": ""
    }
  ],
  "mobileImages": [
    // {
    //   "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/srilank-new-banner-march-05-mobile.webp",
    //   "link": "#",
    //   "altTag": "Srilanka June",
    //   "type": "image",
    //   "thumbnail": ""
    // },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/SL_new_Mobile_2.webp",
      "link": "#",
      "altTag": "Hambantota",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/SL_new_Mobile_3.webp",
      "link": "#",
      "altTag": "Trincomalee",
      "type": "image",
      "thumbnail": ""
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/SL_new_Mobile_4.webp",
      "link": "#",
      "altTag": "Jaffna",
      "type": "image",
      "thumbnail": ""
    }
  ],
}

export default function Home(props: Props) {
  let navigate = useNavigate()
  const [description, setDescription] = useState<any>(false);
  useMetaTags({
    title: 'Srilanka Cruise Packages | Book Srilanka cruise packages with Cordelia Cruises',
    description: 'Cruise to Srilanka with Cordelia. Indulge in gourmet cuisine, relaxing stays, entertainment & unforgettable moments onboard.',
    metas: [
      {
        name: 'keywords',
        content:
          'Srilanka cruise packages, cruise packages from Srilanka, cruise packages, cruise, cordelia cruises, cruise packages price in india, best cruise packages, weekend cruises, cruise to Srilanka'
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
    // if (PERSONA !== DEFAULT && ALL_PERSONAS.includes(PERSONA)) {
    //   TiggerGAPersona(PERSONA);
    // }
    // if (EVENT !== DEFAULT && ALL_EVENTS.includes(EVENT)) {
    //   TiggerGATheme(EVENT);
    // }
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
    "title": "A TIMELESS All-INCLUSIVE SRI LANKAN ADVENTURE AWAITS",
    "vidUrl": "https://www.youtube.com/watch?v=BgWkhwptRZA",
    "subTitle": "Embark on a luxurious journey from Chennai to Sri Lanka with Cordelia Cruises. Experience the island's rich culture, stunning landscapes, and vibrant cities on our exclusive itineraries.",
    //  With the inclusion of VISA, immerse yourself in the experience, carefree!
     
    "vidThumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/Thumnail%20750x422-srilanka.webp"
  }

  const offers = [
    // {
    //   title: 'Pay for 3N, Sail for 5N',
    //   description: [
    //     '5 nights of bliss for the price of 3!',
    //     'Applicable on 5-night Sri Lanka sailings in the month of August and September 2024',
    //     'Cabin fare for 2 nights will be waived off',
    //     'Service charges, levies, and fuel charges will be applicable for all nights with GST',
    //     'Applicable to all cabin categories'
    //   ]
    // },
    {
      title: 'Book Now, Pay Later',
      description: [
        'Book your cabin by paying just 25%',
        'Make a full payment 60 days before your sailing date',
        'The offer applies only to sailings scheduled 60 days or more from the date of booking'
      ]
    },
    {
      title: 'All-Inclusive Beverage Package',
      description: [
        'Select spirits and mixers will be included in your Cordelia cruise price at no extra charges for all guests (Adults only)',
        'Adults over 21 years of age will be permitted to consume alcohol onboard',
        'Kids will be served non-alcoholic beverages only',
        'The package can be upgraded at an additional cost at the time of booking or onboard',
        // 'Offer valid for bookings done till July 2024',
            'Operational as per bar timings',
            'This is an inclusive package along with your cruise booking',
            'Offer applies to all the sailings'
      ]
    },
    {
      title: 'Kids Sail Free',
      description: [
        'Valid for all kids under the age of 12',
        'The kids must travel as 3rd or 4th guests',
        'Service charges, levies and fuel charges are applicable with GST',
        'Offer applies to all the sailings',
        // 'Offer valid for bookings done till July 2024'
      ]
    }
  ]
  // console.log('roh ', CONTENT[EVENT][PERSONA].overview);
  return (
    <Layout>
      <main>
        <section className="lg:mt-[70px] mt-12">
          <Banner data={banner ? banner : ''} />
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
                Avail our special offers
              </h2>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 py-5 gap-5 pt-10'>
              {offers.map((val, index) => (
                <div className="flex justify-between shadow-allSide" key={index}>
                  <div className="border border-gray-300 w-full flex justify-between items-center px-4 rounded-l">
                    <div className='flex items-center'>
                      <p className='lg:text-base text-xs font-semibold text-gray-1100 uppercase'>{val.title}</p>
                      <img className='lg:h-5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" alt="CordeliaCruise" title="Offers-On-Cordelia-Cruises" />
                    </div>
                    <p className='lg:text-sm text-xxs ml-4 text-brand-primary font-semibold underline whitespace-nowrap cursor-pointer' onClick={() => setDescription(val.description)}>View More</p>
                  </div>
                  <Button text="Find Cruise" size="sm" handleClick={() => navigate('/upcoming-cruises?destinationPorts=jaffna,hambantota,trincomalee')} className="whitespace-nowrap rounded-l-none" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="my-8 lg:my-14">
          {<Suspense fallback={<div>Loading.....</div>}>
            <UpcomingCruise template={CONTENT[EVENT][PERSONA].template} port_codes={CONTENT[EVENT][PERSONA].port_codes} />
          </Suspense>}
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
                <InfoSection content={CONTENT[EVENT][PERSONA].info_cards} info_section={CONTENT[EVENT][PERSONA].info_section} />
              </Suspense>}
            </section>
          </>
        ) : (
          <>
            <section>
              <section>
                {<Suspense fallback={<div>Loading.....</div>}>
                  <InfoSection content={CONTENT[EVENT][PERSONA].info_cards} info_section={CONTENT[EVENT][PERSONA].info_section} />
                </Suspense>}
              </section>
              {/* {<Suspense fallback={<div>Loading.....</div>}>
                <Testimonials data={CONTENT[EVENT][PERSONA].testimonials} />
              </Suspense>} */}
            </section>

          </>
        )}

        {/* <section>
          {<GuestReview data={CONTENT[EVENT][PERSONA].banner} template={CONTENT[EVENT][PERSONA].template} />}
        </section> */}


        <section id="contact">
          {<Suspense fallback={<div>Loading.....</div>}>
            <DestinationLeadForm />
          </Suspense>}
        </section>
        <section>
          {<Suspense fallback={<div>Loading.....</div>}>
            <SafetyProtocol template={CONTENT[EVENT][PERSONA].template} />
          </Suspense>}
        </section>
        <section className="hidden lg:block" id="downloadApp">
          <DownloadApp />
        </section>
      </main>
      <ExitIntent />

      <div className='fixed w-full bottom-0 z-30 lg:hidden'>
        <div className=''>
          <div className='mt-3'>
            <Button text="Book Now" handleClick={() => navigate('/upcoming-cruises?port=Jaffna')} className="w-full rounded-none" />
          </div>
        </div>
      </div>

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
    </Layout>
  );
}
