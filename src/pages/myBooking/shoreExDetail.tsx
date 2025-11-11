
import Select from 'react-select';
import { Layout } from '../../components/Layout';
import Banner from './component/banner';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import Slider from 'react-slick';
import './myBooking.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/side-arrow-icon-2.svg"
          alt="Previous"
          className="h-4"
        />
      </div>
    );
  };
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: (
      <NextArrow className={undefined} style={undefined} onClick={undefined} />
    ),
    prevArrow: (
      <PrevArrow className={undefined} style={undefined} onClick={undefined} />
    )
  };

export default function ShoreExDetail() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [Inclusive, setInclusive] = useState(false)

    const [type, setType] = useState(false);
    const navigate = useNavigate()
    let location = useLocation();
    const { data } = location.state || {}
     const bookingData: any = JSON.parse(localStorage.getItem('getBooking'));

    const [loading, setLoading] = useState<any>(false);

    const items = data?.inclusions.flatMap((text: any) => text.split(',').map((item: any) => item.trim()));
    console.log(bookingData)

    const InclusiveDetail = () => {
        if (Inclusive) {
          let x = data.terms[0].split('_');
          return x.map((v: any, i: any) =>
            <div className='flex mb-2'>
              <img className='mr-2 h-4 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
              <p className='text-sm font-semibold'>{v}</p>
            </div>
          )
        }
      }
    return (
        <Layout>
            {loading ?
                <div className='h-screen w-full flex justify-center items-center overflow-hidden absolute top-0 bottom-0 left-0 bg-black/80 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div> : null}
            <section className="lg:mb-28">
                <div className=" lg:mt-[76px] mt-14 flex flex-wrap justify-center h-30 inline-block">
                    {window.innerWidth > 640 ? <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/shore-ex-booking-detail-desktop.webp"
                        alt="img"
                        className=""
                    /> : <img
                        className=''
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/shore-ex-booking-detail-mobile.webp"
                        alt=""
                    />}

                </div>
                <div className="grid lg:px-44 px-3 mt-6 gap-4 grid-cols-12 ">
                    <div className="col-span-12 shadow-allSide lg:col-span-7 rounded-md">
                        <div className='p-5'>
                            <div>
                                <p className='text-xl font-bold ' >{data?.title}</p>
                            </div>
                            <div className=' border-b-2 border-gray-400 lg:pb-7 flex flex-wrap lg:gap-10 gap-4 py-4' >
                                <div className='flex flex-wrap gap-2' >
                                    <img className='h-[22px]' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/location-icon.svg' />
                                    <p className='text-md font-semibold'>{data?.port_details?.port_name}</p>
                                </div>
                                <div className='flex flex-wrap gap-2' >
                                    <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-icon.svg' />
                                    <p className='text-md font-semibold' >{data?.date}</p>
                                </div>
                                <div className='flex flex-wrap gap-2' >
                                    <img className='h-[22px]' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg' />
                                    <p className='text-md font-semibold' >9:00 AM</p>
                                </div>
                            </div>
                            <div className='py-6 ' >
                                <p>{data?.description}
                                </p>
                            </div>
                            <div className='py-4 mx-4 flex gap-3 ' >
                                <ul className="list-disc relative">
                                    {items.slice(0, 1).map((item: any, index: any) => (
                                        <li key={index} className="relative">
                                            {item} {!isExpanded ? <>...<span onClick={() => setIsExpanded(!isExpanded)}
                                                className="text-brand-primary ml-2  font-semibold cursor-pointer">{isExpanded ? 'View Less' : 'View More'}</span></> : null}

                                        </li>
                                    ))}
                                    {isExpanded && items.slice(1).map((item: any, index: any) => {
                                        console.log(index == items.length - 2)

                                        console.log(items.length - 1)
                                        console.log(index)
                                        return (
                                            <li key={index + 1} className="relative">
                                                {item}{isExpanded && index == items.length - 2 ? <>...<span onClick={() => setIsExpanded(!isExpanded)}
                                                    className="text-brand-primary ml-2  font-semibold cursor-pointer">{isExpanded ? 'View Less' : 'View More'}</span></> : null}

                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            <div className='flex flex-wrap gap-2' >
                                <img className='h-[19px]' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/child-not-allowed-icon.svg' />
                                <p className='text-md font-semibold ' >{'Child below 12 yrs is not allowed'}</p>
                            </div>
                            <div className='mt-3 flex'>
                                <p className='font-semibold cursor-pointer text-brand-primary underline text-xs lg:text-sm' onClick={() => setInclusive(!Inclusive)}
                                >Tour Instructions</p>
                                <img className='w-4 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                              </div>
                        </div>
                    </div>
                    <div className="col-span-12 shadow-allSide lg:col-span-5 rounded-md mt-4 lg:mt-0">
                        <div className='p-4' >
                            <p className='text-lg font-bold'>Selected Guests</p>
                        </div>
                        <div>
                            {data?.guests?.map((guest: any, index: number) => (
                                <div
                                    key={index}
                                    className={`flex w-full px-6 py-3 justify-between flex-wrap ${[0, 3, 4, 7, 8].includes(index) ? 'bg-gray-400' : ''
                                        }`}
                                >
                                    <div className="flex text-sm font-semibold flex-col gap-2">
                                        <p className="text-gray-100"> {guest.type.charAt(0) + guest.type.slice(1).toLowerCase()} </p>
                                        <p> {guest?.guests.name}</p>
                                    </div>
                                    <div className="flex text-sm font-semibold flex-col gap-2">
                                        <p className="text-gray-100">Gender </p>
                                        <p> {guest.guests?.gender} </p>
                                    </div>
                                    <div className="flex text-sm font-semibold flex-col gap-2">
                                        <p className="text-gray-100">Age </p>
                                        <p> {guest?.guests?.age} </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='lg:px-44 px-3' >
                <div className="py-6 ">
                  <p className="text-xl font-bold ">Booked Shore Excursions</p>
                </div>
                <div className="pb-12">
                  {bookingData?.rooms[0]?.guest_details[0]?.booked_excursions.map((data: any) => (
                    <button
                      onClick={() => setType(data?.port_details?.port_name)}
                      className={` lg:text-lg min-w-[100px] text-xs font-semibold py-2.5 lg:py-2 px-6 lg:px-5 rounded ${type == data?.port_details?.port_name
                          ? 'text-white bg-brand-primary'
                          : 'text-gray-100 bg-gray-300'
                        } mr-4`}
                    >
                      {data?.port_details?.port_name}
                    </button>


                  ))}   </div>
                    <div className="shore-ex">
                  <Slider {...settings}>
                    {/* {desArray.map((val: any, i: any) => {
                        return ( */}
                    {bookingData?.rooms[0]?.guest_details[0]?.booked_excursions.map((data: any) => (
                      // data?.images.map((img:any)=>( 
                      type === data?.port_details?.port_name ?
                        <div className="">
                          <div className="relative mx-2 rounded shadow-md mb-2">
                            {/* <img src={`${window.innerWidth > 640 ? val.image : val.mobileImage}`} className='' alt="" /> */}
                            <img
                              src={data?.images[0]}
                              className="h-44 rounded-md w-72"
                              alt=""
                            />
                            <div className='flex justify-between w-full absolute bottom-2 px-3' onClick={() => navigate('/manage-booking/shoreEx-detail', { state: { data } })} >
                              <p className='font-semibold text-white'>{data?.code.replace('/', ' ')}</p>
                              <p className='text-brand-secondary font-semibold underline cursor-pointer '  >View Details</p>
                            </div>

                          </div>
                        </div> : null

                      // ))

                    ))}


                    {/* )}
                    )} */}
                  </Slider>
                </div>
                </div>
                <Modal show={Inclusive} align={'center'} className="max-h-[60%] h-full drop-shadow bg-white w-[90%] lg:w-2/4 center bottom-2/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => setInclusive(!Inclusive)}>
            <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
              <h1 className='text-base font-semibold'>Tour Instructions</h1>
              <svg
                onClick={() => setInclusive(!Inclusive)}
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className='px-6 pb-3 lg:h-[98%] h-[82%] overflow-y-scroll'>
              <InclusiveDetail />
            </div>
          </Modal>
            </section>
        </Layout>
    );


}
