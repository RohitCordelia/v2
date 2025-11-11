type Props = {
    className?: string;
    inputClassName?: string;
    label?: string;
    placeholder?: string;
    name?: string;
    id?: string;
    rows?: number;
    register?: Function;
    error?: boolean;
    errorText?: string;
  };
  
  const TextArea = ({
    className,
    inputClassName='',
    label,
    placeholder = '',
    id='',
    name='',
    rows=4,
    register=()=>{},
    error = false,
    errorText = 'Please enter the value',
  }: Props) => (
    <div className={`grid grid-cols-1 mb-6 ${className ? className : ''}`}>
      {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
      <textarea
        className={`rounded-md text-sm py-3.5 px-3 placeholder:text-xs placeholder:text-gray-100/[0.62] ${inputClassName} ${
          error ? 'border border-danger' : ''
        }`}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        {...register(name)}
      ></textarea>
      {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
    </div>
  );
  
  export default TextArea;
  