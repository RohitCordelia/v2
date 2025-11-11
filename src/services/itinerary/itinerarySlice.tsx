import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItineraryApi } from '/src/services/itinerary/itinerary';

export interface ItineraryInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  coupon_code: string;
  booking_id: string;
}

const initialState: ItineraryInterface = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  coupon_code: '',
  booking_id: '',
};

export const ItinerarySlice = createSlice({
  name: 'Itinerary',
  initialState,
  reducers: {
    saveItinerary: (state: ItineraryInterface, action: PayloadAction<ItineraryInterface>) => {
      return { ...state, ...action.payload };
    },
    setCouponCodeProp: (state, action) => {
      state.coupon_code = action.payload.coupon_code;
      state.booking_id = action.payload.booking_id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ItineraryApi.endpoints.getItinerary.matchFulfilled,
        (state: ItineraryInterface, action: PayloadAction<ItineraryInterface>) => {
          return { ...state, ...action.payload };
        }
      )
  },
});

export const { saveItinerary, setCouponCodeProp } = ItinerarySlice.actions;

export default ItinerarySlice.reducer;
