import { Layout } from '../../../src/components/Layout';
import Banner from '../../component/Banner';
import Gallery from "./gallery";
import LeadGenForm from "../../components/UI/LeadForm";

const myBanner = {
    "title": "",
    "images": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Immerse-in-Nature-Wildlife-web.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Langkawi++1920x400.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Singapore+1920x400+copy+4.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-adventure-desktop-image-01.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-local-culture-desktop-image-02.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-island-views-desktop-image-03.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-attractions-fun-desktop-image-04.webp",
            "link": "#",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        }
    ],
    "mobileImages": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/immerse-in-nature-wildlife-mobile.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Langkawi++563+X+306.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/Singapore++563+X+306+copy+4.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-adventure-mobile-image-01.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-local-culture-mobile-image-02.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-island-views-mobile-image-03.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        },
        {
            "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/International-attractions-fun-mobile-image-04.webp",
            "link": "",
            "altTag": "",
            "type": "image",
            "thumbnail": ""
        }
    ]
};


export default function index() {
    const stpParam = new window.URLSearchParams(window.location.search).get('stp');

    const banner = {
        "title": "",
        "images": [
            {
                "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-all-in-one-desktop.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-langkawi-desktop-image-02.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-malaysia-desktop-image-03.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-singapore-desktop-image-04.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-thailand-desktop-image-05.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            }
        ],
        "mobileImages": [
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-cruise-mobile-image-01.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-langkawi-mobile-image-02.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-malaysia-mobile-image-03.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-singapore-mobile-image-04.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            },
            {
                "url": "http://images.cordeliacruises.com/cordelia_v2/public/images/international-thailand-mobile-image-05.webp",
                "link": `${stpParam ? '/upcoming-cruises?n=10' : '#'}`,
                "altTag": "",
                "type": "image",
                "thumbnail": ""
            }
        ],
    };

    return (
        <>
            <Layout>
                <main>
                    <div className="md:mt-16 mt-12">
                        <Banner data={banner ? banner : ''} clickable={stpParam ? true : false} />
                        <div className="">
                            <LeadGenForm page_code={stpParam ? 'international-stp' : 'international'} />
                        </div>
                    </div>

                    <div className="relative text-center py-10 px-4 md:px-8 bg-white mt-5">
                        <h1
                            className="text-2xl lg:text-4xl lg:font-medium px-4 leading-7"
                        >
                            Embark on the Journey of a Lifetime with Cordelia Cruises
                        </h1>
                        <p className="text-black lg:text-lg text-sm mt-2 md:mt-4 mx-auto lg:w-[75%]">
                            Unveil the world’s most spectacular destinations on board Cordelia Cruises. From the vibrant streets of Singapore to the exotic allure of Phuket, the breathtaking beauty of Langkawi, and the dynamic charm of Kuala Lumpur—each destination offers a unique blend of culture, adventure, and natural wonder.
                        </p>
                        <p className="text-black lg:text-lg text-sm mt-2 md:mt-4 mx-auto lg:w-[75%]">
                            Wander through Singapore’s dazzling skyline and indulge in its world-class cuisine and futuristic attractions. Discover Phuket’s sun-drenched beaches, thrilling water sports, and rich Thai heritage. In Langkawi, lose yourself in lush rainforests, crystal-clear waters, and serene island vibes. Experience the cultural heartbeat and modern flair of Kuala Lumpur, where towering skyscrapers meet historic temples and buzzing street markets. Your dream cruise is just a click away.
                        </p>
                    </div>

                    <section>
                        <Banner data={myBanner ? myBanner : ''} clickable={false} />
                    </section>

                    <section className="lg:mb-48 mb-20 mt-10 lg:mt-[60px]">
                        <Gallery />
                    </section>
                </main>
            </Layout>
        </>
    );
}
