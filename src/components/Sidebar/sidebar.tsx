import React from 'react';
// import { TiggerGAClickEvent } from "../Analytics/events";
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import { GetAuth } from '../../utils/store/store';

type Props = {
  headerDark: any;
  setAuthModal: any;
  authModal?: any;
};

const Menu = React.lazy(() => import('react-burger-menu/lib/menus/slide'));

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

export default function Sidebar({
  headerDark,
  setAuthModal,
  authModal
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [showCruises, setShowCruises] = React.useState(false);
  const [destinationNav, setDestinationNav] = React.useState(false);
  const [domesticNav, setDomesticNav] = React.useState(false);
  const [internationalNav, setInternationalNav] = React.useState(false);
  const user = GetAuth()?.token;
  const navigate = useNavigate();

  let appImage = '';
  let appLink = '';
  if (/Android/i.test(navigator.userAgent)) {
    appImage =
      'https://images.cordeliacruises.com/cordelia_v2/public/images/google-play-store-logo.webp';
    appLink =
      'https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp';
  } else if (
    /iPhone/i.test(navigator.userAgent) ||
    /iPad/i.test(navigator.userAgent)
  ) {
    appImage =
      'https://images.cordeliacruises.com/cordelia_v2/public/images/apple-app-store-logo.webp';
    appLink = 'https://apps.apple.com/in/app/cordelia-cruises/id1589910857';
  }

  const handleClickWeekend = () => {
    localStorage.removeItem('store');
    localStorage.removeItem('promo_code');
    navigate('/weekend');
  };
  const handleClickBooking = () => {
    localStorage.removeItem('store');
    localStorage.removeItem('promo_code');
    navigate('/upcoming-cruises');
  };
  const handleLogOut = () => {
    localStorage.clear();
    setIsOpen(false)
    navigate(0)
  }

  const handleCloseAllNav = () => {
    setShowCruises(false);
    setDestinationNav(false);
    setDomesticNav(false);
    setInternationalNav(false);
  }

  return (
    <div className='flex'>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={`${headerDark
            ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hamburger-icon-white.svg'
            : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/hamburger-icon.svg'
            }`}
          className="h-4"
          alt="Cruise"
        />
      </button>
      <Menu
        right
        customBurgerIcon={false}
        customCrossIcon={false}
        isOpen={isOpen}
        width={'auto'}
        onStateChange={({ isOpen }) => {
          setIsOpen(isOpen);
          if (!isOpen) setFocused(true);
          document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        }}
      >
        {isOpen && (
          <div className="bg-white z-40 !p-0">
            <div className="flex justify-between items-center px-8 py-4 border-b border-gray-300 sticky top-0 bg-white z-10">
              <div className='w-[120px]' onClick={() => navigate(`/`)}>
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo-mobile.svg"
                  className="w-full h-full"
                  alt="Cruise"
                />
              </div>
              <button
                tabIndex={0}
                onClick={() => {
                  setIsOpen(false);
                  handleCloseAllNav();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className='overflow-auto' >
              <div className="flex flex-col">
                <a className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300" onClick={handleClickBooking} >
                  <div className='w-[25px] h-[25px]'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/search-rounded_mobile.svg" className="w-full h-full" alt="Blog" />
                  </div>
                  <span className="text-md font-semibold"> Find a Cruise </span>
                </a>
                <a className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300" href="/webCheckIn">
                  <div className='w-[25px] h-[25px]'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/webcheckin-menu-icon.svg" className="w-full h-full" alt="Blog" />
                  </div>
                  <span className="text-md font-semibold">Web Check-in</span>
                </a>
                {user ? (
                  <>
                    <a href="/my-profile" className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300" >
                      <div className='w-[25px] h-[25px]'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/profile-new-menu.svg" className="w-full h-full" alt="Destination" />
                      </div>
                      <span className="text-md font-semibold"> My Profile </span>
                    </a>
                    <a className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300" href="/manage-booking" >
                      <div className='w-[25px] h-[25px]'>
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mybooking-new-icon.svg" className="w-full h-full" alt="Destination" />
                      </div>
                        <span className="text-md font-semibold"> My Bookings </span>
                    </a>
                  </>
                ) : (
                  <a className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300"
                    onClick={() => {
                      setAuthModal(true);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <div className='w-[25px] h-[25px]'>
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mybooking-new-icon.svg" className="w-full h-full" alt="Destination" />
                    </div>
                    <span className="text-md font-semibold"> Login/Register </span>
                  </a>
                )}

                {/* <div>
                  <a className="menu-item flex items-center px-2 py-2" href="/destination" >
                    <div className='w-[40px]'>
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg" className="w-[25px] h-[25px]" alt="Destination" />
                    </div>
                    <span className="text-md font-semibold ml-3">Destinations</span>
                  </a>
                </div> */}

                <div
                  className={`menu-item px-8 py-4 border-b border-gray-300 flex items-center gap-3 relative cursor-pointer`}
                  onClick={() => {
                    setShowCruises(!showCruises);
                    setDestinationNav(false);
                  }}
                >
                  <div className='w-[25px] h-[25px]'>
                    <img className="w-full h-full" src={"https://images.cordeliacruises.com/cordelia_v2/public/assets/findcruise-new-icon.svg"} alt="Profile Icon" />
                  </div>
                  <div className='flex gap-3 justify-between items-center w-full'>
                    <button
                      className={`inline-block rounded-sm font-semibold text-md ${showCruises ? 'text-brand-primary font-bold' : ''}`}
                    >
                      Our Ships
                    </button>
                    <div className={`w-3 h-3 ${showCruises ? "rotate-180" : ""}`}>
                      <img className="w-full h-full" src={"https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg"} />
                    </div>
                  </div>
                </div>
                {showCruises && <div className='font-medium'>
                  <div className='px-8 py-4 border-b border-gray-300' onClick={() => navigate(`/cordelia-sky`)}>
                    <p className='ml-[34px]'>Cordelia Sky</p>
                  </div>
                  <div className='px-8 py-4 border-b border-gray-300' onClick={() => navigate(`/cordelia-sun`)}>
                    <p className='ml-[34px]'>Cordelia Sun</p>
                  </div>
                  <div className='px-8 py-4 border-b border-gray-300' onClick={() => navigate(`/cordelia-empress`)}>
                    <p className='ml-[34px]'>Cordelia Empress</p>
                  </div>
                </div>}

                <div
                  className={`menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300`}
                  onClick={() => {
                    setDestinationNav(!destinationNav);
                    setShowCruises(false);
                    destinationNav === false && setDomesticNav(false);
                    destinationNav === false && setInternationalNav(false);
                  }}
                >
                  <div className="w-[25px] h-[25px]">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Destination_Nav.svg"
                      className="w-full h-full"
                      alt="Destination"
                    />
                  </div>
                  <div className="flex gap-3 justify-between items-center w-full">
                    <button
                      className={`font-semibold ${
                        destinationNav ? 'text-brand-primary font-bold' : ''
                      }`}
                    >
                      Destinations
                    </button>
                    <div
                      className={`w-3 h-3 ${
                        destinationNav ? 'rotate-180' : ''
                      }`}
                    >
                      <img
                        className="w-full h-full"
                        src={
                          'https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg'
                        }
                      />
                    </div>
                  </div>
                </div>
                {destinationNav && (
                  <div className="font-medium">
                    <div className='px-8 py-4 border-b border-gray-300' onClick={() => navigate(`/destination`)}>
                      <p className='ml-[34px]'>All Destinations</p>
                    </div>
                    <div
                      className={`flex justify-between items-center gap-2 px-8 py-4 border-b border-gray-300 ${
                        domesticNav ? 'bg-[#F9F4F9]' : ''
                      }`}
                      onClick={() => {
                        setDomesticNav(!domesticNav);
                        setInternationalNav(false);
                      }}
                    >
                      <div
                        className={`ml-[34px] ${
                          domesticNav ? 'text-brand-primary font-bold' : ''
                        }`}
                      >
                        Domestic
                      </div>
                      <div
                        className={`w-3 h-3 ${domesticNav ? 'rotate-180' : ''}`}
                      >
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    {domesticNav && (
                      <div className="font-medium">
                        {destinationLinks.domestic.map((destination) => (
                          <div
                            key={destination.title}
                            className="flex justify-between gap-2 px-8 py-4 border-b border-gray-300"
                            onClick={() => navigate(`${destination.link}`)}
                          >
                            <div className="ml-[54px]">{destination.title}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div
                      className={`flex justify-between items-center gap-2 px-8 py-4 border-b border-gray-300 ${
                        internationalNav ? 'bg-[#F9F4F9]' : ''
                      }`}
                      onClick={() => {
                        setInternationalNav(!internationalNav);
                        setDomesticNav(false);
                      }}
                    >
                      <div
                        className={`ml-[34px] ${
                          internationalNav ? 'text-brand-primary font-bold' : ''
                        }`}
                      >
                        International
                      </div>
                      <div
                        className={`w-3 h-3 ${
                          internationalNav ? 'rotate-180' : ''
                        }`}
                      >
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Arrow+Black.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    {internationalNav && (
                      <div className="font-medium">
                        {destinationLinks.international.map((destination) => (
                          <div
                            className="flex justify-between gap-2 px-8 py-4 border-b border-gray-300"
                            onClick={() => navigate(`${destination.link}`)}
                          >
                            <div className="ml-[54px]">{destination.title}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* <a className="menu-item flex items-center px-2 py-2" onClick={handleClickWeekend} >
                  <div className='w-[40px]'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-getaway-menu-icon.svg" className="w-[25px] h-[25px]" alt="Blog" />
                  </div>
                  <span className="text-md font-semibold ml-3"> Weekend Getaway </span>
                </a> */}
                <a className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300" href="/promotion" >
                  <div className='w-[25px] h-[25px]'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Offers_Nav.svg" className="w-full h-full" alt="Destination" />
                  </div>
                  <span className="text-md font-semibold">Offers</span>
                </a>
                <a className="menu-item flex items-center gap-3 px-8 py-4 border-b border-gray-300" href="/blog" >
                  <div className='w-[25px] h-[25px]'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Blog.svg" className="w-full h-full" alt="Blogs" />
                  </div>
                  <span className="text-md font-semibold">Blogs</span>
                </a>
                <a className={`menu-item flex items-center gap-3 px-8 py-4 ${user ? 'border-b border-gray-300' : ''}`} href="/?contact" >
                  <div className='w-[25px] h-[25px]'>
                    <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Contact_Nav.svg" className="w-full h-full" alt="Contact" />
                  </div>
                  <span className="text-md font-semibold">Contact</span>
                </a>
                {user ?
                  <a className="menu-item flex items-center gap-3 px-8 py-4" href="javascript:void()" onClick={handleLogOut}>
                    <div className='w-[25px] h-[25px]'>
                      <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/logout-purple-new-icon.svg" className="w-full h-full" alt="Destination" />
                    </div>
                    <span className="text-md font-semibold">Logout</span>
                  </a>
                  : null
                }
              </div>

              <div className="bg-gray-400 rounded p-5 m-4">
                <h1 className="text-xl font-semibold">Cordelia Xperience App</h1>
                <p className="text-xs font-medium text-gray-100 leading-5">
                  Manage your booking or get helpful information and exclusive
                  offers
                </p>
                <a
                  href={appLink}
                // onClick={() => TiggerGAClickEvent({ event: `download_app`, type: "side_menu" })}
                >
                  <img src={appImage} className="mt-2" alt="Mobile App" />
                </a>
              </div>
            </div>

            {/* {user ? <div className="fixed w-full right-0 bottom-0 z-40 lg:hidden shadow-[rgba(0,0,0,0.14)_5px_-2px_5px]"
              onClick={handleLogOut}>
              <a
                className="text-white text-md flex justify-center bg-brand-primary font-semibold px-4 py-3 rounded w-full disabled:bg-brand-primary/40"
              >
                Logout
              </a>
            </div> : null} */}
          </div>
        )}
      </Menu>
    </div>
  );
}
