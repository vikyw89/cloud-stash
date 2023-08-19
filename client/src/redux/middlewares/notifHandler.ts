import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, Action } from "@reduxjs/toolkit";

import { store } from "../store";
import { addNotification, removeNotification } from "../features/notif-slice";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryLogger: Middleware =
  () => (next) => (action: Action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      store.dispatch(
        addNotification({
          message: action.payload.data.message,
          status: action.payload.status,
        }),
        );
        setTimeout(() => {
          store.dispatch(removeNotification());
        }, 10000);
      }
    return next(action);
  };
