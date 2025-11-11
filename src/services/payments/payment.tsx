
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAuth } from "../../../src/utils/store/store";
import { API_URL } from "../../../src/utils/config";


export const PaymentApi = createApi({
  reducerPath: "PaymentApi",
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
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    getAddressFromPincode: builder.query<any, any>({
      query: (pincode) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `contents/pincodes?search=${pincode}`,
        method: 'GET',
      }),
    }),
    initiatePayment: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/initiate_payment`,
        method: 'POST',
        body: data,
      }),
    }),
    initPayment: builder.query<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/`,
        method: 'POST',
        body: data,
      }),
    }),
    completePayment: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/complete_payment`,
        method: 'POST',
        body: data,
      }),
    }),
    enquireTransaction: builder.query<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/transaction_enquiry`,
        method: 'POST',
        body: data,
      }),
    }),
    initPaymentNew: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/`,
        method: 'POST',
        body: data,
      }),
    }),
    applyCoupon: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/apply_promo_code`,
        method: 'POST',
        body: data,
      }),
    }),
    removeCoupon: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/remove_promo_code`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyPan: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `verify_pan`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyGST: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `verify_gstin_only`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyUPI: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/validate_upi`,
        method: 'POST',
        body: data,
      }),
    }),
    paymentEnquiry: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/enquiry`,
        method: 'POST',
        body: data,
      }),
    }),
    getCoupon: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${data}/coupons`,
        method: 'GET',
      }),
    }),
    applyNewCoupon: builder.mutation<any, any>({
      query: ({id, data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/apply_coupon`,
        method: 'POST',
        body: data,
      }),
    }),
    removeNewCoupon: builder.mutation<any, any>({
      query: ({id, data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/remove_coupon`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAddressFromPincodeQuery,
  useInitiatePaymentMutation,
  useInitPaymentQuery,
  useCompletePaymentMutation,
  useEnquireTransactionQuery,
  useInitPaymentNewMutation,
  useApplyCouponMutation,
  useRemoveCouponMutation,
  useVerifyPanMutation,
  useVerifyGSTMutation,
  useVerifyUPIMutation,
  usePaymentEnquiryMutation,
  useGetCouponMutation,
  useApplyNewCouponMutation,
  useRemoveNewCouponMutation
} = PaymentApi;
