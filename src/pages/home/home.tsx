import React, { Suspense, useEffect, useState } from "react";
import useMetaTags from 'react-metatags-hook'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { SaveAnimation, GetAnimation } from '../../utils/store/store';
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import content1 from '/src/pages/home/content.json';
// @ts-ignore
import Banner from '/src/components/banner';
import Modal from '../../components/UI/Modal';
// @ts-ignore
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "/src/constants/userConstants";
// @ts-ignore
import { TiggerGAPersona, TiggerGATheme } from "../../../src/components/Analytics/events";
import { saveRefUrl } from "../../../src/utils/user/user";
import { Player } from '@lottiefiles/react-lottie-player';

import ExitIntent from "../../components/ExitIntent";
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
import DestinationLeadForm from "../../components/UI/LeadForm/destinationLeadForm";
// @ts-ignore
const SafetyProtocol = React.lazy(() => import("/src/components/SafetyProtocol/safetyProtocol"));
// @ts-ignore
const Promotion = React.lazy(() => import("/src/components/Promotion"));
// @ts-ignore
const PortCard = React.lazy(() => import("/src/components/PortCard"));

const FestDate = [
  {
    'festName': 'Ganesh Chatruthi',
    // 'startDate': '09-18-2023 00:00:01',
    // 'endDate': '09-18-2023 23:59:00',
    'startDate': '2023-09-19 00:00:01',
    'endDate': '2023-09-28 15:00:00',
    'audio': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/ganesha-audio.mp3',
    'animation': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vinayaka-desktop.json',
    'animationMobile': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vinayaka-mobile.json',
    'headerAnimation': 'https://images.cordeliacruises.com/cordelia_v2/public/images/ganesh-chaturthi.gif'
  },
  // {
  //   'festName': 'Navratri',
  //   'startDate': '10-15-2023 00:00:01',
  //   'endDate': '10-24-2023 23:59:00',
  //   'audio': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/ganesha-audio.mp3'
  // },
  // {
  //   'festName': 'Karwa Chauth',
  //   'startDate': '11-01-2023 00:00:01',
  //   'endDate': '11-01-2023 23:59:00',
  //   'audio': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/ganesha-audio.mp3'
  // },
  // {
  //   'festName': 'Diwali',
  //   'startDate': '11-13-2023 00:00:01',
  //   'endDate': '11-13-2023 23:59:00',
  //   'audio': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/ganesha-audio.mp3'
  // },
  // {
  //   'festName': 'Christmas',
  //   'startDate': '12-25-2023 00:00:01',
  //   'endDate': '12-25-2023 23:59:00',
  //   'audio': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/ganesha-audio.mp3'
  // },
  // {
  //   'festName': 'New Years Eve',
  //   'startDate': '12-31-2023 00:00:01',
  //   'endDate': '12-31-2023 23:59:00',
  //   'audio': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/ganesha-audio.mp3'
  // },
]

type Props = {};

const CONTENT: any = content1

export default function Home(props: Props) {
  let navigate = useNavigate()
  const storeAnimation = GetAnimation();

  const [festivalModal, setFestivalModal] = useState(false)
  const [animation, setAnimation] = useState<any>('');
  const [headerAnimation, setHeaderAnimation] = useState<any>('');
  const [heights, setHeights] = useState<any>('');
  const [audioIcon, setAudioIcon] = useState<any>('https://images.cordeliacruises.com/cordelia_v2/public/assets/mute-icon.svg');

  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<any>();

  function checkFestivals() {
    var currentTime = moment(new Date());
    
    FestDate.forEach((fest) => {
      // compareDate.isBetween(startDate, endDate);
      const startDate = moment(fest.startDate);
      const endDate = moment(fest.endDate);
      if (currentTime.isBetween(startDate, endDate)) {
        console.log('time', window.innerHeight);
        setHeaderAnimation(fest.headerAnimation)
        setAudio(new Audio(fest.audio))
        // if(storeAnimation.festivalName == fest.festName){
        // }else{
        if (window.innerWidth < 768) {
          setAnimation(fest.animationMobile)
        } else{
          setAnimation(fest.animation)
        }
        // else if (window.innerWidth <= 1200) {
        //   setHeights(500)
        //   setAnimation(fest.animation)
        // } else {
        //   setHeights(650)
        //   setAnimation(fest.animation)
        // }
        setFestivalModal(true)
        // SaveAnimation({ festivalName: fest.festName });
        // }
      }
    });
  }

  useEffect(() => {
    checkFestivals();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setFestivalModal(false)
      setAnimation('')
      audio && audio.pause()
    }, 15000);
  }, [])

  const togglePlay = () => {
    if (playing) {
      audio.pause()
      setAudioIcon('https://images.cordeliacruises.com/cordelia_v2/public/assets/mute-icon.svg')
    } else {
      audio.play()
      setAudioIcon('https://images.cordeliacruises.com/cordelia_v2/public/assets/volume-icon.svg')
    }
    setPlaying(!playing)
  }
  
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
  const personaSelector = new window.URLSearchParams(window.location.search).get(PERSONA_KEY);
  let PERSONA = DEFAULT
  if (personaSelector && ALL_PERSONAS.includes(personaSelector)) {
    PERSONA = personaSelector
  }

  const eventSelector = new window.URLSearchParams(window.location.search).get(EVENT_KEY);
  let EVENT = DEFAULT
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

  return (
    <Layout headerAnimation={headerAnimation}>
      <main>
        <section>
          {<Banner data={CONTENT[EVENT][PERSONA].banner} />}
        </section>
        <section>
          {<Overview data={CONTENT[EVENT][PERSONA].overview} />}
        </section>
        {CONTENT[EVENT][PERSONA].portsInfo && CONTENT[EVENT][PERSONA].portsInfo.ports && CONTENT[EVENT][PERSONA].portsInfo.ports.length ?
          <section>
            {<PortCard data={CONTENT[EVENT][PERSONA].portsInfo} />}
          </section>
          : null}
        <section>
          {<GuestReview data={CONTENT[EVENT][PERSONA].banner} />}
        </section>
        <section>
          {<Promotion />}
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


        <section id="contact">
          {<Suspense fallback={<div>Loading.....</div>}>
            <DestinationLeadForm />
          </Suspense>}
        </section>
        <section>
          {<Suspense fallback={<div>Loading.....</div>}>
            <SafetyProtocol />
          </Suspense>}
        </section>
        <section className="hidden lg:block" id="downloadApp">
          <DownloadApp />
        </section>
      </main>
      <Modal show={festivalModal} align={'center'} className=" w-full center h-screen bg-black/70" onClose={() => setFestivalModal(false)}>
        <div className='flex items-center justify-between p-4'>
          <h1 className='text-lg lg:text-2xl font-semibold'>Select Deck</h1>
          <p className='text-base lg:text-2xl font-bold cursor-pointer text-white pr-10 pt-5' onClick={() => setFestivalModal(false)}>X</p>
        </div>
        <div className='px-4  pb-2'>
          <div className="flex flex-col items-center">
            <Player
              src={animation}
              style={{ height: (window.innerHeight-200) }}
              loop
              autoplay
            />
            <div className="flex w-full items-center justify-center ml-20">
              <button
                onClick={() => navigate('/upcoming-cruises')}
                style={{
                  backgroundImage: 'linear-gradient(to right, #FFEBA3 0%, #CFA35C  100%)'
                }}
                className=" w-[40%] lg:w-[12%] py-2.5 rounded-md font-semibold"
              >Cruise Now</button>
              <img
                onClick={togglePlay}
                className="ml-10"
                src={audioIcon}
              />
            </div>
          </div>
        </div>
      </Modal>
      <ExitIntent/>
    </Layout>
  );
}
