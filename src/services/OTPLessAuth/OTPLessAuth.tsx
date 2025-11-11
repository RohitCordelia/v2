import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OTPLESS_API_URL } from '../../utils/config';

export const OTPLessAuthApi = createApi({
  reducerPath: 'OTPLessAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: OTPLESS_API_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    generateOtp: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/b2c/generate-otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/b2c/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `auth/b2c/refresh-token`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation
} = OTPLessAuthApi;
