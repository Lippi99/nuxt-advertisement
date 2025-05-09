// server/api/establishments/index.get.ts
import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);

  const result = await pool.query(
    `SELECT id, name, created_at FROM "establishment" ORDER BY id ASC`
  );
  const estabelecimentos = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  }));

  return { estabelecimentos };
});
