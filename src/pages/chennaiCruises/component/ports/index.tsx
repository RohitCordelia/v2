import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};

const PortDetail = [
    {
        name: "Chennai Port",
        port: "Chennai",
        desc: "",
        image: "",
        shoreEx: [
            {
                title: "Best of Chennai",
                subTitle: "Embark on a tour that includes a visit to the iconic Kapaleeshwarar Temple, the serene Santhome Church, and the fascinating Government Museum. Wrap up the day with a vibrant shopping experience at T. Nagar and Ranganathan Street.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-page-best-of-chennai-01.webp"
            },
            {
                title: "Grand Heritage Tour of Mahabalipuram",
                subTitle: "Enjoy a scenic transfer to Mahabalipuram, followed by a delicious lunch. Afterward, explore the ancient rock-cut temples and monuments of Mahabalipuram. End your day with a relaxing visit to Marina Beach, one of the longest urban beaches in the world.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-page-heritage-mahabalipuram-tour-02.webp"
            },
            {
                title: "Kanchipuram Temple tour",
                subTitle: "Begin your exploration of the historic Kanchipuram, visiting the majestic Ekambareeswarar Temple, the ancient Kailasanathar Temple, and the sacred Kanchi Kamakshi Amman Temple. Conclude your day by shopping for the exquisite, vibrant Kanchipuram silk sarees.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-page-kanchipuram-tour-03.webp"
            },
            {
                title: "Kapaleeshwarar Temple tour",
                subTitle: "Enjoy the iconic Kapaleeshwarar Temple, followed by a visit to the fascinating Crocodile Park. Enjoy a delicious lunch at a traditional South Indian restaurant, rounding off a day of cultural and wildlife exploration.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-page-kapalesshwar-tour-04.webp"
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>Chennai Port</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Sail into adventure from Island Grounds, Chennai - your gateway to the high seas on India's Coast!</p>
                <div className="py-3 flex">
                    <a className='lg:text-lg text-base flex gap-2 items-center font-bold py-3 px-4 rounded text-white bg-brand-gradient'
                        href="https://maps.app.goo.gl/8mLw2XyA3VJrQsrg8"
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
