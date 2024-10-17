import {
  getOtpSuccessResponse,
  getTimesSlotsSuccessResponse,
  getVerifyErrorResponse,
  getVerifySuccessResponse,
} from "@/app/constens/queueManage";
import axios from "axios";

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body, "bodydata");

  return new Response(
    JSON.stringify({
      message: "hello world",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
