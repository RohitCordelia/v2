import { useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import PhoneCode from "./phoneCodesWithFlag.json";
type Props = {
  className?: string;
  inputClassName?: string;
  prefixClassName?: string;
  label?: string;
  placeholder?: string;
  type: string;
  name?: string;
  id?: string;
  defaultValue?: string;
  register?: Function;
  validation?: object;
  error?: FieldError;
  errorText?: string;
  onChange?: Function;
  iconUrl?: string;
};

const PhoneInput = ({
  className = "",
  inputClassName = "",
  prefixClassName = "",
  label = "",
  placeholder = "",
  type,
  id = "",
  name = "",
  defaultValue = "",
  register = () => {},
  onChange = () => {},
  validation,
  error,
  errorText = "Please enter a value",
  iconUrl = "",
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [value, setOptionValue] = useState(defaultValue);
  const [otpionName, setOptionName] = useState<any>();
  // options.find((option) => option.code === defaultValue)?.name
  const [optionFlag, setOptionFlag] = useState<any>();
  const ref = useRef<HTMLInputElement>(null);

  const onClose = (event: any) => {
    setShowDropdown(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose(event);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div
      className={`grid grid-cols-1 mb-4 relative ${className ? className : ""}`}
    >
      {label && (
        <label className="text-xs text-white/[0.8] mb-1">{label}</label>
      )}
      {iconUrl && (
        <img src={iconUrl} alt="start" className="absolute top-3 left-3" />
      )}
      <div className="grid grid-cols-8 gap-4">
        <div className={`relative col-span-3 ${showDropdown && "h-[150px]"}`}>
          <div
            className={`rounded-md text-sm py-3 pb-1.5 px-3 cursor-pointer ${prefixClassName} ${
              error ? "border border-danger" : ""
            }`}
            onClick={() => setShowDropdown(true)}
          >
            {otpionName ? (
              <span className="inline-flex pl-2">
                <span className="rounded-full w-8 w-8">
                  {/* <img src={optionFlag} className="pr-2" /> */}
                  <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${value}.svg`} className="pr-2" />
                </span>{" "}
                {otpionName}
              </span>
            ) : (
              <span className="inline-flex pl-2">
                <span className="rounded-full w-8 w-8">
                  {/* <img src={PhoneCode[0].flag} className="pr-2" /> */}
                  <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${PhoneCode[0].code}.svg`} className="pr-2" />
                </span>{" "}
                {PhoneCode[0].dial_code}
              </span>
            )}

            <span className="float-right mt-2">
              <img
                src="/assets/icons/dropdown_arrow.svg"
                alt="arrow"
                className={!showDropdown ? "rotate-180" : ""}
              />
            </span>
          </div>
          {showDropdown && (
            <div
              className="rounded-lg p-3 absolute bg-dropdownBG text-white z-20 w-full mt-2 h-28 overflow-y-scroll"
              ref={ref}
            >
              {PhoneCode.map((country) => {
                var img = new Image();
                img.src = country.flag;
                return (
                  <div
                    key={country.code}
                    className="rounded-md px-2 py-2 hover:bg-danger cursor-pointer"
                    onClick={() => {
                      // setValue(name, option.code);
                      setOptionValue(country.code);
                      // onChange(country.dial_code);
                      setOptionName(country.dial_code);
                      setOptionFlag(country.flag);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="flex">
                      <span className="rounded-full w-8 w-8">
                        {" "}
                        {/* <img src={country.flag} className="pr-2" /> */}
                        <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${country.code}.svg`} className="pr-2" />
                      </span>{" "}
                      {country.dial_code}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <input
          className={`rounded-md text-sm py-3.5 px-3 col-span-5 ${inputClassName} ${
            iconUrl ? "pl-10" : ""
          } ${error ? "border border-danger" : ""} ${showDropdown && "h-[50px]"}`}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name, validation)}
          onChange={onChange}
        ></input>
      </div>
      {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
    </div>
  );
};

export default PhoneInput;
