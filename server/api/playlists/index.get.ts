import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
  await activeSubscription(event);

  const result = await pool.query(
    `
    SELECT id, name, created_at
    FROM "playlist"
    WHERE organization_id = $1
    ORDER BY id ASC
  `,
    [user.organization_id]
  );
  return { playlists: result.rows };
});
