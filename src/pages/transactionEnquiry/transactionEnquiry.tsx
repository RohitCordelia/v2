import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnquireTransactionQuery } from '../../../src/services/payments/payment';
import { Layout } from '../../../src/components/Layout';
import { getTimeFromSec } from '../../../src/utils/algorithms';
// import { TiggerFBPaymentInfoEvent, TiggerGAPaymentInfoEvent } from '../../../src/components/Analytics/events';

type Props = {};

const ProgressCircle = ({
  radius,
  percent,
  data
}: {
  radius: number;
  percent: number;
  data: string;
}) => {
  const circumference = radius * 2 * Math.PI;
  return (
    <div
      x-data="scrollProgress"
      className="inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5"
    >
      <svg className="w-20 h-20 transform -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="text-success"
          strokeWidth="10"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <span
        className="absolute text-sm font-bold text-blue-700"
        x-text={`${percent}%`}
      >
        {data}
      </span>
    </div>
  );
};

const TIMER_DURATION = 300;
const END_TIMER = 0;

export default function TransactionEnquiry({}: Props) {
  let navigate = useNavigate();
  const payment_id = new window.URLSearchParams(window.location.search).get(
    'payment_id'
  );
  const { data } = useEnquireTransactionQuery(
    { payment_id: payment_id },
    { skip: !payment_id, pollingInterval: 9000 }
  );
  const [timer, setTimer] = useState<number>(TIMER_DURATION);

if (data) {
  if (data?.pg_data?.status === 'success') {
    navigate('/payment-success');
  } else if (
    data?.pg_data?.status === 'failure' ||
    data?.pg_data?.status !== 'Initiated' ||
    timer === END_TIMER
  ) {
    navigate('/payment-summary');
  }
}

  useEffect(() => {
    if (timer && timer !== END_TIMER) {
      let tempTimer = setInterval(() => setTimer(timer - 1), 1000);
      return function cleanup() {
        clearInterval(tempTimer);
      };
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // TiggerFBPaymentInfoEvent();
    // TiggerGAPaymentInfoEvent();
  }, []);

  const radius = 40;
  return (
    <Layout>
      <main className="py-24 lg:py-28">
        <div className="text-center p-5 my-5 lg:my-10 lg:w-[425px] lg:mx-auto">
          <ProgressCircle
            radius={radius}
            percent={(timer / TIMER_DURATION) * 100}
            data={getTimeFromSec(timer)}
          />
          <p className="text-lg font-bold mb-6">Processing your Payment</p>
          <div className="shadow-lg rounded p-4 py-6 mb-8">
            <div className="grid grid-cols-12 gap-2 mb-6">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/upi-app.svg"
                alt="Phone"
              />
              <div className="col-span-11">
                <p className="text-xs text-left">
                  Open your UPI app and approve payment from Cordelia cruises
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-6">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                alt="Phone"
              />
              <div className="col-span-11">
                <p className="text-xs text-left">
                Complete the payment by selecting the bank and entering UPI PIN
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 ">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/do-not-icon.svg"
                alt="Phone"
              />
              <div className="col-span-11">
                <p className="text-xs text-left">
                  Do not press back or close the app
                </p>
              </div>
            </div>
          </div>
            <div className="grid grid-cols-12 mb-10">
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-icon.svg"
                alt="Phone"
                className='w-4 mx-auto'
              />
              <div className="col-span-11">
                <p className="text-xs text-left">
                  If you have entered the UPI ID of friends or family, they will need to authorize the payment from their UPI App
                </p>
              </div>
            </div>
            <div>
              <p className='text-sm'>Can't pay with UPI</p>
              <p className='text-sm text-brand-primary underline cursor-pointer' onClick={()=>navigate(-1)}>Choose other payment options?</p>
            </div>
        </div>
      </main>
    </Layout>
  );
}
