import React, { ReactNode, useState } from 'react';

type Props = {
  title: string;
  children?: ReactNode;
  openByDefault?: boolean;
  titleClass: string;
  mainClass?: string;
  leftIcon?: string;
  disable?: boolean;
  text?: string;
  textClass?: string;
};

export default function Accordion({ title, children, openByDefault = false, titleClass, mainClass, leftIcon, disable,text,textClass }: Props) {
  const [open, setOpen] = useState(openByDefault);
  return (
    <div className={`${mainClass}`}>
      <div className="flex items-center justify-between" onClick={() => !disable && setOpen(!open)}>
        <div className='flex items-center'>
          {leftIcon && <img
            src={leftIcon}
            alt="arrow"
            className='mr-2 lg:mr-3 lg:h-6 h-4'
          />
          }
          <div className='flex flex-col gap-2'>
          <p className={`${titleClass}`}>{title}</p>
          <p className={`${textClass}`}>{text}</p>
          </div>
       
        </div>
        <img
          src="/assets/icons/footer/chevon-down-black.svg"
          alt="arrow"
          className={`self-center justify-self-end mr-2 h-2 ${open ? '' : '-rotate-90'
            }`}
        />
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
