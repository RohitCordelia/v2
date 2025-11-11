import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useInitiatePaymentMutation } from '../../../../src/services/payments/payment';
import Button from '../../../components/UI/Button';

function EMI({ store, paymentData, billingAddress, promo_code, EMIOption, selectedRoom }: any) {
    const [loading, setLoading] = useState(false);

    const [initiatePayment] = useInitiatePaymentMutation();
    const {
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {}
    });

    const {
        handleSubmit: handleEMISubmit,
    } = useForm({});

    const onSubmitEMI = () => {
        handleEMISubmit(onPayViaEMI)()
    };

    const onPayViaEMI = () => {
        const _payload = {
            payment_id: paymentData.payment_id,
            booking_id: store.booking.id,
            billing_address: billingAddress,
            payment_mode: EMIOption,
            promo_code: promo_code,
            ...(selectedRoom?.number && { room_no: selectedRoom.number })
        };
        setLoading(true);
        initiatePayment(_payload)
            .unwrap()
            .then((res: any) => {
                if (res.pg_data.extra_info.data.redirectUrl) {
                    window.location = res.pg_data.extra_info.data.redirectUrl;
                }
                setLoading(false);
            })
            .catch((res: any) => {
                console.log('Error: ', res);
                setLoading(false);
            });
    };
    return (
        <div className='relative w-full pb-2 lg:pb-0'>
            <div className="hidden md:block">
                <p className="text-base font-bold">Cruise Now Pay Later </p>
            </div>

            <div className="mt-4 grid md:grid-cols-2 grid-cols-2 gap-2 gap-y-3">
                <div className="mx-2 py-2 cursor-pointer border border-gray-300 rounded">
                    <img
                        src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/sankash-logo.png`}
                        alt={EMIOption}
                        className="self-center mx-auto max-h-10 h-10 mb-0"
                    />
                    <p className="text-xxs text-center"> {`Pay Via ${EMIOption} EMI option`}</p>
                </div>
            </div>

            <div className='flex justify-center mt-14 mb-4'>
                <img className='w-2/4' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/safe-secure-payment.svg" alt="" />
            </div>

            {/* <button
                onClick={handleSubmit(onSubmitEMI)}
                className="bg-brand-primary rounded w-full text-white text-sm lg:text-base py-3 font-bold mt-3 disabled:bg-brand-primary/60 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? (
                    <span className="loading-elipses">Loading</span>
                ) : (
                    'Proceed to Payment'
                )}
            </button> */}
            <Button text='Proceed to Payment' isLoading={loading} disabled={loading} handleClick={handleSubmit(onSubmitEMI)} className='w-full mt-3' />
        </div>
    )
}

export default EMI