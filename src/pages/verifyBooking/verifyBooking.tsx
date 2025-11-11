import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../src/components/Layout';
import { useVerifyBookingQuery } from '../../../src/services/auth/auth';

type Props = {};

export default function VerifyBooking({ }: Props) {
  let navigate = useNavigate();
  const token = new window.URLSearchParams(window.location.search).get('token');
  const bookingNumber = new window.URLSearchParams(window.location.search).get(
    'number'
  );
  const { data, isError } = useVerifyBookingQuery(
    { number: bookingNumber, token: token },
    { skip: !token || !bookingNumber }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <main className="py-24 lg:py-28">
        <div className="text-center p-5 my-5 lg:my-10 lg:w-[425px] lg:mx-auto">
          {isError && (
            <>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/do-not-icon.svg"
                alt="Success"
                className="h-14 inline-block"
              />
              <p className="text-2xl font-bold mb-6 mt-4">
                Failed
              </p>
              <p className='text-sm'>
                {data?.message}
              </p>
            </>
          )}
          {data && (
            <>
              <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/complete-upi-icon.svg"
                alt="Success"
                className="h-14 inline-block"
              />
              <h1 className="text-2xl font-bold mb-6 mt-4">
                Request Approved
              </h1>
              <p className='text-sm'>
                {data?.message}
              </p>
            </>
          )}
          {/* <div className="grid grid-cols-12 mb-10">
            <img
              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-icon.svg"
              alt="Phone"
              className="w-4 mx-auto"
            />
            <div className="col-span-11">
              <p className="text-xs text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div> */}
        </div>
      </main>
    </Layout>
  );
}
