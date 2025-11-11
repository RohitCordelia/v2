import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../components/UI/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './itineraryTabs.css';
import { useGetItineraryQuery } from '../../../services/itinerary/itinerary';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  Calendar,
  Location,
  EyeOpen,
  EyeOpenActive,
  Ship
} from '../../../components/Icon';
import { useGetItineraryListMutation } from '../../../services/upcomingCruise/upcomingCruise';

const nightsOptions = [
  { id: 2, label: '2 Nights' },
  { id: 3, label: '3 Nights' },
  { id: 4, label: '4 Nights' },
  { id: 5, label: '5 Nights' },
  { id: 7, label: '7 Nights' }
];

const destinationOptions = [
  {
    id: 1,
    label: 'Weekend Cruises'
  },
  {
    id: 2,
    label: 'Cruises from Mumbai'
  },
  {
    id: 3,
    label: 'Cruises from Goa'
  },
  {
    id: 4,
    label: 'Cruises from Kochi'
  },
  {
    id: 5,
    label: 'Cruises to Lakshadweep'
  }
];

const southeastOptions = [
  {
    id: 1,
    label: 'Chennai'
  },
  {
    id: 2,
    label: 'Singapore'
  }
];

const superSaverSettings = {
  // className: 'center',
  // centerPadding: '150px',
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: false,
  autoplay: false,
  dots: false,
  swipeToSlide: true,
  arrows: true,
  infinite: false,
  speed: 300,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024, // Tablets
      settings: {
        slidesToShow: 1.05,
        // centerPadding: "20px",
        arrows: false,
        infinite: false,
        centerMode: false
      }
    },
    {
      breakpoint: 768, // Mobile landscape
      settings: {
        // slidesToShow: 1, // Show 1 slide per row on small screens
        // centerPadding: "30px",
        slidesToShow: 1.35,
        arrows: false,
        infinite: false,
        centerMode: false
      }
    }
  ]
};

const FILTERS: Record<number, Record<string, any>> = {
  1: {
    night_counts: [2, 3],
    starting_ports: ['Mumbai'],
    trip_type: ['round']
  },
  2: { starting_ports: ['Mumbai'] },
  3: { starting_ports: ['Goa'] },
  4: { starting_ports: ['Kochi'] },
  5: { ports: ['Lakshadweep'] }
};

const SEFILTERS: Record<number, Record<string, any>> = {
  1: { starting_ports: ['Chennai'], ports: ['Phuket'] },
  2: { starting_ports: ['Singapore'], ports: ['Phuket'] }
};

export default function ItineraryTabs({
  type = 'nights',
  activeDestinations,
  setActiveDestinations
}: {
  type: 'nights' | 'destinations' | 'southeast';
  activeDestinations: any[];
  setActiveDestinations: any;
}) {
  const [activeTab, setActiveTab] = useState(type === 'nights' ? 2 : 1);
  const [itineraryData, setItineraryData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [getItinerary] = useGetItineraryListMutation();

  let param = '?pagination=false';
  // const { data, isSuccess } = useGetItineraryQuery(param);
  let navigate = useNavigate();

  // useEffect(() => {
  //   setItineraryData(data && data.itineraries);
  // }, [data]);

  const handleTabClick = (id: number, index: number) => {
    if (type === 'southeast' && id !== activeTab) {
      setActiveDestinations((prev: any[]) => [...prev].reverse());
    }

    setActiveTab(id);
    type !== 'nights' && type === 'southeast' && (id !== activeTab) && applyFilter(id);

    tabsRef.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  };

  // Filter cards by selected nights
  const filteredItineraries = itineraryData?.filter(
    (card: any) => card?.nights === activeTab
  );

  useEffect(() => {
    applyFilter(1); // default load
  }, []);

  const buildQuery = (params: Record<string, any>, page = 1) => {
    let query = `?pagination=true&page=${page}`;

    Object.entries(params).forEach(([key, value]) => {
      query += `&${key}=${JSON.stringify(value)}`;
    });

    return query;
  };

  const fetchData = async (_payload: string, reset = false) => {
    setIsLoading(true);
    try {
      const res: any = await getItinerary(_payload).unwrap();
      setItineraryData((prev) =>
        reset ? res.itineraries || [] : [...prev, ...(res.itineraries || [])]
      );
    } catch (err) {
      console.error('Error: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = (id: number) => {
    setPage(1);
    const filterParams =
      type === 'destinations'
        ? FILTERS[id] || {}
        : type === 'southeast'
        ? SEFILTERS[id] || {}
        : {};
    const payload = buildQuery(filterParams, 1);
    fetchData(payload, true);
  };

  return (
    <div className="w-full">
      <div
        className={`w-full overflow-x-auto no-scrollbar px-4 container mx-auto lg:px-0 lg:w-max ${
          type === 'southeast' ? 'sticky top-[70px] z-[999]' : ''
        }`}
      >
        {/* <div className="hidden lg:block absolute top-0 right-0 h-full w-[5%] bg-gradient-to-r from-white/0 to-white/100 z-[2]"></div>
      <div className="hidden lg:block absolute top-0 left-0 h-full w-[5%] bg-gradient-to-r from-white/100 to-white/0 z-[2]"></div> */}
        <div
          className={`lg:border lg:border-gray-300 lg:rounded-full lg:w-max ${
            type === 'southeast' ? 'py-4 lg:p-4 lg:border-none' : 'pb-0'
          }`}
        >
          <div
            className={`flex justify-start gap-2 p-1 min-w-max border border-gray-300 lg:border-0 rounded-full backdrop-blur-sm ${
              type === 'southeast'
                ? 'w-max mx-auto bg-white shadow-allSide'
                : ''
            }`}
            style={{
              boxShadow:
                type !== 'southeast'
                  ? '-20px 20px 20px 0px #dcdcdc1f inset'
                  : 'white'
            }}
          >
            {type === 'nights'
              ? nightsOptions.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => (tabsRef.current[index] = el)}
                    onClick={() => handleTabClick(tab.id, index)}
                    className={`px-4 lg:px-8 py-2 lg:py-5 rounded-full text-sm lg:text-[22px] font-semibold transition-colors whitespace-nowrap
                    ${
                      activeTab === tab.id ? 'bg-brand-gradient text-white' : ''
                    }
                  `}
                  >
                    {tab.label}
                  </button>
                ))
              : type === 'destinations'
              ? destinationOptions.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => (tabsRef.current[index] = el)}
                    onClick={() => handleTabClick(tab.id, index)}
                    className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-xl font-semibold transition-colors whitespace-nowrap
                    ${
                      activeTab === tab.id ? 'bg-brand-gradient text-white' : ''
                    }
                  `}
                  >
                    {tab.label}
                  </button>
                ))
              : type === 'southeast'
              ? southeastOptions.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => (tabsRef.current[index] = el)}
                    onClick={() => handleTabClick(tab.id, index)}
                    className={`px-8 lg:px-10 py-1.5 rounded-full text-center text-sm lg:text-xl font-semibold transition-colors whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'bg-brand-gradient text-white'
                        : 'text-gray-100'
                    }
                  `}
                  >
                    {type === 'southeast' && (
                      <span className="text-xxs lg:text-sm font-semibold block">
                        From
                      </span>
                    )}
                    {tab.label}
                  </button>
                ))
              : null}
          </div>
        </div>
      </div>

      <div
        className={`lg:mt-16 mx-0 w-full newOffers lg:px-0 relative container lg:mx-auto ${
          type === 'southeast' ? 'mt-6 lg:!mt-8 px-0' : 'mt-10 px-4'
        }`}
      >
        {type !== 'destinations' && filteredItineraries?.length > 0 ? (
          <Slider {...superSaverSettings}>
            {filteredItineraries?.map((val: any, idx: number) => (
              <div
                key={val.itinerary_id}
                className="bg-white rounded-lg shadow transition w-full overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[1.61]">
                  <img
                    src={val.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow ">
                  <p className="text-sm lg:text-lg font-bold line-clamp-2 h-10 lg:h-14">
                    {val?.nights > 5
                      ? `${val?.ports[0]?.name} - ${
                          val?.ports[val?.ports.length - 1]?.name
                        }`
                      : val?.ports.map((p: any) => p.name).join(' - ')}
                    <span className="ml-1 text-xs lg:text-lg font-semibold inline-block">
                      ({val?.nights}N/{val?.nights + 1}D)
                    </span>
                  </p>

                  {/* push footer down */}
                  <div className="mt-auto">
                    <div className="flex gap-1.5 lg:gap-3 items-center">
                      <div>
                        <Calendar className="w-[18px] lg:w-[26px]" />
                      </div>
                      <div className="flex gap-1.5 justify-between w-max py-4">
                        <p className="text-xs lg:text-base font-medium">
                          {moment(val.start_date, 'DD/MM/YYYY').format(
                            'DD MMM YYYY'
                          )}
                        </p>
                        <img
                          className="h-4 lg:h-6"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg"
                          alt="backIcon"
                        />
                        <p className="text-xs lg:text-base font-medium">
                          {moment(val.end_date, 'DD/MM/YYYY').format(
                            'DD MMM YYYY'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300">
                      <div className="flex gap-1.5 lg:gap-3 items-center h-8 lg:h-12">
                        <div>
                          <Location className="w-[18px] lg:w-[26px]" />
                        </div>
                        <p className="text-xs lg:text-base font-medium line-clamp-2 text-left">
                          {val?.ports
                            .filter((v: any) => v.name !== 'At Sea')
                            .map((v: any) => v.name)
                            .join(' | ')}
                        </p>
                      </div>

                      <div className="flex gap-1.5 lg:gap-3 items-center pt-3 pb-5">
                        <div>
                          <Ship className="w-[18px] lg:w-[26px]" />
                        </div>
                        {/* <div className="w-[18px] lg:w-[26px]">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/new-flow-icons_gradient.svg"
                            alt="cruise_icon"
                          />
                        </div> */}
                        <p className="text-xs lg:text-base font-medium">
                          {val?.ship?.name}
                        </p>
                      </div>

                      <Button
                        text="Book Now"
                        size={innerWidth > 600 ? 'sm' : 'xs'}
                        type={hoveredIndex === idx ? 'primary' : 'secondary'}
                        leftIcon={
                          hoveredIndex === idx ? (
                            <div>
                              <EyeOpenActive className="w-[18px] lg:w-[26px]" />
                            </div>
                          ) : (
                            <div>
                              <EyeOpen className="w-[18px] lg:w-[26px]" />
                            </div>
                          )
                        }
                        handleClick={() =>
                          navigate(
                            `/upcoming-cruises/itinerary?id=${val?.itinerary_id}`
                          )
                        }
                        className="w-full rounded-full lg:!text-base"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : type === 'destinations' && itineraryData?.length > 0 ? (
          <Slider {...superSaverSettings}>
            {itineraryData?.map((val: any, idx: number) => (
              <div
                key={val.itinerary_id}
                className="bg-white rounded-lg shadow transition w-full overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[1.61]">
                  <img
                    src={val.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow ">
                  <p className="text-sm lg:text-lg font-bold line-clamp-2 h-10 lg:h-14">
                    {val?.nights > 5
                      ? `${val?.ports[0]?.name} - ${
                          val?.ports[val?.ports.length - 1]?.name
                        }`
                      : val?.ports.map((p: any) => p.name).join(' - ')}
                    <span className="ml-1 text-xs lg:text-lg font-semibold inline-block">
                      ({val?.nights}N/{val?.nights + 1}D)
                    </span>
                  </p>

                  {/* push footer down */}
                  <div className="mt-auto">
                    <div className="flex gap-1.5 lg:gap-3 items-center">
                      <div>
                        <Calendar className="w-[18px] lg:w-[26px]" />
                      </div>
                      <div className="flex gap-1.5 justify-between w-max py-4">
                        <p className="text-xs lg:text-base font-medium">
                          {moment(val.start_date, 'DD/MM/YYYY').format(
                            'DD MMM YYYY'
                          )}
                        </p>
                        <img
                          className="h-4 lg:h-6"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg"
                          alt="backIcon"
                        />
                        <p className="text-xs lg:text-base font-medium">
                          {moment(val.end_date, 'DD/MM/YYYY').format(
                            'DD MMM YYYY'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300">
                      <div className="flex gap-1.5 lg:gap-3 items-center h-8 lg:h-12">
                        <div>
                          <Location className="w-[18px] lg:w-[26px]" />
                        </div>
                        <p className="text-xs lg:text-base font-medium line-clamp-2 text-left">
                          {val?.ports
                            .filter((v: any) => v.name !== 'At Sea')
                            .map((v: any) => v.name)
                            .join(' | ')}
                        </p>
                      </div>

                      <div className="flex gap-1.5 lg:gap-3 items-center pt-3 pb-5">
                        <div>
                          <Ship className="w-[18px] lg:w-[26px]" />
                        </div>
                        {/* <div className="w-[18px] lg:w-[26px]">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/new-flow-icons_gradient.svg"
                            alt="cruise_icon"
                          />
                        </div> */}
                        <p className="text-xs lg:text-base font-medium">
                          {val?.ship?.name}
                        </p>
                      </div>

                      <Button
                        text="Book Now"
                        size={innerWidth > 600 ? 'sm' : 'xs'}
                        type={hoveredIndex === idx ? 'primary' : 'secondary'}
                        leftIcon={
                          hoveredIndex === idx ? (
                            <div>
                              <EyeOpenActive className="w-[18px] lg:w-[26px]" />
                            </div>
                          ) : (
                            <div>
                              <EyeOpen className="w-[18px] lg:w-[26px]" />
                            </div>
                          )
                        }
                        handleClick={() =>
                          navigate(
                            `/upcoming-cruises/itinerary?id=${val?.itinerary_id}`
                          )
                        }
                        className="w-full rounded-full lg:!text-base"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : type === 'southeast' && itineraryData?.length > 0 ? (
          <Slider {...superSaverSettings}>
            {itineraryData?.map((val: any, idx: number) => (
              <div
                key={val.itinerary_id}
                className="bg-white rounded-lg shadow transition w-full overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[1.61]">
                  <img
                    src={val.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow ">
                  <p className="text-sm lg:text-lg font-bold text-left line-clamp-2 h-10 lg:h-14">
                    {val.alias || (
                      <>
                        {val?.nights > 5
                          ? `${val?.ports[0]?.name} - ${
                              val?.ports[val?.ports.length - 1]?.name
                            }`
                          : val?.ports.map((p: any) => p.name).join(' - ')}
                        <span className="ml-1 text-xs lg:text-lg font-semibold inline-block">
                          ({val?.nights}N/{val?.nights + 1}D)
                        </span>
                      </>
                    )}
                  </p>

                  {/* push footer down */}
                  <div className="mt-auto">
                    <div className="flex gap-1.5 lg:gap-3 items-center">
                      <div>
                        <Calendar className="w-[18px] lg:w-[26px]" />
                      </div>
                      <div className="flex gap-1.5 justify-between w-max py-4">
                        <p className="text-xs lg:text-base font-medium">
                          {moment(val.start_date, 'DD/MM/YYYY').format(
                            'DD MMM YYYY'
                          )}
                        </p>
                        <img
                          className="h-4 lg:h-6"
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/oneway-purple-icon.svg"
                          alt="backIcon"
                        />
                        <p className="text-xs lg:text-base font-medium">
                          {moment(val.end_date, 'DD/MM/YYYY').format(
                            'DD MMM YYYY'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300">
                      <div className="flex gap-1.5 lg:gap-3 items-center h-8 lg:h-12">
                        <div>
                          <Location className="w-[18px] lg:w-[26px]" />
                        </div>
                        <p className="text-xs lg:text-base font-medium line-clamp-2 text-left">
                          {val?.ports
                            .filter((v: any) => v.name !== 'At Sea')
                            .map((v: any) => v.name)
                            .join(' | ')}
                        </p>
                      </div>

                      <div className="flex gap-1.5 lg:gap-3 items-center pt-3 pb-5">
                        <div>
                          <Ship className="w-[18px] lg:w-[26px]" />
                        </div>
                        {/* <div className="w-[18px] lg:w-[26px]">
                          <img
                            src="https://images.cordeliacruises.com/cordelia_v2/public/assets/new-flow-icons_gradient.svg"
                            alt="cruise_icon"
                          />
                        </div> */}
                        <p className="text-xs lg:text-base font-medium">
                          {val?.ship?.name}
                        </p>
                      </div>

                      <Button
                        text="Book Now"
                        size={innerWidth > 600 ? 'sm' : 'xs'}
                        type={hoveredIndex === idx ? 'primary' : 'secondary'}
                        leftIcon={
                          hoveredIndex === idx ? (
                            <div>
                              <EyeOpenActive className="w-[18px] lg:w-[26px]" />
                            </div>
                          ) : (
                            <div>
                              <EyeOpen className="w-[18px] lg:w-[26px]" />
                            </div>
                          )
                        }
                        handleClick={() =>
                          navigate(
                            `/upcoming-cruises/itinerary?id=${val?.itinerary_id}`
                          )
                        }
                        className="w-full rounded-full lg:!text-base"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {type === 'nights'
              ? `No itineraries available for ${activeTab} nights!`
              : 'No itineraries available!'}
          </p>
        )}
        {/* <div className="hidden lg:block absolute top-0 left-0 h-full w-[15%] bg-gradient-to-r from-white/100 to-white/0 z-1"></div>
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[15%] bg-gradient-to-r from-white/0 to-white/100 z-1"></div> */}
      </div>
      {type !== 'southeast' && (
        <div className="p-4 text-center">
          <Button
            text="Explore All Sailings"
            size={innerWidth > 600 ? 'medium' : 'base'}
            handleClick={() => navigate('/upcoming-cruises')}
            className="w-full lg:w-auto rounded-full"
          />
        </div>
      )}
    </div>
  );
}
