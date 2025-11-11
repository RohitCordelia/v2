import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};

const PortDetail = [
    {
        name: "Puducherry Port",
        port: "Puducherry",
        desc: "",
        image: "",
        shoreEx: [
            {
                title: "Best of Pondi",
                subTitle: "Explore Puducherry in 8 hours, starting with Manakula Vinayagar Temple and the serene Aurobindo Ashram. Stroll through the picturesque French Quarters, admiring colonial architecture, before unwinding at Promenade Beach.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/pondicherry-besto-pondi-02.webp"
            },
            {
                title: "Boating Tour",
                subTitle: "Embark on a 7-hour adventure starting with a drive to Chunnambar Boat Point, where you can catch a boat to the beautiful Paradise Beach. Spend time soaking up the sun and serenity on the beach before continuing to explore the natural beauty of Puducherry.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/pondicherry-boating-tour-03.webp"
            },
            {
                title: "French town tour",
                subTitle: "Spend 6 hours immersing yourself in the charm of Puducherry, starting with a leisurely walk through the picturesque French Town, where colonial architecture and vibrant streets tell a rich story. Then, head to the Arts & Craft Village, where you can explore local craftsmanship, artworks, and traditional crafts, offering a glimpse into the region’s cultural heritage.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/pondicherry-french-town-tour-04.webp"
            },
            {
                title: "MAHABALIPURAM TOUR",
                subTitle: "Embark on a 7-hour journey with a drive to Mahabalipuram, where you\'ll explore its iconic heritage sites, including ancient rock-cut temples, intricate sculptures, and the famous Shore Temple. Immerse yourself in the rich history and architectural beauty of this UNESCO World Heritage site, offering a captivating glimpse into India\'s ancient past.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/pondicherry-mahabalipuram-tour-05.webp"
            },
            {
                title: "AUROVILLE TOUR",
                subTitle: "Spend 7 hours exploring the charm of Puducherry with a drive to Auroville, where you\'ll visit the outer side of the iconic Matri Mandir and admire its peaceful surroundings. Then, take a leisurely walk through the vibrant French Town, soaking in its colonial architecture and unique atmosphere before wrapping up your day.",
                image: "http://images.cordeliacruises.com/cordelia_v2/public/images/pondicherry-auroville-tour-01.webp"
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>Puducherry Port</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Established by the Governor-General of the French East India company, Puducherry has always been one of the most important trade cities in history due to its connectivity with western companies like the Dutch and the French.</p>
                <div className="py-3 flex">
                    <a className='lg:text-lg text-base flex gap-2 items-center font-bold py-3 px-4 rounded text-white bg-brand-gradient'
                        href="https://maps.app.goo.gl/7i5y1NLihC5bABgQ6"
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
                        <div className="lg:flex justify-center mt-8 hidden">
                            <a href={`/upcoming-cruises?port=${v.port}`} className="bg-brand-gradient px-6 py-2.5 text-white rounded" >Book Now</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
