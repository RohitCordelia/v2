import React, { useEffect, useState, useRef } from 'react'
import { Layout } from '../../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetStore } from '../../../utils/store/store';
import Modal from '../../../components/UI/ModalCenter';
import { Select as SelectField } from '../../../../src/components/UI/Forms/Inputs';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { SelectAnyValue } from '../../../../src/utils/validations/formValidations';
import { DateFormate } from "../../../utils/formatter/formatter"
import CountryStates from "../../../components/UI/Forms/Inputs/country-states.json";
import StateCities from "../../../components/UI/Forms/Inputs/state-cities.json";
import phoneCodes from "../../../components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { useGetBookingDataMutation, useUpdateGuestMutation } from '../../../../src/services/profile/profile';
import { GetManageDetail, SaveManageDetail } from '../../../utils/store/store';
import { useGuestInfoByUploadDocumentMutation } from '../../../services/webCheckIn/webCheckIn';
import compressFile from '../../webCheckIn/components/compressFile';
import DoubleSideDoc from '../../guestDetail/component/DoubleSideDoc';
import SingleSideDoc from '../../guestDetail/component/SingleSideDoc';
import Button from '../../../components/UI/Button';
import PreviewGuest from '../../../component/PreviewGuest';
import { useDispatch } from 'react-redux';
import { setGuestIndex } from '../../../services/upcomingCruise/upcomingCruiseSlice';

type Props = {}

const ManageDetail = GetManageDetail();
let availroom: any = ManageDetail.getBooking;

const docOptions = [
    { code: 'passport', name: 'Passport' },
    { code: 'aadhar_card', name: 'Aadhaar Card' },
    { code: 'pan_card', name: 'Pan Card' },
    // { code: 'election_id', name: "Voter's ID" },
    { code: 'driving_license', name: 'Driving Licence' },
    // { code: 'birth_certificate', name: 'Birth Certificate' },
    // { code: 'intl_passport', name: 'International Passport' },
];
const genderList = [
    { code: 'male', name: 'Male' },
    { code: 'female', name: 'Female' }
]
const citizenshipList = [
    { code: 'indian', name: 'Indian' },
    { code: 'NRI', name: 'NRI' },
    { code: 'Other', name: 'Other' },
]
const mealList = [
    { code: 'Vegetarian', name: 'Vegetarian' },
    { code: 'Jain', name: 'Jain' },
    { code: 'Non. Veg', name: 'Non-Vegetarian' },
    { code: 'Gluten Free', name: 'Gluten Free' }
]

export default function Cabin({ prefix }: Props) {

    const customStyles = {
        control: (styles: any) => ({ ...styles, backgroundColor: '#ffffff', border: '2px solid #ccc', height: '50px' }),
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
        dropdownIndicator: (styles: any) => ({
            ...styles,
            padding: '1px'
        })
    };

    const store = GetStore();
    let navigate = useNavigate()
    const location = useLocation();
    const { roomIndex, guestIndex } = location.state || {};

    const { itinerary } = store;
    const ManageDetail = GetManageDetail();
    let bookingRoute: any = ManageDetail.myBooking;
    let booking: any = ManageDetail.getBooking;
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(roomIndex || 0);
    const [selectedGuestIndex, setSelectedGuestIndex] = useState<number>(guestIndex || 0);
    const [availRooms, setAvailRooms] = useState<any>([{
        adults: 1,
        children: 0,
        infants: 0,
        seq: 1,
    }
    ]);
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');

    const [countryStatesArray, setCountryState] = useState({});
    const [state, setState] = useState({})
    const [isIndia, setIsIndia] = useState<any>({})
    const [getBookingData] = useGetBookingDataMutation();
    const [updateGuest] = useUpdateGuestMutation();

    const [bookingData, setBookingData] = useState<any>([]);
    const [selectedDoc, setSelectedDoc] = useState<any>();
    const [docLoading, setDocLoading] = useState({ frontDoc: false, backDoc: false });
    const [docError, setDocError] = useState({});
    const [docDetails, setDocDetails] = useState<any>({});
    const [description, setDescription] = useState(false);
    const [guestInfoByUploadDocument] = useGuestInfoByUploadDocumentMutation();
    const [guestType, setGuestType] = useState("ADULT");
    const [isExpanded, setIsExpanded] = useState(false);



    const [isPreviewGuestModalOpen, setIsPreviewGuestModalOpen] = useState(false);
    const [roomsInputData, setRoomsInputData] = useState<any[] | undefined>([]);
    const [persistedReviewedGuests, setPersistedReviewedGuests] = useState();

    const isDoubleSideDoc =
        selectedDoc?.code == 'passport' || selectedDoc?.code == 'aadhar_card';

    const isSingleSideDoc =
        selectedDoc?.code == 'election_id' ||
        selectedDoc?.code == 'pan_card' ||
        selectedDoc?.code == 'driving_license' ||
        // selectedDoc?.code == 'intl_passport' ||
        selectedDoc?.code == 'birth_certificate';

    const dispatch = useDispatch();

    useEffect(() => {
        if (bookingData) {
            setValue(`${selectedRoomIndex}_${selectedGuestIndex}_type`, bookingData?.rooms?.[selectedRoomIndex]?.guest_details?.[selectedGuestIndex]?.type);
        }
    }, [bookingData])

    const getBookingDataa = async () => {
        // setLoading(true)
        await getBookingData(bookingRoute[0]?.booking_id)
            .unwrap()
            .then((res: any) => {
                setBookingData(res);
                SaveManageDetail({
                    ...ManageDetail,
                    getBooking: res
                });
                // setLoading(false)
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

    useEffect(() => {
        let a: any = {}
        let ind: any = {}

        // availRooms?.forEach((room: any, roomIndex: any) => {
        //     const count = room.adults + room.children + room.infants;
        //     const guests = [...(room.guests || Array(count).fill({}))];
        //     if (guests.length < count)
        //         guests.push(...Array(count - guests.length).fill({}));
        //     guests.splice(count);

        //     guests.map((guest, i: any) => {
        //         let tempData = room && room.guests ? room.guests[i] : null;
        //         const prefix = `${roomIndex}_${i}`;
        //         if (tempData) {
        //             ind[`${prefix}_country`] = tempData.country
        //             setValue(`${prefix}_country`, tempData.country);
        //             setValue(`${prefix}_state`, tempData.state);
        //             if (tempData.country == 'India') {
        //                 setValue(`${prefix}_cities`, tempData.city);
        //             }
        //             a[prefix] = CountryStates.countries.filter((country) => country.country === tempData.country)[0].states
        //         } else {
        //             a[prefix] = CountryStates.countries.filter((country) => country.country === 'India')[0].states
        //             ind[`${prefix}_country`] = 'India'
        //             setValue(`${prefix}_country`, 'India');
        //         }
        //     })
        // })
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        setValue(`${prefix}_country`, 'India');
        a[prefix] = CountryStates.countries.filter((country) => country.country === 'India')[0].states
        ind[`${prefix}_country`] = 'India'

        setIsIndia(ind)
        setCountryState(a);
    }, [])

    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        setError,
        setValue,
        getValues,
        clearErrors,
        reset,
        trigger
    } = useForm({});

    const inputRef = useRef(null);
    const [dobError, setDobError] = useState('');

    useEffect(() => {
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        const guestEntry = docDetails[prefix] || {};
        const frontData = guestEntry.front_img || {};
        const backData = guestEntry.back_img || {};

        // Create union of all keys from both front and back
        const allKeys = new Set([
            ...Object.keys(backData),
            ...Object.keys(frontData),
        ]);

        // Build merged guestData, front overrides back **only if non-null**
        const guestData: Record<string, any> = {};

        allKeys.forEach((key) => {
            const backVal = backData[key] ?? null;
            const frontVal = frontData[key] ?? null;

            let valueToUse = frontVal !== null && frontVal !== "" ? frontVal : backVal;

            if (key === "state" && typeof valueToUse === "string") {
                valueToUse = valueToUse.charAt(0).toUpperCase() + valueToUse.slice(1).toLowerCase();
            }

            guestData[key] = valueToUse;
        });

        if (docDetails[prefix]?.web_checkin_doc_type) guestData.doc_type = docDetails[prefix]?.web_checkin_doc_type;

        const nameSplitArr = guestData?.card_name?.trim()?.split(/\s+/) || [];
        const firstName = nameSplitArr.length > 1
            ? nameSplitArr.slice(0, -1).join(' ')
            : nameSplitArr[0] || '';
        const lastName = nameSplitArr.length > 1
            ? nameSplitArr[nameSplitArr.length - 1]
            : '';

        // Set form values
        setValue(`${prefix}_first_name`, guestData.first_name || firstName || "");
        setValue(`${prefix}_last_name`, guestData.last_name || lastName || "");
        setValue(`${prefix}_gender`, guestData.gender?.toLowerCase() || "");
        setValue(`${prefix}_dob`, guestData.dob || "");
        setValue(`${prefix}_state`, guestData.state || "");
        if (!getValues(`${prefix}_id_number`) && guestData.doc_type === "passport") {
            setValue(`${prefix}_id_number`, guestData.id_number || "");
        }
        if (!getValues(`${prefix}_passport_issue_date`)) {
            setValue(`${prefix}_passport_issue_date`, guestData.passport_issue_date || "");
        }
        if (!getValues(`${prefix}_passport_expiry_date`)) {
            setValue(`${prefix}_passport_expiry_date`, guestData.passport_expiry_date || "");
        }
        if (!getValues(`${prefix}_passport_address`)) {
            setValue(`${prefix}_passport_address`, guestData.passport_address || "");
        }

        // Also update local state (used in <select>)
        if (guestData.state) {
            setState((prev) => ({
                ...prev,
                [prefix]: guestData.state?.toLowerCase(),
            }));
        }
    }, [selectedRoomIndex, selectedGuestIndex, docDetails, setValue]);

    useEffect(() => {
        if (inputRef.current && inputRef.current.value) {
            trigger(`${prefix}_dob`);
        }
    }, [setValue, trigger, prefix]);

    const validateDOB = (dob, type) => {
        if (!dob) {
            setDobError('Please enter a valid date of birth.');
            return false;
        }

        const today = new Date();
        const dobDate = new Date(dob);

        if (dobDate > today) {
            setDobError('Date of birth cannot be in the future.');
            return false;
        }

        const dateYearsAgo = (years) => {
            // const d = new Date(today);
            const d = new Date(store?.itinerary?.start_date || availroom?.sailing_date?.split("-")[0]);
            d.setFullYear(d.getFullYear() - years);
            return d;
        };

        const dobTooRecent = dobDate > dateYearsAgo(1); // Less than 1 year old
        if (dobTooRecent) {
            setDobError('Age must be at least 1 year.');
            return false;
        }

        if (type === 'ADULT') {
            const minAdultDOB = dateYearsAgo(12); // > 12 years
            if (dobDate > minAdultDOB) {
                setDobError('Adult must be older than 12 years.');
                return false;
            }
        } else if (type === 'CHILD') {
            const maxChildDOB = dateYearsAgo(2);  // at least 2 years
            const minChildDOB = dateYearsAgo(12); // up to 12 years
            if (dobDate < minChildDOB || dobDate > maxChildDOB) {
                setDobError('Child must be between 2 and 12 years old.');
                return false;
            }
        } else if (type === 'INFANT') {
            const maxInfantDOB = dateYearsAgo(1);  // at least 1 year
            const minInfantDOB = dateYearsAgo(2);  // up to 2 years
            if (dobDate < minInfantDOB || dobDate > maxInfantDOB) {
                setDobError('Infant must be between 1 and 2 years old.');
                return false;
            }
        }

        setDobError('');
        return true;
    };

    const handleFileChangeDoc = async (event: any, side: any) => {
        const file = event.target.files[0];
        const type = selectedDoc?.code;

        setDocLoading((prev) => ({
            ...prev,
            [side === "back" ? "backDoc" : "frontDoc"]: true,
        }));

        if (file) {
            let docFile = null;
            if (file.type.startsWith('image/')) {
                if (file.size > 1048000 * 3) {
                    docFile = await compressFile(file);
                } else {
                    docFile = file;
                }
            } else {
                docFile = file;
            }

            if (docFile.size < 1048000 * 5) {
                const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
                const guestFileId = localStorage.getItem("guest_doc_detail") && JSON.parse(localStorage.getItem("guest_doc_detail"))?.[prefix]?.guest_file_id;
                const formData: any = new FormData();
                formData.append(`web_checkin_doc_type`, type);
                formData.append(`document`, docFile);
                side === "back" && formData.append(`is_back`, true);
                side === "back" && guestFileId && formData.append(`guest_file_id`, guestFileId);

                const _payload = {
                    id: itinerary?.itinerary_id || availroom?.itinerary_id,
                    data: formData,
                };

                guestInfoByUploadDocument(_payload)
                    .unwrap()
                    .then((res) => {
                        const incoming = res.data || {};
                        setDocError({});

                        setDocDetails((prev) => {
                            // start from whatever merged object we had, or empty
                            const merged = { ...(prev[prefix] || {}) };

                            // apply your “only overwrite with non‐empty” rule
                            Object.entries(incoming).forEach(([k, v]) => {
                                if (v != null && v !== "") {
                                    merged[k] = v;
                                } else if (!(k in merged)) {
                                    merged[k] = v;
                                }
                            });

                            // add a “side” flag:
                            merged.side = side;

                            const next = {
                                ...prev,
                                [prefix]: merged,
                            };
                            localStorage.setItem("guest_doc_detail", JSON.stringify(next));
                            return next;
                        });
                    })
                    .catch((res: any) => {
                        console.log('roh Error: ', res);
                        let errorObj = {
                            step1: {
                                docError: res?.data?.message,
                                skip_doc_verification: res?.data?.data?.skip_doc_verification,
                                doc_url:
                                    // type == 'birth_certificate' || type == 'intl_passport'
                                    type == 'birth_certificate'
                                        ? res?.data?.data?.guest?.web_checkin_doc_url
                                        : null,
                                type:
                                    // type == 'birth_certificate' || type == 'intl_passport'
                                    type == 'birth_certificate'
                                        ? type
                                        : null
                            }
                        };
                        setDocError(errorObj);
                    })
                    .finally(() => setDocLoading({ frontDoc: false, backDoc: false }));
            } else {
                let errorObj = {
                    step1: {
                        docError: 'File exceeds the size limit. Max size: 5MB.',
                        errorType: 'fileExceed'
                    }
                };
                setDocError(errorObj);
            }
        }
    };

    const handleRemoveDoc = (side: "front" | "back") => {
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;

        setDocDetails((prev) => {
            const updated = { ...(prev[prefix] || {}) };

            if (side === 'front') {
                delete updated.front_img;
            } else {
                delete updated.back_img;
            }

            const shouldDelete = !updated.front_img && !updated.back_img;

            const next = { ...prev };
            if (shouldDelete) {
                delete next[prefix];
            } else {
                next[prefix] = updated;
            }

            localStorage.setItem("guest_doc_detail", JSON.stringify(next));

            // Dynamically get the keys to clear based on removed side
            const removedData = side === 'front' ? prev[prefix]?.front_img : prev[prefix]?.back_img;

            if (removedData) {
                Object.keys(removedData).forEach((field) => {
                    setValue(`${prefix}_${field}`, ""); // Clear form value for each field dynamically
                });
            }

            return next;
        });
    };

    const prefixx = `${selectedRoomIndex}_${selectedGuestIndex}`;
    const currentDoc = docDetails[prefixx] || {};
    const alreadyUploaded = Object.keys(currentDoc).length > 0;

    useEffect(() => {
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        const current = docDetails[prefix] || {};
        if (current.web_checkin_doc_type) {
            const option = docOptions.find(o => o.code === current.web_checkin_doc_type);
            setSelectedDoc(option);
            setValue(`${prefix}_document`, option?.code);
        } else {
            setSelectedDoc(undefined);
            setValue(`${prefix}_document`, "");
        }
    }, [selectedRoomIndex, selectedGuestIndex, docDetails]);

    useEffect(() => {
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        const currentState = getValues(`${prefix}_state`) || "";

        if (currentState && currentState !== state[prefix]) {
            setState(prev => ({
                ...prev,
                [prefix]: currentState
            }));
        }
    }, [prefix, docDetails, getValues, state]);

    const buildGuests = (room: any, roomIndex: any, guestDocDetailsMap: any, includeDocData = false) =>
        room.guests.map((guest: any, guestIndex: any) => {
            const prefix = `${roomIndex}_${guestIndex}`;
            const docDetails = guestDocDetailsMap[prefix] || {};
            const docType = docDetails?.web_checkin_doc_type || "";
            const docNumber = docDetails?.front_img?.id_number || docDetails?.back_img?.id_number || "";
            const guestFileId = docDetails?.guest_file_id || "";

            return {
                type: guest.type,
                phone: guest.mobile,
                date_of_birth: guest.dob,
                city: guest.cities,
                citizenship: guest.citizen,
                is_nri: guest.citizen === 'indian' ? "false" : "true",
                meal: guest.meal,
                first_name: guest.first,
                last_name: guest.last,
                gender: guest.gender.toUpperCase(),
                country: guest.country,
                state: guest.state,
                email: guest.email,
                country_code: guest.countryCode,
                ...(includeDocData && {
                    doc_number: docNumber,
                    doc_type: docType,
                    guest_file_id: guestFileId,
                }),
                passport_issue_date: guest.passportIssueDate,
                passport_expiry_date: guest.passportExpiryDate,
                passport_number: guest.passportNumber,
                passport_address: guest.passportAddress,
            };
        });

    const preparePreviewData = (includeDocData: any) => {
        const data = getValues();
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        if (!alreadyUploaded && guestType !== "INFANT" && !data.document) {
            setError(`${prefix}_document`, {
                type: "manual",
                message: "Please select a document and upload",
            });
            return;
        }

        const newRooms = [...availRooms].map((room) =>
            Object.assign({}, room, {
                guests: [...(room.guests || [])].map((guest) =>
                    Object.assign({}, guest)
                ),
            })
        );

        Object.keys(data).forEach((key) => {
            const [roomIndex, guestIndex, field] = key.split("_");

            if (!newRooms[0]) return;

            if (!Array.isArray(newRooms[0].guests)) {
                newRooms[0].guests = [];
            }

            if (!newRooms[0].guests[0]) {
                newRooms[0].guests[0] = {};
            }

            newRooms[0].guests[0] = {
                ...newRooms[0].guests[0],
                [field]: data[key],
            };
        });

        for (let roomIndex = 0; roomIndex < newRooms.length; roomIndex++) {
            const room = newRooms[roomIndex];
            for (let guestIndex = 0; guestIndex < room.guests.length; guestIndex++) {
                const guest = room.guests[guestIndex];
                const dob = guest.dob;
                const type = guest.type;
                if (!dob || !type) continue;
            }
        }

        const guestDocDetailsMap = JSON.parse(localStorage.getItem("guest_doc_detail") || "{}");

        return newRooms.map((room, roomIndex) => ({
            ...room,
            guests: buildGuests(room, roomIndex, guestDocDetailsMap, includeDocData),
        }));
    }

    const previewGuest = () => {
        dispatch(setGuestIndex({
            roomIndex: selectedRoomIndex,
            guestIndex: selectedGuestIndex,
        }));
        const roomsInputForPreview = preparePreviewData(true);
        setRoomsInputData(roomsInputForPreview);
        setIsPreviewGuestModalOpen(true);
    }

    const onSubmit = async () => {
        setLoading(true);
        setIsPreviewGuestModalOpen(false)
        let actual_data = getValues();

        const data = Object.entries(actual_data).reduce((acc: any, [key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                const regex = new RegExp(`^${roomIndex}_${guestIndex}_`);
                const newKey = key
                    .replace(regex, "")
                    .replace("mobile", "phone")
                    .replace("citizen", "citizenship")
                    .replace("cities", "city")
                    .replace("dob", "date_of_birth");
                acc[newKey] = value;
            }
            return acc;
        }, {});

        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        const guestDocDetails = JSON.parse(localStorage.getItem("guest_doc_detail") || "{}")[prefix] || {};
        const docType = guestDocDetails?.web_checkin_doc_type || "";
        const docNumber = guestDocDetails?.front_img?.id_number || guestDocDetails?.back_img?.id_number || "";
        const guestFileId = guestDocDetails?.guest_file_id || "";

        const guestData = {
            bkroom_id: booking?.rooms[selectedRoomIndex]?.guest_details?.[selectedGuestIndex]?.room_id,
            guests: [
                {
                    ...data,
                    guest_id: booking?.rooms[selectedRoomIndex]?.guest_details?.[selectedGuestIndex]?.id,
                    is_nri: false,
                    country_code: countryCode,
                    doc_number: docNumber,
                    doc_type: docType,
                    guest_file_id: guestFileId,
                }
            ]
        };

        const _payload = {
            id: booking?.id,
            data: guestData
        };

        updateGuest(_payload)
            .unwrap()
            .then(async (res: any) => {
                await getBookingDataa();
                navigate('/manage-booking/updateGuest')
            })
            .catch((err: any) => {
                setLoading(false);
                console.log('Error:', err);
            })
            .finally(() => {
                setLoading(false);
                reset();
                handleRemoveDoc("front");
                isDoubleSideDoc && handleRemoveDoc("back");
            });
    };

    const startDate = (date: any) => {
        const [startDateStr, endDateStr] = date?.split(' - ');

        function formatDate(dateStr: any) {
            const [day, month, year] = dateStr?.split('/');
            return `${day} ${month} ${year}`;
        }
        const formattedStartDate = formatDate(startDateStr);
        return formattedStartDate

    };

    const GuestContainer = () => {
        const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
        const selectedType = useWatch({ control, name: `${prefix}_type` });

        return (
            <div className=' shadow-allSide'>
                <div className='flex shadow-allSide'>
                    <button
                        className={`lg:text-base text-xs w-full font-bold py-2.5 px-5 -mb-0.5 border-b-2 border-b-brand-primary`}
                    >
                        <p>Guest {selectedGuestIndex + 1}</p>
                        <p className='text-xxs text-gray-900'>{guestType}</p>
                    </button>
                </div>

                <div className={`block lg:px-4 px-2`}>
                    <div className='pt-4' >
                        <label className="text-sm font-semibold">ID Proof:</label>
                        {guestType !== "INFANT" ? <SelectField
                            value={selectedDoc?.code || ""}
                            name={`${prefix}_document`}
                            options={docOptions}
                            register={register}
                            validation={{
                                validate: (value: any) => {
                                    if (!alreadyUploaded && !value) {
                                        return "Please select and upload a valid document";
                                    }
                                    return true;
                                },
                            }}
                            selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed cursor-pointer"
                            className='!mb-0'
                            placeholder="Select Document"
                            error={!alreadyUploaded && errors && errors[`${prefix}_document`]}
                            errorText='Please select document'
                            onChange={(val: string) => {
                                setDocError({});
                                const selected = docOptions.find((opt) => opt.code === val);
                                setSelectedDoc(selected);
                                setValue(`${prefix}_document`, val);
                            }}
                            isDisabled={alreadyUploaded}
                        /> :
                            <SelectField
                                value={selectedDoc?.code || ""}
                                name={`${prefix}_document`}
                                options={docOptions}
                                selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed cursor-pointer"
                                className='!mb-4'
                                placeholder="Select Document"
                                error={false}
                                errorText=''
                                onChange={(val: string) => {
                                    const selected = docOptions.find((opt) => opt.code === val);
                                    setSelectedDoc(selected);
                                    setValue(`${prefix}_document`, val);
                                }}
                                isDisabled={alreadyUploaded}
                            />
                        }
                    </div>
                    {alreadyUploaded && <div className='text-brand-primary text-sm font-medium mt-2 mb-4'>
                        Your document has been uploaded Successfully!
                    </div>}
                    {<div className='mb-6'>
                        {docError?.step1?.docError ?
                            <div className='px-3 py-3 rounded-md border items-center border-brand-secondary/70 bg-brand-secondary/20 mt-3' >
                                <div className='grid grid-cols-11 items-center'>
                                    <div className="lg:col-span-1 col-span-1">
                                        <img className='h-6' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/error-booking-icon.svg' />
                                    </div>
                                    <div className="lg:col-span-10 col-span-9">
                                        <p className='text-xxs font-semibold' >{docError?.step1?.docError}</p>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        {docError?.step1 && docError?.step1?.doc_url ?
                            <img className='w-full mt-3' src={docError?.step1?.doc_url} alt="" />
                            : null}

                        {isDoubleSideDoc ? (
                            <DoubleSideDoc options={docOptions} docData={currentDoc} selectedOption={selectedDoc} handleFileChangeDoc={handleFileChangeDoc} handleRemove={handleRemoveDoc} docLoading={docLoading} />
                        ) : isSingleSideDoc ? (
                            <SingleSideDoc docData={currentDoc} handleFileChangeDoc={handleFileChangeDoc} handleRemove={handleRemoveDoc} docLoading={docLoading} />
                        ) : null}
                    </div>}
                    <div
                        className="relative cursor-not-allowed"
                        onClick={() => {
                            if (!alreadyUploaded && guestType !== "INFANT") {
                                setTimeout(() => {
                                    const el = document.querySelector(`[name="${prefix}_document"]`);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        (el as HTMLElement).focus();
                                    }
                                }, 50);
                            }
                        }}
                    >
                        <fieldset disabled={!alreadyUploaded && guestType !== "INFANT"} className={`${!alreadyUploaded && guestType !== "INFANT" ? 'pointer-events-none cursor-not-allowed opacity-60' : ''}`}>
                            <div className='py-4 border-t border-gray-300 relative cursor-default'>
                                <label className="text-sm font-semibold">First name:</label>
                                <input
                                    autoComplete='none'
                                    defaultValue={""}
                                    type="text"
                                    {...register(`${prefix}_first_name`, {
                                        required: "Please enter a valid first name",
                                        minLength: {
                                            value: 2,
                                            message: "First name should be at least 2 characters",
                                        },
                                        validate: (value) =>
                                            /^[A-Za-z\s]+$/.test(value) || "First name should contain only alphabets",
                                    })}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    }}
                                    onChange={(e: any) => {
                                        setValue(`first_name`, e.target.value);
                                    }}
                                    className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                    placeholder="First Name"
                                />
                                {errors?.[`${prefix}_first_name`] && (
                                    <p className="text-danger text-xs mt-1">
                                        {errors[`${prefix}_first_name`]?.message}
                                    </p>
                                )}
                            </div>
                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">Last name:</label>
                                <input
                                    autoComplete='none'
                                    defaultValue={''}
                                    type="text"
                                    {...register(`${prefix}_last_name`, {
                                        minLength: {
                                            value: 2,
                                            message: "Last name should be at least 2 characters",
                                        },
                                        validate: (value) => {
                                            if (!value) return true;
                                            return /^[A-Za-z\s]+$/.test(value) || "Last name should contain only alphabets";
                                        },
                                    })}
                                    onChange={(e) => setValue(`${prefix}_last_name`, e.target.value)}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    }}
                                    className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                    placeholder="Last Name"
                                />

                                {errors?.[`${prefix}_last_name`] && (
                                    <p className="text-danger text-xs mt-1">
                                        {errors[`${prefix}_last_name`]?.message}
                                    </p>
                                )}
                            </div>
                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">Gender:</label>
                                <SelectField
                                    defaultValue={''}
                                    name={`${prefix}_gender`}
                                    options={genderList}
                                    register={register}
                                    validation={SelectAnyValue}
                                    selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer"
                                    className='!mb-0'
                                    placeholder="Select Gender"
                                    error={errors && errors[`${prefix}_gender`]}
                                    errorText='Please select Gender'
                                />
                            </div>
                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">Date of Birth:</label>
                                <Controller
                                    name={`${prefix}_dob`}
                                    control={control}
                                    rules={{
                                        validate: (dob) => {
                                            const isValid = validateDOB(dob, selectedType);
                                            return isValid || dobError;
                                        },
                                    }}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                {...field}
                                                type="date"
                                                max="9999-12-31"
                                                className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                                onBlur={(e) => {
                                                    const dob = e.target.value;
                                                    validateDOB(dob, selectedType);
                                                    trigger(`${prefix}_dob`);
                                                }}
                                                onChange={(e) => {
                                                    const dob = e.target.value;
                                                    setValue(`${prefix}_dob`, dob, { shouldValidate: false });
                                                }}
                                            />
                                        </div>
                                    )}
                                />

                                {dobError && errors?.[`${prefix}_dob`] && <p className="text-danger text-xs mt-1">{dobError}</p>}
                            </div>

                            {guestType === 'ADULT' ?
                                <div className='cursor-default'>
                                    <label className="text-sm font-semibold">Mobile:</label>
                                    <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                                        <div className="lg:col-span-2 col-span-3 mt-2 ">
                                            <Select
                                                menuPortalTarget={document.body}
                                                menuPosition={'fixed'}
                                                value={{ label: countryCode }}
                                                maxMenuHeight={190}
                                                options={phoneCodes}
                                                onChange={(item: any) => setCountryCode(item.value)}
                                                styles={customStyles}
                                            />
                                        </div>
                                        <div className="lg:col-span-7 col-span-7">
                                            <input
                                                autoComplete='none'
                                                defaultValue={''}
                                                type="text"
                                                {...register(`${prefix}_mobile`, {
                                                    required: "Please enter a valid mobile number",
                                                    pattern: {
                                                        value: countryCode === "+91" ? /^[0-9]{10}$/ : /^[0-9]{6,12}$/,
                                                        message: "Please enter a valid mobile number",
                                                    },
                                                    maxLength: countryCode === "+91" ? 10 : 12,
                                                })}
                                                maxLength={countryCode === "+91" ? 10 : 12}
                                                onChange={(e) => setValue(`${prefix}_mobile`, e.target.value)}
                                                className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                                placeholder="Mobile Number"
                                            />
                                            {errors?.[`${prefix}_mobile`] && (
                                                <p className="text-danger text-xs mt-1">
                                                    {errors[`${prefix}_mobile`]?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                            {guestType === 'ADULT' ?
                                <div className='cursor-default pb-4'>
                                    <label className="text-sm font-semibold">Email:</label>
                                    <input
                                        autoComplete='none'
                                        defaultValue={''}
                                        type="email"
                                        {...register(`${prefix}_email`, {
                                            required: "Please enter a valid email",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Please enter a valid email address",
                                            },
                                        })}
                                        onChange={(e) => setValue(`${prefix}_email`, e.target.value)}
                                        className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                        placeholder="Email"
                                    />

                                    {errors?.[`${prefix}_email`] && (
                                        <p className="text-danger text-xs mt-1">
                                            {errors[`${prefix}_email`]?.message}
                                        </p>
                                    )}
                                </div>
                                : null
                            }

                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">Citizenship:</label>
                                <SelectField
                                    defaultValue={''}
                                    name={`${prefix}_citizen`}
                                    options={citizenshipList}
                                    register={register}
                                    validation={SelectAnyValue}
                                    selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer"
                                    className='!mb-0'
                                    placeholder="Select Citizenship"
                                    error={errors && errors[`${prefix}_citizen`]}
                                    errorText='Please select citizenship'
                                />
                            </div>
                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">Meal Preferences:</label>
                                <SelectField
                                    defaultValue={''}
                                    name={`${prefix}_meal`}
                                    options={mealList}
                                    register={register}
                                    validation={SelectAnyValue}
                                    selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer"
                                    className='!mb-0'
                                    placeholder="Select Meal"
                                    error={errors && errors[`${prefix}_meal`]}
                                    errorText='Please select meal'
                                />
                            </div>

                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">Country:</label>
                                <select
                                    defaultValue={getValues(`${prefix}_country`)}
                                    name={`${prefix}_country`}
                                    className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer'
                                    onChange={(event) => {
                                        let x = event.target.value;
                                        setCountryState({
                                            ...countryStatesArray,
                                            [prefix]: CountryStates.countries.filter((country) => country.country === x)[0].states
                                        });
                                        setState({
                                            ...state,
                                            [prefix]: ''
                                        });
                                        setValue(`${prefix}_country`, x);
                                        setIsIndia({
                                            ...isIndia,
                                            [`${prefix}_country`]: x
                                        })
                                    }}
                                >
                                    <option selected value="" disabled>{"Choose a Country"}</option>
                                    {
                                        CountryStates.countries.map((country) => {
                                            return <option value={country.country}>{country.country}</option>
                                        })
                                    }
                                </select>

                                {errors && errors[`${prefix}_country`] && <p className="text-xs text-danger mt-1">Please select country</p>}
                            </div>
                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">State:</label>
                                <select
                                    defaultValue={getValues(`${prefix}_state`)}
                                    {...register(`${prefix}_state`, { required: true })}
                                    className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer'
                                    onChange={(event) => {
                                        let x = event.target.value;
                                        setState({
                                            ...state,
                                            [prefix]: x
                                        });
                                        setValue(`${prefix}_state`, x);
                                    }}
                                >
                                    <option selected value="">{"Choose a State"}</option>
                                    {
                                        countryStatesArray && countryStatesArray[prefix] ? countryStatesArray[prefix].map((states) => {
                                            return <option value={states}>{states}</option>
                                        }) : null
                                    }
                                </select>
                                {errors && errors[`${prefix}_state`] && <p className="text-xs text-danger mt-1">Please select state</p>}
                            </div>
                            <div className='cursor-default pb-4'>
                                <label className="text-sm font-semibold">City:</label>
                                {state && state[prefix] != '' && StateCities[state[prefix]] ? (
                                    <>
                                        <select
                                            name={`${prefix}_cities`}
                                            defaultValue={getValues(`${prefix}_cities`)}
                                            className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer'
                                            onChange={(event) => {
                                                let x = event.target.value;
                                                setValue(`${prefix}_cities`, x);
                                            }}
                                        >
                                            <option selected value="" disabled>{"Choose a City"}</option>
                                            {
                                                StateCities[state[prefix]].map((city: any) => {
                                                    return <option value={city}>{city}</option>
                                                })
                                            }
                                        </select>
                                        {errors && errors[`${prefix}_cities`] && <p className="text-xs text-danger mt-1">Please select city</p>}
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type='text'
                                            autoComplete='none'
                                            name={`${prefix}_cities`}
                                            className='border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2 placeholder:text-gray-100 w-full cursor-pointer'
                                            placeholder="Enter City Name"
                                            onChange={(e) => setValue(`${prefix}_cities`, e.target.value)}
                                        />
                                        {errors && errors[`${prefix}_cities`] && <p className="text-xs text-danger mt-1">Please select city</p>}
                                    </>
                                )}
                            </div>

                            {bookingData?.is_international ? <>
                                <div className='cursor-default pb-4'>
                                    <label className="text-sm font-semibold">Passport Number:</label>
                                    <input
                                        defaultValue={''}
                                        type="text"
                                        {...register(`${prefix}_id_number`, {
                                            required: "Please enter a valid passport number", // Ensures the field is not empty
                                            minLength: {
                                                value: 6,
                                                message: "Passport number should be at least 6 characters",
                                            },
                                        })}
                                        onChange={(e) => setValue(`${prefix}_id_number`, e.target.value)}
                                        className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                        placeholder="Passport Number"
                                    />
                                    {errors?.[`${prefix}_id_number`] && (
                                        <p className="text-danger text-xs mt-1">
                                            {errors[`${prefix}_id_number`]?.message}
                                        </p>
                                    )}
                                </div>
                                <div className='cursor-default pb-4'>
                                    <label className="text-sm font-semibold">Passport Issue Date:</label>
                                    <input
                                        defaultValue={''}
                                        type='date'
                                        max='9999-12-31'
                                        {...register(`${prefix}_passport_issue_date`, {
                                            validate: (value: string) => {
                                                if (!value) return "Passport issue date is required";

                                                const selectedDate = new Date(value);
                                                const startDate = bookingData?.sailing_date?.split("-").map(s => s.trim())[0] || new Date();
                                                const today = new Date(startDate);

                                                if (selectedDate > today) {
                                                    return "Passport issue date cannot be in the future from the sailing date";
                                                }

                                                return true;
                                            }
                                        })}
                                        onBlur={(e) => {
                                            trigger(`${prefix}_passport_issue_date`);
                                        }}
                                        onChange={(e) => {
                                            const dob = e.target.value;
                                            setValue(`${prefix}_passport_issue_date`, dob, { shouldValidate: false });
                                        }}
                                        className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                        placeholder="Passport Issue Date"
                                    />
                                    {errors?.[`${prefix}_passport_issue_date`] && (
                                        <p className="text-danger text-xs mt-1">
                                            {errors[`${prefix}_passport_issue_date`]?.message}
                                        </p>
                                    )}
                                </div>
                                <div className='cursor-default pb-4'>
                                    <label className="text-sm font-semibold">Passport Expiry Date:</label>
                                    <input
                                        defaultValue={''}
                                        type='date'
                                        max='9999-12-31'
                                        {...register(`${prefix}_passport_expiry_date`, {
                                            validate: (value: string) => {
                                                if (!value) return "Passport expiry date is required";

                                                const selectedDate = new Date(value);
                                                const startDate = bookingData?.sailing_date?.split("-").map(s => s.trim())[0] || new Date();
                                                const today = new Date(startDate);

                                                if (selectedDate < today) {
                                                    return "Passport expiry date must be in the future from the sailing date";
                                                }

                                                return true;
                                            }
                                        })}
                                        onBlur={(e) => {
                                            trigger(`${prefix}_passport_expiry_date`); // Trigger form validation when user finishes typing
                                        }}
                                        onChange={(e) => {
                                            const dob = e.target.value;
                                            setValue(`${prefix}_passport_expiry_date`, dob, { shouldValidate: false }); // Set value, but prevent full validation during typing
                                        }}
                                        className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                        placeholder="Passport Expiry Date"
                                    />
                                    {errors?.[`${prefix}_passport_expiry_date`] && (
                                        <p className="text-danger text-xs mt-1">
                                            {errors[`${prefix}_passport_expiry_date`]?.message}
                                        </p>
                                    )}
                                </div>
                                <div className='cursor-default pb-4'>
                                    <label className="text-sm font-semibold">Address:</label>
                                    <input
                                        defaultValue={''}
                                        type="text"
                                        {...register(`${prefix}_passport_address`, {
                                            required: "Please enter passport address",
                                        })}
                                        onChange={(e) => setValue(`${prefix}_passport_address`, e.target.value)}
                                        className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                                        placeholder="Passport Address"
                                    />
                                    {errors?.[`${prefix}_passport_address`] && (
                                        <p className="text-danger text-xs mt-1">
                                            {errors[`${prefix}_passport_address`]?.message}
                                        </p>
                                    )}
                                </div>
                            </> : null}

                            <div className='cursor-default pb-4'>
                                <div className='flex gap-2 items-start'>
                                    <input
                                        type='checkbox'
                                        id={`${prefix}_consent`}
                                        {...register(`${prefix}_consent`, {
                                            validate: (value) => value === true || "You must agree before continuing",
                                        })}
                                        className='mt-1 border bg-gray-400 rounded-sm text-sm text-brand-primary cursor-pointer'
                                    />
                                    <label htmlFor={`${prefix}_consent`} className='text-gray-100 font-medium text-sm leading-snug'>
                                        I hereby affirm that all the guest details provided by me are accurate and true to the best of my knowledge.
                                        <span className='underline cursor-pointer' onClick={() => setDescription(true)}>T&C</span>
                                    </label>
                                </div>
                                {errors && errors[`${prefix}_consent`] && (
                                    <p className="text-xs text-danger mt-1">Please check the box</p>
                                )}
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }

    const GuestForm = ({ guestType, key, index, roomIndex, guest, tempData }: {
        guestType: any, key: any, index: any, roomIndex: any, guest: any, tempData: any
    }) => {
        return (
            <button
                key={index}
                onClick={() => {
                    setSelectedGuestIndex(index)
                }}
                className={`lg:text-base text-xs w-full font-bold py-2.5 px-5 -mb-0.5 ${selectedGuestIndex === index ? 'border-b-2 border-b-brand-primary' : null}`}
            >
                <p>Guest {index + 1}</p>
                <p className='text-xxs text-gray-900'>{guestType}</p>
            </button>
        )
    }

    const ItineraryName = () => {
        if (booking?.nights > 5) {
            return (
                <p className="text-base font-bold">
                    {booking?.ports[0]} -&nbsp;
                    {booking?.ports[booking?.ports.length - 1]}
                </p>
            )
        } else {
            return (
                booking?.ports.map((val: any, i: number) => (
                    <p key={i} className="text-base font-bold">
                        {val}
                        {i !== booking?.ports.length - 1 && <span> -&nbsp;</span>}
                    </p>
                ))
            )
        }
    }

    const portList = booking?.ports
        .filter((val: any) => val !== 'At Sea')
        .map((val: any) => val)
        .join(' | ');

    const isLong = portList?.length > 150;
    
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-28 px-3">
                <div>
                    <div className="flex items-center cursor-pointer">
                        <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                            alt="arrow"
                            onClick={() => navigate(-1)}
                            className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
                        />
                        <p className="text-xl font-bold lg:text-xl ">
                            {/* Add New Guest  */}
                            Cabin 0{roomIndex + 1}
                        </p>
                    </div>

                    <div className='grid grid-cols-5 gap-4'>
                        <div className='col-span-2 hidden lg:block mt-5'>
                            <div className='grid grid-cols-1 lg:grid-cols-1 rounded-md lg:top-40 lg:bottom-40 lg:mb-3.5 shadow-allSide bg-white z-10 lg:z-0 w-full left-0 lg:left-auto border-gray-200/20 '>
                                <p className='text-center text-brand-green bg-brand-green/[0.1] py-2 font-bold rounded-t-md ' >Booking ID: {booking?.number}</p>
                                <div className='grid grid-cols-10 px-4 lg:pt-6 pb-0 pt-4'>
                                    <div className='col-span-7 lg:col-span-10'>
                                        <div className='flex flex-wrap'>
                                            {ItineraryName()}
                                            <p className="pl-1 text-md font-bold text-right lg:text-left text-brand-primary"> {`  (${booking?.nights}N/${booking?.nights + 1}D)`}</p>
                                        </div>
                                        <div className='grid grid-cols-2 mt-3'>
                                            <div className='flex'>
                                                <img
                                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                                                    className="h-3 mr-1 mt-0.5 lg:h-4"
                                                    alt="Cruise"
                                                />
                                                <p className="text-xs lg:text-base font-semibold">
                                                    {startDate(bookingRoute[0]?.sailing_date)}
                                                </p>
                                            </div>
                                            <div className="flex ">
                                                <img
                                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                                                    className="h-3 mt-0.5 lg:h-4 lg:ml-[-29px] lg:mr-[10px]"
                                                    alt="Cruise"
                                                />
                                                <p className="text-xs lg:text-base font-semibold">
                                                    {`${availroom?.rooms && availroom?.rooms[roomIndex]?.category_name}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='border-t border-gray-300 w-full mt-2.5' />
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                            <div className='flex flex-col items-start'>
                                                <p className="text-xs lg:text-sm font-medium text-gray-100">
                                                    Visiting Ports:
                                                </p>
                                                <div className="">
                                                    <span
                                                        className={`text-xs lg:text-sm font-medium !leading-5`}
                                                    >
                                                        <span className="text-xs lg:text-sm font-medium !leading-5">
                                                            {isLong && !isExpanded ? portList?.slice(0, 60) + '...' : portList}
                                                        </span>
                                                    </span>
                                                    {isLong && (
                                                        <span
                                                            onClick={() => setIsExpanded(prev => !prev)}
                                                            className="text-xs lg:text-sm text-brand-primary font-bold ml-2 cursor-pointer inline-block"
                                                        >
                                                            {isExpanded ? 'View less' : 'View more'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:block hidden border-b col-span-10 my-3 border-gray-400' />
                                    <div className='col-span-3 flex justify-between items-center py-3 lg:col-span-10'>
                                        <p className="text-xs font-semibold text-right lg:text-left lg:text-xl">
                                            Total Paid
                                        </p>

                                        <p className="text-md font-bold text-right lg:text-left lg:text-xl text-brand-primary">
                                            {`₹ ${bookingData?.amount_paid}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-3 mt-3 col-span-5'>
                            <div className='py-2 '>
                                <div>
                                    <GuestContainer />
                                </div>
                            </div>
                            <div className="">
                                <div className='mt-3 flex justify-center'>
                                    <Button text='Continue' disabled={loading} handleClick={handleSubmit(previewGuest)} className='w-1/2 lg:w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Modal show={description} align={'center'} className="w-full lg:w-2/4 relative" onClose={() => setDescription(false)}>
                <div className=' w-full h-full bg-white'>
                    <div className=' p-4 pb-0 flex items-center justify-end'>
                        <svg
                            onClick={() => setDescription(false)}
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
                    <div className="px-10 pb-6">
                        <p className='text-lg font-semibold mb-3'>Terms & Conditions</p>
                        <ul className='list-disc'>
                            <li>Guest details must exactly match a valid government-issued photo ID.</li>
                            <li>Any mismatch in guest information may result in denial of boarding pass issuance.</li>
                            <li>Corrections or updates to guest details will incur applicable charges as per policy.</li>
                            <li>To request changes, guests must contact the support team via phone or email.</li>
                            <li>Proceeding with the booking constitutes acceptance of these terms and conditions.</li>
                        </ul>
                    </div>
                </div>
            </Modal>

            <Modal
                show={isPreviewGuestModalOpen}
                align={'center'}
                className="w-full lg:w-2/4 relative"
                onClose={() => setIsPreviewGuestModalOpen(false)}
                mainClassName="px-0 !items-end lg:!items-center"
            >
                <div className=' w-full h-full bg-white relative rounded-t-xl lg:rounded-md'>
                    <div className='absolute right-3 top-3'>
                        <svg
                            onClick={() => setIsPreviewGuestModalOpen(false)}
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
                    <PreviewGuest
                        handleSubmit={onSubmit}
                        update={(sel: any) => {
                            const { roomIndex, guestIndex, reviewedState } = sel
                            setSelectedRoomIndex(roomIndex)
                            setSelectedGuestIndex(guestIndex)
                            setPersistedReviewedGuests(reviewedState);
                            setIsPreviewGuestModalOpen(false)
                        }}
                        initialReviewedState={persistedReviewedGuests}
                        RoomsInput={roomsInputData}
                        type={'update'}
                    />
                </div>
            </Modal>
        </Layout>
    );
}