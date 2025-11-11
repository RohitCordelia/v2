
type FomatterProps = { value: any }
export const Formatter = ({ value }: FomatterProps) => {
  return <span>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>;
};

export const FormatToString = (value: any) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const FormatPrice = (value: any) => {
  return value.toLocaleString('en-IN');
};


export const FormatCardNumber = (value: any) => {
  return value
    .replaceAll('-', '')
    .split(/(\d{4})/)
    .filter((w: string) => w.length > 0)
    .join('-');
};

export const UnFormatCardNumber = (value: any) => {
  return value.replaceAll('-', '');
};

export const ordinal_suffix_of = (i: any) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export const DateFormate = (value: any) : any => {
  return new Date(value).
  toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
  replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
};
export const DateFormator = (value: any) : any => {
  var datearray = value.split("/");

return datearray[1] + '/' + datearray[0] + '/' + datearray[2];
  // return new Date(value).
  // toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
  // replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
};

export const FormatAmount = (value: number = 0) => {
  
  return parseInt(value).toLocaleString('en-IN');
};