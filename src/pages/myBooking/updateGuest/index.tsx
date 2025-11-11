import React, { useState, useEffect, Fragment } from 'react';
import { Layout } from '../../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useGetBookingDataMutation } from '../../../../src/services/profile/profile';
import { GetManageDetail } from '../../../utils/store/store';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../myBooking.css"
import Button from '../../../components/UI/Button';

const NextArrow = (props: { className: any; style: any; onClick: any }) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '10px' }}
      onClick={onClick}
    >
      <img
        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/side-arrow-icon-1.svg"
        alt="Next"
        className="h-4"
      />
    </div>
  );
};

const PrevArrow = (props: { className: any; style: any; onClick: any }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      <img
        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/side-arrow-icon-1.svg"
        alt="Previous"
        className="h-4 rotate-180"
      />
    </div>
  );
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: (
    <NextArrow className={undefined} style={undefined} onClick={undefined} />
  ),
  prevArrow: (
    <PrevArrow className={undefined} style={undefined} onClick={undefined} />
  ),
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const UpdateGuest: React.FC = () => {
  const ManageDetail = GetManageDetail();
  const navigate = useNavigate()

  const [getBookingData] = useGetBookingDataMutation();
  const [booking, setBooking] = useState<any>(ManageDetail.getBooking);

  const [loading, setLoading] = useState<any>(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);

  const RoomHeader = () => {
    return (
      <div>
        {booking?.rooms?.length > 4 ? <Slider {...settings}>
          {booking?.rooms?.map((data: any, index: any) => (
            <Fragment key={index}>
              <Button text={`Cabin ${index + 1}`} type={index === selectedRoomIndex ? 'primary' : 'secondary'} handleClick={() => {
                setSelectedRoomIndex(index)
              }} className='!w-max block lg:inline-block' />
            </Fragment>
          ))}
        </Slider> : <>
          {booking?.rooms?.length ? booking?.rooms.map((val: any, i: number) => {
            return (
              <Fragment key={i}>
                <Button text={`Cabin ${i + 1}`} type={i === selectedRoomIndex ? 'primary' : 'secondary'} handleClick={() => {
                  setSelectedRoomIndex(i)
                }} className='mr-1 mb-1' />
              </Fragment>
            )
          }) : null}
        </>}
      </div>
    )
  }

  const GuestContainer = () => {
    let room = booking?.rooms?.[selectedRoomIndex];
    return (
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>
        {room?.guest_details?.map((data: any, index: number) => {
          return (
            <div>
              <div key={index} className={`bg-white shadow-allSide`}>
                <div className="flex justify-between items-center border-b-1 border-gray-300">
                  <p className="p-4 text-lg font-bold"> Guest {index + 1} </p>
                  {
                    !data?.details_added ? (
                      <Button text='Update Detail' size='sm' type='secondary' handleClick={() => {
                        navigate('/manage-booking/update-guest-detail', { state: { roomIndex: selectedRoomIndex, guestIndex: index, booking: booking } })
                      }} className='mr-2' />
                    ) : null
                  }
                </div>
                <div className='px-4 py-4 grid grid-cols-2 gap-x-4'>
                  <p className="p-1 flex items-center font-semibold col-span-2">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Name: {data?.name}
                  </p>
                  <p className="p-1 flex items-center font-semibold col-span-2 lg:col-span-1">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Gender: {data?.gender}
                  </p>
                  <p className="p-1 flex items-center font-semibold col-span-2 lg:col-span-1">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Type: {data?.type}
                  </p>
                  <p className="p-1 flex items-center font-semibold col-span-2 lg:col-span-1">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Mobile: {data?.phone}
                  </p>
                  <p className="p-1 flex items-center font-semibold col-span-2 lg:col-span-1">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Age: {data?.age}
                  </p>
                  <p className="p-1 flex items-center font-semibold col-span-2 lg:col-span-1">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Deck: {room?.ship_room?.deck_no}
                  </p>
                  <p className="p-1 flex items-center font-semibold col-span-2 lg:col-span-1">
                    <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" />
                    Room No: {room?.ship_room?.number}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }


  return (
    <Layout>
      {loading ?
        <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/30 z-50'>
          <img
            className='w-32 lg:w-44'
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
            alt=""
          />
        </div>
        : null
      }
      <div className="mb-36 lg:mt-28 mt-20 px-4 lg:px-40">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
            alt="arrow"
            onClick={() => navigate(-1)}
            className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
          />
          <p className="text-xl font-bold lg:text-xl ">
            Update Guest Detail
          </p>
        </div>

        <div className="container mx-auto mt-8 p-6 border border-gray-300 shadow-allSide updateGuest">
          <RoomHeader />
          <GuestContainer />
        </div>
      </div>
    </Layout>
  );
};

export default UpdateGuest;