import React, { Fragment, useEffect, useState } from 'react'
import { Layout } from '../../components/Layout';
import { FormatPrice } from '../../utils/formatter/formatter';
import { useNavigate } from 'react-router-dom';
import { GetStore, SaveStore } from '../../utils/store/store';
import { useGetOffersMutation, useGetShoreExMutation, useCreateBookingMutation } from '../../services/itinerary/itinerary';
import Modal from '../../components/UI/ModalCenter';
import { Input, Select as SelectField } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { string, SelectAnyValue, phone, email, gender, date, Phone, Email, Pincode, PanNo, GSTIN, stringOptional, consent } from '../../../src/utils/validations/formValidations';
import { DateFormate, DateFormator } from "../../utils/formatter/formatter"
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import CountryStates from "../../components/UI/Forms/Inputs/country-states.json";
import StateCities from "../../components/UI/Forms/Inputs/state-cities.json";
import phoneCodes from "../../components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { getRefUrl } from '../../../src/utils/user/user';
import { CheckDevice } from '../../../src/utils/deviceType/device';
import SingleSideDoc from './component/SingleSideDoc';
import DoubleSideDoc from './component/DoubleSideDoc';
import compressFile from '../webCheckIn/components/compressFile';
import { useGuestInfoByUploadDocumentMutation } from '../../services/webCheckIn/webCheckIn';
import Button from '../../components/UI/Button';
import PreviewGuest from '../../component/PreviewGuest';

type Props = {}

const toDate = (dateStr: any) => {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day).toDateString().split(' ')
  } else return new Date().toDateString().split(' ')
}

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

export default function Cabin({ }: Props) {

  const customStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: '#ffffff', border: '2px solid #ccc', height: '46px' }),
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
  const { rooms, itinerary } = store;

  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number>(0);
  const [countryCode, setCountryCode] = useState('+91');
  const [country, setCountry] = useState({});
  const [countryStatesArray, setCountryState] = useState({});
  const [state, setState] = useState({})
  const [tData, setTData] = useState()
  const [isIndia, setIsIndia] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>();
  const [docLoading, setDocLoading] = useState({ frontDoc: false, backDoc: false });
  const [docError, setDocError] = useState({});
  const [docDetails, setDocDetails] = useState({});
  const [description, setDescription] = useState(false);
  const [guestType, setGuestType] = useState("Adult");

  const [isPreviewGuestModalOpen, setIsPreviewGuestModalOpen] = useState(false);
  const [roomsInputData, setRoomsInputData] = useState({});
  const [persistedReviewedGuests, setPersistedReviewedGuests] = useState();
  // console.log(selectedDoc, 'selectedDoc docDetails', docDetails, selectedGuestIndex)

  const isDoubleSideDoc =
    selectedDoc?.code == 'passport' || selectedDoc?.code == 'aadhar_card';
  const isSingleSideDoc =
    selectedDoc?.code == 'election_id' ||
    selectedDoc?.code == 'pan_card' ||
    selectedDoc?.code == 'driving_license' ||
    // selectedDoc?.code == 'intl_passport' ||
    selectedDoc?.code == 'birth_certificate';

  const [getOffers] = useGetOffersMutation()
  const [getShoreEx] = useGetShoreExMutation()
  const [createBooking] = useCreateBookingMutation()
  const [guestInfoByUploadDocument] = useGuestInfoByUploadDocumentMutation();

  const joiObject: any = {};
  let navigate = useNavigate()

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
        // console.log(guestFileId, 'guestFileId', JSON.parse(localStorage.getItem("guest_doc_detail"))?.[prefix])

        const formData: any = new FormData();
        formData.append(`web_checkin_doc_type`, type);
        formData.append(`document`, docFile);
        side === "back" && formData.append(`is_back`, true);
        side === "back" && guestFileId && formData.append(`guest_file_id`, guestFileId);

        const _payload = {
          id: itinerary?.itinerary_id,
          data: formData,
        };

        guestInfoByUploadDocument(_payload)
          .unwrap()
          // .then((res: any) => {
          //   console.log(res.data, 'res file upload');

          //   const incoming = res?.data || {};
          //   let finalMergedData: any = {};

          //   setDocDetails((prev) => {
          //     const merged = { ...prev };

          //     Object.entries(incoming).forEach(([key, value]) => {
          //       if (value !== null && value !== '') {
          //         merged[key] = value;
          //       } else if (!(key in prev)) {
          //         merged[key] = value; // store empty/null value if not previously set
          //       }
          //     });

          //     if (side === "back") {
          //       merged.side = "back";
          //     }

          //     finalMergedData = merged;
          //     return merged;
          //   });

          //   // Delay updating localStorage slightly to wait for state update
          //   setTimeout(() => {
          //     localStorage.setItem('guest_doc_detail', JSON.stringify(finalMergedData));
          //   }, 0);

          //   // Filter non-null and non-empty values
          //   // const cleanedData = Object.fromEntries(
          //   //   Object.entries(res?.data).filter(
          //   //     ([_, value]) => value !== null && value !== ""
          //   //   )
          //   // );

          //   // Update localStorage and state
          //   // if (side === 'front') {
          //   //   const selectedDetails = {
          //   //     name_on_card: res?.data?.card_name,
          //   //     id_number: res?.data?.id_number,
          //   //     date_of_birth: res?.data?.dob,
          //   //     gender: res?.data?.gender,
          //   //     web_checkin_doc_type: res?.data?.web_checkin_doc_type,
          //   //     side: "front",
          //   //   };

          //   //   window.localStorage.setItem(
          //   //     'guest_doc_detail',
          //   //     JSON.stringify(selectedDetails)
          //   //   );
          //   // }

          //   // if (side === 'back') {
          //   //   const existingData = JSON.parse(
          //   //     localStorage.getItem('guest_doc_detail') || '{}'
          //   //   );

          //   //   const newData = {
          //   //     address: res?.data?.address,
          //   //     pincode: res?.data?.pincode,
          //   //     state: res?.data?.state,
          //   //     side: "back",
          //   //   };

          //   //   const mergedData = {
          //   //     ...existingData,
          //   //     ...Object.fromEntries(
          //   //       Object.entries(newData).filter(
          //   //         ([_, value]) => value !== null && value !== ""
          //   //       )
          //   //     ),
          //   //   };

          //   //   localStorage.setItem('guest_doc_detail', JSON.stringify(mergedData));
          //   // }

          //   // Merge all valid data into docDetails
          //   // setDocDetails((prev) => ({
          //   //   ...prev,
          //   //   ...cleanedData,
          //   // }));
          //   // setDocDetails((prev) => {
          //   //   const cleanedData = Object.fromEntries(
          //   //     Object.entries(res?.data).filter(
          //   //       ([_, value]) => value !== null && value !== ""
          //   //     )
          //   //   );

          //   //   return {
          //   //     ...prev,
          //   //     ...Object.entries(cleanedData).reduce((acc, [key, value]) => {
          //   //       acc[key] = value || prev[key];
          //   //       return acc;
          //   //     }, { ...prev })
          //   //   };
          //   // });            
          // })
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

            clearErrors(`${prefix}_document`);
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
        reset({});
        setValue(`${prefix}_countryCode`, "+91");
        setValue(`${prefix}_country`, 'India');
        // Object.keys(removedData).forEach((field) => {
        //   setValue(`${prefix}_${field}`, ""); // Clear form value for each field dynamically
        // });
      }

      return next;
    });
  };

  const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
  const currentDoc = docDetails[prefix] || {};

  // disable selecting another document once any side is uploaded:
  const alreadyUploaded = Object.keys(currentDoc).length > 0;

  // Whenever the selected guest changes, grab their doc data
  useEffect(() => {
    const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
    const current = docDetails[prefix] || {};

    // If they’d already picked a document type, restore that in your select
    if (current.web_checkin_doc_type) {
      const option = docOptions.find(o => o.code === current.web_checkin_doc_type);
      setSelectedDoc(option);
      // update RHF internal value too
      setValue(`${prefix}_document`, option?.code);
    } else {
      // otherwise clear it
      setSelectedDoc(undefined);
      setValue(`${prefix}_document`, "");
    }
  }, [selectedRoomIndex, selectedGuestIndex, docDetails]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  let is_international = store.itinerary.is_international

  const referenceDate = store?.itinerary
    ? new Date(DateFormator(store?.itinerary.start_date))
    : new Date();

  const adultMaxDate = new Date(
    new Date(referenceDate).setMonth(referenceDate.getMonth() - 12 * 12)
  );

  const firstAdultMaxDate = new Date(
    new Date(referenceDate).setMonth(referenceDate.getMonth() - 18 * 12)
  );

  const childMaxDate = new Date(
    new Date(referenceDate).setMonth(referenceDate.getMonth() - 2 * 12)
  );
  const infantMaxDate = new Date(
    new Date(referenceDate).setMonth(referenceDate.getMonth() - 1 * 12)
  );
  const passportExpiry = new Date(
    new Date(referenceDate).setMonth(referenceDate.getMonth() + 6)
  )
  const passportIssue = referenceDate

  useEffect(() => {
    let a: any = {}
    let ind: any = {}
    store?.rooms.forEach((room: any, roomIndex: any) => {
      const count = room.adults + room.children + room.infants;
      const guests = [...(room.guests || Array(count).fill({}))];
      if (guests.length < count)
        guests.push(...Array(count - guests.length).fill({}));
      guests.splice(count);

      guests.map((guest, i: any) => {
        let tempData = room && room.guests ? room.guests[i] : null;
        const prefix = `${roomIndex}_${i}`;
        if (tempData) {
          ind[`${prefix}_country`] = tempData.country
          setValue(`${prefix}_country`, tempData.country);
          setValue(`${prefix}_state`, tempData.state);
          if (tempData.country == 'India') {
            setValue(`${prefix}_cities`, tempData.city);
          }
          a[prefix] = CountryStates.countries.filter((country) => country.country === tempData.country)[0].states
        } else {
          a[prefix] = CountryStates.countries.filter((country) => country.country === 'India')[0].states
          ind[`${prefix}_country`] = 'India'
          setValue(`${prefix}_country`, 'India');
        }
        setValue(`${prefix}_countryCode`, '+91');
      })
    })

    setIsIndia(ind)
    setCountryState(a);
  }, []);

  store?.rooms.forEach((room: any, roomIndex: any) => {
    const count = room.adults + room.children + room.infants;
    for (let guestIndex = 0; guestIndex < count; guestIndex++) {
      const guestType =
        guestIndex < room.adults
          ? "adult"
          : guestIndex < room.adults + room.children
            ? "child"
            : "infant";

      const documentField =
        guestType === 'infant'
          ? Joi.string().allow('', null).optional()
          : Joi.string()
            .valid(
              'passport',
              'aadhar_card',
              'pan_card',
              'election_id',
              'driving_license',
              'birth_certificate',
              // 'intl_passport'
            )
            .required()
            .messages({
              'any.required': 'Document is required',
              'any.only': 'Invalid document type',
            });
      const prefix = `${roomIndex}_${guestIndex}`;
      joiObject[`${prefix}_first_name`] = string;
      joiObject[`${prefix}_last_name`] = stringOptional;
      joiObject[`${prefix}_document`] = documentField;
      // if (guestType !== "infant") {
      //   joiObject[`${prefix}_document`] = guestDocument;
      // }
      joiObject[`${prefix}_gender`] = gender;
      joiObject[`${prefix}_meal`] = string;
      joiObject[`${prefix}_dob`] =
        guestType === "adult"
          ? (store?.itinerary?.itinerary_id == '86025f26-e82e-4906-b1c0-424765cb785e' ? date.max(firstAdultMaxDate) : guestIndex === 0 ? date.max(firstAdultMaxDate) : date.max(adultMaxDate))
          : guestType === "child"
            ? date.max(childMaxDate).min(adultMaxDate)
            : date.max(infantMaxDate).min(childMaxDate);
      joiObject[`${prefix}_country`] = string;
      joiObject[`${prefix}_countryCode`] = string;
      joiObject[`${prefix}_state`] = string;
      joiObject[`${prefix}_citizen`] = string;
      // if (isIndia[`${prefix}_country`] == 'India') {
      //   joiObject[`${prefix}_cities`] = string;
      // }
      joiObject[`${prefix}_cities`] = Joi.any().when(`${prefix}_country`, { is: 'India', then: Joi.required(), otherwise: Joi.optional() });
      joiObject[`${prefix}_consent`] = consent;
      if (guestType === "adult") {
        joiObject[`${prefix}_mobile`] = phone;
        joiObject[`${prefix}_email`] = email;
      }
      // if (is_international) {
      //   joiObject[`${prefix}_passport_issue_date`] = date.less(passportIssue);
      //   joiObject[`${prefix}_passport_expiry_date`] = date.min(passportExpiry);
      //   joiObject[`${prefix}_id_number`] = string;
      //   joiObject[`${prefix}_passport_address`] = string;
      // }

      // All fields including passport
      joiObject[`${prefix}_passport_issue_date`] = Joi.alternatives().conditional(Joi.valid(is_international).only(), {
        then: date.less(passportIssue).required().messages({
          'any.required': 'Passport issue date is required',
        }),
        otherwise: Joi.optional(),
      });

      joiObject[`${prefix}_passport_expiry_date`] = Joi.alternatives().conditional(Joi.valid(is_international).only(), {
        then: date.min(passportExpiry).required().messages({
          'any.required': 'Passport expiry date is required',
        }),
        otherwise: Joi.optional(),
      });

      // joiObject[`${prefix}_id_number`] = Joi.alternatives().conditional(Joi.valid(is_international).only(), {
      //   then: string.required().messages({
      //     'any.required': 'Passport number is required',
      //   }),
      //   otherwise: Joi.optional(),
      // }); 
      joiObject[`${prefix}_id_number`] = is_international
        ? string.required().messages({ 'any.required': 'Passport number is required' })
        : string.allow('', null).optional();

      joiObject[`${prefix}_passport_address`] = Joi.alternatives().conditional(Joi.valid(is_international).only(), {
        then: string.required().messages({
          'any.required': 'Passport address is required',
        }),
        otherwise: Joi.optional(),
      });
    }
  });

  const { register, formState: { errors }, handleSubmit, setError, setValue, getValues, trigger, clearErrors, reset } = useForm({
    resolver: joiResolver(Joi.object(joiObject)),
  });

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
    if (!getValues(`${prefix}_first_name`)) {
      setValue(`${prefix}_first_name`, guestData.first_name || firstName || "");
    }
    if (!getValues(`${prefix}_last_name`)) {
      setValue(`${prefix}_last_name`, guestData.last_name || lastName || "");
    }
    if (!getValues(`${prefix}_gender`)) {
      setValue(`${prefix}_gender`, guestData.gender?.toLowerCase() || "");
    }
    if (!getValues(`${prefix}_dob`)) {
      setValue(`${prefix}_dob`, guestData.dob || lastName || "");
    }
    if (!getValues(`${prefix}_state`)) {
      setValue(`${prefix}_state`, guestData.state || "");
    }
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

    // setValue(`${prefix}_first_name`, guestData.first_name || firstName || "");
    // setValue(`${prefix}_last_name`, guestData.last_name || lastName || "");
    // setValue(`${prefix}_gender`, guestData.gender?.toLowerCase() || "");
    // setValue(`${prefix}_dob`, guestData.dob || "");
    // setValue(`${prefix}_state`, guestData.state || "");

    // Also update local state (used in <select>)
    if (guestData.state) {
      setState((prev) => ({
        ...prev,
        [prefix]: guestData.state?.toLowerCase(),
      }));
    }
    // console.log(guestData, 'guestData')
  }, [selectedRoomIndex, selectedGuestIndex, docDetails, setValue]);

  const getAllGuestPaths = () => {
    const guestPaths: { roomIndex: number; guestIndex: number }[] = [];

    store.rooms.forEach((room: any, roomIndex: number) => {
      const guestCount = room.adults + room.children + room.infants;

      for (let guestIndex = 0; guestIndex < guestCount; guestIndex++) {
        guestPaths.push({ roomIndex, guestIndex });
      }
    });
    return guestPaths;
  };

  const guestPaths = getAllGuestPaths();

  const isGuestValid = (roomIndex: number, guestIndex: number) => {
    const prefix = `${roomIndex}_${guestIndex}`;
    return !Object.keys(errors)?.some((key) => key.startsWith(prefix));
  };

  const areAllGuestsValid = () => {
    return guestPaths.every(({ roomIndex, guestIndex }) =>
      isGuestValid(roomIndex, guestIndex)
    );
  };

  const isLastGuest = () => {
    const last = guestPaths[guestPaths.length - 1];
    return (
      selectedRoomIndex === last.roomIndex &&
      selectedGuestIndex === last.guestIndex
    );
  };

  const isOnlyOneGuest = guestPaths.length === 1;
  const isCurrentGuestValid = isGuestValid(selectedRoomIndex, selectedGuestIndex);

  const previewGuest = (data: any) => {
    const prefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
    if (!alreadyUploaded && guestType !== "Infant" && !data.document) {
      setError(`${prefix}_document`, {
        type: "manual",
        message: "Please select a document and upload",
      });
      return;
    }

    const newRooms = [...rooms].map((room) =>
      Object.assign({}, room, {
        guests: [...(room.guests || [])].map((guest) =>
          Object.assign({}, guest)
        ),
      })
    );

    Object.keys(data).forEach((key) => {
      const [roomIndex, guestIndex, field] = key.split("_");
      const guest =
        newRooms[parseInt(roomIndex)].guests[parseInt(guestIndex)] || {};
      newRooms[parseInt(roomIndex)].guests[
        parseInt(guestIndex)
      ] = Object.assign({}, guest, { [field]: data[key] });
    });

    let RoomsInput = {}
    RoomsInput = newRooms.map((room, roomIndex) => ({
      ...room,
      guests: room.guests.map((guest: any, guestIndex: number) => {
        const prefix = `${roomIndex}_${guestIndex}`;
        const guestDocDetails = JSON.parse(localStorage.getItem("guest_doc_detail") || "{}")[prefix] || {};
        const docType = guestDocDetails?.web_checkin_doc_type || "";
        const docNumber = guestDocDetails?.front_img?.id_number || guestDocDetails?.back_img?.id_number || "";
        const guestFileId = guestDocDetails?.guest_file_id || "";

        return {
          type:
            guestIndex < room.adults
              ? "ADULT"
              : guestIndex < room.adults + room.children
                ? "CHILD"
                : "INFANT",
          phone: guest.mobile,
          date_of_birth: guest.dob,
          city: guest.cities,
          citizenship: guest.citizen,
          is_nri: guest.citizen === "indian" ? false : true,
          meal: guest.meal,
          first_name: guest.first,
          last_name: guest.last,
          gender: guest.gender?.toUpperCase(),
          country: guest.country,
          country_code: guest.countryCode,
          state: guest.state,
          email: guest.email,
          doc_type: docType,
          doc_number: docNumber,
          guest_file_id: guestFileId,
          passport_issue_date: guest.passportIssueDate,
          passport_expiry_date: guest.passportExpiryDate,
          passport_number: guest.passportNumber,
          passport_address: guest.passportAddress,
        };
      }),
    }));
    setRoomsInputData(RoomsInput)
    setIsPreviewGuestModalOpen(true)
  }

  const RoomsInput_dummy = [
    {
      "adults": 2,
      "children": 0,
      "infants": 0,
      "seq_no": 1,
      "category_code": "INSIDE3",
      "category_details": {
        "code": "INSIDE3",
        "id": "d7173eb2-cebd-41d9-bd74-26a17f111009",
        "decks": [
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        "name": "Interior",
        "actual_total": 101994,
        "gst": 18359,
        "total": 101994,
        "actual_cabin_fare": 67284,
        "cabin_fare": 67284,
        "per_guest": 50997,
        "actual_per_guest": 50997,
        "service_charge": 25632,
        "fuel_surcharge": 9078,
        "visa_fees": 0
      },
      "selected": "INSIDE3",
      "error": null,
      "available": true,
      "upgrades": [
        {
          "code": "OCEANVIEW3",
          "id": "c44f08eb-aaa6-448c-95d4-5a3572874e6d",
          "name": "Oceanview",
          "cabin_fare": 14952,
          "cabin_upgrade_id": null,
          "remaining_free_upgrades": null,
          "actual_cabin_fare": 14952,
          "decks": [
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ],
          "pricing_id": "264c26d3-aa96-4966-8589-11ac227f062e",
          "allow_partial_payment": true
        },
        {
          "code": "BALCONY3",
          "id": "383c0204-f569-449d-a4a6-4f7b03e55fa9",
          "name": "Mini Suite",
          "cabin_fare": 58206,
          "cabin_upgrade_id": null,
          "remaining_free_upgrades": null,
          "actual_cabin_fare": 58206,
          "decks": [
            8,
            9,
            10
          ],
          "pricing_id": "d356fed5-d906-4d08-8d9c-f6bbeed17308",
          "allow_partial_payment": true
        },
        {
          "code": "SUITE3",
          "id": "7dabca9c-d05b-4cf9-81a5-797df6ad9fef",
          "name": "Suite",
          "cabin_fare": 128160,
          "cabin_upgrade_id": null,
          "remaining_free_upgrades": null,
          "actual_cabin_fare": 128160,
          "decks": [
            8,
            9,
            10
          ],
          "pricing_id": "e100886a-7b71-4ef4-886e-bc0610f5f994",
          "allow_partial_payment": true
        }
      ],
      "fare": 67284,
      "pricing_id": "a5ac4a39-ab10-4c65-980e-5e6d3d2d9fcb",
      "allow_partial_payment": true,
      "selected_name": "Interior",
      "room_id": "8f782d5c-171b-4ec9-96f2-f30b86d4c3b2",
      "room_number": "306",
      "deck": 10,
      "guests": [
        {
          "type": "ADULT",
          "phone": "9876543211",
          "date_of_birth": "1993-10-01T00:00:00.000Z",
          "city": "Ahmednagar",
          "citizenship": "indian",
          "is_nri": false,
          "meal": "Vegetarian",
          "first_name": "Deep Anilkumar 1",
          "last_name": "Maisheri",
          "gender": "MALE",
          "country": "India",
          "country_code": "+91",
          "state": "Maharashtra",
          "email": "sa@sa.com",
          "doc_type": "aadhar_card",
          "doc_number": "795998383656",
          "guest_file_id": "08f86119-1fbb-4736-8c7c-60b23e62cfd8"
        },
        {
          "type": "ADULT",
          "phone": "9876543211",
          "date_of_birth": "1993-10-01T00:00:00.000Z",
          "city": "Ahmednagar",
          "citizenship": "indian",
          "is_nri": false,
          "meal": "Vegetarian",
          "first_name": "Deep Anilkumar 2",
          "last_name": "Maisheri",
          "gender": "MALE",
          "country": "India",
          "country_code": "+91",
          "state": "Maharashtra",
          "email": "sa@asd.com",
          "doc_type": "aadhar_card",
          "doc_number": "795998383656",
          "guest_file_id": "efb94fc0-3a5c-4f9d-a4ba-768711e48953"
        }
      ]
    },
    {
      "adults": 2,
      "children": 0,
      "infants": 0,
      "seq_no": 1,
      "category_code": "INSIDE3",
      "category_details": {
        "code": "INSIDE3",
        "id": "d7173eb2-cebd-41d9-bd74-26a17f111009",
        "decks": [
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        "name": "Interior",
        "actual_total": 101994,
        "gst": 18359,
        "total": 101994,
        "actual_cabin_fare": 67284,
        "cabin_fare": 67284,
        "per_guest": 50997,
        "actual_per_guest": 50997,
        "service_charge": 25632,
        "fuel_surcharge": 9078,
        "visa_fees": 0
      },
      "selected": "INSIDE3",
      "error": null,
      "available": true,
      "upgrades": [
        {
          "code": "OCEANVIEW3",
          "id": "c44f08eb-aaa6-448c-95d4-5a3572874e6d",
          "name": "Oceanview",
          "cabin_fare": 14952,
          "cabin_upgrade_id": null,
          "remaining_free_upgrades": null,
          "actual_cabin_fare": 14952,
          "decks": [
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ],
          "pricing_id": "264c26d3-aa96-4966-8589-11ac227f062e",
          "allow_partial_payment": true
        },
        {
          "code": "BALCONY3",
          "id": "383c0204-f569-449d-a4a6-4f7b03e55fa9",
          "name": "Mini Suite",
          "cabin_fare": 58206,
          "cabin_upgrade_id": null,
          "remaining_free_upgrades": null,
          "actual_cabin_fare": 58206,
          "decks": [
            8,
            9,
            10
          ],
          "pricing_id": "d356fed5-d906-4d08-8d9c-f6bbeed17308",
          "allow_partial_payment": true
        },
        {
          "code": "SUITE3",
          "id": "7dabca9c-d05b-4cf9-81a5-797df6ad9fef",
          "name": "Suite",
          "cabin_fare": 128160,
          "cabin_upgrade_id": null,
          "remaining_free_upgrades": null,
          "actual_cabin_fare": 128160,
          "decks": [
            8,
            9,
            10
          ],
          "pricing_id": "e100886a-7b71-4ef4-886e-bc0610f5f994",
          "allow_partial_payment": true
        }
      ],
      "fare": 67284,
      "pricing_id": "a5ac4a39-ab10-4c65-980e-5e6d3d2d9fcb",
      "allow_partial_payment": true,
      "selected_name": "Interior",
      "room_id": "8f782d5c-171b-4ec9-96f2-f30b86d4c3b2",
      "room_number": "306",
      "deck": 10,
      "guests": [
        {
          "type": "ADULT",
          "phone": "9876543211",
          "date_of_birth": "1993-10-01T00:00:00.000Z",
          "city": "Ahmednagar",
          "citizenship": "indian",
          "is_nri": false,
          "meal": "Vegetarian",
          "first_name": "Deep Anilkumar 3",
          "last_name": "Maisheri",
          "gender": "MALE",
          "country": "India",
          "country_code": "+91",
          "state": "Maharashtra",
          "email": "sa@sa.com",
          "doc_type": "aadhar_card",
          "doc_number": "795998383656",
          "guest_file_id": "08f86119-1fbb-4736-8c7c-60b23e62cfd8"
        },
        {
          "type": "ADULT",
          "phone": "9876543211",
          "date_of_birth": "1993-10-01T00:00:00.000Z",
          "city": "Ahmednagar",
          "citizenship": "indian",
          "is_nri": false,
          "meal": "Vegetarian",
          "first_name": "Deep Anilkumar 4",
          "last_name": "Maisheri",
          "gender": "MALE",
          "country": "India",
          "country_code": "+91",
          "state": "Maharashtra",
          "email": "sa@asd.com",
          "doc_type": "aadhar_card",
          "doc_number": "795998383656",
          "guest_file_id": "efb94fc0-3a5c-4f9d-a4ba-768711e48953"
        }
      ]
    }
  ]

  const onSubmit = async (RoomsInput: any) => {
    let offers = await checkOffers();
    setIsPreviewGuestModalOpen(false)
    if (offers?.offers_present) {
      SaveStore({ ...store, rooms: RoomsInput });
      navigate('/offers', { state: { offers: offers, prefix } })
    } else {
      await generateBooking(RoomsInput);
    }
  }

  const checkOffers = async () => {
    const _payload = { id: store.itinerary.itinerary_id, data: { ...store, website: getRefUrl() } };
    let a = await getOffers(_payload)
      .unwrap()
      .then((res: any) => {
        if (res.offers_present) {
          return res
        }
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
    return a
  }

  const generateBooking = async (RoomsInput: any) => {
    let selectedOffer = {
      payment_option_id: '',
      protection_plan_id: '',
      defence_category: '',
      promo_code: 0,
      device: CheckDevice(),
      rooms: RoomsInput,
    }

    let _payload = {
      id: store.itinerary.itinerary_id,
      data: {
        ...selectedOffer,
        website: getRefUrl(),
      },
      promo_code: null
    };

    await createBooking(_payload)
      .unwrap()
      .then((res: any) => {
        // SaveStore({ ...store, booking: res, rooms: RoomsInput });
        // console.log('roh-booki', res);
        checkShorEx(res, RoomsInput)
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const checkShorEx = async (bookingRes: any, RoomsInput: any) => {
    const _payload = { id: bookingRes.id };
    await getShoreEx(_payload)
      .unwrap()
      .then((res: any) => {
        if (res.ports && res.ports.length) {
          SaveStore({ ...store, shore_excursions: res, booking: bookingRes, rooms: RoomsInput });
          navigate('/shore-excursions', { state: { shoreEx: res, booking: bookingRes } })
        } else {
          navigate('/payment-summary?booking_id=' + bookingRes.id)
        }
      })
      .catch((res: any) => {
        console.log('Error: ', res)
      })
  }

  const RoomHeader = () => {
    return (
      <div>
        {store?.rooms?.length ? store.rooms.map((val: any, i: number) => {
          return (
            <Fragment key={i}>
              <Button text={`Room ${i + 1}`} size='sm' type={selectedRoomIndex === i ? 'primary' : 'secondary'} handleClick={() => {
                setSelectedRoomIndex(i)
                setSelectedGuestIndex(0)
              }
              } className='mr-1' />
            </Fragment>
          )
        }) : null}
      </div>
    )
  }
  // console.log(errors, 'errors')

  const GuestContainer = () => {
    let room = store.rooms[selectedRoomIndex];
    const count = room.adults + room.children + room.infants;
    const guests = [...(room.guests || Array(count).fill({}))];
    if (guests.length < count)
      guests.push(...Array(count - guests.length).fill({}));
    guests.splice(count);

    const guestForms = guests.map((guest, i) => (
      <>
        <GuestForm
          guestType={
            i < room.adults
              ? "Adult"
              : i < room.adults + room.children
                ? "Child"
                : "Infant"
          }
          key={i}
          index={i}
          roomIndex={selectedRoomIndex}
          guest={guest}
          tempData={room.guests ? room.guests : null}
        />
      </>
    ));

    // console.log(errors, 'err', alreadyUploaded)

    // state-city logic
    useEffect(() => {
      // Get the state value from form for the current prefix
      const currentState = getValues(`${prefix}_state`) || "";

      if (currentState && currentState !== state[prefix]) {
        setState(prev => ({
          ...prev,
          [prefix]: currentState
        }));
      }
    }, [prefix, docDetails, getValues]);

    const guestFormsBody = guests.map((guest, i: any) => {
      let tempData = room && room.guests ? room.guests[i] : null;
      const prefix = `${selectedRoomIndex}_${i}`;

      const guestType = i < room.adults
        ? "Adult"
        : i < room.adults + room.children
          ? "Child"
          : "Infant"
      return (
        <div className={`${selectedGuestIndex === i ? 'block' : 'hidden'} lg:px-4 px-2`}>
          <div className='pt-4' >
            <label className="text-sm font-semibold">ID Proof:</label>
            <SelectField
              value={selectedDoc?.code || ""}
              name={`${prefix}_document`}
              options={docOptions}
              register={alreadyUploaded ? register : () => ({})}
              validation={{
                validate: (value) => {
                  if (!alreadyUploaded && !value) {
                    return "Please select and upload a valid document";
                  }
                  return true;
                },
              }}
              // register={register}
              // validation={SelectAnyValue}
              selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed cursor-pointer"
              className='!mb-0'
              placeholder="Select Document"
              // error={errors && errors[`${prefix}_document`]}
              // errorText='Please select document'
              // error={false}
              // errorText=''
              onChange={(val: string) => {
                setDocError({});
                const selected = docOptions.find((opt) => opt.code === val);
                setSelectedDoc(selected);
                setValue(`${prefix}_document`, val);
              }}
              isDisabled={alreadyUploaded}
            />
            {errors?.[`${prefix}_document`] && (
              <p className="text-danger text-xs mt-1">
                {errors[`${prefix}_document`]?.message}
              </p>
            )}
          </div>
          {Object.keys(currentDoc).length > 0 && <div className='text-brand-primary text-sm font-medium mt-2 mb-4'>
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
              if (!alreadyUploaded && guestType !== "Infant") {
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
            <fieldset disabled={!alreadyUploaded && guestType !== "Infant"} className={`${!alreadyUploaded && guestType !== "Infant" ? 'pointer-events-none cursor-not-allowed opacity-60' : ''}`}>
              <div className='py-4 border-t border-gray-300 relative cursor-default'>
                {/* <span className='absolute -top-[17%] left-[47%] px-1 py-0.5 bg-white text-gray-100'>or</span> */}
                <label className="text-sm font-semibold">First name:</label>
                {/* <Input
              defaultValue={tempData !== null ? tempData.first_name : null}
              type='text'
              register={register}
              validation={string}
              name={`${prefix}_first_name`}
              onChange={(e: any) => setValue(`${prefix}_first_name`, e.target.value)}
              inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full"
              placeholder="Full Name"
              error={
                errors && errors[`${prefix}_first_name`]
              }
              errorText="Please enter a valid first name"
            /> */}
                <input
                  autoComplete='none'
                  // defaultValue={tempData !== null ? tempData.first_name : ""}
                  type="text"
                  {...register(`${prefix}_first_name`, {
                    required: "Please enter a valid first name", // Ensures the field is not empty
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
                    setValue(`${prefix}_first_name`, e.target.value);
                  }}
                  className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed"
                  placeholder="First Name"
                />
                {/* Display error message */}
                {errors?.[`${prefix}_first_name`] && (
                  <p className="text-danger text-xs mt-1">
                    Please enter a valid first name
                  </p>
                )}
              </div>
              <div className='cursor-default pb-4'>
                <label className="text-sm font-semibold">Last name:</label>
                {/* <Input
              defaultValue={tempData !== null ? tempData.last_name : null}
              type='text'
              register={register}
              validation={string}
              name={`${prefix}_last_name`}
              onChange={(e: any) => setValue(`${prefix}_last_name`, e.target.value)}
              inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full"
              placeholder="Last Name"
              error={
                errors && errors[`${prefix}_last_name`]
              }
              errorText="Please enter a valid last name"
            /> */}

                <input
                  autoComplete='none'
                  // defaultValue={tempData !== null ? tempData.last_name : ''}
                  type="text"
                  {...register(`${prefix}_last_name`, {
                    required: "Please enter a valid last name", // Validation rule for required
                    minLength: {
                      value: 2,
                      message: "Last name should be at least 2 characters", // Minimum length validation
                    },
                    validate: (value) =>
                      /^[A-Za-z\s]+$/.test(value) || "Last name should contain only alphabets",
                  })}
                  onChange={(e) => setValue(`${prefix}_last_name`, e.target.value)}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // Prevents typing numbers and special characters
                  }}
                  className="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed"
                  placeholder="Last Name"
                />

                {/* Display error message */}
                {errors?.[`${prefix}_last_name`] && (
                  <p className="text-danger text-xs mt-1">
                    Please enter a valid last name
                  </p>
                )}
              </div>
              <div className='cursor-default pb-4'>
                <label className="text-sm font-semibold">Gender:</label>
                <SelectField
                  // defaultValue={tempData !== null ? tempData.gender.toLowerCase() : null}
                  name={`${prefix}_gender`}
                  options={genderList}
                  register={register}
                  validation={SelectAnyValue}
                  selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full disabled:text-gray-200 cursor-pointer disabled:cursor-not-allowed"
                  className='!mb-0'
                  placeholder="Select Gender"
                  error={errors && errors[`${prefix}_gender`]}
                  errorText='Please select gender'
                />
              </div>
              <div className='cursor-default pb-4'>
                <label className="text-sm font-semibold">Date of Birth:</label>
                <Input
                  // defaultValue={tempData !== null ? DateFormate(tempData.date_of_birth) : null}
                  type='date'
                  max='9999-12-31'
                  register={register}
                  name={`${prefix}_dob`}
                  inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed"
                  className='mb-0'
                  placeholder="Last Name"
                  error={
                    errors && errors[`${prefix}_dob`]
                  }
                  errorText="Please enter a valid date of birth"
                />
              </div>
              {guestType === 'Adult' ?
                <div className='cursor-default'>
                  <label className="text-sm font-semibold">Mobile:</label>
                  <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                    <div className="lg:col-span-2 col-span-3 mt-2">
                      <Select
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        {...register(`${prefix}_countryCode`, { required: true })}
                        value={{ label: getValues(`${prefix}_countryCode`) || countryCode }}
                        maxMenuHeight={190}
                        options={phoneCodes}
                        onChange={(item: any) => {
                          setValue(`${prefix}_countryCode`, item.value);
                          setCountryCode(item.value);
                        }}
                        styles={customStyles}
                      />
                    </div>
                    <div className="lg:col-span-7 col-span-7">
                      <Input
                        autoComplete='none'
                        defaultValue={tempData !== null ? tempData.phone : null}
                        type='text'
                        register={register}
                        maxLength="10"
                        validation={string}
                        name={`${prefix}_mobile`}
                        onChange={(e: any) => setValue(`${prefix}_mobile`, e.target.value)}
                        inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
                    placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed"
                        placeholder="Mobile Number"
                        error={
                          errors && errors[`${prefix}_mobile`]
                        }
                        errorText="Please enter a valid mobile number"
                      />
                    </div>
                  </div>
                </div>
                : null
              }

              {guestType === 'Adult' ?
                <div className='cursor-default pb-4'>
                  <label className="text-sm font-semibold">Email:</label>
                  <Input
                    autoComplete='none'
                    defaultValue={tempData !== null ? tempData.email : null}
                    type='mail'
                    register={register}
                    validation={string}
                    name={`${prefix}_email`}
                    onChange={(e: any) => setValue(`${prefix}_email`, e.target.value)}
                    inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
                placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed"
                    className="mb-0"
                    placeholder="Email"
                    error={
                      errors && errors[`${prefix}_email`]
                    }
                    errorText="Please enter a valid email address"
                  />
                </div>
                : null
              }

              <div className='cursor-default pb-4'>
                <label className="text-sm font-semibold">Citizenship:</label>
                <SelectField
                  defaultValue={tempData !== null ? tempData.citizenship : null}
                  name={`${prefix}_citizen`}
                  options={citizenshipList}
                  register={register}
                  validation={SelectAnyValue}
                  selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
                  className='mb-0'
                  placeholder="Select Citizenship"
                  error={errors && errors[`${prefix}_citizen`]}
                  errorText='Please select citizenship'
                />
              </div>
              <div className='cursor-default pb-4'>
                <label className="text-sm font-semibold">Meal Preferences:</label>
                <SelectField
                  defaultValue={tempData !== null ? tempData.meal : null}
                  name={`${prefix}_meal`}
                  options={mealList}
                  register={register}
                  validation={SelectAnyValue}
                  selectClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 mt-2 
              w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
                  className='mb-0'
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
                  className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed'
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
              <div className='pb-4 cursor-default'>
                <label className="text-sm font-semibold">State:</label>
                <select
                  name={`${prefix}_state`}
                  defaultValue={getValues(`${prefix}_state`)}
                  className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
              placeholder:text-gray-100 w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed'
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
              <div className='pb-4 cursor-default'>
                <label className="text-sm font-semibold">City:</label>
                {state && state[prefix] != '' && StateCities[state[prefix]] ? (
                  <>
                    <select
                      name={`${prefix}_cities`}
                      defaultValue={getValues(`${prefix}_cities`)}
                      // {...register(`${prefix}_cities`, { required: true })}
                      className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed'
                      onChange={(event) => {
                        let x = event.target.value;
                        // setState(x);
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
                ) : !state[prefix] && !StateCities[state[prefix]] && tempData != null && tempData.city ? (
                  <>
                    <select
                      name={`${prefix}_cities`}
                      defaultValue={tempData.city}
                      // {...register(`${prefix}_cities`, { required: true })}
                      className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed'
                      onChange={(event) => {
                        let x = event.target.value;
                        // setState(x);
                        setValue(`${prefix}_cities`, x);
                      }}
                    >
                      <option selected value="" disabled>{"Choose a City"}</option>
                      {
                        StateCities && StateCities[tempData.state] && StateCities[tempData.state].map((city: any) => {
                          return <option value={city}>{city}</option>
                        })
                      }
                    </select>
                    {errors && errors[`${prefix}_cities`] && <p className="text-xs text-danger mt-1">Please select city</p>}
                  </>
                ) : (
                  <input
                    autoComplete='none'
                    type="text"
                    className='border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed'
                    placeholder='Enter City Name'
                  />
                  // <Input
                  //   type='text'
                  //   register={register}
                  //   validation={string}
                  //   name={`${prefix}_city`}
                  //   inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-sm mt-2 placeholder:text-gray-100 w-full"
                  //   placeholder="Enter City Name"
                  //   error={
                  //     errors && errors[`${prefix}_city`]
                  //   }
                  //   errorText="Please enter city name"
                  // />
                )}
              </div>

              {is_international ? <>
                <div className='cursor-default pb-4'>
                  <label className="text-sm font-semibold">Passport Number:</label>
                  <Input
                    defaultValue={tempData !== null ? tempData.passport_number : null}
                    type='text'
                    register={register}
                    validation={string}
                    name={`${prefix}_id_number`}
                    inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
                  placeholder:text-gray-100 w-full disabled:text-gray-200 disabled:cursor-not-allowed"
                    className="mb-0"
                    placeholder="Passport Number"
                    error={
                      errors && errors[`${prefix}_id_number`]
                    }
                    errorText="Please enter a passport number"
                  />
                </div>
                <div className='cursor-default pb-4'>
                  <label className="text-sm font-semibold">Passport Issue Date:</label>
                  <Input
                    defaultValue={tempData !== null ? DateFormate(tempData.passport_issue_date) : null}
                    type='date'
                    max='9999-12-31'
                    register={register}
                    name={`${prefix}_passport_issue_date`}
                    inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
                  placeholder:text-gray-100 w-full mb-0 disabled:text-gray-200 disabled:cursor-not-allowed"
                    className="mb-0"
                    placeholder="Passport Issue Date"
                    error={
                      errors && errors[`${prefix}_passport_issue_date`]
                    }
                    errorText="Please enter a valid date"
                  />
                </div>
                <div className='cursor-default pb-4'>
                  <label className="text-sm font-semibold">Passport Expiry Date:</label>
                  <Input
                    defaultValue={tempData !== null ? DateFormate(tempData.passport_expiry_date) : null}
                    type='date'
                    max='9999-12-31'
                    register={register}
                    name={`${prefix}_passport_expiry_date`}
                    inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
                  placeholder:text-gray-100 w-full mb-0 disabled:text-gray-200 disabled:cursor-not-allowed"
                    className="mb-0"
                    placeholder="Passport Issue Date"
                    error={
                      errors && errors[`${prefix}_passport_expiry_date`]
                    }
                    errorText="Please enter a valid date"
                  />
                </div>
                <div className='cursor-default pb-4'>
                  <label className="text-sm font-semibold">Address:</label>
                  <Input
                    defaultValue={tempData !== null ? tempData.passport_address : null}
                    type='text'
                    register={register}
                    validation={string}
                    name={`${prefix}_passport_address`}
                    inputClassName="border bg-gray-400 rounded-md text-sm !py-3 px-3 placeholder:text-sm mt-2
                  placeholder:text-gray-100 w-full mb-0 disabled:text-gray-200 disabled:cursor-not-allowed"
                    className="mb-0"
                    placeholder="Passport Address"
                    error={
                      errors && errors[`${prefix}_passport_address`]
                    }
                    errorText="Please enter passport address"
                  />
                </div>
              </> : null}

              <div className='py-4 cursor-default'>
                <div className='flex gap-2 items-start'>
                  <input
                    type='checkbox'
                    id={`${prefix}_consent`}
                    {...register(`${prefix}_consent`, {
                      validate: (value) => value === true || "You must agree before continuing",
                    })}
                    className='mt-1 border bg-gray-400 rounded-sm text-sm text-brand-primary cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed'
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
      )
    });

    return (
      <div className='border shadow-md border-gray-800/20 rounded-md'>
        <div className='flex border-b-2 border-b-gray-800/20'>
          {guestForms}
        </div>
        {guestFormsBody}
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
          setSelectedGuestIndex(index);
          setGuestType(guestType);
          // setCountry("")
          // setState("")
        }}
        className={`lg:text-base text-xs w-full font-bold py-2.5 px-5 -mb-0.5 ${selectedGuestIndex === index ? 'border-b-2 border-b-brand-primary' : null}`}
      // className=' text-brand-primary border-brand-primary '
      >
        <p>Guest {index + 1}</p>
        <p className='text-xxs text-gray-900'>{guestType}</p>
      </button>
    )
  }

  const handleContinueToNextGuest = async () => {
    window.scrollTo(0, 0);

    const currentPrefix = `${selectedRoomIndex}_${selectedGuestIndex}`;
    const currentFieldNames = Object.keys(getValues()).filter((key) =>
      key.startsWith(currentPrefix)
    );

    const isValid = await trigger(currentFieldNames);

    if (!isValid) {
      console.log("Current guest form has errors");
      return;
    }

    const currentGuestDoc = docDetails?.[currentPrefix];
    const isDocUploaded = currentGuestDoc?.front_img || currentGuestDoc?.back_img;

    const room = store.rooms[selectedRoomIndex];
    const { adults, children } = room;

    // Determine guest type
    let currentGuestType = "";
    if (selectedGuestIndex < adults) {
      currentGuestType = "Adult";
    } else if (selectedGuestIndex < adults + children) {
      currentGuestType = "Child";
    } else {
      currentGuestType = "Infant";
    }

    // Only set document error if not an Infant
    if (currentGuestType !== "Infant" && !isDocUploaded) {
      setError(`${currentPrefix}_document`, {
        type: "manual",
        message: "Please upload a valid document",
      });
      return;
    } else {
      clearErrors(`${currentPrefix}_document`);
    }

    // Move to next guest
    const currentIndex = guestPaths.findIndex(
      (g) =>
        g.roomIndex === selectedRoomIndex &&
        g.guestIndex === selectedGuestIndex
    );

    const nextGuest = guestPaths[currentIndex + 1];
    if (nextGuest) {
      const nextRoom = store.rooms[nextGuest.roomIndex];
      const { adults, children } = nextRoom;

      let nextType = "";
      if (nextGuest.guestIndex < adults) {
        nextType = "Adult";
      } else if (nextGuest.guestIndex < adults + children) {
        nextType = "Child";
      } else {
        nextType = "Infant";
      }

      setSelectedRoomIndex(nextGuest.roomIndex);
      setSelectedGuestIndex(nextGuest.guestIndex);
      setGuestType(nextType);
    }
  };
  const portList = store?.itinerary?.ports
    .filter((val: any) => val.name !== 'At Sea')
    .map((val: any) => val.name)
    .join(' | ');

  const isLong = portList?.length > 150;

  return (
    <Layout>
      {/* {loading ? (
        <div className="h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/90 z-50">
          <img
            className="w-32 lg:w-44"
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
            alt=""
          />
        </div>
      ) : null} */}
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="assets/icons/footer/chevon-down.svg"
              alt="arrow"
              onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90  lg:hidden`}
            />
            <h1 className="text-xl font-medium lg:text-3xl">
              Add the details of the guests
            </h1>
          </div>
          <p className='lg:text-sm text-xs leading-5 font-semibold mt-2 text-gray-800'>To save your reservation, we need the details of each traveler per stateroom. Remember, first and last name must match what appears on government-issued photo IDs,</p>
          <div className='grid grid-cols-5 gap-5'>
            <div className='col-span-2 hidden lg:block mt-4'>
              <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-2 fixed lg:sticky lg:top-40 lg:bottom-40 lg:mb-3.5 bg-white z-10 lg:z-0 w-full left-0 lg:left-auto border-gray-200/20  lg:w-10/12'>
                <div className='grid grid-cols-10 px-4 lg:pt-6 pb-0 pt-4'>
                  <div className='col-span-7 lg:col-span-10'>
                    <div>
                      <div className='flex items-start justify-between py-1'>
                        <div className=''>
                          <p className='text-xxs lg:sm text-brand-primary font-bold'>
                            Departure
                          </p>
                        </div>
                        <div className='w-[50%] text-center relative -mt-[0px] lg:-mt-[0px]'>
                          <p className='text-gray-200 whitespace-nowrap overflow-hidden text-xxs'>--------------------------------------------------------------</p>
                          <img className='absolute h-7'
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                          />
                        </div>
                        <div className='text-right'>
                          <p className='text-xxs lg:sm text-brand-primary font-bold'>
                            Arrival
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start justify-between pb-1.5'>
                        <div className=''>
                          <p className='text-base lg:text-xl font-bold'>
                            {store?.itinerary?.ports[0]?.name}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-base lg:text-xl font-bold'>
                            {store?.itinerary?.ports[store?.itinerary?.ports.length - 1]?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='border-b col-span-10 mb-2 border-gray-100/20' />
                    <div className='flex flex-col items-start col-span-7 lg:col-span-10'>
                      <p className="text-xs lg:text-sm font-medium text-gray-100">
                        Visiting Ports:
                      </p>
                      <div className="flex">
                        <p className="text-xs lg:text-xs font-medium !leading-5">
                          <span className='mr-2'>{isLong && !isExpanded ? portList?.slice(0, window.innerWidth > 765 ? 65 : 40) + '...' : portList}</span>
                          {isLong && (
                            <span
                              onClick={() => setIsExpanded(prev => !prev)}
                              className="text-xs lg:text-xs text-brand-primary font-bold cursor-pointer inline-block"
                            >
                              {isExpanded ? 'View less' : 'View more'}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='border-b col-span-10 my-2 border-gray-100/20' />
                    <div className='grid grid-cols-2 mt-2'>
                      <div className='flex'>
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                          className="h-3 mr-1 mt-0.5 lg:h-4"
                          alt="Cruise"
                        />
                        <p className="text-xs lg:text-base font-semibold">
                          {toDate(store?.itinerary?.start_date)[2]} {toDate(store?.itinerary?.start_date)[1]} {toDate(store?.itinerary?.start_date)[3]}
                        </p>
                      </div>
                      <div className="flex ">
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                          className="h-3 mr-1 mt-0.5 lg:h-4"
                          alt="Cruise"
                        />
                        <p className="text-xs lg:text-base font-semibold">
                          {`${store?.rooms?.length} Rooms`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='border-b col-span-10 my-2 border-gray-100/20' />
                  <div className='col-span-3 lg:col-span-10'>
                    <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                      Total Fare
                    </p>
                    {itinerary?.discount_pct != 0 ?
                      <p className="text-xs text-right lg:text-left lg:text-base font-semibold text-gray-200 line-through">
                        {`₹ ${store?.actualTotalCabinFare >= 0 &&
                          FormatPrice(store?.actualTotalCabinFare)
                          }`}
                      </p>
                      : null}
                    <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                      {`₹ ${store?.totalCabinFare >= 0 &&
                        FormatPrice(store?.totalCabinFare)
                        }`}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-1 lg:mt-2 bg-brand-sky/5 px-2 py-1 mt-4'>
                  <p className='text-xxs font-semibold'>(Incl. Service + Port charges) & (Excl. GST charges)</p>
                </div>
              </div>
            </div>

            <div className='lg:col-span-3 col-span-5'>
              <div className='py-4'>
                <RoomHeader />
              </div>
              <div className='py-2'>
                <div>
                  <GuestContainer />
                </div>
              </div>
              {!!Object.keys(errors).length && (
                <p className="text-danger pt-2">
                  <span className="text-xs lg:text-sm font-semibold">
                    Please enter all guest's details correctly before continuing.
                  </span>
                </p>
              )}

              <div className="">
                <div className='mt-3'>
                  {isOnlyOneGuest ? (
                    <Button text='Save Guest Details' handleClick={() => {
                      handleSubmit(previewGuest)();
                      // if (isCurrentGuestValid) {
                      //   handleSubmit(previewGuest)();
                      // }
                    }} className='w-full' />
                  ) : !isLastGuest() ? (
                    <Button text='Continue to Next Guest' handleClick={handleContinueToNextGuest} className='w-full' />
                  ) : (
                    <Button text='Continue' handleClick={handleSubmit(previewGuest)} className='w-full' />
                  )}
                </div>
              </div>
            </div>
            {/* <IdSelectorBottomSheet options={docOptions} isOpen={isOpen} setIsOpen={setIsOpen} selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} /> */}
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
            update={(sel:any) => {
              const {roomIndex, guestIndex, reviewedState} = sel
              setSelectedRoomIndex(roomIndex)
              setSelectedGuestIndex(guestIndex)
              setPersistedReviewedGuests(reviewedState);
              setIsPreviewGuestModalOpen(false)
            }}
            initialReviewedState={persistedReviewedGuests}
            RoomsInput={roomsInputData}
            // RoomsInput={RoomsInput_dummy}
          />
        </div>
      </Modal>

    </Layout>
  );
}