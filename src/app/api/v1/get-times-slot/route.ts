import {
  getOtpSuccessResponse,
  getTimesSlotsSuccessResponse,
  getVerifyErrorResponse,
  getVerifySuccessResponse,
} from "@/app/constens/queueManage";
import axios from "axios";

export const POST = async (req: Request) => {
  const body = await req.json();

  // return new Response(JSON.stringify(getTimesSlotsSuccessResponse), {
  //   status: 500,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // return new Response(JSON.stringify(getVerifyErrorResponse), {
  //   status: 500,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  try {
    const response = await axios.post(
      "https://payment.ivacbd.com/api/get_payment_options_v2",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    const errorData = {
      status: "FAILED",
      code: 500,
      data: {
        status: false,
        error_reason: error?.response?.data || "An unknown error occurred.",
        webfile_error_data: [],
      },
      message: ["An unknown error occurred."],
    };
    return new Response(JSON.stringify(errorData), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
