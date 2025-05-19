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

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const result = await pool.query(
    `
    SELECT m.*
    FROM monitor m
    JOIN establishment e ON m.establishment_id = e.id
    WHERE m.id = $1
      AND e.organization_id = $2
    `,
    [id, user.organization_id]
  );

  const monitor = result.rows[0];

  if (!monitor) {
    throw createError({
      statusCode: 404,
      statusMessage: "Monitor doesn't exist or you don't have access",
    });
  }

  return { monitor };
});
