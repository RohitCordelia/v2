import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "/src/utils/config";
// import { UserInterface } from "/src/services/user/userSlice";
// import { RootState } from "/src/stores/AppStore";

// interface UpdateUser {
//   id: string;
//   data: Partial<UserInterface>;
// }

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // const token = (getState() as RootState).Auth.token
      const token = window.localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `user/`,
        method: "GET",
      }),
    }),
    patchUser: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `user/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePatchUserMutation,
} = UserApi;
