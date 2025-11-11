import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import Accordion from '../../components/UI/Accordion/accordion_basic';
import { Link } from 'react-router-dom';
import Modal from '../../components/UI/ModalCenter';

const InvestorCorner = () => {
  const boardOfDirectors = [
		{
			// img: "https://images.cordeliacruises.com/cordelia_v2/public/images/jurgen-bailom-desktop.webp",
			img: '',
			name: 'JURGEN BAILOM',
			designation: 'EXECUTIVE DIRECTOR',
			description: 'Jurgen Bailom is the Chairman of the Board, Executive Director and CEO of the Company. He has been associated with our Company since November 3, 2020. He is a Certified Hospitality Supervisor from the Educational Institute of the American Hotel &amp; Motel Association. He has passed the examination to prove competence for the hospitality industry. He also holds a master’s degree in business administration in Hotel Management from Canterbury University. He is the founding member of the Indian Cruise Line Association. He has experience in cruise line and shipping, hospitality, resort and tourism industry and he was previously associated with Zen Cruises Private Limited, Vidanta Grupo, RCL Geo LLP, Celebrity Cruises, Tui Cruises, Skyseas and Pullmantur Cruceros, Maho Group, Royal Carribbean International and with Island Cruises PLC.'
		},
    {
			img: '',
      name: 'ADITYA GUPTA',
      designation: 'EXECUTIVE DIRECTOR',
      description: 'Aditya Gupta is an Executive Director on the Board of our Company. He has been associated with our Company since May 15, 2023. His role in the Company is to oversee and steer the Company’s overall business strategy, operations, and growth initiatives. He plays a key role in developing and executing business plans, managing cross-functional departments, and ensuring that the organization meets its strategic objectives. His primary focus areas include revenue generation, market expansion, and driving innovation. He has over 19 years of experience in marketing and sales in the tourism sector.'
    },
		{
			img: '',
			name: 'CORALIE ANNAMICHELE ANSARI',
			designation: 'EXECUTIVE DIRECTOR',
			description: 'Coralie Annamichele Ansari is the Executive Director on the Board of our Company. She has been associated with our Company since January 2, 2025. Her role in the Company is to lead all aspects of the organization’s human resources and people strategy and to align the HR initiatives with business objectives, with a strong emphasis on attracting and retaining top talent, fostering employee engagement, and enhancing the overall employee experience. She has over 12 years of experience in the human resource sector.'
		},
    {
			img: '',
      name: 'ANIL KUMAR CHOPRA',
      designation: 'INDEPENDENT DIRECTOR',
      description: 'Anil Kumar Chopra is an Independent Director on the Board of our Company. He has been associated with our Company since February 13, 2025. He has over 3 years of experience in the steel processing, distribution and manufacturing of automobile steel sector. Prior to joining our Company, he has served in the Indian Navy for a period of over 39 years.'
    },
		{
			img: '',
			name: 'SURANJAN BHATTACHARJEE',
			designation: 'INDEPENDENT DIRECTOR',
			description: 'Suranjan Bhattacharjee is an Independent Director on the Board of our Company. He has been associated with our Company since February 13, 2025. Prior to joining our Company, he was previously associated with India Tourism Development Corporation.'
		},
    {
      img: '',
      name: 'ROOPA IYER',
      designation: 'INDEPENDENT DIRECTOR',
      description: 'Roopa Iyer is the Independent Director on the Board of our Company. She has been associated with our Company since February 24, 2025. She has over 8 years of experience in the event management and film production sector. She is the proprietor of Indian Classic Arts.'
    }
  ];

  const keyManagerialPersonnel = [
		{
			img: '',
			name: 'JURGEN BAILOM',
			designation: 'CHIEF EXECUTIVE OFFICER',
      description: 'Jurgen Bailom is the Chairman of the Board, Executive Director and CEO of the Company. He has been associated with our Company since November 3, 2020. He is a Certified Hospitality Supervisor from the Educational Institute of the American Hotel &amp; Motel Association. He has passed the examination to prove competence for the hospitality industry. He also holds a master’s degree in business administration in Hotel Management from Canterbury University. He is the founding member of the Indian Cruise Line Association. He has experience in cruise line and shipping, hospitality, resort and tourism industry and he was previously associated with Zen Cruises Private Limited, Vidanta Grupo, RCL Geo LLP, Celebrity Cruises, Tui Cruises, Skyseas and Pullmantur Cruceros, Maho Group, Royal Carribbean International and with Island Cruises PLC.'
		},
    {
      img: '',
      name: 'CA. NISHIKANT UPADHYAY',
      designation: 'CHIEF FINANCIAL OFFICER',
      description: 'Nishikant Upadhyay is the Chief Financial Officer of our Company. He has been associated with our Company since April 1, 2021. He holds a bachelor’s degree in science from the Mohanlal Sukhadia University, Udaipur, Rajasthan, India. He is a member of the Institute of Chartered Accountants of India. He has completed the Chief Executive Officer Programme (CEO) from Indian Institute of Management, Lucknow. His role in the Company is to oversee the Company’s financial operations, including financial planning, analysis, and reporting. He is responsible for making key strategic financial decisions and ensuring compliance with all financial regulations and standards. He has over 27 years of experience in accounting and finance.'
    },
    {
      img: '',
      name: 'ANKIT SATISH SHAH',
      designation: 'COMPANY SECRETARY & COMPLIANCE OFFICER',
      description: 'Ankit Satish Shah is the Company Secretary and Compliance Officer of our Company. He has been associated with our Company since May 26, 2022. He holds a bachelor’s degree in commerce and has passed the final semester examination for bachelor’s in law from the University of Mumbai, Maharashtra, India. He is an associate in the Institute of Company Secretaries of India. His role in the Company involves ensuring Company’s adherence to all applicable statutory compliances. He advises the Board on best governance practices and is responsible for organizing and conducting board meetings, general meetings, and all committee meetings.'
    }
  ];

  const committees = [
    {
      committeeName: 'Audit Committee',
      members: [
        {
          name: 'ANIL KUMAR CHOPRA',
          position: 'Chairman',
          designation: 'Independent Director'
        },
        {
          name: 'SURANJAN BHATTACHARJEE',
          position: 'Member',
          designation: 'Independent Director'
        },
        {
          name: 'ROOPA IYER',
          position: 'Member',
          designation: 'Independent Director'
        },
        {
          name: 'ADITYA GUPTA',
          position: 'Member',
          designation: 'Executive Director'
        }
      ],
      terms: {
        name: 'Terms of Reference of Audit Committee',
        link: 'pdfs/TOR-AuditComittee.pdf'
      }
    },
    {
      committeeName: 'Nomination and Remuneration Committee',
      members: [
        {
          name: 'SURANJAN BHATTACHARJEE',
          position: 'Chairman',
          designation: 'Independent Director'
        },
        {
          name: 'ANIL KUMAR CHOPRA',
          position: 'Member',
          designation: 'Independent Director'
        },
        {
          name: 'ROOPA IYER',
          position: 'Member',
          designation: 'Independent Director'
        }
      ],
      terms: {
        name: 'Terms of Reference of Nomination and Remuneration Committee',
        link: 'pdfs/TOR-NominationCommittee.pdf'
      }
    },
    {
      committeeName: 'Stakeholders’ Relationship Committee',
      members: [
        {
          name: 'SURANJAN BHATTACHARJEE',
          position: 'Chairman',
          designation: 'Independent Director'
        },
        {
          name: 'JURGEN BAILOM',
          position: 'Member',
          designation: 'Executive Director & CEO'
        },
        {
          name: 'ANIL KUMAR CHOPRA',
          position: 'Member',
          designation: 'Independent Director'
        },
        {
          name: 'ADITYA GUPTA',
          position: 'Member',
          designation: 'Executive Director'
        }
      ],
      terms: {
        name: 'Terms of Reference of Stakeholders’ Relationship Committee',
        link: 'pdfs/TOR-StakeHolderRelationship.pdf'
      }
    },
    {
      committeeName: 'Corporate Social Responsibility Committee',
      members: [
				{
					name: 'ROOPA IYER',
					position: 'Chairperson',
					designation: 'Independent Director'
				},
        {
          name: 'JURGEN BAILOM',
          position: 'Member',
          designation: 'Executive Director & CEO'
        },
        {
          name: 'ADITYA GUPTA',
          position: 'Member',
          designation: 'Executive Director'
        }
      ],
      terms: {
        name: 'Terms of Reference of Corporate Social Responsibility Committee',
        link: 'pdfs/TOR-CSRCommittee.pdf'
      }
    },
    {
      committeeName: 'Independent Director Committee',
      members: [
        {
          name: 'ROOPA IYER',
          position: 'Chairperson',
          designation: 'Independent Director'
        },
        {
          name: 'SURANJAN BHATTACHARJEE',
          position: 'Member',
          designation: 'Independent Director'
        },
        {
          name: 'ANIL KUMAR CHOPRA',
          position: 'Member',
          designation: 'Independent Director'
        }
      ],
      terms: {
        name: '',
        link: ''
      }
    },
    {
      committeeName: 'IPO Committee',
      members: [
        {
          name: 'JURGEN BAILOM',
          position: 'Chairperson',
          designation: 'Executive Director & CEO'
        },
        {
          name: 'ADITYA GUPTA',
          position: 'Member',
          designation: 'Executive Director'
        },
        {
          name: 'CORALIE ANNAMICHELE ANSARI',
          position: 'Member',
          designation: 'Executive Director'
        }
      ],
      terms: {
        name: 'Terms of Reference of IPO Committee',
        link: 'pdfs/TOR-IPOCommittee.pdf'
      }
    },
    {
      committeeName: 'Risk Management Committee',
      members: [
        {
          name: 'JURGEN BAILOM',
          position: 'Chairman',
          designation: 'Executive Director & CEO'
        },
        {
          name: 'SURANJAN BHATTACHARJEE',
          position: 'Member',
          designation: 'Independent Director'
        },
        {
          name: 'ADITYA GUPTA',
          position: 'Member',
          designation: 'Executive Director'
        }
      ],
      terms: {
        name: 'Terms of Reference of Risk Management Committee',
        link: 'pdfs/TOR-RiskManagementCommittee.pdf'
      }
    }
  ];

  const codesAndPolicies = [
		{
      name: 'Policy on Preservation of Documents Archival Policy',
      link: 'pdfs/PolicyonPreservationofDocumentsArchivalPolicy.pdf',
      link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+on+Preservation+of+Documents+Archival+Policy.pdf',
    },
		{
      name: 'Policy for Determining Material Subsidaries',
      link: 'pdfs/PolicyforDeterminingMaterialSubsidaries.pdf',
      link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+for+Determining+Material+Subsidaries.pdf',
    },
		{
      name: 'Policy on Related Party Transactions',
      link: 'pdfs/PolicyonRelatedPartyTransactions.pdf',
      link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+on+Related+Party+Transactions.pdf',
    },
		{
			name: 'Policy for Determination of Materiality',
			link: 'pdfs/PolicyforDeterminationofMateriality.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+for+Determination+of+Materiality.pdf',
		},
		{
			name: 'Vigil Mechanism Policy',
			link: 'pdfs/VigilMechanismPolicy.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Vigil+Mechanism+Policy.pdf',
		},
		// {
		// 	name: 'Policy Relating to Remuneration of Directors, KMP and SMP',
		// 	link: 'pdfs/PolicyRelatingtoRemunerationofDirectorsKMPandSMP.pdf',
		// 	link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+Relating+to+Remuneration+of+Directors%2C+KMP+and+SMP.pdf',
		// },
		{
			name: "Independent Directors' Familiarisation Programme",
			link: 'pdfs/IndependentDirectorsFamiliarisationProgramme.pdf',
			link1: "https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Independent+Directors'+Familiarisation+Programme.pdf",
		},
		{
			name: 'Code of Conduct',
			link: 'pdfs/CodeofConduct.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/13.+POSH+Policy.pdf',
		},
		{
			name: 'Risk Management Policy',
			link: 'pdfs/RiskManagementPolicy.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Risk+Management+Policy.pdf',
		},
		{
			name: 'Code of Practices and Procedures for Fair Disclosure of UPSI',
			link: 'pdfs/CodeofPracticesandProceduresforFairDisclosureofUPSI.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Code+of+Practices+and+Procedures+for+Fair+Disclosure+of+UPSI.pdf',
		},
		
		{
			name: 'Materiality Policy',
			link: 'pdfs/MaterialityPolicy.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/13.+POSH+Policy.pdf',
		},
		{
			name: 'Policy on Succession Planning',
			link: 'pdfs/PolicyonSuccessionPlanning.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+on+Succession+Planning.pdf',
		},
		{
			name: 'POSH Policy',
			link: 'pdfs/POSHPolicy.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/13.+POSH+Policy.pdf',
		},
		{
			name: 'Dividend Distribution Policy',
			link: 'pdfs/DividendDistributionPolicy.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Dividend+Distribution+Policy.pdf',
		},
		{
			name: 'Policy for Determination of Legitimate Purposes',
			link: 'pdfs/PolicyforDeterminationofLegitimatePurposes.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+for+Determination+of+Legitimate+Purposes.pdf',
		},
		{
			name: 'Policy For Procedure Of Inquiry In Case Of Leak Of UPSI',
			link: 'pdfs/PolicyForProcedureOfInquiryInCaseOfLeakOfUPSI.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy+For+Procedure+Of+Inquiry+In+Case+Of+Leak+Of+UPSI.pdf',
		},
		{
			name: 'Code Of Conduct For Prevention Of Insider Trading',
			link: 'pdfs/CodeOfConductForPreventionOfInsiderTrading.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy-on-Board-Diversity.pdf',
		},
		{
			name: 'Policy on Board Diversity',
			link: 'pdfs/Policy-on-Board-Diversity.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Policy-on-Board-Diversity.pdf',
		},
		{
			name: 'Code of Conduct To Regulate Monitor  Report Trading By Insiders (earlier Insider-Trading-Code)',
			link: 'pdfs/CodeofConductToRegulateMonitorReportTradingByInsiders.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Code+of+Conduct+To+Regulate+Monitor++Report+Trading+By+Insiders+(earlier+Insider-Trading-Code).pdf',
		},
    {
			name: 'Nomination and Remuneration Policy',
      link: 'pdfs/Nomination-and-Remuneration-PolicyFinal.pdf',
      link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Nomination-and-Remuneration-Policy+Final.pdf',
    },
		{
			name: 'Terms & Conditions of Appointment of Independent Directors',
			link: 'pdfs/Terms&ConditionsofAppointmentofIndependentDirectors.pdf',
			link1: 'https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Terms+%26+Conditions+of+Appointment+of+Independent+Directors.pdf',
		},
  ];

  const videoConfig = {
    english: "http://images.cordeliacruises.com/cordelia_v2/public/videos/WATERWAYS-AIBI-AV-Final_English.mp4",
    hindi: "https://images.cordeliacruises.com/cordelia_v2/public/videos/WATERWAYS-AIBI-AV-Final-HINDI.mp4",
  };

  const [activeTab, setActiveTab] = useState('companyInfo');
  const [activeLang, setActiveLang] = useState<null | keyof typeof videoConfig>(null);
  const [activeDirector, setActiveDirector] = useState("");
  const [activePersonnel, setActivePersonnel] = useState("");

  const handleOpen = (lang: keyof typeof videoConfig) => setActiveLang(lang);

  const handleClose = () => {
    setActiveLang(null);
    setActiveDirector("");
    setActivePersonnel("");
  }

  return (
    <Layout>
      <div className="mt-[65px] lg:mt-[105px] px-4 bg-brand-primary text-center text-white font-semibold lg:sticky lg:top-[105px]">
        <ul className="py-2 flex flex-col lg:flex-row items-center lg:items-start lg:justify-evenly">
          <li
            className={`py-2 cursor-pointer ${
              activeTab === 'companyInfo' ? 'border-b-2 lg:border-b-4 border-white' : ''
            }`}
            onClick={() => setActiveTab('companyInfo')}
          >
            Company Information
          </li>
          <li
            className={`py-2 cursor-pointer ${
              activeTab === 'financialInfo' ? 'border-b-2 lg:border-b-4 border-white' : ''
            }`}
            onClick={() => setActiveTab('financialInfo')}
          >
            Financial Information
          </li>
          <li
            className={`py-2 cursor-pointer ${
              activeTab === 'ipoFilings' ? 'border-b-2 lg:border-b-4 border-white' : ''
            }`}
            onClick={() => setActiveTab('ipoFilings')}
          >
            IPO Filings
          </li>
          <li
            className={`py-2 cursor-pointer ${
              activeTab === 'corporateGovernance' ? 'border-b-2 lg:border-b-4 border-white' : ''
            }`}
            onClick={() => setActiveTab('corporateGovernance')}
          >
            Corporate Governance
          </li>
        </ul>
      </div>
      <div className="container px-4 mx-auto my-5 lg:my-8">
        {activeTab === 'companyInfo' && (
          <div className="lg:flex lg:flex-wrap lg:gap-5 mb-20 lg:mb-[150px]">
            <div
              className="bg-light mb-4 rounded-md border border-gray-400 overflow-hidden lg:mb-0 lg:basis-[49%]"
              style={{ maxWidth: '544px' }}
            >
              <div className="px-5 py-4 font-semibold bg-gray-400">
                <h2 className="">Registered Office &amp; Corporate Office</h2>
              </div>
              <div className="p-4 text-sm">
                <p className="font-bold mb-2">
                  Waterways Leisure Tourism Limited (Formerly known as Waterways Leisure Tourism Private Limited)
                </p>
                <p className="mb-2">
                  A-1601, Marathon Futurex, NM Joshi Marg, Lower Parel, Delisle
                  Road, Mumbai-400013, Maharashtra, India.
                </p>
                <p className="mb-2">
                  <span className="font-bold">Contact No. : </span>
                  <a href="tel:+9102271541821">+91 022 7154 1821 </a>/<a href="tel:+9102265545410"> +91 022 6554 5410</a>
                </p>
                <p className="">
                  <span className="font-bold">Email : </span>&nbsp;
                  <a className="mailto" href="mailto:cs@waterways-leisure.com">
                    cs@waterways-leisure.com
                  </a>
                </p>
              </div>
            </div>
            <div
              className="bg-light mb-4 rounded-md border border-gray-400 overflow-hidden lg:mb-0 lg:basis-[49%]"
              style={{ maxWidth: '544px' }}
            >
              <div className="px-5 py-4 font-semibold bg-gray-400">
                <h2 className="">Company Secretary and Compliance Officer</h2>
              </div>
              <div className="p-4 text-sm">
                <p className="font-bold mb-2">Ankit Satish Shah</p>
                <p className="mb-2">
                  A-1601, Marathon Futurex, NM Joshi Marg, Lower Parel, Delisle
                  Road, Mumbai-400013, Maharashtra, India.
                </p>
                <p className="mb-2">
                  <span className="font-bold">Contact No. : </span>
                  <a href="tel:+9102271541821">+91 022 7154 1821 </a>/<a href="tel:+9102265545410"> +91 022 6554 5410</a>
                </p>
                <p className="">
                  <span className="font-bold">Email : </span>&nbsp;
                  <a
                    className="mailto"
                    href="mailto:Ankit.s@cordeliacruises.com"
                  >
                    Ankit.s@cordeliacruises.com
                  </a>
                </p>
              </div>
            </div>
            <div
              className="bg-light mb-4 rounded-md border border-gray-400 overflow-hidden lg:mb-0 lg:basis-[49%]"
              style={{ maxWidth: '544px' }}
            >
              <div className="px-5 py-4 font-semibold bg-gray-400">
                <h2 className="">Registrar and Share Transfer Agent</h2>
              </div>
              <div className="p-4 text-sm">
                <p className="font-bold mb-2">
                  MUFG Intime India Private Limited (Formerly known as Link Intime India Private Limited)
                </p>
                <p className="mb-2">
                  C-101,Embassy 247, LBS.Marg, Vikhroli (West),MUMBAI - 400083
                </p>
                <p className="mb-2">
                  <span className="font-bold">Contact No. : </span>
                  <a href="tel:+918108114949">+91 81081 14949</a>
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email : </span>
                  <a className="mailto" href="mailto:waterwaysleisure.ipo@in.mpms.mufg.com">
                    waterwaysleisure.ipo@in.mpms.mufg.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financialInfo' && (
          <div className="mb-20 lg:mb-[150px]">
            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Financial Reporting'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
									<div className="mb-4">
                    <h3 className="my-2 font-semibold font-openSans">
                      Restated Financials
                    </h3>
                    <ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
											<li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/RestatedFinancialsReport.pdf")}`}
													className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
												>
													<div>
														<img
															src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
															alt="pdf_icon"
															className="min-w-[24px]"
														/>
													</div>
													<span className="text-sm font-medium text-brand-primary">
														Restated Financials
													</span>
												</Link>
											</li>
                    </ul>
                  </div>
									<div className="mb-4">
                    <h3 className="my-2 font-semibold font-openSans">
                      Proforma Financials
                    </h3>
                    <ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/ConsolidatedProformaFinancialswithExaminationReport.pdf")}`}
                        // <a
                        //   href="http://images.cordeliacruises.com/cordelia_v2/public/pdf/Consolidated-Proforma-Financials-with-Examination-report.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
														Proforma Financials
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Annual Report'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
                    <ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/AnnualReport23-24.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Annual+Report/Annual+Report+23-24.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Annual Report 23-24
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/AnnualReport22-23.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Annual+Report/Annual+Report+22-23.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Annual Report 22-23
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/AnnualReport21-22.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Policy/Annual+Report/Annual+Report+21-22.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Annual Report 21-22
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Annual Returns'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
                    <h3 className="my-2 font-semibold font-openSans">
                      FY 2023-24
                    </h3>
                    <ul className="text-sm">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/FormMGT-7FY23-24.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Annual+Returns/Form+MGT-7+FY+23-24.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Form MGT-7 FY 23-24
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="my-2 font-semibold font-openSans">
                      FY 2022-23
                    </h3>
                    <ul className="text-sm">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/FormMGT-7FY23-24.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/FormMGT-2023.pdf?_gl=1*xy0tnj*_gcl_au*MTU2MTg1Nzk5LjE3NDI3MzU4NjQuMzk1NTk1ODMyLjE3NDU4MTc3OTIuMTc0NTgxNzc5Mg..#toolbar=0"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Form_MGT_7 Waterways 22-23
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="my-2 font-semibold font-openSans">
                      FY 2021-22
                    </h3>
                    <ul className="text-sm">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/FormMGT-7-2021-2022.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/static/FormMGT-7-2022.pdf?_gl=1*xy0tnj*_gcl_au*MTU2MTg1Nzk5LjE3NDI3MzU4NjQuMzk1NTk1ODMyLjE3NDU4MTc3OTIuMTc0NTgxNzc5Mg..#toolbar=0"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Form_MGT_7 Waterways 21-22
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="my-2 font-semibold font-openSans">
                      FY 2020-21
                    </h3>
                    <ul className="text-sm">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/FormMGT-7FY23-24.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/static/MGT-7A.pdf?_gl=1*1dq4k7u*_gcl_au*MTU2MTg1Nzk5LjE3NDI3MzU4NjQuMzk1NTk1ODMyLjE3NDU4MTc3OTIuMTc0NTgxNzc5Mg..#toolbar=0"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Form_MGT_7 Waterways 20-21
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        )}

        {activeTab === 'ipoFilings' && (
          <div className="mb-20 lg:mb-[150px]">
            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Draft Red Herring Prospectus'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
										<ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
                      <li className="mb-4 lg:mb-0 inline-block">
												<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/CordeliaDRHP.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Cordelia-DRHP.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
														Cordelia-DRHP
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Draft Red Herring Prospectus AV'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
										<ul className="text-sm">
                      <li className="mb-4 w-max cursor-pointer" onClick={() => handleOpen("english")}>
                        <div className='flex justify-between items-center gap-1.5 p-2 rounded-md'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="http://images.cordeliacruises.com/cordelia_v2/public/assets/play-dot-purple-icon.svg"
                              alt="video_icon"
                              className="w-5 h-5"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Audio Visual Content of DRHP in English
                          </span>
                        </div>
                      </li>
                      <li className="mb-4 w-max cursor-pointer" onClick={() => handleOpen("hindi")}>
                        <div className='flex justify-between items-center gap-1.5 p-2 rounded-md'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="http://images.cordeliacruises.com/cordelia_v2/public/assets/play-dot-purple-icon.svg"
                              alt="video_icon"
                              className="w-5 h-5"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                            Audio Visual Content of DRHP in Hindi
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
						<div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Industry Report'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
										<ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
                      <li className="mb-4 lg:mb-0 inline-block">
											<Link
													to={`/view-pdf?file=${encodeURIComponent("pdfs/IndustrialReportCRISIL.pdf")}`}
                        // <a
                        //   href="https://images.cordeliacruises.com/cordelia_v2/public/pdf/Industrial-Report-CRISIL.pdf"
                          className="flex justify-between items-center gap-1.5 p-2 rounded-md"
													target='_blank'
                          style={{
                            border: 'double 2px transparent',
                            backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <div>
                            <img
                              src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                              alt="pdf_icon"
															className="min-w-[24px]"
                            />
                          </div>
                          <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
														Industrial Report CRISIL
                          </span>
                        {/* </a> */}
												</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        )}

        {activeTab === 'corporateGovernance' && (
          <div className="mb-20 lg:mb-[150px]">
            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Board of Directors'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
                    <ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
                      {boardOfDirectors.map((director, idx) => (
                        <li
                          key={idx}
                          className="mb-4 lg:mb-0 p-2 lg:w-[calc(33.333%-0.5rem)] bg-gray-400 cursor-pointer"
                          onClick={() => setActiveDirector(director.name)}
                        >
                          <div className="text-center">
                            {director.img && (
                              <img
                                src={director.img}
                                alt={director.name}
                                className="rounded-md"
                              />
                            )}
                            <p className="my-1 text-lg font-semibold">
                              {director.name}
                            </p>
                            <span>{director.designation}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>

            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Key Managerial Personnel'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="mb-4">
                    <ul className="text-sm lg:flex lg:flex-1 lg:gap-3">
                      {keyManagerialPersonnel.map((person, idx) => (
                        <li
                          key={idx}
                          className="mb-4 lg:mb-0 p-2 lg:w-[calc(33.333%-0.5rem)] bg-gray-400 cursor-pointer"
                          onClick={() => setActivePersonnel(person.name)}
                        >
                          <div className="text-center">
                            {person.img && (
                              <img
                                src={person.img}
                                alt={person.name}
                                className="rounded-md"
                              />
                            )}
                            <p className="my-1 text-lg font-semibold">
                              {person.name}
                            </p>
                            <span>{person.designation}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>

            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Committees'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                {committees.map((committee, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer m-4"
                  >
                    <Accordion
                      title={committee.committeeName}
                      titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
                    >
                      <div className="px-4 pb-5 cursor-default">
                        <div className="mb-4 border border-gray-400 rounded-md overflow-x-auto">
                          <table className="table-auto text-left w-full rounded-md overflow-hidden min-w-[600px]">
                            <thead className="bg-brand-gradient flex text-white w-full">
                              <tr className="flex w-full">
                                <th className="p-4 w-1/3">Name</th>
                                <th className="p-4 w-1/3">
                                  Position in the Committee
                                </th>
                                <th className="p-4 w-1/3">Designation</th>
                              </tr>
                            </thead>
                            <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                              {committee.members.map((member, idx) => (
                                <tr
                                  key={idx}
                                  className="flex w-full even:bg-gray-400"
                                >
                                  <td className="p-4 w-1/3 font-semibold">
                                    {member.name}
                                  </td>
                                  <td className="p-4 w-1/3 font-semibold">
                                    {member.position}
                                  </td>
                                  <td className="p-4 w-1/3 font-semibold">
                                    {member.designation}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {committee.terms.name && (
                          <div className="flex justify-end text-sm font-medium">
														<Link
															to={`/view-pdf?file=${encodeURIComponent(committee.terms.link)}`}
															target='_blank'
														>
                              {committee.terms.name}
                            </Link>
                          </div>
                        )}
                      </div>
                    </Accordion>
                  </div>
                ))}
              </Accordion>
            </div>

            <div className="border border-gray-300 rounded shadow-md mb-3 cursor-pointer">
              <Accordion
                title={'Codes and Policies'}
                titleClass="lg:text-lg text-lg font-semibold py-4 px-4"
              >
                <div className="px-4 pb-5 cursor-default">
                  <div className="">
                    <ul className="text-sm lg:flex lg:flex-wrap lg:gap-3">
                      {codesAndPolicies.map((policy, idx) => (
                        <li
                          key={idx}
                          className="mb-4 lg:mb-0 inline-block"
                        >
													<Link
														to={`/view-pdf?file=${encodeURIComponent(policy.link)}`}
                          // <a
                          //   href={policy.link}
                            className="flex justify-between items-center gap-1.5 p-2 rounded-md"
														target='_blank'
                            style={{
                              border: 'double 2px transparent',
                              backgroundImage:'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: 'padding-box, border-box',
                            }}
                          >
                            <div>
                              <img
                                src="https://images.cordeliacruises.com/cordelia_v2/public/assets/PDF_Purple.svg"
                                alt="pdf_icon"
																className="min-w-[24px]"
                              />
                            </div>
                            <span className="lg:p-0 cursor-pointer text-sm font-medium text-brand-primary">
                              {policy.name}
                            </span>
                          {/* </a> */}
													</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        )}
      </div>

      <Modal show={!!activeLang} align='center' closeBtn={true} onClose={handleClose} >
        <div className='w-80 lg:w-[650px] aspect-video'>
          <video
            src={encodeURI(videoConfig[activeLang])}
            autoPlay
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Modal>

      <Modal show={!!activeDirector} align='center' closeBtn={true} onClose={handleClose} >
        <div className='bg-white w-80 lg:w-[650px] h-[500px] max-h-[500px] lg:h-auto overflow-auto'>
          <div className='px-6 lg:px-10 py-6'>
            <h3 className='text-lg font-semibold mb-3 font-openSans'>{boardOfDirectors.find((dir) => dir.name === activeDirector)?.name}</h3>
            <p>{boardOfDirectors.find((dir) => dir.name === activeDirector)?.description}</p>
          </div>
        </div>
      </Modal>

      <Modal show={!!activePersonnel} align='center' closeBtn={true} onClose={handleClose} >
        <div className='bg-white w-80 lg:w-[650px] h-[500px] max-h-[500px] lg:h-auto overflow-auto'>
          <div className='px-6 lg:px-10 py-6'>
            <h3 className='text-lg font-semibold mb-3 font-openSans'>{keyManagerialPersonnel.find((per) => per.name === activePersonnel)?.name}</h3>
            <p>{keyManagerialPersonnel.find((per) => per.name === activePersonnel)?.description}</p>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default InvestorCorner;
