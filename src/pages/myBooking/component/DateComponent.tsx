import React from 'react';

const monthMap: any = {
  Jan: 'Jan',
  Feb: 'Feb',
  Mar: 'Mar',
  Apr: 'Apr',
  May: 'May',
  Jun: 'Jun',
  Jul: 'Jul',
  Aug: 'Aug',
  Sep: 'Sep',
  Oct: 'Oct',
  Nov: 'Nov',
  Dec: 'Dec'
};

const monthMapByNumber: any = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

interface DateComponentProps {
  dateRange: string;
  type: "cruise" | "itinerary";
}

const DateComponent: React.FC<DateComponentProps> = ({ dateRange, type = "cruise" }) => {
  const [start, end] = dateRange.split(' - ');
  const [startDay, startMonth, startYear] = start.split('/');
  const [endDay, endMonth, endYear] = end.split('/');

  const startMonthFormatted = type === "cruise" ? monthMap[startMonth] : monthMapByNumber[startMonth];
  const endMonthFormatted = type === "cruise" ? monthMap[endMonth] : monthMapByNumber[endMonth];

  return (
    <div className="bg-brand-yellow flex flex-wrap text-sm font-semibold justify-center text-center lg:px-2 py-1 lg:py-[8px] rounded-md items-center gap-1 lg:gap-2 w-24 lg:w-28 ml-3 lg:ml-0">
      <div className="flex-col lg:leading-[17px] justify-center">
        <p>{startMonthFormatted}</p>
        <p className="font-bold">{startDay}</p>
      </div>
      <img
        className="lg:h-[7px]"
        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/itinerary-arrow-icon.svg"
        alt="backIcon"
      />
      <div className="flex-col lg:leading-[17px] justify-center">
        <p>{endMonthFormatted}</p>
        <p className="font-bold">{endDay}</p>
      </div>
    </div>
  );
};

export default DateComponent;
