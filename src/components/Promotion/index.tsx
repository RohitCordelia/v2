import React, { useState } from 'react';
import Modal from '../UI/Modal';
import { useGetHomePageOfferQuery } from '../../services/itinerary/itinerary'
import { useNavigate } from 'react-router-dom';

const ReactPlayer = React.lazy(() => import("react-player/vimeo"));

type Props = {
  destination : any
}

export default function Promotion({ destination }: Props) {
  const { data: promotionData, isSuccess } = useGetHomePageOfferQuery();
  let navigate = useNavigate()
  const [videoPlay, setVideoPlay] = useState<any>(null);
  console.log('roh destination', destination);
  
  return (
    <>
      <div className="">
        <div className="container mx-auto lg:mb-10 mb-6 px-4 lg:px-0">
          <div className='grid grid-cols-1'>
            <h1 className='text-2xl lg:text-4xl font-semibold'>
              Book now to avail the offer
            </h1>
          </div>
          <div className='grid lg:grid-cols-2 grid-cols-1 py-5 gap-5 pt-10'>
            <div className='border-2 rounded border-brand-sky bg-brand-sky/5 py-4 px-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <p className='lg:text-xl text-sm font-bold text-brand-sky'>KIDS SAIL FREE*</p>
                  <img className='lg:h-6 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" alt="CordeliaCruise" title="Offers-On-Cordelia-Cruises"/>
                </div>
                <p className='lg:text-xl text-xs font-bold text-brand-primary cursor-pointer' onClick={() => navigate('/upcoming-cruises')}>Find Cruise {'>'}</p>
              </div>
            </div>
            {destination == 'dubai' ? 
            <div className='border-2 rounded border-brand-sky bg-brand-sky/5 py-4 px-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <p className='lg:text-xl text-sm font-bold text-brand-sky'>BOGO Offer*</p>
                  <img className='lg:h-6 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" alt="CordeliaCruise" title="Offers-On-Cordelia-Cruises"/>
                </div>
                <p className='lg:text-xl text-xs font-bold text-brand-primary cursor-pointer' onClick={() => navigate('/upcoming-cruises?destinationPorts=dubai')}>Find Cruise {'>'}</p>
              </div>
            </div>
              : null}
            {/* {promotionData && promotionData.data && promotionData.data.offers ?
              promotionData.data.offers.map((val, i) =>
                <div className='border-2 rounded border-brand-sky bg-brand-sky/5 py-4 px-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <p className='lg:text-xl text-sm font-bold text-brand-sky'>{val.name}</p>
                      <img className='lg:h-6 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-icon.svg" />
                    </div>
                    <p className='lg:text-xl text-xs font-bold text-brand-primary cursor-pointer' onClick={() => navigate('/upcoming-cruises')}>Find Cruise {'>'}</p>
                  </div>
                </div>
              )
              : null
            } */}
          </div>
        </div>
        <div className='border-t-2 border-gray-300' />

        <Modal show={videoPlay} align={'center'} className="w-full p-5 h-full" onClose={() => setVideoPlay(null)}>
          <div className='relative w-full h-full'>
            <ReactPlayer
              className='react-player'
              // light={vid_img_url}
              url={videoPlay} width='100%' height='100%'
              playing={true}
              loop={true}
              controls={true}
            />
            <p className='text-white text-2xl font-bold absolute right-0 top-0 cursor-pointer'
              onClick={() => setVideoPlay(null)}> X </p>
          </div>
        </Modal>
      </div>
    </>
  );
}
