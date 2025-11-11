
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "../../../src/utils/interfaces/itineraryInterface";
import { API_URL } from "../../../src/utils/config";
import { GetAuth } from "../../../src/utils/store/store";

type ItineraryResponse={
  events: ItineraryResponse | undefined;
  ports: ItineraryResponse | undefined;
  itineraries: any[],
  pagination: any,
  cabinImage: any[],
}


type PricingPayload ={
  id: string,
  category_id: string,
  beds: string,
  data: {
    rooms: Room[]
  }
}
type CabinPayload ={
  categories: ItineraryResponse | undefined;
  cabinImage: any[]
}

export const ItineraryApi = createApi({
  reducerPath: "ItineraryApi",
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
    getItinerary: builder.query<any, void>({
      query: (port_codes) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries`+port_codes,
        method: "GET",
      }),
    }),
    getAllItinerary: builder.query<ItineraryResponse, void>({
      query: () => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries?pagination=false`,
        method: "GET",
      }),
    }),
    getPricing: builder.mutation<any, PricingPayload>({
      query: ({id,data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `itineraries/${id}/cabin_pricing`,
        method: 'POST',
        body: data,
      }),
    }),
    getOffers: builder.mutation<any, PricingPayload>({
      query: ({id,data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `itineraries/${id}/offers`,
        method: 'POST',
        body: data,
      }),
    }),
    createBooking: builder.mutation<any, any>({
      query: ({id,data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `itineraries/${id}/booking`,
        method: 'POST',
        body: data,
      }),
    }),
    createPayment: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `payments/demo_callback`,
        method: 'POST',
        body: data,
      }),
    }),
    getBookingById: builder.query<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/summary`,
        method: "GET",
      }),
    }),
    getBookingByQuotation: builder.query<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `quotations/booking`,
        method: "POST",
        body: data,
      }),
    }),
    getCabinImage: builder.query<CabinPayload, void>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `contents/categories.json`,
        method: "GET",
      }),
    }),
    getHomePageOffer: builder.query<any, void>({
      query: () => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `promotions`,
        method: "GET",
      }),
    }),
    getBookingDetail: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `payments/get_details`,
        method: "POST",
        body: data,
      }),
    }),
    getUpgrade: builder.mutation<any, PricingPayload>({
      query: ({id,data}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `itineraries/${id}/upgrades`,
        method: 'POST',
        body: data,
      }),
    }),
    getShoreEx: builder.mutation<any, PricingPayload>({
      query: ({id}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `bookings/${id}/shore_excursions`,
        method: 'GET',
      }),
    }),
    getDeck: builder.mutation<any, PricingPayload>({
      query: ({id, category_id, beds}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `itineraries/${id}/decks?category_id=${category_id}&beds=${beds}`,
        method: 'GET',
      }),
    }),
    getRoomLayout: builder.mutation<any, PricingPayload>({
      query: ({id, category_id, beds, deckno}) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `itineraries/${id}/deck_rooms_layout?category_id=${category_id}&deckno=${deckno}&beds=${beds}`,
        method: 'GET',
      }),
    }),
    getBookingByQuotations: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `quotations/booking`,
        method: "POST",
        body: data,
      }),
    }),
    updateShoreExcursion: builder.mutation<any, any>({
      query: ({id, data}) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/update_shore_excursions`,
        method: "POST",
        body: data,
      }),
    }),
    applyVisa: builder.mutation<any, any>({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${id}/visa_url`,
        method: "GET"
      }),
    }),

    getUpgradeCabin: builder.mutation<any, any>({
      query: ({ booking_id, data }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${booking_id}/upgrade_available_cabins?bkroom_id=${data.bkroom_id}`,
        method: "GET",
      }),
    }),

    getDecks: builder.mutation<any, any>({
      query: ({ itinerary_id, data }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries/${itinerary_id}/decks?beds=${data.beds}&category_id=${data.category_id}`,
        method: "GET",
      }),
    }),
    createUpgradeCabin: builder.mutation<any, any>({
      query: ({ booking_id, data }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `bookings/${booking_id}/upgrade_cabin`,
        method: "POST",
        body: data,
      }),
    }),

    getDeckRoomsLayout: builder.mutation<any, any>({
      query: ({ itinerary_id, data }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `itineraries/${itinerary_id}/deck_rooms_layout?beds=${data.beds}&category_id=${data.category_id}&deckno=${data.deckno}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetItineraryQuery,
  useGetAllItineraryQuery,
  useGetPricingMutation,
  useGetOffersMutation,
  useCreateBookingMutation,
  useCreatePaymentMutation,
  useGetBookingByIdQuery,
  useGetBookingByQuotationQuery,
  useGetCabinImageQuery,
  useGetHomePageOfferQuery,
  useGetBookingDetailMutation,
  useGetUpgradeMutation,
  useGetShoreExMutation,
  useGetDeckMutation,
  useGetRoomLayoutMutation,
  useGetBookingByQuotationsMutation,
  useUpdateShoreExcursionMutation,
  useApplyVisaMutation,
  useGetUpgradeCabinMutation,
  useGetDecksMutation,
  useGetDeckRoomsLayoutMutation,
  useCreateUpgradeCabinMutation
} = ItineraryApi;
