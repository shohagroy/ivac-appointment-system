import { Box, Typography } from "@mui/material";
import React from "react";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Typography variant="h4">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
