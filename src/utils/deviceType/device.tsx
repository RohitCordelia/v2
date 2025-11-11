import {deviceType} from 'react-device-detect';

export const CheckDevice = () => {
  let deviceTypes;

  if (deviceType === 'mobile') {
    deviceTypes = 'mobile';
  } else if (deviceType === 'tablet') {
    deviceTypes = 'tablet';
  } else if (deviceType === 'browser') {
    deviceTypes = 'desktop';
  } else {
    deviceTypes = 'desktop';
  }
  return deviceTypes;
};
