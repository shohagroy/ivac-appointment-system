import ApiError from "@/server/ErrorHandelars/ApiError";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const GET = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    if (!user?.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Get Successfully",
      data: user,
    });
  }
);
