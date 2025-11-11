import { useEffect, useState } from "react";
import moment from 'moment';

export const DynamicSort = (property: any) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: any, b: any) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const getTimeFromSec = (sec: number) => {
  const minutes = sec / 60;
  const seconds = sec % 60;
  return `${parseInt(`${minutes}`)} : ${/^\d$/.test(`${seconds}`) ? `0${seconds}` : seconds || '00'
    }`;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomString = (length: number) => {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let newRes = result.split(" ").join("");
  return newRes;
}

export const getSessionTime = () => {
  const startTimeString = sessionStorage.getItem('_st');
  if (!startTimeString) {
    return '00:00';
  }

  const startTime = moment(startTimeString);
  const now = moment();

  const totalSeconds = now.diff(startTime, 'seconds');

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


