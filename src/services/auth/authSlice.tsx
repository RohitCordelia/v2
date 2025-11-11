import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '/src/services/auth/auth';

export interface AuthState {
  token: string;
}

const initialState: AuthState = { token: '' };

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        AuthApi.endpoints.verifyOTP.matchFulfilled,
        (state: AuthState, action: PayloadAction<any>) => {
          return { ...state, ...action.payload };
        }
      )
  },
});

export const { saveToken, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
