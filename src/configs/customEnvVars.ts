import dotenv from "dotenv-safe";


dotenv.config();

export const environmentConfig = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default environmentConfig;
