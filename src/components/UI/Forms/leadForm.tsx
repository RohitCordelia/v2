import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PhoneCode from "/src/components/UI/Forms/Inputs/phoneCodes.json";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import Button from '../Button';
type Props = {};

export type RegistrationFormFields = {
  firstName: string;
  countryCode: string;
  phoneNumber: string;
};

const customStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: '#f5f5f5', height: '48px', border: 0 }),
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
  })
};

export default function LeadForm(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState();
  const [countryCode, setCountryCode] = useState();
  const [country, setCountry] = useState('+91');
  const [submitted, setSubmitted] = useState(false);

  // const params = new URLSearchParams(
  //   window.location.search
  // );
  // const newparams = new URLSearchParams();
  // for (const [name, value] of params) {
  //   newparams.append(name.toLowerCase(), value);
  // }

  // const utm_source = newparams.get('utm_source');
  // const utm_medium = newparams.get('utm_medium');
  // const utm_term = newparams.get('utm_term');
  // const gclid = newparams.get('gclid');
  // const utm_campaign = newparams.get('utm_campaign');
  // const utm_adgroup = newparams.get('utm_adgroup');

  // console.log(params, newparams, "utm_source", utm_source, utm_medium);

  const urlParams = new URLSearchParams(window.location.search);
  const seen = new Set();
  const cleanedParams = new URLSearchParams();

  for (const [name, value] of urlParams.entries()) {
    const lowerName = name.toLowerCase();
    if (!seen.has(lowerName)) {
      cleanedParams.append(lowerName, value);
      seen.add(lowerName);
    }
  }

  const utm_source = cleanedParams.get("utm_source") || "";
  const utm_medium = cleanedParams.get("utm_medium") || "";
  const utm_term = cleanedParams.get("utm_term") || "";
  const gclid = cleanedParams.get("gclid") || "";
  const utm_campaign = cleanedParams.get("utm_campaign") || "";
  const utm_adgroup = cleanedParams.get("utm_adgroup") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<RegistrationFormFields>({
    mode: 'onChange',
    defaultValues: {
      firstName: "",
      countryCode: "",
      phoneNumber: ""
    }
  });

  useEffect(() => {
    if (submitted) {
      reset({
        firstName: '',
        phoneNumber: ""
      });
    }
  }, [submitted]);

  const onSubmit = (contact: any) => {
    var data = new FormData();
    const currentUrl = ""
    const leadForm = "Contact Us Page";
    const leadSource = "Website Contact Form";
    const web = { "total_time": 3589, "field_analytics": [{ "field_name": "Last Name", "correction": 0, "total_time": 1005 }, { "field_name": "Phone", "correction": 0, "total_time": 1232 }], "pwXsmCp": "" }
    data.append(
      "xnQsjsdp",
      "61fb75af36dc15e56323d9f238e95a44da4957f2d27f29ca42d8b9b252dc497b"
    );
    data.append("zc_gad", gclid || '');
    data.append(
      "xmIwtLD",
      "9941893ff489793859af6c662c2aa717e447cf91b72109445ad9a66306053f10"
    );
    data.append("actionType", "TGVhZHM=");
    data.append("returnURL", "");
    data.append("Last Name", contact.firstName);
    data.append("Phone", contact.phoneNumber);
    data.append("LEADCF13", utm_campaign || '');
    data.append("LEADCF18", utm_source || '');
    data.append("LEADCF10", utm_adgroup || '');
    data.append("LEADCF14", utm_term || '');
    data.append("LEADCF12", utm_medium || '');
    data.append("Lead Source", leadSource);
    data.append("Lead Status", "New Lead");

    data.append("te", "true");
    data.append("webform_analytics_submission", JSON.stringify(web));
    data.append("rw", "096a715cbfc30dc79d6dc215bf71c5b4284d938378e51186a6daa9337f7519a8");
    data.append("la", "681becefb83de6a622d0393e8ac2a2f3");
    data.append("eo", "4ee3a7e9ace6ab1be7c541b329164307");

    fetch("https://crm.zoho.in/crm/WebToLeadForm", {
      method: "post",
      body: data,
    })
      .then((res) => {
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log("error---", error);
      });
  };

  return (
    <div className="container mx-auto my-12 lg:mb-20">
      <div className="m-4 p-4 lg:p-0 rounded-xl drop-shadow-infoCard bg-white">
        <form onSubmit={handleSubmit(onSubmit)} name="WebToLeads443730000221833354">
          <div className="grid grid-cols-1 lg:grid-cols-11 lg:gap-4">
            <div className='col-span-5 hidden lg:inline-block'>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/images/call-back-image.webp "
                className="w-full"
                alt="Cruise"
                loading="lazy"
              />
            </div>
            <div className='col-span-6 lg:p-8'>
              <h3 className="text-xl lg:text-4xl mb-2 font-medium lg:mb-2">
                Get in touch with us
              </h3>
              <p className="text-xs lg:text-base leading-4 opacity-[76%] mb-4 lg:mb-8 lg:w-full">
                To make your seacation safe and memorable, we have implemented all the essential protocols.
              </p>
              <div className={`grid grid-cols-1 mb-4 relative `}>
                <div className="grid grid-cols-1 relative">
                  <input type='hidden' id="zc_gad" name="zc_gad" value="" />
                  <input
                    className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-10 lg:grid-cols-9 gap-1">
                <div className="lg:col-span-2 col-span-3">
                  <div className={`grid grid-cols-1 `}>
                    <Select
                      menuPortalTarget={document.body}
                      menuPosition={'fixed'}
                      value={{ label: country }}
                      maxMenuHeight={190}
                      options={PhoneCode}
                      onChange={item => setCountry(item.value)}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-7">
                  <div className={`grid grid-cols-1 relative `}>
                    <div className="grid grid-cols-1 relative">
                      <input
                        className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] border-0 bg-gray-400 lg:mb-2`}
                        type="text"
                        placeholder="Phone Number"
                        {...register("phoneNumber", {
                          required: true, minLength: 10,
                          maxLength: 10
                        })}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              {errors && errors.phoneNumber && <p className='text-xs text-brand-primary'>Enter 10 digit mobile number.</p>}
              {/* <button disabled={!isValid} className="font-semibold text-white bg-brand-primary w-full mt-4 lg:w-auto rounded p-3 lg:px-20  disabled:opacity-50 disabled:cursor-not-allowed">
                Submit
              </button> */}
              <Button text='Submit' disabled={!isValid} className='mt-4 lg:w-auto lg:px-20' />
              {submitted && <div className="text-center text-ls text-j-black">
                <div
                  className="flex flex-col justify-between"
                  style={{ maxHeight: "100%" }}
                >
                  <div className="pt-10">We have received your message, We will get back to you shortly.</div>
                </div>
              </div>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
