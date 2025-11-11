type Props = {
  className?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  id: string;
  labelClassName: string;
};

const Checkbox = ({
  className,
  label,
  error = false,
  errorText = 'Please enter the value',
  id = '',
  labelClassName = 'text-white text-sm',
}: Props) => (
  <div className={`flex mb-6 items-center ${className ? className : ''}`}>
    <input className="mr-2 rounded" type="checkbox" id={id}></input>
    {label && (
      <label htmlFor={id} className={`cursor-pointer ${labelClassName ? labelClassName : ''}`}>
        {label}
      </label>
    )}
  </div>
);

export default Checkbox;
