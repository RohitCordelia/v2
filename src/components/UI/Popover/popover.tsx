import { Children, ReactNode, useEffect, useRef, useState } from "react";

export interface IPopOverProps {
  show: Boolean;
  onClose: Function;
  children?:ReactNode
  className?: string;
  position?:{
    top?:number;
    right?:number;
    bottom?:number;
    left?:number
  }
}

export default function PopOver({
  show = false,
  onClose = () => {},
  className = "",
  position ={
    top:0,
    right:0,
    bottom:0,
    left:0
  },
  children
}: IPopOverProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  if (show)
    return (
      <div className={`absolute ${className}`} ref={ref}>
        {children}
      </div>
    );
  else return <></>;
}