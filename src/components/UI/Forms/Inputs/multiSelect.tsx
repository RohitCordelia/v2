type Props = {
    className?: string;
    label?: string;
    placeholder?: string;
    options: Array<Option>;
    name?: string;
    id?: string;
    register?: Function;
    validation?: object;
    error?: boolean;
    errorText?: string;
  };
  
  type Option = {
    value: string;
    name: string;
  };
  
  const MultiSelect = ({
    className,
    label,
    placeholder = '',
    options,
    id = '',
    name = '',
    register = () => {},
    validation,
    error = false,
    errorText = 'Please enter the value',
  }: Props) => (
    <div className={`grid grid-cols-1 mb-6 ${className ? className : ''}`}>
      {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
      <select
        id={id}
        name={name}
        className={`rounded-md text-sm py-3.5 px-3 ${
          error ? 'border border-danger' : ''
        }`}
        {...register(name, validation)}
        defaultValue={['']}
        multiple
      >
        <option value='' hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
    </div>
  );
  
  export default MultiSelect;
  