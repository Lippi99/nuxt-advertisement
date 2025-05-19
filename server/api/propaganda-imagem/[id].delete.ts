import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { deleteFile } from "~/server/services/aws-s3-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  const result = await pool.query(
    `DELETE FROM "advertisement_image" WHERE id = $1 RETURNING url`,
    [id]
  );

  const advertisementImage = result.rows[0];

  if (!advertisementImage) {
    throw createError({
      statusCode: 404,
      message: "Image or video not found",
    });
  }

  const url = new URL(advertisementImage.url);
  const key = decodeURIComponent(url.pathname.slice(1));
  await deleteFile(key);

  return setResponseStatus(event, 200);
});
