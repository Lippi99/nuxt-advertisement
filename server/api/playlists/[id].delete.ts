// server/api/playlists/[id].delete.ts
import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  const result = await pool.query(
    `DELETE FROM "playlist" WHERE id = $1 RETURNING *`,
    [id]
  );

  const playlist = result.rows[0];

  if (!playlist) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found",
    });
  }

  return setResponseStatus(event, 200);
});
