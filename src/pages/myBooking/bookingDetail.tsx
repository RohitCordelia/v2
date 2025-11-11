/* eslint-disable jsx-a11y/anchor-is-valid */
import { Layout } from '../../components/Layout';
import Accordian from '../../components/UI/Accordion/accordion_basic';
import Banner from './component/banner';
import Slider from 'react-slick';
import { FormatCardNumber, FormatToString, FormatPrice, UnFormatCardNumber, FormatAmount, ordinal_suffix_of } from '../../../src/utils/formatter/formatter';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './myBooking.css';
import { useEffect, useState } from 'react';
import { useGetBookingDataMutation, useCancellationSummaryMutation } from '../../services/profile/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal/newModal';
import { useApplyVisaMutation, useGetBookingDetailMutation } from '../../services/itinerary/itinerary';
import { GetManageDetail, SaveManageDetail } from '../../utils/store/store';
import moment from 'moment';
import Button from '../../components/UI/Button';
// import { useCancellationSummaryMutation, usePartialCancellationFeesMutation } from '../../../src/services/profile/profile';

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

export default function BookingDetails() {
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

  const ManageDetail = GetManageDetail();
  const [cabin, setCabin] = useState(1);
  const [bookingData, setBookingData] = useState<any>([]);
  const [guests, setGuests] = useState<any>(1);
  const [roomIndex, setRoomIndex] = useState<any>(null);
  const [openGuestDetail, setOpenGuestDetail] = useState<any>(false);
  const [type, setType] = useState();
  const [loading, setLoading] = useState<any>(false);
  const [modifyBookingEnable, setModifyBookingEnable] = useState<any>(false);
  const [view, setView] = useState(false);
  const [applyVisa] = useApplyVisaMutation()
  const [getBookingDetail] = useGetBookingDetailMutation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [getBookingData] = useGetBookingDataMutation();
  const location = useLocation();
  let bookingRoute: any = ManageDetail.myBooking;
  let getBooking: any = ManageDetail.getBooking;

  const [cancellationSummary] = useCancellationSummaryMutation();

  useEffect(() => {
    if (bookingData?.shore_excursion) {
      setType(bookingData?.shore_excursion[0]?.port_details?.port_name)
    }
  }, [bookingData])

  const { id } = location.state || {};

  const getBookingDataa = async () => {
    setLoading(true)
    await getBookingData(id)
      .unwrap()
      .then((res: any) => {
        setBookingData(res);
        SaveManageDetail({
          ...ManageDetail,
          getBooking: res
        });
        setLoading(false)
      })
      .catch((res: any) => {
        console.log('Error: ', res);
      });
  };
  useEffect(() => {
    getBookingDataa();

  }, []);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      }, 0);
    }, [pathname]);

    return null;
  };
  ScrollToTop()

  const navigate = useNavigate();
  const startDate = (date: any) => {
    const [startDateStr, endDateStr] = date?.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr?.split('/');
      return `${month} ${day}, ${year}`;
    }
    const formattedStartDate = formatDate(startDateStr);
    // const formattedEndDate = formatDate(endDateStr);
    return (
      <span className="text-brand-primary">{formattedStartDate}</span>
    );
  };
  const endDate = (date: any) => {
    const [startDateStr, endDateStr] = date.split(' - ');

    function formatDate(dateStr: any) {
      const [day, month, year] = dateStr.split('/');
      return `${month} ${day}, ${year}`;
    }
    const formattedEndDate = formatDate(endDateStr);
    return (
      <span className="text-brand-primary"> {formattedEndDate}</span>
    );
  };
  const onBoardTime = (date: any) => {
    const datePart = date.split(',')[1].trim().split(' ');
    return `${datePart[1]} ${datePart[0]}`;
  };

  const dateOfBirth = (date: any) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0'); // Ensures two digits
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = dateObj.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const handleDuePayment = async () => {
    let payload = {
      booking_id: bookingData?.id
    }
    await getBookingDetail(payload)
      .unwrap()
      .then((res: any) => {
        localStorage.setItem('getBooking', JSON.stringify(res));
        navigate(`/manage-booking/payment-summery?booking_id=${id}`, { state: { res: res, type: 'due' } })
      })
      .catch((res: any) => {
        console.log('Error: ', res);
      });

    // navigate(`/manage-booking/payment-summery?booking_id=${bookingData?.id}`, { state: { res: bookingData, type: 'due' } })
  };

  const handleApplyVisa = async () => {
    await applyVisa(id)
      .unwrap()
      .then((res: any) => {
        if (res?.data?.redirect_url) {
          window.location.href = res?.data?.redirect_url;
        }
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  let runningTotal = 0;
  let shoreExGst = 0;
  if (bookingData?.shore_excursion) {
    if (bookingData?.shore_excursion.length > 0) {
      bookingData?.shore_excursion.map((item: any, index: number) => {
        runningTotal += item.amount;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(runningTotal)}`}
          </p>
        );
      });
      bookingData?.shore_excursion.map((item: any, index: number) => {
        shoreExGst += item.gst;
        return (
          <p key={index} className="text-sm lg:text-sm font-semibold">
            {`₹ ${FormatPrice(shoreExGst)}`}
          </p>
        );
      });
    }

  }
  const portUrls: any = {
    Mumbai: 'https://maps.app.goo.gl/gQ93JmVgyqejuvrz8',
    Goa: 'https://maps.app.goo.gl/zFkrtaW52VCRsn649',
    Agatti: 'https://goo.gl/maps/6PNv8b6NjMu5AaoG9',
    Cochin: 'https://maps.app.goo.gl/2mDTUpHeem1srCXv7',
    Chennai: 'https://maps.app.goo.gl/8mLw2XyA3VJrQsrg8',
    Jaffna: 'https://goo.gl/maps/ra3hPxVjKo1PmP2Y9',
    Colombo: 'https://goo.gl/maps/x4LctQ82tLC64P969',
    Trincomalee: 'https://goo.gl/maps/oBFbwd8hBc7KEP4H7',
    Hambantota: 'https://goo.gl/maps/diFUifzhYQFjaveM9'
  };

  const getLocationUrl = (index: any) => {
    if (bookingData?.ports) {
      const port = bookingData.ports[index];
      return portUrls[port] || null;
    }
    return null;
  };

  const handleClick = (type: any) => {
    if (type === 'embark') {
      window.open(getLocationUrl(0), '_blank');
    } else {
      window.open(getLocationUrl(bookingData?.ports?.length - 1), '_blank');
    }
  };

  useEffect(() => {
    if (bookingData && bookingData?.sailing_date) {
      if (bookingData?.status == 'CANCELLED') {
        setModifyBookingEnable(false);
      } else {
        const [startDateStr, endDateStr] = bookingData?.sailing_date?.split(' - ');
        const parsedDate1 = moment(startDateStr, 'DD/MMM/YYYY');
        const isTodayBeforeOrEqual = moment().isSameOrBefore(parsedDate1);
        setModifyBookingEnable(isTodayBeforeOrEqual);
      }
    }
  }, [bookingData])

  const cancelBooking = async () => {
    let type = 'cancelBooking';
    await cancellationSummary(bookingRoute[0]?.booking_id)
      .unwrap()
      .then((res: any) => {
        if (res && res.data) {
          navigate('/manage-booking/cancellation-summery', { state: { res, type } })
        }
      })
      .catch((res: any) => {
        toast.error(res?.data?.message, {
          duration: 3000,
          position: 'top-center',
        })
      });
  }

  const itineraryName =
    bookingRoute[0]?.nights_count > 5
      ? `${bookingRoute[0]?.ports[0]} - ${bookingRoute[0]?.ports[bookingRoute[0]?.ports.length - 1]}`
      : bookingRoute[0]?.route;

  const portList = bookingRoute[0]?.ports
    .filter((val: any) => val !== 'At Sea')
    .map((val: any) => val)
    .join(' | ');

  const isLong = portList?.length > 150;
  return (
    <Layout>
      {loading ?
        <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/90 z-50'>
          <img
            className='w-32 lg:w-44'
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
            alt=""
          />
        </div>
        : null
      }
      <section className="mb-28 lg:mb-36">
        <div className="relative lg:mt-[70px] mt-12">
          {window.innerWidth > 640 ? <img
            className=""
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/booking-details-image-desktop.webp"
            alt=""
          /> :
            <img
              className=""
              src="https://images.cordeliacruises.com/cordelia_v2/public/images/booking-detail-image.webp"
              alt=""
            />}
          <div className="absolute inset-x-3 flex items-center justify-center lg:bottom-4 bottom-3 text-white">
            <div className="flex-col items-center justify-center">
              <div className=' flex flex-wrap justify-center text-center' >
                <div
                  className={`${bookingData?.status === 'CONFIRMED'
                    ? 'bg-brand-green'
                    : 'bg-red'
                    } lg:w-28 w-32 lg:text-2xl text-base font-semibold flex flex-wrap justify-center text-center py-2 px-3 lg:px-20 lg:py-2 rounded-md items-center gap-2`}
                >
                  <p className="font-semibold text-sm lg:text-xl text-white">{bookingData?.status}</p>
                </div>
              </div>
              <p className="flex flex-wrap font-bold lg:text-xl text-base py-3 text-red justify-center">
                Booking ID: {bookingData?.number}
              </p>
            </div>
          </div>
        </div>

        <div className='lg:m-0 m-3'>
          <div className="border-b py-4 lg:py-6 border-gray-300">
            <div className="grid grid-cols-12 lg:px-44 px-3 ">
              <div className="col-span-12 lg:col-span-9 lg:order-2 ">
                <div className="flex-col flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <div className="">
                        <p className="text-[0.9rem] lg:text-xl font-bold">{itineraryName}</p>
                      </div>
                    </div>
                    <div className=" w-[71px]">
                      <div className="bg-brand-yellow text-xs font-bold rounded-[4px] py-2 px-3">
                        <p>
                          {bookingRoute[0]?.nights_count}N/
                          {bookingRoute[0]?.nights_count + 1}D
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 lg:gap-4 mt-3 border-t lg:border-none border-gray-300 pt-2 lg:pt-0">
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      <img className="h-6 w-6"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/sailing-cruise-cruise-icon.svg"
                      />
                      <p className="text-sm lg:text-base font-semibold"> Embarkation: {startDate(bookingRoute[0]?.sailing_date)} </p>
                      <div onClick={() => handleClick('embark')} >
                        <p className="italic underline text-xs font-semibold text-textBlue cursor-pointer"> Get Direction </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      <img className="h-6 w-6"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/disembark-booking-icon.svg"
                      />
                      <p className="text-sm lg:text-base font-semibold">Disembarkation: {endDate(bookingRoute[0]?.sailing_date)}</p>
                      <div onClick={() => handleClick('disembark')} >
                        <p className="italic underline text-xs font-semibold text-textBlue cursor-pointer">
                          Get Direction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-0 lg:col-span-3 flex flex-wrap justify-end  lg:pl-10 lg:order-2 ">
                {bookingData?.free_visa_applicable && <div>
                  <Button
                    text="Apply Visa"
                    size="base"
                    handleClick={handleApplyVisa}
                    className='hidden lg:inline-block lg:w-52'
                  />
                </div>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:px-44 px-3 py-4 items-center">
            <div className="col-span-3 lg:col-span-2 ">
              <p className="text-sm lg:text-base text-gray-200 font-semibold">Visiting Ports</p>
              <div className="flex flex-wrap mt-2 font-semibold text-sm lg:text-base">
                {/* {bookingRoute[0]?.ports?.reduce(
                  (acc: any, port: any, index: number) => {
                    if (index > 0) {
                      acc.push(
                        <span key={`sep-${index}`} style={{ margin: '0 2px' }}>
                          |
                        </span>
                      );
                    }
                    acc.push(<p key={`port-${index}`}>{port}</p>);
                    return acc;
                  },
                  []
                )} */}
                <p className="!leading-6">
                  <span className='mr-2'>{isLong && !isExpanded ? portList?.slice(0, window.innerWidth > 765 ? 65 : 40) + '...' : portList}</span>
                  {isLong && (
                    <span
                      onClick={() => setIsExpanded(prev => !prev)}
                      className="text-xs lg:text-sm text-brand-primary font-bold cursor-pointer inline-block"
                    >
                      {isExpanded ? 'View less' : 'View more'}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-1 hidden lg:block">
              {bookingData?.status === 'RESERVED' ? <div className='flex justify-end'>
                <a
                  onClick={handleDuePayment}
                  className={` border-2 px-6 border-brand-primary text-brand-primary cursor-pointer text-center rounded-sm py-3 font-bold text-base`}
                >
                  Pay Due Amount {`₹ ${FormatPrice(bookingData?.due_amount)}`}
                </a>
              </div> : null}
            </div>
          </div>

          <div className='grid grid-cols-12 gap-6 lg:px-44 px-3'>
            <div className='col-span-12 lg:col-span-8'>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {bookingData?.invoice_url ? (
                  <div className="shadow-allSide rounded flex items-center py-3 px-8">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
                      className="h-6 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                    <a
                      target="_blank"
                      href={`${bookingData?.invoice_url}`}
                      className="text-sm lg:text-base text-brand-primary font-semibold "
                    >
                      Download Invoice
                    </a>
                  </div>
                ) : null}
                {bookingData?.eticket_url ? (
                  <div className="shadow-allSide rounded flex items-center py-3 px-8">
                    <img
                      src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
                      className="h-6 mr-2 cursor-pointer"
                      alt="Cruise"
                    />
                    <a
                      target="_blank"
                      href={`${bookingData?.eticket_url}`}
                      className="text-sm lg:text-base text-brand-primary font-semibold "
                    >
                      Download E-Voucher
                    </a>
                  </div>
                ) : null}
              </div>

              <Accordian
                openByDefault={false}
                title="Itinerary"
                titleClass="text-base font-bold lg:text-xl"
                mainClass=" shadow-allSide px-4 lg:px-7 mt-4 pt-6 pb-5 rounded-lg border-gray-300 cursor-pointer"
                text="Day Wise Details of your package"
                textClass="text-gray-100 text-sm font-semibold "
              >

                {bookingData?.itinerary?.map((port: any, index: number) => (
                  <div key={index} className="mt-4 py-5 border-t-1 border-gray-300" >
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-gradient rounded-md flex flex-col w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] items-center justify-center">
                        <p className="text-white text-xs lg:text-sm">Day</p>
                        <p className="text-white text-sm lg:text-lg font-bold">
                          {port.day}
                        </p>
                      </div>
                      <div className="flex-col flex-wrap items-center gap-6">
                        <div className="flex flex-col justify-center">
                          <p className="text-base lg:text-xl font-semibold">{bookingData.ports[index]}</p>
                          <p className="text-xs lg:text-base text-brand-orange-text font-medium mt-0.5">
                            {port.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-100 text-base mt-3 leading-7">
                      <p>
                        {port?.description}{' '}
                      </p>
                    </div>
                    {/* <div className="flex gap-3 mt-4 flex-wrap">
                      <img
                        className="h-32"
                        src={port?.image_url}
                        alt=""
                      />
                    </div> */}
                  </div>
                ))}
              </Accordian>

              <div className="shadow-allSide mt-4 pt-2 pb-4">
                <div className="mx-6 lg:mx-10">
                  {bookingData?.rooms?.length > 5 ?
                    <Slider {...settings}>
                      {bookingData?.rooms?.map((data: any, index: any) => (
                        <Button
                          text={`Cabin ${index + 1}`}
                          size="sm"
                          type={index + 1 === cabin ? 'primary' : 'secondary'}
                          handleClick={() => setCabin(index + 1)}
                        />
                      ))}
                    </Slider> :
                    <div className='flex mt-4 mx-2 gap-2 lg:gap-3 flex-wrap'>
                      {bookingData?.rooms?.map((data: any, index: number) => (
                        <div className="">
                          {' '}
                          <Button
                            text={`Cabin 0${index + 1}`}
                            size="sm"
                            type={index + 1 === cabin ? 'primary' : 'secondary'}
                            handleClick={() => setCabin(index + 1)}
                          />
                        </div>
                      ))}
                    </div>
                  }
                </div>

                {bookingData?.rooms?.map((room: any, index: number) => (
                  index + 1 === cabin ?
                    <>
                      <div className="border-b-1 pb-6 border-gray-300">
                        <div className="flex flex-wrap lg:gap-[118px] gap-[20px] lg:px-8 px-5 lg:py-6 py-6">
                          <div className="flex text-sm font-semibold flex-col gap-2">
                            <p className="text-gray-100"> Cabin Category </p>
                            <p> {room?.category_name} </p>
                          </div>
                          <div className="flex text-sm font-semibold flex-col gap-2">
                            <p className="text-gray-100"> Deck No </p>
                            <p> {room?.ship_room?.deck_no} </p>
                          </div>
                          <div className="flex text-sm font-semibold flex-col gap-2">
                            <p className="text-gray-100">Room No </p>
                            <p> {room?.ship_room?.number} </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap lg:gap-[193px] gap-[54px]  lg:px-8 px-5">
                          <div className="flex text-sm font-semibold flex-col gap-2">
                            <p className="text-gray-100"> Guests No </p>
                            <p> {room?.guests} </p>
                          </div>
                          <div className="flex text-sm font-semibold flex-col gap-2 lg:ml-[-31px] ml-[11px] ">
                            <p className="text-gray-100"> Trip Type </p>
                            <p>{bookingData?.trip_type === 'round' ? 'Round Trip' : 'One Way Trip'} </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex px-6 py-6 flex-wrap justify-between">
                        <div className='flex items-center'>
                          <p className="text-xl font-bold ">Guest Details</p>
                          {bookingData?.actions?.update_guest ?
                            <p
                              onClick={() => navigate('/manage-booking/updateGuest')}
                              className='text-sm underline lg:text-base text-brand-primary ml-2 font-semibold cursor-pointer'
                            >Update Guest Detail</p>
                            : null
                          }
                        </div>
                        <p className="text-sm underline text-brand-primary cursor-pointer" onClick={() => {
                          setOpenGuestDetail(!openGuestDetail);
                          setRoomIndex(index + 1)
                        }} >
                          Know More
                        </p>
                      </div>
                    </>
                    : null
                ))}
                <div className=" ">
                  <div className="flex flex-wrap justify-between">
                    {bookingData?.rooms?.map((room: any, index: number) => (
                      cabin === index + 1 ?
                        room?.guest_details?.map((guest: any, index: number) => (
                          <div
                            key={index}
                            className={`flex lg:w-[50%] w-full px-6 py-3 justify-between flex-wrap ${[0, 3, 4, 7, 8].includes(index) ? 'bg-gray-400' : ''
                              }`}
                          >
                            <div className="flex text-sm font-semibold flex-col gap-2">
                              <p className="text-gray-100"> {guest.type.charAt(0) + guest.type.slice(1).toLowerCase()} </p>
                              <p> {guest?.first_name || '-'} {guest?.last_name}</p>
                            </div>
                            <div className="flex text-sm font-semibold flex-col gap-2">
                              <p className="text-gray-100">Gender </p>
                              <p> {guest.gender || '-'} </p>
                            </div>
                            <div className="flex text-sm font-semibold flex-col gap-2">
                              <p className="text-gray-100">Age </p>
                              <p> {guest.age || '-'} </p>
                            </div>
                          </div>
                        )) : null
                    ))}
                  </div>
                </div>
              </div>

              {/* {bookingData?.shore_excursion?.length > 0 ? <div className="shadow-allSide lg:px-6 mt-6">
                <div className='mx-4'>
                  <div className="py-6  border-b-1 border-gray-300 justify-between">
                    <p className="text-xl font-bold ">Shore Excursions</p>
                  </div>
                  <div className="pb-12 pt-7">
                    {bookingData?.shore_excursion.map((data: any, index: any) => (
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
                    <Slider {...setting}>
                      {bookingData?.shore_excursion.map((data: any, index: any) => {
                        console.log(bookingData?.shore_excursion[index].images[0])
                        return (
                          type === data?.port_details?.port_name ?
                            <div className="">
                              <div className="relative mx-2 rounded shadow-md mb-2">
                                <img
                                  src={bookingData?.shore_excursion[index].images[index]}
                                  className="h-44 rounded-md w-72"
                                  alt=""
                                />
                                <div className='flex justify-between w-full absolute bottom-2 px-3' onClick={() => navigate('/manage-booking/shoreEx-detail', { state: { data } })} >
                                  <p className='font-semibold text-white'>{data?.code.replace('/', ' ')}</p>
                                  <p className='text-brand-secondary font-semibold underline cursor-pointer '  >View Details</p>
                                </div>

                              </div>
                            </div> : null
                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </div> : null} */}
            </div>
            <div className='col-span-12 lg:col-span-4'>
              <div className="mt-4 lg:sticky lg:top-32">
                <div className='border-gray-400 shadow-allSide rounded-lg mb-4 '>
                  <div onClick={() => setView(!view)} className='border-b flex justify-between border-gray-300 px-3 py-3'>
                    <p className='text-lg font-bold'>Price Details</p>
                    {!view ?
                      <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>View Price Breakup</p> :
                      <p className='text-brand-blue font-medium text-sm mt-1 cursor-pointer'>Hide Price Breakup</p>
                    }  </div>
                  <div className='pt-3'>

                    {view ?
                      <div className='px-3'>
                        {bookingData?.rooms?.map((room: any, index: number) => {
                          return (
                            <div className="grid grid-cols-3 mb-2" key={index}>
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">{`CABIN ${index + 1} FARE`}</p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">Service Charge & Levies</p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">Fuel Surcharge</p>
                                {room.discount ? <p className="text-sm lg:text-sm font-semibold mt-1">Discount</p> : null}

                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatPrice(room.actual_cabin_fare)}`}</p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">{`₹ ${FormatPrice(room.service_charges)}`}</p>
                                <p className="text-sm lg:text-sm font-semibold mt-1">{`₹ ${FormatPrice(room.fuel_surcharge)}`}</p>
                                {room.discount ? <p className="text-sm lg:text-sm font-semibold mt-1">{`- ₹ ${FormatPrice(room.discount)}`}</p> : null}
                              </div>
                            </div>
                          );
                        })}
                        {bookingData?.shore_excursion ?
                          bookingData?.shore_excursion.length > 0 ?
                            <div className="grid grid-cols-3 mb-1" >
                              <div className="col-span-2">
                                <p className="text-sm lg:text-sm font-semibold">
                                  {`Shore Excursions Total`}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm lg:text-sm font-semibold">{runningTotal}</p>
                              </div>
                            </div>
                            : null
                          : null
                        }
                        {bookingData?.shore_excursion ?
                          bookingData?.shore_excursion.length > 0 ?
                            <div className="grid grid-cols-3 mb-2" >
                              <div className="col-span-2">
                                {bookingData?.shore_excursion.map((item: any) => (
                                  <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">
                                    {item?.code}
                                  </p>
                                ))}
                              </div>
                              <div className="text-right">
                                {bookingData?.shore_excursion.map((item: any) => (
                                  <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">{`₹ ${FormatPrice(item.amount)}`}</p>
                                ))}
                              </div>
                            </div>
                            : null
                          : null
                        }

                        {bookingData?.protection_plan && bookingData?.protection_plan.amount > 0 ?
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Protection Plan:</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold">₹ {FormatPrice(bookingData?.protection_plan.amount)}</p>
                            </div>
                          </div>
                          : null
                        }

                        {(bookingData?.discounts && bookingData?.discounts[0]?.amount) || bookingData?.cabin_fare_discount > 0 ?
                          <div className="grid grid-cols-3 mt-3">
                            <div className="col-span-2">
                              <p className="text-sm lg:text-sm font-semibold">Total Cabin Fare Discount:</p>
                              {bookingData?.discount_text && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{bookingData?.discount_text}</p>}
                              {bookingData?.discounts && bookingData?.discounts[0] && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{bookingData?.discounts[0]?.coupon_code}</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm lg:text-sm font-semibold text-brand-green">- ₹{FormatAmount((+bookingData.cabin_fare_discount || 0) + (+bookingData?.discounts[0]?.amount || 0))}</p>
                              {bookingData.cabin_fare_discount > 0 && <p className="text-xxs lg:text-sm font-semibold text-gray-100">- ₹{FormatAmount(bookingData.cabin_fare_discount)}</p>}
                              {bookingData?.discounts && bookingData?.discounts[0] && <p className="text-xxs lg:text-sm font-semibold text-gray-100">- ₹{FormatAmount(bookingData?.discounts[0]?.amount)}</p>}
                            </div>
                          </div>
                          : null
                        }
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">{`₹ ${FormatToString(parseInt(
                              bookingData?.sub_total
                            ).toFixed())}`}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 mt-3">
                          <div className="col-span-2">
                            <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                              GST
                            </p>
                            {bookingData?.shore_excursion && bookingData?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1.5">
                              Shore Excursions
                            </p> : null}
                          </div>
                          <div className="text-right">
                            <p className="text-sm lg:text-sm font-semibold">₹ {FormatAmount(bookingData?.gst + (bookingData?.shore_excursion ? shoreExGst : null))}</p>
                            <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹ {FormatAmount(bookingData?.gst)}</p>

                            {bookingData?.shore_excursion && bookingData?.shore_excursion.length > 0 ? <p className="text-sm lg:text-xs text-gray-100   font-semibold mt-1">₹ {FormatAmount(shoreExGst)}</p>
                              : null}
                          </div>
                        </div>
                      </div>
                      : null}


                    <div className='px-4 py-2 bg-brand-secondary/[0.1] mt-2'>
                      <div className='flex justify-between py-1'>
                        <div className="col-span-2">
                          <p className="text-md lg:text-lg font-bold">Grand Total</p>
                        </div>
                        <div className="text-right">
                          <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                            bookingData?.total
                          )}`}</p>
                        </div>
                      </div>
                      {bookingData?.amount_paid ?
                        <div className='flex justify-between py-1'>
                          <div className="col-span-2">
                            <p className="text-md lg:text-lg font-bold">Amount Paid</p>
                          </div>
                          <div className="text-right">
                            <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                              bookingData?.amount_paid
                            )}`}</p>
                          </div>
                        </div>
                        : null
                      }
                      {bookingData?.due_amount ?
                        <div className='flex justify-between py-1'>
                          <div className="col-span-2">
                            <p className="text-md lg:text-lg font-bold">Amount Payable</p>
                          </div>
                          <div className="text-right">
                            <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                              bookingData?.due_amount
                            )}`}</p>
                          </div>
                        </div>
                        : null
                      }
                    </div>
                  </div>
                </div>
                {!modifyBookingEnable ? null : <div className="text-center">
                  <Button
                    text="Modify Booking"
                    size="base"
                    handleClick={() => navigate('/manage-booking/modify-booking', { state: bookingData })}
                    className='w-full'
                  />
                </div>
                }
                {getBooking?.actions?.cancel ?
                  <div className="text-center mt-2">
                    <Button
                      text="Cancel Booking"
                      size="base"
                      type='secondary'
                      handleClick={cancelBooking}
                      className='w-full'
                    />
                  </div>
                  : null
                }
                {/* <div className='mt-10 text-center'>
                    <p className='text-lg font-semibold'>Manage your booking with ease. Download our app now!</p>
                    <div className='flex mt-6 justify-center lg:justify-center'>
                      <a
                        target='_blank' href="https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp"
                      >
                        <img className='mr-4' src="https://images.cordeliacruises.com/cordelia_v2/public/images/google-play-store-logo.webp" alt="" />
                      </a>
                      <a
                        target='_blank' href="https://apps.apple.com/in/app/cordelia-cruises/id1589910857"
                      >
                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/images/apple-app-store-logo.webp" alt="" />
                      </a>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className='fixed w-full flex px-3  justify-center border-t border-gray-300 shadow-allSide  gap-2 right-0 bottom-0 z-40 lg:hidden bg-white '>
          {bookingData?.status === 'RESERVED' ?
            <div className='text-center  py-3' >
              <Button
                text={`Pay Due Amount ₹ ${FormatPrice(bookingData?.due_amount || 32323.323)}`}
                size="sm"
                type='secondary'
                handleClick={handleDuePayment}
                className={`${bookingData?.free_visa_applicable ? 'w-44 py-4' : 'w-[350px] py-3'}`}
              />
            </div>
            : null
          }
          {bookingData?.free_visa_applicable ?
            <div className="text-center py-3">
              <Button
                text="Apply Visa"
                size="sm"
                handleClick={handleApplyVisa}
                className='w-44'
              />
            </div>
            : null
          }
        </div>
      </section>

      <Modal
        show={openGuestDetail}
        align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[300px] max-h-[85vh] lg:w-2/4"
        onClose={() => setOpenGuestDetail(false)}
      >
        <div
          className="flex items-center justify-between p-4 absolute top-0 left-0 w-full bg-white border-b border-gray-300 z-50"
          onClick={() => setOpenGuestDetail(false)}
        >
          <div className="self-center mr-3 mt-3 font-bold cursor-pointer">
            <img className='w-4 h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/close-new-icon.svg' alt='closeIcon' />
          </div>
        </div>
        <div className='flex flex-wrap gap-3 px-6 pt-12'>
          {bookingData?.rooms?.map((room: any, index: number) => (
            roomIndex === index + 1 ?
              room?.guest_details?.map((guest: any, index: number) => (
                <div className=" ">
                  <Button text={`Guest 0${index + 1}`} size='sm' type={guests === index + 1 ? 'primary' : 'secondary'} handleClick={() => setGuests(index + 1)} />
                </div>
              )) : null
          ))}
        </div>
        {bookingData?.rooms?.map((room: any, index: number) => (
          roomIndex === index + 1 ?
            room?.guest_details?.map((guest: any, index: number) => (
              guests === index + 1 ?
                // <div>
                <div className='mt-6 lg:mx-6 mx-3'>
                  <div className='grid grid-cols-3 lg:grid-cols-4 gap-7'>
                    <div className="">
                      <p className="text-xxs lg:text-sm text-gray-100">Full Name</p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest?.first_name || '-'} {guest?.last_name}</p>
                    </div>
                    <div className=" ">
                      <p className="text-xxs lg:text-sm text-gray-100">Gender </p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest.gender || '-'} </p>
                    </div>
                    <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">DOB </p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest.date_of_birth ? dateOfBirth(guest.date_of_birth) : '-'} </p>
                    </div>
                    <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">Meal </p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest.meal || '-'} </p>
                    </div>
                    <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">Mobile </p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest.phone || '-'} </p>
                    </div>
                    <div className="">
                      <p className="text-xxs lg:text-sm text-gray-100">Email </p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest.email || '-'} </p>
                    </div>
                    <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">Address </p>
                      <p className='text-xs lg:text-base font-medium break-words'> {guest.city || '-'} </p>
                    </div>
                    <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">Citizenship </p>
                      <p className='text-xs lg:text-base font-medium break-words' > {guest.citizenship || '-'} </p>
                    </div>
                    {/* <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">Passport Number </p>
                      <p className='text-xs lg:text-base font-medium break-words' > {'W234352334'} </p>
                    </div>
                    <div className="  ">
                      <p className="text-xxs lg:text-sm text-gray-100">Passport Issue Date </p>
                      <p className='text-xs lg:text-base font-medium break-words' > {'01/01/2020'} </p>
                    </div>
                    <div className="">
                      <p className="text-xxs lg:text-sm text-gray-100">Passport Expiry Date </p>
                      <p className='text-xs lg:text-base font-medium break-words' > {'01/01/2028'} </p>
                    </div> */}
                  </div>
                </div> : null
            )) : null

        ))}

      </Modal>
    </Layout>
  );
}
