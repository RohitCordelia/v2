import React, { Children, ReactNode, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../services/cms/cmsSlice';
type Props = {
    children?: ReactNode;
};

const Layout = ({
    children
}: Props) => {
    const dispatch = useDispatch();
    const AdminAuth = useSelector((state: any) => state.CMSAuth);
    let navigate = useNavigate()

    const [open, setOpen] = useState(true);
    const Menus = [
        {
            title: "Homepage",
            src: "https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-getaway-menu-icon.svg",
            link: "/cms/homepage"
        },
        {
            title: "Coupon",
            src: "https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-getaway-menu-icon.svg",
            link: "/cms/coupon"
        },
    ];

    useEffect(() => {
        if (AdminAuth.token == '') {
            navigate('/cms/login')
        }
    }, [])

    const onLogout = () => {
        dispatch(logout());
        navigate('/cms/login')
    }

    return (
        <div className="flex min-h-screen">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-brand-purple p-5  pt-8 relative duration-300`}
            >
                <div className='bg-white absolute rounded-full -right-3 top-9 w-8 border-2 border-b-brand-purple h-8 p-1 flex'>
                    <img
                        src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg"
                        className={`cursor-pointer ${!open ? "rotate-90" : "rotate-[270deg]"}`}
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="flex gap-x-4 items-center">
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-white-logo.svg"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                </div>
                <div>
                    <ul className="pt-6">
                        {Menus.map((menu, index) => (
                            <li
                                onClick={() => navigate(menu.link)}
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${index === 0 && "bg-light-white"} `}
                            >
                                <img src={`${menu.src}`} />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <ul className="pt-6">
                        <li
                            onClick={() => onLogout()}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 `}
                        >
                            <img src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/weekend-getaway-menu-icon.svg`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 m-7">
                {children}
            </div>
        </div>
    )
};

export default Layout;
