import React, { Suspense, useEffect, useState } from "react";
import { Layout } from '../../../src/components/Layout';
import { saveRefUrl } from "../../../src/utils/user/user";
import "./index.css"
import { useNavigate, useLocation } from 'react-router-dom';
import contentOfLanding from "./landing.json"
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginModal from '../../component/Login';
import { GetAuth, SaveAB, GetAB, SaveAuth } from '../../utils/store/store';
import LeadGenForm from "../../components/UI/LeadForm";

type Props = {};

function formatDate(inputDate: any) {
  if (!inputDate) return 'Invalid Date';

  const [day, month, year] = inputDate.split('/');
  const date = new Date(`${year}-${month}-${day}`);

  if (isNaN(date.getTime())) return 'Invalid Date';

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNum = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const yearShort = `${date.getFullYear().toString().slice(-2)}`

  const suffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${monthName} ${dayNum}${suffix(dayNum)} ${yearShort}`;
}

function formatEndDate(inputDate: any) {
  if (!inputDate) return 'Invalid Date';

  const [day, month, year] = inputDate.split('/');
  const date = new Date(`${year}-${month}-${day}`);

  if (isNaN(date.getTime())) return 'Invalid Date';

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNum = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const yearShort = `${date.getFullYear().toString().slice(-2)}`

  const suffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${monthName} ${dayNum}${suffix(dayNum)} ${yearShort}`;
}

export default function Home(props: Props) {
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  const [nonExclusiveData, setNonExclusiveData] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [upcomingData, setUpcomingData] = useState([]);
  const AUTH = GetAuth();
  const [showPrice, setShowPrice] = useState<boolean>(true);

  const [upcomingCode, setUpcomingCode] = useState('')
  const [showCode, setShowCode] = useState('')

  const [selectedItinerary, setSelectedItinerary] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const { title, sub_title } = contentOfLanding.destination;
  const [randomPlaces, setRandomPlaces] = useState([]);
  const [nonExclusiveShoreExpand, setNonExclusiveShoreExpand] = useState<number[]>([]);
  const [exclusiveShoreExpand, setExclusiveShoreExpand] = useState<number[]>([]);
  const { landingType } = useParams();
  const [selectedLanding, setSelectedLanding] = useState(contentOfLanding["Landing"]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/v2/shore_excursions?port_codes=${showCode}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      const exclusive = result?.shore_excursions?.filter((item: { exclusive: boolean; }) => item.exclusive === true);
      const nonExclusive = result?.shore_excursions?.filter((item: { exclusive: boolean; }) => item.exclusive !== true);
      setData(exclusive);
      setNonExclusiveData(nonExclusive);
    } catch (err) {
      console.log(err, "Error");
    }
  }

  useEffect(() => {
    if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {
      setShowPrice(true)
    } else {
      setShowPrice(false)
    }
  })

  const getMatchedSet = (data: any, linkToRemove: any) => {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        const index = value.findIndex(item => item.link === linkToRemove);
        if (index !== -1) {
          const updatedSet = [...value];
          updatedSet.splice(index, 1);
          return updatedSet;
        }
      }
    }
    return [];
  };

  useEffect(() => {
    const pathName = window.location.pathname;
    const des = contentOfLanding?.destination;

    const matchedSet: any = getMatchedSet(des, pathName);

    if (matchedSet.length > 2) {
      const shuffled: any = [...matchedSet].sort(() => Math.random() - 0.5);
      setRandomPlaces(shuffled.slice(0, 2));
    } else {
      setRandomPlaces(matchedSet);
    }
  }, [])

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName === '/srilanka/jaffna') {
      setUpcomingCode('jaffna')
      setShowCode('KNK')
    } else if (pathName === '/srilanka/hambantota') {
      setUpcomingCode('hambantota')
      setShowCode('HAM')
    } else if (pathName === '/srilanka/trincomalee') {
      setUpcomingCode('trincomalee')
      setShowCode('TRR')
    } else if (pathName === '/thailand/phuket') {
      setUpcomingCode('PHUKET')
      setShowCode('PHK')
    } else if (pathName === '/malaysia/kuala-lumpur') {
      setUpcomingCode('KUALA LUMPUR')
      setShowCode('KLUM')
    } else if (pathName === '/malaysia/langkawi') {
      setUpcomingCode('LANGKAWI')
      setShowCode('LAN')
    } else if (pathName === '/singapore') {
      setUpcomingCode('SINGAPORE')
      setShowCode('SING')
    }
  }, [])

  useEffect(() => {
    if (window.location.pathname == '/srilanka/hambantota') {
      setSelectedLanding(contentOfLanding["hambantota"]);
    } else if (window.location.pathname == '/srilanka/trincomalee') {
      setSelectedLanding(contentOfLanding["trincomalee"]);
    } else if (window.location.pathname == '/srilanka/jaffna') {
      setSelectedLanding(contentOfLanding["jaffna"]);
    } else if (window.location.pathname == '/thailand/phuket') {
      setSelectedLanding(contentOfLanding["phuket"]);
    } else if (window.location.pathname == '/malaysia/kuala-lumpur') {
      setSelectedLanding(contentOfLanding["kuala_lumpur"]);
    } else if (window.location.pathname == '/malaysia/langkawi') {
      setSelectedLanding(contentOfLanding["langkawi"]);
    } else if (window.location.pathname == '/singapore') {
      setSelectedLanding(contentOfLanding["singapore"]);
    }
  }, [landingType]);

  useEffect(() => {
    if (showCode) {
      fetchData();
    }
  }, [showCode]);


  const fetchUpcomingData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/v2/itineraries?pagination=false`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      const filterResult = result.itineraries.filter((item: any) =>
        item.ports.some((text: any) => text.name.toUpperCase() === upcomingCode.toUpperCase())
      );
      setUpcomingData(filterResult);
    } catch (err) {
      console.log(err, "Error");
    }
  };

  useEffect(() => {
    if (upcomingCode) {
      fetchUpcomingData();
    }
  }, [upcomingCode]);

  const SamplePrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} >
        <img className='drop-shadow-xl h-4 lg:h-8 rotate-90 ' src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt="Previous" />
      </div>
    );
  };

  const SampleNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`} >
        <img className='drop-shadow-xl h-4 lg:h-8 -rotate-90 ' src='https://www.cordeliacruises.com/assets/icons/footer/chevon-down-black.svg' alt="Next" />
      </div>
    );
  };

  const [setting, setSetting] = useState<any>();
  const [shoreSetting, setShoreSetting] = useState<any>();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const shoreSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const sliderSettings = {
    className: "center",
    centerMode: true,
    centerPadding: "20px",
    autoplaySpeed: 5000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  useEffect(() => {
    const updateSettings = () => {
      window.innerWidth > 640 ? setSetting(settings) : setSetting(sliderSettings);
      window.innerWidth > 640 ? setShoreSetting(shoreSettings) : setShoreSetting(sliderSettings);
    };
    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  useEffect(() => {
    saveRefUrl(window.location.href)
  }, [])

  const nonExclusiveShoreToggleExpand = (index: number) => {
    setNonExclusiveShoreExpand((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const exclusiveShoreToggleExpand = (index: number) => {
    setExclusiveShoreExpand((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onLogin = (itinerary_id: any) => {
    setSelectedItinerary(itinerary_id)
    setShowLoginModal(true)
  }

  const onLoginModalClose = () => {
    setShowLoginModal(false)
    if (AUTH?.token && AUTH.exp > Math.round(+new Date() / 1000)) {
      navigate(`/upcoming-cruises/itinerary?id=${selectedItinerary}`)
    }
  }

  return (
    <Layout>
      <section className="">
        <section>
          <div className="lg:block hidden" >
            <img className="lg:mt-[70px]"
              src={selectedLanding?.banner}
            />
          </div>

          <div className="lg:hidden block " >
            <img className="lg:mt-[83px]"
              src={selectedLanding?.mobile_banner}
            />
          </div>
        </section>
      </section>

      <section className="mt-10 mb-7">
        <LeadGenForm page_code={selectedLanding?.pageCode} />
      </section>

      <section>
        <div className="lg:flex lg:flex-col bg-white text-black p-6 lg:max-w-8xl lg:mx-44 mx-auto">
          <div className="lg:flex lg:flex-row items-center gap-6 lg:max-w-8xl">
            <div className="lg:w-1/2">
              <h1 className="text-xl lg:text-[40px] font-bold mb-4 leading-7 lg:leading-[3.5rem]">
                {selectedLanding?.info_section?.title}
              </h1>
            </div>
            <div className="lg:w-1/2 text-left">
              <p className="text-sm lg:text-[18px] leading-6 lg:leading-8 text-gray-700">
                {selectedLanding?.info_section?.sub_title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="lg:block hidden">
          <img
            src={selectedLanding?.bannerImage?.image}
            alt="Trincomalee Landscape"
            className="lg:w-[100%] shadow-lg"
          />
        </div>

        <div className="lg:hidden block ">
          <img
            src={selectedLanding?.bannerImage?.mobile_image}
            alt="Trincomalee Landscape"
            className="lg:w-[100%] shadow-lg"
          />
        </div>
      </section>

      <section>
        <div className="lg:block hidden lg:mx-44 p-6">
          <div className="px-4 lg:px-8 rounded">
            {selectedLanding?.short_section?.map((item, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center my-10">
                {index % 2 === 0 ? (
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="w-full">
                      <p className="text-lg lg:text-[34px] font-bold mt-2 font-playfairDisplay leading-tight">{item?.title}</p>
                      <p className="text-xxs lg:text-[18px] font-extralight leading-5 lg:leading-7 mt-2 lg:mt-4 text-gray-700">
                        {item?.sub_title}
                      </p>
                    </div>
                    <div className="w-full">
                      <img className="h-[190px] lg:h-full w-full rounded-xl"
                        src={item?.image}
                        alt=""
                        onClick={() => setSelectedImage(item?.image)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="w-full">
                      <img className="h-[190px] lg:h-full w-full rounded-xl"
                        src={item?.image}
                        alt=""
                        onClick={() => setSelectedImage(item?.image)}
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-lg lg:text-[34px] font-bold mt-2 font-playfairDisplay leading-tight">{item?.title}</p>
                      <p className="text-xxs lg:text-[18px] font-extralight leading-5 lg:leading-7 mt-2 lg:mt-4 text-gray-700">
                        {item?.sub_title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="lg:hidden block lg:mx-44 px-6 pt-6">
          <div className="px-4 lg:px-8 py-4 lg:py-8 rounded">
            {selectedLanding?.short_section?.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                <div className="col-span-5 lg:col-span-3">
                  <p className="text-lg lg:text-xl font-semibold mt-2">{item?.title}</p>
                  <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4 text-gray-700">
                    {item?.sub_title}
                  </p>
                </div>
                <div className="col-span-5 lg:col-span-2">
                  <img className="h-[190px] lg:h-full w-full"
                    src={item?.mobile_image}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="relative w-full">
          <div className="lg:block hidden" >
            <img
              src={selectedLanding?.backGround_section?.image}
              alt="Trincomalee Landscape"
              className="w-full lg:h-[400px] object-cover shadow-lg"
            />
          </div>
          <div className="lg:hidden block " >
            <img
              src={selectedLanding?.backGround_section?.mobile_image}
              alt="Trincomalee Landscape"
              className="w-full h-[400px] object-cover shadow-lg"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-70 p-4 rounded-lg">
            <h1 className="text-2xl lg:text-[34px] font-bold">{selectedLanding?.backGround_section?.title}</h1>
            <p className="text-sm lg:text-[18px] leading-6 lg:leading-7 max-w-5xl mt-4">{selectedLanding?.backGround_section?.sub_title}
            </p>
          </div>
        </div>
      </section>

      {selectedLanding?.another_section && selectedLanding?.another_section.length ?
        <>
          <section>
            <div className="lg:block hidden lg:mx-44 p-6">
              <div className="px-4 lg:px-8 rounded">
                {selectedLanding?.another_section?.map((item: any, index: any) => (
                  <div key={index} className="flex flex-col lg:flex-row items-center my-10">
                    {index % 2 === 0 ? (
                      <div className="grid grid-cols-2 gap-8 items-center">
                        <div className="w-full">
                          <p className="text-lg lg:text-[34px] font-bold mt-2 font-playfairDisplay leading-tight">{item?.title}</p>
                          <p className="text-xxs lg:text-[18px] font-extralight leading-5 lg:leading-7 mt-2 lg:mt-4 text-gray-700">
                            {item?.sub_title}
                          </p>
                        </div>
                        <div className="w-full">
                          <img className="h-[190px] lg:h-full w-full rounded-xl"
                            src={item?.image}
                            alt=""
                            onClick={() => setSelectedImage(item?.image)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-8 items-center">
                        <div className="w-full">
                          <img className="h-[190px] lg:h-full w-full rounded-xl"
                            src={item?.image}
                            alt=""
                            onClick={() => setSelectedImage(item?.image)}
                          />
                        </div>
                        <div className="w-full">
                          <p className="text-lg lg:text-[34px] font-bold mt-2 font-playfairDisplay leading-tight">{item?.title}</p>
                          <p className="text-xxs lg:text-[18px] font-extralight leading-5 lg:leading-7 mt-2 lg:mt-4 text-gray-700">
                            {item?.sub_title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section>
            <div className="lg:hidden block lg:mx-44 px-6 pt-6">
              <div className="px-4 lg:px-8 py-4 lg:py-8 rounded">
                {selectedLanding?.another_section?.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 lg:gap-6 items-center mb-6 lg:mb-10">
                    <div className="col-span-5 lg:col-span-3">
                      <p className="text-lg lg:text-xl font-semibold mt-2">{item?.title}</p>
                      <p className="text-xxs lg:text-[17px] font-extralight leading-5 lg:leading-8 mt-2 lg:mt-4 text-gray-700">
                        {item?.sub_title}
                      </p>
                    </div>
                    <div className="col-span-5 lg:col-span-2">
                      <img className="h-[190px] lg:h-full w-full"
                        src={item?.mobile_image}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
        : null
      }

      <section>
        <div className="lg:block hidden rounded-lg text-left">
          {selectedLanding?.insider_tips?.length > 0 && (
            <div className="relative w-full">
              <img
                src={selectedLanding.insider_tips[0]?.image}
                alt="Trincomalee Landscape"
                className="w-full lg:h-[400px] rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-left p-6">
                <h2 className="text-2xl font-bold lg:text-[50px]">{selectedLanding.insider_tips[0]?.main_title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 lg:w-[80%] ">
                  {selectedLanding?.insider_tips?.map((item: any, index: number) => (
                    <div key={index} className="relative p-4">
                      <h1 className="lg:text-[150px] lg:mt-[-85px] font-bold opacity-5 absolute -top-6 left-4">
                        {item?.number || index + 1}
                      </h1>
                      <p className="font-bold text-lg lg:text-[24px]">{item?.title}</p>
                      <p className="text-sm lg:text-[18px] mt-2 text-gray-800 leading-5 lg:leading-7">{item?.sub_title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="lg:hidden block text-left">
          {selectedLanding?.insider_tips?.length > 0 && (
            <div className="relative w-full h-[600px]">
              <img
                src={selectedLanding.insider_tips[0]?.mobile_image}
                alt="Trincomalee Landscape"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-center mb-6">
                  {selectedLanding.insider_tips[0]?.main_title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedLanding?.insider_tips?.map((item: any, index: number) => (
                    <div key={index} className="relative p-4 text-left">
                      <h1 className="text-8xl font-bold opacity-5 absolute -top-6 left-0">
                        {item?.number || index + 1}
                      </h1>
                      <h3 className="font-bold text-lg">{item?.title}</h3>
                      <p className="text-sm mt-2 text-gray-700">{item?.sub_title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        {data.length !== 0 ?
          <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" >
            <div className='mb-6 lg:mb-10' />
            <h1 className="text-lg lg:text-[40px] font-semibold text-center">Exclusive Shore Excursions</h1>
            <p className="text-base lg:text-xl px-8 py-2.5 font-semibold text-center bg-[#EA725B]/20 justify-self-center text-[#92278F] rounded-full mt-8 flex items-center justify-center gap-2" style={{ alignContent: 'center' }}>
              <img src="https://cordelia-images-prod.s3.ap-south-1.amazonaws.com/cordelia_v2/public/images/star1200325.svg" alt="star" className="h-6 w-6" />
              <span>Top Rated Shore Excursions</span>
            </p>
            <p className="text-center mt-4 text-sm lg:text-lg lg:w-[865px] justify-self-center text-gray-600">Experience the best of {selectedLanding?.name}, a destination where nature and history blend seamlessly.</p>
            <div className='pt-2 lg:pt-10 px-2 lg:px-28'>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {data?.map((val: any, i: number) => {
                  const isExpanded = exclusiveShoreExpand.includes(i);
                  const words = val?.description.split(" ");
                  const previewText = words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
                  return (
                    <div key={i}>
                      <div className='relative rounded mb-2 bg-white p-4 flex flex-col h-full'>
                        <div className="w-full">
                          <div className="lg:block hidden">
                            <img className='w-full h-[370px] rounded-lg'
                              alt="slide"
                              src={val?.exclusive_image_desktop}
                              onClick={() => setSelectedImage(val?.exclusive_image_desktop)}
                            />
                          </div>
                          <div className="lg:hidden block">
                            <img className='w-full h-[320px] rounded-lg'
                              alt="slide"
                              src={val?.exclusive_images_mobile}
                              onClick={() => setSelectedImage(val?.exclusive_images_mobile)}
                            />
                          </div>
                        </div>
                        <div className='mt-6 pb-[5rem] lg:pb-[6rem]'>
                          <p className='text-sm lg:text-xl font-bold uppercase text-black leading-tight'>
                            {val?.title}
                          </p>
                          <p className='mt-1 text-xs lg:text-base font-normal lg:leading-6 text-gray-600'>
                            {isExpanded ? val?.description : previewText}
                            {words.length > 20 && (
                              <span
                                className="text-sm text-brand-primary font-semibold cursor-pointer ml-2"
                                onClick={() => exclusiveShoreToggleExpand(i)}
                              >
                                {isExpanded ? "Read Less" : "Read More"}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="absolute bottom-0 w-full">
                          <hr />
                          <div className="mt-2.5 lg:mt-4">
                            <p className="text-gray-600 text-sm lg:text-base">Pricing for</p>
                            <p className='text-[#92278F] text-sm font-bold lg:text-base my-2'>
                              Adult: ₹{val?.adult_price}/- | Children: ₹{val?.child_price}/-
                            </p>
                            <p className="text-gray-600 text-sm lg:text-base">Excl. GST charges</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          : null
        }
      </section>

      <section>
        {nonExclusiveData.length !== 0 ? <div className="mb-8 shadow-allSide px-4 lg:px-8 py-4 lg:py-8 rounded" >
          <div className='mb-6 lg:mb-10' />
          <p className="text-lg lg:text-[40px] font-semibold text-center">Discover {selectedLanding?.name} Adventures</p>
          <p className="text-center mt-4 lg:text-lg lg:w-[865px] justify-self-center text-gray-600">Experience the best of {selectedLanding?.name}, a destination where nature and history blend seamlessly.</p>
          <div className='pt-6 lg:pt-10 px-2 lg:px-28'>
            <div className='mobile-slider custom-slider'>
              <Slider {...shoreSetting}>
                {nonExclusiveData?.map((val: any, i: number) => {
                  const isExpanded = nonExclusiveShoreExpand.includes(i);
                  const words = val?.description.split(" ");
                  const previewText = words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
                  return (
                    <div key={i} >
                      <div className='relative rounded mb-2 bg-white p-4'>
                        <div className="w-full relative pb-[6rem] lg:pb-[7rem]">
                          <div className="lg:block hidden !h-[320px]">
                            <img className='w-full !h-[320px] rounded-lg'
                              alt="slide"
                              src={val?.shore_ex_image_desktop}
                              onClick={() => setSelectedImage(val?.shore_ex_image_desktop)}
                            />
                          </div>
                          <div className="lg:hidden block !h-[320px]">
                            <img className='w-full !h-[320px] rounded-lg'
                              alt="slide"
                              src={val?.shore_ex_image_mobile}
                              onClick={() => setSelectedImage(val?.shore_ex_image_mobile)}
                            />
                          </div>

                          <div className='mt-6'>
                            <p className='text-sm lg:text-xl font-bold uppercase text-black leading-tight'>
                              {val?.title}
                            </p>
                            <p className='mt-1 text-xs lg:text-base font-normal lg:leading-6 text-gray-600'>
                              {isExpanded ? val?.description : previewText}
                              {words.length > 30 && (
                                <span
                                  className="text-sm text-brand-primary font-semibold cursor-pointer ml-2"
                                  onClick={() => nonExclusiveShoreToggleExpand(i)}
                                >
                                  {isExpanded ? "Read Less" : "Read More"}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="mt-8 absolute bottom-0 w-full">
                            <hr />
                            <div className="mt-2.5 lg:mt-4">
                              <p className="text-gray-600 text-sm lg:text-base">Pricing for</p>
                              <p className='text-[#92278F] font-bold text-sm lg:text-base my-2'>
                                Adult: ₹{val?.adult_price}/- | Children: ₹{val?.child_price}/-
                              </p>
                              <p className="text-gray-600 text-sm lg:text-base">Excl. GST charges</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
          : null
        }
      </section>


      <section>
        {upcomingData.length !== 0 ?
          <div className="mb-8 shadow-allSide px-4 lg:px-36 py-4 lg:py-8 rounded" >
            <div className='mb-6 lg:mb-10' />
            <h1 className="text-lg lg:text-[40px] font-semibold text-center">Upcoming Cruises</h1>
            <p className="text-center mt-4 lg:text-lg lg:w-[865px] justify-self-center text-gray-600">Temples, beaches, and spicy thrills await on your next cruise!</p>
            <div className='pt-6 lg:pt-10 px-2'>
              <div className='mobile-slider upc-slider'>
                <Slider {...setting}>
                  {upcomingData?.map((cruise: any, i: number) => {
                    return (
                      <div key={i} className="lg:px-6 relative">
                        <div className="relative">
                          <div className='absolute left-0 right-0 mx-auto top-0 w-[90%] rounded-xl '>
                            <img className='h-[200px] w-full rounded-2xl'
                              alt="slide"
                              src={cruise?.image_url}
                              onClick={() => setSelectedImage(cruise?.image_url)}
                            />
                          </div>
                        </div>
                        <div className="shadow-allSide mt-20">
                          <div className="pt-32 px-4 pb-4 rounded-xl">
                            <div className="py-2">
                              <p className="font-semibold lg:text-lg">
                                {cruise?.ports
                                  ?.filter((item: any) => item.name !== "At Sea")
                                  .map((item: any) => item.name)
                                  .join("-")}
                              </p>
                            </div>
                            <hr className="hr-gray" />
                            <div className="py-2">
                              <p className="text-gray-500 text-sm lg:text-sm text-gray-100">Visiting Ports</p>
                              <p className="lg:text-md">
                                {cruise.starting_port.name} | {cruise.destination_port.name}
                              </p>
                            </div>
                            <hr className="hr-gray" />
                            <div className="py-2">
                              <div className="flex items-center">
                                <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/calendar-new-gradient-icon.svg" alt="" className="pr-2 w-6 lg:w-8" />
                                <p className="text-sm lg:text-sm">
                                  {`${formatDate(cruise?.start_date)} - ${formatEndDate(cruise?.end_date)}`}
                                </p>
                              </div>
                              <div className="flex items-center mt-1">
                                <img src={cruise.trip_type == 'one_way' ? 'https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-new-gradient-icon.svg' : 'https://images.cordeliacruises.com/cordelia_v2/public/assets/roundtrip-new-gradient-icon.svg'} alt="" className="pr-2 w-6 lg:w-8" />
                                <p className="text-sm lg:text-sm">
                                  {cruise.trip_type == 'one_way' ? 'One Way' : 'Round Trip'}
                                </p>
                              </div>
                              {cruise?.shore_excursions && (
                                <div className="flex items-center mt-1">
                                  <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/shorex-new-gradient-icon.svg" alt="" className="pr-2 w-6 lg:w-8" />
                                  <p className="text-sm lg:text-sm">
                                    Shore Excursions Available
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="text-center text-base lg:text-lg font-semibold py-2 bottom-2 border border-[#EA725B] rounded-md">
                              {showPrice ? (
                                <a
                                  href={`/upcoming-cruises/itinerary?id=${cruise?.itinerary_id}`}
                                  className="text-[#92278F] cursor-pointer"
                                >View Itinerary
                                </a>
                              ) : (
                                <p
                                  onClick={() => onLogin(cruise?.itinerary_id)}
                                  className="text-[#92278F] cursor-pointer"
                                >Reveal Price
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {cruise.itinerary_id == "7048202e-3632-406e-9f95-05d1f0e25ec9" ?
                                            <div className='absolute top-0 left-0 w-full h-full z-[9999] bg-white/50 flex items-center justify-center'>
                                                <img className='w-[150px] lg:w-[200px]' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/Sold+Out.svg" alt="" />
                                            </div>
                                            : null
                                        }
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div>
          </div>
          : null
        }
      </section>

      <section className="bg-white pt-6 pb-12">
        <div className="container mx-auto px-4 lg:px-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
          <p className="mt-3 text-lg">{sub_title}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {randomPlaces.map((destination, index) => (
              <div onClick={() => window.location.href = destination?.link} key={index} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
                <div className="lg:block hidden">
                  <img
                    src={destination?.image}
                    alt={destination?.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="lg:hidden block ">
                  <img
                    src={destination?.mobile_image}
                    alt={destination?.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold">{destination?.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full p-4">
            <button
              className="absolute top-2 right-2 text-white bg-black p-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Full Image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <LoginModal show={showLoginModal} handleClose={() => onLoginModalClose()} selectedItinerary={selectedItinerary} />
    </Layout>
  );
}
