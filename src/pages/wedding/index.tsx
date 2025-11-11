import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import Modal from '../../components/UI/Modal';
import useMetaTags from 'react-metatags-hook'
import ExitIntent from "../../components/ExitIntent";

type Props = {}

const PlatinumData = [
  'Onboard wedding coordinator',
  'Wedding venues, dining and accommodation',
  'Priority check-in for wedding guests',
  'Exclusive entertainment and onboard experience',
  '2 professional wedding photographers and videographers ',
  'Spa experience for the couple',
  '2 or 3-tier wedding cake',
  'Romantic dinner at one of our premium restaurants',
  'Chocolate-covered strawberries for the couple'
]

const GoldData = [
  'Onboard wedding coordinator',
  'Wedding venues, dining and accommodation',
  'Priority check-in for wedding guests',
  'Exclusive entertainment and onboard experience',
  '2 professional wedding photographers and videographers ',
  'Spa experience for the couple',
  '2 or 3-tier wedding cake',
  'Romantic dinner at one of our premium restaurants',
  'Stateroom decor for the couple'
]

const SilverData = [
  'Onboard wedding coordinator',
  'Wedding venues, dining and accommodation',
  'Priority check-in for wedding guests',
  'Exclusive entertainment and onboard experience',
  '2 professional wedding photographers and videographers ',
  'Spa experience for the couple  ',
]
export default function Wedding({ }: Props) {
  useMetaTags({
    title: 'Luxurious Cruise Weddings: Turn Your Dream into a Reality',
    description: 'Plan Your unforgettable weddings on cruises, offering luxurious weddings on cruises. Discover the magic of cruise weddings with personalised wedding packages.',
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

  const [inclusiveModal, setInclusiveModal] = useState<any>(null);
  const [inclusiveData, setInclusiveData] = useState<any>(null);

  useEffect(() => {
    if (inclusiveModal == 'gold') {
      setInclusiveData(GoldData)
    } else if (inclusiveModal == 'silver') {
      setInclusiveData(SilverData)
    } else if (inclusiveModal == 'platinum') {
      setInclusiveData(PlatinumData)
    }
  }, [inclusiveModal])

  const scrollIntoViewWithOffset = (selector: any, offset: any) => {
    const blue = document.getElementById(selector);
    let position = blue!.getBoundingClientRect();
    window.scrollTo({ top: position.top + window.scrollY - offset, behavior: 'smooth' });
  }

  return (
    <Layout>
      <div className="container mx-auto py-24 lg:pt-36 px-3 pb-0">
        <h1 className='text-2xl lg:text-4xl font-semibold'>When the Vows Meet the Views</h1>
        <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>Embark on a special journey to solemnise your auspicious wedding vows in the middle of the gorgeous ocean. Let the wedding vows meet the ocean views on the most beautiful travel destination in India.</p>
        <div className='pt-7'>
          <button onClick={() => scrollIntoViewWithOffset('venue', 120)}
            className='lg:text-lg text-sm text-brand-primary font-bold border-2 border-brand-primary py-3 lg:px-8 px-6 rounded'>
            Venue
          </button>
          <button onClick={() => scrollIntoViewWithOffset('food', 120)}
            className='lg:text-lg ml-3 text-sm text-brand-primary font-bold border-2 border-brand-primary py-3 lg:px-8 px-6 rounded'>
            Food
          </button>
          <button onClick={() => scrollIntoViewWithOffset('package', 120)}
            className='lg:text-lg ml-3 text-sm text-brand-primary font-bold border-2 border-brand-primary py-3 lg:px-8 px-6 rounded'>
            Packages
          </button>
        </div>
        <div className='border-t-2 my-10 border-gray-300' />
      </div>


      <div className='container mx-auto px-3 '>
        <div className='grid lg:grid-cols-2 lg:gap-3'>
          <div className='lg:col-span-2 border-2 border-gray-300 rounded-lg shadow-md'>
            <div className='lg:grid lg:grid-cols-3'>
              <img
                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/perfect-destination-wedding.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/perfect-destination-wedding-mobile.webp"}
                alt="Cruise wedding"
                title='Cruise-wedding'
                className='w-full'
              />
              <div className='py-6 px-4 col-span-2'>
                <h2 className='text-2xl font-medium'>The Perfect Destination For Your Wedding</h2>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4'>Elevate your wedding with a unique twist:</p>
                <div className='grid grid-cols-2 gap-2 mt-3'>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Unlimited experiences
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Explore destination
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Shore excursions
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Onboard activities
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Dining at sea
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Game of skills at sea
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Customisable menu for the event
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Unlimited entertainment activities
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      24/7 medical service
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Experiences for guests and families
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Luxurious accommodation
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="CordeliaCruises"
                      title='Cordelia-Cruises'
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Onboard shopping
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/havan-kund-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h3 className='text-2xl font-medium'>Havan-Kund For The Wedding Ceremony</h3>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Havan is an integral part of most wedding rituals in India. Cordelia is the only cruise liner that permits the set-up of the Havan-Kund onboard for the wedding ceremony.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/premium-accomodation-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Luxurious Accommodation</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Choose from our five different stateroom categories - Chairman's Suite, Suite, Mini Suite, Ocean View, and Interior. Wake up at a new destination every morning, unpack only once.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/endless-entertainment-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Endless Entertainment</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Every wedding is special. Along with a comfortable stay, and enjoying the wedding functions, your guests will have access to numerous entertainment options onboard as well. From popular Indian and international musical shows to DJ parties, stand-up comedy, and musical evenings, your guests will be spoiled for choice.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/shore-excurison-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Shore Excursions</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Our guided shore excursions have been curated to make your cruise holiday adventurous. From different activities at the shore.to city tours and local food tours, don't forget to book your shore excursions in advance to get the best deals.</p>
            </div>
          </div>
        </div>
        <div className='border-t-2 my-10 mb-6 border-gray-300' />
      </div>




      {/* Venue */}
      <div id='venue' className='container mx-auto px-3 '>
        <h1 className='text-xl lg:text-3xl font-semibold'>Venue For Every Occasion</h1>
        <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-5 !leading-6 lg:!leading-8'>
          Transform different spaces across the ship into spectacular wedding venues. From intimate wedding spaces to elaborate function areas, all your venues will have breathtaking views.
        </p>
        <div className='grid lg:grid-cols-3 lg:gap-3 mt-5'>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/sangeeth-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Sangeet And Reception At The Marquee Theatre</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Resonating opulence and grandeur, the Marquee Theatre accommodating more than 800 guests serves as the perfect venue for hosting the sangeet and the reception.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/pre-post-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Pre And Post Wedding Parties</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Plan special evenings and parties with good music and food at the Connexions Bar or the Chairman's Club for a premium experience.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/dj-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>For DJ & Cocktail Nights</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Shake a leg and celebrate at The Dome for a night full of music, fun and celebration.</p>
            </div>
          </div>
        </div>
        <div className='border-t-2 my-10 mb-6 border-gray-300' />
      </div>
      {/* Venue end */}



      {/* Food */}
      <div id='food' className='container mx-auto px-3 '>
        <h1 className='text-xl lg:text-3xl font-semibold'>Food</h1>
        <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-5 !leading-6 lg:!leading-8'>
          From Pan-Asian cuisines to global grills and Indian street food to tandoor specialties, our expert chefs have designed the menu keeping in mind the tastes and preferences of all your guests.
        </p>
        <div className='grid lg:grid-cols-3 lg:gap-3 mt-5'>
          <div className='lg:col-span-3 border-2 border-gray-300 rounded-lg shadow-md'>
            <div className='lg:grid lg:grid-cols-3'>
              <img
                src={window.innerWidth > 640 ? "https://images.cordeliacruises.com/cordelia_v2/public/images/all-day-dining-wedding.webp" : "https://images.cordeliacruises.com/cordelia_v2/public/images/all-day-dining-wedding-mobile.webp"}
                className='w-full'
              />
              <div className='py-6 px-4 col-span-2'>
                <h1 className='text-2xl font-medium'>All-Day-Dining</h1>
                <p className='text-sm lg:text-base font-medium mt-3 lg:mt-4'>Indulge in the Indian and international gourmet cuisines in the middle of the vast ocean.</p>
                <div className='grid grid-cols-2 gap-2 mt-3'>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Essence of India
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Hot Clay Tandoor
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Far Eastern Kadhai
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Kettle & Bun
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Sugar & Spice
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Jain Haven
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      The International Grill
                    </p>
                  </div>
                  <div className="flex items-center col-span-2">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg"
                      className="h-3 mr-1.5"
                      alt="Cruise"
                    />
                    <p className="text-xs lg:text-base font-semibold opacity-[76%]">
                      Vegetarian Bang Street Food and The Cafe
                    </p>
                  </div>
                </div>
                <p className='text-xl mt-10 font-semibold text-brand-primary'>Capacity: 445 guests</p>
              </div>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/starlight-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>The Starlight</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Take your waterfront dining to the next level with our two-storey restaurant, featuring 15 exquisite cuisines from around the world. The ambience and grandeur of the Starlight is its main highlight. Enjoy the panoramic seascape while you’re at it!</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/chefs-table-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Chef's Table</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Indulge in a truly exceptional and sophisticated gastronomic adventure with our premium, gourmet dining experience that boasts an expertly crafted menu curated especially for your palate. Don't forget to plan ahead and make reservations in advance.</p>
            </div>
          </div>
          <div className='border-2 border-gray-300 rounded-lg shadow-md'>
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/chopstix-wedding.webp"
              className='w-full'
            />
            <div className='px-4 py-6'>
              <h1 className='text-2xl font-medium'>Chopstix</h1>
              <p className='text-xs lg:text-base opacity-[76%] font-medium mt-3 lg:mt-4'>Embark on an unforgettable culinary journey at our specialty restaurant for Pan-Asian cuisine, where you'll be greeted with breathtaking scenic surroundings and a mouth-watering array of sublime delicacies. Delight in an exquisite dining experience that will tantalise your taste buds and leave you craving for more.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Food end */}
      <div className='border-t-2 my-10 border-gray-300' />

      <div id='package' className='container mx-auto'>
        <div className='grid'>
          <div>
            <div className='px-4'>
              <h1 className='text-xl lg:text-3xl font-semibold'>Wedding on Waves Packages</h1>
              <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-5 !leading-6 lg:!leading-8'>
                It's your wedding! From grand to intimate celebrations, Cordelia Cruises can turn your dream wedding into a reality with grandeur and magnificence. With the perfect venue to the perfect menu, you'll find amazing choices on-board. Our cruise wedding packages can be customized to match your preferences, guest list and your idea of a perfect wedding.
              </p>
              <div className='grid grid-cols-3 gap-1 mt-5 lg:hidden'>
                <div
                  className='border-2 border-brand-primary py-2.5 rounded text-center'
                  onClick={() => {
                    scrollIntoViewWithOffset('platinum', 100)
                  }}
                >
                  <p className='text-brand-primary text-xxs font-bold'>Platinum Package</p>
                </div>
                <div
                  className='border-2 border-brand-primary py-2.5 rounded text-center'
                  onClick={() => {
                    scrollIntoViewWithOffset('gold', 100)
                  }}
                >
                  <p className='text-brand-primary text-xxs font-bold'>Gold Package</p>
                </div>
                <div
                  className='border-2 border-brand-primary py-2.5 rounded text-center'
                  onClick={() => {
                    scrollIntoViewWithOffset('silver', 100)
                  }}
                >
                  <p className='text-brand-primary text-xxs font-bold'>Silver Package</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto grid lg:grid-cols-3 gap-2 px-3'>
        {/* Platinum Package */}
        <div className='' id='platinum'>
          <div className='relative rounded-lg border border-gray-300/40 shadow-md'>
            <div>
              <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/platinum-marriage-mobile.webp" />
            </div>
            <div className='py-4 px-3'>
              <h1 className='text-xl font-semibold'>Platinum Package</h1>
              <p className='text-xs font-semibold text-brand-primary italic mt-2'>BIG ON LUXURY</p>
              <p className='text-sm font-medium mt-2 !leading-5 lg:!leading-6'>
                Celebrate your love for each other at sea in elegance & style.
              </p>
            </div>
            <div className=''>
              <div className='border-t-2 border-gray-300' />
              <div className='flex items-center justify-between px-3 py-4 cursor-pointer' onClick={() => setInclusiveModal('platinum')}>
                <p className='text-sm text-brand-primary font-bold'>View all Inclusions</p>
                <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/inclusion-arrow-icon.svg" />
              </div>
              <div className='border-t-2 border-gray-300' />
              <div className='py-9 px-3 lg:text-center'>
                <a href="/group-booking"
                  className='text-sm text-white font-bold bg-brand-primary py-4 px-12 rounded'>Explore Now</a>
              </div>
            </div>
          </div>
        </div>

        {/* Gold Package */}
        <div className='' id='gold'>
          <div className='relative rounded-lg border border-gray-300/40 shadow-md'>
            <div>
              <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/gold-marriage-mobile.webp" />
            </div>
            <div className='py-4 px-3'>
              <h1 className='text-xl font-semibold'>Gold Package</h1>
              <p className='text-xs font-semibold text-brand-primary italic mt-2'>PAMPERING AT ITS BEST</p>
              <p className='text-sm font-medium mt-2 !leading-5 lg:!leading-6'>
                A premium wedding package that lets you indulge in the occasion with golden choices
              </p>
            </div>
            <div className=''>
              <div className='border-t-2 border-gray-300' />
              <div className='flex items-center justify-between px-3 py-4 cursor-pointer' onClick={() => setInclusiveModal('gold')}>
                <p className='text-sm text-brand-primary font-bold'>View all Inclusions</p>
                <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/inclusion-arrow-icon.svg" />
              </div>
              <div className='border-t-2 border-gray-300' />
              <div className='py-9 px-3 lg:text-center'>
                <a href="/group-booking"
                  className='text-sm text-white font-bold bg-brand-primary py-4 px-12 rounded'>Reserve Now</a>
              </div>
            </div>
          </div>
        </div>

        {/* Silver Package */}
        <div className='' id='silver'>
          <div className='relative rounded-lg border border-gray-300/40 shadow-md'>
            <div>
              <img className='w-full' src="https://images.cordeliacruises.com/cordelia_v2/public/images/silver-marriage-mobile.webp" />
            </div>
            <div className='py-4 px-3'>
              <h1 className='text-xl font-semibold'>Silver Package</h1>
              <p className='text-xs font-semibold text-brand-primary italic mt-2'>INTIMATE WEDDINGS</p>
              <p className='text-sm font-medium mt-2 !leading-5 lg:!leading-6'>
                If you want the wedding celebrations to be a close-knit affair, this is the perfect package!
              </p>
            </div>
            <div className=''>
              <div className='border-t-2 border-gray-300' />
              <div className='flex items-center justify-between px-3 py-4 cursor-pointer' onClick={() => setInclusiveModal('silver')}>
                <p className='text-sm text-brand-primary font-bold'>View all Inclusions</p>
                <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/inclusion-arrow-icon.svg" />
              </div>
              <div className='border-t-2 border-gray-300' />
              <div className='py-9 px-3 lg:text-center'>
                <a href="/group-booking"
                  className='text-sm text-white font-bold bg-brand-primary py-4 px-12 rounded'>Enquire Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-3 py-16'>
        <div className='flex flex-col items-center lg:w-2/5 mx-auto text-center mt-10 leading-8'>
          <h1 className='text-3xl font-semibold'>To get details about our venues and wedding packages.</h1>
          <div className='flex items-center mt-6'>
            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg" className='h-4 mr-2' alt="" />
            <p className='font-semibold text-lg'>022-65545206</p>
          </div>
          <div className='flex items-center mt-4'>
            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail.svg" className='h-4 mr-2' alt="" />
            <p className='font-semibold text-lg'>weddings@cordeliacruises.com</p>
          </div>
          <div className='py-5 pt-7'>
            <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/cordelia-cruises-wedding-brochure.pdf"
              className='lg:text-lg text-sm text-white font-bold bg-brand-primary py-3 px-8 rounded'>
              Download Our Brochure
            </a>
          </div>
        </div>
      </div>

      <Modal show={inclusiveModal} align={'center'} className="drop-shadow bg-white w-full lg:w-2/4 center bottom-0 lg:bottom-1/4 lg:left-1/4 lg:h-auto rounded-t-lg lg:rounded border" onClose={() => setInclusiveModal(false)}>
        <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
          <h1 className='text-lg font-semibold'>Your Package Includes</h1>
          <svg
            onClick={() => setInclusiveModal(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-black cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className='h-full px-4 pb-4'>
          {inclusiveData && inclusiveData.map((v: any, i: any) =>
            <div key={i} className="flex items-baseline py-0.5">
              <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
              <p className='text-sm font-semibold ml-2'>{v}</p>
            </div>
          )}
        </div>
      </Modal>
      <ExitIntent />
    </Layout>
  );
}