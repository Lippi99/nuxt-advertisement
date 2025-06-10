// server/utils/db.ts
import { Pool } from "pg";

const config = useRuntimeConfig();

export const pool = new Pool({
  host: config.dbHost,
  port: Number(config.dbPort),
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});
