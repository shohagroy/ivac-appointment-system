import authControllers from "@/server/controllers/auth";
import catchAsync from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await authControllers.create(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: response,
    });
  }
);

// export const POST = async (req: Request) => {
//   const body = await req.json();
//   console.log(body, "bodydata");

//   return new Response(
//     JSON.stringify({
//       message: "hello world",
//     }),
//     {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };