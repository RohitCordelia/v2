import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormatAmount, FormatPrice, FormatToString } from '../../../src/utils/formatter/formatter';
import { useCabinCancellationMutation, useCancelBookingMutation } from '../../../src/services/profile/profile';
import Modal from '../../components/UI/Modal';

interface Cabin {

}

const RefundStatus: React.FC = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const {type, res } = location.state || {};
console.log(res)
  const [view, setView] = useState(false);
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  let booking: any = JSON.parse(localStorage.getItem('getBooking'));
  let bookingRoute: any = JSON.parse(localStorage.getItem('myBooking'));
  const [cancelBooking] = useCancelBookingMutation();
  const [cabinCancellation] = useCabinCancellationMutation();
 
  const steps = [
    { name: "Initiated",title:'Cordelia Initiated your refund', date: "25 Jun, 2024" },
    { name: "Processed",title:'Your bank has processed your refund',date: "26 Jun, 2024" },
    { name: "Credited", title:'Refund credited to your account', date: "27 Jun, 2024" },
  ];

console.log('booking : ',booking)
  console.log('res ==== ', res?.cabin_fares)

  // const { type } = location.state || {};
  console.log('booking - ', bookingData)
  const selectGuest = (id: any) => {
    console.log(id)
    navigate(`/manage-booking/guest-detail`, { state: { id } });

  }
  const selectCabin = (id: any) => {
    console.log(id)
    navigate(`/manage-booking/select-cabin`, { state: { id } });
  }



  return (
    <Layout>
      <div className="mb-28 lg:mt-28 mt-20 px-4 lg:px-[170px]">
        <div className="flex items-center justify-between cursor-pointer">
         
          <p className="text-xl font-bold lg:text-xl ">
          Refund Status
          </p>
          <p className="text-md font-semibold cursor-pointer underline text-brand-blue lg:text-lg ">
            Help
          </p>
        </div>
        
        <div className="flex border-gray-300 items-center gap-3 mt-5">
        <div className="">
                    <img
                      className="lg:w-[160px] w-[120px] h-[100px] rounded-md"
                      src={bookingRoute[0]?.image}
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col gap-2 lg:text-[18px] text-md">
                    <p className='font-bold' >{bookingRoute[0]?.route} </p>
                    <p className='font-semibold text-gray-200' >Booking ID: {bookingRoute[0]?.booking_number} </p>
                  </div>
                  
                </div>
         <div className='py-4 px-5 mt-8 shadow-allSide'>
         <div className="flex items-center justify-between cursor-pointer">
         
         <p className="text-md font-bold text-gray-200 lg:text-lg ">
         Refund Method
         </p>
         <div className='flex flex-wrap gap-2'> 
            <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-refund-icon.svg' />
             <p className="text-md font-bold  text-brand-green lg:text-md ">
         Completed
         </p> </div>
       </div >
       <div className='border-b border-gray-300 pt-3 pb-5' >
        <div className='flex flex-wrap gap-4' >
        <div className='flex gap-1' >
            <p className='text-sm  font-bold'  >To:</p>
            <img
          className="h-[22px]"
          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/mastercard-logo.svg"
          alt=""
        />
            <p className='text-gray-100 font-semibold text-sm' >Card (xxxx-2333)</p>
        </div>
        <div className='flex gap-1' >
            <p className='text-sm  font-bold'  >Expected by:</p>
         
            <p className='text-gray-100 font-semibold text-sm' >25 Jun, 2024</p>
        </div>
            </div>
          
       </div>
       <div className='py-4'>
         <div className="flex items-center justify-between cursor-pointer">
         
         <p className="text-md font-bold text-gray-200 lg:text-lg ">
         Refund Status
         </p>
        
       </div >
       <div className=' pt-3 pb-5' >
       <div className="w-full">
   
 <div className='relative mt-4 max-w-[75%]' >
 <div className="flex items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`h-[3px] ${
              currentStep >= index + 1 ? "bg-brand-green" : "bg-gray-300"
            } ${index !== steps.length - 1 ? "w-full" : ""}`}
          />
        ))}
      </div>
      <div className='absolute w-full top-[-8px]' >
      <div className="flex items-center  justify-between  mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-[18px] h-[18px] flex items-center justify-center ${
                currentStep >= index + 1
                  ? "bg-brand-green text-white"
                  : "bg-gray-300 text-white"
              } rounded-full`}
            >
              {currentStep > index + 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span></span>
              )}
            </div>
          
          </div>
        ))}
        </div>
      </div>
      
 </div>
 
      <div className="flex items-center justify-between lg:mr-9 mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
           
            <div className="mt-5">
              <div className="text-sm font-bold">{step.title}</div>
              <div className="text-sm mt-3 text-gray-200">{step.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
       </div>
         </div>
         </div>
       
        
       

      </div>
    
    </Layout>
  );
};

export default RefundStatus;