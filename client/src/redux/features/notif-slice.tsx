import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type Notification = {
  message: string;
  status: number;
};

const initialState = [] as Array<Notification>;

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state = [...state, action.payload];
    },
  },
});

export const { addNotification } = notifSlice.actions;

export const selectNotif = (state: RootState) => state.notif;

export default notifSlice.reducer;
