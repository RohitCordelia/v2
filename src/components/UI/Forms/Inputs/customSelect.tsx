import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  dropdownClassName?: string;
  label?: string;
  placeholder?: string;
  options: Array<Option>;
  name?: string;
  id?: string;
  register?: Function;
  onChange?: Function;
  setValue?: Function;
  validation?: object;
  error?: boolean;
  errorText?: string;
  defaultValue?: string;
  iconUrl?: string;
  iconClassname?: string;
};

type Option = {
  code: string;
  name: string;
};

const CustomSelect = ({
  className,
  selectClassName = "",
  labelClassName = "",
  dropdownClassName = "",
  label,
  placeholder = "",
  options,
  id = "",
  name = "",
  register = () => {},
  onChange = () => {},
  setValue = () => {},
  validation,
  error = false,
  errorText = "Please enter the value",
  defaultValue = "",
  iconUrl = "",
  iconClassname = "",
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [value, setOptionValue] = useState(defaultValue);
  const [otpionName, setOptionName] = useState<any>(
    options.find((option) => option.code === defaultValue)?.name
  );
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
    <div className={`grid grid-cols-1 mb-6 ${className ? className : ""}`}>
      {label && (
        <label className={`text-sm text-gray-600 mb-1 ${labelClassName}`}>
          {label}
        </label>
      )}
      {iconUrl && (
        <img
          src={iconUrl}
          alt="start"
          className={`absolute ${iconClassname}`}
        />
      )}
      <select
        id={id}
        name={name}
        //   className={`rounded-md text-sm py-3.5 px-3 ${selectClassName} ${
        //     error ? "border border-danger" : ""
        //   }`}
        className="hidden capitalize"
        {...register(name, validation)}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="relative">
        <div
          className={`rounded-md text-sm py-3.5 px-3 cursor-pointer ${selectClassName} ${
            error ? "border border-danger" : ""
          }`}
          onClick={() => setShowDropdown(true)}
        >
          {otpionName ? otpionName : placeholder}

          <span className="float-right mt-1.5">
            <img
              src="/assets/icons/footer/chevon-down1.svg"
              alt="arrow"
              className={!showDropdown ? "w-3" : "rotate-180 w-3"}
            />
          </span>
        </div>
        {showDropdown && (
          <div
            className={`rounded-lg p-3 absolute text-white z-10 w-full mt-2 max-h-32 overflow-scroll ${
              dropdownClassName ? dropdownClassName : "bg-dropdownBG"
            }`}
            ref={ref}
          >
            {options.map((option) => (
              <div
                key={option.code}
                className="rounded-md px-2 py-2 hover:bg-white/[0.3] cursor-pointer flex items-center"
                onClick={() => {
                  setValue(name, option.code);
                  setOptionValue(option.code);
                  onChange(option.code);
                  setOptionName(option.name);
                  setShowDropdown(false);
                }}
              >
                {/* <span className="inline-block pr-2">
                  <img
                    src={
                      option.code === value
                        ? "/assets/icons/checkbox-seleted.svg"
                        : "/assets/icons/checkbox.svg"
                    }
                  />
                </span> */}
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
    </div>
  );
};

export default CustomSelect;
