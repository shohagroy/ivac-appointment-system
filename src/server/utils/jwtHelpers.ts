import envConfig from "@/configs/envConfig";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const createToken = (user: JwtPayload, expiresIn: string): string => {
  const { id, username, email, role } = user;

  const payload = { id, username, email, role };

  return jwt.sign(payload, envConfig.secrect_token_key as Secret, {
    expiresIn,
  });
};

const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, envConfig.secrect_token_key as Secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
