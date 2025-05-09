import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);

  const result = await pool.query(`
    SELECT
      m.id,
      m.name,
      m.created_at,
      e.name AS establishment_name,
      (
        SELECT um.code
        FROM unpaired_monitor um
        WHERE um.monitor_id = m.id
        ORDER BY um.id DESC
        LIMIT 1
      ) AS code,
      (
        SELECT um.paired
        FROM unpaired_monitor um
        WHERE um.monitor_id = m.id
        ORDER BY um.id DESC
        LIMIT 1
      ) AS paired
    FROM monitor m
    JOIN establishment e ON m.establishment_id = e.id
    ORDER BY m.id ASC
  `);

  const monitores = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    establishment: {
      name: row.establishment_name,
    },
    code: row.code ?? "",
    paired: row.paired ?? false,
  }));

  return { monitores };
});
