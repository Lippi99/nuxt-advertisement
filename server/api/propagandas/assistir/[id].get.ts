import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "id");

  const result = await pool.query(
    `
    SELECT
      um.id AS unpaired_id,
      m.name AS monitor_name,
      p.id AS playlist_id,
      p.name AS playlist_name,
      a.id AS advertisement_id,
      a.name AS advertisement_name
    FROM unpaired_monitor um
    JOIN monitor m ON um.monitor_id = m.id
    JOIN playlist p ON m.playlist_id = p.id
    LEFT JOIN advertisement a ON a.playlist_id = p.id
    WHERE um.code = $1 AND um.paired = true
    `,
    [code]
  );

  if (result.rowCount === 0) return { monitor: null };

  // Group by advertisement
  const rows = result.rows;
  const advertisementsMap = new Map<number, { id: number; images: any[] }>();

  for (const row of rows) {
    if (row.advertisement_id && !advertisementsMap.has(row.advertisement_id)) {
      advertisementsMap.set(row.advertisement_id, {
        id: row.advertisement_id,
        images: [],
      });
    }
  }

  // Fetch all images related to those advertisements
  const adIds = [...advertisementsMap.keys()];
  if (adIds.length > 0) {
    const imageResult = await pool.query(
      `
      SELECT id, url, advertisement_id
      FROM advertisement_image
      WHERE advertisement_id = ANY($1)
      `,
      [adIds]
    );

    imageResult.rows.forEach((img) => {
      advertisementsMap.get(img.advertisement_id)?.images.push({
        id: img.id,
        url: img.url,
      });
    });
  }

  const monitor = {
    name: rows[0].monitor_name,
    playlist: {
      id: rows[0].playlist_id,
      name: rows[0].playlist_name,
      advertisements: [...advertisementsMap.values()],
    },
  };

  return { monitor };
});
