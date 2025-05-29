import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const authUser = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: "Id must be an integer",
    });
  }

  const result = await pool.query(
    `DELETE FROM "user"
     WHERE id = $1 AND organization_id = $2
     RETURNING *`,
    [id, authUser.organization_id]
  );

  const user = result.rows[0];

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found or doesn't belong to your organization",
    });
  }

  return setResponseStatus(event, 200);
});
