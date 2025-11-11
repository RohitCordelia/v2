
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../src/utils/config";
import { GetAuth } from "../../../src/utils/store/store";


export const WeekendApi = createApi({
  reducerPath: "WeekendApi",
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
  tagTypes: ["Itinerary"],
  endpoints: (builder) => ({
    getItinerary: builder.mutation<any, void>({
      query: (route_id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `2N/itineraries?${route_id}`,
        method: "GET",
      }),
    }),
    cabinPricing: builder.mutation<any, any>({
      query: ({id, data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `2N/itineraries/${id}/cabin_pricing`,
        method: 'POST',
        body: data
      }),
    }),
    createBooking: builder.mutation<any, any>({
      query: ({id,data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `2N/itineraries/${id}/booking`,
        method: 'POST',
        body: data,
      }),
    }),
    getUpgrade: builder.mutation<any, any>({
      query: ({id,data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `2N/itineraries/${id}/upgrades`,
        method: 'POST',
        body: data,
      }),
    }),
    getCoupon2n: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `2N/bookings/${data}/coupons`,
        method: 'GET',
      }),
    }),
    applyNewCoupon2n: builder.mutation<any, any>({
      query: ({id, data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `2N/bookings/${id}/apply_coupon`,
        method: 'POST',
        body: data,
      }),
    }),
    removeNewCoupon2n: builder.mutation<any, any>({
      query: ({id, data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `2N/bookings/${id}/remove_coupon`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetItineraryMutation,
  useCabinPricingMutation,
  useCreateBookingMutation,
  useGetUpgradeMutation,
  useGetCoupon2nMutation,
  useApplyNewCoupon2nMutation,
  useRemoveNewCoupon2nMutation
} = WeekendApi;
