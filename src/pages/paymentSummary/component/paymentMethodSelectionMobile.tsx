import React, { useState, useEffect } from 'react'
import Upi from './upi'
import Card from './card'
import Bank from './netBanking'
import EMI from './emi'

function PaymentMethodSelectionMobile({ store, paymentData, billingAddress, promo_code, payment_for, currentPayble, selectedRoom }: any) {
    const [activeTab, setActiveTab] = useState('')
    const [totalAmount, setTotalAmount] = useState(0);
    const [EMIOption, setEMIOption] = useState<any>(null);

    useEffect(() => {
        if (store && store.booking?.split_payment_options?.available && payment_for === 'split_payment') {
            let obj = store.booking?.split_payment_options?.options.find((o: any) => o.paid === false);
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
        setActiveTab(activeTab == tab ? '' : tab)
    }

    return (
        <div className='rounded-lg w-full  bg-white shadow-allSide'>
            <div className="">
                {currentPayble < 100000 ?
                    <div className={`w-full lg:border-l-4 cursor-pointer px-4 py-2`}>
                        <div className={`flex items-center justify-between min-h-[70px] `} onClick={() => handleTabClick('upi')}>
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
                            <div>
                                <img className={`h-2 lg:h-2.5 ${activeTab == 'upi' ? '' : '-rotate-90'}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                            </div>
                        </div>
                        {activeTab == 'upi' &&
                            <div className=''>
                                <Upi store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} selectedRoom={selectedRoom} />
                            </div>
                        }
                    </div>
                    : null
                }

                <div className='border-t border-gray-200/30' />
                <div className={`w-full lg:border-l-4 cursor-pointer px-4 py-2`}>
                    <div className={`flex items-center justify-between min-h-[70px] `} onClick={() => handleTabClick('card')}>
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
                        <div>
                            <img className={`h-2 lg:h-2.5 ${activeTab == 'card' ? '' : '-rotate-90'}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                        </div>
                    </div>
                    {activeTab == 'card' &&
                        <div className=''>
                            <Card store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} selectedRoom={selectedRoom} />
                        </div>
                    }
                </div>

                <div className='border-t border-gray-200/30' />
                <div className={`w-full lg:border-l-4 cursor-pointer px-4 py-2`}>
                    <div className={`flex items-center justify-between min-h-[70px] `} onClick={() => handleTabClick('netBanking')}>
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
                        <div>
                            <img className={`h-2 lg:h-2.5 ${activeTab == 'netBanking' ? '' : '-rotate-90'}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                        </div>
                    </div>
                    {activeTab == 'netBanking' &&
                        <div className=''>
                            <Bank store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} selectedRoom={selectedRoom} />
                        </div>
                    }
                </div>
                {EMIOption &&
                    <>
                        <div className='border-t border-gray-200/30' />
                        <div className={`w-full lg:border-l-4 cursor-pointer px-4 py-2`}>
                            <div className={`flex items-center justify-between min-h-[70px] `} onClick={() => handleTabClick('emi')}>
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
                                <div>
                                    <img className={`h-2 lg:h-2.5 ${activeTab == 'emi' ? '' : '-rotate-90'}`} src="https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg" alt="" />
                                </div>
                            </div>
                            {activeTab == 'emi' &&
                                <div className=''>
                                    <EMI store={store} paymentData={paymentData} billingAddress={billingAddress} promo_code={promo_code} EMIOption={EMIOption} selectedRoom={selectedRoom} />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default PaymentMethodSelectionMobile