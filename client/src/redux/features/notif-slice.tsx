import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Notification } from "@/libs/types";

const initialState = [] as Array<Notification>;

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
      return state;
    },
    removeNotification: (state) => {
      state.shift();
      return state;
    },
  },
});

export const { addNotification, removeNotification } = notifSlice.actions;

export const selectNotif = (state: RootState) => state.notif;

export default notifSlice.reducer;
