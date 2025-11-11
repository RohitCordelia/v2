import React, { ReactNode, useState } from 'react';
import { FormatToString } from '/src/utils/formatter/formatter';

type Props = {
  title: string;
  children?: ReactNode;
  openByDefault?: boolean;
  selectedRoom: string;
};

export default function Accordion({ title, children, openByDefault=false,selectedRoom }: Props) {
  
  const [open, setOpen] = useState(openByDefault);
  return (
    <div>
      <div className="mt-5 grid grid-cols-2 gap-4 bg-brand-sky/10 px-2 py-2 lg:px-5 lg:py-4 border border-brand-sky rounded-t" onClick={()=>setOpen(!open)}>
        <h6 className="text-xl font-semibold lg:text-2xl">{title}</h6>
        <img
          src="assets/icons/footer/chevon-down-black.svg"
          alt="arrow"
          className={`self-center justify-self-end mr-2 ${
            open ? '' : '-rotate-90'
          }`}
        />
      </div>
      {open && <div className='border-x border-b border-brand-sky rounded-b'>{children}</div>}
    </div>
  );
}
