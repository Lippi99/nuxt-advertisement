import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const result = await pool.query(`SELECT * FROM "playlist" WHERE id = $1`, [
    id,
  ]);

  const playlist = result.rows[0];

  if (!playlist) {
    throw createError({
      statusCode: 404,
      statusMessage: "Playlist doesn't exist",
    });
  }

  return { playlist };
});
