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
      message: "Invalid advertisement ID",
    });
  }

  const result = await pool.query(
    `
    DELETE FROM advertisement a
    USING playlist p
    WHERE a.playlist_id = p.id
      AND a.id = $1
      AND p.organization_id = $2
    RETURNING a.*
    `,
    [id, user.organization_id]
  );

  const advertisement = result.rows[0];

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      message:
        "Advertisement not found or you don't have permission to delete it",
    });
  }

  return setResponseStatus(event, 200);
});
