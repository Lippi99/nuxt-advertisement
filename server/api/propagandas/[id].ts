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
      statusMessage: "Id should be an integer",
    });
  }

  // 1. Get the advertisement scoped to the user's organization
  const adResult = await pool.query(
    `
    SELECT a.*
    FROM advertisement a
    JOIN playlist p ON a.playlist_id = p.id
    WHERE a.id = $1 AND p.organization_id = $2
    `,
    [id, user.organization_id]
  );

  const advertisement = adResult.rows[0];

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      statusMessage: "Advertisement doesn't exist or you don't have access",
    });
  }

  // 2. Get related images
  const imagesResult = await pool.query(
    `SELECT id, url FROM advertisement_image WHERE advertisement_id = $1`,
    [id]
  );

  advertisement.images = imagesResult.rows;

  return { advertisement };
});
