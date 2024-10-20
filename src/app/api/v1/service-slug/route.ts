import serviceSlugControllers from "@/server/controllers/serviceSlug";
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

    const response = await serviceSlugControllers.create(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Service Slug Create Successfully",
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

    const response = await serviceSlugControllers.getAll();

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Service slug Get Successfully",
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

    const response = await serviceSlugControllers.update(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "service slug Update Successfully",
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

    const response = await serviceSlugControllers.deleteOne(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Service slug Delete Successfully",
      data: response,
    });
  }
);
