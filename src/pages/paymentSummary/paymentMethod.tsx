import React, { useState, useEffect } from 'react';
import { Layout } from '../../../src/components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingInfo from './component/bookingInfo';
import { GetStore } from '../../../src/utils/store/store';
import PaymentMethodSelection from './component/paymentMethodSelection';
import Card from './component/card';
import PaymentMethodSelectionMobile from './component/paymentMethodSelectionMobile';
function PaymentMethod() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let navigate = useNavigate();
    const { state } = useLocation();
    const getStore = GetStore();
    let newBookings = getStore.newBookings;
    let reschedulePricing = getStore.reschedulePricingData;
    const [portName, setPortName] = useState('');



    // const { paymentData, billingAddress, bookingData: store, payment_for, promo_code, tcs, currentPayble, reserveBooking, quotation, upgradeShore_data, shore_excursions, guestRecord} = state;
    const { paymentData, billingAddress, bookingData: store1, payment_for, promo_code, tcs, currentPayble: currentPayable1, reserveBooking, quotation, upgradeCabin_data, selectedRoom, extraGuests_data, reschedulePricingData, upgradeShore_data, guestRecord, currentPaybleShore, selectedCabinName } = state;
    let store = store1 ? store1 : newBookings;


    let currentPayble = currentPayable1 ? currentPayable1 : reschedulePricing?.payable;

    try {
        // Check if it's a valid number (or any other type of data you expect)
        if (currentPayble || currentPayble === 0) {
            localStorage.setItem('currentPayble', JSON.stringify(currentPayble)); // Store it as a stringified value
        } else {
            console.warn("Invalid currentPayble, storing as an empty object.");
            localStorage.setItem('currentPayble', JSON.stringify({}));
        }
    } catch (e) {
        console.error('Error storing currentPayble in localStorage:', e);
    }



    if (upgradeCabin_data && typeof upgradeCabin_data === 'object') {
        localStorage.setItem('upgradeCabin', JSON.stringify(upgradeCabin_data));
    } else {
        console.warn("Invalid upgradeCabin_data, storing as an empty object.");
        localStorage.setItem('upgradeCabin', JSON.stringify({}));
    }

    // Safely store `extraGuests_data` in a separate key
    if (extraGuests_data && typeof extraGuests_data === 'object') {
        localStorage.setItem('extraGuests', JSON.stringify(extraGuests_data));
    } else {
        console.warn("Invalid extraGuests_data, storing as an empty object.");
        localStorage.setItem('extraGuests', JSON.stringify({}));
    }


    if (store && typeof store === 'object') {
        localStorage.setItem('bookingData', JSON.stringify(store));
    } else {
        console.warn("Invalid store, storing as an empty object.");
        localStorage.setItem('bookingData', JSON.stringify({}));
    }

    if (paymentData && typeof paymentData === 'object') {
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
    } else {
        console.warn("Invalid paymentData, storing as an empty object.");
        localStorage.setItem('paymentData', JSON.stringify({}));
    }

    if (selectedRoom && typeof selectedRoom === 'object') {
        localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
    } else {
        console.warn("Invalid selectedRoom, storing as an empty object.");
        localStorage.setItem('selectedRoom', JSON.stringify({}));
    }

    useEffect(() => {
        if (store) {
            let portName = store?.itinerary?.ports
                .map((item: any, index: any, arr: any) => {
                    const isLast = index === arr.length - 1;
                    const name = isLast ? item.name : item.name + ` -`;
                    return index === 0 || isLast ? `${name}` : `${name}`;
                })
                .join(" ")

            setPortName(portName)
        }
    }, [store])

    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3">
                <div className="pb-3 flex items-center cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                        alt="arrow"
                        onClick={() => navigate(-1)}
                        className={`self-center justify-self-end mr-2`}
                    />
                    <p className="text-base font-bold">Select Payment Method</p>
                </div>

                <div className='grid grid-cols-11 gap-4'>
                    <div className='col-span-11 lg:col-span-7 order-last lg:order-first hidden lg:block'>
                        <PaymentMethodSelection store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} payment_for={payment_for} currentPayble={currentPayble} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} extraGuests_data={extraGuests_data} upgradeShore_data={upgradeShore_data} guestRecord={guestRecord} currentPaybleShore={currentPaybleShore} />
                    </div>
                    <div className='col-span-11 lg:col-span-4'>
                        <BookingInfo store={store} getStore={getStore} portName={portName} tcs={tcs} currentPayble={currentPayble} reserveBooking={reserveBooking} quotation={quotation} payment_for={payment_for} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} extraGuests_data={extraGuests_data} reschedulePricingData={reschedulePricingData} upgradeShore_data={upgradeShore_data} guestRecord={guestRecord} currentPaybleShore={currentPaybleShore} selectedCabinName={selectedCabinName} />
                    </div>
                    <div className='col-span-11 lg:hidden'>
                        <PaymentMethodSelectionMobile store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} payment_for={payment_for} currentPayble={currentPayble} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} extraGuests_data={extraGuests_data} upgradeShore_data={upgradeShore_data} guestRecord={guestRecord} currentPaybleShore={currentPaybleShore} />
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default PaymentMethod;