import { Input } from '../../../components/UI/Forms/Inputs';
import Select from 'react-select';
import { Layout } from '../../../components/Layout';
import {
  FirstName,
  LastName,
  Phone,
  Email,
  date
} from '../../../utils/validations/formValidations';
import PhoneCode from '../../../components/UI/Forms/Inputs/phoneCodes.json';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useGetUserProfileMutation, useUpdateUserProfileMutation } from '../../../services/profile/profile';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import ProfileAuth from '../auth';
import Button from '../../../components/UI/Button';

type Props = {};


const customStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f5f5f5',
    height: '48px',
    border: 10,
    // border: 'none', // Remove border
    boxShadow: 'none',
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
    ...base,
    zIndex: 9999
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    marginRight: '-36px', // Add your desired left margin here
  }),
};
export default function MyProfile({}: Props) {
  const [country, setCountry] = useState('+91');
  const [profileData, setProfileData] = useState<any>([]);
  const [getUserProfile] = useGetUserProfileMutation()
  const [updateUserProfile] = useUpdateUserProfileMutation()
  const location = useLocation();
  let path = location?.pathname
  let leadId:any  = JSON.parse(localStorage.getItem('auth'))
  const getBookingData = async ()=>{
    await getUserProfile(leadId.lead_id)
    .unwrap()
    .then((res: any) => {
   setProfileData(res)
    })
    .catch((res: any) => {
      console.log('Error: ', res)
    })
  }
  useEffect(()=>{
    getBookingData()
  },[])

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: profileData ? profileData.first_name:'',
      last_name: profileData ?profileData.last_name:'',
      email: profileData ?profileData.email:'',
      phone_number: profileData ?profileData.phone_number:'',
      dob: profileData ?profileData.dob:''
    }
  });
  const submitDetailData = (data: any) => {
    const _payload = { id:leadId.lead_id, data:data };
    updateUserProfile(_payload)
      .unwrap()
      .then((response) => {
        setProfileData(response)
        toast.success('Profile Updated successfully !!', {
          duration: 2000,
          position: 'top-center',
          style:{
            background:'#17cc4e',
            color:'#fff',
        }          
        })  
      })
      .catch((error) => {
         console.log(error)
      })
  };
  useEffect(()=>{
    setValue('first_name',profileData.first_name)
    setValue('last_name',profileData.last_name)
    setValue('email',profileData.email)
    setValue('phone_number',profileData.phone_number)
    setValue('dob',profileData.dob)
  },[profileData])

  return (
    <Layout>
             <Toaster />
      <section className="flex flex-wrap justify-center lg:mt-32 mt-20">
        <div className='lg:w-1/3'> 
      <div className=" flex gap-3 justify-center lg:text-3xl text-lg font-bold self-center px-4 lg:pb-3">
          <p> My Profile </p>
        </div>
        <div className="mt-4 mx-8">
          <Input
            type="text"
            register={register}
            validation={FirstName}
            onChange={(e: any) => setValue('first_name', e.target.value)}
            name="first_name"
            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="First Name"
            error={errors && errors?.first_name && errors?.first_name}
            errorText={errors && errors?.first_name?.message}
          />
        </div>
        <div className="mt-4 mx-8">
          <Input
            type="text"
            register={register}
            validation={LastName}
            onChange={(e: any) => setValue('last_name', e.target.value)}
            name="last_name"
            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="Last Name"
            error={errors && errors?.last_name && errors?.last_name}
            errorText={errors && errors?.last_name?.message}
          />
        </div>
        <div className="mt-4 mx-8">
          <Input
            type="email"
            register={register}
            validation={Email}
            onChange={(e: any) => setValue('email', e.target.value)}
            name="email"
            inputClassName="border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="Email"
            error={errors && errors?.email}
            errorText={errors && errors?.email?.message}
          />
        </div>
        <div className="grid grid-cols-10 px-8 mt-3 lg:grid-cols-9">
          <div className="lg:col-span-2 col-span-3">
            <div className={`grid grid-cols-1 `}>
              <Select
                menuPortalTarget={document.body}
                // menuPosition={'fixed'}
                value={{ label: country }}
                maxMenuHeight={290}
                options={PhoneCode}
                isDisabled={true}
                // onChange={item => setCountry(item.value)}
                styles={customStyles}
              />
            </div>
          </div>
          <div className="lg:col-span-7 col-span-7">
            <div className={`grid grid-cols-1 relative `}>
              <div className="grid grid-cols-1 relative">
                <div>
                  <input
                  disabled
                    className={`border-0 bg-gray-400 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full`}
                    type="text"
                    placeholder="Phone Number"
                    {...register('phone_number', {
                      required: true,
                      minLength: 10,
                      maxLength: 10
                    })}
                  ></input>
                  <div>
                    {errors && errors.phone_number && (
                      <p className="text-sm mt-1 text-danger">
                        Enter 10 digit mobile number.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mx-8">
          <Input
            // defaultValue={tempData !== null ? DateFormate(tempData.passport_issue_date) : null}
            type="date"
            max="9999-12-31"
            validation={date}
            register={register}
            name={`dob`}
            inputClassName="border-0 bg-gray-400 text-gray-100 rounded-md text-sm lg:text-base !py-3 px-3 placeholder:text-xs lg:placeholder:text-base placeholder:text-gray-100 w-full"
            placeholder="DOB"
            error={errors && errors?.dob}
            errorText="Please enter a valid date"
          />
        </div>

       {window.innerWidth > 640 ? <div className="px-8 mb-16">
          <Button text='Save Changes' size='base' handleClick={handleSubmit(submitDetailData)} className='w-full' />
        </div> :  
        // mobile
        <div className={`fixed bottom-0 left-0 w-full z-30`}>
        <Button text='Save Changes' size='base' handleClick={handleSubmit(submitDetailData)} className='w-full rounded-none' />
      </div> }
        </div>
      </section>
    </Layout>
  );
}
