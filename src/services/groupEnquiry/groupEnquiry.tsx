
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/config";
import { GetAuth } from "../../utils/store/store";

export const GroupEnquiryApi = createApi({
  reducerPath: "GroupEnquiryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const auth = GetAuth();
      const token = auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["GroupEnquiry"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `agents/send_otp`,
        method: "POST",
        body: data,
      }),
    }),
    saveEnquiryGuest: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `enquiries`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `agents/verify_otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyPan: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `agents/verify_pan`,
        method: "POST",
        body: data,
      }),
    }),
    verifyGSTIN: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `agents/verify_gstin`,
        method: "POST",
        body: data,
      }),
    }),
    saveAgent: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `agents/save_agent`,
        method: "POST",
        body: data,
      }),
    }),
    saveEnquiryAgent: builder.mutation<any, any>({
      query: ({data, token}) => ({
        headers: {
          "Content-type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        url: `agents/send_enquiry`,
        method: "POST",
        body: data,
      }),
    }),
  }),

});
export const {
  useSendOtpMutation,
  useSaveEnquiryGuestMutation,
  useVerifyOtpMutation,
  useVerifyPanMutation,
  useVerifyGSTINMutation,
  useSaveAgentMutation,
  useSaveEnquiryAgentMutation
} = GroupEnquiryApi;
