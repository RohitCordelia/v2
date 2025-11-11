import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../src/components/UI/ModalCenter';

const ReadMore = ({ text }: any) => {
    const [fullDescription, setFullDescription] = useState(false)
    const [showFullText, setShowFullText] = useState(false);
    const [isOverFourLines, setIsOverFourLines] = useState(false);
    const paragraphRef = useRef(null);

    useEffect(() => {
        if (paragraphRef.current) {
            const lineHeight = parseInt(getComputedStyle(paragraphRef.current).lineHeight);
            const numLines = paragraphRef.current.clientHeight / lineHeight;
            setIsOverFourLines(numLines > 4);
        }
    }, [text]);

    const toggleReadMore = () => {
        setFullDescription(true)
    };

    const DescriptionText = (val) => {
        var ret = val.replace(/\\n|\\u/g, '<br/>');
        var ret = ret.replace(/\\r/g, '');
        return <div className='leading-5 lg:leading-6' dangerouslySetInnerHTML={{ __html: ret }}></div>
    }

    return (
        <div>
            <div
                ref={paragraphRef}
                style={{
                    maxHeight: showFullText || !isOverFourLines ? 'none' : '7.3em',
                    overflow: 'hidden',
                }}
            >
                <div className='lg:text-sm text-xs'>
                    {DescriptionText(text)}
                </div>
            </div>
            {isOverFourLines && (
                <p className='text-xs cursor-pointer text-brand-primary font-semibold mt-1' onClick={toggleReadMore}>
                    {'Read More'}
                </p>
            )}

            <Modal show={fullDescription} align={'center'} className="max-h-[60%] overflow-y-scroll drop-shadow bg-white w-[90%] lg:w-2/4 center bottom-1/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => setFullDescription(false)}>
                <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
                    <h1 className='text-lg font-semibold'>Description</h1>
                    <svg
                        onClick={() => setFullDescription(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-black cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className='px-6 pb-4'>
                    <div className='text-base'>
                        {DescriptionText(text)}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ReadMore;