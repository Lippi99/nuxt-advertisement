import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { uploadFiles } from "~/server/services/aws-s3-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const body = await readBody(event);
  const playlistId = parseInt(body.playlistId);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!playlistId) {
    throw createError({
      statusCode: 400,
      message: "Invalid playlist ID",
    });
  }

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid advertisement ID",
    });
  }

  // ✅ Ensure the playlist belongs to the user's organization
  const playlistCheck = await pool.query(
    `SELECT id FROM playlist WHERE id = $1 AND organization_id = $2`,
    [playlistId, user.organization_id]
  );

  if (playlistCheck.rowCount === 0) {
    throw createError({
      statusCode: 403,
      message: "You are not allowed to modify advertisements in this playlist",
    });
  }

  // ✅ Get organization name
  const orgResult = await pool.query(
    `SELECT name FROM organization WHERE id = $1`,
    [user.organization_id]
  );

  const organizationName = orgResult.rows[0]?.name;

  if (!organizationName) {
    throw createError({
      statusCode: 404,
      message: "Organization not found",
    });
  }

  // ✅ Upload new images to S3
  const uploadedUrls = await uploadFiles(
    user.organization_id,
    body.url as string[],
    organizationName
  );

  // ✅ Update the advertisement
  const updateResult = await pool.query(
    `
    UPDATE advertisement
    SET playlist_id = $1,
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

  // ✅ Insert new image URLs
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

  return setResponseStatus(event, 200);
});
