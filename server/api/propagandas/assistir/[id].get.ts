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
    FROM "UnpairedMonitor" um
    JOIN "Monitor" m ON um."monitorId" = m.id
    JOIN "Playlist" p ON m."playlistId" = p.id
    LEFT JOIN "Advertisement" a ON a."playlistId" = p.id
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
      SELECT id, url, "advertisementId"
      FROM "AdvertisementImage"
      WHERE "advertisementId" = ANY($1)
      `,
      [adIds]
    );

    imageResult.rows.forEach((img) => {
      advertisementsMap.get(img.advertisementId)?.images.push({
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
