export const setUserType = (user: any) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};

export const getUserType = () => {
  const USER = getUser();
  if (USER) {
    return USER.type;
  } else return "none";
};

export const getUser = () => {
  const USER_UNPARSED = window.localStorage.getItem("user");
  if (USER_UNPARSED) {
    return JSON.parse(USER_UNPARSED);
  } else return {};
};

export const saveRefUrl = (user: any) => {
  window.localStorage.setItem("ref", JSON.stringify(user));
};

export const getRefUrl = () => {
  const USER_UNPARSED = window.localStorage.getItem("ref");
  if (USER_UNPARSED) {
    return JSON.parse(USER_UNPARSED);
  } else return {};
};

export const getCurrentUrlWithCampaign = () => {
  const campaignParams = sessionStorage.getItem("campaignParams");

  const currentUrl = new URL(window.location.href);
  const originalParams = new URLSearchParams(currentUrl.search);

  const seenKeys = new Set();
  const cleanedCurrentParams = new URLSearchParams();

  for (const [key, value] of originalParams.entries()) {
    if (!seenKeys.has(key)) {
      cleanedCurrentParams.append(key, value);
      seenKeys.add(key);
    }
  }

  const campaignSeen = new Set();
  const cleanedCampaignParams = new URLSearchParams();

  if (campaignParams) {
    const rawCampaignParams = new URLSearchParams(campaignParams);
    for (const [key, value] of rawCampaignParams.entries()) {
      if (!campaignSeen.has(key)) {
        campaignSeen.add(key);
        cleanedCampaignParams.append(key, value);
      }
    }
  }

  for (const [key, value] of cleanedCampaignParams.entries()) {
    if (!cleanedCurrentParams.has(key)) {
      cleanedCurrentParams.append(key, value);
    }
  }

  const finalUrl = `${currentUrl.origin}${currentUrl.pathname}${cleanedCurrentParams.toString() ? '?'+cleanedCurrentParams.toString() : ''}`;
  return finalUrl;
};

