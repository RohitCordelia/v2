import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeekendApi } from './weekend';

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

export const WeekendSlice = createSlice({
  name: 'Weekend',
  initialState,
  reducers: {
    saveItinerary: (state: ItineraryInterface, action: PayloadAction<ItineraryInterface>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { saveItinerary } = WeekendSlice.actions;

export default WeekendSlice.reducer;
