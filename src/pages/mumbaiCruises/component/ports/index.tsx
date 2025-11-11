import React, { Suspense, useEffect } from "react";
type Props = {};
const PortDetail = [
    {
        name: "Mumbai Port ",
        port: "mumbai",
        desc: " At the Mumbai International Cruise Terminal, your vacation to the best of the Indian west coast begins. Sail aboard India’s top cruise to the exotic Lakshadweep, beloved Goa, quaint Kochi, or take the long adventure to Chennai, because no matter where you go, an experience of a lifetime is what you’ll take with you ",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-landing-mumbai-image.webp",
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
                    </div>
                )}
            </div>
        </div>
    );
}

