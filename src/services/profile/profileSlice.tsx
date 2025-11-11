import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileApi } from './profile';
// import { string } from './../../utils/validations/formValidations';

export interface ProfileInterface {
  id:string;
}

const initialState: ProfileInterface = {
  id:'',
};

export const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    saveProfile: (state: ProfileInterface, action: PayloadAction<ProfileInterface>) => {
      return { ...state, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ProfileApi.endpoints.getMyBookings.matchFulfilled,
        (state: ProfileInterface, action: PayloadAction<ProfileInterface>) => {
          return { ...state, ...action.payload };
        }
      )
  },
});

export const { saveProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
