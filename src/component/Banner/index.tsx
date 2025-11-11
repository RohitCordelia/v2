import React, { useEffect, useState, useRef } from 'react';
import "./index.css"
import "./slick-customized.css"
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';

const ReactPlayer = React.lazy(() => import("react-player/youtube"));

const muteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/mute-new-icon.svg"
const unmuteIcon = "https://images.cordeliacruises.com/cordelia_v2/public/assets/volume-new-icon.svg"

type Props = {
    banners: any,
    mobileBanners: any,
    data: any,
    clickable: any,
};

interface SliderRefType {
    slickGoTo: (index: number) => void;
    slickNext: () => void;
    slickPlay: () => void;
    slickPause: () => void;
}


const CircleProgressBar = ({ totalTime, currentTime, isVideoPlaying, isPlaying, pauseEvent }: any) => {
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        if (totalTime) {
            const percentage = ((currentTime) / totalTime) * 100;
            setProgressPercentage(percentage);
        } else {
            setProgressPercentage(0);
        }
    })

    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className='relative cursor-pointer' onClick={() => pauseEvent()}>
            <svg
                className='h-[40px] w-[40px] lg:h-[47px] lg:w-[47px]'
                viewBox="0 0 47 47"
            >
                <circle
                    r={radius}
                    cx={23.5}
                    cy={23.5}
                    fill="#000000a3"
                    strokeWidth={3}
                />
                <circle
                    r={radius}
                    cx={23.5}
                    cy={23.5}
                    fill="transparent"
                    stroke="#fff"
                    strokeWidth={3}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progressPercentage / 100) * circumference}
                    strokeLinecap="round"
                // transform="rotate(-90 23.5 23.5)"
                />
            </svg>
            <div className='absolute' style={{
                top: '50%',
                left: '50%',
                margin: 'auto',
                transform: 'translate(-50%, -50%)'
            }}>
                <img
                    className="h-[10px] lg:h-[15px]"
                    src={`${isPlaying ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/pause-icon.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/play-icon.svg'}`}
                />
            </div>
        </div>
    );
};




const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (progress < 100) {
                setProgress(prevWidth => prevWidth + 22.2);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [progress]);

    return (
        <div>
            <div className='w-full h-[7px] lg:h-[9px]' style={{
                backgroundColor: '#ccc',
                marginTop: '2px',
                borderRadius: '5px',
                textAlign: 'left',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#93288e',
                    transition: 'width 1s linear',
                    borderRadius: '5px',
                }}></div>
            </div>
        </div>
    );
};


export default function Banner({
    data: {
        title = "",
        images = "",
        mobileImages = "",
        altTag = "",
        titleTag = ""
    },
    clickable = true
}: Props) {
    let navigate = useNavigate();
    const location = useLocation();
    const sliderRef = useRef<SliderRefType | null>(null);

    const playerRef = useRef();

    const [bannerIndex, setBannerIndex] = useState<any>(0);
    const [activeBanner, setActiveBanner] = useState<any>();
    const [isMute, setIsMute] = useState<any>(true);
    const [isVideoReady, setIsVideoReady] = useState<any>(false);
    const [bannerImage, setBannerImage] = useState<any>({});
    const [isPlaying, setIsPlaying] = useState<any>(true);
    const [isPlay, setIsPlay] = useState(false);
    const [currentDuration, setCurrentDuration] = useState(0);

    const SamplePrevArrow = (props: any) => {
        const { className, style, onClick, currentSlide } = props;
        return (
            <div onClick={() => {
                currentSlide == 0 ?
                    sliderRef.current?.slickGoTo(bannerImage.length) :
                    sliderRef.current?.slickGoTo(bannerIndex - 1)
            }} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/left-arrow.svg' alt='CordeliaCruise' title='Cordelia-Cruises' />
            </div>
        )
    }

    function SampleNextArrow(props: any) {
        const { className, style, onClick, currentSlide } = props;
        return (
            <div onClick={() => {
                currentSlide == (bannerImage.length - 1) ?
                    sliderRef.current?.slickGoTo(0) :
                    sliderRef.current?.slickGoTo(bannerIndex + 1)
            }} className={`arrow ${className}`} >
                <img className='drop-shadow-xl h-4 lg:h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/right-arrow.svg' alt='Cordelia Cruises' title='Cordelia-Cruises' />
            </div>
        )
    }

    const sliderSettings = {
        infinite: false,
        slidesToShow: 1,
        speed: 300,
        dots: true,
        beforeChange: (oldIndex: any, newIndex: any) => {
            setBannerIndex(newIndex)
        },
        afterChange: (current: any) => {
            setIsVideoReady(false)
            sliderRef.current?.slickPlay()
            setCurrentDuration(0)
        },
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
        customPaging: function (index: any) {
            const slide = bannerImage[index];
            if (slide.type === 'image') {
                return (
                    <div>
                        {index == bannerIndex ?
                            <ProgressBar />
                            :
                            <div
                                className='h-[7px] lg:h-[9px] w-[7px] lg:w-[9px]'
                                style={{
                                    marginTop: 2,
                                    borderRadius: '50%',
                                    background: index == bannerIndex ? '#93288e' : '#ccc',
                                    cursor: 'pointer',
                                }}
                            />
                        }

                    </div>
                );
            } else if (slide.type === 'video') {
                return (
                    <img className='w-[9px] lg:w-[11px]' src={`${index == bannerIndex ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/play-dot-purple-icon.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/play-dot-icon.svg'}`} alt="" />
                );
            }
        },
    };

    // useEffect(() => {
    //     if (window.innerWidth > 640) {
    //         setBannerImage(images)
    //     } else {
    //         setBannerImage(mobileImages)
    //     }
    // }, [])

    useEffect(() => {
        let filterBanner =  window.innerWidth > 640 ? images : mobileImages
        if (filterBanner && filterBanner.length) {
            // const filtered = filterBanner.filter((image: any) => {
            //     if (image.startTime && image.endTime) {
            //         return moment().format("HH:mm") > image.startTime && moment().format("hh:mm A") < image.endTime;
            //     }
            //     return true;
            // })
            // console.log('roh sadasdas', filtered);

            const filtered = filterBanner.filter((image: any) => {
                if (image.startTime && image.endTime) {
                    // Parse startTime, endTime, and currentTime
                    const startTime = moment(image.startTime, "hh:mm A");
                    const endTime = moment(image.endTime, "hh:mm A");
                    const currentTime = moment();
            
                    // Handle midnight crossover
                    if (endTime.isBefore(startTime)) {
                        return (
                            currentTime.isBetween(startTime, moment("11:59 PM", "hh:mm A"), undefined, "[)") ||
                            currentTime.isBetween(moment("12:00 AM", "hh:mm A"), endTime, undefined, "[)")
                        );
                    } else {
                        return currentTime.isBetween(startTime, endTime, undefined, "[)");
                    }
                }
                return true; // If no startTime or endTime, include the image
            });
            setBannerImage(filtered)
        }
    }, [])

    useEffect(() => {
        if (bannerImage[bannerIndex]) {
            setActiveBanner(bannerImage[bannerIndex])
            if (bannerImage[bannerIndex].type == 'video') {
                setTimeout(() => {
                    sliderRef.current.slickPause()
                }, 1000);
            } else {
                sliderRef.current.slickPlay()
            }
        }
    }, [bannerIndex, bannerImage])

    const toggelMute = () => {
        setIsMute((current: any) => !current)
    }

    const getDuration = playerRef?.current?.getDuration()

    useEffect(() => {
        let timeoutId: any;

        if (bannerIndex === bannerImage.length - 1) {
            timeoutId = setTimeout(() => {
                sliderRef.current?.slickGoTo(0);
            }, 4500);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId); // Clear the timeout if bannerIndex changes before it executes
            }
        };
    }, [bannerIndex, bannerImage.length])

    return (
        <>
            <div className="mt-0 homepage-banner">
                <Slider
                    ref={sliderRef}
                    arrows={window.innerWidth > 640 ? true : false}
                    autoplay={true}
                    autoplaySpeed={4500}
                    pauseOnHover={false}
                    {...sliderSettings}
                    className={
                        "bannerCarouselSlider packagesCardSlider"
                    }
                >
                    {bannerImage && bannerImage.length && bannerImage.map((slide: any, index: any) => {
                        let redirectLink = ''
                        if(slide.url.toLowerCase().includes("calling")){
                            if(window.innerWidth > 720){
                                redirectLink = slide.link
                            }else{
                                redirectLink = 'tel:022-65545475';
                            }
                        }else{
                            redirectLink = slide.link
                        }
                        return (
                            <div key={index} className='relative'>
                                {slide.type === 'image' ? (
                                    <a href={redirectLink} className={`${clickable ? 'cursor-pointer' : 'cursor-default'}`}>
                                        <div
                                            className='absolute top-0 left-0 w-full h-full'
                                            style={location.pathname === "/upcoming-cruises" ? {} : {
                                                // background: 'linear-gradient(rgb(0 0 0 / 90%) 0%, rgba(9, 9, 121, 0) 40%, rgba(0, 212, 255, 0) 100%)'
                                            }}
                                        />
                                        <img src={slide.url} alt={altTag} title={titleTag} />
                                    </a>
                                ) : slide.type === 'video' && slide.url == activeBanner?.url ? (
                                    <div className="aspect-video-custom relative top-0">
                                        {!isVideoReady &&
                                            <div className='absolute top-0'>
                                                <img src={slide.thumbnail} alt="" />
                                            </div>
                                        }
                                        <ReactPlayer
                                            ref={playerRef}
                                            volume={1}
                                            url={slide.url}
                                            width="100%"
                                            height="100%"
                                            controls={false}
                                            muted={isMute}
                                            onPlay={() => {
                                                setIsPlay(true)
                                                setIsVideoReady(true);
                                                sliderRef.current?.slickPause()
                                            }}
                                            onEnded={() => {
                                                sliderRef.current?.slickNext();
                                                sliderRef.current?.slickPlay()
                                            }}
                                            playing={isPlaying}
                                            playsinline
                                            progressInterval={1000}
                                            onProgress={(progress: any) => {
                                                let time = Math.floor(progress.playedSeconds)
                                                if (currentDuration < time) {
                                                    setCurrentDuration(time)
                                                }
                                            }}
                                            onPause={() => setIsPlay(false)}
                                        />
                                        <div
                                            onClick={() => slide.link ? navigate('/upcoming-cruises?port=Chennai') : null}
                                            className='absolute top-0 left-0 w-full h-full'
                                            style={{
                                                background: 'linear-gradient(rgb(0 0 0 / 90%) 0%, rgba(9, 9, 121, 0) 40%, rgba(0, 212, 255, 0) 100%)'
                                            }}
                                        />
                                        <div className='absolute bottom-5 lg:bottom-[5rem] right-3 lg:right-[10rem] flex items-center'>
                                            <div>
                                                <img
                                                    onClick={toggelMute}
                                                    className={`ml-5 h-8 lg:h-10`}
                                                    src={isMute ? muteIcon : unmuteIcon}
                                                />
                                            </div>
                                        </div>
                                        <div className='absolute bottom-3 lg:bottom-[5rem] left-3 lg:left-[10rem] flex items-center'>
                                            <div>
                                                <CircleProgressBar totalTime={getDuration} currentTime={currentDuration} isVideoPlaying={isPlay} isPlaying={isPlaying} pauseEvent={() => setIsPlaying(!isPlaying)} />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        )
                    })}
                </Slider>
                <div className="container mx-auto lg:my-10 my-6 px-4 lg:px-0">
                    <h1 className='text-2xl lg:text-4xl font-semibold'>{title}</h1>
                </div>
            </div>
        </>
    );
}
