import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '/src/components/Layout';
import ExitIntent from "../../components/ExitIntent";
type Props = {}

export default function PaymentSuccess({ }: Props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Layout>
            <main className="container mx-auto py-24 lg:pt-36 px-3 lg:pb-36">
                <h1 className='text-2xl lg:text-3xl font-semibold'>Terms and Conditions | Cordelia Cruises</h1>

                <p className='text-lg font-semibold mt-5 lg:mt-6 '>Introduction</p>
                <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>This web site and the related web sites contained herein (collectively, the "Site") make available information on cruise, and other transient leisure travel facilities (each a "Property") owned, managed or franchised by the Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited) and/or its subsidiaries and affiliates (collectively, "LTPL"), and other travel‐related or consumer goods and services. The Site, and the services of each of its modules, is offered exclusively by WLTPL and or its various third party providers and distributors.</p>
                <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The terms and conditions set out below ("Conditions") apply to your use of the Site including the use of the information services offered on the Site.</p>
                <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In accessing, using, viewing, transmitting, caching or storing this Site or any of its services, functions, materials, or contents, you shall be deemed to have agreed to each and all the Conditions and notices in this Site without modification. Further, you agree to be bound by these Conditions so please carefully read this section before proceeding. If you do not accept these Conditions, you must refrain from using the Site. These Conditions must be read in conjunction with any other applicable terms and conditions governing the use of the Site.</p>

                <div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>1. Site</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Site makes available information relating to cruise travel owned or managed by the Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited) , a company constituted under the laws of India, and its subsidiaries, controlled entities, affiliates and related parties belonging to WLTPL or being operated or managed by WLTPL.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>2. Trademarks</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Site contains the name, trade and service marks, logos, devices of Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited), Cordelia Cruises, and other valuable trade and service marks owned by WLTPL or licensed to WLTPL to distinguish its services and products (collectively referred to as “WLTPL Intellectual Property”). WLTPL Intellectual Property is protected from copying and simulation under national and international laws and may not be reproduced, copied or otherwise used in any manner whatsoever, on any material whether tangible or intangible, without the express prior written permission and consent of WLTPL. Without limitation, you must not use any of the said trade or service marks, either alone or in conjunction or combination or variation with other trade and service marks, logos and devices:</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In or as the whole or part of your own trademarks;</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In connection with activities, products or services which are not undertaken or provided by WLTPL;</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In a manner which may be confusing, misleading or deceptive; or</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In a manner that disparages WLTPL or its information, products or services (including the Site).</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Nothing contained on the Site should be construed as granting, by implication, estoppels, or otherwise, any license or right to use any of the trademarks without the written permission of WLTPL or such other party that may own the trademarks.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The image of vessels, registered brand and other Intellectual property are owned by WLTPL. Any use of the images without our express consent in writing shall constitute infringement of our Intellectual Property Rights/registered Trademarks. In case you wish to use these images in your work, we are open to discuss granting license, provided such use is commensurate with reputation and goodwill of the hotel. For any enquiries with regard to obtaining license for use of such images, please get in touch with the General Counsel and/or Chief Finance Officer of The Waterways Leisure Tourism Limited (Formally known as Waterways Leisure Tourism Private Limited) at 16th, A-1601, Marathon Futurex, NM Joshi Marg, Lower Parel, Mumbai, Maharashtra, 400013</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>3. Copyright</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Site, including each of its modules, is the copyrighted property of WLTPL and or its various third party providers and distributors. The information, text, graphics, images, photographs, videos, sounds, links and all other information and software published or otherwise contained in the Site (“Information”) are either owned exclusively by WLTPL or licensed by WLTPL and except as specifically provided in these Conditions may not be copied, distributed, displayed, reproduced or transmitted, in any form or by any means whether electronic, mechanical, photocopying, recording, or otherwise, without the prior written approval of WLTPL.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Without limitation you may not, without such approval from WLTPL, create derivative works from any part of the Site or commercialise any Information, products or services obtained from any part of the Site. Information procured from a third party may be the subject of copyright owned by that third party. Unauthorized use of the Site and/or the materials contained on the Site may violate applicable copyright, trademark or other intellectual property laws or other laws. You must retain all copyright and trademark notices, including any other proprietary notices, contained in the materials. The use of such materials on any other web site or in any environment of networked computers is strictly prohibited.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>4. Your use</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Site is for your personal non‐commercial use and the Information may be downloaded or printed by you solely for that purpose. You may only use the Site if you are at least 18 (eighteen) years of age and can enter into binding contracts (the Site is not available for use by minors). You are responsible for maintaining the secrecy of your passwords, login and account information. You will be financially accountable for all uses of the Site by you and anyone using your password and login information. The right to use the Information is a license only, not a transfer of title, and is subject to the following restrictions:</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The information may not be used for any commercial purpose or public display, performance, sale or rental;</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>No copyright or other proprietary notices may be removed:</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The information may not be transferred to another person;</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Software may not be interfered with in any manner;</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Every person downloading, reproducing or otherwise using the Information must prevent any unauthorized copying of the Information;</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You will only use the information for lawful purposes and in accordance with these Conditions.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In addition, you agree that you will not use robot, spider, other automatic device, or manual process to monitor or copy our web pages or the content contained herein, without the prior written consent of WLTPL (such content is deemed given for standard search engine technology employed by internet search web sites to direct internet users to the Site).</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>5. Information</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL strives to ensure that the information is accurate and reliable. You accept that all Information provided on the Site or any other material accessed through the Site including via any Linked Wed Site (refer Condition 8) is general information and is not in the nature of advice.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You also accept that all of the Information is provided on an “as is” basis and to the extent permitted by law, is provided without any warranty, representation or condition of any kind whether express, implied, statutory or otherwise. You assume all responsibility and risk for your use of or reliance upon Information and the Site or any other material accessed through the Site including via any Linked Web Site.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Whilst WLTPL seeks to ensure that the Information is reliable and accurate, errors and omissions may occur and therefore, to the extent permitted by law, WLTPL does not make or give any representation or warranty (express or implied) of any kind as to any matter relating to the Site and any Linked Web Site, including without limitation, as to merchantability, non-infringement of intellectual property rights or fitness for purpose.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>In particular, WLTPL does not warrant that:</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Information or any other material accessed through the Site including via any Linked Web Site is reliable, accurate or complete including, without limitation, information relating to prices and availability; or</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Your access to Information or any other material accessed through the Site including via any Linked Web Site will be uninterrupted, timely or secure.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL is not liable for any loss (direct or indirect) resulting from any action taken or reliance made by you on the Information or any other material accessed through the Site including via any Linked Web Site. You should make your own inquiries and seek independent professional advice before acting or relying on any such information or material.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL may from time to time update, modify or add to the Information, including these Conditions and absolutely reserves the right to make such changes without any obligation to notify past, current or prospective users of the Site. Unless otherwise specified to the contrary all new Information shall be subject to these Conditions.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL does not guarantee that the Site will operate continuously or without interruption or be error free. WLTPL may suspend or discontinue any aspect of the Site at any time without being liable for any direct or indirect loss as a result of such action.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>6. Liability Disclaimer &amp; Exclusion</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>In no event shall WLTPL be responsible for any direct, indirect, special, incidental or consequential loss or damage, however arising and whether in contract, tort or otherwise, which you may suffer in connection with or arising out of:</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Your use of the Site or any Linked Web Site; or</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Your use of or reliance on Information or any other material accessed through the Site including via any Linked Web Site including without limitation, loss or damage by way of loss of profits, loss of business opportunity, business interruption or loss of information.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>These Conditions do not purport to exclude liability arising by any applicable law if, and to the extent, such liability cannot be lawfully excluded, however, to the extent permitted by law, all warranties, terms or conditions which would otherwise be implied into these Conditions are hereby excluded.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Where applicable law implies any warranty, term or condition, and that law prohibits exclusion or modification of any such warranty, term or condition, then the liability of WLTPL shall include liability for any breach of such warranty, term or condition but, to the extent permitted by law, the remedy for such breach will be limited as follows:</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>If the breach related to services the remedy will be limited to the supply of the services again or payment of the cost of having the services supplied again; and</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>If the breach related to products and the products can be repaired the remedy will be limited to repair of such products or payment of the costs of having the products repaired, but otherwise, replacement of the products or the supply of equivalent products or payment of the cost of replacing the products or of acquiring equivalent products.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The limitation of liability applies whether the alleged liability is based on contract, tort, negligence, strict liability or any other basis even if we have been advised of the possibility of such damage.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>If you are dissatisfied with the use of the Site, or any of the products, services, members, suppliers and or buyer offered in connection therewith or associated therewith, as the case may be, your sole and exclusive remedy shall be to discontinue use of the Site.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>7. Specific Warnings</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You must ensure that your access to and your use of the Site is not illegal or prohibited by laws which apply to you.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You must take your own precautions that the process which you employ for accessing the Site does not expose you to the risk of virus, corrupted data, worms, other instructions or design that would erase data or programming or cause the Site or any equipment or system to become inoperable or incapable of being used in the full manner for which it was designed, or be subjected to malicious computer code, computer program routine or process or other forms of interference which may damage your computer system. Without limitation, you are responsible for ensuring that your computer system meets all relevant technical specifications necessary to use the Site and is compatible with the Site. For the removal of doubt, WLTPL does not accept responsibility for any interference or damage to your computer system which arises in connection with your use of the Site or any Linked Web Site.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL does not guarantee or warrant that any material available for downloading from the Site or any Linked Web Site will be free from any virus, infection or other condition which has contaminating or destructive properties. You are responsible for taking sufficient precautions and checks to satisfy your own particular requirements for accuracy of data input and output.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You must ensure that any information which you provide to WLTPL is accurate and complete and does not contain any virus, malicious computer code, computer program routine or process or other form of interference which may damage the computer system of WLTPL or the Information or which may detrimentally interfere with or surreptitiously intercept or expropriate any WLTPL system, data or information.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>8. Linked Websites</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Site may contain links to other web sites (“Linked Web Sites”). Those links are provided for convenience only. WLTPL provides such links solely as a convenience to you and for information purposes only. WLTPL has not reviewed all of the information on these other websites.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You acknowledge and agree that WLTPL does not have any control over the content or availability of Linked Web Sites and accepts no responsibility for the content, privacy practices or any other aspect of Linked Web Sites.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Links with Linked Web Sites should not be construed as an endorsement, approval or recommendation by WLTPL of the owners or operators of those Linked Web Sites, or of any information, graphics, materials, products or services referred to or contained on those Linked Web Sites, unless and then only to the extent expressly stipulated to the contrary. If you decide to access the Linked Web Sites, you do so at your own risk.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>9. Cruise reservations</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The reservations feature of the Site is provided solely to assist customers in determining the availability of travel related services and products and to make legitimate reservations and for no other purpose.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You warrant that you are at least 18 years of age, possess the legal authority to enter into the legal agreement constituted by your acceptance of these Conditions and to use the Site in accordance with such Conditions. You agree to supervise all usage by minors of this Site under your name or account. You also warrant that all information supplied by you or members of your household in using this Site is true and accurate and without limitation, or any false or fraudulent reservations.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You agree to be financially responsible for your use of the Site including without limitation for all reservations made by you or on your account for you, whether authorized by you or not. For any reservations or other services for which fees may be charged you agree to abide by the terms or conditions of supply including without limitation payment of all moneys due under such terms orconditions.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Site contains details of cruise charges and room rates (including any available special offers) forleisure travel services owned or managed by WLTPL.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Cruise reservation terms and conditions of booking are set out on the Site and payment will be inaccordance with the procedure set out in such terms and conditions.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You agree that you will make only legitimate reservations in good faith for use by you and your invited guests only, and not for other purposes, including without limitation, reselling, impermissibly assigning or posting on third party web sites or making speculative, false or fraudulent reservations, or any reservation in anticipation of demand.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>No contract will subsist between you and WLTPL or any of its affiliates in respect of any services or products offered through the Site unless and until WLTPL accepts your order by e‐mail or automated confirmation through the Site confirming that it has accepted your reservation, booking or order and any such contract shall be deemed to incorporate the cruise reservation terms and conditions of booking. Any other relevant terms and conditions relating to particular services or products are set out in the Site.
                        </p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You undertake that all details you provide to in connection with any services or products which may be offered by WLTPL on the Site (including cruise room reservations) will be correct and, where applicable, the credit card which you use is your own and that there are sufficient funds to cover the cost of any services or products which you wish to purchase. WLTPL reserves the right to obtain validation of your credit card details before providing you with any services or products.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>10. Termination of Access</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>If you breach any of these Conditions your license to use the Site will terminate immediately without the necessity of any notice being given to you.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Otherwise access to the Site may be terminated at any time by WLTPL without notice.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The provisions of these Conditions excluding, limiting and disclaiming the liability of WLTPL will nevertheless survive any such termination.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>11. Indemnification</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You agree to indemnify and defend and hold us and our subsidiaries, affiliates, officers, directors, agents and employees harmless from any claim or demand, made by any third party due to or arising out of your breach of this agreement or the documents it incorporates by reference, or your violation of any law or the rights of a third party. WLTPL’s failure to act with respect to a breach by you or others does not waive its right to act with respect to subsequent or similar breaches.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>12. Communication</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>With respect to all communications made to WLTPL on or through the Site including, without limitation, feedback, questions, comments and suggestions (the “Communications”): (a) no right of confidentiality shall apply to the Communications and WLTPL shall have no obligation to protect the Communications from disclosure; (b) WLTPL shall be free to reproduce, use, disclose and distribute the Communications to others; and (c) WLTPL shall be free to use any ideas, concepts, know‐how or techniques contained in the Communications for any purpose whatsoever, including, without limitation, the development, production and marketing of products and services that incorporate such information.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>13. General</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL does not accept any liability for any failure by WLTPL to comply with these Conditions where such failure is due to circumstances beyond its reasonable control.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>If WLTPL waives any rights available to it under these Conditions on one occasion, this does not mean that those rights will automatically be waived on any other occasion.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>If any of these Conditions are invalid, unenforceable or illegal for any reason, the remaining Conditions shall nevertheless continue in full force.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>You are completely responsible for all charges, fees, duties, taxes and assessments arising out of the use of the Site.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>14. Privacy</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>WLTPL respects the privacy of the users of this Site. Your use of the Site is subject to WLTPL Privacy Policy. If you would like to view the privacy practices please review our Privacy Policy available on the Site. By using our site, you consent to your personal information being processed as set out in our Privacy Policy.</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>15. Governing Law</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Substantive laws of the Republic of India</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>16. Arbitration</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Any dispute arising out of or in connection with these Conditions, the Site and/or the subject matter or any agreement between the guests/visitors and WLTPL, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration in accordance with the Arbitration Rules of the Mumbai Centre for International Arbitration (“MCIA Rules”), which rules are deemed to be incorporated by reference in this clause.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The seat of the arbitration shall be Mumbai.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The Tribunal shall consist of one arbitrator.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The language of the arbitration shall be English.</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>The law governing this arbitration agreement shall be law of India.”</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>17. Jurisdiction</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>Exclusive jurisdiction of the Courts in Mumbai</p>
                    </div>
                    <div>
                        <p className='text-base font-bold mt-3 lg:mt-4'>18. Return to Site</p>
                        <p className='text-sm lg:text-base font-medium mt-2 lg:mt-3 '>To return to the Site, click where indicated. By doing so, you acknowledge that you read, understood and accepted these Conditions.</p>
                    </div>
                </div>
            </main>
            <ExitIntent />
        </Layout>
    );
}