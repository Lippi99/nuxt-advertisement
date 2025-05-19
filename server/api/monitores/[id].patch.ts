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
  const body = await readBody(event);
  const playlistId = parseInt(body.playlistId) || null;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const result = await pool.query(
    `
    UPDATE monitor m
    SET name = $1,
        establishment_id = $2,
        playlist_id = $3,
        updated_at = now()
    FROM establishment e
    WHERE m.establishment_id = e.id
      AND m.id = $4
      AND e.organization_id = $5
    RETURNING m.*
    `,
    [body.name, body.establishmentId, playlistId, id, user.organization_id]
  );

  const updatedMonitor = result.rows[0];

  if (!updatedMonitor) {
    throw createError({
      statusCode: 404,
      message: "Monitor not found or you don't have access",
    });
  }

  return setResponseStatus(event, 200);
});
