import React, { ReactNode, useState } from 'react';

type Props = {
  title: string;
  children?: ReactNode;
  openByDefault?: boolean
};

export default function Accordion({ title, children, openByDefault=false }: Props) {
  const [open, setOpen] = useState(openByDefault);
  return (
    <div>
      <div className="my-5 grid grid-cols-2 gap-4" onClick={()=>setOpen(!open)}>
        <h6 className="text-base lg:text-xl lg:font-semibold place-self-">{title}</h6>
        <img
          // src="assets/icons/footer/chevon-down.svg"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/right-arrow.svg"
          alt="arrow"
          title='Cordelia-cruises'
          className={`self-center justify-self-end mr-2 w-2 ${
            open ? 'rotate-[270deg]' : 'rotate-90'
          }`}
        />
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
