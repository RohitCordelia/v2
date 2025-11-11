import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/config';

export const BlogsApi = createApi({
  reducerPath: 'BlogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // const token = (getState() as RootState).Auth.token
      const token = window.localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getAllBlogs: builder.mutation<any, void>({
      query: () => ({
        headers: {
          'Content-type': 'application/json'
        },
        url: `blogs`,
        method: 'GET'
      })
    }),
    getBlogBySlug: builder.mutation<any, any>({
      query: ({ slug }) => ({
        headers: {
          'Content-type': 'application/json'
        },
        url: `blog/slug/${slug}`,
        method: 'GET'
      })
    }),
  })
});

export const { useGetAllBlogsMutation, useGetBlogBySlugMutation } = BlogsApi;
