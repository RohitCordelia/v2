import React from "react";
import '/src/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Home from '/src/pages/home/home';
import { useEffect } from 'react';
import TransactionEnquiry from "../src/pages/transactionEnquiry/transactionEnquiry";
import QuotationPaymentSummary from "../src/pages/quotationPaymentSummary/quotationPaymentSummary";
import QuotationPaymentMethod from "../src/pages/quotationPaymentSummary/quotationPaymentMethod";
import VerifyBooking from "./pages/verifyBooking/verifyBooking";
import DisclaimerAgainstFrauds from "./pages/frauds";
import InvestorCorner from "./pages/InvestorCorner";
import PDFViewerPage from "./pages/InvestorCorner/PDFViewerPage";
import { useLocation } from 'react-router-dom';

import UTMPreserver from './component/UTMPreserver';
import useValidateToken from "./hooks/useTokenValidate";

// import TheEmpress from "./pages/TheEmpress";
// import CordeliaSky from "./pages/CordeliaSky";
// import NationalTourism from "./pages/events/NationalTourismDay";
const CricketEventOffers = React.lazy(() => import('./pages/events/CricketEventOffers'))
// const NationalTourism = React.lazy(() => import('./pages/events/NationalTourismDay'))
const Tourismandhospitality = React.lazy(() => import('./pages/events/Tourismandhospitality'))
const NationalTourism = React.lazy(() => import('./pages/events/NationalTourismDay'))
const SummerHolidays = React.lazy(() => import('./pages/events/summer-holidays/SummerHolidays'))
const SalesLeadGen = React.lazy(() => import('./pages/Sales-Lead-gen-page/Sales'))
const UpcomingCruises = React.lazy(() =>
  import(
    /* webpackChunkName: "upcomingCruises" */ /* webpackPrefetch: true */ '/src/pages/upcomingCruises/upcomingCruises'
  )
);

const Offers = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/offers/offers'
  )
);
const PaymentSummary = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/paymentSummary/paymentSummary'
  )
);
const PaymentMethod = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/paymentSummary/paymentMethod'
  )
);
const PaymentSuccess = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/paymentSummary/paymentSuccess'
  )
);
const GroupBooking = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/groupBooking/groupBooking'
  )
);
const AboutUs = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/aboutUs/aboutUs'
  )
);
const PrivacyPolicy = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/privacyPolicy/privacyPolicy'
  )
);
const OnboardPolicy = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/onboardPolicy/onboardPolicy'
  )
);
const FoodBeverage = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/foodBeverage/foodBeverage'
  )
);
const CleanWavePolicy = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/cleanWavePolicy/cleanWavePolicy'
  )
);
const InvestorRelation = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/investorRelation/investorRelation'
  )
);
const Destination = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/destination/destination'
  )
);
const HealthWavePolicy = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/healthWavePolicy/healthWavePolicy'
  )
);
const TermsCondition = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/termsCondition/termsCondition'
  )
);
const Accomodation = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/accomodation'
  )
);
const Faqs = React.lazy(() =>
  import(
    /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/faqs/faqs'
  )
);
const DownloadLink = React.lazy(() =>
  import(
  /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/components/downloadApp/downloadLink'
  )
);
const Promotion = React.lazy(() =>
  import(
      /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/promotion'
  )
);
const Entertainment = React.lazy(() =>
  import(
      /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/entertainment'
  )
);

const Wedding = React.lazy(() =>
  import(
      /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/wedding'
  )
);
const Corporate = React.lazy(() =>
  import(
      /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/corporate'
  )
);
const Srilanka = React.lazy(() =>
  import(
      /* webpackChunkName: "offers" */ /* webpackPrefetch: true */ '/src/pages/sri-lanka'
  )
);
const ShoreEx = React.lazy(() =>
  import('/src/pages/shoreExcursion')
);
const UpgradeRoom = React.lazy(() =>
  import('/src/pages/upgradeRoom')
);
const Cabin = React.lazy(() =>
  import('/src/pages/cabin')
);
const GuestDetail = React.lazy(() =>
  import('/src/pages/guestDetail')
);
const Dubai = React.lazy(() =>
  import('/src/pages/dubai')
);
const Homepage = React.lazy(() =>
  import('/src/pages/homepage')
);
const Events = React.lazy(() =>
  import('/src/pages/events')
);
const Alcohal = React.lazy(() =>
  import('/src/pages/alcohal')
);
const Weekend = React.lazy(() =>
  import('/src/pages/weekend')
);
const Itinerary = React.lazy(() =>
  import('/src/pages/weekend/itinerary')
);
const WeekendBilling = React.lazy(() =>
  import('/src/pages/weekend/billing')
);
const AccountDelete = React.lazy(() =>
  import('../src/pages/accountDelete')
);
const CMSLogin = React.lazy(() =>
  import('../src/pages/cms/login')
);
const CMSHomepage = React.lazy(() =>
  import('../src/pages/cms/homepage')
);
const PaymentFailure = React.lazy(() =>
  import('../src/pages/paymentSummary/paymentFailure')
);
const WeekendCallNow = React.lazy(() =>
  import('../src/pages/weekendCallNow/index')
);
const CMSCoupon = React.lazy(() =>
  import('../src/pages/cms/coupon')
);
const CMSAddCoupon = React.lazy(() =>
  import('../src/pages/cms/coupon/addCoupon')
);
const SrilankaCruises = React.lazy(() =>
  import('../src/pages/srilankaCruises')
);
const GoaCruises = React.lazy(() =>
  import('../src/pages/goaCruises')
);
const LakshadweepCruises = React.lazy(() =>
  import('../src/pages/lakshadweepCruises')
);
const SingaporeCruises = React.lazy(() =>
  import('../src/pages/singaporeCruises')
);
const Singapore = React.lazy(() =>
  import('../src/pages/singapore')
);
const SouthEastAsia = React.lazy(() =>
  import('../src/pages/southEastAsia')
);
const MaleColombo = React.lazy(() =>
  import('../src/pages/maleColombo')
);
const AmexCruises = React.lazy(() =>
  import('../src/pages/amexCruises')
);
const KochiCruises = React.lazy(() =>
  import('../src/pages/kochiCruises')
);
const MumbaiCruises = React.lazy(() =>
  import('../src/pages/mumbaiCruises')
);
const Lakshadweep = React.lazy(() =>
  import('../src/pages/lakshadweep')
);
const Goa = React.lazy(() =>
  import('../src/pages/goa')
);
const Amex = React.lazy(() =>
  import('../src/pages/Amex')
);
const Kochi = React.lazy(() =>
  import('../src/pages/kochi')
);
const Mumbai = React.lazy(() =>
  import('../src/pages/mumbai')
);
const UpcomingCruiseNew = React.lazy(() => import('./pages/upcomingCruiseNew'));
const ViewItinerary = React.lazy(() => import('./pages/upcomingCruiseNew/viewItinerary'));
const SelectCabin = React.lazy(() => import('./pages/upcomingCruiseNew/selectCabin'));
const MyProfile = React.lazy(() =>
  import('../src/pages/profile/myProfile/index')
);
const MyBooking = React.lazy(() =>
  import('../src/pages/myBooking/myBooking')
);
const BookingDetails = React.lazy(() =>
  import('../src/pages/myBooking/bookingDetail')
);
const ModifyBooking = React.lazy(() =>
  import('../src/pages/myBooking/modifyBooking')
);
const CabinSelection = React.lazy(() =>
  import('../src/pages/myBooking/component/cabinSelection')
);
const GuestSelect = React.lazy(() =>
  import('../src/pages/myBooking/guestDetail')
);
const AddShoreEx = React.lazy(() =>
  import('../src/pages/myBooking/shoreExcursion')
);
const SelectProfileCabin = React.lazy(() =>
  import('../src/pages/myBooking/selectCabin')
);
const ManageGuestCabin = React.lazy(() =>
  import('../src/pages/myBooking/component/manageGuestCabins')
);
const BookingSucces = React.lazy(() =>
  import('./pages/myBooking/component/bookingSuccess')
);
const BookingCancel = React.lazy(() =>
  import('./pages/myBooking/component/bookingCancel')
);
const PaymentSummery = React.lazy(() =>
  import('../src/pages/myBooking/paymentSummery')
);
const CancellationSummary = React.lazy(() =>
  import('../src/pages/myBooking/cancelSummery')
);
const ShoreExDetail = React.lazy(() =>
  import('../src/pages/myBooking/shoreExDetail')
);
const RefundStatus = React.lazy(() =>
  import('../src/pages/myBooking/refundStatus')
);
const Diwali = React.lazy(() => import('./pages/diwali/index'));
const AssignCabin = React.lazy(() =>
  import('../src/pages/myBooking/assignCabin')
);
const UpdateGuest = React.lazy(() =>
  import('../src/pages/myBooking/updateGuest')
);
const UpdateGuestDetail = React.lazy(() =>
  import('../src/pages/myBooking/updateGuest/guestDetail')
);
const GenericLeadGen = React.lazy(() =>
  import('../src/pages/genericLeadGen')
);
const GroupQuotation = React.lazy(() => import('../src/pages/groupQuotation'));
const IndigoPage = React.lazy(() =>
  import('../src/pages/indigoPage/index')
);
const InternationalCruises = React.lazy(() =>
  import('../src/pages/internationalCruises/index')
)
const Career = React.lazy(() =>
  import('../src/pages/career')
);
const ClubMahindra = React.lazy(() => import('../src/pages/clubMahindra'));
const WeekendClubMahindra = React.lazy(() => import('../src/pages/clubMahindra/weekend'));
const Christmas_newyear = React.lazy(() =>
  import('../src/pages/christmas_newyear')
);
const Valentine_holi = React.lazy(() =>
  import('../src/pages/valentine_holi')
);
const Blog = React.lazy(() =>
  import('../src/pages/blogPage')
);
const BlogPages = React.lazy(() =>
  import('../src/pages/blogPage/pages/index')
);

const ShoreExcursionNew = React.lazy(() =>
  import('../src/pages/myBooking/shore-excursions')
);
const SelectUpgradeCabin = React.lazy(() =>
  import('../src/pages/myBooking/upgradeCabin/selectCabin'));

const ManageUpgradeCabin = React.lazy(() =>
  import('../src/pages/myBooking/upgradeCabin/manageUpgradeCabins')
);

const DeckSelection = React.lazy(() =>
  import('./pages/myBooking/rescheduleBooking/deckSelection')
);

const SelectCabinReschedule = React.lazy(() =>
  import('./pages/myBooking/rescheduleBooking/selectCabinReschedule')
);
const RescheduleBooking = React.lazy(() =>
  import('./pages/myBooking/rescheduleBooking/rescheduleBooking')
);

const Vishakapatnam = React.lazy(() => import('../src/pages/vishakapatnam'))
const VishakapatnamCruises = React.lazy(() => import('./pages/vishakapatnamCruises'))
const Pondicherry = React.lazy(() => import('./pages/pondicherry'))
const PondicherryCruises = React.lazy(() => import('./pages/pondicherryCruises'))
const Chennai = React.lazy(() => import('./pages/chennai'))
const ChennaiCruises = React.lazy(() => import('./pages/chennaiCruises'))

const WebCheckIn = React.lazy(() =>
  import('./pages/webCheckIn/webCheckIn')
);
const WebBooking = React.lazy(() =>
  import('./pages/webCheckIn/web_Booking')
);
const CheckinGuestDetail = React.lazy(() =>
  import('./pages/webCheckIn/checkinGuestDetail')
);
const IdPreview = React.lazy(() =>
  import('./pages/webCheckIn/idPreview')
);
const ProfilePreview = React.lazy(() =>
  import('./pages/webCheckIn/profilePreview')
);
const ProfileUpload = React.lazy(() =>
  import('./pages/webCheckIn/profileUpload')
);
const CordeliaEmpress = React.lazy(() =>
  import('./pages/CordeliaEmpress')
);
const CordeliaSky = React.lazy(() =>
  import('./pages/CordeliaSky')
);
const CordeliaSun = React.lazy(() =>
  import('./pages/CordeliaSun')
);

const SrilankaDestination = React.lazy(() =>
  import('../src/pages/srilankaDestination')
);

const Referral = React.lazy(() =>
  import('../src/pages/referral')
);

const NewYear = React.lazy(() => import('../src/pages/events/NewYear'));
const Christmas = React.lazy(() => import('../src/pages/events/Christmas'));
const Birthday = React.lazy(() =>
  import('../src/pages/birthday/birthday')
);

const BirthdayOffers = React.lazy(() =>
  import('../src/pages/birthday/birthdayOffers')
);

import BirthdayRoutes from './pages/birthday/birthdayRoutes';

// import UpcomingCruises from '/src/pages/upcomingCruises/upcomingCruises';
// import Offers from '/src/pages/offers/offers';

function App() {
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.search.includes('utm_')) {
  //     sessionStorage.setItem('queryParams', location.search);
  //   }
  // }, [location.search]);

  useValidateToken();
  return (
    <div className="app">
      <React.Suspense fallback={
        <div className='h-full w-full flex justify-center items-center overflow-hidden fixed bg-black/80 z-50'>
          <img
            className='w-32 lg:w-44'
            src="https://images.cordeliacruises.com/cordelia_v2/public/images/cordelia-new-loader.gif"
            alt=""
          />
        </div>
      }>
        <UTMPreserver />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upc" element={<UpcomingCruises />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/payment-summary" element={<PaymentSummary />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/quotation/payment-summary" element={<QuotationPaymentSummary />} />
          <Route path="/quotation/payment-method" element={<QuotationPaymentMethod />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* <Route path="/group-booking" element={<GroupBooking />} /> */}
          <Route path="/group-booking" element={<Navigate to="/group-quotation" replace />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/booking/success" element={<PaymentSuccess />} />
          <Route path="/booking/failed" element={<PaymentFailure />} />
          <Route path="/transaction-enquiry" element={<TransactionEnquiry />} />
          <Route path="/verify-booking" element={<VerifyBooking />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/onboard-policy" element={<OnboardPolicy />} />
          <Route path="/food-beverage" element={<FoodBeverage />} />
          <Route path="/clean-wave-policy" element={<CleanWavePolicy />} />
          {/* <Route path="/investor-relation" element={<InvestorRelation />} /> */}
          <Route path="/destination" element={<Destination />} />
          <Route path="/health-wave-policy" element={<HealthWavePolicy />} />
          <Route path="/terms-condition" element={<TermsCondition />} />
          <Route path="/accommodation" element={<Accomodation />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/download" element={<DownloadLink />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/srilanka" element={<Srilanka />} />
          <Route path="/cruise-destinations/cruise-from-chennai-to-sri-lanka" element={<Srilanka />} />
          <Route path="/shore-excursions" element={<ShoreEx />} />
          <Route path="/upgrade-room" element={<UpgradeRoom />} />
          <Route path="/cabin" element={<Cabin />} />
          <Route path="/guest-detail" element={<GuestDetail />} />
          {/* <Route path="/dubai" element={<Dubai />} /> */}
          <Route path="/cruise-destinations/mumbai-to-dubai-cruise" element={<Dubai />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cricket-event-offers" element={<CricketEventOffers />} />
          {/* <Route path="/cruise-holidays" element={<NationalTourism />} /> */}
          <Route path="/promotion/tourismandhospitality" element={<Tourismandhospitality />} />
          {/* Tourismandhospitality */}
          {/* <Route path="/cruise-holidays" element={<NationalTourism />} /> */}
          <Route path="/summer-holidays" element={<SummerHolidays />} />
          <Route path="/trade-events" element={<SalesLeadGen />} />
          <Route path="/alcohol" element={<Alcohal />} />
          <Route path="/weekend" element={<Weekend />} />
          <Route path="/weekend/call-now" element={<WeekendCallNow />} />
          <Route path="/select-itinerary" element={<Itinerary />} />
          <Route path="/billing-detail" element={<WeekendBilling />} />
          <Route path="/delete_account" element={<AccountDelete />} />
          <Route path="/cms/login" element={<CMSLogin />} />
          <Route path="/cms/homepage" element={<CMSHomepage />} />
          <Route path="/cms" element={<CMSHomepage />} />
          <Route path="/srilanka-cruises" element={<SrilankaCruises />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/manage-booking" element={<MyBooking />} />
          <Route path="/manage-booking/booking-details" element={<BookingDetails />} />
          <Route path="/manage-booking/modify-booking" element={<ModifyBooking />} />
          <Route path="/manage-booking/deck-selection" element={<DeckSelection />} />
          <Route path="/manage-booking/cabin-selection" element={<CabinSelection />} />
          <Route path="/manage-booking/guest-detail" element={<GuestSelect />} />
          <Route path="/manage-booking/shore-ex" element={<AddShoreEx />} />
          <Route path="/manage-booking/select-cabin" element={<SelectProfileCabin />} />
          <Route path="/manage-booking/manage-guestcabin" element={<ManageGuestCabin />} />
          <Route path="/manage-booking/success" element={<BookingSucces />} />
          <Route path="/manage-booking/booking-status" element={<BookingCancel />} />
          <Route path="/manage-booking/payment-summery" element={<PaymentSummery />} />
          <Route path="/manage-booking/cancellation-summery" element={<CancellationSummary />} />
          <Route path="/manage-booking/shoreEx-detail" element={<ShoreExDetail />} />
          <Route path="/manage-booking/refund-status" element={<RefundStatus />} />
          <Route path="/manage-booking/assignCabin" element={<AssignCabin />} />
          <Route path="/manage-booking/updateGuest" element={<UpdateGuest />} />
          <Route path="/manage-booking/update-guest-detail" element={<UpdateGuestDetail />} />
          <Route path='*' element={<Homepage />} />
          <Route path="/cms/coupon" element={<CMSCoupon />} />
          <Route path="/cms/add-coupon" element={<CMSAddCoupon />} />
          <Route path="/goa-cruises" element={<GoaCruises />} />
          <Route path="/lakshadweep-cruises" element={<LakshadweepCruises />} />
          <Route path="/south-east-asia-cruises" element={<SingaporeCruises />} />
          {/* <Route path="/south-east-asia" element={<Singapore />} /> */}
          <Route path="/south-east-asia" element={<Navigate to="/southeast-asia-cruises" replace />} />
          <Route path="/southeast-asia-cruises" element={<SouthEastAsia />} />
          <Route path="/maldives-cruises" element={<MaleColombo />} />

          <Route path="/mumbai-cruises" element={<MumbaiCruises />} />
          <Route path="/Amex-cruises" element={<AmexCruises />} />
          <Route path="/kochi-cruises" element={<KochiCruises />} />
          <Route path="/lakshadweep" element={<Lakshadweep />} />
          <Route path="/goa" element={<Goa />} />
          <Route path="/Amex" element={<Amex />} />
          <Route path="/kochi" element={<Kochi />} />
          <Route path="/mumbai" element={<Mumbai />} />
          <Route path="/upcoming-cruises" element={<UpcomingCruiseNew />} />
          <Route path="/upcoming-cruises/itinerary" element={<ViewItinerary />} />
          <Route path="/upcoming-cruises/selectCabin" element={<SelectCabin />} />
          <Route path="/diwali" element={<Diwali />} />
          <Route path="/christmas_newyear" element={<Christmas_newyear />} />
          <Route path="/cruise-registration" element={<GenericLeadGen />} />
          <Route path="/group-quotation" element={<GroupQuotation />} />
          <Route path="/events-december24" element={<IndigoPage />} />
          <Route path="/international-cruises" element={<InternationalCruises />} />
          <Route path="/Career" element={<Career />} />
          <Route path="/valentine_holi" element={<Valentine_holi />} />
          <Route path="/upgrade-cabin/selectCabin" element={<SelectUpgradeCabin />} />
          <Route path="/upgrade-cabin/manage-upgrade" element={<ManageUpgradeCabin />} />

          <Route path="/upcoming-cruises/club-mahindra-offer" element={<ClubMahindra />} />
          <Route path="/weekend/club-mahindra-offer" element={<WeekendClubMahindra />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPages />} />
          <Route path="/manage-booking/shore-excursions" element={<ShoreExcursionNew />} />

          <Route path="/manage-booking/reschedule" element={<RescheduleBooking />} />
          <Route path="/manage-booking/reschedule/select-cabin" element={<SelectCabinReschedule />} />
          <Route path="/visakhapatnam" element={<Vishakapatnam />} />
          <Route path="/visakhapatnam-cruises" element={<VishakapatnamCruises />} />
          <Route path="/pondicherry" element={<Pondicherry />} />
          <Route path="/pondicherry-cruises" element={<PondicherryCruises />} />
          <Route path="/chennai" element={<Chennai />} />
          <Route path="/chennai-cruises" element={<ChennaiCruises />} />
          <Route path="/webCheckIn" element={<WebCheckIn />} />
          <Route path="/WebBooking" element={<WebBooking />} />
          <Route path="/checkInGuestDetail" element={<CheckinGuestDetail />} />
          <Route path="/id-preview" element={<IdPreview />} />
          <Route path="/profile-preview" element={<ProfilePreview />} />
          <Route path="/profile-upload" element={<ProfileUpload />} />
          <Route path="/disclaimer-against-frauds" element={<DisclaimerAgainstFrauds />} />
          <Route path="/cordelia-empress" element={<CordeliaEmpress />} />
          <Route path="/cordelia-sky" element={<CordeliaSky />} />
          <Route path="/cordelia-sun" element={<CordeliaSun />} />

          <Route path="/srilanka/jaffna" element={<SrilankaDestination />} />
          <Route path="/srilanka/hambantota" element={<SrilankaDestination />} />
          <Route path="/srilanka/trincomalee" element={<SrilankaDestination />} />

          <Route path="/thailand/phuket" element={<SrilankaDestination />} />
          <Route path="/malaysia/kuala-lumpur" element={<SrilankaDestination />} />
          <Route path="/malaysia/langkawi" element={<SrilankaDestination />} />
          <Route path="/singapore" element={<SrilankaDestination />} />
          <Route path="/investor-relation" element={<InvestorCorner />} />
          <Route path="/view-pdf" element={<PDFViewerPage />} />
          <Route path="/referral-terms" element={<Referral />} />
          <Route path="/new-year-cruise" element={<NewYear />} />
          <Route path="/christmas-cruise" element={<Christmas />} />

          {/* <Route path="/anniversarysale/*" element={<BirthdayRoutes />} /> */}
          {/* <Route path="/anniversarysale/register" element={<Birthday />} />
          <Route path="/anniversarysale/earlyaccess" element={<BirthdayOffers />} /> */}
          {/* Anniversary sale routes (all handled inside AnniversaryRoutes) */}
          {/* redirect /anniversarysale → /anniversarysale/register */}
          {/* <Route path="/anniversarysale" element={<Navigate to="/anniversarysale/register" replace />} />
          <Route path="/anniversarysale/earlyaccess" element={<Navigate to="/anniversarysale/register" replace />} /> */}
        </Routes>
      </React.Suspense>
      {/*<ToastContainer />*/}
    </div>
  );
}

export default App;

