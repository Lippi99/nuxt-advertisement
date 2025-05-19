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

  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const result = await pool.query(
    `
    UPDATE playlist
    SET name = $1,
        updated_at = now()
    WHERE id = $2 AND organization_id = $3
    RETURNING *
    `,
    [body.name, id, user.organization_id]
  );

  const playlist = result.rows[0];

  if (!playlist) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found or you don't have permission to update it",
    });
  }

  return setResponseStatus(event, 200);
});
