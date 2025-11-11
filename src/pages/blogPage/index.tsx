import React, { Suspense, useEffect, useState } from "react";
import Banner from '../../component/Banner';
import Header from '../../component/Header/index';
import { Link, useNavigate } from 'react-router-dom';
const Featured = React.lazy(() => import("./feature"));
import { ALL_EVENTS, ALL_PERSONAS, DEFAULT, EVENT_KEY, PERSONA_KEY } from "../../constants/userConstants";
import Modal from '../../components/UI/ModalCenter';
import { Layout } from "../../components/Layout";
import { useGetAllBlogsMutation } from "../../services/blogs/blogs";
import LeadGenForm from "../../components/UI/LeadForm";
import Button from "../../components/UI/Button";

const blogs = [
    // {
    //     link: "/best-valentines-day-couple-cruise-in-india",
    //     category: "Team Marketing",
    //     date: "January 21, 2025",
    //     title: "Best Valentines Day Couple Cruise in India",
    //     description: "Why settle for the ordinary when your love deserves the extraordinary? This Valentine’s Day, trade crowded restaurants and predictable plans for something truly magical—a romantic escape aboard Cordelia Cruises.",
    //     imageUrl: "https://images.cordeliacruises.com/cordelia_v2/public/images/main-page-blog-banner-02-jan-25-desktop.webp"
    // },
    {
        link: "/best-valentines-day-couple-cruise-in-india",
        category: "Team Marketing",
        date: "January 21, 2025",
        title: "Best Valentines Day Couple Cruise in India",
        description: "Why settle for the ordinary when your love deserves the extraordinary? This Valentine’s Day, trade crowded restaurants and predictable plans for something truly magical—a romantic escape aboard Cordelia Cruises.",
        imageUrl: "https://images.cordeliacruises.com/cordelia_v2/public/images/blogpage240125.webp"
    },
    {
        link: "/best-family-cruise-vacation-india",
        category: "Team Marketing",
        date: "December 10, 2024",
        title: "Family Cruise Vacation: Why Cordelia Cruises is the Best Choice",
        description: "A family vacation on a Cordelia cruise is like pressing pause on the world and hitting play on what truly matters—time together. It’s mornings on deck, sharing quiet moments as the ocean wakes up, and afternoons packed with laughter, whether you’re exploring a new island or playing games by the pool. The best part? No distractions, just each other, creating memories that will float with you for life. When the sun sets, you’re not just watching the sky change colors—you’re bonding over stories, laughter, and the simple joy of being together. It’s more than a trip—an experience that will stay with you long after you’ve docked.",
        imageUrl: "https://images.cordeliacruises.com/cordelia_v2/public/images/mblogpage240125.webp",
    },
    {
        link: "/why-is-cruising-travel-the-best-holiday-idea",
        category: "Team Marketing",
        date: "January 25, 2025",
        title: "Why Is Cruising Travel the Best Holiday Idea?",
        description: "When it comes to planning the perfect holiday, we often face the dilemma of choosing between relaxation and adventure, or luxury and convenience. But what if you didn’t have to choose at all? Cruising travel offers the ultimate blend of everything you could possibly want in a holiday—stunning destinations, unmatched comfort, gourmet dining, and endless entertainment—all while sailing across the serene expanse of the ocean.",
        imageUrl: "https://images.cordeliacruises.com/cordelia_v2/public/images/blog-03-latest-article-jan-25-desktop.webp",
    },
    {
        link: "/best-holi-cruise-party-in-2025-with-cordelia-cruises",
        category: "Team Marketing",
        date: "January 24, 2024",
        title: "Best Holi Cruise Party in 2025 with Cordelia Cruises",
        description: "Holi—a festival that bursts forth in a riot of colours, joy, and celebration. Now imagine adding a splash of the sea, the rhythm of waves, and the luxuries of a premium cruise to the mix. Sounds dreamy? That’s exactly what Cordelia Cruises is bringing to you in 2025—a Holi party that promises to be as vibrant as your imagination and as memorable as your happiest memories.",
        imageUrl: "https://images.cordeliacruises.com/cordelia_v2/public/images/blog-05-latest-article-jan-25-desktop.webp"
    }
];

type blogProps = {
    author: string;
    slug: string;
    bannerImgMobile: string;
    bannerImgDesktop: string;
    title: string;
    bannerText: string;
    publishedDate: string;
    shortDesc: string;
    image: string;
}

export default function index() {
    let navigate = useNavigate();
    const [description, setDescription] = useState<any>(false);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [showPhoneModal, setShowPhoneModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    var [timer, setTimer] = useState<number>(30);
    const [visibleCount, setVisibleCount] = useState(6); // Initial visible cards count
    const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
    const [isMobile, setIsMobile] = useState(false);
    // const imagesToShow = isMobile ? banner.mobileImages : banner.images;
    const [blogsData, setBlogsData] = useState({});
    const [bannerBlogs, setBannerBlogs] = useState<blogProps[]>([]);
    const [trendingBlogs, setTrendingBlogs] = useState<blogProps[]>([]);
    const [featuredBlogs, setFeaturedBlogs] = useState<blogProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ getAllBlogs ] = useGetAllBlogsMutation();
            
    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);
            try {
                const res = await getAllBlogs().unwrap();
                setBlogsData(res);
                setBannerBlogs(res.bannerSection);
                setTrendingBlogs(res.trendingSection);
                setFeaturedBlogs(res.featuredSection);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const primaryBlog = trendingBlogs?.[0];
    const trendingBlogLists = trendingBlogs?.slice(1)
    
    const imagesToShow = bannerBlogs?.map((blog) => {
        return {
            desktopUrl: blog.bannerImgDesktop,
            mobileUrl: blog.bannerImgMobile,
            link: blog.slug,
            altTag: "",
            type: "image",
            thumbnail: "",
        }
    });

    // Check for screen size on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024); // 1024px is the breakpoint for lg screens
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % imagesToShow?.length);
        }, 4000); // 1-second interval
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [imagesToShow?.length]);

    // Navigation Handlers
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % imagesToShow.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + imagesToShow.length) % imagesToShow.length);
    };

    const showMoreCards = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Show 6 more cards
    };

    const END_TIMER = 0
    const personaSelector = new window.URLSearchParams(window.location.search).get(PERSONA_KEY);
    let PERSONA = DEFAULT
    if (personaSelector && ALL_PERSONAS.includes(personaSelector)) {
        PERSONA = personaSelector
    }

    const eventSelector = new window.URLSearchParams(window.location.search).get(EVENT_KEY);
    let EVENT = 'srilanka'
    if (eventSelector && ALL_EVENTS.includes(eventSelector)) {
        EVENT = eventSelector
    }
    useEffect(() => {
        if (showPhoneModal) {
            if (timer && timer !== END_TIMER) {
                var tempTimer = setInterval(
                    () => setTimer(timer - 1),
                    1000
                );
                return function cleanup() {
                    clearInterval(tempTimer);
                };
            }
        }
    }, [showPhoneModal, timer]);

    function truncate(source: string, size: number) {
        return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
    }

    return (
        <>
            <Layout>
                <main className="lg:mt-16 mt-10">
                    <section >
                        <div className="relative w-full mx-auto lg:h-[500px] h-[246px]">
                            {/* Image Container */}
                            <div className="relative w-full mx-auto lg:h-[500px] h-[246px]">
                                {bannerBlogs?.length > 0 && (
                                    <div className="relative overflow-hidden lg:h-[500px] h-[246px]">
                                        {/* Active Banner */}
                                        <Link to={`/blog/${bannerBlogs?.[currentSlide]?.slug}`} key={currentSlide} className="block relative w-full h-full">
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black opacity-40"></div>

                                            {/* Banner Image */}
                                            <img
                                                src={isMobile ? bannerBlogs?.[currentSlide]?.bannerImgMobile : bannerBlogs?.[currentSlide]?.bannerImgDesktop}
                                                alt={imagesToShow[currentSlide]?.altTag || `Banner ${currentSlide + 1}`}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Text Content */}
                                            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:ml-[103px] lg:h-[500px] lg:w-[912px] w-[343px]">
                                                <h1 className="text-white lg:text-[36px] text-[18px] font-bold mb-4 w-[90%] font-openSans leading-[1.2] mt-6">
                                                    {bannerBlogs?.[currentSlide]?.title}
                                                </h1>

                                                <p className="text-white lg:text-[24px] text-[12px] mb-2">
                                                    By <span className="text-[#F16F5B]">{bannerBlogs?.[currentSlide]?.author}</span> | {bannerBlogs?.[currentSlide]?.publishedDate || "January 21, 2025"}
                                                </p>
                                                <p className="text-white mb-6 lg:text-[20px] text-[12px] font-openSans w-[90%]">
                                                    {bannerBlogs?.[currentSlide]?.bannerText}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={prevSlide}
                                className="absolute lg:left-4 left-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full"
                            >
                                <img className='drop-shadow-xl h-4 lg:h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/left-arrow.svg' alt='CordeliaCruise' title='Cordelia-Cruises' />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute lg:right-4 right-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full"
                            >
                                <img className='drop-shadow-xl h-4 lg:h-8' src='https://images.cordeliacruises.com/cordelia_v2/public/assets/right-arrow.svg' alt='Cordelia Cruises' title='Cordelia-Cruises' />
                            </button>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {imagesToShow?.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#F16F5B]" : "bg-gray-400"
                                            } transition-colors duration-300`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container mx-auto px-4 lg:py-8 mt-[60px] ">
                            <h2 className="lg:text-[36px] text-xl font-bold mb-2 mt-[41px] lg:text-left lg:mt-[2px]">Trending</h2>
                            <div className="flex flex-col lg:flex-row gap-8 mt-6">
                                {/* {/ Main Blog /} */}
                                {primaryBlog && <div className="flex flex-col bg-white shadow-md rounded overflow-hidden w-full lg:w-[53%] lg:h-max">
                                    <div className="w-full h-[271px] lg:h-[435px] cursor-pointer" onClick={() => navigate(`/blog/${primaryBlog.slug}`)}>
                                        <img
                                            src={primaryBlog.image}
                                            alt={primaryBlog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="lg:p-6 lg:w-full px-4 pt-4">
                                        <p className="lg:text-[18px] text-[10px] text-[#F16F5B] lg:mt-[12px] font-semibold">
                                            {primaryBlog.author} <span className="text-gray-100">| {primaryBlog.publishedDate}</span>
                                        </p>
                                        <h3 className="lg:text-[30px] text-[14px] font-semibold mt-2 font-openSans">{primaryBlog.title}</h3>
                                        <p className="text-gray-600 lg:text-[20px] text-[10px] lg:mt-[15px] mt-2 line-clamp-6"
                                            >{primaryBlog?.shortDesc}</p>
                                            {/* }}>{truncate(primaryBlog?.shortDesc, 130)}</p> */}
                                        <Link
                                            to={`/blog/${primaryBlog.slug}`}
                                            className="text-[#93288E] lg:text-[24px] text-[12px] lg:mt-4 flex items-center gap-1 hover:underline font-bold lg:mb-0 mb-[17px] mt-2"
                                        >
                                            Read more <span>→</span>
                                        </Link>
                                    </div>
                                </div>}
                                {/* {/ Sidebar Blog List /} */}
                                <div className="lg:gap-12 lg:w-[47%] w-full h-auto">
                                    {trendingBlogLists?.map((blog, index) => (
                                        <div key={index}>
                                            <div className="flex lg:gap-6 items-start bg-white overflow-hidden lg:h-[280px] h-[190px]">
                                                <Link to={`/blog/${blog.slug}`} className="block w-[249px]  lg:w-[47%] h-[150px] lg:h-[250px] rounded overflow-hidden">
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </Link>
                                                <div className="lg:p-0 px-3 lg:px-0 w-[338px] lg:h-[255px] lg:mt-[-3px] h-[150px]">
                                                    <p className="lg:text-[17px] text-[10px] text-[#F16F5B] mt-[-4px] lg:mt-[-2px] font-medium">{blog.author}</p>
                                                    <h4 className="lg:text-[20px] text-xs font-semibold mt-2 font-openSans leading-5 lg:leading-7 line-clamp-2">
                                                        {blog.title}
                                                    </h4>
                                                    <p
                                                        className="lg:text-[18px] text-[10px] h-auto lg:mt-4 mt-2 text-gray-600 font-open-sans line-clamp-3 overflow-hidden">
                                                        {truncate(blog.shortDesc, 130)}
                                                    </p>
                                                    <p className="lg:text-[18px] text-[10px] text-[#606060] font-normal mt-[2px]">
                                                        <Link to={`/blog/${blog.slug}`} className="text-[#93288E] hover:underline font-bold"> Read more <span>→</span></Link>
                                                    </p>
                                                    <p className="lg:text-[15px] text-[8px] lg:h-[11px] h-[6px] lg:mt-4 mt-3 text-[#606060] font-normal opacity-[50%]">
                                                        {blog.publishedDate}
                                                    </p>
                                                </div>
                                            </div>
                                            {index < blogs.length - 2 && (
                                                <hr className="h-px bg-[#E6E6E6] border-0   dark:bg-[#E6E6E6] mb-8" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-0">
                        <LeadGenForm page_code='Blog' />
                    </section>
                    <section className={`${visibleCount > featuredBlogs?.length ? "lg:mb-[205px]" : "lg:mb-[150px]"}`}>
                        <Suspense fallback={<div>Loading.....</div>}>
                            <Featured
                                title="Featured News"
                                content={featuredBlogs}
                                info_section={""}
                                visibleCount={visibleCount}
                            />
                        </Suspense>
                        {visibleCount < featuredBlogs?.length && (
                            <div className="flex justify-center mt-[-40px] mb-32">
                                <Button text="View More" handleClick={showMoreCards} className="lg:mt-0 mt-16 lg:mb-[15px]" />
                            </div>
                        )}
                    </section>
                    {/* <section>
                    <Footer/>
                </section> */}
                </main>
                <Modal show={showSuccessModal} align={'center'} className="w-[90%] lg:w-[40%] relative border-t-4 border-brand-primary" onClose={() => setShowSuccessModal(false)}>
                    <div className='w-full h-full bg-white shadow-lg'>
                        <div className='p-2 border-b border-gray-300 flex items-center justify-between'>
                            <h2 className='text-lg font-semibold text-gray-900 flex-grow text-center'>Success!</h2>
                            <svg onClick={() => setShowSuccessModal(false)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='p-4 h-[100px]'>
                            <p className='text-md text-gray-700 text-center'>{success}</p>
                        </div>
                    </div>
                </Modal>

                <Modal show={description} align={'center'} className="w-full lg:w-2/4 relative" onClose={() => setDescription(false)}>
                    <div className=' w-full h-full bg-white'>
                        <div className=' p-4 pb-0 flex items-center justify-end'>
                            <svg
                                onClick={() => setDescription(false)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-black cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="px-10 pb-6">
                            {description && description?.map((val: any) => (
                                <ul className="list-disc">
                                    <li className="mb-2 text-sm lg:text-base">{val}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </Modal>
            </Layout>
        </>
    );
}