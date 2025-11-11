import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CMSApi } from './cms';
import { Buffer } from 'buffer';
const initialToken = localStorage.getItem('token');
const initialState = {
  token: initialToken,
};

export const CMSSlice = createSlice({
  name: 'CMSAuth',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = '';
      localStorage.setItem('token', '');
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        CMSApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
        }
      )
  },
});

export const { saveToken, logout } = CMSSlice.actions;

export default CMSSlice.reducer;
