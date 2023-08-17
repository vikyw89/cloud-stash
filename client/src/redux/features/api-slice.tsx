/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { useAppDispatch } from "@/app/hooks";
import { setToken } from "./auth-slice";

const BASE_API =
  process.env.NEXT_PUBLIC_BASE_API ?? "https://cloud-stash.fly.dev/api";

export type Account = {
  email: string;
  id: string;
  password: string;
  name: string;
};

// Define a service using a base URL and expected endpoints
export const cloudStashApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["account"],
  endpoints: (builder) => ({
    auth: builder.query<void, Pick<Account, "id" | "email" | "name">>({
      query: () => ({
        url: "/account/emailSignIn",
        method: "GET",
      }),
      providesTags: ["account"],
      transformResponse(baseQueryReturnValue, meta, arg) {
        const token = baseQueryReturnValue?.data;
        console.log(
          "🚀 ~ file: api-slice.tsx:44 ~ transformResponse ~ baseQueryReturnValue:",
          baseQueryReturnValue,
        );
        setToken(token);
        return baseQueryReturnValue;
      },
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
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue;
      },
    }),
    emailSignUp: builder.mutation<void, Omit<Account, "id">>({
      query: ({ name, email, password }) => ({
        url: "/account/emailSignUp",
        method: "POST",
        body: {
          email,
          password,
          name,
        },
      }),
      invalidatesTags: ["account"],
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue;
      },
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
