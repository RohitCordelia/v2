import React, { useState, useEffect } from 'react'
import Upi from './upi'
import Card from './card'
import Bank from './netBanking'
import EMI from './emi'

// function PaymentMethodSelection({ store, paymentData, billingAddress, promo_code, payment_for, currentPayble, upgradeShore_data }: any) {
//     const [activeTab, setActiveTab] = useState('card')
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [EMIOption, setEMIOption] = useState<any>(null);
     
//     useEffect(() => {
//         if (store && store?.booking?.split_payment_options?.available && payment_for === 'split_payment') {
//             let obj = store?.booking?.split_payment_options.options.find((o: any) => o.paid === false);
function PaymentMethodSelection({ store, paymentData, billingAddress, promo_code, payment_for, currentPayble, upgradeCabin_data, selectedRoom, upgradeShore_data, currentPaybleShore  }: any) {
    const [activeTab, setActiveTab] = useState('card')
    const [totalAmount, setTotalAmount] = useState(0);
    const [EMIOption, setEMIOption] = useState<any>(null);


    useEffect(() => {
        if (store && store?.booking?.split_payment_options?.available && payment_for === 'split_payment') {
            let obj = store?.booking?.split_payment_options?.options.find((o: any) => o.paid === false);
            setTotalAmount(obj.amount)
        } else {
            setTotalAmount(store?.booking?.total)
        }
    }, [store])

    useEffect(() => {
        if (paymentData) {
            if (paymentData.pg_data?.paylater_options && paymentData.pg_data?.paylater_options[0]?.option_name) {
                setEMIOption(paymentData.pg_data?.paylater_options[0].option_name)
            }
        }
    }, [paymentData]);

    const handleTabClick = (tab: any) => {
        setActiveTab(tab)
    }
    const renderPaymentOption = () => {
        switch (activeTab) {
            case 'upi':
                return (<Upi store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} />)
            case 'card':
                return (<Card store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} />)
            case 'netBanking':
                return (<Bank store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} />)
            case 'emi':
                return (<EMI store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} EMIOption={EMIOption} upgradeCabin_data={upgradeCabin_data} selectedRoom={selectedRoom} />)
            default:
                return null;
        }
    }
    return (
        <div className='rounded-lg w-full  bg-white p-6 shadow-allSide flex justify-between items-start'>
            <div className="flex justify-between items-start flex-col w-1/3 ">
                <div className={`w-full lg:col-span-3 col-span-8 lg:border-l-4 cursor-pointer ${activeTab == 'card' ? 'lg:border-brand-primary' : 'lg:border-gray-300/50'}`}>
                    <div className={`flex items-center min-h-[90px] lg:items-center px-2 py-4 ${activeTab == 'card' ? 'lg:bg-white' : 'lg:bg-gray-300/50'}`} onClick={() => handleTabClick('card')}>
                        <div className='flex items-start'>
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/credit-card-icon.svg"
                                alt=""
                                className={`w-7 lg:w-5 mr-3 lg:mr-2 lg:mt-0.5`}
                            />
                            <div>
                                <p className='text-sm font-semibold'>Debit/Credit Card</p>
                                <p className='text-xxs lg:text-xs mt-0.5'>Visa, MasterCard, AMEX, Rupay and Dinnerclub</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-t hidden lg:block border-gray-200/50' />
                </div>
                {currentPayble < 100000 ?
                    <div className={`w-full lg:col-span-3 col-span-8 lg:border-l-4 cursor-pointer ${activeTab == 'upi' ? 'lg:border-brand-primary' : 'lg:border-gray-300/50'}`}>
                        <div className={`flex items-center min-h-[90px] lg:items-center px-2 py-4 ${activeTab == 'upi' ? 'lg:bg-white' : 'lg:bg-gray-300/50'}`} onClick={() => handleTabClick('upi')}>
                            <div className='flex items-start'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/UPI-icon.svg"
                                    alt=""
                                    className={`w-7 lg:w-5 mr-3 lg:mr-2 lg:mt-0.5`}
                                />
                                <div>
                                    <p className='text-sm font-semibold'>UPI Options</p>
                                    <p className='text-xxs lg:text-xs mt-0.5'>Pay directly from your Bank Account</p>
                                </div>
                            </div>
                        </div>
                        <div className='border-t hidden lg:block border-gray-200/50' />
                    </div>
                    : null
                }
                {currentPaybleShore < 100000 ?
                    <div className={`w-full lg:col-span-3 col-span-8 lg:border-l-4 cursor-pointer ${activeTab == 'upi' ? 'lg:border-brand-primary' : 'lg:border-gray-300/50'}`}>
                        <div className={`flex items-center min-h-[90px] lg:items-center px-2 py-4 ${activeTab == 'upi' ? 'lg:bg-white' : 'lg:bg-gray-300/50'}`} onClick={() => handleTabClick('upi')}>
                            <div className='flex items-start'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/UPI-icon.svg"
                                    alt=""
                                    className={`w-7 lg:w-5 mr-3 lg:mr-2 lg:mt-0.5`}
                                />
                                <div>
                                    <p className='text-sm font-semibold'>UPI Options</p>
                                    <p className='text-xxs lg:text-xs mt-0.5'>Pay directly from your Bank Account</p>
                                </div>
                            </div>
                        </div>
                        <div className='border-t hidden lg:block border-gray-200/50' />
                    </div>
                    : null
                }
                <div className={`w-full lg:col-span-3 col-span-8 lg:border-l-4 cursor-pointer ${activeTab == 'netBanking' ? 'lg:border-brand-primary' : 'lg:border-gray-300/50'}`}>
                    <div className={`flex items-center min-h-[90px] lg:items-center px-2 py-4 ${activeTab == 'netBanking' ? 'lg:bg-white' : 'lg:bg-gray-300/50'}`} onClick={() => handleTabClick('netBanking')}>
                        <div className='flex items-start'>
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/netbanking-icon.svg"
                                alt=""
                                className={`w-7 lg:w-5 mr-3 lg:mr-2 lg:mt-0.5`}
                            />
                            <div>
                                <p className='text-sm font-semibold'>Net Banking</p>
                                <p className='text-xxs lg:text-xs mt-0.5'>All Major banks Available</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-t hidden lg:block border-gray-200/50' />
                </div>
                {EMIOption &&
                    <div className={`w-full lg:col-span-3 col-span-8 lg:border-l-4 cursor-pointer ${activeTab == 'emi' ? 'lg:border-brand-primary' : 'lg:border-gray-300/50'}`}>
                        <div className={`flex items-center min-h-[90px] lg:items-center px-2 py-4 ${activeTab == 'emi' ? 'lg:bg-white' : 'lg:bg-gray-300/50'}`} onClick={() => handleTabClick('emi')}>
                            <div className='flex items-start'>
                                <img
                                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/EMI.svg"
                                    alt=""
                                    className={`w-7 lg:w-5 mr-3 lg:mr-2 lg:mt-0.5`}
                                />
                                <div>
                                    <p className='text-sm font-semibold'>EMI</p>
                                    <p className='text-xxs lg:text-xs mt-0.5'>Book Now and Pay Later with ease</p>
                                </div>
                            </div>
                        </div>
                        <div className='border-t hidden lg:block border-gray-200/50' />
                    </div>
                }

                <div className='w-full h-28  bg-gray-300/50 rounded-bl-md rounded-br-md flex items-start p-4 justify-between'></div>
            </div>
            <div className="payment-methods w-2/3 ml-6 relative h-full">
                <div className="payment-option">{renderPaymentOption()}</div>
                {/* <button className=' absolute bottom-0 left-0 tracking-wider payment-btn bg-primary w-full p-5  text-white font-bold text-xl rounded '>Proceed To Payment</button> */}
            </div>
        </div>
    )
}

export default PaymentMethodSelection