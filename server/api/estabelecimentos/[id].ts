import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const id = parseInt(getRouterParam(event, "id") as string);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const result = await pool.query(
    `
    SELECT * FROM "establishment"
    WHERE id = $1 AND organization_id = $2
    `,
    [id, user.organization_id]
  );

  const establishment = result.rows[0];

  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment doesn't exist",
    });
  }

  return { estabelecimento: establishment };
});
