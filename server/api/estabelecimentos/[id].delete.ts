import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const id = parseInt(getRouterParam(event, "id") as string);

  // 1. Fetch the establishment by ID
  const result = await pool.query(
    `SELECT id, user_id FROM "establishment" WHERE id = $1`,
    [id]
  );

  const establishmentToBeDeleted = result.rows[0];

  if (!establishmentToBeDeleted) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found",
    });
  }

  if (establishmentToBeDeleted.user_id !== user.id) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to update this establishment",
    });
  }

  // 3. Delete the record
  await pool.query(`DELETE FROM "establishment" WHERE id = $1`, [id]);

  return setResponseStatus(event, 200);
});
