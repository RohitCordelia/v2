import { ReactNode, MouseEventHandler, useRef, useEffect } from 'react';
type ModalProps = {
  show: Boolean;
  children?: ReactNode;
  align: 'center' | 'right',
  mainClassName?: string;
  className?: string;
  closeBtn?: boolean;
  onClose?: MouseEventHandler;
}
const Modal = ({ show = false, children, align, mainClassName='', className = '', closeBtn = false, onClose = () => { } }: ModalProps) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose(event);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "unset";
  }, [show])

  if (show) {
    document.body.style.overflow = 'hidden';
    return (
      <div className={`${mainClassName} fixed flex justify-center items-center px-3 lg:px-0 h-full w-screen left-0 bottom-0 bg-black-100/50 z-[9999] bg-black/80 modal-opens`}>
        {closeBtn && <div className='absolute top-8 right-8'>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={onClose} className="w-6 h-6 cursor-pointer text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
            </path>
          </svg>
        </div>}
        <div
          ref={ref}
          className={`z-30 ${align === "right" ? "right-0" : ""
            } ${className}`}
        >
          {children}
        </div>
      </div>
    );
  }
  else { document.body.style.overflow = 'auto'; return <div /> };
};

export default Modal;