import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  // 1. Get the advertisement
  const adResult = await pool.query(
    `SELECT * FROM "advertisement" WHERE id = $1`,
    [id]
  );
  const advertisement = adResult.rows[0];

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      statusMessage: "advertisement doesn't exist",
    });
  }

  // 2. Get related images
  const imagesResult = await pool.query(
    `SELECT id, url FROM "advertisement_image" WHERE advertisement_id = $1`,
    [id]
  );

  advertisement.images = imagesResult.rows;

  return { advertisement };
});
