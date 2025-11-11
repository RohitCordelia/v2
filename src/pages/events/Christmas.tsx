import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../component/Layout';
import Button from '../../components/UI/Button';
import RequestACallback from '../../components/RequestACallback';
import { DinnerIcon, GlassIcon } from '../../components/Icons';
import EventsAccordion from '../../components/EventsAccordian';
import { Link, useNavigate } from 'react-router-dom';
import GlowingLine from './UI/GlowingLine';
import './newYear.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Modal from '../../components/UI/ModalCenter';
import StickyRAC from '../../component/Callback/StickyRAC';
import useMetaTags from 'react-metatags-hook'

const tabs = [
  { label: 'Overview', href: '#overview' },
  { label: 'Itinerary', href: '#itinerary' },
  { label: "What's Included", href: '#whatsIncluded', key: 'WhatsIncluded' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQs', href: '#faqs' }
];

const itineraryDays = [
  {
    day: 'Day 1 - Mumbai',
    date: 'Dec 22, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day1_Welcome_Aboard.webp',
        title: 'Welcome Aboard',
        // time: 'Time: 8pm',
        desc: 'Step onboard and settle into the holiday spirit. Unpack, explore the ship’s venues and enjoy your first moments at sea.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day1_Christmas_Sailaway_Party.webp',
        title: 'Christmas Sailaway Party',
        // time: 'Time: 8pm',
        desc: 'Kick off the season in style with a special Christmas Sailaway Party. Music, dance and festive cheer fill the open deck as Mumbai fades into the horizon.'
      }
    ]
  },
  {
    day: 'Day 2 - At Sea',
    date: 'Dec 23, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day2_A_Day_to_Indulge.webp',
        title: 'A Day to Indulge',
        // time: 'Time: 8pm',
        desc: 'Wake up to endless ocean views and a day made for relaxation. Whether it’s a spa session, poolside lounging or trying your hand at onboard activities, the day is yours to enjoy.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day2_Spectacular_Shows.webp',
        title: 'Evening Entertainment',
        // time: 'Time: 8pm',
        desc: 'As night falls, the ship comes alive with live music, stage performances and family fun that set the tone for the festive days ahead.'
      }
    ]
  },
  {
    day: 'Day 3 - Kochi',
    date: 'Dec 24, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day3_Fort_Kochi.webp',
        title: 'Explore Fort Kochi',
        // time: 'Time: 8pm',
        desc: 'Discover the charm of Fort Kochi with its historic streets, spice markets and vibrant harbour. Spend the day exploring before returning for onboard festivities.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day3_Christmas_Eve_Celebrations.webp',
        title: 'Christmas Eve Celebrations',
        // time: 'Time: 8pm',
        desc: 'The ship sparkles with holiday spirit. Join officers and crew for a joyful Carol Night in the atrium and immerse yourself in a night of Christmas Eve celebrations at sea.'
      }
    ]
  },
  {
    day: 'Day 4 - Lakshadweep',
    date: 'Dec 25, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day4_Christmas_on_the_Islands.webp',
        title: 'Christmas on the Islands',
        // time: 'Time: 8pm',
        desc: 'Spend Christmas Day exploring the pristine beaches and turquoise lagoons of Lakshadweep. Snorkel, sunbathe or simply soak in the serenity of the islands.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day4_Christmas+Gala+Dinner.webp',
        title: 'Christmas Gala Dinner',
        // time: 'Time: 8pm',
        desc: 'Back onboard, Christmas night unfolds with a grand Gala Dinner featuring gourmet holiday favourites, festive music, and the warmth of celebration.'
      }
    ]
  },
  {
    day: 'Day 5 - At Sea',
    date: 'Dec 26, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day5_Festive_Relaxation.webp',
        title: 'Festive Relaxation',
        // time: 'Time: 8pm',
        desc: 'Your holiday continues with time to recharge. From family-friendly activities to laid-back dining, every moment onboard is designed to keep the Christmas spirit alive.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day5_Evening_Magic.webp',
        title: 'Evening Magic',
        // time: 'Time: 8pm',
        desc: 'Gather with fellow guests for live music, themed parties and entertainment that ensures the season ends on a high note.'
      }
    ]
  },
  {
    day: 'Day 6 - Mumbai',
    date: 'Dec 27, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Day6_Arrival_%26_Farewell.webp',
        title: 'Arrival & Farewell',
        // time: 'Time: 8pm',
        desc: 'As dawn breaks over Mumbai’s harbour, it’s time to bid farewell. Disembark with hearts full of festive memories and stories of a Christmas unlike any other.'
      }
    ]
  }
];

const faqItems = [
  {
    title: 'How will Christmas be celebrated onboard?',
    content:
      'The ship will be decorated with Christmas trees, lights and festive décor. Guests can join Carol Night, meet Santa at the Christmas Parade, enjoy special holiday menus and celebrate with a Gala Dinner on Christmas night.'
  },
  {
    title: 'Will Santa meet the kids onboard?',
    content:
      'Yes. Santa will be part of the Christmas Parade and kids can meet him for photos and festive surprises.'
  },
  {
    title: 'Do I need to pack anything special for Christmas celebrations?',
    content:
      'We recommend bringing festive outfits for Christmas Eve and Christmas Night celebrations. Smart casuals are ideal for the rest of the cruise, and resort wear works well for sunny shore excursions. Don’t forget a Santa hat or Christmas sweater to embrace the holiday spirit.'
  },
  {
    title: 'Are Christmas activities included in the fare?',
    content:
      'Yes. Carol Night, kids’ workshops, the Christmas Parade, themed entertainment and festive décor are all included. Only select dining experiences and excursions may have additional charges.'
  },
  {
    title: 'What makes the Christmas Cruise different from a regular sailing?',
    content:
      'Every detail is themed for the season. From festive menus and décor to unique activities like Gingerbread Village, Carol Night and Santa Parade, this sailing is designed as a once-a-year celebration at sea.'
  },
  {
    title: 'Can I book a Christmas cruise at the last minute?',
    content:
      'While last-minute bookings are sometimes available, Christmas cruises tend to fill up quickly due to high demand. We highly recommend booking well in advance to secure your preferred cabin and enjoy better pricing.'
  }
];

const cruiseOverview = [
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Carol_Night_at_Sea.webp',
    title: 'Carol Night at Sea',
    desc: 'Join officers and crew in the atrium for live carol performances.'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Gingerbread_Village.webp',
    title: 'Gingerbread Village',
    desc: 'Marvel at a festive masterpiece created by our talented galley team.'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Parade+with_Santa.webp',
    title: 'Christmas Parade with Santa',
    desc: 'A joyous celebration where Santa and friends spread holiday cheer.'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Holiday_D%C3%A9cor_%26_Photospots.webp',
    title: 'Holiday Décor & Photospots',
    desc: 'Snap your Christmas postcard moments across the ship.'
  }
];

const statsImages = [
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_1.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_1.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_2.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_2.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_3.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_3.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_4.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_4.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_5.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_5.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_6.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_Gallery_6.webp'
  }
];

const features = [
  'Stateroom Accommodation',
  'Buffet Meals & Basic Drinks Package',
  'Show-stopping Entertainment',
  '50+ Onboard Activities',
  'Access to the swimming pool, fitness centre, and leisure zones',
  'Exclusive Christmas events, themed parties, and holiday décor throughout your cruise'
];

const Christmas = () => {
  const [playing, setPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeDayTab, setActiveDayTab] = useState(itineraryDays[0].day);
  const [showGallery, setShowGallery] = useState(false);
  const [showRAC, setShowRAC] = useState(false);
  const [stickUp, setStickUp] = useState(false);
  const scrollDaysRef = useRef<null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const tabsContainerRef = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRender = useRef(true);

  useMetaTags({
    title: 'Best Christmas Cruises from India | Cordelia Cruises',
    description: 'Set sail this Christmas with family-friendly celebrations, Santa visits, live shows & gala dinners on board. Explore our best Christmas cruise packages & reserve your cabin for a joyful holiday at sea!',
    metas: [
      {
        name: 'keywords',
        content:
          'cruise deals, cruise offers, last minute cruise deals, christmas cruise deals, christmas cruise, christmas cruise package, cruise vacation, best cruise packages, cruise packages, cruise ship price, cruise honeymoon packages, cruise deals from singapore'
      },
    ],
  })

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playVideo = () => {
      videoEl.play().catch(() => {});
    };

    if (firstRender.current) {
      // Wait until video is ready before playing
      const handleLoaded = () => {
        playVideo();
        firstRender.current = false;
      };

      videoEl.addEventListener('loadeddata', handleLoaded, { once: true });

      return () => {
        videoEl.removeEventListener('loadeddata', handleLoaded);
      };
    }

    // Subsequent renders — control playback based on stickUp
    if (!stickUp) {
      videoEl.pause();
    } else {
      playVideo();
    }
  }, [stickUp]);

  useEffect(() => {
    const currentTabEl = tabRefs.current[activeTab];
    if (currentTabEl) {
      setIndicatorStyle({
        left: currentTabEl.offsetLeft,
        width: currentTabEl.offsetWidth
      });
    }
  }, [activeTab]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const headerHeight = 70;
  //     const threshold = window.innerHeight - headerHeight;

  //     const handleScroll = () => {
  //       setStickUp(window.scrollY < threshold);
  //     };

  //     handleScroll();
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // });

  useEffect(() => {
    const headerHeight = 70;
    const threshold = window.innerHeight - headerHeight;

    // Pre-fetch section elements from tabs
    const sectionElements = tabs.map(({ label, key, href }) => {
      const tabKey = key || label.replace(/\s+/g, '');
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      return { key: tabKey, element: el };
    });

    const onScroll = () => {
      // Your stickUp logic
      setStickUp(window.scrollY < threshold);

      // Scroll spy logic
      let current = activeTab;
      for (const { key, element } of sectionElements) {
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= headerHeight + 10 && rect.bottom > headerHeight + 10) {
          current = key;
          break;
        }
      }
      if (current !== activeTab) {
        setActiveTab(current);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [activeTab]);

  useEffect(() => {
    const tabKey = activeTab;
    const currentTabElement = tabRefs.current[tabKey];
    const tabsContainerElement = tabsContainerRef.current;

    if (currentTabElement && tabsContainerElement) {
      const { offsetLeft, offsetWidth } = currentTabElement;

      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });

      const tabContainerWidth = tabsContainerElement.offsetWidth;

      // Target Scroll Position = (Tab's Left Edge) + (Half of Tab's Width) - (Half of Container's Width)
      const centerScrollPosition =
        offsetLeft + offsetWidth / 2 - tabContainerWidth / 2;

      tabsContainerElement.scrollTo({
        left: centerScrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeTab, tabs]);

  // Scroll to keep active tab in view on mobile
  // useEffect(() => {
  //   const activeEl = tabRefs.current[activeTab];
  //   const container = tabsContainerRef.current;

  //   if (activeEl && container && window.innerWidth < 1024) {
  //     // mobile only
  //     const elLeft = activeEl.offsetLeft;
  //     const elWidth = activeEl.offsetWidth;
  //     const containerWidth = container.offsetWidth;

  //     const scrollTo = elLeft - containerWidth / 2 + elWidth / 2;
  //     container.scrollTo({
  //       left: scrollTo,
  //       behavior: 'smooth'
  //     });
  //   }
  // }, [activeTab]);

  const handleTabClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleItineraryDayClick = (index: number, day: any) => {
    setActiveDayTab(day.day);

    // day.day == 'Day 3 - Kochi' &&
    //   window.innerWidth < 1024 &&
    tabRefs?.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  };

  return (
    <Layout isVideo={playing} footerClassName="!mt-0">
      <main className="bg-[#090D2A]">
        <div className="relative h-screen">
          <div className="aspect-video-custom top-0 aspect-square h-screen fixed w-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay={true}
              loop
              muted
              playsInline
              preload="auto"
              data-src="https://images.cordeliacruises.com/cordelia_v2/public/videos/cordelia-srilanka-mobile-banner.mp4"
              src={
                innerWidth < 768
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/videos/Christmas_Mobile1.mp4'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/videos/Christmas_Web1.mp4'
              }
            />
            <div
              className="absolute top-0 w-full h-screen"
              style={{
                background:
                  'linear-gradient(rgba(0, 0, 0, 0.9) 0%, rgba(9, 9, 121, 0) 20%, rgba(0, 212, 255, 0) 100%)'
              }}
            />
            <div className="absolute bottom-10 lg:bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex items-center">
              <a href="#mainShipPage" className="relative">
                <div className="w-20 h-20">
                  <img
                    className={`w-full h-full`}
                    src={
                      'https://images.cordeliacruises.com/cordelia_v2/public/assets/banner-go-down-animation.gif'
                    }
                  />
                </div>
                <div className="absolute bottom-0 w-20 h-20 bg-white/20 rounded-full" />
              </a>
            </div>
          </div>
        </div>
        <div id="mainShipPage" className="relative -mb-0.5 bg-[#090D2A] z-10">
          <div
            className={`bg-white text-black/60 sticky z-10 ${
              !stickUp ? 'top-0' : 'top-[65px] lg:top-[69px]'
            }`}
          >
            <div className=" container mx-auto lg:flex lg:justify-between lg:items-center">
              <ul
                ref={tabsContainerRef}
                className="relative flex gap-3 overflow-x-auto text-xs lg:text-lg font-semibold whitespace-nowrap w-full items-center lg:justify-evenly"
              >
                {/* Sliding indicator */}
                <span
                  className="absolute bottom-0 h-[2px] lg:h-[4px] bg-[#720101] transition-all duration-300 ease-in-out"
                  style={indicatorStyle}
                ></span>

                {tabs.map(({ label, href, key }) => {
                  const tabKey = key || label.replace(/\s+/g, '');
                  const isActive = activeTab === tabKey;

                  return (
                    <li
                      key={tabKey}
                      ref={(el) => (tabRefs.current[tabKey] = el)}
                      className={`p-5 cursor-pointer transition-all duration-200 ${
                        isActive ? 'text-[#720101]' : ''
                      }`}
                      style={{
                        textShadow: isActive ? '0 0 16px white' : 'none'
                      }}
                      // onClick={() => setActiveTab(tabKey)}
                      onClick={(e) => handleTabClick(e, href, tabKey)}
                    >
                      <a href={href}>{label}</a>
                    </li>
                  );
                })}

                {/* Book Now button - only on large screens */}
                <li className="hidden lg:block">
                  <Button
                    text="Book Now"
                    size="sm"
                    handleClick={() =>
                      window.open(
                        '/upcoming-cruises?da=22122025&db=23122025&n=5',
                        '_blank',
                        'noreferrer'
                      )
                    }
                    className="rounded-full px-8"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="text-white h-auto lg:h-[2100px] bg-cover bg-no-repeat bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_bg1_mobile.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Christmasnew_bg1_web.webp)]">
              <div className="container mx-auto">
                <section
                  id="overview"
                  className="px-4 py-12 lg:pb-24 scroll-mt-8"
                >
                  <div className="text-center lg:mt-8 mb-6 lg:mb-16">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      A{' '}
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            'rgb(234, 114, 91) 0px 0px 16px, rgb(234, 114, 91) 0px 0px 16px, rgb(234, 114, 91) 0px 0px 16px'
                        }}
                      >
                        Magical Christmas
                      </span>{' '}
                      at Sea
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                      Cordelia’s Christmas Cruise is where festive magic, family
                      time, and year-end indulgence come together. Sail from
                      Mumbai to Kochi and Lakshadweep, with twinkling lights,
                      island escapes, and holiday celebrations at sea.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="hidden lg:block lg:w-[180px] lg:absolute lg:top-[260px] lg:-right-24 z-[1]">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Chirstmas_Gingerbread.svg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden lg:block lg:w-32 lg:absolute lg:-top-[60px] lg:-left-12 z-[1]">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Chirstmas_Stick.svg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-3 lg:gap-4 flex-wrap text-black">
                      {cruiseOverview.map((overview, index) => (
                        <div
                          key={overview.title}
                          className={`basis-[155px] lg:basis-[250px] flex-1 rounded-md p-1.5 lg:p-2 bg-white transition-transform duration-300 lg:hover:-translate-y-2`}
                        >
                          <div className="rounded-md mb-2 h-auto aspect-[1.23] overflow-hidden">
                            <img
                              src={overview.img}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm lg:text-lg font-semibold line-clamp-2">
                            {overview.title}
                          </span>
                          <p className="text-xs lg:text-base leading-5 text-black/80 pt-1.5">
                            {overview.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <div
                  className="rounded-md overflow-hidden cursor-pointer mx-4 mb-3 lg:mb-10"
                  onClick={() => setShowRAC(true)}
                >
                  <img
                    src={
                      innerWidth > 600
                        ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/Mid_scroll_banner_web.webp'
                        : 'https://images.cordeliacruises.com/cordelia_v2/public/images/Mid_scroll_banner_mob.webp'
                    }
                    alt="christmas_mid_banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <section
                  id="itinerary"
                  className="px-4 py-12 -mt-[1px] relative container mx-auto z-[2] lg:py-20 scroll-mt-8"
                >
                  <div className="text-center mb-8 lg:mb-16">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      Christmas{' '}
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            '0 0 16px rgb(234, 114, 91), 0 0 16px rgb(234, 114, 91), 0 0 16px rgb(234, 114, 91)'
                        }}
                      >
                        Cruise Itinerary
                      </span>{' '}
                      Awaits
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                      The heart of Christmas beats loudest at sea. From island
                      escapes to grand gala dinners, Cordelia Empress is where
                      the season’s magic truly comes alive.
                    </p>
                  </div>

                  <div
                    ref={scrollDaysRef}
                    className={`flex justify-between p-1 text-white bg-[#FFFFFF29] border border-[#FFFFFF50] backdrop-blur-sm rounded-full my-5 lg:my-10 lg:mx-auto w-full lg:w-3/4 overflow-x-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden`}
                  >
                    {itineraryDays.map((day, index) => (
                      <div
                        key={index}
                        ref={(el) => (tabRefs.current[index] = el)}
                        onClick={() => handleItineraryDayClick(index, day)}
                        className={`py-3 lg:py-3.5 px-4 lg:px-6 cursor-pointer lg:font-medium flex-shrink-0 text-center opacity-80 ${
                          activeDayTab === day.day
                            ? 'opacity-100 border border-white rounded-full text-black bg-white'
                            : ''
                        }`}
                      >
                        <span className="text-xs lg:text-base font-bold block">
                          {day.day}
                        </span>
                        <span className="text-xxs lg:text-sm font-medium">
                          {day.date}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 lg:mt-16 lg:mx-[5%]">
                    <div className="">
                      {itineraryDays.map(
                        (day, idx) =>
                          activeDayTab === day.day &&
                          day?.cards.map((card: any) => (
                            <div className="flex gap-3 p-1.5 lg:p-3 rounded-2xl text-black bg-gradient-to-r from-[#FFFFFFCC] to-[#FFFFFF] backdrop-blur-sm mb-3 lg:mb-5">
                              <div
                                key={card.title}
                                className="basis-2/5 lg:basis-[22%] rounded-2xl overflow-hidden aspect-[0.82] lg:aspect-[1.6] h-auto"
                              >
                                <img
                                  src={card.img}
                                  alt={card.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="basis-3/5 lg:basis-[78%] lg:py-4 mt-2 lg:mt-0">
                                <h3 className="font-openSans text-xs lg:text-base font-bold mb-1 opacity-85 leading-5">
                                  {card.title}
                                  <span className="text-brand-primary">
                                    {card.time}
                                  </span>
                                </h3>
                                <p className="text-xxs lg:text-sm leading-5 lg:leading-7 text-black">
                                  {card.desc}
                                </p>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                    <div className="text-center mt-8 lg:mt-16">
                      <Button
                        text="Book Your Christmas Cruise"
                        size={innerWidth > 600 ? 'base' : 'sm'}
                        handleClick={() =>
                          window.open(
                            '/upcoming-cruises?da=22122025&db=23122025&n=5',
                            '_blank',
                            'noreferrer'
                          )
                        }
                        className="rounded-full"
                        btnStyle={{
                          boxShadow: `
                            inset 0 0 0 #FF725D,
                            0 0 1px #FF725D,
                            0 0 6px #FF725D,
                            0 0 12px #FF725D
                          `
                        }}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="text-white relative mt-10 lg:-mt-32 h-[680px] lg:h-auto bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_bg2_mobile_new.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_bg2_v2_web.webp)] bg-no-repeat bg-cover">
              <div className="hidden lg:block lg:w-[280px] absolute lg:top-10 lg:right-0">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Christmas+_bell.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:block absolute lg:top-10 lg:right-0 z-[1] animate-blinkBubble">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/images/Glow_bg_new_web.webp"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <section
                id="whatsIncluded"
                className="relative z-[2] px-4 py-16 -mt-24 lg:-mt-20 container mx-auto lg:py-24 scroll-mt-0"
              >
                <div className="pt-10 lg:basis-1/2 lg:self-center">
                  <div className="text-center lg:mt-8 mb-10 lg:mb-20">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      What's{' '}
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            'rgb(234, 114, 91) 0px 0px 16px, rgb(234, 114, 91) 0px 0px 16px, rgb(234, 114, 91) 0px 0px 16px'
                        }}
                      >
                        Included
                      </span>
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                      Your year-end vacation, upgraded to unforgettable.
                    </p>
                  </div>
                </div>
                <div className="lg:flex lg:gap-6">
                  <ul className="mb-8 lg:mb-0 lg:basis-1/2 lg:self-center">
                    {features.map((feature, index) => (
                      <li key={index} className="mb-4 flex items-start gap-2">
                        <span className="w-6 shrink-0">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sail-bullet-icon.svg"
                            alt="Sail bullet icon"
                            className="w-full h-auto"
                          />
                        </span>
                        <p className="text-sm lg:text-lg">{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="hidden lg:block lg:basis-1/2 px-4 relative container mx-auto">
                    <div className="lg:hidden w-44 lg:w-56 absolute -top-20 -right-8 lg:top-[-100px] lg:-right-20">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Chirstmas_Gift1.svg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden lg:w-56 absolute lg:top-[400px] lg:-left-20">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Chirstmas_Gift2.svg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <RequestACallback
                      title="Yes, I Want to Sail This Christmas"
                      titleClassName="!lg:text-[28px]"
                      btnText="Call Me Back"
                      submitClassName={
                        innerWidth > 600
                          ? 'w-auto rounded-full w-[360px]'
                          : 'w-full rounded-full'
                      }
                      btnStyle={{
                        boxShadow: `
                          inset 0 0 0 #FF725D,
                          0 0 1px #FF725D,
                          0 0 6px #FF725D,
                          0 0 12px #FF725D
                        `
                      }}
                      desktopMode={false}
                      pageCode="christmas"
                    />
                  </div>
                  {/* <div className="relative z-[1] lg:basis-1/2">
                    <div className="mb-2.5 border border-white rounded-md shadow-[#FF725D] overflow-hidden">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_experience1.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2.5">
                      <div className="border border-white rounded-md shadow-[#FF725D] overflow-hidden">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_experience2.webp"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="border border-white rounded-md shadow-[#FF725D] overflow-hidden">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_experience3.webp"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </section>
            </div>
            <div className="text-white -mt-[150px] pt-16 lg:pt-8 lg:-mt-8 relative overflow-hidden bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_bg3_mobile.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_bg3_web.webp)] bg-cover bg-no-repeat">
              <div className="lg:pb-32">
                <section id="gallery" className="pt-12 lg:pt-10 pb-4">
                  <div className="lg:hidden lg:basis-1/2 px-4 relative container mx-auto">
                    <div className="w-44 lg:w-56 absolute -top-20 -right-8 lg:top-[-100px] lg:-right-20">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Chirstmas_Gift1.svg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden lg:block lg:w-56 absolute lg:top-[180px] lg:-left-20">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Chirstmas_Gift2.svg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <RequestACallback
                      title="Yes, I Want to Sail This Christmas"
                      titleClassName="lg:text-3xl"
                      btnText="Call Me Back"
                      submitClassName={
                        innerWidth > 600
                          ? 'w-auto rounded-full w-[360px]'
                          : 'w-full rounded-full'
                      }
                      btnStyle={{
                        boxShadow: `
                          inset 0 0 0 #FF725D,
                          0 0 1px #FF725D,
                          0 0 6px #FF725D,
                          0 0 12px #FF725D
                        `
                      }}
                      desktopMode={true}
                      pageCode="christmas"
                    />
                  </div>
                  <div className="text-center px-4 mt-16 lg:mt-0 mb-4 lg:mb-20 container mx-auto scroll-mt-20 lg:scroll-mt-[120px]">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      The Christmas Cruise in{' '}
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            '0 0 16px rgb(234, 114, 91), 0 0 16px rgb(234, 114, 91), 0 0 16px rgb(234, 114, 91)'
                        }}
                      >
                        Frames
                      </span>
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                      Every photo tells a story of family time, festive flavours
                      and the joy of celebrating Christmas on the ocean.
                    </p>
                  </div>
                  <div
                    className="text-center cursor-pointer"
                    onClick={() => setShowGallery(true)}
                  >
                    <img
                      src={
                        innerWidth > 600
                          ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/ChristmasTree-Gallery1-web-v2.webp'
                          : 'http://images.cordeliacruises.com/cordelia_v2/public/images/ChristmasTree1-mob-v2.webp'
                      }
                      alt="christmas_tree_gallery"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      text="View Gallery"
                      size={innerWidth > 600 ? 'base' : 'sm'}
                      handleClick={() => setShowGallery(true)}
                      className="rounded-full mt-5 animate-blinkBlue"
                      btnStyle={{
                        boxShadow: `
                          inset 0 0 0 #FF725D,
                          0 0 1px #FF725D,
                          0 0 6px #FF725D,
                          0 0 12px #FF725D
                        `
                      }}
                    />
                  </div>
                </section>
                <section
                  id="faqs"
                  className="px-4 pt-12 pb-4 container mx-auto scroll-mt-8 lg:scroll-mt-16"
                >
                  <div className="text-center mb-8 lg:mb-16">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      Frequently Asked{' '}
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            '0 0 16px rgb(234, 114, 91), 0 0 16px rgb(234, 114, 91), 0 0 16px rgb(234, 114, 91)'
                        }}
                      >
                        Questions
                      </span>
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                      All you need to know for a seamless celebration at sea.
                    </p>
                  </div>
                  <EventsAccordion
                    items={faqItems}
                    isBgDark={false}
                    isLoadMoreEnabled={innerWidth < 768}
                    initialItems={6}
                  />
                </section>
                <section className="px-4 pt-12 pb-32 container mx-auto lg:py-20">
                  <div className="text-center mb-8 lg:mb-16">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      Explore Other{' '}
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            '0 0 16px #EA725B, 0 0 16px #EA725B, 0 0 16px #EA725B'
                        }}
                      >
                        Festival Cruises
                      </span>
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto mb-6">
                      Celebrate more than just New Year! Join us for
                      unforgettable festivities at sea all year round.
                    </p>
                  </div>
                  <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4 justify-center">
                    <div className="rounded-md overflow-hidden lg:basis-1/2">
                      <div>
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-06.webp"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 lg:p-6 bg-white backdrop-blur-lg">
                        <h4 className="uppercase mb-3 font-openSans font-bold text-lg lg:text-2xl text-black">
                          Looking for the Biggest Celebration of the Season?
                        </h4>
                        <span
                          className="bg-brand-gradient bg-clip-text block mb-3 font-bold lg:text-lg"
                          style={{ color: 'transparent' }}
                        >
                          A Magical Holiday at Sea
                        </span>
                        <p className="text-sm lg:text-xl font-medium leading-6 lg:leading-8 mb-4 text-black/60">
                          End the year the right way with our spectacular New
                          Year Cruise. Fireworks at sea, countdown parties, and
                          the ultimate way to welcome 2026.
                        </p>
                        <Button
                          text="Explore New Year Cruise"
                          size={innerWidth > 600 ? 'base' : 'sm'}
                          handleClick={() =>
                            window.open(
                              '/new-year-cruise',
                              '_blank',
                              'noreferrer'
                            )
                          }
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal
        show={showGallery}
        align={'center'}
        className="w-full lg:w-3/5 relative"
        onClose={() => setShowGallery(false)}
      >
        <div className=" w-full h-full p-3 lg:pr-[7px] rounded-lg">
          <div
            className="absolute right-0 lg:-right-10 -top-12 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
            onClick={() => setShowGallery(false)}
          >
            <p className="text-sm lg:text-2xl"> X </p>
          </div>

          <ImageGallery
            items={statsImages}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={false}
            slideInterval={5000}
            showThumbnails={true}
            thumbnailPosition={'bottom'}
            startIndex={0}
            lazyLoad={true}
          />
        </div>
      </Modal>

      <Modal
        show={showRAC}
        align={'center'}
        className="w-full lg:w-1/3 relative"
        onClose={() => setShowRAC(false)}
      >
        <div className='relative'>
          <div className="border-b border-gray-300 p-4 absolute right-0">
            <svg
              onClick={() => setShowRAC(false)}
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
          <RequestACallback
            title="Your Christmas Cruise Awaits"
            titleClassName="italic"
            subTitle="Fill in your details and our team will call you back to help secure your festive sailing. Cabins are filling quickly."
            submitClassName={
              innerWidth > 600
                ? 'w-auto rounded-full w-[360px]'
                : 'w-full rounded-full'
            }
            btnStyle={{
              boxShadow: `
                inset 0 0 0 #FF725D,
                0 0 1px #FF725D,
                0 0 6px #FF725D,
                0 0 12px #FF725D
              `
            }}
            desktopMode={false}
            footerText="By submitting this form, you agree to be contacted by Cordelia Cruises for booking assistance."
            pageCode="christmas"
          />
        </div>
      </Modal>

      <StickyRAC />
    </Layout>
  );
};

export default Christmas;
