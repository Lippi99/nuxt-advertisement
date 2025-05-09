import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);

  const result = await pool.query(`
    SELECT id, name, created_at
    FROM "playlist"
    ORDER BY id ASC
  `);

  return { playlists: result.rows };
});
