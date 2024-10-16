import { RequestPayload } from "@/app/data";
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { payInvoice } from "../utils";
import { ISlot } from "@/utils/solts";

interface IProps {
  data: RequestPayload;
  setRecall: React.Dispatch<React.SetStateAction<number>>;
  recall: number;
  errorMessages: string[];
  selectedSlotDate: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentResponse: React.Dispatch<React.SetStateAction<any>>;
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>;
  responseData: any;
}

const DirectActions: React.FC<IProps> = ({
  data,
  setRecall,
  recall,
  errorMessages,
  selectedSlotDate,
  setIsLoading,
  setPaymentResponse,
  setErrorMessages,
  responseData,
}) => {
  const [otp, setOtp] = useState("");
  const [timeSlot, setTimeSlot] = useState<ISlot | null>(null);
  const handleGetTimeSlots = async () => {
    console.log(data);
  };

  const handleDirectPayment = async () => {
    data.action = "payInvoice";

    data?.info?.forEach((item) => {
      item.appointment_date = selectedSlotDate;
      item.otp = otp;
    });
    data.selected_payment = {
      name: "Bkash",
      slug: "bkash",
      grand_total: data?.info?.length * 824,
      link: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw1/bkash.png",
    };
    data.otp = otp;
    data.selected_slot = timeSlot as ISlot;
    delete data.resend;
    await payInvoice(
      setIsLoading,
      setPaymentResponse,
      setErrorMessages,
      data,
      recall
    );
    console.log(data);
  };
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"end"}
        gap={2}
        alignItems={"center"}
      >
        <TextField
          size="small"
          sx={{ width: "100px" }}
          value={otp}
          variant="outlined"
          label="OTP"
          type="number"
          onChange={(e) => setOtp(e.target.value)}
        />
        {/* <Button
          onClick={handleGetTimeSlots}
          size="small"
          variant="contained"
          sx={{
            textTransform: "none",
            lineHeight: "14px",
            fontFamily: "inherit",
          }}
        >
          Get times slots
        </Button> */}

        <Button
          onClick={handleDirectPayment}
          size="small"
          variant="contained"
          sx={{
            textTransform: "none",
            lineHeight: "14px",
            fontFamily: "inherit",
          }}
        >
          Direct Payments
        </Button>
        <TextField
          onChange={(e) => setRecall(Number(e.target.value))}
          value={recall}
          size="small"
          variant="outlined"
          label="Recall"
          sx={{
            width: "100px",
            bgcolor: "white",
            borderRadius: "5px",
          }}
          type="number"
        />
      </Box>

      <Box marginY="10px">
        <TextareaAutosize
          minRows={6}
          value={JSON.stringify(timeSlot, null, 2)}
          onChange={(e) => setTimeSlot(JSON.parse(e.target.value))}
          style={{
            width: "100%",
            boxSizing: "border-box",
            resize: "none",
            overflow: "auto",
            // padding: "10px",
          }}
        />

        <Box>
          <code>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </code>
        </Box>
      </Box>

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
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
    </Box>
  );
};

export default DirectActions;
