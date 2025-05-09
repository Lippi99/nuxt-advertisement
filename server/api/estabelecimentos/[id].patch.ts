import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  await requireRole(event, ["admin"]);

  // 1. Check if establishment exists
  const result = await pool.query(
    `SELECT id, user_id FROM "establishment" WHERE id = $1`,
    [id]
  );

  const establishment = result.rows[0];

  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  // 2. Check ownership
  if (establishment.user_id !== user.id) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to update this establishment",
    });
  }

  // 3. Update the name
  await pool.query(
    `UPDATE "establishment"
     SET name = $1, updated_at = now()
     WHERE id = $2`,
    [body.name, id]
  );

  return setResponseStatus(event, 200);
});
