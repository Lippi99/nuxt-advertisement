import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  // await getAuthUser(event);
  // await requireRole(event, ["admin"]);

  const result = await pool.query(`SELECT * FROM "role"`);

  if (result.rowCount === 0) {
    throw createError({
      statusCode: 404,
      message: "No roles found",
    });
  }

  return {
    roles: result.rows,
  };
});
