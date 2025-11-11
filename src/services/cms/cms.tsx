import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CMS_API_URL } from "../../utils/config";

export const CMSApi = createApi({
  reducerPath: 'CMSApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CMS_API_URL,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().CMSAuth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['CMS'],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `login`,
        method: "POST",
        body: data,
      }),
    }),
    homepageBannerUpdate: builder.mutation<any, any>({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `homepages/update_banners`,
        method: "POST",
        body: data,
      }),
    }),
    uploadBanner: builder.mutation<any, any>({
      query: (data) => ({
        url: `uploads/upload_file`,
        method: "POST",
        body: data,
      }),
    }),
    getBanner: builder.mutation<any, void>({
      query: () => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `homepages/banners`,
        method: "GET",
      }),
    }),
    getCoupon: builder.mutation<any, void>({
      query: () => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `coupons`,
        method: "GET",
      }),
    }),
    createCoupon: builder.mutation<any, any>({
      query: (data) => ({
        url: `coupons/coupons_v2`,
        method: "POST",
        body: data,
      }),
    }),
    updateCoupon: builder.mutation<any, any>({
      query: ({id, coupon}) => ({
        url: `coupons/${id}`,
        method: "PATCH",
        body: coupon,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useHomepageBannerUpdateMutation,
  useUploadBannerMutation,
  useGetBannerMutation,
  useGetCouponMutation,
  useCreateCouponMutation,
  useUpdateCouponMutation
} = CMSApi;
