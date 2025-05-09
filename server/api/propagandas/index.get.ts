import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);

  const result = await pool.query(`
    SELECT a.id, a.name, a.created_at,
      COUNT(ai.id) AS images_count
    FROM "advertisement" a
    LEFT JOIN "advertisement_image" ai ON ai.advertisement_id = a.id
    GROUP BY a.id
    ORDER BY a.id ASC
  `);

  const advertisements = result.rows.map((ad) => ({
    id: ad.id,
    name: ad.name,
    createdAt: ad.created_at,
    _count: {
      images: parseInt(ad.images_count, 10),
    },
  }));

  return { advertisements };
});
