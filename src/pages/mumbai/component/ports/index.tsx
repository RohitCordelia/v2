import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";
type Props = {};
const PortDetail = [
    {
        name: "Mumbai Port",
        port: "Mumbai",
        desc: " At the Mumbai International Cruise Terminal, your vacation to the best of the Indian west coast begins. Sail aboard India’s top cruise to the exotic Lakshadweep, beloved Goa, quaint Kochi, or take the long adventure to Chennai, because no matter where you go, an experience of a lifetime is what you’ll take with you",
        image: " https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-landing-mumbai-image.webp",
        mapLink: "https://maps.app.goo.gl/gQ93JmVgyqejuvrz8",
        shoreEx: [
            {
                title: "Highlights of Mumbai | BOM01 | 3 Hours 30 Minutes",
                subTitle: "Explore Mumbai’s iconic landmarks on this guided tour. Drive past the Bandra-Worli Sea Link, Marine Drive, and historic sites, with photo stops at the Gateway of India and CSMT. Take a short local train ride to Mahalaxmi, walk to Dhobi Ghat, and visit Mani Bhavan and the ISKCON Temple before returning to the port.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/gateway-of-india-desktop-BOM-01.webp"
            },
            {
                title: "Mumbai Temple Tour | BOM02 | 5 Hours 30 Minutes",
                subTitle: "Discover Mumbai’s spiritual heritage with visits to ISKCON, Babulnath, Mahalaxmi, and Siddhivinayak temples. Enjoy scenic drives past Marine Drive and the coastal road, with a photo stop at the Gateway of India before concluding at the airport.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/siddhivinayak-temple-desktop-BOM-02.webp"
            },
            {
                title: "Mumbai City Tour | BOM03 | 3 Hours 30 Minutes",
                subTitle: "Explore Mumbai’s iconic landmarks with photo stops at the Gateway of India and CSMT. Drive past historic sites, including Rajabai Clock Tower and Mumbai High Court, before a visit to Girgaum Chowpatty. Enjoy scenic views along Marine Drive before returning to the port.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/rajabai-clock-tower-desktop-BOM-01.webp"
            },
            {
                title: "Panorama Tour of Mumbai | BOM04 | 3 Hours",
                subTitle: "Experience Mumbai’s architectural and cultural landmarks on this scenic tour. Stop for photos at the Gateway of India while driving past iconic sites like Mumbai University, and Rajabai Clock Tower. Enjoy an orientation tour covering the General Post Office, Victoria Terminus, and Crawford Market before returning via Marine Drive and the Bandra-Worli Sea Link.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/worli-bandra-sea-link-desktop-BOM-01.webp"
            },
            {
                title: "Bollywood Stars House Tour | BOM05 | 3 Hours 30 Minutes",
                subTitle: "Explore Mumbai’s star-studded neighborhoods on this Bollywood-themed tour. Begin with a photo stop at the Gateway of India, passing historic landmarks en route. Drive along Marine Drive and the Bandra-Worli Sea Link to see the homes of Bollywood legends like Shah Rukh Khan, Salman Khan, Rekha, and John Abraham. Continue to Juhu for a glimpse of Amitabh Bachchan’s residence before returning to the port.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/amitabh-house-desktop-BOM-05.webp"
            },
        ],
    },
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>The fun starts aboard the Empress at sea </h2>
            </div>
           {PortDetail.length > 1 && <div className="flex mb-12">
                {PortDetail.map((v: any, i: any) =>
                    <div key={i} onClick={() => scrollIntoViewWithOffset(v.name, window.innerWidth > 640 ? 100 : 60)} className="mr-2 border-1 cursor-pointer border-brand-primary px-4 lg:px-8 py-2 lg:py-2.5 rounded">
                        <p className="text-brand-primary text-sm lg:text-lg font-medium">{v.name}</p>
                    </div>
                )}
            </div>}

            <div className="">
                {PortDetail.map((v: any, i: any) =>
                    <>
                        <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" id={v.name}>
                            <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                                <div className="col-span-5 lg:col-span-2">
                                    <img className="h-[190px] lg:h-full w-full" src={v.image} alt="" />
                                </div>
                                <div className="col-span-5 lg:col-span-3">
                                    <p className="text-lg lg:text-3xl font-semibold text-brand-primary">{v.name}</p>
                                    <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4">{v.desc}</p>
                                    {/* <a href="https://maps.app.goo.gl/gQ93JmVgyqejuvrz8" target="_blank" className="w-full min-h-[60px] lg:min-h-[95px] grid grid-cols-11 mt-6 rounded-b-md">
                                    <img className="lg:h-6 bg-brand-primary" src="https://images.cordeliacruises.com/cordelia_v2/public/assets/directions-icon.svg" />
                                    <p className="lg:text-xl text-base text-brand-primary font-bold underline">Directions</p></a> */}
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
                            <div className='border-t-1 border-gray-300 mb-6 lg:mb-10' />
                            <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>
                            <PortCards data={v.shoreEx} />
                            <div className="lg:flex justify-center mt-8 hidden">
                                <a href={`/upcoming-cruises?port=${v.port}`} className="bg-brand-gradient px-6 py-2.5 text-white rounded" >Book Now</a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

