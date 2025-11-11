
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/config";
import { GetAuth } from "../../utils/store/store";
import CancellationSummary from "src/pages/myBooking/cancelSummery";

type ProfileResponse = {
  data: any[]
}


export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getMyBookingsData: builder.mutation<ProfileResponse, void>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `users/${id}/my_bookings`,
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserProfile: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `users/${id}`,
        method: "GET"
      }),
    }),
    getBookingDetail: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `mobile/bookings/${id}`,
        method: "GET"
      }),
    }),
    getViewItinerary: builder.mutation<any, any>({
      query: ({ itinerary_id }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries/${itinerary_id}`,
        method: "GET",
      }),
    }),
    availableCabin: builder.mutation<any, any>({
      query: ({ itinerary_id }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries/${itinerary_id}/available_cabins`,
        method: "GET",
      }),
    }),
    cabinPricing: builder.mutation<any, any>({
      query: ({ itinerary_id, data }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries/${itinerary_id}/upcoming_cruise_price`,
        method: "POST",
        body: data,
      }),
    }),
    getBookingData: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/get_booking`,
        method: "GET",
      }),
    }),
    updateGuestData: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/add_guest_pricing`,
        method: "POST",
        body: data,
      }),
    }),
    createNewGuest: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/save_new_guests`,
        method: "POST",
        body: data,
      }),
    }),
    cancelBooking: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/cancel`,
        method: "POST",
      }),
    }),
    cancellationSummary: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/cancellation_charges`,
        method: "GET",
      }),
    }),
    bookingPaymentNew: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/repay_due_amount/`,
        method: 'POST',
        body: data,
      }),
    }),
    partialCancellationFees: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/partial_cancellation_fees`,
        method: 'POST',
        body: data,
      }),
    }),
    cabinCancellation: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/cancel_partially`,
        method: 'POST',
        body: data,
      }),
    }),
    saveCabin: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/save_cabins`,
        method: 'POST',
        body: data,
      }),
    }),
    updateGuest: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/save_guests`,
        method: 'POST',
        body: data,
      }),
    }),
    reschedulePricing: builder.mutation<any, any>({
      query: (body) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `reschedule/pricing`,
        method: 'POST',
        body,
      }),
    }),
    rescheduleConfirm: builder.mutation<any, any>({
      query: (body) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `reschedule/confirm`,
        method: 'POST',
        body,
      }),
    }),

    rescheduleBooking: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `reschedule/itineraries`,
        method: "GET",
        params: { booking_id: id },
      }),
    }),
    rescheduleCheckAvailability: builder.mutation<any, any>({
      query: ({ booking_id, itinerary_id }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `reschedule/check_cabin_availability`,
        method: "POST",
        params: {
          booking_id,
          itinerary_id,
        },
      }),
    }),
  })
});
export const {
  useGetMyBookingsDataMutation,
  useUpdateUserProfileMutation,
  useGetUserProfileMutation,
  useGetBookingDetailMutation,
  useGetViewItineraryMutation,
  useAvailableCabinMutation,
  useCabinPricingMutation,
  useGetBookingDataMutation,
  useCreateNewGuestMutation,
  useUpdateGuestDataMutation,
  useCancelBookingMutation,
  useCancellationSummaryMutation,
  useBookingPaymentNewMutation,
  usePartialCancellationFeesMutation,
  useCabinCancellationMutation,
  useSaveCabinMutation,
  useUpdateGuestMutation,
  useRescheduleBookingMutation,
  useRescheduleCheckAvailabilityMutation,
  useReschedulePricingMutation,
  useRescheduleConfirmMutation,
} = ProfileApi;
