import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function SecondaryButton({ children, className="" }: Props) {
  return (
    <button className={`text-xs lg:text-base font-bold p-2 px-4 lg:px-6 border border-brand-secondary text-brand-secondary mb-8 ${className}`}>
      {children}
    </button>
  );
}
