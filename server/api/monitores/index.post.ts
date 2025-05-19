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

  const establishmentId = parseInt(body.establishmentId);
  const playlistId = parseInt(body.playlistId) || null;

  if (!body.name || !Number.isInteger(establishmentId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid monitor data",
    });
  }

  const check = await pool.query(
    `
    SELECT 1 FROM establishment
    WHERE id = $1 AND organization_id = $2
    `,
    [establishmentId, user.organization_id]
  );

  if (check.rowCount === 0) {
    throw createError({
      statusCode: 403,
      statusMessage:
        "You are not allowed to create a monitor for this establishment",
    });
  }

  await pool.query(
    `
    INSERT INTO monitor (name, establishment_id, playlist_id, organization_id, created_at, updated_at)
    VALUES ($1, $2, $3, now(), now())
    `,
    [body.name, establishmentId, playlistId, user.organization_id]
  );

  return setResponseStatus(event, 201);
});
