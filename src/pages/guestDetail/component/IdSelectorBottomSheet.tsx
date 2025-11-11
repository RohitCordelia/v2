import React, { useEffect, useState } from 'react';

const IdSelectorBottomSheet = ({
  options,
  isOpen,
  setIsOpen,
  selectedDoc,
  setSelectedDoc,
}) => {
  // const [selectedOption, setSelectedOption] = useState<any>();

  // useEffect(() => {
  //   const result = options.find(option => option.value === guestData?.web_checkin_doc_type);
  //   setSelectedOption(result)
  // }, []);
  // console.log(selectedDoc, 'selectedDoc')

  const handleDocClick = (option: any) => {
    setSelectedDoc(option);
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 z-30 ${
              isOpen ? '!bg-opacity-70 visible' : 'bg-opacity-0 invisible'
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <div>
            <div
              className={`fixed left-0 w-full -bottom-[45%] bg-white p-4 rounded-t-2xl shadow-lg transition-all duration-300 ease-in z-[10000] `}
              style={{
                bottom: isOpen ? '0' : ''
              }}
            >
              <div
                className="flex justify-end"
                onClick={() => setIsOpen(false)}
              >
                <button className="float-right text-gray-500 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <div className="pb-2 font-bold text-lg border-b border-gray-300">Select Document</div>
                {/* Sheet Content */}
                <div className="max-h-96 overflow-y-auto">
                  {options.map((option, idx) => <div key={idx} className='font-medium py-3' onClick={() => handleDocClick(option)}>
                    {option.name}
                  </div>)}
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-3 border-t border-gray-300">
                  <button
                    onClick={() => {
                      handleClearOfferFilter();
                      setIsOpenFilter(false);
                    }}
                    className="mt-4 w-full py-2 rounded-md uppercase text-sm font-bold border border-brand-primary text-brand-primary"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => {
                      // handleFilterItinerary('click');
                      setIsOpenFilter(false);
                    }}
                    className="mt-4 w-full py-2 bg-brand-primary text-white rounded-md uppercase text-sm font-bold"
                  >
                    Apply
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IdSelectorBottomSheet;
