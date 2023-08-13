// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Account = {
  email: string;
  uuid: string;
  value: object;
};

// Define a service using a base URL and expected endpoints
export const cloudStashApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cloud-stash.fly.dev/api",
    headers: {
      Authorization: "",
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.query<Account, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/signIn",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    signUp: builder.mutation<Account, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/user",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    signOut: builder.mutation<object, void>({
      query: () => ({
        url: "/user",
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useSignInQuery } = cloudStashApi;
