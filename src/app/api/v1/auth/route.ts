import {
  getOtpSuccessResponse,
  getTimesSlotsSuccessResponse,
  getVerifyErrorResponse,
  getVerifySuccessResponse,
} from "@/app/constens/queueManage";
import axios from "axios";
import authControllers from "../../../../server/controllers/auth";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await authControllers.create(body);

    return new Response(
      JSON.stringify({
        status: 200,
        success: true,
        message: "user created successfully",
        data: response,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
