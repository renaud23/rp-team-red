import { configureStore } from "@reduxjs/toolkit";
import { repriseSlice } from "./features/bulletins/repriseSlice";

export const store = configureStore({
  reducer: {
    reprise: repriseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
