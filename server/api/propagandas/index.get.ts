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
    SELECT a.id, a.created_at, p.name AS playlist_name,
      COUNT(ai.id) AS images_count
    FROM advertisement a
    LEFT JOIN advertisement_image ai ON ai.advertisement_id = a.id
    JOIN playlist p ON a.playlist_id = p.id
    WHERE p.organization_id = $1
    GROUP BY a.id, a.created_at, p.name
    ORDER BY a.id ASC
    `,
    [user.organization_id]
  );

  const advertisements = result.rows.map((ad) => ({
    name: ad.playlist_name,
    id: ad.id,
    createdAt: ad.created_at,
    _count: {
      images: parseInt(ad.images_count, 10),
    },
  }));

  return { advertisements };
});
