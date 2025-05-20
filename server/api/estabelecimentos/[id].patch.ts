import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await activeSubscription(event);
  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  await requireRole(event, ["admin"]);

  // 1. Check if establishment exists
  const result = await pool.query(
    `SELECT id, user_id FROM "establishment" WHERE id = $1 AND organization_id = $2`,
    [id, user.organization_id]
  );

  const establishment = result.rows[0];

  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  // 3. Update the name
  await pool.query(
    `UPDATE "establishment"
     SET name = $1, organization_id = $2, updated_at = now()
     WHERE id = $3`,
    [body.name, user.organization_id, id]
  );

  return setResponseStatus(event, 200);
});
