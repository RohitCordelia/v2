import React, { Fragment, useEffect, useState } from 'react'
import Accordion from '../UI/Accordion/accordion';
import ContactFloater from "../ContactFloater";
import Modal from '../../components/UI/Modal';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

type Props = { footerClassName?: string };
const mobileWave = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/footer-wave-mobile.svg';
const desktopWave = 'https://images.cordeliacruises.com/cordelia_v2/public/assets/footer-wave-desktop.svg';
const Links = ({ className = '' }: { className?: string }) => {
  const currentUrl = window.location.pathname;
  let link2 = currentUrl.split('/')[2];

  return (
    <div className={`grid grid-cols-1 gap-3 text-sm lg:text-sm ${className}`}>
      <a href="https://adminpro.cordeliacruises.com/login" target='_blank'>Group Booking Quotation</a>
      <a href="/group-quotation">Group booking form</a>
      <a href="https://agent.cordeliacruises.com/login">Agent Login</a>
      <a href="/about-us">About Us</a>
      <a href="https://images.cordeliacruises.com/static/valet_sevice.pdf">Valet Services Mumbai</a>
      <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Port_Address.pdf">Ports</a>
      <a href="https://images.cordeliacruises.com/static/Cordelia%20-Website%20Terms%20and%20Conditions.pdf">Website T&C</a>
      {/* <a href="https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/cordelia_v2/public/pdf/Sri+Lanka+Giveaway+T%26C.pdf">Contest T&C</a> */}
      <a href="/career">Careers</a>
      {link2 == 'club-mahindra-offer' ?
        <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/ClubM+Select+_+Cordelia+Cruises+Offer+T%26C.pdf">Club Mahindra T&C</a>
        : null
      }
      <a href="/Blog">Blogs</a>
    </div>
  );
};

const PrivacyPolicy = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`grid grid-cols-1 gap-3 text-sm lg:text-sm ${className}`}>
      <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf">Privacy Policy</a>
      <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Onboard+Policy+-+Final+++17.10.2024.pdf">Onboard Policy</a>
      {/* <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Waterways_Whistle_Blower_Policy.pdf">Whistle Blower Policy</a>
      <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Waterways_POSH_policy.pdf">POSH Policy</a> */}
      <a href="/health-wave-policy">Healthy waves policy</a>
      <a href="/clean-wave-policy">Clean waves Policy</a>
      <a href="/faqs">FAQ</a>
      <a href="/terms-condition">Terms and Conditions</a>
      <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Passenger_Cruise_Ticket_Contract_POLICY_1_FINAL+06.10.2025.pdf">Passenger Cruise Ticket Contract</a>
      <a href="https://images.cordeliacruises.com/static/sop.PDF">Cruise SOP</a>
      <a href="/investor-relation">Investor Relation</a>
      <a target='_blank' href="https://www.stampthepassport.com/cordelia-visapolicy">User Agreement - Visa</a>
      <a target='_blank' href="https://www.stampthepassport.com/cordelia-visapolicy">Privacy Policy - Visa</a>
      <a href="/disclaimer-against-frauds">Disclaimer Against Frauds</a>
      <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/No_Sail_Policy.pdf">No Sail Policy</a>
    </div>
  );
};

const RegionData = {
  North: [
    {
      name: "Neha Sharma",
      region: "Delhi / NCR",
      mobile: "9654945484",
      email: "neha.sharma@cordeliacruises.com"
    },
    {
      name: "Siddharth Saxena",
      region: "Delhi / NCR",
      mobile: "9899881367",
      email: "siddharth.s@cordeliacruises.com"
    },
    {
      name: "Prashant Upadhyay",
      region: "Delhi / Rajasthan",
      mobile: "9839018766",
      email: "prashant.u@cordeliacruises.com"
    },
    {
      name: "Shweta Parmar",
      region: "Delhi / NCR",
      mobile: "9336334299",
      email: "shweta.p@cordeliacruises.com"
    },
    {
      name: "Rahul Jaravta",
      region: "Punjab & J&K",
      mobile: "8278780583",
      email: "rahul.j@cordeliacruises.com"
    },
    {
      name: "Shalini Singh",
      region: "Uttar Pradesh",
      mobile: "8860071986",
      email: "shalini.s@cordeliacruises.com"
    },
    {
      name: "Harpreet Singh",
      region: "Delhi / NCR",
      mobile: "9315634664",
      email: "harpreet.s@cordeliacruises.com"
    },
    {
      name: "Aasifa Ahmed",
      region: "North",
      mobile: "9891366377",
      email: "aasifa.a@cordeliacruises.com"
    },
  ],
  Central: [
    {
      name: "Jaya Rawat",
      region: "North Corporate",
      mobile: "9901111381",
      email: "jaya.r@cordeliacruises.com"
    },
    {
      name: "Gunjan Khanna",
      region: "West Corporate",
      mobile: "9819161818",
      email: "gunjan.khanna@cordeliacruises.com"
    },
  ],
  South: [
    {
      name: "Dinesh Chettithodi",
      region: "Cochin",
      mobile: "9400870192",
      email: "dinesh.chettithodi@cordeliacruises.com"
    },
    {
      name: "Raghu Pokala",
      region: "Bangalore",
      mobile: "9324519161",
      email: "raghu.p@cordeliacruises.com"
    },
    {
      name: "Sunil Kumar",
      region: "Hyderabad",
      mobile: "9347806594",
      email: "sunil.k@cordeliacruises.com"
    },
    {
      name: "Anistaberry Peter",
      region: "Chennai",
      mobile: "7975572521",
      email: "anistaberry.p@cordeliacruises.com"
    },
    {
      name: "Maddu Santosh",
      region: "Hyderabad",
      mobile: "9535523254",
      email: "maddu.s@cordeliacruises.com"
    },
    {
      name: "Margaret Roopa",
      region: "South",
      mobile: "9741303518",
      email: "margaret.a@cordeliacruises.com"
    },
  ],
  West: [
    {
      name: "Sulekha Singh",
      region: "West",
      mobile: "9920917201",
      email: "sulekha.singh@cordeliacruises.com"
    },
    {
      name: "Karan Kapoor",
      region: "Mumbai",
      mobile: "9833903348",
      email: "karan.k@cordeliacruises.com"
    },
    {
      name: "Vasant Sharma",
      region: "Mumbai",
      mobile: "8369902470",
      email: "vasant.s@cordeliacruises.com"
    },
    {
      name: "Ninad Sahasrabudhe",
      region: "Nagpur",
      mobile: "9422128346",
      email: "ninad.s@cordeliacruises.com"
    },
    {
      name: "Aditya Patankar",
      region: "Pune",
      mobile: "9822316776",
      email: "aditya.p@cordeliacruises.com"
    },
    {
      name: "Dileshwar Kumar Sahu",
      region: "Raipur",
      mobile: "700249193",
      email: "dileshwar.s@cordeliacruises.com"
    },
  ],
  East: [
    {
      name: "Manish Anand",
      region: "East",
      mobile: "9937411212",
      email: "manish.a@cordeliacruises.com"
    },
  ],
};

const webCheckInPaths = ["/webCheckIn", "/WebBooking", "/checkInGuestDetail", "/id-preview", "/profile-preview"];

export default function Footer({ footerClassName }: Props) {

  const [agentModal, setAgentModal] = useState(false)

  const location = useLocation();

  let appLink = '';
  if (/Android/i.test(navigator.userAgent)) {
    appLink = 'https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp'
  } else if (/iPhone/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) {
    appLink = 'https://apps.apple.com/in/app/cordelia-cruises/id1589910857'
  }

  // let link = document.location.href;
  // var parts = link.split("/");
  // console.log('link', parts[parts.length - 1]);

  return (
    <footer className={`bg-blue relative mt-16 z-20 ${footerClassName}`}>
      <img src={window.innerWidth > 640 ? desktopWave : mobileWave} alt="wave" className='absolute lg:-top-[6vw] md:-top-[6vw] -top-[12vw]  w-full' />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 lg:py-8">
        <div className="p-4 text-white lg:col-span-2">
          {/* <div className="grid gap-4 grid-cols-6 mt-4 mb-8">
            <div className='col-span-2 lg:col-span-3'>
            <img
              src={"https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-footer-logo.svg"}
              className="h-16 lg:h-auto mr-3 sm:h-9"
              alt="Cruise"
              loading="lazy"
              />
              </div>
            <div className="col-span-4 lg:col-span-3 text-right lg:text-left lg:self-center lg:pl-4">
              <h4 className="text-xl">Cordelia Cruises</h4>
              <h5 className="text-sm">Destination Of Your Dreams</h5>
            </div>
          </div> */}
          <div className='flex items-center justify-between mb-8 mt-4'>
            <div>
              <img
                src={"https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-footer-logo.svg"}
                className="h-10 lg:h-12 mr-3 sm:h-9"
                alt="Cruise"
                title='Cordelia-cruises'
                loading="lazy"
              />
            </div>
            {/* <div className='text-right lg:text-left'>
              <h4 className="text-xl">Cordelia Cruises</h4>
              <h5 className="text-xxs lg:text-sm">Destination Of Your Dreams</h5>
            </div> */}
          </div>
          <div className="mb-5">
            <p className="text-white/70 text-xs lg:text-base leading-5">
              Cordelia Cruises by Waterways Leisure Tourism Limited (Formerly known as Waterways Leisure Tourism Private Limited) is India’s
              premium cruise line. True to its name, Cordelia aspires to
              promote and drive the cruise culture in India through experiences
              that are stylish, luxurious and most importantly, inherently
              Indian.
            </p>
          </div>
          <div className="hidden lg:block mb-5">
            <a target="_blank" href="https://in.linkedin.com/company/cordeliacruises">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/linkedin-icon.svg"
                alt="linkedin"
                title='Follow-us-here'
                className="inline-block mr-3"
              />
            </a>
            <a target="_blank" href="https://www.instagram.com/cordeliacruises/?hl=en">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/instagram-icon.svg"
                alt="instagram"
                title='Follow-us-here'
                className="inline-block mx-3"
              />
            </a>
            <a target="_blank" href="https://twitter.com/CordeliaCruises">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/twitter-icon.svg"
                alt="twitter"
                title='Follow-us-here'
                className="inline-block mx-3"
              />
            </a>
            <a target="_blank" href="https://www.facebook.com/cordeliacruises">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/facebook-icon.svg"
                alt="facebook"
                title='Follow-us-here'
                className="inline-block mx-3"
              />
            </a>
            <a target="_blank" href="https://www.youtube.com/channel/UCIGZzyqWsbCH1-VNFsXrY9g">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/youtube.svg"
                alt="youtube"
                title='Follow-us-here'
                className="inline-block mx-3"
              />
            </a>
          </div>
          <div className="mb-5">
            <p className='font-bold'>Book Now: </p>
            <div className=''>
              <a href="tel:022-68811111" className="mb-3 text-sm">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone-icon-white.svg"
                  alt="phone"
                  title='Follow-us-here'
                  className="inline-block mr-3"
                />
                022-68811111
              </a>
            </div>
            <br />
            <p className='font-bold'>Group Travel Desk (Corporate / Travel Partner):</p>
            <div className=''>
              <a href="tel:022-65545206" className="mb-3 text-sm">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone-icon-white.svg"
                  alt="phone"
                  title='Follow-us-here'
                  className="inline-block mr-3"
                />
                022-65545206
              </a>
              <div>
                <p className='text-xs'>(<span className='font-semibold'>Mon to Fri</span> - 10 AM to 7 PM)</p>
              </div>
              <div>
                <p className='text-xs font-semibold'>(Only for our Travel Partners)</p>
              </div>
              <a href="mailto:travelops@cordeliacruises.com" className="mb-3 text-sm">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail-icon-white.svg"
                  alt="phone"
                  title='Follow-us-here'
                  className="inline-block mr-3"
                />
                travelops@cordeliacruises.com
              </a>
            </div>
            <br />
            <p className='font-bold'>Customer Support:</p>
            <a href="tel:022-68811190" className="mb-3 text-sm">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone-icon-white.svg"
                alt="phone"
                title='Follow-us-here'
                className="inline-block mr-3"
              />
              022-68811190
            </a>
            <div>
              <p className='text-xs'>(<span className='font-semibold'>Mon to Fri</span> - 9 AM to 8 PM)</p>
              <p className='text-xs'>(<span className='font-semibold'>Sat / Sun and Public Holidays</span> - 10 AM to 7 PM)</p>
            </div>
            <br />
            <a href="mailto:info@cordeliacruises.com" className="mb-3 mt-3 text-sm">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mail-icon-white.svg"
                alt="phone"
                title='write-to-us'
                className="inline-block mr-3"
              />
              info@cordeliacruises.com
            </a>
          </div>
          <div className="lg:hidden">
            <hr />
            <Accordion title="Links">
              <Links className='mb-2.5' />
            </Accordion>
            <hr />
            <Accordion title="Privacy & Policy">
              <PrivacyPolicy className='mb-4' />
            </Accordion>
            <hr />
            <div className='my-5'>
              <a href={appLink} className='text-base font-playfairDisplay'>Download the App</a>
            </div>
            <hr />
            <div className="my-5 mb-2">
              <div className="grid grid-cols-3 gap-4">
                <h5 className="text-base">Follow us:</h5>
                <div className="col-span-2">

                  <a target="_blank" href="https://in.linkedin.com/company/cordeliacruises">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/linkedin-icon.svg"
                      alt="linkedin"
                      title='Cordelia-cruises'
                      className="inline-block mr-3"
                    />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/cordeliacruises/?hl=en">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/instagram-icon.svg"
                      alt="instagram"
                      title='Cordelia-cruises'
                      className="inline-block mx-3"
                    />
                  </a>
                  <a target="_blank" href="https://twitter.com/CordeliaCruises">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/twitter-icon.svg"
                      alt="twitter"
                      title='Cordelia-cruises'
                      className="inline-block mx-3"
                    />
                  </a>
                  <a target="_blank" href="https://www.facebook.com/cordeliacruises">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/facebook-icon.svg"
                      alt="facebook"
                      title='Cordelia-cruises'
                      className="inline-block mx-3"
                    />
                  </a>
                  <a target="_blank" href="https://www.youtube.com/channel/UCIGZzyqWsbCH1-VNFsXrY9g">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/youtube.svg"
                      alt="youtube"
                      title='Cordelia-cruises'
                      className="inline-block mx-3"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block p-4 mt-4 text-white">
          <h4 className="text-2xl mb-8 text-brand-secondary">Links</h4>
          <Links />
          {/* <div className='mt-2'>
            <p className='mt-3 cursor-pointer text-sm' onClick={() => setAgentModal(true)}>Agent Detail</p>
          </div> */}
        </div>
        <div className="hidden lg:block p-4 mt-4 text-white">
          <h4 className="text-2xl mb-8 text-brand-secondary">
            Privacy & Policy
          </h4>
          <PrivacyPolicy />
        </div>
      </div>
      <div className="p-4 text-center bg-white text-black mb-14 lg:mb-0">
        <h6 className="text-sm">© 2022 Cordelia Cruises All Rights Reserved</h6>
      </div>
      <ContactFloater />
      {/* {!webCheckInPaths.includes(location.pathname) && <ContactFloater />} */}

      <Modal show={agentModal} align={'center'} className=" w-[90%] lg:w-2/4 center rounded-lg lg:rounded overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[90%]" onClose={() => setAgentModal(false)}>
        <div className='flex items-center justify-between p-4 pb-2 bg-white'>
          <h1 className='text-lg lg:text-2xl font-semibold'>Select Deck</h1>
          <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => setAgentModal(false)}>X</p>
        </div>
        <div className='overflow-scroll h-[90%] px-4 bg-white pb-2'>
          <table className='w-full'>
            {
              Object.keys(RegionData).map((regions, idx) => (
                <Fragment key={idx}>
                  <tr className='bg-brand-primary mb-2'>
                    <th className='py-2 text-white border text-left px-1'>Region</th>
                    <th className='py-2 text-white border text-left px-1'>{regions} Team</th>
                    <th className='py-2 text-white border text-left px-1'>Mobile Number</th>
                    <th className='py-2 text-white border text-left px-1'>Email ID</th>
                  </tr>
                  {
                    RegionData[regions].map((v: any, i: number) => (
                      <tr key={i}>
                        <td className='border px-1 text-sm font-semibold py-1.5'>{v.region}</td>
                        <td className='border px-1 text-sm font-semibold py-1.5'>{v.name}</td>
                        <td className='border px-1 text-sm font-semibold py-1.5'>{v.mobile}</td>
                        <td className='border px-1 text-sm font-semibold py-1.5'>{v.email}</td>
                      </tr>
                    ))
                  }
                </Fragment>
              ))
            }

            {/* return RegionData[region].map((v, i) => (
                  <p>{v.name}</p>
                )) */}
            {/* <tr className='bg-brand-primary'>
              <th className='py-2 text-white border text-left px-1'>Region</th>
              <th className='py-2 text-white border text-left px-1'>North Team</th>
              <th className='py-2 text-white border text-left px-1'>Mobile Number</th>
              <th className='py-2 text-white border text-left px-1'>Email ID</th>
            </tr>
            <tr>
              <td className='border px-1 text-sm font-semibold py-1.5'>Delhi / NCR</td>
              <td className='border px-1 text-sm font-semibold py-1.5'>Neha Sharma</td>
              <td className='border px-1 text-sm font-semibold py-1.5'>9654945484</td>
              <td className='border px-1 text-sm font-semibold py-1.5'>neha.sharma@cordeliacruises.com</td>
            </tr> */}
          </table>
        </div>
      </Modal>
      
    </footer>
  );
}
