import { configureStore } from "@reduxjs/toolkit";
import { cloudStashApi } from "./features/api-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { authSlice } from "./features/auth-slice";

export const store = configureStore({
  reducer: {
    [cloudStashApi.reducerPath]: cloudStashApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cloudStashApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
