import { GetStore, GetContact } from '../../utils/store/store';
// @ts-ignore
// import { PERSONA_KEY_PAIR, THEME_KEY_PAIR } from "/src/constants/userConstants";
// import { gtag } from "../../../src/components/Analytics/index";
// @ts-ignore
// import { LOADED_PAGE_EVENT } from "../../../src/constants/googleAnalyticsConstants"
// import {
//   CLICK_EVENT,
//   PERSONA_EVENT,
//   THEME_EVENT,
//   ITINERARY_EVENT
// } from '../../../src/constants/googleAnalyticsConstants';
// import { GA_KEY } from "../../../src/utils/config";

// export const TiggerGAEvent = (event: string) => {
//   gtag('event', event, { method: 'Google' });
// };

// export const TiggerGAPersona = (event: string) => {
//   gtag('event', `${PERSONA_EVENT}:  ${PERSONA_KEY_PAIR[event]}`, {
//     event_category: PERSONA_KEY_PAIR[event],
//     event_label: PERSONA_KEY_PAIR[event],
//     item_id: event,
//   });
// };

// export const TiggerGATheme = (event: string) => {
//   gtag('event', `${THEME_EVENT}: ${THEME_KEY_PAIR[event]}`, {
//     event_category: THEME_KEY_PAIR[event],
//     event_label: THEME_KEY_PAIR[event],
//     item_id: event,
//   });
// };

// export const TiggerGAClickEvent = ({ event = '', type = '' }: { event: string, type: string }) => {
//   gtag('event', `${CLICK_EVENT}: ${event}`, {
//     event_category: CLICK_EVENT,
//     event_label: event,
//     content_type: type,
//     item_id: event,
//   });
// };

// export const TiggerGAItineraryEvent = ({ event = '', type = '' }: { event: string, type: string }) => {
//   gtag('event', `${ITINERARY_EVENT}: ${event}`, {
//     event_category: CLICK_EVENT,
//     event_label: event,
//     content_type: type,
//     item_id: event,
//   });
// };

// export const TiggerGACheckoutEvent = () => {
//   gtag('event', `${'InitiateCheckout'}`, {
//     event_category: LOADED_PAGE_EVENT,
//   });
// };

// export const TiggerGAPaymentInfoEvent = () => {
//   gtag('event', `${'AddPaymentInfo'}`, {
//     event_category: LOADED_PAGE_EVENT,
//   });
// };

// export const TiggerGAPurchaseEvent = ({
//   value = '',
//   transaction_id = ''
// }: {
//   value: string;
//   transaction_id: string;
// }) => {
//   gtag('event', 'conversion', {
//     send_to: `${GA_KEY}/x18SCPnQ84QYEOXMltko`,
//     value: value,
//     currency: 'INR',
//     transaction_id: transaction_id
//   });
// };

export const TiggerFBViewEvent = () => {
  (window as any).fbq('track', 'ViewContent');
};

export const TiggerFBLeadEvent = ({
  phoneNumber = ''
}: {
  phoneNumber: string;
}) => {
  (window as any).fbq('track', 'Lead', { phone_number: phoneNumber });
};

export const TiggerFBCheckoutEvent = () => {
  (window as any).fbq('track', 'InitiateCheckout');
};

export const TiggerFBPaymentInfoEvent = () => {
  (window as any).fbq('track', 'AddPaymentInfo');
};

export const TiggerFBPurchasetEvent = ({
  value = 0
}: {
  value: number | string;
}) => {
  (window as any).fbq('track', 'Purchase', { value: value, currency: 'INR' });
};

export const TiggerFBContactEvent = () => {
  (window as any).fbq('track', 'Contact');
};

export const TiggerFBLocationEvent = () => {
  (window as any).fbq('track', 'FindLocation');
};
export const TiggerFBAddToCardEvent = () => {
  (window as any).fbq('track', 'AddToCart');
};
export const TiggerFBCompleteRegistrationEvent = () => {
  (window as any).fbq('track', 'CompleteRegistration');
};

export const TiggerGAAddToCartCabin = (GAData: any) => {
  const contact = GetContact();
  (window as any).dataLayer.push({
    event: "add_to_cart",
    ecommerce: GAData,
    enhanced_conversion_data: {
      phone_number: '+91' + contact.phone,
      email: null
    }
  });
};
export const TiggerGAViewItem = (GAData: any) => {
  const contact = GetContact();
  (window as any).dataLayer.push({
    event: "view_item",
    ecommerce: GAData,
    enhanced_conversion_data: {
      phone_number: '+91' + contact.phone,
      email: null
    }
  });
};
export const TiggerGAInitiatePayment = (GAData: any, GAEnhancedData: any) => {
  (window as any).dataLayer.push({
    event: "begin_checkout",
    ecommerce: GAData,
    enhanced_conversion_data: {
      phone_number: '+91' + GAEnhancedData.phone,
      email: GAEnhancedData.email
    }
  });
};
export const TiggerGAConfirmBooking = (GAData: any, data: any) => {
  (window as any).dataLayer.push({
    event: "purchase",
    ecommerce: GAData,
    enhanced_conversion_data: {
      phone_number: '+91' + data.phone,
      email: data.email
    }
  });
};

export const TiggerGAForm = (data: any) => {
  (window as any).dataLayer.push({
    event: "formSubmitted",
    leadsUserData: {
      email: '',
      phone_number: data.phone_number,
      address: {
         first_name: '',
         last_name: '',
         street: '',
         city: '',
         region: '',
         country: '',
        postal_code: '', 
     }
    }
  });
};