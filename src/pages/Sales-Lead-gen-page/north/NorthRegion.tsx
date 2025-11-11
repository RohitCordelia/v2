import React, { useState, useEffect } from 'react';
type Props = {};

export default function NorthRegion({ }: Props) {
  const data = {
    regionalManagers: [
      { region: "West", name: "Sulekha Singh", email: "sulekha.singh@cordeliacruises.com" },
      { region: "North", name: "Neha Sharma", email: "neha.sharma@cordeliacruises.com" },
      { region: "South", name: "Margaret Roopa", email: "margaret.a@cordeliacruises.com" },
    ],

  };

  const agents = [
    {
      name: 'Prasad Binge',
      company: 'Ark Travel',
      email: 'prasad@thearktravelgroup.com',
      phone: '+91 9665036371',
      logo: 'arktravel-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/ark-travels-logo.png'
    },
    {
      name: 'Ravinder Singh',
      company: "Dpaul's",
      email: 'sales13@dpauls.com',
      phone: '+91 9212647123',
      logo: 'dpauls-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/dpauls-travel-logo.png'
    },
    {
      name: 'Yatiraj Kabra',
      company: 'Guideline Travels',
      email: 'yatiraj@guidelinetravels.com',
      phone: '+91 9212647123',
      logo: 'guideline-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/guideline-logo.png'
    },
    {
      name: 'Manish Anand',
      company: 'Jagsons Travels',
      email: 'saleseast@jagsons.in',
      phone: '+91 9665036371',
      logo: 'jagsons-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/jagsons-travels.png'
    },
    {
      name: 'Rakesh Srivastava',
      company: 'MakeMyTrip',
      email: 'mice@makemytrip.com',
      phone: '+91 9899065310',
      logo: 'makemy-trip-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/MICE_Logo.png'
    },
    {
      name: 'Ashish Sawant',
      company: 'SOTC',
      email: 'Ashish.Sawant@thomascook.in',
      phone: '+91 9702427668',
      logo: 'sotc-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/SOTC-travel-logo.png'
    },
    {
      name: 'Deepak Sharma',
      company: 'TBO',
      email: 'cruises@tbo.com',
      phone: '+91 9718388849',
      logo: 'tbo-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/tbo-travels.png'
    },
    {
      name: 'Shweta Shetty',
      company: 'Thomas Cook',
      email: 'Shweta.Shetty2@thomascook.in',
      phone: '+91 9870532930',
      logo: 'thomas-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/thomas-cook-travel-logo.png'
    },
    {
      name: 'Nisha Kapoor',
      company: 'TripJack',
      email: 'nisha.kapoor@tripjack.com',
      phone: '+91 9212647123',
      logo: 'tripjack-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/trip-jack-logo.png'
    },
    {
      name: 'Anuj Vishwakarma',
      company: 'Yorker Holidays',
      email: 'cruises2@yorkerindia.com',
      phone: '+91 8527794136',
      logo: 'yorker-logo.svg',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/images/yourker-holidays-services-logo.png'
    },
  ];

  return (
    <div className="md:max-w-5xl w-full mx-auto md:my-10 px-2 md:space-y-10 md:px-4">
      <div className="bg-white rounded-lg overflow-hidden mt-[30px] md:mt-0">
        {/* <h2 className="text-[#000000] text-[14px] md:text-[40px] font-openSans text-center font-semibold py-6">
          Regional Managers
        </h2> */}

        <div className="overflow-x-auto">
          <div className="md:w-[75%] mx-auto border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-gradient text-[#FFFFFF]">
                  <th className="py-4 px-6 text-left text-[10px] md:text-[24px] font-openSans md:w-[200px] w-[110px] rounded-tl-lg border-r">
                    Region
                  </th>
                  <th className="py-4 px-6 text-left text-[10px] md:text-[24px] font-openSans rounded-tr-lg border-l">
                    Regional Manager
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.regionalManagers.map((manager, index) => (
                  <tr key={index} className="border-t last:rounded-bl-lg last:rounded-br-lg">
                    <td className="md:py-5 py-2 px-3 md:px-6 border-r font-openSans text-[#93288E] md:text-[#000000] text-[10px] md:text-[24px] md:w-[200px] w-[110px]">
                      {manager.region}
                    </td>
                    <td className="md:py-5 py-2 px-6 md:px-6 items-center gap-2 border-l">
                      <div className="flex gap-2">
                        <span className="text-[#93288E] text-[18px] md:text-[24px] font-openSans font-bold">
                          <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/manager-lead-gen-icon.svg"
                            className="w-4 h-4 md:w-8 md:h-8" />
                        </span>
                        <span className="ml-2 text-[10px] md:text-[24px]">{manager.name}</span>
                      </div>
                      <span className="text-gray-500 flex gap-2">
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/email-lead-gen-icon.svg"
                          className="w-4 h-4 md:w-8 md:h-8" />
                        <a href={`mailto:${manager.email}`} className="text-gray-600 text-[10px] md:text-[24px] hover:underline ml-2">
                          {manager.email}
                        </a>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden md:pb-[80px] mt-[30px] md:mt-0">
        {/* <h2 className="text-[#000000] text-[14px] md:text-[40px] font-openSans text-center font-semibold py-6">
          Priority Sales Agents
        </h2> */}
        <div className="container mx-auto md:p-4">
          <div className="overflow-hidden rounded-lg border ">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-gradient text-white">
                  {/* <th className="py-2 px-3 text-left md:w-[200px] w-[110px] rounded-tl-lg "></th> */}
                  <th colspan="2" className="py-2 px-3 text-center text-[14px] md:text-[24px] rounded-tr-lg pr-[67px] md:pr-0">
                  Our PSAs
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <tr key={index} className="border-t  last:rounded-bl-lg last:rounded-br-lg text-left">
                    <td className="md:py-8 md:px-6 py-7 px-3 flex justify-center md:w-[230px] w-[110px] border-r ">
                      <img src={agent.image} className={`${agent.company !== "MakeMyTrip" ? "w-[100px] md:w-[100px]" : "w-full"} flex justify-center`} />
                    </td>
                    <td  className="py-2 px-3 items-left gap-2 whitespace-nowrap">
                      <div className="flex min-w-[300px]">
                        <div>
                          <div className="text-[#93288E] text-[10px] md:text-[24px] flex gap-2">
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/manager-lead-gen-icon.svg"
                              className="w-4 h-4 md:w-8 md:h-8" />
                            <span className="text-[#93288E]">{agent.name}</span>
                            <span className="text-[#D9D9D9]">|</span>
                            <span className="text-[#000000]">{agent.company}</span>
                          </div>
                          <div className="text-[#93288E] text-[10px] md:text-[24px] flex gap-2">
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/email-lead-gen-icon.svg"
                              className="w-4 h-4 md:w-8 md:h-8" />
                            <a href={`mailto:${agent.email}`} className="text-[#93288E]">{agent.email}</a>
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/call-lead-gen-icon.svg"
                              className="w-4 h-4 md:w-8 md:h-8 md:block hidden" />
                            <a href={`tel:${agent.phone}`} className="text-[#000000] md:block hidden">{agent.phone}</a>
                          </div>
                          <div className="flex gap-2 md:hidden text-[10px] md:text-[24px]">
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/call-lead-gen-icon.svg"
                              className="w-4 h-4 md:w-8 md:h-8" />
                            <a href={`tel:${agent.phone}`} className="text-[#000000]">{agent.phone}</a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>


  );
};