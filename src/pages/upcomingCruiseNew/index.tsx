import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Layout } from '../../components/Layout';
import Modal from '../../components/UI/ModalCenter';
import { useGetItineraryListMutation } from '../../services/upcomingCruise/upcomingCruise';
import "./index.css";
import ItineraryCard from './component/itineraryCard';
import Calendar from './component/calendar';
import moment from 'moment';
import Banner from '../../component/Banner';
import { GetAuth, SaveAB, GetAB, SaveAuth, SaveContact } from '../../utils/store/store';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../../component/Login';
import useHorizontalScroll from '../../utils/customHooks/useHorizontalScroll';
import { useSendOTPMutation, useSttLoginMutation, useVerifyOTPMutation } from '../../services/auth/auth';
import ProfileAuth from '../profile/auth';
import Button from '../../components/UI/Button';
import { useForm } from 'react-hook-form';
import { FullName } from '../../utils/validations/formValidations';
import Select from 'react-select';
import PhoneCode from "../../components/UI/Forms/Inputs/phoneCodes.json";
import OtpInput from 'react18-input-otp';
import { getCurrentUrlWithCampaign } from '../../utils/user/user';
import BottomSheet from '../../component/BottomSheet';
import { useGenerateOtpMutation, useVerifyOtpMutation } from '../../services/OTPLessAuth/OTPLessAuth';
import { getSessionTime } from '../../utils/algorithms';

const leadsBannerImages = [
    {
        desktop: 'https://images.cordeliacruises.com/cordelia_v2/public/images/DiveInto_Upcoming.webp',
        mobile: 'https://images.cordeliacruises.com/cordelia_v2/public/images/DiveInto_Upcoming_Mob.webp',
    },
    {
        desktop: 'https://images.cordeliacruises.com/cordelia_v2/public/images/FamilyFun_Upcoming.webp',
        mobile: 'https://images.cordeliacruises.com/cordelia_v2/public/images/FamilyFun_Upcoming_Mob.webp',
    },
    {
        desktop: 'https://images.cordeliacruises.com/cordelia_v2/public/images/WhySettle_Upcoming.webp',
        mobile: 'https://images.cordeliacruises.com/cordelia_v2/public/images/WhySettle_Upcoming_Mob.webp',
    },
    {
        desktop: 'https://images.cordeliacruises.com/cordelia_v2/public/images/YourNext_Upcoming.webp',
        mobile: 'https://images.cordeliacruises.com/cordelia_v2/public/images/YourNext_Upcoming_Mob.webp',
    },
];

type Props = {}

export type RegistrationFormFields = {
    firstName: string;
    countryCode: string;
    phoneNumber: string;
};

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: '#f5f5f5',
        height: '48px',
        border: '1px solid rgb(112 112 112 / 10%)',
        borderRight: 'none',
        borderRadius: '6px 0 0 6px'
        //   zIndex: 10001 // Optional but helps when inside stacking contexts
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: 10,
        zIndex: 999 // Optional
    }),
    menu: (styles: any) => ({
        ...styles,
        width: '300px',
        zIndex: 9999 // Doesn't always affect portal-rendered menus
    }),
    menuPortal: (base: any) => ({
        ...base,
        zIndex: 10001 // ✅ This is critical!
    })
};

let otpWidth = window.innerWidth > 640 ? '10px' : '3px'

const banner = {
    "images": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-itinerary-new-banner-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/kidsail-offer-itinerary-new-banner-desktop.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        },
    ],
    "mobileImages": [
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/alcohol-offer-itinerary-new-banner-mobile.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        },
        {
            "url": "https://images.cordeliacruises.com/cordelia_v2/public/images/kidsail-offer-itinerary-new-banner-mobile.webp",
            "link": "",
            "type": "image",
            "altTag": "Alcohal",
            "thumbnail": ""
        }
    ],
}

const monthMap: any = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "April",
    "05": "May", "06": "June", "07": "July", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
};

const MonthDropdown = ({ availableDates, tempMonthFilter, setTempMonthFilter, setActiveFilter }: any) => {
    const monthByYear = useMemo(() => {
        const result: any = {};
        availableDates && availableDates?.forEach((d: any) => {
            const [mm, yyyy] = d.split("-");
            if (!result[yyyy]) result[yyyy] = [];
            result[yyyy].push({ key: d, label: monthMap[mm], mm });
        });
        return result;
    }, []);

    const years = Object.keys(monthByYear).sort();
    const [activeYearIndex, setActiveYearIndex] = useState(0);
    const activeYear = years[activeYearIndex];
    const selectedMonths = monthByYear[activeYear] || [];

    const toggleMonth = (monthKey: any) => {
        setTempMonthFilter((prev: any) => prev.includes(monthKey) ? prev.filter((m: any) => m !== monthKey) : [...prev, monthKey]
        );
    };

    return (
        <div className="absolute top-20 left-0 z-[21] bg-white p-4 rounded-xl shadow-lg w-[400px]">
            <h3 className="font-semibold mb-4">Which month would you prefer to cruise?</h3>
            <div className="flex justify-center items-center mb-4">
                <button
                    onClick={() => setActiveYearIndex(i => Math.max(i - 1, 0))}
                    disabled={activeYearIndex === 0}
                    className='rotate-90 disabled:opacity-40'
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <span className="text-lg font-semibold px-8">{activeYear}</span>
                <button
                    onClick={() => setActiveYearIndex(i => Math.min(i + 1, years.length - 1))}
                    disabled={activeYearIndex === years.length - 1}
                    className='-rotate-90 disabled:opacity-40'
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {selectedMonths.map(({ key, label }: any) => (
                    <div
                        key={key}
                        onClick={() => toggleMonth(key)}
                        className={`text-xs font-medium px-4 py-2 rounded border-gray-100/5 cursor-pointer text-center ${tempMonthFilter.includes(key) ? "bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white" : "bg-gray-100/10 hover:bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-black hover:text-white"}`}
                    >
                        {label}
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-4 gap-4">
                {/* <button onClick={() => setTempMonthFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                <button onClick={() => setActiveFilter(null)} className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold">Done</button> */}
                <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempMonthFilter([])} className='w-1/2' />
                <Button text='DONE' size='sm' handleClick={() => setActiveFilter(null)} className='w-full' />
            </div>
        </div>
    );
};

export default function UpcomingCruise({ }: Props) {
    const monthParam = new window.URLSearchParams(window.location.search).get('m');
    const yearParam = new window.URLSearchParams(window.location.search).get('y');
    const monthYearParam = new window.URLSearchParams(window.location.search).get('month_year');
    const dateAfterParam = new window.URLSearchParams(window.location.search).get('da');
    const dateBeforeParam = new window.URLSearchParams(window.location.search).get('db');
    const startSelector = new window.URLSearchParams(window.location.search).get('start');
    const portSelector = new window.URLSearchParams(window.location.search).get('port');
    const nightSelector = new window.URLSearchParams(window.location.search).get('n');
    const cruiseSelector = new window.URLSearchParams(window.location.search).get('cruise');
    const stt = new window.URLSearchParams(window.location.search).get('stt');
    const destinationPortsSelector = new window.URLSearchParams(window.location.search).get('destinationPorts');
    const itinerarySelector = new window.URLSearchParams(window.location.search).get('itinerary_id');

    const AUTH = GetAuth();
    const ab = GetAB();
    const [token, setToken] = React.useState('');
    const [selectedItinerary, setSelectedItinerary] = useState<string>('');
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const filterRef = useRef(null);
    const [getItinerary] = useGetItineraryListMutation();
    const [SttLogin] = useSttLoginMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [itineraryData, setItineraryData] = useState<any>();
    const [portsList, setPortsList] = useState<any>();
    const [shipsList, setShipsList] = useState<any>();
    const [nightList, setNightList] = useState<any>();
    const [availableDates, setAvailableDates] = useState<any>();
    const [activeFilter, setActiveFilter] = useState<any>(null);

    const [tempDestinationFilter, setTempDestinationFilter] = useState<any>([]);
    const [tempCruiseFilter, setTempCruiseFilter] = useState<any>([]);
    const [tempNoOfNightFilter, setTempNoOfNightFilter] = useState<any>([]);
    const [tempMonthFilter, setTempMonthFilter] = useState<any>([]);
    const [tempOriginFilter, setTempOriginFilter] = useState<any>([]);
    const [tempTripTypeFilter, setTempTripTypeFilter] = useState<any>([]);
    const [isOpenNewFilters, setIsOpenNewFilters] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [showStripeHeader, setShowStripeHeader] = useState(true);
    const [stripeHeight, setStripeHeight] = useState<number | null>(null);
    const [destinationFilter, setDestinationFilter] = useState<any>([]);
    const [cruiseFilter, setCruiseFilter] = useState<any>([]);
    const [noOfNightFilter, setNoOfNightFilter] = useState<any>([]);
    const [monthFilter, setMonthFilter] = useState<any>([]);
    const [originFilter, setOriginFilter] = useState<any>([]);
    const [tripTypeFilter, setTripTypeFilter] = useState<any>([]);
    const [filterApplied, setFilterApplied] = useState<any>(false);

    const [sortByPopover, setSortByPopover] = useState(false);
    const [sortByFilter, setSortByFilter] = useState<string | null>(null);

    const [params, setParams] = useState<string>('');

    const [mainMobileFilterModal, setMainMobileFilterModal] = useState<boolean>(false);
    const [secondaryMobileFilterModal, setSecondaryMobileFilterModal] = useState<any>(null);
    const [mainFilter, setMainFilter] = useState<boolean>(false);
    const [isOpenNewSortAndFilter, setIsOpenNewSortAndFilter] = useState(false);
    const [tripType, setTripType] = useState<any>();
    const [origin, setOrigin] = useState<any>();
    const [activeSortAndFilter, setActiveSortAndFilter] = useState("filterBy");
    const [showRequestACallback, setShowRequestACallback] = useState(false);
    const [pageCode, setPageCode] = useState<'upc_rc' | 'upc_midscroll'>('upc_rc');
    const [country, setCountry] = useState('+91');
    const [errorMsg, setErrorMsg] = useState(null)
    const [success, setSuccess] = useState('')
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [leadId, setLeadId] = useState(null)
    const [timer, setTimer] = useState<number>(30);
    const END_TIMER = 0;

    const [showLoadMoreLoader, setShowLoadMoreLoader] = useState(false);
    const [otpReqId, setOtpReqId] = useState<any>();

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<any>(null);
    const lastCardRef = useRef();

    // const [sendOTP] = useSendOTPMutation();
    const [generateOtp] = useGenerateOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const handleStripeHeight = (height: number) => {
        setStripeHeight(height);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        if (showOTPModal) {
            if (timer && timer !== END_TIMER) {
                var tempTimer = setInterval(
                    () => setTimer(timer - 1),
                    1000
                );
                return function cleanup() {
                    clearInterval(tempTimer);
                };
            }
        }
    }, [showOTPModal, timer]);

    const submitForm = (data: any) => {
        setLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();

        const _payload = {
            phoneNumber: data.phone_number,
            website: cleanedUrl || window.location.href,
            pageCode: pageCode,
            fullName: data.name,
            email: data.email,
            companyName: null,
            eventType: null,
            countryCode: country
        };
        generateOtp(_payload)
            .unwrap()
            .then((response) => {
                setShowOTPModal(true);
                setOtp('');
                setOtpReqId(response?.result?.requestId);
            })
            .catch((response) => {
                setErrorMsg(response?.data?.message);
            })
            .finally(() => setLoading(false));
    }

    const submitOtp = () => {
        setVerifyLoading(true);
        const cleanedUrl = getCurrentUrlWithCampaign();
        const sessionTime = getSessionTime()
        const _payload = {
            requestId: otpReqId,
            otp: otp,
            website: cleanedUrl || window.location.href,
            sessionTime: sessionTime
        };
        verifyOtp(_payload)
            .unwrap()
            .then((response) => {
                sessionStorage.removeItem("_st");
                if (!AUTH?.token) {
                    const resData = {
                        exp: response?.result?.exp,
                        is_profile_completed: response?.result?.isProfileCompleted,
                        lead_id: response?.result?.leadId,
                        token: response?.result?.token,
                        refreshToken: response?.result?.refreshToken
                    }
                    SaveAuth(resData)
                    SaveContact({ data: watch().phone_number })
                    window.dispatchEvent(new Event("authChanged"));
                }
                setLeadId(response.lead_id)
                setShowOTPModal(false)
                handleCloseReqCallback()
                setShowSuccessModal(true)
                setSuccess(`You are one step closer to your cruise vacation. Our experts will contact you shortly.`)
            })
            .catch((response) => {
                setOtpError(response?.data?.message || 'Failed to verify OTP');
                // setErrorMsg('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
            })
            .finally(() => setVerifyLoading(false));
    }

    const resendOTP = () => {
        setOtp('');
        setOtpError('');
        setTimer(30);
        submitForm({ phone_number: watch()?.phone_number });
    }

    useEffect(() => {
        if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) { } else {
            if (!ab) {
                // const array = [1, 2];
                const array = [1];
                const randomNumber = array[Math.floor(Math.random() * array.length)];
                SaveAB(randomNumber)
            }
        }
    }, [])

    useEffect(() => {
        if (stt && !AUTH?.token) {
            const _payload = { refresh_token: stt };
            SttLogin(_payload)
                .unwrap()
                .then((response) => {
                    SaveAuth(response?.data?.login_response)
                })
                .catch((response) => {
                    // setError('otp', { type: 'custom', message: response?.message || 'Failed to verify OTP' });
                })
        }
    }, [stt])

    useEffect(() => {
        setToken(GetAuth()?.token)
    }, [GetAuth()])

    useEffect(() => {
        if (shipsList && cruiseSelector) {
            var array = cruiseSelector.split(",");
            const matchedShips = shipsList?.filter((ship) => array.includes(ship.id));
            console.log(matchedShips, 'matchedShips', shipsList)
            setTempCruiseFilter(matchedShips)
            setCruiseFilter(matchedShips);
        }
    }, [shipsList])

    useEffect(() => {
        if (itinerarySelector && !filterApplied) {
            fetchData(`?itinerary_id=${itinerarySelector}`);
        }
        else {
            let _payload: string = `?pagination=true&page=${page}${params}`;
            let newParams: any = '';
            if (destinationPortsSelector) {
                var array = destinationPortsSelector.split(",");
                setTempDestinationFilter([...array])
                setDestinationFilter([...array]);
                _payload = _payload + `&ports=${JSON.stringify(array)}`;
                newParams = newParams + `&ports=${JSON.stringify(array)}`;
            }
            if (startSelector) {
                var array = startSelector.split(",");
                setTempOriginFilter([...array])
                setOriginFilter([...array]);
                _payload = _payload + `&starting_ports=${JSON.stringify(array)}`;
                newParams = newParams + `&starting_ports=${JSON.stringify(array)}`;
            }
            if (portSelector) {
                var array = portSelector.split(",");
                setTempOriginFilter([...array])
                setOriginFilter([...array]);
                _payload = _payload + `&ports=${JSON.stringify(array)}`;
                newParams = newParams + `&ports=${JSON.stringify(array)}`;
            }
            if (nightSelector) {
                var array = nightSelector.split(",");
                setTempNoOfNightFilter([...array])
                setNoOfNightFilter([...array]);
                _payload = _payload + `&night_counts=${JSON.stringify(array)}`;
                newParams = newParams + `&night_counts=${JSON.stringify(array)}`;
            }
            if (cruiseSelector) {
                var array = cruiseSelector.split(",");
                _payload = _payload + `&ship_ids=${JSON.stringify(array)}`;
                newParams = newParams + `&ship_ids=${JSON.stringify(array)}`;
            }
            if (dateAfterParam) {
                const dateAfter = dateAfterParam;
                _payload = _payload + `&date_after=${dateAfter}`;
                newParams = newParams + `&date_after=${dateAfter}`;
            }
            if (dateBeforeParam) {
                const dateBefore = dateBeforeParam;
                _payload = _payload + `&date_before=${dateBefore}`;
                newParams = newParams + `&date_before=${dateBefore}`;
            }

            setParams(newParams);
            fetchData(_payload);
        }
    }, [destinationPortsSelector, startSelector, portSelector, nightSelector, cruiseSelector, dateAfterParam, dateBeforeParam, page, itinerarySelector])

    const toggleFilter = (type: any) => {
        setActiveFilter((prev: any) => (prev === type ? null : type));
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setActiveFilter(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    const fetchData = async (_payload: any) => {
        setIsLoading(true);
        try {
            const res: any = await getItinerary(_payload).unwrap();

            if (page === 1) {
                setItineraryData(res.itineraries || []);
            } else {
                setItineraryData((prev: any) => [...prev, ...(res.itineraries || [])]);
            }

            setHasMore(res?.pagination?.total_pages != res?.pagination?.current_page ? true : false);

            if (res.ports) setPortsList(res.ports);
            if (res.ships) setShipsList(res.ships);
            if (res.available_night_counts) setNightList(res.available_night_counts);
            if (res.available_dates) setAvailableDates(res.available_dates);
            if (res.ports) {
                let origin = res.ports.filter((port: any) => port.origin)
                setOrigin(origin)
            }
        } catch (err) {
            console.log('Error: ', err);
        } finally {
            setIsLoading(false);
            setShowLoadMoreLoader(false)
        }
    };

    const applyFilter = () => {
        setPage(1);
        let _payload: string = `?pagination=true&page=1`;
        let newParams: any = '';
        setFilterApplied(true)
        if (tempDestinationFilter && tempDestinationFilter.length) {
            _payload += `&ports=${JSON.stringify(tempDestinationFilter)}`;
            newParams += `&ports=${JSON.stringify(tempDestinationFilter)}`;
            setDestinationFilter(tempDestinationFilter)
        } else {
            setDestinationFilter([])
        }

        if (tempMonthFilter && tempMonthFilter.length) {
            _payload += `&dates=${JSON.stringify(tempMonthFilter)}`;
            newParams += `&dates=${JSON.stringify(tempMonthFilter)}`;
            setMonthFilter(tempMonthFilter)
        } else {
            setMonthFilter([])
        }

        if (tempNoOfNightFilter && tempNoOfNightFilter.length) {
            _payload += `&night_counts=${JSON.stringify(tempNoOfNightFilter)}`;
            newParams += `&night_counts=${JSON.stringify(tempNoOfNightFilter)}`;
            setNoOfNightFilter(tempNoOfNightFilter)
        } else {
            setNoOfNightFilter([])
        }

        if (tempCruiseFilter && tempCruiseFilter.length) {
            const cruiseIds = tempCruiseFilter.map((item: any) => item.id);
            _payload += `&ship_ids=${JSON.stringify(cruiseIds)}`;
            newParams += `&ship_ids=${JSON.stringify(cruiseIds)}`;
            setCruiseFilter(tempCruiseFilter)
        } else {
            setCruiseFilter([])
        }

        if (tempOriginFilter && tempOriginFilter.length) {
            _payload += `&starting_ports=${JSON.stringify(tempOriginFilter)}`;
            newParams += `&starting_ports=${JSON.stringify(tempOriginFilter)}`;
            setOriginFilter(tempOriginFilter)
        } else {
            setOriginFilter([])
        }

        if (tempTripTypeFilter && tempTripTypeFilter.length) {
            _payload += `&trip_type=${JSON.stringify(tempTripTypeFilter)}`;
            newParams += `&trip_type=${JSON.stringify(tempTripTypeFilter)}`;
            setTripTypeFilter(tempTripTypeFilter)
        } else {
            setTripTypeFilter([])
        }

        setParams(newParams)
        fetchData(_payload)
    }

    // useEffect(() => {
    //     if (isLoading) return;
    //     if (itinerarySelector && !filterApplied) {
    //         return
    //     }
    //     if (observer.current) observer.current.disconnect();

    //     observer.current = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting && hasMore) {
    //             setPage(prev => prev + 1);
    //         }
    //     });

    //     if (lastCardRef.current) {
    //         observer.current.observe(lastCardRef.current);
    //     }
    //     console.log('roh observer', observer.current, lastCardRef.current);

    // }, [isLoading, hasMore, itineraryData, itinerarySelector, filterApplied]);

    // useEffect(() => {
    //     if (observer.current) observer.current.disconnect();

    //     observer.current = new IntersectionObserver(entries => {
    //         debugger
    //         if (entries[0].isIntersecting && hasMore) {
    //             setShowLoadMore(true); // 👈 show the button
    //         }
    //     });

    //     if (lastCardRef.current) {
    //         observer.current.observe(lastCardRef.current);
    //     }

    //     return () => {
    //         if (observer.current) observer.current.disconnect();
    //     };
    // }, [hasMore, itineraryData]);

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
        // setShowLoadMore(false);
        setShowLoadMoreLoader(true);
    };

    const setTempFilterData = async (name: any, value: any) => {
        if (name == 'destination') {
            let arr: any = JSON.parse(JSON.stringify(tempDestinationFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempDestinationFilter([...arr])
        }
        if (name == 'month') {
            let arr: any = JSON.parse(JSON.stringify(tempMonthFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempMonthFilter([...arr])
        }
        if (name == 'nights') {
            let arr: any = JSON.parse(JSON.stringify(tempNoOfNightFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempNoOfNightFilter([...arr])
        }
        if (name == 'cruise') {
            setTempCruiseFilter((prev) => {
                const isSelected = prev.some((c) => c.id === value.id);
                if (isSelected) {
                    return prev.filter((c) => c.id !== value.id); // remove
                } else {
                    return [...prev, { id: value.id, name: value.name }]; // add
                }
            });
        }
        if (name == 'origin') {
            let arr: any = JSON.parse(JSON.stringify(tempOriginFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempOriginFilter([...arr])
        }
        if (name == 'trip') {
            let arr: any = JSON.parse(JSON.stringify(tempTripTypeFilter));
            if (arr.includes(value)) {
                arr = arr.filter((item: any) => item !== value)
            } else {
                arr.push(value)
            }
            setTempTripTypeFilter([...arr])
        }
    }

    const DestinationDropdown = () => {
        return (
            <div className="absolute top-20 left-0 z-[21] bg-white p-4 rounded-xl shadow-lg w-[600px]">
                <p className="font-semibold mb-2">Which destination would you like to cruise to?</p>

                <div className="mb-2">
                    {/* <p className="font-medium">Domestic</p> */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        {portsList && [...portsList].sort((a: any, b: any) => a.name.localeCompare(b.name)).map((val: any, i: number) => {
                            return (
                                <span
                                    onClick={() => setTempFilterData('destination', val.name)}
                                    className={`text-xs font-medium px-4 py-2 rounded border-gray-100/5 cursor-pointer text-center ${tempDestinationFilter.includes(val.name) ? "bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white" : "bg-gray-100/10 hover:bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-black hover:text-white"}`}
                                >
                                    {val.name}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                    {/* <button onClick={() => setTempDestinationFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                    <button onClick={() => setActiveFilter(null)} className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold">Done</button> */}
                    <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempDestinationFilter([])} className='w-1/2' />
                    <Button text='DONE' size='sm' handleClick={() => setActiveFilter(null)} className='w-full' />
                </div>
            </div>
        );
    };
    const NightDropdown = () => {
        return (
            <div className="absolute top-20 left-0 z-[21] bg-white p-4 rounded-xl shadow-lg w-[400px]">
                <p className="font-semibold mb-2">How many nights would you like to cruise with us?</p>

                <div className="mb-2">
                    <div className="flex flex-wrap gap-3 mt-1">
                        {nightList.map((val: any, i: number) => {
                            return (
                                <span
                                    onClick={() => setTempFilterData('nights', val)}
                                    className={`text-xs font-medium px-4 py-2 rounded border-gray-100/5 cursor-pointer text-center ${tempNoOfNightFilter.includes(val) ? "bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white" : "bg-gray-100/10 hover:bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-black hover:text-white"}`}
                                >
                                    {val} Nights
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                    {/* <button onClick={() => setTempNoOfNightFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                    <button onClick={() => setActiveFilter(null)} className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold">Done</button> */}
                    <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempNoOfNightFilter([])} className='w-1/2' />
                    <Button text='DONE' size='sm' handleClick={() => setActiveFilter(null)} className='w-full' />
                </div>
            </div>
        );
    };
    const CruiseDropdown = () => {
        return (
            <div className="absolute top-20 left-0 z-[21] bg-white p-4 rounded-xl shadow-lg w-[400px]">
                <p className="font-semibold mb-2">Ready to sail? Choose your cruise</p>

                <div className="mb-2">
                    <div className="flex flex-wrap gap-3 mt-1">
                        {shipsList.map((val: any, i: number) => {
                            return (
                                <span
                                    onClick={() => setTempFilterData('cruise', val)}
                                    className={`text-xs font-medium px-4 py-2 rounded border-gray-100/5 cursor-pointer text-center ${tempCruiseFilter.some((c: any) => c.name === val.name) ? "bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white" : "bg-gray-100/10 hover:bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-black hover:text-white"}`}
                                >
                                    {val.name}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                    {/* <button onClick={() => setTempCruiseFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                    <button onClick={() => setActiveFilter(null)} className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold">Done</button> */}
                    <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempCruiseFilter([])} className='w-1/2' />
                    <Button text='DONE' size='sm' handleClick={() => setActiveFilter(null)} className='w-full' />
                </div>
            </div>
        );
    };

    const removeFilterOption = (name: string, value: any) => {
        if (name === 'removeAll') {
            setTempDestinationFilter([]);
            setTempMonthFilter([]);
            setTempNoOfNightFilter([]);
            setTempCruiseFilter([]);
            setDestinationFilter([]);
            setMonthFilter([]);
            setNoOfNightFilter([]);
            setCruiseFilter([]);
            setItineraryData([]);

            const baseUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, baseUrl);
            setParams('');

            let _payload: string = `?pagination=true&page=1`;
            fetchData(_payload);
        } else {
            let newParams: any = '';
            let _payload: string = `?pagination=true&page=1`;
            if (name === 'destination') {
                const updatedFilter = destinationFilter.filter((item: any) => item !== value);
                setTempDestinationFilter(updatedFilter);
                setDestinationFilter(updatedFilter);
                if (updatedFilter && updatedFilter.length) {
                    _payload = _payload + params.replace(/ports=\[[^\]]*\]/, `ports=${JSON.stringify(updatedFilter)}`);
                    newParams = params.replace(/ports=\[[^\]]*\]/, `ports=${JSON.stringify(updatedFilter)}`);
                } else {
                    _payload = _payload + params.replace(/&?ports=\[[^\]]*\]/, '');
                    newParams = params.replace(/&?ports=\[[^\]]*\]/, '');
                }
            }
            if (name === 'month') {
                const updatedFilter = monthFilter.filter((item: any) => item !== value);
                setTempMonthFilter(updatedFilter);
                setMonthFilter(updatedFilter);
                if (updatedFilter && updatedFilter.length) {
                    _payload = _payload + params.replace(/dates=\[[^\]]*\]/, `dates=${JSON.stringify(updatedFilter)}`);
                    newParams = params.replace(/dates=\[[^\]]*\]/, `dates=${JSON.stringify(updatedFilter)}`);
                } else {
                    _payload = _payload + params.replace(/&?dates=\[[^\]]*\]/, '');
                    newParams = params.replace(/&?dates=\[[^\]]*\]/, '');
                }
            }
            if (name === 'nights') {
                const updatedFilter = noOfNightFilter.filter((item: any) => item !== value);
                setTempNoOfNightFilter(updatedFilter);
                setNoOfNightFilter(updatedFilter);
                if (updatedFilter && updatedFilter.length) {
                    _payload = _payload + params.replace(/night_counts=\[[^\]]*\]/, `night_counts=${JSON.stringify(updatedFilter)}`);
                    newParams = params.replace(/night_counts=\[[^\]]*\]/, `night_counts=${JSON.stringify(updatedFilter)}`);
                } else {
                    _payload = _payload + params.replace(/&?night_counts=\[[^\]]*\]/, '');
                    newParams = params.replace(/&?night_counts=\[[^\]]*\]/, '');
                }
            }
            if (name === 'cruise') {
                const updatedFilter = cruiseFilter.filter((item: any) => item.id !== value.id);
                setTempCruiseFilter(updatedFilter);
                setCruiseFilter(updatedFilter);
                if (updatedFilter && updatedFilter.length) {
                    const cruiseIds = updatedFilter.map((item: any) => item.id);
                    _payload = _payload + params.replace(/ship_ids=\[[^\]]*\]/, `ship_ids=${JSON.stringify(cruiseIds)}`);
                    newParams = params.replace(/ship_ids=\[[^\]]*\]/, `ship_ids=${JSON.stringify(cruiseIds)}`);
                } else {
                    _payload = _payload + params.replace(/&?ship_ids=\[[^\]]*\]/, '');
                    newParams = params.replace(/&?ship_ids=\[[^\]]*\]/, '');
                }
            }
            if (cruiseSelector && name === 'cruise') {
                // Remove only cruise ('cruise') from URL and reload
                const url = new URL(window.location.href);
                url.searchParams.delete('cruise');
                window.history.replaceState({}, document.title, url.toString());
                window.location.reload();
            } else {
                // Normal behavior for all other filters
                setParams(newParams);
                fetchData(_payload);
            }
        }
    }

    const onLogin = (itinerary_id: any) => {
        setSelectedItinerary(itinerary_id)
        setShowLoginModal(true)
    }

    const sortByFunction = (option: string) => {
        let _payload: string = `?pagination=true&page=1`;
        let param = `&short_type=${option}`;
        setSortByFilter(param);
        fetchData(_payload + param);
        setSortByPopover(false)
    }

    const destinationScroll = useHorizontalScroll();

    const NewSortAndFilterBottomSheet = () => {
        return (
            <>
                {isOpenNewSortAndFilter &&
                    <>
                        <div
                            className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 z-30 ${isOpenNewSortAndFilter ? "!bg-opacity-70 visible" : "bg-opacity-0 invisible"
                                }`}
                            onClick={() => setIsOpenNewSortAndFilter(false)}
                        />

                        {/* Bottom Sheet */}
                        <div>
                            <div
                                className={`fixed left-0 w-full -bottom-[45%] bg-white p-4 rounded-t-2xl shadow-lg transition-all duration-300 ease-in z-30 `}
                                style={{
                                    bottom: isOpenNewSortAndFilter ? "0" : "",
                                }}
                            >
                                {/* Sheet Header */}
                                <div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setIsOpenNewSortAndFilter(false)}
                                            className="float-right text-gray-500 hover:text-gray-600"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-black cursor-pointer"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='flex text-center border-b'>
                                        <div
                                            className={`basis-1/2 pb-4 font-bold text-lg ${activeSortAndFilter === 'filterBy' ? 'border-b-2 border-brand-primary' : 'text-gray-100 border-gray-400'}`}
                                            onClick={() => setActiveSortAndFilter("filterBy")}
                                        >
                                            Filter By
                                        </div>
                                        <div
                                            className={`basis-1/2 pb-4 font-bold text-lg ${activeSortAndFilter === 'sortBy' ? 'border-b-2 border-brand-primary' : 'text-gray-100 border-gray-400'}`}
                                            onClick={() => setActiveSortAndFilter("sortBy")}
                                        >
                                            Sort By
                                        </div>
                                    </div>
                                </div>
                                {activeSortAndFilter === "filterBy" &&
                                    <div>
                                        {/* Sheet Content */}
                                        <div className='py-4 max-h-96 overflow-y-auto'>
                                            <div>
                                                <p className='font-semibold'>Trip Type</p>
                                                <div className='flex mt-2 gap-2'>
                                                    <div onClick={() => setTempFilterData('trip', 'one_way')} className={`flex items-center text-xxs font-medium px-3 py-1.5 rounded bg-gray-100/10 border-gray-100/5 cursor-pointer from-brand-primary to-brand-secondary hover:text-white ${tempTripTypeFilter.includes('one_way') ? 'bg-gradient-to-r text-white' : 'hover:bg-gradient-to-r text-black'}`}>
                                                        <img className='mr-2' src={`${tempTripTypeFilter.includes('one_way') ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway_white.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-black-icon.svg'}`} alt="" />
                                                        <p className='text-xs lg:text-sm font-normal'>One Way</p>
                                                    </div>
                                                    <div onClick={() => setTempFilterData('trip', 'round')} className={`flex items-center text-xxs font-medium px-3 py-1.5 rounded bg-gray-100/10 border-gray-100/5 cursor-pointer from-brand-primary to-brand-secondary hover:text-white ${tempTripTypeFilter.includes('round') ? 'bg-gradient-to-r text-white' : 'hover:bg-gradient-to-r text-black'}`}>
                                                        <img className='mr-2' src={`${tempTripTypeFilter.includes('round') ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip_white.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-black-icon.svg'}`} alt="" />
                                                        <p className='text-xs lg:text-sm font-normal'>Round Trip</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-5'>
                                                <p className='font-semibold'>Departure Port</p>
                                                <div className='flex flex-wrap gap-2 mt-2'>
                                                    {origin && origin.map((val: any, i: number) => {
                                                        return (
                                                            <div onClick={() => setTempFilterData('origin', val.name)} key={i} className={`flex items-center text-xxs font-medium px-3 py-1.5 rounded bg-gray-100/10 border-gray-100/5 cursor-pointer from-brand-primary to-brand-secondary hover:text-white ${tempOriginFilter.includes(val.name) ? 'bg-gradient-to-r text-white' : 'hover:bg-gradient-to-r text-black'}`}>
                                                                <p className='text-xs lg:text-sm font-normal'>{val.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className='flex gap-3'>
                                            {/* <button
                                                onClick={() => {
                                                    setTempTripTypeFilter([]);
                                                    setTempOriginFilter([]);
                                                }}
                                                className="mt-4 w-full py-2 bg-gray-100/5 rounded-md uppercase text-sm font-bold"
                                            >
                                                Reset All
                                            </button>
                                            <button
                                                onClick={() => {
                                                    applyFilter()
                                                    setIsOpenNewSortAndFilter(false);
                                                }}
                                                className="mt-4 w-full py-2 bg-brand-primary text-white rounded-md uppercase text-sm font-bold"
                                            >
                                                Apply
                                            </button> */}
                                            <Button text='Reset All' size='sm' type='secondary' handleClick={() => {
                                                setTempTripTypeFilter([]);
                                                setTempOriginFilter([]);
                                            }} className='w-full' />
                                            <Button text='Apply' size='sm' handleClick={() => {
                                                applyFilter()
                                                setIsOpenNewSortAndFilter(false);
                                            }} className='w-full' />
                                        </div>
                                    </div>
                                }
                                {activeSortAndFilter === "sortBy" &&
                                    <div className='pt-6'>
                                        <div
                                            className='py-3 text-sm border-b border-gray-400'
                                            onClick={() => sortByFunction("price_low_to_high")}
                                        >
                                            <p>Price Low To High</p>
                                        </div>
                                        <div
                                            className='py-3 text-sm border-b border-gray-400'
                                            onClick={() => sortByFunction("price_high_to_low")}
                                        >
                                            <p>Price High To Low</p>
                                        </div>
                                        <div
                                            className='py-3 text-sm'
                                            onClick={() => sortByFunction("earliest_date")}
                                        >
                                            <p>Earliest Date</p>
                                        </div>
                                        {/* <div className='py-3 text-sm'>
                                    <p>Recommended</p>
                                </div> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </>
        );
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    useEffect(() => {
        const stopPropagationForSelect = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if the click is inside a react-select dropdown
            if (target.closest('.react-select__menu')) {
                e.stopPropagation();
            }
        };

        // Add listener in capture phase so it runs before modal's listener
        document.addEventListener('click', stopPropagationForSelect, true);

        return () => {
            document.removeEventListener('click', stopPropagationForSelect, true);
        };
    }, []);

    const handleOpenReqCallback = (type: string) => {
        setShowRequestACallback(true);
        type === "sticky" ? setPageCode('upc_rc') : setPageCode('upc_midscroll');
    }

    const handleCloseReqCallback = () => {
        setShowRequestACallback(false);
        clearErrors();
        reset();
    }

    // Utility to chunk array into groups of 5
    const chunkedItineraries = [];
    for (let i = 0; i < itineraryData?.length; i += 5) {
        chunkedItineraries.push(itineraryData?.slice(i, i + 5));
    }

    return (
        <Layout showTopHeader={false} showStripeHeader={showStripeHeader} setShowStripeHeader={setShowStripeHeader} onStripeHeightChange={handleStripeHeight}>
            {isLoading && !showLoadMoreLoader ?
                <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/90 z-50'>
                    <img
                        className='w-32 lg:w-44'
                        src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
                        alt=""
                    />
                </div>
                : null
            }
            <div style={{ marginTop: window.innerWidth < 600 && showStripeHeader && stripeHeight ? `${stripeHeight + 28}px` : window.innerWidth > 600 && showStripeHeader && stripeHeight ? `${stripeHeight + 32}px` : window.innerWidth < 600 ? "12px" : "8px" }} className='pt-[52px] pb-24 lg:pt-[62px] lg:pb-28 mt-3'>
                {/* <Banner data={banner} /> */}
                <div className='relative'>
                    <div className="">
                        <div className='container mx-auto'>
                            <div className="mx-auto px-4 lg:px-32 text-center pt-6 lg:pt-16 pb-8">
                                <h1 className='font-semibold text-2xl lg:text-3xl'>Explore Cruise Holidays</h1>
                            </div>
                            {/* Filter Web*/}
                            <div ref={filterRef} className="hidden lg:flex justify-between items-center p-4 rounded-xl shadow-allSide bg-white w-full max-w-6xl mx-auto border border-gray-300">
                                <div className="w-[20%] relative">
                                    <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleFilter('destination')}>
                                        <div>
                                            <label className="text-xs cursor-pointer">Select Destination</label>
                                            <p className={`font-semibold ${tempDestinationFilter && tempDestinationFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                                {tempDestinationFilter && tempDestinationFilter.length ? tempDestinationFilter.length > 2 ? `${tempDestinationFilter[0]}, ${tempDestinationFilter[1]}...+${tempDestinationFilter.length - 2}` : tempDestinationFilter.join(', ') : 'Where to?'}
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {activeFilter === 'destination' && <DestinationDropdown />}
                                </div>

                                <div className='border-l h-[40px] mx-4'></div>

                                <div className="w-[20%] relative">
                                    <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleFilter('month')}>
                                        <div>
                                            <label className="text-xs cursor-pointer">Select Month</label>
                                            {/* <p className="font-semibold text-gray-100">
                                                Travel month?
                                            </p> */}
                                            <p className={`font-semibold ${tempMonthFilter && tempMonthFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                                {tempMonthFilter && tempMonthFilter.length ? tempMonthFilter.length > 2 ? `${tempMonthFilter[0]}, ${tempMonthFilter[1]}...+${tempMonthFilter.length - 2}` : tempMonthFilter.join(', ') : 'Travel month?'}
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {activeFilter === 'month' && <MonthDropdown availableDates={availableDates} tempMonthFilter={tempMonthFilter} setTempMonthFilter={setTempMonthFilter} setActiveFilter={setActiveFilter} />}
                                </div>

                                <div className='border-l h-[40px] mx-4'></div>

                                <div className="w-[20%] relative">
                                    <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleFilter('night')}>
                                        <div>
                                            <label className="text-xs cursor-pointer">Select Night</label>
                                            <p className={`font-semibold ${tempNoOfNightFilter && tempNoOfNightFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                                {tempNoOfNightFilter && tempNoOfNightFilter.length ? tempNoOfNightFilter.length > 2 ? `${tempNoOfNightFilter[0]}N, ${tempNoOfNightFilter[1]}N...+${tempNoOfNightFilter.length - 2}` : tempNoOfNightFilter.map((item: number) => `${item}N`).join(', ') : 'Nights?'}
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {activeFilter === 'night' && <NightDropdown />}
                                </div>

                                <div className='border-l h-[40px] mx-4'></div>

                                <div className="w-[20%] relative">
                                    <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleFilter('cruise')}>
                                        <div>
                                            <label className="text-xs cursor-pointer">Select Cruise</label>
                                            <p className={`font-semibold ${tempCruiseFilter && tempCruiseFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                                {tempCruiseFilter && tempCruiseFilter.length
                                                    ? tempCruiseFilter.length > 2
                                                        ? `${tempCruiseFilter[0].name}, ${tempCruiseFilter[1].name}...+${tempCruiseFilter.length - 2}`
                                                        : tempCruiseFilter.map(item => item.name).join(', ')
                                                    : 'Cruise name?'}
                                            </p>
                                        </div>
                                    </div>
                                    {activeFilter === 'cruise' && <CruiseDropdown />}
                                </div>

                                {/* <button onClick={() => applyFilter()} className="bg-brand-primary text-white font-semibold py-4 rounded-md px-20">
                                    Apply
                                </button> */}
                                <Button text='Apply' size='lg' handleClick={applyFilter} className='!px-20' />
                            </div>
                            {/* Filter Mobile*/}
                            <div className='px-4'>
                                <div
                                    className="flex justify-between items-center lg:hidden bg-white rounded-full p-4 border border-gray-300/10 shadow-allSide"
                                    onClick={() => setMainMobileFilterModal(true)}
                                >
                                    <p className='text-sm text-gray-700'>Destination, Month, Night, Cruise</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {(destinationFilter.length ||
                            monthFilter.length ||
                            noOfNightFilter.length ||
                            noOfNightFilter.length ||
                            cruiseFilter?.length) > 0 && (
                                <div className='flex gap-1 basis-2/3 w-full pt-3 container mx-auto'>
                                    {/* <div
                                        className={`px-1 hidden lg:inline-flex border border-gray-300/50 rounded-full shadow-allSide cursor-pointer min-w-[35px] min-h-[35px]`}
                                        onClick={destinationScroll.scrollLeft}
                                        disabled={!destinationScroll.canScrollLeft}
                                    >
                                        <img src="http://images.cordeliacruises.com/cordelia_v2/public/assets/new-filter-arrow-icon.svg" alt="left_arrow" />
                                    </div> */}
                                    <div ref={destinationScroll.scrollRef} className='filterScroll overflow-auto px-4 lg:px-0'>
                                        <div className='mr-8 flex gap-3 w-max mt-0.5'>
                                            <button
                                                onClick={() => {
                                                    removeFilterOption('removeAll', null);
                                                }}
                                                className="flex items-center gap-2 px-4 py-1 text-white bg-brand-gradient rounded-full font-semibold"
                                            >
                                                Clear All ✕
                                            </button>

                                            {destinationFilter.map((item: string) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-brand-primary rounded-full px-3 py-1 text-sm font-medium"
                                                    style={{
                                                        border: '2px solid transparent',
                                                        backgroundImage:
                                                            'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                                                        backgroundClip: 'padding-box, border-box',
                                                        backgroundOrigin: 'border-box'
                                                    }}
                                                >
                                                    {item}
                                                    <button onClick={() => removeFilterOption('destination', item)}>✕</button>
                                                </div>
                                            ))}

                                            {monthFilter.map((item: string) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-brand-primary rounded-full px-3 py-1 text-sm font-medium"
                                                    style={{
                                                        border: '2px solid transparent',
                                                        backgroundImage:
                                                            'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                                                        backgroundClip: 'padding-box, border-box',
                                                        backgroundOrigin: 'border-box'
                                                    }}
                                                >
                                                    {item}
                                                    <button onClick={() => removeFilterOption('month', item)}>✕</button>
                                                </div>
                                            ))}

                                            {noOfNightFilter.map((item: number) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-brand-primary rounded-full px-3 py-1 text-sm font-medium"
                                                    style={{
                                                        border: '2px solid transparent',
                                                        backgroundImage:
                                                            'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                                                        backgroundClip: 'padding-box, border-box',
                                                        backgroundOrigin: 'border-box'
                                                    }}
                                                >
                                                    {item} Nights
                                                    <button onClick={() => removeFilterOption('nights', item)}>✕</button>
                                                </div>
                                            ))}

                                            {cruiseFilter?.map((item: any) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-2 text-brand-primary rounded-full px-3 py-1 text-sm font-medium"
                                                    style={{
                                                        border: '2px solid transparent',
                                                        backgroundImage:
                                                            'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                                                        backgroundClip: 'padding-box, border-box',
                                                        backgroundOrigin: 'border-box'
                                                    }}
                                                >
                                                    {item.name}
                                                    <button onClick={() => removeFilterOption('cruise', item)}>✕</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* <div
                                        className={`px-1 hidden lg:inline-flex border border-gray-300/50 rounded-full shadow-allSide cursor-pointer min-w-[35px] min-h-[35px]`}
                                        onClick={destinationScroll.scrollRight}
                                        disabled={!destinationScroll.canScrollRight}
                                    >
                                        <img src="http://images.cordeliacruises.com/cordelia_v2/public/assets/new-filter-arrow-icon.svg" className='rotate-180' alt="right_arrow" />
                                    </div> */}
                                </div>
                            )
                        }


                        <div className="">
                            <div className='flex justify-between mt-8 container mx-auto px-4 lg:px-0'>
                                <div>
                                    <p className='text-sm lg:text-lg font-semibold'>Cruise Search Results ({itineraryData?.length})</p>
                                </div>
                                {/* Sort & Filter */}
                                <div className='flex gap-6'>
                                    <div className='hidden lg:block relative'>
                                        <div onClick={() => {
                                            setSortByPopover(prev => !prev)
                                        }} className='flex items-center cursor-pointer'>
                                            <p className='text-base lg:text-lg font-semibold'>Sort By</p>
                                            <img className='h-2.5 lg:h-3.5 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/filter-icon.svg" alt="sort_icon" />
                                        </div>
                                        <div
                                            className={`fixed inset-0 z-10 ${sortByPopover ? "!bg-opacity-70 visible" : "bg-opacity-0 invisible"
                                                }`}
                                            onClick={() => setSortByPopover(false)}
                                        />
                                        {sortByPopover && <div className='absolute top-10 bg-white z-10 w-max shadow-allSide rounded-md'>
                                            <div
                                                className='p-3 text-sm border-b border-gray-400 cursor-pointer'
                                                onClick={() => sortByFunction("price_low_to_high")}
                                            >
                                                <p>Price Low To High</p>
                                            </div>
                                            <div
                                                className='p-3 text-sm border-b border-gray-400 cursor-pointer'
                                                onClick={() => sortByFunction("price_high_to_low")}
                                            >
                                                <p>Price High To Low</p>
                                            </div>
                                            <div
                                                className='p-3 text-sm cursor-pointer'
                                                onClick={() => sortByFunction("earliest_date")}
                                            >
                                                <p>Earliest Date</p>
                                            </div>
                                        </div>}
                                    </div>
                                    <div onClick={() => {
                                        window.innerWidth > 640 ? setMainFilter(true) : setIsOpenNewSortAndFilter(true);
                                    }} className='flex items-center cursor-pointer'>
                                        <p className='lg:hidden text-base lg:text-lg font-semibold'>Filter</p>
                                        <p className='hidden lg:block text-base lg:text-lg font-semibold'>Filter By</p>
                                        <img className='h-5 lg:h-6 ml-2' src="http://images.cordeliacruises.com/cordelia_v2/public/assets/filter-new-design-icon.svg" alt="filter_icon" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='mt-10 lg:mt-4'>
                                {itineraryData?.map((item: any, index: number) => (
                                    <div
                                        ref={index === itineraryData.length - 1 ? lastCardRef : null}
                                        key={item.id}
                                    >
                                        <ItineraryCard data={item} callBack={onLogin} />
                                    </div>
                                ))}
                            </div> */}

                            <div className='mt-10 lg:mt-4'>
                                {chunkedItineraries.map((group, groupIndex) => (
                                    <React.Fragment key={groupIndex}>
                                        {/* Wrapper around each 5 itinerary cards */}
                                        <div className={`px-4 lg:px-0 lg:mx-auto ${innerWidth > 600 ? 'container' : ''}`}>
                                            {group.map((item: any, index: number) => {
                                                const absoluteIndex = groupIndex * 5 + index;
                                                return (
                                                    <div
                                                        key={item.id}
                                                        ref={absoluteIndex === itineraryData.length - 1 ? lastCardRef : null}
                                                    >
                                                        <ItineraryCard data={item} callBack={onLogin} />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Banner below every 5 cards and skip banner at the last */}
                                        {groupIndex < chunkedItineraries.length - 1 && leadsBannerImages?.length > 0 && <div className='-mt-2.5 mb-10 cursor-pointer' onClick={() => handleOpenReqCallback('banner')}>
                                            {/* Mobile banner */}
                                            <img
                                                src={leadsBannerImages[groupIndex % leadsBannerImages.length]?.mobile}
                                                alt={`Banner mobile ${groupIndex + 1}`}
                                                className='block lg:hidden w-full'
                                            />
                                            {/* Desktop banner */}
                                            <img
                                                src={leadsBannerImages[groupIndex % leadsBannerImages.length]?.desktop}
                                                alt={`Banner desktop ${groupIndex + 1}`}
                                                className='hidden lg:block w-full'
                                            />
                                        </div>}
                                    </React.Fragment>
                                ))}
                            </div>

                        </div>

                        {hasMore && (
                            <div className="text-center my-6">
                                <Button isLoading={showLoadMoreLoader} text="Load More" rightIcon={<img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/load-more-icon-white.svg' />} size="base" handleClick={handleLoadMore} className='!px-8' />
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <ProfileAuth setAuthModal={setShowLoginModal} token={token} setToken={setToken} authModal={showLoginModal} type='reveal' selectedItinerary={selectedItinerary} />


            <Modal
                show={mainMobileFilterModal}
                align={'center'}
                className="max-h-[100%] overflow-y-scroll no-scrollbar drop-shadow absolute w-[100%] center overflow-hidden left-0 right-0 top-0 m-auto"
                mainClassName="px-0"
                onClose={() => {
                    setMainMobileFilterModal(false)
                }}>
                <div className='overflow-scroll no-scrollbar h-[99%]'>
                    <div className='bg-white h-[100%]'>
                        <div className='border-b border-gray-300 p-4 flex items-center justify-between'>
                            <h1 className='text-base font-semibold'>Explore Cruise Holiday</h1>
                            <svg
                                onClick={() => setMainMobileFilterModal(false)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-black cursor-pointer"
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
                        <div className='p-4'>
                            <div className='p-4 border border-gray-300/80 rounded'>
                                <div
                                    onClick={() => {
                                        setSecondaryMobileFilterModal('destination')
                                        setMainMobileFilterModal(false)
                                    }}
                                    className="bg-gray-300/50 shadow-allSide rounded-md p-3 border border-gray-300/50 mb-4"
                                >
                                    <p className="text-xs font-medium">Select Destination</p>
                                    <p className={`text-sm font-semibold ${tempDestinationFilter && tempDestinationFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                        {tempDestinationFilter && tempDestinationFilter.length ? tempDestinationFilter.length > 2 ? `${tempDestinationFilter[0]}, ${tempDestinationFilter[1]}...+${tempDestinationFilter.length - 2}` : tempDestinationFilter.join(', ') : 'Where to?'}
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        setSecondaryMobileFilterModal('month')
                                        setMainMobileFilterModal(false)
                                    }}
                                    className="bg-gray-300/50 shadow-allSide rounded-md p-3 border border-gray-300/70 mb-4"
                                >
                                    <p className="text-xs font-medium">Select Month</p>
                                    <p className={`text-sm font-semibold ${tempMonthFilter && tempMonthFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                        {tempMonthFilter && tempMonthFilter.length ? tempMonthFilter.length > 2 ? `${tempMonthFilter[0]}, ${tempMonthFilter[1]}...+${tempMonthFilter.length - 2}` : tempMonthFilter.join(', ') : 'Travel month?'}
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        setSecondaryMobileFilterModal('nights')
                                        setMainMobileFilterModal(false)
                                    }}
                                    className="bg-gray-300/50 shadow-allSide rounded-md p-3 border border-gray-300/70 mb-4"
                                >
                                    <p className="text-xs font-medium">Select Night</p>
                                    <p className={`text-sm font-semibold ${tempNoOfNightFilter && tempNoOfNightFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                        {tempNoOfNightFilter && tempNoOfNightFilter.length ? tempNoOfNightFilter.length > 2 ? `${tempNoOfNightFilter[0]}N, ${tempNoOfNightFilter[1]}N...+${tempNoOfNightFilter.length - 2}` : tempNoOfNightFilter.map((item: number) => `${item}N`).join(', ') : 'Nights?'}
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        setSecondaryMobileFilterModal('cruise')
                                        setMainMobileFilterModal(false)
                                    }}
                                    className="bg-gray-300/50 shadow-allSide rounded-md p-3 border border-gray-300/70"
                                >
                                    <p className="text-xs font-medium">Select Cruise</p>
                                    <p className={`text-sm font-semibold ${tempCruiseFilter && tempCruiseFilter.length ? 'text-black' : 'text-gray-100'}`}>
                                        {tempCruiseFilter && tempCruiseFilter.length
                                            ? tempCruiseFilter.length > 2
                                                ? `${tempCruiseFilter[0].name}, ${tempCruiseFilter[1].name}...+${tempCruiseFilter.length - 2}`
                                                : tempCruiseFilter.map((item: any) => item.name).join(', ')
                                            : 'Cruise name?'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full px-4 pb-6'>
                            {/* <button
                                onClick={() => {
                                    applyFilter()
                                    setMainMobileFilterModal(false)
                                }}
                                className='bg-brand-primary py-3 rounded text-white w-full'
                            >
                                Apply
                            </button> */}
                            <Button text="Apply" size="lg" handleClick={() => {
                                applyFilter()
                                setMainMobileFilterModal(false)
                            }} />
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                show={secondaryMobileFilterModal}
                align={'center'}
                className="max-h-[100%] overflow-y-scroll no-scrollbar drop-shadow absolute w-[100%] center overflow-hidden left-0 right-0 bottom-0 m-auto"
                mainClassName="px-0"
                onClose={() => {
                    setSecondaryMobileFilterModal(null)
                }}>
                <div className='overflow-scroll no-scrollbar h-[99%]'>
                    <div className='bg-white h-[100%]'>
                        <div className='p-4 flex items-start justify-between'>
                            {secondaryMobileFilterModal === 'destination' && <p className="text-base font-semibold pr-4">Which destination would you like to cruise to?</p>}
                            {secondaryMobileFilterModal === 'month' && <p className="text-base font-semibold pr-4">Which month would you prefer to cruise?</p>}
                            {secondaryMobileFilterModal === 'nights' && <p className="text-base font-semibold pr-4">How many nights would you like to cruise with us?</p>}
                            {secondaryMobileFilterModal === 'cruise' && <p className="text-base font-semibold pr-4">Ready to sail? Choose your cruise</p>}
                            <svg
                                onClick={() => setSecondaryMobileFilterModal(null)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-black cursor-pointer mt-1"
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
                        <div className='p-4'>
                            {secondaryMobileFilterModal === 'destination' && (
                                <div className="">
                                    <div className="mb-2">
                                        <div className="flex flex-wrap gap-2">
                                            {portsList && [...portsList].sort((a: any, b: any) => a.name.localeCompare(b.name)).map((val: any, i: number) => {
                                                return (
                                                    <span
                                                        onClick={() => setTempFilterData('destination', val.name)}
                                                        className={`text-xxs font-medium px-3 py-1.5 rounded border-gray-100/5 cursor-pointer ${tempDestinationFilter.includes(val.name) ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-100/10 text-black'}`}
                                                    >
                                                        {val.name}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 gap-4">
                                        {/* <button onClick={() => setTempDestinationFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                                        <button
                                            onClick={() => {
                                                setMainMobileFilterModal(true)
                                                setSecondaryMobileFilterModal(null)
                                            }}
                                            className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold"
                                        >
                                            Done
                                        </button> */}
                                        <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempDestinationFilter([])} className='w-1/2' />
                                        <Button text='DONE' size='sm' handleClick={() => {
                                            setMainMobileFilterModal(true)
                                            setSecondaryMobileFilterModal(null)
                                        }} className='w-full' />
                                    </div>
                                </div>
                            )}
                            {secondaryMobileFilterModal === 'month' && (
                                <div className="">
                                    <div className="mb-2">
                                        <div className="flex flex-wrap gap-2">
                                            {availableDates.map((date: any) => {
                                                return (
                                                    <span
                                                        onClick={() => setTempFilterData('month', date)}
                                                        className={`text-xxs font-medium px-3 py-1.5 rounded border-gray-100/5 cursor-pointer ${tempMonthFilter.includes(date) ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-100/10 text-black'}`}
                                                    >
                                                        {moment(date, "MM-YYYY").format("MMM YY")}
                                                    </span>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 gap-4">
                                        {/* <button onClick={() => setTempMonthFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                                        <button
                                            onClick={() => {
                                                setMainMobileFilterModal(true)
                                                setSecondaryMobileFilterModal(null)
                                            }}
                                            className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold"
                                        >
                                            Done
                                        </button> */}
                                        <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempMonthFilter([])} className='w-1/2' />
                                        <Button text='DONE' size='sm' handleClick={() => {
                                            setMainMobileFilterModal(true)
                                            setSecondaryMobileFilterModal(null)
                                        }} className='w-full' />
                                    </div>
                                </div>
                            )}
                            {secondaryMobileFilterModal === 'nights' && (
                                <div className="">
                                    <div className="mb-2">
                                        <div className="flex flex-wrap gap-2">
                                            {nightList.map((val: any, i: number) => {
                                                return (
                                                    <span
                                                        onClick={() => setTempFilterData('nights', val)}
                                                        className={`text-xxs font-medium px-3 py-1.5 rounded border-gray-100/5 cursor-pointer ${tempNoOfNightFilter.includes(val) ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-100/10 text-black'}`}
                                                    >
                                                        {val} Nights
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 gap-4">
                                        {/* <button onClick={() => setTempNoOfNightFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                                        <button
                                            onClick={() => {
                                                setMainMobileFilterModal(true)
                                                setSecondaryMobileFilterModal(null)
                                            }}
                                            className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold"
                                        >
                                            Done
                                        </button> */}
                                        <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempNoOfNightFilter([])} className='w-1/2' />
                                        <Button text='DONE' size='sm' handleClick={() => {
                                            setMainMobileFilterModal(true)
                                            setSecondaryMobileFilterModal(null)
                                        }} className='w-full' />
                                    </div>
                                </div>
                            )}
                            {secondaryMobileFilterModal === 'cruise' && (
                                <div className="">
                                    <div className="mb-2">
                                        <div className="flex flex-wrap gap-2">
                                            {shipsList.map((val: any, i: number) => {
                                                return (
                                                    <span
                                                        onClick={() => setTempFilterData('cruise', val)}
                                                        className={`text-xxs font-medium px-3 py-1.5 rounded border-gray-100/5 cursor-pointer ${tempCruiseFilter.some(c => c.name === val.name) ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white' : 'bg-gray-100/10 text-black'}`}
                                                    >
                                                        {val.name}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 gap-4">
                                        {/* <button onClick={() => setTempCruiseFilter([])} className="w-1/2 border border-brand-primary text-brand-primary px-6 py-2.5 rounded-md font-semibold">RESET</button>
                                        <button
                                            onClick={() => {
                                                setMainMobileFilterModal(true)
                                                setSecondaryMobileFilterModal(null)
                                            }}
                                            className="w-full bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold"
                                        >
                                            Done
                                        </button> */}
                                        <Button text='RESET' size='sm' type='secondary' handleClick={() => setTempCruiseFilter([])} className='w-1/2' />
                                        <Button text='DONE' size='sm' handleClick={() => {
                                            setMainMobileFilterModal(true)
                                            setSecondaryMobileFilterModal(null)
                                        }} className='w-full' />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* main filter */}
            <Modal show={mainFilter} align={'center'} className="max-h-[70%] overflow-y-scroll no-scrollbar drop-shadow bg-white w-[90%] lg:w-[40%] center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => {
                setMainFilter(false)
            }}>
                <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>Filters</h1>
                    <svg
                        onClick={() => setMainFilter(false)}
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
                <div className='px-6 pb-8'>
                    <div>
                        <p className='font-semibold'>Trip Type</p>
                        <div className='flex mt-2 gap-2'>
                            <div onClick={() => setTempFilterData('trip', 'one_way')} className={`flex text-xxs font-medium px-3 py-1.5 rounded bg-gray-100/10 border-gray-100/5 cursor-pointer from-brand-primary to-brand-secondary hover:text-white ${tempTripTypeFilter.includes('one_way') ? 'bg-gradient-to-r text-white' : 'hover:bg-gradient-to-r text-black'}`}>
                                <img className='mr-2' src={`${tempTripTypeFilter.includes('one_way') ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway_white.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-black-icon.svg'}`} alt="" />
                                <p className='text-xxs lg:text-sm font-normal'>One Way</p>
                            </div>
                            <div onClick={() => setTempFilterData('trip', 'round')} className={`flex text-xxs font-medium px-3 py-1.5 rounded bg-gray-100/10 border-gray-100/5 cursor-pointer from-brand-primary to-brand-secondary hover:text-white ${tempTripTypeFilter.includes('round') ? 'bg-gradient-to-r text-white' : 'hover:bg-gradient-to-r text-black'}`}>
                                <img className='mr-2' src={`${tempTripTypeFilter.includes('round') ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip_white.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-black-icon.svg'}`} alt="" />
                                <p className='text-xxs lg:text-sm font-normal'>Round Trip</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Departure Port</p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {origin && origin.map((val: any, i: number) => {
                                return (
                                    <div
                                        onClick={() => setTempFilterData('origin', val.name)}
                                        key={i}
                                        className={`text-xxs font-medium px-3 py-1.5 rounded bg-gray-100/10 border-gray-100/5 cursor-pointer from-brand-primary to-brand-secondary hover:text-white ${tempOriginFilter.includes(val.name) ? 'bg-gradient-to-r text-white' : 'hover:bg-gradient-to-r text-black'}`}
                                    >
                                        <p className='text-xxs lg:text-sm font-normal'>{val.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='border-t border-gray-300 my-4 w-full' />
                    <div className='flex justify-center gap-4'>
                        <div className='mt-3 w-[150px]'>
                            <Button text='Reset All' size='base' type='secondary' handleClick={() => {
                                setTempTripTypeFilter([])
                                setTempOriginFilter([])
                            }} className='w-full' />
                        </div>
                        <div className='mt-3 w-[150px]'>
                            <Button text='Apply' size='base' handleClick={() => {
                                applyFilter()
                                setMainFilter(false)
                            }} className='w-full' />
                        </div>
                    </div>
                </div>
            </Modal>

            {isOpenNewSortAndFilter && <NewSortAndFilterBottomSheet />}

            <Modal show={innerWidth > 600 && showRequestACallback} align='center' onClose={handleCloseReqCallback}>
                <div className='bg-white w-[450px] rounded-md'>
                    <div className='border-b border-gray-300 p-4 flex items-center justify-between'>
                        <h1 className='text-2xl font-bold font-openSans'>Request a Callback</h1>
                        <svg
                            onClick={handleCloseReqCallback}
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
                    <div className='p-4'>
                        <form className='' onSubmit={handleSubmit(submitForm)}>
                            <div className="">
                                <div className='mb-2'>
                                    <label className='text-sm font-semibold mb-1 block'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        className='border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('name', { required: "Name is required." })}
                                    />
                                    {errors.name && <p className='text-xs text-danger'>{errors.name.message}</p>}
                                </div>
                                <div className='mb-2'>
                                    <label className='text-sm font-semibold mb-1 block'>Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='Email Address'
                                        className='border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50'
                                        {...register('email', {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Enter a valid email address."
                                            }
                                        })}
                                    />
                                    {errors.email && <p className='text-xs text-danger'>{errors.email.message}</p>}
                                </div>
                                <div className='mb-2'>
                                    <label className='text-sm font-semibold block mb-1'>Phone Number</label>
                                    <div className="flex">
                                        <div className="lg:col-span-2 col-span-2 w-[22%]">
                                            <div className={`grid grid-cols-1 gap-4 w-full h-[48px] bg-gray-400 overflow-hidden rounded-l-md`}>
                                                <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                                                <Select
                                                    menuPortalTarget={document.body}
                                                    menuPosition={'fixed'}
                                                    value={{ label: country }}
                                                    maxMenuHeight={290}
                                                    options={PhoneCode}
                                                    onChange={item => setCountry(item?.value)}
                                                    styles={customStyles}
                                                />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-7 col-span-7 w-[78%]">
                                            <input
                                                id="phone_number"
                                                {...register('phone_number', {
                                                    required: "Please enter a valid mobile number",
                                                    pattern: {
                                                        value: country === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                                                        message: "Please enter a valid mobile number",
                                                    },
                                                    maxLength: country === "+91" ? 10 : 12, // Set maxLength to 10 for +91 and 12 for others
                                                })}
                                                maxLength={country === "+91" ? 10 : 12} // Ensure that maxLength is correctly set
                                                className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                                                type="tel"
                                                placeholder="Phone Number"
                                            />
                                            {errors.phone_number && (
                                                <span className="text-danger text-xs">
                                                    {errors.phone_number && <p className='text-xs text-danger'>{errors.phone_number.message}</p>}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4 lg:mt-3">
                                <Button text="Submit" disabled={loading} isLoading={loading} className="px-12" />
                            </div>
                            {errorMsg &&
                                <div className="text-center mt-4">
                                    <p className="text-sm font-semibold text-danger">{errorMsg}</p>
                                </div>
                            }
                        </form>

                        <Modal
                            show={showOTPModal}
                            align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[350px] lg:min-h-[350px] max-h-[85vh] lg:w-[35%] w-[95%]"
                            maxHeight='100vh'
                        >
                            <div className="w-full relative">
                                <button
                                    onClick={() => {
                                        setShowOTPModal(false)
                                        setOtp('');
                                        setTimer(30);
                                        setOtpError('');
                                    }}
                                    className="absolute -top-5 right-4 text-[40px] text-black"
                                >
                                    &times;
                                </button>
                                <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                                    <p>Verify your phone number</p>
                                </div>

                                <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                                    <p className="px-2 text-sm">
                                        We've sent a 4-digit code to{' '}
                                        <span className="font-semibold">{watch().phone_number}</span>{' '}
                                        <span className="block">
                                            Enter the code below to continue.
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                                    <OtpInput
                                        autoComplete="one-time-code"
                                        // isDisabled={!showOTP}
                                        value={otp}
                                        onChange={(otp: string) => {
                                            setOtpError('')
                                            setOtp(otp);
                                        }}
                                        numInputs={4}
                                        separator={<span className="px-2"></span>}
                                        containerStyle=" mx-auto"
                                        inputStyle={{
                                            margin: otpWidth,
                                            width: '3rem',
                                            height: '3rem',
                                            color: 'black',
                                            fontSize: ' 0.875rem',
                                            borderRadius: 4,
                                            border: '1px solid #E6E8EC',
                                            backgroundColor: '#F5F5F5'
                                        }}
                                        isInputNum={true}
                                    />
                                </div>

                                {otpError ? <p className='flex flex-wrap justify-center text-red text-sm mt-4 mb-4' >{otpError}</p> : null}
                                {errors && errors?.phone_number?.message ? <p className='flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4' >{errors?.phone_number?.message}</p> : null}
                                <div className="lg:px-10 px-4">
                                    <Button text="Verify & Continue" disabled={(otp.toString().length < 4) || verifyLoading} isLoading={verifyLoading} handleClick={handleSubmit(submitOtp)} className="w-full" />
                                </div>

                                <div className="mb-8">
                                    <div className="mt-4 text-center">
                                        {timer === END_TIMER ? (
                                            <p
                                                className=" cursor-pointer underline text-brand-primary"
                                                onClick={resendOTP}
                                            >
                                                Didn't receive the code?
                                            </p>
                                        ) : (
                                            <p className="text-sm font-semibold">
                                                Didn't receive the code? Resend in{' '}
                                                <span className="underline">{`00:${String(timer).padStart(2, "0")}`}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-center px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                                    <p className='text-xs lg:text-sm'>
                                        By verifying, you agree to our{' '}
                                        <Link
                                            to={'/terms-condition'}
                                            target="_blank"
                                            className="text-brand-primary italic"
                                        >
                                            [Terms and Conditions]
                                        </Link>{' '}
                                        and{' '}
                                        <a
                                            href={
                                                'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'
                                            }
                                            target="_blank"
                                            className="text-brand-primary italic"
                                        >
                                            [Privacy Policy]
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </Modal>

            <BottomSheet
                isOpen={innerWidth < 600 && showRequestACallback}
                setIsOpen={handleCloseReqCallback}
                onClose={handleCloseReqCallback}
                title="Request a Callback"
                hasBtns={false}
            >
                <div className="pt-5">
                    <form className="" onSubmit={handleSubmit(submitForm)}>
                        <div className="">
                            <div className="mb-2">
                                <label className="text-sm font-semibold mb-1 block">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                                    {...register('name', { required: 'Name is required.' })}
                                />
                                {errors.name && (
                                    <p className="text-xs text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label className="text-sm font-semibold mb-1 block">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                                    {...register('email', {
                                        required: 'Email is required.',
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: 'Enter a valid email address.'
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-xs text-danger">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label className="text-sm font-semibold block mb-1">
                                    Phone Number
                                </label>
                                <div className="flex">
                                    <div className="lg:col-span-2 col-span-2 w-1/4 lg:w-[22%]">
                                        <div className={`grid grid-cols-1 gap-4 bg-gray-400 w-full h-[48px] overflow-hidden rounded-l-md`}>
                                            <input
                                                type="hidden"
                                                id="zc_gad"
                                                name="zc_gad"
                                                value=""
                                            />
                                            <Select
                                                menuPortalTarget={document.body}
                                                menuPosition={'fixed'}
                                                value={{ label: country }}
                                                maxMenuHeight={290}
                                                options={PhoneCode}
                                                onChange={(item) => setCountry(item?.value)}
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-7 col-span-7 w-3/4 lg:w-[78%]">
                                        <input
                                            id="phone_number"
                                            {...register('phone_number', {
                                                required: 'Please enter a valid mobile number',
                                                pattern: {
                                                    value:
                                                        country === '+91'
                                                            ? /^[0-9]{10}$/
                                                            : /^[0-9]{6,12}$/, // Regex for 6-12 digits if not +91
                                                    message: 'Please enter a valid mobile number'
                                                },
                                                maxLength: country === '+91' ? 10 : 12 // Set maxLength to 10 for +91 and 12 for others
                                            })}
                                            maxLength={country === '+91' ? 10 : 12} // Ensure that maxLength is correctly set
                                            className="border border-gray-100/10 bg-gray-400 w-full mt-0 rounded-r-md h-12 mb-2 placeholder:text-sm placeholder:text-gray-100/50"
                                            type="tel"
                                            placeholder="Phone Number"
                                        />
                                        {errors.phone_number && (
                                            <span className="text-danger text-xs">
                                                {errors.phone_number && (
                                                    <p className="text-xs text-danger">
                                                        {errors.phone_number.message}
                                                    </p>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center pt-5 lg:mt-3 border-t border-gray-300">
                            <Button
                                text="Submit"
                                disabled={loading}
                                isLoading={loading}
                                className="px-12 w-full"
                            />
                        </div>
                        {errorMsg && (
                            <div className="text-center mt-4">
                                <p className="text-sm font-semibold text-danger">
                                    {errorMsg}
                                </p>
                            </div>
                        )}
                    </form>

                    <BottomSheet
                        isOpen={showOTPModal}
                        setIsOpen={handleCloseReqCallback}
                        onClose={() => {
                            setShowOTPModal(false);
                            setOtp('');
                            setTimer(30);
                            setOtpError('');
                        }}
                        title="Request a Callback"
                        hasBtns={false}
                    >
                        <div className="w-full">
                            <button
                                onClick={() => {
                                    setShowOTPModal(false);
                                    setOtp('');
                                    setTimer(30);
                                    setOtpError('');
                                }}
                                className="hidden lg:block absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
                            >
                                &times;
                            </button>
                            <div className=" flex gap-3 justify-center text-xl font-bold self-center px-4 lg:pb-3 mt-5">
                                <p>Verify your phone number</p>
                            </div>

                            <div className="text-center lg:px-16 px:12 mt-3 lg:mt-4">
                                <p className="px-2 text-sm">
                                    We've sent a 4-digit code to{' '}
                                    <span className="font-semibold">{watch().phone_number}</span>{' '}
                                    <span className="block">
                                        Enter the code below to continue.
                                    </span>
                                </p>
                            </div>
                            <div className="flex justify-around mt-8 lg:mt-4 mb-4 lg:px-10">
                                <OtpInput
                                    autoComplete="one-time-code"
                                    // isDisabled={!showOTP}
                                    value={otp}
                                    onChange={(otp: string) => {
                                        setOtpError('');
                                        setOtp(otp);
                                    }}
                                    numInputs={4}
                                    separator={<span className="px-2"></span>}
                                    containerStyle=" mx-auto"
                                    inputStyle={{
                                        margin: otpWidth,
                                        width: '3rem',
                                        height: '3rem',
                                        color: 'black',
                                        fontSize: ' 0.875rem',
                                        borderRadius: 4,
                                        border: '1px solid #E6E8EC',
                                        backgroundColor: '#F5F5F5'
                                    }}
                                    isInputNum={true}
                                />
                            </div>

                            {otpError ? (
                                <p className="flex flex-wrap justify-center text-red text-sm mt-4 mb-4">
                                    {otpError}
                                </p>
                            ) : null}
                            {errors && errors?.phone_number?.message ? (
                                <p className="flex flex-wrap px-10 text-center justify-center text-red text-sm mt-4 mb-4">
                                    {errors?.phone_number?.message}
                                </p>
                            ) : null}
                            <div className="lg:px-10 px-4">
                                <Button
                                    text="Verify & Continue"
                                    disabled={(otp.toString().length < 4) || verifyLoading}
                                    isLoading={verifyLoading}
                                    handleClick={handleSubmit(submitOtp)}
                                    className="w-full"
                                />
                            </div>

                            <div className="mb-8">
                                <div className="mt-4 text-center">
                                    {timer === END_TIMER ? (
                                        <p
                                            className=" cursor-pointer underline text-brand-primary"
                                            onClick={resendOTP}
                                        >
                                            Didn't receive the code?
                                        </p>
                                    ) : (
                                        <p className="text-sm font-semibold">
                                            Didn't receive the code? Resend in{' '}
                                            <span className="underline">{`00:${String(timer).padStart(2, "0")}`}</span>
                                        </p>
                                    )}
                                    {/* <p >Edit mobile number</p> */}
                                </div>
                            </div>
                            <div className="text-center px-4 mb-3 lg:mb-4 text-xs text-gray-100">
                                <p className='text-xs lg:text-sm'>
                                    By verifying, you agree to our{' '}
                                    <Link
                                        to={'/terms-condition'}
                                        target="_blank"
                                        className="text-brand-primary italic"
                                    >
                                        [Terms and Conditions]
                                    </Link>{' '}
                                    and{' '}
                                    <a
                                        href={'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Privacy%20Policy%2017.10.2024.pdf'}
                                        target="_blank"
                                        className="text-brand-primary italic"
                                    >
                                        [Privacy Policy]
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </BottomSheet>
                </div>
            </BottomSheet>

            <Modal show={showSuccessModal} align={'center'} className="w-[85%] lg:w-[40%] relative border-t-4 border-brand-primary rounded-md overflow-hidden" onClose={() => setShowSuccessModal(false)}>
                <div className='w-full h-full bg-white shadow-lg'>
                    <div className='absolute right-3 top-3'>
                        <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='min-h-[100px] pt-10 px-5 lg:pt-7 pb-10 rounded-md overflow-hidden'>
                        <div className='flex justify-center mb-5'>
                            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/icon_success_green.svg" alt="success_icon" />
                        </div>
                        <p className='text-md text-gray-700 text-center font-semibold'>{success}</p>
                    </div>
                </div>
            </Modal>
            <div onClick={() => handleOpenReqCallback('sticky')} className='fixed left-0 bottom-[17%] z-30 bg-gradient-to-t from-[#92278F] via-[#D1527D] to-[#EA725B] font-bold text-white lg:py-10 py-6 px-2 lg:px-3 rounded-r-md cursor-pointer text-xxs lg:text-base' style={{ writingMode: 'sideways-lr' }}>
                Request a callback
            </div>
        </Layout>
    );
}
