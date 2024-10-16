import { cookies } from "next/headers";
import errorHandler from "../ErrorHandelars";
import { User } from "@prisma/client";
import authControllers from "../controllers/auth";

export interface CustomRequest extends Request {
  user?: Partial<User>;
}

const catchAsync =
  (handler: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response) => {
    const tokenInfo = cookies().get("auth_token")?.value;
    const methode = req.method;
    const pathName = req?.url.split("/api")[1];

    try {
      if (pathName === "/v1/auth/login" && methode === "POST") {
        return await handler(req, res);
      } else {
        const userInfo = await authControllers?.getLoginUser(
          tokenInfo as string
        );

        if (userInfo?.id) {
          (req as CustomRequest).user = userInfo;
        } else {
          (req as CustomRequest).user = {};
        }
        return await handler(req, res);
      }
    } catch (error) {
      return errorHandler(error as Error);
    }
  };

export default catchAsync;
