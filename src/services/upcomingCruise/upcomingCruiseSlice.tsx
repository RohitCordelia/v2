import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ItineraryInterface {
  id: string;
  roomIndex: any;
  guestIndex: any;
  email: string;
  coupon_code: string;
  booking_id: string;
}

const initialState: ItineraryInterface = {
  id: '',
  roomIndex: 0,
  guestIndex: 0,
  email: '',
  coupon_code: '',
  booking_id: '',
};

export const UpcomingCruiseSlice = createSlice({
  name: 'UpcomingCruise',
  initialState,
  reducers: {
    saveItinerary: (state: ItineraryInterface, action: PayloadAction<ItineraryInterface>) => {
      return { ...state, ...action.payload };
    },
    setGuestIndex: (state, action: PayloadAction<any>) => {
      state.roomIndex = action.payload.roomIndex;
      state.guestIndex = action.payload.guestIndex;
    },
  }
});

export const { saveItinerary, setGuestIndex } = UpcomingCruiseSlice.actions;

export default UpcomingCruiseSlice.reducer;
