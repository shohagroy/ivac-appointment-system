"use client";

import { Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

import { Box } from "@mui/material";
import Card from "./components/Card";
import { applications, RequestPayload } from "../data";

const VisaDate = () => {
  const data = [
    {
      _token: "gDwtUYJzD8ilX9SDotVkWVCEheABwlC7vxJgAFum",
      apiKey: "gDwtUYJzD8ilX9SDotVkWVCEheABwlC7vxJgAFum",
      action: "sendOtp",
      info: [
        {
          web_id: "BGDDW1464B24",
          web_id_repeat: "BGDDW1464B24",
          passport: "",
          name: "MD ASHRAFUL ALAM",
          phone: "01760567555",
          email: "ashrafulalam15286@gmail.com",
          amount: 800.0,
          captcha: "",
          center: {
            id: 1,
            c_name: "Dhaka",
            prefix: "D",
            is_delete: 0,
            created_by: "",
            created_at: "",
            updated_at: "",
          },
          is_open: true,
          ivac: {
            id: 17,
            center_info_id: 1,
            ivac_name: "IVAC, Dhaka (JFP)",
            address: "Jamuna Future Park",
            prefix: "D",
            ceated_on: "2018-07-12 11:58:00",
            visa_fee: 800.0,
            is_delete: 0,
            created_at: "2018-07-12 00:00:00",
            updated_at: "",
            app_key: "IVACJFP",
            contact_number: "",
            created_by: "",
            charge: 3,
            new_visa_fee: 800.0,
            old_visa_fee: 800.0,
            new_fees_applied_from: "2018-08-05 00:00:00",
            notify_fees_from: "2018-07-29 04:54:32",
            max_notification_count: 2,
            allow_old_amount_until_new_date: 2,
            notification_text_beside_amount:
              "(From <from> this IVAC fees will be <new_amount> BDT)",
            notification_text_popup: "",
          },
          amountChangeData: {
            allow_old_amount_until_new_date: 2,
            max_notification_count: 0,
            old_visa_fees: 800.0,
            new_fees_applied_from: "2018-08-05 00:00:00",
            notice: false,
            notice_short: "",
            notice_popup: "",
            new_visa_fee: 800.0,
          },
          visa_type: {
            id: 13,
            type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
            order: 2,
            is_active: 1,
          },
          otp: "",
          confirm_tos: true,
        },
        {
          phone: "01760567555",
          email: "ashrafulalam15286@gmail.com",
          center: {
            id: 1,
            c_name: "Dhaka",
            prefix: "D",
            is_delete: 0,
            created_by: "",
            created_at: "",
            updated_at: "",
          },
          web_id: "BGDDW1465624",
          web_id_repeat: "BGDDW1465624",
          ivac: {
            id: 17,
            center_info_id: 1,
            ivac_name: "IVAC, Dhaka (JFP)",
            address: "Jamuna Future Park",
            prefix: "D",
            ceated_on: "2018-07-12 11:58:00",
            visa_fee: 800.0,
            is_delete: 0,
            created_at: "2018-07-12 00:00:00",
            updated_at: "",
            app_key: "IVACJFP",
            contact_number: "",
            created_by: "",
            charge: 3,
            new_visa_fee: 800.0,
            old_visa_fee: 800.0,
            new_fees_applied_from: "2018-08-05 00:00:00",
            notify_fees_from: "2018-07-29 04:54:32",
            max_notification_count: 2,
            allow_old_amount_until_new_date: 2,
            notification_text_beside_amount:
              "(From <from> this IVAC fees will be <new_amount> BDT)",
            notification_text_popup: "",
          },
          amount: 800.0,
          amountChangeData: {
            allow_old_amount_until_new_date: 2,
            max_notification_count: 0,
            old_visa_fees: 800.0,
            new_fees_applied_from: "2018-08-05 00:00:00",
            notice: false,
            notice_short: "",
            notice_popup: "",
            new_visa_fee: 800.0,
          },
          visa_type: {
            id: 13,
            type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
            order: 2,
            is_active: 1,
          },
          name: "ANJU HOSSAIN",
        },
      ],
      resend: 0,
    },
  ];

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
          {applications?.map((item: RequestPayload, i, number) => {
            return <Card key={i} data={item} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default VisaDate;
