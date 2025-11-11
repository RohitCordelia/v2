import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Layout from '../../component/Layout';
import Slider from 'react-slick';
import Marquee from 'react-fast-marquee';
import CabinCategory from '../weekend/component/cabin';
import UpcomingCruise from '../../component/UpcomingCruise';
import Gallery from '../../component/Gallery';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useSubscribeMutation } from '../../services/auth/auth';
import { useForm } from 'react-hook-form';
import Banner from '../../component/Banner';
import useVideoAutoPlay from '../../utils/customHooks/useVideoAutoPlay';
import Button from '../../components/UI/Button';
import Modal2 from "../../components/UI/ModalCenter";

// const muteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/mute-new-icon.svg";
// const unmuteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/volume-new-icon.svg";

const bannerData = {
  "title": "",
  "images": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website1.webp",
      // "link": "",
      "type": "image",
      "altTag": "",
      "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website1.webp"
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website2.webp",
      // "link": "",
      "type": "image",
      "altTag": "",
      "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website2.webp"
    },
  ],
  "subTitle": "",
  "mobileImages": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile.webp",
      // "link": "",
      "type": "image",
      "altTag": "",
      "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile.webp"
    },
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile2.webp",
      // "link": "",
      "type": "image",
      "altTag": "",
      "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile2.webp"
    },
  ],
}

const SkyData = {
  name: 'Cordelia Sky',
  heroVideo: {
    webVideo:
      'https://s3-figma-videos-production-sig.figma.com/video/TEAM/1363113411865247471/95c1ad101d50130d4acd2c9db9efe7f4b83f1a2b?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kiA1RBoujHcFoWUY5crmFqxgtq68jy~lTVa3C2me3TlOokKXuRjgo2j9ejnWzeyAvFLUlyiUOhljzy~CjMY9S-gLSW-8NIl5kfwT6IR5vUO4eWI1IJSHhnPUij14NrSYURGUOtTdIS4ibh51aI5FM4TetG8vRfi-DsRnOTu7Ull-Wx6Wzyj09t9l1SanIvKzwAQf5RIwZFXlFkAegGOnIssWoYI1f2lpeu4k5mDqm-FOoFhgxdG3SpkFDKxEfOUSE-QEBTI45SzgT0BX70KTlb8jpHpjeqF4sjoVWLicratTMmY3njBM5fnvrbNYRrrPZWWywyNYsdyugjCpKAZrRQ__',
    mobileVideo:
      'https://s3-figma-videos-production-sig.figma.com/video/TEAM/1363113411865247471/e2a5642aecf6c0a9d2e27b8fb5973a0eec2d6f61?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sHWYwgWD6yOxlkk4YP7CtgzvUA1JOM8ti3eDHZDbpXJkXdqngE3Gn0swdDPivZXKcer8WyZYOKHGZdmd8gMczaVjhFlxd3BU0uJzIoZg0RMcGFPjaWgtY9awlIUm7ktn99uAphT2VvoczOmt2XbyMZFVNyy2HhivCTUZyCE9qdvjqFBAYCmnXG~6fC3TWNjbheWMm7hq~QiMNdE6FgxtDoMSK3hJAXChTGwiifBWmi4uJwwfnSdsYUOx~pusvYHWTL84JXNS6gFIyxKMVoJNFiWOCKcERnDgIgxSsLUOKYot-vamnHWBhfSlxVC0z5uV1GkxwI-TZot4gNgp1nej8w__'
  },
  destinationSectionVideo: {
    webVideo:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/destination-bg-video-web.mp4',
    mobileVideo:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/destination-bg-video-mobile.mp4'
  },
  offersVideos: {
    video1: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Pool_Offer.webp',
    // video1: "https://images.cordeliacruises.com/cordelia_v2/public/videos/0_Couple_Beach_1920x1080.mp4",
    video2: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Bar+Offer.webp'
    // video2: "https://images.cordeliacruises.com/cordelia_v2/public/videos/0-Party_Friends-1280x720.mp4"
  },
  statCards: [
    {
      title: 'Activities',
      count: '15+',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PoolDeck-popup.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-splash-academy-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-gym-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/meetings.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp',
      ],
      mobileImages: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PoolDeck-popup.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-splash-academy-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-gym-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/meetings.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/spa.webp',
      ],
    },
    {
      title: 'Dining Venues',
      count: '8+',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cagneys-web.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-cagney-steakhouse-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-crossing-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-lebistro-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-spinnaker-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/lacunica.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-01.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-02.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/LeBistro.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sugarcane.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-dawn-le-bistro-popup-web.webp',
      ],
      mobileImages: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-cagney-steakhouse-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-crossing-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-lebistro-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-spinnaker-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/lacunica.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-01.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-great-outdoors-popup-web-02.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/LeBistro.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sugarcane.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-dawn-le-bistro-popup-web.webp',
      ],
    },
    {
      title: 'Bars & Lounges',
      count: '7+',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-sugarcane-bar-web.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sugarcane.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pinnacle-lounge-sushi-bar-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Topsiders_Sky.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-local-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-starbucks-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/LeBistro.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-bliss-lounge-popup-web.webp',
      ],
      mobileImages: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sugarcane.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pinnacle-lounge-sushi-bar-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Topsiders_Sky.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-local-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-starbucks-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/LeBistro.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-bliss-lounge-popup-web.webp',
      ],
    },
    {
      title: 'Entertainment',
      count: '5+',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-rock-you-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
      ],
      mobileImages: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-rock-you-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-cruise-pickle-ball-popup-image.webp',
      ],
    },
  ],
  marqueeImages: [
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky-Swimming+Pool.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PoolDeck-popup.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PoolDeck-popup.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sky_Dining_Venues_Web.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-dining-pop-up-image-web-new.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-dining-pop-up-image-web-new.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky-Cordelia+Academy.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-academy-pop-up-image-web-new.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-academy-pop-up-image-web-new.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Empress_Sky_Gym_Web.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-gym-pop-up-image-desktop.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-gym-pop-up-image-desktop.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_Main_Gaming_Arcade_Web.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_Sky_Main_Game_of_skills_Web.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PopUp_Game_of_skills_Web.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Sky_PopUp_Game_of_skills_Web.webp'
    }
  ],
  otherCruises: [
    {
      name: "Sun",
      image: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Aerial_Melbourne_comp_web.webp",
      link: "/cordelia-sun",
    },
    {
      name: 'Empress',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-page-empress-other-fleet-web.jpg',
      link: '/cordelia-empress',
    },
  ]
};

const settings = {
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

const CordeliaSky = () => {
  const [shipData, setShipData] = useState<any>(SkyData);
  const [playing, setPlaying] = useState(true);
  // const [isPlay, setIsPlay] = useState(false);
  // const [isPlaying, setIsPlaying] = useState<any>(true);
  // const [isVideoReady, setIsVideoReady] = useState<any>(false);
  // const [isMute, setIsMute] = useState<any>(true);
  // const [currentDuration, setCurrentDuration] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showStatsGallery, setShowStatsGallery] = useState(false);
  const [sliderIndex, setSliderIndex] = useState<any>(0);
  const [statsSliderIndex, setStatsSliderIndex] = useState<any>(0);
  const [galleryModal, setGalleryModal] = useState<'stats' | 'marquee'>(
    'marquee'
  );
  const [thumbnailPosition, setThumbnailPosition] = useState<any>('right');
  const [showMore, setShowMore] = useState(false);
  const [useSubscribe] = useSubscribeMutation()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useVideoAutoPlay();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data: any) => {
    setLoading(true)
    const _payload = {
      email: data.email,
      source: 'website'
    };

    useSubscribe(_payload)
      .unwrap()
      .then((res: any) => {
        setShowSuccessModal(true)
        setLoading(false)
        setSuccess(res?.message || 'Subscription created successfully')
      })
      .catch((res: any) => {
        setShowSuccessModal(true)
        setLoading(false)
        setSuccess(res?.data?.errors || 'Something went wrong, please try again later.')
      })
  }
  // const playerRef = useRef();

  const navigate = useNavigate();
  // const location = useLocation();

  const isDesktop = window.innerWidth > 1024;
  const imagesKey = isDesktop ? 'images' : 'mobileImages';

  const statsImages = shipData?.statCards?.[statsSliderIndex]?.[imagesKey]?.map(
    (image: any) => ({ original: image, thumbnail: image })
  );

  useEffect(() => {
    if (window.innerWidth > 640) {
      setThumbnailPosition('right');
    } else {
      setThumbnailPosition('bottom');
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    // if (location.pathname === '/cordelia-empress') {
    //   setShipData(CruiseShips['cordelia-empress']);
    // } else if (location.pathname === '/cordelia-sky') {
    //   setShipData(CruiseShips['cordelia-sky']);
    // }
    // else if (location.pathname === "/cordelia-sun") {
    //   setShipData(CruiseShips["cordelia-sun"]);
    // }
  }, []);

  // const toggelMute = () => {
  //   setIsMute((current: any) => !current)
  // }

  // const getDuration = playerRef?.current?.getDuration();

  const handleImageClick = (index: number, type: 'stats' | 'marquee') => {
    setGalleryModal(type);

    if (type === 'marquee') {
      setShowGallery(true);
      setSliderIndex(index);
    } else if (type === 'stats') {
      setShowStatsGallery(true);
      setStatsSliderIndex(index);
    }
  };

  return (
    <Layout isVideo={playing} footerClassName="!mt-0">
      <main className="z-10">
        {/* <section className={`sticky top-0 ${window.innerWidth > 1024 ? 'z-[0]' : 'z-[-1]'}`}> */}
        <section className={`sticky top-0 z-0`}>
          <Banner data={bannerData} clickable={false} />
        </section>
        {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/90 to-white" /> */}
        <section
          id="mainShipPage"
          className="relative -mb-0.5 pt-14 lg:pt-24 bg-white z-10"
        >
          <div className="container mx-auto px-4 text-center pb-10 lg:pb-0 lg:px-0 lg:text-left">
            <div className="lg:flex lg:justify-between lg:gap-5 lg:pb-16">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium font-playfairDisplay lg:w-1/3">
                Come aboard Sky:
                <span className="block text-[22px] lg:text-4xl font-playfairDisplay">
                  A celebration at sea
                </span>
              </h2>
              <div className="lg:w-[65%]">
                <p className="text-xs font-medium mt-4 lg:text-lg lg:leading-7 lg:mt-5 lg:inline">
                  Set sail on the Sky, where modern comfort meets vibrant
                  entertainment. Enjoy exquisite dining, a relaxing spa, and a
                  fitness centre. With live performances, lively bars, and
                  spacious staterooms, every moment promises relaxation and
                  excitement.
                </p>
                {/* {showMore && (
                  <p className="text-xs font-medium lg:text-lg lg:leading-7">
                    Enjoy live performances in the theatre or dance the night
                    away at various lounges and bars. With spacious staterooms,
                    attentive service, and diverse activities, the Sky promises
                    a voyage filled with relaxation and excitement.
                  </p>
                )}
                <button
                  className={`text-brand-primary underline cursor-pointer md:text-md text-sm font-bold lg:text-lg`}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Read Less' : 'Read More'}
                </button> */}
              </div>
            </div>
            <Slider
              {...settings}
              centerMode={false}
              className="!hidden lg:!block desktopTiltedSlider"
            >
              {shipData?.statCards?.map((statCard: any, index: any) => {
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
          </div>
          <Slider
            {...settings}
            className="lg:!hidden mobileTiltedSlider -mb-[2px] lg:mb-0 z-10"
          >
            {shipData?.statCards?.map((statCard: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`slick-slide-custom relative group h-[372px] !w-[96%] mb-4 rounded-lg overflow-hidden cursor-pointer transition-transform duration-500`}
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
        </section>
        <section className={`relative -mb-0.5 pb-2 lg:pb-5 lg:pt-10 bg-white theEmpressCabin ${window.innerWidth < 1024 ? 'z-10' : 'z-auto'}`}>
          {/* <section className={`relative -mb-0.5 pb-2 lg:pb-5 lg:pt-10 bg-white theEmpressCabin z-10`}> */}
          <div className="container mx-auto px-4 text-center lg:px-0">
            <div className="pt-10 m-0">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium px-14 font-playfairDisplay">
                Choose a suite that suits you
              </h2>
              <p className="text-xs font-medium my-4 lg:text-lg lg:leading-7 lg:mt-5">
                Unwind in style with a choice of staterooms and suites, designed
                for the perfect escape at sea.
              </p>
            </div>
            <CabinCategory page={'ship'} ship={'sky'} />
          </div>
          <div className="absolute left-0 bottom-16 hidden lg:block -z-10">
            <img
              className="w-[450px]"
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-01.svg"
              alt=""
            />
          </div>
          {/* <div className='absolute left-0 bottom-20 lg:bottom-16 lg:hidden'>
            <img className='w-[100px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-element-mobile-01.svg" alt="" />
          </div> */}
        </section>
        <section className={`relative pt-14 lg:pt-24 bg-white z-10 ${window.innerWidth > 1024 ? 'z-10' : 'z-[8]'}`}>
          {/* <section className={`relative pt-14 lg:pt-24 bg-white z-10`}> */}
          <div className="container mx-auto text-center px-4 lg:px-0">
            <div className="lg:pb-5">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium px-14 font-playfairDisplay">
                Fun ahoy! Endless adventure starts here.
              </h2>
              <p className="text-xs font-medium my-4 lg:text-lg lg:leading-7 lg:mt-5">
                From poolside chills to showtime thrills, there’s something for
                everyone!
              </p>
            </div>
          </div>
          <Marquee pauseOnHover={true} speed={130} pauseOnClick={true}>
            {shipData?.marqueeImages?.map((img: any, index: number) => (
              <div
                key={index}
                className="h-[350px] lg:h-[500px] cursor-pointer"
              >
                <img
                  src={img.image}
                  className="w-full h-full object-cover"
                  alt=""
                  onClick={() => handleImageClick(index, 'marquee')}
                />
              </div>
            ))}
          </Marquee>
        </section>
        {/* <section className='relative pt-10 pb-24 lg:pb-32'> */}
        <section className={`relative -mb-0.5 pt-14 lg:pt-24 pb-14 lg:pb-24 bg-white ${window.innerWidth > 1024 ? 'z-10' : 'z-[9]'}`}>
          {/* <section className={`relative -mb-0.5 pt-14 lg:pt-24 pb-14 lg:pb-24 bg-white z-10`}> */}
          <UpcomingCruise ship="sky" />
        </section>
        <section className="relative p-0 z-10">
          <div className="relative h-[80vh] lg:h-[500px] overflow-hidden">
            <video
              className="w-full h-full object-cover pointer-events-none"
              autoPlay={false}
              loop
              muted
              playsInline
              preload="none"
              data-src={
                window.innerWidth > 1024
                  ? shipData?.destinationSectionVideo?.webVideo
                  : shipData?.destinationSectionVideo?.mobileVideo
              }
            />
            {/* <div className="aspect-video-custom top-0 h-screen fixed w-full"> */}
            {/* {!isVideoReady && (
                <div className="absolute top-0 h-[80vh] lg:h-[500px]">
                  <img
                    src={
                      'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-holi-mobile-banner.webp'
                    }
                    alt=""
                    className='w-full h-full object-cover'
                  />
                </div>
              )}
              <ReactPlayer
                ref={playerRef}
                volume={1}
                url="https://s3-figma-videos-production-sig.figma.com/video/TEAM/1363113411865247471/fdeb8afd320962eddb2490e123366f9835213ee9?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WBuxfGFknAuP78ZIhtVG4u5rEomXDzIkHwjtljkY2iVYxcXTroOU33sTuDik2N8K~Xqo0~CYKTVyB3XtYn6oFfLbLGAR8ZMVBivw~M-eUx2NNHKxRer5FS7LC0HEjf3OILMMn8n7tDdoIq-z~gkqXS9MLSbtxKUq1eBWKgnlewGAPYagdpSM~g-dqLoVlUOs8VjJUV3uERiWTCqNEVVquorg0OVlLTp5JQIAW9hr79bLtOp5lH84VD0pwDxTTWc-iT7uqtHeXAkFF2fqTIfZQPEsFoPytW2LHWv6X00F6~QNvxfpuAd5KxPi0Y8tu7NmWghbs5IYuo9zG6WlQlrGZg__"
                width="100%"
                height="100%"
                controls={false}
                muted={isMute}
                onPlay={() => {
                  setIsPlay(true);
                  setIsVideoReady(true);
                  // sliderRef.current?.slickPause()
                }}
                loop={true}
                playing={isPlaying}
                playsinline
                progressInterval={1000}
                onProgress={(progress: any) => {
                  let time = Math.floor(progress.playedSeconds);
                  if (currentDuration < time) {
                    setCurrentDuration(time);
                  }
                }}
                onPause={() => setIsPlay(false)}
                className="absolute top-0 left-0 w-full h-full object-cover"
              /> */}
            {/* </div> */}
            {/* <video autoplay muted loop id="myVideo" className='w-full'>
                <source src="https://www.youtube.com/embed/jjr37et4dBY?autoplay=1&mute=0&controls=0&origin=https%3A%2F%2Fwww.cordeliacruises.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1&forigin=https%3A%2F%2Fwww.cordeliacruises.com%2F&aoriginsup=1&vf=6" type="video/mp4" />
              </video> */}
            {/* <video controls={false} loop={true} muted={true} src="https://www.youtube.com/embed/jjr37et4dBY?autoplay=1&mute=0&controls=0&origin=https%3A%2F%2Fwww.cordeliacruises.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1&forigin=https%3A%2F%2Fwww.cordeliacruises.com%2F&aoriginsup=1&vf=6"></video> */}
            <div className="w-[82%] h-[485px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 bg-black/60 p-5 bg-gradient-to-r from-red-500 to-purple-500 flex justify-center items-center lg:h-[360px] lg:w-[62%]">
              <div className="border-4 border-brand-primary text-center h-[445px] flex justify-center items-center lg:h-[310px] w-full">
                <div className="text-white p-2">
                  <h4 className="text-xl lg:text-4xl lg:font-medium font-medium px-5 font-playfairDisplay">
                    Where will the sea take you?
                  </h4>
                  <p className="text-xs font-medium my-4 mb-8 lg:px-40 lg:text-lg lg:leading-7 lg:mt-5">
                    Explore the hottest destinations to cruise to!
                  </p>
                  <Button text="Explore More" size={innerWidth > 768 ? 'medium' : 'sm'} handleClick={() => navigate(`/destination`)} className="lg:w-max" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="relative -mb-0.5 pb-14 lg:pb-5 lg:pt-10 bg-white">
          <Subscribe />
        </section> */}
        <section className={`relative -mb-0.5 py-14 lg:py-24 bg-white ${window.innerWidth < 1024 ? 'z-10' : 'z-auto'}`}>
          <Gallery page="ship" ship="sky" />
        </section>
        <section className={`relative -mb-0.5 bg-[#FEF1EF] lg:flex lg:justify-between lg:h-[468px] ${window.innerWidth > 1024 ? 'z-10' : 'z-[9]'}`}>
          {shipData?.offersVideos?.video1.split(".").at(-1) === "mp4" ?
            <div className="aspect-square relative overflow-hidden lg:flex-none">
              <video
                className="w-full h-full object-cover clip-slant lg:clip-slant-desktop pointer-events-none"
                autoPlay={false}
                loop
                muted
                playsInline
                preload="none"
                data-src={shipData?.offersVideos?.video1}
              />
            </div>
            : <div className="aspect-square relative overflow-hidden lg:flex-none">
              <img className='w-full h-full object-cover clip-slant lg:clip-slant-desktop pointer-events-none' src={shipData?.offersVideos?.video1} />
            </div>
          }
          {/* <div className='col-span-3 lg:col-span-2'> */}
          <div className="py-2 px-10 text-center lg:p-0 lg:flex lg:flex-col lg:justify-center lg:items-center">
            <h2 className="text-2xl lg:text-4xl font-medium lg:mb-3">
              To Get Cruise Deals Alerts
            </h2>
            <div className="mb-7 w-[98%] lg:w-2/3">
              <p className="lg:text-lg text-sm lg:leading-7">
                Subscribe now and set sail on a journey of endless adventure
                with our exclusive cruise newsletter
              </p>
            </div>
            {/* <p className='lg:text-lg text-sm lg:leading-7 mb-10 lg:mb-16'> with our exclusive cruise newsletter</p> */}
            <form className="w-full lg:w-3/4">
              <div className="grid grid-cols-8 lg:block">
                <div className="col-span-8 lg:col-span-4 lg:mb-3">
                  <input
                    type='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    className='py-2.5 lg:py-[17px] px-4 w-full rounded lg:rounded-none lg:rounded-l focus:outline-none border'
                    placeholder='Enter your email address'
                  />
                  {errors.email && (
                    <p className="text-base text-danger mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="col-span-8 lg:col-span-3 mt-3 lg:mt-0">
                  <Button text="Subscribe" size={window.innerWidth > 768 ? 'lg' : 'base'} isLoading={loading} disabled={loading} handleClick={handleSubmit(submitForm)} className="w-full lg:px-10" />
                </div>
              </div>
            </form>
          </div>
          {/* <div className="py-2 px-10 text-center lg:p-0 lg:flex lg:flex-col lg:justify-center lg:items-center">
            <h3 className="text-xl lg:text-4xl lg:font-medium font-medium px-5 font-playfairDisplay">
              Offers & Upgrades
            </h3>
            <p className="text-xs font-medium my-4 mb-8 lg:text-lg lg:leading-7 lg:mt-5">
              Ready to book your dream vacation? Our incredible offers make
              travelling aboard The Empress even more irresistible! Get excited
              for the adventure of a lifetime, with incredible sights and
              unbeatable savings.{' '}
            </p>
            <button
              onClick={() => navigate(`/promotion`)}
              className="py-2.5 lg:py-4 px-6 lg:px-10 bg-brand-primary text-white rounded-md text-lg font-semibold lg:w-max"
            >
              Explore More
            </button>
          </div> */}
          {shipData?.offersVideos?.video2.split(".").at(-1) === "mp4" ?
            <div className="aspect-square relative overflow-hidden lg:flex-none">
              <video
                className="w-full h-full object-cover clip-slant-rev lg:clip-slant-rev-desktop pointer-events-none"
                autoPlay={false}
                loop
                muted
                playsInline
                preload="none"
                data-src={shipData?.offersVideos?.video2}
              />
            </div>
            : <div className="aspect-square relative overflow-hidden lg:flex-none">
              <img className='w-full h-full object-cover clip-slant-rev lg:clip-slant-rev-desktop pointer-events-none' src={shipData?.offersVideos?.video2} />
            </div>
          }
        </section>
        <section className="relative pt-10 pb-24 lg:pb-32 lg:pt-14 bg-white z-10">
          <div className="container mx-auto text-center px-4 lg:px-0">
            <div className="lg:mb-12">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium font-playfairDisplay">
                Explore Our Other Ships
              </h2>
              <p className="text-xs font-medium my-4 lg:text-lg lg:leading-7 lg:my-5">
                Embark on new horizons with our cruises, each offering something
                special.
              </p>
            </div>
            <div className="lg:flex lg:justify-center lg:gap-4">
              {shipData?.otherCruises?.map((otherCruise: any) => (
                <div
                  className="relative cursor-pointer h-48 lg:h-[305px] rounded overflow-hidden mb-4 lg:w-1/2"
                  onClick={() => navigate(`${otherCruise?.link}`)}
                >
                  <div className="h-48 lg:h-[305px]">
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      src={otherCruise?.image}
                      alt={otherCruise?.name}
                      title={otherCruise?.name}
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-4/5 h-max z-10 cursor-pointer">
                      <p className="text-white text-2xl lg:text-4xl lg:font-medium font-medium font-playfairDisplay">
                        {otherCruise?.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full rounded-md h-full bg-black/30" />
                </div>
              ))}
              {/* <div className='relative cursor-pointer h-48 lg:h-[305px] rounded overflow-hidden lg:w-1/2' onClick={() => navigate(`/cordelia-sun`)}>
                <div>
                  <img
                      className='w-full h-full object-cover cursor-pointer'
                      src="https://s3-alpha-sig.figma.com/img/5855/8854/2e191b54d5759c592f06ceca18eec98b?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PcVKGceR6At6XvATXbCKjs0NtdEsyd9FDEVn1bpjY8jkg1g3IlrvCOyDspKceurwANRUhoxFWvDjX5FdYnlsBW8ITnqlqWV8gbfNdSS9Xh6Us1aLNoKDy5H66qUvCUD8a7aeu7p5ak57QsiR8LUrhHgJ6e1f95SLTmee3ur2Wsctw4mQU7JJp06BvKrNdKsob51mL-Ed6vhZgIO7Q1gE7xrOGAmsVDG8lyAvJqeEXF3PludHZfKfdQ3QXriQOSmbb~4lCbpl51py2Mn~sNDuET6mgKL8VYpJ34RJ9C39idTWN9neo968vQ2HrGzp5i5BMWzLXx9Um4hmfDIAKARvkA__" alt='The Sun'
                      title='The Sun'
                  />
                  <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-auto h-max z-10 cursor-pointer'>
                      <p className='text-white text-2xl lg:text-4xl lg:font-medium font-medium font-playfairDisplay'>Cordelia Sun</p>
                  </div>
                </div>
                <div className='absolute bottom-0 left-0 w-full rounded-md h-full bg-black/30' />
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <Modal
        show={
          galleryModal == 'stats'
            ? showStatsGallery
            : galleryModal == 'marquee'
              ? showGallery
              : false
        }
        align={'center'}
        className="w-full lg:w-2/3 relative"
        onClose={() =>
          galleryModal == 'stats'
            ? setShowStatsGallery(false)
            : galleryModal == 'marquee'
              ? setShowGallery(false)
              : null
        }
      >
        <div
          className=" w-full h-full p-3 lg:pr-[7px] rounded-lg bg-white"
        // style={{
        //   background: galleryModal == 'stats' ? 'white' : 'transparent'
        // }}
        >
          <div
            className="absolute right-0 lg:-right-10 -top-12 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
            onClick={() =>
              galleryModal == 'stats'
                ? setShowStatsGallery(false)
                : galleryModal == 'marquee'
                  ? setShowGallery(false)
                  : null
            }
          >
            <p className="text-sm lg:text-2xl"> X </p>
          </div>

          <ImageGallery
            items={
              galleryModal == 'stats'
                ? statsImages
                : galleryModal == 'marquee'
                  ? shipData?.marqueeImages
                  : []
            }
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
            slideInterval={5000}
            // showThumbnails={galleryModal == 'stats'}
            showThumbnails={true}
            // thumbnailPosition={
            //   galleryModal == 'stats' ? thumbnailPosition : undefined
            // }
            thumbnailPosition={thumbnailPosition}
            startIndex={galleryModal == 'marquee' ? sliderIndex : 0}
            // startIndex={
            //   galleryModal == 'stats'
            //     ? 0
            //     : galleryModal == 'marquee'
            //     ? sliderIndex
            //     : 0
            // }
            lazyLoad={true}
          />
        </div>
      </Modal>
      <Modal2 show={showSuccessModal} align={'center'} className="w-[85%] lg:w-[40%] relative rounded-md overflow-hidden" onClose={() => setShowSuccessModal(false)}>
        <div className='w-full h-full bg-white shadow-lg'>
          <div className='absolute right-3 top-3'>
            <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='min-h-[100px] px-5 rounded-md overflow-hidden flex items-center justify-center'>
            <p className='text-md text-gray-700 text-center font-semibold'>{success}</p>
          </div>
        </div>
      </Modal2>
    </Layout>
  );
};

export default CordeliaSky;
