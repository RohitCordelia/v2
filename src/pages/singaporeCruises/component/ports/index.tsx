import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};

const PortDetail = [
    {
        name: "Chennai, India",
        subTitle: "Anticipation peaks, adrenaline pumps!",
        desc: "With excitement building, the journey begins at Chennai Port. After settling in, enjoy a wide array of delicious food, world-class beverages, and more, as the ship sets sail toward the vibrant shores of Phuket, Thailand.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-chennai-image-01-desktop.webp",
        shoreEx: [],
        mapLink: "https://goo.gl/maps/h9hNUj5M7F5S9vNp7"
    },
    {
        name: "Phuket, Thailand",
        link: 'Phuket',
        mapLink: "https://maps.app.goo.gl/uu4Ab9617qZWWr1SA",
        subTitle: "Zesty like the chilies it produces",
        desc: "Indulge in Phuket’s paradise—soft sandy beaches, turquoise waters, and lush rainforests teeming with adventure. As the sun sets, experience the island’s vibrant nightlife, where the energy never fades. Thailand’s crown jewel awaits!",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-phuket-image-02-desktop.webp",
        shoreEx: [
            {
                title: "Phuket City Tour",
                subTitle: "Enjoy the Phuket City Tour, visiting the stunning Kata View Point, exploring Old Phuket Town, and the Big Buddha and Chalong Temple. Enjoy a photo opportunity with an elephant, and stop by a Cashew Nuts Factory, Honey Farm, and local souvenir shops for a perfect blend of culture and local treasures.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-old-phuket-buddha-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-chalong-temple-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-kata-view-point-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-old-phuket-buddha-desktop.webp'
                ]
            },
            {
                title: "James Bond Island Tour",
                subTitle: "Enjoy the adventure to James Bond Island, cruising through the speedboat. Explore the famous limestone karsts, hidden caves, and crystal-clear waters that make this spot iconic. Along the way, enjoy a packed local lunch, surrounded by nature's beauty.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/HKT02-jamesbond-island-desktop.webp"]
            },
            {
                title: "Fantasea Tour",
                subTitle: "Experience a magical evening at the Phuket Fantasea Show. Enjoy convenient transfer to the venue, where you'll have access to standard seating for the spectacular performance. Savour a delicious international buffet dinner, making for a perfect night of entertainment and cuisine.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT03-fantasea-show-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT03-fantasea-show-desktop.webp'
                ]
            },
            {
                title: "Phuket Carnival Magic ",
                subTitle: "Step into a world of dazzling lights, grand parades, and cultural extravaganza at Phuket Carnival Magic. Witness breath taking performances, vibrant floats, and state-of-the-art special effects in this one-of-a-kind night-time festival. Indulge in a delicious meal with an included dinner coupon, making this an unforgettable evening of entertainment and spectacle.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/HKT04-carnival-magic-tickets-desktop.webp"]
            },
            {
                title: "Phuket City Tour & Dolphin Show",
                subTitle: "Embark on an unforgettable tour, starting with the breath-taking views from Kata View Point. Explore the charm of Old Phuket Town, the iconic Big Buddha, and the serene Chalong Temple. End the day with a delightful Dolphin show and a stop at a local souvenir shop.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT05-dolphin-show-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-cashew-nuts-factory-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-chalong-temple-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-kata-view-point-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-old-phuket-buddha-desktop.webp',
                ]
            },
            {
                title: "Phuket Adventure Trip",
                subTitle: "Dive into adventure with a thrilling Phuket Adventure Trip! Enjoy a 5km rafting experience, ride an ATV for 30 minutes through rugged terrain, explore the beautiful waterfall, and visit the famous Suwankuha Temple (Monkey Cave), all in one action-packed day.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT06-phuket-adventure-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT06-suwan-kuha-desktop.webp',
                ]
            },
            {
                title: "Patong Beach",
                subTitle: "Experience the leisure of Patong Beach with convenient pick-up and drop-off at Jung Ceylon Mall. Relax on the beach, explore the area, and soak in the vibrant atmosphere of Patong at your own pace.",
                image: [
                    ' https://images.cordeliacruises.com/cordelia_v2/public/images/HKT07-patong-beach-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT07-patong-beach-desktop.webp',
                ]
            }
        ]
    },
    {
        name: 'Langkawi, Malaysia',
        link: 'Langkawi',
        subTitle: "An archipelago of allure",
        desc: "Welcome to Langkawi, the Jewel of Kedah, where nature's artistry unfolds. With emerald waters, serene beaches, and lush mangroves, Langkawi offers a canvas of tranquility and adventure. Ascend the iconic Sky Bridge for panoramic views, explore the mystical legends of the island, or simply unwind amidst its tropical charm. Langkawi is where moments turn into timeless memories.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-langkawi-image-03-desktop.webp",
        mapLink: "https://maps.app.goo.gl/MxbrsFrw9KRRpTXc6",
        shoreEx: [
            {
                title: "Langkawi Island City Tour",
                subTitle: "Enjoy the Langkawi City Tour, starting with the iconic Eagle Square and its stunning waterfront views. Explore the vibrant Atma Alam Batik Village, where you can witness traditional Batik art. This tour offers a perfect mix of culture, shopping, and natural beauty.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-eagle-square-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-02-kuah-town-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-eagle-square-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-gamat-healing-factory-mobile.webp',
                ]
            },
            {
                title: "Langkawi Underwater World & Langkawi City Tour",
                subTitle: "Experience the best of Langkawi, starting with a visit to the fascinating Underwater World, home to diverse marine life. Explore the lively Kuah Town for shopping and local sights, then head to Atma Alam Batik Village to admire and purchase beautiful handcrafted Batik art.",
                image: ['https://images.cordeliacruises.com/cordelia_v2/public/images/LGK02-03-underwater-world-desktop.webp']
            },
            {
                title: "Langkawi Skyview Tour",
                subTitle: "Discover a world of excitement, with mind-bending 3D art at the gallery, a thrilling experience at Sky Dome, and an adrenaline-pumping adventure on Sky Rex. Cap it off with a stunning Sky Cab ride offering panoramic views of the island’s beauty from above.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-sky-rex-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-gamat-healing-factory-mobile.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK02-03-underwater-world-desktop.webp'
                ],
            },
            {
                title: "Langkawi Wildlife & Bird Park",
                subTitle: "Explore the Langkawi Wildlife & Bird Park, home to over 250 species of birds and animals. Enjoy a unique, immersive experience with interactive exhibits, lush landscapes, and opportunities to feed and interact with the wildlife.",
                image: [
                    'http://images.cordeliacruises.com/cordelia_v2/public/images/langkawi-itinerary-wildlife-shorex.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-skycab-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-sky-dome-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-sky-rex-desktop.webp',
                ]
            },
            {
                title: "Island Hoping/Mangrove Tour",
                subTitle: "Set off for an adventure, starting with a transfer to the dock at Kilim or Tg Rhu. Hop on a traditional speedboat for a scenic ride, exploring the natural beauty and tranquil waters of Langkawi. A perfect blend of relaxation and exploration!",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK05-kilim-tgrhu-desktop.webp',

                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK05-mangrove-tour-desktop.webp',

                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK05-normal-speed-boat-mobile.webp',
                ]
            }
        ]
    },
    {
        name: 'Kuala Lumpur',
        link: 'Kuala Lumpur',
        subTitle: "A Shopper's Paradise",
        desc: "Experience the thrill of shopping in Kuala Lumpur, where luxurious malls, vibrant markets, and unique boutiques offer everything from high-end fashion to local treasures, making it a true retail haven.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-malaysia-image-04-mobile.webp",
        shoreEx: [
            {
                title: "Kuala Lumpur City Tour ",
                subTitle: "Explore Kuala Lumpur’s highlights on this guided tour. Capture stunning photos at the King’s Palace, National Monument, Independence Square, and Petronas Twin Towers. Enjoy a shopping stop at the Chocolate Boutique and a scenic drive through Chinatown. Includes English-speaking guide, return transfers, and drinking water.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-twin-towers-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-chocolate-boutique-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-kings-palace-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-national-monument-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-twin-towers-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-independence-square-desktop.webp',
                ]
            },
            {
                title: "Kuala Lumpur City Tour + Batu Caves ",
                subTitle: "Discover the vibrant city of Kuala Lumpur, visiting iconic landmarks like the Petronas Towers and bustling markets. Then, head to the stunning Batu Caves, a sacred Hindu site with impressive limestone caves and a towering statue of Lord Murugan.",
                image: ["http://images.cordeliacruises.com/cordelia_v2/public/images/malaysia-itinerary-batu-caves-shorex.webp"]
            },
            {
                title: "Kuala Lumpur Tower and City Tour ",
                subTitle: "Experience Kuala Lumpur’s top sights in one tour! Visit the King’s Palace, National Monument, and Petronas Twin Towers for perfect photo stops. Enjoy a shopping stop at the Chocolate Boutique and a drive through Chinatown. Then, head to the KL Tower Observation & Sky Deck for panoramic city views. Includes English-speaking guide, return transfers, and drinking water.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL02-03-KL-tower-tour-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-chocolate-boutique-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-kings-palace-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-national-monument-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-twin-towers-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL02-03-KL-tower-tour-desktop.webp',
                ]
            },
            {
                title: " Sunway Lagoon Theme Park",
                subTitle: "Enjoy thrills and spills at Sunway Lagoon, Malaysia’s premier theme park! Dive into exciting rides, water attractions, and adventure zones for all ages. Includes entry tickets, an English-speaking guide, return transfers, and drinking water.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/KUL04-sunway-lagoon-theme-park-desktop.webp"]
            }
        ],
        mapLink: "https://maps.app.goo.gl/Pbdm5uac9zHqGFDz8"
    },
    {
        name: 'Singapore',
        link: 'Singapore',
        subTitle: "For its size, it packs a punch",
        desc: "Singapore, a dazzling city-state that leaves you spellbound. Immerse yourself in its vibrant energy, explore stunning gardens, indulge in hawker food stalls, and shop from high-end brands to bustling night markets. The endless possibilities of things you can do in Singapore are mind-blowing.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-image-05-desktop.webp",
        mapLink: "https://maps.app.goo.gl/xRDeR4rS6uS2Cns89",
        shoreEx: [
            {
                title: "City tour ",
                subTitle: "Step into Singapore’s rich history with an immersive experience. Stroll through the vibrant streets of Little India and Chinatown, where tradition meets modernity. Visit the iconic Merlion Park and a scenic drive down Orchard Road, Singapore’s premier shopping district. This comes with an English speaking guide and transfers.",
                image: ["http://images.cordeliacruises.com/cordelia_v2/public/images/SIN01-china-town-new-desktop.webp"]
            },
            {
                title: "Gardens By the Bay tour",
                subTitle: "Immerse yourself in Singapore’s stunning urban nature. Visit the iconic Gardens by the Bay, where you’ll explore the Flower Dome and the misty Cloud Forest, home to breathtaking waterfalls and exotic plants. In the evening, witness the dazzling Garden Rhapsody light show along with a panoramic view of the city skyline. This comes with an English speaking guide and transfers.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN02-gardens-bay-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN02-flower-dome-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN02-cloud-forest-desktop.webp',
                ]
            },
            {
                title: "Singapore Flyer tour",
                subTitle: "Enjoy the unparalleled views of Singapore’s skyline. Step into the Singapore Flyer, one of the world’s largest observation wheels, and take a ride in the Time Capsule, a multisensory experience showcasing Singapore’s past, present, and future. This comes with an English speaking guide and transfers.",
                image: ["http://images.cordeliacruises.com/cordelia_v2/public/images/singapore-Itinerary-flyer-tour-shorex.webp"]
            },
            // {
            //     title: "Singapore Flyer tour",
            //     subTitle: "Enjoy the unparalleled views of Singapore’s skyline. Step into the Singapore Flyer, one of the world’s largest observation wheels, and take a ride in the Time Capsule, a multisensory experience showcasing Singapore’s past, present, and future. This comes with an English speaking guide and transfers.",
            //     image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN03-time-capsule-desktop.webp"]
            // },
            {
                title: "Marina bay sands sky deck tour",
                subTitle: "This experience takes you to one of Singapore’s most famous landmarks—Marina Bay Sands SkyPark. Soak in breath taking 360-degree views of the city from the observation deck, perched high above the Marina Bay waterfront. A must-visit for stunning photo opportunities! This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN04-sky-deck-entrance-desktop.webp"]
            },
            {
                title: "Night Safari with Dinner Tour ",
                subTitle: "Embark on a thrilling night-time wildlife adventure where you visit the world-famous Night Safari. Hop on a tram ride that takes you through different geographical zones, bringing you face-to-face with creatures of the night. This tour also includes a dinner coupon, making it a perfect way to experience Singapore’s wildlife after dark. This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN05-night-safari-desktop.webp"]
            },
            {
                title: "Bird Paradise tour",
                subTitle: "Experience the beauty of Singapore’s Bird Paradise where you wander through themed aviaries and witness exotic birds in their natural habitats making it a fun and relaxing way to explore one of the world’s most impressive bird parks. This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN06-bird-paradise-desktop.webp"]
            },
            {
                title: "Universal Studios Tour",
                subTitle: "Step into the world of movies at Universal Studios Singapore on this full-day tour! Enjoy adrenaline-pumping rides, live entertainment, and immersive themed zones, from Jurassic Park to Transformers. Whether you’re a thrill-seeker or a fan of Hollywood blockbusters, this adventure promises non-stop excitement. This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN07-universal-studios-entrance-mobile.webp"]
            },
            {
                title: "Sentosa Island Tour",
                subTitle: "Enjoy the best of adventure at Sentosa Island. Ride the Cable Car for scenic island views, and visit the famous Madame Tussauds Wax Museum. End the day with the spectacular Wings of Time light and water show. This comes with an English speaking guide and transfers.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-cable-car-ticket-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-madame-tussauds-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-singapore-images-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-sky-luge-ride-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-wings-of-time-desktop.webp',
                ]
            },
            // {
            //     title: "Sentosa Island Tour",
            //     subTitle: "Experience the thrill of Sentosa Island in an adventurous tour. Ride the Cable Car for scenic island views, and visit the famous Madame Tussauds Wax Museum. Experience the Sky & Luge ride for an adrenaline rush and end the day with the spectacular Wings of Time light and water show. This comes with an English speaking guide and transfers.",
            //     image: []
            // },

        ]
    }
]

const PortDetailMobile = [
    {
        name: "Chennai, India",
        subTitle: "Anticipation peaks, adrenaline pumps!",
        desc: "With excitement building, the journey begins at Chennai Port. After settling in, enjoy a wide array of delicious food, world-class beverages, and more, as the ship sets sail toward the vibrant shores of Phuket, Thailand.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-chennai-image-01-desktop.webp",
        shoreEx: [],
        mapLink: "https://goo.gl/maps/h9hNUj5M7F5S9vNp7"
    },
    {
        name: "Phuket, Thailand",
        link: 'Phuket',
        subTitle: "Zesty like the chilies it produces",
        desc: "Indulge in Phuket’s paradise—soft sandy beaches, turquoise waters, and lush rainforests teeming with adventure. As the sun sets, experience the island’s vibrant nightlife, where the energy never fades. Thailand’s crown jewel awaits!",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-phuket-image-02-desktop.webp",
        mapLink: "https://maps.app.goo.gl/uu4Ab9617qZWWr1SA",
        shoreEx: [
            {
                title: "Phuket City Tour",
                subTitle: "Enjoy the Phuket City Tour, visiting the stunning Kata View Point, exploring Old Phuket Town, and the Big Buddha and Chalong Temple. Enjoy a photo opportunity with an elephant, and stop by a Cashew Nuts Factory, Honey Farm, and local souvenir shops for a perfect blend of culture and local treasures.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-old-phuket-buddha-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-chalong-temple-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-kata-view-point-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-old-phuket-buddha-desktop.webp'
                ]
            },
            {
                title: "James Bond Island Tour",
                subTitle: "Enjoy the adventure to James Bond Island, cruising through the speedboat. Explore the famous limestone karsts, hidden caves, and crystal-clear waters that make this spot iconic. Along the way, enjoy a packed local lunch, surrounded by nature's beauty.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/HKT02-jamesbond-island-desktop.webp"]
            },
            {
                title: "Fantasea Tour",
                subTitle: "Experience a magical evening at the Phuket Fantasea Show. Enjoy convenient transfer to the venue, where you'll have access to standard seating for the spectacular performance. Savour a delicious international buffet dinner, making for a perfect night of entertainment and cuisine.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT03-fantasea-show-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT03-fantasea-show-desktop.webp'
                ]
            },
            {
                title: "Phuket Carnival Magic ",
                subTitle: "Step into a world of dazzling lights, grand parades, and cultural extravaganza at Phuket Carnival Magic. Witness breath taking performances, vibrant floats, and state-of-the-art special effects in this one-of-a-kind night-time festival. Indulge in a delicious meal with an included dinner coupon, making this an unforgettable evening of entertainment and spectacle.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/HKT04-carnival-magic-tickets-desktop.webp"]
            },
            {
                title: "Phuket City Tour & Dolphin Show",
                subTitle: "Embark on an unforgettable tour, starting with the breath-taking views from Kata View Point. Explore the charm of Old Phuket Town, the iconic Big Buddha, and the serene Chalong Temple. End the day with a delightful Dolphin show and a stop at a local souvenir shop.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT05-dolphin-show-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-cashew-nuts-factory-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-chalong-temple-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-kata-view-point-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT01-05-old-phuket-buddha-desktop.webp',
                ]
            },
            {
                title: "Phuket Adventure Trip",
                subTitle: "Dive into adventure with a thrilling Phuket Adventure Trip! Enjoy a 5km rafting experience, ride an ATV for 30 minutes through rugged terrain, explore the beautiful waterfall, and visit the famous Suwankuha Temple (Monkey Cave), all in one action-packed day.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT06-phuket-adventure-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT06-suwan-kuha-desktop.webp',
                ]
            },
            {
                title: "Patong Beach",
                subTitle: "Experience the leisure of Patong Beach with convenient pick-up and drop-off at Jung Ceylon Mall. Relax on the beach, explore the area, and soak in the vibrant atmosphere of Patong at your own pace.",
                image: [
                    ' https://images.cordeliacruises.com/cordelia_v2/public/images/HKT07-patong-beach-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/HKT07-patong-beach-desktop.webp',
                ]
            }
        ]
    },
    {
        name: 'Langkawi, Malaysia',
        link: 'Langkawi',
        subTitle: "An archipelago of allure",
        desc: "Welcome to Langkawi, the Jewel of Kedah, where nature's artistry unfolds. With emerald waters, serene beaches, and lush mangroves, Langkawi offers a canvas of tranquility and adventure. Ascend the iconic Sky Bridge for panoramic views, explore the mystical legends of the island, or simply unwind amidst its tropical charm. Langkawi is where moments turn into timeless memories.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-langkawi-image-03-desktop.webp",
        mapLink: "https://maps.app.goo.gl/MxbrsFrw9KRRpTXc6",
        shoreEx: [
            {
                title: "Langkawi Island City Tour",
                subTitle: "Enjoy the Langkawi City Tour, starting with the iconic Eagle Square and its stunning waterfront views. Explore the vibrant Atma Alam Batik Village, where you can witness traditional Batik art. This tour offers a perfect mix of culture, shopping, and natural beauty.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-eagle-square-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-02-kuah-town-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-eagle-square-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-gamat-healing-factory-mobile.webp',
                ]
            },
            {
                title: "Langkawi Underwater World & Langkawi City Tour",
                subTitle: "Experience the best of Langkawi, starting with a visit to the fascinating Underwater World, home to diverse marine life. Explore the lively Kuah Town for shopping and local sights, then head to Atma Alam Batik Village to admire and purchase beautiful handcrafted Batik art.",
                image: ['https://images.cordeliacruises.com/cordelia_v2/public/images/LGK02-03-underwater-world-desktop.webp']
            },
            {
                title: "Langkawi Skyview Tour",
                subTitle: "Discover a world of excitement, with mind-bending 3D art at the gallery, a thrilling experience at Sky Dome, and an adrenaline-pumping adventure on Sky Rex. Cap it off with a stunning Sky Cab ride offering panoramic views of the island’s beauty from above.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-sky-rex-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK01-03-gamat-healing-factory-mobile.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK02-03-underwater-world-desktop.webp'
                ],
            },
            {
                title: "Langkawi Wildlife & Bird Park",
                subTitle: "Explore the Langkawi Wildlife & Bird Park, home to over 250 species of birds and animals. Enjoy a unique, immersive experience with interactive exhibits, lush landscapes, and opportunities to feed and interact with the wildlife.",
                image: [
                    'http://images.cordeliacruises.com/cordelia_v2/public/images/langkawi-itinerary-wildlife-shorex.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-skycab-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-sky-dome-desktop.webp',
                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK04-sky-rex-desktop.webp',
                ]
            },
            {
                title: "Island Hoping/Mangrove Tour",
                subTitle: "Set off for an adventure, starting with a transfer to the dock at Kilim or Tg Rhu. Hop on a traditional speedboat for a scenic ride, exploring the natural beauty and tranquil waters of Langkawi. A perfect blend of relaxation and exploration!",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK05-kilim-tgrhu-desktop.webp',

                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK05-mangrove-tour-desktop.webp',

                    // 'https://images.cordeliacruises.com/cordelia_v2/public/images/LGK05-normal-speed-boat-mobile.webp',
                ]
            },
        ]
    },
    {
        name: 'Kuala Lumpur',
        link: 'Kuala Lumpur',
        subTitle: "A Shopper's Paradise",
        desc: "Experience the thrill of shopping in Kuala Lumpur, where luxurious malls, vibrant markets, and unique boutiques offer everything from high-end fashion to local treasures, making it a true retail haven.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-malaysia-image-04-mobile.webp",
        mapLink: "https://maps.app.goo.gl/Pbdm5uac9zHqGFDz8",
        shoreEx: [
            {
                title: "Kuala Lumpur City Tour ",
                subTitle: "Explore Kuala Lumpur’s highlights on this guided tour. Capture stunning photos at the King’s Palace, National Monument, Independence Square, and Petronas Twin Towers. Enjoy a shopping stop at the Chocolate Boutique and a scenic drive through Chinatown. Includes English-speaking guide, return transfers, and drinking water.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-twin-towers-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-chocolate-boutique-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-kings-palace-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-national-monument-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-twin-towers-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-independence-square-desktop.webp',
                ]
            },
            {
                title: "Kuala Lumpur City Tour + Batu Caves ",
                subTitle: "Discover the vibrant city of Kuala Lumpur, visiting iconic landmarks like the Petronas Towers and bustling markets. Then, head to the stunning Batu Caves, a sacred Hindu site with impressive limestone caves and a towering statue of Lord Murugan.",
                image: ["http://images.cordeliacruises.com/cordelia_v2/public/images/malaysia-itinerary-batu-caves-shorex.webp"]
            },
            {
                title: "Kuala Lumpur Tower and City Tour ",
                subTitle: "Experience Kuala Lumpur’s top sights in one tour! Visit the King’s Palace, National Monument, and Petronas Twin Towers for perfect photo stops. Enjoy a shopping stop at the Chocolate Boutique and a drive through Chinatown. Then, head to the KL Tower Observation & Sky Deck for panoramic city views. Includes English-speaking guide, return transfers, and drinking water.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL02-03-KL-tower-tour-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-chocolate-boutique-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-kings-palace-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-national-monument-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL01-03-twin-towers-desktop.webp',
                    //     'https://images.cordeliacruises.com/cordelia_v2/public/images/KUL02-03-KL-tower-tour-desktop.webp',
                ]
            },
            {
                title: " Sunway Lagoon Theme Park",
                subTitle: "Enjoy thrills and spills at Sunway Lagoon, Malaysia’s premier theme park! Dive into exciting rides, water attractions, and adventure zones for all ages. Includes entry tickets, an English-speaking guide, return transfers, and drinking water.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/KUL04-sunway-lagoon-theme-park-desktop.webp"]
            }
        ]
    },
    {
        name: 'Singapore',
        link: 'Singapore',
        subTitle: "For its size, it packs a punch",
        desc: "Singapore, a dazzling city-state that leaves you spellbound. Immerse yourself in its vibrant energy, explore stunning gardens, indulge in hawker food stalls, and shop from high-end brands to bustling night markets. The endless possibilities of things you can do in Singapore are mind-blowing.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/singapore-page-image-05-desktop.webp",
        mapLink: "https://maps.app.goo.gl/xRDeR4rS6uS2Cns89",
        shoreEx: [
            {
                title: "City tour ",
                subTitle: "Step into Singapore’s rich history with an immersive experience. Stroll through the vibrant streets of Little India and Chinatown, where tradition meets modernity. Visit the iconic Merlion Park and a scenic drive down Orchard Road, Singapore’s premier shopping district. This comes with an English speaking guide and transfers.",
                image: ["http://images.cordeliacruises.com/cordelia_v2/public/images/SIN01-china-town-new-desktop.webp"]
            },
            {
                title: "Gardens By the Bay tour",
                subTitle: "Immerse yourself in Singapore’s stunning urban nature. Visit the iconic Gardens by the Bay, where you’ll explore the Flower Dome and the misty Cloud Forest, home to breathtaking waterfalls and exotic plants. In the evening, witness the dazzling Garden Rhapsody light show along with a panoramic view of the city skyline. This comes with an English speaking guide and transfers.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN02-gardens-bay-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN02-flower-dome-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN02-cloud-forest-desktop.webp',
                ]
            },
            {
                title: "Singapore Flyer tour",
                subTitle: "Enjoy the unparalleled views of Singapore’s skyline. Step into the Singapore Flyer, one of the world’s largest observation wheels, and take a ride in the Time Capsule, a multisensory experience showcasing Singapore’s past, present, and future. This comes with an English speaking guide and transfers.",
                image: ["http://images.cordeliacruises.com/cordelia_v2/public/images/singapore-Itinerary-flyer-tour-shorex.webp"]
            },
            // {
            //     title: "Singapore Flyer tour",
            //     subTitle: "Enjoy the unparalleled views of Singapore’s skyline. Step into the Singapore Flyer, one of the world’s largest observation wheels, and take a ride in the Time Capsule, a multisensory experience showcasing Singapore’s past, present, and future. This comes with an English speaking guide and transfers.",
            //     image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN03-time-capsule-desktop.webp"]
            // },
            {
                title: "Marina bay sands sky deck tour",
                subTitle: "This experience takes you to one of Singapore’s most famous landmarks—Marina Bay Sands SkyPark. Soak in breath taking 360-degree views of the city from the observation deck, perched high above the Marina Bay waterfront. A must-visit for stunning photo opportunities! This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN04-sky-deck-entrance-desktop.webp"]
            },
            {
                title: "Night Safari with Dinner Tour ",
                subTitle: "Embark on a thrilling night-time wildlife adventure where you visit the world-famous Night Safari. Hop on a tram ride that takes you through different geographical zones, bringing you face-to-face with creatures of the night. This tour also includes a dinner coupon, making it a perfect way to experience Singapore’s wildlife after dark. This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN05-night-safari-desktop.webp"]
            },
            {
                title: "Bird Paradise tour",
                subTitle: "Experience the beauty of Singapore’s Bird Paradise where you wander through themed aviaries and witness exotic birds in their natural habitats making it a fun and relaxing way to explore one of the world’s most impressive bird parks. This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN06-bird-paradise-desktop.webp"]
            },
            {
                title: "Universal Studios Tour",
                subTitle: "Step into the world of movies at Universal Studios Singapore on this full-day tour! Enjoy adrenaline-pumping rides, live entertainment, and immersive themed zones, from Jurassic Park to Transformers. Whether you’re a thrill-seeker or a fan of Hollywood blockbusters, this adventure promises non-stop excitement. This comes with an English speaking guide and transfers.",
                image: ["https://images.cordeliacruises.com/cordelia_v2/public/images/SIN07-universal-studios-entrance-mobile.webp"]
            },
            {
                title: "Sentosa Island Tour",
                subTitle: "Enjoy the best of adventure at Sentosa Island. Ride the Cable Car for scenic island views, and visit the famous Madame Tussauds Wax Museum. End the day with the spectacular Wings of Time light and water show. This comes with an English speaking guide and transfers.",
                image: [
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-cable-car-ticket-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-madame-tussauds-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-singapore-images-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-sky-luge-ride-desktop.webp',
                    'https://images.cordeliacruises.com/cordelia_v2/public/images/SIN08-wings-of-time-desktop.webp',
                ]
            },
            // {
            //     title: "Sentosa Island Tour",
            //     subTitle: "Experience the thrill of Sentosa Island in an adventurous tour. Ride the Cable Car for scenic island views, and visit the famous Madame Tussauds Wax Museum. Experience the Sky & Luge ride for an adrenaline rush and end the day with the spectacular Wings of Time light and water show. This comes with an English speaking guide and transfers.",
            //     image: []
            // },

        ]
    }
]

export default function Ports(props: Props) {

    const scrollIntoViewWithOffset = (selector: any, offset: any) => {
        const blue = document.getElementById(selector);
        if (blue) {
            let position = blue!.getBoundingClientRect();
            window.scrollTo({ top: position.top + window.scrollY - offset, behavior: 'smooth' });
        }
    }

    return (
        <div className='container mx-auto lg:mb-10 mb-6 px-4 lg:px-0'>
            <div className='border-t-2 border-gray-300 mb-10' />
            <div className='mb-10'>
                <h1 className='text-2xl lg:text-4xl lg:font-medium'>Discoveries Await at Every Stop
                </h1>
            </div>

            <div className="lg:block hidden">
                {PortDetail.map((v: any, i: any) =>
                    <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" id={v.name}>
                        <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                            <div className="col-span-5 lg:col-span-2">
                                <img className="h-[190px] lg:h-full w-full" src={v.image} alt="" />
                            </div>
                            <div className="col-span-5 lg:col-span-3">
                                <p className="text-lg lg:text-3xl font-semibold text-brand-primary">{v.name}</p>
                                <p className="text-lg lg:text-xl font-semibold mt-2">{v.subTitle}</p>
                                <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4">{v.desc}</p>
                                <div className="py-3 flex">
                                    <a className='lg:text-lg text-base flex gap-2 items-center font-bold py-3 px-4 rounded text-white bg-brand-gradient' href={v.mapLink} target="_blank">
                                        <span>
                                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/directions-icon.svg" />
                                        </span>
                                        Direction
                                    </a>
                                </div>
                            </div>
                        </div>
                        {v.shoreEx.length !== 0 ? <><div className='border-t-1 border-gray-300 mb-6 lg:mb-10' />
                            <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>

                            <PortCards data={v.shoreEx} />
                            <div className="lg:flex justify-center mt-8 hidden">
                                <a href={`/upcoming-cruises?port=${v.link}`} className="bg-brand-gradient px-6 py-2.5 text-white rounded" >Book Now</a>
                            </div></> : null}
                    </div>
                )}
            </div>
            <div className="block lg:hidden">
                {PortDetailMobile.map((v: any, i: any) =>
                    <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" id={v.name}>
                        <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                            <div className="col-span-5 lg:col-span-2">
                                <img className="h-[190px] lg:h-full w-full" src={v.image} alt="" />
                            </div>
                            <div className="col-span-5 lg:col-span-3">
                                <p className="text-lg lg:text-3xl font-semibold text-brand-primary">{v.name}</p>
                                <p className="text-lg lg:text-xl font-semibold mt-2">{v.subTitle}</p>
                                <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4">{v.desc}</p>
                            </div>
                        </div>
                        {v.shoreEx.length !== 0 ?
                            <>
                                <div className='border-t-1 border-gray-300 mb-6 lg:mb-10' />
                                <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>
                                <PortCards data={v.shoreEx} />
                                <div className="lg:flex justify-center mt-8 hidden">
                                    <a href={`/upcoming-cruises?port=${v.link}`} className="bg-brand-primary px-6 py-2.5 text-white rounded" >Book Now</a>
                                </div>
                            </> : null
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
