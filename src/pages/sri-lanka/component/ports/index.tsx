import React, { Fragment, Suspense, useEffect } from "react";
import PortCards from "./portCards";
import Button from "../../../../components/UI/Button";

type Props = {};

const PortDetail = [
    {
        name: "Jaffna",
        desc: "Experience the spirit of Jaffna, where history echoes through Jaffna Fort, and sacred sites like Nallur Kandaswamy Temple and Nagadeepa Vihara reveal the city's soul. Wander vibrant markets, savor the bold flavors of Jaffna crab curry, and let this enchanting city leave a lasting impression.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna-main-image.webp",
        mapLink: "/srilanka/jaffna",
        imageAlt: "CruiseToJaffna",
        imageTitle: "Cruise-To-Jaffna",
        shoreEx: [
            {
                title: "Glimpses of Jaffna",
                subTitle: "We invite you to step into the soul of Jaffna, where each street narrates a tale of its own. Nestled in the northern tip of Sri Lanka, Jaffna is steeped in history, culture, and natural beauty. From its vibrant markets to its ancient temples, every corner of Jaffna weaves its spell around you – offering a unique and unforgettable experience.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/glimpses-jaffna-image.webp",
                imageAlt: "ThingsToDoInJaffna",
                imageTitle: "Cruise-To-Jaffna",
            },
            {
                title: "Jaffna Beach with Market Visit",
                subTitle: "Experience the gentle lapping waves and the soft caress of the sea breeze enveloping you on the tranquil shores of Kankesanthurai Beach. We'll whisk you away from there to the vibrant heart of Jaffna Market, where you'll meander through the bustling stalls adorned with exotic spices, ripe fruits, and artisanal handicrafts.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna-beach.webp",
                imageAlt: "ThingsToDoInJaffna",
                imageTitle: "Jaffna-Beach",
            },
            {
                title: "Spiritual Jaffna",
                subTitle: "From the towering gopuram of Nallur Kandaswamy temple adorned with intricate carvings and vibrant hues to the serene Nagadeepa Vihara, nested amidst lush greenery and gently swaying palms, every step in Jaffna is a journey, and every moment a revelation. You'll find its timeless charm captivating your soul.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/spiritual-jaffna.webp",
                imageAlt: "ThingsToDoInJaffna",
                imageTitle: "Jaffna-Temples",
            },
            {
                title: "Stories that Thrill",
                subTitle: "Explore the poignant history of Jaffna, where tales of resilience and conflict intertwine to create a narrative of hope and healing. You’ll start your journey at Jaffna Fort, a silent witness to centuries of struggle, followed by Jaffna Public Library, a symbol of knowledge and enlightenment.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/jaffna-stories.webp",
                imageAlt: "ThingsToDoInJaffna",
                imageTitle: "Jaffna-SriLanka",
            }
        ]
    },
    {
        name: "Trincomalee",
        desc: "Trincomalee, or 'Trinco' to the locals, is a story waiting to unfold. Wander vibrant markets filled with exotic spices and handcrafted treasures. Trincomalee's magic extends beyond the surface, dive into an underwater paradise—coral reefs invite snorkelers and divers to explore this underwater paradise.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-main-image.webp",
        mapLink: "/srilanka/trincomalee",
        imageAlt: "CruiseToTrincomalee",
        imageTitle: "Cruise-To-Trincomalee",
        shoreEx: [
            {
                title: "Glimpses of Trincomalee",
                subTitle: "You'll feel history unfolding when you step ashore at Trincomalee, a harbour steeped in stories as old as time. Feel the ancient energy flowing through you as you walk the grounds of Thiru Koneswaram Temple & Shakthi Peethas. Witness Sri Lanka's colonial past at Fort Frederick, and pay your respects at the Trincomalee War Cemetery, a poignant reminder of the sacrifices. Kanniya Hot Water Springs, believed to have been touched and blessed by Lord Rama himself, will transport you into the living legends of the Ramayana.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-glimpses.webp",
                imageAlt: "Trincomalee-Views",
                imageTitle: "Cordelia-Cruises",
            },
            {
                title: "Whale/Dolphin Watching",
                subTitle: "While the endless blue stretches before you, you hear a sudden splash -- a pod of bottlenose dolphins leaping in the air and twirling, their playful energy complementing the ocean. If luck is by your side, brace yourself for a breathtaking encounter with the island's majestic giants, the Orcas, the Blue Whales, the Sperm Whales and the Bryde's Whales gracefully glide along the cruise.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-whale.webp",
                imageAlt: "Trincomalee-DolphinWatching",
                imageTitle: "Cordelia-Dolphin-Srilanka",
            },
            {
                title: "Sigiriya",
                subTitle: "Picture yourself standing amidst the lush greenery of Sigiriya, a land where history is etched into the very bedrock, stands a towering edifice of Lion Rock Fortress. Rising 600 feet straight up, this historic marvel is a testament to the marvellous kingdom, King Kashyapa once ruled over. Today, Sigiriya is a designated UNESCO World Heritage site, a beacon of pride for all who call this island home.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-sigiriya.webp",
                imageAlt: "Trincomalee-Sigiriya",
                imageTitle: "Sigiriya-SriLanka",
            },
            {
                title: "Polonnaruwa Ancient City",
                subTitle: "Polonnaruwa, yet another UNESCO World Heritage Site, awaits your arrival! Your search for serenity will be answered as you gaze upon the towering stupas and the statues of Buddha, their peaceful presence a mirror to Sri Lanka's deep Buddhist Roots. But Polonnaruwa is more than a Buddhist haven, it is home to exquisitely carved Hindu sculptures too.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-polonnaruwa.webp",
                imageAlt: "ThingsToDoInSriLanka",
                imageTitle: "Cruise-To-SriLanka",
            },
            {
                title: "Pigeon Island: Snorkelling",
                subTitle: "Home to Sri Lanka's most precious treasures — vibrant coral reefs teeming with life, imagine yourself slipping beneath the crystal-clear surface. A school of fish, adorned in every colour imaginable, flit between the coral branches, while a playful clownfish peeks out from its home, and a regal blue tang glides majestically by.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-pigeon-island.webp",
                imageAlt: "PigeonIsland",
                imageTitle: "Srilanka-island,Pigeon",
            },
            {
                title: "Minneriya National Park",
                subTitle: "Anticipation thrums in the air as you board open jeeps, ready to delve into the heart of Minneriya National Park. A sanctuary spread over a staggering 8,800 hectares, where nature reigns supreme. Unlike the crowded safaris, you'll get an exclusive glimpse into the lives of these gentle giants. Get ready for a sight that will etch itself forever in your memory, as a vast herd of Asian elephants emerges from the emerald embrace of the forest.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-minneriya-park.webp",
                imageAlt: "MinneriyaNationalPark",
                imageTitle: "Minneriya-SriLanka",
            },
            {
                title: "Relax at The Beach — Cinnamon Blu",
                subTitle: "Prepare yourself for a beach unlike any other! At this hidden gem, with the gentle waves lapping at your ankles, you can wade out for what feels like forever. But there's more! Keep your eyes peeled at the horizon as you might be rewarded with a breathtaking display of mighty whales. After an invigorating day under The Sun, what better way to unwind than with a delectable feast at the Cinnamon Blu.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-beach-cinnamon.webp",
                imageAlt: "Trincomalee-beach",
                imageTitle: "Trincomalee-beach",
            },
            {
                title: "Thiriyai",
                subTitle: "Mingle with a small yet vibrant community whose heart is filled with captivating stories. Bathed in the warm Sri Lankan Sun, lie the remnants of a stupa, an ancient Buddhist monument. Legend whispers that within its core rests a strand of Buddha's hair, a sacred relic that has drawn pilgrims for centuries. This isn't just a historical site; it's a portal to Sri Lanka's soul.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-thiriyai.webp",
                imageAlt: "Thiriyai-SriLanka",
                imageTitle: "Thiriyai-SriLanka",
            },
            {
                title: "Anuradhapura",
                subTitle: "The ancient city of Anuradhapura rising from the Sri Lankan plains, wasn't always a mirage shimmering in the heat. It was once a crown jewel, pulsating with life. Over 2,300 years ago, elephants roamed these very streets, carrying royalty to their grand abodes. You'll stand beneath the shade of the sacred Jaya Sri Maha Bodhi tree, a sapling from the very tree under which Buddha attained enlightenment. Marvel at the scale of Ruwanwelisaya, a dazzling white dagoba that gleams like a pearl in the afternoon sun.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/trincomalee-anuradhapura.webp",
                imageAlt: "TrincomaleeSriLanka",
                imageTitle: "ThingsToDoInSrilanka",
            }
        ]
    },
    {
        name: 'Hambantota',
        desc: "Embark on a journey through Hambantota’s diverse landscapes and rich heritage. Walk the historic streets of Galle Dutch Fort, witness Yala National Park, and find serenity at Rumassala and Yatagala Temple. From thrilling safaris to peaceful Unawatuna beaches, every moment here is an adventure.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-main-image.webp",
        mapLink: "/srilanka/hambantota",
        imageAlt: "CruiseToHambantota",
        imageTitle: "Cruise-To-Hambantota",
        shoreEx: [
            {
                title: "Step into History: Galle Dutch Fort",
                subTitle: "Imagine yourself taking a stroll through the cobblestone streets of Galle Dutch Fort, marvelling at the well-preserved colonial architecture as you wander past charming cafes, boutique shops, and historic landmarks. You'll feel the energy of centuries beneath your feet as you explore the imposing ramparts and bastions that once defended this bustling port city from invaders.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-dutch-fort.webp",
                imageAlt: "SriLankaHambantotaFort",
                imageTitle: "SriLanka-Hambantota-For",
            },
            {
                title: "River Cruise & Turtle Hatchery",
                subTitle: "Come experience a mesmerising river cruise along Balapitiya's lifeline, the Madu River. Glide past lush mangrove forests and serene fishing villages. Explore Kothduwa's island temple before witnessing the magic of the Turtle Hatchery Farm, where dedicated conservationists protect endangered sea turtles. The harmony of ecology and culture in this Sri Lankan paradise is bound to enchant you.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-turtle-hatchery.webp",
                imageAlt: "TurtleHatchery",
                imageTitle: "Turtle-Hatchery-SriLanka",
            },
            {
                title: "Spiritual Serenity: Rumassala and Yatagala Temple",
                subTitle: "In the heart of Rumassala lies a mountain shrouded in mystique, believed to have descended during Lord Hanuman's journey. And as you explore this divine land, the air hums with ancient tales and the scent of sacred blooms. In the middle of this natural sanctuary is nestled Yatagala Temple, a haven of tranquillity where time seems to stand still, while the verdant beauty of the expansive paddy fields adds to its sheer beauty.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-spiritual.webp",
                imageAlt: "HambantotaTemples",
                imageTitle: "Hambantota-temple",
            },
            {
                title: "Yala National Park",
                subTitle: "Witness Yala National Park, as it stands as a testament to Sri Lanka's rich ecological legacy. Home to endangered species like the majestic Sri Lankan elephant and elusive Sri Lankan leopard, you'll imprint your footsteps on a sanctuary for biodiversity. From lush forests to arid plains, enjoy the abundance of avian species that call this pristine wilderness home.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-yala-park.webp",
                imageAlt: "SrilankaYalaPark",
                imageTitle: "Yala-park-SriLanka",
            },
            {
                title: "Bundala National Park",
                subTitle: "Boasting a unique blend of ecosystems — the dunes, lagoons, and marshes — Bundala National Park, is celebrated for its diverse avian populations. It is a major stopover for migrating bird species. Witness the harmony of nature, where flocks of birds find refuge in this biologically rich sanctuary.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-bundala-park.webp",
                imageAlt: "HambantotaBundalaPark",
                imageTitle: "Hambantota-Bundala-Park",
            },
            {
                title: "Udawalawe National Park",
                subTitle: "As you navigate through the winding paths and dusty trails, you'll be entering the home ground of mighty elephants, where they reign supreme. Get ready for a sight that takes your breath away, as you watch these mighty tuskers go about their daily lives. But Udawalawe is more than just a haven for elephants — as you go deeper, you'll find the park teeming with wildlife.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-udawalawe-park.webp",
                imageAlt: "UdawalawePark",
                imageTitle: "SriLanka-Park",
            },
            {
                title: "Akuressa Tea Factory & Plantation",
                subTitle: "Be a part of a breathtaking journey through lush, certified organic tea gardens to reach the heart of Akuresa's tea country. Amidst acres of verdant foliage, lies the Ceylon Tea Factory, a proud testament to 75 years of tea-making tradition. Founded in 1935, Galaboda's family-run enterprise is another gem awaiting discovery. Step into a world where every sip tells a story of heritage and craftsmanship, where the aroma of freshly brewed tea mingles with the whispers of history.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-akuressa-tea.webp",
                imageAlt: "Tea-Plantation",
                imageTitle: "Akuressa-Tea-Plantation",
            },
            {
                title: "Unawatuna: Day at The Beach & Shopping",
                subTitle: "Nestled along Unawatuna's shores, this banana-shaped beach invites you for a relaxing evening. Feel worries fade as you soak up the sun or swim in these crystalclear waters. Explore bustling markets and boutiques for vibrant sarongs and exotic treasures. Unawatuna promises a day of blissful retreat and quality family time amidst shimmering waves and shopping delights.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-unawatuna.webp",
                imageAlt: "Hambantota-unawatuna",
                imageTitle: "SriLanka-Cruises",
            },
            {
                title: "Hike to Diyaluma Waterfall",
                subTitle: "Diyaluma Waterfall, affectionately known as the 'Beach on the Hills' is a destination not to be missed. Anticipation mounts with each step as you traverse winding paths and verdant forests, leading you closer to nature's grand spectacle. Whether you are lounging on sun-kissed rocks or taking a refreshing dip in the cool waters, every moment spent will make your witness the natural world unfold in all its majestic glory.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-diyaluma-falls.webp",
                imageAlt: "WaterfallSriLanka",
                imageTitle: "SriLanka-Waterfalls",
            },
            {
                title: "Lord Murugan Temple Tour",
                subTitle: "Experience myth intertwining with history. Within its modern shrine lies an ancient sanctuary, settled in a natural cave, steeped in folklore. Nearby, the Buddhist Kiri Vehera temple, dating back to the first century BCE, adds to the region's ever-flowing spirituality. Get ready to journey through time and legend in this sacred realm.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-lord-murugan-temple.webp",
                imageAlt: "Hambantota-temples",
                imageTitle: "cruise-Hambantota",
            },
            {
                title: "Hambantota city tour",
                subTitle: "Every corner in this magical city narrates tales of ancient ports and enduring legacies. Begin your journey with a visit to Godawaya, an ancient port that still echoes the whispers of a bygone era. And as you stroll through the streets of Hambantota, you'll explore the salt pans that dot the landscape, where salt production continues to thrive.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/hambantota-city-tour.webp",
                imageAlt: "Hambantota-tourism",
                imageTitle: "SriLanka-Tourism",
            }
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>DISCOVER SRI LANKA LIKE NEVER BEFORE</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Come aboard for an extraordinary cruise that transcends time – where mythical tales of the past become a part of your reality, as you explore the best-kept secrets of Jaffna, Trincomalee and Hambantota. You are in for an unforgettable adventure!</p>
            </div>
            {PortDetail.length > 1 && <div className="flex mb-12 overflow-x-auto">
                {PortDetail.map((v: any, i: any) =>
                    <Fragment key={i}>
                        <Button text={v.name} type="secondary" handleClick={() => scrollIntoViewWithOffset(v.name, window.innerWidth > 640 ? 100 : 60)} className="mr-2" />
                    </Fragment>
                )}
            </div>}

            <div className="">
                {PortDetail.map((v: any, i: any) =>
                    <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" id={v.name}>
                        <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                            <div className="col-span-5 lg:col-span-2">
                                <img className="h-[190px] lg:h-full w-full" src={v.image} alt={v.imageAlt} title={v.imageTitle} />
                            </div>
                            <div className="col-span-5 lg:col-span-3">
                                <p className="text-lg lg:text-3xl font-semibold text-brand-primary">{v.name}</p>
                                <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4">{v.desc}</p>
                                <div className="py-3 flex">
                                    <a className='lg:text-lg text-base flex gap-2 items-center font-bold py-3 px-4 rounded text-white bg-brand-gradient' href={v.mapLink}>
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='border-t-1 border-gray-300 mb-6 lg:mb-10' />
                        <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>
                        <PortCards data={v.shoreEx} />
                        <div className="lg:flex justify-center mt-8 hidden">
                            <a href={`/upcoming-cruises?port=${v.name}`} className="bg-brand-gradient px-6 py-2.5 text-white rounded" >Book Now</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
