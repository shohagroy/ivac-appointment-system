"use client";

import { RequestPayload } from "@/app/data";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getOtp, getTimesSlots, payInvoice, verifyOtp } from "../utils";
import { TaskAlt } from "@mui/icons-material";
import { IOtpResponse } from "@/app/constens/queueManage";
import Actions from "./Actions";

const Card = ({ data }: { data: RequestPayload }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [otpResponse, setOtpResponse] = React.useState(null);

  const [recall, setRecall] = React.useState(10);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const [otp, setOtp] = useState<string>("");
  const [verifyResponse, setVerifyResponse] = useState<IOtpResponse | null>(
    null
  );

  const [timesSlotsResponse, setTimesSlotsResponse] =
    useState<IOtpResponse | null>(null);

  console.log(timesSlotsResponse);

  const selectedSlotDate =
    verifyResponse &&
    verifyResponse.data &&
    verifyResponse.data.slot_dates &&
    verifyResponse.data.slot_dates.length > 0
      ? (verifyResponse.data.slot_dates[0] as string)
      : undefined;

  const selectedSlotTime = undefined;

  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentOption, setPaymentOption] = useState<string>("1");

  const paymentOptions = {
    "1": {
      name: "Bkash",
      slug: "bkash",
      grand_total: 10.2912621,
      link: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw1/bkash.png",
    },
    "7": {
      name: "Nagad",
      slug: "nagad",
      grand_total: 10.2912621,
      link: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw1/nagad.png",
    },
    "0": {
      name: "DBBL MOBILE BANKING",
      slug: "dbblmobilebanking",
      grand_total: 10.2912621,
      link: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw1/dbblmobilebank.png",
    },
  };

  const handleGetOtp = async () => {
    await getOtp(setIsLoading, setOtpResponse, setErrorMessages, data, recall);
  };

  const handleOtpVerify = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    data.action = "verifyOtp";
    data.otp = otp;

    data?.info?.forEach((item) => {
      item.otp = otp;
    });
    delete data.resend;

    await verifyOtp(
      setIsLoading,
      setVerifyResponse,
      setErrorMessages,
      data,
      recall
    );
  };

  const appointmentDate = () => {
    const targetDate = new Date(selectedSlotDate as string);
    const today = new Date();

    const daysLeft = Math.ceil(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    const formattedDate = targetDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const dayText = daysLeft === 1 ? "day" : "days";
    return `${formattedDate} (${daysLeft} ${dayText} left)`;
  };

  const handleGetTimeSlots = async () => {
    data.action = "generateSlotTime";
    data.specific_date = selectedSlotDate ?? "";
    delete data.resend;
    await getTimesSlots(
      setIsLoading,
      setTimesSlotsResponse,
      setErrorMessages,
      data,
      recall
    );
  };

  const handlePayment = async () => {
    data.action = "payInvoice";

    data?.info?.forEach((item) => {
      item.appointment_time = "10.15 AM";
      item.appointment_date = selectedSlotDate;
      item.otp = otp;
    });
    data.selected_payment = {
      ...paymentOptions[paymentOption as keyof typeof paymentOptions],
      grand_total: data?.info?.length * 824,
    };
    data.otp = otp;
    delete data.resend;

    await payInvoice(
      setIsLoading,
      setPaymentResponse,
      setErrorMessages,
      data,
      recall
    );
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ padding: "16px" }}>
        <Box sx={{ padding: "1rem", bgcolor: "#f5f5f5" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Mission info:
          </Typography>

          <Typography>
            Mission:{" "}
            <span style={{ fontWeight: "700" }}>
              {data?.info[0]?.center?.c_name}
            </span>
          </Typography>

          <Typography>
            IVAC CENTER:{" "}
            <span style={{ fontWeight: "700" }}>
              {data?.info[0]?.ivac?.ivac_name}
            </span>
          </Typography>

          <Typography>
            VISA TYPE:{" "}
            <span style={{ fontWeight: "700" }}>
              {data?.info[0]?.visa_type?.type_name}
            </span>
          </Typography>
        </Box>

        <Box sx={{ marginY: "10px", padding: "1rem", bgcolor: "#f5f5f5" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Applicatoin info:
          </Typography>

          <Grid container spacing={2}>
            {data?.info?.map((item: any, i: number) => (
              <Grid item xs={6} key={i}>
                <Box
                  sx={{
                    bgcolor: "white",
                    padding: "10px",
                    marginY: "10px",
                    borderRadius: "5px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <Typography>
                    FILE NUMBER:{" "}
                    <span style={{ fontWeight: "700" }}>{item?.web_id}</span>
                  </Typography>

                  <Typography>
                    Name:{" "}
                    <span style={{ fontWeight: "700" }}>{item?.name}</span>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography>
            E-mail:{" "}
            <span style={{ fontWeight: "700" }}> {data?.info[0]?.email}</span>
          </Typography>

          <Typography>
            Phone:{" "}
            <span style={{ fontWeight: "700" }}>{data?.info[0]?.phone}</span>
          </Typography>
        </Box>

        <Box sx={{ padding: "1rem", bgcolor: "#f5f5f5", width: "100%" }}>
          <Actions data={data} />
          {/* <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Actions:
              </Typography>

              <Typography>
                Payment: <span style={{ fontWeight: "700" }}>Bkash</span>
              </Typography>

              <Box
                sx={{
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {!verifyResponse ? (
                  otpResponse ? (
                    <Box>
                      <Box width="100%">
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "400",
                            marginY: "5px",
                            lineHeight: "1.4",
                            color: "green",
                          }}
                        >
                          OTP sent successfully, please check your inbox. and
                          verify first.
                        </Typography>
                      </Box>

                      <Box
                        component={"form"}
                        onSubmit={handleOtpVerify}
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <TextField
                          onChange={(e) => setOtp(e.target.value)}
                          value={otp}
                          required
                          size="small"
                          sx={{ width: "50%" }}
                          placeholder="Enter OTP"
                        />

                        <Button
                          color="error"
                          type="submit"
                          variant="contained"
                          sx={{
                            textTransform: "capitalize",
                            marginLeft: "5px",
                            fontFamily: "inherit",
                          }}
                        >
                          {isLoading ? "Loading..." : "Verify Now"}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ width: "100%" }}>
                      <Button
                        variant="contained"
                        sx={{
                          marginY: "10px",
                          textTransform: "capitalize",
                          fontFamily: "inherit",
                        }}
                        onClick={handleGetOtp}
                      >
                        {isLoading ? "Loading..." : "Generate OTP"}
                      </Button>
                    </Box>
                  )
                ) : null}

                {selectedSlotDate && (
                  <Box paddingY="10px">
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: "400",
                        marginY: "5px",
                        lineHeight: "1.4",
                        color: "green",
                      }}
                    >
                      OTP verify successfully, get appointment time first.
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "red",
                      }}
                    >
                      {appointmentDate()}
                    </Typography>

                    {timesSlotsResponse ? (
                      <Box>
                        <code>
                          <pre>
                            {JSON.stringify(timesSlotsResponse, null, 2)}
                          </pre>
                        </code>
                      </Box>
                    ) : (
                      // <Typography
                      //   sx={{
                      //     fontSize: "1rem",
                      //     fontWeight: "600",
                      //     color: "red",
                      //     marginY: "5px",
                      //   }}
                      // >
                      //   Appointment Time: 10:15 PM
                      // </Typography>
                      <Button
                        onClick={handleGetTimeSlots}
                        variant="contained"
                        color="error"
                        sx={{
                          textTransform: "capitalize",
                          marginY: "10px",
                          fontFamily: "inherit",
                        }}
                      >
                        {isLoading ? "Loading..." : "Get Time Slots"}
                      </Button>
                    )}
                  </Box>
                )}

                {timesSlotsResponse && (
                  <Box sx={{ width: "100%", marginY: "10px" }}>
                    <Grid container spacing={1}>
                      {Object.keys(paymentOptions)?.map(
                        (key: string, i: number) => (
                          <Grid item xs={4} key={i}>
                            <Box
                              onClick={() => setPaymentOption(key)}
                              sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: "white",
                                borderRadius: "5px",
                                boxShadow:
                                  key === paymentOption
                                    ? "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    : "",
                                cursor: "pointer",
                                position: "relative",
                                transition: "all .3s ease",
                              }}
                            >
                              <img
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "contain",
                                }}
                                src={
                                  paymentOptions[
                                    key as keyof typeof paymentOptions
                                  ]?.link
                                }
                                alt="bkash"
                                width="100%"
                              />

                              {key === paymentOption && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "0px",
                                    right: "-60px",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 10,
                                  }}
                                >
                                  <TaskAlt style={{ color: "green" }} />
                                </Box>
                              )}
                            </Box>
                          </Grid>
                        )
                      )}
                    </Grid>
                    <Button
                      variant="contained"
                      onClick={handlePayment}
                      sx={{
                        marginTop: "30px",
                        textTransform: "capitalize",
                        fontFamily: "inherit",
                      }}
                    >
                      {isLoading ? (
                        "Loading..."
                      ) : (
                        <>Pay {data?.info?.length * 824} BDT</>
                      )}
                    </Button>

                    {paymentResponse && (
                      <Box marginY="10px">
                        <Typography>
                          {JSON.stringify(paymentResponse)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <TextField
                  onChange={(e) => setRecall(Number(e.target.value))}
                  value={recall}
                  size="small"
                  variant="outlined"
                  label="Recall"
                  sx={{
                    width: "60px",
                    bgcolor: "white",
                    marginX: "10px",
                    borderRadius: "5px",
                  }}
                  type="number"
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                {errorMessages?.length
                  ? errorMessages.map((message, i) => {
                      return (
                        <Typography
                          key={i}
                          sx={{
                            fontSize: "10px",
                            fontWeight: "500",
                            color: "red",
                          }}
                        >
                          {`${i + 1}.`} {message}{" "}
                          <span style={{ fontWeight: "700" }}>Retrying...</span>
                        </Typography>
                      );
                    })
                  : ""}

                {errorMessages?.length === recall ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    {`All attempts failed. Please try again.`}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          </Grid> */}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Card;
