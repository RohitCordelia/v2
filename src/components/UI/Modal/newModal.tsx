import { ReactNode, MouseEventHandler, useRef, useEffect } from 'react';

type ModalProps = {
    show: Boolean;
    children?: ReactNode;
    align: 'center' | 'right',
    className?: string;
    onClose?: MouseEventHandler;
    maxHeight: string
}

const Modal = ({ show = false, children, align, className = '', onClose = () => { }, maxHeight='80vh' }: ModalProps) => {
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
        if (show) {
            document.body.classList.add('!overflow-hidden');
        } else {
            document.body.classList.remove('!overflow-hidden');
        }
        return () => {
            document.body.classList.remove('!overflow-hidden'); // Clean up on unmount
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div
                ref={ref}
                className={`relative mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
            >
                <div className="p-6 overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 6rem)` }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;