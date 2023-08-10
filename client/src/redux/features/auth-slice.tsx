import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    emailAddress: "",
    uuid: "",
    accessToken: "",
  },
};

export type initialState = typeof initialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => {
      return initialState;
    },
    signIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          emailAddress: action.payload,
          uuid: "sddsddad",
          accessToken: "dsadsadfec",
        },
      };
    },
  },
});

export const { signIn, signOut } = auth.actions;
export default auth.reducer;
