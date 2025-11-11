import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../components/UI/ModalCenter";
type Props = {
  isVideo: boolean,
};

export default function Header({ isVideo }: Props) {
  let navigate = useNavigate()

  const [top, setTop] = useState(true);
  const [headerModal, setHeaderModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [focused, setFocused] = React.useState(false);
  const [headerDark, setHeaderDark] = React.useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const listenScrollEvent = (event: any) => {
    if (window.scrollY < 101) {
      return setHeaderDark(true)
    } else if (window.scrollY > 100) {
      return setHeaderDark(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const logoClicked = () => {
    if(window.location.pathname == '/weekend'){
      navigate('/')
    }else{
      setHeaderModal(true)
    }
  }
  return (
    <div>
      <header
        className={`
          ${!top && ""}
          ${isVideo && headerDark ? "bg-opacity-0" : "bg-white shadow-md"}
          fixed w-full z-30 py-2 top-0 transition duration-300 ease-in-out`}
      >
        <nav className="w-full">
          <div className="px-4 lg:px-28 mx-auto grid grid-cols-6">
            <div className="col-span-2 lg:col-span-1 flex items-center justify-between py-1 md:block">
              {isVideo && headerDark ?
                <img
                  onClick={() => logoClicked()}
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-white-logo.svg"
                  className="block cursor-pointer"
                  alt="Cruise"
                />
                :
                <img
                  onClick={() => logoClicked()}
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo.svg"
                  className="block cursor-pointer"
                  alt="Cruise"
                />
              }
              {/* <div>
                <a href="/">
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo-mobile.svg"
                    className="lg:hidden"
                    alt="Cruise"
                  />
                </a>
              </div> */}
            </div>

          </div>
        </nav>
      </header>

      <Modal show={headerModal} align={'center'} className="w-full lg:w-3/4 relative h-full lg:h-3/4" onClose={() => setHeaderModal(false)}>
        <div className=' w-full h-full bg-white'>
          <div
            className='absolute right-5 top-3 cursor-pointer'
            onClick={() => setHeaderModal(false)}
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
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
            <div className="h-full hidden lg:block">
              <img className="h-full w-full" src="https://images.cordeliacruises.com/cordelia_v2/public/images/weekend-exit-intent-new.webp" alt="" />
            </div>
            <div className="flex flex-col items-center pt-16">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-logo-icon.svg"
                className="w-[80px] cursor-pointer"
                alt="Cruise"
              />
              <p className="text-[1.3rem] font-normal mt-5">Still looking for a weekend cruise?</p>
              <div className="mt-20 w-full px-10">
                <div className="w-full flex justify-between cursor-pointer" onClick={() => navigate(-1)}>
                  <p>Back to previous page</p>
                  <img className="-rotate-90" src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                </div>
                <div className="border-b my-4" />
                <div className="w-full flex justify-between cursor-pointer" onClick={() => navigate('/weekend')}>
                  <p>Back to homepage</p>
                  <img className="-rotate-90" src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
