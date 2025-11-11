import React from 'react'
// import { TiggerGAClickEvent } from '../../../../src/components/Analytics/events';
import { PrimaryButton } from '../Buttons';
// @ts-ignore
// import { TiggerGAClickEvent } from "/src/components/GoogleAnalytics/events";
// @ts-ignore
import { CLICK_EVENT } from "/src/constants/googleAnalyticsConstants"
// import ReactPlayer from 'react-player/youtube'
const ReactPlayer = React.lazy(() => import("react-player/vimeo"));

type Props = {
  content: {
    title: string;
    sub_title: string;
    img_url: string;
    img_alt: string;
    vid_url: string;
    vid_img_url: string;
  };
  className: string
  id: string;
  link: string;
};

export default function InfoCard({
  content: { title = '', sub_title = '', img_url, img_alt, vid_url, vid_img_url },
  id = '', className = '', link = ''
}: Props) {
  return (
    <div className={`m-4 border border-gray-300 relative shadow-lg ${className}`}>
      {vid_url ? (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            light={vid_img_url}
            url={vid_url} width='100%' height='100%'
            playing={true}
            loop={true}
            controls={true}
          />
        </div>
      ) : (
        <div>
          <img src={img_url} alt={img_alt} className="rounded w-full mb-4 lg:h-[300px] lg:object-cover" loading="lazy" />
          <div className='px-6 mb-2 pb-6'>
            <h3 className="text-xl lg:text-2xl mb-3 font-medium">{title}</h3>
            <p className="text-xs lg:text-base opacity-[76%] mb-10 leading-5">
              {sub_title}
            </p>
            {link &&
              <a
                className='text-xs hover:bg-brand-primary hover:text-white absolute bottom-5 lg:text-base font-bold p-2 px-4 lg:px-6 border border-brand-primary text-brand-primary'
                href={link}
                // onClick={() => { TiggerGAClickEvent({ event: `${id}`, type: "info_box" }) }}
              >
                Explore More
              </a>
            }
          </div>
        </div>
      )}
    </div>
  );
}
