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
      message: "Invalid monitor ID",
    });
  }

  const result = await pool.query(
    `
    DELETE FROM monitor m
    USING establishment e
    WHERE m.establishment_id = e.id
      AND m.id = $1
      AND e.organization_id = $2
    RETURNING m.*
    `,
    [id, user.organization_id]
  );

  const monitor = result.rows[0];

  if (!monitor) {
    throw createError({
      statusCode: 404,
      message: "Monitor not found or you don't have access",
    });
  }

  return setResponseStatus(event, 200);
});
