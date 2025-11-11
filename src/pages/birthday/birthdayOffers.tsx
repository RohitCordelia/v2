import React, { useEffect, useState, useRef, ReactNode } from 'react';
import Layout from '../../component/Layout';
import Modal from '../../components/UI/ModalCenter';
import CountdownTimer from './component/CountdownTimer';
import ItineraryTabs from './component/ItineraryTabs';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './birthdayOffers.css';
import ScratchCard from 'react-scratchcard-v4';
import BottomSheet from '../../component/BottomSheet';
import Button from '../../components/UI/Button';
import OfferModal from './component/offerModal';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import {
  useSendOTPMutation,
  useVerifyOTPMutation
} from '../../services/auth/auth';
import Select from 'react-select';
import PhoneCode from '../../components/UI/Forms/Inputs/phoneCodes.json';
import OtpInput from 'react18-input-otp';
import TapToReveal from './component/TapToReveal';
import {
  SetLocalStorage,
  SaveContact,
  GetLocalStorage
} from '../../utils/store/store';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';

const initialOffers = [
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Upto-44%25-Off-Desktop-card.webp',
    scratchImg:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_Week1_Mob.webp',
    week: 'Week 1',
    title: 'Discount up to 44%',
    description: [
      'Valid only on Interior, Ocean View, and Mini Suites on select itineraries.',
      'Cancellations and reschedules are not allowed for bookings made with this offer.',
      'No-show refunds will not be processed for bookings made with this offer.',
      '18% GST, service charges, levies, and fuel surcharges will apply for all passengers.',
      'Offer cannot be combined with other existing promotions.',
      'Offer not valid on modifications made after the original booking.'
    ],
    isRevealed: false,
    isExpired: false,
    isUpcoming: false,
    upcomingText: '',
    offer: 1,
    itinerary: [
      'c5df48e8-c689-4131-bdd0-1a8637698332',
      'd5dd1103-6f98-4d6b-a7b1-d40b227c2d40',
      '0609afa2-77b9-4b04-b9d4-481afdd716fe',
      'f0bf8ce2-5dc9-4631-a769-7fdf658335f8',
      '319baa3d-8b4c-468f-b3cf-844ba591a946',
      '85dacad1-acfa-4fd1-a155-309e6db1c165',
      '5fb51ab2-b325-4cae-b23c-aa3e63412481',
      'def5adeb-f345-4a2f-8564-17a05f1c9500',
      'b753661a-a547-4f43-ac2d-4f9b5f73c6e6',
      '0315a2be-c1b9-4eea-897e-fc410764c8da',
      'ed1425b5-9be4-4e35-9a52-d73f73c24245',
      '2a12b310-d0eb-49da-957a-80967f426e9e'
    ]
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Companion-Sails-Free-Desktop-card.webp',
    scratchImg:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_Week2_Mob.webp',
    week: 'Week 2',
    title: 'Companion Sails Free',
    description: [
      'Fare for the second passenger in the cabin will be waived off.',
      'Valid on select itineraries and cabin categories.',
      '18% GST, service charges, levies, and fuel surcharges will apply for all passengers.',
      'Offer cannot be combined with other existing promotions.',
      'Standard cancellation, refund, and amendment policies apply.',
      'Offer not valid on modifications made after the original booking.'
    ],
    isRevealed: false,
    isExpired: false,
    isUpcoming: false,
    upcomingText: 'Unlocks Sept 8.',
    offer: 2,
    itinerary: [
      '7bec11a1-2aca-467b-9556-d31c8e302157',
      '1bb086a8-12de-4e24-90df-bb775b1c7c0b',
      'd72f91de-0ddc-4516-9446-ed1a95b8cb93',
      '2018dcef-1ae0-42a2-937d-2750d18ab12f',
      'c313047c-752f-4a3d-8f97-696567a91d7c',
      '4a1a73ce-30aa-4e27-a87d-ed0ee478d69d',
      '38cc9caa-a724-4372-9eaf-e30eb3c0ca67',
      'b4c033ed-2768-491b-8e24-37e7eb49cf15',
      '7aa43c15-2890-4d6e-88bf-963f3b9881fb'
    ]
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Free-Cabin-Upgrade-Desktop-card.webp',
    scratchImg:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_Week3_Mob.webp',
    week: 'Week 3',
    title: 'Free Cabin Upgrade',
    description: [
      'Get a free upgrade from Interior to Ocean View stateroom.',
      'Upgrade applies only on full payment made in advance.',
      'Valid on select itineraries.',
      '18% GST, service charges, levies, and fuel surcharges will apply for all passengers.',
      'Offer cannot be combined with other existing promotions.',
      'Standard cancellation, refund, and amendment policies apply.',
      'Offer not valid on modifications made after the original booking.'
    ],
    isRevealed: false,
    isExpired: false,
    isUpcoming: false,
    upcomingText: 'Unlocks Sept 15.',
    offer: 3,
    itinerary: [
      'b753661a-a547-4f43-ac2d-4f9b5f73c6e6',
      '0315a2be-c1b9-4eea-897e-fc410764c8da',
      '1bb086a8-12de-4e24-90df-bb775b1c7c0b',
      '7eb78bd6-bc7d-4828-a926-d09b46f9b70e',
      '698a375f-6fa5-4256-8088-d3a6bd725044',
      '27683cee-a1db-4616-a249-8783d9604b88',
      '47dad356-fa67-41bb-910e-047bb091c984',
      '38de4b97-8648-4703-943d-a6a6cab53687',
      '8991c977-aecf-4a1a-ba71-73e2295c2e1d',
      '07dc3000-abfc-42c6-b1f8-0fcd9f2cfa97',
      '57c5cc77-958b-404c-a585-f8506abc47da'
    ]
  },
  {
    img: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Flat-25%25-Off-Desktop-card.webp',
    scratchImg:
      'https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_Week4_Mob.webp',
    week: 'Week 4',
    title: '25% Off Cabin Fare',
    description: [
      'Flat 25% discount applies to cabin fare on the website price.',
      'Valid on select itineraries and cabin categories.',
      '18% GST, service charges, levies, and fuel surcharges will apply for all passengers.',
      'Offer cannot be combined with other existing promotions.',
      'Standard cancellation, refund, and amendment policies apply.',
      'Offer not valid on modifications made after the original booking.'
    ],
    isRevealed: false,
    isExpired: false,
    isUpcoming: false,
    upcomingText: 'Unlocks Sept 22.',
    offer: 4,
    itinerary: [
      'a6907cb3-96c5-4094-8f9e-d554b65a6c93',
      'abbeec9f-666e-4f9b-bf35-7c3efc04744a',
      '0a1665d5-2dfc-4ceb-b323-e6f7476f0c24',
      'd26456b7-e8cd-43aa-b682-977231a0943a',
      'b0e29dcd-2dc2-4a83-ac6a-6fc235a967f6',
      'b1ff6162-32c0-434a-ae87-ccadb7a286a0',
      'bc3421da-0380-42aa-bcd1-cccb6ff576ea',
      '785e64d7-4969-4ef8-88f4-7231ef09115f',
      '6c06b521-27b9-44d5-a1ad-fb6c2c22db18',
      'ad3b09d0-a79c-4af2-a660-4d864f0d2627',
      '7b4e39db-5d81-42bc-8bac-bf59f54b4f20',
      'ba9a7643-6874-45d6-8dff-b5dac3dad124',
      'ead4d0ab-b256-4d9c-ad60-9939f2c8c6d6',
      '02cccd24-cefb-4731-a336-6c3a3044de77',
      'a6e2d6af-c52e-4d64-a34c-e5c8bb2b1332',
      '3ba1e3c3-3d6b-418d-a5bb-f85bf37cc774',
      '3b44990d-6cf0-4dcc-afa5-fff07c99de40',
      '6e313e9d-702c-483f-a53c-40c992afc41c',
      'b1939b71-0287-4100-960e-745b5de20076',
      '408a6ec2-66d6-48f2-b76e-f05dd2aea4e7',
      'e6f7171a-f725-4b93-b8d6-4dda471eb611',
      '7bc725b8-3802-4a75-97d0-36752e005255',
      'b49cb0c5-05b3-4312-8fcd-a8204fdb52d1',
      '8cbf45ad-452f-4200-b126-b014da26e414'
    ]
  }
];

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

export const AnniversaryStartDate = '2025-09-01T00:00:00';
export const AnniversaryEndDate = '2025-09-28T23:59:59';

const BirthdayOffers = () => {
  const today = new Date();
  const weekWiseStartDate = new Date(AnniversaryStartDate);
  // const weekWiseStartDate = new Date('2025-08-25T15:34:00');

  const [weekWise, setWeekWise] = useState(today >= weekWiseStartDate);
  const [showTimer, setShowTimer] = useState(true);
  const [targetDate, setTargetDate] = useState(() => {
    const next = getNextWeekTargetDate();
    return next ? new Date(next) : null;
  });
  const [showTimerWeekly, setShowTimerWeekly] = useState(!!targetDate);
  const [isVerifyLaoding, setIsVerifyLaoding] = useState(false);
  const [isAllOffersRevealed, setIsAllOffersRevealed] = useState(false);
  const [isOfferModal, setIsOfferModal] = useState(false);
  const [showStatsGallery, setShowStatsGallery] = useState(false);
  const [statsSliderIndex, setStatsSliderIndex] = useState<any>(0);
  const [thumbnailPosition, setThumbnailPosition] = useState<any>('right');
  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem('offersState');
      return saved ? JSON.parse(saved) : initialOffers;
    } catch (error) {
      console.error('Error loading offers from localStorage:', error);
      return initialOffers;
    }
  });
  const [showOfferInfoModal, setShowOfferInfoModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  const [showRequestACallback, setShowRequestACallback] = useState(false);
  const [country, setCountry] = useState('+91');
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [leadId, setLeadId] = useState(null);
  const [timer, setTimer] = useState<number>(30);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [otpReqId, setOtpReqId] = useState<any>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const END_TIMER = 0;

  const couponCode = GetLocalStorage('cc');
  const couponPct = GetLocalStorage('cp');
  const offerStep = GetLocalStorage('sff');

  // const [sendOTP] = useSendOTPMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  let navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     !weekWise && setIsOfferModal(true);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;
    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.top <= -750) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#f5f5f5',
      height: '48px',
      border: '1px solid rgb(112 112 112 / 10%)',
      borderRight: 'none',
      borderRadius: '6px 0 0 6px'
      //   zIndex: 10001 // Optional but helps when inside stacking contexts
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted #ccc',
      padding: 10,
      zIndex: 999 // Optional
    }),
    menu: (styles: any) => ({
      ...styles,
      width: '300px',
      zIndex: 9999 // Doesn't always affect portal-rendered menus
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 10001 // ✅ This is critical!
    })
  };

  let otpWidth = window.innerWidth > 640 ? '10px' : '3px';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset
  } = useForm();

  const handleCloseReqCallback = () => {
    setShowRequestACallback(false);
    setErrorMsg(null);
    clearErrors();
    reset();
  };

  const submitForm = (data: any) => {
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      phoneNumber: data.phone_number,
      website: cleanedUrl || window.location.href,
      pageCode: 'cordelia_birthday_rc',
      fullName: data.name,
      email: data.email,
      companyName: null,
      eventType: null,
      countryCode: country
    };
    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setShowOTPModal(true);
        setOtp('');
        setOtpReqId(response?.result?.requestId);
      })
      .catch((response) => {
        setErrorMsg(response?.data?.message);
      });
  };

  const submitOtp = (data: any) => {
    setIsVerifyLaoding(true);
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      requestId: otpReqId,
      otp: otp,
      website: cleanedUrl || window.location.href
    };
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        console.log('roh watch', data);
        setIsVerifyLaoding(false);
        setLeadId(response.lead_id);
        setShowOTPModal(false);
        handleCloseReqCallback();
        setShowSuccessModal(true);
        SetLocalStorage('sff', 3);
        SaveContact({ data: data?.phone_number });
        setSuccess(
          `You are one step closer to your cruise vacation. Our experts will contact you shortly.`
        );
      })
      .catch((response) => {
        setOtpError(response?.data?.message || 'Failed to verify OTP');
        // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
      })
      .finally(() => setIsVerifyLaoding(false));
  };

  const resendOTP = () => {
    setOtp('');
    setOtpError('');
    setTimer(30);
    submitForm({ phone_number: watch()?.phone_number });
  };

  useEffect(() => {
    if (showOTPModal) {
      if (timer && timer !== END_TIMER) {
        var tempTimer = setInterval(() => setTimer(timer - 1), 1000);
        return function cleanup() {
          clearInterval(tempTimer);
        };
      }
    }
  }, [showOTPModal, timer]);

  // Ref to ensure we clear localStorage only once
  // const clearedRef = useRef(false);

  // useEffect(() => {
  //   if (weekWise && !clearedRef.current) {
  //     setOffers((prev) => {
  //       const updated = prev.map((o) => ({ ...o, isRevealed: false }));
  //       localStorage.setItem('offersState', JSON.stringify(updated));
  //       return updated;
  //     });
  //     clearedRef.current = true;
  //   }
  // }, [weekWise]);

  useEffect(() => {
    if (selectedOffer?.scratchImg) {
      const img = new Image();
      img.src = selectedOffer.scratchImg;
      img.onload = () => {
        setImgSize({ w: img.width, h: img.height });
      };
    }
  }, [selectedOffer]);

  // persist scratch state
  useEffect(() => {
    localStorage.setItem('offersState', JSON.stringify(offers));
  }, [offers]);

  const handleOfferClick = (offer: any) => {
    if (offer.isExpired) return; // prevent opening expired
    setSelectedOffer(offer);
    setShowOfferInfoModal(true);
  };

  const handleScratchComplete = (week: string) => {
    setOffers((prev: any) =>
      prev.map((o: any) => (o.week === week ? { ...o, isRevealed: true } : o))
    );
  };
  // console.log(selectedOffer, 'selectedOffer', offers);

  // const handleScratchComplete1 = (week: string, idx: number) => {
  //   setOffers((prev: any) =>
  //     prev.map((o: any, index: number) =>
  //       index === idx ? { ...o, isRevealed: true } : o
  //     )
  //   );
  // };

  const imagesKey = window.innerWidth > 1024 ? 'images' : 'mobileImages';

  const statsImages = statCards?.[statsSliderIndex]?.[imagesKey]?.map(
    (image: any) => ({ original: image, thumbnail: image })
  );

  useEffect(() => {
    if (window.innerWidth > 640) {
      setThumbnailPosition('right');
    } else {
      setThumbnailPosition('bottom');
    }
  }, []);

  const handleImageClick = (index: number, type: 'stats' | 'marquee') => {
    setShowStatsGallery(true);
    setStatsSliderIndex(index);
  };

  useEffect(() => {
    setIsAllOffersRevealed(offers?.every((offer: any) => offer?.isRevealed));
  }, [offers]);

  // useEffect(() => {
  //   const now = new Date();
  //   const cutoffDate = new Date(AnniversaryStartDate);
  //   const hasReset = localStorage.getItem('offersResetDone');

  //   if (now >= cutoffDate && !hasReset) {
  //     // Clear and reset offers
  //     localStorage.removeItem('offersState');
  //     setOffers(initialOffers);
  //     // localStorage.setItem('offersState', JSON.stringify(initialOffers));

  //     // Set flag to avoid repeating
  //     localStorage.setItem('offersResetDone', 'true');
  //   }
  // }, []);

  function getNextWeekTargetDate(currentDate = new Date()) {
    const weeklyTargets = [
      '2025-09-08T00:00:00',
      '2025-09-15T00:00:00',
      '2025-09-22T00:00:00'
    ];

    const now = currentDate.getTime();

    for (let dateStr of weeklyTargets) {
      const targetTime = new Date(dateStr).getTime();
      if (now < targetTime) {
        return dateStr;
      }
    }

    return null; // Past all targets
  }

  const handleCountdownEnd = () => {
    const next = getNextWeekTargetDate();
    if (next) {
      setTargetDate(new Date(next));
      console.log('Countdown reset for next week');
    } else {
      setShowTimerWeekly(false);
      console.log('All weekly offers ended — timer hidden');
    }
  };

  return (
    <Layout footerClassName="!mt-0">
      <main className="lg:mb-12">
        <div
          className="relative h-screen !bg-cover z-[2]"
          style={{
            background:
              innerWidth > 600
                ? 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/NewBGBday.webp)'
                : 'url(https://images.cordeliacruises.com/cordelia_v2/public/images/NewOnlyBGBannerMobile.webp)'
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5">
            <img
              src={
                innerWidth > 600
                  ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/NewTextBday.webp'
                  : 'https://images.cordeliacruises.com/cordelia_v2/public/images/NewBgOnlyTextMobile.webp'
              }
              alt=""
            />
          </div>
          <div ref={wrapperRef}></div>
          <div
            // className=" px-4 lg:px-0 flex justify-self-center lg:w-[85%]"
            className={classNames(
              'flex justify-between items-center py-4 shadow-all bg-white mx-auto z-50 px-4 !p-0 lg:px-0 justify-self-center ',
              {
                'fixed top-0 left-0 w-full px-14 rounded-none border-gray-100 lg:w-full shadow-allSide lg:!px-20':
                  isSticky && !isMobile,
                'rounded-xl px-4 border border-gray-100 absolute bottom-5 left-0 right-0 lg:bottom-8 w-[90%]':
                  !isSticky
              }
            )}
          >
            {/* {isSticky && (
              <span
                className="bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text font-bold text-xl italic pr-1 basis-1/5 font-playfairDisplay"
                style={{ color: 'transparent' }}
              >
                Get Early Access
              </span>
            )} */}
            <RequestACallback
              showTitle={false}
              submitClassName="w-full rounded-full"
              desktopMode={innerWidth > 600}
              isBirthday={true}
              isSticky={isSticky}
            />
          </div>
          {/* {showTimer && (
            <div className="px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <div className="mb-10">
                <h1 className="text-2xl lg:text-5xl font-bold mb-8 text-white">
                  4-Day Early Access Sale is Now Live
                </h1>
              </div>
              <div>
                <CountdownTimer
                  targetDate={new Date('2025-08-31T23:59:59')}
                  className="mx-auto"
                  onEnd={() => {
                    setShowTimer(false);
                    console.log('Countdown Finished!');
                  }}
                />
              </div>
              <p className="text-sm text-white/80 mt-8">
                Early Access ends Aug 31, 11:59 PM IST
              </p>
            </div>
          )} */}
        </div>
        <div className="!bg-contain lg:!bg-cover !bg-no-repeat py-10 lg:pb-20 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_BG_New_Mob.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Birthday_BG_New_1.webp)]">
          <div className="px-4 pb-16 lg:py-11 lg:pb-16">
            <div className="container mx-auto lg:mb-20">
              <div className="text-center">
                {/* <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
                  This Week's Offer is{' '}
                  <span
                    className="italic font-playfairDisplay font-extrabold block lg:inline bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                    style={{
                      color: 'transparent'
                    }}
                  >
                    Live
                  </span>
                </h2> */}
                {showTimerWeekly && targetDate && (
                  <div className="flex flex-col justify-center items-center mt-8 mb-5 px-4 lg:px-0 text-center">
                    <h2 className="text-[22px] italic lg:text-3xl font-bold pb-4 lg:pb-6">
                      This week's offer ends in:
                    </h2>
                    <CountdownTimer
                      targetDate={targetDate}
                      onEnd={handleCountdownEnd}
                    />
                  </div>
                )}
                <p className="text-xs lg:text-lg pb-5 lg:pb-20">
                  One new cruise deal revealed every week. When the countdown
                  ends, the deal is gone for good.
                </p>
              </div>
              {/* <div className="flex gap-3 lg:gap-4 flex-wrap justify-center">
                {offers?.map((offer: any, idx: number) =>
                  offer?.isRevealed ? (
                    <div
                      key={offer.title}
                      className={`relative basis-[158px] lg:basis-[23%] max-w-[158px] lg:max-w-none h-[200px] lg:h-auto flex flex-col flex-1 rounded-md border border-gray-300 px-2 py-3 lg:p-2 shadow-allSide bg-white cursor-pointer transition-transform duration-300 lg:hover:-translate-y-2`}
                      onClick={() => handleOfferClick(offer)}
                    >
                      {!offer.isRevealed && (
                        <div className="absolute top-0 left-0 w-full z-[2]">
                          <img
                            src={offer.scratchImg}
                            alt={offer.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="relative mx-auto mb-3 lg:m-0 lg:mb-3 rounded-xl overflow-hidden">
                        <img
                          src={offer.img}
                          alt="offer_img"
                          className={`w-full h-full object-cover aspect-[1.67] ${
                            offer.isExpired ? 'grayscale' : 'grayscale-0'
                          }`}
                        />
                        {offer.isExpired && (
                          <div className="absolute top-1/2 -translate-y-1/2 text-center w-full pb-0.5 bg-white/80">
                            <span className="text-xs font-bold">EXPIRED</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm lg:text-lg lg:mb-2 font-bold leading-5 line-clamp-2">
                        {offer.title}
                      </p>
                      <p className="text-base lg:mb-2 hidden lg:block">desc</p>
                      <p className="text-brand-primary underline font-bold text-sm lg:mb-2 hidden lg:block">
                        Know More
                      </p>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer transition-transform duration-300 lg:hover:-translate-y-2"
                      onClick={() =>
                        innerWidth < 768 && handleOfferClick(offer)
                      }
                    >
                      <ScratchCard
                        width={innerWidth > 768 ? 263 : 158}
                        height={innerWidth > 768 ? 332 : 200}
                        image={offer.scratchImg}
                        finishPercent={25}
                        fadeOutOnComplete={true}
                        onComplete={() =>
                          handleScratchComplete1(selectedOffer?.week, idx)
                        }
                      >
                        <div
                          key={offer.title}
                          className={`basis-[158px] lg:basis-[23%] h-[200px] lg:h-auto flex flex-col flex-1 rounded-md border border-gray-300 px-2 py-3 lg:p-6 shadow-allSide bg-white`}
                          // onClick={() => handleOfferClick(offer)}
                        >
                          <div className="relative mx-auto mb-3 lg:my-6 rounded-xl overflow-hidden">
                            <img
                              src={offer.img}
                              alt="offer_img"
                              className="w-full h-full object-cover aspect-[1.67]"
                            />
                            {offer.isExpired && (
                              <>
                                <div
                                  className="absolute top-0 left-0 w-full bg-black/50 z[1]"
                                  style={{ height: '-webkit-fill-available' }}
                                />
                                <div className="absolute top-1/2 -translate-y-1/2 text-center w-full pb-0.5 bg-white/80">
                                  <span className="text-xs font-bold">
                                    EXPIRED
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <p className="text-sm lg:text-base font-bold leading-5 line-clamp-2">
                            {offer.title}
                          </p>
                        </div>
                      </ScratchCard>
                    </div>
                  )
                )}
              </div> */}
              <TapToReveal
                offers={offers}
                setOffers={setOffers}
                handleOfferClick={handleOfferClick}
                weekWise={weekWise}
              />
              {isAllOffersRevealed && !weekWise && (
                <div
                  className="px-4 mt-10 container mx-auto rounded-md text-center border border-gray-300 py-6 lg:p-6 backdrop-blur-sm"
                  style={{
                    boxShadow: '-20px 20px 20px 0px #dcdcdc1f inset'
                  }}
                >
                  <p className="text-base lg:text-xl font-semibold">
                    You've unlocked all 4 offers. Pick your favourite and book
                    now.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 mb-10 rounded-md container mx-auto lg:px-0 overflow-hidden">
            <div
              className="rounded-md overflow-hidden cursor-pointer"
              onClick={() => {
                window.location.href = 'tel:022-68811111';
                // if (!weekWise) {
                //   setIsOfferModal(true);
                // } else {
                //   window.location.href = 'tel:022-68811111';
                // }
              }}
            >
              <img
                src={
                  innerWidth > 600
                    ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/MSB_AS_Desktop.webp'
                    : 'https://images.cordeliacruises.com/cordelia_v2/public/images/MSB_AS_Mobile.webp'
                }
                alt=""
              />
            </div>
          </div>
          {/* <div className="text-center px-4 container mx-auto">
            <h2 className="text-[22px] lg:text-4xl font-bold pb-4 lg:pb-6">
              Find Your{' '}
              <span
                className="italic font-playfairDisplay font-extrabold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text pr-1"
                style={{
                  color: 'transparent'
                }}
              >
                Perfect Sailing Escape
              </span>
            </h2>
            <p className="text-xxs lg:text-lg pb-8 lg:pb-10 lg:px-20">
              Pick your perfect sailing length and enjoy the best of
              destinations, entertainment, and luxury onboard.
            </p>
          </div>
          <div>
            <ItineraryTabs type="destinations" />
          </div> */}
        </div>
        <div className="!bg-cover !bg-no-repeat pt-10 lg:pt-24 pb-20 bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/BDAY_BG2_Mob.webp)] lg:bg-[url(https://images.cordeliacruises.com/cordelia_v2/public/images/Birthday_NewBG_2.webp)]">
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
          <div className="px-4 container mx-auto lg:px-0">
            <Slider
              {...settings}
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
              {...settings}
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
      </main>

      {showOfferInfoModal && !selectedOffer.isRevealed && innerWidth < 768 && (
        <Modal
          show={showOfferInfoModal}
          align={'center'}
          className="w-full lg:w-2/3 relative"
          onClose={() => setShowOfferInfoModal(false)}
        >
          <div className="w-max mx-auto rounded-lg bg-white">
            <div
              className="absolute right-0 lg:-right-10 -top-12 lg:-top-10 cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
              onClick={() => setShowOfferInfoModal(false)}
            >
              <div>
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg"
                  alt="cross_icon"
                />
              </div>
            </div>

            {/* <div className="w-full h-full flex items-center justify-center"> */}
            <div className="">
              {/* {selectedOffer.isRevealed ? (
                // if already revealed → show content directly
                <div
                  key={selectedOffer.title}
                  className={`basis-[158px] lg:basis-[250px] h-full flex flex-col flex-1 rounded-md border border-gray-300 px-2 py-3 lg:p-6 shadow-allSide bg-white transition-all ease-in duration-150`}
                >
                  <div className="relative mb-3 lg:my-6 rounded-xl overflow-hidden">
                    <img
                      src={selectedOffer.img}
                      alt="offer_img"
                      className="w-full h-full object-cover aspect-[1.67]"
                    />
                    {selectedOffer.isExpired && (
                      <>
                        <div
                          className="absolute top-0 left-0 w-full bg-black/50 z[1]"
                          style={{ height: '-webkit-fill-available' }}
                        />
                        <div className="absolute top-1/2 -translate-y-1/2 text-center w-full pb-0.5 bg-white/80">
                          <span className="text-xs font-bold">EXPIRED</span>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-xs lg:text-xl font-semibold mb-3 text-gray-200">
                    {selectedOffer.week}
                  </span>
                  <p className="text-sm lg:text-base font-bold leading-5 line-clamp-2">
                    {selectedOffer.title}
                  </p>
                </div>
              ) : ( */}
              {/* // if not revealed → show scratch card */}
              <ScratchCard
                width={imgSize?.w || 164}
                height={imgSize?.h || 199}
                image={selectedOffer.scratchImg}
                finishPercent={25}
                onComplete={() => handleScratchComplete(selectedOffer.week)}
              >
                <div
                  key={selectedOffer.title}
                  className={`basis-[158px] lg:basis-[250px] h-full flex flex-col flex-1 rounded-md border border-gray-300 px-2 py-3 lg:p-6 shadow-allSide bg-white transition-all ease-in duration-150 pointer-events-none`}
                  // onClick={() => handleOfferClick(idx, offer.isExpired)}
                >
                  <div className="relative mb-3 lg:my-6 rounded-xl overflow-hidden">
                    <img
                      src={selectedOffer.img}
                      alt="offer_img"
                      className="w-full h-full object-cover aspect-[1.67]"
                    />
                    {selectedOffer.isExpired && (
                      <>
                        <div
                          className="absolute top-0 left-0 w-full bg-black/50 z[1]"
                          style={{ height: '-webkit-fill-available' }}
                        />
                        <div className="absolute top-1/2 -translate-y-1/2 text-center w-full pb-0.5 bg-white/80">
                          <span className="text-xs font-bold">EXPIRED</span>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-xs lg:text-xl font-semibold mb-3 text-gray-200">
                    {selectedOffer.week}
                  </span>
                  <p className="text-sm lg:text-base font-bold leading-5 line-clamp-2">
                    {selectedOffer.title}
                  </p>
                </div>
              </ScratchCard>
              {/* )} */}
            </div>
          </div>
        </Modal>
      )}

      {/* Offer info */}
      <Modal
        show={innerWidth > 600 && showOfferInfoModal}
        align={'center'}
        className="w-full lg:w-1/2 relative"
        onClose={() => setShowOfferInfoModal(false)}
      >
        <div className="w-full h-full rounded-lg bg-white">
          <div
            className="absolute top-[3%] right-[2%] cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
            onClick={() => setShowOfferInfoModal(false)}
          >
            <div className="w-5 h-5">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg"
                alt="cross_icon"
                className="w-full h-full"
              />
            </div>
          </div>
          <div>
            <div className="p-5 text-2xl font-bold border-b border-gray-200">
              {selectedOffer?.title}
            </div>
            <div className="px-8 py-5 text-black/80 max-h-96 overflow-y-auto">
              <p className="text-xl font-semibold mb-2">Terms & Conditions:</p>
              <ul className="list-disc ml-5">
                {selectedOffer?.description?.map(
                  (desc: string, idx: number) => (
                    <li key={idx} className="text-lg">
                      {desc}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="p-5 flex justify-center gap-3">
              <Button
                text="Redeem Offer"
                size="base"
                type="secondary"
                handleClick={() => {
                  if(offerStep){
                    navigate('/select-itinerary', {
                      state: { itinerary: selectedOffer.itinerary }
                    });
                  }else{
                    setShowOfferInfoModal(false);
                    setIsOfferModal(true);
                  }
                }}
                className="rounded-full"
              />
              {/* <Button
                text="Call Now"
                size="base"
                handleClick={() => (window.location.href = 'tel:022-68811111')}
                className="rounded-full"
              /> */}
            </div>
          </div>
        </div>
      </Modal>

      <BottomSheet
        isOpen={
          innerWidth < 600 && selectedOffer?.isRevealed && showOfferInfoModal
        }
        setIsOpen={() => setShowOfferInfoModal(false)}
        onClose={() => setShowOfferInfoModal(false)}
        title={selectedOffer?.title}
        // primaryBtn={
        //   <Button
        //     text="Call Now"
        //     size="sm"
        //     handleClick={() => (window.location.href = 'tel:022-68811111')}
        //     className="rounded-full"
        //   />
        // }
        secondaryBtn={
          <Button
            text="Redeem Offer"
            size="sm"
            type="secondary"
            handleClick={() => {
              if(offerStep){
                navigate('/select-itinerary', {
                  state: { itinerary: selectedOffer.itinerary }
                });
              }else{
                setShowOfferInfoModal(false);
                setIsOfferModal(true);
              }
            }}
            className="rounded-full"
          />
        }
      >
        <div>
          {/* <div className="relative mx-auto mb-3 lg:my-6 rounded-xl overflow-hidden">
            <img
              src={selectedOffer?.img}
              alt="offer_img"
              className="w-full h-full object-cover aspect-[1.67]"
            />
            {selectedOffer?.isExpired && (
              <>
                <div
                  className="absolute top-0 left-0 w-full bg-black/50 z-[1]"
                  style={{ height: '-webkit-fill-available' }}
                />
                <div className="absolute top-1/2 -translate-y-1/2 text-center w-full pb-0.5 bg-white/80">
                  <span className="text-xs font-bold">EXPIRED</span>
                </div>
              </>
            )}
          </div> */}
          <p className="font-semibold mt-4 mb-2">Terms & Conditions:</p>
          <ul className="list-disc ml-5 mb-4">
            {selectedOffer?.description?.map((desc: string, idx: number) => (
              <li key={idx} className="text-sm">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </BottomSheet>

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

      {/* Request a callback */}
      <Modal
        show={innerWidth > 600 && showRequestACallback}
        align="center"
        onClose={handleCloseReqCallback}
      >
        <div className="bg-white w-[450px] rounded-md">
          <div className="border-b border-gray-300 p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold font-openSans">
              Request a Callback
            </h1>
            <svg
              onClick={handleCloseReqCallback}
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
          <div className="p-4">
            <form className="" onSubmit={handleSubmit(submitForm)}>
              <div className="">
                <div className="mb-2">
                  <label className="text-sm font-semibold mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                    {...register('name', { required: 'Name is required.' })}
                  />
                  {errors.name && (
                    <p className="text-xs text-danger">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Enter a valid email address.'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-danger">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold block mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="lg:col-span-2 col-span-2 w-[22%]">
                      <div
                        className={`grid grid-cols-1 gap-4 w-full h-[48px] bg-gray-400 overflow-hidden rounded-l-md`}
                      >
                        <input
                          type="hidden"
                          id="zc_gad"
                          name="zc_gad"
                          value=""
                        />
                        <Select
                          menuPortalTarget={document.body}
                          menuPosition={'fixed'}
                          value={{ label: country }}
                          maxMenuHeight={290}
                          options={PhoneCode}
                          onChange={(item) => setCountry(item?.value)}
                          styles={customStyles}
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-7 col-span-7 w-[78%]">
                      <input
                        id="phone_number"
                        {...register('phone_number', {
                          required: 'Please enter a valid mobile number',
                          pattern: {
                            value:
                              country === '+91'
                                ? /^[0-9]{10}$/
                                : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                            message: 'Please enter a valid mobile number'
                          },
                          maxLength: country === '+91' ? 10 : 12 // Set maxLength to 10 for +91 and 12 for others
                        })}
                        maxLength={country === '+91' ? 10 : 12} // Ensure that maxLength is correctly set
                        className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                        type="tel"
                        placeholder="Phone Number"
                      />
                      {errors.phone_number && (
                        <span className="text-danger text-xs">
                          {errors.phone_number && (
                            <p className="text-xs text-danger">
                              {errors.phone_number.message}
                            </p>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 lg:mt-3">
                <Button
                  text="Submit"
                  disabled={false}
                  isLoading={false}
                  className="px-12"
                />
              </div>
              {errorMsg && (
                <div className="text-center mt-4">
                  <p className="text-sm font-semibold text-danger">
                    {errorMsg}
                  </p>
                </div>
              )}
            </form>

            <Modal
              show={showOTPModal}
              align={'center'}
              className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
              maxHeight="100vh"
            >
              <div className="w-full text-black relative">
                <button
                  onClick={() => {
                    setShowOTPModal(false);
                    setOtp('');
                  }}
                  className="absolute -top-3 right-4 text-3xl"
                >
                  &times;
                </button>
                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                  <p>Verify your phone number</p>
                </div>

                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                  <p className="px-2 text-sm">
                    We've sent a 4-digit code to{' '}
                    <span className="font-semibold">
                      {watch().phone_number}
                    </span>{' '}
                    <span className="block">
                      Enter the code below to continue.
                    </span>
                  </p>
                </div>
                <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                  <OtpInput
                    autoComplete="one-time-code"
                    // isDisabled={!showOTP}
                    value={otp}
                    onChange={(otp: string) => {
                      setOtpError('');
                      setOtp(otp);
                    }}
                    numInputs={4}
                    separator={<span className="px-2"></span>}
                    containerStyle=" mx-auto"
                    inputStyle={{
                      margin: otpWidth,
                      width: '3rem',
                      height: '3rem',
                      color: 'black',
                      fontSize: ' 0.875rem',
                      borderRadius: 4,
                      border: '1px solid #E6E8EC',
                      backgroundColor: '#F5F5F5'
                    }}
                    isInputNum={true}
                  />
                </div>

                {otpError ? (
                  <p className="flex flex-wrap justify-center text-red text-sm mt-4 mb-4">
                    {otpError}
                  </p>
                ) : null}
                {errors && errors?.phone_number?.message ? (
                  <p className="flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4">
                    {errors?.phone_number?.message}
                  </p>
                ) : null}
                <div className="lg:px-10 px-4">
                  <Button
                    text="Verify & Continue"
                    disabled={otp.toString().length < 4}
                    handleClick={handleSubmit(submitOtp)}
                    className="w-full"
                    isLoading={isVerifyLaoding}
                  />
                </div>

                <div className="mb-8">
                  <div className="mt-4 text-center">
                    {timer === END_TIMER ? (
                      <p
                        className=" cursor-pointer underline text-brand-primary"
                        onClick={resendOTP}
                      >
                        Didn't receive the code?
                      </p>
                    ) : (
                      <p className="text-sm font-semibold">
                        Didn't receive the code? Resend in{' '}
                        <span className="underline">{`00:${String(
                          timer
                        ).padStart(2, '0')}`}</span>
                      </p>
                    )}
                    {/* <p >Edit mobile number</p> */}
                  </div>
                </div>
                <div className="text-center lg:px-4 px-0 mb-3 lg:mb-4 text-xs text-gray-100">
                  <p>
                    By verifying, you agree to our{' '}
                    <Link
                      to={'/terms-condition'}
                      target="_blank"
                      className="text-brand-primary italic"
                    >
                      [Terms & Conditions]
                    </Link>{' '}
                    and{' '}
                    <a
                      href={
                        'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                      }
                      target="_blank"
                      className="text-brand-primary italic"
                    >
                      [Privacy Policy]
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Modal>

      <BottomSheet
        isOpen={innerWidth < 600 && showRequestACallback}
        setIsOpen={handleCloseReqCallback}
        onClose={handleCloseReqCallback}
        title="Request a Callback"
        hasBtns={false}
      >
        <div className="pt-5">
          <form className="" onSubmit={handleSubmit(submitForm)}>
            <div className="">
              <div className="mb-2">
                <label className="text-sm font-semibold mb-1 block">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('name', { required: 'Name is required.' })}
                />
                {errors.name && (
                  <p className="text-xs text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="text-sm font-semibold mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Enter a valid email address.'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-2">
                <label className="text-sm font-semibold block mb-1">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="lg:col-span-2 col-span-2 w-1/4 lg:w-[22%]">
                    <div
                      className={`grid grid-cols-1 gap-4 bg-gray-400 w-full h-[48px] overflow-hidden rounded-l-md`}
                    >
                      <input type="hidden" id="zc_gad" name="zc_gad" value="" />
                      <Select
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        value={{ label: country }}
                        maxMenuHeight={290}
                        options={PhoneCode}
                        onChange={(item) => setCountry(item?.value)}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 col-span-7 w-3/4 lg:w-[78%]">
                    <input
                      id="phone_number"
                      {...register('phone_number', {
                        required: 'Please enter a valid mobile number',
                        pattern: {
                          value:
                            country === '+91' ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                          message: 'Please enter a valid mobile number'
                        },
                        maxLength: country === '+91' ? 10 : 12 // Set maxLength to 10 for +91 and 12 for others
                      })}
                      maxLength={country === '+91' ? 10 : 12} // Ensure that maxLength is correctly set
                      className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                      type="tel"
                      placeholder="Phone Number"
                    />
                    {errors.phone_number && (
                      <span className="text-danger text-xs">
                        {errors.phone_number && (
                          <p className="text-xs text-danger">
                            {errors.phone_number.message}
                          </p>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center pt-5 lg:mt-3 border-t border-gray-300">
              <Button
                text="Submit"
                disabled={false}
                isLoading={false}
                className="px-12 w-full"
              />
            </div>
            {errorMsg && (
              <div className="text-center mt-4">
                <p className="text-sm font-semibold text-danger">{errorMsg}</p>
              </div>
            )}
          </form>

          <BottomSheet
            isOpen={showOTPModal}
            setIsOpen={handleCloseReqCallback}
            onClose={() => {
              setShowOTPModal(false);
              setOtp('');
            }}
            title="Request a Callback"
            hasBtns={false}
          >
            <div className="w-full">
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                }}
                className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                <p>Verify your phone number</p>
              </div>

              <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                <p className="px-2 text-sm">
                  We've sent a 4-digit code to{' '}
                  <span className="font-semibold">{watch().phone_number}</span>{' '}
                  <span className="block">
                    Enter the code below to continue.
                  </span>
                </p>
              </div>
              <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                <OtpInput
                  autoComplete="one-time-code"
                  // isDisabled={!showOTP}
                  value={otp}
                  onChange={(otp: string) => {
                    setOtpError('');
                    setOtp(otp);
                  }}
                  numInputs={4}
                  separator={<span className="px-2"></span>}
                  containerStyle=" mx-auto"
                  inputStyle={{
                    margin: otpWidth,
                    width: '3rem',
                    height: '3rem',
                    color: 'black',
                    fontSize: ' 0.875rem',
                    borderRadius: 4,
                    border: '1px solid #E6E8EC',
                    backgroundColor: '#F5F5F5'
                  }}
                  isInputNum={true}
                />
              </div>

              {otpError ? (
                <p className="flex flex-wrap justify-center text-red text-sm mt-4 mb-4">
                  {otpError}
                </p>
              ) : null}
              {errors && errors?.phone_number?.message ? (
                <p className="flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4">
                  {errors?.phone_number?.message}
                </p>
              ) : null}
              <div className="lg:px-10 px-4">
                <Button
                  text="Verify & Continue"
                  disabled={otp.toString().length < 4}
                  handleClick={handleSubmit(submitOtp)}
                  className="w-full"
                  isLoading={isVerifyLaoding}
                />
              </div>

              <div className="mb-8">
                <div className="mt-4 text-center">
                  {timer === END_TIMER ? (
                    <p
                      className=" cursor-pointer underline text-brand-primary"
                      onClick={resendOTP}
                    >
                      Didn't receive the code?
                    </p>
                  ) : (
                    <p className="text-sm font-semibold">
                      Didn't receive the code? Resend in{' '}
                      <span className="underline">{`00:${String(timer).padStart(
                        2,
                        '0'
                      )}`}</span>
                    </p>
                  )}
                  {/* <p >Edit mobile number</p> */}
                </div>
              </div>
              <div className="text-center lg:px-4 px-0 mb-3 lg:mb-4 text-xs text-gray-100">
                <p>
                  By verifying, you agree to our{' '}
                  <Link
                    to={'/terms-condition'}
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    [Terms and Conditions]
                  </Link>{' '}
                  and{' '}
                  <a
                    href={
                      'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                    }
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    [Privacy Policy]
                  </a>
                  .
                </p>
              </div>
            </div>
          </BottomSheet>
        </div>
      </BottomSheet>

      <Modal
        show={showSuccessModal}
        align={'center'}
        className="w-[85%] lg:w-[60%] relative rounded-xl overflow-hidden"
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="w-full h-full bg-white shadow-lg">
          <div className="absolute right-3 top-3">
            <svg
              onClick={() => setShowSuccessModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600 cursor-pointer"
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
          <div
            className="min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-xl overflow-hidden"
            style={{
              border: 'double 4px transparent',
              backgroundImage:
                'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="flex justify-center mb-10">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/icon_success_green.svg"
                alt="success_icon"
              />
            </div>
            <p className="text-md text-gray-700 text-center font-semibold">
              {success}
            </p>
          </div>
        </div>
      </Modal>

      <OfferModal
        isOfferModal={isOfferModal}
        setIsOfferModal={setIsOfferModal}
        selectedOffer={selectedOffer}
      />
    </Layout>
  );
};

// lead form

type Props = {
  titleClassName?: string;
  submitClassName?: string;
  btnStyle?: {};
  desktopMode?: boolean;
  showTitle?: boolean;
  isBirthday?: boolean;
  isSticky?: boolean;
};

export type RegistrationFormFields = {
  firstName: string;
  countryCode: string;
  phoneNumber: string;
};

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f5f5f5',
    height: '48px',
    border: '1px solid rgb(112 112 112 / 10%)',
    borderRight: 'none',
    borderRadius: '6px 0 0 6px'
    //   zIndex: 10001 // Optional but helps when inside stacking contexts
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted #ccc',
    padding: 10,
    zIndex: 999 // Optional
  }),
  menu: (styles: any) => ({
    ...styles,
    width: '300px',
    zIndex: 9999 // Doesn't always affect portal-rendered menus
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 10001 // âœ… This is critical!
  })
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px';

const RequestACallback = ({
  titleClassName,
  submitClassName,
  btnStyle,
  desktopMode = false,
  showTitle = true,
  isBirthday = false,
  isSticky = false
}: Props) => {
  const [isSendOtpLoading, setIsSendOtpLoading] = useState(false);
  const [isVerifyLaoding, setIsVerifyLaoding] = useState(false);
  const [showRequestACallback, setShowRequestACallback] = useState(false);
  const [country, setCountry] = useState('+91');
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState<ReactNode>(null);
  const [failure, setFailure] = useState<ReactNode>(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [leadId, setLeadId] = useState(null);
  const [timer, setTimer] = useState<number>(30);
  const [otpReqId, setOtpReqId] = useState<any>();
  const END_TIMER = 0;

  // const [sendOTP] = useSendOTPMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset
  } = useForm();

  useEffect(() => {
    if (showOTPModal) {
      if (timer && timer !== END_TIMER) {
        var tempTimer = setInterval(() => setTimer(timer - 1), 1000);
        return function cleanup() {
          clearInterval(tempTimer);
        };
      }
    }
  }, [showOTPModal, timer]);

  const submitForm = (data: any) => {
    setIsSendOtpLoading(true);
    setErrorMsg(null);
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      phoneNumber: data.phone_number,
      website: cleanedUrl || window.location.href,
      pageCode: 'cordelia_birthday',
      fullName: data.name,
      email: data.email,
      companyName: null,
      eventType: null,
      countryCode: country
    };
    generateOtp(_payload)
      .unwrap()
      .then((response) => {
        setIsSendOtpLoading(false);
        setShowOTPModal(true);
        setOtp('');
        setOtpReqId(response?.result?.requestId);
      })
      .catch((response) => {
        setErrorMsg(response?.data?.message);
      })
      .finally(() => setIsSendOtpLoading(false));
  };

  const submitOtp = () => {
    setIsVerifyLaoding(true);
    const cleanedUrl = getCurrentUrlWithCampaign();

    const _payload = {
      // phone_number: watch().phone_number,
      // country_code: country,
      requestId: otpReqId,
      otp: otp,
      website: cleanedUrl || window.location.href,
      pageCode: 'cordelia_birthday'
    };
    verifyOtp(_payload)
      .unwrap()
      .then((response) => {
        setIsVerifyLaoding(false);
        setLeadId(response.lead_id);
        setShowOTPModal(false);
        handleCloseReqCallback();
        setShowSuccessModal(true);
        setSuccess(<>
          <span className='text-xl block'>
            You are one step closer to your cruise vacation. Our experts will contact you shortly.
          </span>
        </>)
      })
      .catch((response) => {
        handleCloseReqCallback();
        setShowOTPModal(false);
        setShowFailureModal(true);
        setFailure(
          <>
            <span className="block text-xl my-5">
              Looks like you've already registered. Welcome back!
            </span>
          </>
        );
        // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
        // setErrorMsg(response?.data?.message);
      })
      .finally(() => setIsVerifyLaoding(false));
  };

  const resendOTP = () => {
    setOtp('');
    setOtpError('');
    setTimer(30);
    submitForm({ phone_number: watch()?.phone_number });
  };

  const handleCloseReqCallback = () => {
    setShowRequestACallback(false);
    setErrorMsg(null);
    clearErrors();
    reset();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-md">
        {showTitle && (
          <div
            className={`border-b border-gray-300 p-4 flex items-center justify-between ${
              desktopMode ? 'lg:justify-center' : ''
            }`}
          >
            <h1
              className={`text-2xl font-bold bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] bg-clip-text ${titleClassName}`}
              style={{ color: 'transparent' }}
            >
              Request a Callback
            </h1>
            {/* <svg
            onClick={handleCloseReqCallback}
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
          </svg> */}
          </div>
        )}
        <div
          className={desktopMode ? 'lg:py-4 lg:px-8 p-4' : 'p-4'}
          style={{ padding: isSticky ? '1rem 0 0 0' : undefined }}
        >
          <form className="text-gray-100" onSubmit={handleSubmit(submitForm)}>
            <div
              className={
                desktopMode
                  ? 'lg:flex lg:justify-between lg:gap-4 items-center'
                  : ''
              }
            >
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/4' : ''}`}>
                {!isSticky && (
                  <label className="text-sm font-semibold mb-1 block">
                    Full Name
                  </label>
                )}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('name', { required: 'Name is required.' })}
                />
                {errors.name && (
                  <p className="text-xs text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/3' : ''}`}>
                {!isSticky && (
                  <label className="text-sm font-semibold mb-1 block">
                    Email Address
                  </label>
                )}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Enter a valid email address.'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className={`mb-2 ${desktopMode ? 'lg:basis-1/3' : ''}`}>
                {!isSticky && (
                  <label className="text-sm font-semibold block mb-1">
                    Mobile Number
                  </label>
                )}
                <div className="flex">
                  <div className="lg:col-span-2 col-span-2 w-[33%]">
                    <div
                      className={`grid grid-cols-1 gap-4 w-full h-[48px] bg-gray-400 overflow-hidden rounded-l-md`}
                    >
                      <input type="hidden" id="zc_gad" name="zc_gad" value="" />
                      <Select
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        value={{ label: country }}
                        maxMenuHeight={290}
                        options={PhoneCode}
                        onChange={(item) => setCountry(item?.value)}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 col-span-7 w-[78%]">
                    <input
                      id="phone_number"
                      {...register('phone_number', {
                        required: 'Please enter a valid mobile number',
                        pattern: {
                          value:
                            country === '+91' ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                          message: 'Please enter a valid mobile number'
                        },
                        maxLength: country === '+91' ? 10 : 12 // Set maxLength to 10 for +91 and 12 for others
                      })}
                      maxLength={country === '+91' ? 10 : 12} // Ensure that maxLength is correctly set
                      className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                      type="tel"
                      placeholder="Mobile Number"
                    />
                    {errors.phone_number && (
                      <span className="text-danger text-xs">
                        {errors.phone_number && (
                          <p className="text-xs text-danger">
                            {errors.phone_number.message}
                          </p>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {isBirthday && (
                <div
                  className={`text-center mt-4 ${
                    !isSticky ? 'lg:mt-3' : 'lg:mt-0 lg:mb-4'
                  }`}
                >
                  <Button
                    text="Sign Up"
                    size={desktopMode ? 'base' : 'sm'}
                    disabled={isSendOtpLoading}
                    isLoading={isSendOtpLoading}
                    className={`px-12 lg:w-max w-full ${submitClassName}`}
                    btnStyle={btnStyle}
                  />
                </div>
              )}
            </div>
            {!isBirthday && (
              <div className="text-center mt-4 lg:mt-3">
                <Button
                  text="Submit"
                  size={desktopMode ? 'base' : 'sm'}
                  disabled={false}
                  isLoading={false}
                  className={`px-12 ${submitClassName}`}
                  btnStyle={btnStyle}
                />
              </div>
            )}
            {errorMsg && (
              <div className="text-center mt-4">
                <p className="text-sm font-semibold text-danger">{errorMsg}</p>
              </div>
            )}
          </form>

          <Modal
            show={showOTPModal}
            align={'center'}
            className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
            maxHeight="100vh"
          >
            <div className="w-full text-black relative">
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                }}
                className="absolute -top-3 right-4 text-3xl"
              >
                &times;
              </button>
              <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                <p>Verify your phone number</p>
              </div>

              <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                <p className="px-2 text-sm">
                  We've sent a 4-digit code to{' '}
                  <span className="font-semibold">{watch().phone_number}</span>{' '}
                  <span className="block">
                    Enter the code below to continue.
                  </span>
                </p>
              </div>
              <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                <OtpInput
                  autoComplete="one-time-code"
                  // isDisabled={!showOTP}
                  value={otp}
                  onChange={(otp: string) => {
                    setOtpError('');
                    setOtp(otp);
                  }}
                  numInputs={4}
                  separator={<span className="px-2"></span>}
                  containerStyle=" mx-auto"
                  inputStyle={{
                    margin: otpWidth,
                    width: '3rem',
                    height: '3rem',
                    color: 'black',
                    fontSize: ' 0.875rem',
                    borderRadius: 4,
                    border: '1px solid #E6E8EC',
                    backgroundColor: '#F5F5F5'
                  }}
                  isInputNum={true}
                />
              </div>

              {otpError ? (
                <p className="flex flex-wrap justify-center text-red text-sm mt-4 mb-4">
                  {otpError}
                </p>
              ) : null}
              {errors && errors?.phone_number?.message ? (
                <p className="flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4">
                  {errors?.phone_number?.message}
                </p>
              ) : null}
              <div className="lg:px-10 px-4">
                <Button
                  text="Verify & Continue"
                  disabled={otp.toString().length < 4}
                  handleClick={handleSubmit(submitOtp)}
                  className="w-full"
                  isLoading={isVerifyLaoding}
                />
              </div>

              <div className="mb-8">
                <div className="mt-4 text-center">
                  {timer === END_TIMER ? (
                    <p
                      className=" cursor-pointer underline text-brand-primary"
                      onClick={resendOTP}
                    >
                      Didn't receive the code?
                    </p>
                  ) : (
                    <p className="text-sm font-semibold">
                      Didn't receive the code? Resend in{' '}
                      <span className="underline">{`00:${String(timer).padStart(
                        2,
                        '0'
                      )}`}</span>
                    </p>
                  )}
                  {/* <p >Edit mobile number</p> */}
                </div>
              </div>
              <div className="text-center lg:px-4 px-0 mb-3 lg:mb-4 text-xs text-gray-100">
                <p>
                  By verifying, you agree to our{' '}
                  <Link
                    to={'/terms-condition'}
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    [Terms & Conditions]
                  </Link>{' '}
                  and{' '}
                  <a
                    href={
                      'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                    }
                    target="_blank"
                    className="text-brand-primary italic"
                  >
                    [Privacy Policy]
                  </a>
                  .
                </p>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Modal
        show={showSuccessModal}
        align={'center'}
        className="w-[85%] lg:w-[60%] relative rounded-lg overflow-hidden"
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="w-full h-full bg-white shadow-lg">
          <div className="absolute right-3 top-3">
            <svg
              onClick={() => setShowSuccessModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600 cursor-pointer"
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
          <div
            className="min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-xl overflow-hidden"
            style={{
              border: 'double 4px transparent',
              backgroundImage:
                'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="flex justify-center mb-10">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/icon_success_green.svg"
                alt="success_icon"
              />
            </div>
            <p className="text-md text-gray-700 text-center font-semibold">
              {success}
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        show={showFailureModal}
        align={'center'}
        className="w-[85%] lg:w-1/2 relative rounded-lg overflow-hidden"
        onClose={() => setShowFailureModal(false)}
      >
        <div className="w-full h-full bg-white shadow-lg">
          <div className="absolute right-3 top-3">
            <svg
              onClick={() => setShowFailureModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600 cursor-pointer"
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
          <div
            className="min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-lg overflow-hidden"
            style={{
              border: 'double 4px transparent',
              backgroundImage:
                'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div className="flex justify-center mb-5">
              {/* <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/icon_success_green.svg"
                alt="success_icon"
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M50 75C51.4166 75 52.605 74.52 53.565 73.56C54.525 72.6 55.0033 71.4133 55 70V50C55 48.5833 54.52 47.3967 53.56 46.44C52.6 45.4833 51.4133 45.0033 50 45C48.5866 44.9967 47.4 45.4767 46.44 46.44C45.48 47.4033 45 48.59 45 50V70C45 71.4166 45.48 72.605 46.44 73.565C47.4 74.525 48.5866 75.0033 50 75ZM50 35C51.4166 35 52.605 34.52 53.565 33.56C54.525 32.6 55.0033 31.4133 55 30C54.9966 28.5867 54.5166 27.4 53.56 26.44C52.6033 25.48 51.4166 25 50 25C48.5833 25 47.3966 25.48 46.44 26.44C45.4833 27.4 45.0033 28.5867 45 30C44.9966 31.4133 45.4766 32.6017 46.44 33.565C47.4033 34.5283 48.59 35.0067 50 35ZM50 100C43.0833 100 36.5833 98.6866 30.5 96.06C24.4167 93.4333 19.125 89.8716 14.625 85.375C10.125 80.8783 6.56334 75.5866 3.94 69.5C1.31667 63.4133 0.00333966 56.9133 6.32911e-06 50C-0.003327 43.0867 1.31001 36.5867 3.94 30.5C6.57 24.4133 10.1317 19.1217 14.625 14.625C19.1183 10.1283 24.41 6.56667 30.5 3.94C36.59 1.31333 43.09 0 50 0C56.91 0 63.41 1.31333 69.5 3.94C75.59 6.56667 80.8816 10.1283 85.375 14.625C89.8683 19.1217 93.4316 24.4133 96.0649 30.5C98.6983 36.5867 100.01 43.0867 99.9999 50C99.9899 56.9133 98.6766 63.4133 96.0599 69.5C93.4433 75.5866 89.8816 80.8783 85.375 85.375C80.8683 89.8716 75.5766 93.435 69.5 96.065C63.4233 98.695 56.9233 100.007 50 100Z"
                  fill="#008CFF"
                />
              </svg>
            </div>
            <p className="text-md text-gray-700 text-center font-semibold">
              {failure}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BirthdayOffers;
