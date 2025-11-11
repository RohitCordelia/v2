import React, { Suspense, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
const Featured = React.lazy(() => import("../feature"));
import Modal from '../../../components/UI/ModalCenter';
import { useParams } from 'react-router-dom';
import { useLocation, Link } from "react-router-dom";
import { useGetBlogBySlugMutation } from "../../../services/blogs/blogs";
import RichTextRenderer from "../component/RichTextRenderer";
import useMetaTags from "react-metatags-hook";
import moment from "moment";
import Button from "../../../components/UI/Button";
import LeadGenForm from "../../../components/UI/LeadForm";

export default function index() {
    const [description, setDescription] = useState<any>(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        comment: "",
        phone_number: "",
    });

    const [commentErrors, setCommentErrors] = useState({});
    const [visibleCount, setVisibleCount] = useState(6); // Initial visible cards count
    const [blogData, setBlogData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [getBlogBySlug] = useGetBlogBySlugMutation();

    const showMoreCards = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Show 6 more cards
    };
    const END_TIMER = 0
    const { pathname } = useLocation();
    const { slug } = useParams();

    useEffect(() => {
        if (!blogData) return;

        const {
            type,
            headline,
            published,
            modified,
            author,
            image_url,
            publisher,
            main_entity_of_page,
            article_body,
            keywords,
            in_language,
            url,
            description
        } = blogData?.article || {};

        const scripts = [];

        // Breadcrumb Schema
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.cordeliacruises.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blogs",
                    "item": "https://www.cordeliacruises.com/blog"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": blogData.title,
                    "item": `https://www.cordeliacruises.com/blog/${slug}`
                }
            ]
        };

        // Article Schema
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": type || "Article",
            "headline": headline || blogData?.title,
            "description": description || blogData?.shortDesc,
            "author": {
                "@type": "Person",
                "name": author || blogData?.author
            },
            "datePublished": moment(published, "MMMM D, YYYY").format("YYYY-MM-DD") || moment(blogData?.publishedDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
            "dateModified": modified || blogData?.updatedDate || blogData?.publishedDate,
            "image": image_url || blogData?.image_url,
            "publisher": {
                "@type": "Organization",
                "name": publisher || "Cordelia Cruises",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://images.cordeliacruises.com/cordelia_v2/public/assets/cordelia-new-logo.svg"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": main_entity_of_page ? `https://www.cordeliacruises.com/blog/${main_entity_of_page}` : `https://www.cordeliacruises.com/blog/${slug}`
            },
            ...(article_body && { articleBody: article_body }),
            ...(keywords && { keywords }),
            ...(in_language && { inLanguage: in_language }),
            ...(url && { url })
        };

        const addJsonLdScript = (id, json) => {
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.id = id;
            script.innerHTML = JSON.stringify(json);
            document.head.appendChild(script);
            scripts.push(script);
        };

        addJsonLdScript("breadcrumb-schema", breadcrumbSchema);
        addJsonLdScript("article-schema", articleSchema);

        // Cleanup on unmount
        return () => {
            scripts?.forEach((script) => {
                if (script && document.head.contains(script)) {
                    document.head.removeChild(script);
                }
            });
        };
    }, [blogData, slug]);

    useMetaTags({
        title: blogData?.metaTitle?.[0]?.children?.[0]?.text || blogData?.title,
        description: blogData?.metaDescription?.[0]?.children?.[0]?.text || blogData?.subtitle,
        metas: [
            {
                name: 'keywords',
                content: blogData?.metaKeyword,
            },
        ],
    }, [blogData]);

    useEffect(() => {
        const fetchBlog = async () => {
            setIsLoading(true);
            try {
                const res = await getBlogBySlug({ slug }).unwrap();
                setBlogData(res?.blogData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top
    }, [pathname]);

    const validate = () => {
        const newErrors = {};

        if (!formData.comment.trim()) newErrors.comment = "Comments are required.";
        if (!formData.full_name.trim()) newErrors.full_name = "Full name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!formData.phone_number.trim()) {
            newErrors.phone_number = "Mobile number is required.";
        } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone_number)) {
            newErrors.phone_number = "Mobile number is invalid.";
        }
        return newErrors;
    }

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleComment = async (e: any) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setCommentErrors(validationErrors);
        } else {
            setCommentErrors({});

            const data = new FormData();
            data.append("full_name", formData.full_name);
            data.append("email", formData.email);
            data.append("comment", formData.comment);
            data.append("phone_number", formData.phone_number);
            // const data = formData
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/api/v2/blog_comments', {
                    method: "POST",
                    body: data,
                });

                if (response.ok) {
                    alert("Form submitted successfully");
                    setFormData({ comment: "", full_name: "", email: "", phone_number: "", saveInfo: false });
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message || "Something went wrong"}`);
                }
            } catch (error) {
                alert("Failed to submit the form. Please try again later.");
            }
        }
    };

    return (
        <>
            <Layout>
                <main>
                    <section className="lg:mt-[76px]">
                        <div
                            className="w-full h-full md:mt-[65px] mt-16"
                            style={{
                                background: 'linear-gradient(rgb(0 0 0 / 90%) 0%, rgba(9, 9, 121, 0) 40%, rgba(0, 212, 255, 0) 100%)',
                            }}
                        >
                            {/* Desktop banner */}
                            <a href="#">
                                <img
                                    className="hidden md:block w-full"
                                    src={blogData?.bannerImg?.bannerImgDesktop}
                                    alt=""
                                />
                            </a>

                            {/* Mobile banner */}
                            <a href="#">
                                <img
                                    className="block md:hidden w-full"
                                    src={blogData?.bannerImg?.bannerImgMobile}
                                    alt=""
                                />
                            </a>
                        </div>
                    </section>
                    <div className="max-w-6xl mx-auto py-6 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="md:col-span-2">
                                {/* Title */}
                                <h1 className="lg:text-[44px] text-[20px] font-bold ">
                                    {blogData?.title}
                                </h1>
                                {/* Meta Information */}
                                <div className="flex items-center lg:text-lg text-[9px] text-[#6C757D] lg:mt-8 lg:mb-[26px] mt-5 mb-4 my-4">
                                    <span>{blogData?.publishedDate}</span>
                                    <span className="mx-2 lg:block hidden">•</span>
                                    <span className="mx-2 lg:hidden block ">-</span>
                                    <span>{blogData?.readTime} min</span>
                                    <span className="mx-2 lg:block hidden">•</span>
                                    <span className="mx-2 lg:hidden block ">-</span>
                                    <span>
                                        By <span className="text-[#F16F5B]">{blogData?.author}</span>
                                    </span>
                                </div>
                                {/* Content */}
                                <p className="text-black font-normal lg:text-[18px] text-[12px] opacity-[70%] font-openSans lg:leading-8  mb-4 "
                                    dangerouslySetInnerHTML={{ __html: blogData?.shortDesc }}
                                >
                                </p>
                                {/* } */}
                                <div className="my-6">
                                    <img
                                        src={blogData?.image_url}
                                        alt="Eco-Friendly Travel"
                                        className="w-full rounded-md shadow"
                                    />
                                    {/* <img
                                        src={blogData?.image_url}
                                        alt="Eco-Friendly Travel"
                                        className="w-full rounded-md shadow lg:hidden block"
                                    /> */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="lg:text-[26px] text-[16px] lg:h-[19px] h-[11px] font-openSans font-bold text-black lg:mb-14 mb-6 ">
                                        {blogData?.contentTitle || "Content Title"}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 gap-2 lg:gap-4 my-4 h-[300px] lg:h-[490px]">
                                    {blogData?.contentImgs?.slice(0, -1).map((contentImg, idx) => (
                                        <div key={idx} className="rounded-md overflow-hidden mt-[7px]">
                                            <img src={contentImg} alt={`Special Occasion ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                {blogData?.contentImgs?.length > 0 && (
                                    <div className="rounded-md overflow-hidden mb-4 h-[300px] lg:h-[490px]">
                                        <img
                                            src={blogData.contentImgs[blogData.contentImgs.length - 1]}
                                            alt="Special Occasion Last"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <RichTextRenderer content={blogData?.content} />

                                <section>
                                    <div className="mt-10">
                                        <h2 className="lg:text-2xl text-lg  font-bold mb-2">
                                            We're here to help:
                                        </h2>
                                        <p className="lg:text-xl  text-lg font-bold text-brand-primary mb-4">
                                            <a href="tel:022-68811111">022-68811111</a>
                                            <br />
                                            <a href="mailto:info@cordeliacruises.com">info@cordeliacruises.com</a>
                                        </p>
                                    </div>

                                    {/* Sidebar */}
                                    <aside className="lg:hidden block mt-10" >
                                        <div className="sticky top-40 space-y-8">
                                            <div
                                                className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] p-4  rounded"
                                            >
                                                <h3 className="text-xs font-normal text-white">Share with your community!</h3>
                                                <div className="flex gap-4 mt-2">
                                                    <a href="https://www.facebook.com/cordeliacruises/" target="_blank"> <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-fb-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                                    <a href="https://www.instagram.com/cordeliacruises/?hl=en" target="_blank">  <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-insta-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                                    <a href="https://in.linkedin.com/company/cordeliacruises" target="_blank" > <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-linkedin-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                                    <a href="https://www.youtube.com/channel/UCIGZzyqWsbCH1-VNFsXrY9g" target="_blank">  <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-youtube-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                                </div>
                                            </div>
                                            {/* Article Highlights */}

                                            <div className="mt-6">
                                                <h4 className="text-lg font-bold mb-2">Explore More With US</h4>
                                                <ul className="text-gray-700 ">
                                                    <div className="ml-4">
                                                        <li className="text-black text-xs font-normal mt-[16px]">
                                                            <a href=" https://www.cordeliacruises.com/destination" >  Amazing Destinations</a>
                                                        </li>
                                                        <li className="text-black text-xs font-normal mt-[15px]">
                                                            <a href=" https://www.cordeliacruises.com/upcoming-cruises" > Flexibility of choice </a>
                                                        </li>
                                                        <li className="text-black text-xs font-normal mt-[15px]">
                                                            <a href=" https://www.cordeliacruises.com/promotion" >   Awesome Offers </a>
                                                        </li>
                                                        <li className="text-black text-xs font-normal mt-[15px]">
                                                            <a href="https://www.cordeliacruises.com/accommodation" >   Lavish Accommodations </a>
                                                        </li>
                                                        <li className="text-black text-xs font-normal mt-[15px]">
                                                            <a href="https://www.cordeliacruises.com/entertainment" >   Stunning Entertainment </a>
                                                        </li>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                    </aside>

                                    <section className="mt-12">
                                        <LeadGenForm page_code={"blog"} type="blog" />
                                    </section>
                                </section>
                                <section>
                                    <div className="max-w-3xl mx-auto bg-gray-50 rounded-md mt-12">
                                        <h2 className="text-xl font-bold mb-1 font-open-sans leading-8">Leave a Reply</h2>
                                        <p className="md:text-sm text-xs font-normal text-gray-600 mb-6 leading-2 md:leading-5font-open-sans">
                                            Your email address will not be published. Required fields are marked *
                                        </p>
                                        <form className="space-y-6" onSubmit={handleComment}>
                                            {/* {/ Comment Field /} */}
                                            <div>
                                                <textarea
                                                    id="comment"
                                                    name="comment"
                                                    rows="4"
                                                    value={formData.comment}
                                                    onChange={handleChange}
                                                    className={`text-sm font-normal text-gray-600 py-4 mt-1 bg-[#F3F4F7] block w-full px-4 py-2 border-0
                                                     rounded-lg shadow-sm focus:ring-0`}
                                                    placeholder="Comments*"
                                                ></textarea>
                                                {commentErrors.comment && <p className="text-danger text-sm">{commentErrors.comment}</p>}
                                            </div>

                                            {/* {/ Full Name and Email in One Row /} */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="full_name"
                                                        name="full_name"
                                                        value={formData.full_name}
                                                        onChange={handleChange}
                                                        className={`text-sm font-normal text-gray-600 py-4 mt-1 bg-[#F3F4F7] block w-full px-4 py-2 border-0 rounded-lg shadow-sm focus:ring-0`}
                                                        placeholder="Full Name*"
                                                    />
                                                    {commentErrors.full_name && <p className="text-danger text-sm">{commentErrors.full_name}</p>}
                                                </div>

                                                <div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className={`text-sm font-normal text-gray-600 py-4 mt-1 bg-[#F3F4F7] block w-full px-4 py-2 border-0 
                                                    rounded-lg shadow-sm focus:ring-0`}
                                                        placeholder="Email ID*"
                                                    />
                                                    {commentErrors.email && <p className="text-danger text-sm">{commentErrors.email}</p>}
                                                </div>
                                            </div>

                                            {/* {/ phone_number Field /} */}
                                            <div>
                                                <input
                                                    type="text"
                                                    id="phone_number"
                                                    name="phone_number"
                                                    value={formData.phone_number}
                                                    onChange={handleChange}
                                                    className={`text-sm font-normal text-gray-600 py-4 mt-1 bg-[#F3F4F7] block w-full px-4 py-2 border ${commentErrors.phone_number ? "border-0" : "border-0"
                                                        } rounded-lg shadow-sm focus:ring-0`}
                                                    placeholder="Phone Number*"
                                                />
                                                {commentErrors.phone_number && <p className="text-danger text-sm">{commentErrors.phone_number}</p>}
                                            </div>
                                            {/* {/ Submit Button /} */}
                                            <div>
                                                <Button text="Post Comment" className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" />
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </div>
                            {/* Sidebar */}
                            <aside className="hidden md:block" >
                                <div className="sticky top-40 space-y-8">
                                    <div
                                        className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] p-4  rounded"
                                    >
                                        <h3 className="text-xs font-normal text-white">Share with your community!</h3>
                                        <div className="flex gap-4 mt-2">
                                            <a href="https://www.facebook.com/cordeliacruises/" target="_blank"> <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-fb-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                            <a href="https://www.instagram.com/cordeliacruises/?hl=en" target="_blank">  <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-insta-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                            <a href="https://in.linkedin.com/company/cordeliacruises" target="_blank" > <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-linkedin-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                            <a href="https://www.youtube.com/channel/UCIGZzyqWsbCH1-VNFsXrY9g" target="_blank">  <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/blog-youtube-share-icon.svg" className="bg-gradient-to-r from-[hsla(14,90%,73%,1)] to-[hsla(331,54%,44%,1)] text-[#F8997D] rounded-md font-bold text-2xl px-1.5" /> </a>
                                        </div>
                                    </div>
                                    {/* Article Highlights */}

                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold mb-2">Explore More With US</h4>
                                        <ul className="text-gray-700 ">
                                            <div className="ml-4">
                                                <li className="text-black text-xs font-normal mt-[16px] hover:text-brand-primary">
                                                    <a href=" https://www.cordeliacruises.com/destination" >  Amazing Destinations</a>
                                                </li>
                                                <li className="text-black text-xs font-normal mt-[15px] hover:text-brand-primary">
                                                    <a href=" https://www.cordeliacruises.com/upcoming-cruises" > Flexibility of choice </a>
                                                </li>
                                                <li className="text-black text-xs font-normal mt-[15px] hover:text-brand-primary">
                                                    <a href=" https://www.cordeliacruises.com/promotion" >   Awesome Offers </a>
                                                </li>
                                                <li className="text-black text-xs font-normal mt-[15px] hover:text-brand-primary">
                                                    <a href="https://www.cordeliacruises.com/accommodation" >   Lavish Accommodations </a>
                                                </li>
                                                <li className="text-black text-xs font-normal mt-[15px] hover:text-brand-primary">
                                                    <a href="https://www.cordeliacruises.com/entertainment" >   Stunning Entertainment </a>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <section className={`${visibleCount > blogData?.exploreMoreSection?.length ? "lg:mb-[205px]" : ""}`}>
                        <Suspense fallback={<div>Loading.....</div>}>
                            <Featured
                                title="Latest Articles"
                                content={blogData?.exploreMoreSection}
                                info_section={""}
                                type="explore"
                                visibleCount={visibleCount}
                            />
                        </Suspense>
                        {visibleCount < blogData?.exploreMoreSection?.length && ( // Check if there are more cards to show
                            <div className="flex justify-center mt-[-40px] mb-32">
                                <Button text="View More" handleClick={showMoreCards} className="lg:mt-0 mt-16 lg:mb-[15px]" />
                            </div>
                        )}
                    </section>

                </main>

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
                            {description && description?.map((val) => (
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