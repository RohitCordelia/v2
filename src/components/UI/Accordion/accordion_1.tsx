import React, { ReactNode, useState } from 'react';
import { FormatToString } from '/src/utils/formatter/formatter';

type Props = {
  title: string;
  children?: ReactNode;
  openByDefault?: boolean;
  className?: string;
  contentClassName?: string;
  selectedRoom: any;
};

export default function Accordion({ title, children, openByDefault=false,className='',contentClassName='',selectedRoom }: Props) {
  
  const [open, setOpen] = useState(openByDefault);
  return (
    <div>
      <div className={`mt-5 grid grid-cols-2 gap-4 bg-brand-secondary/5 px-2 py-2 border border-gray-300/50 ${className}`} onClick={()=>setOpen(!open)}>
        <h5 className="text-base lg:text-xl lg:font-semibold place-self-">{title}</h5>
        <img
          src="assets/icons/footer/chevon-down-black.svg"
          alt="arrow"
          className={`self-center justify-self-end mr-2 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      {open && <div className={`border border-gray-300/50 px-2 py-2 ${contentClassName}`}>{children}</div>}
      {selectedRoom && !open && <div className='border border-gray-300/50 px-2 py-2'>
      <div className='flex items-center justify-between'>
        <p className='text-base lg:text-xl font-semibold text-brand-primary'>{selectedRoom.name}</p>
        <p className='text-lg lg:text-xl font-bold'>₹ {FormatToString(selectedRoom.cabin_fare)}</p>
      </div>
      </div>}
    </div>
  );
}
