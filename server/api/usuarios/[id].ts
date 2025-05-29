import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await requireRole(event, ["admin"]);

  const authUser = await getAuthUser(event);
  await activeSubscription(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const result = await pool.query(
    `SELECT * FROM "user" WHERE id = $1 AND organization_id = $2`,
    [id, authUser.organization_id]
  );

  const user = result.rows[0];

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage:
        "User doesn't exist or doesn't belong to your organization",
    });
  }

  return { user };
});
