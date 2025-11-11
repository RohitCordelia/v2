import React, { useEffect } from 'react'
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export default function PaymentSuccess({ }: Props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <h1 className='text-3xl font-semibold'>Annual Filing</h1>
                <p className='text-lg font-semibold mt-6 underline'>Financial Year</p>
                <div className='grid lg:grid-cols-5 gap-3 mt-3'>
                    <a href="https://images.cordeliacruises.com/static/MGT-7A.pdf#toolbar=0" target='_blank' className='bg-brand-primary px-10 py-2.5 w-2/3 lg:w-full text-center text-white text-lg font-semibold rounded'>FY 2020-2021</a>
                    <a href="https://images.cordeliacruises.com/static/FormMGT-7-2022.pdf#toolbar=0" target='_blank' className='bg-brand-primary px-10 py-2.5 w-2/3 lg:w-full text-center text-white text-lg font-semibold rounded'>FY 2021-2022</a>
                    <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/FormMGT-2023.pdf#toolbar=0" target='_blank' className='bg-brand-primary px-10 py-2.5 w-2/3 lg:w-full text-center text-white text-lg font-semibold rounded'>FY 2022-2023</a>
                    <a href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/form-MGT-7-FY-23-24.pdf#toolbar=0" target='_blank' className='bg-brand-primary px-10 py-2.5 w-2/3 lg:w-full text-center text-white text-lg font-semibold rounded'>FY 2023-2024</a>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}