// import clientsControllers from "@/server/controllers/clients";
import applicationControllers from "@/server/controllers/files";
import ApiError from "@/server/ErrorHandelars/ApiError";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import { Role } from "@prisma/client";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const user = req.user;

    if (!user?.username && user?.role !== Role.super_admin) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await applicationControllers.create(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Files Create Successfully",
      data: response,
    });
  }
);

export const GET = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    if (!user?.username && user?.role !== Role.super_admin) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await applicationControllers.getAll();

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Applications files Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    const data = await req.json();

    if (!user?.username && user?.role !== Role.super_admin) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await applicationControllers.update(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Application file Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    const data = await req.json();

    if (!user?.username && user?.role !== Role.super_admin) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await applicationControllers.deleteOne(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Application file Delete Successfully",
      data: response,
    });
  }
);
