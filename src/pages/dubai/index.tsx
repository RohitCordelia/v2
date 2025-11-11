import React, { Suspense, useEffect } from "react";
// @ts-ignore
import Accordion from '/src/components/UI/Accordion/accordion_basic';
import useMetaTags from 'react-metatags-hook'
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import content1 from '/src/pages/home/content.json';
// @ts-ignore
import Banner from '/src/components/banner';
// @ts-ignore
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "/src/constants/userConstants";
// @ts-ignore
import { TiggerGAPersona, TiggerGATheme } from "../../../src/components/Analytics/events";
import { saveRefUrl } from "../../../src/utils/user/user";
import ExitIntent from "../../components/ExitIntent";
import DestinationLeadForm from "../../components/UI/LeadForm/destinationLeadForm";
// @ts-ignore
const Overview = React.lazy(() => import("/src/components/Overview"));
// @ts-ignore
const GuestReview = React.lazy(() => import("/src/components/guestReview"));
// @ts-ignore
const DownloadApp = React.lazy(() => import("/src/components/downloadApp"));
// @ts-ignore
const UpcomingCruise = React.lazy(() => import("/src/components/upcomingCruise"));
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

const faqString = [
  {
    question: "What is the Price of a cruise from Mumbai to Dubai?",
    answer: "Prices vary depending on the cruise package, cabin type, and selected amenities. Please check our website or contact our customer support for specific pricing details.",
  },
  {
    question: "Do you need a visa for a Dubai cruise?",
    answer: "Yes, a valid visa is required for the cruise. We can assist you in obtaining the necessary visa documentation and provide guidance on the application process.",
  },
  {
    question: "Can we go to Dubai by cruise from India?",
    answer: "Yes, our cruises offer voyages from Mumbai to Dubai, providing a convenient and enjoyable way to travel between these destinations.",
  },
  {
    question: "How long does it take to cruise from Mumbai to Dubai?",
    answer: "The duration of the cruise from Mumbai to Dubai aboard The Empress is over 5 days.",
  },
  {
    question: "What are the departure and arrival ports?",
    answer: "The departure port is Mumbai, India, and the arrival port is Dubai, UAE. Our cruises operate between these two cities, offering a seamless travel experience.",
  },
  {
    question: "Are there any specific safety precautions I should take while on a cruise?",
    answer: "We prioritise the safety and well-being of our passengers. Our cruises adhere to stringent safety protocols, and we provide safety instructions and guidelines to ensure a secure and enjoyable voyage.",
  },
  {
    question: "What is the cancellation policy for this cruise?",
    answer: "Our cancellation policy is outlined in the terms and conditions of the cruise booking. Please refer to the specific terms mentioned at the time of booking or contact our customer support for detailed information.",
  },
  {
    question: "What time of the year is best to cruise to Dubai?",
    answer: "Dubai can be enjoyed throughout the year, but the weather is generally pleasant between November and April, making it an ideal time for a cruise.",
  },
  {
    question: "What are the shore excursions in Dubai?",
    answer: "We offer a variety of exciting shore excursions in Dubai, including city tours, desert safaris, visits to iconic landmarks like Burj Khalifa, traditional dhow cruises, and more. Detailed information about the available excursions will be provided in the cruise itinerary.",
  },
];

export default function Home(props: Props) {
  useMetaTags({
    title: 'Cruise to Dubai & Middle East - Package, Price & Info | Cordelia',
    description: 'Mumbai to Dubai Cruise: Embark on an enchanting cruise to Dubai and immerse yourself in a world of wonder. Contact now to get ticket price, package, route & other details.',
    metas: [
      {
        name: 'keywords',
        content:
          'cruise to dubai, mumbai to dubai cruise, cruise from mumbai to dubai, india to dubai cruise, dubai cruise package, india to dubai ship ticket price, mumbai to dubai ship ticket price, mumbai to dubai distance by sea, cruise to abu dhabi, cruise to middle east'
      },
    ],
  })
  const personaSelector = new window.URLSearchParams(window.location.search).get(PERSONA_KEY);
  let PERSONA = DEFAULT
  if (personaSelector && ALL_PERSONAS.includes(personaSelector)) {
    PERSONA = personaSelector
  }

  const eventSelector = new window.URLSearchParams(window.location.search).get(EVENT_KEY);
  let EVENT = 'dubai'
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
    "title": "Discover Dunes To Dazzling Heights In Dubai",
    "vidUrl": "https://www.youtube.com/watch?v=0oN-lQYJdvE",
    "subTitle": "Experience the allure of Dubai as you venture into the captivating realms of sand shifts to skyscrapers. Immerse yourself in vibrant cultures, and ancient wonders, and create extraordinary memories as you sail to this enchanting corner of the world.",
    "vidThumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/video-thumbnail-dubai.webp"
  }
  // console.log('roh ', CONTENT[EVENT][PERSONA].overview);
  return (
    <Layout>
      <main>
        <section>
          {<Banner data={CONTENT[EVENT][PERSONA].banner} />}
        </section>
        <section>
          {<Overview data={data} event={EVENT} />}
        </section>
        {CONTENT[EVENT][PERSONA].portsInfo && CONTENT[EVENT][PERSONA].portsInfo.ports && CONTENT[EVENT][PERSONA].portsInfo.ports.length ?
          <section>
            {<PortCard data={CONTENT[EVENT][PERSONA].portsInfo} destination={'Dubai'} shoreExTitle="Things to do" />}
          </section>
          : null}
        <section>
          {<Promotion destination="dubai" />}
        </section>
        <section>
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
              {<Suspense fallback={<div>Loading.....</div>}>
                <Testimonials data={CONTENT[EVENT][PERSONA].testimonials} />
              </Suspense>}
            </section>

          </>
        )}

        <section>
          {<GuestReview data={CONTENT[EVENT][PERSONA].banner} template={CONTENT[EVENT][PERSONA].template} />}
        </section>

        <section>
          <main className="container mx-auto py-16 px-3">
            <h1 className='text-2xl lg:text-4xl font-semibold'>Frequently asked Questions</h1>
            <div>
              <div className="mt-5 grid lg:grid-cols-2 gap-2">
                {faqString.map((val, i) => (
                  <div className='border border-gray-300 rounded shadow-md mb-3 cursor-pointer' key={i}>
                    <Accordion title={`${i + 1}  -  ${val.question}`}
                      titleClass="lg:text-lg text-base font-semibold py-4 px-4"
                    >
                      <div className='px-4 pb-5'>
                        <p className='text-sm lg:text-base font-medium'>{val.answer}</p>
                      </div>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </main>
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
    </Layout>
  );
}
