/* eslint-disable @typescript-eslint/no-unused-vars */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState, store } from "../store";
import { setToken } from "./auth-slice";
import { Account, Notification } from "@/types";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { addNotification, removeNotification } from "./notif-slice";

const BASE_API =
  process.env.NEXT_PUBLIC_BASE_API ?? "https://cloud-stash.fly.dev/api";

// Define a service using a base URL and expected endpoints
export const cloudStashApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["account"],
  endpoints: (builder) => ({
    auth: builder.query<string, Pick<Account, "id" | "email" | "name">>({
      query: () => ({
        url: "/account/emailSignIn",
        method: "GET",
      }),
      providesTags: ["account"],
    }),
    emailSignIn: builder.mutation<void, Pick<Account, "email" | "password">>({
      query: ({ email, password }) => ({
        url: "/account/emailSignIn",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["account"],
    }),
    emailSignUp: builder.mutation<Notification, Omit<Account, "id">>({
      query: ({ name, email, password }) => {
        return {
          url: "/account/emailSignUp",
          method: "POST",
          body: {
            email,
            password,
            name,
          },
        };
      },
      invalidatesTags: ["account"],
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/account/signOut",
        method: "POST",
      }),
      invalidatesTags: ["account"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useEmailSignInMutation,
  useEmailSignUpMutation,
  useSignOutMutation,
} = cloudStashApi;
