import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const body = await readBody(event);

  await pool.query(
    `
    INSERT INTO "playlist" (name, created_at, updated_at)
    VALUES ($1, now(), now())
    `,
    [body.name]
  );

  return setResponseStatus(event, 201);
});
