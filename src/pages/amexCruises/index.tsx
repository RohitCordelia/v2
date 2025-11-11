import React, { Suspense, useEffect, useState } from "react";
import Banner from '../../component/Banner';
import Header from '../../component/Header/index';
import LeadGenForm from "../../components/UI/LeadForm";

const banner = {
  "title": "",
  "images": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-american-express-desktop-banner.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
  ],
  "mobileImages": [
    {
      "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-american-express-desktop-banner.webp",
      "link": "#",
      "altTag": "",
      "type": "image",
      "thumbnail": ""
    },
  ],
};

export default function Amex() {
  
  return (
    <>
      <Header isVideo={true} />
      <main>
      <section>
          <Banner data={banner ? banner : ''} clickable={false} />
          <LeadGenForm page_code="amex"/>
        </section>
        <div className="bg-gray-50 p-2">
          <section className="max-w-5xl mx-auto bg-white p-6 rounded-lg ">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/american-express-logo.svg"
                alt="American Express Logo"
                className="w-24 h-24"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Got an American Express® Card?</h1>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
              Get an unmissable offer on your cruise. <br />
              <span className="text-sm text-gray-600">*T&C Apply. Offers available on other American Express® Cards as well.</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Unleash the power of your American Express® Cards and elevate your cruise experience. Book now and enjoy an exclusive flat credit
              voucher toward your cruise, making your voyage even more rewarding. Don’t miss it!
            </p>

            <h3 className="text-xl font-bold text-black mb-4">Exclusive Cruise Credit Offer</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                American Express® Centurion© Cardmembers: INR 15,000 credit
              </li>
              <li>
                American Express® Platinum Charge Cardmembers: INR 10,000 credit
              </li>
              <li>
                American Express® Platinum Corporate Cardmembers: INR 7,500 credit
              </li>
              <li>
                American Express® Platinum Reserve Cardmembers: INR 5,000 credit
              </li>
            </ul>
            <p className="mt-4 font-semibold">This offer is valid from 9th July 2024 – 9th July 2025 (Inclusive of both days)</p>

            <div className="mt-8">
              <p className="text-2xl font-bold text-black mb-4">Terms & Conditions</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  Cruise credit will be given as vouchers at the time of check-in or adjusted in the total bill amount, applicable on the amount exclusive of taxes.
                </li>
                <li>
                  Cruise credit can be used to avail spa, food, beverage, or any other experience at the cruise.
                </li>
                <li>
                  Minimum two nights' stay required to avail this offer.
                </li>
                <li>
                  Standard blackout dates across properties from 22nd December 2024 – 5th January 2025.
                </li>
                <li>
                The cardmember will not get the credit in multiples of two nights (for e.g. Even if the cardmember books for 4 nights / 6 nights – they will only be able to avail the offer one time)
                </li>
                <li>
                If the credit is not utilized in one stay, the remainder amount will lapse, and it cannot be used for the next stay.   
                </li>
                <li>
                  The offer can be availed multiple times during the offer period.
                </li>
                <li>
                In case, a Cardmember books two rooms for two nights each (i.e. 4 nights) – the offer will be extended on both rooms—the offer is per room for two nights.
                </li>
                <li>
                The offer will be same across all room categories.
                </li>
                <li>
                Allocation of more rooms is subject to availability and/or at the discretion of the Cordelia Cruises
                </li>
                <li>
                This offer is not applicable for bulk/group/conference bookings, rates for which shall be negotiated separately.
                </li>
                <li>
                Third-Party services will be excluded from the offers. Only services extended by Cordelia Cruises will be included.
                </li>
                <li>
                Breakfast will be included in the room stay (at whichever property Breakfast is available as per the standard Cruise policy).
                </li>
                <li>
                Applicable Taxes: Extra taxes are applicable and for accommodation and will vary from state to state.
                </li>
                <li>
                The reservation under the offer will include stay for up to 2 Children (under 12 years) along with 2 adults in the same room. Guest/child above the age of 12 years and till the age of 18 years will be considered as an extra occupant at an additional charge, and extra bed at further additional charge. (This is applicable as per individual Cruise policies). 
                </li>
                <li>
                The card member needs to stay to avail the offer.
                </li>
                <li>
                The offer will also be applicable for Supplementary cardmembers.
                </li>
                <li>
                The offer is valid for bookings and stays until 9th July 2025
                </li>
                <li>
                Card members can raise queries regarding the offer from the day of booking till check-out.
                </li>
                <li>
                Queries shall be reverted to within 24- 48 hours from the time the query is raised. 
                </li>
                <li>
                Modification of booking: Such requests will be accommodated only at the sole discretion of Cordelia Cruises to the extent possible or available and Any amendment to the reservation will be subject to feasibility and availability. Please contact the Cordelia Cruises directly for any such requests
                </li>
                <li>
                Once the reservation is made, Cordelia Cruises’ terms and conditions shall be applicable.
                </li>
                <li>
                The Cardmember can reach out to Cordelia Cruises directly for any other policy.
                </li>
                <li>
                Cancellation Policy: Cordelia Cruises’ standard cancellation policy will be applicable. 
                </li>
                <li>
                Child policy for each Cruise will apply as per the policy of that Cruise
                </li>
                <li>
                Important Documents: Guests must be 18 years or older with photo identification to reserve a room. As a government mandate, guests are expected to present a valid proof of identity at the time of check in
                </li>
                <li>
                This offer cannot be combined with any other offer/promotion or benefit(s) available through any loyalty programme run by Cordelia Cruises
                </li>
                <li>
                The room rates are subject to change without notice.
                </li>
                <li>
                Cruise should have availability. The offer is not a confirmation for any reservation at any participating Cruise.
                </li>
                <li>
                Some Cruise services may be curtailed as per local authority directives. If there are any restrictions, the guests are updated of the same at check-in 
                </li>
                <li>
                The payment must be done on the card on which booking has been completed
                </li>
                <li>
                If you spend are lesser than the Cruise Credit amount offered, the Cruise Credit will be forfeited.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
