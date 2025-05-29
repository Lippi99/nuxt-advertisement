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

  const result = await pool.query(
    `
    SELECT id, email, name, last_name, created_at, updated_at
    FROM "user"
    WHERE id <> $1 AND organization_id = $2
    ORDER BY id ASC
    `,
    [user.id, user.organization_id]
  );

  return { usuarios: result.rows };
});
