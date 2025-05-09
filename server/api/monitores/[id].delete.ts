// server/api/monitors/[id].delete.ts
import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  const result = await pool.query(
    `DELETE FROM "monitor" WHERE id = $1 RETURNING *`,
    [id]
  );

  const monitor = result.rows[0];

  if (!monitor) {
    throw createError({
      statusCode: 404,
      message: "Monitor not found",
    });
  }

  return setResponseStatus(event, 200);
});
