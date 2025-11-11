import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout';
import { FormatToString } from '../../utils/formatter/formatter';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetStore, SaveStore, GetPromo, GetAppliedPromo } from '../../utils/store/store';
import { useGetCabinImageQuery } from '../../services/itinerary/itinerary';
import Modal from '../../components/UI/Modal';
import { Input, Select as SelectField } from '../../../src/components/UI/Forms/Inputs';
import { useForm } from 'react-hook-form';
import { string, SelectAnyValue, required, phone, email, gender, date, Phone, Email, Pincode, PanNo, GSTIN } from '../../../src/utils/validations/formValidations';

import { DateFormate, DateFormator } from "../../utils/formatter/formatter"
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import CountryStates from "../../components/UI/Forms/Inputs/country-states.json";
import StateCities from "../../components/UI/Forms/Inputs/state-cities.json";
import phoneCodes from "../../components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";

type Props = {}

const toDate = (dateStr: any) => {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day).toDateString().split(' ')
  } else return new Date().toDateString().split(' ')
}

const genderList = [
  { code: 'male', name: 'Male' },
  { code: 'female', name: 'Female' }
]
const citizenshipList = [
  { code: 'indian', name: 'Indian' },
  { code: 'NRI', name: 'NRI' }
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
  const rooms = store.rooms;

  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number>(0);
  const [countryCode, setCountryCode] = useState('+91');

  const [country, setCountry] = useState({});
  const [countryStatesArray, setCountryState] = useState({});
  const [state, setState] = useState({})
  const [tData, setTData] = useState(1)
  const [isIndia, setIsIndia] = useState<any>({})
  const joiObject: any = {};
  let navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
    new Date(referenceDate).setMonth(referenceDate.getMonth() - 6)
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
          if(tempData.country == 'India'){
            setValue(`${prefix}_cities`, tempData.city);
          }
          a[prefix] = CountryStates.countries.filter((country) => country.country === tempData.country)[0].states
        } else {
          a[prefix] = CountryStates.countries.filter((country) => country.country === 'India')[0].states
          ind[`${prefix}_country`] = 'India'
          setValue(`${prefix}_country`, 'India');
        }
      })
    })
    
    setIsIndia(ind)
    setCountryState(a);
  }, [])


  store?.rooms.forEach((room: any, roomIndex: any) => {
    const count = room.adults + room.children + room.infants;
    for (let guestIndex = 0; guestIndex < count; guestIndex++) {
      const guestType =
        guestIndex < room.adults
          ? "adult"
          : guestIndex < room.adults + room.children
            ? "child"
            : "infant";
      const prefix = `${roomIndex}_${guestIndex}`;
      joiObject[`${prefix}_first_name`] = string;
      joiObject[`${prefix}_last_name`] = string;
      joiObject[`${prefix}_gender`] = gender;
      joiObject[`${prefix}_meal`] = string;
      joiObject[`${prefix}_dob`] =
        guestType === "adult"
          ? (guestIndex === 0 ? date.max(firstAdultMaxDate) : date.max(adultMaxDate))
          : guestType === "child"
            ? date.max(childMaxDate).min(adultMaxDate)
            : date.max(infantMaxDate).min(childMaxDate);
      joiObject[`${prefix}_country`] = string;
      joiObject[`${prefix}_state`] = string;
      joiObject[`${prefix}_citizen`] = string;
      if (isIndia[`${prefix}_country`] == 'India') {
        joiObject[`${prefix}_cities`] = string;
      }
      if (guestType === "adult") {
        joiObject[`${prefix}_mobile`] = phone;
        joiObject[`${prefix}_email`] = email;
      }
      if (is_international) {
        joiObject[`${prefix}_passportIssueDate`] = date.less(passportIssue);
        joiObject[`${prefix}_passportExpiryDate`] = date.min(passportExpiry);
        joiObject[`${prefix}_passportNumber`] = string;
        joiObject[`${prefix}_passportAddress`] = string;
      }
    }
  });

  const { register, unregister, formState: { errors, }, handleSubmit, setError, setValue, getValues, watch } = useForm({
    resolver: joiResolver(Joi.object(joiObject)),
    shouldUnregister: true
  });

  // console.log('aaaa err', Object.keys(errors));
  
  console.log('aaaa data', watch());
  // console.log('aaaa joi', joiObject);
  const onSubmit = (data: any) => {
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
    RoomsInput = newRooms.map((room) => ({
      ...room,
      guests: room.guests.map((guest: any, i: any) => ({
        type:
          i < room.adults
            ? "ADULT"
            : i < room.adults + room.children
              ? "CHILD"
              : "INFANT",
        phone: guest.mobile,
        date_of_birth: guest.dob,
        city: guest.cities,
        citizenship: guest.citizen,
        is_nri:
          guest.citizen == 'indian' ? false : true,
        meal: guest.meal,
        first_name: guest.first,
        last_name: guest.last,
        gender: guest.gender.toUpperCase(),
        country: guest.country,
        state: guest.state,
        email: guest.email,
        passport_issue_date: guest.passportIssueDate,
        passport_expiry_date: guest.passportExpiryDate,
        passport_number: guest.passportNumber,
        passport_address: guest.passportAddress,
      })),
    }));

    // SaveStore({ ...store, rooms: RoomsInput });
    // navigate('/shore-excursions')
  }

  const RoomHeader = () => {
    return (
      <div>
        {store?.rooms?.length ? store.rooms.map((val: any, i: number) => {
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedRoomIndex(i)
                setSelectedGuestIndex(0)
                // setCountry("")
                // setState("")
              }}
              className={`lg:text-base text-xs font-bold border-2 py-2.5 px-5 mr-1 rounded ${selectedRoomIndex === i ? 'text-white border-brand-primary bg-brand-primary' : 'text-brand-primary border-brand-primary'}`}
            >
              Room {i + 1}
            </button>
          )
        }) : null}
      </div>
    )
  }

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
          <div className='pt-4'>
            <label className="text-sm font-semibold">First name:</label>
            <Input
              defaultValue={tempData !== null ? tempData.first_name : null}
              type='text'
              register={register}
              validation={string}
              name={`${prefix}_first_name`}
              inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
              placeholder="Full Name"
              error={
                errors && errors[`${prefix}_first_name`]
              }
              errorText="Please enter a valid first name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Last name:</label>
            <Input
              defaultValue={tempData !== null ? tempData.last_name : null}
              type='text'
              register={register}
              validation={string}
              name={`${prefix}_last_name`}
              inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
              placeholder="Last Name"
              error={
                errors && errors[`${prefix}_last_name`]
              }
              errorText="Please enter a valid last name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Gender:</label>
            <SelectField
              defaultValue={tempData !== null ? tempData.gender.toLowerCase() : null}
              name={`${prefix}_gender`}
              options={genderList}
              register={register}
              validation={SelectAnyValue}
              selectClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
              className='!mb-4'
              placeholder="Select Gender"
              error={errors && errors[`${prefix}_gender`]}
              errorText='Please select gender'
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Date of Birth:</label>
            <Input
              defaultValue={tempData !== null ? DateFormate(tempData.date_of_birth) : null}
              type='date'
              max='9999-12-31'
              register={register}
              name={`${prefix}_dob`}
              inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
              placeholder="Last Name"
              error={
                errors && errors[`${prefix}_dob`]
              }
              errorText="Please enter a valid date of birth"
            />
          </div>
          {guestType === 'Adult' ?
            <div className='mt-3'>
              <label className="text-sm font-semibold">Mobile:</label>
              <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                <div className="lg:col-span-2 col-span-3 mt-2">
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
                  <Input
                    defaultValue={tempData !== null ? tempData.phone : null}
                    type='text'
                    register={register}
                    maxLength="10"
                    validation={string}
                    name={`${prefix}_mobile`}
                    inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
                    placeholder:text-gray-100 w-full"
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
            <div>
              <label className="text-sm font-semibold">Email:</label>
              <Input
                defaultValue={tempData !== null ? tempData.email : null}
                type='mail'
                register={register}
                validation={string}
                name={`${prefix}_email`}
                inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
                placeholder:text-gray-100 w-full"
                placeholder="Email"
                error={
                  errors && errors[`${prefix}_email`]
                }
                errorText="Please enter a valid email address"
              />
            </div>
            : null
          }

          <div>
            <label className="text-sm font-semibold">Citizenship:</label>
            <SelectField
              defaultValue={tempData !== null ? tempData.citizenship : null}
              name={`${prefix}_citizen`}
              options={citizenshipList}
              register={register}
              validation={SelectAnyValue}
              selectClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
              className='!mb-4'
              placeholder="Select Citizenship"
              error={errors && errors[`${prefix}_citizen`]}
              errorText='Please select citizenship'
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Meal Preferences:</label>
            <SelectField
              defaultValue={tempData !== null ? tempData.meal : null}
              name={`${prefix}_meal`}
              options={mealList}
              register={register}
              validation={SelectAnyValue}
              selectClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
              className='!mb-4'
              placeholder="Select Meal"
              error={errors && errors[`${prefix}_meal`]}
              errorText='Please select meal'
            />
          </div>

          <div className='mb-4'>
            <label className="text-sm font-semibold">Country:</label>
            <select
              defaultValue={getValues(`${prefix}_country`)}
              name={`${prefix}_country`}
              className='border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full'
              onChange={(event) => {
                let x = event.target.value;
                setCountryState({
                  ...countryStatesArray,
                  [prefix]: CountryStates.countries.filter((country) => country.country === x)[0].states
                });

                setValue(`${prefix}_country`, x);
                setIsIndia({
                  ...isIndia,
                  [`${prefix}_country`]: x
                })
                if(x != 'India'){
                  unregister(`${prefix}_cities`)
                }
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
          <div className='mb-4'>
            <label className="text-sm font-semibold">State:</label>
            <select
              name={`${prefix}_state`}
              defaultValue={getValues(`${prefix}_state`)}
              className='border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full'
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
          <div className='mb-4'>
            <label className="text-sm font-semibold">City:</label>
            {state && state[prefix] && StateCities[state[prefix]] ? (
              <>
                <select
                  name={`${prefix}_cities`}
                  defaultValue={getValues(`${prefix}_cities`)}
                  // {...register(`${prefix}_cities`, { required: true })}
                  className='border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
            placeholder:text-gray-100 w-full'
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
                  className='border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2 placeholder:text-gray-100 w-full'
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
                type="text"
                className='border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2 placeholder:text-gray-100 w-full'
                placeholder='Enter City Name'
              />
              // <Input
              //   type='text'
              //   register={register}
              //   validation={string}
              //   name={`${prefix}_city`}
              //   inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2 placeholder:text-gray-100 w-full"
              //   placeholder="Enter City Name"
              //   error={
              //     errors && errors[`${prefix}_city`]
              //   }
              //   errorText="Please enter city name"
              // />
            )}
          </div>
          {is_international ? <>
            <div>
              <label className="text-sm font-semibold">Passport Number:</label>
              <Input
                defaultValue={tempData !== null ? tempData.passport_number : null}
                type='text'
                register={register}
                validation={string}
                name={`${prefix}_passportNumber`}
                inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
                placeholder="Passport Number"
                error={
                  errors && errors[`${prefix}_passportNumber`]
                }
                errorText="Please enter a passport number"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Passport Issue Date:</label>
              <Input
                defaultValue={tempData !== null ? DateFormate(tempData.passport_issue_date) : null}
                type='date'
                max='9999-12-31'
                register={register}
                name={`${prefix}_passportIssueDate`}
                inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
                placeholder="Passport Issue Date"
                error={
                  errors && errors[`${prefix}_passportIssueDate`]
                }
                errorText="Please enter a valid date"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Passport Expiry Date:</label>
              <Input
                defaultValue={tempData !== null ? DateFormate(tempData.passport_expiry_date) : null}
                type='date'
                max='9999-12-31'
                register={register}
                name={`${prefix}_passportExpiryDate`}
                inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
                placeholder="Passport Issue Date"
                error={
                  errors && errors[`${prefix}_passportExpiryDate`]
                }
                errorText="Please enter a valid date"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Address:</label>
              <Input
                defaultValue={tempData !== null ? tempData.passport_address : null}
                type='text'
                register={register}
                validation={string}
                name={`${prefix}_passportAddress`}
                inputClassName="border bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs mt-2
              placeholder:text-gray-100 w-full"
                placeholder="Passport Address"
                error={
                  errors && errors[`${prefix}_passportAddress`]
                }
                errorText="Please enter passport address"
              />
            </div>
          </> : null}
        </div>
      )
    });

    return (
      <div className='border shadow-md border-gray-800/20'>
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
          setSelectedGuestIndex(index)
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

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="assets/icons/footer/chevon-down.svg"
              alt="arrow"
              onClick={() => navigate('/upgrade-room')}
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
                    <div className='flex '>
                      <img
                        src="assets/icons/footer/chevon-down.svg"
                        alt="arrow"
                        onClick={() => navigate('/cabin')}
                        className={`mt-1 col-span-1 mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90 lg:hidden`}
                      />
                      <p className='text-sm col-span-8 font-bold leading-5 lg:text-2xl'>{store?.itinerary?.ports?.map((port: any, index: number) => {
                        return (
                          <span key={index}>
                            <span>{port['name']}</span>
                            {index < store?.itinerary?.ports.length - 1 && (
                              <span className="mx-1">-</span>
                            )}
                          </span>
                        );
                      })}</p>
                    </div>

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
                  <div className='md:block hidden border-b-2 col-span-10 my-3 border-gray-100/20' />
                  <div className='col-span-3 lg:col-span-10'>
                    <p className="text-xs font-semibold text-right lg:text-left lg:text-base">
                      Total Fare
                    </p>
                    <p className="text-xl font-bold text-right lg:text-left lg:text-3xl text-brand-primary">
                      {`₹ ${store?.totalCabinFare >= 0 &&
                        FormatToString(store?.totalCabinFare)
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
            </div>
          </div>

          {!!Object.keys(errors).length && (
            <p className="text-danger pt-2">
              <span className="text-xs lg:text-sm font-semibold">
                Please enter all guests' details correctly before continuing.
              </span>
            </p>
          )}

          <div className="">
            <div className='mt-3'>
              <button
                onClick={handleSubmit(onSubmit)}
                className={`bg-brand-primary text-xs text-white font-bold w-full py-3 rounded disabled:bg-brand-primary/60`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}