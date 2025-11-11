import React from 'react';
import TestimonialsCard from './testimonialsCard';
import "./index.css"
type Props = {
    data: any
};

export default function Testimonials(data: Props) {
    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    let totalTestimonial = 0
    if (width && width >= 640) {
        totalTestimonial = 3
    } else {
        totalTestimonial = 2
    }
    return (
        <section className='bg-section px-3 pt-14 pb-24 lg:pt-32 lg:pb-36 xl:pb-60 mt-8 lg:mt-14 relative'>
            <img
                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonal-boat-image.svg"
                className="absolute right-28 top-4 lg:hidden"
                alt="Rating"
            />

            <div className='container mx-auto'>
                <h1 className='text-xl lg:text-4xl mb-2 text-white'>Testimonials</h1>
                <p className='text-xs leading-5 lg:text-base mb-5 text-white'>What our customers are saying about us</p>
                <div className='grid lg:grid-cols-3'>
                    {data.data.slice(0, totalTestimonial).map((val: any, i: number) =>
                        <TestimonialsCard key={i} content={val} />
                    )}
                </div>
            </div>
        </section>
    );
}
