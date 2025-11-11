import React from 'react';
type Props = {
    content: {
        comment:string;
        user: string;
        location: string;
        image: string;
    };
};

export default function TestimonialsCard({
    content: {
        comment = '',
        user = '',
        location = '',
        image = ''
      }
    }: Props) {
    
    return (
            <div className="bg-white mb-2 px-4 py-8 lg:mx-2 shadow-lg rounded-sm flex flex-col justify-between">
                <div className='flex mb-2'>
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                        className="h-4 mr-1"
                        alt="Rating"
                    />
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                        className="h-4 mr-1"
                        alt="Rating"
                    />
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                        className="h-4 mr-1"
                        alt="Rating"
                    />
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-color.svg"
                        className="h-4 mr-1"
                        alt="Rating"
                    />
                    <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/testimonial-star-grey.svg"
                        className="h-4 mr-1"
                        alt="Rating"
                    />
                </div>
                <p className='text-xs lg:text-lg lg:leading-8 font-semibold text-gray-700 leading-5'>{comment}</p>
                <div className="flex items-center justify-row mt-3">
                    <div>
                        <img
                            src={image}
                            className="h-12 lg:h-16 mr-3 rounded-full"
                            alt="User Image"
                            loading="lazy"
                        />
                    </div>
                    <div className='col-span-3'>
                        <h1 className='text-md lg:text-2xl font-semibold'>{user}</h1>
                        <p className='text-xxs lg:text-lg font-semibold text-brand-primary'>{location}</p>
                    </div>
                </div>
            </div>
    );
}
