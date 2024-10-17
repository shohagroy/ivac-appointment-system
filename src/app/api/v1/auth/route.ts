import {
  getOtpSuccessResponse,
  getTimesSlotsSuccessResponse,
  getVerifyErrorResponse,
  getVerifySuccessResponse,
} from "@/app/constens/queueManage";
import axios from "axios";
import authControllers from "../../../../server/controllers/auth";

export const POST = async (req: Request) => {
  const body = await req.json();

  const response = await authControllers.create(body);


  console.log(response)
  return new Response(
    JSON.stringify({
      message: "hello world",
      data: response,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
