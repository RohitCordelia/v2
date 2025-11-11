import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReactPlayer = React.lazy(() => import("react-player/youtube"));
type Props = {
  data: {
    title: string
    subTitle: string
    vidUrl: string
    vidThumbnail: string
  },
};

export default function Overview({
  data: {
    title = "",
    subTitle = "",
    vidUrl = "",
    vidThumbnail = "",
  },
}: Props) {

  return (
    <div className="text-center relative">
      <div className="container mx-auto px-4 lg:px-32 text-center " >
        <div className='absolute left-0 hidden lg:block'
          style={{
            top: '50%',
            transform: 'translate(0, -50%)'
          }}
        >
          <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/element-01.svg"  alt='Cordelia Cruises' title='Cordelia-Cruises' />
        </div>
        <h1 className='text-2xl lg:text-4xl lg:font-medium px-4 leading-7'>{title}</h1>
        <p className='lg:text-lg text-sm lg:leading-7 mt-2 lg:mt-5 lg:w-[90%] w-full lg:mx-auto'>{subTitle}</p>
        {vidUrl &&
          <div className="grid">
            <div className={`relative lg:mx-auto lg:w-[90%] w-full mt-7`}>
              <div className='aspect-video'>
                <ReactPlayer
                  className=''
                  light={vidThumbnail}
                  url={vidUrl}
                  width='100%'
                  height='100%'
                  playing={true}
                  loop={true}
                  controls={false}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
