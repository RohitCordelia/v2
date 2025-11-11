import React, { useEffect, useState } from 'react'
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { Layout } from '/src/components/Layout';
// @ts-ignore
import Accordian from '/src/components/UI/Accordion/accordion_basic';
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";
import Button from '../../components/UI/Button';

type Props = {}

const lakshadweepShoreExcursion = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-sports-lakshadweep.svg',
        content: 'Watersports'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/snorkel%20and%20scuba-%20lakshadweep.svg',
        content: 'Snorkeling and scuba diving'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/guidance-lakshadweep.svg',
        content: 'Guidance and supervision'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/training-lakshadweep.svg',
        content: 'Training for scuba diving'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/villagetour-lakshadweep.svg',
        content: 'Local village tour'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/island-lakshadweep.svg',
        content: 'Explore the island on your own'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/enjoy-localfood-lakshadweep.svg',
        content: 'Enjoy the local food'
    },
]
const kochiShoreExcursion = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/mantacherry-palace-kochi.svg',
        content: 'Visit the Mantacherry Palace'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/cochin-fort-kochi.svg',
        content: 'Visit Fort Cochin'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/francis-church-kochi.svg',
        content: 'Visit St Francis Church'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/traditional-cooking-kochi.svg',
        content: 'Enjoy traditional cooking and lunch with a local family'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/walking%20tour-kochi.svg',
        content: 'Walking tour of the heritage zone'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/fishingnets-kochi.svg',
        content: 'Learn to operate the fishing nets'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/drive-killian-kochi.svg',
        content: 'Drive to Killian'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/coffee-break-kochi.svg',
        content: 'Enjoy a coffee break before heading back'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/motor-ride-kochi.svg',
        content: 'Enjoy the motor launch ride'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/disembark-kochi.svg',
        content: 'Disembark at Mantacherry'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/dutch-palace-kochi.svg',
        content: 'Visit the synagogue and Dutch Palace'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/jew-town-kochi.svg',
        content: 'Visit Jew Town before heading back to the cruise'
    },
]
const chennaiShoreExcursion = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/elliot%20beach-chennai.svg',
        content: 'Elliot Beach'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/marina%20beach-chennai.svg',
        content: 'Marina Beach'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/temple-chennai.svg',
        content: 'Kapaleeshwarar Temple'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/georgefort-chennai.svg',
        content: 'St. George Fort'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/thomas%20chruch-chennai.svg',
        content: 'St. Thomas Mount'
    },
]
const goaShoreExcursion = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/churches-goa.svg',
        content: 'Visit the iconic churches and landmarks of old Goa'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/culinary-tour-goa.svg',
        content: 'Enjoy the Goan culinary tour'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/traditional-lunch-goa.svg',
        content: 'Enjoy traditional Goan lunch with the locals'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/temples-goa.svg',
        content: 'Visit the temples, the spice plantations'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/citytour-goa.svg',
        content: 'Enjoy the Panjim city tour'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/water-activities-goa.svg',
        content: 'Enjoy shopping along water sports activities like banana boat ride, parasailing, and jet sking'
    },
]
const mumbaiShoreExcursion = [
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/gateway-india-mumbai.svg',
        content: 'Gateway of India'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shivaji-mumbai.svg',
        content: 'Chhatrapati Shivaji Terminus'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/dhobi-mumbai.svg',
        content: 'Dhobi Ghat'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/crawford-market-mumbai.svg',
        content: 'Crawford Market'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/elephanta-caves-mumbai.svg',
        content: 'Elephanta Caves'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/vinayaka-temple-mumbai.svg',
        content: 'Siddhivinayak Temple'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/haji-ali-mumbai.svg',
        content: 'Haji Ali'
    },
    {
        icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/mahalakshmi-temple-mumbai.svg',
        content: 'Mahalakshmi Temple'
    },
]
const hambantotaExcursion = [
    {
        content: "Walk through Galle Dutch Fort",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/galle-dutch-fort-hambantota.svg"
    },
    {
        content: "Experience River Cruise & Turtle Hatchery visit",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/turtle-hambantota.svg"
    },
    {
        content: "Spiritual Experience in Rumassala and Yatagala Temple",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/yatagala-temple-hambantota.svg"
    },
    {
        content: "Yala National Park",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/yala-park-hambantota.svg"
    },
    {
        content: "Bundala National Park",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/bundala-park-hambantota.svg"
    },
    {
        content: "Udawalawe National Park",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/udawalawe-park-hambantota.svg"
    },
    {
        content: "Akuressa Tea Factory / Plantation",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/akuressa-tea-hambantota.svg"
    },
    {
        content: "Unawatuna: Day At The Beach & Shopping",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/unawatuna-beach-hambantota.svg"
    },
    {
        content: "Hike to Diyaluma Waterfall",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/diyaluma-waterfall-hambantota.svg"
    },
    {
        content: "Lord Murugan Temple Tour ",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/murugan-temple-hambantota.svg"
    },
    {
        content: "Hambantota City Tour",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/hambantota-city-tour.svg"
    },
]
const jaffnaExcursion = [
    {
        content: "Glimpse of Jaffna",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/glimpse-jaffna.svg"
    },
    {
        content: "Jaffna Beach with Market Visit",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/beach-jaffna.svg"
    },
    {
        content: "Spiritual Jaffna",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/spiritual-jaffna.svg"
    },
    {
        content: "Stories of War & Peace",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/war-of-peace-jaffna.svg"
    }
]
const TrincomaleeExcursion = [
    {
        content: "Glimpse of Trincomalee",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/glimpse-trincomalee.svg"
    },
    {
        content: "Whale/Dolphin Watching",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/whale-watch-trincomalee.svg"
    },
    {
        content: "Sigiriya",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/sigiriya-rock-trincomalee.svg"
    },
    {
        content: "Polonnaruwa Ancient City",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/polonaruwa-trincomalee.svg"
    },
    {
        content: "Pigeon Island: Snorkeling",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/pigeon-island-trincomalee.svg"
    },
    {
        content: "Minneriya National Park",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/minneriya-park-trincomalee.svg"
    },
    {
        content: "Relax at the beach - Cinnamon Blu or similar",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/beach-trincomalee.svg"
    },
    {
        content: "Thiriyai",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/thirayi-trincomalee.svg"
    },
    {
        content: "Anuradhapura",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/Anuradhapura-trincomalee.svg"
    }
]

const DubaiExcursion = [
    {
        content: "Burj Al Arab tour",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/bruj-al-dubai.svg"
    },
    {
        content: "Souq Al Bahar",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/souq-al-bahar-dubai.svg"
    },
    {
        content: "Visit to Palm Jumeirah",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/plam-jumeira-dubai.svg"
    },
    {
        content: "Aquaventure at Atlantis",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/atlantis-dubai.svg"
    },
    {
        content: "Dubai Marina photoshoot",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/marina-dubai.svg"
    },
    {
        content: "Dubai Mall shopping spree",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/shopping-dubai.svg"
    },
    {
        content: "Dune bashing, camel riding and quad biking",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/quad-biking-dubai.svg"
    },
]
const QutarExcursion = [
    {
        content: "Souq Waqif tour",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/souq-waqif-qatar.svg"
    },
    {
        content: "Museum of Islamic Art",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/museum-qatar.svg"
    },
    {
        content: "The Corniche",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/corniche-qatar.svg"
    },
    {
        content: "Pearl Island tour",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/pearl-island-qatar.svg"
    },
    {
        content: "Katara Cultural Village",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/village-qatar.svg"
    },
    {
        content: "Desert Safari",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/desert-safar-qatar.svg"
    },
    {
        content: "Monster Bus adventure",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/bus-qatar.svg"
    },
]
const AbudhabiExcursion = [
    {
        content: "Sheikh Zayed Mosque",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/mosque-abudhabi.svg"
    },
    {
        content: "Ferrari World Theme Park",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/ferrari-abudhabi.svg"
    },
    {
        content: "Etihad Towers",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/etihad-abudhabi.svg"
    },
    {
        content: "Yas Island Beach Club",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/bech-club-abudhabi.svg"
    },
]
const OmanExcursion = [
    {
        content: "Royal Opera House",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/royal-house-oman.svg"
    },
    {
        content: "Dolphin watching",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/dolphine-oman.svg"
    },
    {
        content: "Desert safari",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/desert-safari-oman.svg"
    },
    {
        content: "Muscat beach escape",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/beach-oman.svg"
    },
]
const BahrainExcursion = [
    {
        content: "Bahrain National Museum",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/museum-bahrain.svg"
    },
    {
        content: "Camel Farm",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/camel-farm-bahrain.svg"
    },
    {
        content: "Bahrain Fort",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/fort-bahrain.svg"
    },
    {
        content: "Military Museum",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/military-museum-bahrain.svg"
    },
    {
        content: "Bahrain Bay",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/bay-bahrain.svg"
    },
    {
        content: "Al Fateh Grand Mosque",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/grand-mosque-bahrain.svg"
    },
    {
        content: "International Circuit",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/race-circuit-bahrain.svg"
    },
    {
        content: "Souq Al Manama",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/souqal-bahrain.svg"
    },
]
const SirBaniExcursion = [
    {
        content: "Wildlife Park safari",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/wildlife-sribaniisland.svg"
    },
    {
        content: "Church and Monastery",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/chruch-sribaniisland.svg"
    },
    {
        content: "Kayaking",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/kayaking-sribaniisland.svg"
    },
    {
        content: "Paddle boarding",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/paddle-sribaniisland.svg"
    },
    {
        content: "Canter truck safari",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/truck-safari-sribaniisland.svg"
    },
    {
        content: "Water sports",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/water-sport-sribaniisland.svg"
    },
]
const KhorExcursion = [
    {
        content: "Shees Park",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/park-fakkan.svg"
    },
    {
        content: "Al Rafisah Dam",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/dam-fakkan.svg"
    },
    {
        content: "Khor Fakkan Waterfall",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/waterfall-fakkan.svg"
    },
    {
        content: "Mountain Safari",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/mountain-fakkan.svg"
    },
    {
        content: "Al Badiyah Mosque",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/mosque-fakkan.svg"
    },
    {
        content: "Bithnah Oasis",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/bithnah-fakkan.svg"
    },
    {
        content: "Najd Al Maqsar heritage village",
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/village-fakkan.svg"
    },
]

const shoreExcursions = {
    Domestic: [
        {
            title: "Lakshadweep",
            description: "Lakshadweep’s magnificence lies underwater with 4200 sq km of archipelago lagoons and coral reefs, making it the only place in India where you can snorkel in the reefs. The unlimited onboard experiences and the numerous excursions make our Lakshadweep cruises extraordinary and unforgettable.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-1-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-2-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/lakshadweep-3-mobile.webp",
            ],
            link: "lakshadweep",
        },
        {
            title: "Mumbai",
            description: "From colonial architecture to high-tech skyscrapers, Mumbai’s skyline is an interesting reflection of history and modernity. Popularly known as the Maximum City, Mumbai is filled with iconic tourist attractions, local and fine-dine restaurants, shopping malls, lanes and beautiful beaches.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-1-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-2-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-3-mobile.webp",
            ],
            link: "mumbai",
        },
        {
            title: "Goa",
            description: "Undoubtedly India’s favorite travel destination, Goa is famous for its tropical vibe, young identity, and cultural adaptations. This Konkan state in the country’s southwestern coast is an interesting mix of sun, sand, and spice. Whether you’re traveling with your family and friends or traveling solo, Goa’s versatility never fails to charm.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/goa-1-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/goa-2-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/goa-3-mobile.webp",
            ],
            link: "goa",
        },
        {
            title: "Kochi",
            description: "Kochi, formerly known as Cochin is Kerala’s commercial capital, and a cosmopolitan city which has brilliantly upheld the distinct cultural and historical identity of the state. A modern reflection of India’s new identity, Kochi is an interesting mix of hilly areas and backwaters attracting travelers and traders.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-1-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-2-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-3-mobile.webp",
            ],
            link: "kochi",
        },
        {
            title: "Chennai",
            description: "Adorned gracefully by numerous beaches, temples, and museums, Chennai is a brilliant reflection of culinary brilliance, cosmopolitan vibes, and timeless traditions. Your visit to this is incomplete without a taste of the authentic South Indian delicacies and a visit to Marina beach.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-1-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-2-mobile.webp",
                "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-3-mobile.webp",
            ],
            link: "chennai",
        },
        {
            title: "Visakhapatnam",
            description: "Visakhapatnam, is a coastal gem that offers pristine beaches, awe-inspiring hills, and rich cultural heritage. Explore the perfect blend of natural beauty and modern development in this vibrant city by the sea.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-visakhapatnam-destination-image.webp",
            ],
            link: "visakhapatnam",
        },
        {
            title: "Puducherry",
            description: "Puducherry, a charming coastal town with French colonial influences, is a serene getaway offering tranquil beaches, vibrant culture, and a blend of both traditional and European charm.",
            images: [
                "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-pondicherry-destination-image-02.webp",
            ],
            link: "pondicherry",
        },
    ],
    International: [
        {
            title: "Sri Lanka",
            description: "Discover the enchanting island of Sri Lanka, where golden beaches meet ancient temples and lush landscapes. Sail to Trincomalee, Hambantota, and Jaffna, immersing yourself in the vibrant culture and breathtaking beauty of this tropical paradise.",
            images: [
                "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-srilanka-destination-image.webp",
            ],
            link: "srilanka",
        },
        {
            title: "Singapore",
            description: "Step into the future with a visit to Singapore, a cosmopolitan city where modernity meets tradition. From its iconic skyline to its lush gardens, Singapore offers an extraordinary urban experience.",
            images: [
                "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-singapore-destination-image-02.webp",
            ],
            link: "southeast-asia-cruises",
        },
        {
            title: "Malaysia",
            description: "Cruise through Malaysia’s stunning coastline, where modern skylines, lush rainforests, and crystal-clear waters create an unforgettable vacation. Explore bustling markets, historic landmarks, and tropical retreats all in one voyage.",
            images: [
                "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-malaysia-destination-image.webp",
            ],
            link: "southeast-asia-cruises",
        },
        {
            title: "Thailand",
            description: "Set sail to Phuket's soft sandy beaches and take in the stunning turquoise waters, showing why it's known as Thailand's crown jewel. The adventurous, lush rainforests and the buzzing nightlife are ready to be explored.",
            images: [
                "http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-thailand-destination-image.webp",
            ],
            link: "southeast-asia-cruises",
        },
    ],
}

export default function HealthWavePolicy({ }: Props) {

    const [name, SetName] = useState('india')
    useMetaTags({
        title: 'Cruise Destinations in India | Cordelia Cruises',
        description: 'Discover top cruise destinations with Cordelia Cruises. Plan your perfect sea vacation with luxury stay, live entertainment, adventure and unforgettable views.',
        metas: [
            {
                name: 'keywords',
                content:
                    'Cruise destinations in India, Cordelia Cruises destinations, Indian cruise vacations, Luxury cruise India, Goa cruises, Lakshadweep cruises, Sri Lanka cruises Mumbai to Lakshadweep cruise, Mumbai to Goa cruises'
            },
        ],
    })
    const [valetOpen, setValetOpen] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let navigate = useNavigate()

    const scrollIntoViewWithOffset = (selector: any, offset: any) => {
        const blue = document.getElementById(selector);
        if (blue) {
            let position = blue!.getBoundingClientRect();
            window.scrollTo({ top: position.top + window.scrollY - offset, behavior: 'smooth' });
        }
    }
    useEffect(() => {
        const startSelector = new window.URLSearchParams(window.location.search).get('d');
        if (startSelector) {
            scrollIntoViewWithOffset(startSelector.toLowerCase(), 120)
        }
    }, [])

    const handleClick = (name: string) => {
        SetName(name)
    }

    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <h1 className='text-2xl lg:text-4xl font-semibold'>Ports & Destinations</h1>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                    A cruise vacation with Cordelia Cruises takes you to some of the most gorgeous Indian and international destinations. A perfect journey deserves a perfect destination.
                </p>
                <div className='py-5 pt-7'>
                    <Button text='Domestic' size='base' type={name === 'india' ? 'primary' : 'secondary'} handleClick={() => handleClick('india')} />
                    <Button text='International' size='base' type={name === 'international' ? 'primary' : 'secondary'} handleClick={() => handleClick('international')} className='ml-2' />
                    {/* <button onClick={() => scrollIntoViewWithOffset('srilanka', 120)}
                        className='lg:text-lg ml-3 text-base text-brand-primary font-bold border-2 border-brand-primary py-3 px-4 rounded'>
                        Sri Lanka
                    </button> */}
                </div>

                {
                    name === 'india' ?
                        <>
                            <div className='border-t-2 my-10 border-gray-300' />
                            <div id='india'>
                                <h2 className='text-2xl lg:text-4xl font-semibold'>India</h2>
                                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                                    It’s a treasure trove of stunning destinations and when you explore it aboard Cordelia Cruise, you experience it in all its glory.
                                </p>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7'>
                                    {shoreExcursions["Domestic"].map((shoreEx) => <div key={shoreEx.title} id='lakshadweep' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7 flex flex-col h-full overflow-hidden'>
                                        <div>
                                            <Glider
                                                hasArrows
                                                hasDots
                                                scrollLock
                                                slidesToShow={1}
                                            >
                                                {shoreEx.images.map((img) => <div key={img}>
                                                    <img className='w-full' src={img} />
                                                </div>)}
                                            </Glider>
                                        </div>
                                        <div className='pt-8 px-3 col-span-2 flex-grow'>
                                            <h3 className='text-xl lg:text-3xl font-semibold'>{shoreEx.title}</h3>
                                            <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                                {shoreEx.description}
                                            </p>
                                        </div>
                                        <div className="px-3 pb-8 mt-auto">
                                            <Button text='Explore Now' size='base' handleClick={() => navigate(`/${shoreEx.link}`)} />
                                        </div>
                                        {/* <div className='border-t-2 my-4 border-gray-300' />
                                        <div className='px-3 flex items-center lg:py-3'>
                                            <Accordian
                                                leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                                openByDefault={false}
                                                disable={false}
                                                title="Shore Excursion Available"
                                                titleClass="lg:text-lg text-base font-bold"
                                                mainClass="cursor-pointer w-full"
                                            >
                                                <div className='mt-4'>
                                                    {lakshadweepShoreExcursion.map((val, i) =>
                                                        <div className='flex items-center py-3' key={i}>
                                                            <div className='w-[5%]'>
                                                                <img className='w-full' src={val.icon} />
                                                            </div>
                                                            <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Accordian>
                                        </div>
                                        <div className='border-t-2 my-5 border-gray-300 lg:mb-[260px] mb-[170px]' />
                                        <div className='absolute bottom-0 w-full'>
                                            <div className='px-3'>
                                                <h4 className='text-xl lg:text-3xl font-medium'>Find a Cruise</h4>
                                                <div className='mt-2 lg:mt-4'>
                                                    <p onClick={() => navigate(`/upcoming-cruises?port=Lakshadweep`)} className='lg:text-xl font-semibold text-brand-primary underline cursor-pointer mt-3'>{`Visiting Lakshadweep >`}</p>
                                                </div>
                                            </div>
                                            <a href='https://maps.app.goo.gl/rpkkvUfvb78iv1nM6' target='_blank' className='w-full min-h-[60px] lg:min-h-[95px] bg-brand-sky/5 grid grid-cols-11 mt-6 rounded-b-md'>
                                                <div className='p-3 lg:p-5 col-span-6 flex items-center'>
                                                    <p className='text-sm lg:text-xl font-semibold lg:font-bold'>Agatti Island</p>
                                                </div>
                                                <div className='col-span-5 bg-brand-sky p-3 rounded-b-md flex items-center justify-center'>
                                                    <div className='flex items-center'>
                                                        <img className='lg:h-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/directions-icon.svg" />
                                                        <p className='text-sm lg:text-lg font-semibold text-white ml-2'>Directions</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div> */}
                                    </div>)}
                                </div>
                            </div>
                        </>
                        : null
                }

                {name === 'international' ?
                    <>
                        <div className='border-t-2 my-10 border-gray-300' />
                        <div id='international'>
                            <h1 className='text-2xl lg:text-4xl font-semibold'>International</h1>
                            <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                                {/* Set sail on a captivating Middle Eastern voyage as you cruise aboard The Empress. Immerse yourself in a rich mosaic of cultural treasures, architectural wonders, and breathtaking landscapes, creating memories that will last a lifetime. */}
                            </p>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7'>
                                {shoreExcursions["International"].map((shoreEx) => <div key={shoreEx.title} id='Sri-Lanka' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7 flex flex-col h-full overflow-hidden'>
                                    <div>
                                        <Glider
                                            hasArrows
                                            hasDots
                                            scrollLock
                                            slidesToShow={1}
                                        >
                                            {shoreEx.images.map((img) => <div key={img}>
                                                <img className='w-full' src={img} alt={shoreEx.title} />
                                            </div>)}
                                        </Glider>
                                    </div>
                                    <div className='pt-8 px-3 col-span-2 pb-1 flex-grow'>
                                        <h1 className='text-xl lg:text-3xl font-semibold'>{shoreEx.title}</h1>
                                        <p className='mt-3 lg:leading-8 leading-7 font-medium text-sm lg:text-lg'>
                                            {shoreEx.description}
                                        </p>
                                    </div>
                                    <div className="p-3 pb-8 mt-auto">
                                        <Button text='Explore Now' size='base' handleClick={() => navigate(`/${shoreEx.link}`)} />
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </> : null}
                {/* <div id='qatar' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <Glider
                                    hasArrows
                                    hasDots
                                    scrollLock
                                    slidesToShow={1}
                                >
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/qatar-1-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/qatar-2-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/qatar-3-mobile.webp" />
                                    </div>
                                </Glider>
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h1 className='text-xl lg:text-3xl font-semibold'>Qatar</h1>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Immerse in Qatar's cultural tapestry, where ancient traditions blend with modern innovation. Cruise to this enchanting Middle Eastern destination and explore the thrilling desert safari and vibrant Souq Waqif...
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300' />
                            <div className='px-3 flex items-center justify-between lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {QutarExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[75px] mb-[75px]' />
                            <div className='absolute bottom-0 w-full'>
                                <div className='px-3 pb-6'>
                                    <h1 className='text-xl lg:text-3xl font-semibold text-brand-primary'>Sailing from June 2024</h1>
                                </div>
                            </div>
                        </div>
                        <div id='abu dhabi' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <Glider
                                    hasArrows
                                    hasDots
                                    scrollLock
                                    slidesToShow={1}
                                >
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/abudhabi-1-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/abudhabi-2-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/abudhabi-3-mobile.webp" />
                                    </div>
                                </Glider>
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h1 className='text-xl lg:text-3xl font-semibold'>Abu Dhabi</h1>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Prepare to be captivated by the grandeur of Abu Dhabi, the capital of the United Arab Emirates. From the magnificent Sheikh Zayed Mosques to the thrilling Ferrari World Theme Park, this city offers a perfect blend of history and adventure.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {AbudhabiExcursion.map((val, i) =>
        Dubai                                    <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[75px] mb-[75px]' />
                            <div className='absolute bottom-0 w-full'>
                                <div className='px-3 pb-6'>
                                    <h1 className='text-xl lg:text-3xl font-semibold text-brand-primary'>Sailing from June 2024</h1>
                                </div>
                            </div>
                        </div>
                        <div id='oman' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <Glider
                                    hasArrows
                                    hasDots
                                    scrollLock
                                    slidesToShow={1}
                                >
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/oman-1-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/oman-2-mobile.webp" />
                                    </div>
                                </Glider>
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h1 className='text-xl lg:text-3xl font-semibold'>Oman</h1>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Embark on a journey to Oman, a land of dramatic landscapes, ancient forts, and vibrant souqs. Immerse yourself in the rich Arabian heritage and experience the warm hospitality of this captivating country.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300 lg:mt-12' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {OmanExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[75px] mb-[75px]' />
                            <div className='absolute bottom-0 w-full'>
                                <div className='px-3 pb-6'>
                                    <h1 className='text-xl lg:text-3xl font-semibold text-brand-primary'>Sailing from June 2024</h1>
                                </div>
                            </div>
                        </div>
                        <div id='bahrain' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <Glider
                                    hasArrows
                                    hasDots
                                    scrollLock
                                    slidesToShow={1}
                                >
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/bahrain-1-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/bahrain-2-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/bahrain-3-mobile.webp" />
                                    </div>
                                </Glider>
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h1 className='text-xl lg:text-3xl font-semibold'>Bahrain</h1>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Uncover the hidden treasures of Bahrain, an island nation where modernity dances with ancient history. Lose yourself in the enchanting Souq Al Manama, explore the iconic Bahrain bay, and immerse yourself in unforgettable cultural experiences that will ignite your sense of wonder.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {BahrainExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[75px] mb-[75px]' />
                            <div className='absolute bottom-0 w-full'>
                                <div className='px-3 pb-6'>
                                    <h1 className='text-xl lg:text-3xl font-semibold text-brand-primary'>Sailing from June 2024</h1>
                                </div>
                            </div>
                        </div>
                        <div id='sir bani yas' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <Glider
                                    hasArrows
                                    hasDots
                                    scrollLock
                                    slidesToShow={1}
                                >
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/sirbaniyasisland-1-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/sirbaniyasisland-2-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/sirbaniyasisland-3-mobile.webp" />
                                    </div>
                                </Glider>
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h1 className='text-xl lg:text-3xl font-semibold'>Sir Bani Yas Island</h1>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Embark on an exhilarating escape to the untouched paradise of Sir Bani Yas Island. Surrender to the allure of its pristine shores, where captivating landscapes unfold and encounters with mesmerising wildlife await.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300 lg:mt-12' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {SirBaniExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[75px] mb-[75px]' />
                            <div className='absolute bottom-0 w-full'>
                                <div className='px-3 pb-6'>
                                    <h1 className='text-xl lg:text-3xl font-semibold text-brand-primary'>Sailing from June 2024</h1>
                                </div>
                            </div>
                        </div> */}
                {/* <div id='khor fakkan' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <Glider
                                    hasArrows
                                    hasDots
                                    scrollLock
                                    slidesToShow={1}
                                >
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/fakkan-1-mobile.webp" />
                                    </div>
                                    <div>
                                        <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/fakkan-2-mobile.webp" />
                                    </div>
                                </Glider>
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h1 className='text-xl lg:text-3xl font-semibold'>Khor Fakkan</h1>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Discover the hidden gem of Khor Fakkan, a tranquil coastal town nestled between the rugged mountains and the azure waters of the Arabian Sea. Immerse yourself in its breathtaking natural beauty, from the picturesque Shees Park...
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {KhorExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[145px] mb-[105px]' />
                            <div className='absolute bottom-0 w-full lg:mb-10 mb-6'>
                                <div className='px-3'>
                                    <h1 className='text-xl lg:text-3xl font-medium'>Find a Cruise</h1>
                                    <div className='mt-2 lg:mt-4'>
                                        <p onClick={() => navigate(`/upcoming-cruises?port=Khor Fakkan`)} className='lg:text-xl font-semibold text-brand-primary underline cursor-pointer mt-3'>{`Visiting Khor Fakkan >`}</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                {/* </div>
                </div> */}

                {/* <div className='border-t-2 my-16 border-gray-300' />
                <div id='srilanka'>
                    <h2 className='text-2xl lg:text-4xl font-semibold'>Sri Lanka</h2>
                    <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                        Come aboard for an extraordinary cruise that transcends time - where mythical tales of the past become a part of your reality, as you explore the best-kept secrets of Jaffna, Trincomalee and Hambantota. You are in for an unforgettable adventure!
                    </p>
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-7'>
                        <div id='hambantota' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota.webp" />
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h3 className='text-xl lg:text-3xl font-semibold'>Hambantota</h3>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    A captivating journey through Hambantota's diverse landscapes and rich heritage is awaiting your arrival! Explore the ancient cobblestone streets of Galle Dutch Fort, cruise the serene waters of the Walawe River, and discover spiritual solace at Rumassala and Yatagala Temple. From thrilling safaris in national parks to peaceful beaches in Unawatuna, every moment in Hambantota is an unforgettable adventure.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300 lg:mt-12' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {hambantotaExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[150px] mb-[110px]' />
                            <div className='absolute bottom-0 w-full lg:mb-10 mb-6'>
                                <div className='px-3'>
                                    <h4 className='text-xl lg:text-3xl font-medium'>Find a Cruise</h4>
                                    <div className='mt-2 lg:mt-4'>
                                        <p onClick={() => navigate(`/upcoming-cruises?port=Hambantota`)} className='lg:text-xl font-semibold text-brand-primary underline cursor-pointer mt-3'>{`Visiting Hambantota >`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='jaffna' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna.webp" />
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h3 className='text-xl lg:text-3xl font-semibold'>Jaffna</h3>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Immerse yourself in the rhythm of Jaffna, where history whispers through the weathered walls of Jaffna Fort, and sacred sites like Nallur Kandaswamy temple and Nagadeepa Vihara offer glimpses into the spiritual heart of the city. With bustling markets where vendors peddle their wares with infectious enthusiasm, and kitchens imparting the fiery kick of authentic Jaffna crab curry, prepare your senses for an enchanting city that will linger in your heart forever.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {jaffnaExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[150px] mb-[110px]' />
                            <div className='absolute bottom-0 w-full lg:mb-10 mb-6'>
                                <div className='px-3'>
                                    <h4 className='text-xl lg:text-3xl font-medium'>Find a Cruise</h4>
                                    <div className='mt-2 lg:mt-4'>
                                        <p onClick={() => navigate(`/upcoming-cruises?port=Jaffna`)} className='lg:text-xl font-semibold text-brand-primary underline cursor-pointer mt-3'>{`Visiting Jaffna >`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='trincomalee' className='relative rounded-lg border border-gray-300/40 shadow-md mt-7 lg:mt-7'>
                            <div>
                                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee.webp" />
                            </div>
                            <div className='pt-8 px-3 col-span-2'>
                                <h3 className='text-xl lg:text-3xl font-semibold'>Trincomalee</h3>
                                <p className='mt-3 lg:leading-8 lg:pb-5 leading-7 font-medium text-sm lg:text-lg'>
                                    Trincomalee, or "Trinco" to the locals, is a story to be unveiled. As you glide past the natural harbour, you'll be welcomed by the ever-imposing Swami Rock stand as a silent sentinel, hinting at the town's rich history. You'll weave through overflowing markets and bustling streets, where exotic spices and handcrafted treasures await your arrival. But Trincomalee's magic extends beyond the surface. Dive beneath the waves, where a dazzling world awaits. Coral reefs teeming with life fringe the shores, beckoning snorkelers, and divers to explore this underwater paradise.
                                </p>
                            </div>
                            <div className='border-t-2 my-4 border-gray-300' />
                            <div className='px-3 flex items-center lg:py-3'>
                                <Accordian
                                    leftIcon="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                                    openByDefault={false}
                                    disable={false}
                                    title="Shore Excursion Available"
                                    titleClass="lg:text-lg text-base font-bold"
                                    mainClass="cursor-pointer w-full"
                                >
                                    <div className='mt-4'>
                                        {TrincomaleeExcursion.map((val, i) =>
                                            <div className='flex items-center py-3' key={i}>
                                                <div className='w-[5%]'>
                                                    <img className='w-full' src={val.icon} />
                                                </div>
                                                <p className='w-[95%] text-base font-semibold ml-2 lg:ml-3'>{val.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </Accordian>
                            </div>
                            <div className='border-t-2 my-5 border-gray-300 lg:mb-[150px] mb-[110px]' />
                            <div className='absolute bottom-0 w-full lg:mb-10 mb-6'>
                                <div className='px-3'>
                                    <h4 className='text-xl lg:text-3xl font-medium'>Find a Cruise</h4>
                                    <div className='mt-2 lg:mt-4'>
                                        <p onClick={() => navigate(`/upcoming-cruises?port=Trincomalee`)} className='lg:text-xl font-semibold text-brand-primary underline cursor-pointer mt-3'>{`Visiting Trincomalee >`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
            <ExitIntent />
        </Layout>
    );
}