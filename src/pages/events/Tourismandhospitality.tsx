import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import Banner from '../../components/banner';
import Destination from './Destination/index';

const banner = {
  images: [
    {
      url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/240125_1920x400.webp',
      link: '#',
      altTag: 'National Tourism Day'
    },
  ],
  mobileImages: [
    {
      url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/240125_563x263.webp',
      link: '#',
      altTag: 'National Tourism Day'
    },
  ]
};

const NationalTourismDay = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Layout>
      <main className="my-[70px]">
        <section>
          <Banner data={banner} />
        </section>
      </main>
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="relative z-10 lg:mx-28 mt-18 flex flex-col items-center justify-center px-6 lg:px-0">
          <div className="text-center">
            <h1 className="text-[20px] lg:text-[42px] text-black mb-4 lg:mb-6 font-playfair leading-normal lg:px-12 px-4">
              Celebrate National Tourism Day with an{" "}
              <span className="text-[#92278F] text-[20px] lg:text-[42px] text-black mb-4 lg:mb-36 font-playfair leading-normal" style={{ fontFamily: 'Playfair Display' }}> Exclusive Offer for Tourism & Hospitality Professionals</span>
            </h1>
            <div className="flex justify-center items-center ">
              <p className="font-playfair text-[16px] lg:text-[26px] text-black max-w-4xl mx-auto text-justify-center mb-6 leading-[1.50][1.50] font-semibold">Because the backbone of India’s tourism deserves nothing but the best!
              </p>
            </div>

            <div className="flex justify-center items-center ">
              <p className="font-sans text-[16px] lg:text-[26px] text-black max-w-4xl mx-auto text-justify-center lg:mb-0 leading-[1.50][1.50] ">
                Cordelia Cruises brings you an exclusive, year-long concession starting January 25, 2025 tailored for the champions of hospitality and tourism across India. This special offer is our way of introducing you to the unparalleled joy of cruising—a tribute to your invaluable contributions.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center mb-[175px] ">
            <h2 className="text-[22px] lg:text-[42px] font-semibold text-black mb-8 font-outfit">
              Your Exclusive Benefits:
            </h2>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-8">
              <div className="w-[280px] lg:w-[400px] lg:h-[340px] h-[280px] bg-[#FFF8E6] p-6 text-center shadow-md rounded-lg flex flex-col justify-between">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/options.svg"
                  alt="Flexible Options"
                  className="mx-auto mb-4 lg:block hidden"
                />
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/options.svg"
                  alt="Flexible Options"
                  className="mx-auto mb-4 lg:hidden block mt-[16px]"
                />
                <h3 className="text-[24px] lg:text-[32px] font-bold mb-2 font-playfair">
                  Reserved Cabins
                </h3>
                <p className="text-[14px] lg:text-[24px] mb-[50px] lg:mb-0 lg:leading-normal leading-6 font-outfit">
                  25 Staterooms Reserved On Every Sailing.
                </p>
              </div>

              <div className="w-[280px] lg:w-[400px] lg:h-[340px] h-[280px] bg-[#EDFBEA] p-6 text-center shadow-md rounded-lg flex flex-col justify-between">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/farewb.svg"
                  alt="Concessional Fares"
                  className="mx-auto mb-4 lg:block hidden"
                />
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/fare.svg"
                  alt="Concessional Fares"
                  className="mx-auto lg:hidden block mt-[16px]"
                />
                <h3 className="text-[24px] lg:text-[32px] font-bold lg:mb-2 font-playfair">
                  Concessional Fares
                </h3>
                <p className="text-[14px] lg:text-[24px] mb-[50px] lg:mb-0 lg:leading-normal leading-6 font-outfit">
                  Special Fares Available Exclusively For Tourism And Hospitality
                  Professionals.
                </p>
              </div>

              <div className="w-[280px] lg:w-[400px] lg:h-[340px] h-[280px] bg-[#F1F7FF] p-6 text-center shadow-md rounded-lg flex flex-col justify-between">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/options.svg"
                  alt="Flexible Options"
                  className="mx-auto mb-4 lg:block hidden"
                />
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/options.svg"
                  alt="Flexible Options"
                  className="mx-auto mb-4 lg:hidden block mt-[16px]"
                />
                <h3 className="text-[24px] lg:text-[32px] font-bold mb-2 font-playfair">
                  Flexible Options
                </h3>
                <p className="text-[14px] lg:text-[24px] mb-[50px] lg:mb-0 lg:leading-normal leading-6 font-outfit">
                  Over 100 Sailings Scheduled In The Next Year, Giving You Plenty Of
                  Opportunities To Sail.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div
        className="relative min-h-screen flex items-center justify-center mt-[-240px] lg:mt-0"
      >
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/bgbluewb.webp"
          alt="Tourism 2025"
          className="absolute top-0 left-0 w-full h-full object-contain lg:block hidden"
        />
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/bgbluemobile.webp"
          alt="Tourism 2025"
          className="absolute top-0 left-0 w-full h-full object-contain lg:hidden block"
        />
        <div className="w-full max-w-4xl p-8  bg-opacity-90 rounded-lg z-10">
          <h2 className="lg:text-[50px] text-[24px] font-bold text-center  lg:mb-24 mb-6 font-playfair">
            {/* <span className='absolute lg:mt-[-17px] mt-[-8px] lg:left-[29%] left-[56px] text-white'>__________</span>  */}
             How To Book
              {/* <span className='absolute lg:mt-[-17px] mt-[-8px] lg:left-[60%] left-[264px] text-white'>__________</span> */}
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="relative w-16 lg:h-16 h-24 flex items-center justify-center rounded-[14px]">
                <div className="absolute inset-0 bg-[#FFFFFF] opacity-20 rounded-[14px]"></div>
                <span className="text-white z-10 text-[50px] font-bold font-playfair">01</span>
              </div>
              <p className="py-3 lg:py-0 flex-1 bg-white lg:flex justify-center items-center w-16 lg:h-16 h-24 px-4 lg:px-0 rounded-[14px] font-outfit">
                All Booking Requests Must Be Submitted Via Email To  &nbsp;{" "}
                <a
                  href="mailto:cruiseholiday@cordeliacruises.com"
                  className="text-[#3D58DB] underline text-[12px] lg:text-[18px] font-outfit"
                >
                  cruiseholiday@cordeliacruises.com
                </a>
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="relative w-16 lg:h-16 h-24 flex items-center justify-center rounded-[14px]">
                <div className="absolute inset-0 bg-[#FFFFFF] opacity-20 rounded-[14px]"></div>
                <span className="text-white z-10 text-[50px] font-bold font-playfair">02</span>
              </div>
              <p className="py-3 lg:py-0 flex-1 bg-white lg:flex justify-center items-center w-16 lg:h-16 h-24 px-4 lg:px-0 rounded-[14px]">
               <span className='mt-2 font-outfit'> Booking Requests Must Be Sent From The Primary Guest's{" "}
                <span className="font-semibold font-outfit">Official Email ID</span>.
                </span>
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="relative lg:w-[75px] w-[90px] lg:h-16 h-[185px] flex items-center justify-center rounded-[14px]">
                <div className="absolute inset-0 bg-[#FFFFFF] opacity-20 rounded-[14px]"></div>
                <span className="text-white z-10 text-[50px] font-bold font-playfair">03</span>
              </div>

              <p className="bg-white flex items-center justify-center w-full w-18 lg:h-[65px] h-[185px] px-4 rounded-[14px]">
                <span>
                  <span className="lg:font-semibold font-outfit">A Valid Visiting Card Or ID Card</span>{" "}
                  Proving Employment In The Tourism & Hospitality Sector Must Be Attached To The Booking Request In{" "}
                  <span className="lg:font-semibold font-outfit">PDF Or JPEG Format</span>.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto mt-[-100px] lg:mt-14">
        <h1 className="text-center text-2xl lg:text-[40px] font-semibold mb-6 font-playfair lg:mb-[55px] mb-[30px]">Offer Details & Terms</h1>
        <div className="relative">

          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/bggrdwb.webp"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 lg:block hidden"
          />
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/bggrdmobile.webp"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 lg:hidden block"
          />
          <div className="relative z-10 p-8 justify-self-center">

            <div className="space-y-6 text-gray-800">
              <div className="flex items-start space-x-4">
                <span className="text-xl text-red-500">🌟</span>
                <div>
                  <p className="font-semibold font-outfit">Who's Eligible?</p>
                  <p className="text-sm font-outfit">
                    Individuals Employed In The Tourism & Hospitality Sector (Hotels & Resorts,
                    Travel Agencies, Airlines).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl text-red-500">🌟</span>
                <div>
                  <p className="font-semibold font-outfit">Stateroom Type:</p>
                  <p className="text-sm font-outfit">Offer Applicable Only For Interior Staterooms.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl text-red-500">🌟</span>
                <div>
                  <p className="font-semibold font-outfit">Limited Availability:</p>
                  <p className="text-sm font-outfit">
                    First-Come, First-Served—Limited To The First 25 Cabins Per Sailing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl text-red-500">🌟</span>
                <div>
                  <p className="font-semibold font-outfit">Booking Limit:</p>
                  <p className="text-sm font-outfit">
                    One Cabin Per Individual (Based On A Unique ID). A Cabin Can Accommodate Up To 4
                    Guests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-8">
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/bgbchwb.webp"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 lg:block hidden"
        />
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/bgbchmobile.webp"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 lg:hidden block"
        />

        <div className=" p-8 bg-opacity-90 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold mb-4 font-outfit">Important Notes</h2>
          <ul className="list-decimal list-inside  space-y-2 font-outfit">
            <li>Offer Cannot Be Combined With Other Promotions Or Discounts.</li>
            <li>
              The Request Must Be Submitted By The Primary Guest, Who Is Employed In The
              Tourism & Hospitality Sector, And They Must Sail While Being Allowed To
              Bring Guests Of Their Choice.
            </li>
            <li>
              Cabin Pricing And Availability Are Subject To Cordelia Cruises’ Discretion.
            </li>
            <li>
              Rescheduling, Cancellations, And Refunds Are Not Allowed With This Offer.
            </li>
            <li>Standard Inclusions And Exclusions Apply.</li>
          </ul>
          <p className="text-center text-[#92278F] font-bold mt-6">
            Don’t Wait—Cabins Are Limited! Secure Your Escape To Luxury Today.
          </p>
        </div>
      </div>


      <section className="mt-1 lg:mt-20">
        <Destination />
        <div className="flex justify-center lg:mb-[130px]" style={{marginBottom:'110px'}}>
          {/* <a
            href="/upcoming-cruises?da=25012025&db=30012026"
            className="bg-brand-primary text-white px-6 py-4 mt-14 text-lg font-bold rounded-md"
          >
            BOOK YOUR CRUISE
          </a> */}
        </div>
      </section>
    </Layout>
  );
};

export default NationalTourismDay;
