import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../component/Layout';
import Button from '../../components/UI/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import EventsAccordion from '../../components/EventsAccordian';
import RequestACallback from '../southEastAsia/component/Callback';
import Modal from '../../components/UI/ModalCenter';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useMetaTags from 'react-metatags-hook';
import { useGetItineraryQuery } from '../../services/itinerary/itinerary';
import moment from 'moment';
import {
  Calendar,
  Location,
  EyeOpen,
  EyeOpenActive,
  Ship
} from '../../components/Icon';
import StickyRAC from '../../component/Callback/StickyRAC';
import classNames from 'classnames';

const settings = {
  arrows: false,
  dots: false,
  fade: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  waitForAnimate: false
};

const settings1 = {
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  arrows: true,
  dots: false,
  cssEase: 'linear',
  variableWidth: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1.35,
        arrows: false,
      }
    }
  ]
}

const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: false,
  // centerPadding: "30px",
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        dots: false,
        arrows: false,
        infinite: true
      }
    }
  ]
};

const destinations = [
  {
    title: 'Kochi, India',
    // subTitle: 'Marina Beach, Temples, Culture',
    description:
      'Known as the Queen of the Arabian Sea, Kochi is a gateway where tradition meets modernity. Wander through the historic Fort Kochi district with its colonial architecture, spice markets, and Chinese fishing nets, or unwind on a backwater cruise just beyond the city. With its mix of culture, cuisine, and coastal charm, Kochi is more than a starting point, it is a destination to savour.',
    link: '/kochi',
    classes: '-rotate-6',
    revClasses: 'rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-desktop-image-01.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-mobile-image-01.webp',
        alt: 'Kochi-1'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-desktop-image-02.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-mobile-image-02.webp',
        alt: 'Kochi-2'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-desktop-image-03.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-mobile-image-03.webp',
        alt: 'Kochi-3'
      }
    ]
  },
  {
    title: 'Malé, Maldives',
    // subTitle: 'Marina Beach, Temples, Culture',
    description:
      'Sail into paradise on a Maldives cruise from Kochi and find yourself surrounded by shimmering lagoons, powder-soft beaches, and coral reefs teeming with life. From seaplane photo flights to snorkelling with manta rays, Malé is where every horizon feels like a dream.',
    link: '/maldives-cruises',
    classes: 'rotate-6',
    revClasses: '-rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-Male-desktop-image-01.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-Male-mobile-image-01.webp',
        alt: 'Male-1'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-Male-desktop-image-02.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-Male-mobile-image-02.webp',
        alt: 'Male-2'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-Male-desktop-image-03.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-Male-mobile-image-03.webp',
        alt: 'Male-3'
      }
    ]
  },
  {
    title: 'Colombo, Sri Lanka',
    // subTitle: 'Beaches, Nightlife, Island Tours',
    description:
      'Step ashore in Colombo and experience a city that pulses with colour and character. Browse spice-scented markets, admire colonial architecture, or ride a tuk-tuk along the coast. From panoramic views at the Lotus Tower to the sunset buzz of Galle Face Green, Colombo blends tradition and modern charm in ways that make every moment unforgettable.',
    link: '/srilanka/colombo',
    classes: '-rotate-6',
    revClasses: 'rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-colombo-desktop-image-01.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-colombo-mobile-image-01.webp',
        alt: 'Colombo-1'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-colombo-desktop-image-02.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-colombo-mobile-image-02.webp',
        alt: 'Colombo-2'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-colombo-desktop-image-03.webp',
        mobileUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-colombo-mobile-image-03.webp',
        alt: 'Colombo-3'
      }
    ]
  }
];

const statCards = [
  {
    title: 'Activities',
    count: '15+',
    link: '#',
    cardImage:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-rock-climb-popup-image.webp',
    images: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-rock-climb-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-rock-climb-popup-web-06.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-gym-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-gym-popup-web-05.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-yoga-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/pool.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-swimming-pool-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/shopping.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-relax-popup-web-03.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-spa-popup-web-04.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cards-popup-web-07.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-arcade-popup-web-08.webp'
    ],
    mobileImages: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-rock-climb-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-rock-climb-popup-mobile-06.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-gym-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-gym-popup-web-05.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-yoga-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/pool.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-swimming-pool-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/shopping.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-relax-popup-web-03.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-spa-popup-web-04.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cards-popup-web-07.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-arcade-popup-web-08.webp'
    ]
  },
  {
    title: 'Dining Venues',
    count: '4',
    link: '/food-beverage',
    cardImage:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp',
    images: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chopstix-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chefs-table-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chefs-table-popup-web-01.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chop-stix-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-food-court-popup-web-03.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-starlight-popup-web-04.webp'
    ],
    mobileImages: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chopstix-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chefs-table-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chefs-table-popup-web-01.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chop-stix-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-food-court-popup-web-03.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-starlight-popup-web-04.webp'
    ]
  },
  {
    title: 'Bar & Lounges',
    count: '9',
    link: '/food-beverage',
    cardImage:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chairman-club-popup-image.webp',
    images: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chairman-club-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-connections-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-dome-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-new-pool-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-pool-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-connexions-bar-popup-web-01.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chairmans-bar-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-dome-bar-popup-web-03.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-pool-bar-popup-web-04.webp'
    ],
    mobileImages: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chairman-club-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-connections-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-dome-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-new-pool-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-pool-bar-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-connexions-bar-popup-web-01.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chairmans-bar-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-dome-bar-popup-web-03.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-pool-bar-popup-web-04.webp'
    ]
  },
  {
    title: 'Entertainment',
    count: '10+',
    link: '/entertainment',
    cardImage:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp',
    images: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-bhale-bhale-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-burlsque-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-burlsquee-popup-web-01.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cinemagic-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-bhale-bhale-popup-web-04.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-indian-cinematic-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-live-music-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-magicin%27s-cut-popup-image.webp'
    ],
    mobileImages: [
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-bhale-bhale-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-burlsque-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-burlsquee-popup-web-01.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cinemagic-popup-web-02.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-bhale-bhale-popup-web-04.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-indian-cinematic-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-live-music-popup-image.webp',
      'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-magicin%27s-cut-popup-image.webp'
    ]
  }
];

const exploreCruises = [
  {
    title: 'Sri Lanka Cruises',
    // ship: 'Cordelia Empress',
    image:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-othercruise-srilanka-desktop-image.webp',
      link: '/srilanka'
      // link: '/upcoming-cruises?port=Hambantota&n=5'
  },
  {
    title: 'Southeast Asia Cruises',
    // ship: 'Cordelia Empress',
    image:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-othercruise-SEA-desktop-image.webp',
    link: '/southeast-asia-cruises'
    // link: '/upcoming-cruises?port=Chennai&n=7,10'
  }
];

const faqItems = [
  {
    title: 'What’s included in my Malé & Colombo cruise fare?',
    content:
      'Your fare covers your stateroom accommodation, main dining options, select beverages, daily entertainment, and most onboard activities. Specialty dining, premium drinks, spa treatments, shore excursions, and gratuities are available at an additional cost.'
  },
  {
    title: 'How long is the Malé & Colombo cruise?',
    content:
      'This is a 5-night itinerary sailing round trip from Kochi, India, with port calls in Malé (Maldives) and Colombo (Sri Lanka), plus two days at sea to enjoy the ship.'
  },
  {
    title: 'Where does the cruise start and end?',
    content:
      'All Malé & Colombo cruises embark and disembark in Kochi, Kerala, making it convenient to fly in from anywhere in India or abroad.'
  },
  {
    title: 'Do I need a visa for this cruise?',
    content:
      'Visa requirements vary by nationality and the ports of call. Guests should check with their local consulates for the Maldives and Sri Lanka before booking.'
  },
  {
    title: 'Are these cruises suitable for families?',
    content:
      'Yes. Families will find multiple dining options, daily activities for all ages, kids’ programs, family-friendly entertainment, and spacious accommodations. There are also curated shore excursions suitable for children.'
  },
  {
    title: 'What entertainment is offered onboard?',
    content:
      'From Broadway-style productions and live music to themed deck parties and cultural shows, evenings onboard are lively. During the day, you can join fitness classes, workshops, or simply relax by the pool.'
  },
  {
    title: 'How early should I book my Malé & Colombo cruise?',
    content:
      'These international cruises are limited in number and expected to sell out quickly. To secure your preferred cabin category and the best fares, we recommend booking well in advance.'
  },
  {
    title: 'What should I pack for this itinerary?',
    content:
      'Pack breathable tropical clothing, swimwear, evening wear for dinners, and comfortable shoes for excursions. For cultural visits in Colombo, modest attire that covers shoulders and knees is recommended. Don’t forget sunscreen and light rainwear.'
  },
  {
    title: 'What shore excursions are available on the Malé & Colombo cruise?',
    content:
      'In Malé, guests can enjoy activities such as snorkelling over coral reefs, dolphin cruises, scenic seaplane flights, or simply relaxing on pristine beaches. In Colombo, options range from guided city tours and shopping in bustling markets to cultural experiences and coastal drives. A curated selection of shore excursions will be available to pre-book before sailing or directly onboard.'
  }
];

const MaleColombo = () => {
  const [playing, setPlaying] = useState(true);
  const [stickUp, setStickUp] = useState(false);
  const [isActiveSocial, setIsActiveSocial] = useState(false);
  const [activeSocial, setActiveSocial] = useState({});
  const [activeDestinations, setActiveDestinations] = useState(destinations);
  const [showStatsGallery, setShowStatsGallery] = useState(false);
  const [statsSliderIndex, setStatsSliderIndex] = useState<any>(0);
  const [thumbnailPosition, setThumbnailPosition] = useState<any>('right');
  const [itineraryData, setItineraryData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRender = useRef(true);

  const navigate = useNavigate();

  useMetaTags({
    title:
      'Maldives Cruise Packages From India | Luxury Cruises | Cordelia Cruises',
    description:
      'Discover paradise with our Maldives cruise packages featuring island tours, beaches and thrilling onboard experiences. Limited-time offers available, plan your Maldives cruise with Cordelia Cruises',
    metas: [
      {
        name: 'keywords',
        content:
          'cruise deals, cruise offers, last minute cruise deals, cruise to maldives, cruise to sri lanka, cruise bookings, cruise vacation, best cruise packages, cruise packages, cruise from kochi, cruise from mumbai, cruise to goa, cruise to kochi, cruise to lakshadweep, cruise ship price, cruise honeymoon packages, cruise deals from singapore'
      }
    ]
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // useEffect(() => {
  //   const wrapper = wrapperRef.current;

  //   if (!wrapper) return;
  //   const handleScroll = () => {
  //     const rect = wrapper.getBoundingClientRect();
  //     if (rect.top <= -120) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When wrapper is scrolled past 180px, stick it
        innerWidth > 768 && setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-50px 0px 0px 0px',
        threshold: 0
      }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const imagesKey = window.innerWidth > 1024 ? 'images' : 'mobileImages';

  const statsImages = statCards?.[statsSliderIndex]?.[imagesKey]?.map(
    (image: any) => ({ original: image, thumbnail: image })
  );

  let param = '?pagination=true';
  let port_codes = '?port_codes=CMB, MLE';
  const { data, isSuccess } = useGetItineraryQuery(port_codes);

  useEffect(() => {
    setItineraryData(data && data.itineraries);
  }, [data]);

  useEffect(() => {
    if (window.innerWidth > 640) {
      setThumbnailPosition('right');
    } else {
      setThumbnailPosition('bottom');
    }
  }, []);

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

  const handleImageClick = (index: number, type: 'stats' | 'marquee') => {
    setShowStatsGallery(true);
    setStatsSliderIndex(index);
  };

  return (
    <Layout footerClassName="!mt-0">
      <main className="bg-[#090D2A]">
        <div className="relative h-screen">
          <div className="aspect-video-custom top-0 aspect-square h-screen fixed w-full">
            <img
              src={
                innerWidth > 768
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/Male-colombo-desktop-banner-v2.webp'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/images/Male-colombo-mobile-banner-v2.webp'
              }
              alt="banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/30 flex justify-center items-center">
              <p className="font-extrabold font-playfairDisplay text-3xl lg:text-5xl text-white w-3/4 lg:w-full text-center lg:!leading-tight">
                From Coral Shores to Coastal Charms
                <span className='block text-xl lg:text-3xl font-openSans mt-3 lg:mt-5'>Malé & Colombo Cruises</span>
              </p>
            </div>
            <div
              className="absolute top-0 w-full h-screen"
              style={{
                background:
                  'linear-gradient(rgba(0, 0, 0, 0.9) 0%, rgba(9, 9, 121, 0) 20%, rgba(0, 212, 255, 0) 100%)'
              }}
            />
            <div className="absolute bottom-10 lg:bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex items-center">
              <a href="#mainPage" className="relative">
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
          id="mainPage"
          className="relative -mb-0.5 pb-14 lg:pb-24 bg-white z-10"
        >
          <div ref={wrapperRef}></div>
          <div
            // className=" px-4 lg:px-0 flex justify-self-center lg:w-[85%]"
            className={
              isSticky &&
              classNames(
                'flex justify-between items-center py-4 shadow-all bg-white mx-auto z-50 px-4 !p-0 lg:px-0 justify-self-center ',
                {
                  'fixed top-0 left-0 w-full px-14 rounded-none border-gray-100 lg:w-full shadow-allSide lg:!px-20':
                    isSticky && !isMobile,
                  'rounded-xl px-4 border border-gray-100 absolute bottom-5 left-0 right-0 lg:bottom-8 w-[90%]':
                    !isSticky
                }
              )
            }
          >
            <div className={`${isSticky ? 'pb-4' : 'pt-10'} container mx-auto`}>
              <RequestACallback
                showTitle={!isSticky}
                title="Plan Your Island Escape"
                titleClassName="!text-black/80 !font-extrabold"
                submitText="Get My Cruise Quote"
                desktopMode={innerWidth > 768}
                pageCode="maldives"
                isSticky={isSticky}
              />
            </div>
          </div>
          {/* <div className="pt-10 container mx-auto">
            <RequestACallback
              title="Plan Your Island Escape"
              titleClassName="!text-black/80 !font-extrabold"
              submitText="Get My Cruise Quote"
              desktopMode={innerWidth > 768}
              pageCode="maldives"
            />
          </div> */}
          <div className="relative text-center px-4 pt-11 lg:py-20 pb-16 lg:pb-10 container mx-auto lg:w-[65%]">
            <h2 className="text-[22px] lg:text-4xl font-bold pb-2 lg:pb-4">
              <span
                className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                style={{
                  color: 'transparent'
                }}
              >
                Malé & Colombo{' '}
              </span>
              Cruises
            </h2>
            <p className="text-xs lg:text-xl font-bold pb-4 lg:pb-8 text-black/80">
              International Itineraries from Kochi
            </p>
            <p className="text-xs lg:text-lg leading-[22px] lg:leading-7 mb-4 lg:mb-8 text-black/80">
              Embark on a 5-night international cruise from Kochi and discover
              two of the Indian Ocean’s most spectacular gems: the Maldives and
              Sri Lanka. Sail with Cordelia Cruises to Malé’s turquoise lagoons,
              where coral reefs, seaplane rides, and overwater villas create the
              ultimate island escape. Then step into Colombo, Sri Lanka’s
              vibrant capital, alive with colonial heritage, bustling markets,
              and modern city charm.
            </p>
            <p className="text-xs lg:text-lg leading-[22px] lg:leading-7 mb-4 lg:mb-8 text-black/80">
              Between ports, enjoy days at sea filled with world-class dining,
              live entertainment, spa indulgence, and more than 50 onboard
              activities, all with warm Indian hospitality.
            </p>
            <p className="text-xs lg:text-lg leading-[22px] lg:leading-7 mb-4 lg:mb-8 text-black/80">
              With cruises starting from October 2026, this Maldives and Sri
              Lanka cruise from Kochi is your chance to turn a holiday into a
              once-in-a-lifetime journey.
            </p>
            {/* <Button
              text="Book Now"
              size={innerWidth > 768 ? 'lg' : 'sm'}
              handleClick={() => {}}
              className="rounded-full"
            /> */}
            <div className="hidden lg:block absolute top-[10%] -left-[22%] w-[100px] lg:w-52">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-element-01.webp"
                alt="element"
              />
            </div>
            <div className="absolute -bottom-10 lg:-bottom-20 right-2 lg:-right-[22%] w-[100px] lg:w-52">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-page-element-02.webp"
                alt="element"
              />
            </div>
          </div>
          <div className="text-center !bg-cover !bg-no-repeat pt-10 lg:pt-20 lg:pb-20 pb-16 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-itinerary-bg-mobile.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-itinerary-bg-desktop.webp)]">
            <div className="px-0 lg:px-4 container mx-auto">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4">
                Explore{' '}
                <span
                  className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  Cruise Itineraries
                </span>
              </h2>
              <div className="reviews pb-8 lg:py-14">
                {/* <ItineraryTabs
                  type="southeast"
                  activeDestinations={activeDestinations}
                  setActiveDestinations={setActiveDestinations}
                /> */}
                <Slider {...settings1}>
                  {itineraryData?.map((val: any, idx: number) => (
                    <div
                      key={val.itinerary_id}
                      className="bg-white rounded-lg shadow transition w-full overflow-hidden flex flex-col h-full"
                    >
                      <div className="aspect-[1.61]">
                        <img
                          src={val.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow ">
                        <p className="text-sm lg:text-lg font-bold text-left line-clamp-2 h-10 lg:h-14">
                          {val.alias}
                          {/* {val?.nights > 5
                            ? `${val?.ports[0]?.name} - ${
                                val?.ports[val?.ports.length - 1]?.name
                              }`
                            : val?.ports.map((p: any) => p.name).join(' - ')}
                          <span className="ml-1 text-xs lg:text-lg font-semibold inline-block">
                            ({val?.nights}N/{val?.nights + 1}D)
                          </span> */}
                        </p>

                        {/* push footer down */}
                        <div className="mt-auto">
                          <div className="flex gap-1.5 lg:gap-3 items-center">
                            <div>
                              <Calendar className="w-[18px] lg:w-[26px]" />
                            </div>
                            <div className="flex gap-1.5 justify-between w-max py-4">
                              <p className="text-xs lg:text-base font-medium">
                                {moment(val.start_date, 'DD/MM/YYYY').format(
                                  'DD MMM YYYY'
                                )}
                              </p>
                              <img
                                className="h-4 lg:h-6"
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg"
                                alt="backIcon"
                              />
                              <p className="text-xs lg:text-base font-medium">
                                {moment(val.end_date, 'DD/MM/YYYY').format(
                                  'DD MMM YYYY'
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-300">
                            <div className="flex gap-1.5 lg:gap-3 items-center h-8 lg:h-12">
                              <div>
                                <Location className="w-[18px] lg:w-[26px]" />
                              </div>
                              <p className="text-xs lg:text-base font-medium line-clamp-2 text-left">
                                {val?.ports
                                  .filter((v: any) => v.name !== 'At Sea')
                                  .map((v: any) => v.name)
                                  .join(' | ')}
                              </p>
                            </div>

                            <div className="flex gap-1.5 lg:gap-3 items-center pt-3 pb-5">
                              <div>
                                <Ship className="w-[18px] lg:w-[26px]" />
                              </div>
                              <p className="text-xs lg:text-base font-medium">
                                {val?.ship?.name}
                              </p>
                            </div>

                            <Button
                              text="Book Now"
                              size={innerWidth > 600 ? 'sm' : 'xs'}
                              type={
                                hoveredIndex === idx ? 'primary' : 'secondary'
                              }
                              leftIcon={
                                hoveredIndex === idx ? (
                                  <div>
                                    <EyeOpenActive className="w-[18px] lg:w-[26px]" />
                                  </div>
                                ) : (
                                  <div>
                                    <EyeOpen className="w-[18px] lg:w-[26px]" />
                                  </div>
                                )
                              }
                              handleClick={() =>
                                navigate(
                                  `/upcoming-cruises/itinerary?id=${val?.itinerary_id}`
                                )
                              }
                              className="w-full rounded-full lg:!text-base"
                              onMouseEnter={() => setHoveredIndex(idx)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="relative text-center text-white !bg-cover !bg-no-repeat py-10 lg:py-28 lg:pb-24 -mt-10 lg:-mt-16 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-destination-new-bg-desktop.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-destination-new-bg-desktop.webp)]">
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <img
                src={
                  innerWidth > 768
                    ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-male-colombo-route-line.webp'
                    : 'https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-male-colombo-route-line-mobile.webp'
                }
                alt="route_line"
                className={`w-full lg:py-12 lg:px-20 ${
                  activeDestinations[0]?.title === 'Kochi, India'
                    ? 'scale-x-100'
                    : '-scale-x-100'
                }`}
                style={{ height: 'inherit' }}
              />
            </div>
            <div className="px-4 container mx-auto relative z-[1]">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                Destinations{' '}
                <span
                  className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#FFFFFF] to-[#E9715D] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  You'll Love
                </span>
              </h2>
              <p className="text-xs leading-5 text-white/80 lg:text-lg pb-8 lg:pb-20 lg:px-20">
                Every great journey deserves unforgettable stops. Our Malé &
                Colombo cruises combine the serenity of the Maldives with the
                vibrance of Sri Lanka.
              </p>
              <div className="-mt-5">
                {activeDestinations?.map((dest) => (
                  <div
                    key={dest.title}
                    className={`mb-10 [&:last-child]:mb-8 lg:flex lg:gap-12 lg:justify-center lg:items-center ${
                      activeDestinations[0]?.title === 'Kochi, India'
                        ? 'lg:even:flex-row-reverse lg:even:ml-10'
                        : 'lg:odd:flex-row-reverse'
                    }`}
                  >
                    <div className="relative destinations w-full lg:basis-3/5 lg:overflow-hidden lg:py-2">
                      <Slider
                        {...settings}
                        className={
                          activeDestinations[0].title === 'Kochi, India'
                            ? dest?.classes
                            : dest?.revClasses
                        }
                      >
                        {dest?.images?.map((image: any) => (
                          <div
                            className="relative text-center bg-white px-1.5 pt-1.5 pb-12 lg:pb-16 overflow-hidden rounded-md !w-4/5"
                            style={dest?.style}
                          >
                            <img
                              src={image?.mobileUrl}
                              alt={image?.alt}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-3 lg:bottom-4 text-black text-xl lg:text-4xl left-1/2 -translate-x-1/2 font-caveat">
                              {dest?.title}
                            </span>
                          </div>
                        ))}
                      </Slider>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-destination-pin.webp"
                          alt="pin"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="text-left lg:basis-2/5">
                      <h3 className="text-[22px] lg:text-4xl font-bold lg:pb-0 font-openSans">
                        {dest?.title}
                      </h3>
                      <p
                        className="text-sm lg:text-lg font-bold mt-0 mb-4 lg:mt-2 lg:mb-5 bg-gradient-to-r from-[#FFFFFF] to-[#E9715D] bg-clip-text"
                        style={{
                          color: 'transparent'
                        }}
                      >
                        {dest?.subTitle}
                      </p>
                      <p className="text-xs lg:text-base font-medium leading-5 mb-6">
                        {dest?.description}
                      </p>
                      {/* <Button
                        text="Explore More"
                        size={innerWidth > 768 ? 'base' : 'sm'}
                        handleClick={() =>
                          window.open(
                            dest?.link,
                            '_blank',
                            'noopener noreferrer'
                          )
                        }
                        className="rounded-full cursor-pointer"
                      /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="text-center px-4 lg:px-0 pt-16 container mx-auto">
            <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
              Get Exclusive{' '}
              <span
                className="block lg:inline font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                style={{
                  color: 'transparent'
                }}
              >
                Cruise Updates
              </span>
            </h2>
            <p className="text-xs lg:text-lg pb-8 lg:pb-10 lg:px-20">
              Stay informed about new itineraries, flash deals, and last-minute
              cruise offers.
            </p>
            <RequestACallback
              showTitle={false}
              submitText="Send Me Updates"
              desktopMode={innerWidth > 768}
              pageCode="maldives"
            />
          </div> */}
          <div className="pt-10 lg:pt-24 pb-20">
            <div className="text-center px-4 container mx-auto">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                Turn Your{' '}
                <span
                  className="italic font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  Cruise Dream
                </span>{' '}
                into Reality
              </h2>
              <p className="text-xxs lg:text-lg pb-8 lg:pb-20 lg:px-20">
                From fine dining and spectacular entertainment to endless ocean
                views and stunning destinations, a cruise vacation is everything
                you've been waiting for.
              </p>
            </div>
            <div className="container mx-auto">
              <Slider
                {...settings2}
                centerMode={false}
                className="!hidden lg:!block desktopTiltedSlider"
              >
                {statCards?.map((statCard: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="relative group h-[300px] lg:h-[438px] !w-[96%] mb-4 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(index, 'stats')}
                    >
                      <img
                        src={statCard.cardImage}
                        alt={''}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/20" />
                      <div className="absolute bottom-2 px-3.5 pb-2 pt-32 w-full rounded-lg z-10 text-white">
                        <h2 className="text-[5rem] font-bold h-20 mb-8">
                          {statCard.count}
                        </h2>
                        <p className="text-xl font-bold font-playfairDisplay">
                          {statCard.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Slider>
              <Slider
                {...settings2}
                className="lg:!hidden mobileTiltedSlider -mb-[2px] lg:mb-0"
              >
                {statCards?.map((statCard: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`slick-slide-custom relative group h-[332px] !w-[96%] mb-4 rounded-lg overflow-hidden cursor-pointer transition-transform duration-500`}
                      onClick={() => handleImageClick(index, 'stats')}
                    >
                      <img
                        src={statCard.cardImage}
                        alt={''}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full rounded-lg h-full bg-black/20" />
                      <div className="absolute bottom-3 px-3.5 pb-2 pt-32 w-full rounded-lg z-10 text-center text-white">
                        <h2 className="text-[5rem] font-bold h-20 mb-8">
                          {statCard.count}
                        </h2>
                        <p className="text-lg font-bold font-playfairDisplay">
                          {statCard.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="text-center !bg-cover !bg-no-repeat py-10 lg:py-24 lg:pb-20 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-other-cruise-new-bg-mobile.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-other-cruise-bg-desktop.webp)]">
            <div className="px-4 container mx-auto">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                Explore{' '}
                <span
                  className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  Other Cruises
                </span>
              </h2>
              <p className="text-xs leading-5 text-black/80 lg:text-lg pb-8 lg:pb-14 lg:px-20">
                From Asia to beyond, discover Cordelia's upcoming international
                itineraries designed for unforgettable journeys.
              </p>
              <div className="lg:flex lg:gap-4 lg:mb-8">
                {exploreCruises.map((cruise) => (
                  <div
                    key={cruise.title}
                    className="relative rounded-md border border-[#FFFCFC33]/20 aspect-[1.14] lg:aspect-[1.337] mb-4 overflow-hidden cursor-pointer"
                    onClick={() => window.open(cruise.link, '_blank')}
                  >
                    <img
                      src={cruise.image}
                      alt={cruise.title}
                      className="w-full h-full object-cover"
                    />
                    {/* <div className="inline-flex gap-1 py-1.5 px-2.5 rounded-full bg-[#40404033]/20 border border-[#FFFCFC33]/20 backdrop-blur-sm items-center absolute top-3 right-3">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/SEA-cruise-icon-white.svg"
                        alt="ship_icon"
                        className="w-3 h-3 lg:w-5 lg:h-5"
                      />
                      <span className="text-xxxs lg:text-sm text-white font-semibold">
                        {cruise.ship}
                      </span>
                    </div> */}
                    <div className="absolute bottom-4 px-4 text-left">
                      <p className="text-white text-sm font-bold leading-5 lg:text-2xl lg:leading-8">
                        {cruise.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <Button
                text="View All Itineraries"
                size={innerWidth > 768 ? 'lg' : 'sm'}
                handleClick={() => navigate('/upcoming-cruises')}
                className="rounded-full"
              /> */}
            </div>
          </div>
          <div className="text-center px-0 lg:px-4 py-16 container mx-auto">
            <div className="px-4">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                Frequently Asked{' '}
                <span
                  className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  Questions
                </span>
              </h2>
              <p className="text-xs lg:text-lg pb-8 lg:pb-14 lg:px-20 text-black/80">
                All you need to know for a seamless celebration at sea.
              </p>
              <EventsAccordion
                items={faqItems}
                isBgDark={false}
                isSEPage={true}
                isLoadMoreEnabled={true}
              />
            </div>
          </div>
        </div>
      </main>

      <Modal
        show={isActiveSocial}
        align={'center'}
        className="w-full lg:w-2/3 relative lg:flex lg:justify-center"
        onClose={() => setIsActiveSocial(false)}
      >
        <div
          className=" w-full h-full lg:w-[45%] p-3 lg:pr-[7px] rounded-lg bg-white flex gap-3 flex-col items-center"
          style={{
            background: 'transparent'
          }}
        >
          <div
            className=" p-1 flex justify-end items-center self-end"
            onClick={() => setIsActiveSocial(false)}
          >
            <div className="self-center mr-3 mt-3 font-bold cursor-pointer">
              <img
                className="w-4 h-4"
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/close-white-icon.svg"
                alt="closeIcon"
              />
            </div>
          </div>
          <div
            key={activeSocial.id}
            className="bg-black shadow-md rounded-md overflow-hidden mx-2 w-[300px] aspect-[9/16]"
          >
            {activeSocial.media &&
              (activeSocial.media.type === 'image' ? (
                <img
                  src={activeSocial.media.src}
                  alt={activeSocial.media.alt || activeSocial.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                  autoPlay={true}
                >
                  <source src={activeSocial.media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
          </div>
        </div>
      </Modal>

      {/* Gallery Modal */}
      <Modal
        show={showStatsGallery}
        align={'center'}
        className="w-full lg:w-2/3 relative"
        onClose={() => setShowStatsGallery(false)}
      >
        <div className=" w-full h-full p-3 lg:pr-[7px] rounded-lg bg-white">
          <div
            className="absolute right-0 lg:-right-10 -top-12 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
            onClick={() => setShowStatsGallery(false)}
          >
            <p className="text-sm lg:text-2xl"> X </p>
          </div>

          <ImageGallery
            items={statsImages}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
            slideInterval={5000}
            showThumbnails={true}
            thumbnailPosition={thumbnailPosition}
            startIndex={0}
            lazyLoad={true}
          />
        </div>
      </Modal>

      <StickyRAC />
    </Layout>
  );
};

export default MaleColombo;
