export interface IOtpResponse {
  status: "string" | "SUCCESS" | "FAILED" | "OK";
  code: number;
  slot_dates?: { hour: string }[];
  slot_times?: string[];
  data: {
    status: boolean;
    slot_times?: string[];
    slot_dates?: string[];
    error_reason: string;
    webfile_error_data?: [];
  };
  message: string[];
}

export const getOtpSuccessResponse: IOtpResponse = {
  status: "SUCCESS",
  code: 200,
  data: {
    status: true,
    error_reason: "Sms send successfully",
    webfile_error_data: [],
  },
  message: ["Sms send successfully"],
};

export const getOtpErrorResponse: IOtpResponse = {
  status: "FAILED",
  code: 422,
  data: {
    status: false,
    error_reason: "Slot is not available",
    webfile_error_data: [],
  },
  message: ["Slot is not available"],
};

const currentDate = new Date();
const dateAfter5Days = new Date(currentDate.setDate(currentDate.getDate() + 10))
  .toISOString()
  .split("T")[0];

export const getVerifySuccessResponse: IOtpResponse = {
  status: "SUCCESS",
  code: 200,
  data: {
    slot_times: [],
    slot_dates: [dateAfter5Days], //"2024-10-16"
    status: true,
    error_reason: "",
  },
  message: [""],
};

export const getVerifyErrorResponse: IOtpResponse = {
  status: "FAILED",
  code: 422,
  data: {
    status: false,
    error_reason: "OTP not found with this mobile number",
  },
  message: ["OTP not found with this mobile number"],
};

export const getTimesSlotsSuccessResponse = {
  status: "OK",
  data: [""],
  slot_dates: ["2024-10-17"],
  slot_times: [
    {
      id: 142049,
      ivac_id: 17,
      visa_type: 13,
      hour: 10,
      date: "2024-10-17",
      availableSlot: 1,
      time_display: "10:00 - 10:59",
    },
  ],
};
