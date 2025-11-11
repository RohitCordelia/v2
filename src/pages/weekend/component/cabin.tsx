import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookNow } from './extraElement';
// import "./slick-customized.css"
import Modal from '../../../components/UI/ModalCenter';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../CordeliaEmpress/index.css";

type Props = {
    page?: string;
    ship?: string;
};

interface SliderRefType {
    slickGoTo: (index: number) => void;
}

const EmpressCabins = [
    {
        'name': "Chairman's Suite",
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-1.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-1.webp',
        'subtitle': 'Step into unparalleled luxury with the Chairman’s Suite, an unmatched cruising experience. Indulge in special amenities designed for your comfort.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Living Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Refrigerator',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
            },
            {
                'title': 'Tea/Coffee Making Facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-1.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-1.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-2.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-2.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-3.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/chairmansuite-room-3.webp",
            },
        ],
    },
    {
        'name': 'Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-cabin-weekend-mobile.webp',
        'subtitle': 'Get ready to make your cruise journey oh so Suite! Furnished with world-class amenities and classy exuberance.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Living Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Refrigerator',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
            },
            {
                'title': 'Tea/Coffee Making Facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
            },
            
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': 'Ocean view bedroom',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oceanview-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
    
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-05.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-weekend-popup-05.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-owner-suite-popup-web-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-owner-suite-popup-web-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-owner-suite-popup-web-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-owner-suite-popup-web-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-owner-suite-popup-web-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-owner-suite-popup-web-03.webp",
            },
        ],
    },
    {
        'name': 'Mini Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-cabin-weekend-mobile.webp',
        'subtitle': 'Experience premium accommodation onboard with a private balcony for you to sit back and enjoy panoramic views of the ocean from your happy place.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': 'Jaw dropping view',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/droppingview-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Shower',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shower-weekend-icon.svg',
            // },
            // {
            //     'title': 'Sitting Area',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sittingarea-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
            // {
            //     'title': 'Vanity',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vanity-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-05.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/minisuite-weekend-popup-05.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mini-suite-twin-bed-popup-web-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mini-suite-twin-bed-popup-web-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mini-suite-twin-bed-popup-web-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mini-suite-twin-bed-popup-web-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mini-suite-twin-bed-popup-web-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-mini-suite-twin-bed-popup-web-03.webp",
            },
        ],
        'note': 'No sofa sitting area in 7186, 7188, 7686, 7688, 7690, 8686, 9684 cabins.'
    },
    {
        'name': 'Ocean View Stateroom',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-cabin-weekend-mobile.webp',
        'subtitle': 'Talk about a private and cozy cabin of your own with a picturesque view of the sea, because that’s what our Ocean View Staterooms are all about!',
        'itinerary': [
            {
                'title': 'Window',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
            // {
            //     'title': 'Twin beds',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/oceanview-weekend-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-oceanview-obstrcuted-popup-web-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-oceanview-obstrcuted-popup-web-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-oceanview-pullman-bed-popup-web-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-oceanview-pullman-bed-popup-web-02.webp",
            },
        ]
    },
    {
        'name': 'Interior Stateroom',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-weekend-mobile.webp',
        'subtitle': 'Not only are they budget-friendly, our Interior Staterooms have everything you need to make your journey and stay onboard truly special.',
        'itinerary': [
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },

            // {
            //     'title': 'Twin beds',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-02.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-03.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-03.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-04.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-weekend-popup-04.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-interior-pullman-bed-popup-web-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-interior-pullman-bed-popup-web-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-interior-twin-bed-popup-web-02.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/empress-interior-twin-bed-popup-web-02.webp",
            },
        ]
    },
]

const SkyCabins = [
    {
        'name': "Chairman's Suite",
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-balcony-web-image-01.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-balcony-web-image-01.webp',
        'subtitle': 'The Chairman’s Suite offers a private bedroom, spacious living and dining areas, and a luxurious bath with a whirlpool tub. Step out onto your large balcony with a private hot tub and soak in spectacular sea views—every moment here is designed to impress.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-balcony-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-balcony-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/owners_suite.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/owners_suite.webp",
            },
        ],
    },
    {
        'name': 'Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/owners-suite-balcony-web-image-01.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/owners-suite-balcony-web-image-01.webp',
        'subtitle': 'Indulge in luxury at sea. These spacious suites are ideal for two…or the entire family. Enjoy the finest amenities including sweeping private balconies.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': 'Jaw dropping view',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/droppingview-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Shower',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shower-weekend-icon.svg',
            // },
            // {
            //     'title': 'Sitting Area',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sittingarea-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
            // {
            //     'title': 'Vanity',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vanity-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/owners-suite-balcony-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/owners-suite-balcony-web-image-01.webp",
            },
            // {
            //     original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-balcony-web-image-01.webp",
            //     thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-balcony-web-image-01.webp",
            // },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-forward-facing-penthouse-balcony-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-forward-facing-penthouse-balcony-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-penthouse-bacony-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-penthouse-bacony-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-mobile.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/interior-cabin-mobile.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-suite-penthouse-bacony-topview-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-suite-penthouse-bacony-topview-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-top-view-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/suite-aft-facing-penthouse-top-view-web-image-01.webp",
            },
            // {
            //     original: "https://images.cordeliacruises.com/cordelia_v2/public/images/owners_suite.webp",
            //     thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/owners_suite.webp",
            // },
        ],
    },
    {
        'name': 'Mini Suite',
        'image': 'http://images.cordeliacruises.com/cordelia_v2/public/images/sky-balcony-web-image-01.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-balcony-mobile-image-01.webp',
        'subtitle': 'See the world in a whole new way from your own private balcony. Well-appointed and stylish accommodation offer plenty of room to unwind inside.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Living Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Refrigerator',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
            },
            {
                'title': 'Tea/Coffee Making Facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
            },

            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': 'Ocean view bedroom',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oceanview-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },

        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-balcony-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-balcony-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky_modal_fp_balcony.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky_modal_fp_balcony.webp",
            },
        ],
    },
    {
        'name': 'Ocean View',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-oceanview-web-image-01.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-oceanview-mobile-image-01.webp',
        'subtitle': 'Discover the beauty of style and comfort. Cozy and modern staterooms feature excellent appointments. Accented by stylish touches and clear views of the ocean.',
        'itinerary': [
            {
                'title': 'Window',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },
            // {
            //     'title': 'Twin beds',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-oceanview-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-oceanview-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-oceanview-porthole-top-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-oceanview-porthole-top-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Oceanview+with+Large+Porthole.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Oceanview+with+Large+Porthole.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Ocenview.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Ocenview.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-oceanview-topview-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-oceanview-topview-web-image-01.webp",
            },
        ],
    },
    {
        'name': 'Interior',
        'image': 'http://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-inside-web-image-01.webp',
        'mobileImage': 'http://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-inside-mobile-image-01.webp',
        'subtitle': "Set sail in comfort and style. You'll find everything you need here inside. Stylish and modern appointments include a TV, sitting area and more.",
        'itinerary': [
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
            // {
            //     'title': '5 meals a day',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/meals-weekend-icon.svg',
            // },
            // {
            //     'title': 'Swimming',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/swimming-weekend-icon.svg',
            // },

            // {
            //     'title': 'Twin beds',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/room-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-inside-web-image-01.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/sky-family-inside-web-image-01.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Inside.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Inside.webp",
            },
        ],
    },
]

const SunCabins = [
    {
        'name': "Chairman's Suite",
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_OwnersSuite_BdRm_SB_Web.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_OwnersSuite_BdRm_SB_Web.webp',
        'subtitle': 'The Chairman’s Suite features a private bedroom with a queen-size bed, spacious living and dining areas, a luxurious bath, and an additional guest bath. Step onto your private balcony with a hot tub and take in breathtaking views. Perfect for up to four guests, with the option to connect to a Balcony Stateroom—ideal for family or friends.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_OwnersSuite_BdRm_SB_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_OwnersSuite_BdRm_SB_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_OwnersSuite_LvgRm_SB_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_OwnersSuite_LvgRm_SB_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Ownrs_Suite_web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Ownrs_Suite_web.webp",
            },
        ],
    },
    {
        'name': 'Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FF_Pent_SF_Web.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FF_Pent_SF_Web.webp',
        'subtitle': 'Indulge in luxury at sea. These spacious suites are ideal for two…or the entire family. Enjoy the finest amenities including sweeping private balconies.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FF_Pent_SF_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FF_Pent_SF_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FF_Pent_SG_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_FF_Pent_SG_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Pnthse_Blcny_SF.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Pnthse_Blcny_SF.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Aft_Pent_BdRm_SE_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Aft_Pent_BdRm_SE_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Aft_Pent_LvgRm_SE_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Aft_Pent_LvgRm_SE_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Pnthse_Blcny_SF.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Pnthse_Blcny_SF.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_MiniSuite_MS_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_MiniSuite_MS_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Blcny_web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Blcny_web.webp",
            },
        ],
    },
    // {
    //     'name': 'Club Balcony Suite',
    //     'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_MiniSuite_MS_Web.webp',
    //     'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_MiniSuite_MS_Web.webp',
    //     'subtitle': 'Step through sliding-glass doors to a dramatic, ever-changing seascape. Enjoy the extra space of a sitting area, room to sleep up to four comfortably, and a luxurious bath and shower.',
    //     'itinerary': [
    //         {
    //             'title': 'Private Balcony',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Living Area',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Sofa Sitting',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Refrigerator',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Tea/Coffee Making Facility',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Bathroom, Vanity Area',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Hairdryer',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Intercom',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Television',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Secure Locker',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Sanitized',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
    //         },
    //         {
    //             'title': 'Bedroom',
    //             'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
    //         },
    //         // {
    //         //     'title': '2 Water Bottles',
    //         //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
    //         // },
    //     ],
    //     'imageArr': [
    //         {
    //             original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_MiniSuite_MS_Web.webp",
    //             thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_MiniSuite_MS_Web.webp",
    //         },
    //         {
    //             original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Blcny_web.webp",
    //             thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Blcny_web.webp",
    //         },
    //     ],
    // },
    {
        'name': 'Mini Suite',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Balcny_BB_Web.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Balcny_BB_Web.webp',
        'subtitle': 'See the world in a whole new way. Floor-to-ceiling glass doors open to your own private balcony. Well-appointed and stylish accommodation offer plenty of room to unwind inside.',
        'itinerary': [
            {
                'title': 'Private Balcony',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/balcony-weekend-icon.svg',
            },
            {
                'title': 'Living Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/living-area-weekend-icon.svg',
            },
            {
                'title': 'Sofa Sitting',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sofabed-weekend-icon.svg',
            },
            {
                'title': 'Refrigerator',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/refrigerator-weekend-icon.svg',
            },
            {
                'title': 'Tea/Coffee Making Facility',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-machine-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Bedroom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/master-bedroom-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Balcny_BB_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Balcny_BB_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Blcny_web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Blcny_web.webp",
            },
        ],
    },
    {
        'name': 'Ocean View',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Obstr_Oceanview_OG_Web.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Obstr_Oceanview_OG_Web.webp',
        'subtitle': 'Discover the beauty of style and comfort. Cozy and modern staterooms feature excellent appointments. Accented by stylish touches and clear views of the ocean.',
        'itinerary': [
            {
                'title': 'Window',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/window-weekend-icon.svg',
            },
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Obstr_Oceanview_OG_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Obstr_Oceanview_OG_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Ocnvw_PctrWndw_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Ocnvw_PctrWndw_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Oceanview_Pict_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Oceanview_Pict_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Ocnvw_PctrWndw_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Ocnvw_PctrWndw_Web.webp",
            },
        ],
    },
    {
        'name': 'Interior',
        'image': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Inside_IF_Web.webp',
        'mobileImage': 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Inside_IF_Web.webp',
        'subtitle': "Set sail in comfort and style. You'll find everything you need here inside. Stylish and modern appointments include a TV, sitting area and more.",
        'itinerary': [
            {
                'title': 'Accessible (Limited Cabins Available)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/accesible-weekend-icon.svg',
            },
            {
                'title': 'Bathroom, Vanity Area',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/bathroom-weekend-icon.svg',
            },
            {
                'title': 'Secure Locker',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-weekend-icon.svg',
            },
            {
                'title': 'Intercom',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/intercom-weekend-icon.svg',
            },
            {
                'title': 'Television',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tv-weekend-icon.svg',
            },
            {
                'title': 'Hairdryer (on request)',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hairdryer-weekend-icon.svg',
            },
            {
                'title': 'Sanitized',
                'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/sanitized-weekend-icon.svg',
            },
            // {
            //     'title': '2 Water Bottles',
            //     'icon': 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-weekend-icon.svg',
            // },
        ],
        'imageArr': [
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Inside_IF_Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Inside_IF_Web.webp",
            },
            {
                original: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Insde-Web.webp",
                thumbnail: "https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Shmtc_Insde-Web.webp",
            },
        ],
    },
]

export default function CabinCategory({ page, ship = "empress" }: Props) {
    const sliderRef = useRef<SliderRefType | null>(null);
    const scrollCabinRef = useRef<null>(null);
    const tabRefs = useRef([]);

    const [setting, setSetting] = useState<any>({});
    const [type, setType] = useState('Interior');
    const [skyCabinType, setSkyCabinType] = useState('Suite');
    const [sunCabinType, setSunCabinType] = useState('Suite');
    const [cabinModal, setCabinModal] = useState(false);
    const [activeCabin, setActiveCabin] = useState('');
    const [activeCabinArr, setActiveCabinArr] = useState<any>();
    const [activeSlide, setActiveSlide] = useState(0);
    
    const CABINS = ship == "empress" ? EmpressCabins : ship == "sky" ? SkyCabins : ship == "sun" ? SunCabins : [];

    useEffect(() => {
        window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings)
    }, []);

    useEffect(() => {
        if (activeCabin) {
            let arr = CABINS.find((cab) => cab.name == activeCabin);
            setActiveCabinArr(arr)
        }
    }, [cabinModal]);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: window.innerWidth > 640 ? "100px" : "20px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: true,
        dots: true,
        afterChange: (current: any) => setActiveSlide(current),
    };

    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: window.innerWidth > 640 ? "100px" : "20px",
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: false,
        arrows: false,
        dots: true,
        afterChange: (current: any) => setActiveSlide(current),
    };

    // useEffect(() => {
    //     ship == "sky" ? sliderRef.current?.slickGoTo(0) : sliderRef.current?.slickGoTo(1);
    // }, []);

    // Set default cabin for Empress
    // useEffect(() => {
    //     if (ship === "empress") {
    //       setType("Ocean View");
    //       sliderRef.current?.slickGoTo(1); // Move slider to "Ocean View" index
    //     }
    // }, [ship, setType]);

    useEffect(() => {
        const cabinTypes: Record<string, string[]> = {
            sky: ["Chairman's Suite", "Suite", "Mini Suite", "Ocean View", "Interior"],
            sun: ["Chairman's Suite", "Suite", "Mini Suite", "Ocean View", "Interior"],
            empress: ["Chairman's Suite", "Suite", "Mini Suite", "Ocean View", "Interior"],
        };
    
        const selectedCabin = cabinTypes[ship]?.[activeSlide];
        ship === "sky" ? setSkyCabinType(selectedCabin) : ship === "sun" ? setSunCabinType(selectedCabin) : setType(selectedCabin);
    
    }, [activeSlide, ship]);

    const cabinOptions: Record<string, string[]> = {
        empress:  ["Chairman's Suite", "Suite", "Mini Suite", "Ocean View", "Interior"],
        sky: ["Chairman's Suite", "Suite", "Mini Suite", "Ocean View", "Interior"],
        sun: ["Chairman's Suite", "Suite", "Mini Suite", "Ocean View", "Interior"],
    };
      
    const isSelected = (cabin: string) =>
        ship === "sky" ? skyCabinType === cabin : ship === "sun" ? sunCabinType === cabin : type === cabin;
      
    const handleClick = (index: number, cabin: string) => {
        sliderRef.current?.slickGoTo(index);
        ship === "sky" ? setSkyCabinType(cabin) : ship === "sun" ? setSunCabinType(cabin) : setType(cabin);
        
        (cabin == "Ocean View" || cabin == "Interior") && window.innerWidth < 1024 && 
            tabRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
    };

    return (
        <div>
            {ship in cabinOptions && (
                // <div ref={scrollCabinRef} className={`flex justify-between bg-gray-400 rounded-3xl my-5 lg:my-10 lg:mx-auto ${ship === "sun" ? "lg:w-1/2 overflow-x-auto" : "lg:w-2/5"}`}>
                <div ref={scrollCabinRef} className={`flex justify-between bg-gray-400 rounded-3xl my-5 lg:my-10 lg:mx-auto w-full lg:w-3/5 overflow-x-auto`}>
                    {cabinOptions[ship].map((cabin, index) => (
                        <div
                            key={cabin}
                            ref={(el) => (tabRefs.current[index] = el)}
                            onClick={() => handleClick(index, cabin)}
                            className={`py-3 lg:py-3.5 px-4 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium flex-shrink-0 ${
                                isSelected(cabin) ? "text-white bg-brand-gradient" : "text-gray-100"
                            }`}
                        >
                            {cabin}
                        </div>
                    ))}
                </div>
            )}
            {/* {ship == 'empress' ? 
                <div className='flex justify-between bg-gray-400 rounded-3xl my-5 lg:w-2/5 lg:my-10 lg:mx-auto'>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(0);
                            setType('Interior');
                        }}
                        className={`py-3 lg:py-3.5 px-4 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                        type == 'Interior'
                            ? 'text-white bg-brand-primary'
                            : 'text-gray-100'
                        }`}
                    >
                        Interior
                    </div>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(1);
                            setType('Ocean View');
                        }}
                        className={`py-3 px-4 lg:py-3.5 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                        type == 'Ocean View'
                            ? 'text-white bg-brand-primary'
                            : 'text-gray-100'
                        }`}
                    >
                        Ocean View
                    </div>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(2);
                            setType('Mini Suite');
                        }}
                        className={`py-3 px-4 lg:py-3.5 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                        type == 'Mini Suite'
                            ? 'text-white bg-brand-primary'
                            : 'text-gray-100'
                        }`}
                    >
                        Mini Suite
                    </div>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(3);
                            setType('Suite');
                        }}
                        className={`py-3 px-4 lg:py-3.5 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                        type == 'Suite' ? 'text-white bg-brand-primary' : 'text-gray-100'
                        }`}
                    >
                        Suite
                    </div>
                </div>
            : ship == "sky" ? 
                <div className='flex justify-between bg-gray-400 rounded-3xl my-5 lg:w-2/5 lg:my-10 lg:mx-auto'>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(0);
                            setSkyCabinType('Suite');
                        }}
                        className={`py-3 lg:py-3.5 px-4 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                            skyCabinType == 'Suite'
                            ? 'text-white bg-brand-primary'
                            : 'text-gray-100'
                        }`}
                    >
                        Suite
                    </div>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(1);
                            setSkyCabinType('Balcony');
                        }}
                        className={`py-3 px-4 lg:py-3.5 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                            skyCabinType == 'Balcony'
                            ? 'text-white bg-brand-primary'
                            : 'text-gray-100'
                        }`}
                    >
                        Balcony
                    </div>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(2);
                            setSkyCabinType('Ocean View');
                        }}
                        className={`py-3 px-4 lg:py-3.5 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                            skyCabinType == 'Ocean View'
                            ? 'text-white bg-brand-primary'
                            : 'text-gray-100'
                        }`}
                    >
                        Ocean View
                    </div>
                    <div
                        onClick={() => {
                            sliderRef.current?.slickGoTo(3);
                            setSkyCabinType('Inside');
                        }}
                        className={`py-3 px-4 lg:py-3.5 lg:px-6 text-xs rounded-3xl cursor-pointer lg:font-medium ${
                            skyCabinType == 'Inside' ? 'text-white bg-brand-primary' : 'text-gray-100'
                        }`}
                    >
                        Inside
                    </div>
                </div>
                : null
            } */}

            <div className={`mobile-slider cabin ${page == "ship" ? "pb-4 mb-0" : "mb-4"}`}>
                <Slider
                    {...setting}
                    ref={sliderRef}
                >
                    {CABINS.map((val: any, i: any) => {
                        return (
                            <div key={i} onClick={() => {
                                setCabinModal(true)
                                setActiveCabin(val.name)
                            }}>
                                <div className={`lg:flex mr-4 mt-2 lg:mr-10 cursor-pointer shadow-box rounded-lg bg-white overflow-hidden ${page == "ship" ? "min-h-[612px] lg:min-h-[unset] mb-2" : ""}`}>
                                    <div className='w-full lg:w-[48%] h-[246px] lg:h-auto overflow-hidden'>
                                        <img className='h-full w-full object-cover rounded-t' src={window.innerWidth > 640 ? val.image : val.mobileImage} alt="" />
                                    </div>
                                    <div className='w-full lg:w-[52%] text-left px-2 lg:px-4 py-2 lg:py-6'>
                                        <p className='text-lg lg:text-2xl font-bold'>{val.name}</p>
                                        <div className='min-h-[70px] lg:min-h-[90px]'>
                                            <p className='mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'>{val.subtitle}</p>
                                        </div>
                                        <div className='texts'>
                                        <div className='flex flex-wrap mt-3 lg:mt-4 '>
                                            {val.itinerary.slice(0, 6).map((item: any, idx: number) => {
                                                return (
                                                    <div key={idx} className='bg-gray-400 rounded-large px-2 lg:px-2 py-1.5 mr-2 lg:mr-2 mb-2 lg:mb-4 flex items-center'>
                                                        <img className='h-5 lg:h-6 mr-1 lg:mr-2' src={item.icon} alt="" />
                                                        <p className='text-xs lg:text-sm font-medium'>{item.title}</p>
                                                    </div>
                                                )
                                            })}
                                            <div onClick={() => {
                                                setCabinModal(true)
                                                setActiveCabin(val.name)
                                            }} className='bg-brand-gradient rounded-md px-3 lg:px-4 cursor-pointer py-1.5 mr-2 lg:mr-4 mb-2 lg:mb-4 flex items-center'>
                                                <p className='text-xs lg:text-sm font-medium text-white'>View All</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </Slider>
            </div>
            {page !== "ship" && <div className=''>
                <BookNow />
            </div>}

            <Modal show={cabinModal} align={'center'} className=" w-[90%] lg:w-3/4 center overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[80%] relative" onClose={() => {
                setCabinModal(false)
                setActiveCabin('')
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setCabinModal(false)
                        setActiveCabin('')
                    }}>X</p>
                </div>
                {activeCabinArr &&
                    <div className='overflow-scroll h-[90%] lg:h-[85%]  px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded'>
                        <div className='w-[55%] hidden lg:block'>
                            <ImageGallery
                                items={activeCabinArr?.imageArr}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                autoPlay={true}
                                slideInterval={5000}
                                thumbnailPosition={'right'}
                                startIndex={0}
                                lazyLoad={true}
                            />
                        </div>
                        <div className='w-full lg:w-[45%] '>
                            <div className='text-left px-2 lg:px-8 py-2 lg:py-0'>
                                <p className='text-lg lg:text-2xl font-bold'>{activeCabinArr?.name}</p>
                                <p className='mt-2 lg:mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'>{activeCabinArr?.subtitle}</p>
                                <div className='w-full mt-3 lg:hidden'>
                                    <ImageGallery
                                        items={activeCabinArr?.imageArr}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        autoPlay={true}
                                        slideInterval={5000}
                                        startIndex={0}
                                        lazyLoad={true}
                                        showThumbnails={false}
                                    />
                                </div>
                                <div className='flex flex-wrap mt-3 lg:mt-4'>
                                    {activeCabinArr?.itinerary.map((item: any, idx: number) => {
                                        return (
                                            <div key={idx} className='border border-gray-600 rounded-md px-2 lg:px-3 py-1 lg:py-1.5 mr-2 lg:mr-4 mb-2 lg:mb-4 flex items-center'>
                                                <img className='h-4 lg:h-6 mr-1 lg:mr-2' src={item.icon} alt="" />
                                                <p className='text-xxs lg:text-sm font-medium'>{item.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                {activeCabinArr.note &&
                                    <div>
                                        <p className='mt-2 lg:mt-3 text-xs lg:text-base lg:leading-7 text-gray-600'><span className='text-brand-primary font-semibold'>Note: </span>{activeCabinArr.note}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    );
}