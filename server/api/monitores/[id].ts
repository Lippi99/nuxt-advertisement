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

  const result = await pool.query(`SELECT * FROM "monitor" WHERE id = $1`, [
    id,
  ]);

  const monitor = result.rows[0];

  if (!monitor) {
    throw createError({
      statusCode: 404,
      statusMessage: "Monitor doesn't exist",
    });
  }

  return { monitor };
});
