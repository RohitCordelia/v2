import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UTMPreserver = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const hasUtm = Array.from(searchParams.keys()).some((key) =>
      key.startsWith('utm_') || key === 'campaign'
    );

    if (hasUtm) {
      sessionStorage.setItem('campaignParams', location.search);
    }

    // if (!hasUtm && sessionStorage.getItem('campaignParams')) {
    //   const current = new URLSearchParams(location.search);
    //   ['utm_source', 'utm_medium', 'utm_campaign', 'campaign'].forEach((key) => {
    //     current.delete(key);
    //   });

    //   const cleanedSearch = current.toString();
    //   const newURL = ${location.pathname}${cleanedSearch ? '?' + cleanedSearch : ''};
    //   window.history.replaceState({}, '', newURL);
    // }
  }, [location]);

  return null;
};

export default UTMPreserver;