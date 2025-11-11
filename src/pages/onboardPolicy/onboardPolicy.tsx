import React, { useEffect } from 'react'
import useMetaTags from 'react-metatags-hook';
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export default function PaymentSuccess({ }: Props) {
    useMetaTags({
        title: 'Onboard Policies - Must-Know Before You Get On A Cruise | Cordelia Cruises',
        description: 'On-Board Policies akin to drugs, liquor, smoking, pool, cabin, luggage & more. Ensure a smooth Cordelia Cruise sail by following the Code Of Conduct.',
        metas: [
          {
            name: 'keywords',
            content:
              'drug and alcohol policy onboard ships, cruise policies, cruise liquor, cruise alcohol, smoking on cruise ships, cruise pregnancy policy'
          },
        ],
      })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Layout>
            <main className="container mx-auto pt-24 pb-24 lg:pt-36 lg:pb-36 px-9">
                <h1 className='text-3xl font-semibold'>Onboard Policy</h1>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>(For more information kindly refer to Terms & Conditions of Cordelia Cruises Passenger Cruise Ticket Contact)</p>

                <div className='border-t-2 my-10 border-gray-300' />

                <ul className='list-[upper-roman] text-sm lg:text-lg '>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Decorating Your Cabin Door and Cabin
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We recognize some of our passengers like to decorate their cabins and we, too, love seeing your creative decorations. However, for safety reasons, decorations may consist only of fire-retardant materials and shall be installed at the sole discretion of the management of Cordelia Cruises.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Cabin Safe
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            For our passenger's convenience and security, a safe may be provided in every cabin. Passengers may utilise the safe at their own risk and Cordelia Cruises shall not be responsible for the same.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Pool Safety
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia Cruises is committed to providing a safe and enjoyable environment for all of our passengers in all aspects of their cruise experience. This includes pool safety, which we have always taken very seriously.
                            <br /><br />
                            Vigilance and awareness is clearly proven to be the best means for ensuring safety when using water facilities such as pools and waterparks and everyone, including parents and employees, share in that responsibility. To that end, we have made and will continue to make significant investments in training our lifeguards positioned around pool areas through highly respected water safety training organizations on water safety, CPR and first aid as well as being prepared to initiate proactive intervention if necessary.
                            <br /><br />
                            To offer an additional layer of safety, we may provide complimentary swim life vests for use in ship pools. However, Cordelia Cruises does not guarantee life vests to each Passenger onboard. Standard aquatic safety equipment is located at each pool.
                            <br /><br />
                            Pools are generally open from 8:00 am to 6:00 pm; however, hours may vary at the sole discretion of Cordelia Cruises.
                            <br /><br />
                            The following Pool Rules signage is posted at all pools, fleet wide:
                        </p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-disc py-2'>
                            <li>No Lifeguard on Duty</li>
                            <li>Parents are responsible for their children</li>
                            <li>No children in diapers or who are not toilet-trained</li>
                            <li>Use pool at your own risk</li>
                            <li>Showers are required prior to use</li>
                            <li>Watch your step on wet surfaces</li>
                            <li>Use ladder and handrails to enter and exit the pool</li>
                            <li>Do not use it if you are experiencing diarrhoea, vomiting or fever and passengers experiencing any such symptoms should immediately report to the Medical Centre.</li>
                            <li>No running, horseplay, jumping or diving</li>
                            <li>No glass containers, eating or smoking</li>
                            <li>Take children on frequent bathroom breaks</li>
                        </ul>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Visitors’ Policy
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia Cruises has a <span className='text-bold'>"No Visitor"</span> policy for the entire fleet. This applies to all ports of embarkation and ports of call. Passengers sailing on our cruises will not be permitted to have visitors on board to see them off. This policy was implemented to improve our overall security program and enhance the on board experience for our passengers during embarkation day.
                            <br /><br />
                            The following <span className='text-bold'>exception</span> applies to this policy:
                            Wedding Passengers attending a wedding ceremony/reception or visitors attending any type of party/reception onboard that has been previously arranged by the Voyage charters/Wedding Services Department, will follow the policies stated by this Department.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Cruise Ship Safety Features
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia Cruises provides a safe and enjoyable vacation experience to all its passengers and we can assure you that the safety of our passengers and crew is our ultimate priority. Cordelia Cruises’ fleet has an excellent safety record and we work closely with numerous regulatory agencies to ensure the safety of our passengers and crew.
                            <br /><br />
                            A typical Cordelia Cruises ship has approximately 4000 smoke sensors, which sound on the ship's bridge. The bridge is manned 24 hours a day whether a ship is at sea or in port. The sensors are located in every passenger and crew cabin as well as all public areas. The sensors are ultra-sensitive by design. As a result, the bridge receives a number of false alarms each day. In cabins, for example, cigarette smoke and even hairspray can set off an alarm. Therefore, it is the cruise industry's belief that locally sounding alarms would cause undue panic and chaos on a regular basis. In the event of a real emergency, such panic could undermine the successful execution of emergency procedures. When a cabin smoke alarm sounds, a bridge officer immediately deploys roving fire team personnel to investigate the area.
                            <br /><br />
                            Every Cordelia Cruises ship contains a surplus of life jackets well above the total number of passengers and crew and above what is required by maritime law. Life jackets are located within passenger cabins and there are additional jackets at lifeboat stations and on board the lifeboats themselves. Life jackets are available in Adult, Child and Infant sizes.
                            <br /><br />
                            The official language of our ships is English, however our crew would gladly assist passengers in major Indian regional languages as well. All crewmembers that conduct the lifeboat drill would be responsible for directing passengers in the event of an emergency.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Code of Conduct
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We welcome you aboard and wish you a wonderful vacation on our vessel. We want every passenger to have a truly enjoyable cruise experience. Therefore, please be considerate of your fellow passengers while on board. Cordelia Cruises will not tolerate any behaviour affecting the comfort, enjoyment, health, safety or well-being of other passengers or our crew. We reserve the right to refuse or discontinue passage to anyone who, in Cordelia Cruises’ judgment, is conducting themselves in a manner that adversely affects the cruise experience of others. Passengers are strongly advised to read all the Cruise policies before embarkation.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Security Access System
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            All Cordelia Cruises ships use a visual identification security access system to enable only authorized individuals to access the vessels. This system records the movement of passengers and crew who enter and exit the ship and requires the capture of a security photo. Each passenger (including infants/children) will be issued a Access Card which is used as a cabin key and to make purchases. The Access Card is also scanned when entering and exiting the ship.
                            <br /><br />
                            Cordelia Cruises’ security screening policies do not provide exceptions for religious or cultural beliefs. When security photos are taken, passengers must remove hats and sunglasses and we will enforce the same for those who may be wearing veils or burqas blocking any portion of their face. Since turbans do not block the face, it is not necessary to remove them for the security photo. When any of these items needs to be removed for secondary screening, it will be done in a private location, if requested. Anyone unwilling to remove these items for the security photo or secondary security screening (when necessary), will be denied boarding and no exceptions will be made.
                            <br /><br />
                            Going Ashore:
                            When debarking or embarking the ship at a port of call, passengers (and crew) will have their Access Card scanned. Passengers under 18 years of age must be accompanied by an adult within the same travel group in order to get off the ship.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Policy for Children While at Youth Programs During Emergencies
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            All children 11 years of age and younger must wear a muster station wristband or its equivalent as provided by Cordelia Cruises, throughout the cruise. In the event of an emergency, children participating in Camp Cordelia Cruises activities will be taken to a designated assembly area (this will vary from ship to ship). The children will be divided into the appropriate groups according to their muster station by the Youth Staff. During an emergency situation, the parents should collect their own life jackets and their child's life jacket from their cabin and proceed directly to their muster station. The Youth Staff will deliver all children to their parents muster stations according to their muster station wristbands.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            What to Wear - Evenings
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Most evenings we have a 'Cruise Casual' dress code but there are those 'Cruise Elegant' evenings one or two nights throughout the voyage where passengers will have the opportunity to showcase their more elegant attire.
                            <br /><br />
                            The dress code in the dining rooms applies to both adults and children
                        </p>
                        <p className='text-sm lg:text-base font-semibold my-1'>Cruise Casual Dress Code</p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-disc pb-2'>
                            <li>Men: sport slacks, khakis, Jeans (no cut-offs), dress shorts (long) and collared polo shirts</li>
                            <li>Women: summer dresses, casual skirts, pants, capris, dress shorts, Jeans (no cut-offs) blouses, and tops</li>
                            <li><span className='font-bold'>Not permitted:</span> Cut-off Jeans, men's sleeveless shirts, tee-shirts, gym or basketball shorts, baseball hats, flip-flops and bathing suit attire</li>
                        </ul>
                        <p className='text-sm lg:text-base font-semibold my-1'>Cruise Elegant Dress Code</p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-disc pb-2'>
                            <li>Men: dress slacks, dress shirts, and we also suggest a sports coat. Men may also choose to wear a suit or a tuxedo</li>
                            <li>Women: cocktail dresses, pantsuits, elegant skirts, and blouses, ladies may also choose to wear an evening gown</li>
                            <li><span className='font-bold'>Not permitted:</span> Jeans, men's sleeveless shirts, shorts, tee-shirts, sportswear, baseball hats, flip-flops and bathing suit attire</li>
                        </ul>
                        <p className='text-sm lg:text-base font-semibold my-1'>Cruise Elegant Evenings / Formal Nights:</p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                        The length of the cruise determines the number of 'Cruise Elegant’ evenings in the Dining Rooms. Passengers shall be notified.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            What to Wear - Daytime
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Casual attire is the order of the day. We suggest the following:
                        </p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-disc py-2'>
                            <li>Men: dress slacks, dress shirts, and we also suggest a sport coat; men may also wish to wear a suit and tie or tuxedo</li>
                            <li>Women: Cocktail dresses, pantsuits, elegant skirts and blouses; ladies may also wish to wear an evening gown</li>
                            <li>Not permitted: Jeans, men’s sleeveless shirts, shorts, tee-shirts, sportswear, baseball hats, flip-flops and bathing suit attire</li>
                        </ul>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Smoking Policy
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia Cruises is dedicated to the safety of all passengers and crew. We want all our passengers to have a safe, fun and memorable vacation. Smoking is a fire and safety hazard on a ship. All passengers are expected to strictly adhere to the following safety guidelines:
                        </p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-disc py-2'>
                            <li>All cabins and suite accommodations, including outside balconies, are NON-SMOKING. This policy applies to all forms of smoking, including but not limited to cigarettes, cigars, pipes, vaporizers, electronic cigarettes.</li>
                            <li>Cordelia Cruises strictly prohibits possession and use of any narcotic and/ or psychotropic substance and other illegal controlled substances. Any violation hereof shall result in punitive actions as prescribed under relevant laws.</li>
                            <li>Any violation of this policy will result in a charge upto $1000 charge, per violation, posted on the passenger’s account and may also result in the disembarkation of all passengers in the cabin.</li>
                            <li>Passengers who are disembarked for violating our policy will be responsible for all financial charges and expenses to return home, and no refund of their unused cruise fare will be provided. Additionally, they may be prohibited from sailing with Cordelia Cruises Cruise Line in the future.</li>
                            <li>Our smoking policy is included in Cordelia Cruises Passenger Cruise Ticket Contract.</li>
                            <li>Passengers who are concerned about other passengers violating our smoking policy should contact our onboard Passenger Services team, so we can address the situation. This will help avoid uncomfortable situations between passengers.</li>
                        </ul>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Safety Briefing - Muster Station Drill
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            According to SOLAS (Safety of Life at Sea), Chapter III, Regulations 19.2.2. and 19.2.3, whenever new passengers embark, a passenger Safety Briefing shall be given immediately before sailing or immediately after sailing. Passengers shall be instructed in the use of the lifejackets and the action to take in an emergency. Therefore, when the signal for the Safety Briefing is sounded, passengers will no longer be required to go to their cabin to collect their lifejackets. They will proceed directly to their assigned muster station from their location at that time.According to SOLAS (Safety of Life at Sea), Chapter III, Regulations 19.2.2. and 19.2.3, whenever new passengers embark, a passenger Safety Briefing shall be given immediately before sailing or immediately after sailing. Passengers shall be instructed in the use of the lifejackets and the action to take in an emergency. Therefore, when the signal for the Safety Briefing is sounded, passengers will no longer be required to go to their cabin to collect their lifejackets. They will proceed directly to their assigned muster station from their location at that time.
                            <br /><br />
                            The letter of the muster station to which the passenger is assigned (according to cabin number) is printed on the left bottom corner of the Passenger’s Access card. The passenger will need to have the Access card in hand during the Safety Briefing.
                            <br /><br />
                            During the Safety Briefing, the Evacuation Personnel will be visible to all passengers and demonstrate how to wear a lifejacket. This procedure will improve the passenger’s experience and prevent unnecessary accidents due to hanging strings from the lifejackets as well as heat exhaustion at the muster stations during summer-type weather.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Liquor and Beverage Policy
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia Cruises prohibits liquor consumption by minors and the quantities consumed by Adults that lead to the disruptive behaviour of others on board for safe onboard environment. This policy pertains to all cruise durations.
                            <br /><br />
                            Guests must be above 21 (twenty-one) Years of age or as per applicable law for consuming Liquor. The Guest is strictly prohibited from sharing or offering liquor to any other Guest below age of 21(twenty-one) years. Guest agrees that he shall drink responsibly on board complying with all Ship policies and Code of Conduct. Moreover, Cordelia Cruises shall not be liable for any health issues caused to any guest due to such Liquor consumption. Cordelia Crew member reserves the right to refuse to serve alcohol to any Guest in his own discretion.
                            <br /><br />
                            Guests are strictly prohibited from bringing any alcoholic/ non-alcoholic beverages on board. Cordelia Cruises reserves the right to confiscate the alcohol in possession of the Guest and shall return the same on disembarkation of the Guest. Any storage done by Cordelia Cruises in this respect shall be at the risk and cost of the Guest and Cordelia Cruises will not be responsible for any loss/ damage or theft of Guests Alcohol while stored.
                            <br /><br />
                            We know some of our passengers are accustomed to bringing on board their own supply of bottled water. Passengers are not allowed to carry their own filled water bottles and the same shall be confiscated onboard. However, Cordelia Cruises provide 2 water bottles of 500ml each per cabin per day at no extra cost to the passengers. Any additional water bottle per day has to be purchased by the passenger as per the Menu price. The said purchase is non-refundable; passengers may take home any unopened bottles. Cordelia Cruises carries distilled water which can be purchased either pre-cruise or once on board.
                            <br /><br />
                            Liquor purchased onboard and taken home may be subject to Customs duty and must be declared on the Customs Declaration form.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Casino policy
                        </p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-[roman] py-2'>
                            <li>
                                <p className='text-sm lg:text-base font-bold'>Age</p>
                                <p className='text-sm lg:text-base mb-2'>Guests must be 21 years of age or older, always subject to relevant applicable laws and regulation to play the tables and the slot machines; guests under 21 years of age are not permitted in the casino at any time. A valid original government photo ID should be carried for verification and the same will have to be furnished upon request. Passport is a must for all international guests visiting and they will have to furnish the same upon request. Security procedures, including frisking remain the right of the Management.</p>
                            </li>
                            <li>
                                <p className='text-sm lg:text-base font-bold'>Code of Conduct</p>
                                <p className='text-sm lg:text-base mb-2'>The Dress Code for Casinos is Formal or Smart Casuals. Shorts, sleeveless t –shirts, track pants, flip flops, and slippers are not permitted. Safeguarding of baggage would incur extra charges. No dangerous or potentially hazardous objects including but not limited to weapons, knives, guns, fireworks, helmets, laser devices, bottles, musical instruments will be allowed onboard. Photography and Videography are not allowed on any casino floors. People in an inebriated state will not be allowed entry onboard or into any casino onboard Cordelia Cruises. Management reserves the right to stop serving alcoholic beverages; to guests they believe are in an inebriated state. People found in an inebriated state onboard will be asked to leave the premises immediately. Damages and cleaning charges will be claimed if any. Management also reserves the right to remove individuals from casinos in case of unruly or disruptive behaviour.</p>
                            </li>
                            <li>
                                <p className='text-sm lg:text-base font-bold'>Casino Hours</p>
                                <p className='text-sm lg:text-base mb-2'>Due to itineraries, casino hours may vary at the sole discretion of Cordelia Cruises.</p>
                            </li>
                            <li>
                                <p className='text-sm lg:text-base font-bold'>Tournaments</p>
                                <p className='text-sm lg:text-base mb-2'>We generally conduct a variety of tournaments on nearly all itineraries. Tournament schedules vary.</p>
                            </li>
                            <li>
                                <p className='text-sm lg:text-base font-bold'>Money</p>
                                <p className='text-sm lg:text-base mb-2'>Cash is accepted at all tables and slot machines on Cordelia Cruises. The rates are subject to change without prior notice. Players will set up a requisite Player account in order to upload and download credits. Winnings must be cashed out from your Player account at the Casino Cashier’s Desk by the last night of your Cruise. You may also access these funds for continued gaming action at another slot machine. All transactions and operations of casino including winnings by Guest shall be subject to governmental laws, applicable taxes and governmental charges. Table limits vary and are modified to best suit the guests on board. Please consult the casino staff once on board for further details.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Prohibited Items on Cordelia Cruises
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            To maintain a safe and secure shipboard environment by prohibiting certain items considered by the Company to be dangerous or that pose a risk to the crew, passengers or ship.

                            According to our policy, Cordelia Cruises conducts security scanning of all luggage and if prohibited items are found, they will be removed and disposed of and no compensation will be given. We suggest that all luggage be unlocked before turning it over to the porters in order to avoid any inconvenience to you or delay in delivering the luggage to your cabin. For additional information, please refer to the terms and conditions of the Passenger Cruise Ticket Contract.
                        </p>
                        <p className='text-xs lg:text-base font-bold !leading-5 mt-1 underline'>
                            Before you pack, please take the time to review the following:
                        </p>
                        <p className='text-xs lg:text-base font-bold !leading-5 mt-2'>
                            Prohibited Items on Cordelia Cruises
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            The following items are prohibited and their possession is not allowed on board any Company ship by passengers or crew without a valid lawful reason, unless required in direct support of ship operations, as part of a crew member's official duties, and only with consent of the Ship's Master.
                        </p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-disc py-2'>
                            <li>Any illegal narcotics/drugs including synthetic, designer drugs, Cannabidiol (CBD) and medical marijuana</li>
                            <li>All firearms Including replicas, toys, Imitations and their components</li>
                            <li>Air, BB or pellet pistols or rifles</li>
                            <li>Any other projectile-weapon (e.g., paintball guns)</li>
                            <li>All ammunition</li>
                            <li>All explosives, including imitation explosives and devices</li>
                            <li>Fireworks, flares, pyrotechnics (excluding those which are part of the vessel's lifesaving equipment and which have been properly manifested)</li>
                            <li>Sharp pointed weapons including throwing stars</li>
                            <li>Knives with a blade longer than 4 inches / 10.16 cm, any blade length that is prohibited by local laws/regulation and all concealed bladed weapons such as belt buckle knives, cane and umbrella knives/swords, pen knives, credit card knives, etc.</li>
                            <li>Open razors or scissors with a blade longer than 4 inches / 10.16cm</li>
                            <li>Skean, Dhus or Kirpans</li>
                            <li>Spears for spearguns</li>
                            <li>Crossbows, crossbow bolts and longbow arrows</li>
                            <li>Blunt weapons including knuckle dusters, brass knuckles, clubs, coshes, batons, flails or nunchaku</li>
                            <li>Items containing incapacitating substances (e.g. gas guns, tear gas sprays, mace, phosphorus, acid and other dangerous chemicals that could be used to maim or disable)</li>
                            <li>Flammable substances and hazardous chemicals unless carried in limited quantities and in accordance with company instructions (e.g., petrol, methylated spirits, paint thinners etc.)</li>
                            <li>Any other item made, adapted or intended for use as an offensive weapon</li>
                            <li>Stun devices</li>
                            <li>Handcuffs</li>
                            <li>Items brought on board the vessel and not supplied by the Company containing any kind of heating element or any home appliances, such as but not limited to: immersion heaters, heating blankets, flat irons, water heaters, rice cookers, hair dryers, coffee machines with heating/hot plates, etc.</li>
                            <li>Any remotely controlled or autonomously flying devices, toys or drones</li>
                            <li>Self-balancing hoverboards, air wheels, scooters or Segway’s.</li>
                            <li>Compressed gas tanks, bottles, cylinders including dive tanks, propane tanks and aerosol cans</li>
                            <li>Emergency Position Indicating Radio Beacons (EPIRB), ham radios (except with valid license and permission), communication scanners, wide-band receivers, satellite phones, transformers, lasers and laser pointers</li>
                        </ul>

                        <p className='text-xs lg:text-base font-bold !leading-5 mt-2'>
                            Cordelia Cruises’ Additional Prohibited Items, Exemptions and Other Considerations
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            In order to maintain a safe and secure environment, Cordelia Cruises additionally prohibits the following items from being brought on board. Additionally, we reserve the right to confiscate or dispose of any articles that in our discretion are considered dangerous or pose a risk or inconvenience to the safety and security of the ship, or our passengers, and no compensation will be provided.
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 underline mt-2'>Additional Prohibited Items</p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-[roman] py-2'>
                            <li>Clothing irons and steamers, laundry service is also available for a nominal fee.</li>
                            <li>Electrical and household appliances, such as a coffee maker, hot plate, toaster, heating pad, humidifier, etc</li>
                            <li>Hookahs</li>
                            <li>Alcohol (of any kind and category) and Beer</li>
                            <li>Non-alcoholic beverages</li>
                            <li>No homemade/outside Food Items permitted on board regardless whether it is pre-packaged and unopened; pre-cooked foods. Any such food items shall be confiscated at the time of check in process. Strict prohibition on outside/home-made food items are directly related to concerns for food safety and contamination prevention onboard the ship. Cordelia Cruises reserves the right to discard any confiscated perishable food items.</li>
                            <li>Large coolers</li>
                            <li>Candles and Incense</li>
                            <li>Knives with blades longer than four (4) inches (Recreational dive knives are allowed but must be held in the custody of the Passenger Services Manager or Chief Security Officer and must be checked out/in by the owner for dive excursions during the cruise.)</li>
                            <li>Scissors with blades longer than four (4) inches (Large scissors of the type used by scrapbook and quilting enthusiasts are at times permitted with prior notification from the Security Services Department but are held on board in the same manner as dive knives.)</li>
                            <li>Bicycles (refer to Exemptions)</li>
                            <li>Wagons (refer to Exemptions)</li>
                            <li>Surfboards, boats and canoes</li>
                            <li>Scooters (only permitted if used for mobility – must be stored in passenger’s cabin)</li>
                            <li>Inflatable Kiddie Pool</li>
                            <li>Any footwear with wheels, such as, Heely’s type shoes</li>
                            <li>Kava</li>
                            <li>Fish of any kind; if fish are caught during an excursion, they must be shipped home.</li>
                        </ul>
                        <p className='text-xs lg:text-base font-medium !leading-5 underline mt-2'>Exemptions</p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-[roman] py-2'>
                            <li>Personal grooming devices are allowed on board after disclosing the same to crew of Cordelia Cruises and when used with proper caution. However, if such devices are determined to pose a hazard, they will be removed and returned the last day of the cruise prior to debarkation.</li>
                            <li>Electronics such as laptops, cameras, cellular phones, etc. are allowed on board when used with proper caution.</li>
                            <li>Electrical devices such as fans, power strips, multi plug box outlets/adaptors, and extension cords (without surge protectors) are allowed on board when used with proper caution. However, if such devices are determined to pose a hazard, they will be removed and returned the last day of the cruise prior to debarkation.</li>
                            <li>Medical gas bottles/oxygen cylinders are allowed in connection with a certified medical condition but cannot be packed in baggage. Oxygen cylinders must be delivered to Passenger Services and stored in a designated safe area. Cordelia Cruises should know reasonably prior to boarding if a passenger is bringing or requires oxygen cylinders.</li>
                            <li>Coolers: Small, personal-sized coolers no larger than 12” x 12” x 12” for the purpose of housing small quantities medications are permitted as carry-on luggage.</li>
                            <li>Live Animals: Only qualified service animals upon obtaining prior written permission from the management of Cordelia Cruises.</li>
                            <li>Flowers and Plants: Only permitted on board if ordered through Cordelia Cruises’s Fun Shops or delivered by a florist in the port of embarkation.</li>
                            <li>Musical Instruments: We will allow musical instruments on board, however, if a noise complaint is received, the instrument will be confiscated by shipboard security and returned to the passenger on the last day of the cruise prior to debark.</li>
                            <li>Radios/BoomBoxes: For the comfort of all our passengers, radios and boomboxes can be used with headphones or earpieces when used in public areas.</li>
                            <li>Ham Radios/Amateur Radio Equipment: Permitted to be used on board Cordelia Cruises ships with appropriate equipment licenses.</li>
                            <li>Google Glasses are permitted on board in public areas but cannot be worn at any gangway operation.</li>
                            <li>Floatation Devices: For the comfort of all our passengers, rafts, tubes and floatation devices other than those used as life preservers (water wings) cannot be used in the swimming pools on board.</li>
                            <li>Wrapped Gifts: Passengers may bring wrapped gifts on board; however, due to heightened security, the gift may have to be unwrapped, upon request.</li>
                            <li>Digital Cameras/Camcorders, DVDs/VCRs, USB sticks, iPods, Nintendo/XBox Play Units cannot be used with the TV in the passenger's cabin or suite as the connection ports are disabled.</li>
                            <li>Seashells may be brought onboard from the ports visited if they appear to be clean and sanitized and do not have the odour of a living organism.</li>
                        </ul>
                        <p className='text-xs lg:text-base font-medium !leading-5 underline mt-2'>Exemptions - Items for Port Use Only (The following items may be brought on board but can only be used off the ship, for port use only. All items must be stored in the passenger’s cabin.)</p>
                        <ul className='px-6 text-sm lg:text-base font-semibold list-[roman] py-2'>
                            <li>Drone Cameras</li>
                            <li>Snorkel gear</li>
                            <li>Golf clubs</li>
                            <li>Fishing rods</li>
                            <li>Tennis rackets</li>
                            <li>Kites</li>
                            <li>Roller blades or skates</li>
                            <li>Metal detectors</li>
                            <li>Beach chair</li>
                            <li>Umbrella</li>
                            <li>Boogie Boards (maximum 42 inches in length)</li>
                            <li>Portable Folding Bicycles (maximum 20 inch tires)</li>
                            <li>Collapsible Wagon - For the safety of our passengers, the wagon cannot be rolled onto/off the ship during embarkation and debarkation and cannot be rolled off/onto the ship while in port.</li>
                        </ul>
                        <p className='mt-2 text-sm text-medium'><span className='italic'>Please Note:</span> It is the responsibility of the passenger to check with the local laws of each port as Cordelia Cruises will not be responsible for confiscated items by Foreign Governments.</p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Luggage Information – Embarkation
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            To help you plan, we suggest you limit your luggage to a maximum of 3 bags per person (each piece not exceeding 20 kgs in weight) and total weight of baggage per person no exceeding 50kgs. In addition, you must personally carry-on any boarding documentation (passports, Visas, personal I.D), valuables, medications and items which require special handling.
                            <br /><br />
                            Any excess baggage shall be charged at INR 300 per kg. We shall not be responsible for loss of or damage to electronic devices (including but not limited cellular phones, computers, tablets, music players, or cameras), jewellery, cash, negotiable instruments, fragile or perishable items, or items of unusual value, all of which guest must carry onboard rather than placing in checked baggage.
                            <br /><br />
                            No live animals or birds are permitted on board, except specially trained assistance dogs required by Passengers with disabilities and providing the dog has all required licenses and documentation and provided prior permission is obtained from Cordelia Cruises of the same at the time of booking. Although Cordelia Cruises would have a facility for a few wheelchairs, however the Company cannot guarantee each Guest the facility of a wheelchair or other mobility devices. All luggage must be securely packed and distinctly labelled. The Company shall not be liable for loss, damage or delay in delivery of any luggage.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Gratuities
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia Cruises’ onboard staff and crew await our guests with personalized service. Cordelia Cruises shall add a daily US$12 per person per day or its equivalent in INR towards gratuity to each guest’s onboard account.
                        </p>
                        <p className='text-base lg:text-lg font-semibold !leading-7 mt-1'>
                            *Cordelia Cruises reserves the right to correct any errors, inaccuracies or omissions and to change or amend or update fares, terms & conditions, policies, fees and surcharges at any time without prior notice. For detailed terms and conditions please refer to Passenger Cruise Ticket Contract and other Cordelia Cruise Policies as displayed on www.cordeliacruises.com
                            <br />
                            All rights reserved. Ver: 2021(1)
                        </p>
                    </li>
                </ul>
            </main>
            <ExitIntent />
        </Layout>
    );
}