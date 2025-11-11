import React from 'react';
import Slider from 'react-slick';
import "./index.css";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';

const OurFleet = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    };

    const cruiseShips = [
        {
            name: 'Cordelia Sky',
            description: "Welcome aboard Sky, where energy and elegance combine. From vibrant entertainment to stunning open decks, adventure and indulgence await at every turn.",
            images: [
                {
                    webUrl: 'http://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-sky-cruise-web-01.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/OurCruise_Sky1.webp',
                    alt: 'Cordelia Sky'
                },
                {
                    webUrl: 'http://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-sky-cruise-web-02.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/OurCruise_Sky2.webp',
                    alt: 'Cordelia Sky'
                },
                {
                    webUrl: 'http://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-sky-cruise-web-04.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/OurCruise_Sky4.webp',
                    alt: 'Cordelia Sky'
                },
                {
                    webUrl: 'http://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-sky-cruise-web-03.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/OurCruise_Sky3.webp',
                    alt: 'Cordelia Sky'
                },
            ],
            link: '/cordelia-sky',
        },
        {
            name: 'Cordelia Sun',
            description: "Welcome aboard Sun, where relaxation meets excitement. Enjoy vibrant entertainment, stunning ocean views, and delicious cuisine, all while soaking in the sun and embracing adventure at every turn.",
            images: [
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Homepage_OurCruises_01_Web.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_OurCruise_Sun1.webp',
                    alt: 'Cordelia Sun'
                },
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Homepage_OurCruises_02_Web.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_OurCruise_Sun2.webp',
                    alt: 'Cordelia Sun'
                },
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Homepage_OurCruises_03_Web.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_OurCruise_Sun3.webp',
                    alt: 'Cordelia Sun'
                },
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Sun_Homepage_OurCruises_04_Web.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/Final_OurCruise_Sun4.webp',
                    alt: 'Cordelia Sun'
                },
            ],
            link: '/cordelia-sun',
        },
        {
            name: 'Cordelia Empress',
            description: "Step aboard Empress, where elegance meets comfort. Enjoy breathtaking sky decks, spacious lounges, and world-class hospitality, making every moment unforgettable.",
            images: [
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-web-01.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-mobile-01.webp',
                    alt: 'Cordelia Empress'
                },
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-web-02.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-mobile-02.webp',
                    alt: 'Cordelia Empress'
                },
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-web-03.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-mobile-03.webp',
                    alt: 'Cordelia Empress'
                },
                {
                    webUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-web-04.webp',
                    mobileUrl: 'https://images.cordeliacruises.com/cordelia_v2/public/images/our-fleet-empress-cruise-mobile-04.webp',
                    alt: 'Cordelia Empress'
                },
            ],
            link: '/cordelia-empress',
        },
    ]

    const navigate = useNavigate();

    return (
        <div className='px-4'>
            <div className='container mx-auto'>
                <div className='text-center'>
                    <h1 className='text-2xl lg:text-4xl lg:font-medium leading-7'>Meet the Fleet</h1>
                    <p className='lg:text-lg text-sm lg:leading-7 mt-4 lg:mb-16 lg:mt-5 lg:w-[90%] w-full lg:mx-auto'>
                        The Empress, the Sky and the Sun take you beyond the horizon, offering incredible journeys across India and beyond. With world-class hospitality, entertainment, and breathtaking ocean views—come aboard and set sail on an adventure like never before! 
                    </p>
                </div>
                <div className='my-10 lg:flex lg:gap-4 cursor-pointer lg:cursor-auto'>
                    {cruiseShips?.map((ship) => <div className='my-5 lg:my-0 rounded-lg shadow-md lg:w-[32.3%] w-full'>
                        <div>
                            <div className='relative ourFleet'>
                                <Slider {...settings}>
                                    {ship?.images?.map((image) => <div onClick={() => navigate(`${ship?.link}`)} className='relative group h-[275px] lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-t-lg cursor-pointer'>
                                    {/* {ship?.images?.map((image) => <div onClick={() => navigate(`${ship?.link}`)} className='relative group lg:h-[180px] h-[275px] lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-t-lg cursor-pointer'> */}
                                        {/* <img src={window.innerWidth > 1024 ? image?.webUrl : image?.mobileUrl} alt={image?.alt} className='w-full h-full object-cover' /> */}
                                        <img src={image?.mobileUrl} alt={image?.alt} className='w-full h-full object-cover' />
                                    </div>)}
                                </Slider>
                                {/* New Ship Tag */}
                                {/* {ship?.name !== "Cordelia Empress" && <div className='absolute bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] py-2 lg:py-1 px-3 lg:px-2 flex items-center gap-1.5 text-xs font-bold text-white rounded-r-full top-5'>
                                    <div>
                                        <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/top-rated-icon-new.svg" alt="" />
                                    </div>
                                    <span className=''>New Cruise</span>
                                </div>} */}
                            </div>
                            <div onClick={() => window.innerWidth > 1024 ? null : navigate(`${ship?.link}`)} className='p-3'>
                                <h3 className='bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] inline-block bg-clip-text text-xl font-bold lg:text-2xl lg:font-medium leading-7 uppercase' style={{ color: "transparent" }}>{ship?.name}</h3>
                                <p className='lg:text-base text-sm lg:leading-7 mt-2 mb-4 lg:mt-3 w-full lg:mx-auto lg:ml-0'>{ship?.description}</p>
                                {/* <button onClick={() => navigate(`${ship?.link}`)} className='py-2.5 lg:py-4 px-6 lg:px-10 bg-brand-primary text-white rounded-md text-lg font-semibold lg:w-max'>Explore More</button> */}
                                <Button text="Explore More" size={window.innerWidth > 768 ? "base" : "sm"} handleClick={() => navigate(`${ship?.link}`)} />
                            </div>
                        </div>
                    </div>)}
                </div>
                {/* <div className='mt-10 lg:flex'>
                    <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:mr-[5%]'>
                        <h3 className='bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] inline-block bg-clip-text text-xl font-bold lg:text-4xl lg:font-medium leading-7' style={{ color: "transparent" }}>THE EMPRESS</h3>
                        <p className='lg:text-lg text-sm lg:leading-7 my-4 lg:mt-5 lg:w-[90%] w-full lg:mx-auto lg:ml-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <button onClick={() => navigate(`/the-empress`)} className='py-2.5 lg:py-4 px-6 lg:px-10 bg-brand-primary text-white rounded-md text-lg font-semibold lg:w-max'>Explore More</button>
                    </div>
                    <div className='mt-5 lg:mt-0 ourFleet lg:w-1/2'>
                        <Slider {...settings}>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://s3-alpha-sig.figma.com/img/1315/6579/ebc39d76de30e219c7d01ef3e569098e?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pXrSb-NyeoND72nhPxl1NwbLSj312Q37Ncy~4W5N~cCVVmCwLP7oYDA5tGnEt~F4uEAqEZdGxzMB3p70JwGa6Tbg1wt2YEzzed-gfcsyCTRrdz6mwboKNBJNod4iha1dyYr5nkLF~e4wADMgH9QBW6SWS1Olys5KyV35rPuq07YNEK3PVL387UPnvW6YjUQVCJsEOa9VlPqlu1D4MLu3L2noqUQ0UwEVJmnSVySyHWhc7dFJEbqe0wiyK9SMx6n0HT1cWY9~euweaciJWnTkNUzuknFeryxj8xhfbN~gwIUI6RPUIrrlw-TgqIdsUjvQlQnZ1Hi0f7yqhrGXX6bm7Q__"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/goa-image.webp"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp"} className='w-full h-full object-cover' />
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className='mt-10 lg:mt-14 lg:flex lg:flex-row-reverse'>
                    <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:ml-[5%]'>
                        <h3 className='bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] inline-block bg-clip-text text-xl font-bold lg:text-4xl lg:font-medium leading-7' style={{ color: "transparent" }}>THE SKY</h3>
                        <p className='lg:text-lg text-sm lg:leading-7 my-4 lg:mt-5 lg:w-[90%] w-full lg:mx-auto lg:ml-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <button onClick={() => navigate(`/the-sky`)} className='py-2.5 lg:py-4 px-6 lg:px-10 bg-brand-primary text-white rounded-md text-lg font-semibold lg:w-max'>Explore More</button>
                    </div>
                    <div className='relative mt-5 lg:mt-0 ourFleet lg:w-1/2'>
                        <Slider {...settings}>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://s3-alpha-sig.figma.com/img/1ac3/4470/ce971e61ba40b0a3e5e88d46bd1d94a9?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XqlbWSrWeW0JpMrrG8sA7L96xCTbG49pYpR1gIKckGVROtOqjwVkOMxXO39qit2jmgaH8mXdcJsMCfTTUylSui-p9sDOhg4rGoAfWB03fSJYuV0wuuY-Vyh~7C0gvgjlpNWbbl9kGX7Vb0-LANpRu7giitzM1Ig4Owf87snY4qVnonWRWgelI~8LnUGbU0OFa6hdr1k7LSiCxQKOMvjOuUNOa1k8NYzxhjQRxiuvxduBZ8xXeNbgd0ZbtjlkKNuy5LRP9CMWrZ3TAjuxziPj8ivnnv87MCbHlFsUSdvs7YLOPpC4iUmNm9q9Oe3Cd5qYOkOAHM0bFUKWbEeo-Oysfw__"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/goa-image.webp"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp"} className='w-full h-full object-cover' />
                            </div>
                        </Slider>
                        <div className='absolute bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] py-2 px-3 flex items-center gap-1.5 text-xs lg:text-sm font-bold text-white rounded-r-full top-5 lg:top-7'>
                            <div>
                                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/top-rated-icon-new.svg" alt="" />
                            </div>
                            <span className=''>New Fleet</span>
                        </div>
                    </div>
                </div>
                <div className='mt-10 lg:mt-14 lg:flex'>
                    <div className='lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:mr-[5%]'>
                        <h3 className='bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] inline-block bg-clip-text text-xl font-bold lg:text-4xl lg:font-medium leading-7' style={{ color: "transparent" }}>THE SUN</h3>
                        <p className='lg:text-lg text-sm lg:leading-7 my-4 lg:mt-5 lg:w-[90%] w-full lg:mx-auto lg:ml-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <button onClick={() => navigate(`/the-sun`)} className='py-2.5 lg:py-4 px-6 lg:px-10 bg-brand-primary text-white rounded-md text-lg font-semibold lg:w-max'>Explore More</button>
                    </div>
                    <div className='relative mt-5 lg:mt-0 ourFleet lg:w-1/2'>
                        <Slider {...settings}>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://s3-alpha-sig.figma.com/img/5855/8854/2e191b54d5759c592f06ceca18eec98b?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PcVKGceR6At6XvATXbCKjs0NtdEsyd9FDEVn1bpjY8jkg1g3IlrvCOyDspKceurwANRUhoxFWvDjX5FdYnlsBW8ITnqlqWV8gbfNdSS9Xh6Us1aLNoKDy5H66qUvCUD8a7aeu7p5ak57QsiR8LUrhHgJ6e1f95SLTmee3ur2Wsctw4mQU7JJp06BvKrNdKsob51mL-Ed6vhZgIO7Q1gE7xrOGAmsVDG8lyAvJqeEXF3PludHZfKfdQ3QXriQOSmbb~4lCbpl51py2Mn~sNDuET6mgKL8VYpJ34RJ9C39idTWN9neo968vQ2HrGzp5i5BMWzLXx9Um4hmfDIAKARvkA__"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/goa-image.webp"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp"} className='w-full h-full object-cover' />
                            </div>
                            <div className='relative group h-[275px] lg:h-auto lg:aspect-[2/1.6] text-center text-white overflow-hidden rounded-lg'>
                                <img src={"https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-image.webp"} className='w-full h-full object-cover' />
                            </div>
                        </Slider>
                        <div className='absolute bg-gradient-to-r from-[#EA725B] via-[#D1527D] to-[#92278F] py-2 px-3 flex items-center gap-1.5 text-xs lg:text-sm font-bold text-white rounded-r-full top-5 lg:top-7'>
                            <div>
                                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/top-rated-icon-new.svg" alt="" />
                            </div>
                            <span className=''>New Fleet</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default OurFleet