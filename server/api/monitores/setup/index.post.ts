// server/api/unpaired-monitors/create.post.ts
import { v4 as uuidv4 } from "uuid";
import { pool } from "~/server/services/db";

export default defineEventHandler(async () => {
  const code = uuidv4();

  await pool.query(
    `
    INSERT INTO "unpaired_monitor" (code, paired)
    VALUES ($1, false)
    `,
    [code]
  );

  return { code };
});
