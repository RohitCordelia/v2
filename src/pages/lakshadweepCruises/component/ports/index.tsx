import React, { Suspense, useEffect } from "react";
import PortCards from "./portCards";

type Props = {};
const PortDetail = [
    {
        name: "Agatti Island",
        desc: "A stunning gem of the Lakshadweep archipelago, Agatti has one of the most beautiful lagoons and acts as our Port of call in Lakshadweep. Agatti becomes your starting point for an unforgettable experience that captures the essence of this tropical paradise.",
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/Agatti.webp",
        shoreEx: [
            {
                title: "Island Vibes",
                subTitle: "Get ready to immerse yourself in the serene vibes of Lakshadweep on this unforgettable excursion! Cruise aboard local transport, experience a vibrant cultural show and unwind on pristine beaches. Explore local shops for unique souvenirs, ensuring you take home a piece of paradise.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/Island_vibes.webp"
            },
            {
                title: "Island Adventures",
                subTitle: "Experience the rich cultural heritage of Lakshadweep with captivating performances by local artists. Delight in the thrill of water sports by choosing any two activities from snorkelling amidst vibrant marine life, gliding through azure waters on a kayak, riding the waves on a banana boat, or marvelling at the underwater world through a glass-bottom boat.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-lakshadweep-island-adventure.webp"
            },
            {
                title: "Exotic Lakshadweep",
                subTitle: "Be a part of the vibrant rhythms of local culture with captivating performances under the starlit sky. Dive into the crystal-clear waters, discovering the breathtaking marine world through exhilarating snorkelling adventures. You can choose any two water sports activities from kayaking, a banana boat ride, or an enchanting boat ride with a glass-bottom view.",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-lakshadweep-exotic.webp"
            },
            {
                title: "Aquatic Adventure",
                subTitle: "You’ll be welcomed to Lakshadweep with an awe-inspiring cultural performance by the locals. Take the plunge with a guided scuba dive for beginners, led by PADI-certified instructors. You get to choose from any two water sports from a kayak exploration, a snorkelling adventure, or a laughter-filled banana ride!",
                image: "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-lakshadweep-aquatic-adventure.webp"
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
                <h2 className='text-2xl lg:text-4xl lg:font-medium'>Shore excursions at Lakshadweep will make your vacation extraordinary!</h2>
                <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5'>Vacation aboard India’s top cruise is an experience you can’t forget! Whether you're snorkelling among colorful fishes, relaxing under the swaying palms, or simply soaking in the natural beauty, Lakshadweep is an adventure that you just can’t get enough of!</p>
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
