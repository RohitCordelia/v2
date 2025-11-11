import { combineReducers } from 'redux'
import { PaymentSlice } from '../../src/services/payments/paymentSlice';
import { PaymentApi } from '../../src/services/payments/payment';
import { AuthApi } from "../../src/services/auth/auth";
import { AuthSlice } from "../../src/services/auth/authSlice";
import { ItineraryApi } from '../../src/services/itinerary/itinerary';
import { ItinerarySlice } from '../../src/services/itinerary/itinerarySlice';
import { UserApi } from "../../src/services/user/user";
import { UserSlice } from "../../src/services/user/userSlice";
import { WeekendApi } from '../../src/services/weekend/weekend';
import { WeekendSlice } from '../../src/services/weekend/weekendSlice';
import { CMSApi } from '../services/cms/cms';
import { CMSSlice } from '../services/cms/cmsSlice';
import { UpcomingCruiseApi } from '../services/upcomingCruise/upcomingCruise';
import { UpcomingCruiseSlice } from '../services/upcomingCruise/upcomingCruiseSlice';
import { ProfileApi } from '../services/profile/profile';
import { ProfileSlice } from '../services/profile/profileSlice';
import { GroupEnquiryApi } from '../services/groupEnquiry/groupEnquiry';
import { GroupEnquirySlice } from '../services/groupEnquiry/groupEnquirySlice';
import { WebCheckInApi } from '../services/webCheckIn/webCheckIn';
import { WebCheckInSlice } from '../services/webCheckIn/webCheckInSlice';
import { OTPLessAuthApi } from '../services/OTPLessAuth/OTPLessAuth';
import { OTPLessAuthSlice } from '../services/OTPLessAuth/OTPLessAuthSlice';

export const rootReducer = combineReducers({
    [AuthApi.reducerPath]: AuthApi.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [UserSlice.name]: UserSlice.reducer,
    [ItineraryApi.reducerPath]: ItineraryApi.reducer,
    [ItinerarySlice.name]: ItinerarySlice.reducer,
    [PaymentApi.reducerPath]: PaymentApi.reducer,
    [PaymentSlice.name]: PaymentSlice.reducer,
    [WeekendApi.reducerPath]: WeekendApi.reducer,
    [WeekendSlice.name]: WeekendSlice.reducer,
    [CMSApi.reducerPath]: CMSApi.reducer,
    [CMSSlice.name]: CMSSlice.reducer,
    [UpcomingCruiseApi.reducerPath]: UpcomingCruiseApi.reducer,
    [UpcomingCruiseSlice.name]: UpcomingCruiseSlice.reducer,
    [ProfileApi.reducerPath]: CMSApi.reducer,
    [ProfileSlice.name]: CMSSlice.reducer,
    [GroupEnquiryApi.reducerPath]: GroupEnquiryApi.reducer,
    [GroupEnquirySlice.name]: GroupEnquirySlice.reducer,
    [WebCheckInApi.reducerPath]: WebCheckInApi.reducer,
    [WebCheckInSlice.name]: WebCheckInSlice.reducer,
    [OTPLessAuthApi.reducerPath]: OTPLessAuthApi.reducer,
    [OTPLessAuthSlice.name]: OTPLessAuthSlice.reducer,
  })