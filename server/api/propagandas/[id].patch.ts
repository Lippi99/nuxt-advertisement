import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { uploadFiles } from "~/server/services/aws-s3-service";
import { pool } from "~/server/services/db";
import { generateKey } from "~/utils/aws";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const body = await readBody(event);
  const playlistId = parseInt(body.playlistId);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!playlistId) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found",
    });
  }

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const key = generateKey({
    prefix: "uploads",
    originalName: "propaganda",
    extension: "png",
  });

  const uploadedUrls = await uploadFiles(key, body.url as string[]);

  // 1. Update the advertisement
  const updateResult = await pool.query(
    `
    UPDATE "advertisement"
        playlist_id = $1,
        updated_at = now()
    WHERE id = $2 AND organization_id = $3
    RETURNING id
    `,
    [playlistId, id, user.organization_id]
  );

  const advertisement = updateResult.rows[0];

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      message: "Advertisement not found",
    });
  }

  const insertValues = uploadedUrls
    .map((_, idx) => `($1, $${idx + 2})`)
    .join(", ");

  await pool.query(
    `
    INSERT INTO "advertisement_image" (advertisement_id, url)
    VALUES ${insertValues}
    `,
    [advertisement.id, ...uploadedUrls]
  );

  return setResponseStatus(event, 200);
});
