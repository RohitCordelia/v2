import React, { useState } from 'react';
import moment from 'moment';
import { FormatAmount, FormatToString } from '../../../../src/utils/formatter/formatter';
// function BookingInfo({ store, getStore, portName, tcs, currentPayble, reserveBooking, quotation, payment_for, upgradeCabin_data, extraGuests_data, upgradeShore_data, guestRecord }: any) {
//     const [hideBreakup, setHideBreakup] = useState(true);
//     const [hideCabin, setHideCabin] = useState(true);
//     const uniqueCodes = [...new Set(guestRecord.map(item => item.GADataShore.code))];
function BookingInfo({ store, getStore, portName, tcs, currentPayble, reserveBooking, quotation, payment_for, upgradeCabin_data, extraGuests_data, reschedulePricingData, upgradeShore_data, guestRecord, shore_excursions, selectedCabinName }: any) {
    const [hideBreakup, setHideBreakup] = useState(true);
    const [hideCabin, setHideCabin] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const uniqueCodes = guestRecord === undefined ? [...new Set(upgradeShore_data?.guestRecord?.map(item => item.GADataShore.code))] : [...new Set(guestRecord?.map(item => item.GADataShore.code))];

    if (upgradeCabin_data && typeof upgradeCabin_data === 'object') {
        localStorage.setItem('newUpgradeCabin', JSON.stringify(upgradeCabin_data));
    } else {
        console.warn("Invalid upgradeCabin_data, storing as an empty object.");
        localStorage.setItem('newUpgradeCabin', JSON.stringify({}));
    }

    const portList = store?.itinerary?.ports
    .filter((val: any) => val.name !== 'At Sea')
    .map((val: any) => val.name)
    .join(' | ');

  const isLong = portList?.length > 150;

    return (
        <>
            <div className='border border-[#185DA0]/20 rounded-lg shadow-sm bg-[#F4F8FF]'>
                <div className='px-4 py-4 lg:py-6 '>
                    {/* <div className='flex justify-between items-center'>
                        <p className='text-base lg:text-lg  font-bold'>{portName}</p>
                    </div> */}
                    <div>
                        <div className='flex items-start justify-between py-1'>
                            <div className=''>
                                <p className='text-xxs lg:sm text-brand-primary font-bold'>
                                    Departure
                                </p>
                            </div>
                            <div className='w-[50%] text-center relative -mt-[0px] lg:-mt-[0px]'>
                                <p className='text-gray-200 whitespace-nowrap overflow-hidden text-xxs'>--------------------------------------------------------------</p>
                                <img className='absolute h-7'
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/cruise-icon.svg" alt=""
                                />
                            </div>
                            <div className='text-right'>
                                <p className='text-xxs lg:sm text-brand-primary font-bold'>
                                    Arrival
                                </p>
                            </div>
                        </div>
                        <div className='flex items-start justify-between pb-1.5'>
                            <div className=''>
                                <p className='text-base lg:text-xl font-bold'>
                                    {store?.itinerary?.ports[0]?.name}
                                </p>
                                <p className='text-xs lg:text-sm  font-semibold'>{moment(store?.itinerary?.start_date, 'DD/MM/YYYY').format('MMM Do, YYYY')}</p>
                                <p className='text-xxs text-gray-100 font-semibold'>
                                    {store?.itinerary?.ports[0].departure.split(" ").slice(-2).join(" ")}
                                </p>
                            </div>
                            <div className='text-right'>
                                <p className='text-base lg:text-xl font-bold'>
                                    {store?.itinerary?.ports[store?.itinerary?.ports.length - 1]?.name}
                                </p>
                                <p className='text-xs lg:text-sm  font-semibold'>{moment(store?.itinerary?.end_date, 'DD/MM/YYYY').format('MMM Do, YYYY')}</p>
                                <p className='text-xxs text-gray-100 font-semibold'>
                                    {store?.itinerary?.ports[store?.itinerary?.ports.length - 1].arrival.split(" ").slice(-2).join(" ")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='border-b col-span-10 mb-2 border-gray-100/20' />
                    <div className='flex flex-col items-start col-span-7 lg:col-span-10'>
                        <p className="text-xs lg:text-sm font-medium text-gray-100">
                            Visiting Ports:
                        </p>
                        <div className="flex">
                            <p className="text-xs lg:text-xs font-medium !leading-5">
                                <span className='mr-2'>{isLong && !isExpanded ? portList?.slice(0, window.innerWidth > 765 ? 65 : 40) + '...' : portList}</span>
                                {isLong && (
                                    <span
                                        onClick={() => setIsExpanded(prev => !prev)}
                                        className="text-xs lg:text-xs text-brand-primary font-bold cursor-pointer inline-block"
                                    >
                                        {isExpanded ? 'View less' : 'View more'}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                {hideCabin ? null : store?.booking?.rooms?.map((room: any, i: any) => {
                    return (
                        <div className='px-4 py-4 lg:py-6 border-t border-[#185DA0]/20 shadow-sm bg-[#F4F8FF] flex justify-between'>
                            <div>
                                <div className='flex items-center'>
                                    <img
                                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                                        className="h-3 lg:h-3 mr-2"
                                        alt="Cruise"
                                    />
                                    <p className='text-xs lg:text-sm font-medium'>Cabin {i + 1}</p>
                                </div>
                                <p className='text-sm lg:text-base font-semibold mt-1'>
                                    {/* {room.category_name} */}
                                    {payment_for === "upgrade_cabin" ? selectedCabinName : room.category_name}

                                </p>
                            </div>
                            <div>
                                <p className='text-xs lg:text-sm font-medium'>No. of Guest(s)</p>
                                <p className='text-sm lg:text-base font-bold text-brand-primary mt-1'>{room.guests}</p>
                            </div>
                        </div>
                    )
                })}
                <div className='bg-white rounded-b-lg text-center py-3'>
                    <p className='text-sm font-semibold text-[#008CFF] cursor-pointer' onClick={() => setHideCabin(!hideCabin)}>{hideCabin ? "View Detail" : "Hide Detail"}</p>
                </div>
            </div>

            <div className="mt-4">
                <div className="py-4 lg:py-0 border border-gray-400 bg-white rounded-lg shadow-allSide">
                    <div className="px-4 lg:py-6 flex items-center justify-between border-b border-gray-300 pb-4 lg:pb-6">
                        <p className="text-base lg:text-lg font-bold">Price Details</p>
                        <p
                            onClick={() => setHideBreakup(!hideBreakup)}
                            className="text-sm text-[#008CFF] font-semibold cursor-pointer"
                        >
                            {hideBreakup ? "View Price Breakup" : "Hide Price Breakup"}
                        </p>
                    </div>
                    {payment_for === "upgrade_cabin" ? (
                        <>
                            {/* Cabin Upgrade Charges */}
                            {!hideBreakup && (
                                <div className='mt-2'>
                                    <div className="grid grid-cols-3 mb-2 px-4">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                Cabin Upgrade Charges
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {`₹ ${FormatAmount(upgradeCabin_data?.cabin_fare_diff || 0)}`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 mb-2 px-4">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 mb-2 px-4">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                                {`₹ ${FormatAmount(upgradeCabin_data?.gst_diff || 0)}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            )}
                            <div className="px-4 pt-2 lg:pt-4 py-3 border-t  border-gray-300 bg-brand-secondary/[0.1]">
                                <div className="flex justify-between items-end mt-2">
                                    <p className="text-base lg:text-xl text-brand-primary font-bold">
                                        Amount Payable
                                    </p>
                                    <div>
                                        <p className="text-base lg:text-xl font-bold text-brand-primary">
                                            {`₹${FormatAmount(upgradeCabin_data?.total_payable || 0)}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : payment_for === "extra_guests" ? (
                        <>
                            {!hideBreakup && (
                                <div className='px-3 py-3'>
                                    {/* Cabin 1 Fare */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Cabin Fare</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.fare
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].fare)}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.fare
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].fare)}`
                                                        : '₹ 0'}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Service Charge & Levies */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Service Charge & Levies</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.gratuity || extraGuests_data?.data?.individual?.[0]?.portCharges
                                                    ? `₹ ${FormatAmount(
                                                        (extraGuests_data?.data?.individual?.[0]?.gratuity || 0) +
                                                        (extraGuests_data?.data?.individual?.[0]?.portCharges || 0)
                                                    )}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.gratuity || upgradeCabin_data?.data?.individual?.[0]?.portCharges
                                                        ? `₹ ${FormatAmount(
                                                            (upgradeCabin_data?.data?.individual?.[0]?.gratuity || 0) +
                                                            (upgradeCabin_data?.data?.individual?.[0]?.portCharges || 0)
                                                        )}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Fuel Surcharge */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Fuel Surcharge</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.fuelSurcharge
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].fuelSurcharge)}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.fuelSurcharge
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].fuelSurcharge)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Discount */}
                                    {extraGuests_data?.data?.individual?.[0]?.discount > 0 && (
                                        <div className="grid grid-cols-3 mb-2">
                                            <div className="col-span-2">
                                                <p className="text-sm lg:text-sm font-semibold">Discount</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm lg:text-sm font-semibold">
                                                    {extraGuests_data?.data?.individual?.[0]?.discount
                                                        ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].discount)}`
                                                        : upgradeCabin_data?.data?.individual?.[0]?.discount
                                                            ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].discount)}`
                                                            : '₹ 0'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Sub-total */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.total
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].total)}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.total
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].total)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Taxes */}
                                    {/* {extraGuests_data?.data?.individual?.[0]?.taxes && extraGuests_data?.data?.individual?.[0]?.taxes.length > 0 && ( */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {/* {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`}  */}
                                                {extraGuests_data?.data?.gst
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.gst)}`
                                                    : upgradeCabin_data?.data?.gst
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.gst)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* )} */}
                                    {/* GST */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                                {extraGuests_data?.data?.gst
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.gst)}`
                                                    : upgradeCabin_data?.data?.gst
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.gst)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Amount Payable */}

                                </div>
                            )}
                            <div className="px-4 pt-2 lg:pt-4 py-3 border-t  border-gray-300 bg-brand-secondary/[0.1]">
                                <div className="flex justify-between items-end mt-2">
                                    <p className="text-base lg:text-xl text-brand-primary font-bold">
                                        Amount Payable
                                    </p>
                                    <div>
                                        <p className="text-base lg:text-xl font-bold text-brand-primary">
                                            {extraGuests_data?.data?.total
                                                ? `₹ ${FormatAmount(extraGuests_data.data.total)}`
                                                : upgradeCabin_data?.data?.total
                                                    ? `₹ ${FormatAmount(upgradeCabin_data.data.total)}`
                                                    : '₹ 0'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : payment_for === "add_guest" ? (
                        <>
                            {!hideBreakup && (
                                <div className='px-3 py-3'>
                                    {/* Cabin 1 Fare */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Cabin Fare</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.fare
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].fare)}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.fare
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].fare)}`
                                                        : '₹ 0'}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Service Charge & Levies */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Service Charge & Levies</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.gratuity || extraGuests_data?.data?.individual?.[0]?.portCharges
                                                    ? `₹ ${FormatAmount(
                                                        (extraGuests_data?.data?.individual?.[0]?.gratuity || 0) +
                                                        (extraGuests_data?.data?.individual?.[0]?.portCharges || 0)
                                                    )}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.gratuity || upgradeCabin_data?.data?.individual?.[0]?.portCharges
                                                        ? `₹ ${FormatAmount(
                                                            (upgradeCabin_data?.data?.individual?.[0]?.gratuity || 0) +
                                                            (upgradeCabin_data?.data?.individual?.[0]?.portCharges || 0)
                                                        )}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Fuel Surcharge */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Fuel Surcharge</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.fuelSurcharge
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].fuelSurcharge)}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.fuelSurcharge
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].fuelSurcharge)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Discount */}
                                    {extraGuests_data?.data?.individual?.[0]?.discount > 0 && (
                                        <div className="grid grid-cols-3 mb-2">
                                            <div className="col-span-2">
                                                <p className="text-sm lg:text-sm font-semibold">Discount</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm lg:text-sm font-semibold">
                                                    {extraGuests_data?.data?.individual?.[0]?.discount
                                                        ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].discount)}`
                                                        : upgradeCabin_data?.data?.individual?.[0]?.discount
                                                            ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].discount)}`
                                                            : '₹ 0'}

                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Sub-total */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Sub-total</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {extraGuests_data?.data?.individual?.[0]?.total
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.individual[0].total)}`
                                                    : upgradeCabin_data?.data?.individual?.[0]?.total
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.individual[0].total)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Taxes */}
                                    {/* {extraGuests_data?.data?.individual?.[0]?.taxes && extraGuests_data?.data?.individual?.[0]?.taxes.length > 0 && ( */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">Taxes:</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {/* {`₹ ${FormatAmount(extraGuests_data?.data?.gst || 0)}`}  */}
                                                {extraGuests_data?.data?.gst
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.gst)}`
                                                    : upgradeCabin_data?.data?.gst
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.gst)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* )} */}
                                    {/* GST */}
                                    <div className="grid grid-cols-3 mb-2">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">GST</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-xs text-gray-100 font-semibold mt-1">
                                                {extraGuests_data?.data?.gst
                                                    ? `₹ ${FormatAmount(extraGuests_data.data.gst)}`
                                                    : upgradeCabin_data?.data?.gst
                                                        ? `₹ ${FormatAmount(upgradeCabin_data.data.gst)}`
                                                        : '₹ 0'}

                                            </p>
                                        </div>
                                    </div>
                                    {/* Amount Payable */}

                                </div>
                            )}

                            <div className="px-4 pt-2 lg:pt-4 py-3 border-t  border-gray-300 bg-brand-secondary/[0.1]">
                                <div className="flex justify-between items-end mt-2">
                                    <p className="text-base lg:text-xl text-brand-primary font-bold">
                                        Amount Payable
                                    </p>
                                    <div>
                                        <p className="text-base lg:text-xl font-bold text-brand-primary">
                                            {extraGuests_data?.data?.total
                                                ? `₹ ${FormatAmount(extraGuests_data.data.total)}`
                                                : upgradeCabin_data?.data?.total
                                                    ? `₹ ${FormatAmount(upgradeCabin_data.data.total)}`
                                                    : '₹ 0'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </>
                    ) : payment_for === "shore_excusions" ? (
                        <>
                            {!hideBreakup && (
                                <div className="px-4 pb-3 mt-2">

                                    {uniqueCodes.map((code, i) => {
                                        const adultCount = guestRecord === undefined ? upgradeShore_data?.guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length : guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;

                                        const childrenCount = guestRecord === undefined ? upgradeShore_data?.guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length :
                                            guestRecord?.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                                        const adultPrice = guestRecord === undefined ? upgradeShore_data?.guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0 :
                                            guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                                        const childrenPrice = guestRecord === undefined ? upgradeShore_data?.guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0 :
                                            guestRecord?.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                                        const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                                        return (
                                            <div key={i} className='flex items-center justify-between'>
                                                <p className="text-sm lg:text-base font-medium  ml-[17px]">
                                                    {code} : <span className='text-sm lg:text-base font-medium'>{adultCount == 0 ? null : `Adult x ${adultCount}`} {childrenCount == 0 ? null : `Children x ${childrenCount}`}  </span>
                                                </p>
                                                <p className="text-sm lg:text-base font-medium mr-[18px]">{`₹ ${FormatAmount(totalPrice)}`}</p>

                                            </div>
                                        );
                                    })}


                                    <div className='px-4 pb-3'>
                                        <div className='flex justify-between'>
                                            <p className="text-sm lg:text-base font-medium">Sub-total</p>
                                            <p className="text-sm lg:text-base font-medium">₹ {FormatAmount(upgradeShore_data?.shore_excursion_net_total)}</p>
                                        </div>
                                    </div>

                                    <div className='bg-[#F4F8FF] px-4 py-3'>
                                        <div className='flex justify-between mb-1'>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium">Taxes</p>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium">₹ {FormatAmount(upgradeShore_data?.shore_excursion_gst + (0 || 0))}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">GST</p>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(upgradeShore_data?.shore_excursion_gst)}</p>
                                        </div>
                                        {/* {store?.booking.shore_excursion_gst ?
                                            <div className='flex justify-between'>
                                                <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">Shore Excursion GST:</p>
                                                <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(store?.booking?.shore_excursion_gst)}</p>
                                            </div>
                                            : null
                                        } */}
                                    </div>

                                </div>
                            )}

                            <div className="px-4 pt-2 lg:pt-4">
                                <div className="flex justify-between items-end mt-2">
                                    <p className="text-base lg:text-xl text-brand-primary font-bold">
                                        Amount Payable
                                    </p>
                                    <div>
                                        <div className="text-right">
                                            {store?.itinerary?.discount_pct !== 0 ? (
                                                <p className="text-sm lg:text-base line-through font-semibold text-gray-100">
                                                    {`₹ ${FormatAmount(store?.booking?.actual_total + (tcs || 0))}`}
                                                </p>
                                            ) : null}
                                            <p className="text-md lg:text-lg font-bold text-brand-primary">{`₹ ${FormatAmount(
                                                upgradeShore_data?.due_amount
                                            )}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : payment_for === "reschedule" ? (
                        <>
                            {!hideBreakup && (
                                <div>
                                    <div className="grid grid-cols-3 mb-2 px-4">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                Fare Difference
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {`₹ ${FormatAmount(reschedulePricingData?.fare_difference || 0)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 mb-2 px-4">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                Rescheduling Charges
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {`₹ ${FormatAmount(reschedulePricingData?.reschedule_fee || 0)}`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* GST */}
                                    <div className="grid grid-cols-3 mb-2 px-4">
                                        <div className="col-span-2">
                                            <p className="text-sm lg:text-sm font-semibold">GST</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm lg:text-sm font-semibold">
                                                {`₹ ${FormatAmount(reschedulePricingData?.reschedule_gst || 0)}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Grand Total */}
                            <div className="px-4 pt-2 lg:pt-4 py-3 border-t  border-gray-300 bg-brand-secondary/[0.1]">
                                <div className="flex justify-between items-end mt-2">
                                    <p className="text-base lg:text-xl text-brand-primary font-bold">
                                        Amount Payable
                                    </p>
                                    <div>
                                        <p className="text-base lg:text-xl font-bold text-brand-primary">
                                            {`₹ ${FormatAmount(reschedulePricingData?.payable || 0)}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) :
                        <>
                            {!hideBreakup && (
                                <div className="pt-6">
                                    {store?.booking?.rooms?.map((room: any, index: any) => (
                                        <div className="mb-3 px-4" key={index}>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-sm lg:text-base mb-0.5 font-medium">
                                                    {room.category_name} Cabin
                                                </p>
                                                <p className="text-sm lg:text-base mb-0.5 font-medium">
                                                    ₹ {FormatAmount(room.cabin_fare + room.discount)}
                                                </p>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-sm lg:text-base mb-0.5 font-medium">
                                                    Service Charge & Levies
                                                </p>
                                                <p className="text-sm lg:text-base mb-0.5 font-medium">
                                                    ₹ {FormatAmount(room.service_charges)}
                                                </p>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-sm lg:text-base mb-0.5 font-medium">
                                                    Fuel Surcharge
                                                </p>
                                                <p className="text-sm lg:text-base mb-0.5 font-medium">
                                                    ₹ {FormatAmount(room.fuel_surcharge)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}


                                    {(store?.booking?.cabin_fare_discount && store?.booking?.cabin_fare_discount != "0.0") || store?.booking?.discounts[0]?.amount ?
                                        <div className="grid grid-cols-3 px-4 pb-3">
                                            <div className="col-span-2">
                                                <p className="text-sm lg:text-base font-semibold">Total Cabin Fare Discount:</p>
                                                {store?.booking?.discount_text && <p className="text-xs lg:text-sm font-semibold text-gray-100">{store?.booking?.discount_text}</p>}
                                                {store?.booking?.discounts && store?.booking?.discounts[0] && <p className="text-xs lg:text-sm font-semibold text-gray-100">{store?.booking?.discounts[0]?.coupon_code}</p>}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm lg:text-base font-semibold text-brand-green">- ₹{FormatAmount((+store?.booking.cabin_fare_discount || 0) + (+store?.booking?.discounts[0]?.amount || 0))}</p>
                                                {store?.booking.cabin_fare_discount > 0 && <p className="text-xs lg:text-sm font-semibold text-gray-100">- ₹{FormatAmount(store?.booking.cabin_fare_discount)}</p>}
                                                {store?.booking?.discounts && store?.booking?.discounts[0] && <p className="text-xs lg:text-sm font-semibold text-gray-100">- ₹{FormatAmount(store?.booking?.discounts[0]?.amount)}</p>}
                                            </div>
                                        </div>
                                        : null
                                    }

                                    {store?.booking.shore_excursion_net_total ?
                                        <div className='px-4 pb-3'>
                                            <div className='flex justify-between'>
                                                <p className="text-sm lg:text-base  font-medium">Shore Excursions</p>
                                                <p className="text-sm lg:text-base  font-medium">₹ {FormatAmount(store?.booking?.shore_excursion_net_total)}</p>
                                            </div>
                                        </div>
                                        : null
                                    }

                                    <div className='px-4 pb-3'>
                                        <div className='flex justify-between'>
                                            <p className="text-sm lg:text-base font-medium">Sub-total</p>
                                            <p className="text-sm lg:text-base font-medium">₹ {FormatAmount(store?.booking?.sub_total)}</p>
                                        </div>
                                    </div>

                                    <div className='bg-[#F4F8FF] px-4 py-3'>
                                        <div className='flex justify-between mb-1'>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium">Taxes</p>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium">₹ {FormatAmount(store?.booking?.gst + (store?.booking?.shore_excursion_gst || 0))}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">GST</p>
                                            <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(store?.booking?.gst)}</p>
                                        </div>
                                        {store?.booking.shore_excursion_gst ?
                                            <div className='flex justify-between'>
                                                <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">Shore Excursion GST:</p>
                                                <p className="text-sm lg:text-base  mb-0.5 font-medium text-gray-200">₹ {FormatAmount(store?.booking?.shore_excursion_gst)}</p>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    {tcs ?
                                        <div className='px-4 mt-3'>
                                            <div className="flex justify-between">
                                                <div className="col-span-2">
                                                    <p className="text-base lg:text-lg font-bold">Total:</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base lg:text-lg font-bold">{`₹ ${FormatToString(
                                                        store?.booking?.total
                                                    )}`}</p>
                                                </div>
                                            </div>

                                            <div className=" flex justify-between mt-1">
                                                <div className="col-span-2">
                                                    <p className="text-sm lg:text-base font-medium">TCS:</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm lg:text-base font-medium">{`₹ ${FormatAmount(tcs)}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                            )}

                            <div className='px-4 py-2 lg:pb-4'>
                                <div className='flex justify-between items-end mt-2'>
                                    <p className='text-base lg:text-xl text-brand-primary font-bold'>Grand Total</p>
                                    <div>
                                        <div className="text-right">
                                            {store?.itinerary?.discount_pct != 0 ? <p className="text-sm lg:text-base line-through font-semibold text-gray-100">{`₹ ${FormatAmount(
                                                store?.booking?.actual_total + (tcs || 0)
                                            )}`}</p>
                                                : null
                                            }
                                            <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatAmount(
                                                store?.booking?.total + (tcs || 0)
                                            )}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {reserveBooking ?
                                    <>
                                        {store?.booking?.amount_paid != 0 ?
                                            <div className='flex justify-between items-end mt-2'>
                                                <p className='text-base lg:text-xl text-brand-primary font-bold'>Amount Paid</p>
                                                <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatAmount(store?.booking?.amount_paid)}`}</p>
                                            </div>
                                            : null
                                        }
                                        <div className='flex justify-between items-end mt-2'>
                                            <p className='text-base lg:text-xl text-brand-primary font-bold'>Current Payable</p>
                                            <p className="text-base lg:text-xl font-bold text-brand-primary">{`₹ ${FormatAmount(store?.booking?.status == 'RESERVED' ? store?.booking?.due_amount : store?.booking?.current_payable)}`}</p>
                                        </div>
                                    </>
                                    : null
                                }
                            </div>
                        </>
                    }


                </div>
            </div>

        </>
    );
}

export default BookingInfo;