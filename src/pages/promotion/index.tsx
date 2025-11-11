import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";
import moment from 'moment';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

type Props = {}
const month = moment().format('MMM')
const offer = [
    {
        title: 'Free Stateroom Upgrade',
        subTitle: 'Pay upfront and upgrade your view',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/free_stateroom_nov.jpeg',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "Get a complimentary upgrade from Interior to Ocean View stateroom.",
            "Offer valid on select sailings and cabin categories.",
            "Full payment must be made at the time of booking to avail the upgrade.",
            "This offer cannot be combined with any other existing promotions.",
            "18% GST, service charges, levies, and fuel surcharges will apply for all passengers.",
            "Standard cancellation, refund, and amendment policies apply.",
            "The offer will not be applicable to any modifications made after the original booking.",
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
    {
        title: 'Pay for 3 Nights, Sail for 5',
        subTitle: 'Get more cruise days without paying more',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Pay-for-3N-sail-5N-offer-page.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "Pay for just 3 nights and enjoy a 5-night sailing.",
            "Offer valid on select sailings and cabin categories.",
            "18% GST, service charges, levies, and fuel surcharges will apply for all passengers.",
            "This offer cannot be combined with any other existing promotions.",
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
    {
        title: 'Enjoy Exclusive Prices',
        subTitle: 'Sail more, spend less',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/exclusive-value-fare-offer-image.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "Applicable on select sailings and cabin categories.",
            "18% GST will be applicable.",
            "Cancellations and reschedules are not allowed for bookings made on Exclusive Value Fares.",
            "No-show refunds will not be processed for bookings made on Exclusive Value Fares.",
            "This offer cannot be combined with any other existing promotions.",
            "The offer will not be applicable to any modifications made after the original booking.",
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
    {
        title: 'Companion Sails Free',
        subTitle: 'Cruise for two, pay for one',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/companion-sail-free-offer-image.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "Offer valid on select sailings and cabin categories.",
            "18% GST, service charges, levies, and fuel surcharges will apply for all passengers.",
            "This offer cannot be combined with any other existing promotions.",
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
    {
        title: 'PayDay sale is live!',
        subTitle: 'Book now and save big on your next adventure!',
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/pay-day-sale-may-offer-image.webp",
        // description: [
        //     "Enjoy 15% off on April, May & June 2025 sailings except 4th to 7th April, 7th to 9th April, 7th to 12th April, 9th to 12th April, 14th to 18th April, 18th to 21st April, 21st to 23rd April, 21st to 26th April, 23rd to 26th April & 28th April to 2nd May",
        //     "Discount applies to cabin fare only",
        //     "Valid for Interior and Ocean View categories only",
        //     "Additional GST 18% will be applicable on the total billing amount.",
        //     "Multiple offers cannot be combined",
        //     "Booking window: 1st April – 5th April 2025",
        // ],
        bulletDescription: [
            {
                title: "Offer 1: BOGO",
                points: [
                    "Pay for one cabin and get another free.",
                    "Cabin fare for the second cabin will be waived off. (only with 2 pax, additional pax will be charged).",
                    "Sailing Dates - 23th to 28th June, 25th to 28th June.",
                    "Cancellations will be only applicable if both the cabins are cancelled.",
                    "This offer is applicable only on ocean view and interior cabin categories.",
                ]
            },
            {
                title: "Offer 2: Companion Offer",
                points: [
                    "Sailing Dates - 13th to 16th June.",
                    "Cabin fare for the second guest is FREE.",
                    "Service charges, levies, and fuel charges apply for all guests.",
                    "Valid for Interior and Ocean View categories.",
                ]
            },
            {
                title: "Offer 3: Pay for 3N & Sail for 5N",
                points: [
                    "Book a cabin and enjoy a 2-nights cabin fare waiver.",
                    "Sailing Dates: 30th June to 5th July, 7th to 12th July, 14th to 19th July.",
                    "Note: Fuel charges, service charges, and levies apply for all nights.",
                    "Offer is applicable only on Interior and Ocean View cabins.",
                ]
            },
            {
                title: "Offer 4: Pay for 2N & Sail for 3N",
                points: [
                    "Book a cabin and enjoy a 1-night cabin fare waiver.",
                    "Sailing Date: 8th to 11th August.",
                    "Note: Fuel charges, service charges, and levies apply for all nights.",
                    "Offer is applicable only on Interior and Ocean View cabins.",
                ]
            },
        ],
        link: '/upcoming-cruises',
        isActive: true,
        startTime: "11:59 PM",
        endTime: "11:59 PM",
        startDate: "30/04/2025", // Optional
        endDate: "05/05/2025",   // Optional
    },
    {
        title: 'Explore Southeast Asia Like Never Before',
        subTitle: 'Unlock  Free Cabin Upgrade',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cabin-upgrade-may-2025.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "Full payment is required at the time of booking to avail the upgrade.",
            "The upgrade is applicable from Interior Stateroom to Ocean View Stateroom only.",
            "This offer cannot be combined with any other promotions.",
            "Applicable sailing date: 29th July 2025.",
            "Offer valid on limited inventory only. ",
        ],
        link: '/upcoming-cruises',
        isActive: false,
    },
    {
        title: 'Unbeatable Value, Unmatched Experiences',
        subTitle: 'Super Savings Unlocked',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Southest+Asia_Offer_Page515x273.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "Super Special Prices are applicable only on interior cabins.",
            "No cancellations and rescheduling will be permitted.",
            "No show refunds will not be processed.",
            "Applicable sailing date: 19th July 2025.",
            "This offer cannot be combined with any other existing promotions.",
        ],
        link: '/upcoming-cruises',
        isActive: false,
    },
    {
        title: 'Unlock special deals on Southeast Asia sailing',
        subTitle: 'Enjoy 50% off on cabin fare & additional cashback',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Southeast_asia_sailings_offer.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "This offer is applicable only on Ocean View Cabins.",
            "50% discount on cabin fare & ₹5,000 cashback per person.",
            "Cashback will be processed only after the sailing has been completed.",
            "Cashback is applicable only for guests who complete the sailing.",
            "Applicable sailing date: 19th July 2025.",
            "This offer cannot be combined with any other existing promotions.",
        ],
        link: '/upcoming-cruises',
        isActive: false,
    },
    // {
    //     title: 'Your dream vacation starts here.',
    //     subTitle: 'Companion Sails Free',
    //     image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Companion_Sails_Offer+Page_515x273.webp',
    //     imgAlt: 'Cruise Offers',
    //     imgTitle: 'Limited-time-offer',
    //     description: [
    //         "Valid on Ocean View Cabins only.",
    //         "Applicable sailing dates: 19th July and 29th July 2025.",
    //         "Cabin fare for the second guest is free.",
    //         "Service charges, levies, and fuel charges apply for all nights.",
    //         "18% GST will be applicable.",
    //         "This offer cannot be combined with any other existing promotions.",
    //         "Offer valid until 30th April 2025.",
    //     ],
    //     link: '/upcoming-cruises',
    //     isActive: false,
    // },
    // {
    //     title: 'Pay for 2N & Sail for 3N',
    //     subTitle: 'Cruise more, pay less!',
    //     image: 'http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-1N-Free-offer-april-new.webp',
    //     imgAlt: 'Cruise Offers',
    //     imgTitle: 'Limited-time-offer',
    //     description: [
    //         "Book and get a 1-night cabin fare waiver",
    //         "Offer valid on Interior or Ocean View cabins only",
    //         "Sailing Date: 18th to 21st April",
    //         "Fuel charges, service charges, and levies apply for all nights",
    //         "18% GST is applicable on the total billing amount",
    //         "Offers cannot be combined with any existing promotions",
    //     ],
    //     link: '/upcoming-cruises',
    //     isActive: false,
    // },
    // {
    //     title: 'Complimentary Stateroom Upgrade',
    //     subTitle: 'Pay upfront and level-up your view of the ocean!',
    //     image: 'http://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-upgrade-offer-april-new.webp',
    //     imgAlt: 'Cruise Offers',
    //     imgTitle: 'Limited-time-offer',
    //     description: [
    //         "Sailing dates - 14th to 18th April, 21st to 23rd April, 23rd to 26th April, 21st to 26th April, 28th April to 2nd May",
    //         "Offer valid on Interior cabins only",
    //         // "Upgrade within the same category",
    //         "Full payment is required at the time of booking to avail the upgrade",
    //         "This offer cannot be combined with any other promotions.",
    //     ],
    //     link: '/upcoming-cruises',
    //     isActive: false,
    // },
    // {
    //     title: 'Get exclusive 25% discount on your cabin fare',
    //     subTitle: 'Up to 25% Discount:',
    //     image: 'http://images.cordeliacruises.com/cordelia_v2/public/images/moonlight-saving-offer-image-01-feb-2025.webp',
    //     imgAlt: 'Cruise Offers',
    //     imgTitle: 'Limited-time-offer',
    //     description: [
    //         'Up to 25% discount will be applied to cabin fare on all sailings.',
    //         'This offer is applicable for bookings made through the official website.',
    //         'Offer is applicable only on bookings made between 10 PM and 6 Am only.',
    //         'Offer is subject to availability and can be availed on the website only.',
    //         'The final price is only valid at the time of completing the booking.'
    //     ],
    //     link: '/upcoming-cruises',
    //     isActive: false,
    //     startTime: "10:00 PM",
    //     endTime: "06:00 AM",
    // },
    {
        title: 'Super Special Pricing',
        subTitle: 'Limited time offer!',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/offer-cabins-left-april-11.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Limited-time-offer',
        description: [
            "This offer is valid on interior cabins only.",
            "Sailing dates- 28th April to 2nd May 2025, 2nd to 5th May, 5th to 7th May and 10th to 12th May.",
            "Additional GST 18% will be applicable on the total billing amount.",
            "No refunds for no-shows, cancellations or reschedules.",
            "Offers cannot be combined with any existing promotions.",
            "Call us to avail this offer.",
        ],
        link: '/upcoming-cruises',
        isActive: false,
    },
    {
        title: 'Early Bird Offer',
        subTitle: 'Early risers, big savers - get 10% off when you book ahead!',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-early-bird-offer-oct.webp',
        description: [
            "A discount of 10% will be applied to the cabin fare only.",
            "The offer applies only to sailings scheduled 60 days or more from the date of booking.",
            "This offer can’t be clubbed with any other existing offers.",
        ],
        link: '/upcoming-cruises?da=15122024',
        isActive: true,
    },
    {
        title: 'All-Inclusive Beverage Package',
        subTitle: 'Cheers to Your Glass of Happiness with Our All-Inclusive Beverage Package!',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/UnlimitedBeverage.webp',
        imgAlt: "Free Open Bar",
        imgTitle: "Free-beverage-On-Cruise",
        description: [
            "Indulge in a wide range of beverages and mixers at no extra charge for adults (21+).",
            "Kids will be delighted with a selection of refreshing non-alcoholic beverages.",
            "Turn Every Moment Aboard into a Toast with Our Premium Beverage Upgrade Package.",
            "Upgrade your package anytime at booking or on-board.",
            "Available according to bar hours.",
            `Offer valid for bookings done till Dec 2025.`,
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
    {
        title: 'Book Now, Pay Later',
        subTitle: 'Looking for flexible payment options? No worries, just secure your spot!',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Book_now_pay_later_.webp',
        imgAlt: 'Book now pay later',
        imgTitle: 'book-partial-to-block',
        description: [
            'Book your cabin by paying just 25%.',
            'Make a full payment 60 days before your sailing date.',
            'The offer applies only to sailings scheduled 60 days or more from the date of booking.',
            `Offer valid for bookings done till Dec 2025.`,
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
    {
        title: 'Kids Sail Free',
        subTitle: 'Your kid’s cruise fare is on us!',
        image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/KidsSailFree_offer.webp',
        imgAlt: 'Cruise Offers',
        imgTitle: 'Kids-Sail-Free',
        description: [
            'Valid for all kids under the age of 12.',
            'The kids must travel as 3rd or 4th guests.',
            'Service charges, levies, and fuel charges are applicable with the GST.',
            'Offer valid for all future sailings except 3N (from 24-12-25 to 27-12-25)- Christmas, 3N (from 29-12-25 to 01-01-26)- New Year week.',
            `Offer valid for bookings done till Dec 2025.`,
        ],
        link: '/upcoming-cruises',
        isActive: true,
    },
]
export default function Accomodation({ }: Props) {
    const [offers, setOffers] = useState<any[]>([]);
    const navigate = useNavigate();

    useMetaTags({
        title: 'Exclusive Cruise Offers & Limited-Time Deals',
        description: 'Discover the latest cruise deals with Cordelia Cruises. Save on exclusive offers, last-minute discounts, and onboard experiences across India and tropical destinations. Book your dream vacation today!',
        metas: [
            {
                name: 'keywords',
                content:
                    'cruise deals, cruise offers, last minute cruise deals, best cruise offers, cordelia cruises, cordelia cruises offers, cordelia cruises deals, cruise vacation, best cruise packages, cruise packages, cruise ship price, cruise honeymoon packages, cruise deals from singapore'
            },
        ],
    });
    useEffect(() => {
        const filteredOffers = offer.filter((off: any) => {
            // If offer is not active, exclude it
            if (!off.isActive) return false;

            // If no startTime or endTime, include the image
            if (!off.startTime || !off.endTime) return true;

            // Parse startTime, endTime, and currentTime
            // const startTime = moment(off.startTime, "hh:mm A");
            // const endTime = moment(off.endTime, "hh:mm A");
            const currentTime = moment();
            const currentDate = moment().format("DD/MM/YYYY");

            let startDateTime, endDateTime;

            // If dates exist, combine them with times
            if (off.startDate && off.endDate) {
                startDateTime = moment(`${off.startDate} ${off.startTime}`, "DD/MM/YYYY hh:mm A");
                endDateTime = moment(`${off.endDate} ${off.endTime}`, "DD/MM/YYYY hh:mm A");
            } else {
                // If no dates, use only time
                startDateTime = moment(off.startTime, "hh:mm A");
                endDateTime = moment(off.endTime, "hh:mm A");
            }

            // STRICTLY CHECK for startTime === endTime (SHOW ONLY at 11:59 PM)
            const isExactTimeMatch =
                off.startTime === off.endTime &&
                currentTime.isSame(startDateTime, 'minute');

            // Handle time range properly
            const isTimeValid =
                isExactTimeMatch ||
                (endDateTime.isBefore(startDateTime) // Handles "10:00 PM - 06:00 AM"
                    ? (currentTime.isBetween(startDateTime, moment(`${off.startDate} 11:59 PM`, "DD/MM/YYYY hh:mm A"), null, "[)") ||
                        currentTime.isBetween(moment(`${off.endDate} 12:00 AM`, "DD/MM/YYYY hh:mm A"), endDateTime, null, "[)"))
                    : currentTime.isBetween(startDateTime, endDateTime, null, "[)")
                );

            // Check if the date is valid (Optional)
            const isDateValid =
                (!off.startDate || !off.endDate) ||
                moment(currentDate, "DD/MM/YYYY").isBetween(
                    moment(off.startDate, "DD/MM/YYYY"),
                    moment(off.endDate, "DD/MM/YYYY"),
                    "day",
                    "[]"
                );

            return isTimeValid && isDateValid;
        });
        setOffers(filteredOffers);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout>
            {/* <div className="mt-[65px] lg:mt-[105px]">
                <img
                    src={
                    innerWidth > 768
                        ? 'https://images.cordeliacruises.com/cordelia_v2/public/images/offer-page-diwali-deals-1920x400.webp'
                        : 'https://images.cordeliacruises.com/cordelia_v2/public/images/offer-page-diwali-deals-562x300.webp'
                    }
                    alt="banner"
                    className="w-full h-full"
                />
            </div> */}
            <main className="container mx-auto pt-10 pb-24 lg:pt-16 px-3 lg:pb-36 mt-[65px] lg:mt-[105px]">
                <h1 className='text-2xl lg:text-4xl font-semibold'>Cruise Deals Worth Dropping Anchor For</h1>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>Discover exclusive fares, seasonal discounts, and limited-time deals designed to
                    make your next cruise even more rewarding.</p>
                <div className='border-t-2 my-10 border-gray-300' />
                <div className='grid grid-cols-2 gap-4 lg:gap-8'>
                    {/* <div className='col-span-2 lg:col-span-1'>
                        <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
                            <div>
                                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/payday_jan.webp" />
                            </div>
                            <div className='py-8 px-6'>
                                <div className='flex items-center'>
                                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" className='lg:w-7 lg:h-7 mr-2' alt="CordeliaCruise" title="Offers-On-Cordelia-Cruises" />
                                    <h2 className='text-xl lg:text-2xl font-semibold'>PayDay sale is live!</h2>
                                </div>
                                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>Book now and save big on your next adventure!</p>
                                <div className='mt-4 mb-14'>
                                    <div>
                                        <p className='text-sm font-semibold ml-2 lg:ml-3'>Offer 1: Enjoy 10% Off on Future Sailings</p>
                                        <ul className='list-disc pl-10 text-sm'>
                                            <li className='mb-0.5'>Applicable to all upcoming sailings.</li>
                                            <li className='mb-0.5'>Discount applies to cabin fare only.</li>
                                            <li className='mb-0.5'>Valid for Interior, Ocean View, and Mini Suite categories.</li>
                                        </ul>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='text-sm font-semibold ml-2 lg:ml-3'>Offer 2: Complimentary Cabin Upgrade</p>
                                        <ul className='list-disc pl-10 text-sm'>
                                            <li className='mb-0.5'>Upgrade from Interior to Ocean View cabin upon full payment.</li>
                                            <li className='mb-0.5'>Available on select sailings with limited inventory.</li>
                                            <li className='mb-0.5'>Full payment required at the time of booking.</li>
                                        </ul>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='text-sm font-semibold ml-2 lg:ml-3'>Offer 3: Valentine & Holi Companion Offer</p>
                                        <ul className='list-disc pl-10 text-sm'>
                                            <li className='mb-0.5'>Celebrate with your companion on these special sailings:</li>
                                            <li className='mb-0.5'>Valentine Sailing: 10th February 2025 (5-night itinerary)</li>
                                            <li className='mb-0.5'>Holi Sailing: 10th March 2025 (includes intra-port journey)</li>
                                            <li className='mb-0.5'>Cabin fare for the second guest is FREE.</li>
                                            <li className='mb-0.5'>Service charges, levies, and fuel charges apply for all nights.</li>
                                            <li className='mb-0.5'>Valid for Interior and Ocean View categories.</li>
                                        </ul>
                                    </div>
                                    <div className='mt-2 mb-2'>
                                        <p className='text-sm font-bold ml-2 lg:ml-3'>Important Details</p>
                                        <ul className='list-disc pl-10 text-sm'>
                                            <li className='mb-0.5'>Offers cannot be combined.</li>
                                            <li className='mb-0.5'>Booking window: 1st January – 5th January 2025.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='py-5 pt-7 mt-10 absolute bottom-2 mb-2'>
                                    <a href="{val.link}"
                                        className='lg:text-lg text-base text-white font-bold bg-brand-primary py-4 px-20 lg:px-16 rounded'>Find a Cruise</a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {offers.map((val: any, i: number) => (
                        <div className='col-span-2 lg:col-span-1'>
                            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full overflow-hidden'>
                                <div>
                                    <img className='w-full' src={val.image} />
                                </div>
                                <div className='py-8 px-6'>
                                    <div className='flex items-center'>
                                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offers-new-icon.svg" className='w-6 h-6 lg:w-8 lg:h-8 mr-2' alt="CordeliaCruise" title="Offers-On-Cordelia-Cruises" />
                                        <h2 className='text-xl lg:text-2xl font-semibold'>{val.title}</h2>
                                    </div>
                                    <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>{val.subTitle}</p>
                                    <div className='mt-4 mb-20'>
                                        {val?.description?.length > 0 ? val?.description.map((v: any) =>
                                            <div className='flex items-start py-3'>
                                                <img className='lg:h-3 h-3 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt='CordeliaCruise ' title='Cordelia-Cruises' />
                                                <p
                                                    className='text-sm font-semibold ml-2 lg:ml-3'
                                                    dangerouslySetInnerHTML={{ __html: v }}
                                                ></p>
                                            </div>
                                        )
                                            : (val?.bulletDescription?.length > 0 && val?.bulletDescription?.map((v: any) =>
                                                <>
                                                    <div>
                                                        <div className='flex items-start py-3'>
                                                            <img className='lg:h-3 h-3 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt='CordeliaCruise ' title='Cordelia-Cruises' />
                                                            <p
                                                                className='text-sm font-semibold ml-2 lg:ml-3'
                                                                dangerouslySetInnerHTML={{ __html: v.title }}
                                                            ></p>
                                                        </div>
                                                        {v.points.length > 0 && <ul className='list-disc pl-10 lg:pl-11'>
                                                            {v.points.map((point: string) => <li className='mb-2 text-sm'>{point}</li>)}
                                                        </ul>}
                                                    </div>
                                                </>
                                            ))}
                                    </div>
                                    <div className='py-5 pt-7 mt-10 absolute bottom-2 mb-2'>
                                        <Button text='Find a Cruise' size='base' handleClick={() => navigate(val.link)} className='px-20 lg:px-16' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}