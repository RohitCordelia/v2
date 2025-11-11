import React, { useEffect, useState } from 'react'
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { Layout } from '/src/components/Layout';
import Accordion from '/src/components/UI/Accordion/accordion_basic';
import ExitIntent from "../../components/ExitIntent";
import Button from '../../components/UI/Button';

type Props = {}

const faqString = [
    {
        question: "Why choose Cordelia Cruises?",
        answer: "Cordelia Cruises by Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited) is India’s only premium cruise liner, and aspires to promote and drive the cruise culture in India through experiences that are stylish, luxurious and most importantly, inherently Indian. Each of us at Cordelia Cruises is committed to ensure that you have a great time on your cruise.",
    },
    {
        question: "What is included in the cruise ticket?",
        answer: "The price of your cruise ticket includes accommodation, unlimited onboard dining at our Food court & Starlight restaurant, entertainment & most on-board activities. That being said, you will be given a detailed list of inclusions and exclusions at the time of booking. Also, the cruise ticket price is inclusive of cruise fare + service charges, levies, & taxes & insurance",
    },
    {
        question: "What is not included in the cruise ticket?",
        answer: "Your cruise ticket price does not include air transportation, transfers, optional shore & land excursions, meals & accommodations ashore, certain beverages, gaming experiences, rock wall climbing, photography, WI-FI, specialty restaurants like the Chopstix, Street Food, International Grill, purchases from ship stores, or transactions of a personal nature such as medical services, laundry, spa treatments or salon services & our show Burlesque – The Bollywood way.",
    },
    {
        question: "What Is there to do On Board?",
        answer: "We offer something for everyone from new cruisers to those more experienced one. The choices are endless, from invigorating rock wall climbing activity to more relaxing massages at our spa. With Cordelia you'll discover an incredible array of options that make each day a delightful new adventure. You can enjoy evenings spent by watching movies under star or the amazing views from your lounge chairs.",
    },
    {
        question: "Will I get seasick?",
        answer: "Our ship is quite large & stable, and is therefore less prone to rolling motion. That being said, on most occasions you won’t even feel like you’re moving, especially in calmer waters. Also, motion will be the least in the middle of the ship as it is the natural balance point. <br/><br/>If you are prone to seasickness, please consider itineraries with fewer days at sea. It is recommended to consult your physician for medication or alternative remedy if you’re susceptible to motion sickness.",
    },
    {
        question: "Will lunch be provided if I report 4 hours early?",
        answer: "Depending upon the embarkation time, food facilities will be provided on-board.",
    },
    {
        question: "Is free drinking water available in the cabins?",
        answer: "Every stateroom is provided with 2 bottles of water (500 ml) per person per day.",
    },
    {
        question: "Can I bring along extra bottles of water with me?",
        answer: "It is not allowed to carry any consumable items on-board. Guests need to purchase drinking water on-board.",
    },
    {
        question: "Will I need to carry my own luggage to my cabins during embarkation and disembarkation? Will porterage be provided during sailings?",
        answer: "Porters will be there to assist in special cases however guests need to carry their own luggage after scanning.",
    },
    {
        question: "Are there wheelchairs available for senior citizens and differently-abled guests?",
        answer: "Wheelchairs are available on board the ship. Guests should notify the staff while booking the cabin or by calling the cruise expert as wheelchairs are limited in number. There will be no assistance provided by the crew members.",
    },
    {
        question: "Can the guests carry their own Wheelchairs?",
        answer: "Yes, but it is advisable to get a foldable wheelchair",
    },
    {
        question: "Is food permitted inside cabins?",
        answer: "There are dedicated areas on-board the cruise ship for various meals and eating, however, guests are not allowed to eat inside the cabins.",
    },
    {
        question: "Am I allowed to bring packaged foods/snacks/tuck on board?",
        answer: "Packaged foods, snacks, or any other kind of tuck is not allowed on board.",
    },
    {
        question: "Are guests allowed to smoke inside the staterooms?",
        answer: "Guests are not permitted to smoke inside the staterooms, and anyone found doing so would be penalised. If you wish to smoke, we have designated smoking areas onboard.",
    },
    {
        question: "Is this cruise ship couple-friendly?",
        answer: "Yes, the Empress is a couple friendly cruise ship.",
    },
    {
        question: "Are pets allowed onboard?",
        answer: "Pets are not allowed onboard.",
    },
    {
        question: "What should you pack?",
        answer: "Although there is no official dress code to be followed onboard, guests are encouraged to wear smart casuals. Passengers must strictly wear swimsuits/trunks when using the pool. When out in the open sea, evenings tend to get quite chilly, which is why it is recommended that guests bring along a sweater or a warm jacket. <br/> <br/> We have an onboard policy, and guests are recommended to read it.",
    },
    {
        question: "What are the visa Requirements for traveling to Sri Lanka?",
        answer: "Guests with an Indian Passport need to obtain a Sri Lankan visa online.",
    },
    {
        question: "Can I travel if my visa expires in six months?",
        answer: "You can travel before your visa expires, however if your passport is expiring within six months then a new visa cannot be provided.",
    },
    {
        question: "I am a single traveller. Will the prices be different for me?",
        answer: "Prices of the cruise are per person per day based on double occupancy in INR & vary based on the date of reservation, sailing date & stateroom category. Please refer to our pricing policy for single travellers.",
    },
    {
        question: "What is the Baggage policy?",
        answer: "Guests are encouraged to limit their luggage quantity. Each Guest is permitted to carry luggage to a maximum of 3 bags per person, with the condition that each bag weighs less than 20 kgs, and total weight should not exceed 50 kgs. In the event of the total weight of the baggage exceeding 50 kgs, excess baggage will be charged at Rs. 300 per kg.",
    },
    {
        question: "What currency is used onboard?",
        answer: "USD & INR are accepted. ROE for USD will be considered as on date of boarding.",
    },
    {
        question: "What items are prohibited onboard?",
        answer: "You cannot bring any item that is dangerous or illegal. This includes drugs, guns, explosives, animals and flammable items. E-cigarettes and hookahs also fall in this category. Outside liquor & food items are not permitted as well. High voltage devices like hair curling irons, clothing Iron, electric kettles, and hair dryers are not allowed.",
    },
    {
        question: "Can the guests carry their own wheelchair?",
        answer: "Yes, but it is advisable to get a foldable wheelchair.",
    },
    {
        question: "Are wheelchairs available for senior citizens and differently-abled guests?",
        answer: "Wheelchairs are available onboard. Guests must notify the staff while booking the stateroom as we have limited wheelchairs.",
    },
    {
        question: "What do I do in case I forget my belonging/s onboard?",
        answer: "We recommend you to have a checklist before disembarking & to not forget anything on the cruise. With that being said, if you do happen to forget something on the cruise, please get in touch with our customer support department. You can write to us at: support@cordeliacruises.com",
    },
    {
        question: "Can guests bring aerial drones onboard?",
        answer: "Aerial drones onboard are subject to prior permissions from the port authorities, CISF & the Ship Board Team.",
    },
    {
        question: "Am I allowed to carry my medicines on board?",
        answer: "Yes, you can carry all kinds of generic & prescribed medicines. Please carry the prescription/medical file in case of any specific prescribed medicines.",
    },
    {
        question: "What happens if I fall sick onboard?",
        answer: "We have a dedicated medical centre onboard on Deck 2, with a registered doctor and nurses to take care of you. Please note that professional medical services are not complimentary.",
    },
    {
        question: "If my child is below 12 months of age, can I bring them onboard?",
        answer: "Infants below 12 months of age are not allowed onboard for safety reasons.",
    },
    {
        question: "What if my child is 26 months old, will they be allowed to come onboard free or is it chargeable?",
        answer: "Any infant above 2 years of age is considered as a child. With that being said, extra beds will be chargeable",
    },
    {
        question: "If a lady is 24 weeks pregnant, will she be allowed to come onboard?",
        answer: "The cruise ship cannot, for health and safety reasons, carry guests who are beyond 24 weeks pregnant at the time of embarkation or will be during sailing. Cordelia Cruises reserves the right to request a medical certificate at any stage of pregnancy and to refuse passage if they are not satisfied that the guest will be safe during the passage.",
    },
    {
        question: "What are your safety measures for COVID 19?",
        answer: "<ul style='list-style: disc; padding: 0 18px'>" +
            "<li>Temperature checks & signed declarations by guests are mandatory</li>" +
            "<li>Guest staterooms and linens are sanitized & disinfected regularly</li>" +
            "<li>Common public areas & touch points are sanitized & sterilized hourly</li>" +
            "<li>Self-service in the dining areas is suspended, and areas for recreation & entertainment facilities are sanitized pre & post usage</li>" +
            "<li>Air filters & coils are checked and replaced as required to ensure healthy air quality in the staterooms</li>" +
            "<li>We have a dedicated 24*7 medical centre onboard with an isolation room available onboard as well</li>" +
            "<li>All our frontline crew members wear protective gear and undergo regular temperature checks</li>" +
            "<li>To ensure safety of our guests and staff, the water is checked several times during the day</li>" +
            "<li>Outside food and beverages are not allowed onboard</li>" +
            "</ul>",
    },
    {
        question: "Do I have to wear a face mask at ports of call?",
        answer: "While entering a port, guests should take care to observe all local mask ordinances that are in place, for the safety of everyone onboard and the locals at the port. While on our shore excursions, requirements will vary, but we generally expect that guests will be able to remove their mask in outdoor settings where they’re able to maintain a distance of at least 6 feet (2 meters) between their travel party and others. For tours that include indoor locations, we expect masks to be worn by guests aged 2 and older. We are continually evaluating the mask policy and will make revisions to the same as public health standards evolve.",
    },
    {
        question: "What happens to my paid cruise fare if I test positive for SARS-CoV-2 before the cruise and cannot join?",
        answer: "We can reschedule your booking Free of Cost Terms & conditions apply.",
    },
    {
        question: "What happens if I or someone from my traveling party has COVID-19 or communicable disease symptoms at the terminal? Will we be able to board the cruise?",
        answer: "In such a scenario, we can reschedule the booking free of cost. Terms & conditions apply.",
    },
    {
        question: "Will lunch be provided if guests report 4 hours early?",
        answer: "Depending upon the embarkation time, food facilities will be provided onboard.",
    },
    {
        question: "What is the minimum age for purchasing or consuming alcohol on the cruise?",
        answer: "Guests must be at least 21 years of age to be eligible to consume liquor and at least 25 years of age to consume hard liquor.",
    },
    {
        question: "Is free drinking water available in the stateroom?",
        answer: "Every stateroom is provided with a minimum of 2 bottles of water (500ml each) per person, per day. (Depending on the category of the staterooms)",
    },
    {
        question: "Can guests bring along extra bottles of water with me?",
        answer: "Consumable items (including water bottles) are not allowed onboard. If needed, guests can purchase drinking water onboard.",
    },
    {
        question: "Are guests allowed to eat inside the stateroom?",
        answer: "There are dedicated areas onboard the cruise ship for various meals and eating. With that being said, guests are not allowed to eat inside the stateroom.",
    },
    {
        question: "Are guests allowed to bring packaged foods/snacks/tuck onboard?",
        answer: "Packaged foods, snacks, or any other kind of tuck is not allowed onboard.",
    },
    {
        question: "Are Hookahs/Shishas available onboard?",
        answer: "Hookahs, Shishas & E-Cigarettes are not permitted onboard.",
    },
    {
        question: "Are there halal food options onboard?",
        answer: "Food served on board is halal and a certificate showing the same can be provided if necessary.",
    },
    {
        question: "Can we carry alcohol onboard?",
        answer: "Guests are not allowed to bring beer or any hard liquor onboard for consumption or any other use. Please note that alcoholic beverages seized at the time of embarkation will not be returned. Also, security may inspect containers, water bottles, soda bottles, mouthwash, luggage etc. as part of the checking process.",
    },
    {
        question: "Is jain food available onboard?",
        answer: "Our dedicated jain cuisine service whips up an array of authentic jain dishes for breakfast, lunch, & dinner. Rest assured that all meals are prepared keeping the cultural values in mind",
    },
    {
        question: "Are beverage packages available onboard?",
        answer: "Yes! Guests can purchase their preferred beverage packages onboard.",
    },
    {
        question: "Am I allowed to carry baby food onboard?",
        answer: "Yes, you can carry baby food onboard with prior notice.",
    },
    {
        question: "Is web check-in mandatory?",
        answer: "Yes! Web check-in is mandatory for all our guests as it helps us generate boarding passes which need to be produced at the gate & terminal to enter the restricted areas and come onboard. Please get in touch with our support team in case of any issues with web check-in.",
    },
    {
        question: "If I'm denied boarding at the pier or arrive late, can I board the ship at the next port?",
        answer: "No. Due to the specific boarding day processes required to evaluate the health of everyone onboard, we cannot have guests join the cruise downline once the ship has embarked",
    },
    {
        question: "What are the travel documents required onboard?",
        answer: "Guests need to complete their web check-in using our website/mobile site/application and download their boarding pass.<br/><br/>For domestic sailings along with your boarding pass please carry any original copy of government recognised identity proof from the following - Aadhar Card, Passport, Driving License, Voter ID, Pan Card. In case of an infant traveller for domestic travel please carry an original birth certificate. <br/><br/>For International Sailings you will need a Boarding Pass, Passport & Visa. In case of an infant passport is mandatory.",
    },
    {
        question: "What activities do you have onboard?",
        answer: "At Cordelia Cruises, there’s something for everyone, right from first-time cruisers to the more experienced ones. <br/>Speaking of which, the choices are endless, from invigorating rock wall climbing activity at the deck to relaxing massages at our spa. Onboard the Empress you'll discover an incredible array of options that will make every day a delightful new adventure.",
    },
    {
        question: "What are the embarkation timings?",
        answer: "All sailings have different embarkation timings. Rest assured, all guests will be notified of embarkation timings and other important details before sailing.",
    },
    {
        question: "What is the boarding pass for?",
        answer: "A boarding pass is a document provided to facilitate a seamless check-in, giving a guest permission to enter the port and to board the cruise ship. It identifies the guest’s name, the cruise voucher number, and the date & scheduled time of departure.",
    },
    {
        question: "Will I need to carry my own luggage to my stateroom during embarkation and disembarkation? Will porterage be provided during sailings?",
        answer: "All heavy baggage can be handed over to porterage, and will be delivered to your stateroom one hour after sailing. Porters will be there to assist, but guests would have to carry their own luggage after scanning. Luggage trolleys will be available at the terminal as well.",
    },
    {
        question: "What is the disembarkation process?",
        answer: "To ensure a smooth disembarkation process, similar to check-in & embarkation, times for disembarkation are also staggered. Guests will be advised and provided allocated time to disembark. This will usually occur on the last full day of your cruise (the day before you're due to disembark). Disembarkation is normally completed within 3 hours of the ship’s arrival, however, this can vary. For this reason, if you have post-cruise flights, we recommend you to choose flights that depart at least 5 to 7 hours after your cruise is scheduled to arrive at the port.",
    },
    {
        question: "Is there an itinerary/events schedule to guide guests about which show/activity is happening when?",
        answer: "Onboard the cruise, guests will get a day planner which has the schedule of all activities",
    },
    {
        question: "Will there be any language barrier faced on board?",
        answer: "Our multilingual crew hail majorly from India and other nations, but all crew members speak English. Rest assured that you will find someone who will be more than happy to chat with you in your own language",
    },
    {
        question: "Are there interconnecting rooms available?",
        answer: "There are interconnecting rooms within the interior and ocean view stateroom categories.",
    },
    {
        question: "Are there shopping options onboard?",
        answer: "Yes, we do have plenty of shopping options for guests onboard.",
    },
    {
        question: "What should I do in case I lose my key card?",
        answer: "Guests are requested to report this issue to the reception counter and collect their duplicate key card. Charges may be applicable for the same.",
    },
    {
        question: "Do Mini Suites come with 4 berths?",
        answer: "Occupancy for 4 guests is available in two stateroom categories – Interior and Ocean View. Triple occupancy is available in Mini Suite, Suite and Chairman’s suite.",
    },
    {
        question: "What is the size of the balcony in the suite?",
        answer: "The size of the balcony in Mini Suites is 25 sq. ft. & in Suites & the Chairman’s Suite it is 222 sq. ft.",
    },
    {
        question: "How many swimming pools are there on board?",
        answer: "We have one pool for adults & one kids’ pool, along with three Jacuzzis on-board.",
    },
    {
        question: "Are there any restricted areas for carrying a camera onboard?",
        answer: "The restricted areas may include the navigation bridge, machinery spaces, spaces with security related equipment, ventilation spaces, spaces containing IMDG cargo, accommodation, or any other areas specified as per the SSP.",
    },
    {
        question: "Is there an isolation/quarantine room available onboard in case a passenger develops COVID or COVID-like symptoms?",
        answer: "Yes, we do have an isolation/quarantine room available onboard.",
    },
    {
        question: "Are spa facilities included in my package?",
        answer: "Spa facilities are not included in your cruise fare. But you can avail the same by paying via your keycard.",
    },
    {
        question: "Are laundry services available onboard?",
        answer: "Yes, laundry services are available onboard for an additional charge.",
    },
    {
        question: "Can I upgrade my stateroom category onboard?",
        answer: "Stateroom category can be upgraded onboard as per the availability, with additional charges.",
    },
    {
        question: "What can kids explore at Cordelia Academy?",
        answer: "We have an amazing range of offerings from arts & crafts area, scavenger hunts, jewellery making, karaoke & a lot more. Cordelia Academy is a place of fun that’s filled with excitement & joy. Our experienced staff will always be available for any assistance. That being said, all kids need to be fully potty trained, as no diapers or pull-ups are allowed in the facility.",
    },
    {
        question: "What are the timings for the onboard bar?",
        answer: "The bars onboard are open as per usual timings, however the alcohol service will only open once the cruise ship crosses 12 nautical miles. ",
    },
    {
        question: "What are the prices of on board Wi-Fi packages? ",
        answer: "Wi-Fi package prices vary with every sailing date. The packages start from US $ 7 onwards. You will be provided with more details once you commence your booking process.",
    },
    {
        question: "What are the onboard smoking regulations?",
        answer: "<ul style='list-style: lower-latin; padding: 0 18px'>"+
        "<li>Keeping in mind the preferences of our smoking as well as non-smoking guests, and in compliance with international standards, smoking is permitted only in designated areas only.</li>"+
        "<li>Smoking is strictly prohibited in all staterooms and stateroom balconies. Cordelia Cruises reserves the right to levy a fine up to US $ 1000 (or its equivalent) should passengers be found smoking outside the designated areas and it may also lead to forthwith disembarkation. Throwing cigarette butts over the side of the ship is also strictly prohibited and shall attract heavy fines.</li>"+
        "<li>Consumption of substances like pan masala/gutka/chewing tobacco by any guest is not encouraged onboard. Any instances of spitting in and around the cruise ship especially in the smoking zones and staterooms by guests shall attract fines of up to US $ 1000 (or its equivalent).</li>"+
        "</ul>"
        ,
    },
    {
        question: "Can I pay for expenses using cash onboard?",
        answer: "Upon embarkation, you will be provided with a key card. This card can be recharged as per your requirements and is what needs to be used for all onboard facilities. You can upload credit onto your key card using debit & credit cards, or cash. If there are any credits left in your key card at the end of your trip, that amount will be refunded back to you.",
    },
];

const faqStringInternational = [
    {
        question: "Is a passport mandatory for traveling to Sri Lanka?",
        answer: "Yes, a valid passport is mandatory for all guests traveling to Sri Lanka, with a minimum validity of 6 months.",
    },
    {
        question: "Are vaccinations required for travel?",
        answer: "Fully vaccinated passengers are allowed to disembark for sightseeing. RTPCR reports are not mandatory but recommended for unvaccinated passengers (subject to Sri Lanka's COVID-19 rules).",
    },
    {
        question: "Is a visa mandatory for all travelers, including children and infants, traveling to Sri Lanka?",
        answer: "Yes, a valid visa is required for all guests, regardless of age, traveling to Sri Lanka.",
    },
    {
        question: "For sailings with multiple ports of call in Sri Lanka, is a transit visa sufficient?",
        answer: "A valid tourist visa is required for all international sailings, regardless of the duration of each stopover.",
    },
    {
        question: "Are unvaccinated passengers allowed to travel to Sri Lanka with an RTPCR report?",
        answer: "- Only fully vaccinated passengers are allowed to travel to Sri Lanka. Unvaccinated passengers are recommended to carry an RTPCR report, although it is not currently mandatory (subject to Sri Lanka's COVID-19 rules).",
    },
    {
        question: "How can travellers obtain a tourist visa for Sri Lanka?",
        answer: "The tourist can apply for visa online. Visa & Visa fee is NOT included in the package price.",
    },
    {
        question: "Will the ship collect and return guests' passports for immigration processing?",
        answer: "Yes, for all international sailings, the on-board team will collect hard copies of passengers' passports to process immigration.",
    },
    {
        question: "Where will immigration take place for sailings to Sri Lanka?",
        answer: "The Sri Lanka Immigration team will board the ship in Chennai, and they will stamp passports during transit.",
    },
    {
        question: "Will immigration occur in Chennai for the Chennai -At Sea -Chennai sailing, or on the ship since this is a transit itinerary?",
        answer: "No, immigration is not required for this domestic sailing.",
    },
    {
        question: "Are copies of passports and visas required?",
        answer: "Not Mandatory , however it's advisable to carry 1 copies of all documents handy.",
    },
    {
        question: "What are the traditional Sri Lankan foods and drinks I should try during my visit?",
        answer: "A few must-try Sri Lanka cuisine are: <br/>" +
            "<strong>Hoppers (appa)</strong> - A popular breakfast food in Sri Lanka, made with a fermented rice flour batter and cooked in a bowl-shaped pan. <br/>" +
            "<strong>Kottu roti</strong> - A popular street food in Sri Lanka, made with chopped roti bread, vegetables, and meat or eggs, cooked on a griddle. <br/>" +
            "<strong>String hoppers (idiyappam)</strong> - A steamed rice noodle dish that is typically eaten for breakfast, served with a coconut-based curry or sambol.<br/>" +
            "<strong>Arrack</strong> - A distilled alcoholic drink made from the sap of coconut flowers, often mixed with soda or coconut water.<br/>" +
            "<strong>Ceylon tea</strong> - Sri Lanka is known for its tea plantations, and the country produces some of the world's finest teas. Be sure to try some of the local teas, such as Ceylon black tea or green tea.<br/>" +
            "<strong>Wood apple juice (diwul)</strong> - A sweet and tangy juice made from the pulp of the wood apple fruit, which is believed to aid digestion.<br/>",
    },
    {
        question: "What are the cultural norms and customs I should be aware of when visiting Sri Lanka?",
        answer: "Here are some cultural norms and customs one should be aware of while visiting Sri Lanka: " +
            "<ul>" +
            "<li>● Dress modestly</li>" +
            "<li>● Remove shoes before entering a temple or someone’s house</li>" +
            "<li>● Avoid public displays of affection</li>" +
            "<li>● Respect religious customs</li>" +
            "<li>● Don't touch someone's head</li>" +
            "<li>● Show respect to elders by using formal greetings like 'ayubowan' (may you have a long life) or 'vanakkam' (hello)</li>" +
            "</ul>",
    },
]

export default function HealthWavePolicy({ }: Props) {
    const destination = new window.URLSearchParams(window.location.search).get('destination');
    const [searchString, setSearchString] = useState("");
    const [internationalSearchString, setInternationalSearchString] = useState("");
    const [faqs, setFaqs] = useState(faqString);
    const [internationalFaqs, setInternationalFaqs] = useState(faqStringInternational);
    const [faqFor, setFaqFor] = useState(destination === 'international' ? 2 : 1);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSearch = (event: any) => {
        setSearchString(event.target.value)
        let searchIndex = event.target.value;
        //     faqString = BackupFAQ;
        let faqStrings = faqString.filter((element) => {
            return (element.question.toLowerCase().includes(searchIndex.toLowerCase()) || (element.answer.toLowerCase().includes(searchIndex.toLowerCase())));
        });
        setFaqs(faqStrings);
    };
    const internationalHandleSearch = (event: any) => {
        setInternationalSearchString(event.target.value)
        let searchIndex = event.target.value;
        let faqStringInternationals = faqStringInternational.filter((element) => {
            return (element.question.toLowerCase().includes(searchIndex.toLowerCase()) || (element.answer.toLowerCase().includes(searchIndex.toLowerCase())));
        });
        setInternationalFaqs(faqStringInternationals);
    };
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <h1 className='text-2xl lg:text-4xl font-semibold'>Frequently asked Questions</h1>

                <div className='py-5 pt-7'>
                    <Button text='Domestic' type={faqFor === 1 ? 'primary' : 'secondary'} handleClick={() => setFaqFor(1)} />
                    <Button text='International' type={faqFor === 2 ? 'primary' : 'secondary'} handleClick={() => setFaqFor(2)} className='ml-3' />
                </div>
                {faqFor === 1 ?
                    <div>
                        <div className='my-8 mt-2'>
                            <div className='rounded-md text-sm placeholder:text-sm placeholder:text-gray-100 bg-gray-400/30 w-full border-2 border-gray-300/70 shadow-sm flex justify-between'>
                                <input
                                    className="w-full py-5 px-5 focus:outline-none bg-gray-400/30"
                                    placeholder="Search"
                                    type="input"
                                    value={searchString}
                                    onChange={() => handleSearch(event)}
                                />
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/search-icon.svg"
                                    className="w-5 mr-4"
                                    alt="Cruise"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="">
                            {faqs.map((val, i) => (
                                <div className='border border-gray-300 rounded shadow-md mb-3 cursor-pointer' key={i}>
                                    <Accordion title={`${i + 1}  -  ${val.question}`}
                                        titleClass="lg:text-lg text-base font-semibold py-4 px-4"
                                    >
                                        <div className='px-4 pb-5 cursor-default'>
                                            <p className='text-sm lg:text-base font-medium' dangerouslySetInnerHTML={{ __html: val.answer }} />
                                        </div>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div>
                        <div className='my-8 mt-2'>
                            <div className='rounded-md text-sm placeholder:text-sm placeholder:text-gray-100 bg-gray-400/30 w-full border-2 border-gray-300/70 shadow-sm flex justify-between'>
                                <input
                                    className="w-full py-5 px-5 focus:outline-none bg-gray-400/30"
                                    placeholder="Search"
                                    type="input"
                                    value={internationalSearchString}
                                    onChange={() => internationalHandleSearch(event)}
                                />
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/search-icon.svg"
                                    className="w-5 mr-4"
                                    alt="Cruise"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="">
                            {internationalFaqs.map((val, i) => (
                                <div className='border border-gray-300 rounded shadow-md mb-3 cursor-pointer' key={i}>
                                    <Accordion title={`${i + 1}  -  ${val.question}`}
                                        titleClass="lg:text-lg text-base font-semibold py-4 px-4"
                                    >
                                        <div className='px-4 pb-5'>
                                            <p className='text-sm lg:text-base font-medium' dangerouslySetInnerHTML={{ __html: val.answer }} />
                                        </div>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </main>
            <ExitIntent />
        </Layout>
    );
}