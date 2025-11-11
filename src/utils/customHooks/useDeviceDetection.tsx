import React, { useEffect, useState } from 'react';

const useDeviceDetection = () => {
  const [isSafariOnIOS, setIsSafariOnIOS] = useState(false);

  useEffect(() => {
    const checkDeviceAndBrowser = () => {
      const userAgent = navigator.userAgent;

      // Check for iOS
      const isIOSDevice =
        /iPad|iPhone|iPod/.test(userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

      // Check for Safari (excluding Chrome)
      const isChrome = /Chrome/.test(userAgent);
      const isSafariBrowser = /Safari/.test(userAgent);
      const isSafariOnly = isSafariBrowser && !isChrome;

      setIsSafariOnIOS(isIOSDevice && isSafariOnly);
    };

    checkDeviceAndBrowser();
  }, []);

  return isSafariOnIOS;
};

export default useDeviceDetection;
