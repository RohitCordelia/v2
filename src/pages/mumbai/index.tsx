import React, { Suspense, useEffect, useState } from "react";
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
import useMetaTags from 'react-metatags-hook'

type Props = {};

const CONTENT: any = content1

const banner = {
  "title": "",
  "images": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-mumbai-nov'24-desktop.webp",
      "link": "/upcoming-cruises?port=Mumbai",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
  ],
  "mobileImages": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-mumbai-nov'24-mobile.webp",
      "link": "/upcoming-cruises?port=Mumbai",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
  ],
}
const content_onboard = {
  "onBoardSection": {
    title: "On-board Activities ",
    sub_title: ""
  },

  "onBoardCards": [
    {
      title: "Premium Accommodations ",
      sub_title: "Wake up in your elegantly appointed room and witness the magic of the sunrise from the unending horizon, then get ready for an exhilarating day in ‘The City on the Sea’",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/accomodation-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
    },
    {
      title: "Exquisite Cuisine ",
      sub_title: "Cordelia Cruises offers a fusion of Pan-Asian and Indian flavours at the all-day food court. You can also indulge in our three specialty restaurants.  ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/cuisine-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
    },
    {
      title: "Unwind Your Way ",
      sub_title: "Conquer the rock-climbing wall, unwind with luxurious services at the spa and salon, and enjoy show-stopping entertainment.  ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/adventure-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
    },
    {
      title: "Indulge in the Best ",
      sub_title: "Cap off the night with drinks at the open bar, where the fun continues. With Cordelia Cruises, every moment is a new adventure. ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/beverages-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
    },
    {
      title: "Spa and Salon  ",
      sub_title: "After you’ve explored the ‘City on the Sea,’ pop into our Spa & Salon for some well-deserved R&R. Our expert professionals will have you feeling 100%, so you can get back to having a ball all over again. ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/spa&salon-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
    },
    {
      title: "Shopping ",
      sub_title: "If retail therapy is what you need, our exclusive outlets will put you in the right mood. Whether you’re shopping for yourself or your loved ones, there’s something for everyone. ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/shopping-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
    },
    // {
    //     title: "Exciting Destinations  ",
    //     sub_title: "Set out on an unforgettable adventure, exploring exciting destinations with your loved ones aboard the majestic Empress. ",
    //     img_url: " https://images.cordeliacruises.com/cordelia_v2/public/images/destination-mumbai-page-desktop.webp",
    //     img_alt: "",
    //     link: "",
    // }
  ],
}
const portCode = "BOM"

export default function Home(props: Props) {
  let navigate = useNavigate()
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

  useMetaTags({
    title: 'Mumbai Cruise Packages | Book Mumbai cruise packages with Cordelia Cruises',
    description: 'Cruise to Mumbai with Cordelia. Indulge in gourmet cuisine, relaxing stays, entertainment & unforgettable moments onboard.',
    metas: [
      {
        name: 'keywords',
        content:
          'Mumbai cruise packages, cruise packages from mumbai, cruise packages, cruise, cordelia cruises, cruise packages price in india, best cruise packages, weekend cruise'
      },
    ],
  })
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
    "title": "Cruise aboard the ‘City on the Sea’ off Mumbai’s coast",
    "vidUrl": "https://www.youtube.com/watch?v=PR6OjCvhcPE",
    "subTitle": "‘Aamchi Mumbai,’ also known as the City of Dreams, is your gateway to an experience that will take your breath away. Pick your dates, pack your bags, and come aboard India’s top cruise; we’ve got it all planned for you. ",
    "vidThumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/video-thumbnail-desktop-image.webp"
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
        'Select spirits and mixers will be included in your Cordelia cruise price at no extra charges for all guests (Adults only)',
        'Adults over 21 years of age will be permitted to consume alcohol onboard.',
        'Kids will be served non-alcoholic beverages only',
        'The package can be upgraded at an additional cost at the time of booking or onboard',
        'Operational as per bar timings',
        'This is an inclusive package along with your cruise booking',
        'Offer applies to all the sailings',
      ]
    },
    {
      title: 'Book Now, Pay Later',
      description: [
        'Book your cabin by paying just 25%',
        'Make a full payment 60 days before your sailing date',
        'The offer applies only to sailings scheduled 60 days or more from the date of booking',
      ]
    },
    {
      title: 'Kids Sail Free',
      description: [
        'Valid for all kids under the age of 12',
        'The kids must travel as 3rd or 4th guests',
        'Service charges, levies, and fuel charges are applicable with the GST',
        'Offer applies to all the sailings',
      ]
    }
  ]

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
          <div className="container mx-auto lg:mt-28 px-4 lg:px-0 mb-6 lg:mb-0">
            <div className='grid grid-cols-1'>
              <h1 className='text-2xl lg:text-4xl lg:font-medium leading-7'>
                Valet Services Available
              </h1>
            </div>
            <p className='lg:text-lg text-sm font-normal lg:leading-7 my-6'>
              Valet service and paid parking is available near Mumbai Port at CR2 mall which is just 10 to 15min away from the Mumbai Port.
            </p>
            <div className="shadow-allSide rounded overflow-hidden lg:flex block">
              <div className="p-6 basis-1/2">
                <div className="lg:text-lg text-sm font-semibold lg:leading-7 mb-6">Charges for paid parking</div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full border border-[#079BB5] rounded text-center text-sm font-light dark:border-neutral-500">
                          <tbody>
                            <tr className="border-b border-b-[#079BB5] dark:border-neutral-500">
                              <td
                                className="whitespace-nowrap border-r border-r-[#079BB5] rounded-tl px-6 py-4 font-medium dark:border-neutral-500">
                                2 Night
                              </td>
                              <td
                                className="whitespace-nowrap border-r border-r-[#079BB5] px-6 py-4 font-medium dark:border-neutral-500">
                                1099
                              </td>
                            </tr>
                            <tr className="border-b border-b-[#079BB5] dark:border-neutral-500">
                              <td
                                className="whitespace-nowrap border-r border-r-[#079BB5] px-6 py-4 font-medium dark:border-neutral-500">
                                3 Night
                              </td>
                              <td
                                className="whitespace-nowrap border-r border-r-[#079BB5] px-6 py-4 font-medium dark:border-neutral-500">
                                1499
                              </td>
                            </tr>
                            <tr className="border-b border-b-[#079BB5] dark:border-neutral-500">
                              <td
                                className="whitespace-nowrap border-r border-r-[#079BB5] px-6 py-4 font-medium dark:border-neutral-500">
                                4 Night
                              </td>
                              <td
                                className="whitespace-nowrap border-r border-r-[#079BB5] px-6 py-4 font-medium dark:border-neutral-500">
                                2099
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 basis-1/2 bg-gray-400">
                <div className="lg:text-lg text-sm font-semibold lg:leading-7 mb-6">Please contact for Valet service</div>
                <div className="">
                  <div className="flex shadow-allSide rounded overflow-hidden mb-4">
                    <div className="text-sm lg:text-base p-4 basis-1/2 bg-white text-center">Jayesh</div>
                    <div className="flex items-center basis-1/2 p-4 bg-[#079BB51A] justify-center gap-2 text-sm lg:text-base">
                      <div>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg" alt="phone" />
                      </div>
                      <div>+91 9136193700</div>
                    </div>
                  </div>
                  <div className="flex shadow-allSide rounded overflow-hidden mb-4">
                    <div className="text-sm lg:text-base p-4 basis-1/2 bg-white text-center">Ajit</div>
                    <div className="flex items-center basis-1/2 p-4 bg-[#079BB51A] justify-center gap-2 text-sm lg:text-base">
                      <div>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg" alt="phone" />
                      </div>
                      <div>+91 9082604079</div>
                    </div>
                  </div>
                  <div className="flex shadow-allSide rounded overflow-hidden">
                    <div className="text-sm lg:text-base p-4 basis-1/2 bg-white text-center">Shiv Kumar</div>
                    <div className="flex items-center basis-1/2 p-4 bg-[#079BB51A] justify-center gap-2 text-sm lg:text-base">
                      <div>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg" alt="phone" />
                      </div>
                      <div>+91 7993246673</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto lg:mt-28 px-4 lg:px-0">
            <div className='grid grid-cols-1'>
              <h1 className='text-2xl lg:text-4xl lg:font-medium leading-7'>
                Our best cruise packages come with exciting offers:
              </h1>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 py-5 gap-5 pt-10'>
              {offers.map((val, index) => (
                <div className="flex justify-between shadow-allSide" key={index}>
                  <div className="border border-gray-300 w-full flex justify-between items-center px-4 rounded-l">
                    <div className='flex items-center'>
                      <p className='lg:text-base text-xs font-semibold text-gray-1100 uppercase'>{val.title}</p>
                      <img className='lg:h-5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" />
                    </div>
                    <p className='lg:text-sm text-xxs ml-4 text-brand-primary font-semibold underline whitespace-nowrap cursor-pointer' onClick={() => setDescription(val.description)}>View More</p>
                  </div>
                  <Button text="Find Cruise" size="sm" handleClick={() => navigate('/upcoming-cruises?destinationPorts=Mumbai')} className="whitespace-nowrap rounded-l-none" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="my-8 lg:my-14">
          {<Suspense fallback={<div>Loading.....</div>}>
            <UpcomingCruise template={CONTENT[EVENT][PERSONA].template} port_codes={portCode} />
          </Suspense>}
        </section>
        <section>
          {<Suspense fallback={<div>Loading.....</div>}>
            <InfoSection content={content_onboard.onBoardCards} info_section={content_onboard.onBoardSection} />
          </Suspense>}
        </section>
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
            <Button text="Book Now" handleClick={() => navigate('/upcoming-cruises?port=Mumbai')} className="w-full rounded-none" />
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
