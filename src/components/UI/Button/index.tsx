import React from 'react';

type Props = {
  text: string;
  type?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'base' | 'medium' | 'lg' | 'xl';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  btnStyle?: {};
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  handleClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

const sizeClasses: Record<Props['size'], string> = {
  xs: 'text-xs py-1 px-2',
  sm: 'text-sm py-2.5 px-4',
  base: 'text-base py-3 px-6',
  medium: 'text-md py-3.5 px-8',
  lg: 'text-lg py-4 px-10',
  xl: 'text-xl py-5 px-12'
};

const Button = ({
  text,
  type = 'primary',
  size = 'base',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  btnStyle = {},
  leftIcon,
  rightIcon,
  handleClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const baseStyle =
    'font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-all duration-200';
  const typeStyle =
    type === 'primary'
      ? 'bg-gradient-to-r from-[#92278F] via-[#D1527D] to-[#EA725B] text-white '
      : 'text-brand-primary';
  const disabledStyle = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        baseStyle,
        typeStyle,
        sizeClasses[size],
        disabledStyle,
        widthStyle,
        className
      )}
      style={{
        border: 'double 2px transparent',
        backgroundImage:
          type === 'primary'
            ? 'linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)'
            : 'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
        backgroundOrigin: 'border-box',
        ...(type !== 'primary' && {
          backgroundClip: 'padding-box, border-box',
        }),
        ...btnStyle
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isLoading ? (
        <>
          <span>Loading </span>
          <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/load-more-icon-white.svg" className='animate-spin h-4' alt="" />
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-1">{leftIcon}</span>}
          {text}
          {rightIcon && <span className="ml-1">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
