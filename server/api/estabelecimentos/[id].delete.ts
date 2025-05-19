import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  // 1. Fetch the establishment by ID
  const result = await pool.query(
    `SELECT id, user_id FROM "establishment" WHERE id = $1 AND organization_id = $2`,
    [id, user.organization_id]
  );

  const establishmentToBeDeleted = result.rows[0];

  if (!establishmentToBeDeleted) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  // 3. Delete the record
  await pool.query(
    `DELETE FROM "establishment" WHERE id = $1 AND organization_id = $2`,
    [id, user.organization_id]
  );

  return setResponseStatus(event, 200);
});
