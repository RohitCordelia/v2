// import { ports } from 'joi';
import { ReactNode, MouseEventHandler, useRef, useState, useEffect } from 'react';
type Props = {
    ports: any,
    callback: any
}

const ShoreExcursionHeader = ({ ports, callback }: Props) => {
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [nextActive, setNextActive] = useState(false);
    const [activePortIndex, setActivePortIndex] = useState(1);
    const [animateLeft, setAnimateLeft] = useState(false);
    const [animateRight, setAnimateRight] = useState(false);

    useEffect(() => {
        if (ports) {
            callback(activePortIndex - 1)
        }
    }, [activePortIndex])

    const handleIncrement = () => {
        setAnimateLeft(true);
        setTimeout(() => {
            setAnimateLeft(false);
        }, 1000);

        if (startIndex < ports.length - 2) {
            setStartIndex(startIndex + 1)
        } else {
            setNextActive(true)
            setActiveIndex(1)
        }
        setActivePortIndex(activePortIndex + 1)
    };
    const handleDecrement = () => {
        setAnimateRight(true);
        setTimeout(() => {
            setAnimateRight(false);
        }, 1000);
        if (startIndex == 0) {
            setActiveIndex(0)
            setNextActive(false)
        } else {
            setStartIndex(startIndex - 1)
        }
        setActivePortIndex(activePortIndex - 1)
    };

    const PortPairs = () => {
        return (
            <div className='relative'>
                {/* {(ports.length-2) == startIndex && nextActive == true ? 'pppppp': 'llllll'} */}
                {startIndex != 0 || (nextActive) ?
                    <button
                        className={`absolute left-0 top-1/2 rounded-t-md bg-white h-full px-1.5 lg:px-3 ${activeIndex == 1 ? 'top-shadow2' : null}`}
                        onClick={() => handleDecrement()}
                        // disabled={pairIndex === 0}
                        style={{
                            transform: 'translate(0, -50%)'
                        }}
                    >
                        <img src="assets/icons/footer/chevon-down-black.svg" className='rotate-90 h-2 lg:h-3' alt="" />
                    </button>
                    : null
                }
                <div className='flex justify-between w-full'>
                    <div className={`w-full ${(startIndex != 0 || nextActive) && activeIndex == 1 ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => {
                        (startIndex != 0 || nextActive) && activeIndex == 1 ?
                            handleDecrement()
                            : null
                    }}>
                        <div className={`w-full ${activeIndex == 0 ? 'text-brand-primary bg-white rounded-t-md top-shadow' : 'text-gray-100'} lg:text-xl text-sm font-bold flex justify-center py-3 lg:py-4`}>
                            <span className={`ml-2 ${animateLeft ? 'animated-left' : ''} ${animateRight ? 'animated-right' : ''}`}>
                                {ports[startIndex]?.port_name}
                            </span>
                        </div>
                    </div>
                    <div className={`w-full ${ports.length != activePortIndex && activeIndex == 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => {
                        ports.length != activePortIndex && activeIndex == 0 ?
                            handleIncrement()
                            : null
                    }}>
                        <div className={`w-full ${activeIndex == 1 ? 'text-brand-primary bg-white rounded-t-md top-shadow' : 'text-gray-100'} lg:text-xl text-sm font-bold flex justify-center py-3 lg:py-4`}>
                            <span className={`mr-2 ${animateLeft ? 'animated-left' : ''} ${animateRight ? 'animated-right' : ''}`}>
                                {ports[startIndex + 1]?.port_name}
                            </span>
                        </div>
                    </div>
                </div>
                {/* {!nextActive ?  */}
                {ports.length != activePortIndex ?
                    <button
                        className={`absolute right-0 top-1/2 rounded-t-md bg-white px-1.5 lg:px-3 h-full ${activeIndex == 0 ? 'top-shadow2' : null}`}
                        style={{
                            transform: 'translate(0, -50%)'
                        }}
                        onClick={() => handleIncrement()}
                    // disabled={pairIndex === ports.length - 1}
                    >
                        <img src="assets/icons/footer/chevon-down-black.svg" className='-rotate-90 h-2 lg:h-3' alt="" />
                    </button>
                    : null
                }
            </div>
        );
    };

    return (
        <div>
            <PortPairs />
        </div>
    );
}

// if((ports.length-2) == startIndex && nextActive == true ){

// }
export default ShoreExcursionHeader;