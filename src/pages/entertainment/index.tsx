import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";

type Props = {}

const Upgrade = [
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid on all 5-night sailings from 1st October'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Limited availability per sailing.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Full payment must be made at the time of booking.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid on a first-come, first-served basis only.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Available upgrade is for Interior Stateroom to Ocean View Stateroom only.'
  },
]
const BookNow = [
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Redeem the offer by paying 25% of the total amount.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Remaining payment must be completed 30 days prior to the sailing date.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid on all sailings starting December 2022 onwards.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid on all stateroom categories.'
  },
]
const KidsSail = [
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid for all kids under the age of 12.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid only for kids travelling as 3rd & 4th guests.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Valid on all 3-night, 4-night and 5-night sailings.'
  },
  {
    icon: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg',
    content: 'Service charges, levies and fuel charges are applicable for kids ages 2-12, with GST.'
  },
]

export default function Entertainment({ }: Props) {
  useMetaTags({
    title: 'Unleash Fun: Cruise Adventures & Ship Entertainment with Cordelia',
    description: 'Experience our thrilling cruise adventures and enjoy the finest onboard entertainment that will leave you mesmerized throughout your ship journey with Cordelia',
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
  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
        <h1 className='text-2xl lg:text-4xl font-semibold'>Entertainment</h1>
        <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>From exclusive entertainment shows at the Marquee Theatre to enthralling live music, mesmerising magic shows and professional theatrical performances. We have endless entertainment to enchant you throughout your stay.</p>
        <div className='border-t-2 my-10 border-gray-300' />
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-3 lg:col-span-1'>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
              <div>
                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/balle-balle-entertainment.webp" 
                alt=' LiveShowOnCruise'
                title='Balle-Balle-Live-Show'
                />
              </div>
              <div className='py-6 px-6'>
                <div className='flex items-center'>
                  <h2 className='text-xl lg:text-2xl font-semibold'>Balle Balle</h2>
                </div>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-7'>
                  With Balle Balle, we’re bringing a touch of light-hearted comedy and drama to your cruise. This upbeat show is guaranteed to put a smile on your face and have you tapping your feet to the beat.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-3 lg:col-span-1'>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
              <div>
                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/romance-entertainment.webp" 
                alt=' LiveShowOnCruise'
                title='Balle-Balle-Live-Show'
                />
              </div>
              <div className='py-6 px-6'>
                <div className='flex items-center'>
                  <h2 className='text-xl lg:text-2xl font-semibold'>Romance In Bollywood</h2>
                </div>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-7'>
                  We're presenting you with romance & love as we see it, and as all Bollywood music fans perceive it. This magical concoction will make you want to fall in love all over again. Experience a dose of Bollywood with a touch of romance wrapped in this live performance by the finest performers in the business.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-3 lg:col-span-1'>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
              <div>
                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/burlesque-entertainment.webp" 
                alt='BurlesqueLiveEntertainment'
                title='burlesque-live-show'
                />
              </div>
              <div className='py-6 px-6'>
                <div className='flex items-center'>
                  <h2 className='text-xl lg:text-2xl font-semibold'>Burlesque The Bollywood Way</h2>
                </div>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-7'>
                  Experience a Western dance style with a desi twist. Get ready to add some spice to your cruise with this feisty, fun-filled show combining the sass of Western burlesque with the vibrant energy of Bollywood.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-3 lg:col-span-1'>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
              <div>
                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/indianmagic-entertainment.webp"
                alt='BollywoodDanceShow'
                title='Bollywood-Dance-Show'
                />
              </div>
              <div className='py-6 px-6'>
                <div className='flex items-center'>
                  <h2 className='text-xl lg:text-2xl font-semibold'>Indian Cinemagic</h2>
                </div>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-7'>
                  From Kashmir to Kanyakumari, experience the best of Indian Cinema with Indian Cinemagic, exclusively with Cordelia Cruises. A melodic spectacle, featuring the finest performers, Indian Cinemagic promises to keep you entertained throughout your voyage.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-3 lg:col-span-1'>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
              <div>
                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/magicianscut-entertainment.webp" 
                alt='MagicShowByTejas'
                title='Magic-Show-On-Cordelia'
                />
              </div>
              <div className='py-6 px-6'>
                <div className='flex items-center'>
                  <h2 className='text-xl lg:text-2xl font-semibold'>Magician's Cut</h2>
                </div>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-7'>
                  Get ready to experience wonders and illusions, sparkling awe, in the middle of the Ocean. ‘India’s Magic Star’. Mesmerise yourself as the grand illusionist, Tejas Malode spurs the stage with his mysterious presence and grips you into his trickery and distortion of reality.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-3 lg:col-span-1'>
            <div className='relative rounded-lg border border-gray-300/40 shadow-md h-full'>
              <div>
                <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/livedj-entertainment.webp" 
                alt='LiveDJMusic'
                title='DJ-Performance'
                />
              </div>
              <div className='py-6 px-6'>
                <div className='flex items-center'>
                  <h2 className='text-xl lg:text-2xl font-semibold'>Live Dj</h2>
                </div>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4 !leading-6 lg:!leading-7'>
                  Shake a leg with us as you groove to the beats played by our live DJ on Deck 10. So dance the night away as you close out the perfect day aboard The Empress.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <ExitIntent />
    </Layout>
  );
}