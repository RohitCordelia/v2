import React, { Suspense, useEffect, useRef, useState } from "react";
import useMetaTags from 'react-metatags-hook'

// @ts-ignore
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "/src/constants/userConstants";
// @ts-ignore
import content1 from '/src/pages/home/content.json';
import Layout from '../../component/Layout';
import Banner from '../../component/Banner';
import Overview from '../../component/Overview';
import Destination from '../../component/Destination';
import SafetyProtocol from '../../component/SafetyProtocol';
import LeadForm from '../../component/LeadForm';
import DownloadApp from '../../component/DownloadApp';
import Awards from '../../component/Awards';
import Testimonial from '../../component/Testimonial';
import VideoReview from '../../component/VideoReview';
import Subscribe from '../../component/Subscribe';
import Experience from '../../component/Experience';
import Gallery from '../../component/Gallery';
import UpcomingCruise from '../../component/UpcomingCruise';
import ExitIntent from "../../components/ExitIntent";
import OurFleet from "../../component/OurFleet";
// import ReactPlayer from "react-player";
// import './index.css';
// // const ReactPlayer = React.lazy(() => import("react-player/youtube"));

// const muteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/mute-new-icon.svg"
// const unmuteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/volume-new-icon.svg"

type Props = {};
const CONTENT: any = content1


export default function Home(props: Props) {
    const [playing, setPlaying] = useState(true);
    const [showStripeHeader, setShowStripeHeader] = useState(true);
    const [stripeHeight, setStripeHeight] = useState<number | null>(null);
    // const [isPlay, setIsPlay] = useState(false);
    // const [isPlaying, setIsPlaying] = useState<any>(true);
    // const [isVideoReady, setIsVideoReady] = useState<any>(false);
    // const [isMute, setIsMute] = useState<any>(true);
    // const [currentDuration, setCurrentDuration] = useState(0);
    // const playerRef = useRef();

    const handleStripeHeight = (height: number) => {
      setStripeHeight(height);
    };

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
        if (new URLSearchParams(window.location.search).has('contact')) {
            document.getElementById('contact')?.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            })
        }
    }, [])
    
    return (
        <Layout isVideo={playing} showStripeHeader={showStripeHeader} setShowStripeHeader={setShowStripeHeader} onStripeHeightChange={handleStripeHeight}>
            <main>
                <section style={{ marginTop: window.innerWidth > 600 && showStripeHeader && stripeHeight ? `${stripeHeight + 46}px` : window.innerWidth < 600 && showStripeHeader && stripeHeight ? `${stripeHeight + 16}px` : "0px" }} className={`mt-16`}>
                    <Banner data={CONTENT[EVENT][PERSONA].banner} />
                </section>
                <section className="mt-10 lg:mt-20">
                    <OurFleet />
                </section>
                {/* <section className="mt-10 lg:mt-22">
                    <Overview data={CONTENT[EVENT][PERSONA].overview} />
                </section> */}
                <section className="mt-14 lg:mt-24">
                    <Destination />
                </section>
                <section className="mt-14 lg:mt-24">
                    <UpcomingCruise />
                </section>
                {/* <section className="mt-14 lg:mt-24">
                    <Gallery />
                </section> */}
                <section className="mt-14 lg:mt-24">
                    <Experience content={CONTENT[EVENT][PERSONA].info_cards} info_section={CONTENT[EVENT][PERSONA].info_section} />
                </section>
                <section className="mt-14 lg:mt-24">
                    <Subscribe />
                </section>
                {/* <section className="mt-14 lg:mt-24">
                    <VideoReview data={CONTENT[EVENT][PERSONA].banner} />
                </section> */}
                <section className="mt-14 lg:mt-24">
                    <Testimonial data={CONTENT[EVENT][PERSONA].testimonials} />
                </section>
                <section className="mt-14 lg:mt-24" id="contact">
                    <LeadForm />
                </section>
                <section className="mt-14 lg:mt-24">
                    <Awards />
                </section>
                <section className="mt-64 lg:mt-24">
                    <DownloadApp />
                </section>
                <section className="mt-0 lg:mt-24">
                    <SafetyProtocol />
                </section>
            </main>
            <ExitIntent />
        </Layout>
    );
}
