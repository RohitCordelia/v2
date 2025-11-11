import React, { ReactNode, useEffect, useState } from 'react'
import useMetaTags from 'react-metatags-hook';
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export default function PaymentSuccess({ }: Props) {
    useMetaTags({
        title: 'Clean Wave Policy To Reduce Ship Pollution | Cordelia Cruises',
        description: 'With the Clean Wave Policy, Cordelia Cruises reduces the impact of carbon emissions & minimizes ship pollution, for an environment-friendly cruising.',
        metas: [
            {
                name: 'keywords',
                content:
                    'ship Pollution, cruise ship pollution, cruises and environment, cruise environmental impact, ship environment, cruise ship environmental impact, cruise pollution, environmental impacts of cruise tourism, cruise ships bad for environment, environmentally friendly cruises, is cruising environmentally friendly, cruise ship water pollution, cruise ship effects on environment'
            },
        ],
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <div className=''>
                    <h1 className='text-2xl lg:text-3xl font-semibold'>Clean Wave Policy | Cordelia Cruises</h1>
                    <img className='h-24 my-6' src='https://images.cordeliacruises.com/cordelia_v2/public/images/clean-waves-new.webp' />
                </div>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-8'>Clean Waves is a Cordelia Cruises program that focuses on protecting the environment and the oceans, both in port and at sea to deliver great vacations responsibly.</p>

                <p className='text-xl font-semibold mt-5 lg:mt-6 '>Message from CEO Jurgen Bailom</p>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-8'>“We are elated about Cordelia Cruises’ Clean Waves programme and that we are able to contribute to an important cause to protect the oceans and the environment. The programme aims to advocate clean and sustainable practices to allay the impact on the environment.”</p>

                <p className='text-lg lg:text-xl font-semibold mt-5 lg:mt-6 underline'>Main line of actions</p>
                <div className='px-3'>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Energy Use and Air Emissions</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We’re committed on reducing our greenhouse gas emissions.</li>
                        <li>We comply with the international and local maritime organizations with the use of very low sulphur fuel oils</li>
                        <li>We innovate across all areas to reduce our energy consumption and GHG emissions and we challenge ourselves to increase the energy efficiency on our ship.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Main energy efficiency initiatives</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We define routes and assess weather and currents to optimize timings and speed to minimize our Ship’ power consumption.</li>
                        <li>We comply with the international and local maritime organizations with the use of very low sulphur fuel oils</li>
                        <li>We actively research and assess progress on technologies such as solar and wind power, biofuels, natural gas, fuel cells, biomass, and shore power to determine their efficiencies and viability for the future.</li>
                        <li>With the use of LED lighting in our indoor and outdoor areas we vastly reduce power requirements, so shipboard electrical systems can be designed in new and different ways.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Standards and Regulations</p>
                    <p className='text-xs lg:text-base font-medium mt-2 lg:mt-3 '>We take compliance seriously and we go above and beyond compliance.</p>
                    <p className='text-xs lg:text-base font-medium mt-2 lg:mt-3 '>As a cruise line operator, we are subject to and adhere with a set of internationally recognized standards and regulations. These standards and regulations are from all levels of government: International (IMO), regional, national, state and local.</p>
                    <p className='text-xs lg:text-base font-medium mt-2 lg:mt-3 '>Some example of this regulations are:</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>International Safety Management Code (ISM Code)</li>
                        <li>International Convention for the Safety of Life at Sea (SOLAS)</li>
                        <li>International Convention for the Prevention of Pollution from Ship (known as the MARPOL Regulations).</li>
                    </ul>
                    <p className='text-xs lg:text-base font-medium mt-2 lg:mt-3 '>To guide compliance with the numerous environmental, health, safety, and security regulations that govern our ship we developed our Safety and Quality Management System, a set of robust corporate safety and security policies that standardize how safety and security are maintained from ship to ship and person to person. Our Safety and Quality Management System forms the backbone of our operations and provides the policies, standards, and guidance that govern both our strategic planning and our dayto-day operations. To support compliance and continuous improvement, we conduct ongoing internal and external audits and consult with leading maritime experts. In keeping with our company philosophy of being above and beyond compliance, we have voluntarily implemented quality and environmental management systems.</p>

                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Waste Management</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>Our ship run a single-stream process, where all recyclables are hand sorted in our waste management room on board. These rooms are equipped with bailers, shredders, and compactors, as well as crushers for glass, light bulbs, and aluminium.</li>
                        <li>We work with our suppliers to “green” our supply chain, reduce packaging materials, and use more sustainable resources.</li>
                        <li>We participate in container return programs with our vendors and maintain a standard donation process for second hand furniture, equipment, mattresses, sheets, towels, furniture, and clothing.</li>
                        <li>Our waste offloaded is landed only to locally approved and licensed waste vendors to make sure that is treated properly and according to local regulations.</li>
                        <li>Our ship is equipped with on-board incinerators to help manage waste.</li>
                        <li>We carefully source our food and track on-board inventory.</li>
                        <li>Food waste produced on board is sent to a pulper system and pulverized to less than 25 mm, as per international standards, and discharged no closer than 12 nautical miles from land.</li>
                        <li>We focus on minimizing any source of hazardous waste. When required as well we segregate any type hazardous waste products into leak-proof containers and transfer them to approved shore side disposal facilities. We are also able to incinerate some types of biohazardous waste on board.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Reducing Single-Use Plastics</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We do not use on board single-use plastic items such as plates, cups, straws, trays and polystyrene as per Indian local regulations. We also have plans to go above and beyond and draw down single-use water bottles and other food and liquid containers.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Chemical Management</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We take a systematic approach toward evaluating, procuring, handling, storing, using, and responsibly disposing of chemicals in our operations</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Water Management</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>Our ship produces 100% of the freshwater used on board via desalination or reverse osmosis. This water is used for drinking, showers, sinks, toilets, kitchen galleys, pools, technical machinery, and spas aboard our ship. We use two main processes to produce our freshwater.</li>
                        <li><span className='font-bold'>A)</span> Desalination: Our desalination system boils and evaporates seawater, which is then condensed into freshwater. While this process is energy intensive, we account for this by repurposing our engine waste heat or steam from exhaust gas boilers to heat the water.</li>
                        <li><span className='font-bold'>B)</span> Reverse Osmosis his highly efficient system creates freshwater by pumping seawater at very high pressure through a filter or semi-permeable membrane that only water molecules can pass through.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Conserving Water</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We take steps to reduce water consumption using efficient tools like aerators, low-flow showerheads, and reduced-flow dishwashers and laundry equipment. Creative processes are also in play. For example, condensation from air conditioning units is collected and repurposed in our laundry facilities for washing towels and bedsheets.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Wastewater Treatment</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We aim to have no untreated wastewater on our ship go overboard, which is why we aim to have all our Ship are equipped with wastewater treatment plants. These plants take all international and maritime standards and law into account, and in many cases go above and beyond what’s mandated. These steps help limit impacts from our operations and protect ocean health and wildlife.</li>
                        <li>Treated wastewater is discharged no closer than three nautical miles from shore unless specifically permitted to do so in certain areas. All other wastewater and graywater is discharged a minimum of 12 nautical miles from land, compared with the three nautical miles required by applicable laws. AWP systems have been fitted on 88% of our fleet through 2021.</li>
                        <li>Ballast water is seawater brought onto a ship to help stabilize it to international standards. Our systems treat ballast water, which reduces or eliminates its potential to discharge non-native species into other environments when the Ship move to other ports.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Local Product Sourcing and Economics/Inclusion</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>We seek to build a more responsible, resilient supply chain that promotes the wellbeing of workers, our communities, our employees, and the environment.</li>
                        <li>Our food and beverages source is coming from Indian local vendors. Choosing local over traditional procurement channels reduce the carbon footprint of our supply chain by reducing the distance our products need to travel to get to our Ship and boost local business and communities, helping improve lives in the place where we serve.</li>
                    </ul>
                    <p className='text-base lg:text-lg font-bold mt-2 lg:mt-3'>Above and Beyond Compliance</p>
                    <p className='text-sm font-semibold mt-1 lg:mt-2 '>RECREATIONAL WATERS</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>There is no specific regulation as per IMO. Recreational water if not chlorinated if required is only discharged beyond 4 nautical miles (NM). If water is chlorinated, if required, it is discharged at 12 NM at a speed of 6 knots or greater</li>
                    </ul>
                    <p className='text-sm font-semibold mt-2 lg:mt-3 '>GRAYWATER</p>
                    <ul className='list-disc px-5 text-xs lg:text-base mt-1 font-medium'>
                        <li>There is no specific regulation about Greywater on MARPOL. Company considers greywater as sewage and treated water is only discharged beyond 12 NM at a speed of 6 knots or greater.</li>
                    </ul>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}