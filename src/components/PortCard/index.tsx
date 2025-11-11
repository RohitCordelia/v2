import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

type Props = {
  data: {
    title: string
    subTitle: string
    ports: any
  },
  destination: string,
  shoreExTitle: string
};

export default function Banner({
  data: {
    title = "",
    subTitle = "",
    ports = ""
  },
  destination = "",
  shoreExTitle = "",
}: Props) {
  let navigate = useNavigate()


  return (
    <div className='container mx-auto lg:mb-10 mb-6 px-4 lg:px-0'>
      <div className='border-t-2 border-gray-300 mb-10' />
      <div className='mx-4 mb-12'>
        <h1 className='text-xl lg:text-3xl font-semibold mb-2'>{title}</h1>
        <p className='font-medium text-sm lg:text-lg'>{subTitle}</p>
      </div>
      {ports.map((val: any, key: any) =>
        <div className="grid grid-cols-1 mb-2 rounded-lg border border-gray-300/40 shadow-md" key={key}>
          <div className="grid lg:grid-cols-3 grid-cols-1">
            <Glider
              hasArrows
              hasDots
              scrollLock
              slidesToShow={1}
            >
              {window.innerWidth < 640 ? val.mobileImage.map((val: any) =>
                <div>
                  <img className='w-full' src={val} />
                </div>
              ) : val.desktopImage.map((val: any) =>
                <div>
                  <img className='w-full' src={val} />
                </div>
              )}
            </Glider>
            <div className='col-span-2 lg:px-8 lg:py-10 px-4 py-4'>
              <h1 className='text-xl lg:text-3xl font-semibold'>{val.name}</h1>
              <p className='mt-3 lg:leading-8 pb-5 leading-7 font-medium text-sm lg:text-lg'>{val.subTitle}</p>
              {val.shoreEx && val.shoreEx.length ?
                <div>
                  <div className='border-t-2 border-gray-300' />
                  <h1 className='text-xl lg:text-3xl font-semibold mt-4'>{shoreExTitle ? shoreExTitle : 'Shore Excursions'}</h1>
                  <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4'>
                    {
                      val.shoreEx && val.shoreEx.map((val: any) =>
                        // <div className='flex items-start'>
                        //   <img src={val.iconUrl} alt="" className='lg:h-5 h-4 mr-2 mt-1' />
                        //   <p className='font-medium text-sm lg:text-base'>{val.name}</p>
                        // </div>
                        <div className='flex items-center'>
                          <div className='w-[5%]'>
                            <img className='w-full' src={val.iconUrl} />
                          </div>
                          <p className='w-[95%] text-sm lg:text-base font-semibold ml-2 lg:ml-3'>{val.name}</p>
                        </div>
                      )
                    }
                  </div>
                </div>
                : <div className='mt-64'></div>}
              <div className='mt-14 pb-4'>
                <a href={`/upcoming-cruises?port=${destination ? destination : val.name}`}
                  className='lg:text-lg text-base text-white font-bold bg-brand-primary py-4 px-20 lg:px-16 rounded'>Find a Cruise</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
