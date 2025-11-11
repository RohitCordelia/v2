import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
type Props = {
  title: string;
  content: any;
  info_section: any;
  type?: string;
  visibleCount?: number;
};

export default function Feature({ title, content, info_section, type, visibleCount }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  function truncate(source, size) {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
  }

  return (
    <div className="max-w-6xl mx-auto lg:mb-20">
      <div className="mx-4 lg:py-8 py-4">
        <h1 className="text-[20px] lg:text-[36px] font-semibold mt-4">{title}</h1>
        <p className="text-xs leading-5 lg:text-base">{info_section}</p>
      </div>
      <div className="lg:mx-4 grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
        {content?.slice(0, visibleCount)?.map((val: any, index: number) => (
          <div
            key={index}
            className="flex flex-col m-4 lg:m-0 border border-gray-300 relative shadow-lg rounded"
            style={{
              // height: expandedIndex === index ? 'auto' : '440px',
              overflow: 'hidden',
              transition: 'height 0.3s ease',
            }}
          >
            <Link to={`/blog/${val.slug}`} className='rounded-t h-[235px] lg:h-[245px] overflow-hidden'>
              <img
                src={type === "explore" ? val.image_url : val.image}
                alt={val.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </Link>
            <div className="flex flex-col p-4 ">
              <p className="lg:text-base text-xs text-[#F16F5B] font-open-sans font-medium">
                {val.author}{' '}
                <span className="lg:text-base text-xs text-[#606060] font-open-sans font-light">
                  | {val.publishedDate}
                </span>
              </p>
              <h3 className="lg:text-[22px] text-base font-semibold mt-2 lg:mt-4 font-open-sans leading-8">{val.title}</h3>
              <div
                className="text-[#1E2D25] lg:text-base text-[12px] font-normal  mt-2 lg:mt-4 font-open-sans opacity-[80%] lg:h-[100px] h-[58px]"
                style={{
                  // maxHeight: expandedIndex === index ? '1000px' : '60px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}
              >
                {val.shortDesc}
                {/* {truncate(val.shortDesc, 130)} */}
              </div>
              <div className="lg:mt-[19px] mt-4 lg:mb-[10px]">
                <Link to={`/blog/${val.slug}`}
                  className="text-[#92278F] lg:text-base text-[14px] font-bold inline font-open-sans"
                >
                  Learn more &rarr;
                </Link>
              </div>
              {/* <div className="mt-3">
            <button
              onClick={() => toggleExpand(index)}
              className="text-[#93288E] text-sm font-bold inline font-open-sans"
            >
              {expandedIndex === index ? 'Show less' : 'Learn more'} &rarr;
            </button>
          </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}