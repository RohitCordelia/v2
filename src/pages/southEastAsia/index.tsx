import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../component/Layout';
import Button from '../../components/UI/Button';
import ItineraryTabs from '../birthday/component/ItineraryTabs';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './index.css';
import StarRating from './component/StarRating';
import Marquee from 'react-fast-marquee';
import EventsAccordion from '../../components/EventsAccordian';
import RequestACallback from './component/Callback';
import Modal from '../../components/UI/ModalCenter';
import useMetaTags from 'react-metatags-hook';
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
  cssEase: 'linear',
  variableWidth: false,
  autoplay: false,
  dots: true,
  swipeToSlide: true,
  arrows: true,
  infinite: false,
  speed: 300,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024, // Tablets
      settings: {
        slidesToShow: 1.05,
        // centerPadding: "20px",
        arrows: false
      }
    },
    {
      breakpoint: 768, // Mobile landscape
      settings: {
        // slidesToShow: 1, // Show 1 slide per row on small screens
        // centerPadding: "30px",
        slidesToShow: 1.35,
        arrows: false
      }
    }
  ]
};

const destinations = [
  {
    title: 'Chennai',
    subTitle: 'Marina Beach, Temples, Culture',
    description:
      'Gateway to South India, Chennai blends heritage and modernity. Stroll along the sweeping sands of Marina Beach, marvel at centuries-old temples, and immerse yourself in the history, spirituality, and vibrant culture that make this city a timeless coastal treasure.',
    link: '/chennai',
    classes: '-rotate-6',
    revClasses: 'rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-desktop-image-01.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-mobile-image-01.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-desktop-image-02.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-mobile-image-02.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-desktop-image-03.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-mobile-image-03.webp',
        alt: 'Cordelia Sky'
      }
    ]
  },
  {
    title: 'Phuket',
    subTitle: 'Beaches, Nightlife, Island Tours',
    description:
      'Thailand’s island jewel of turquoise waters, sandy beaches, and lush hills. By day, explore hidden coves and rainforest trails. By night, experience the island’s famed nightlife where the energy lasts until sunrise.',
    link: '/thailand/phuket',
    classes: 'rotate-6',
    revClasses: '-rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-phuket-desktop-image-01.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-phuket-mobile-image-01.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-phuket-desktop-image-02.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-phuket-mobile-image-02.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-phuket-desktop-image-03.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-phuket-mobile-image-03.webp',
        alt: 'Cordelia Sky'
      }
    ]
  },
  {
    title: 'Langkawi',
    subTitle: 'Sky Bridge, Waterfalls, Mangroves',
    description:
      'Known as the Jewel of Kedah, Langkawi enchants with rainforest waterfalls, serene beaches, and the iconic Sky Bridge. A paradise where adventure, relaxation, and natural beauty combine to create a picture-perfect Southeast Asia escape.',
    link: '/malaysia/langkawi',
    classes: '-rotate-6',
    revClasses: 'rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-langkawi-desktop-image-01.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-langkawi-mobile-image-01.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-langkawi-desktop-image-02.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-langkawi-mobile-image-02.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-langkawi-desktop-image-03.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-langkawi-mobile-image-03.webp',
        alt: 'Cordelia Sky'
      }
    ]
  },
  {
    title: 'Kuala Lumpur',
    subTitle: 'Petronas Towers, Street Food, Culture',
    description:
      'Malaysia’s capital is a city of contrasts, where glittering skyscrapers rise above vibrant street markets. Gaze up at the Petronas Towers, shop in world-class malls, and taste the city through its street food - from spicy satay to sizzling noodles.',
    link: '/malaysia/kuala-lumpur',
    classes: 'rotate-6',
    revClasses: '-rotate-6',
    images: [
      {
        webUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-kualalumpur-desktop-image-01.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-kualalumpur-mobile-image-01.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-kualalumpur-desktop-image-02.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-kualalumpur-mobile-image-02.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-kualalumpur-desktop-image-03.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-kualalumpur-mobile-image-03.webp',
        alt: 'Cordelia Sky'
      }
    ]
  },
  {
    title: 'Singapore',
    subTitle: 'Gardens by the Bay, Orchard Road, City Life',
    description:
      'A futuristic city-state alive with colour and culture, Singapore enchants with Gardens by the Bay, Orchard Road shopping, and world-class dining. From skyline views to hawker centres, every moment here reflects Southeast Asia’s cosmopolitan charm.',
    link: '/singapore',
    classes: '-rotate-6',
    revClasses: 'rotate-6',
    images: [
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-singapore-desktop-image-01.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-singapore-mobile-image-01.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-singapore-desktop-image-02.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-singapore-mobile-image-02.webp',
        alt: 'Cordelia Sky'
      },
      {
        webUrl:
          'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-singapore-desktop-image-03.webp',
        mobileUrl:
          'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-singapore-mobile-image-03.webp',
        alt: 'Cordelia Sky'
      }
    ]
  }
];

const reviews = [
  {
    rating: 5,
    review:
      'This was our 8th or 9th cruise, yet what we experienced with Cordelia was different and outstanding. The hospitality, food, entertainment, and music onboard stood out. Cordelia will put India on the international cruise map, and we recommend everyone experience it.',
    guest: 'Rajendra Gupta, India'
  },
  {
    rating: 4.8,
    review:
      'A truly memorable experience. The ship was comfortable, the staff were warm, and every port felt like a new adventure. From meals and entertainment to exploring multiple countries in one trip, it felt like much more than what we paid for.',
    guest: 'Shubham Aggarwal, India'
  },
  {
    rating: 4.8,
    review:
      'Cordelia made our vacation truly special. The staff took care of us so well, and the shows and activities kept everyone entertained. Travelling with family has never been this enjoyable.',
    guest: 'Aurobindo Chowdhury, India'
  },
  {
    rating: 5,
    review:
      'After my first Cordelia Cruise to Lakshadweep, I knew I had to sail again. This time from Chennai to Singapore, the experience was even more special. The food was exceptional, from breakfast to midnight snacks, and the staff created such a welcoming atmosphere. It felt like a true home away from home.',
    guest: 'Dattaji Patil, India'
  }
];

const socialMediaCards = [
  // {
  //   id: 1,
  //   title: 'Beautiful Beach',
  //   description: 'Relax and enjoy the sunset.',
  //   media: {
  //     type: 'image',
  //     src: 'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-insta-reel-section-image.webp',
  //     alt: 'Beach'
  //   }
  // },
  {
    id: 1,
    title: 'City Tour',
    description: 'Explore the best sights.',
    media: {
      type: 'video',
      src: 'http://images.cordeliacruises.com/cordelia_v2/public/videos/SEAsia-Reel-1.mp4',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/SEAsia-reel-1-thumbnail.webp'
    }
  },
  {
    id: 2,
    title: 'City Tour',
    description: 'Explore the best sights.',
    media: {
      type: 'video',
      src: 'http://images.cordeliacruises.com/cordelia_v2/public/videos/SEAsia-Reel-2.mp4',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/SEAsia-reel-2-thumbnail.webp'
    }
  },
  {
    id: 3,
    title: 'City Tour',
    description: 'Explore the best sights.',
    media: {
      type: 'video',
      src: 'http://images.cordeliacruises.com/cordelia_v2/public/videos/SEAsia-Reel-3.mp4',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/SEAsia-reel-3-thumbnail.webp'
    }
  },
  {
    id: 4,
    title: 'City Tour',
    description: 'Explore the best sights.',
    media: {
      type: 'video',
      src: 'http://images.cordeliacruises.com/cordelia_v2/public/videos/SEAsia-Reel-4.mp4',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/SEAsia-reel-4-thumbnail.webp'
    }
  },
  {
    id: 5,
    title: 'City Tour',
    description: 'Explore the best sights.',
    media: {
      type: 'video',
      src: 'http://images.cordeliacruises.com/cordelia_v2/public/videos/SEAsia-Reel-5.mp4',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/SEAsia-reel-5-thumbnail.webp'
    }
  },
  {
    id: 6,
    title: 'City Tour',
    description: 'Explore the best sights.',
    media: {
      type: 'video',
      src: 'http://images.cordeliacruises.com/cordelia_v2/public/videos/SEAsia-Reel-6.mp4',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/SEAsia-reel-6-thumbnail.webp'
    }
  }
];

const exploreCruises = [
  {
    title: 'Sri Lanka Cruises',
    // ship: 'Cordelia Empress',
    image:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-othercruise-srilanka-desktop-image.webp',
    // link: '/upcoming-cruises?port=Hambantota&n=5'
    link: '/srilanka'
  },
  {
    title: 'Malé & Colombo Cruises',
    // ship: 'Cordelia Empress',
    image:
      'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-othercruise-male-desktop-image.webp',
    // link: '/upcoming-cruises?port=Male&n=5'
    link: '/maldives-cruises'
  }
];

const faqItems = [
  {
    title: 'What’s included in my Southeast Asia cruise fare?',
    content:
      'Your fare covers your stateroom, all main dining, select beverages, daily entertainment, and most onboard activities. Specialty dining, premium drinks, spa treatments, and curated shore excursions are available at an additional cost.'
  },
  {
    title: 'How long are the cruises?',
    content:
      'Our Southeast Asia itineraries range from 7-night to 10-night voyages, designed to give you more time in each port while still enjoying sea days to relax onboard.'
  },
  {
    title: 'Where do the cruises start and end?',
    content:
      'Sailings are available between Singapore and Chennai, India. These are one-way cruises, meaning you’ll discover more destinations in a single journey without repeating ports.'
  },
  {
    title: 'Do I need a visa for this cruise?',
    content:
      'Visa requirements vary by nationality and ports of call. Guests should check with their local consulates before travel.'
  },
  {
    title: 'Are these cruises suitable for families?',
    content:
      'Yes. Families will find multiple dining options, daily activities for all ages, children’s programs, and family-friendly accommodations. There are also entertainment and excursion choices designed for both adults and younger travellers.'
  },
  {
    title: 'What entertainment is offered onboard?',
    content:
      'From Broadway-style productions and live music to themed deck parties and cultural shows, evenings onboard are lively. During the day, you can join fitness classes, workshops, or simply relax by the pool.'
  },
  {
    title: 'How early should I book?',
    content:
      'These Southeast Asia sailings are limited in number and often sell out quickly. To secure your preferred itinerary, cabin category, and early booking offers, we recommend reserving well in advance.'
  },
  {
    title: 'What should I pack?',
    content:
      'Pack light, breathable clothing for tropical weather, swimwear, evening wear for dinners, and comfortable shoes for excursions. For temple or cultural site visits, modest attire covering shoulders and knees is recommended.'
  }
];

const SouthEastAsia = () => {
  const [stickUp, setStickUp] = useState(false);
  const [isActiveSocial, setIsActiveSocial] = useState(false);
  const [activeSocial, setActiveSocial] = useState({});
  const [activeDestinations, setActiveDestinations] = useState(destinations);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRender = useRef(true);

  const navigate = useNavigate();

  useMetaTags({
    title:
      'Singapore Cruise Packages | Book Singapore cruise packages with Cordelia Cruises',
    description:
      'Cruise to Singapore with Cordelia. Indulge in gourmet cuisine, relaxing stays, entertainment & unforgettable moments onboard.',
    metas: [
      {
        name: 'keywords',
        content:
          'Singapore cruise packages, cruise packages from Singapore, cruise packages, cruise, cordelia cruises, cruise packages price in india, best cruise packages, weekend cruises, cruise to Singapore'
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
  //     if (rect.top <= -180) {
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
        rootMargin: "-50px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
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

  // testimonial card height fix
  useEffect(() => {
    const cards = document.querySelectorAll('.testimonial-card');
    let maxHeight = 0;
    cards.forEach((card) => {
      maxHeight = Math.max(maxHeight, card.scrollHeight);
    });
    cards.forEach((card) => {
      (card as HTMLElement).style.height = `${maxHeight}px`;
    });
  }, [reviews]);

  return (
    <Layout footerClassName="!mt-0">
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
              data-src={
                innerWidth > 768
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/videos/SEA-desktop-banner-new.mp4'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/videos/SEA-mobile-banner-video.mp4'
              }
              src={
                innerWidth > 768
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/videos/SEA-desktop-banner-new.mp4'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/videos/SEA-mobile-banner-video.mp4'
              }
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/30 flex justify-center items-center">
              <p className="font-extrabold font-playfairDisplay text-3xl lg:text-5xl text-white w-3/4 lg:w-1/2 text-center lg:!leading-tight">
                Set Sail Across Southeast Asia's Most Iconic Shores
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
            className={isSticky && classNames(
              'flex justify-between items-center py-4 shadow-all bg-white mx-auto z-[9999] px-4 !p-0 lg:px-0 justify-self-center ',
              {
                'fixed top-[0px] left-0 w-full px-14 rounded-none border-gray-100 lg:w-full shadow-allSide lg:!px-20':
                  isSticky && !isMobile,
                'rounded-xl px-4 border border-gray-100 absolute bottom-5 left-0 right-0 lg:bottom-8 w-[90%]':
                  !isSticky
              }
            )}
          >
            <div className={`${isSticky ? 'pb-4' : 'pt-10'} container mx-auto`}>
              <RequestACallback
                showTitle={!isSticky}
                title="Plan Your Southeast Asia Escape"
                titleClassName="!text-black/80 !font-extrabold"
                submitText="Get My Cruise Quote"
                desktopMode={innerWidth > 768}
                pageCode="south-east-asia"
                isSticky={isSticky}
              />
            </div>
          </div>
          {/* <div className="pt-10 container mx-auto">
            <RequestACallback
              showTitle={!isSticky}
              title="Plan Your Southeast Asia Escape"
              titleClassName="!text-black/80 !font-extrabold"
              submitText="Get My Cruise Quote"
              desktopMode={innerWidth > 768}
              pageCode="south-east-asia"
              isSticky={isSticky}
            />
          </div> */}
          <div className="relative text-center px-4 pt-11 lg:pt-20 pb-16 lg:pb-10 container mx-auto lg:w-[65%]">
            <h2 className="text-[22px] lg:text-4xl font-bold pb-2 lg:pb-4">
              <span
                className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                style={{
                  color: 'transparent'
                }}
              >
                Southeast Asia{' '}
              </span>
              Cruises
            </h2>
            <p className="text-xs lg:text-xl font-bold pb-4 lg:pb-8 text-black/80">
              One-Way Cruises Between India and Singapore
            </p>
            <p className="text-xs lg:text-lg leading-[22px] lg:leading-7 mb-4 lg:mb-8 text-black/80">
              Sail on a Southeast Asia cruise connecting the vibrant ports of
              Chennai and Singapore. From Phuket's tropical shores to Langkawi's
              emerald hills, Kuala Lumpur's dazzling skyline, and Singapore's
              cosmopolitan charm, these one-way cruises are the perfect blend of
              exploration and luxury.
            </p>
            <p className="text-xs lg:text-lg leading-[22px] lg:leading-7 mb-4 lg:mb-8 text-black/80">
              With only a select number of departures each year, every cruise
              offers visa-friendly sailing for Indians, more shore time, and
              Indian hospitality at sea. Whether you choose a 7-night or
              10-night journey, every sunrise brings a new destination to
              discover.
            </p>
            {/* <Button
              text="Book Now"
              size={innerWidth > 768 ? 'lg' : 'sm'}
              handleClick={() => {}}
              className="rounded-full"
            /> */}
            <div className="hidden lg:block absolute top-[10%] -left-[22%] w-[100px] lg:w-52">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-element-01.webp"
                alt="element"
              />
            </div>
            <div className="absolute -bottom-10 lg:-bottom-20 right-2 lg:-right-[22%] w-[100px] lg:w-52">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-element-02.webp"
                alt="element"
              />
            </div>
          </div>
          <div className="text-center !bg-cover !bg-no-repeat pt-10 lg:pt-20 pb-20 lg:pb-32 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-itinerary-bg-mobile.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-itinerary-bg-desktop.webp)]">
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
              <div>
                <ItineraryTabs
                  type="southeast"
                  activeDestinations={activeDestinations}
                  setActiveDestinations={setActiveDestinations}
                />
              </div>
            </div>
          </div>
          <div className="relative text-center text-white !bg-cover !bg-no-repeat py-10 lg:py-24 lg:pb-24 -mt-5 lg:-mt-16 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-destination-bg-mobile.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/SEA-page-destination-new-bg-desktop.webp)]">
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <img
                src={
                  innerWidth > 768
                    ? 'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-route-line.webp'
                    : 'http://images.cordeliacruises.com/cordelia_v2/public/images/SEA-chennai-route-line-mobile.webp'
                }
                alt="route_line"
                className={`w-full lg:py-12 lg:px-20 ${
                  activeDestinations[0]?.title === 'Chennai'
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
                Every great vacation deserves unforgettable stops. Our Southeast
                Asia cruises take you to iconic cities and islands where every
                port of call is a destination worth falling in love with.
              </p>
              <div className="-mt-5">
                {activeDestinations?.map((dest) => (
                  <div
                    key={dest.title}
                    className={`mb-10 [&:last-child]:mb-8 lg:flex lg:gap-12 lg:justify-center lg:items-center ${
                      activeDestinations[0]?.title === 'Chennai'
                        ? 'lg:even:flex-row-reverse lg:even:ml-10'
                        : 'lg:odd:flex-row-reverse'
                    }`}
                  >
                    <div className="relative destinations w-full lg:basis-3/5 lg:overflow-hidden lg:py-2">
                      <Slider
                        {...settings}
                        className={
                          activeDestinations[0].title === 'Chennai'
                            ? dest?.classes
                            : dest?.revClasses
                        }
                      >
                        {dest?.images?.map((image: any) => (
                          <div
                            className="relative text-center bg-white px-1.5 pt-1.5 pb-12 lg:pb-16 overflow-hidden rounded-md cursor-pointer !w-4/5"
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
                      <Button
                        text="Explore More"
                        size={innerWidth > 768 ? 'base' : 'sm'}
                        handleClick={() =>
                          window.open(
                            dest?.link,
                            '_blank',
                            'noopener noreferrer'
                          )
                        }
                        className="rounded-full"
                      />
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
              pageCode="south-east-asia"
            />
          </div> */}
          <div className="text-center px-0 pt-20 container mx-auto">
            <div className="px-4">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                From Our{' '}
                <span
                  className=" font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  Guests
                </span>
              </h2>
              <p className="text-xs lg:text-lg pb-8 lg:pb-10 lg:px-20 text-black/80">
                Real stories from happy cruisers who explored International and
                beyond with Cordelia. Discover why thousands choose us for
                unforgettable sea journeys.
              </p>
            </div>
            <div className="mb-10 relative reviews">
              <Slider {...settings1}>
                {reviews?.map((rev: any, index: number) => (
                  <div
                    key={index}
                    className="testimonial-card border border-gray-300 rounded-md p-5 text-left bg-white mb-1.5 min-w-[272px] w-[272px] lg:h-auto shadow-md !flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-5 flex items-center gap-2">
                        <StarRating rating={rev.rating} />
                        <span className="text-sm font-semibold">
                          {rev.rating}/5
                        </span>
                      </div>
                      <p className="text-sm text-black/70 mb-6 leading-6">
                        {rev.review}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/SEA-customer-review-icon.svg"
                          alt=""
                          className="w-4 h-4"
                        />
                      </div>
                      <span className="text-sm font-semibold">{rev.guest}</span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="text-center px-0 lg:px-4 py-16 lg:pt-20">
            <div className="px-4 container mx-auto">
              <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                Your Future Cruise,{' '}
                <span
                  className="block lg:inline font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                  style={{
                    color: 'transparent'
                  }}
                >
                  Their Past Adventure
                </span>
              </h2>
              <p className="text-xs lg:text-lg pb-8 lg:pb-14 lg:px-20 text-black/80">
                See what our guests discovered, tasted, and experienced on this
                unforgettable Southeast Asia cruise and imagine yourself in
                every frame.
              </p>
            </div>
            <Marquee pauseOnHover={true} play={!isActiveSocial} speed={50}>
              {socialMediaCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white shadow-md rounded-md overflow-hidden mx-2 w-[212px] lg:w-72 lg:h-auto h-[328px] cursor-pointer"
                  onClick={() => {
                    setIsActiveSocial(true);
                    setActiveSocial(card);
                  }}
                >
                  {card.media &&
                    (card.media.type === 'image' ? (
                      <img
                        src={card.media.src}
                        alt={card.media.alt || card.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative">
                        <img
                          src={card.media.thumbnail}
                          alt={card.media.alt || card.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/SEA-page-play-icon.svg"
                            alt="play_icon"
                            className="w-12 h-12 lg:w-16 lg:h-16"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </Marquee>
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
                      <p className="text-white text-sm font-bold leading-5 lg:text-xl lg:leading-8">
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
                  controlsList="nodownload nofullscreen"
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

      <StickyRAC />
    </Layout>
  );
};

export default SouthEastAsia;
