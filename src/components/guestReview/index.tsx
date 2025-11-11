import React, { useState } from 'react';
import Modal from '../UI/Modal';
import { useGetHomePageOfferQuery } from '../../services/itinerary/itinerary'
import { useNavigate } from 'react-router-dom';

const ReactPlayer = React.lazy(() => import("react-player/vimeo"));
type Props = {
    data: {
        guestReaction: any,
        guestReactionTitle: any
    },
    template: any
};

export default function Banner({
    data: {
        guestReaction = "",
        guestReactionTitle = ""
    },
    template = ""
}: Props) {

    const { data: promotionData, isSuccess } = useGetHomePageOfferQuery();
    let navigate = useNavigate()
    const [videoPlay, setVideoPlay] = useState<any>(null);
    return (
        <>
            {guestReactionTitle && guestReaction.length ?
                <div className="">
                    <div className="container mx-auto lg:my-7 my-6 px-4 ">
                        <h1 className='text-2xl lg:text-4xl font-semibold'>{guestReactionTitle}</h1>

                        <div className='grid grid-cols-5 gap-2 lg:mt-10 mt-6'>
                            {guestReaction.map((val, i) =>
                                <div onClick={() => setVideoPlay(val.video)} className="cursor-pointer">
                                    <img src={val.img} alt="" />
                                </div>
                            )}
                        </div>
                        {template === 1 ?
                            <div className='grid grid-cols-1 py-7 pb-10'>
                                <p className='lg:text-2xl text-lg font-semibold'>
                                    Board Ship at
                                    <span className='text-brand-primary cursor-pointer' onClick={() => navigate(`/upcoming-cruises?port=mumbai`)}> Mumbai,</span>
                                    <span className='text-brand-primary cursor-pointer' onClick={() => navigate(`/upcoming-cruises?port=kochi`)}> Kochi,</span>
                                    <span className='text-brand-primary cursor-pointer' onClick={() => navigate(`/upcoming-cruises?port=goa`)}> Goa </span>
                                    and
                                    <span className='text-brand-primary cursor-pointer' onClick={() => navigate(`/upcoming-cruises?port=chennai`)}> Chennai</span>
                                </p>
                            </div>
                            : null
                        }
                        <div className='border-t-2 border-gray-300' />
                    </div>
                </div>
                : null
            }
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
        </>
    );
}
