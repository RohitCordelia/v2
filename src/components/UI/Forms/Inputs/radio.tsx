import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  value?:string
  defaultValue?: string;
  register?: Function;
  validation?: object;
  error?: FieldError;
  errorText?: string;
  onChange?: Function;
  options: Array<Option>;
};

type Option = {
  code: string;
  name: string;
};

const Radio = ({
  className = "",
  inputClassName = "",
  labelClassName = "",
  label = "",
  placeholder = "",
  id = "",
  name = "",
  defaultValue = "",
  value="",
  register = () => {},
  onChange = () => {},
  validation,
  error,
  errorText = "Please enter a value",
  options,
}: Props) => {
  const [selected, setSelected] = useState<string>(defaultValue);
  useEffect(()=>{
    if(defaultValue){
      onChange(defaultValue)
    }
  },[defaultValue, onChange])
  return (
    <div
      className={`grid grid-cols-1 mb-4 relative ${className ? className : ""}`}
    >
      {label && (
        <label className={`text-xs text-white/[0.8] mb-1 ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          return (
            <label
              htmlFor={option.code}
              onClick={() => {
                setSelected(option.code);
                onChange(option.code);
              }}
              className="cursor-pointer"
              key={option.code}
            >
              <input
                {...register(name, validation)}
                type="radio"
                name={name}
                value={option.code}
                id={option.code}
                className="hidden"
                defaultValue={defaultValue}
              />
              <span
                className={`block border ${
                  selected === option.code || value === option.code
                    ? "border-danger text-white"
                    : "border-white/[0.16] text-white/[0.5]"
                } rounded-lg p-3 text-sm`}
              >
                <span>
                  <img
                    src={`/assets/icons/radio${
                      selected === option.code || value === option.code
                        ? "_active"
                        : ""
                    }.svg`}
                    alt="radio"
                    className="inline mr-3"
                  />
                </span>
                {option.name}
              </span>
            </label>
          );
        })}
      </div>
      {/* <input
      className={`rounded-md text-sm py-3.5 px-3 ${inputClassName} ${
        iconUrl ? "pl-10" : ""
      } ${error ? "border border-danger" : ""}`}
      type="radio"
      id={id}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name, validation)}
      onChange={onChange}
    ></input> */}
      {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
    </div>
  );
};

export default Radio;
