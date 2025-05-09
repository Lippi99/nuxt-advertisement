import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);

  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  await pool.query(
    `
    UPDATE "playlist"
    SET name = $1,
        updated_at = now()
    WHERE id = $2
    `,
    [body.name, id]
  );

  return setResponseStatus(event, 200);
});
