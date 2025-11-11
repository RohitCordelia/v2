import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};

const PortDetail = [
    {
        name: "Mormugao Port",
        port: "Goa",
        desc: "Welcome to Mormugao Port, a charming getaway on the west coast of India, near some of Goa's most pristine beaches. To explore the vibrant streets of Goa, all local travel options are available nearby.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/GOA_port.webp",
        mapLink: "https://maps.app.goo.gl/zFkrtaW52VCRsn649",
        shoreEx: [
            {
                title: "Colva Beach Adventure",
                subTitle: "Bask in the sun-kissed shores of Colva Beach, one of Goa's well-known beach destinations and a paradise for relaxation and adventure. Dive into the turquoise waters and indulge in thrilling water sports. Colva Beach isn't just about serene beauty; it's a shopper's haven too!",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/Colva-Beach.webp"
            },
            {
                title: "Churches of Goa",
                subTitle: "Goa’s rich culture and history are explorations you just can’t miss. Immerse into the sacred beauty and the architectural marvels of the Basilica of Bom Jesus and St. Catherine's Cathedral. Journey through Panjim, Goa's capital, and lose yourself in the charming Fontainhas heritage walk.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-goa-churches.webp"
            },
            {
                title: "Visit to Mangeshi temple & Spice plantation tour",
                subTitle: "Visit the Mangeshi Temple, a historical landmark known for its soaring lamp tower. Take your senses on a rollercoaster ride at the spice plantation with a gentle trek through the lush grounds, learning about the exotic spices that grace Goan cuisine. Finally, savor a delicious local lunch prepared right at the plantation for a truly unforgettable experience.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-goa-spice-plantation.webp"
            },
            {
                title: "Fontainhas heritage walk & visit to Fort Reis Margos",
                subTitle: "Explore Panjim's vibrant soul! Wander the colorful lanes of the Fontainhas heritage walk, a charming journey through Goa's Portuguese past. Next, tackle the 70-step climb to Fort Reis Magos for breathtaking coastal views. With free time at hand, shop for souvenirs or simply unwind in the local atmosphere.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-goa-fontainhas.webp"
            },
            {
                title: "Goa Beach Adventurer",
                subTitle: "Hit the Goan waves! Spend a thrilling day at either Baina or Bogmalo Beach, enjoying exhilarating water sports like parasailing, jet skiing, and banana rides. After the excitement, relax on the beach or explore nearby shops for souvenirs—perfect for ending an unforgettable day.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-goa-beach-adventure.webp"
            },
            {
                title: "Best of Goa",
                subTitle: "Explore Panjim's Portuguese legacy with the Fontainhas heritage walk. Marvel at the Basilica of Bom Jesus and St. Catherine's Cathedral, seek blessings at Mangeshi Temple, and enjoy a guided trek through a spice plantation with a delicious local lunch. Experience the perfect blends of history, spirituality, and culinary adventure.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-goa-best.webp"
            }
        ]
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>Things to do in Goa to elevate your cruise experience</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Whether you seek adventure, relaxation, or cultural immersion, Goa offers it all. For a memorable Goa trip, Cordelia Cruises can facilitate every kind of traveller with its best solo trip packages or group travel packages!</p>
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
                    <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" id={v.name}>
                        <div className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                            <div className="col-span-5 lg:col-span-2">
                                <img className="h-[190px] lg:h-full w-full" src={v.image} alt="" />
                            </div>
                            <div className="col-span-5 lg:col-span-3">
                                <p className="text-lg lg:text-3xl font-semibold text-brand-primary">{v.name}</p>
                                <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4">{v.desc}</p>
                                {v.mapLink && <div className="py-3 flex">
                                    <a className='lg:text-lg text-base flex gap-2 items-center font-bold py-3 px-4 rounded text-white bg-brand-gradient' href={v.mapLink} target="_blank">
                                        <span>
                                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/directions-icon.svg" />
                                        </span>
                                        Direction
                                    </a>
                                </div>}
                            </div>
                        </div>
                        <div className='border-t-1 border-gray-300 mb-6 lg:mb-10' />
                        <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>
                        <PortCards data={v.shoreEx} />
                        <div className="lg:flex justify-center mt-8 hidden">
                            <a href={`/upcoming-cruises?port=${v.port}`} className="bg-brand-gradient px-6 py-2.5 text-white rounded" >Book Now</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
