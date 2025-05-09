import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  const result = await pool.query(
    `DELETE FROM "user" WHERE id = $1 RETURNING *`,
    [id]
  );

  const user = result.rows[0];

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  return setResponseStatus(event, 200);
});
