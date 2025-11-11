// import { GA_KEY } from "../../../src/utils/config";

// export const installGA = (trackingId: string, additionalConfigInfo = {}) => {
//     const scriptId = 'ga-gtag';

//     if (document.getElementById(scriptId)) return;

//     const { head } = document;
//     const script = document.createElement('script');
//     script.id = scriptId;
//     script.type = 'text/javascript';
//     script.async = true;
//     script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
//     head.insertBefore(script, head.firstChild);

//     (window as any).dataLayer = (window as any).dataLayer || [];

//     gtag('js', new Date());
//     gtag('config', trackingId, additionalConfigInfo);
// };

// export const gtag: Gtag.Gtag = function () {
//     // Can't use arrow func + destructuring as Google expects 
//     // arguments objects in dataLayer (not an array of arguments).
//     (window as any).dataLayer.push(arguments);
// };

// export const fbq: any = function () {
//     // Can't use arrow func + destructuring as Google expects 
//     // arguments objects in dataLayer (not an array of arguments).
//     (window as any).dataLayer.push(arguments);
// };

// export const gtag_whatsapp_report_conversion: any = function (url: any) {
//     var callback = function () {
//         if (typeof (url) != 'undefined') {
//             window.location = url;
//         }
//     };
//     gtag('event', 'conversion', {
//         send_to: `${GA_KEY}/pS_ACLWsjMoDEOXMltko`,
//         'event_callback': callback
//     });
//     return false;
// }
