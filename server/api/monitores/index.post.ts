import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const body = await readBody(event);

  const establishmentId = parseInt(body.establishmentId);
  const playlistId = parseInt(body.playlistId);

  await pool.query(
    `
    INSERT INTO "monitor" (name, establishment_id, playlist_id, created_at, updated_at)
    VALUES ($1, $2, $3, now(), now())
    `,
    [body.name, establishmentId, playlistId]
  );

  return setResponseStatus(event, 201);
});
