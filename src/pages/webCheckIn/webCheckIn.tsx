import React, { useRef, useState } from 'react';
import Header from '../../components/Header/header';
import { useNavigate } from 'react-router-dom';
import { useGetWebCheckInDataMutation } from '../../../src/services/webCheckIn/webCheckIn';
import Modal from '../../components/UI/Modal';
import { Layout } from '../../../src/components/Layout';
import './index.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Button from '../../components/UI/Button';

let uniqueArr: any = []

const years = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => 1950 + i);
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function WebCheckIn() {
    const [bookingId, setBookingId] = useState('');
    const [bookingData, setBookingData] = useState<any>([]);
    const [surname, setSurname] = useState('');
    const [firstName, setFirstname] = useState('');
    const [dob, setDob] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [totalNoGuest, setTotalNoGuest] = useState();
    const [showDateModal, setShowDateModal] = useState(false);
    const [error, setError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [day, setDay] = useState(21);
    const [month, setMonth] = useState("Feb");
    const [year, setYear] = useState(1996);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    // Helper function to handle the scroll snapping and selection
    const handleScroll = (list: any, items: any, setSelected: any) => {
        const center = list.current.getBoundingClientRect().top + list.current.clientHeight / 2;
        let closest = { value: null, distance: Infinity };
        items.forEach((item: any, index: any) => {
            const element = list.current.children[index];
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(center - (rect.top + rect.height / 2));
            if (distance < closest.distance) {
                closest = { value: item, distance };
            }
        });
        setSelected(closest.value);
    };
    const navigate = useNavigate();
    const [getWebCheckInData] = useGetWebCheckInDataMutation();

    const handleCheckIn = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        let v = dob.split('/')
        let date;
        const formattedDob = new Date(dob).toLocaleDateString('en-GB');
        if (dob) {
            date = `${v[0]}-${v[1]}-${v[2]}`
        }
        let _payload = {
            id: bookingId,
            data: {
                name: surname,
                // first_name: firstName, // Assuming bookingId corresponds to first_name; adjust if needed
                dob: date,
                web_checkin: true,
            }
        };
        await getWebCheckInData(_payload)
            .unwrap()
            .then((res: any) => {
                setBookingData(res)
                window.localStorage.setItem("webChekInData", JSON.stringify(res?.data));
                if (res?.message == 'Now select guest to capture documents') {
                    const totalGuests = res?.data?.rooms?.reduce((acc: any, curr: any) => acc + curr.guests.length, 0);
                    navigate('/WebBooking', { state: { data: res.data } });
                    setLoading(false)
                    setTotalNoGuest(totalGuests)
                } else if (res?.message == 'Capture live photo') {
                    const totalGuests = res?.data?.rooms?.reduce((acc: any, curr: any) => acc + curr.guests.length, 0);
                    navigate('/WebBooking', { state: { data: res.data } });
                    setLoading(false)
                    setTotalNoGuest(totalGuests)
                } else if (res?.message == 'Check-in already done for this booking, Please download boarding pass') {
                    const totalGuests = res?.data?.rooms?.reduce((acc: any, curr: any) => acc + curr.guests.length, 0);
                    navigate('/WebBooking', { state: { data: res.data } });
                    setLoading(false)
                    setTotalNoGuest(totalGuests)
                } else if (res?.message == 'Select guest for checkin') {
                    const totalGuests = res?.data?.rooms?.reduce((acc: any, curr: any) => acc + curr.guests.length, 0);
                    setTotalNoGuest(totalGuests)
                    setShow(true)
                } else if (res?.message === "Invalid Booking") {
                    setError(res?.message);
                    setLoading(false)
                    return false
                } else {
                    setError(res?.message);
                    setLoading(false)
                }
                // if (res?.message === "Invalid Booking") {
                //     setError(res?.message);
                //     setLoading(false)
                //     return false
                // }
                // if (res?.status === "success") {
                //     setShow(true)
                //     setLoading(false)
                // } else {
                //     setError(res?.message);
                // }

            })
            .catch((res: any) => {
                console.log('Error: ', res)
                // setError(res?.data?.message);
                let v = res?.data?.message?.includes("Surname");
                let unique = res?.data?.message?.includes("Unique Identity");
                if (v) {
                    setSurnameError(res?.data?.message)
                    setLoading(false)
                } else if (unique) {
                    setError(res?.data?.message);
                    uniqueArr.push(res?.data?.message)
                    setLoading(false)
                }
                else {
                    setError(res?.data?.message);
                    setLoading(false)
                }
            })
    };

    const handleCheck = () => {
        // if(bookingData?.message === 'Check-in already done for this booking, Please download boarding pass'){
        //   navigate('/checkInGuestDetail');
        // }else{
        navigate('/WebBooking', { state: { data: bookingData.data } });
        // }

    }

    const formatDate = (dateStr: any) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        setDob(`${day}/${month}/${year}`)
    };

    console.log('roh jjjjjj', uniqueArr);
    

    return (
        <>
            <Layout  >
                <div className='mt-20 lg:mt-32 lg:mx-40 mx-3' >
                    <div className="flex items-center gap-2">
                        <img
                            onClick={() => navigate('/')}
                            className="h-4 lg:h-5 cursor-pointer"
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                            alt="Back"
                            title="Back"
                        />
                        <h1 className="lg:text-xl text-md font-bold">Web Check-in</h1>
                    </div>

                    <div className=' lg:mt-6' >

                        <div className="bg-gray-50 flex justify-center mb-24 items-center  ">
                            <div className="bg-white w-full mt-4 lg:mt-0 rounded-md lg:p-4 flex flex-col md:flex-row lg:gap-12 relative">

                                <div className="w-full md:w-[382px] flex-shrink-0">
                                    {error ?
                                        <div className='flex flex-wrap gap-3 py-4'>
                                            <div className="lg:col-span-1 col-span-1">
                                                <img className={'h-4'} src={error?.includes("Unique Identity") ?
                                                    'https://images.cordeliacruises.com/cordelia_v2/public/assets/check-in-not-found-icon.svg' :
                                                    'https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg'
                                                } />
                                            </div>
                                            <div className="lg:col-span-10 col-span-9">
                                                <p className='text-[12px] font-bold' >{error}</p>
                                            </div>
                                        </div>
                                        : null}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="bookingId"
                                            value={bookingId}
                                            onChange={(e) => setBookingId(e.target.value)}
                                            className="w-full px-4 lg:py-3.5 py-4 bg-[#f8f8f8] border border-[#f8f8f8] rounded-md focus:outline-none "
                                            placeholder="Booking Id"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="surname"
                                            value={surname}
                                            onChange={(e) => {
                                                setSurname(e.target.value)
                                                setSurnameError('')
                                            }}
                                            className={`w-full px-4 lg:py-3.5 py-4 bg-[#f6f6f1] border ${surnameError ? 'border-danger' : 'border-[#f8f8f8]'} rounded-md focus:outline-none`}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    {surnameError ?
                                        <div className='flex flex-wrap gap-2 items-center'>
                                            <img className='h-5 w-5 ' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                            <p className='text-sm font-semibold' >{surnameError}</p>
                                        </div>
                                        : null}
                                    {/* {uniqueArr?.length >= 1 ?
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                id="surname"
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstname(e.target.value)
                                                }}
                                                className={`w-full px-4 lg:py-3.5 py-4 bg-[#f6f6f1] border border-[#f8f8f8] rounded-md focus:outline-none`}
                                                placeholder="Enter First Name and Middle Name"
                                            />
                                        </div> : null
                                    } */}
                                    {uniqueArr?.length >= 1 ?
                                    <div className="mb-6 " onClick={() => {
                                        // console.log("Clicked!");
                                        // setShowDateModal(!showDateModal);
                                    }}>
                                        <DatePicker
                                            selected={dob ? moment(dob, 'DD/MM/YYYY').toDate() : null}
                                            maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                            onChange={(date) => setDob(moment(date).format('DD/MM/YYYY'))}
                                            placeholderText="Enter DOB"
                                            showIcon
                                            showMonthDropdown
                                            showYearDropdown
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={100}
                                            dateFormat="dd/MM/yyyy"
                                            className="w-full bg-[#f6f6f1] border cursor-pointer border-[#f8f8f8] text-gray-100 rounded-md focus:outline-none"
                                            renderCustomHeader={({
                                                date,
                                                changeYear,
                                                changeMonth,
                                            }) => (
                                                <div className="w-full custom-datepicker-header flex items-center justify-between px-2 py-1">
                                                    <div className="flex space-x-2 w-full">
                                                        <select
                                                            value={moment(date).year()}
                                                            onChange={({ target: { value } }) => changeYear(parseInt(value))}
                                                            className="cursor-pointer bg-white border rounded px-1 w-full"
                                                        >
                                                            {Array.from({ length: 100 }, (_, i) => {
                                                                const year = new Date().getFullYear() - i;
                                                                return (
                                                                    <option key={year} value={year}>
                                                                        {year}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>

                                                        <select
                                                            value={moment(date).month()}
                                                            onChange={({ target: { value } }) => changeMonth(parseInt(value))}
                                                            className="cursor-pointer bg-white border rounded px-1 w-full"
                                                        >
                                                            {moment.months().map((month, index) => (
                                                                <option key={index} value={index}>
                                                                    {month}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        {/* <DatePicker
                                                selected={dob ? moment(dob, 'DD/MM/YYYY').toDate() : null}
                                                maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                                onChange={(date) => setDob(moment(date).format('DD/MM/YYYY'))}
                                                placeholderText='Enter DOB'
                                                showIcon
                                                className='w-full bg-[#f6f6f1] border cursor-pointer border-[#f8f8f8] text-gray-100 rounded-md focus:outline-none focus:none'
                                            /> */}
                                    </div>
                                    : null
                                    }
                                    <div className='mt-7' >
                                        <Button text='Check-In' disabled={(!surname && !bookingId) || !bookingId || !surname} isLoading={loading} handleClick={handleCheckIn} className='w-full' />
                                    </div>

                                    {/* <button
           type="button"
           onClick={handleCheckIn}
           className="w-full px-4 lg:py-3 py-4 bg-[#93288E] text-white rounded-md disabled:bg-brand-primary/60 disabled:cursor-not-allowed font-semibold focus:outline-none focus:ring focus:ring-purple-500"
           disabled={(!surname && !bookingId) || !bookingId || !surname }
         >
           
           {loading ?
                                 <div role="status" className='absolute right-2 top-4'>
                                   <svg aria-hidden="true" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                   </svg>
                                 </div>
                           :  'Check-In'  }
         
         </button> */}
                                    {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                                    {/* {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>} */}
                                </div>
                                <div className="w-full md:w-[700px] lg:mt-4 mt-4 ml-0 md:ml-12 pb-4 lg:pb-48">
                                    <p className="lg:text-lg text-md font-bold mb-4">Important Notes</p>
                                    <ul className="list-disc lg:text-[13px] text-[14px] px-3 space-y-2">
                                        <li className="ml-4">
                                            Web Check In is mandatory for all the guest as per the regulatory compliance by the Government of India.
                                        </li>
                                        <li className="ml-4">
                                            Pregnant women are only allowed to sail if pregnant for 24 completed weeks or less at the time of cruise disembarkation.
                                        </li>
                                        <li className="ml-4">
                                            The infant must have an ID with a photo, also authorization of either parent if travelling with only one parent.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal
                    show={show}
                    align={'center'}
                    className="drop-shadow bg-white w-[90%]  lg:w-[31%] center  lg:top-[15%] lg:bottom-1/6 lg:left-1/3 left-4 lg:h-auto rounded-xl lg:rounded-lg border mt-40 lg:mt-20"
                    onClose={() => setShow(false)}
                >
                    <div
                        className="flex justify-end mx-4  items-center"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        <div className=" mt-4 ml-3 font-bold cursor-pointer">
                            <p>X</p>{/* <img src='https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/cordelia_v2/public/assets/back-arrow-icon.svg' alt='backIcon' /> */}
                        </div>
                    </div>
                    <div className="text-center lg:px-6 px-4">
                        <p className="px-2 text-gray-100 text-lg">
                            Sorry, we couldn’t pinpoint your exact identity, but don't worry we’ve narrowed it down to {totalNoGuest} identities . Please make sure to select the right one.
                        </p>
                    </div>
                    <div className='px-8 lg:my-8 my-6' >
                        <button
                            type="button"
                            onClick={handleCheck}
                            className="w-full px-4 lg:py-3 py-4 bg-[#93288E] font-semibold text-white rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                        >Continue
                        </button>
                    </div>
                </Modal>
                <Modal
                    show={showDateModal}
                    align={'center'}
                    className="drop-shadow bg-white w-[90%]  lg:w-[23%] center lg:top-[15%] lg:bottom-1/6
         lg:left-[38%] left-4 lg:h-[52%] rounded-xl lg:rounded-lg border mt-40 lg:mt-20"
                    onClose={() => setShowDateModal(false)}
                >
                    <div className=" p-4 relative">
                        <p className="text-xl font-bold mb-4 ">{new Date(`${day}/${month}/${year}`).toLocaleDateString('en-US', { weekday: 'short' })}, {day} {month}, {year}</p>
                        <div className="flex space-x-2">
                            {/* Days */}
                            <div className="flex flex-col w-[30%] items-center relative">
                                <div className='h-[54px] w-[5rem] absolute bottom-[55px] border-y border-black' />

                                <div className="h-40 overflow-hidden relative center-highlight">
                                    <div
                                        ref={dayRef}
                                        className="hide-scrollbar h-full overflow-y-scroll snap-y snap-mandatory"
                                        onScroll={() => handleScroll(dayRef, days, setDay)}
                                    >
                                        {days.map((d) => (
                                            <div
                                                key={d}
                                                className={`p-2 my-3 cursor-pointer snap-center text-center ${d === day ? "font-bold" : ""}`}
                                            >
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Months */}
                            <div className="flex flex-col w-[30%] items-center relative">
                                <div className='h-[54px] w-[5rem] absolute bottom-[55px] border-y border-black' />
                                <div className="h-40 overflow-hidden relative center-highlight">
                                    <div
                                        ref={monthRef}
                                        className="hide-scrollbar h-full overflow-y-scroll snap-y snap-mandatory"
                                        onScroll={() => handleScroll(monthRef, months, setMonth)}
                                    >
                                        {months.map((m) => (
                                            <div
                                                key={m}
                                                className={`p-2 my-3 cursor-pointer snap-center text-center ${m === month ? " font-bold" : ""}`}
                                            >
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Years */}
                            <div className="flex flex-col w-[30%] items-center relative">
                                <div className='h-[54px] w-[5rem] absolute bottom-[55px] border-y border-black' />
                                <div className="h-40 overflow-hidden relative center-highlight">
                                    <div
                                        ref={yearRef}
                                        className="hide-scrollbar h-full overflow-y-scroll snap-y snap-mandatory"
                                        onScroll={() => handleScroll(yearRef, years, setYear)}
                                    >
                                        {years.map((y) => (
                                            <div
                                                key={y}
                                                className={`p-2 my-3 cursor-pointer snap-center text-center ${y === year ? " font-bold" : ""}`}
                                            >
                                                {y}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button text='Cancel' size='sm' type='secondary' handleClick={() => setShowDateModal(false)} className='mr-2 w-42' />
                            <Button text='Set' size='sm' handleClick={() => {
                                formatDate(`${day}/${month}/${year}`);
                                setShowDateModal(!showDateModal)
                            }} className='w-42' />
                        </div>

                    </div>
                </Modal>
            </Layout>
        </>
    );
}