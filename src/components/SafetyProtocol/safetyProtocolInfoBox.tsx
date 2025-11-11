import React from 'react';

type Props = {
  content: {
    title: string;
    image: string;
    titleClassName?: string;
  };
};

export default function SafetyProtocolInfoBox({
  content: { title = '', image = '', titleClassName = '' }
}: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-8 place-content-center">
      {/* <span className="col-span-3 lg:col-span-2 rounded-full bg-[#8B8B8B] inline-block w-7 h-7"></span> */}
      <img
        src={image}
        alt="safety protocol"
        className="w-full col-span-3 lg:col-span-3"
        loading="lazy"
      />
      <p
        className={`col-span-7 lg:col-span-7 text-xs lg:text-base self-center ${titleClassName}`}
      >
        {title}
      </p>
    </div>
  );
}
