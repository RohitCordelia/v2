import { isDisabled } from "@testing-library/user-event/dist/utils";
import { FieldError } from "react-hook-form";

type Props = {
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  options: Array<Option>;
  name?: string;
  id?: string;
  register?: Function;
  onChange?:Function
  validation?: object;
  error?: any;
  errorText?: string;
  defaultValue?: string;
  value?: string;
  iconUrl?:string;
  isDisabled?: boolean;
};

export type Option = {
  code: string;
  name: string;
};

const Select = ({
  className,
  selectClassName = "",
  labelClassName= "",
  label,
  placeholder = "",
  options,
  id = "",
  name = "",
  register = () => {},
  onChange = () => {},
  validation,
  error = false,
  errorText = "Please enter the value",
  defaultValue = "",
  value,
  isDisabled,
  iconUrl = "",
}: Props) => {
  const isDocumentField = name?.includes("_document");

  return (
  <div className={`grid grid-cols-1 mb-6 ${className ? className : ""}`}>
    {label && <label className={`text-sm text-gray-600 mb-1 ${labelClassName}`}>{label}</label>}
    {iconUrl && (
      <img src={iconUrl} alt="start" className="absolute" />
    )}
    <select
      id={id}
      name={name}
      className={`rounded-md text-sm py-3.5 px-3 ${selectClassName} ${
        error ? "border border-danger" : ""
      }`}
      {...register(name, validation)}
      {...(isDocumentField
        ? { value: value || "" }
        : { defaultValue })}
      onChange={(e)=>onChange(e.target.value)}
      disabled={isDisabled}
    >
      {placeholder && (
        <option value="" hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.code} value={option.code} className="text-sm text-black">
          {option.name}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
  </div>
)};

export default Select;
