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

  const result = await pool.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.role_id,
      u.organization_id,
      o.name AS organization_name
    FROM "user" u
    LEFT JOIN "organization" o ON u.organization_id = o.id
    WHERE u.id = $1
    `,
    [user.id]
  );

  const organization = result.rows[0];

  const uploadedUrls = await uploadFiles(
    user.organization_id,
    body.url as string[],
    organization.organization_name
  );

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
