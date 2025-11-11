import React, { useEffect, useState } from 'react';
import { useGetMyBookingsDataMutation } from '../../../services/profile/profile';
import CruiseCard from './cruiseCard';

export default function Bookings(props: { bookingType: any, setLoading: any }) {

  const [allbookingData, setAllBookingData] = useState<any>([]);

  let leadId: any = JSON.parse(localStorage.getItem('auth'))
  const [getMyBookingsData] = useGetMyBookingsDataMutation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const getBookingDataa = async () => {
    props.setLoading(true)
    await getMyBookingsData(leadId?.lead_id)
      .unwrap()
      .then((res: any) => {
        setAllBookingData(res)
        props.setLoading(false)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }
  useEffect(() => {
    getBookingDataa();
  }, [])
  const bookingData = allbookingData[props.bookingType]

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="flex flex-wrap justify-between mt-10 items-center">
        <p className='text-lg font-semibold text-gray-100' >Your {props.bookingType == 'upcoming_bookings' ? 'Upcoming' : props.bookingType == 'completed_bookings' ? 'Completed' : props.bookingType == 'cancelled_bookings' ? 'Cancelled' : null} Bookings ({bookingData?.length < 10 ? `0${bookingData?.length}` : bookingData?.length})</p>
        {/* <div className='flex flex-wrap items-center gap-2 cursor-pointer '>
          <p className='text-lg font-bold'>Sort by</p>
          <img src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt='down_arrow' />
        </div> */}
      </div>
      {
        bookingData?.map((data: any, index: number) => {
          return (
            <CruiseCard data={data} bookingData={bookingData} />
          )
        })
      }
    </div>
  );
}
