const envConfig = {
  environment: process.env.ENVIRONMENT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
  backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  custom_api_key: process.env.NEXT_PUBLIC_CUSTOM_SECRET_KEY as string,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS as string,
  secrect_token_key: process.env.SECTECT_TOKEN_KEY as string,
};

export default envConfig;
