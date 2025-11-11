export const SaveStore = (store: any) => {
  // const STORE_UNPARSED = window.localStorage.getItem('store');
  // if (STORE_UNPARSED) {
  //   let combinedStore= {...STORE_UNPARSED,store}
  //   window.localStorage.setItem('store', JSON.stringify(combinedStore));
  // } else {
  //   window.localStorage.setItem('store', JSON.stringify(store));
  // }
  window.localStorage.setItem('store', JSON.stringify(store));

};

export const GetStore = () => {
  const STORE_UNPARSED = window.localStorage.getItem('store');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};

export const SaveAuth = (auth: any) => {
  //   const STORE_UNPARSED = window.localStorage.getItem('store');
  //   if (STORE_UNPARSED) {
  //     let combinedStore= {...STORE_UNPARSED,store}
  //     window.localStorage.setItem('store', JSON.stringify(combinedStore));
  //   } else {
  //     window.localStorage.setItem('store', JSON.stringify(store));
  //   }
  window.localStorage.setItem('auth', JSON.stringify(auth));

};

export const GetAuth = () => {
  const STORE_UNPARSED = window.localStorage.getItem('auth');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};

export const SaveContact = (contact: any) => {
  window.localStorage.setItem('contact', JSON.stringify(contact));
};
export const SavePromo = (promo_code: any) => {
  window.localStorage.setItem('promo_code', JSON.stringify(promo_code));
};
export const GetPromo = () => {
  const STORE_UNPARSED = window.localStorage.getItem('promo_code');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};
export const SaveAppliedPromo = (promo_code: boolean) => {
  window.localStorage.setItem('appliedPromo', promo_code);
};
export const GetAppliedPromo = () => {
  const STORE_UNPARSED = window.localStorage.getItem('appliedPromo');

  if (JSON.parse(STORE_UNPARSED)) {
    return true;
  } else return false;
};

export const GetContact = () => {
  const STORE_UNPARSED = window.localStorage.getItem('contact');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};

export const SaveAnimation = (animation: any) => {
  window.localStorage.setItem('animation', JSON.stringify(animation));
};
export const GetAnimation = () => {
  const STORE_UNPARSED = window.localStorage.getItem('animation');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};

export const SetCookie = (c_name: any, value: any, exdays: any) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
};

export const setCookieSec = (name: any, value: any, seconds: any) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (1 * seconds * 1000));
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const GetCookie = (c_name:any) => {
  var i, x, y, ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == c_name) {
          return y;
      }
  }
}

export const SaveAB = (auth: any) => {
  window.localStorage.setItem('ab', JSON.stringify(auth));
};

export const GetAB = () => {
  const STORE_UNPARSED = window.localStorage.getItem('ab');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return null;
};

export const SaveManageDetail = (store: any) => {
  window.localStorage.setItem('manageBooking', JSON.stringify(store));

};

export const GetManageDetail = () => {
  const STORE_UNPARSED = window.localStorage.getItem('manageBooking');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};
export const SaveEnquiry = (store: any) => {
  window.localStorage.setItem('agentEnquiry', JSON.stringify(store));

};

export const GetEnquiry = () => {
  const STORE_UNPARSED = window.localStorage.getItem('agentEnquiry');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};

export const SaveGamified = (promo_code: any) => {
  window.localStorage.setItem('Gamified', JSON.stringify(promo_code));
};

export const GetGamified = () => {
  const STORE_UNPARSED = window.localStorage.getItem('Gamified');
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return {};
};

export const SetLocalStorage = (name: any, value:any) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

export const GetLocalStorage = (name:any) => {
  const STORE_UNPARSED = window.localStorage.getItem(name);
  if (STORE_UNPARSED) {
    return JSON.parse(STORE_UNPARSED);
  } else return null;
};