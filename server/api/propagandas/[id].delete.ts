import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  const result = await pool.query(
    `DELETE FROM "advertisement" WHERE id = $1 RETURNING *`,
    [id]
  );

  const advertisement = result.rows[0];

  if (!advertisement) {
    throw createError({
      statusCode: 404,
      message: "Advertisement not found",
    });
  }

  return setResponseStatus(event, 200);
});
