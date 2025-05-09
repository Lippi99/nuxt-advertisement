// server/utils/db.ts
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST as string,
  port: +(process.env.DB_PORT as string),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});
