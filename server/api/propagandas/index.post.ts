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

  if (!playlistId) {
    throw createError({
      statusCode: 400,
      message: "Invalid playlist ID",
    });
  }

  // ✅ Verify playlist belongs to user's organization
  const playlistCheck = await pool.query(
    `SELECT id FROM playlist WHERE id = $1 AND organization_id = $2`,
    [playlistId, user.organization_id]
  );

  if (playlistCheck.rowCount === 0) {
    throw createError({
      statusCode: 403,
      message: "You are not allowed to create advertisements in this playlist",
    });
  }

  const key = generateKey({
    prefix: "uploads",
    originalName: `${playlistId}-${body.name}`,
    extension: "png",
  });

  const uploadedUrls = await uploadFiles(key, body.url as string[]);

  // ✅ Insert advertisement and get ID
  const adResult = await pool.query(
    `
    INSERT INTO advertisement (playlist_id, organization_id, created_at, updated_at)
    VALUES ($1, $2, now(), now())
    RETURNING id
    `,
    [playlistId, user.organization_id]
  );

  const advertisement = adResult.rows[0];

  const values: any[] = [];
  const placeholders = uploadedUrls
    .map((url, i) => {
      values.push(advertisement.id, url);
      const base = i * 2;
      return `($${base + 1}, $${base + 2})`;
    })
    .join(", ");

  await pool.query(
    `
    INSERT INTO advertisement_image (advertisement_id, url)
    VALUES ${placeholders}
    `,
    values
  );

  return setResponseStatus(event, 201);
});
