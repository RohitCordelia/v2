import React from "react";
import "./ContactFloater.css";
import { TiggerFBContactEvent } from '../../../src/components/Analytics/events';
// import { gtag_whatsapp_report_conversion } from '../../../src/components/Analytics/index';

const ContactFloater = () => {
  const currentUrl = window.location.pathname;
  let page_1 = currentUrl.split('/')[1];
  let page_2 = currentUrl.split('/')[2];
  return (
    <div className="relative">
      {page_1 == 'christmas-cruise' && <div className="fixed bottom-[95px] right-[5px] w-[70px] z-[99999] rotate-12">
        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/Christmas_hat_new.webp" alt="santaCap" className="w-full h-full object-cover" />
      </div>}
      <div
        className={` 
          ${page_1 == 'weekend' || page_1 == '/payment-summary' || page_1 == 'cabin' || page_1 == 'guest-detail' || page_1 == 'payment-summary' || page_1 == 'upcoming-cruises' || page_1 == 'southeast-asia-cruises' || page_1 == 'maldives-cruises' ? 'hidden' : ''}
          ${page_2 == 'booking-details' ? 'bottom-24' : 'bottom-5'}
          ${page_1 == 'manage-booking' || page_1 == 'upgrade-cabin' ? 'hidden' : '' && page_2 == 'assignCabin' ? 'hidden' : ''}
          floater bg-white flex flex-col justify-between fixed h-auto max-w-full py-3 px-2 text-2xl leading-none  border-4 border-white rounded-t-full rounded-b-full items-center z-[9999]`}
      >
        <a
          href="tel:022-68811111"
          onClick={() => {
            // let url = `tel:022-68811111`
            // TiggerFBContactEvent()
            return false;
          }}
          className="cursor-pointer mb-3" aria-label="Phone" rel="noreferrer">
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/phone.svg"
            className="h-7"
            alt="Cruise"
            title="Cordelia-cruises"
          />
        </a>

        <a
          href="https://wa.me/917738850000"
          onClick={() => {
            // let url = `https://wa.me/917738850000`
            // gtag_whatsapp_report_conversion(url)
            // TiggerFBContactEvent()
            return false;
          }}
          className="cursor-pointer"
          target="_blank"
          aria-label="Whatsapp"
          rel="noreferrer"
        >
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/whatsapp-icon.svg"
            className="h-8"
            alt="Cruise"
            title='Chat-with-us'
          />
        </a>
      </div>
    </div>
  )
};

export default ContactFloater;
