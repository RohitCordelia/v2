/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type Props = {};

export default function Header({ }: any) {
    const [top, setTop] = useState(true);

    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

    const navigate = useNavigate();

    return (
        <div>
            <header className={`${!top && ""} fixed bg-white w-full z-30 py-2 lg:py-3 top-0 shadow-lg transition duration-300 ease-in-out`}>
                <nav className="w-full py-1">
                    <div className="px-4 lg:px-28 mx-auto grid grid-cols-6">
                        <div className="col-span-4 lg:col-span-2 flex items-center justify-between py-1 md:block">
                            <div className="flex items-center">
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/clubmXcordelia-logo-dec-new.svg"
                                    className=""
                                    alt="Cruise"
                                />
                                {/* <img
                                    className="h-3 lg:h-4 px-3"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/x-icon.svg"
                                    alt="x Logo" />
                                <img
                                    className="h-10 lg:h-10"
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/club-mahindra-logo.svg"
                                    alt="clubmahindra Logo" /> */}
                            </div>
                        </div>
                        {/* <div className="col-span-2 lg:col-span-5 flex items-center justify-end">
                            <button
                                disabled={clubMChecked}
                                className={`text-white font-bold py-2 hidden lg:block px-4 ${!clubMChecked ? 'main-btn' : 'main-btn-disable'}`}
                                onClick={() => onSubmit()}
                            >
                                Enquire Now
                            </button>
                        </div> */}
                    </div>
                </nav>
            </header>
        </div>
    )
}
