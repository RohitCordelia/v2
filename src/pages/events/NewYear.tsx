import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../component/Layout';
import Button from '../../components/UI/Button';
import RequestACallback from '../../components/RequestACallback';
import {
  CelebrateIcon,
  DinnerIcon,
  GlassIcon,
  WineGlassIcon
} from '../../components/Icons';
import EventsAccordion from '../../components/EventsAccordian';
import { Link, useNavigate } from 'react-router-dom';
import GlowingLine from './UI/GlowingLine';
import './newYear.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Modal from '../../components/UI/ModalCenter';
import useDeviceDetection from '../../utils/customHooks/useDeviceDetection';
import StickyRAC from '../../component/Callback/StickyRAC';
import useMetaTags from 'react-metatags-hook'

const tabs = [
  { label: 'Overview', href: '#overview' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Itinerary', href: '#itinerary' },
  { label: "What's Included", href: '#whatsIncluded', key: 'WhatsIncluded' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQs', href: '#faqs' }
];

const itineraryDays = [
  {
    day: 'Day 1: Mumbai',
    date: 'Dec 27, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-01-aboard-desktop.webp',
        title: 'Welcome Aboard Experiences',
        desc: "Unpack, explore the ship's venues, and enjoy your first moments at sea. Whether it's sipping a tropical cocktail by the pool, visiting the spa, or catching a sunset from the deck, the first evening is all about discovering your floating getaway."
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-01-sailaway-party-desktop.webp',
        title: 'Carnival Sailaway Party',
        desc: 'Step aboard and start the holiday in high spirits as dancers in vibrant costumes and DJs turn the open deck into a festival. Watch Mumbai fade into the horizon as music and celebration set the tone for your cruise.'
      }
    ]
  },
  {
    day: 'Day 2: At Sea',
    date: 'Dec 28, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-02-day-indulge-desktop.webp',
        title: 'A Day to Indulge',
        desc: 'Wake up to endless ocean views and a day without limits. Treat yourself to spa therapies, savour gourmet dining, lounge by the pool, or try your hand at fun activities. Every corner of the ship offers a new delight to explore.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-02-shows-desktop.webp',
        title: 'Spectacular Shows',
        desc: "As evening falls, the stage lights up with musicals, magic acts, and world-class performances that rival any theatre on land. From high-energy productions to intimate lounge acts, it's entertainment designed to dazzle, surprise, and keep you talking long after the curtain falls."
      }
    ]
  },
  {
    day: 'Day 3: Goa',
    date: 'Dec 29, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-03-goa-shoreex-desktop.webp',
        title: 'Goan Shores & Culture',
        desc: 'Spend the day strolling through colourful Portuguese streets, browsing local markets, or lounging on sun-kissed beaches. Indulge in fresh seafood, aromatic spices, and laid-back beach cafés before returning to the ship with a heart full of coastal charm.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-03-eve-deck-desktop.webp',
        title: 'Evening Deck Entertainment',
        desc: 'Back onboard, the evening comes alive with themed shows, live bands, and the gentle hum of the ocean as your backdrop. Take in the warm sea breeze, grab a drink, and let the music carry you into the night.'
      }
    ]
  },
  {
    day: 'Day 4: Lakshadweep',
    date: 'Dec 30, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-04-island-adventures-desktop.webp',
        title: 'Island Adventures',
        desc: 'Dive into the crystal-clear waters of Lakshadweep for snorkelling, kayaking, or simply relaxing on pristine white sands. The turquoise lagoons and coral reefs create a postcard-perfect setting for both adventure seekers and those who just want to unwind.'
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-04-marquade-theme-desktop.webp',
        title: 'Masquerade Theme Party',
        desc: 'Slip into mystery and glamour as the pool deck transforms into a grand ballroom. Masks are provided, the music is irresistible, and the energy is electric as you dance the night away under a canopy of stars.'
      }
    ]
  },
  {
    day: 'Day 5: At Sea',
    date: 'Dec 31, 2025',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-05-champagen-countdown-desktop.webp',
        title: 'Pool Deck Party',
        desc: "Feel the rhythm of the year's biggest celebration with live DJs, vibrant lighting, and a crowd ready to make the last hours of 2025 unforgettable. The sea breeze and open deck make this the ultimate holiday dance floor."
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-05-pool-deck-desktop.webp',
        title: 'Champagne & Countdown',
        desc: 'As the clock nears midnight, glasses are raised, music builds, and the atmosphere is pure magic. Surrounded by ocean and celebration, you welcome 2026 with a toast, a cheer, and memories that will last long after you disembark.'
      }
    ]
  },
  {
    day: 'Day 6: Mumbai',
    date: 'Jan 01, 2026',
    cards: [
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-06-farwell-moments-desktop.webp',
        title: 'Early Morning Arrival',
        desc: "Sail into Mumbai's harbour as the first light of the year breaks over the city skyline. Disembark with your camera full of memories and your heart full of stories to share."
      },
      {
        img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-day-06-morning-arrival-desktop.webp',
        title: 'Farewell Moments',
        desc: "Exchange goodbyes with new friends and the crew who made your holiday special. Step ashore knowing you've welcomed the New Year in the grandest way possible — at sea, surrounded by celebration from start to finish."
      }
    ]
  }
];

const faqItems = [
  {
    title: 'What makes the New Year cruise different from a regular sailing?',
    content:
      'This sailing is designed around celebration. You’ll enjoy a Gala Dinner, themed parties, live music, and a midnight countdown at sea.'
  },
  {
    title: 'Is food and drink included in the New Year package?',
    content:
      'Yes. Your fare includes festive buffets served daily and a special Gala Dinner on New Year’s Eve. A basic drinks package is also included, while premium beverages and specialty dining can be purchased separately.'
  },
  {
    title:
      'Do I need to dress up for the Gala Dinner and New Year’s Eve party?',
    content:
      'Smart casuals are fine for most evenings. On New Year’s Eve, many guests choose festive or party wear. Dressing up adds to the celebration but it is not compulsory.'
  },
  {
    title: 'Do cruises have fireworks on New Year’s Eve?',
    content:
      'No, fireworks are not permitted at sea due to international safety regulations. Instead, the celebration comes alive with live music, DJ sets, confetti, lights, and a champagne toast at midnight, creating a spectacular atmosphere without fireworks.'
  },
  {
    title: 'Will my kids have their own New Year activities?',
    content:
      'Yes. There are dedicated kids’ parties, games, and supervised activities while adults enjoy the late-night celebrations. Some events are for adults only, and these will be clearly marked.'
  },
  {
    title: 'What happens at midnight on December 31?',
    content:
      'The entire ship comes alive with music, dancing, and a champagne toast at midnight. It is the highlight of the cruise, and guests gather on deck to welcome 2026 together.'
  },
  {
    title: 'Do I need to pre-book shore excursions in Goa and Lakshadweep?',
    content:
      'We strongly recommend pre-booking. Excursions are popular during the festive season and sell out quickly.'
  },
  {
    title: 'What time do we return to Mumbai on January 1?',
    content:
      'The ship docks in Mumbai early in the morning, around 7:00 AM. Disembarkation usually takes place after breakfast.'
  },
  {
    title: 'Are all shows and parties included in the fare?',
    content:
      'Most entertainment is included. A few premium shows may require an additional ticket, which can be booked onboard.'
  },
  {
    title:
      'I am not a party person. Will there be quieter options on New Year’s Eve?',
    content:
      'Yes. While the pool deck hosts the main countdown, you can also choose to celebrate in lounges and restaurants for a more relaxed evening.'
  },
  {
    title: 'How do I book a Cordelia New Year cruise?',
    content:
      'You can book directly through the Cordelia Cruises website or by connecting with our cruise holiday experts. We recommend booking early as cabins for New Year sailings sell out quickly.'
  }
];

const entertainments = [
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-sail-away-party-highlight-updated-icon-2.svg',
    title: 'Carnival Sailaway Party',
    desc: 'Vibrant costumes, drumming beats, and high-energy performances to kick off your holiday.'
  },
  {
    // icon: <DinnerIcon className="lg:w-[80px] lg:h-[80px]" />,
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-galadinner-party-highlight-icon.svg',
    title: 'Gala Dinner',
    desc: 'A festive multi-course feast with global flavours.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-live-music-highlight-icon.svg',
    title: 'Live Music',
    desc: 'Bands and DJs keeping the decks buzzing every night.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-masqued-themed-highlight-icon.svg',
    title: 'Masquerade Theme Party',
    desc: 'Dance under the stars in elegant masks with live music and ballroom flair.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-housie-highlight-icon.svg',
    title: 'New Year Bonanza Housie',
    desc: 'Play for fun and big prizes in our lively year-end game night.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-pooldeck-party-highlight-icon.svg',
    title: 'Pool Deck Party',
    desc: 'Dance by the pool with the ocean breeze in your hair.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-champagne-highlight-icon.svg',
    title: 'Champagne & Countdown',
    desc: 'Raise a glass under the stars as music swells and the clock strikes midnight.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/NYE-activities-highlight-icon.svg',
    title: 'Activities & Games',
    desc: 'From creative workshops to poolside challenges, there’s fun for every age all cruise long.'
  }
];

const statsImages = [
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-01.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-01.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-02.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-02.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-03.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-03.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-04.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-04.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-05.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-05.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-06.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-06.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-07.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-07.webp'
  },
  {
    original:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-26-gallery-pop-image-08.webp',
    thumbnail:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-08.webp'
  }
];

const galleryImgs = [
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-01.webp',
    color: '#5FFCE9',
    rotate: '-rotate-[22deg]',
    hoverRotate: 'hover:-rotate-[18deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-02.webp',
    color: '#DB50F7',
    rotate: 'rotate-[8deg]',
    hoverRotate: 'hover:rotate-[5deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-03.webp',
    color: '#45F538',
    rotate: '-rotate-[2deg]',
    hoverRotate: 'hover:rotate-[0deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-04.webp',
    color: '#FF5C5C',
    rotate: 'rotate-[16deg]',
    hoverRotate: 'hover:rotate-[12deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-05.webp',
    color: '#FFDE38',
    rotate: '-rotate-[10deg]',
    hoverRotate: 'hover:-rotate-[6deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-06.webp',
    color: '#45F538',
    rotate: 'rotate-[2deg]',
    hoverRotate: 'hover:rotate-[0deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-07.webp',
    color: '#FFFFFF',
    rotate: '-rotate-[8deg]',
    hoverRotate: 'hover:-rotate-[4deg]'
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-final-image-08.webp',
    color: '#45F538',
    rotate: 'rotate-[7deg]',
    hoverRotate: 'hover:rotate-[3deg]'
  }
];

const features = [
  'Stateroom Accommodation',
  'Buffet Meals & Basic Drinks Package',
  'Show-stopping Entertainment',
  '50+ Onboard Activities',
  'Access to the swimming pool, fitness centre, and leisure zones',
  'Exclusive New Year events, themed parties, and holiday décor throughout your cruise'
];

const NewYear = () => {
  const [playing, setPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeEnt, setActiveEnt] = useState<number | null>(null);
  const [activeDayTab, setActiveDayTab] = useState(itineraryDays[0].day);
  const [showGallery, setShowGallery] = useState(false);
  const [sliderIndex, setSliderIndex] = useState<any>(0);
  const [stickUp, setStickUp] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const tabsContainerRef = useRef<HTMLUListElement | null>(null);
  const scrollDaysRef = useRef<null>(null);
  const navigate = useNavigate();
  const isSafariOnIOS = useDeviceDetection();

  useMetaTags({
    title: 'Celebrate New Year at Sea | Book cruise packages with Cordelia Cruises',
    description: 'Step into 2026 with style! Enjoy exclusive New Year’s Eve parties, gala dinners & special cruise packages from Mumbai & Chennai. Limited cabins available. Reserve your celebration at sea today!',
    metas: [
      {
        name: 'keywords',
        content:
          'cruise deals, cruise offers, last minute cruise deals, new year cruise, new year cruise packages, new year celebration on cruise, new year party on cruise, new year cruise from mumbai, new year cruise to goa, new year cruise booking, cruise vacation, best cruise packages, cruise packages, cruise ship price, cruise to goa, cruise to mumbai, cruise to kochi, cruise to lakshadweep, cruise honeymoon packages, cruise deals from singapore'
      },
    ],
  })

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, tabs]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRender = useRef(true);

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

      // 1. Update the indicator position
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });

      // 2. SCROLL THE TAB TO CENTER
      const tabContainerWidth = tabsContainerElement.offsetWidth;

      // Calculate the position required to center the tab
      // Target Scroll Position = (Tab's Left Edge) + (Half of Tab's Width) - (Half of Container's Width)
      const centerScrollPosition =
        offsetLeft + offsetWidth / 2 - tabContainerWidth / 2;

      // Apply the scroll
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

    // day.day == 'Day 3: Goa' &&
    // window.innerWidth < 1024 &&
    tabRefs?.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  };

  const handleEntertainmentClick = (index: number) => {
    innerWidth < 600 && setActiveEnt((prev) => (prev === index ? null : index));
  };

  const handleGalleryImgClick = (index: number) => {
    setShowGallery(true);
    setSliderIndex(index);
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
                innerWidth > 768
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/videos/NYE-Header-banner-desktop.mp4'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/videos/NYE-Header-banner-mobile.mp4'
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
        <div
          id="mainShipPage"
          className="relative -mb-0.5 pb-14 lg:pb-24 bg-[#090D2A] z-10"
        >
          <div
            className={`bg-brand-gradient text-white/60 opacity-95 sticky z-10 ${
              !stickUp ? 'top-0' : 'top-[65px] lg:top-[69px]'
            }`}
          >
            <div className=" container mx-auto lg:flex lg:justify-between lg:items-center">
              <ul
                ref={tabsContainerRef}
                className="relative flex gap-3 overflow-x-auto text-xs lg:text-lg font-semibold whitespace-nowrap w-full items-center lg:justify-evenly"
              >
                {/* Sliding Indicator */}
                <span
                  className="absolute bottom-0 h-[2px] lg:h-[4px] bg-white transition-all duration-300 ease-in-out"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                    boxShadow: '0 0 16px white'
                  }}
                />
                {tabs.map(({ label, href, key }) => {
                  const tabKey = key || label.replace(/\s+/g, '');
                  const isActive = activeTab === tabKey;

                  return (
                    <li
                      key={tabKey}
                      ref={(el) => (tabRefs.current[tabKey] = el)}
                      className={`p-5 cursor-pointer transition-all duration-200 ${
                        isActive ? 'text-white' : ''
                      }`}
                      style={{
                        textShadow: isActive ? '0 0 16px white' : 'none'
                      }}
                      // onClick={() => setActiveTab(tabKey)}
                      onClick={(e) => handleTabClick(e, href)}
                    >
                      <a href={href}>{label}</a>
                    </li>
                  );
                })}

                {/* Book Now button */}
                <li className="hidden lg:block">
                  <button
                    className="bg-white py-2 px-8 text-brand-primary font-bold rounded-full"
                    onClick={() =>
                      window.open(
                        '/upcoming-cruises?da=27122025&db=29122025&n=5',
                        '_blank',
                        'noreferrer'
                      )
                    }
                  >
                    Book Now
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="hidden lg:block">
              <GlowingLine className="!h-[90%]" />
            </div>
            <div>
              <div className="text-white bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-overview-bg-new-mobile-v4.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-overview-bg-new-v4.webp)] bg-no-repeat bg-cover">
                <div className="container mx-auto pb-8 lg:pb-16">
                  <section
                    id="overview"
                    className="px-4 py-12 lg:pb-10 scroll-mt-12"
                  >
                    <div className="text-center lg:mt-8 lg:mb-20">
                      <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                        The New Year Celebration{' '}
                        <span
                          className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                          style={{
                            textShadow:
                              'rgb(234, 114, 91) 0px 0px 16px, rgb(234, 114, 91) 0px 0px 16px, rgb(234, 114, 91) 0px 0px 16px'
                          }}
                        >
                          Everyone Will Talk About
                        </span>
                      </h2>
                      <p className="text-base lg:text-xl font-bold text-white mb-4">
                        Many ways to celebrate. Only one way to make it grand.
                      </p>
                      <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                        Sail from Mumbai to Goa and Lakshadweep on a 5-night
                        cruise filled with ocean views, festive dining, and a
                        countdown party that makes every other celebration feel
                        ordinary.
                      </p>
                    </div>
                    <div className="lg:flex lg:items-center lg:gap-5 relative">
                      {/* <div className="flex gap-2 lg:gap-3 py-6 lg:py-0 lg:basis-1/2">
                        <div className="basis-[55%] rounded-md overflow-hidden relative h-[260px] lg:h-[400px]">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-overview-image-01.webp"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="basis-[45%]">
                          <div className="rounded-md overflow-hidden">
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/images/NY-gallery-sample-01.webp"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="rounded-md overflow-hidden mt-2 lg:mt-4">
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/images/Final_OurCruise_Sun4.webp"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div> */}

                      <div className="py-6 lg:py-0 lg:basis-1/2">
                        {isSafariOnIOS ? (
                          <div className="flex gap-2 lg:gap-3 py-6 lg:py-0 lg:basis-1/2">
                            <div className="basis-[55%] rounded-md overflow-hidden relative h-auto card-with-animated-border">
                              {/* Border Layer */}
                              <div className={'animated-border-box-yellow'} />
                              {/* <div className="animated-border-box-glow"></div> */}
                              <div className="relative">
                                <img
                                  src="https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-overview-final-image-desktop-01.webp"
                                  alt=""
                                  className="w-full h-full object-cover rounded-[10px]"
                                />
                              </div>
                            </div>
                            <div className="basis-[45%] flex flex-col justify-between">
                              <div className="rounded-md overflow-hidden card-with-animated-border">
                                <div className={'animated-border-box'} />
                                <div className="relative">
                                  <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-overview-final-image-desktop-02.webp"
                                    alt=""
                                    className="w-full h-full object-cover rounded-[10px]"
                                  />
                                </div>
                              </div>
                              <div className="rounded-md overflow-hidden mt-2 lg:mt-4 card-with-animated-border">
                                <div
                                  className={'animated-border-box-reverse'}
                                />
                                <div className="relative">
                                  <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-overview-final-image-desktop-03.webp"
                                    alt=""
                                    className="w-full h-full object-cover rounded-[10px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            src="https://images.cordeliacruises.com/cordelia_v2/public/videos/final-collage-sep-new.webm"
                          />
                        )}
                      </div>
                      <div className="lg:basis-1/2 lg:py-4">
                        <h3 className="font-openSans font-bold text-lg lg:text-2xl mb-2 lg:mb-5">
                          This Cruise is the place to be
                        </h3>
                        <p className="text-sm leading-6 text-white/60 mb-4 lg:text-xl lg:mb-8 lg:leading-8">
                          After a year of deadlines, routines, and “maybe next
                          times”… this is your moment. The New Year Cruise isn't
                          just a trip - it's your stage for celebration,
                          indulgence, and starting 2026 under the stars, with
                          the ocean as your backdrop and miles from the
                          ordinary.
                        </p>
                        <Button
                          text="Book Your Cabin Now"
                          size={innerWidth > 600 ? 'base' : 'sm'}
                          handleClick={() =>
                            window.open(
                              '/upcoming-cruises?da=27122025&db=29122025&n=5',
                              '_blank',
                              'noreferrer'
                            )
                          }
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </section>
                  <section
                    id="highlights"
                    className="px-4 py-12 relative scroll-mt-12"
                  >
                    <GlassIcon className="absolute -top-5 right-8 lg:-right-20 -rotate-[5deg] animate-flickerBlue lg:w-20 lg:h-24" />
                    <div className="text-center mb-8 lg:mb-16">
                      <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                        What We've Got Lined Up{' '}
                        <span
                          className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                          style={{
                            textShadow:
                              '#5D88FF 0px 0px 16px, #5D88FF 0px 0px 16px, #5D88FF 0px 0px 16px'
                          }}
                        >
                          This New Year
                        </span>
                      </h2>
                      <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                        When you're onboard, you don't just join the party —
                        you're at the centre of it.
                      </p>
                    </div>
                    <div className="flex gap-3 lg:gap-4 flex-wrap">
                      {entertainments.map((entertainment, index) => (
                        <div
                          key={entertainment.title}
                          className={`basis-[155px] lg:basis-[250px] flex-1 rounded-md border-[0.5px] border-white/60 text-center px-1.5 py-6 lg:p-6 bg-gradient-to-b from-[#4C4B61] to-[#0C1134] backdrop-blur-sm transition-all ease-in duration-150 cursor-pointer hover:!border hover:border-white group`}
                          onClick={() => handleEntertainmentClick(index)}
                        >
                          <div
                            className={`w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] mx-auto mb-5 lg:my-6 transition-all ease-in duration-150 scale-100 group-hover:scale-125 ${
                              activeEnt === index ? 'scale-125' : 'scale-100'
                            }`}
                          >
                            <img
                              src={entertainment.icon}
                              alt={entertainment.title}
                              className="lg:w-20 lg:h-20"
                              style={{
                                filter:
                                  'drop-shadow(rgb(255, 114, 93) 0px 0px 4px) drop-shadow(rgb(255, 114, 93) 0px 0px 8px) drop-shadow(rgb(255, 114, 93) 0px 0px 20px)'
                              }}
                            />
                          </div>
                          <span className="text-sm lg:text-lg font-semibold">
                            {entertainment.title}
                          </span>
                          <p className="text-xs lg:text-base leading-5 text-white/80 pt-1.5">
                            {entertainment.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
              <div className="text-white relative overflow-hidden -mt-5 h-[840px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  // className="absolute z-[1] w-auto min-w-full min-h-full max-w-none"
                  className="absolute inset-0 w-full h-full -z-[1] object-fill"
                >
                  <source
                    src={
                      innerWidth > 600
                        ? 'https://images.cordeliacruises.com/cordelia_v2/public/videos/bg-disco-desktop-new-1.mp4'
                        : 'https://images.cordeliacruises.com/cordelia_v2/public/videos/NYE-Itinerary-bg-new-mobile-v2.mp4'
                    }
                  />
                  Your browser does not support the video tag.
                </video>
                <section
                  id="itinerary"
                  className="px-4 py-12 -mt-[1px] relative container mx-auto z-[2] lg:py-20 scroll-mt-20"
                >
                  <div className="text-center mb-8 lg:mb-16">
                    <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                      <span
                        className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                        style={{
                          textShadow:
                            '0 0 16px #46C158, 0 0 16px #46C158, 0 0 16px #46C158'
                        }}
                      >
                        New Year's Cruise
                      </span>{' '}
                      Itinerary
                    </h2>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                      When the clock strikes midnight, you'll be exactly where
                      you should be - glass in hand, music in the air, ocean all
                      around.{' '}
                      <span className="font-semibold">
                        Don't just celebrate the New Year. Own it.
                      </span>
                    </p>
                  </div>

                  <div
                    ref={scrollDaysRef}
                    className={`flex justify-between p-1 text-white bg-[#FFFFFF29] rounded-full my-5 lg:my-10 lg:mx-auto w-full lg:w-3/4 overflow-x-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden`}
                  >
                    {itineraryDays.map((day, index) => (
                      <div
                        key={index}
                        ref={(el) => (tabRefs.current[index] = el)}
                        onClick={() => handleItineraryDayClick(index, day)}
                        className={`py-3 lg:py-3.5 px-4 lg:px-6 cursor-pointer lg:font-medium flex-shrink-0 text-center opacity-80 ${
                          activeDayTab === day.day
                            ? 'opacity-100 border border-white rounded-full '
                            : ''
                        }`}
                        style={{
                          boxShadow:
                            activeDayTab === day.day
                              ? `
																inset 0 0 4px #EBA311,
																0 0 0 #EBA311,
																0 0 0 #EBA311,
																0 0 0 #EBA311,
																0 0 0 #EBA311,
																0 0 10px #EBA311
															`
                              : 'unset'
                        }}
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
                  <div className="mt-8">
                    <div className="lg:flex lg:gap-4">
                      {itineraryDays.map(
                        (day, idx) =>
                          activeDayTab === day.day &&
                          day?.cards.map((card: any, index: number) => (
                            <div className="card-with-animated-border mb-3 lg:mb-0 basis-1/2">
                              {/* Border Layer */}
                              {innerWidth > 600 && (
                                <div
                                  className={
                                    index === 0
                                      ? 'animated-border-box-reverse'
                                      : 'animated-border-box'
                                  }
                                ></div>
                              )}
                              <div className="flex gap-3 p-1.5 rounded-md lg:rounded-xl bg-gradient-to-b from-[#4C4B61] to-[#0C1134] backdrop-blur-sm h-full">
                                <div
                                  key={card.title}
                                  className="basis-2/5 rounded-md lg:rounded-xl overflow-hidden h-[150px] lg:h-60"
                                >
                                  <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="basis-3/5 lg:py-4">
                                  <h3 className="font-openSans text-xs lg:text-base font-bold mb-1 opacity-85 leading-5">
                                    {card.title}
                                  </h3>
                                  <p className="text-xxs lg:text-sm leading-5 lg:leading-7 text-white/70">
                                    {card.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                    <div className="text-center mt-8">
                      <Button
                        text="Book Your Cruise"
                        size={innerWidth > 600 ? 'base' : 'sm'}
                        handleClick={() =>
                          window.open(
                            '/upcoming-cruises?da=27122025&db=29122025&n=5',
                            '_blank',
                            'noreferrer'
                          )
                        }
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </section>
              </div>
              <div className="text-white -mt-8 bg-no-repeat bg-cover bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-CTA-banner-image-mobile-v2.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-CTA-banner-image-v2.webp)]">
                <section
                  id="whatsIncluded"
                  className="px-4 py-16 -mt-4 lg:flex lg:gap-6 container mx-auto lg:pt-24 lg:pb-16 scroll-mt-5"
                >
                  <div className="lg:basis-1/2 lg:self-center">
                    <h3 className="text-[22px] lg:text-4xl font-extrabold mb-4">
                      What's Included
                    </h3>
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-0 mb-8">
                      Your year-end vacation, upgraded to unforgettable.
                    </p>
                    <ul className="mb-11 lg:mb-0">
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
                  </div>
                  <div className="lg:basis-1/2">
                    <RequestACallback
                      title="Sail Into 2026 With Us"
                      titleClassName="lg:text-3xl"
                      btnText="Call Me Back"
                      submitClassName="w-full rounded-full"
                      pageCode="newyear"
                    />
                  </div>
                </section>
              </div>
              <div className="text-white -mt-3 lg:-mt-8 bg-no-repeat bg-cover bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-bg-new-mobile-v2.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/NYE-gallery-bg-new-desktop-v2.webp)]">
                <div className="container mx-auto relative lg:py-10 lg:pb-[85px]">
                  <CelebrateIcon className="absolute top-[8.5rem] lg:top-20 right-8 lg:-right-20 -rotate-[5deg] animate-flickerYellow w-10 lg:w-20 lg:h-24" />
                  <section id="gallery" className="px-4 py-12 scroll-mt-8">
                    <div className="text-center mb-8 lg:mb-20">
                      <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                        The New Year Cruise in{' '}
                        <span
                          className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                          style={{
                            textShadow:
                              '0 0 16px #DB50F7, 0 0 16px #DB50F7, 0 0 16px #DB50F7'
                          }}
                        >
                          Frames
                        </span>
                      </h2>
                      <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-3/4 m-auto">
                        Laughter with friends, dancing with strangers who become
                        family, and the joy of being exactly where you want to
                        be when the clock strikes midnight.
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center px-4 py-6">
                      {galleryImgs.map(
                        ({ img, color, rotate, hoverRotate }, idx) => (
                          <div
                            key={idx}
                            className={`z-[${
                              idx + 1
                            }] basis-1/2 lg:basis-1/4 border-2 border-white rounded-xl ${rotate} ${hoverRotate} cursor-pointer transition-all ease-in delay-200`}
                            style={{
                              boxShadow: `
                              0px 0px 0.39px 0px ${color},
                              0px 0px 0.78px 0px ${color},
                              0px 0px 2.74px 0px ${color},
                              0px 0px 5.48px 0px ${color},
                              inset 0px 0px 9.39px 0px ${color},
                              inset 0px 0px 16.44px 0px ${color}
                            `
                            }}
                            onClick={() => handleGalleryImgClick?.(idx)}
                          >
                            <img
                              src={img}
                              alt={`Gallery Image ${idx + 1}`}
                              className="w-full h-auto object-cover rounded-xl"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </section>
                  <WineGlassIcon className="hidden lg:block absolute top-4 lg:top-[52%] lg:-left-[5%] -rotate-[5deg] animate-flickerGreen lg:w-20 lg:h-24" />
                  <section id="faqs" className="px-4 py-12 scroll-mt-8">
                    <div className="text-center mb-8 lg:mb-16">
                      <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                        Frequently Asked{' '}
                        <span
                          className="font-playfairDisplay font-extrabold text-white inline-block bg-clip-text"
                          style={{
                            textShadow:
                              '0 0 16px #3EFFEC, 0 0 16px #3EFFEC, 0 0 16px #3EFFEC'
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
                      isLoadMoreEnabled={innerWidth < 768}
                    />
                  </section>
                </div>
              </div>
              <div className="bg-[#090D2A] text-white">
                <section className="px-4 py-12 mb-20 container mx-auto lg:py-20">
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
                    <p className="text-xs lg:text-xl leading-5 lg:leading-7 text-white/80 lg:w-[82%] m-auto mb-6">
                      Celebrate more than just New Year! Join us for
                      unforgettable festivities at sea all year round.
                    </p>
                  </div>
                  <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4 justify-center">
                    <div className="rounded-md overflow-hidden lg:basis-1/2">
                      <div>
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/images/Day3_Christmas_Eve_Celebrations.webp"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 lg:p-6 bg-[#FFFFFF1A] backdrop-blur-lg">
                        <h4
                          className="uppercase mb-3 font-openSans font-bold text-lg lg:text-2xl"
                          style={{
                            textShadow: '0 0 16px #FFFFFF'
                          }}
                        >
                          Make the Holidays Last Longer
                        </h4>
                        <span className="text-brand-secondary block mb-3 font-bold lg:text-lg">
                          A Magical Holiday at Sea
                        </span>
                        <p className="text-sm lg:text-xl font-medium leading-6 lg:leading-8 mb-4 text-white/60">
                          Before the countdown, experience the magic of
                          Christmas at sea. Join our Christmas Cruise for
                          carols, Santa, and festive celebrations across the
                          ocean.
                        </p>
                        <Button
                          text="Explore Christmas Cruise"
                          size={innerWidth > 600 ? 'base' : 'sm'}
                          handleClick={() =>
                            window.open(
                              '/christmas-cruise',
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
        className="w-full lg:w-[55%] relative"
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
            startIndex={sliderIndex}
            lazyLoad={true}
          />
        </div>
      </Modal>

      <StickyRAC />
    </Layout>
  );
};

export default NewYear;
