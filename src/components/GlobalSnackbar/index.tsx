"use client";

import { closeSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/store";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

// interface IProps {}
const GlobalSnackbar: React.FC = () => {
  const { isOpen, type, message } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => dispatch(closeSnackbar())}
    >
      <Alert
        onClose={() => dispatch(closeSnackbar())}
        severity={type as AlertColor}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
