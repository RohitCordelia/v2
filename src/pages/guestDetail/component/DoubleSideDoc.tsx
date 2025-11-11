import { useRef } from "react";

const DoubleSideDoc = ({
  options,
  docData,
  selectedOption,
  handleFileChangeDoc,
  handleRemove,
  docLoading
}) => {
  //   console.log('roh guestData', selectedOption, docData, options);

  const Front = () => {
    const fileInputFrontRef = useRef<HTMLInputElement>(null);

    const handleFrontFileClick = () => {
        if (fileInputFrontRef.current) {
            fileInputFrontRef.current.click();
        }
    };

    if (
      docData &&
      Object.keys(docData).length > 0 &&
      Object.keys(docData?.front_img || {}).length > 0
    ) {
      return (
        <div className="shadow-allSide rounded-md pb-4 col-span-2">
          <div className="flex justify-between items-center bg-[#fff4f3] px-4 py-3 rounded-t-md">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-col text-sm">
                <p className=" text-lg font-bold">{selectedOption?.name}</p>
                <p className="text-xs text-gray-100 font-semibold">
                  Front View
                </p>
              </div>
            </div>
            <div>
              <button
                className="font-bold text-xs text-brand-primary underline"
                onClick={() => handleRemove('front')}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
            <p className=" text-sm ">Full Name</p>
            <div className=" text-sm cursor-pointer font-bold ">
              {docData?.front_img?.card_name}
            </div>
          </div>
          <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
            <p className=" text-sm ">Gender</p>
            <div className=" text-sm cursor-pointer font-bold ">
              {docData?.front_img?.gender}
            </div>
          </div>
          <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
            <p className=" text-sm ">DOB</p>
            <div className=" text-sm cursor-pointer font-bold ">
              {new Date(docData?.front_img?.dob)
                .toLocaleDateString('en-GB')
                .replaceAll('/', '/')}
            </div>
          </div>
          {docData?.front_img?.citizenship && (
            <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
              <p className=" text-sm ">Citizenship</p>
              <div className=" text-sm cursor-pointer font-bold ">
                {docData?.front_img?.citizenship}
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
            <p className=" text-sm ">{selectedOption?.name}</p>
            <div className=" text-sm cursor-pointer font-bold ">
              {docData?.front_img?.id_number}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          onClick={handleFrontFileClick}
          className={`flex flex-col gap-2 lg:px-[45px] px-4 lg:py-16 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary ${docLoading?.backDoc ? 'opacity-50' : ''} ${
            docData &&
            Object.keys(docData).length > 0 &&
            Object.keys(docData?.back_img || {}).length > 0
              ? 'col-span-2'
              : ''
          }`}
        >
          <img
            className="lg:h-12 h-8"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/front-view-id-image.svg"
            alt="Default Preview"
          />
          <p className="text-xs font-bold">Front View ID</p>
          <label
            htmlFor="file-upload-doc"
            className="border border-brand-primary text-brand-primary items-center rounded-md flex gap-2 py-1 px-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {docLoading?.frontDoc ? 
                <div role="status" className='flex items-center gap-2 text-xs'>
                    <svg aria-hidden="true" className="w-4 h-4 lg:w-5 lg:h-5 animate-spin text-gray-200 dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p>Uploading</p>
                </div> :
                <>
                    <img
                        className="h-5"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg"
                    />{' '}
                    <p className="text-xs">Upload </p>
                </>
            }
          </label>
          <input
            ref={fileInputFrontRef}
            id="file-upload-doc"
            name="file-upload-doc"
            type="file"
            className="sr-only"
            onClick={(e) => e.stopPropagation()}
            onChange={(e: any) => handleFileChangeDoc(e, 'front')}
            accept="image/*"
            disabled={docLoading?.backDoc}
          />
          {/* <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' /> <p className='text-xs' >Scan </p>
            </div> */}
        </div>
      );
    }
  };

  const Back = () => {
    const fileInputBackRef = useRef<HTMLInputElement>(null);

    const handleBackFileClick = () => {
        if (fileInputBackRef.current) {
            fileInputBackRef.current.click();
        }
    };

    if (
      (docData &&
      Object.keys(docData).length > 0 &&
      Object.keys(docData?.back_img || {}).length > 0 &&
      docData?.side === 'back') || docData?.front_img?.address || docData?.front_img?.state || docData?.front_img?.pincode
    ) {
      return (
        <div className="shadow-allSide rounded-md mt-4 pb-4 col-span-2">
          <div className="flex justify-between items-center bg-[#fff4f3] px-4 py-3 rounded-t-md">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-col text-sm">
                <p className=" text-lg font-bold">{selectedOption?.name}</p>
                <p className="text-xs text-gray-100 font-semibold">Back View</p>
              </div>
            </div>
            <div>
              <button
                className="font-bold text-xs text-brand-primary underline"
                onClick={() => (docData?.front_img?.address || docData?.front_img?.state || docData?.front_img?.pincode) ? handleRemove('front') : handleRemove('back')}
              >
                Remove
              </button>
            </div>
          </div>
          {/* {docData?.front_img?.address || docData?.back_img?.address && ( */}
            <div className="flex justify-between px-4 pt-3 rounded-t-md gap-5">
              <p className=" text-sm ">Address</p>
              <div className=" text-sm cursor-pointer font-bold ">
                {docData?.back_img?.address || docData?.front_img?.address}
              </div>
            </div>
          {/* )} */}
          {docData?.back_img?.district && (
            <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
              <p className=" text-sm ">City</p>
              <div className=" text-sm cursor-pointer font-bold ">
                {docData?.back_img?.district || docData?.front_img?.district}
              </div>
            </div>
          )}
          {(docData?.back_img?.state || docData?.front_img?.state) && <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
            <p className=" text-sm ">State</p>
            <div className=" text-sm cursor-pointer font-bold ">
              {docData?.back_img?.state || docData?.front_img?.state}
            </div>
          </div>}
          {(docData?.back_img?.pincode || docData?.front_img?.pincode) && <div className="flex flex-wrap justify-between  items-center px-4 pt-3 rounded-t-md ">
            <p className=" text-sm ">Postal Code</p>
            <div className=" text-sm cursor-pointer font-bold ">
              {docData?.back_img?.pincode || docData?.front_img?.pincode}
            </div>
          </div>}
        </div>
      );
    } else {
      return (
        <div
          onClick={handleBackFileClick}
          className={`flex flex-col gap-2 lg:px-[45px] px-4 lg:py-16 py-12 justify-center items-center rounded-lg border border-dashed border-brand-primary ${docLoading?.frontDoc ? 'opacity-50' : ''} ${
            docData &&
            Object.keys(docData).length > 0 &&
            Object.keys(docData?.front_img || {}).length > 0
              ? 'col-span-2'
              : ''
          }`}
        >
          <img
            className="lg:h-12 h-8"
            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-view-id-image.svg"
          />
          <p className="text-xs font-bold">Back View ID</p>
          <div className="border border-brand-primary text-brand-primary  rounded-md  py-1 px-2">
            <input
              ref={fileInputBackRef}
              id="file-upload-doc2"
              name="file-upload-doc2"
              type="file"
              className="sr-only"
              onChange={(e: any) => handleFileChangeDoc(e, 'back')}
              accept="image/*"
              disabled={docLoading?.frontDoc}
            />
            <label
              htmlFor="file-upload-doc2"
              className="flex flex-wrap gap-2 items-center cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
            {docLoading?.backDoc ? 
                <div role="status" className='flex items-center gap-2 text-xs'>
                    <svg aria-hidden="true" className="w-4 h-4 lg:w-5 lg:h-5 animate-spin text-gray-200 dark:text-gray-200 fill-brand-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p>Uploading</p>
                </div> :  
                <>
                    <img
                        className="h-5"
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/upload-id-icon.svg"
                    />{' '}
                    <p className="text-xs">Upload </p>
                </>
            }
            </label>
          </div>
          {/* <div className="lg:hidden border bg-brand-primary text-white items-center rounded-md flex flex-wrap gap-2 w-[85px] py-[6px] px-2" >
                <img className='h-4' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/scan-id-icon.svg' />  <p className='text-xs' >Scan </p>
            </div> */}
        </div>
      );
    }
  };

  // if (guestData?.doc_number_verification_pending) {
  //     if (guestData?.web_checkin_doc_url != '#') {
  //         return (
  //             <img src={guestData?.web_checkin_doc_url} alt="" />
  //         )
  //     }
  //     if (guestData?.web_checkin_doc_2_url != '#') {
  //         return (
  //             <img src={guestData?.web_checkin_doc_2_url} alt="" />
  //         )
  //     }
  // } else {

  return (
    <div className="grid grid-cols-2 mt-3 gap-3">
      <Front />
      <Back />
    </div>
  );
  // }
};

export default DoubleSideDoc;
