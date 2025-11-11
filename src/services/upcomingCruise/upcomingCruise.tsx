
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../src/utils/config";
import { GetAuth } from "../../../src/utils/store/store";

type ItineraryResponse = {
  events: ItineraryResponse | undefined;
  itineraries: any[],
  pagination: any,
  ports: ItineraryResponse | undefined;
  ships: any[],
}

export const UpcomingCruiseApi = createApi({
  reducerPath: "UpcomingCruiseApi",
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
    getItineraryList: builder.mutation<any, string>({
      query: (route_id) => ({
        headers: {
          "Content-type": "application/json",
        },
        // url: `itineraries?pagination=false`,
        url: `itineraries${route_id}`,
        method: "GET",
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

  }),
});

export const {
  useGetItineraryListMutation,
  useGetViewItineraryMutation,
  useAvailableCabinMutation,
  useCabinPricingMutation
} = UpcomingCruiseApi;
