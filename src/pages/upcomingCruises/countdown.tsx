import React, { ReactNode, useState, useEffect } from 'react';
import { GetPromo, SaveAppliedPromo, GetAppliedPromo, } from '../../../src/utils/store/store';
// import { TiggerGAClickEvent } from '../../../src/components/Analytics/events';
import { Player } from '@lottiefiles/react-lottie-player';
import promo_popup from "../../utils/lottie/promo_popup.json";
import Modal from '../../../src/components/UI/Modal';
type Props = {
    PROMO_CODE: string;
};

export default function CountDown({ PROMO_CODE }: Props) {
    const AppliedPromo = GetAppliedPromo();
    const [activePromoCodes, setActivePromoCodes] = useState(false);
    const [discountModal, setDiscountModal] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (PROMO_CODE && PROMO_CODE.length) {
            setPercentage(((PROMO_CODE[0].offer_pct)*100).toFixed(0));
            let currentTime = Date.parse(new Date());
            let promoTime = Date.parse(PROMO_CODE[0].expires_at);
            // var promoTime = new Date("dec 27, 2022 13:09:00").getTime();
            if (promoTime > currentTime) {
                setActivePromoCodes(true)
            } else {
                setActivePromoCodes(false)
                setDiscountModal(false)
            }
        } else {
            setActivePromoCodes(false)
        }
    }, [PROMO_CODE])

    const coundDown = () => {
        if (activePromoCodes) {
            // var deadline = new Date("dec 27, 2022 13:09:00").getTime();
            var deadline = new Date(PROMO_CODE[0].expires_at).getTime();
            let currentTime = Date.parse(new Date());
            if (deadline < currentTime) {
                setActivePromoCodes(false)
                setDiscountModal(false)
                SaveAppliedPromo(false);
            }

            var x = setInterval(function () {
                var now = new Date().getTime();
                var t = deadline - now;
                var minutes = Math.round(t / 60000)
                var seconds = Math.floor((t % (1000 * 60)) / 1000);
                setMinutes(minutes)
                setSeconds(seconds)
            }, 1000);
            return (
                <div id="clockdiv" className='w-full inline-block text-center mt-7 px-10'>
                    <div className='inline-block mx-1 p-1'>
                        <span className="text-3xl bg-gray-200/25 p-1 font-bold min-w-15 px-2">{minutes}</span>
                        <div className="text-xs mt-2">Minutes</div>
                    </div>
                    <div className='inline-block mx-1 p-1'>
                        <span className="text-3xl bg-gray-200/25 p-1 font-bold min-w-15 px-2">{seconds}</span>
                        <div className="text-xs mt-2">Seconds</div>
                    </div>
                    <div>
                        <button onClick={() => {
                            // TiggerGAClickEvent({ event: `apply_discount`, type: "discount" })
                            SaveAppliedPromo(true);
                            setDiscountModal(false);
                        }} className='bg-brand-primary text-white font-semibold text-lg w-full py-2 mt-7 rounded'>Apply Discount</button>
                    </div>
                </div>
            )
        }
    }
    return (
        <div>
            {activePromoCodes && AppliedPromo && (
                <div className='relative'>
                    <img className='w-full' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/offer-ribbon.svg' />
                    <div className='grid grid-cols-4 items-center absolute top-0 h-[90%] w-full'>
                        <div className='flex justify-end px-1'>
                            <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/lock-icon.svg' />
                        </div>
                        <div>
                            <div>
                                <p className='text-center text-xxs font-bold text-white leading-3'>OFFER</p>
                                <p className='text-center text-xxs font-bold text-white leading-3'>ENDS IN</p>
                            </div>
                        </div>
                        <div className='flex items-center col-span-2 px-1'>
                            <div className='text-center'>
                                <span className="text-base text-white font-bold min-w-15 px-2 leading-none">{minutes}</span>
                                <div className="text-xxs leading-3 text-white">Min</div>
                            </div>
                            <div className='text-center'>
                                <span className="text-base text-white font-bold min-w-15 px-2 leading-none">{seconds}</span>
                                <div className="text-xxs leading-3 text-white">Sec</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activePromoCodes && !AppliedPromo && (
                <div
                    className='bg-brand-primary text-white py-3 px-1 lg:px-5 flex items-center justify-center'
                    onClick={() => setDiscountModal(true)}
                >
                    <img src='https://images.cordeliacruises.com/cordelia_v2/public/assets/lock-icon.svg' />
                    <p className='font-semibold ml-2 text-xs'>UNLOCK YOUR DISCOUNT</p>
                </div>
            )}

            <Modal show={discountModal} align={'center'} className="relative drop-shadow bg-white center top-1/4 h-1/2 w-[90%] left-0 right-0 mx-auto rounded-t-lg lg:rounded border " onClose={() => setDiscountModal(false)}>
                <div className='absolute w-full z-50'>
                    <p className='text-black text-xl font-bold absolute right-4 top-2 cursor-pointer'
                        onClick={() => setDiscountModal(false)}
                    >X</p>
                    <div className='text-center'>
                        <h1 className='mt-7 text-lg font-semibold'>Limited Offer. Just for you!</h1>
                        <p className='text-3xl font-bold text-brand-primary mt-2'>{percentage}% Off</p>
                        <p className='mt-2 text-sm font-semibold'>Offer valid for the next</p>
                    </div>
                    {coundDown()}
                </div>
                <Player
                    src={promo_popup}
                    className="player absolute top-0"
                    loop
                    autoplay
                />
            </Modal>
        </div>
    );
}
