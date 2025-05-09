import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { uploadFiles } from "~/server/services/aws-s3-service";
import { pool } from "~/server/services/db";
import { generateKey } from "~/utils/aws";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const body = await readBody(event);
  const playlistId = parseInt(body.playlistId);

  if (!playlistId) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found",
    });
  }

  const key = generateKey({
    prefix: "uploads",
    originalName: `${playlistId}-${body.name}`,
    extension: "png",
  });

  const uploadedUrls = await uploadFiles(key, body.url as string[]);

  // 1. Insert advertisement and get the generated ID
  const adResult = await pool.query(
    `
    INSERT INTO "advertisement" (name, playlist_id, created_at, updated_at)
    VALUES ($1, $2, now(), now())
    RETURNING id
    `,
    [body.name, playlistId]
  );

  const advertisement = adResult.rows[0];

  // 2. Insert advertisement images
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

  return setResponseStatus(event, 201);
});
