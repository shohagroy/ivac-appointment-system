import authControllers from "@/server/controllers/auth";
import catchAsync from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await authControllers.login(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfully",
      data: response,
    });
  }
);
