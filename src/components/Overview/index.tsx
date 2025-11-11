import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReactPlayer = React.lazy(() => import("react-player/youtube"));
type Props = {
  banners: any,
  mobileBanners: any,
  data: {
    title: string
    subTitle: string
    vidUrl: string
    vidThumbnail: string
  },
  event: any
};

export default function Overview({
  banners,
  mobileBanners,
  data: {
    title = "",
    subTitle = "",
    vidUrl = "",
    vidThumbnail = "",
  },
  event
}: Props) {
  let navigate = useNavigate()

  const currentUrl = window.location.pathname;
  return (
    <div className="lg:mt-12 text-center">
      <div className="container mx-auto lg:my-10 my-6 px-4 lg:px-36 text-center">
        <h1 className='text-2xl lg:text-4xl font-semibold'>{title}</h1>
        <p className='lg:text-lg text-sm font-normal lg:leading-7 mt-6' dangerouslySetInnerHTML={{ __html: subTitle }} />
        {/* {currentUrl === '/srilanka' ?
          <p className='font-semibold mt-2'>For more information and hassle-free travel, <a href="/faqs?destination=international" className='text-brand-primary'> CLICK HERE</a></p>
          : null
        } */}
        {vidUrl &&
          <div className="grid">
            <div className={`m-4 relative lg:mx-auto lg:w-[80%] mt-10`}>
              <div className='player-wrapper'>
                <ReactPlayer
                  config={{ youtube: { playerVars: { disablekb: 1 } } }}
                  className='react-player'
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
