import React, { useState, useEffect } from "react";
type Props = {
  isVideo: boolean,
};

export default function Header({ isVideo }: Props) {

  const [top, setTop] = useState(true);
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
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-white-logo.svg"
                  className="block"
                  alt="Cruise"
                />
                :
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo.svg"
                  className="block"
                  alt="Cruise"
                />
              }
            </div>

          </div>
        </nav>
      </header>
    </div>
  )
}
