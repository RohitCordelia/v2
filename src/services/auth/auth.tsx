import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '/src/utils/config';

// type LoginUser = {
//   email: string;
//   password: string;
// };
// type LoginResponse = string;
type User = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  }
};

type SendOTPPayloadType = {
  email: string;
}

type VerifyOTPPayloadType = {
  email: string;
  code: string;
}

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    sendOTP: builder.mutation<any, { phone_number: string }>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/send_otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation<any, { phone_number: string; country_code: string; otp: string; }>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/verify_otp`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'user/logout',
        method: 'POST',
        body: data,
      }),
    }),
    verifyBooking: builder.query<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `auth/verify_booking`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyTruecaller: builder.query<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `auth/verify_truecaller`,
        method: 'POST',
        body: data,
      }),
    }),
    sendMessage: builder.mutation<any, { phone: string; country_code: string; template: string; }>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `sms/send_message`,
        method: "POST",
        body: data,
      }),
    }),
    sendEnquiry: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `quotations/save_enquiry`,
        method: "POST",
        body: data,
      }),
    }),
    exitIntent: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `leads`,
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/sign_in`,
        method: "POST",
        body: data,
      }),
    }),
    saveClubMahindraData: builder.mutation<any, any>({
      // query: (token) => ({
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   url: `leads/save_club_mahindra_data?token=${token}`,
      //   method: 'POST',
      // }),
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `leads/save_club_mahindra_data`,
        method: "POST",
        body: data,
      }),
    }),
    sttLogin: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/get_auth_token`,
        method: "POST",
        body: data,
      }),
    }),
    subscribe: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `subscriptions`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLogoutMutation,
  useVerifyBookingQuery,
  useVerifyTruecallerQuery,
  useSendMessageMutation,
  useSendEnquiryMutation,
  useExitIntentMutation,
  useSignInMutation,
  useSaveClubMahindraDataMutation,
  useSttLoginMutation,
  useSubscribeMutation,
} = AuthApi;
