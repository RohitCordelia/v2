import React, { useEffect } from 'react'
import useMetaTags from 'react-metatags-hook';
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";

type Props = {}

export default function PaymentSuccess({ }: Props) {
    useMetaTags({
        title: 'Privacy Policies - Terms Of Services & More Information | Cordelia Cruises',
        description: 'Make sure you are aware of all the privacy policies, agreements, clauses & other information you need to know to get on a Cordelia Cruise.',
        metas: [
          {
            name: 'keywords',
            content:
              'privacy policy, privacy & terms, privacy information, privacy policy page, privacy and policy, privacy policy and terms of service, privacy policy online, privacy agreement, privacy clause'
          },
        ],
      })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Layout>
            <main className="container mx-auto pt-24 pb-24 lg:pt-36 lg:pb-36 px-9">
                <h1 className='text-3xl font-semibold'>Privacy Policy</h1>
                <p className='text-sm lg:text-lg font-medium mt-3 lg:mt-6 !leading-6 lg:!leading-8'>Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited) or Cordelia Cruises ("Cordelia", "we", "our", or "us") is a Cruise Company. This Privacy Policy explains how your personal information is collected, stored, used and disclosed by Cordelia when using Cordelia websites, mobile application services (the "Sites") and in Cordelia’s provision of products and services to you. By accessing or using our Sites and/or products and services it is deemed that you have vigilantly read, understood and agree to our collection, storage, use and disclosure of your information as described in this Privacy Policy.</p>

                <div className='border-t-2 my-10 border-gray-300' />

                <ul className='list-[upper-roman] text-lg'>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Information which is Collected
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We collect personal information you voluntarily provide to us when you visit our Sites, enquire about or use our products and services.
                            <br /><br />
                            We collect information onboard or when you register which may include your name, address, gender, birth date, email address, telephone number, special occasion dates, vacation preferences, dietary preferences, and passport information other personal identification document information as well as emergency contact information (the name, address and telephone number of someone not traveling with you who we can contact in case of an emergency); with your prior explicit consent we may also collect sensitive personal information such as health requirements. This information is collectively referred to as "Profile Information" in this Privacy Policy.
                            <br /><br />
                            Information collected with us may include Profile Information for yourself and those traveling with you. By providing us with the Profile Information of any third party, you confirm that you have the appropriate authority to do so on their behalf and have provided them with the information set out in this Privacy Policy. Each person whose Profile Information is collected by us may be accessible by others for the purposes of the journey.
                            <br /><br />
                            There are several areas on the Sites where you may provide personal information or will be required to register to obtain access to certain online services not available to anonymous visitors. These may include (but not limited to) My Profile, Sign in/Register, Online Check-in, Book Now, Shore Excursions, Fun Activities and Contact Us. You may apply for employment online through our Sites. Travel agents may register with Cordelia through the www.Cordeliacruises.com site linked from our website. Mobile application users are required to provide identity information in order to use certain features of the application, such as accessing your account.
                            <br /><br />
                            If you make purchases through our Sites or onboard we will collect your contact information including your phone number, email address, credit card information (cardholder name, card number and expiration date) and information about the person receiving the product or service purchased, and we also may keep a record of your purchases.
                            <br /><br />
                            Information collected through online application for fun activities may include name, address, telephone and fax numbers, email address, age, education history, employment information and immigration status. employment applicants may choose to provide this information by mail or fax instead of through the Sites.
                            <br /><br />
                            Using Online Check-in will speed up your boarding process because information is submitted in advance.
                            <br /><br />
                            Our mobile application provides facilities that require you to submit information in order for a certain feature to function properly. This information will be used by Cordelia for our general commercial purposes. Please see the Cordelia Mobile App Privacy Policy, which is available on the application, for further details.
                            <br /><br />
                            If, while traveling with us, you suffer a personal injury or submit a claim after suffering a personal injury, we collect personal information concerning the incident, such as details of the incident and upon your prior explicit consent, healthcare information.
                            <br /><br />
                            We operate closed circuit television (CCTV) cameras on board our ships, including at all access points and throughout the public areas. These CCTV cameras record continually and images of you may appear in these recordings ("CCTV images") for the safety and security purposes.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            How Do We Use the Collected Information?
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia uses the information we collect primarily for the purposes of our legitimate business interests, so as to provide a better customer service to you, to improve and tailor our services to you including meeting your needs and preferences, such as if you require a wheelchair or dietary preferences, to contact you about special promotions and new products, and for other purposes set out in this Privacy Policy.
                            <br /><br />
                            We also process your personal information for the purposes of entering into and fulfilling our agreement with you, including to provide you products, services or membership benefits you request, and to comply with applicable legal obligations as detailed in this Privacy Policy (for example, providing certain information to governmental agencies, recognized law enforcement agencies and competent authorities).
                            <br /><br />
                            We use your credit card information to complete your purchase and for our general commercial, marketing, and advertising purposes. We may keep your credit card and passport information on file and on our servers to enable you to make purchases on board more easily, to facilitate your boarding procedure and other transactions between us, and to resolve disputes as may arise between us and you.
                            <br /><br />
                            We may use your personal information to communicate with you and respond to your queries. You may choose how you would like to receive information from us. Options include mail, email, telephone or text. With your permission, we may contact you from time to time with communications that we feel will be of interest to you such as information about our services, news, and updates, and promotions; our communication will also include offerings of exclusive benefits and privileges and personalized offers and invitations to events. We may also use your email address to provide you with details on upcoming events, cruises, packages and other information about Cordelia or to provide you with information from companies with whom we have cooperative or joint marketing arrangements. We may also use the information collected when you activate the mobile application to provide you with information about your cruise, activities, products or services that may be of interest to you through the application.
                            <br /><br />
                            We may use your healthcare information and information related to an incident where you have suffered an injury to provide assistance to you, assess, report, administer and manage any claims and to support our risk management policies and processes.
                            <br /><br />
                            Regarding CCTV images, we use these for our legitimate business interests, namely for ensuring the safety and security of each ship and other passengers. CCTV images are retained and stored for a set period and may be used internally for identification purposes and to assist with investigation of safety or security related matters.
                            <br /><br />
                            We do not retain personal information for longer than necessary to fulfil these purposes and in accordance with applicable law. For information on third parties we share your information with, please see Section on Disclosing Information to Third Parties.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Information We Collect or Store Automatically
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We automatically collect certain types of usage information when you visit the Sites, receive emails from us, or otherwise engage with us. For example, we use cookies, clear gifs or beacons, device recognition technologies, and other similar tracking technology to better understand our Site usage information and to improve our Site and our user experience.
                            <br /><br />
                            When you access the Sites by or through a mobile device, we may receive or collect and store unique identification numbers associated with your device or our mobile application (including, for example, a UDID, Unique ID for Advertisers ("IDFA"), Google Ad ID, or Windows Advertising ID), mobile carrier, device type, model and manufacturer, mobile device operating system brand and model, phone number, and, depending on your mobile device settings, your geographical location data, including GPS coordinates (e.g. latitude and/or longitude) or similar information regarding the location of your mobile device.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            How do we use the information we collect or store automatically?
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We use or may use the data and any personal information collected through the above methods for our legitimate business interests, namely to: (a) archive information so that you will not have to re-enter it during your session or the next time you visit the websites; (b) provide and serve custom, personalized advertising; (c) identify and recognize you across multiple devices; (d) provide and monitor the effectiveness of the Sites; (e) monitor aggregates such as total number of visitors, traffic, usage, and demographic patterns on our website and the Sites; (f) diagnose or fix technology problems; and (g) otherwise to plan for and enhance our services and Sites.
                            <br /><br />
                            The information generated by the above methods may be transmitted to and stored on servers in India or any other jurisdictions. Although we do our best to honour the privacy preferences of our users, we are unable to respond to Do Not Track signals set by your browser at this time.
                            <br /><br />
                            If you would prefer not to accept cookies, most browsers will allow you to: (i) change your browser settings to notify you when you receive a cookie, which lets you choose whether or not to accept it; (ii) disable existing cookies; or (iii) set your browser to automatically reject cookies. Please note that doing so may negatively impact your experience using the Sites. Depending on your mobile device and operating system, you may not be able to delete or block all cookies. You may also set your e-mail options to prevent the automatic downloading of images that may contain technologies that would allow us to know whether you have accessed our e-mail and performed certain functions with it.
                            <br /><br />
                            We do not retain personal information for longer than necessary to fulfil these purposes and in accordance with applicable law.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Information We Receive from Third Parties including social networking sites
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            When you interact with our Sites through various social media, such as Facebook, or share our content on Facebook, Twitter, Pinterest, Instagram or other sites, we may receive information from the social network including your profile information, profile picture, profile name, user ID associated with your social media account, country and any other information you permit the social network to share with third parties. The data we receive is dependent upon your privacy settings with the concerned social network and/ or third party. However, we will not post information about you on third party social media sites without your consent. You should always review, and if necessary, adjust your privacy settings on third-party websites and services before linking or connecting them to our website or Service.
                            <br /><br />
                            We may also collect information about you from other third parties, for example, tour operators, data aggregators, and our business partners.
                            <br /><br />
                            We may also collect information about you that is publicly available. This information may be combined with the information we collect from you directly as discussed above. We use this information to better understand and analyse the demographics of our customers, to connect with you on social networks, and improve our Sites, Services and our customer experience.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Email Promotions
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            You may subscribe to our email promotions scheme by registering on one of our Sites. By registering, you are securing your subscription to receive email promotions. Emails from Cordelia may contain clear gifs, unique hyperlinks, and other methods to track your engagement with the email promotions that we send you. You may unsubscribe or change your email address for email promotions at any time by following the instructions mentioned prominently within each email promotion.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Promotions, Contests and other advertising campaigns
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            From time to time we may offer promotions, contests or other advertising campaigns (collectively referred to as a "Promotion") on our Sites or partner sites. If you choose to participate, information including your name, address, age, telephone number and email address may be collected. We may also request other information some of which may be optional. We use the information you provide for the purposes of conducting the Promotion and for other purposes described in this Privacy Policy. A Promotion may be sponsored by Cordelia alone, with another sponsor or by a third party. Information you provide may be shared with such sponsors or third parties in accordance with this Privacy Policy. We may require the sponsor or third party to provide us with Promotion entrant information for marketing purposes. You must be over the age of 18 years to participate in any Promotion or as otherwise provided in the official rules or terms and conditions for such Promotion. When you participate in a Promotion you are subject to the official rules or terms and conditions governing that Promotion which may be posted on the Site relevant to the applicable Promotion or in other locations as Promotion marketing materials and/or websites indicate.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Child Privacy
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We process personal information about children to provide products and services when they are our guests on our ship(s), but do not seek to collect personal information about children for any other purpose The Sites are not targeted at, nor do we knowingly collect personal information from, children under the age of 18 years. If we have reason to believe that information is being provided by a person under the age of 18 years, we will not collect the information.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Photographers and video recordings on board
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Please be aware that there are photographers and camera crew on board the ship taking photographs and making films for passengers to purchase at the end of your cruise or for our own promotional use. They would be happy to take reasonable steps to avoid filming or photographing you in the event you inform them. It is made clear that you may be included in photographs or recordings unless you tell us otherwise. We are unable to assure you that you will not be included on an incidental basis.
                            <br /><br />
                            Some onboard products and services, excursions and other activities, are provided by third parties. We may share sufficient personal information with these partners before, during and after your cruise to provide a seamless service to our passengers, such as the ability to charge purchases to passengers' onboard accounts. These companies have their own privacy Policies which should be referred to if you choose to use their services.
                            <br /><br />
                            Casinos on our ships are operated either by Cordelia Cruises and/ or by third party. If you use the casino then your personal information may be transferred to other jurisdictions for the purposes of monitoring and improving quality of services, and preventing and detecting fraud.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Loyalty Programs
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We operate loyalty programs that allow you to optimize your benefits from your time spent on our ship(s), through future offers that may include discounts, upgrades, early booking, competitions, gifts, etc. For this reason, we retain a basic record of cruise(s) you have taken including your name, contact details, cruise numbers and dates, and any loyalty offers that you have redeemed with us. If you believe we hold incorrect historical cruise details, you can contact us with evidence of those cruises to correct your record.
                            <br /><br />
                            We will contact you with details of our loyalty program when you book your first cruise, and if you join you will receive further communications thereafter including details of your loyalty status and subsequent benefits. In order to calculate these benefits we need to profile the time and money you spend with us. You may opt out of the loyalty program and program-related communications at any time. We use data from third-party providers to help us to maintain the accuracy of your loyalty program contact data.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Queries
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Should you have any queries before, during or after your cruise, then we will use information related to your cruise such as travel details, billing, onboard communications and other information we may have on record or which you or third parties may provide to us, to resolve your query.
                            <br /><br />
                            Upon completion of your cruise, we will contact you to seek feedback on your experience to understand your satisfaction level so that we can improve the quality of services we offer, and to assess the performance of our onboard staff and their associated rewards.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Comprehending Your Needs
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            The personal information you provide to us or which we obtain through your dealings with us may be analysed for the following purposes to tailor our products and services and to improve our products and services generally:
                        </p>
                        <ul className='px-6 text-sm font-semibold list-disc py-2'>
                            <li>To personalize our news, offers and services to your interests.</li>
                            <li>To track the response to our marketing communication.</li>
                            <li>To review, develop and improve the services we offer (including market research).</li>
                            <li>For statistical analysis.</li>
                        </ul>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We also conduct identifiable or otherwise market researches to provide longer-term insight into the effectiveness of our services and marketing, and to support our service planning and delivery.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Your Access
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            You are responsible for the accuracy and completeness of all information you provide to us. You may, at any time, access and make changes or corrections to your Profile Information or preferences simply by visiting your profile/ account or Online Check-in pages of the website and providing your Login Information subject to Cruise Ticket Contract and rest of the policies. You may also direct us to change your information by email or telephone at the address and number provided below. We will act on your request promptly without any warranty with respect to time.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Disclosing Information to Third Parties
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We may share your information with our affiliated companies and third parties to perform certain activities on our behalf. Examples of these activities and third parties include:
                        </p>
                        <ul className='px-6 text-sm font-semibold list-disc py-2'>
                            <li>Fulfilling requests for brochures and promotional materials: printers, fulfilment service providers.</li>
                            <li>Processing payments: banks, payment service providers.</li>
                            <li>Sending postal mail and e-mail communications: postal services, couriers, email service providers</li>
                            <li>Business Process management, Customer management</li>
                            <li>Maintaining guest records and analysing data: customer insight agencies, credit agencies.</li>
                            <li>Providing port services and excursions.</li>
                            <li>Providing travel services: airlines, coach operators, travel agents.</li>
                        </ul>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            These contractors will have access to personal information needed to perform their functions, but are not permitted to use it for other purposes.
                            <br /><br />
                            If you make a booking we may pass your personal information on to other relevant suppliers of your travel arrangements such as airlines, hotels and transport companies. Your personal information may also be passed to travel agents, security and credit checking companies, credit and charge card companies. We are required to co-operate with government and law enforcement agencies and the public authorities of any country in your itinerary, including customs and immigration authorities.
                            <br /><br />
                            We will disclose Profile Information and other personal information to third parties in accordance with applicable law, and generally only if: (1) you consent or authorize it; (2) the information is provided to help complete a transaction for you; (3) the information is provided to comply with the law, applicable regulations, governmental and quasi-governmental requests, court orders, to enforce our legal Policies or other agreements, or to protect our rights, property or safety or the rights, property or safety of our users or others (e.g., to a consumer reporting agency for fraud protection, to third party vendors used to screen passenger data for safety and security, etc.); (4) the disclosure is done as part of a purchase, transfer or sale of services or assets (e.g., in the event that our assets are acquired by another party, customer information may be one of the transferred assets); (5) the information is provided to our agents, outside vendors or service providers to perform functions on our behalf (e.g., analysing data, providing marketing assistance, providing customized advertising, providing customer service, processing orders, sending emails about our products or services, etc.) or with whom we may have cooperative or joint marketing arrangements; (6) the information is shared with third parties for their marketing/ advertising use, or (7) the information is revealed to others as described in this Privacy Policy. We may also anonymize or aggregate data about you and disclose such anonymized or aggregated information to third parties for promotional or other purposes.
                            <br /><br />
                            From time to time we may offer promotions or specials on behalf of companies with whom we have joint or cooperative marketing arrangements. You may take advantage of these promotions or specials by clicking on links on our Sites. You will be transferred to a different site which may not be owned or operated by Cordelia where you may be required to provide personal information in order to participate in the promoted products or services. This privacy Policy does not apply to those sites; please review the privacy Policy posted on those sites. Cordelia is not responsible for the content on those sites and therefore your use of such sites is at your own risk.
                            <br /><br />
                            Personal information about you may be shared with governmental and recognized law enforcement agencies (such as Indian Customs and Excise Department, Indian immigration Department) prior to boarding, during your cruise, or after disembarkation, for security and immigration purposes. Personal information may also be shared with these agencies in order to prevent and detect crime as well as to safeguard children and vulnerable adults.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Online Advertising
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We may share, or we may permit third-party advertising networks and other third-party partners, to collect information about your use of our Sites, or your engagement with our email communications or other marketing initiatives, over time and across devices that you use so that they may play or display ads that may be relevant to your interests on the Sites as well as on other websites or apps, or on other devices you may use. Typically, though not always, the information we share is provided through cookies or similar tracking technologies, which are discussed above.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Security Procedures to Protect Information
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Security of personal information is extremely important to us. Cordelia employs physical, administrative and technical security measures designed to prevent unauthorized access to your personal information collected on and used by Cordelia at our Sites and when providing our Services. However, it made clear that data transmission over the internet is never 100% secure.
                            <br /><br />
                            Cordelia cannot guarantee the security of any information you transmit to us or from our Sites, and therefore you use our Sites at your own risk.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Inapplicability of Privacy Policies of any Linked Sites or Other third parties
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            Cordelia's Sites may contain links to other sites such as our affiliates and third parties. This Privacy Policy only addresses Cordelia's use and disclosure of your information collected on Sites displaying this Privacy Policy. While we try to link only to sites that share our standards and respect for privacy, we are not responsible for the privacy practices of our affiliates or any other third parties or the content of linked sites, although we do encourage you to read the applicable privacy policies and terms and conditions of such parties or web sites.
                        </p>
                    </li>
                    <li>
                        <p className='text-base lg:text-lg font-semibold mt-3 lg:mt-6 !leading-7'>
                            Changes to this Privacy Policy
                        </p>
                        <p className='text-xs lg:text-base font-medium !leading-5 mt-1'>
                            We reserve our right to amend, alter, modify, add, vary this Privacy Policy at any time in future without express notice. The use of your information is subject to the prevailing Privacy Policy and Terms of Use in effect at the time of use. The provisions contained in this Privacy Policy supersede all previous notices or policies regarding our privacy practices with respect to our Sites. We strongly encourage and recommend you visit our Sites frequently to be aware of the prevailing Privacy Policy. Our Privacy Policy is also subject to any change or introduction of new or amendment to the existing Indian Laws.
                        </p>
                    </li>
                </ul>
            </main>
            <ExitIntent />
        </Layout>
    );
}