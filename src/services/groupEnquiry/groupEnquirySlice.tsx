import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupEnquiryApi } from './groupEnquiry';
// import { string } from './../../utils/validations/formValidations';

export interface ProfileInterface {
  id:string;
}

const initialState: ProfileInterface = {
  id:'',
};

export const GroupEnquirySlice = createSlice({
  name: 'GroupEnquiry',
  initialState,
  reducers: {
    saveAgent: (state: ProfileInterface, action: PayloadAction<ProfileInterface>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { saveAgent } = GroupEnquirySlice.actions;

export default GroupEnquirySlice.reducer;
