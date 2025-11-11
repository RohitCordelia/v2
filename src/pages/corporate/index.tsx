import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";
type Props = {}

export default function Corporate({ }: Props) {
  useMetaTags({
    title: 'Corporate Retreat Events And Meetings | Cordelia Cruises',
    description: 'Plan your luxury corporate events and retreats on our charter cruises. Explore stunning destinations with personalized packages from Cordelia Cruises',
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
      <div className="container mx-auto py-24 lg:pt-36 px-3 pb-0">
        <h1 className='text-2xl lg:text-4xl font-semibold'>Corporate Events And Meetings</h1>
        <p className='text-sm lg:text-lg font-semibold mt-3 lg:mt-6 text-brand-primary'>AN OFFBEAT EXPERIENCE FOR YOUR OFFSITE</p>
        <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-8'>Take your corporate events, meetings and incentive trips to the next level onboard the Empress. Cruise to gorgeous destinations with your team for the perfect offsite.</p>
        <div className='pt-7'>
          <button onClick={() => scrollIntoViewWithOffset('venue', 120)}
            className='lg:text-lg text-base text-brand-primary font-bold border-2 border-brand-primary py-3 px-8 rounded'>
            Venue
          </button>
          <button onClick={() => scrollIntoViewWithOffset('charter', 120)}
            className='lg:text-lg ml-3 text-base text-brand-primary font-bold border-2 border-brand-primary py-3 px-8 rounded'>
            Charter
          </button>
        </div>
        <div className='border-t-2 my-10 border-gray-300' />
      </div>


      <div className='container mx-auto px-3 '>
        <div className='grid lg:grid-cols-2 lg:gap-3'>
          <div className='lg:col-span-2 border-2 border-gray-300 rounded-lg shadow-md'>
            <div className='lg:grid lg:grid-cols-3'>
              <img
                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/perfect-destination-corporate-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/perfect-destination-corporate-mobile.webp"}
                alt='CorporateEventsVenue'
                title='Corporate-events-venue-cruise'
                className='w-full'
              />
              <div className='py-6 px-4 col-span-2'>
                <h2 className='text-2xl font-medium'>The Perfect Destination For Your Events</h2>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4'>Elevate your events with a unique twist: work and leisure in perfect harmony!</p>
                <div className='grid grid-cols-2 gap-2 mt-5'>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Unlimited experiences
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Venues for team building activities
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Shore excursions
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Premium accommodation
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Dining at sea
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Explore destination
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Customisable menu for the event
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Onboard activities
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      24/7 medical service
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Game of skills at sea
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Unlimited entertainment activities
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Onboard shopping
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Bars and lounges for networking and parties
                    </p>
                  </div>
                  <div className="flex items-center mt-1 col-span-2">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Experiences for attendees and their families
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/new-experience-corporate.webp"
              alt='/CorporateEventsCruise'
              title='Corporate-events-on-cruise'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>A New Experience</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>A destination on the move. An incredible city on the sea. Get ready for different experiences on your next corporate getaway.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/planning-convenience-corporate.webp"
              alt='CorporateTeamBuilding'
              title='Team-building-On-cruise'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Planning Convenience</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>A hassle-free holiday experience. Visit a new destination every day, unpack only once. Leave the cruise planning to us.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/holiday-view-corporate.webp"
              alt='/CorporateEventsCruise'
              title='Corporate-events-on-cruise'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Holiday With Views</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>A holiday with breathtaking ocean views. Wake up at a new destination every day, experience new horizons, and discover unlimited experiences with us.</p>
            </div>
          </div>
          {/* <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/game-skills-corporate.webp"
              alt='CordeliaCasino'
              title='Casino-on-cruise'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Game of Skill</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Get lucky on your cruise holiday, and win big! The excitement never ends at our onboard casino.</p>
            </div>
          </div> */}
        </div>
        <div className='border-t-2 my-10 mb-6 border-gray-300' />
      </div>

      {/* charter */}
      <div id='venue' className='container mx-auto px-3 '>
        <h2 className='text-xl lg:text-3xl font-semibold'>Venues For Your Events</h2>
        <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-5 !leading-6 lg:!leading-8'>
          Venues and spaces that can be customised for others! Enjoy all inclusive cruise packages while booking your event to save big!
        </p>
        <div className='grid lg:grid-cols-2 lg:gap-3 mt-5'>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/marquee-theater-corporate.webp"
              alt='Entertainment-On-Cruise'
              title='Theater-live-performance'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Marquee Theatre</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>With a capacity of 840 guests, the Royal Theatre is ideal for R&R, training, product presentations and seminars.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/connexious-bar-corporate.webp"
              alt='Corporate-Cruise-ba'
              title='Cordelia-Cruise-bar'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Connexions Bar</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Suited for sales meetings and networking events with a capacity of 315 guests</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/chairman-club-coporate.webp"
              alt='Corporate-Cruise-ba'
              title='Cordelia-Cruise-bar'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Chairman's Club</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>With a capacity of 115 guests, The Chairman’s Club is the perfect venue to launch a product, meet and informal meetings.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/dome-corporate.webp"
              alt='Corporate-Cruise-ba'
              title='Cordelia-Cruise-bar'
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>The Dome</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Ideal for AGM and leadership meetings with a capacity of 268 guests.</p>
            </div>
          </div>
        </div>
      </div>
      {/* venue end */}

      {/* charter */}
      <div id='charter' className='container mx-auto px-3 '>
        <div className='grid lg:grid-cols-3 lg:gap-3 mt-5'>
          <div className='lg:col-span-3 border-2 border-gray-300 rounded-lg shadow-md'>
            <div className='lg:grid lg:grid-cols-3'>
              <img
                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/charter-cruise-corporate-desktop.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/charter-cruise-corporate-mobile.webp"}
                alt='Cruise'
                title='Cordelia-cruises'
                className='w-full'
              />
              <div className='py-6 px-4 col-span-2'>
                <h3 className='text-2xl font-medium'>Charter A Cruise</h3>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4'>Experience the ultimate private getaway with a customised cruise charter for your team.</p>
                <div className='grid grid-cols-2 gap-2 mt-3'>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Customise and control your event
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Customised food and dining packages
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Incredibly exclusive
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Customised entertainment options
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Brand the interiors of the ship
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Customised shore excursions
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises'
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Enjoy undivided crew attention
                    </p>
                  </div>
                  <div className="flex items-center mt-1.5 col-span-2">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt='CordeliaCruises' 
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      All venues at your disposal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* charter end */}

      <div className='container mx-auto px-3 py-16'>
        <div className='flex flex-col items-center lg:w-2/5 mx-auto text-center mt-10 leading-8'>
          <h4 className='text-3xl font-semibold'>To get details about our venues and wedding packages.</h4>
          <div className='flex items-center mt-6'>
            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg"  className='h-4 mr-2' alt='Cruise' title='Cordelia-cruises'/>
            <p className='font-semibold text-lg'>022-65545206</p>
          </div>
          <div className='flex items-center mt-4'>
            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail.svg" className='h-4 mr-2' alt='phone' title=' write-to-us' />
            <p className='font-semibold text-lg'>corporate@cordeliacruises.com</p>
          </div>
          <div className='py-5 pt-7'>
            <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/cordelia-cruises-corporate-brochure.pdf"
              className='lg:text-lg text-sm text-white font-bold bg-brand-primary py-3 px-8 rounded'>
              Download Our Brochure
            </a>
          </div>
        </div>
      </div>
      <ExitIntent />
    </Layout>
  );
}