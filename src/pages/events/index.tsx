import React, { Suspense, useEffect, useState } from 'react';
import useMetaTags from 'react-metatags-hook';
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import Banner from '/src/components/banner';
import ExitIntent from '../../components/ExitIntent';
import './index.css';
// import Christmas from '../../component/Events/christmas';
import Holi from '../../component/Events/holi';
import Summer from '../../component/Events/summer';
// import Newyear from '../../component/Events/newyear';
import Valentine from '../../component/Events/valentine';
import LeadGenForm from "../../components/UI/LeadForm";

type Props = {};


export default function Home(props: Props) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [events, setEvents] = useState('');

  var [timer, setTimer] = useState<number>(30);
  const END_TIMER = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMetaTags({
    title:
      'Plan Your Luxurious Cruise Vacation Holiday On  a Ship | Cordelia Cruises',
    description:
      'Looking for a cruise holiday? Book luxury vacation cruises ship to stunning destinations with comfort stays, entertainment, dining and fun activities at Cordelia',
    metas: [
      {
        name: 'keywords',
        content:
          'cordelia, cordelia cruises, cordelia cruise ship, cordelia cruises website, cruise cordelia, cordelia cruises ship, cruise ship cordelia, cruise entertainment, cruise dining, cruise activities, cruise stay, cruise accomodation, luxurious cruise, cordeliacruises'
      }
    ]
  });

  const banner = {
    images: [
      {
        url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Friday31_Event_Desktop_1920x400.webp',
        link: '#',
        altTag: 'friday31'
      },
      //   {
      //     url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-holi%2725-event-banner-desktop.webp',
      //     link: '#',
      //     altTag: 'holi'
      //   },
      //   {
      //     url: 'http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-where-else-desktop-banner.webp',
      //     link: '#',
      //     altTag: 'Summer'
      //   }
    ],
    mobileImages: [
      {
        url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Friday31_Event+Mobile_563x255.webp',
        link: '#',
        altTag: 'friday31'
      },
      //   {
      //     url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-holi%2725-event-banner-mobile.webp',
      //     link: '#',
      //     altTag: 'holi'
      //   },
      //   {
      //     url: 'http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-where-else-offer-image.webp',
      //     link: '#',
      //     altTag: 'Summer'
      //   }
    ]
  };
  
  return (
    <Layout>
      <main>
        <section>
          <Banner data={banner} />
        </section>
        <section className='mb-10'>
          <LeadGenForm page_code='Events' />
        </section>
        <section className="py-20 !pt-24 relative">
          <div className="text-center relative">
            <div className="container mx-auto px-4 lg:px-32 text-center">
              <h1 className='text-2xl lg:text-4xl lg:font-medium px-4 leading-7'>Holiday Events On The Ocean</h1>
            </div>
            <div className="mt-6 flex flex-wrap justify-center">
              <div className="px-1 mb-2">
                <button
                  onClick={() => {
                    setEvents('weekend')
                    document.getElementById('weekend')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'start',
                    })
                  }}
                  className={`${events == 'weekend' ? 'text-white bg-brand-primary' : 'text-brand-primary'} border-2 border-brand-primary px-5 py-2.5 rounded-lg font-semibold`}
                >
                  Weekend
                </button>
              </div>
              {/* <div className="px-1 mb-2">
                <button
                  onClick={() => {
                    setEvents('summer')
                    document.getElementById('summer')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'start',
                    })
                  }}
                  className={`${events == 'summer' ? 'text-white bg-brand-primary' : 'text-brand-primary'} border-2 border-brand-primary px-5 py-2.5 rounded-lg font-semibold`}
                >
                  Summer
                </button>
              </div> */}
            </div>
          </div>
        </section>
        {/* <section
                    id="christmas"
                    style={{
                        scrollMarginTop: '70px'
                    }}
                >
                    <Christmas />
                </section> */}
        {/* <section
                    id="newyear"
                    style={{
                        scrollMarginTop: '70px'
                    }}
                >
                    <Newyear />
                </section> */}
        {/* <section
                    id="valentine"
                    style={{
                        scrollMarginTop: '70px'
                    }}
                >
                    <Valentine />
                </section> */}
        <section
          id="weekend"
          style={{
            scrollMarginTop: '70px'
          }}
        >
          <Holi />
        </section>
        {/* <section
          id="summer"
          style={{
            scrollMarginTop: '70px'
          }}
        >
          <Summer />
        </section> */}
      </main>
      <ExitIntent />


    </Layout>
  );
}
