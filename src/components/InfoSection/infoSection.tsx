import React from 'react'
import { InfoCard } from '../UI/Cards'
import "./infoSection.css";
// import { TiggerGAClickEvent } from '../Analytics/events';
const ReactPlayer = React.lazy(() => import("react-player/vimeo"));

type Props = {
  content: any,
  info_section:any
}

export default function InfoSection({ content, info_section }: Props) {


  return (
    <div className='container mx-auto my-14 lg:mb-20'>
      <div className='mx-4 mb-12'>
        <h1 className='text-xl lg:text-3xl font-semibold mb-2'>{info_section.title}</h1>
        <p className='text-xs leading-5 lg:text-base'>{info_section.sub_title}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {content.map((val:any, key:number) => {
          return val.vid_url ? (
            <div className={`m-4 border border-gray-300 relative shadow-lg lg:col-span-3 lg:mx-auto lg:w-2/3`}>
              <div className='player-wrapper'>
                <ReactPlayer
                  className='react-player'
                  light={val.vid_img_url}
                  url={val.vid_url} width='100%' height='100%'
                  playing={true}
                  loop={true}
                  controls={true}
                />
              </div>
            </div>
          ) : (
            <div className={`m-4 border border-gray-300 relative shadow-lg `}>
              <img src={val.img_url} alt={val.img_alt} className="rounded w-full mb-4 lg:h-[300px] lg:object-cover" loading="lazy" />
              <div className='px-6 mb-2 pb-6'>
                <h3 className="text-xl lg:text-2xl mb-3 font-medium">{val.title}</h3>
                <p className="text-xs lg:text-base opacity-[76%] mb-10 leading-5">
                  {val.sub_title}
                </p>
                {/* {val.link &&
                  <a
                    className='text-xs hover:bg-brand-primary hover:text-white absolute bottom-5 lg:text-base font-bold p-2 px-4 lg:px-6 border border-brand-primary text-brand-primary'
                    href={val.link}
                    // onClick={() => { TiggerGAClickEvent({ event: `${val.link}`, type: "info_box" }) }}
                  >
                    Explore More
                  </a>
                } */}
              </div>
            </div>
          )
        }

        )}
        {/* <InfoCard content={content.onboarding_experience} id={'onboarding_experience'} className="lg:col-span-3 lg:mx-auto lg:w-2/3 mt-12" link="" />
        <InfoCard content={content.food_beverages} id={'food_beverages'} className="" link="/food-beverage" />
        <InfoCard content={content.accomodation} id={'accomodation'} className="" link="/accomodation" />
        <InfoCard content={content.destinations} id={'destinations'} className="" link="/destination" />
        <InfoCard content={wedding} id={'wedding'} className="" link="/wedding" />
        <InfoCard content={entertainment} id={'entertainment'} className="" link="/entertainment" />
        <InfoCard content={corporate} id={'corporate'} className="" link="/corporate" /> */}
      </div>
    </div>
  );
}