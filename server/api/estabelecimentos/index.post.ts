import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await getAuthUser(event);

  await requireRole(event, ["admin"]);

  await pool.query(
    `
    INSERT INTO "establishment" (name, user_id, created_at, updated_at)
    VALUES ($1, $2, now(), now())
    `,
    [body.name, user.id]
  );

  return setResponseStatus(event, 201);
});
