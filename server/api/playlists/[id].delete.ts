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
      message: "Invalid playlist ID",
    });
  }

  const result = await pool.query(
    `
    DELETE FROM playlist
    WHERE id = $1 AND organization_id = $2
    RETURNING *
    `,
    [id, user.organization_id]
  );

  const playlist = result.rows[0];

  if (!playlist) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found or you don't have permission to delete it",
    });
  }

  return setResponseStatus(event, 200);
});
