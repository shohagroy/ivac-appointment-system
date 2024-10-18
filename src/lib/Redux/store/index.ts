"use client";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import { baseApiSlice } from "../features/baseApi/baseApiSlice";
import envConfig from "@/configs/envConfig";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    snackbar: snackbarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApiSlice.middleware)
      .concat(baseApiSlice.middleware),

  devTools: envConfig.environment !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
