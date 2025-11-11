import React, { Suspense, useEffect, useState } from "react";
import Banner from '../../component/Banner';
// import Header from './component/header'
import Header from '../../component/Header';
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "../../../src/constants/userConstants";
import { saveRefUrl } from "../../../src/utils/user/user";
import Ports from "./component/ports";
import "./index.css"
import Modal from '../../components/UI/ModalCenter';
import LeadGenForm from "../../components/UI/LeadForm";

const Overview = React.lazy(() => import("/src/components/Overview"));
const InfoSection = React.lazy(() => import("/src/components/InfoSection/infoSection"));
type Props = {};

const banner = {
  "title": "",
  "images": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-mumbai-nov'24-desktop.webp",
      "link": "",
      "altTag": "Srilanka June",
      "type": "image",
      "thumbnail": ""
    },
  ],
  "mobileImages": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-mumbai-nov'24-mobile.webp",
      "link": "",
      "altTag": "Srilanka June",
      "type": "image",
      "thumbnail": ""
    },
  ],
}
const content_onboard=  {
  "onBoardSection":{
    title:"On-board Activities ",
    sub_title:""
  },
  
  "onBoardCards": [
  {
    title: "Premium Accommodations ",
    sub_title: "Wake up in your elegantly appointed room and witness the magic of the sunrise from the unending horizon, then get ready for an exhilarating day in ‘The City on the Sea’",
    img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/accomodation-mumbai-page-desktop.webp",
    img_alt: "",
    link: "",
  },
  {
      title: "Exquisite Cuisine ",
      sub_title: "Cordelia Cruises offers a fusion of Pan-Asian and Indian flavours at the all-day food court. You can also indulge in our three specialty restaurants.  ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/cuisine-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
  },
  {
      title: "Unwind Your Way ",
      sub_title: "Conquer the rock-climbing wall, unwind with luxurious services at the spa and salon, and enjoy show-stopping entertainment.  ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/adventure-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
  },
  {
      title: "Indulge in the Best ",
      sub_title: "Cap off the night with drinks at the open bar, where the fun continues. With Cordelia Cruises, every moment is a new adventure. ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/beverages-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
  },
  {
      title: "Spa and Salon  ",
      sub_title: "After you’ve explored the ‘City on the Sea,’ pop into our Spa & Salon for some well-deserved R&R. Our expert professionals will have you feeling 100%, so you can get back to having a ball all over again. ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/spa&salon-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
  },
  {
      title: "Shopping ",
      sub_title: "If retail therapy is what you need, our exclusive outlets will put you in the right mood. Whether you’re shopping for yourself or your loved ones, there’s something for everyone. ",
      img_url: "https://images.cordeliacruises.com/cordelia_v2/public/images/shopping-mumbai-page-desktop.webp",
      img_alt: "",
      link: "",
  },
  // {
  //     title: "Exciting Destinations  ",
  //     sub_title: "Set out on an unforgettable adventure, exploring exciting destinations with your loved ones aboard the majestic Empress. ",
  //     img_url: " https://images.cordeliacruises.com/cordelia_v2/public/images/destination-mumbai-page-desktop.webp",
  //     img_alt: "",
  //     link: "",
  // }
],}

export default function index(props: Props) {
  const [description, setDescription] = useState<any>(false);

  const personaSelector = new window.URLSearchParams(window.location.search).get(PERSONA_KEY);
  let PERSONA = DEFAULT
  if (personaSelector && ALL_PERSONAS.includes(personaSelector)) {
    PERSONA = personaSelector
  }

  const eventSelector = new window.URLSearchParams(window.location.search).get(EVENT_KEY);
  let EVENT = 'srilanka'
  if (eventSelector && ALL_EVENTS.includes(eventSelector)) {
    EVENT = eventSelector
  }
  useEffect(() => {
    saveRefUrl(window.location.href)
  }, [])
  
  const data = {
    "title": "Cruise aboard the ‘City on the Sea’ off Mumbai’s coast",
    "vidUrl": "https://www.youtube.com/watch?v=PR6OjCvhcPE",
    "subTitle": "‘Aamchi Mumbai,’ also known as the City of Dreams, is your gateway to an experience that will take your breath away. Pick your dates, pack your bags, and come aboard India’s top cruise; we’ve got it all planned for you. ",
    "vidThumbnail": "https://images.cordeliacruises.com/cordelia_v2/public/images/video-thumbnail-desktop-image.webp"
  }

  const offers = [
    // {
    //   title: '10% Early Bird Discount',
    //   description: [
    //     'Receive 10% off by booking your cruise at least 60 days before the sailing date',
    //     'A discount of 10% will be applied to the cabin fare only',
    //     'The offer applies only to sailings scheduled 60 days or more from the date of booking',
    //     'Offer valid for bookings done till August 2024',
    //   ]
    // },
    {
      title: 'All-Inclusive Beverage Package',
      description: [
        'Select spirits and mixers will be included in your Cordelia cruise price at no extra charges for all guests (Adults only)',
        'Adults over 21 years of age will be permitted to consume alcohol onboard.',
        'Kids will be served non-alcoholic beverages only',
        'The package can be upgraded at an additional cost at the time of booking or onboard',
        'Operational as per bar timings',
        'This is an inclusive package along with your cruise booking',
        'Offer applies to all the sailings',
      ]
    },
    {
      title: 'Book Now, Pay Later',
      description: [
        'Book your cabin by paying just 25%',
        'Make a full payment 60 days before your sailing date',
        'The offer applies only to sailings scheduled 60 days or more from the date of booking',
      ]
    },
    {
      title: 'Kids Sail Free',
      description: [
        'Valid for all kids under the age of 12',
        'The kids must travel as 3rd or 4th guests',
        'Service charges, levies, and fuel charges are applicable with the GST',
        'Offer applies to all the sailings',
      ]
    }
  ]
  return (
    <>
    <Header isVideo={true} />
    <main>
    <section>
        <Banner data={banner ? banner : ''} clickable={false} />
        <LeadGenForm page_code='Mumbai' />
      </section>
        <section>
          {<Overview data={data} event={EVENT} />}
        </section>
        <section>
          <Ports />
        </section>
        <section>
          <div className="container mx-auto lg:mt-28 px-4 lg:px-0">
            <div className='grid grid-cols-1'>
              <h2 className='text-2xl lg:text-4xl lg:font-medium leading-7'>
                Our best cruise packages come with exciting offers:
              </h2>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 py-5 gap-5 pt-10'>
              {offers.map((val, index) => (
                <div className="flex justify-between shadow-allSide" key={index}>
                  <div className="border border-gray-300 w-full flex justify-between items-center px-4 py-3.5 rounded-l">
                    <div className='flex items-center'>
                      <p className='lg:text-base text-xs font-semibold text-gray-1100 uppercase'>{val.title}</p>
                      <img className='lg:h-5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" />
                    </div>
                    <p className='lg:text-sm text-xxs ml-4 text-brand-primary font-semibold underline whitespace-nowrap cursor-pointer ' onClick={() => setDescription(val.description)}>View More</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
              <section>
                {<Suspense fallback={<div>Loading.....</div>}>
                <InfoSection  content={ content_onboard.onBoardCards} info_section={content_onboard.onBoardSection}/>
                </Suspense>}
              </section>
      </main>
      
      <Modal show={description} align={'center'} className="w-full lg:w-2/4 relative" onClose={() => setDescription(false)}>
        <div className=' w-full h-full bg-white'>
          <div className=' p-4 pb-0 flex items-center justify-end'>
            <svg
              onClick={() => setDescription(false)}
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
          <div className="px-10 pb-6">
            {description && description?.map((val) => (
              <ul className="list-disc">
                <li className="mb-2 text-sm lg:text-base">{val}</li>
              </ul>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
