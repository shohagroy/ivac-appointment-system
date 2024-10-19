"use client";

import { Button, Grid, Typography } from "@mui/material";
import React from "react";

import { Box } from "@mui/material";
import Card from "./components/Card";
import { RequestPayload } from "../data";

import data from "@/db/db.json";

const VisaDate = () => {
  const applications = data as unknown as RequestPayload[];

  return (
    <Box
      sx={{
        paddingX: "5%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid #ccc",
          paddingY: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Appointment date{" "}
        </Typography>
      </Box>

      <Box paddingY="16px">
        <Grid container spacing={2}>
          {applications?.map((item: RequestPayload, i) => {
            return <Card key={i} data={item} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default VisaDate;
