import React, { useEffect } from 'react'
import { Layout } from '/src/components/Layout';
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export default function PaymentSuccess({ }: Props) {
    useMetaTags({
        title: 'Experience the Magic of a Sunset Cruise Dinner with Cordelia',
        description: "Embark on a culinary journey with Cordelia Cruise's restaurant's food menu, on a ship we offer a world of flavors for lunch and sunset dinner. Visit now!",
        metas: [
            {
                name: 'keywords',
                content:
                    'cordelia, cordelia cruises, cordelia cruise ship, cordelia cruises website, cruise cordelia, cordelia cruises ship, cruise ship cordelia, cruise entertainment, cruise dining, cruise activities, cruise stay, cruise accomodation, luxurious cruise, cordeliacruises'
            },
        ],
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const scrollIntoViewWithOffset = (selector: any, offset: any) => {
        const blue = document.getElementById(selector);
        let position = blue!.getBoundingClientRect();
        window.scrollTo({ top: position.top + window.scrollY - offset, behavior: 'smooth' });
    }

    return (
        <Layout>
            <main className=" pt-24 lg:pt-36">
                <div className='container mx-auto px-3'>
                    <h1 className='text-3xl lg:text-4xl font-semibold'>Food & Beverages</h1>
                    <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>
                        From Pan-Asian cuisines to global grills and Indian street food to tandoor specialties,our expert chefs have designed the menu keeping in mind the tastes and preferences of the Indian traveller. Dining will definitely be one of the main highlights of your cruise holiday. For those who prefer vegetarian or Jain food, our chef also prepare an exquisite spread to cater to your choices. The Empress has an all-day dining food court and three specialty restaurants.
                    </p>
                    {/* <div className='flex mt-4 lg:mt-6'>
                        <div className='sticky top-40 bottom-40'>
                            <button
                                onClick={() => scrollIntoViewWithOffset('restaurants', 100)}
                                className='py-2 lg:py-3 w-44 lg:w-56 lg:text-lg mr-5 rounded border-2 border-brand-primary text-brand-primary font-semibold'>Restaurants</button>
                            <button
                                onClick={() => scrollIntoViewWithOffset('bar', 80)}
                                className='py-2 lg:py-3 w-44 lg:w-56 lg:text-lg rounded border-2 border-brand-primary text-brand-primary font-semibold'>Bars & Lounges</button>
                        </div>
                    </div> */}
                </div>
                <div className='sticky top-16 bg-white py-4 lg:static'>
                    <div className='container px-3 mx-auto flex'>
                        <button
                            onClick={() => scrollIntoViewWithOffset('restaurants', 100)}
                            className='py-2 lg:py-3 w-44 lg:w-56 lg:text-lg mr-5 rounded border-2 border-brand-primary text-brand-primary font-semibold'>Restaurants</button>
                        <button
                            onClick={() => scrollIntoViewWithOffset('bar', 80)}
                            className='py-2 lg:py-3 w-44 lg:w-56 lg:text-lg rounded border-2 border-brand-primary text-brand-primary font-semibold'>Bars & Lounges</button>
                    </div>
                </div>
                <div className='border-t-2 my-10 border-gray-300' />

                <div id='restaurants' className='container mx-auto px-3 '>
                    <h2 className='text-3xl lg:text-4xl font-semibold scroll-mt-5'>Restaurants</h2>
                    <div className='grid lg:grid-cols-3 lg:gap-3'>
                        <div className='lg:col-span-3 mt-6 lg:mt-12 border-2 border-gray-300 rounded-lg shadow-md'>
                            <div className='lg:grid lg:grid-cols-3'>
                                <img
                                    src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/all-day-dining-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/all-day-dining-mobile.webp"}
                                    alt='CruiseBuffet'
                                    title='Cruise-buffet'
                                    className='w-full'
                                />
                                <div className='py-6 px-4 col-span-2'>
                                    <h3 className='text-2xl font-medium'>All-Day-Dining</h3>
                                    <p className='text-base lg:text-lg font-medium mt-3 lg:mt-4'>Indulge in the Indian and international gourmet cuisines in the middle of the vast ocean.</p>
                                    <div className='grid grid-cols-2 gap-2 mt-3'>
                                        <div className="flex items-center">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Essence of India
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Hot Clay Tandoor
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Far Eastern Kadhai
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Kettle & Bun
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Sugar & Spice
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Jain Haven
                                            </p>
                                        </div>
                                        <div className="flex items-center col-span-2">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                The International Grill
                                            </p>
                                        </div>
                                        <div className="flex items-center col-span-2">
                                            <img
                                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                                                className="h-3 mr-1.5"
                                                alt='CordeliaCruises'
                                                title='Cordelia-Cruises'
                                            />
                                            <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                                                Vegetarian Bang Street Food and The Cafe
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className='font-bold text-brand-primary text-base lg:text-lg'>Capacity: 553 guests</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md'>
                            <img
                                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/starlight-mobile-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/starlight-mobile.webp"}
                                alt='StarlightRestaurant'
                                title='Starlight-restaurant'
                                className='w-full'
                            />
                            <div className='px-4 py-6'>
                                <h3 className='text-2xl font-medium'>The Starlight</h3>
                                <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Take your waterfront dining to the next level with our two-storey restaurant, featuring 15 exquisite cuisines from around the world. The ambience and grandeur of the Starlight is its main highlight. Enjoy the panoramic seascape while you’re at it!</p>
                                <p className='font-bold text-brand-primary text-base lg:text-lg mt-2 lg:mt-14'>Capacity: 740 guests</p>
                            </div>
                        </div>
                        <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md'>
                            <img
                                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/chefs-table-desktop.png" : "https://images.cordeliacruises.com/cordelia_v2/public/images/chefs-table-mobile.webp"}
                                alt='ExclusiveMenu'
                                title='ChefsSpecial'
                                className='w-full'
                            />
                            <div className='px-4 py-6'>
                                <h3 className='text-2xl font-medium'>Chef's Table</h3>
                                <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Indulge in a truly exceptional and sophisticated gastronomic adventure with our premium, gourmet dining experience that boasts an expertly crafted menu curated especially for your palate. Don't forget to plan ahead and make reservations in advance.</p>
                                <p className='font-bold text-brand-primary text-base lg:text-lg mt-2 lg:mt-14'>Capacity: 8 guests</p>
                            </div>
                        </div>
                        <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md'>
                            <img
                                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/chopstix-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/chopstix-mobile.webp"}
                                alt='ChopstixRestaurant'
                                title='Chopstix-Restaurant'
                                className='w-full'
                            />
                            <div className='px-4 py-6'>
                                <h3 className='text-2xl font-medium'>Chopstix</h3>
                                <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Embark on an unforgettable culinary journey at our specialty restaurant for Pan-Asian cuisine, where you'll be greeted with breathtaking scenic surroundings and a mouth-watering array of sublime delicacies. Delight in an exquisite dining experience that will tantalise your taste buds and leave you craving for more.</p>
                                <p className='font-bold text-brand-primary text-base lg:text-lg mt-2'>Capacity: 74 guests</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' py-8 pb-24 lg:pb-36 bg-brand-sky/10 mt-16' id='bar'>
                    <div className='container mx-auto px-3'>
                        <h2 className='text-3xl font-semibold'>Bars & Lounges</h2>
                        <div className='grid lg:grid-cols-2 lg:gap-3'>
                            <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
                                <img 
                                    src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/poolbar-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/poolbar-mobile.webp"}
                                    alt='Cruise-bar'
                                    title='Cruise-pool-bar'
                                    className='w-full'
                                />
                                <div className='px-4 py-6'>
                                    <h3 className='text-2xl font-medium'>The Pool Bar</h3>
                                    <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Watch the setting sun dip below the horizon as you sip on your favourite drinks and unwind at the Pool Bar. This scenic spot is ideal for pool parties, sundowners, team building activities, as well as haldi & mehendi functions.</p>
                                    <p className='font-bold text-brand-primary text-base lg:text-lg mt-2 lg:mt-8'>Capacity: 200 guests </p>
                                </div>
                            </div>
                            <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
                                <img
                                    src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/connexions-bar-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/connexions-bar-mobile.webp"}
                                    alt='ConnexionsBar'
                                    title='Cruise-Connexions-Bar'
                                    className='w-full'
                                />
                                <div className='px-4 py-6'>
                                    <h3 className='text-2xl font-medium'>Connexions Bar</h3>
                                    <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Our fine selection of cocktails & spirits, when paired with impressive live performances and music, will make every moment spent at the Connexions Bar feel like a celebration. The perfect venue for family get-togethers, seminars, and sangeet functions.</p>
                                    <p className='font-bold text-brand-primary text-base lg:text-lg mt-2'>Capacity: 315 guests </p>
                                </div>
                            </div>
                            <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-club-coporate.webp"
                                    alt='Cruise-bar'
                                    title='Bar-Chairman-club'
                                    className='w-full'
                                />
                                <div className='px-4 py-6'>
                                    <h3 className='text-2xl font-medium'>Chairman's Club</h3>
                                    <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>As the name suggests, everything about our Chairman’s Club oozes luxury and finesse of the highest degree. Perfect for small functions, casual meetings, or even intimate receptions. Get ready to savour the finest liquors in this modern and chic venue.</p>
                                    <p className='font-bold text-brand-primary text-base lg:text-lg mt-2'>Capacity: 138 guests </p>
                                </div>
                            </div>
                            <div className='mt-10 border-2 border-gray-300 rounded-lg shadow-md bg-white'>
                                <img
                                    src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/dome-corporate.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/dome-corporate.webp"}
                                    alt='Cruise-bar'
                                    title='Cruise-bar-Dome'
                                    className='w-full'
                                />
                                <div className='px-4 py-6'>
                                    <h3 className='text-2xl font-medium'>The Dome</h3>
                                    <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Dance the night away at our late-night bar. This lively spot offers the finest selection of spirits and even houses a private area for larger groups. Your go-to destination for cocktail parties onboard.</p>
                                    <p className='font-bold text-brand-primary text-base lg:text-lg mt-2'>Capacity: 268 guests </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}