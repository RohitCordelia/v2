import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: ()=>void;
};

export default function PrimaryButton({ children, className="", onClick=()=>{} }: Props) {
  return (
    <button
      className={`text-xs lg:text-base font-bold p-2 px-4 lg:px-6 border border-brand-primary text-brand-primary mb-8 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
