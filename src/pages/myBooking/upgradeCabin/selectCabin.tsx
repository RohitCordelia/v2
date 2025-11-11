import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React, { useEffect, useState, useRef, Fragment } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';
import { Layout } from "../../../components/Layout"
import { useGetViewItineraryMutation, useAvailableCabinMutation, useCabinPricingMutation } from
    '../../../services/upcomingCruise/upcomingCruise';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../../components/UI/ModalCenter';
import { ADD_ADULT, ADD_CHILDREN, ADD_INFANT, ADD_ROOM, REMOVE_ROOM } from '../../../constants/itineraryConstants';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSendOTPMutation, useVerifyOTPMutation } from '../../../services/auth/auth';
import { GetAuth, SaveAuth, SaveContact, GetStore, SaveStore, GetAB } from '../../../utils/store/store';
import Select from "react-select";
import { useGetDeckRoomsLayoutMutation, useGetDecksMutation, useGetUpgradeCabinMutation, useGetUpgradeMutation, useCreateUpgradeCabinMutation } from '../../../services/itinerary/itinerary'

import PhoneCode from "../../../components/UI/Forms/Inputs/phoneCodes.json";
import { Input } from '../../../components/UI/Forms/Inputs';
import OtpInput from 'react18-input-otp';
import { Phone } from '../../../utils/validations/formValidations';
import { useForm } from 'react-hook-form';
import { checkCabinCount, checkCabinSelect, isAdultSelected } from '../../..//utils/rooms/room';
import { getRefUrl } from '../../../utils/user/user';
import { FormatAmount } from '../../../../src/utils/formatter/formatter';
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import Header from "../../../components/Header/header";
import { GetManageDetail } from '../../../utils/store/store';
import { Player } from '@lottiefiles/react-lottie-player';
import success from "../../../utils/lottie/success.json";
import Button from '../../../components/UI/Button';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../../services/OTPLessAuth/OTPLessAuth';

type Props = {}
const rooms = [{}]
const cabin = [
    {
        'name': 'Interior Stateroom',
        'code': 'INTERIORSTANDARD',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend-mobile.webp',
        'subtitle': 'Welcome to your cosy haven on Decks 3 and 4. Our budget-friendly interior staterooms provide all the essentials for a comfortable and personalised experience aboard the Empress. Intently designed to make your stay special, these staterooms offer everything you need for a relaxing journey.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen-size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom, Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Television and Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
        ]
    },
    {
        'name': 'Interior Upper',
        'code': 'INTERIORUPPER',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend-mobile.webp',
        'subtitle': 'Discover your cosy escape on Deck 7. Our Upper category Interior staterooms offer all the essentials to make your stay truly special. Budget-friendly yet designed for maximum comfort, these staterooms provide the perfect personal haven aboard the Empress. Plus, enjoy added perks with this exclusive category.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen-size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom, Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Television and Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
        ]
    },
    {
        'name': 'Interior Premier',
        'code': 'INTERIORPREMIUM',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend-mobile.webp',
        'subtitle': 'Welcome to your cosy retreat on the sea. Our interior staterooms, situated on Decks 8 and 9, offer all the essentials to make your stay truly special. Thoughtfully designed and budget-friendly, they provide everything you need for a comfortable, personal escape aboard the Empress. Plus, enjoy exclusive perks when you book this Premier category Interior stateroom. It’s your perfect haven at sea.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen-size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom, Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Television and Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-quad-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-twin-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
        ]
    },
    {
        'name': 'Obstructed Ocean View',
        'code': 'OBSTRUCTEDOCEANVIEW',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend-mobile.webp',
        'subtitle': 'Wake up to serene ocean views each morning from your stateroom window, located on Decks 7 and 8. Though partially obstructed, the views and atmosphere are still breathtaking. These staterooms are designed with modern amenities to ensure a comfortable and enjoyable experience at sea.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Full-size window(Obstructed)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Hair Dryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-obstrcut-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-obstrcut-popup.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
            },
        ]
    },
    {
        'name': 'Ocean View Standard',
        'code': 'OCEANVIEWSTANDARD',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend-mobile.webp',
        'subtitle': 'Wake up to breathtaking ocean views every morning from your stateroom window, situated on Decks 3 and 4. Designed with the modern traveller in mind, our ocean view staterooms offer a perfect blend of comfort and convenience, complete with all the amenities you need for a seamless stay at sea.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Full-size window or porthole',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Hair Dryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-porthole-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-porthole-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
        ]
    },
    {
        'name': 'Ocean View Upper',
        'code': 'OCEANVIEWUPPER',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend-mobile.webp',
        'subtitle': 'Wake up to stunning ocean views from your stateroom window, located on Deck 7. Furnished with modern amenities to suit the needs of today’s traveler, this Upper category Ocean View stateroom offers a serene and comfortable retreat. Enjoy exclusive added benefits when you choose this special category.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Full-size window or porthole',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Hair Dryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
        ]
    },
    {
        'name': 'Ocean View Premier',
        'code': 'OCEANVIEWPREMIUM',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend-mobile.webp',
        'subtitle': 'Wake up to stunning ocean views every morning from your stateroom window, located on Decks 8 and 9. Designed for the modern traveller, these ocean view staterooms offer a perfect balance of comfort and style, with all the amenities you need for a seamless experience. Plus, enjoy the added benefits when you book this Premier category Ocean View stateroom.',
        'itinerary': [
            {
                'title': 'Two twin beds that convert to queen size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg',
            },
            {
                'title': 'Full-size window or porthole',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Hair Dryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-quad-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/ocean-view-wheelchair-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior&ocean-washroom-popup.webp",
            },
        ]
    },
    {
        'name': 'Mini Suite',
        'code': 'BALCONYSUITE',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-cabin-weekend-mobile.webp',
        'subtitle': 'Unwind in your luxurious stateroom with a private balcony, located on Decks 7, 8, and 9. Soak in the beauty of sunrises and sunsets from your personal space. Each balcony stateroom is a mini-suite, thoughtfully designed with world-class amenities for your utmost comfort.',
        'itinerary': [
            {
                'title': 'Two twin beds that can convert to queen size (72.5 by 82 inches)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/twin-bed-weekend-icon.svg'
            },
            {
                'title': 'Sofa sitting area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg'
            },
            {
                'title': 'Private balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg'
            },
            {
                'title': 'Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg'
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg'
            },
            {
                'title': 'Telephone',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg'
            },
            {
                'title': 'Complimentary 4 water bottles of 500ml in cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg'
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg'
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg'
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/mini-suite-oct-popup-04.webp",
            },
        ],
        'note': 'No sofa sitting area in 7186, 7188, 7686, 7688, 7690, 8686, 9684 cabins.'
    },
    {
        'name': 'Suite',
        'code': 'SUITE',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend-mobile.webp',
        'subtitle': 'Our exclusive suites aren’t just luxurious spaces—they’re unforgettable experiences. Located on Decks 7, 8, and 9, these suites feature separate living areas, private balconies with stunning views, and a Jacuzzi for ultimate relaxation. Furnished with world-class amenities, every moment in our suites exudes elegance and comfort.',
        'itinerary': [
            {
                'title': 'Balcony accessible from Living area and 1 window in the Bedroom area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg'
            },
            // {
            //     'title': 'Bathtub',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/jacuzzi-weekend-icon.svg'
            // },
            {
                'title': '1 TV 32" Samsung. ( 1x Living Room )',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg'
            },
            {
                'title': 'Single Sofa bed',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg'
            },
            {
                'title': 'Fridge',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg'
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg'
            },
            {
                'title': 'Safe in cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg'
            },
            {
                'title': 'Tea/coffee making facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg'
            },
            {
                'title': 'Complimentary bottle of water in cabin as per the deck wise benefits',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg'
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-oct-popup-04.webp",
            },
        ],
    },
    {
        'name': "Chairman's Suite",
        'code': 'ROYALSUITE',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend-mobile.webp',
        'subtitle': 'Step into unparalleled luxury with the Chairman’s Suite, situated on Deck 8 for an unmatched cruising experience. This contemporary, state-of-the-art suite features a lavish living room, private dining area with a six-seater table, a stylish bar counter, master bedroom, walk-in closet, and a private sun-deck balcony with a Jacuzzi. Indulge in special amenities designed for your comfort. With priority check-in and check-out, let the Chairman’s Suite be your gateway to limitless experiences at sea.',
        'itinerary': [
            {
                'title': 'Separate master Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
            },
            {
                'title': '1 window view from the bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Walk-in Closet',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/walk-closet-weekend-icon.svg',
            },
            {
                'title': 'Vanity area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vanity-weekend-icon.svg',
            },
            {
                'title': 'Private bathroom with Whirlpool bath, separate Shower & bath robes',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Bathroom amenities in Miniatures',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Dining Area 6 Seat table',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/dining-weekend-icon.svg',
            },
            {
                'title': '2x window views from the dining area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Living Room - lounge area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
            },
            {
                'title': 'Bar Counter with 3 bar stools',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/barcounter-weekend-icon.svg',
            },
            {
                'title': '1 balcony accessible from the living area, Sunbeds with table and chairs',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Samsung TV 65" in the Living Room and 40" in the Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Refrigerator',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Locker in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Tea/coffee making facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
            },
            {
                'title': 'Complimentary 4 water bottles of 500ml of in the cabin',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            },
            {
                'title': 'Mini Bar on request – chargeable',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/minibar-weekend-icon.svg',
            },
            {
                'title': 'Butler service',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/butler-weekend-icon.svg',
            },

        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-05.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-05.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-06.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-06.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-07.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-07.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-08.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-08.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-09.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-09.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-10.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-suite-oct-popup-10.webp",
            },
        ],
    },
]

const count = [
    {
        number: 0
    },
    {
        number: 1
    },
    {
        number: 2
    },
    {
        number: 3
    },
    {
        number: 4
    }
]

const customStyles = {
    control: (styles: any, { isDisabled }: any) => ({
        ...styles,
        backgroundColor: isDisabled ? 'rgb(232, 240, 254)' : '#f5f5f5',
        height: '48px', border: 0
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        zIndex: 999
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '300px',
        zIndex: 9999
    }),
    menuPortal: (base: any) => ({
        ...base, zIndex: 9999
    })
};

export default function SelectCabin({ }: any) {
    const store = GetStore();
    const ref = useRef<HTMLInputElement>(null);
    const [otpReqId, setOtpReqId] = useState<any>();

    const [getViewItinerary] = useGetViewItineraryMutation()
    const [availableCabinMutation] = useAvailableCabinMutation()
    const [cabinPricing] = useCabinPricingMutation()
    // const [sendOTP] = useSendOTPMutation();
    // const [verifyOTP] = useVerifyOTPMutation();
    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [getUpgrade] = useGetUpgradeMutation();
    const [getUpgradeCabin] = useGetUpgradeCabinMutation();
    const [getDecks] = useGetDecksMutation();
    const [getDeckRoomsLayout] = useGetDeckRoomsLayoutMutation()
    const [createUpgradeCabin] = useCreateUpgradeCabinMutation();

    const AUTH = GetAuth();
    const ab = GetAB();
    const TIMER_DURATION = 30
    const END_TIMER = 0
    const currentUrl = window.location.href;

    let navigate = useNavigate()
    let location = useLocation();
    const guestInRoom = location?.state?.guests;
    const itineraryId = location?.state?.guest_itinerary_id;
    const curreentIndex = location?.state?.index;
    const cabinBeds = location?.state?.cabinBeds;
    const categoryId = location?.state?.categoryId;

    // new window.URLSearchParams(window.location.search).get('id');

    const [isLoading, setIsLoading] = useState<any>();
    const [isLoading1, setIsLoading1] = useState<any>();
    const [priceLoading, setPriceLoading] = useState<any>(false);
    const [itineraryData, setItineraryData] = useState<any>();
    // const [cabinData, setCabinData] = useState<any>();
    const [cabinData, setCabinData] = useState<any[]>([]);
    const [amenitiesModal, setAmenitiesModal] = useState<any>(false);
    const [activeAmenities, setActiveAmenities] = useState<any>();
    const [amenitiesData, setAmenitiesData] = useState<any>([]);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [timer, setTimer] = useState<number>(30);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [country, setCountry] = useState('+91');
    const [selectedCabinDetail, setSelectedCabinDetail] = useState<any>([]);
    const [totalGuest, setTotalGuest] = useState<any>();
    const [totalPrice, setTotalPrice] = useState<any>();
    const [actualTotalPrice, setActualTotalPrice] = useState<any>();
    const [cabinDetail, setCabinDetail] = useState<any>(false);
    const [nextLoading, setNextLoading] = useState<any>(false);
    const [selectedRooms, setSelectedRooms] = useState<any>();
    const [readMoreModal, setReadMoreModal] = useState<any>();
    const [readMoreContent, setReadMoreContent] = useState<any>();
    const [sortBy, setSortBy] = useState<any>(false);
    const [SelectedSortBy, setSelectedSortBy] = useState<any>('lowToHigh');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [cabinLimitExceed, setCabinLimitExceed] = useState(false);
    const [singleCabin, setSingleCabin] = useState({})
    const [deckRoom, setDeckRoom] = useState([])
    const [roomDeckModal, setRoomDeckModal] = useState(false)
    const [roomDeck, setRoomDeck] = useState(null)
    const [selectedDeck, setSelectedDeck] = useState()
    const [deckModal, setDeckModal] = useState(false)
    const [currentRoom, setCurrentRoom] = useState(store.rooms);
    const [selectedRoom, setSelectedRoom] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<any>();
    const [deck, setDeck] = useState<any[]>();
    const [cabinIndex, setCabinIndex] = useState("")
    const [selectedCabinName, setSelectedCabinName] = useState('')
    const [isExpanded, setIsExpanded] = useState(false);

    const [showRoom, setShowRoom] = useState(null);
    const popupRef = useRef(null);
    const ManageDetail = GetManageDetail();
    let bookingRoute: any = ManageDetail.myBooking;
    let booking: any = ManageDetail.getBooking;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {
            setShowPhoneModal(false)
        } else {
            if (ab == 2) {
                setShowPhoneModal(true)
            } else {
                setShowPhoneModal(false)
            }
        }
    }, [])

    const SamplePrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/left-arrow.svg' />
            </div>
        )
    }

    function SampleNextArrow(props: any) {
        const { className, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/right-arrow.svg' />
            </div>
        )
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    useEffect(() => {
        const _payload = {
            itinerary_id: itineraryId
        }
        setIsLoading(true)
        getViewItinerary(_payload)
            .unwrap()
            .then((res: any) => {
                setItineraryData(res)
                setIsLoading(false)
                window.scroll({
                    top: 0,
                    left: 0
                });
            })
            .catch((res: any) => {
                setIsLoading(false)
                console.log('Error: ', res)
            })
    }, [])

    useEffect(() => {
        setIsLoading1(true)
        const data = {
            bkroom_id: booking?.rooms[curreentIndex]?.id
        }
        const _payload = {
            booking_id: bookingRoute[0]?.booking_id,
            data: data
        };
        getUpgradeCabin(_payload)
            .unwrap()
            .then((res: any) => {
                setCabinData(res)
                setIsLoading1(false)
                window.scroll({
                    top: 0,
                    left: 0
                });
            })
            .catch((res: any) => {
                setIsLoading1(false)
                console.log('Error: ', res)
            })
    }, [])

    useEffect(() => {
        if (activeAmenities) {
            let a = cabin.find((item) => item.code == activeAmenities);
            if (a) {
                setAmenitiesModal(true)
                setAmenitiesData(a);
            }
        }
    }, [activeAmenities])

    const handleEditPhone = () => {
        setShowOTP(false)
        setOtp("")
    }

    const {
        setError,
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            phone_number: "",
            otp: ""
        }
    });

    const onSubmitOTP = (data: any) => {
        setPhoneNumber(data.phone_number);
        const _payload = { phoneNumber: data.phone_number, countryCode: country };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTP(true);
                setOtpReqId(response?.result?.requestId);
            })
            .catch((response) => {
                setError('phone_number', { type: 'custom', message: 'Failed to send OTP' });
            })
    }

    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    }

    const onVerifyOTP = () => {
        const _payload = { phoneNumber: phoneNumber, countryCode: country, otp: otp, website: currentUrl, requestId: otpReqId };
        verifyOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowPhoneModal(false);
                SaveAuth(response)
                SaveContact({ phone: phoneNumber })
            })
            .catch((response) => {
                setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
    }

    const CountDropdown = ({
        disabled,
        cabin,
        add,
        type,
        index,
        maxCapacity,
        onPaxChange = () => { }
    }: any) => {
        const [open, setOpen] = useState(false);
        return (
            <div className='shadow-sm rounded'>
                <Listbox disabled={disabled} value={type} onChange={onPaxChange}>
                    <ListboxButton className={`border  ${disabled ? 'bg-gray-100/10' : ''} border-gray-300 shadow-allSide w-full px-4 flex items-center text-sm lg:text-lg  py-2 justify-between rounded`}>
                        {type}
                        <img className={`h-1.5 lg:h-2`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className={`w-[var(--button-width)] focus:outline-none transition duration-100 ease-in shadow-allSide`}>
                        {count?.slice(0, maxCapacity + 1).map((person: any) => (
                            <ListboxOption key={person?.number} value={person?.number} className="group flex cursor-pointer hover:bg-gray-300 items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-white/10 bg-gray-400">
                                {person?.number}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
            </div>
        )
    }

    const selectCabin = (cabinIndex: any) => {
        const updatedFirstIndex = {
            ...cabinData[cabinIndex], rooms: [
                {
                    adults: 0,
                    children: 0,
                    infants: 0,
                    seq_no: 1,
                }
            ],
            selected: ""
        };
        const updatedCabinData = [
            ...cabinData.slice(0, cabinIndex),
            updatedFirstIndex,
            ...cabinData.slice(cabinIndex + 1),
        ];
        setCabinData(updatedCabinData);
    }

    const fetchCabinPrice = () => {
        // setPriceLoading(true)
        const newArray = cabinData.map((item: any) => {
            if (item.rooms) return {
                category_code: item.code,
                rooms: item.rooms
            }
        }).filter((item: any) => item != null);

        const _payload = {
            itinerary_id: itineraryId,
            data: newArray
        };

        cabinPricing(_payload)
            .unwrap()
            .then((res: any) => {
                const newArray = res?.pricings?.map((item: any) => {
                    const { pricings, ...rest } = item;
                    return {
                        ...rest,
                        category_details: Array.isArray(pricings) ? pricings[0] : null,
                        selected: pricings[0]?.code,
                        error: Array.isArray(pricings) ? null : pricings,
                    };
                });

                let totalPrice = 0;
                let actualTotalPrice = 0;
                let totalGuest = 0;
                let cabin = []

                for (const group of res.pricings) {
                    totalGuest += (group.adults + group.children + group.infants);
                    for (const pricing of group.pricings) {
                        totalPrice += pricing.total;
                        actualTotalPrice += pricing.actual_total;
                    }
                    cabin.push({
                        cabinName: group.pricings[0].name,
                        totalGuest: (group.adults + group.children + group.infants)
                    })
                }
                setSelectedRooms(newArray)
                setSelectedCabinDetail(cabin)
                setTotalGuest(totalGuest)
                setTotalPrice(totalPrice)
                setActualTotalPrice(actualTotalPrice)
                // setSelectedRooms(JSON.parse(JSON.stringify(res.pricings)))
            })
            .catch((res: any) => {
                setSelectedRooms([])
                setSelectedCabinDetail([])
                setTotalGuest('')
                setTotalPrice('')
                setActualTotalPrice('')
                console.log('Error: ', res)
            })
        setPriceLoading(false);
    }

    const onRoomChange = (type: string, index: any, roomIndex: any, val: any) => {
        const newCabinDate = [...cabinData];
        let selectedCabin = newCabinDate[index];
        let roomCount = selectedCabinDetail.length;
        setCabinLimitExceed(false)
        fetchCabinPrice()
        // switch (type) {
        //     case ADD_ROOM:
        //         console.log('roh selectedCabinDetail', selectedCabinDetail);

        //         if (selectedCabinDetail.length == 4) {
        //             setCabinLimitExceed(true)
        //         } else {
        //             if (selectedCabin?.code != 'ROYALSUITE') {
        //                 selectedCabin.rooms.push({
        //                     adults: 0,
        //                     children: 0,
        //                     infants: 0,
        //                     seq_no: selectedCabin.rooms.length + 1,
        //                 });
        //                 setCabinData(newCabinDate)
        //             }
        //             setCabinLimitExceed(false)
        //         }
        //         break;

        //     case REMOVE_ROOM:
        //         if (newCabinDate[index] && newCabinDate[index].rooms.length > roomIndex) {
        //             newCabinDate[index].rooms.splice(roomIndex, 1);
        //         }
        //         setCabinData(newCabinDate)
        //         setCabinLimitExceed(false)
        //         fetchCabinPrice()
        //         break;

        //     case ADD_ADULT:
        //         selectedCabin.rooms[roomIndex].adults = val
        //         setCabinData(newCabinDate)
        //         fetchCabinPrice()
        //         break;

        //     case ADD_CHILDREN:
        //         selectedCabin.rooms[roomIndex].children = val
        //         setCabinData(newCabinDate)
        //         fetchCabinPrice()
        //         break;

        //     case ADD_INFANT:
        //         selectedCabin.rooms[roomIndex].infants = val
        //         setCabinData(newCabinDate)
        //         fetchCabinPrice()
        //         break;

        //     default:
        //         break;
        // }
    }

    useEffect(() => {
        if (cabinLimitExceed) {
            const timer = setTimeout(() => {
                setCabinLimitExceed(false);
            }, 10000); // 30 seconds

            // Cleanup the timeout if the component is unmounted or `isTrue` changes
            return () => clearTimeout(timer);
        }
    }, [cabinLimitExceed])

    const checkLogin = (cabinData: any, index: any) => {
        setSingleCabin(cabinData)
        setCabinIndex(index)
        setCabinLimitExceed(true)
    }


    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleButtonClick = (cabin: any, index: any) => {
        setSelectedIndex(index); // Update selected index
        checkLogin(cabin, index); // Call the existing login function
        setSelectedCabinName(cabin?.name)
    };


    useEffect(() => {
        if (showPhoneModal && showOTP) {
            if (timer && timer !== END_TIMER) {
                var tempTimer = setInterval(
                    () => setTimer(timer - 1),
                    // () => setTimer(moment(timer, TIMER_FORMAT).subtract(1, 's').format('mm : ss')),
                    1000
                );
                return function cleanup() {
                    clearInterval(tempTimer);
                };
            }
        }
    }, [showPhoneModal, timer, showOTP]);

    const CabinError = (cabinCode: any, seq_no: any) => {
        let newArray = selectedRooms?.filter((room: any) => room.category_code == cabinCode)
        const seqNosWithError = newArray?.filter((item: any) => item.error !== null).map((item: any) => item.seq_no);
        let a = seqNosWithError?.find((item: any) => item == seq_no)
        if (a) {
            return (
                <p className='text-sm text-danger font-semibold my-2 px-2'>No cabin available</p>
            )
        }
    }
    const DeckDesc = (desc: any) => {
        const d = desc.des.split(',');
        return d.map((v: any, i: number) =>
            <div className="flex" key={i}>
                <img className='h-2 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
                <p className='lg:text-sm text-xs font-semibold'>{v}</p>
            </div>
        )
    }
    const getRoomSelectionLayout = (deck: any) => {
        // console.log('deck - ', JSON.stringify(deck))
        if (singleCabin) {
            const data = {
                category_id: singleCabin?.category_id,
                beds: showRoom,
                deckno: deck.id
            }
            const _payload = {
                itinerary_id: itineraryId,
                data: data
            };
            getDeckRoomsLayout(_payload)
                .unwrap()
                .then((res: any) => {
                    // const filteredData = res.filter(room => room.beds >= showRoom);
                    setRoomDeck(res);
                    setSelectedDeck(deck);
                    setRoomDeckModal(true);
                    setDeckModal(false)
                })
                .catch((res: any) => {
                    console.log('Error: ', res)
                })
        }
    }
    const roomExists = (room_number: any) => {
        return currentRoom?.some((o: any) => o.room_number === room_number);
    }

    const RoomLayout = ({ roomDeck }: any) => {
        return roomDeck.map((room: any, key: number) => {
            let roomExist = roomExists(room.number)
            return (
                <div key={key}
                    className={`
              border-2 rounded-lg flex px-2 py-4 justify-center items-center text-center text-xxs lg:text-sm font-semibold uppercase select-none 
              ${room.available && "cursor-pointer"} 
              ${room.number === selectedRoom?.number ? 'bg-success border-success text-white' : room.available ? 'bg-white border-gray-100' : 'bg-gray-100/20 border-gray-100/20'}
              `}
                    onClick={() => room.available && setSelectionRoom(room)}
                    style={{ gridArea: `r${room.y}${room.x}` }} >
                    {room.number}
                </div >
            )
        })
    }
    const setSelectionRoom = (room: any) => {
        setSelectedRoom(room)
    }
    const ShipFront = (deck: any) => {
        return (
            <div style={{ gridArea: 'tri' }} className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 90" className="w-full">
                    <g fill="transparent">
                        <path d="M 167.4999694824219 2.352119445800781 C 166.0182800292969 2.352119445800781 164.5452575683594 2.722793579101562 163.2401428222656 3.424079895019531 L 35.47882080078125 72.07197570800781 C 33.53909301757812 73.11422729492188 32.11114501953125 74.67193603515625 31.34933471679688 76.57675933837891 C 30.65557861328125 78.31137084960938 30.53530883789062 80.30712127685547 31.0107421875 82.19636535644531 C 31.48617553710938 84.08557891845703 32.53671264648438 85.78668975830078 33.96881103515625 86.98633575439453 C 35.54147338867188 88.30368804931641 37.53665161132812 89.00000762939453 39.7386474609375 89.00000762939453 L 295.2613525390625 89.00000762939453 C 297.4633483886719 89.00000762939453 299.45849609375 88.30368804931641 301.0311279296875 86.98633575439453 C 302.4632873535156 85.78668975830078 303.5138244628906 84.08557891845703 303.9892578125 82.19633483886719 C 304.4646301269531 80.30712127685547 304.3444213867188 78.31137084960938 303.6506652832031 76.57675933837891 C 302.8888549804688 74.67193603515625 301.4608764648438 73.11422729492188 299.5211791992188 72.07197570800781 L 171.7598266601562 3.424079895019531 C 170.4546813964844 2.722793579101562 168.9816436767578 2.352119445800781 167.4999694824219 2.352119445800781 M 167.4999847412109 1.35211181640625 C 169.1276550292969 1.35211181640625 170.7553405761719 1.749137878417969 172.2331390380859 2.543190002441406 L 299.9945068359375 71.19108581542969 C 309.1502990722656 76.11061859130859 305.6551208496094 90.00000762939453 295.2613525390625 90.00000762939453 L 39.7386474609375 90.00000762939453 C 29.3448486328125 90.00000762939453 25.84970092773438 76.11061859130859 35.0054931640625 71.19108581542969 L 162.7668151855469 2.543190002441406 C 164.24462890625 1.749137878417969 165.8722991943359 1.35211181640625 167.4999847412109 1.35211181640625 Z" stroke="none" fill="#079bb5" />
                    </g>
                </svg>
                <div className="absolute text-center w-full lg:text-sm text-xs font-semibold top-12 lg:top-28 h-full">Deck {deck.deck.id}</div>
            </div>
        )
    }
    const navigateToBooking = () => {
        navigate('/manage-booking');
    }

    const [upgradePopup, setUpgradePopup] = useState(false);
    const continueRoomSelection = () => {
        if (singleCabin?.cabin_fare_diff === 0 && selectedRoom?.number) {
            const data = {
                bkroom_id: booking?.rooms[curreentIndex]?.id,
                room_no: selectedRoom?.number
            };
            const _payload = {
                booking_id: bookingRoute[0]?.booking_id,
                data: data
            };
            setRoomDeckModal(false);
            setIsLoading(true);
            createUpgradeCabin(_payload)
                .unwrap()
                .then((res: any) => {
                    setIsLoading(true);
                    setUpgradePopup(true); // Show the popup       
                    setTimeout(() => {
                        setIsLoading(false);
                        setUpgradePopup(false); // Hide popup
                        navigate('/manage-booking'); // Redirect after 2 sec
                    }, 3000);
                })
                .catch((res: any) => {
                    setIsLoading(false);
                    console.log('Error: ', res);
                });
        }

        if (selectedRoom && singleCabin?.cabin_fare_diff !== 0) {
            // let storeRoom = selectedRoom;
            // storeRoom[selectedCategoryIndex].room_id = selectedRoom?.itinerary_room_id;
            // storeRoom[selectedCategoryIndex].room_number = selectedRoom?.number;
            // storeRoom[selectedCategoryIndex].deck = selectedDeck?.id;
            // setCurrentRoom(storeRoom);
            navigate('/manage-booking/payment-summery', { state: { type: "upgrade_cabin", upgradeCabin_data: singleCabin, selectedRoom: selectedRoom, selectedCabinName: selectedCabinName, curreentIndex: curreentIndex } });
            setRoomDeckModal(false)
        }
    }

    const CabinCard = ({ cabin, index }: any) => {
        return (
            <div className={`border-gray-400 shadow-allSide rounded-lg mb-3 px-2 py-2 ${cabinBeds <= cabin.max_capacity ? '' : 'hidden'}`}>
                {cabinBeds <= cabin.max_capacity && (
                    <div className='grid grid-cols-5'>
                        <div className='col-span-5 lg:col-span-2 cabinSlider'>
                            <Slider {...settings}>
                                {cabin.images.map((val: any, idx: number) => (
                                    <div key={idx}>
                                        <img
                                            onClick={() => {
                                                setActiveAmenities(cabin?.code)
                                            }}
                                            src={val}
                                            className='h-[200px] w-full cursor-pointer' alt=""
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className='col-span-5 lg:col-span-3 pl-2 lg:pl-4 pr-2 lg:pr-0 py-2'>
                            <div className='grid grid-cols-3'>
                                <div className='col-span-3 lg:col-span-2'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-base lg:text-lg font-semibold'>{cabin.name}</p>
                                        <p onClick={() => { setActiveAmenities(cabin?.code) }} className='text-xs lg:hidden lg:text-sm text-brand-blue-2 underline underline-offset-2 font-medium cursor-pointer'>View Amenities</p>
                                    </div>
                                    <p className='text-xs lg:text-sm mt-1 font-light text-gray-100'>
                                        {cabin?.description?.split(' ').slice(0, 8).join(' ')}...
                                        <span onClick={() => {
                                            setReadMoreModal(true)
                                            setReadMoreContent(cabin.description)
                                        }} className='text-brand-primary cursor-pointer'> Read More</span>
                                    </p>
                                </div>
                                <div className='text-right hidden lg:block'>
                                    {!cabin?.is_sold ?
                                        <div>
                                            <p className='text-xl font-bold'>₹  {FormatAmount(cabin.cabin_fare_diff)}</p>
                                            <p className='text-xxs mt-1'>Excl. GST Per Person in Double Occupancy</p>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className='col-span-3 lg:flex lg:justify-between mt-2 lg:items-center'>
                                    <div className='flex items-center'>
                                        <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/max-capacity-icon.svg" alt="" />
                                        <p className='text-xs font-medium'>
                                            Max Capacity:&nbsp;
                                            {cabin?.is_sold
                                                ? cabin?.code == 'ROYALSUITE' || cabin?.code == 'BALCONYSUITE' || cabin?.code == 'SUITE' ? '3' : '4'
                                                : cabin?.max_capacity
                                            }
                                            &nbsp; Guests
                                        </p>
                                    </div>
                                    <div className='flex items-center'>
                                        <img className='h-6 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/deck-8-icon.svg" alt="" />
                                        <p className='text-xs font-medium'>
                                            Available Decks:&nbsp;
                                            {cabin?.deck_no?.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='border-t mt-2 lg:hidden border-gray-300' />
                            <div className='flex justify-between items-center mt-2 lg:mt-4'>
                                <p onClick={() => { setActiveAmenities(cabin?.code) }} className='hidden lg:block text-xs lg:text-sm text-brand-blue-2 underline underline-offset-2 font-medium cursor-pointer'>View Amenities</p>
                                <div className='text-left lg:hidden'>
                                    {!cabin?.is_sold ?
                                        <div>
                                            <p className='text-xl font-bold'>₹
                                                {FormatAmount(cabin.cabin_fare_diff)}
                                            </p>
                                            <p className='text-xxs mt-1'>Excl. GST Per Person in Double Occupancy</p>
                                        </div>
                                        : null
                                    }
                                </div>
                                {cabin?.is_sold || cabin?.available === false ? (
                                    <button
                                        onClick={() => checkLogin(cabin, index)}
                                        disabled={true} // Button is always disabled
                                        className=' border-1 border-gray-100 px-9 py-3 text-xs font-semibold rounded text-white bg-gray-100'>
                                        Sold Out
                                    </button>
                                ) : cabin.rooms && cabin.rooms.length ? null : (
                                    // <button
                                    //     key={index}
                                    //     style={{
                                    //         textWrap: 'nowrap',
                                    //         width: '120px',
                                    //     }}
                                    //     onClick={() => handleButtonClick(cabin, index)}
                                    //     disabled={checkCabinCount(cabinData)}
                                    //     className={`border-1 border-brand-primary px-5 py-3 text-xs font-semibold rounded ${selectedIndex === index
                                    //         ? 'bg-brand-primary text-white'
                                    //         : 'text-brand-primary'
                                    //         } disabled:border-brand-primary/20 disabled:text-brand-primary/20 disabled:cursor-not-allowed`}
                                    // >
                                    //     {selectedIndex === index ? 'Selected' : 'Select Cabin'}
                                    // </button>
                                    <Fragment key={index}>
                                        <Button text={selectedIndex === index ? 'Selected' : 'Select Cabin'} size='sm' type={selectedIndex === index ? 'primary' : 'secondary'} disabled={checkCabinCount(cabinData)} handleClick={() => handleButtonClick(cabin, index)} className='w-[120px] whitespace-nowrap' />
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const proceedToOffers = () => {
        setShowPhoneModal(true)
        const data = {
            category_id: singleCabin?.category_id,
            beds: singleCabin?.category_id === categoryId ? Math.min(cabinBeds + 1, 4) : cabinBeds
        }
        setShowRoom(data?.beds)
        const _payload = {
            itinerary_id: itineraryId,
            data: data
        };

        getDecks(_payload)
            .unwrap()
            .then((res: any) => {
                let a = res.slice().sort((a: any, b: any) => b.selectable - a.selectable);
                setDeck(a);
                setSelectedCategory(singleCabin);
                setSelectedCategoryIndex(cabinIndex);
                setDeckModal(true);
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
    }


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setSortBy(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    // const sortByFilter = (sortOrder: any) => {
    //     const sortedData = [...cabinData].sort((a, b) => {
    //         if (sortOrder === 'highToLow') {
    //             return b.cabin_fare_diff - a.cabin_fare_diff; // Sort high to low
    //         } else if (sortOrder === 'lowToHigh') {
    //             return a.cabin_fare_diff - b.cabin_fare_diff; // Sort low to high
    //         }
    //         return 0;
    //     });

    //     setCabinData(sortedData); // Update your cabin data state
    //     setSelectedSortBy(sortOrder); // Update the selected sort type
    // };

    const sortByFilter = (sortOrder: any) => {
        const sortedData = [...cabinData]
            .sort((a, b) => {
                if (sortOrder === 'highToLow') {
                    return b.cabin_fare_diff - a.cabin_fare_diff; // Sort high to low
                } else if (sortOrder === 'lowToHigh') {
                    return a.cabin_fare_diff - b.cabin_fare_diff; // Sort low to high
                }
                return 0;
            })
            .sort((a, b) => {
                // Secondary sort: Move items with available === false and cabin_fare_diff === 0 to the end
                const aCondition = a.available === false && a.cabin_fare_diff === 0;
                const bCondition = b.available === false && b.cabin_fare_diff === 0;

                if (aCondition && !bCondition) return 1; // Move `a` after `b`
                if (!aCondition && bCondition) return -1; // Move `b` after `a`
                return 0; // Keep relative order for other items
            });

        setCabinData(sortedData); // Update your cabin data state
        setSelectedSortBy(sortOrder); // Update the selected sort type
    };


    const showPopup = () => {
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setPopupVisible(false);
    };

    const handleMouseLeave = (event: any) => {
        if (
            popupRef.current &&
            !popupRef.current.contains(event)
        ) {
            hidePopup();
        }
    };

    const sortedCabinData = [...cabinData].sort((a, b) => {
        return (a.is_sold || a.available === false) - (b.is_sold || b.available === false);
    });

    const ItineraryName = () => {
        if (itineraryData?.nights > 5) {
            return (
                <p className="text-base font-bold">
                    {itineraryData?.ports[0]?.name} -&nbsp;
                    {itineraryData?.ports[itineraryData?.ports.length - 1]?.name}
                </p>
            )
        } else {
            return (
                itineraryData?.ports.map((val: any, i: number) => (
                    <p key={i} className="text-base font-bold">
                        {val.name}
                        {i !== itineraryData?.ports.length - 1 && <span> -&nbsp;</span>}
                    </p>
                ))
            )

        }
    }

    const arrival = `${itineraryData?.ports[itineraryData?.ports.length - 1]?.arrival?.split(" ")[3] + " " + itineraryData?.ports[itineraryData?.ports.length - 1]?.arrival?.split(" ")[4]}`;
    const departure = `${itineraryData?.ports[0]?.departure?.split(" ")[3] + " " + itineraryData?.ports[0]?.departure?.split(" ")[4]}`;

    const portList = itineraryData?.ports
        .filter((val: any) => val.name !== 'At Sea')
        .map((val: any) => val.name)
        .join(' | ');

    const isLong = portList?.length > 150;

    return (
        <>
            <Header />
            {isLoading || isLoading1 ?
                <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/30 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            {upgradePopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative z-50">
                        <div className='lg:my-4 my-3 flex justify-center'>
                            <Player
                                src={success}
                                style={{ width: 100, height: 100 }}
                                loop
                                autoplay
                            />
                        </div>
                        <p className="text-lg font-semibold">Your Cabin is Successfully Upgraded!</p>
                        {/* <button
                            onClick={navigateToBooking}
                            className="relative bg-brand-primary lg:ml-[68px] ml-[66px] lg:mt-[19px] mt-[15px] w-50 text-white text-sm py-3 px-8 rounded font-bold disabled:cursor-not-allowed"
                        >
                            Go to My Booking
                        </button> */}
                        <Button text='Go to My Booking' size='sm' handleClick={navigateToBooking} className='relative lg:ml-[68px] ml-[66px] lg:mt-[19px] mt-[15px] w-50' />
                    </div>
                </div>

            )}

            <main className='pt-[40px] pb-24 lg:pt-[78px] lg:pb-16'>
                <div className='container mx-auto px-4 lg:px-9 mt-8'>
                    <div>
                        <div className='grid grid-cols-3 gap-6'>
                            <div className="col-span-3 lg:col-span-2 mb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className='flex items-center'>
                                        <img
                                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                                            alt="arrow"
                                            onClick={() => {
                                                if (location.key == 'default') {
                                                    navigate('/upcoming-cruises')
                                                } else {
                                                    navigate(-1)
                                                }
                                            }}
                                            className={`mr-2 h-4 cursor-pointer`}
                                        />
                                        <h1 className="text-lg font-semibold lg:text-xl">
                                            Select Cabin
                                        </h1>
                                    </div>
                                    <div
                                        className='cursor-pointer relative py-2'

                                    >
                                        <div className='flex items-center'>
                                            <p className='text-lg font-bold mr-2'
                                                onMouseOver={showPopup}
                                                // onMouseEnter={showPopup}
                                                onMouseLeave={handleMouseLeave}
                                            >Sort by</p>
                                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sort-by-new-icon.svg" alt="" />
                                        </div>
                                        {isPopupVisible ? (
                                            <div
                                                ref={popupRef}
                                                onMouseLeave={hidePopup}
                                                className='absolute bg-white w-[220px] shadow-allSide rounded-lg border border-gray-300/50 top-10 z-50 right-0 lg:left-0'
                                            >
                                                <div
                                                    className='flex items-center cursor-pointer px-4 hover:bg-gray-100/5 py-3'
                                                    onClick={() => {
                                                        sortByFilter('highToLow');
                                                        handleMouseLeave();
                                                        setPopupVisible(false);
                                                    }}
                                                >
                                                    <div className='w-[30px]'>
                                                        {SelectedSortBy === 'highToLow' ? (
                                                            <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
                                                        ) : null}
                                                    </div>
                                                    <p>Price - high to low</p>
                                                </div>
                                                <div className='border-t border-gray-300' />
                                                <div
                                                    className='flex items-center cursor-pointer px-4 hover:bg-gray-100/5 py-3'
                                                    onClick={() => {
                                                        sortByFilter('lowToHigh');
                                                        handleMouseLeave();
                                                        setPopupVisible(false);
                                                    }}
                                                >
                                                    <div className='w-[30px]'>
                                                        {SelectedSortBy === 'lowToHigh' ? (
                                                            <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
                                                        ) : null}
                                                    </div>
                                                    <p>Price - low to high</p>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                {sortedCabinData && sortedCabinData.map((val: any, i: any) => (
                                    <>
                                        <CabinCard cabin={val} index={i} />
                                    </>
                                ))}
                            </div>
                            <div className='hidden lg:block'>
                                <div className='fixed lg:sticky top-[166px] pb-4'>
                                    <div className='sm:top-[166px] pb-4'>
                                        <div className='border-gray-400 shadow-allSide rounded-lg mb-4 px-4'>
                                            <div className='flex flex-wrap pt-5 pb-2'>
                                                {ItineraryName()}
                                                <p className='text-base font-bold text-brand-primary ml-1'>({itineraryData?.nights}N/{itineraryData?.nights + 1}D)</p>
                                            </div>
                                            <div className='border-t border-gray-300 w-full my-2.5' />
                                            <div className='flex items-start justify-between'>
                                                <div className='text-center'>
                                                    <p className='text-xs lg:text-base  font-bold'>
                                                        {/* {moment(itineraryData?.start_date, 'YYYY-MM-DD').format('MMM DD, YYYY')} */}
                                                        {moment(itineraryData?.start_date, 'DD/MM/YYYY').format('MMM DD, YYYY')}

                                                    </p>
                                                    <p className='text-xs text-gray-100 font-semibold'>

                                                        {/* {moment(itineraryData?.ports[0].departure, 'DD/MM/YYYY HH:ss A').format('ddd hh:ss A')} */}
                                                        {departure}
                                                    </p>
                                                </div>
                                                <div className='w-[30%] text-center relative -mt-[5px] lg:-mt-[3px]'>
                                                    <p className='text-gray-200 whitespace-nowrap overflow-hidden'>-------------</p>
                                                    <img className='absolute h-7'
                                                        style={{
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)'
                                                        }}
                                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                                                    />
                                                </div>
                                                <div className='text-center'>
                                                    <p className='text-xs lg:text-base  font-bold'>{moment(itineraryData?.end_date, 'DD/MM/YYYY').format('MMM DD, YYYY')}</p>
                                                    <p className='text-xs text-gray-100 font-semibold'>
                                                        {arrival}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='pb-3'>
                                                <div className='border-t border-gray-300 w-full my-2.5' />
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                                    <div className='flex flex-col items-start'>
                                                        <p className="text-xs lg:text-sm font-medium text-gray-100">
                                                            Visiting Ports:
                                                        </p>
                                                        <div className="">
                                                            <span
                                                                className={`text-xs lg:text-sm font-medium !leading-5`}
                                                            >
                                                                <span className="text-xs lg:text-sm font-medium !leading-5">
                                                                    {isLong && !isExpanded ? portList?.slice(0, 60) + '...' : portList}
                                                                </span>
                                                            </span>
                                                            {isLong && (
                                                                <span
                                                                    onClick={() => setIsExpanded(prev => !prev)}
                                                                    className="text-xs lg:text-sm text-brand-primary font-bold ml-2 cursor-pointer inline-block"
                                                                >
                                                                    {isExpanded ? 'View less' : 'View more'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {(singleCabin.cabin_fare_diff && singleCabin.max_capacity) ? (
                                                <>
                                                    <div className='border-t border-gray-300 w-full' />
                                                    <div className='flex py-6 justify-between'>
                                                        <div className='w-[180px]'>
                                                            <div className='flex items-center'>
                                                                <div className='w-[40px] flex items-center justify-center'>
                                                                    <img className='mr-2 w-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg" alt="" />
                                                                </div>
                                                                <p className='text-sm font-semibold'>
                                                                    {/* {selectedIndex + 1} */}
                                                                    1 Cabin</p>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <div className='w-[40px] flex items-center justify-center'>
                                                                    <img className='mr-2 w-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-icon.svg" alt="" />
                                                                </div>
                                                                <p className='text-sm font-semibold '>
                                                                    {/* {FormatAmount(singleCabin?.max_capacity)}  */}
                                                                    {`${guestInRoom} `}
                                                                    Guests
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='text-right'>
                                                            <div className='flex items-center justify-end'>
                                                                {/* {itineraryData?.discount_pct != 0 ? <p className='text-xs text-gray-100 font-semibold line-through mr-2'>₹{FormatAmount(actualTotalPrice)}</p> : null} */}
                                                                <p className='text-xl font-bold'>₹{FormatAmount(singleCabin?.cabin_fare_diff)}</p>
                                                            </div>
                                                            <p className='text-xs text-gray-100 mt-1'>Excl. GST charges</p>
                                                            {/* {itineraryData?.discount_pct != 0 ?
                                                            <div className='flex items-center mt-1 justify-end'>
                                                                <img className='h-3 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg" alt="" />
                                                                <p className='text-xs text-brand-green font-medium'>Discount Applied</p>
                                                            </div>
                                                            : null
                                                        } */}
                                                        </div>
                                                    </div>
                                                    {cabinDetail ? (
                                                        <>
                                                            <div className='border-t border-gray-300 w-full' />
                                                            <div className='py-4'>
                                                                {/* {selectedCabinDetail?.map((val: any, i: number) => ( */}
                                                                <div className='flex items-center'>
                                                                    <p className='text-sm font-semibold'>Cabin:</p>
                                                                    <p className='text-xs text-gray-100 ml-2 mt-[3px] '>{FormatAmount(singleCabin?.max_capacity)}
                                                                        &nbsp; Guests
                                                                    </p>
                                                                    <p className='text-xs text-gray-100 mx-1 mt-[3px]'>|</p>
                                                                    <p className='text-xs text-gray-100 mt-[3px]'>
                                                                        {selectedCabinName}
                                                                    </p>
                                                                </div>
                                                                {/* ))} */}
                                                            </div>
                                                        </>
                                                    ) : null}
                                                    <div className='border-t border-gray-300 w-full' />
                                                    <div onClick={() => setCabinDetail(!cabinDetail)} className='py-4 flex cursor-pointer items-center'>
                                                        <p className='text-sm text-brand-blue-2 font-semibold text-center cursor-pointer'>{cabinDetail ? 'Hide Cabin Details' : 'View Cabin Details'}</p>
                                                        <img className={`h-2 ml-2 ${cabinDetail ? 'rotate-180' : ''}`} src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-upcoming-icon.svg" alt="" />
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                        {/* 
                                    {cabinLimitExceed ?
                                        <div className='bg-danger/5 pl-4 pr-4 py-4 mb-4 rounded shadow-allSide border border-danger/5'>
                                            <div className='flex items-start'>
                                                <img className='mt-1 mr-3 hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg" alt="" />
                                                <div>
                                                    <p className='text-sm lg:text-base font-semibold lg:font-bold mb-1'>Important Note:</p>
                                                    <p className='text-xs lg:text-sm text-gray-100 italic'>User can only book 4 cabins, and if you want to book more, you'll need to <span className='font-semibold italic'> contact: 022-68811111</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                    } */}
                                        {(singleCabin.cabin_fare_diff && singleCabin.max_capacity) || singleCabin.cabin_fare_diff === 0 ? (
                                            // <button
                                            //     // Uncomment the line below if needed to disable the button conditionally
                                            //     // disabled={checkCabinSelect(cabinData)} 
                                            //     onClick={() => proceedToOffers()}
                                            //     className="mt-4 bg-brand-primary text-center py-2.5 rounded cursor-pointer disabled:bg-brand-primary/30 w-full lg:block hidden "
                                            // >
                                            //     <p className="text-white font-semibold">Proceed</p>
                                            // </button>
                                            <Button text='Proceed' handleClick={() => proceedToOffers()} className='w-full mt-4 hidden lg:block' />
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* {(singleCabin.cabin_fare_diff && singleCabin.max_capacity) ? (
               
               <div className="absolute w-full bottom-[64px] bg-white z-[29] lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]">
  <div
    className="bg-brand-blue/10 px-6 py-1.5 flex justify-between items-center"
    onClick={() => setCabinDetail(!cabinDetail)}
  >
    <p className="text-xxs text-brand-blue-2 font-semibold">
      {selectedCabinDetail.length} Cabin - {FormatAmount(singleCabin?.max_capacity)} Guests
    </p>
    <img
      className={`h-2 ml-2 ${cabinDetail ? '' : 'rotate-[270deg]'}`}
      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-upcoming-icon.svg"
      alt=""
    />
  </div>
  {cabinDetail && (
    <>
      <div className="py-2 px-6">
        <div className="flex items-center">
          <p className="text-sm font-semibold">Cabin:</p>
          <p className="text-xs text-gray-100 ml-2">
            {FormatAmount(singleCabin?.max_capacity)} Guests
          </p>
          <p className="text-xs text-gray-100 mx-1">|</p>
          <p className="text-xs text-gray-100">
            {FormatAmount(singleCabin?.cabin_fare_diff)}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 w-full" />
    </>
  )}
  <div className="bg-white px-6 py-2">
    <div className="flex justify-between items-center mb-1">
      <div>
        <div className="flex items-center">
          <p className="text-lg font-bold">₹{FormatAmount(singleCabin?.cabin_fare_diff)}</p>
          {itineraryData?.discount_pct !== 0 && (
            <p className="text-xxs text-gray-100 line-through ml-2">
              ₹{FormatAmount(actualTotalPrice)}
            </p>
          )}
        </div>
        <p className="text-xxs text-gray-100">Excl. GST charges</p>
        {itineraryData?.discount_pct !== 0 && (
          <div className="flex items-center mt-1">
            <img
              className="h-3 mr-1"
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg"
              alt=""
            />
            <p className="text-xxs text-brand-green">Discount Applied</p>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => proceedToOffers()}
          className="text-white text-sm bg-brand-primary font-semibold px-8 py-2.5 rounded-sm w-full disabled:bg-brand-primary/30 cursor-pointer"
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
</div>

              
            ) : null} */}


            {/* {(singleCabin.cabin_fare_diff && singleCabin.max_capacity) ? (
  <div className="fixed w-full bottom-0 bg-white z-[30] shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]">
    <div
      className="bg-brand-blue/10 px-6 py-1.5 flex justify-between items-center"
      onClick={() => setCabinDetail(!cabinDetail)}
    >
      <p className="text-xxs text-brand-blue-2 font-semibold">
        {selectedCabinDetail.length} Cabin - {FormatAmount(singleCabin?.max_capacity)} Guests
      </p>
      <img
        className={`h-2 ml-2 ${cabinDetail ? '' : 'rotate-[270deg]'}`}
        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-upcoming-icon.svg"
        alt=""
      />
    </div>
    {cabinDetail && (
      <>
        <div className="py-2 px-6">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Cabin:</p>
            <p className="text-xs text-gray-100 ml-2">
              {FormatAmount(singleCabin?.max_capacity)} Guests
            </p>
            <p className="text-xs text-gray-100 mx-1">|</p>
            <p className="text-xs text-gray-100">
              {FormatAmount(singleCabin?.cabin_fare_diff)}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-300 w-full" />
      </>
    )}
    <div className="bg-white px-6 py-2">
      <div className="flex justify-between items-center mb-1">
        <div>
          <div className="flex items-center">
            <p className="text-lg font-bold">₹{FormatAmount(singleCabin?.cabin_fare_diff)}</p>
            {itineraryData?.discount_pct !== 0 && (
              <p className="text-xxs text-gray-100 line-through ml-2">
                ₹{FormatAmount(actualTotalPrice)}
              </p>
            )}
          </div>
          <p className="text-xxs text-gray-100">Excl. GST charges</p>
          {itineraryData?.discount_pct !== 0 && (
            <div className="flex items-center mt-1">
              <img
                className="h-3 mr-1"
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg"
                alt="Discount Icon"
              />
              <p className="text-xxs text-brand-green">Discount Applied</p>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => proceedToOffers()}
            className="text-white text-sm bg-brand-primary font-semibold px-8 py-2.5 rounded-sm w-full disabled:bg-brand-primary/30 cursor-pointer"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  </div>
) : null} */}

            {(singleCabin.cabin_fare_diff && singleCabin.max_capacity) || singleCabin.cabin_fare_diff === 0 ? (
                <div
                    className="fixed w-full bottom-0 bg-white z-[30] shadow-[rgba(0,0,0,0.14)_5px_-2px_5px] lg:hidden"
                    style={{ maxHeight: '100vh', overflowY: 'auto' }} // Added to ensure visibility at all sizes
                >
                    <div
                        className="bg-brand-blue/10 px-6 py-1.5 flex justify-between items-center"
                        onClick={() => setCabinDetail(!cabinDetail)}
                    >
                        <p className="text-xxs text-brand-blue-2 font-semibold">
                            {/* {selectedIndex + 1}  */}
                            1 Cabin - {`${guestInRoom} `} Guests
                        </p>
                        <img
                            className={`h-2 ml-2 ${cabinDetail ? '' : 'rotate-[270deg]'}`}
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/dropdown-upcoming-icon.svg"
                            alt="Dropdown Icon"
                        />
                    </div>
                    {cabinDetail && (
                        <>
                            <div className="py-2 px-6">
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold">Cabin:</p>
                                    <p className="text-xs text-gray-100 ml-2 mt-[3px]">
                                        {FormatAmount(singleCabin?.max_capacity)} Guests
                                    </p>
                                    <p className="text-xs text-gray-100 mx-1 mt-[3px]">|</p>
                                    <p className="text-xs text-gray-100 mt-[3px]">
                                        {FormatAmount(singleCabin?.cabin_fare_diff)}
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-gray-300 w-full" />
                        </>
                    )}
                    <div className="bg-white px-6 py-2">
                        <div className="flex justify-between items-center mb-1">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-lg font-bold">₹{FormatAmount(singleCabin?.cabin_fare_diff)}</p>
                                    {itineraryData?.discount_pct !== 0 && (
                                        <p className="text-xxs text-gray-100 line-through ml-2">
                                            ₹{FormatAmount(actualTotalPrice)}
                                        </p>
                                    )}
                                </div>
                                <p className="text-xxs text-gray-100">Excl. GST charges</p>
                                {itineraryData?.discount_pct !== 0 && (
                                    <div className="flex items-center mt-1">
                                        <img
                                            className="h-3 mr-1"
                                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-upcoming-icon.svg"
                                            alt="Discount Icon"
                                        />
                                        <p className="text-xxs text-brand-green">Discount Applied</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Button text='Proceed' size='sm' handleClick={() => proceedToOffers()} className='w-full' />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}




            <Modal show={amenitiesModal} align={'center'} mainClassName="!items-end lg:items-center" className="w-full lg:w-3/4 center overflow-hidden left-0 right-0 lg:m-auto top-0 bottom-0 h-[90%] max-h-[540px] relative" onClose={() => {
                setAmenitiesModal(false)
                setActiveAmenities('')
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setAmenitiesModal(false)
                        setActiveAmenities('')
                    }}>X</p>
                </div>
                {amenitiesData && amenitiesData?.name &&
                    <div className='overflow-scroll no-scrollbar h-full  px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded'>
                        <div className='w-[50%] hidden lg:block'>
                            <ImageGallery
                                items={amenitiesData?.imageArr}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                autoPlay={true}
                                slideInterval={5000}
                                thumbnailPosition={'bottom'}
                                startIndex={0}
                                lazyLoad={true}
                            />
                        </div>
                        <div className='w-full lg:w-[50%] '>
                            <div className='text-left pl-2 lg:pl-6 py-2 lg:py-6'>
                                <p className='text-lg lg:text-2xl font-semibold font-outfit'>{amenitiesData?.name}</p>
                                <p className='font-outfit mt-2 lg:mt-2 text-xs lg:text-[0.94rem] lg:leading-6 text-gray-600'>{amenitiesData?.subtitle}</p>
                                <div className='w-full mt-3 lg:hidden'>
                                    <ImageGallery
                                        items={amenitiesData?.imageArr}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        autoPlay={true}
                                        slideInterval={5000}
                                        startIndex={0}
                                        lazyLoad={true}
                                        showThumbnails={false}
                                    />
                                </div>
                                <p className='text-base lg:text-xl font-semibold font-outfit mt-3 lg:mt-4'>Amenities</p>
                                <div className='grid grid-cols-1 mt-2 items-start max-h-[230px] overflow-y-scroll'>
                                    {amenitiesData?.itinerary?.map((item: any) => {
                                        return (
                                            <div className='flex items-start mb-1.5'>
                                                <img className='h-4 lg:h-6 w-4 lg:w-6 mr-1 lg:mr-2' src={item.icon} alt="" />
                                                <p className='text-xxs lg:text-sm font-outfit font-normal'>{item.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                {amenitiesData.note &&
                                    <div>
                                        <p className='font-outfit mt-2 lg:mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'><span className='text-brand-primary font-semibold'>Note: </span>{amenitiesData.note}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </Modal>



            <Modal show={readMoreModal} align={'center'} className=" w-full lg:w-[40%] center overflow-hidden left-0 right-0 m-auto top-0 bottom-0 relative" onClose={() => {
                setReadMoreModal(false)
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setReadMoreModal(false)
                    }}>X</p>
                </div>
                <div className='overflow-scroll no-scrollbar px-2 lg:px-6 py-2 lg:py-6 bg-white flex rounded'>
                    <div className='py-8 px-6'>
                        <p>{readMoreContent}</p>
                    </div>
                </div>
            </Modal>
            {/* {cabinLimitExceed ?
                <div className='lg:hidden fixed bottom-0 px-4 z-[30]'>
                    <div className='w-full bg-[#fdf1ee] pl-4 pr-4 py-4 mb-4 rounded shadow-allSide border border-danger/5 relative'>
                        <div className='absolute top-[-8px] right-[-5px] h-[20px] w-[20px] flex items-center justify-center bg-white rounded-full' onClick={() => setCabinLimitExceed(false)}>
                            <p className='leading-[1]'>x</p>
                        </div>
                        <div className='flex items-start'>
                            <img className='mt-1 mr-3 hidden lg:block' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/note-icon.svg" alt="" />
                            <div>
                                <p className='text-sm lg:text-base font-semibold lg:font-bold mb-1'>Important Note:</p>
                                <p className='text-xs lg:text-sm text-gray-100 italic'>User can only book 4 cabins, and if you want to book more, you'll need to <span className='font-semibold italic'> contact: 022-68811111</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            } */}


            <Modal show={deckModal} align={'center'} className="bg-white w-[90%] lg:w-2/4 center rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[90%]" onClose={() => setDeckModal(false)}>
                <div className='flex items-center justify-between p-4 pb-0'>
                    <h1 className='text-lg lg:text-2xl font-semibold'>Select Deck</h1>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => setDeckModal(false)}>X</p>
                </div>
                <div className='overflow-scroll h-[90%] px-4'>
                    {
                        deck && deck.map((value: any, key: number) => (
                            <div key={key}>
                                <div className="mt-5 grid grid-cols-2 gap-4 bg-brand-sky/10 px-2 py-2 lg:px-5 lg:py-4 border border-brand-sky rounded-t" >
                                    <h6 className="text-base font-semibold lg:text-xl">Deck {value.id}</h6>
                                    {/* <button
                                        disabled={!value.selectable}
                                        onClick={() => getRoomSelectionLayout(value)}
                                        className={`bg-brand-primary text-xs text-white font-bold py-2 rounded disabled:bg-brand-primary/60`}
                                    >
                                        Choose a room
                                    </button> */}
                                    <Button text='Choose a room' size='sm' disabled={!value.selectable} handleClick={() => getRoomSelectionLayout(value)} className='whitespace-nowrap' />
                                </div>
                                <div className={`grid grid-cols-2 gap-3 px-2 py-3 lg:px-5 border border-t-0 border-brand-sky`}>
                                    <DeckDesc des={value.description} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>

            <Modal show={roomDeckModal} align={'center'} className=" w-[90%] lg:w-2/4 center rounded-lg lg:rounded overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[90%]" onClose={() => setRoomDeckModal(false)}>
                <div className='flex items-center justify-between p-4 pb-0 bg-white'>
                    <h1 className='text-lg lg:text-2xl font-semibold'>Select Deck</h1>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => setRoomDeckModal(false)}>X</p>
                </div>
                <div className='overflow-scroll h-[80%] px-4 text-center bg-white'>
                    <ShipFront deck={selectedDeck} />
                    <div className='border-2 border-brand-sky rounded-md w-[90%] text-center inline-grid py-3 my-1'>
                        <p className='lg:text-sm text-xs font-semibold'>{selectedDeck?.description}</p>
                    </div>
                    <div className="grid gap-2" style={{ gridTemplateAreas: "'" + buildLayoutGrid(roomDeck).join("' '") + "'" }}>
                        <div style={{ gridArea: 'exp' }} className="flex justify-around uppercase text-xs mt-3 mb-14">
                            <div className='flex'>
                                <div className='rounded-md border-2 h-4 w-4 mr-1 lg:mt-1' />
                                <p className='text-sm lg:text-base font-semibold'> Available</p>
                            </div>
                            <div className='flex'>
                                <div className='rounded-md border-2 border-gray-100 bg-gray-100/20 border-bg-gray-100 h-4 w-4 mr-1 lg:mt-1 ' />
                                <p className='text-sm lg:text-base font-semibold'> Unavailable</p>
                            </div>
                            <div className='flex'>
                                <div className='rounded-md border-2 bg-success h-4 w-4 mr-1 lg:mt-1 ' />
                                <p className='text-sm lg:text-base font-semibold'> Selected</p>
                            </div>
                        </div>
                        <RoomLayout roomDeck={roomDeck} />
                    </div>
                </div>
                <div className='h-[12%] px-4  text-center rounded-b-lg lg:rounded-b bg-white'>
                    <div className='flex items-center h-full justify-between'>
                        <div className='text-left'>
                            <p className='text-brand-primary font-semibold lg:text-lg'>Deck {selectedDeck?.id} : {selectedRoom && selectedRoom.number ? `Room ${selectedRoom?.number}` : null}</p>
                            {/* <p className='font-semibold text-xs'> {selectedDeck?.description}</p> */}
                        </div>
                        {/* <button
                            onClick={() => continueRoomSelection()}
                            className={`bg-brand-primary text-xs text-white font-bold py-3 px-4 rounded disabled:bg-brand-primary/60`}
                        >
                            Continue
                        </button> */}
                        <Button text='Continue' size='sm' handleClick={() => continueRoomSelection()} />
                    </div>
                </div>
            </Modal>





        </>
    );
}

// const ShipFront = (deck: any) => {
//     return (
//       <div style={{ gridArea: 'tri' }} className="relative">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 90" className="w-full">
//           <g fill="transparent">
//             <path d="M 167.4999694824219 2.352119445800781 C 166.0182800292969 2.352119445800781 164.5452575683594 2.722793579101562 163.2401428222656 3.424079895019531 L 35.47882080078125 72.07197570800781 C 33.53909301757812 73.11422729492188 32.11114501953125 74.67193603515625 31.34933471679688 76.57675933837891 C 30.65557861328125 78.31137084960938 30.53530883789062 80.30712127685547 31.0107421875 82.19636535644531 C 31.48617553710938 84.08557891845703 32.53671264648438 85.78668975830078 33.96881103515625 86.98633575439453 C 35.54147338867188 88.30368804931641 37.53665161132812 89.00000762939453 39.7386474609375 89.00000762939453 L 295.2613525390625 89.00000762939453 C 297.4633483886719 89.00000762939453 299.45849609375 88.30368804931641 301.0311279296875 86.98633575439453 C 302.4632873535156 85.78668975830078 303.5138244628906 84.08557891845703 303.9892578125 82.19633483886719 C 304.4646301269531 80.30712127685547 304.3444213867188 78.31137084960938 303.6506652832031 76.57675933837891 C 302.8888549804688 74.67193603515625 301.4608764648438 73.11422729492188 299.5211791992188 72.07197570800781 L 171.7598266601562 3.424079895019531 C 170.4546813964844 2.722793579101562 168.9816436767578 2.352119445800781 167.4999694824219 2.352119445800781 M 167.4999847412109 1.35211181640625 C 169.1276550292969 1.35211181640625 170.7553405761719 1.749137878417969 172.2331390380859 2.543190002441406 L 299.9945068359375 71.19108581542969 C 309.1502990722656 76.11061859130859 305.6551208496094 90.00000762939453 295.2613525390625 90.00000762939453 L 39.7386474609375 90.00000762939453 C 29.3448486328125 90.00000762939453 25.84970092773438 76.11061859130859 35.0054931640625 71.19108581542969 L 162.7668151855469 2.543190002441406 C 164.24462890625 1.749137878417969 165.8722991943359 1.35211181640625 167.4999847412109 1.35211181640625 Z" stroke="none" fill="#079bb5" />
//           </g>
//         </svg>
//         <div className="absolute text-center w-full lg:text-sm text-xs font-semibold top-12 lg:top-28 h-full">Deck {deck.deck.id}</div>
//       </div>
//     )
//   }

function buildLayoutGrid(rooms: any) {
    let gridmap: any = {};
    let maxX = 0;
    let maxY = 0;
    rooms?.forEach(function (room: any) {
        if (!gridmap[room.y]) {
            gridmap[room.y] = {};
        }
        gridmap[room.y][room.x] = room;

        if (room.y > maxX) maxX = room.y;
        if (room.x > maxY) maxY = room.x;
    });
    let gridString = [new Array(maxY + 1).fill("tri").join(" "),
    new Array(maxY + 1).fill("dck").join(" "),
    new Array(maxY + 1).fill("pre").join(" "),
    new Array(maxY + 1).fill("exp").join(" ")];
    let roomNo = 1;
    for (let x = 0; x <= maxX; x++) {
        let gridLine = "";
        for (let y = 0; y <= maxY; y++) {
            if (gridLine != "") {
                gridLine += " "
            }
            if (gridmap[x] && gridmap[x][y]) {
                if (gridmap[x][y].number.indexOf('lift') != -1) {
                    gridLine += ("lift");
                } else {
                    gridLine += ("r" + x + y);
                }
            } else {
                gridLine += ".";
            }
        }
        gridString.push(gridLine);
    }
    return gridString;
}