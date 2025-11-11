import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Layout } from '../../components/Layout';
import { useGetViewItineraryMutation, useAvailableCabinMutation, useCabinPricingMutation } from '../../services/profile/profile';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';
import { ADD_ADULT, ADD_CHILDREN, ADD_INFANT, ADD_ROOM, REMOVE_ROOM } from '../../constants/itineraryConstants';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSendOTPMutation, useVerifyOTPMutation } from '../../../src/services/auth/auth';
import { GetAuth, SaveAuth, SaveContact } from '../../../src/utils/store/store';
import Select from "react-select";

import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import { Input } from '../../components/UI/Forms/Inputs';
import OtpInput from 'react18-input-otp';
import { Phone } from '../../../src/utils/validations/formValidations';
import { useForm } from 'react-hook-form';
import Button from '../../components/UI/Button';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

type Props = {}

const count = [
    {
        number: 0
    },
    {
        number: 1
    },
    {
        number: 2
    },
    {
        number: 3
    },
    {
        number: 4
    }
]

const customStyles = {
    control: (styles: any, { isDisabled }: any) => ({
        ...styles,
        backgroundColor: isDisabled ? 'rgb(232, 240, 254)' : '#f5f5f5',
        height: '48px', border: 0
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        zIndex: 999
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '300px',
        zIndex: 9999
    }),
    menuPortal: (base: any) => ({
        ...base, zIndex: 9999
    })
};

export default function SelectCabin({ }: any) {
    const [getViewItinerary] = useGetViewItineraryMutation()
    const [availableCabinMutation] = useAvailableCabinMutation()
    const [cabinPricing] = useCabinPricingMutation()
    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const AUTH = GetAuth();
    const TIMER_DURATION = 30
    const END_TIMER = 0
    const currentUrl = window.location.href;

    let navigate = useNavigate()
    let bookingRoute:any = JSON.parse(localStorage.getItem('myBooking'));

    const itineraryId = bookingRoute[0]?.itinerary_id
    // new window.URLSearchParams(window.location.search).get('id');

    const [isLoading, setIsLoading] = useState<any>();
    const [isLoading1, setIsLoading1] = useState<any>();
    const [priceLoading, setPriceLoading] = useState<any>(false);
    const [itineraryData, setItineraryData] = useState<any>();
    const [cabinData, setCabinData] = useState<any>();
    const [amenitiesModal, setAmenitiesModal] = useState<any>(false);
    const [activeAmenities, setActiveAmenities] = useState<any>();
    const [amenitiesImage, setAmenitiesImage] = useState<any>([]);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [timer, setTimer] = useState<number>(30);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [country, setCountry] = useState('+91');
    const [selectedCabinDetail, setSelectedCabinDetail] = useState<any>([]);
    const [totalGuest, setTotalGuest] = useState<any>();
    const [totalPrice, setTotalPrice] = useState<any>();
    const [actualTotalPrice, setActualTotalPrice] = useState<any>();
    const [otpReqId, setOtpReqId] = useState<any>();
    console.log(totalGuest)
    console.log(cabinData)
    useEffect(()=>{
        localStorage.setItem('cabinData',JSON.stringify(cabinData));
    })
    console.log(selectedCabinDetail)
    useEffect(() => {
        const _payload = {
            itinerary_id: itineraryId
        }
        setIsLoading(true)
        getViewItinerary(_payload)
            .unwrap()
            .then((res: any) => {
                setItineraryData(res)
                setIsLoading(false)
            })
            .catch((res: any) => {
                setIsLoading(false)
                console.log('Error: ', res)
            })
    }, [])

    useEffect(() => {
        setIsLoading1(true)
        const _payload = {
            itinerary_id: itineraryId
        }
        availableCabinMutation(_payload)
            .unwrap()
            .then((res: any) => {
                setCabinData(res)
                setIsLoading1(false)
            })
            .catch((res: any) => {
                setIsLoading1(false)
                console.log('Error: ', res)
            })
    }, [])

    useEffect(() => {
        if (activeAmenities) {
            const newArray = activeAmenities.images.map((url: any) => ({
                original: url,
                thumbnail: url
            }));
            setAmenitiesImage(newArray);
        }
    }, [activeAmenities])

    const handleEditPhone = () => {
        setShowOTP(false)
        setOtp("")
    }

    const {
        setError,
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            phone_number: "",
            otp: ""
        }
    });

    const onSubmitOTP = (data: any) => {
        setPhoneNumber(data.phone_number);
        const _payload = { phoneNumber: data.phone_number, countryCode: country };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTP(true);
                setOtpReqId(response?.result?.requestId);
            })
            .catch((response) => {
                setError('phone_number', { type: 'custom', message: 'Failed to send OTP' });
            })
    }

    const resendOTP = () => {
        setTimer(TIMER_DURATION);
        onSubmitOTP({ phone_number: phoneNumber })
    }

    const onVerifyOTP = () => {
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()
        const _payload = {
          otp: otp,
          website: cleanedUrl,
          requestId: otpReqId,
          sessionTime: sessionTime
        };
        verifyOtp(_payload)
            .unwrap()
            .then((response) => {
                sessionStorage.removeItem("_st");
                const resData = {
                    exp: response?.result?.exp,
                    is_profile_completed: response?.result?.isProfileCompleted,
                    lead_id: response?.result?.leadId,
                    token: response?.result?.token,
                    refreshToken: response?.result?.refreshToken
                }
                setShowPhoneModal(false);
                SaveAuth(resData)
                SaveContact({ phone: phoneNumber })
            })
            .catch((response) => {
                setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
    }

    const CountDropdown = ({
        add,
        type,
        index,
        onPaxChange = () => { }
    }: any) => {
        const [open, setOpen] = useState(false);
        return (
            <div className='shadow-sm rounded w-[100%]'>
                <div className="font-medium relative">
                    <div
                        onClick={() => setOpen(!open)}
                        className={`bg-gray-400 w-full px-4 flex items-center text-sm lg:text-lg  py-2 justify-between rounded }`}
                    >
                        {type
                            ? type
                            : 0}
                        <img className={`h-2 lg:h-2.5 ${open ? 'rotate-180' : ''}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                    </div>
                    <ul
                        className={`bg-white absolute border border-gray-300 rounded shadow-md w-full z-10 mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0 hidden"
                            } `}
                    >
                        {count?.map((item: any, key: any) => (
                            <li
                                key={key}
                                className={`p-2 text-sm ${item?.number === type ? "bg-gray-400" : 'black'}`}
                                onClick={() => {
                                    onPaxChange(item?.number)
                                    setOpen(false)
                                }}
                            >
                                {item?.number}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    const selectCabin = (cabinIndex: any) => {
        const updatedFirstIndex = {
            ...cabinData[cabinIndex], rooms: [
                {
                    adults: 0,
                    children: 0,
                    infants: 0,
                    seq_no: 1,
                }
            ],
            selected: ""
        };
        const updatedCabinData = [
            ...cabinData.slice(0, cabinIndex),
            updatedFirstIndex,
            ...cabinData.slice(cabinIndex + 1),
        ];
        setCabinData(updatedCabinData);
    }

    const fetchCabinPrice = () => {
        // setPriceLoading(true)
        const newArray = cabinData?.map((item: any) => {
            if (item.rooms) return {
                category_code: item.code,
                rooms: item.rooms
            }
        }).filter((item: any) => item != null);

        const _payload = {
            itinerary_id: itineraryId,
            data: newArray
        };

        cabinPricing(_payload)
            .unwrap()
            .then((res: any) => {
                let totalPrice = 0;
                let actualTotalPrice = 0;
                let totalGuest = 0;
                let cabin = []

                for (const group of res.pricings) {
                    totalGuest += (group.adults + group.children + group.infants);
                    for (const pricing of group.pricings) {
                        totalPrice += pricing.total;
                        actualTotalPrice += pricing.actual_total;
                    }
                    cabin.push({
                        cabinName: group.pricings[0].name,
                        totalGuest: (group.adults + group.children + group.infants)
                    })
                }
                setSelectedCabinDetail(cabin)
                setTotalGuest(totalGuest)
                setTotalPrice(totalPrice)
                setActualTotalPrice(actualTotalPrice)
                console.log('roh price', res, totalGuest, totalPrice, cabin);
            // setSelectedRooms(JSON.parse(JSON.stringify(res.pricings)))
            })
            .catch((res: any) => {
                console.log('Error: ', res)
            })
        setPriceLoading(false);
    }

    const onRoomChange = (type: string, index: any, roomIndex: any, val: any) => {
        const newCabinDate = [...cabinData];
        let selectedCabin = newCabinDate[index];
        switch (type) {
            case ADD_ROOM:
                selectedCabin.rooms.push({
                    adults: 0,
                    children: 0,
                    infants: 0,
                    seq_no: selectedCabin.rooms.length + 1,
                });
                setCabinData(newCabinDate)
                break;

            case REMOVE_ROOM:
                if (newCabinDate[index] && newCabinDate[index].rooms.length > roomIndex) {
                    newCabinDate[index].rooms.splice(roomIndex, 1);
                }
                setCabinData(newCabinDate)
                fetchCabinPrice()
                break;

            case ADD_ADULT:
                selectedCabin.rooms[roomIndex].adults = val
                setCabinData(newCabinDate)
                fetchCabinPrice()
                break;

            case ADD_CHILDREN:
                selectedCabin.rooms[roomIndex].children = val
                setCabinData(newCabinDate)
                fetchCabinPrice()
                break;

            case ADD_INFANT:
                selectedCabin.rooms[roomIndex].infants = val
                setCabinData(newCabinDate)
                fetchCabinPrice()
                break;

            default:
                break;
        }
    }

    const checkLogin = (index: any) => {
        if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {
            selectCabin(index)
        } else {
            setShowPhoneModal(true);
            setTimer(TIMER_DURATION);
        }
    }

    const CabinCard = ({ cabin, index }: any) => {
        // console.log('roh cabin', cabin.rooms);

        return (
            <div className='border-gray-400 shadow-allSide rounded-lg mb-3  px-2 py-2'>
                <div className='grid grid-cols-5'>
                    <div className='col-span-5 lg:col-span-2'>
                        <img className='rounded w-full h-[180px] lg:h-full' src={cabin.images[0]} alt="" />
                    </div>
                    <div className='col-span-5 lg:col-span-3 pl-2 lg:pl-4 pr-2 lg:pr-0 py-2'>
                        <div className=' grid grid-cols-3 '>
                            <div className='col-span-2'>
                                <p className='text-base lg:text-lg font-semibold'>{cabin.name}</p>
                                <p className='text-xs lg:text-sm mt-1 font-light text-gray-100'>{cabin.description.split(' ').slice(0, 8).join(' ')}... <span className='text-brand-primary cursor-pointer'>Read More</span></p>
                                <div className='flex items-center mt-2'>
                                    <img className='h-+ mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/max-capacity-icon.svg" alt="" />
                                    <p className='text-xs font-medium'>Max Capacity: {cabin.max_capacity} Guests</p>
                                </div>
                            </div>
                            <div className='text-right'>
                                {cabin.discount_pct != 0 ?
                                    <div className='flex items-center justify-end'>
                                        <p className='line-through text-xs mr-1 font-medium'>₹ {cabin.actual_per_guest_per_night}</p>
                                        <div className='relative'>
                                            <img className='h-[18px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/offertag-booking-icon.svg" alt="" />
                                            <p className='text-[10px] absolute top-[2px] right-[3px] text-white'>10% off</p>
                                        </div>
                                    </div>
                                    : null
                                }
                                <p className='text-xl font-bold'>₹ {cabin.per_guest_per_night}</p>
                                <p className='text-xxs'>Per Person</p>
                                <p className='text-xxs mt-1'>Excl. GST charges</p>
                            </div>
                        </div>
                        {cabin.rooms && cabin.rooms.length ? null :
                            <div className='flex justify-between items-center mt-4'>
                                <p onClick={() => {
                                    setActiveAmenities(cabin)
                                    setAmenitiesModal(true)
                                }} className='text-xs lg:text-sm text-brand-blue underline underline-offset-2 font-medium cursor-pointer'>View Amenities</p>
                                <button onClick={() => checkLogin(index)} className='border-1 border-brand-primary px-6 py-2.5 text-xs font-semibold rounded text-brand-primary'>Choose Cabin</button>
                                <Button text='Choose Cabin' size='sm' type='secondary' handleClick={() => checkLogin(index)} />
                            </div>
                        }
                    </div>
                </div>
                {cabin.rooms ?
                    <>
                        {cabin.rooms.map((val: any, roomIndex: any) => (
                            <div className='border border-gray-300 mt-5 mb-3 mx-1.5 lg:mx-3 rounded'>
                                <div className='flex justify-between py-4 border-b border-gray-300 px-4'>
                                    <p className='text-sm lg:text-lg font-semibold'>Cabin {roomIndex + 1}</p>
                                    {cabin.rooms.length == roomIndex + 1 ?
                                        <div className='cursor-pointer' onClick={() => onRoomChange(ADD_ROOM, index, null, null)}>
                                            <p className='text-xs lg:text-sm text-brand-primary font-medium'>Add New Cabin</p>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className='grid grid-cols-3 gap-2 lg:gap-4 px-2 lg:px-4 py-4'>
                                    <div>
                                        <p className='text-sm lg:text-lg mb-1'>Adults</p>
                                        <p className='text-xxs lg:text-base text-gray-100 font-light mb-4'>12 Years & Above</p>
                                        <CountDropdown add={ADD_ADULT} type={val.adults} index={index} onPaxChange={(val: any) => onRoomChange(ADD_ADULT, index, roomIndex, val)} />
                                    </div>
                                    <div>
                                        <p className='text-sm lg:text-lg mb-1'>Childrens</p>
                                        <p className='text-xxs lg:text-base text-gray-100 font-light mb-4'>2 Years - 12 Years</p>
                                        <CountDropdown add={ADD_CHILDREN} type={val.children} index={index} onPaxChange={(val: any) => onRoomChange(ADD_CHILDREN, index, roomIndex, val)} />
                                    </div>
                                    <div>
                                        <p className='text-sm lg:text-lg mb-1'>Infants</p>
                                        <p className='text-xxs lg:text-base text-gray-100 font-light mb-4'>1 Year - 2 Years</p>
                                        <CountDropdown add={ADD_INFANT} type={val.infants} index={index} onPaxChange={(val: any) => onRoomChange(ADD_INFANT, index, roomIndex, val)} />
                                    </div>
                                </div>
                                {cabin.rooms.length == roomIndex + 1 ?
                                    <div className='flex justify-end px-4 py-4 bg-gray-100/10'>
                                        <div className='cursor-pointer' onClick={() => onRoomChange(REMOVE_ROOM, index, roomIndex, null)}>
                                            <p className='text-xs lg:text-sm font-light'>Remove Cabin</p>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        ))}
                    </>
                    : null
                }
            </div>
        )
    }

    console.log('roh active', cabinData, itineraryData);

    return (
        <Layout>
            {isLoading || isLoading1 ?
                <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/80 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            <main className='pt-[53px] pb-24 lg:pt-[70px] lg:pb-36'>
                <div className='container mx-auto px-4 lg:px-9 mt-8'>
                    <div>
                        <div className="flex items-center">
                            <img
                                src="assets/icons/footer/chevon-down.svg"
                                alt="arrow"
                                onClick={() => navigate('/offers')}
                                className={`self-center justify-self-start mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 mb-2 lg:hidden`}
                            />
                            <p className="text-xl font-semibold mb-3 lg:text-3xl">
                                Select Cabin
                            </p>
                        </div>

                        <div className='grid grid-cols-3 gap-6'>
                            <div className="col-span-3 lg:col-span-2 mb-4">
                                {cabinData && cabinData?.map((val: any, i: any) => (
                                    <CabinCard cabin={val} index={i} />
                                ))}
                            </div>

                            <div className='hidden lg:block'>
                                <div className='fixed lg:sticky top-32 pb-4'>
                                    <div className='border-gray-400 shadow-allSide rounded-lg mb-4 px-4'>
                                        <div className='flex flex-wrap py-6'>
                                            {itineraryData?.ports.map((val: any, i: any) => {
                                                if (val.name != 'At Sea')
                                                    return (
                                                        <p className='text-base font-bold'>{val.name}{itineraryData.ports.length != (i + 1) ? <span>-</span> : null} </p>
                                                    )
                                            })}
                                            <p className='text-base font-bold text-brand-primary ml-1'>({itineraryData?.nights}N/{itineraryData?.nights - 1}D)</p>
                                        </div>
                                        <div className='border-t border-gray-300 w-full' />
                                        <div className='flex items-start justify-between py-6'>
                                            <div className='text-center'>
                                                <p className='text-xs lg:text-base  font-bold'>{moment(itineraryData?.start_date, 'ddd, DD MMM').format('ddd, DD MMM')}</p>
                                                <p className='text-xs text-gray-100 font-semibold'>
                                                    {moment(itineraryData?.ports[0].departure, 'ddd, DD MMM HH:ss A').format('dddd hh:ss A')}
                                                </p>
                                            </div>
                                            <div className='w-[30%] text-center relative -mt-[5px] lg:-mt-[3px]'>
                                                <p className='text-gray-200 whitespace-nowrap overflow-hidden'>-------------</p>
                                                <img className='absolute h-7'
                                                    style={{
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)'
                                                    }}
                                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                                                />
                                            </div>
                                            <div className='text-center'>
                                                <p className='text-xs lg:text-base  font-bold'>{moment(itineraryData?.end_date, 'ddd, DD MMM').format('ddd, DD MMM')}</p>
                                                <p className='text-xs text-gray-100 font-semibold'>
                                                    {moment(itineraryData?.ports[itineraryData?.ports.length - 1].arrival, 'ddd, DD MMM HH:ss A').format('dddd hh:ss A')}
                                                </p>
                                            </div>
                                        </div>
                                        {selectedCabinDetail && totalPrice && totalGuest ? (
                                            <>
                                                <div className='border-t border-gray-300 w-full' />
                                                <div className='flex py-6 justify-between'>
                                                    <div>
                                                        <div className='flex items-center'>
                                                            <div className='w-[40px] flex items-center justify-center'>
                                                                <img className='mr-2 w-4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg" alt="" />
                                                            </div>
                                                            <p className='text-sm font-semibold'>{selectedCabinDetail.length} Cabin</p>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <div className='w-[40px] flex items-center justify-center'>
                                                                <img className='mr-2 w-6' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guests-icon.svg" alt="" />
                                                            </div>
                                                            <p className='text-sm font-semibold'>{totalGuest} Guests</p>
                                                        </div>
                                                    </div>
                                                    <div className='text-right'>
                                                        <div className='flex items-center'>
                                                            {itineraryData?.discount_pct != 0 ? <p className='text-xs text-gray-100 font-semibold line-through mr-2'>₹{actualTotalPrice}</p> : null}
                                                            <p className='text-xl font-semibold'>₹{totalPrice}</p>
                                                        </div>
                                                        <p className='text-xs text-gray-100 mt-1'>Excl. GST charges</p>
                                                        <p className='text-xs text-brand-green font-medium mt-1'>Discount Applied</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Modal show={amenitiesModal} align={'center'} className=" w-[90%] lg:w-3/4 center overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[80%] relative" onClose={() => {
                setAmenitiesModal(false)
                setActiveAmenities('')
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setAmenitiesModal(false)
                        setActiveAmenities('')
                    }}>X</p>
                </div>
                {activeAmenities &&
                    <div className='overflow-scroll h-[90%] lg:h-[85%]  px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded'>
                        <div className='w-[55%] hidden lg:block'>
                            <ImageGallery
                                items={amenitiesImage}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                autoPlay={true}
                                slideInterval={5000}
                                thumbnailPosition={'bottom'}
                                startIndex={0}
                                lazyLoad={true}
                            />
                        </div>
                        <div className='w-full lg:w-[45%] '>
                            <div className='text-left px-2 lg:px-8 py-2 lg:py-6'>
                                <p className='text-lg lg:text-2xl font-semibold font-outfit'>{activeAmenities?.name}</p>
                                <p className='font-outfit mt-2 lg:mt-3 text-xs lg:text-base lg:leading-6 text-gray-600'>{activeAmenities?.description}</p>
                                <div className='w-full mt-3 lg:hidden'>
                                    <ImageGallery
                                        items={amenitiesImage}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        autoPlay={true}
                                        slideInterval={5000}
                                        startIndex={0}
                                        lazyLoad={true}
                                        showThumbnails={false}
                                    />
                                </div>
                                <div className='flex flex-wrap mt-3 lg:mt-4'>
                                    {activeAmenities?.amenities?.map((item: any) => {
                                        return (
                                            <div className='mr-1 lg:mr-2 mb-1 lg:mb-2 flex items-center'>
                                                <img className='h-4 lg:h-6 mr-1 lg:mr-2' src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/${item.code}`} alt="" />
                                                <p className='text-xxs lg:text-sm font-outfit font-medium'>{item.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Modal>
            <Modal show={showPhoneModal} align={'center'} className=" w-[90%] lg:w-3/4 center overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[80%] relative" onClose={() => {
                setShowPhoneModal(false)
            }}>
                <div className='flex items-center justify-center p-4 pb-0 absolute right-3 top-0'>
                    <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => {
                        setShowPhoneModal(false)
                    }}>X</p>
                </div>
                <div className='overflow-scroll h-[90%] lg:h-[85%]  px-2 lg:px-6 py-2 lg:py-6 text-center bg-white flex rounded'>
                    <div className='py-8 px-6'>

                        <div>
                            <form>
                                <p className='text-xl font-bold'>Please verify mobile number to see your exclusive offers</p>
                                <p className='text-xs font-semibold mt-5'>Mobile Number</p>
                                <div className="grid grid-cols-9 lg:grid-cols-9 gap-1 mt-1">
                                    <div className="lg:col-span-2 col-span-3">
                                        <div className={`grid grid-cols-1 mb-6 `}>
                                            <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                                            <Select
                                                isDisabled={showOTP}
                                                value={{ label: country }}
                                                maxMenuHeight={190}
                                                options={PhoneCode}
                                                onChange={(item: any) => setCountry(item.value)}
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-6">
                                        <div className={`grid grid-cols-1 mb-4 relative `}>
                                            <div className="grid grid-cols-1 relative">
                                                <Input
                                                    disabled={showOTP}
                                                    onClickRightIcon={() => handleEditPhone()}
                                                    id="phone_number"
                                                    iconUrlRight="https://images.cordeliacruises.com/cordelia_v2/public/assets/edit-icon-purple.svg"
                                                    name="phone_number"
                                                    validation={Phone}
                                                    register={register}
                                                    inputClassName={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    error={errors && errors.phone_number}
                                                    errorText={errors && errors.phone_number?.message}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='mb-6 lg:mb-4'>
                                    <p className='text-xs font-semibold'>Enter OTP</p>
                                    <div className='flex justify-around mt-4 lg:mt-1'>
                                        <OtpInput
                                            autoComplete='one-time-code'
                                            isDisabled={!showOTP}
                                            value={otp}
                                            onChange={(otp: string) => {
                                                setOtp(otp);
                                            }}
                                            numInputs={4}
                                            separator={<span className="px-5"></span>}
                                            containerStyle="w-fit mx-auto"
                                            inputStyle={{
                                                width: "3rem",
                                                height: "3rem",
                                                color: "black",
                                                fontSize: " 0.875rem",
                                                borderRadius: 4,
                                                border: "1px solid #E6E8EC",
                                                backgroundColor: "#F5F5F5",
                                            }}
                                            isInputNum={true}
                                        />
                                    </div>
                                </div> */}
                                {/* {!showOTP &&
                                    <div className='w-full text-center'>
                                        <button
                                            onClick={handleSubmit(onSubmitOTP)}
                                            className="font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                                            Send OTP
                                        </button>
                                    </div>
                                } */}
                            </form>

                            {showOTP &&
                                <div>
                                    <div className='mt-4 text-center'>
                                        {timer === END_TIMER ? <p className='text-brand-primary' onClick={() => resendOTP()}>Resend OTP</p> : <p className='text-sm font-semibold'>Resend OTP in <span className='text-brand-primary'>{`00:${timer}`}</span></p>}
                                        {/* <p >Edit mobile number</p> */}
                                    </div>
                                    <div className='w-full text-center'>
                                        {errors && errors.otp && <p className="text-xs text-danger mt-1">{errors.otp?.message}</p>}
                                        <button onClick={() => onVerifyOTP()} className="mt-4 text-center font-semibold text-white bg-brand-primary w-full lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                                            Verify
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}