import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  className?: string;
  inputClassName?: string;
  labelClassName?:string;
  label?: string;
  placeholder?: string;
  type: string;
  name?: string;
  id?: string;
  defaultValue?: string;
  register?: Function;
  validation?: object;
  error?: any;
  errorText?: string;
  onChange?: Function;
  iconUrl?: string;
  iconUrlRight?: string;
  disabled?: boolean;
  maxLength?: string;
  inputMode?: string;
  autoComplete?: string;
  onClickRightIcon?: any;
  max?: any;
  minLength?: any;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  className = "",
  inputClassName = "",
  labelClassName="",
  label = "",
  placeholder = "",
  type,
  id = "",
  name = "",
  defaultValue = "",
  register = () => {},
  onChange = () => {},
  onClickRightIcon = () => {},
  validation,
  error,
  errorText = "Please enter a value",
  iconUrl = "",
  iconUrlRight = "",
  disabled = false,
  maxLength = "",
  inputMode = "",
  autoComplete= "",
  max= "",
  minLength= "",
}: Props) => (
  <div
    className={`grid grid-cols-1 mb-4 relative ${className ? className : ""}`}
  >
    {label && <label className={`text-xs text-white/[0.8] mb-1 ${labelClassName}`}>{label}</label>}
    <div className="grid grid-cols-1 relative">
    {iconUrl && (
      <img
        src={iconUrl}
        alt="start"
        className={`absolute top-3 left-3`}
      />
    )}
    {disabled && iconUrlRight && (
      <img
        onClick={onClickRightIcon}
        src={iconUrlRight}
        alt="start"
        className={`absolute top-4 right-3 cursor-pointer`}
      />
    )}
    <input
      className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] ${inputClassName} ${
        iconUrl ? "pl-10" : ""
      } ${error ? "border border-danger" : ""}`}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name, validation)}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
      inputMode={inputMode}
      autoComplete={autoComplete}
      max={max}
      minLength={minLength}
    ></input>
    </div>
    {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
  </div>
);

export default Input;
