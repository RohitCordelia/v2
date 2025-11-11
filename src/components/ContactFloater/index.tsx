import React from "react";
import Button from "../UI/Button";

const ContactFloater = () => {
    const currentUrl = window.location.pathname;
    let page_1 = currentUrl.split('/')[1];
    
    return (
        <div
            className={`${page_1 == 'upcoming-cruises' ? 'hidden' : 'lg:hidden fixed'}  bottom-0 w-full flex items-center gap-2 px-4 py-2 shadow-inner
          bg-white z-[9999]`}
        >
            <Button
                handleClick={() => window.location.href = 'tel:022-68811111'}
                className="w-full rounded-full text-xs !py-2"
                text="Contact Us"
                type="primary"
                leftIcon={
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/call-new-icon.svg"
                        className="h-4"
                        alt="Cruise"
                        title="Cordelia-cruises"
                    />
                }
            />
            <Button
                handleClick={() => window.open('https://wa.me/917738850000', '_blank')}
                className="w-full rounded-full text-xs !py-2"
                text="WhatsApp"
                type="secondary"
                leftIcon={
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp-new-icon.svg"
                        className="drop-shadow-lg"
                        alt="Cruise"
                        title="Cordelia-cruises"
                    />
                }
            />
        </div>
    )
};

export default ContactFloater;
