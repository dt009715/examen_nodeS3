import dotenv from "dotenv";
import { IEnvConfig } from "../types/env";

dotenv.config();

export const env: IEnvConfig = {
  PORT: parseInt(process.env.PORT || "8000"),
  JWT_SECRET: process.env.JWT_SECRET || "04082001",
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:04082001@localhost:5432/test",
};
