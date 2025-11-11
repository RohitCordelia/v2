import React, { useEffect, useState } from 'react';

type CountdownProps = {
  targetDate: Date; // pass the end date/time
  className?: string;
  onEnd?: () => void; // optional callback when countdown finishes
};

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate, className, onEnd }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      if (
        updatedTime.days === 0 &&
        updatedTime.hours === 0 &&
        updatedTime.minutes === 0 &&
        updatedTime.seconds === 0
      ) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format with leading zeros
  const format = (num: number) => String(num).padStart(2, '0');

  return (
    <div className={`flex text-lg font-semibold px-5 pt-2 pb-4 lg:p-5 bg-brand-gradient text-white rounded-md text-center w-full lg:w-[40%] ${className}`}>
      <div className="px-2 lg:px-3 basis-1/4 border-r border-gray-400">
        <span className="font-playfairDisplay text-3xl lg:text-4xl mb-1 font-bold w-full block tabular-nums">
          {format(timeLeft.days)}
        </span>
        <span className="text-base lg:text-lg font-bold block">DAYS</span>
      </div>
      <div className="px-2 lg:px-3 basis-1/4 border-r border-gray-400">
        <span className="font-playfairDisplay text-3xl lg:text-4xl mb-1 font-bold w-full block tabular-nums">
          {format(timeLeft.hours)}
        </span>
        <span className="text-base lg:text-lg font-bold block">HRS</span>
      </div>
      <div className="px-2 lg:px-3 basis-1/4 border-r border-gray-400">
        <span className="font-playfairDisplay text-3xl lg:text-4xl mb-1 font-bold w-full block tabular-nums">
          {format(timeLeft.minutes)}
        </span>
        <span className="text-base lg:text-lg font-bold block">MINS</span>
      </div>
      <div className="px32 lg:px-5 basis-1/4">
        <span className="font-playfairDisplay text-3xl lg:text-4xl mb-1 font-bold w-full block tabular-nums">
          {format(timeLeft.seconds)}
        </span>
        <span className="text-base lg:text-lg font-bold block">SECS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
