import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};
const PortDetail = [
    {
        name: "Sagarika Cochin International Cruise Terminal",
        desc: "Kochi's Sagarika International Cruise Terminal serves as the gateway to an enchanting journey through Kerala's serene backwaters and vibrant culture, offering a captivating point of your cruise vacation.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-activies-sep-image.webp",
        shoreEx: [
            {
                title: " Best of Kochi with culinary experience",
                subTitle: "Visit Kochi Fort, St. Francis Church, and the Chinese fishing nets. Explore the Dutch Palace and Jewish Synagogue. Engage with a local family during a cooking demonstration and enjoy meaningful interactions. Savor a traditional lunch to complete your immersive experience.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-things-to-do-aug-new.webp"
                
            },
            {
                title: "Heritage walkthrough Fort Kochi",
                subTitle: "Stroll through the heritage zone, exploring Kochi Fort, St. Francis Church, and the Chinese fishing nets. Discover the Dutch Palace and Jewish Synagogue, then enjoy some free time shopping at Jew Street.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-heritage-aug-new.webp"
            },
            {
                title: "Harbour Cruise and City Tour",
                subTitle: "Board a motor launch for a scenic harbor cruise past Vypeen, Gundu, and Vallaradam. Discover the Dutch Palace and Jewish Synagogue, then enjoy free time shopping at Jew Street. Conclude your adventure with a relaxing drive back to the port.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-citytour-aug-new.webp"
            },
            {
                title: "Alleppey Tour – Drive to Airport",
                subTitle: "Drive to Alleppey and board a traditional non-AC houseboat. Enjoy a scenic boat ride, passing through picturesque villages and observing local fishermen at work. Savor traditional Kerala cuisine served onboard. Return to the Jetty, board the buses, and drive back to the airport.",
                image:"https://images.cordeliacruises.com/cordelia_v2/public/images/crusie-kochi-aug-new.webp"
            },
            {
                title: "Half Day Kochi – Drive to Airport",
                subTitle: "Depart from the port and stroll through the Heritage Zone. Visit Kochi Fort, St. Francis Church, and the Chinese fishing nets. Continue on to explore the Dutch Palace and the Jewish Synagogue. Then, head to Jew Street for some free time shopping before driving back to the airport.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-shopping-aug-new.webp"
            },
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>Shore excursions in Kochi will leave you wanting for more
                </h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Embark on an unforgettable journey aboard India's top cruise ship! Savor a coffee break in Killian, embark on a motor launch ride, and explore the synagogue, Dutch Palace, and Jew Town. 
                </p>
            </div>
            <div className="flex mb-12">
                {PortDetail.map((v: any, i: any) =>
                    <div key={i} onClick={() => scrollIntoViewWithOffset(v.name, window.innerWidth > 640 ? 100 : 60)} className="mr-2 border-1 cursor-pointer border-brand-primary px-4 lg:px-8 py-2 lg:py-2.5 rounded">
                        <p className="text-brand-primary text-sm lg:text-lg font-medium">{v.name}</p>
                    </div>
                )}
            </div>

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
                            </div>
                        </div>
                        <div className='border-t-1 border-gray-300 mb-6 lg:mb-10' />
                        <p className="text-lg lg:text-3xl font-semibold">Shore Excursions</p>
                        <PortCards data={v.shoreEx} />
                    </div>
                )}
            </div>
        </div>
    );
}
