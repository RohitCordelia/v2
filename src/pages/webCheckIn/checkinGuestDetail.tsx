import React, { useEffect, useState } from 'react';
import './index.css'
import { Layout } from '../../components/Layout';
import TravelInfo from './components/travelInfos';
import HealthForm from './components/healthFom';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardingPass from './components/boardingPass';
export default function CheckinGuestDetail() {
  // const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [guestData, setGuestData] = useState<any>();

  const location = useLocation();

  const { data, cabin, error, currentStep } = location.state || {};
  
  const navigate = useNavigate()
  let bookingData = JSON.parse(window.localStorage.getItem('webChekInData'))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const steps = [
    { name: "Guest Verification", title: 'Guest Verification' },
    // { name: "Health Form", title: 'Health Form' },
    { name: "Boarding Pass", title: 'Boarding Pass' },
  ];
  // useEffect(()=>{
  //   let _payload = {
  //     id: bookingId,
  //     data: {
  //       last_name: surname,
  //       first_name: '', // Assuming bookingId corresponds to first_name; adjust if needed
  //       dob: '',
  //       web_checkin: true,
  //     }
  //   };
  //   await getWebCheckInData(_payload)
  //     .unwrap()
  //     .then((res: any) => {
  //       setBookingData(res)
  //       if(res?.status === "success"){
  //         setShow(true)
  //       }else{
  //       setError(res?.message);
  //       }
  //     })
  //     .catch((res: any) => {
  //       console.log('Error: ', res)
  //       setError(res?.data?.message);
  //     })
  //})
  // useEffect(() => {
  //   setCompleted(currentStep - 1)
  //   // if(bookingData?.message === 'Check-in already done for this booking, Please download boarding pass'){
  //   //   setCurrentStep(3);
  //   // }
  // }, [])
  
  const CheckInStep = () => {
    switch (currentStep) {
      case 1:
        return (<TravelInfo guestData={data} bookingData={bookingData} idError={error} />)
      // case 2:
      //   return (<HealthForm guestData={data} bookingData={bookingData} />)
      case 2:
        return (<BoardingPass guestData={data} />)
      default:
        return null;
    }
  }

  useEffect(() => {
    if (!data.web_checkin_done) return;

    for (let room of bookingData.rooms) {
        let guest = room.guests.find((g:any) => g.id === data.id);

        if (guest) {
            if (guest.web_checkin_done !== data.web_checkin_done) {
                guest.web_checkin_done = data.web_checkin_done;
            }
            return;
        }
    }
  }, [location.state])
  
  return (
    <>
      <Layout >
        <div className="lg:mt-28 mt-16 bg-gray-50 lg:mx-40 mx-4 mb-40 ">
          <div className="bg-white w-full rounded-md py-4 m-0 lg:mx-4 flex flex-col md:flex-row gap-12 cursor-pointer" onClick={() => navigate('/WebBooking', {state: {data: bookingData}})}>
            <div className=" top-4 left-4 flex items-center gap-3" >
              <img
                className=""
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                alt="Back"
                title="Back"
              />
              <h1 className="text-xl md:text-2xl font-bold">Cabin {cabin}: {data?.name}</h1>
            </div>
          </div>
          <div className=' mt-12' >
            <div className='relative mt-4 lg:max-w-[63%] max-w-[86%] m-[auto]' >
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`h-[1px] ${currentStep >= index + 1 ? "bg-brand-green" : "bg-gray-300"
                      } ${index !== steps.length - 1 ? "w-full" : ""}`}
                  />
                ))}
              </div>
              <div className='absolute w-full top-[-22px]' >
                <div className="flex items-center  justify-between  mb-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className='relative bg-white rounded-full p-6' >
                        <div className='absolute top-[10px] right-[9px] ' >
                          <div
                            className={` relative w-[28px] h-[28px] flex items-center justify-center ${currentStep >= index + 1
                              ? "bg-brand-green text-white"
                              : "bg-gray-300 text-white"
                              } rounded-full`}
                          >
                            {currentStep >= index + 1 ? <div className='p-[5px] bg-white rounded-full absolute' /> : null}
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between lg:max-w-[69%] m-[auto]  mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="mt-5">
                    <div className={`lg:text-sm text-xs font-medium mt-2 ${currentStep !== index + 1 ? "text-gray-100" : ""}`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {CheckInStep()}
        </div>
      </Layout >
    </>
  );
}