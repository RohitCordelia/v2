import React, { useState } from "react";
import { Layout } from '../../../src/components/Layout';
import ExitIntent from "../../components/ExitIntent";
import Modal from "../../components/UI/Modal/newModal";
import { useForm } from 'react-hook-form';
import Button from "../../components/UI/Button";
// import Banner from "../../components/banner";

type Props = {};
const values = [
    {
        id: 1,
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/value-integrity-01.svg",
        title: "Integrity in Every Endeavour",
        description: "We uphold the highest standards of honesty and transparency in everything we do.",
        gradient: "bg-gradient-to-r from-[#EDE6E9] via-[#FFFAEA] to-[#FFFAEA]"
        // gradient: "bg-gradient-to-r from-[hsla(283,83%,86%,1)] to-[hsla(105,11%,85%,1)]",
    },
    {
        id: 2,
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/value-excellence-02.svg",
        title: "Deliver Excellence, Every Wave",
        description: "We are committed to delivering exceptional experiences for our guests and team.",
        gradient: "bg-gradient-to-r from-[#BFE2E6] via-[#D5F2D3] to-[#E2F9E4]"
        // gradient: "bg-gradient-to-r from-[hsla(46,73%,75%,1)] to-[hsla(176,73%,88%,1)]",
    },
    {
        id: 3,
        icon: "https://images.cordeliacruises.com/cordelia_v2/public/assets/value-team-03.svg",
        title: "Play as a Team",
        description: "Collaboration drives our success, both on land and at sea.",
        gradient: "bg-gradient-to-r from-[#E6F1ED] via-[#D4DFF8] to-[#EFF1FC]"
    },
];

const categories = [
    // {
    //     id: 1,
    //     title: "Quality Assurance (QA) Engineer",
    //     roles: "1 Open Role",
    //     jobs: [
    //         {
    //             title: "Quality Assurance (QA) Engineer",
    //             location: "Mumbai",
    //             experience: "1 Year +",
    //             description:
    //                 "We are looking for a detail-oriented and proactive Quality Assurance (QA) Engineer with over 4 years of experience in software testing. The ideal candidate will have a strong understanding of QA methodologies and practices, with a keen eye for detail. Experience with automation testing is a significant advantage. This role involves ensuring the quality and reliability of our software products through comprehensive testing strategies",
    //             KeyResponsibilities:
    //                 <ul>
    //                     <li>Test Planning and Execution: Develop, document, and execute comprehensive test plans,
    //                         test cases, and test scripts.</li>
    //                     <li> Manual Testing: Perform thorough manual testing to identify software defects and ensure
    //                         product quality.</li>
    //                     <li> Automation Testing: Design, implement, and maintain automated test scripts using tools
    //                         such as Selenium, JUnit, TestNG, or similar.</li>
    //                     <li>  Defect Tracking: Identify, log, and track software defects using bug tracking tools like JIRA,
    //                         Bugzilla, or similar.</li>
    //                     <li>Collaboration: Work closely with development teams to understand the functionality,
    //                         requirements, and potential issues.</li>
    //                     <li> Regression Testing: Conduct regular regression testing to ensure existing functionality is not
    //                         compromised by new changes.</li>
    //                     <li> Performance Testing: Conduct performance and load testing to ensure the software meets
    //                         performance standards. </li>
    //                     <li> Documentation: Maintain detailed and accurate documentation of test cases, test results,
    //                         and defects. </li>
    //                     <li> Continuous Improvement: Stay updated with the latest QA trends, tools, and methodologies.
    //                         Advocate for and implement improvements to the QA process.</li>
    //                     <br></br>
    //                     <b>Required Qualifications:</b>
    //                     <li> Bachelor’s degree in Computer Science, Information Technology, or related field. </li>
    //                     <li> Over 4 years of experience in software testing, including both manual and automation
    //                         testing.</li>
    //                     <li>  Strong understanding of software QA methodologies, tools, and processes.</li>
    //                     <li>  Hands-on experience with automation testing tools such as Selenium, JUnit, TestNG, or
    //                         similar.</li>
    //                     <li>   Proficiency in scripting languages such as Python, Java, or JavaScript for automation.</li>
    //                     <li>  Experience with bug tracking and test management tools (e.g., JIRA, Bugzilla, TestRail)`,</li>
    //                     <li> Excellent analytical and problem-solving skills.</li>
    //                     <li> Strong verbal and written communication skills.</li>
    //                     <li> Ability to work collaboratively in a fast-paced, agile environment.</li>
    //                     <br></br>
    //                     <b>Preferred Qualifications</b>

    //                     <li> Experience with performance and load testing tools (e.g., JMeter, LoadRunner).</li>
    //                     <li> Knowledge of CI/CD tools and processes (e.g., Jenkins, GitLab CI/CD).</li>
    //                     <li> Familiarity with cloud environments (e.g., AWS, Azure, Google Cloud).</li>
    //                     <li>ISTQB or equivalent certification.</li>
    //                 </ul>,

    //         },
    //     ],
    // },
    // {
    //     id: 2,
    //     title: "Engineering Manager (Full Stack)",
    //     roles: "1 Open Role",
    //     jobs: [
    //         {
    //             title: "Engineering Manager (Full Stack)",
    //             location: "Mumbai",
    //             experience: "",
    //             description:
    //                 "We are seeking a skilled Full Stack Developer to join our team and contribute to building high-quality, scalable, and secure web applications. The ideal candidate will be responsible for both front-end and back-end development, ensuring seamless integration and a user-friendly experience. You will work closely with designers, project managers, and other developers to deliver cutting-edge solutions that meet business and customer needs",

    //             KeyResponsibilities:
    //                 <ul>
    //                     <b>Front-End Development:</b>
    //                     <li>Design, develop, and maintain user interfaces using modern web technologies (e.g.,
    //                         React, Angular, Vue.js).</li>
    //                     <li>Ensure responsive and mobile-first designs for seamless cross-device functionality.</li>
    //                     <li>Optimize UI for speed, scalability, and user engagement.</li>
    //                     <li> Collaborate with UX/UI designers to translate mockups and wireframes into
    //                         functional interfaces.</li>
    //                     <br></br>
    //                     <b>Back-End Development:</b>
    //                     <li>Build and maintain server-side logic and APIs using technologies like Node.js,
    //                         Python, Ruby, Java, or PHP.</li>
    //                     <li>Develop and manage databases (e.g., MySQL, PostgreSQL, MongoDB).</li>
    //                     <li>Ensure secure authentication and authorization mechanisms.</li>
    //                     <li>Optimize application performance, scalability, and reliability.</li>
    //                     <br></br>
    //                     <b>DevOps and Deployment:</b>
    //                     <li>Configure and manage cloud environments (e.g., AWS, Azure, GCP).</li>
    //                     <li>Automate deployment pipelines using CI/CD tools.</li>
    //                     <li>Monitor and resolve production issues, ensuring uptime and performance.</li>
    //                     Collaboration and Leadership:
    //                     <li>Work with cross-functional teams to define, design, and ship new features.</li>
    //                     <li>Conduct code reviews to ensure quality and consistency.</li>
    //                     <li>Mentor junior developers and contribute to technical discussions and
    //                         decision-making</li>
    //                     <br></br>
    //                     <b>Required Qualifications</b>
    //                     <li> Bachelor’s degree in Computer Science, Information Technology, or related field. </li>
    //                     <li> Over 4 years of experience in software testing, including both manual and automation
    //                         testing.</li>
    //                     <li>  Strong understanding of software QA methodologies, tools, and processes.</li>
    //                     <li>  Hands-on experience with automation testing tools such as Selenium, JUnit, TestNG, or
    //                         similar.</li>
    //                     <li>   Proficiency in scripting languages such as Python, Java, or JavaScript for automation.</li>
    //                     <li>  Experience with bug tracking and test management tools (e.g., JIRA, Bugzilla, TestRail)`,</li>
    //                     <li> Excellent analytical and problem-solving skills.</li>
    //                     <li> Strong verbal and written communication skills.</li>
    //                     <li> Ability to work collaboratively in a fast-paced, agile environment.</li>
    //                     <br></br>
    //                     <b>Preferred Qualifications</b>
    //                     <li>Education: Bachelor’s degree in Computer Science, Engineering, or a related field
    //                         (or equivalent experience).</li>
    //                     <li> Experience: 2-5+ years of experience as a Full Stack Developer or in a similar role.</li>
    //                     <br></br>
    //                     <b> Technical Skills:</b>
    //                     <li>Proficiency in front-end technologies (HTML5, CSS3, JavaScript, and frameworks
    //                         like React, Angular, or Vue.js).</li>
    //                     <li>Strong back-end programming skills with Node.js, Python, Ruby, Java, or PHP.</li>
    //                     <li>Experience with database design and management (MySQL, PostgreSQL,
    //                         MongoDB).</li>
    //                     <li>Familiarity with RESTful and GraphQL APIs.</li>
    //                     <li>Knowledge of version control systems (e.g., Git).</li>
    //                     <li>Exposure to containerization and orchestration tools like Docker and Kubernetes.</li>
    //                     <li>Understanding of DevOps tools (Jenkins, GitLab CI/CD, etc.).</li>
    //                     <li>Experience with cloud platforms (AWS, Azure, or GCP)</li>
    //                     <br></br>
    //                     <b> Soft Skills:</b>
    //                     <li> Strong problem-solving and analytical skills.</li>
    //                     <li>Excellent communication and teamwork abilities.</li>
    //                     <li> Adaptability to work in a fast-paced environment and meet tight deadlines</li>
    //                 </ul>,

    //         },
    //     ],
    // },
    // {
    //     id: 3,
    //     title: "Assistant Product Manager",
    //     roles: "1 Open Role",
    //     jobs: [
    //         {
    //             title: "Assistant Product Manager",
    //             location: "Mumbai",
    //             experience: "2-4 years",
    //             description:
    //                 `We are seeking a dynamic and motivated Assistant Product Manager to join our product management team. The ideal candidate will have a strong background in product management, with experience in the travel industry considered a significant plus. This role will support the Product Manager in the development and execution of product strategies, ensuring the delivery of high-quality products that meet guests needs and business goals.`,
    //             KeyResponsibilities:
    //                 <ul>
    //                     <li>Assist in the development and implementation of product strategies in
    //                         alignment with company goals and market demands</li>
    //                     <li> Conduct market research and competitor analysis to identify opportunities
    //                         and threats.</li>
    //                     <li> Collaborate with cross-functional teams, including engineering, design,
    //                         marketing, and sales, to ensure product development aligns with market
    //                         needs.</li>
    //                     <li> Support the Product Manager in defining product requirements, creating
    //                         product roadmaps, and prioritizing features.</li>
    //                     <li>Participate in product launches, ensuring all aspects of the product are ready
    //                         for market introduction.</li>
    //                     <li>Monitor product performance, gather customer feedback, and identify areas
    //                         for improvement.</li>
    //                     <li>Assist in managing the product lifecycle from conception through to
    //                         end-of-life. </li>
    //                     <li> Prepare product documentation, presentations, and training materials for
    //                         internal and external stakeholders. </li>
    //                     <li> Stay updated on industry trends, emerging technologies, and best practices in
    //                         product management</li>
    //                     <li> Analyze and break down requirements to write clear and concise user stories.</li>
    //                     <li> Utilize Atlassian tools (such as Jira and Confluence) for project management
    //                         and documentation</li>
    //                     <li>Have a basic understanding of how APIs work to facilitate communication
    //                         between systems.</li>
    //                     <br></br>
    //                     <b> Preferred Background:</b>
    //                     <li><b>Education:</b> Bachelor’s degree in Business, Marketing, Engineering, or a related
    //                         field. MBA or advanced degree is a plus</li>
    //                     <li><b>Experience:</b>  2-4 years of experience in product management. Experience in
    //                         the travel industry is a significant plus.</li>
    //                     <br></br>
    //                     <li><b>Skills:</b></li>
    //                     <li> Strong analytical and problem-solving abilities.</li>
    //                     <li> Excellent communication and interpersonal skills.</li>
    //                     <li>  Proficiency in project management tools and methodologies.</li>
    //                     <li> Ability to work collaboratively in a fast-paced, team-oriented
    //                         environment.</li>
    //                     <li> Familiarity with Agile and Scrum methodologies is a plus.</li>
    //                     <li> Hands-on experience with Atlassian tools (Jira, Confluence).</li>
    //                     <li> Ability to analyze and break down requirements to write user stories.</li>
    //                     <li> Basic knowledge of how APIs work.</li>
    //                     <br></br>
    //                     <li><b>Knowledge:</b></li>
    //                     <li> Experience with travel-related products, such as booking systems,
    //                         travel apps, or travel services is a plus.</li>
    //                     <li> In-depth understanding of market trends, customer needs, and
    //                         competitive landscape.</li>
    //                     <br></br>
    //                     <li><b>Attributes:</b></li>
    //                     <li> Highly organized with strong attention to detail.</li>
    //                     <li> Proactive and self-motivated with a passion for product development</li>
    //                     <li> Customer-focused mindset with a commitment to delivering
    //                         high-quality products. </li>
    //                 </ul>,
    //         },

    //     ],
    // },
    // {
    //     id: 4,
    //     title: "Jr. Front End Developer (React JS)",
    //     roles: "1 Open Role",
    //     jobs: [
    //         {
    //             title: "Jr. Front End Developer (React JS)",
    //             location: "Mumbai",
    //             experience: "2-3 years",
    //             description:
    //                 "We are seeking a talented and experienced Front-End Developer to join our dynamic team. The ideal candidate should have a strong understanding of front-end technologies, be proficient in creating visually appealing and intuitive web interfaces, and collaborate effectively with cross-functional teams. If you are passionate about creating seamless user experiences and staying updated on the latest trends in web development, we want to hear from you.",
    //             KeyResponsibilities:
    //                 <ul>
    //                     <li>Develop responsive and user-friendly web interfaces using HTML, CSS, and JavaScript.</li>
    //                     <li>Implement and maintain high-quality code to meet project requirements.</li>
    //                     <li>Collaborate with back-end developers and UI/UX designers to integrate front-end code with server-side logic.</li>
    //                     <li>Ensure consistent user experiences across different browsers and devices.</li>
    //                     <li>Identify and troubleshoot compatibility issues.</li>
    //                     <li>Optimize web pages for maximum speed and scalability.</li>
    //                     <li>Conduct performance testing and implement improvements as needed.</li>
    //                     <li>Write clean, modular, and well-documented code.</li>
    //                     <li>Participate in code reviews to ensure code quality and adherence to best practices.</li>
    //                     <li>Collaborate with cross-functional teams, including designers, back-end developers, and product managers, to deliver high-quality solutions.</li>
    //                     <li>Communicate effectively with team members and stakeholders.</li>
    //                     <li>Stay informed about industry trends, best practices, and emerging technologies.</li>
    //                     <li>Continuously enhance skills and knowledge to remain at the forefront of front-end development.</li>
    //                     <br></br>


    //                     <b>Required Qualifications</b>
    //                     <li>Bachelor's degree in Computer Science, Web Development, or a related field.</li>
    //                     <li>Proven 2-3 years of experience as a Front-End Developer or similar role.</li>
    //                     <li>Proficient in HTML5, CSS3, JavaScript, and modern front-end frameworks - React.</li>
    //                     <li>Experience with responsive design and cross-browser compatibility.</li>
    //                     <li>Familiarity with build tools and package managers (e.g., Webpack, npm).</li>
    //                     <li>Strong problem-solving skills and attention to detail.</li>
    //                     <li>Ability to debug and troubleshoot issues efficiently.</li>
    //                     <li>Excellent collaboration and communication skills.</li>
    //                     <li>Ability to work effectively in a team environment.</li>
    //                     <li>A portfolio showcasing previous work and projects is highly desirable.</li>
    //                 </ul>,
    //         }
    //     ],
    // },
    // {
    //     id: 5,
    //     title: "Backend Developer",
    //     roles: "1 Open Role",
    //     jobs: [
    //         {
    //             title: "Backend Developer",
    //             location: "Mumbai",
    //             Job_Type: "Full-Time",
    //             experience: "2+ years",
    //             description:
    //                 "We are seeking a highly skilled and experienced Backend Developer with expertise in Node.js to join our team. As a Backend Developer, you will design, develop, and maintain robust backend solutions, ensuring scalability, performance, and eliability for our applications.",
    //             KeyResponsibilities:
    //                 <ul>
    //                     <li>Develop and maintain server-side applications using <b>Node.js</b></li>
    //                     <li>Collaborate with front-end developers, designers, and product managers to develop
    //                         and integrate APIs.</li>
    //                     <li>Design and implement <b>RESTful APIs</b> and/or <b>GraphQL APIs</b> to support our
    //                         applications.</li>
    //                     <li>Optimize backend performance to ensure responsiveness and scalability.</li>
    //                     <li>Integrate with third-party APIs and external systems as required.</li>
    //                     <li>Manage databases (SQL/NoSQL) including schema design and query optimization.</li>
    //                     <li>Implement security best practices to protect data and systems.</li>
    //                     <li>Troubleshoot and debug applications for optimal performance and stability.</li>
    //                     <li>Collaborate with DevOps to manage CI/CD pipelines, deployments, and cloud
    //                         infrastructure.</li>
    //                     <li>Write clean, maintainable, and well-documented code.</li>
    //                     <br></br>


    //                     <b>Required Qualifications</b>
    //                     <li>Proven experience as a <b>Backend Developer</b> with expertise in <b>Node.js</b>.</li>
    //                     <li>Strong understanding of <b>JavaScript (ES6+)</b> and asynchronous programming.</li>
    //                     <li>Proficiency in designing and working with <b>RESTful</b> and <b>GraphQL APIs</b>.</li>
    //                     <li>Experience with database management systems such as <b>MongoDB, PostgreSQL, or MySQL</b>.</li>
    //                     <li>Familiarity with cloud platforms like <b>AWS, Google Cloud, or Azure.</b></li>
    //                     <li>Understanding of version control systems (e.g., <b>Git</b>) and CI/CD pipelines.</li>
    //                     <li>Knowledge of modern frameworks/libraries such as <b>Express.js, Nest.js</b>, or similar.</li>
    //                     <li>Strong problem-solving skills and attention to detail.</li>
    //                     <li>Familiarity with microservices architecture is a plus.</li>
    //                     <li>Excellent communication and teamwork skills.</li>
    //                     <br />

    //                     <b>Nice-to-Have Skills:</b>
    //                     <li>Experience with <b>TypeScript</b>.</li>
    //                     <li>Knowledge of containerization tools like <b>Docker</b> and orchestration platforms like <b>Kubernetes</b>.</li>
    //                     <li>Proficiency in designing and working with <b>RESTful</b> and <b>GraphQL APIs</b>.</li>
    //                     <li>Experience with real-time applications using technologies like <b>WebSockets</b> or <b>Socket.IO</b>.</li>
    //                     <li>Exposure to testing frameworks (e.g., <b>Jest, Mocha, Chai</b>).</li>
    //                     <br />
    //                     <b>Qualifications:</b>
    //                     <li>Bachelor's degree in Computer Science, Engineering, or a related field (or equivalent
    //                         experience).</li>
    //                     <li>2+ years of experience in backend development with Node.js.</li>
    //                 </ul>,
    //         }
    //     ],
    // },
    // {
    //     id: 6,
    //     title: "Full Stack Developer",
    //     roles: "1 Open Role",
    //     jobs: [
    //         {
    //             title: "Full Stack Developer",
    //             location: "Mumbai",
    //             experience: "2-5+ years",
    //             Job_Type: "Full-Time",
    //             description:
    //                 "We are seeking a skilled Full Stack Developer to join our team and contribute to building high-quality, scalable, and secure web applications. The ideal candidate will be responsible for both front-end and back-end development, ensuring seamless integration and a user-friendly experience. You will work closely with designers, project managers, and other developers to deliver cutting-edge solutions that meet business and customer needs.",
    //             KeyResponsibilities:
    //                 <ul>
    //                     <b>Key Responsibilities:</b>
    //                     <b>Front-End Development:</b>
    //                     <li>Design, develop, and maintain user interfaces using modern web technologies (e.g., React, Angular, Vue.js).</li>
    //                     <li>Ensure responsive and mobile-first designs for seamless cross-device functionality.</li>
    //                     <li>Optimize UI for speed, scalability, and user engagement.</li>
    //                     <li>Collaborate with UX/UI designers to translate mockups and wireframes into functional interfaces.</li>

    //                     <br></br>


    //                     <b>Back-End Development:</b>
    //                     <li>Build and maintain server-side logic and APIs using technologies like Node.js, Python, Ruby, Java, or PHP.</li>
    //                     <li>Develop and manage databases (e.g., MySQL, PostgreSQL, MongoDB).</li>
    //                     <li>Ensure secure authentication and authorization mechanisms.</li>
    //                     <li>Optimize application performance, scalability, and reliability.</li>
    //                     <br />

    //                     <b>DevOps and Deployment:</b>
    //                     <li>Configure and manage cloud environments (e.g., AWS, Azure, GCP).</li>
    //                     <li>Automate deployment pipelines using CI/CD tools.</li>
    //                     <li>Monitor and resolve production issues, ensuring uptime and performance.</li>
    //                     <br />
    //                     <b>Collaboration and Leadership:</b>
    //                     <li>Work with cross-functional teams to define, design, and ship new features.</li>
    //                     <li>Conduct code reviews to ensure quality and consistency.</li>
    //                     <li>Mentor junior developers and contribute to technical discussions and decision-
    //                         making.</li>

    //                     <br />
    //                     <b>Required Skills and Qualifications:</b>
    //                     <li><b>Education:</b> Bachelor’s degree in Computer Science, Engineering, or a related field
    //                         (or equivalent experience).</li>
    //                     <li><b>Experience:</b> 2-5+ years of experience as a Full Stack Developer or in a similar role.</li>

    //                     <br />
    //                     <b>Technical Skills:</b>
    //                     <li>Proficiency in front-end technologies (HTML5, CSS3, JavaScript, and frameworks like React, Angular, or Vue.js).</li>
    //                     <li>Strong back-end programming skills with Node.js, Python, Ruby, Java, or PHP.</li>
    //                     <li>Experience with database design and management (MySQL, PostgreSQL, MongoDB).</li>
    //                     <li>Familiarity with RESTful and GraphQL APIs.</li>
    //                     <li>Knowledge of version control systems (e.g., Git).</li>
    //                     <li>Exposure to containerization and orchestration tools like Docker and Kubernetes.</li>
    //                     <li>Understanding of DevOps tools (Jenkins, GitLab CI/CD, etc.).</li>
    //                     <li>Experience with cloud platforms (AWS, Azure, or GCP).</li>
    //                     <br />
    //                     <b>Soft Skills:</b>
    //                     <li>Strong problem-solving and analytical skills.</li>
    //                     <li>Excellent communication and teamwork abilities.</li>
    //                     <li>Adaptability to work in a fast-paced environment and meet tight deadlines.</li>
    //                 </ul>,
    //         }
    //     ],
    // },
    {
        id: 1,
        title: "Assistant Manager - Corporate Sales and (Travel & Trade)",
        roles: "1 Open Role",
        jobs: [
            {
                title: "Assistant Manager - Corporate Sales and (Travel & Trade)",
                location: "Chennai",
                experience: "6+ years",
                description:
                    `We are looking for a motivated and dynamic Assistant Manager - Corporate Sales to support and grow our presence in the B2B corporate and travel trade space. The role involves managing relationships with corporate clients and travel partners, assisting in lead generation, and supporting business development and revenue objectives.`,
                KeyResponsibilities:
                    <ul>
                        <li>Assist in identifying and developing new corporate and trade partnerships.</li>
                        <li>Promote Cordelia Cruises as a premium leisure and MICE option to B2B clients and travel agents.</li>
                        <li>Maintain and nurture relationships with existing clients to drive repeat business.</li>
                        <li> Support the Senior Sales Manager in implementing sales strategies and achieving team targets.</li>
                        <li> Handle client queries and coordinate with internal departments for seamless pre- and post-sale experiences.</li>
                        <li>Represent the brand at trade shows, networking events, and corporate meetings as required.</li>
                        <li>Track and maintain sales reports, lead conversion status, and feedback using CRM tools.</li>
                        <br />

                        <b>Key Skills and Attributes</b>
                        <li>6+ years of experience in corporate sales, preferably in the travel, hospitality, or tourism sectors.</li>
                        <li>Strong interpersonal and relationship management skills.</li>
                        <li>Effective verbal and written communication abilities.</li>
                        <li>A proactive approach with a passion for the travel industry.</li>
                        <li>Understanding of MICE, B2B travel dynamics, and sales cycle.</li>
                        <li>Ability to work independently as well as within a team.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>Masters / Bachelor’s degree in Business Administration, Travel & Tourism, or Hospitality Management. (Masters preferred)</li>
                        <li>Prior experience in corporate or travel trade sales is preferred.</li>
                        <li>Knowledge of domestic tourism trends and B2B sales dynamics.</li>
                        <br />

                        <b>Why Join Us?</b>
                        <li>Be part of India’s first and only premium cruise line.</li>
                        <li>Work with a fast-growing and dynamic sales team in the luxury travel space.</li>
                        <li>Get exposure to high-value corporate clients and partners.</li>
                        <li>Contribute to building the cruise travel ecosystem in India.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 2,
        title: "Assistant Manager – B2B Travel & Trade",
        roles: "1 Open Role",
        jobs: [
            {
                title: "Assistant Manager – B2B Travel & Trade",
                location: "Kochi",
                experience: "6+ years",
                description:
                    `As an Assistant Manager – B2B Travel & Trade, your role is to actively support the expansion of Cordelia Cruises' presence in the travel agency and trade partner ecosystem. You'll assist in driving group and cabin sales through trade channels, building and nurturing agency relationships, and supporting regional revenue targets through focused B2B strategies.  `,
                KeyResponsibilities:
                    <ul>
                        <li>Assist in planning and executing sales strategies for the travel trade segment.</li>
                        <li>Develop and maintain strong relationships with travel agencies, consolidators, and tour operators.</li>
                        <li>Support trade partners in selling Cordelia Cruises by providing training, product knowledge, and promotional tools.</li>
                        <li>Track and manage leads, inquiries, and conversions through the agency network.</li>
                        <li>Attend travel exhibitions, roadshows, and trade events to represent Cordelia Cruises and strengthen market presence.</li>
                        <li> Coordinate with the internal sales and operations teams to ensure smooth booking, payment, and service delivery processes.</li>
                        <li>Assist in gathering market intelligence and competitor insights to refine sales efforts.</li>
                        <li>Monitor performance of partner agencies and share regular reports with the regional B2B head.</li>
                        <br />

                        <b>Skills & Experience</b>
                        <li>6+ years of experience in B2B sales or trade relations, preferably in travel, cruises, tourism, or hospitality.</li>
                        <li>Familiarity with the travel agency and tour operator ecosystem in the assigned region.</li>
                        <li>Strong relationship-building and communication skills.</li>
                        <li>Ability to handle multiple partner accounts and follow through on sales closures.</li>
                        <li>Proficiency in MS Office and CRM tools for reporting and pipeline management.</li>
                        <li>A proactive, enthusiastic approach with a passion for travel.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>Masters and Bachelor’s degree in Travel & Tourism, Hospitality, or Business Administration. (Masters preffered)</li>
                        <li>Prior exposure to leisure travel sales, cruises, or group travel will be an advantage.</li>
                        <br />

                        <b>Why Join Us?</b>
                        <li>Be part of a pioneering brand in India’s premium cruise tourism segment.</li>
                        <li>Get hands-on experience working with leading travel trade professionals.</li>
                        <li>Opportunity to grow in a dynamic, customer-focused, and fast-growing organization.</li>
                        <li>Help drive the adoption of cruising as a preferred holiday and group travel option in India.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 3,
        title: "Regional Manager – South – B2B Division",
        roles: "1 Open Role",
        jobs: [
            {
                title: "Regional Manager – South – B2B Division",
                location: "Chennai",
                experience: "6+ years",
                description:
                    `At Cordelia Cruises, India's premier cruise line, we are committed to redefining the luxury travel experience. The CSM will play a critical role in engaging directly with corporate clients across diverse industries, driving cruise cabin sales, and expanding strategic partnerships. The role is crucial for achieving revenue targets, growing business opportunities, and enhancing our brand presence in the luxury hospitality & leisure sector.`,
                KeyResponsibilities:
                    <ul>
                        <li>Develop, plan and implement sales strategies to drive cabin sales and achieve revenue targets.</li>
                        <li>Identify and engage directly with corporate clients across various industries to promote Cordelia Cruises as a premium business and leisure option.</li>
                        <li>Networking: Establish and maintain strong relationships with corporate clients, travel agencies, and key stakeholders.</li>
                        <li>Proactively seek and develop new business opportunities to expand corporate partnerships and market reach.</li>
                        <li>Present and communicate the unique value proposition of Cordelia Cruises to clients, focusing on corporate experiences, MICE (Meetings, Incentives, Conferences, and Exhibitions), and leisure travel.</li>
                        <li>Ensure a high standard of client service, identifying and addressing corporate client needs effectively.</li>
                        <li>Represent Cordelia Cruises at corporate events, trade shows, and networking functions to enhance brand visibility and develop strategic business relationships.</li>
                        <li>Work closely with the internal teams, including operations and customer service, to ensure a seamless experience for corporate clients.</li>
                        <li>Maintain accurate sales data, forecasts, and client relationship records, leveraging analytics to track performance and optimize sales strategies.</li>
                        <br />

                        <b>Skills & Experience</b>
                        <li>Proven corporate sales experience in the travel, hospitality, or luxury service industry, preferably in high-end hotels, airlines, or luxury travel brands.</li>
                        <li>Strong ability to build and maintain direct relationships with corporate clients from various industries.</li>
                        <li>Excellent negotiation, communication, and presentation skills with the ability to engage decision-makers.</li>
                        <li>Strategic mind-set with a results-driven approach to achieving revenue growth and business expansion.</li>
                        <li>Good knowledge of corporate travel trends, sales analytics, and market insights.</li>
                        <li>Be part of India’s premier cruise line and drive strategic corporate partnerships.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>Masters or Bachelor’s degree in Business Administration, Hospitality Management, or a related field.</li>
                        <li>Minimum 6 years of experience in Corporate Sales, preferably in the Hotel or travel industry</li>
                        <li>Experience in the Corporate/ B2B sector with a focus on domestic priority sales is highly desirable.</li>
                        <br />

                        <b>Why Join Us?</b>
                        <li>Work in a fast-paced, dynamic, and high-impact luxury travel environment.</li>
                        <li>Engage directly with corporate clients across diverse industries, driving premium sales.</li>
                        <li>Contribute to the expansion of Cordelia Cruises as a preferred choice for corporate travel and premium experiences.</li>
                        <li>Be a key player in shaping the future of luxury travel in India.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 4,
        title: "Senior Manager - Corporate Sales",
        roles: "1 Open Role",
        jobs: [
            {
                title: "Senior Manager - Corporate Sales",
                location: "Mumbai",
                experience: "6+ years",
                description:
                    `At Cordelia Cruises, India's premier cruise line, we are committed to redefining the luxury travel experience. The CSM will play a critical role in engaging directly with corporate clients across diverse industries, driving cruise cabin sales, and expanding strategic partnerships. The role is crucial for achieving revenue targets, growing business opportunities, and enhancing our brand presence in the luxury hospitality & leisure sector.`,
                KeyResponsibilities:
                    <ul>
                        <li>Develop, plan and implement sales strategies to drive cabin sales and achieve revenue targets.</li>
                        <li>Identify and engage directly with corporate clients across various industries to promote Cordelia Cruises as a premium business and leisure option.</li>
                        <li>Networking: Establish and maintain strong relationships with corporate clients, travel agencies, and key stakeholders.</li>
                        <li>Proactively seek and develop new business opportunities to expand corporate partnerships and market reach.</li>
                        <li>Present and communicate the unique value proposition of Cordelia Cruises to clients, focusing on corporate experiences, MICE (Meetings, Incentives, Conferences, and Exhibitions), and leisure travel.</li>
                        <li>Ensure a high standard of client service, identifying and addressing corporate client needs effectively.</li>
                        <li>Represent Cordelia Cruises at corporate events, trade shows, and networking functions to enhance brand visibility and develop strategic business relationships.</li>
                        <li>Work closely with the internal teams, including operations and customer service, to ensure a seamless experience for corporate clients.</li>
                        <li>Maintain accurate sales data, forecasts, and client relationship records, leveraging analytics to track performance and optimize sales strategies.</li>
                        <br />

                        <b>Skills & Experience</b>
                        <li>Proven corporate sales experience in the travel, hospitality, or luxury service industry, preferably in high-end hotels, airlines, or luxury travel brands.</li>
                        <li>Strong ability to build and maintain direct relationships with corporate clients from various industries.</li>
                        <li>Excellent negotiation, communication, and presentation skills with the ability to engage decision-makers.</li>
                        <li>Strategic mind-set with a results-driven approach to achieving revenue growth and business expansion.</li>
                        <li>Good knowledge of corporate travel trends, sales analytics, and market insights.</li>
                        <li>Be part of India’s premier cruise line and drive strategic corporate partnerships.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>Masters or Bachelor’s degree in Business Administration, Hospitality Management, or a related field.</li>
                        <li>Minimum 6 years of experience in Corporate Sales, preferably in the Hotel or travel industry</li>
                        <li>Experience in the Corporate/ B2B sector with a focus on domestic priority sales is highly desirable.</li>
                        <br />

                        <b>Why Join Us?</b>
                        <li>Work in a fast-paced, dynamic, and high-impact luxury travel environment.</li>
                        <li>Engage directly with corporate clients across diverse industries, driving premium sales.</li>
                        <li>Contribute to the expansion of Cordelia Cruises as a preferred choice for corporate travel and premium experiences.</li>
                        <li>Be a key player in shaping the future of luxury travel in India.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 5,
        title: "B2B Sales Manager",
        roles: "1 Open Role",
        jobs: [
            {
                title: "B2B Sales Manager",
                location: "Mumbai",
                experience: "",
                description:
                    `At Cordelia Cruises, India's premier cruise line, we are committed to redefining the luxury travel experience. The CSM will play a critical role in engaging directly with corporate clients across diverse industries, driving cruise cabin sales, and expanding strategic partnerships. The role is crucial for achieving revenue targets, growing business opportunities, and enhancing our brand presence in the luxury hospitality & leisure sector.`,
                KeyResponsibilities:
                    <ul>
                        <li>Approach targeted business clients via multiple channels.</li>
                        <li>Generate new client leads.</li>
                        <li>Manage relationships with existing customers.</li>
                        <li>Conduct competitor analysis and assess sales strategy efficiency.</li>
                        <li>Develop and implement effective sales strategies.</li>
                        <li>Set and monitor sales goals and KPIs.</li>
                        <li>Analyze market trends and identify growth opportunities.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>Bachelor's degree in business, sales, or related field.</li>
                        <li>Proven experience in B2B sales.</li>
                        <li>Strong relationship-building, communication, and negotiation skills.</li>
                        <li>Ability to work independently and manage one's own time.</li>
                        <li>Ability to build relationships and close deals.</li>
                        <li>Flexibility to work evenings, weekends, and travel as required.</li>
                        <li>Positive attitude, team player mentality, and a passion for delivering exceptional customer experiences.</li>
                        <br />

                        <b>Employee Benefits:</b>
                        <li>Paid leaves: 26 days of annual paid leave for employees.</li>
                        <li>Paid mediclaim: Comprehensive medical coverage of yearly Rs. 7 lakhs with premium of Rs. 850 per month for maximum 6 immediate family members.</li>
                        <li>Insurance coverage: Insurance package provided to all employees.</li>
                        <li>Orientation tour on the cruise for one day.</li>
                        <li>Well-equipped cafeteria providing variety of delicious food options.</li>
                        <li>Employee discounts on cruise booking for friends and family.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 6,
        title: "Content & Design",
        roles: "1 Open Role",
        jobs: [
            {
                title: "Content & Design",
                location: "Mumbai (Lower Parel)",
                experience: "9+ years",
                description:
                    `We’re looking for a storyteller and brand guardian who can take charge of all content touchpoints for Cordelia Cruises. You’ll own the end-to-end brand content strategy for Cordelia Cruises, collaborating with social media, CRM, product, and onboard marketing to make sure we sound like one brand everywhere — whether it’s an Instagram Reel, a loyalty email, or a digital sign on deck.  `,
                KeyResponsibilities:
                    <ul>
                        <li>Build and oversee Cordelia’s cross-platform content strategy.</li>
                        <li>Collaborate with product, CRM, sales, and tech teams to align messaging.</li>
                        <li>Lead content creation across:</li>
                        <ul>
                            <li>Social media</li>
                            <li>CRM (emailers, WhatsApp)</li>
                            <li>Website content</li>
                            <li>Push notifications</li>
                            <li>In-app content and UX copy</li>
                            <li>Blogs and SEO articles</li>
                            <li>Offline collaterals (brochures, standees, tent cards, signage)</li>
                            <li>Video scripts and storyboards</li>
                        </ul>
                        <li>Coordinate with freelance designers and agency partners.</li>
                        <li>Ensure consistency of brand tone, voice, and visual language.</li>
                        <li>Review, proof, and QA all content before launch.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>9+ years of experience in content strategy or brand communication.</li>
                        <li>Strong writing and editing skills; visual sensibility is a bonus.</li>
                        <li>Experience working across web, social, CRM, and print collaterals.</li>
                        <li>Travel, lifestyle, or hospitality experience preferred.</li>
                        <li>Prior exposure to UX writing or product marketing.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 7,
        title: "Holiday Cruise Sales Expert",
        roles: "1 Open Role",
        jobs: [
            {
                title: "Holiday Cruise Sales Expert",
                location: "Mumbai (Lower Parel)",
                experience: "2-4 years",
                description:
                    `As a Holiday Cruise Sales Expert, you will be the first point of contact for
travelers looking to experience the luxury of Cordelia Cruises. This role
is perfect for individuals who are passionate about sales, customer
engagement, and delivering exceptional travel experiences. You will be
responsible for guiding potential customers, understanding their holiday
preferences, and curating personalized cruise experiences that match
their needs.This is a high-energy role where you’ll interact with
customers through inbound, outbound, and WhatsApp sales channels,
helping them choose from our premium offerings. Success in this role is
measured through sales targets, including lead conversions, revenue
generation, and customer retention. You will work towards achieving
individual and team-based goals while maintaining high standards of
customer engagement and service excellence.
This is a fantastic opportunity to develop your sales career in the luxury
travel industry, interact with high-net-worth clients, and be part of India’s
leading premium cruise line.
`,
                KeyResponsibilities:
                    <ul>
                        <li>Conduct Inbound/outbound calls to potential customers and provide detailed information on cabin categories, itineraries, pricing, and onboard experiences.</li>
                        <li>Identify customer preferences and offer tailored cruise packages.</li>
                        <li>Upsell and cross-sell premium cabins, suite experiences, and onboard services (dining, spa, entertainment).</li>
                        <li>Follow up with potential leads to close sales and ensure a seamless booking experience.</li>
                        <li>Handle high-net-worth individuals (HNWIs) with a professional and customer-first approach that aligns with Cordelia Cruises’ luxury service standards.</li>
                        <li>Maintain a polished, professional, and structured approach in all interactions.</li>
                        <li>Adhere to high call quality standards, ensuring clear, confident, and persuasive communication.</li>
                        <li>Maintain accurate records of customer interactions, bookings, and follow-ups in the CRM system.</li>
                        <li>Track sales performance and conversion metrics.</li>
                        <li>Stay updated on cruise schedules, promotions, and competitor trends.</li>
                        <br />

                        <b>Key Skills & Expertise</b>
                        <li>Strong lead conversion and upselling skills.</li>
                        <li>Excellent verbal & written communication.</li>
                        <li>Professional call handling & email etiquette.</li>
                        <li>Strong negotiation and persuasion abilities.</li>
                        <li>Proficiency in CRM tools and sales tracking.</li>
                        <li>Ability to handle high-end clients professionally.</li>
                        <li>Effective time management & follow-ups.</li>
                        <br />

                        <b>Qualifications</b>
                        <li>Bachelor’s or Master's degree in Hospitality, Travel & Tourism, Business, or Marketing (preferred from IHM)</li>
                        <li>Preferred Industry Luxury | Travel | Hospitality | Airlines</li>
                        <br />

                        <b>Why Join Us?</b>
                        <li>Chance to be a part of India’s leading premium cruise line and build a career in luxury travel sales.</li>
                        <li>Competitive salary + performance-based incentives.</li>
                        <li>Career growth opportunities in a premium hospitality sector.</li>
                        <li>A structured and professional work environment.</li>
                        <br />
                    </ul>,
            },

        ],
    },
    {
        id: 8,
        title: "Onboard Openings",
        roles: (
            <>
                For Onboard Openings, please share your resume at{" "}
                <br></br>
                <a
                    href="mailto:hr@cordeliacruises.com"
                    className="text-purple-600 underline"
                >
                    mailto:hr@cordeliacruises.com
                </a>
            </>
        ),
        jobs: [
            {
                title: "UI/UX Designer",
                location: "Bangalore",
                experience: "3 to 5 years",
                KeyResponsibilities: "",
                description:
                    "Design and deliver wireframes, user journeys, and mockups optimized for a wide range of devices and interfaces.",
            },
        ],
    },


];

const banner = {
    images: [
      {
        url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-grt-place-to-work-banner-desktop.webp',
        link: '#',
        altTag: 'GPTW',
      },
      {
        url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/career-banner-new-jan-25-desktop.webp',
        link: '#',
        altTag: 'Career Banner',
      },
    ],
    mobileImages: [
     {
        url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-grt-place-to-work-banner-mobile.webp',
        link: '#',
        altTag: 'GPTW',
        },
      {
        url: 'https://images.cordeliacruises.com/cordelia_v2/public/images/career-banner-new-jan-25-mobile.webp',
        link: '#',
        altTag: 'Career Banner'
      },
    ]
};

export default function Home(props: Props) {
    const [showMore, setShowMore] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, watch, setValue, formState: { errors }, clearErrors, reset } = useForm();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        designation: "",
        resume: null, // For file input
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    // const [resumeFileName, setResumeFileName] = useState("Only .doc, .docx, .rtf, and .pdf files are accepted. Max file size 2MB");
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsSubmitted(false);

    const [resumeFileName, setResumeFileName] = useState<string>("Only .doc, .docx, .rtf, and .pdf files are accepted. Max file size 2MB");
    const [newFile, setNewFile] = useState<File | null>(null);
    const [isError, setIsError] = useState<boolean>(false);


    const toggleCategory = (id: any) => {
        setActiveCategory((prev) => (prev === id ? null : id));
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = async (formData: any) => {
        const data = new FormData();
        data.append("first_name", formData.firstName);
        data.append("last_name", formData.lastName);
        data.append("email", formData.email);
        data.append("designation", formData.designation);
        data.append("mobile_no", formData.mobileNumber);
        if (newFile) {
            data.append("cv_attachment", newFile); // Only append if newFile is not null
        }
        // data.append("cv_attachment", newFile);
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/v2/careers`, {
                method: "POST",
                body: data,
            });
            if (response.ok) {
                setIsLoading(false);
                setIsSubmitted(true);
                reset();
                toggleModal();
                setResumeFileName("Only .doc, .docx, .rtf, and .pdf files are accepted. Max file size 2MB");
            } else {
                setIsLoading(false);
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Something went wrong"}`);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting the form:", error);
            alert("Failed to submit the form. Please try again later.");
        }
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setNewFile(file);

        if (file) {
            if (file.size <= 2 * 1024 * 1024) {
                setResumeFileName(file.name);
                clearErrors()
                setIsError(false);
            } else {
                setResumeFileName("Max file size allowed 2MB");
                clearErrors()
                setIsError(true);
            }
        }
    };


    return (
        <>
            <Layout>
                <main>
                    {/* <Banner data={banner} /> */}
                    <section>
                        <div
                            className="w-full h-full md:mt-[70px] mt-16 relative flex justify-center items-center"
                            style={{
                                background: 'linear-gradient(rgb(0 0 0 / 90%) 0%, rgba(9, 9, 121, 0) 40%, rgba(0, 212, 255, 0) 100%)',
                            }}
                        >
                            {/* <div className="absolute text-white z-10 text-center sm:w-[50%]">
                                
                                <h2 className="lg:block hidden lg:text-4xl text-lg font-bold">
                                    Welcome Aboard
                                </h2>
                                <h3 className="lg:block hidden lg:text-4xl text-md font-normal lg:font-semibold lg:mt-2 ml-5">
                                    Your Dream Career
                                </h3>

                                
                                <h2 className="lg:hidden block lg:text-4xl text-md font-normal">
                                    Welcome Aboard Your
                                </h2>
                                <h2 className="lg:hidden block lg:text-4xl text-md font-normal ml-[27px]">
                                    Dream Career
                                </h2>
                            </div> */}

                            <img
                                className="hidden md:block w-full"
                                // src="https://images.cordeliacruises.com/cordelia_v2/public/images/career-banner-new-final-desktop.webp"
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-grt-place-to-work-banner-desktop.webp"
                                alt="Desktop banner"
                            />
                            <img
                                className="block md:hidden w-full"
                                // src="https://images.cordeliacruises.com/cordelia_v2/public/images/career-banner-new-final-mobile.webp"
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-grt-place-to-work-banner-mobile.webp"
                                alt="Mobile banner"
                            />
                        </div>

                    </section>
                    <section className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12 p-8 md:px-40 md:mt-10">
                        {/* Left Section */}
                        <div className="lg:w-1/2 lg:pr-16">
                            <h2 className="md:text-4xl text-xl font-semibold mb-4">Life at Cordelia Cruises</h2>
                            <p className={`text-gray-600 lg:font-normal md:text-md text-sm font-normal leading-relaxed`}>
                                At Cordelia Cruises, we don't just sail the seas; we create unforgettable experiences for our guests and
                                our team. Join a workplace where passion meets adventure, and every day is an opportunity to make
                                waves in the travel and hospitality industry.
                                Life at Cordelia Cruises
                            </p>
                            <p className="text-gray-600 hidden lg:block lg:font-normal md:text-md text-sm font-normal leading-relaxed mt-6">
                                Experience the thrill of working in a dynamic environment where innovation, teamwork, and
                                excellence come together. From life at sea to corporate roles onshore, every role at Cordelia
                                offers a unique blend of excitement and growth. We value diversity, celebrate individuality,
                                and ensure every member of our team feels at home — whether on-board or at our offices
                            </p>
                            {showMore && (
                                <>
                                    <p className="text-gray-600 lg:font-normal md:text-md text-sm font-normal leading-relaxed mt-6">
                                        Experience the thrill of working in a dynamic environment where innovation, teamwork, and
                                        excellence come together. From life at sea to corporate roles onshore, every role at Cordelia
                                        offers a unique blend of excitement and growth. We value diversity, celebrate individuality,
                                        and ensure every member of our team feels at home — whether on-board or at our offices
                                    </p>
                                </>
                            )}

                            {/* Read More Button for Mobile */}
                            <button
                                className="text-brand-primary underline cursor-pointer lg:hidden lg:font-normal md:text-md text-sm font-normal"
                                onClick={() => setShowMore(!showMore)}
                            >
                                {showMore ? "Read Less" : "Read More"}
                            </button>

                            {/* Button for Desktop */}
                            <div className="mt-3 lg:mt-4">
                                <a href="#CurrentOpenings">
                                    <button className="bg-brand-gradient text-white px-4 lg:px-6 py-2 lg:py-3 rounded shadow-md text-sm lg:text-base">
                                        See Current Openings
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="lg:w-1/2 flex justify-center">
                            {/* Mobile Image Grid */}
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/Life+at+Cordelia+343x239_Mobile.webp"
                                alt=""
                                className="w-full h-auto rounded-md shadow-sm lg:hidden block"
                            />
                            {/* Desktop Image */}
                            <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/images/Life+at+Cordelia+710X494_+Web.webp"
                                alt=""
                                className="w-full h-auto object-cover rounded-md shadow-lg hidden lg:block shadow-none"
                            />
                        </div>
                    </section>
                    <section className="md:px-40 px-8">
                        <div className="max-w-6xl mx-auto py-12 ">
                            <div className="mb-4 lg:mb-10">
                                <h2 className="md:text-4xl text-xl font-semibold">Our Values</h2>
                                <p className="text-gray-600 lg:font-normal md:text-md  text-sm font-normal mt-2">What we love and stand for every day</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {values.map((value) => (
                                    <div
                                        key={value.id}
                                        className={`p-6 rounded-lg shadow-md ${value.gradient}`}
                                    >
                                        <img
                                            src={value.icon}
                                            alt={value.title}
                                            className="w-12 h-12 mb-2"
                                        />
                                        <h3 className="text-xl lg:text-2xl font-semibold mb-2">{value.title}</h3>
                                        <p className="text-gray-600 lg:font-normal md:text-md  text-sm font-normal">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="lg:px-40 px-8">
                        <div className="lg:border-2 rounded-xl border-2 border-brand-secondary/50 lg:p-8 p-3">
                            <h1 className="md:text-4xl text-lg font-semibold lg:mb-5 mb-2">
                                Our Mission
                            </h1>
                            <p className="text-gray-600 lg:font-normal md:text-md mb-4 text-sm font-normal">
                                Cordelia Cruises provides exceptional Indian hospitality and
                                entertainment, making our guests happy and putting a smile on
                                their faces every day by creating lasting memories.
                            </p>
                            <p className="text-gray-600 lg:font-normal md:text-md  text-sm font-normal">
                                We strive to be the leading Indian cruise company, setting
                                high standards for cruise travellers, team members, and owners
                                alike.
                            </p>
                        </div>
                    </section>




                    <section className="md:px-40 px-8" id="CurrentOpenings">
                        <div className="bg-gray-50 py-10">
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="md:text-3xl text-lg">Current Openings</h2>
                                <p className="text-gray-200 text-sm  font-medium">{categories?.length - 1} Current Openings</p>
                            </div>
                            <div className="space-y-4">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="rounded-md shadow-md"
                                    >
                                        <div
                                            className="flex justify-between items-center lg:p-4 cursor-pointer p-2"
                                            onClick={() => toggleCategory(category.id)}
                                        >

                                            {category.id == 8 ?
                                                <>
                                                    <h2 className="lg:block hidden md:text-lg md:font-medium text-black text-xs font-light">
                                                        Onboard Openings
                                                    </h2>
                                                    <h2 className="lg:hidden block md:text-lg md:font-medium text-black text-xs font-light">
                                                        Didn’t find the right fit?
                                                    </h2>
                                                </>
                                                : <h2 className="md:text-lg md:font-medium text-black text-xs font-light">
                                                    {category.title}
                                                </h2>
                                            }


                                            {category.id !== 8 ?
                                                <div className="flex items-center space-x-2">
                                                    <span
                                                        className="text-brand-primary font-normal lg:text-lg text-xs"
                                                    >
                                                        {category.roles}
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`w-5 h-5 text-black transition-transform duration-300 ${activeCategory === category.id ? "rotate-180" : ""
                                                            }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div> :
                                                <div className="block">
                                                    <div className="lg:block hidden">

                                                        <h3 className="lg:text-sm  text-xs font-thin text-black text-left">
                                                            For Onboard Openings, please share your resume at{" "}
                                                        </h3>
                                                        <a href="mailto:careers@cordeliacruises.com" className="text-brand-primary text-end flex items-center space-x-2 lg:text-lg lg:font-bold font-normal text-sm">

                                                            careers@cordeliacruises.com
                                                        </a>
                                                    </div>
                                                    <div className="lg:hidden block ml-[46px] text-left">
                                                        <h3 className="lg:text-sm  text-xs font-thin text-black !text-left">
                                                            Drop your resume at
                                                        </h3>
                                                        <a href="mailto:careers@cordeliacruises.com" className="text-brand-primary text-end flex items-center space-x-2 lg:text-lg lg:font-bold font-normal text-sm">

                                                            careers@cordeliacruises.com
                                                        </a>
                                                        <p className="lg:text-sm  text-xs font-thin text-black">
                                                            our team will reach out when a
                                                            suitable role opens up.
                                                        </p>
                                                    </div>
                                                </div>
                                            }
                                        </div>

                                        {(activeCategory === category.id && activeCategory !== 8) && (
                                            <div className="p-5 bg-[#f9fafb]">
                                                {category.jobs.map((job, index) => (
                                                    <div key={index} className="space-y-4  mb-4">
                                                        <div className="flex  justify-between">
                                                            <h3 className="lg:text-xl text-md font-semibold text-black">
                                                                {job.title}
                                                            </h3>
                                                            <Button text="Apply Now" size="sm" handleClick={() => {
                                                                setIsOpen(true)
                                                                setCategoryTitle(category.title)
                                                            }} className="hidden lg:block" />
                                                        </div>
                                                        <p className="text-gray-600 flex items-center space-x-2 text-sm font-normal">
                                                            <span>📍 {job.location}</span> {job.experience !== '' && `| `}
                                                            {job.experience !== '' && <span>🕒 {job.experience}</span>}
                                                        </p>
                                                        {job?.Job_Type &&<p className="text-gray-600 flex items-center space-x-2 text-sm font-normal">
                                                            <span> {job?.Job_Type}</span> |{" "}
                                                            <span> {job?.CTC}</span>
                                                        </p>}
                                                        <p className="text-gray-500 mt-3 text-xs lg:text-sm leading-5 lg:leading-6"> <b> Job Summary: </b><br />{job.description}</p>
                                                        <p className="text-gray-500 mt-3 text-xs lg:text-sm leading-5 lg:leading-6"> <b> Key Responsibilities: </b>{job.KeyResponsibilities}</p>
                                                        <Button text="Apply Now" size="sm" handleClick={() => {
                                                            setIsOpen(true)
                                                            setCategoryTitle(category.title)
                                                        }} className="lg:hidden block" />
                                                        {category.jobs.length == index + 1 ? '' :
                                                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                                                        }
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="md:px-40 md:mb-[160px] px-4">
                        <div className="flex-grow bg-[#fafafa] rounded-md">
                            <div className="container mx-auto p-4 ">
                                <h1 className="text-lg font-normal ">Set Sail with Us</h1>
                                <p className="mt-4 text-gray-600 lg:text-md lg:text-sm text-xs">
                                    At Cordelia Cruises, your career will be more than just a job—it’s a voyage of growth,
                                    learning, and unmatched experiences. Whether you’re chasing the horizon or building a
                                    legacy, we’re here to help you achieve your goals.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>


                {isSubmitted && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 sm-p-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 h-[39%] relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
                            >
                                &times;
                            </button>

                            <div className="flex flex-col items-center mt-10">
                                <div className="bg-brand-primary p-2 rounded-full mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h2 className="lg:text-3xl text-lg font-bold text-center text-black mb-3">
                                    Application
                                    <br />
                                    submitted successfully!
                                </h2>
                                <p className="text-sm text-gray-500 text-center mt-5">
                                    Your application has been successfully submitted.
                                    <br />
                                    We’ll be in touch soon!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>

            <Modal
                show={isOpen}
                align={'center'} className="bg-white rounded-lg lg:rounded border min-h-[560px] lg:min-h-[500px] max-h-[85vh] lg:w-[35%] w-[90%]"
                onClose={() => setIsOpen(false)}
                maxHeight='100vh'
            >
                <div className="w-full">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
                    >
                        &times;
                    </button>

                    <div className="text-center">
                        <h2 className="lg:text-3xl text-lg font-bold mb-2 mt-4">Application Form</h2>
                        <p className="text-sm font-medium text-gray-700">{categoryTitle}</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="mb-4">
                            <input
                                {...register('firstName', { required: "First Name is required" })}
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-[#fafafa] border-none rounded px-4 py-4 text-sm focus:outline-none focus:ring-0"
                            />
                            {errors.firstName && typeof errors.firstName.message === "string" && (
                                <span className="text-xs text-danger">{errors.firstName.message}</span>
                            )}
                            {/* {errors.firstName && <span className="text-xs text-danger">{errors.firstName.message}</span>} */}
                        </div>

                        <div className="mb-4">
                            <input
                                {...register('lastName', { required: "Last Name is required" })}
                                type="text"
                                placeholder="Last Name"
                                className="w-full bg-[#fafafa] border-none rounded px-3 py-4 text-sm focus:outline-none focus:ring-0"
                            />
                            {errors.lastName && typeof errors.lastName.message === "string" && (
                                <span className="text-xs text-danger">{errors.lastName.message}</span>
                            )}
                        </div>

                        <div className="mb-4">
                            <input
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                placeholder="Email"
                                className="w-full bg-[#fafafa] border-none rounded px-3 py-4 text-sm focus:outline-none focus:ring-0"
                            />
                            {errors.email && typeof errors.email.message === "string" && (
                                <span className="text-xs text-danger">{errors.email.message}</span>
                            )}
                            {/* {errors.email && <span className="text-xs text-danger">{errors.email.message}</span>} */}
                        </div>

                        <div className="mb-4">
                            <div className="flex">
                                <span className="inline-flex items-center px-3 bg-[#fafafa] border-none rounded-l text-sm">
                                    +91
                                </span>
                                <input
                                    {...register('mobileNumber', {
                                        required: "Mobile number is required",
                                        pattern: { value: /^\d{10}$/, message: "Mobile number must be 10 digits" }
                                    })}
                                    type="text"
                                    placeholder="Mobile Number"
                                    className="w-full bg-[#fafafa] border-none rounded-r px-3 py-4 text-sm focus:outline-none focus:ring-0"
                                />
                            </div>
                            {errors.mobileNumber && typeof errors.mobileNumber.message === "string" && (
                                <span className="text-xs text-danger">{errors.mobileNumber.message}</span>
                            )}
                            {/* {errors.mobileNumber && <span className="text-xs text-danger">{errors.mobileNumber.message}</span>} */}
                        </div>

                        {/*  */}

                        <div className="mb-2 flex items-center gap-4">
                            <input
                                {...register("resume", {
                                    required: "Resume is required",
                                    validate: {
                                        fileSize: (file) => {
                                            if (file && file[0]?.size > 2 * 1024 * 1024) {
                                                return "Max file size allowed 2MB";
                                            }
                                            return true;
                                        }
                                    }
                                })}
                                type="file"
                                id="resume-upload"
                                accept=".doc,.docx,.rtf,.pdf"
                                className="hidden"
                                onChange={handleFileChange} // Add this onChange event to handle file selection
                            />
                            <label
                                htmlFor="resume-upload"
                                className="bg-white border whitespace-nowrap border-brand-primary text-brand-primary rounded px-4 py-3 text-sm font-medium transition cursor-pointer"
                            >
                                Attach Resume
                            </label>
                            <div className={`text-xs ${isError ? "text-danger" : "text-gray-800"}`}>
                                {resumeFileName}
                            </div>

                        </div>

                        <div className="mb-2 flex items-center gap-4">
                            {errors.resume && typeof errors.resume.message === "string" && (
                                <span className="text-xs text-danger">{errors.resume.message}</span>
                            )}

                            {/* {errors.resume && <span className="text-xs text-danger">{errors.resume.message}</span>} */}
                        </div>

                        <Button text={isLoading ? 'Loading...' : 'Apply Now'} disabled={isLoading} isLoading={isLoading} className="w-full h-[50px]" />
                    </form>
                </div>
            </Modal>
        </>
    );
}
