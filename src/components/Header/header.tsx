/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Menu from "react-burger-menu/lib/menus/slide";
import Sidebar from "../Sidebar/sidebar";
import { GetAuth } from "../../utils/store/store";
import ProfileAuth from "../../pages/profile/auth";
import Button from "../UI/Button";

type Props = {
  headerAnimation?: string,
  showStripeHeader?: boolean,
  showTopHeader?: boolean,
  setShowStripeHeader?: (value: boolean) => void,
  onStripeHeightChange?: (height: number) => void,
};

const destinationLinks = {
  domestic: [
    {
      title: "Mumbai",
      link: "/mumbai",
    },
    {
      title: "Goa",
      link: "/goa",
    },
    {
      title: "Lakshadweep",
      link: "/lakshadweep",
    },
    {
      title: "Kochi",
      link: "/kochi",
    },
    {
      title: "Chennai",
      link: "/chennai",
    },
    {
      title: "Vizag",
      link: "/visakhapatnam",
    },
    {
      title: "Puducherry",
      link: "/pondicherry",
    },
  ],
  international: [
    {
      title: "Sri Lanka",
      link: "/srilanka",
    },
    {
      title: "Singapore",
      link: "/southeast-asia-cruises",
    },
    {
      title: "Malaysia",
      link: "/southeast-asia-cruises",
    },
    {
      title: "Thailand",
      link: "/southeast-asia-cruises",
    },
  ]
}

export default function Header({ headerAnimation, showStripeHeader, showTopHeader = true, setShowStripeHeader, onStripeHeightChange }: Props) {
  const [top, setTop] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [focused, setFocused] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [showCruises, setShowCruises] = React.useState(false);
  const [destinationNav, setDestinationNav] = React.useState(false);
  const [domesticNav, setDomesticNav] = React.useState(false);
  const [internationalNav, setInternationalNav] = React.useState(false);
  const [authModal, setAuthModal] = React.useState(false);
  // const [showStripeHeader, setShowStripeHeader] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // const popoverRef = useRef(null);
  // const popoverDestRef = useRef(null);
  // const popoverMyAccRef = useRef(null);
  const stripeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stripeRef.current && onStripeHeightChange) {
      const height = stripeRef.current.offsetHeight;
      onStripeHeightChange(height);
    }
  }, []);

  useEffect(() => {
    if (!stripeRef.current || !onStripeHeightChange) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          onStripeHeightChange(entry.contentRect.height);
        }
      }
    });

    observer.observe(stripeRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setToken(GetAuth()?.token)
  }, [GetAuth()]);

  useEffect(() => {
    const handler = () => {
      const saved = GetAuth();
      setToken(saved?.token ? saved?.token : null);
    };
    window.addEventListener("authChanged", handler);
    return () => window.removeEventListener("authChanged", handler);
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const handleClickBooking = () => {
    localStorage.removeItem('store');
    localStorage.removeItem('promo_code');
    navigate("/upcoming-cruises")
  }

  const handleClickWeekend = () => {
    localStorage.removeItem('store');
    localStorage.removeItem('promo_code');
    navigate("/weekend")
  }

  const handleLogOut = () => {
    localStorage.clear();
    // custom event
    window.dispatchEvent(new Event("authChanged"));
    navigate(0);
  }

  const isUPCpage = location.pathname === '/upcoming-cruises';

  return (
    <div>
      <header className={`${!top && ""} fixed bg-white w-full z-30 py-2 lg:py-0 top-0 shadow-lg transition duration-300 ease-in-out ${showStripeHeader ? 'pt-0' : ''}`}>
        {isUPCpage && showStripeHeader && <div ref={stripeRef} className="flex justify-between lg:items-center gap-3 text-xs bg-[#fff6f6] border border-[#fea0a0] px-2 py-2 lg:py-3">
          <div className="flex lg:items-center gap-2 lg:text-sm lg:leading-5">
            <div className="w-4 lg:w-6" >
              <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info_red_home.svg" alt="info_icon" />
            </div>
            <p className="w-full">
              <span className="font-bold">Booking Scam Alert: </span> Fraudsters are posing as Cordelia Cruises
              offering fake cruise deals. Never trust unofficial emails or
              payment links.
            </p>
          </div>
          <div onClick={() => setShowStripeHeader(false)}>
            <svg
              // onClick={() => setDescription(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 cursor-pointer"
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
        </div>}
        <ProfileAuth setAuthModal={setAuthModal} token={token} setToken={setToken} authModal={authModal} />
        <nav className={`w-full ${showStripeHeader ? 'pt-2 lg:pt-0' : ''}`}>
          <div className={`${showTopHeader ? 'hidden lg:flex' : 'hidden'} border-b border-gray-300/10 px-4 lg:px-20 mx-auto py-2 justify-between bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B]`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/call-new-icon.svg" alt="" />
                <a
                  href="tel:022-68811111"
                  className={`text-xs font-medium block text-white`}
                  aria-current="page"
                >
                  022-68811111
                </a>
              </div>
              <div className="flex items-center gap-2">
                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp-new-icon.svg" alt="" />
                <a
                  href="https://wa.me/917738850000"
                  target="_blank"
                  className={`text-xs font-medium block text-white`}
                  aria-current="page"
                >
                  +91 7738850000
                </a>
              </div>
            </div>
          </div>
          <div className="px-4 lg:px-20 mx-auto flex py-1 justify-between">
            <div className="py-1 md:block w-[35%] lg:w-[18%]">
              <a href="/">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo.svg"
                  className=""
                  alt="Cruise"
                />
              </a>
            </div>
            <div className="hidden w-[82%] lg:flex items-center justify-between">
              <div className="hidden lg:flex items-center h-[62px]">
                <div className="flex items-center justify-between gap-2" style={{ height: "inherit" }}>
                  <div
                    className="relative flex"
                    style={{ height: 'inherit' }}
                    onMouseEnter={() => setShowCruises(true)}
                    onMouseLeave={() => setShowCruises(false)}
                  >
                    <div className="px-2 flex items-center cursor-pointer">
                      <button className={`text-sm 2xl:text-base font-medium block`}>
                        Our Ships
                      </button>
                      <div
                        className={`w-3 h-3 ml-2 -mb-1 ${showCruises ? 'rotate-180' : ''
                          }`}
                      >
                        <img
                          className="w-full h-full"
                          src={
                            'https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg'
                          }
                          alt="Dropdown"
                        />
                      </div>
                    </div>
                    {showCruises && (
                      <div className="absolute top-full left-0 rounded-b border border-gray-300 overflow-hidden shadow-allSide bg-white z-50 w-max">
                        <a
                          href="/cordelia-sky"
                          className={`block text-sm 2xl:text-base font-medium hover:text-brand-primary px-4 py-2 border-b border-gray-300 hover:bg-gray-400 ${path === '/cordelia-sky'
                            ? 'bg-gray-400 text-brand-primary'
                            : ''
                            }`}
                        >
                          Cordelia Sky
                        </a>
                        <a
                          href="/cordelia-sun"
                          className={`block text-sm 2xl:text-base font-medium hover:text-brand-primary px-4 py-2 border-b border-gray-300 hover:bg-gray-400 ${path === '/cordelia-sun'
                            ? 'bg-gray-400 text-brand-primary'
                            : ''
                            }`}
                        >
                          Cordelia Sun
                        </a>
                        <a
                          href="/cordelia-empress"
                          className={`block text-sm 2xl:text-base font-medium hover:text-brand-primary px-4 py-2 hover:bg-gray-400 ${path === '/cordelia-empress'
                            ? 'bg-gray-400 text-brand-primary'
                            : ''
                            }`}
                        >
                          Cordelia Empress
                        </a>
                      </div>
                    )}
                  </div>
                  <div
                    className="relative flex"
                    style={{ height: 'inherit' }}
                    onMouseEnter={() => setDestinationNav(true)}
                    onMouseLeave={() => setDestinationNav(false)}
                  >
                    <div
                      className="px-2 flex items-center relative cursor-pointer"
                    // onClick={(e) => togglePopover(e, 'destination')}
                    >
                      <button className={`block text-sm 2xl:text-base font-medium`}>
                        Destinations
                      </button>
                      <div
                        className={`w-3 h-3 ml-2 -mb-1 ${destinationNav ? 'rotate-180' : ''
                          }`}
                      >
                        <img
                          className="w-full h-full"
                          src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg`}
                        />
                      </div>
                    </div>
                    {destinationNav && (
                      <div className="absolute top-full left-0 rounded-b border border-gray-300 shadow-allSide min-w-[175px]">
                        <div className={`flex items-center justify-between gap-2 px-4 py-2 bg-white cursor-pointer border-b border-gray-300 hover:text-brand-primary hover:bg-gray-400`}>
                          <button
                            className={`hidden lg:inline-block rounded-sm text-sm 2xl:text-base font-medium`}
                            onClick={() => navigate("/destination")}
                          >
                            All Destinations
                          </button>
                        </div>
                        <div
                          className="relative"
                          onMouseEnter={() => setDomesticNav(true)}
                          onMouseLeave={() => setDomesticNav(false)}
                        >
                          <div
                            className={`flex items-center justify-between gap-2 px-4 py-2 bg-white cursor-pointer border-b border-gray-300 hover:text-brand-primary hover:bg-gray-400 ${domesticNav ? 'bg-gray-400' : ''
                              }`}
                          // onClick={(e) => togglePopover(e, 'domestic')}
                          >
                            <button
                              className={`hidden lg:inline-block rounded-sm text-sm 2xl:text-base font-medium ${domesticNav ? 'text-brand-primary' : ''
                                }`}
                            >
                              Domestic
                            </button>
                            <div className={`w-3 h-3 -mb-1 -rotate-90`}>
                              <img
                                className="w-full h-full"
                                src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg`}
                              />
                            </div>
                          </div>
                          {domesticNav && (
                            <div className="absolute top-0 left-full rounded-b border border-gray-300 overflow-hidden shadow-allSide min-w-[175px]">
                              {destinationLinks.domestic.map((destination) => (
                                <a
                                  href={destination.link}
                                  className={`hidden lg:block text-sm 2xl:text-base font-medium hover:text-brand-primary gap-2 px-4 py-2 bg-white cursor-pointer border-b border-gray-300 last:border-0 hover:bg-gray-400 ${path === destination.link
                                    ? 'bg-gray-400 text-brand-primary'
                                    : ''
                                    }`}
                                >
                                  {destination.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <div
                          className="relative"
                          onMouseEnter={() => setInternationalNav(true)}
                          onMouseLeave={() => setInternationalNav(false)}
                        >
                          <div
                            className={`flex items-center justify-between gap-2 px-4 py-2 bg-white cursor-pointer hover:text-brand-primary hover:bg-gray-400 ${internationalNav ? 'bg-gray-400' : ''
                              }`}
                          // onClick={(e) => togglePopover(e, 'international')}
                          >
                            <button
                              className={`hidden lg:inline-block rounded-sm text-sm 2xl:text-base font-medium ${internationalNav ? 'text-brand-primary' : ''
                                }`}
                            >
                              International
                            </button>
                            <div className={`w-3 h-3 -mb-1 -rotate-90`}>
                              <img
                                className="w-full h-full"
                                src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg`}
                              />
                            </div>
                          </div>
                          {internationalNav && (
                            <div className="absolute top-0 left-full rounded-b border border-gray-300 overflow-hidden shadow-allSide min-w-[175px]">
                              {destinationLinks.international.map(
                                (destination, idx) => (
                                  <a
                                    href={destination.link}
                                    className={`hidden lg:block text-sm 2xl:text-base font-medium hover:text-brand-primary gap-2 px-4 py-2 bg-white cursor-pointer border-b border-gray-300 last:border-0 hover:bg-gray-400 ${(idx === 1 && path === destination.link) ||
                                      (idx === 1 && path === '/singapore') ||
                                      (idx === 2 && path === '/malaysia/langkawi') ||
                                      (idx === 3 && path === '/thailand/phuket')
                                      ? 'bg-gray-400 text-brand-primary'
                                      : ''
                                      }`}
                                  >
                                    {destination.title}
                                  </a>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="px-2">
                    <a
                      href="/group-quotation"
                      className={`font-playfairDisplay text-[16px] block`}
                      aria-current="page"
                    >
                      Group Enquiry
                    </a>
                  </div> */}
                  <div className="px-2">
                    <a
                      href="/blog"
                      className={`block text-sm 2xl:text-base font-medium`}
                      aria-current="page"
                    >
                      Blogs
                    </a>
                  </div>
                  <div className="px-2">
                    <div className="flex items-center">
                      {/* <img className="rotating mr-1" src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" alt="CordeliaCruise" title="Offers-On-Cordelia-Cruises" /> */}
                      <a
                        href="/promotion"
                        className={`block text-sm 2xl:text-base font-medium`}
                        aria-current="page"
                      >
                        Offers
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:inline-block">
                <div className="flex justify-between items-center">
                  <div className="px-1">
                    <Button text="Find A Cruise" size="sm" handleClick={handleClickBooking} />
                  </div>
                  <div className="px-1">
                    <Button
                      text="Web Check-in"
                      size="sm"
                      type="secondary"
                      handleClick={() => navigate('/webCheckIn')}
                    />
                  </div>
                  <div className={`px-1 ${token ? 'h-[62px]' : ''}`}>
                    {window.innerWidth > 1000 ? (
                      token ? (
                        <div
                          className="relative flex"
                          style={{ height: "inherit" }}
                          onMouseEnter={() => setShow(true)}
                          onMouseLeave={() => setShow(false)}
                        >
                          <div
                            className=" flex items-center relative cursor-pointer"
                            onClick={() => setShow(!show)}
                          >
                            <img
                              height={25}
                              width={24}
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/profile-new-menu.svg"
                              alt="Profile Icon"
                            />
                            <button className="hidden lg:inline-block rounded-sm py-2.5 text-sm 2xl:text-base font-medium ml-2">
                              My Account
                            </button>
                            <div
                              className={`w-3 h-3 ml-2 ${show ? 'rotate-180' : ''
                                }`}
                            >
                              <img
                                className="w-full h-full"
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg"
                              />
                            </div>
                          </div>
                          {show ? (
                            <div className="absolute top-full left-0 w-max rounded-b border border-gray-300 overflow-hidden shadow-md bg-white">
                              <a
                                href="/my-profile"
                                className="flex items-center gap-2 text-sm 2xl:text-base font-medium hover:text-brand-primary px-4 py-2 border-b border-gray-300 hover:bg-gray-400"
                              >
                                <div className="w-6 h-6">
                                  <img
                                    className="w-full h-full"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/profile-new-menu.svg"
                                    alt="Profile"
                                  />
                                </div>
                                <span>My Profile</span>
                              </a>
                              <a
                                href="/manage-booking"
                                className="flex items-center gap-2 text-sm 2xl:text-base font-medium hover:text-brand-primary px-4 py-2 border-b border-gray-300 hover:bg-gray-400"
                              >
                                <div className="w-6 h-6">
                                  <img
                                    className="w-full h-full"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mybooking-new-icon.svg"
                                    alt="My Bookings"
                                  />
                                </div>
                                <span>My Bookings</span>
                              </a>
                              <a
                                onClick={handleLogOut}
                                className="flex items-center gap-2 text-sm 2xl:text-base font-medium hover:text-brand-primary px-4 py-2 hover:bg-gray-400 cursor-pointer"
                              >
                                <div className="w-6 h-6">
                                  <img
                                    className="w-full h-full"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/logout-purple-new-icon.svg"
                                    alt="Logout_icon"
                                  />
                                </div>
                                <span>Log Out</span>
                              </a>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex items-center relative">
                          <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/profile-new-menu.svg" alt="Profile Icon" />
                          <a
                            onClick={() => setAuthModal(true)}
                            className="hidden lg:inline-block rounded-sm py-2.5 font-semibold text-sm 2xl:text-base ml-2 cursor-pointer text-brand-primary"
                          >
                            Login / Register
                          </a>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end col-span-2 gap-4">
              <div>
                {/* <div onClick={() => navigate('/upcoming-cruises')} className={`cursor-pointer lg:hidden inline-block border-1 text-brand-primary border-brand-primary px-2 py-1.5 font-semibold text-sm rounded`}>
                  Find a Cruise
                </div> */}
                <Button
                  text="Find a Cruise"
                  size="xs"
                  type="secondary"
                  handleClick={() => navigate('/upcoming-cruises')}
                  className="px-2 py-2 text-sm lg:hidden inline-block"
                />
              </div>
              {/* <div className="lg:hidden flex items-center gap-1 text-white text-sm mr-5" onClick={() => navigate('/upcoming-cruises')}>
                <div className="w-4 h-4">
                  <img
                    src={'https://images.cordeliacruises.com/cordelia_v2/public/assets/search-rounded_mobile.svg'}
                    className="w-full h-full"
                    alt="Blog"
                  />
                </div>
                <span
                  className={`text-md font-semibold underline text-brand-primary`}
                >
                  {' '}
                  Find a Cruise{' '}
                </span>
              </div> */}
              <div className="lg:hidden">
                <Sidebar headerDark={undefined} setAuthModal={setAuthModal} />
              </div>

              {/* <a href="/upcoming-cruises" className="hidden lg:inline-block rounded-sm border-2 border-brand-primary text-brand-primary py-2.5 font-bold px-4 text-sm ml-2 hover:bg-brand-primary hover:text-white">Find a Cruise</a> */}

              {headerAnimation && (
                <img src={headerAnimation} className="h-[50px] lg:h-[70px] ml-2" alt="Cruise" />
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
