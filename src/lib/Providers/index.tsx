"use client";

import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
