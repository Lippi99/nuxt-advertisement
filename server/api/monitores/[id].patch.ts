import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);
  const body = await readBody(event);
  const playlistId = parseInt(body.playlistId);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  await pool.query(
    `
    UPDATE "monitor"
    SET name = $1,
        establishment_id = $2,
        playlist_id = $3,
        updated_at = now()
    WHERE id = $4
    `,
    [body.name, body.establishmentId, playlistId, id]
  );

  return setResponseStatus(event, 200);
});
