import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);

  const organizationsResult = await pool.query(
    `
    SELECT o.id, o.name AS organization_name
    FROM "organization" o
    INNER JOIN "user" u ON u.organization_id = o.id
    WHERE u.id = $1
    `,
    [user.id]
  );

  return {
    organizations: organizationsResult.rows,
  };
});
