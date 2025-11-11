import { generateRandomString } from './algorithms';

export const SERVER_URL = process.env.REACT_APP_API_URL;
export const API_URL = `${SERVER_URL}api/v2/`;
export const CMS_API_URL = `${SERVER_URL}api/cms/`;
export const OTPLESS_API_URL = process.env.REACT_APP_NODE_API_URL;

// export const GA_KEY: string = `${process.env.REACT_APP_GA_KEY}`;

export const TRUECALLER_URL = (requestNonce:string)=>{
  return(`truecallersdk://truesdk/web_verify?type=btmsheet&skipOption=useanothernum&requestNonce=${requestNonce}&partnerKey=${process.env.REACT_APP_TRUECALLER_PARTNER_KEY}&partnerName=${
    process.env.REACT_APP_TRUECALLER_PARTNER_NAME
  }&lang=en&btnShape=rect&ctaColor=%23770071&loginPrefix=proceedwithbooking`)
};

