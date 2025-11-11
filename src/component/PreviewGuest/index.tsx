import React, { useEffect, useState } from 'react';
import Button from '../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setGuestIndex } from '../../services/upcomingCruise/upcomingCruiseSlice';

type Props = {
    RoomsInput: any;
    handleSubmit?: any;
    update?: any;
    initialReviewedState?: any;
    guestIndex?: any;
    roomIndex?: any;
    type?: any;
};

const PreviewGuest = ({ RoomsInput, handleSubmit, update, initialReviewedState, type }: Props) => {
    const { roomIndex, guestIndex } = useSelector((state: any) => state.UpcomingCruise);

    const [activeGuestIndex, setActiveGuestIndex] = useState(0);
    const [activeRoomIndex, setActiveRoomIndex] = useState(0);

    useEffect(() => {
        if (type == 'update') {
            setActiveRoomIndex(0);
            setActiveGuestIndex(0);
        }
        else if (roomIndex !== null && guestIndex !== null) {
            setActiveRoomIndex(roomIndex);
            setActiveGuestIndex(guestIndex);
        }
    }, [roomIndex, guestIndex]);

    const [reviewedGuests, setReviewedGuests] = useState<boolean[][]>(() => {
        if (initialReviewedState) {
            return initialReviewedState;
        }
        return RoomsInput.map((room: any) => room.guests.map(() => false));
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (initialReviewedState) {
            setReviewedGuests(prev => {
                const updated = initialReviewedState.map(row => [...row]); // deep clone
                if (
                    updated[roomIndex] &&
                    updated[roomIndex][guestIndex] !== undefined
                ) {
                    updated[roomIndex][guestIndex] = false;
                }
                return updated;
            });
        }
    }, [initialReviewedState, roomIndex, guestIndex]);

    const RoomTab = () => {
        return (
            <div className='flex gap-4'>
                {RoomsInput?.map((room: any, i: any) => {
                    return (
                        <Button
                            text={`Room ${i + 1}`}
                            size="sm"
                            className={`
                                text-xs py-1.5 !rounded-md
                                ${reviewedGuests[i].every((g) => g) ? 'bg-green-600 text-white' : ''}
                            `}
                            rightIcon={
                                reviewedGuests[i].every((g) => g) && activeRoomIndex === i ?
                                    <img className='h-3' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-preview-done-select-icon.svg' alt='' /> :
                                    reviewedGuests[i].every((g) => g) ?
                                        <img className='h-3' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/cabin-preview-done-unselect-icon.svg' alt='' />
                                        : null
                            }
                            handleClick={() => {
                                setActiveRoomIndex(i);
                                setActiveGuestIndex(0);
                            }}
                            type={activeRoomIndex === i ? "primary" : "secondary"}
                        />
                    )
                })}
            </div>
        )
    }

    const GuestTab = () => {
        return (
            <div className='flex gap-4 border-b border-gray-300 mt-2'>
                {RoomsInput[activeRoomIndex]?.guests?.map((guest: any, ind: any) => {
                    return (
                        <div
                            className={`
                                ${activeGuestIndex == ind ? 'border-b border-brand-primary text-brand-primary' : ''} 
                                text-xs font-semibold py-2 cursor-pointer `
                            }
                            onClick={() => setActiveGuestIndex(ind)}
                        >
                            <div className='flex gap-2 items-center'>
                                <p className='font-bold'>{`Guest ${ind + 1}`}</p>
                                {
                                    reviewedGuests[activeRoomIndex][ind] ?
                                        <img className='h-3' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-preview-done-icon.svg" alt="" />
                                        : ''
                                }

                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }

    const guestData = RoomsInput[activeRoomIndex]?.guests[activeGuestIndex]

    const handleNextGuest = () => {
        const lastRoomIndex = RoomsInput.length - 1;
        const lastGuestIndex = RoomsInput[lastRoomIndex]?.guests.length - 1;

        setReviewedGuests((prev) => {
            const updated = prev.map((room) => [...room]);
            updated[type === 'update' ? 0 : activeRoomIndex][type === 'update' ? 0 : activeGuestIndex] = true;
            return updated;
        });

        const allReviewed = reviewedGuests.every((room) => room.every((g) => g));

        if (allReviewed) {
            handleSubmit(RoomsInput);
            return;
        }

        const currentRoomGuests = RoomsInput[activeRoomIndex]?.guests?.length || 0;

        if (activeGuestIndex + 1 < currentRoomGuests) {
            setActiveGuestIndex(activeGuestIndex + 1);
        } else if (activeRoomIndex + 1 < RoomsInput.length) {
            setActiveRoomIndex(activeRoomIndex + 1);
            setActiveGuestIndex(0);
        }
    };

    const getDocTypeName = (docType: string) => {
        const docTypeMap: any = {
            'aadhar_card': 'Aadhar Card',
            'pan_card': 'Pan Card',
            'passport': 'Passport',
            'driving_license': 'Driving License'
        };
        return docTypeMap[docType] || '';
    };

    const handleUpdateButtonClick = () => {
        if (type != 'update') {
            dispatch(setGuestIndex({
                roomIndex: activeRoomIndex,
                guestIndex: activeGuestIndex,
            }));
        }
        update({
            roomIndex: type == 'update' ? roomIndex : activeRoomIndex,
            guestIndex: type == 'update' ? guestIndex : activeGuestIndex,
            reviewedState: reviewedGuests
        });
    };

    return (
        <div className="">
            <div className="bg-[#fff6f6] rounded-t-xl lg:rounded-md flex gap-2 p-4 lg:p-4">
                <div className="lg:w-4 lg:h-4">
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info_red_home.svg"
                        alt=""
                    />
                </div>
                <p className="italic text-xs text-[#ff1414]">
                    <span className="font-bold text-black">Important Note: </span>
                    *If any populated information is incorrect, kindly correct it
                    manually*
                </p>
            </div>
            <div className='p-4'>
                <div className="">
                    <RoomTab />
                    <GuestTab />
                </div>
                <div className="pb-5 lg:pb-3 pt-2 border-b border-gray-300">
                    <p className="text-brand-primary font-bold mb-1 lg:text-xl">
                        {guestData?.first_name} {guestData?.last_name}
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-xs lg:text-base font-semibold">
                            <span className="">Date of Birth: </span>
                            {moment(guestData?.date_of_birth).format("DD MMM, YYYY")}
                        </p>
                    </div>
                </div>
                <div className="lg:overflow-y-auto lg:max-h-[395px]">
                    <div className="border-b border-gray-300 py-1 lg:py-3 grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-3">
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                ID Proof
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {getDocTypeName(guestData?.doc_type)}
                                {/* {guestData?.doc_type == 'aadhar_card' ? 'Aadhar Card' : guestData?.doc_type == 'pan_card' ? 'Pan Card' : guestData?.doc_type == 'passport' ? 'Passport' : guestData?.doc_type == 'driving_license' ? 'Driving License' : ''} */}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Gender
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.gender.charAt(0).toUpperCase() + guestData?.gender.slice(1).toLowerCase()}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Guest Type
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.type.charAt(0).toUpperCase() + guestData?.type.slice(1).toLowerCase()}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Mobile Number
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.phone}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Email
                            </span>
                            <p className="text-sm lg:text-base font-medium break-words whitespace-normal">
                                {guestData?.email}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Meal Type
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.meal}
                            </p>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 py-1 lg:py-3 grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-3">
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Citizenship
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.citizenship}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                State
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.state}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                City
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.city}
                            </p>
                        </div>
                        <div className="">
                            <span className="text-gray-100 text-xs lg:text-sm font-medium">
                                Country
                            </span>
                            <p className="text-sm lg:text-base font-medium">
                                {guestData?.country}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 justify-center">
                    <Button
                        text="Update Details"
                        size="sm"
                        type="secondary"
                        handleClick={() => handleUpdateButtonClick()}
                        className="basis-1/2"
                    />

                    <Button
                        text={
                            reviewedGuests.every((room) => room.every((g) => g))
                                ? "Save Guest Details"
                                : "Review & Continue"
                        }
                        size="sm"
                        handleClick={() => handleNextGuest()}
                        className="basis-1/2"
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewGuest;