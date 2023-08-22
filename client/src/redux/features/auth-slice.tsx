import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import jwtDecode from "jwt-decode";
import { z } from "zod";

const initialState = {
  token: "",
  isSignedIn: false,
  tokenPayload: {
    email: null,
    id: null,
    name: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      // decode token
      const tokenPayload = jwtDecode(state.token);

      const tokenPayloadSchema = z.object({
        email: z.string().email(),
        id: z.string(),
        name: z.string(),
      });

      const isValidToken = tokenPayloadSchema.safeParse(tokenPayload).success;

      if (isValidToken) {
        // update isSignedIn
        state.isSignedIn = true;
        // store decoded token val
        state.tokenPayload = tokenPayload as typeof initialState.tokenPayload;
      } else {
        state.isSignedIn = false;
      }

      return state;
    },
  },
});

export const { setToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
