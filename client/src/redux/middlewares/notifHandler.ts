import type { Action, Middleware } from "@reduxjs/toolkit";
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { addNotification, removeNotification } from "../features/notif-slice";
import { store } from "../store";
import { z } from "zod";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryLogger: Middleware = () => (next) => (action: Action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

  breakIf: if (isRejectedWithValue(action)) {
    const schema = z.object({
      data: z.object({
        message: z.string(),
      }),
      status: z.number(),
    });

    const rejectedWithValueAction = schema.safeParse(action.payload);

    if (!rejectedWithValueAction.success) break breakIf;

    const newNotification = {
      message: rejectedWithValueAction.data.data.message,
      status: rejectedWithValueAction.data.status,
    };

    store.dispatch(addNotification(newNotification));

    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 10000);
  } else if (isFulfilled(action)) {
    const schema = z.object({
      message: z.string(),
    });

    const isFulfilledAction = schema.safeParse(action.payload);
    if (!isFulfilledAction.success) break breakIf;

    const newNotification = {
      message: isFulfilledAction.data.message,
      status: 200,
    };

    store.dispatch(addNotification(newNotification));

    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 10000);
  }
  return next(action);
};
