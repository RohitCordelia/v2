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
import Banner from '../../component/Banner';
import useVideoAutoPlay from '../../utils/customHooks/useVideoAutoPlay';
import Button from '../../components/UI/Button';

// const muteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/mute-new-icon.svg";
// const unmuteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/volume-new-icon.svg";

// const bannerData = {
//   "title": "",
//   "images": [
//     {
//       "url": "https://images.cordeliacruises.com/cordelia_v2/public/videos/cordelia_sri_lanka-Original.mp4%20%281080p%29%20%281%29.mp4",
//       "link": "",
//       "type": "video",
//       "altTag": "",
//       "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website1.webp"
//     },
//     // {
//     //   "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website2.webp",
//     //   "link": "",
//     //   "type": "image",
//     //   "altTag": "",
//     //   "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Website2.webp"
//     // },
//   ],
//   "subTitle": "",
//   "mobileImages": [
//     {
//       "url": "https://images.cordeliacruises.com/cordelia_v2/public/videos/cordelia-srilanka-mobile-banner.mp4",
//       "link": "",
//       "type": "video",
//       "altTag": "",
//       "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile.webp"
//     },
//     // {
//     //   "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile2.webp",
//     //   "link": "",
//     //   "type": "image",
//     //   "altTag": "",
//     //   "thumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/ncl_Sky_Aerial_Miami_Mobile2.webp"
//     // },
//   ],
// }

const EmpressData = {
  name: 'Cordelia Empress',
  heroVideo: {
    webVideo:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/cordelia_sri_lanka-Original.mp4%20%281080p%29%20%281%29.mp4',
    mobileVideo:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/cordelia-srilanka-mobile-banner.mp4'
  },
  destinationSectionVideo: {
    webVideo:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/destination-bg-video-web.mp4',
    mobileVideo:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/destination-bg-video-mobile.mp4'
  },
  offersVideos: {
    video1:
      // 'https://images.cordeliacruises.com/cordelia_v2/public/videos/0_Couple_Beach_1920x1080.mp4',
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/Offer_Video_Empress.mp4',
      video2:
      'https://images.cordeliacruises.com/cordelia_v2/public/videos/0-Party_Friends-1280x720.mp4',
  },
  statCards: [
    {
      title: 'Activities',
      count: '15+',
      link: '#',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-rock-climb-popup-image.webp',
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
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-arcade-popup-web-08.webp',
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
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-arcade-popup-web-08.webp',
      ],
    },
    {
      title: 'Dining Venues',
      count: '4',
      link: '/food-beverage',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chopstix-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chefs-table-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chefs-table-popup-web-01.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chop-stix-popup-web-02.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-food-court-popup-web-03.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-starlight-popup-web-04.webp',
      ],
      mobileImages: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-starlight-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chopstix-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chefs-table-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chefs-table-popup-web-01.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chop-stix-popup-web-02.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-food-court-popup-web-03.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-starlight-popup-web-04.webp',
      ],
    },
    {
      title: 'Bar & Lounges',
      count: '9',
      link: '/food-beverage',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chairman-club-popup-image.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-chairman-club-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-connections-bar-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-dome-bar-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-new-pool-bar-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-pool-bar-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-connexions-bar-popup-web-01.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-chairmans-bar-popup-web-02.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-dome-bar-popup-web-03.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-pool-bar-popup-web-04.webp',
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
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-pool-bar-popup-web-04.webp',
      ],
    },
    {
      title: 'Entertainment',
      count: '10+',
      link: '/entertainment',
      cardImage: 'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp',
      images: [
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-romance-bollywood-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-bhale-bhale-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-burlsque-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-burlsquee-popup-web-01.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-cinemagic-popup-web-02.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-actvity-bhale-bhale-popup-web-04.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-indian-cinematic-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-live-music-popup-image.webp',
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-magicin%27s-cut-popup-image.webp',
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
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-cruise-magicin%27s-cut-popup-image.webp',
      ],
    },
  ],
  marqueeImages: [
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Swimming+Pool.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-swimming-pool-pop-up-image-desktop.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-swimming-pool-pop-up-image-desktop.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Rock+Climbing.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-rock-climb-pop-up-image-desktop.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-rock-climb-pop-up-image-desktop.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Cordelia+Academy.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-academy-pop-up-image-desktop.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-academy-pop-up-image-desktop.webp'
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
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Fun_Gaming_Arcade.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/new-cruise-game-arcade-pop-up-image-web.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Fun_Entertainment_Shows.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-fun-burlsque-popup-web.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-fun-burlsque-popup-web.webp'
    },
    {
      image:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/Empress_Fun_Live_DJ.webp',
      original:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-fun-night-parties-popup-web.webp',
      thumbnail:
        'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-fun-night-parties-popup-web.webp'
    },
  ],
  otherCruises: [
    {
      name: 'Sky',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/empress-page-sky-other-fleet-web.jpg',
      link: '/cordelia-sky',
    },
    {
      name: "Sun",
      image: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Aerial_Melbourne_comp_web.webp",
      link: "/cordelia-sun",
    },
  ],
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

const CordeliaEmpress = () => {
  const [shipData, setShipData] = useState<any>(EmpressData);
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
  // const playerRef = useRef();
  useVideoAutoPlay();

  const navigate = useNavigate();
  // const location = useLocation();

  const imagesKey = window.innerWidth > 1024 ? "images" : "mobileImages";

  const statsImages = shipData?.statCards?.[statsSliderIndex]?.[imagesKey]?.map(
    (image: any) => ({ original: image, thumbnail: image })
  );

  // const statsImages = window.innerWidth > 1024 ? shipData?.statCards?.[statsSliderIndex]?.images?.map(
  //   (image: any) => {
  //     return {
  //       original: image,
  //       thumbnail: image
  //     };
  //   }
  // ) :
  // shipData?.statCards?.[statsSliderIndex]?.mobileImages?.map(
  //   (image: any) => {
  //     return {
  //       original: image,
  //       thumbnail: image
  //     };
  //   }
  // );

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

  // console.log(shipData, 'shipData')

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
      // setShowStatsGallery(true);
      // setStatsSliderIndex(index);
      const statLink = shipData?.statCards?.[index]?.link;
      navigate(statLink);
    }
  };

  return (
    <Layout isVideo={playing} footerClassName="!mt-0">
      <main className="">
        {/* <section className='sticky top-0'>
          <Banner data={bannerData} />
        </section> */}
        <div className="relative aspect-square h-auto lg:h-screen">
          <div className="aspect-video-custom top-0 aspect-square h-auto lg:h-screen fixed w-full">
            <video
              className="w-full h-full object-cover"
              autoPlay={false}
              loop
              muted
              playsInline
              preload="none"
              data-src={
                window.innerWidth > 1024
                  ? shipData?.heroVideo?.webVideo
                  : shipData?.heroVideo?.mobileVideo
              }
            />
            {/* {!isVideoReady && (
              <div className="absolute top-0 h-screen">
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
              url={
                // 'https://www.youtube.com/embed/jjr37et4dBY?autoplay=1&mute=0&controls=0&origin=https%3A%2F%2Fwww.cordeliacruises.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1&forigin=https%3A%2F%2Fwww.cordeliacruises.com%2F&aoriginsup=1&vf=6'
                "https://s3-figma-videos-production-sig.figma.com/video/1363113411865247471/TEAM/ae66/3542/-2118-40c3-a1f4-a03f3e337e0d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TzONsj0YBiaJaIcyWNuZp5TavJXLRRRTbtI2dVb9wGb9MTK-ymEHS4zz5yyUVjttvHImStp5hTQ-rg9F~KogDVprVKe9LnSMxEv2tnCgsQxpbDfPv~jHvfVGJltwx01xaXFHH7q4PzN-j5dDf6N4mkf1vQk7xp09~Gh9GB4xj2jdMci0M0Zv3HY6~HLCnBTReB43jFc4o~QjoZBPnBE1MTNESvPmiI2uWQNXa4vaJtYlxa1Ws8eb4VhmNTi1tFeKDmNNcW3xcnk2vkZZzUFSGd5Tuj9BV-04wiqXc2L-MqcwnXYtQwID03AQopBKiAxu8ZOFa~ZksRa-vrWM26oQpQ__"
              }
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
            />
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background:
                  'linear-gradient(rgb(0 0 0 / 90%) 0%, rgba(9, 9, 121, 0) 40%, rgba(0, 212, 255, 0) 100%)'
              }}
            />
            <div className="absolute bottom-5 lg:bottom-[5rem] right-3 lg:right-[10rem] flex items-center">
              <div>
                <img
                  onClick={toggelMute}
                  className={`ml-5 h-8 lg:h-10`}
                  src={isMute ? muteIcon : unmuteIcon}
                />
              </div>
            </div> */}
            <div
              className="absolute top-0 w-full h-screen"
              style={{
                background:
                  'linear-gradient(rgba(0, 0, 0, 0.9) 0%, rgba(9, 9, 121, 0) 20%, rgba(0, 212, 255, 0) 100%)'
              }}
            />
            <div className="hidden absolute -bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex items-center">
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
        <section
          id="mainShipPage"
          className="relative -mb-0.5 pt-14 lg:pt-24 bg-white z-10"
        >
          <div className="container mx-auto px-4 text-center pb-10 lg:pb-0 lg:px-0 lg:text-left">
            <div className="lg:flex lg:justify-between lg:gap-5 lg:pb-16">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium font-playfairDisplay lg:w-1/3">
                Step on Empress:
                <span className="block text-[22px] lg:text-4xl font-playfairDisplay">
                  Where Elegance meets adventure.
                </span>
              </h2>
              <div className="lg:w-[65%]">
                <p className="text-xs font-medium mt-4 lg:text-lg lg:leading-7 lg:mt-5 lg:inline">
                  Embark on the Empress for endless excitement across 11 decks.
                  Enjoy diverse dining, lively bars, thrilling activities, and
                  spectacular shows. Relax at the spa or by the pool, and let
                  every moment bring unforgettable fun and adventure!
                </p>
                {/* {showMore && (
                  <p className="text-xs font-medium lg:text-lg lg:leading-7">
                    Take a refreshing dip in the pool, rejuvenate at the spa, or
                    dive into adventure with thrilling onboard activities.
                    Whether you're soaking in ocean views from the sky decks or
                    dancing the night away, every moment on Empress is designed
                    for pure exhilaration. Embrace the journey and let every
                    wave of fun leave you wanting more!
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
            className="lg:!hidden mobileTiltedSlider -mb-[2px] lg:mb-0"
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
        <section className="relative pt-14 lg:pt-24 bg-white z-10">
          <div className="container mx-auto text-center px-4 lg:px-0">
            <div className="lg:pb-5">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium px-14 font-playfairDisplay">
                So much to do, where will you start?
              </h2>
              <p className="text-xs font-medium my-4 lg:text-lg lg:leading-7 lg:mt-5">
                Start with a splash, end with a standing ovation—fun awaits at every turn.
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
        {/* <section className={`relative -mb-0.5 pb-2 lg:pb-5 lg:pt-10 bg-white theEmpressCabin ${window.innerWidth < 1024 ? "z-10" : "z-auto"}`}> */}
        <section className={`relative -mb-0.5 pb-2 lg:pb-5 lg:pt-10 bg-white theEmpressCabin z-auto`}>
          <div className="container mx-auto px-4 text-center lg:px-0 lg:pb-20">
            <div className="pt-10 m-0">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium px-14 font-playfairDisplay">
                Choose your home on the waves
              </h2>
              <p className="text-xs font-medium my-4 lg:text-lg lg:leading-7 lg:mt-5">
                Whether you prefer ocean views or a cozy retreat, find the perfect space to rest and recharge.
              </p>
            </div>
            <CabinCategory page={'ship'} ship="empress" />
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
        {/* <section className='relative pt-10 pb-24 lg:pb-32'> */}
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
                    Sail to Spectacular Shores
                  </h4>
                  <p className="text-xs font-medium my-4 mb-8 lg:px-40 lg:text-lg lg:leading-7 lg:mt-5">
                    Set on a voyage to discover your bucket-list destinations!
                  </p>
                  <Button text="Explore More" size={innerWidth > 768 ? 'medium' : 'sm'} handleClick={() => navigate(`/destination`)} className="lg:w-max" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative -mb-0.5 pt-14 lg:pt-24 pb-14 lg:pb-24 bg-white z-10">
          <UpcomingCruise />
        </section>
        <section className="relative -mb-0.5 bg-[#FEF1EF] lg:flex lg:justify-between lg:h-[468px] z-10">
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
          <div className="py-2 px-10 text-center lg:p-0 lg:flex lg:flex-col lg:justify-center lg:items-center">
            <h3 className="text-xl lg:text-4xl lg:font-medium font-medium px-5 font-playfairDisplay">
              Offers & Upgrades
            </h3>
            <p className="text-xs font-medium my-4 mb-8 lg:text-lg lg:leading-7 lg:mt-5">
              Make your Cordelia Cruise even more unforgettable with exclusive deals and personalized upgrades.
            </p>
            <Button text="Explore More" size={innerWidth > 768 ? 'medium' : 'sm'} handleClick={() => navigate(`/promotion`)} className="lg:w-max" />
          </div>
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
        </section>
        <section className={`relative -mb-0.5 py-14 lg:py-24 bg-white ${window.innerWidth < 1024 ? 'z-10' : 'z-auto'}`}>
          <Gallery page="ship" ship="empress" />
        </section>
        <section className="relative pt-10 pb-24 lg:pb-32 lg:pt-14 bg-gray-400 z-[9]">
          <div className="container mx-auto text-center px-4 lg:px-0">
            <div className="lg:mb-12">
              <h2 className="text-2xl lg:text-4xl lg:font-medium font-medium font-playfairDisplay">
                Explore Our Other Ships
              </h2>
              <p className="text-xs font-medium my-4 lg:text-lg lg:leading-7 lg:my-5">
                Embark on new horizons with our cruises, each offering something special.
              </p>
            </div>
            <div className="lg:flex lg:justify-center lg:gap-4">
              {shipData?.otherCruises?.map((otherCruise: any) => (
                <div
                  className="relative cursor-pointer h-48 lg:h-[305px] rounded overflow-hidden mb-4 lg:w-1/2"
                  onClick={() => navigate(`${otherCruise?.link}`)}
                >
                  <div className='h-48 lg:h-[305px]'>
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
    </Layout>
  );
};

export default CordeliaEmpress;
