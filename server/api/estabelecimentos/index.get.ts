// server/api/establishments/index.get.ts
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
    FROM "establishment"
    WHERE organization_id = $1
    ORDER BY id ASC
    `,
    [user.organization_id]
  );

  const estabelecimentos = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  }));

  return { estabelecimentos };
});
