import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};

const PortDetail = [
    {
        name: "Vishakhapatnam Port",
        port: "vizag",
        desc: "",
        image: "",
        shoreEx: [
            {
                title: "Vizag City Tour",
                subTitle: "This 6-hour tour takes you through a blend of scenic and historical spots. Start with the Ramanaidu Studio to explore iconic film sets, then relax at Rushikonda Beach. Enjoy panoramic views from Kailasagiri Hill Park and explore aviation history at the Visakha Aircraft Museum. End the tour with a leisurely visit to RK Beach to unwind by the sea.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/Vizag-VIZ01.webp"
            },
            {
                title: "Beach & City Tour",
                subTitle: "Enjoy a 7-hour tour blending coastal beauty, history, and scenic views. Relax at serene Bheemili Beach, explore the ancient Buddhist site of Thotlakonda, and take in panoramic city views at Kailasagiri Hill Park. Visit the Visakha Aircraft Museum to see military aircraft, then end the day with a stroll along RK Beach.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/Vizag-VIZ02.webp"
            },
            {
                title: "Zoo & City Tour",
                subTitle: "Start your day at RK Beach for a relaxing seaside experience, then visit the peaceful Kalimatha Temple. Enjoy stunning views at Kailasagiri Hill Park before heading to Zoo Park for a wildlife adventure. Unwind at Rushikonda Beach and end with a tour of Ramanaidu Studio, exploring the world of cinema.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/Vizag-VIZ03.webp"
            },
            {
                title: "Beach & Shopping Tour",
                subTitle: "Spend 6 hours exploring Bheemili Beach, followed by a visit to the historic Thotlakonda. Enjoy shopping at the local market for souvenirs, and end the day with a relaxing stroll through City Central Park.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/Vizag-VIZ04.webp"
            },
            {
                title: "City Park & Shopping Tour",
                subTitle: " Enjoy a 6-hour tour starting with a visit to Ramanaidu Studio to explore film sets, followed by a relaxing time at Rushikonda Beach. Shop for local goods at the market, then unwind with a peaceful stroll through City Central Park.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/Vizag-VIZ05.webp"
            }
        ]
    },
]
export default function Ports(props: Props) {

    // const scrollIntoViewWithOffset = (selector: any, offset: any) => {
    //     const blue = document.getElementById(selector);
    //     if (blue) {
    //         let position = blue!.getBoundingClientRect();
    //         window.scrollTo({ top: position.top + window.scrollY - offset, behavior: 'smooth' });
    //     }
    // }

    return (
        <div className='container mx-auto lg:mb-10 mb-6 px-4 lg:px-0'>
            <div className='border-t-2 border-gray-300 mb-10' />
            <div className='mb-10'>
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>Visakhapatnam Port</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>This is one of twelve major ports in India and the only major port in Andhra Pradesh.</p>
                <div className="py-3 flex">
                    <a className='lg:text-lg text-base flex gap-2 items-center font-bold py-3 px-4 rounded text-white bg-brand-gradient'
                        href="https://maps.app.goo.gl/Ztukxj9Lc2Agxarz7"
                        target="_blank">
                        <span>
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/directions-icon.svg" />
                        </span>
                        Direction
                    </a>
                </div>
            </div>
            {/* <div className="flex mb-12">
                {PortDetail.map((v: any, i: any) =>
                    <div key={i} onClick={() => scrollIntoViewWithOffset(v.name, window.innerWidth > 640 ? 100 : 60)} className="mr-2 border-1 cursor-pointer border-brand-primary px-4 lg:px-8 py-2 lg:py-2.5 rounded">
                        <p className="text-brand-primary text-sm lg:text-lg font-medium">{v.name}</p>
                    </div>
                )}
            </div> */}

            <div className="">
                {PortDetail.map((v: any, i: any) =>
                    <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" id={v.name}>
                        <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>
                        <PortCards data={v.shoreEx} />
                        {/* <div className="lg:flex justify-center mt-8 hidden">
                            <a href={`/upcoming-cruises`} className="bg-brand-primary px-6 py-2.5 text-white rounded" >Book Now</a>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}
