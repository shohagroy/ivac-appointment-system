import envConfig from "@/configs/envConfig";
import bcrypt from "bcrypt";

const createhas = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envConfig.bycrypt_salt_rounds) || 10
  );
  return hashedPassword;
};

const comparePassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const hashedPassword = {
  createhas,
  comparePassword,
};
