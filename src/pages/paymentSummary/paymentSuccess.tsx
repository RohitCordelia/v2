import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { Layout } from '../../../src/components/Layout';
import { useNavigate } from 'react-router-dom';
import { GetStore } from '../../../src/utils/store/store';
import { FormatToString, FormatAmount } from '../../../src/utils/formatter/formatter';
import { useGetBookingByIdQuery } from '../../../src/services/itinerary/itinerary';
import { TiggerFBPurchasetEvent } from '../../../src/components/Analytics/events';
import { Player } from '@lottiefiles/react-lottie-player';
import success from "../../utils/lottie/success.json";
import { TiggerGAConfirmBooking } from '../../../src/components/Analytics/events';
import moment from 'moment';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../components/UI/Button';
const DownloadApp = React.lazy(() => import('../../../src/component/DownloadApp'));

type Props = {};

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

export default function PaymentSuccess({ }: Props) {
  const store = GetStore();
  const booking_id = new window.URLSearchParams(window.location.search).get('booking_id');
  const { data, isLoading: Loading } = useGetBookingByIdQuery(booking_id, { skip: !booking_id });
  const [secure, setSecure] = useState<any>(false);
  const [portName, setPortName] = useState('');
  const [selectedCabin, setSelectedCabin] = useState<any>(0);
  const [guestDetailModal, setGuestDetailModal] = useState<any>(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  let appImage = '';
  let appLink = '';
  if (/Android/i.test(navigator.userAgent)) {
    appImage =
      'https://images.cordeliacruises.com/cordelia_v2/public/images/google-play-store-logo.webp';
    appLink =
      'https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp';
  } else if (
    /iPhone/i.test(navigator.userAgent) ||
    /iPad/i.test(navigator.userAgent)
  ) {
    appImage =
      'https://images.cordeliacruises.com/cordelia_v2/public/images/apple-app-store-logo.webp';
    appLink = 'https://apps.apple.com/in/app/cordelia-cruises/id1589910857';
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data) {
      let portName = data.itinerary.ports
        .map((item: any, index: any, arr: any) => {
          const isLast = index === arr.length - 1;
          const name = isLast ? item.name : item.name + ` -`;
          return index === 0 || isLast ? `${name}` : `${name}`;
        })
        .join(" ")

      setPortName(portName)
    }
  }, [data])

  useEffect(() => {
    console.log('roh', data);
    if (data?.amount_paid) {
      // TiggerFBPurchasetEvent({ value: data.amount_paid });

      const names = data.itinerary.ports
        .filter((item: any) => item.name !== "At Sea")
        .map((item: any, index: any, arr: any) => {
          const isLast = index === arr.length - 1;
          const name = isLast ? item.name : item.name + ` - `;
          return index === 0 || isLast ? name : name;
        })
        .join(" ");

      let itemData = data.rooms?.map((v: any) => {
        return {
          item_id: data.itinerary.itinerary_id,
          item_name: names,
          item_category: data.itinerary.nights + ' nights',
          item_category2: data.itinerary.start_date,
          item_category3: v.category_name,
          item_list_name: v.category_name,
          item_variant: 'cabin',
          price: v.total,
        }
      })

      data.shore_excursions.map((ex, idxx) => {
        let data = {
          item_id: ex.shore_excursion_id,
          item_name: ex.title,
          item_category: ex?.adults_count?.confirmed + ' adult',
          item_category2: ex?.children_count?.confirmed + ' children',
          item_category3: '',
          item_list_name: ex.title,
          item_variant: 'shore excursion',
          price: ex.total,
        }
        itemData.push(data)
      })

      // console.log('roh data', data, itemData);
      const GAData = {
        currency: "INR",
        value: data.total,
        transaction_id: data.number,
        items: itemData,
        name: names
      }
      if (data.status == "CONFIRMED" || !data.split_payment) {
        TiggerGAConfirmBooking(GAData, data.billing_address)
      }
    }
  }, [data])


  if (Loading) {
    return (
      <p>Loading...</p>
    )
  }

  const Invoices = (invoices: any) => {
    return invoices.invoices.map((value: any, key: number) =>
      <div className="border-2 rounded flex items-center py-2 px-4 border-gray-300 shadow-sm mt-6 ">
        <img
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
          className="h-6 mr-2 cursor-pointer"
          alt="Cruise"
        />
        <a
          href={`${value}`}
          className="text-sm text-brand-primary font-bold underline"
        >
          Download Invoice {key + 1}
        </a>
      </div>
    )
  }

  const portList = data?.itinerary?.ports
    .filter((val: any) => val.name !== 'At Sea')
    .map((val: any) => val.name)
    .join(' | ');

  const isLong = portList?.length > 150;

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div className='text-center'>
          <Player
            src={success}
            style={{ width: 100, height: 100 }}
            loop
            autoplay
          />
          <h1 className="lg:text-4xl text-3xl font-bold text-brand-green">Thank You!</h1>
          <p className="lg:text-2xl text-xl font-semibold mt-2">Payment done successfully!</p>
          <p className="text-sm lg:text-lg text-gray-600 font-normal mt-3">{`Your payment of ₹ ${(data?.last_payment?.amount &&
            FormatToString(data?.last_payment?.amount)) ||
            FormatToString(data?.amount_paid)
            } was successful.`}</p>
          {/* <p className="text-sm font-semibold mt-3">
            Order ID:{' '}
            <span className="font-bold">{`${data?.number || ''}`}</span>
          </p> */}
        </div>

        {/* {data?.split_payment && data?.status === 'RESERVED' ?
          null
          :
          <div className="border-2 rounded flex items-center py-2 px-4 border-gray-300 shadow-sm mt-6 ">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
              className="h-6 mr-2 cursor-pointer"
              alt="Cruise"
            />
            <a
              href={`${data?.evoucher_url || ''}`}
              className="text-sm text-brand-primary font-bold underline"
            >
              Download E-Voucher
            </a>
          </div>
        } */}

        {/* {data?.evoucher_url !== data?.invoice_url ?
          <div className="border-2 rounded flex items-center py-2 px-4 border-gray-300 shadow-sm mt-6 ">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
              className="h-6 mr-2 cursor-pointer"
              alt="Cruise"
            />
            <a
              href={`${data?.evoucher_url || ''}`}
              className="text-sm text-brand-primary font-bold underline"
            >
              Download E-Voucher
            </a>
          </div>
          : null
        } */}

        <div className='flex justify-center'>
          <div className="border-2 ml-2 rounded flex items-center py-2 px-4 border-gray-300 shadow-sm mt-6 ">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
              className="h-6 mr-2 cursor-pointer"
              alt="Cruise"
            />
            <a
              target='_blank'
              href={`${data?.evoucher_url}`}
              className="text-sm text-brand-primary font-bold underline"
            >
              Download E-Voucher
            </a>
          </div>
          {data?.invoice_evoucer_urls?.invoices?.map((val:any, i:any) => {
            if (val.url) {
              return (
                <div className="border-2 ml-2 rounded flex items-center py-2 px-4 border-gray-300 shadow-sm mt-6 ">
                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/pdf-icon.svg"
                    className="h-6 mr-2 cursor-pointer"
                    alt="Cruise"
                  />
                  <a
                    target='_blank'
                    href={`${val.url}`}
                    className="text-sm text-brand-primary font-bold underline"
                  >
                    {val?.invoice_for || 'Download Invoice'}
                  </a>
                </div>
              )
            }
          })}
        </div>

        {data?.split_payment && data?.status === 'RESERVED' ?
          <div className='mt-3'>
            <a className='text-brand-primary text-sm font-semibold' href={`/payment-summary?booking_id=${data?.id}`}>Continue Payment...</a>
          </div>
          : null
        }

        <div className='grid grid-cols-2 mt-8 gap-6'>
          <div className='col-span-2 lg:col-span-1 order-last lg:order-first py-4 lg:py-6 border border-gray-300 bg-white rounded-lg shadow-allSide'>
            <div className='px-4 border-b border-gray-300 pb-4 lg:pb-6'>
              <h1 className='text-base lg:text-2xl font-bold text-brand-primary'>Booking ID: {data?.number}</h1>
              {/* <p className='text-base lg:text-xl mt-2 font-bold'>{portName}</p> */}
            </div>

            <div className='flex items-start justify-between pt-6 pb-4 px-2 lg:px-8 border-b border-gray-300'>
              <div className='text-right'>
                <p className='text-xs lg:text-base text-gray-600 font-light'>Departure</p>
                <p className='text-xs lg:text-base font-semibold'>{data?.itinerary?.starting_port?.name}</p>
                <p className='text-xs lg:text-base font-semibold'>{moment(data?.itinerary?.start_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')}</p>
                <p className='text-xs lg:text-base font-semibold'>
                  {/* {moment(data?.itinerary?.ports[0].departure, 'ddd, DD MMM HH:ss A').format('hh:ss A')} */}
                  {data?.itinerary?.ports[0].departure.split(" ").slice(-2).join(" ")}
                </p>
              </div>
              <div className='w-[30%] text-center relative -mt-[5px] lg:-mt-[3px]'>
                <p className='text-gray-200/60 whitespace-nowrap overflow-hidden'>--------------------------</p>
                <img className='absolute h-10'
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                />
              </div>
              <div className=''>
                <p className='text-xs lg:text-base text-gray-600 font-light'>Arrival</p>
                <p className='text-xs lg:text-base font-semibold'>{data?.itinerary?.destination_port?.name}</p>
                <p className='text-xs lg:text-base font-semibold'>{moment(data?.itinerary?.end_date, 'DD/MM/YYYY').format('ddd, MMM Do, YYYY')}</p>
                <p className='text-xs lg:text-base font-semibold'>
                  {/* {moment(data?.itinerary?.ports[data?.itinerary?.ports.length - 1].arrival, 'ddd, DD MMM HH:ss A').format('hh:ss A')} */}
                  {data?.itinerary?.ports[data?.itinerary?.ports.length - 1].arrival.split(" ").slice(-2).join(" ")}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-start pt-6 pb-4 px-2 lg:px-8 border-b border-gray-300'>
                <p className="text-xs lg:text-sm font-medium text-gray-100">
                  Visiting Ports:
                </p>
                <div className="flex">
                  <p className="text-xs lg:text-sm font-medium !leading-5">
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

            <div className='flex flex-wrap gap-2 items-start justify-between pt-6 pb-4 px-4 border-b border-gray-300'>
              {data?.rooms.map((v: any, i: any) => (
                // <div className={`border lg:border-2 cursor-pointer ${i == selectedCabin ? 'bg-brand-primary text-white' : 'text-brand-primary'} border-brand-primary px-4 lg:px-7 py-2 lg:py-3 rounded`} onClick={() => setSelectedCabin(i)}>
                //   <p className='text-xs lg:text-base font-semibold'>Cabin {i + 1}</p>
                // </div>
                <Fragment key={i}>
                  <Button text={`Cabin ${i + 1}`} type={i == selectedCabin ? 'primary' : 'secondary'} handleClick={() => setSelectedCabin(i)} />
                </Fragment>
              ))}
            </div>

            <div className='border-gray-400 rounded-lg'>
              <div className='border-b border-gray-300 px-6 py-6'>
                <p className='text-base lg:text-xl font-semibold'>Accomodation Details</p>
              </div>
              <div>
                <div className='px-4 lg:px-6 pt-6'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>Cabin {selectedCabin + 1}</p>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Deck No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>{data?.rooms[selectedCabin].ship_room?.deck_no || '-'}</p>
                    </div>
                    <div>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium'>Cabin Category</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>{data?.rooms[selectedCabin].category_name}</p>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Room No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>{data?.rooms[selectedCabin].ship_room?.number || '-'}</p>
                    </div>
                    <div>
                      <p className='text-gray-100 text-xs lg:text-sm font-medium'>Guest No</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>{data?.rooms[selectedCabin].guests || '-'}</p>
                      {/* <p className='text-gray-100 text-xs lg:text-sm font-medium mt-3'>Ship Name</p>
                      <p className='text-xs lg:text-base font-medium mt-1.5'>{data?.itinerary?.ship?.name}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2 lg:col-span-1 py-4 lg:py-6 border border-gray-300 bg-white rounded-lg shadow-allSide h-fit'>
            <div className='px-4 flex items-center justify-between border-b border-gray-300 pb-4 lg:pb-6'>
              <p className='text-base lg:text-2xl font-bold'>Price Details</p>
            </div>
            <div className='pt-6'>
              {data?.rooms?.map((room: any, index: any) => {
                return (
                  <div className='mb-3 px-4'>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">{room.category_name} Cabin</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.cabin_fare + room.discount)}</p>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">Service Charge & Levies</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.service_charges)}</p>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">Fuel Surcharge</p>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(room.fuel_surcharge)}</p>
                    </div>
                    {/* <div className='flex justify-between'>
                      <p className="text-base lg:text-lg  font-medium">Sub-total</p>
                      <p className="text-base lg:text-lg  font-medium">₹ {FormatAmount(room.total + room.discount)}</p>
                    </div> */}
                  </div>
                )
              })}

              {/* {data?.cabin_fare_discount && data?.cabin_fare_discount != "0.0" ?
                <div className='px-4 pb-3'>
                  <div className='flex justify-between'>
                    <div>
                      <p className="text-base lg:text-lg  mb-0.5 font-medium">Discount</p>
                      {data?.discount_text && <p className="text-xxs lg:text-sm font-semibold text-gray-100">{data?.discount_text}</p>}
                    </div>
                    <p className="text-base lg:text-lg  mb-0.5 font-medium text-brand-green">- ₹ {FormatAmount(data?.cabin_fare_discount)}</p>
                  </div>
                </div>
                : null
              } */}
              {(data?.cabin_fare_discount && data?.cabin_fare_discount != "0.0") || data?.discounts[0]?.amount ?
                <div className="grid grid-cols-3 px-4 pb-3">
                  <div className="col-span-2">
                    <p className="text-base lg:text-lg font-semibold">Total Cabin Fare Discount:</p>
                    {data?.discount_text && <p className="text-sm lg:text-base font-semibold text-gray-100">{data?.discount_text}</p>}
                    {data?.discounts && data?.discounts[0] && <p className="text-sm lg:text-base font-semibold text-gray-100">{data?.discounts[0]?.coupon_code}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-base lg:text-lg font-semibold text-brand-green">- ₹{FormatAmount((+data?.cabin_fare_discount || 0) + (+data?.discounts[0]?.amount || 0))}</p>
                    {data?.cabin_fare_discount > 0 && <p className="text-sm lg:text-base font-semibold text-gray-100">- ₹{FormatAmount(data?.cabin_fare_discount)}</p>}
                    {data?.discounts && data?.discounts[0] && <p className="text-sm lg:text-base font-semibold text-gray-100">- ₹{FormatAmount(data?.discounts[0]?.amount)}</p>}
                  </div>
                </div>
                : null
              }

              {data?.shore_excursion_net_total ?
                <div className='px-4 pb-3'>
                  <div className='flex justify-between'>
                    <p className="text-base lg:text-lg  mb-0.5 font-medium">Shore Excursions</p>
                    <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(data?.shore_excursion_net_total)}</p>
                  </div>
                </div>
                : null
              }
              <div className='px-4 pb-3'>
                <div className='flex justify-between'>
                  <p className="text-base lg:text-lg  font-medium">Sub-total</p>
                  <p className="text-base lg:text-lg  font-medium">₹ {FormatAmount(data?.sub_total)}</p>
                </div>
              </div>

              <div className='bg-[#F4F8FF] px-4 py-3'>
                <div className='flex justify-between mb-1'>
                  <p className="text-base lg:text-lg  mb-0.5 font-medium">Taxes</p>
                  <p className="text-base lg:text-lg  mb-0.5 font-medium">₹ {FormatAmount(data?.gst + (data?.shore_excursion_gst))}</p>
                </div>
                <div className='flex justify-between'>
                  <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">GST</p>
                  <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(data?.gst)}</p>
                </div>
                {data?.shore_excursion_gst ?
                  <div className='flex justify-between'>
                    <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">Shore Excursion GST:</p>
                    <p className="text-base lg:text-lg  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(data?.shore_excursion_gst)}</p>
                  </div>
                  : null
                }
              </div>
              {data?.tcs ?
                <div className='px-4 mt-3'>
                  <div className="flex justify-between">
                    <div className="col-span-2">
                      <p className="text-lg lg:text-xl font-bold">Total:</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg lg:text-xl font-bold">{`₹ ${FormatToString(
                        data?.total
                      )}`}</p>
                    </div>
                  </div>

                  <div className=" flex justify-between mt-1">
                    <div className="col-span-2">
                      <p className="text-base lg:text-lg font-semibold">TCS:</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base lg:text-lg font-semibold">{`₹ ${FormatAmount(data?.tcs)}`}</p>
                    </div>
                  </div>
                </div>
                : null
              }
              <div className='px-4 pt-2 lg:pt-4'>
                <div className='flex justify-between items-end mt-2'>
                  <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Grand Total</p>
                  <div>
                    <div className="text-right">
                      <p className="text-lg lg:text-2xl font-bold text-brand-primary">{`₹ ${FormatAmount(
                        data?.total + (data?.tcs || 0)
                      )}`}</p>
                    </div>
                  </div>
                </div>
              </div>
              {data?.payment_option_rule && ((data?.total + (data?.tcs || 0)) - data?.amount_paid) != 0 ?
                <div className='px-4 pt-2 lg:pt-2'>
                  <div className='flex justify-between items-end mt-2'>
                    <p className='text-lg lg:text-2xl text-brand-primary font-bold'>Due Amount</p>
                    <div>
                      <div className="text-right">
                        <p className="text-lg lg:text-2xl font-bold text-brand-primary">{`₹ ${FormatAmount(
                          (data?.total + (data?.tcs || 0)) - data?.amount_paid
                        )}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </main>
      {/* <div className='pb-32'>
        <DownloadApp />
      </div> */}
    </Layout>
  );
}
