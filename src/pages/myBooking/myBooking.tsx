
import Select from 'react-select';
import { Layout } from '../../components/Layout';
import Banner from './component/banner';
import { useEffect, useState } from 'react';
import Bookings from './component/bookings';


export default function MyBooking() {
  const [bookingType, setBookingType] = useState<any>('upcoming_bookings');
  const [loading, setLoading] = useState<any>(false);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      {loading ?
        <div className='h-screen w-full flex justify-center items-center overflow-hidden absolute top-0 bottom-0 left-0 bg-black/80 z-50'>
          <img
            className='w-32 lg:w-44'
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
            alt=""
          />
        </div> : null
      }
      <section className="lg:mb-28">
        <div className="relative lg:mt-[100px] mt-14 flex flex-wrap justify-center h-30 inline-block">
          {window.innerWidth > 640 ? <img
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/booking-banner-desktop.webp"
            alt="img"
            className=""
          /> : <img
            className=''
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/booking-banner-mobile.webp"
            alt=""
          />}
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
            <span className="text-2xl font-bold">
              My Bookings
            </span>
          </div>
        </div>
        <div className='flex flex-wrap justify-center mt-10 lg:gap-5 gap-1' >

          <a onClick={() => setBookingType('upcoming_bookings')} className={` ${bookingType === 'upcoming_bookings' ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-400 text-gray-200'} cursor-pointer  lg:inline-block rounded-sm py-3 font-semibold lg:px-8 px-5 lg:text-md text-sm`} >Upcoming</a>

          <a onClick={() => setBookingType('completed_bookings')} className={` ${bookingType === 'completed_bookings' ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-400 text-gray-200'} cursor-pointer  lg:inline-block rounded-sm py-3 font-semibold lg:px-8 px-5 lg:text-md text-sm`}>Completed</a>

          <a onClick={() => setBookingType('cancelled_bookings')} className={` ${bookingType === 'cancelled_bookings' ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-400 text-gray-200'} cursor-pointer  lg:inline-block rounded-sm py-3 font-semibold lg:px-8 px-5 lg:text-md text-sm`}>Cancelled</a>

        </div>
        <Bookings bookingType={bookingType} setLoading={setLoading} />
      </section>
    </Layout>
  );


}
