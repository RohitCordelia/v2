import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OTPLessAuthApi } from '../OTPLessAuth/OTPLessAuth';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
};

export const OTPLessAuthSlice = createSlice({
  name: 'AuthNew',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
    },
  }
});

export const { setAuthToken, logout } = OTPLessAuthSlice.actions;

export default OTPLessAuthSlice.reducer;
