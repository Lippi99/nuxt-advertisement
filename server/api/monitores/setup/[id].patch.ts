import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);

  const body = await readBody(event);
  const code = getRouterParam(event, "id");

  // 1. Check if monitor is already paired more than once
  const monitorCheck = await pool.query(
    `SELECT * FROM "unpaired_monitor" WHERE monitor_id = $1 AND paired = true`,
    [body.monitorId]
  );

  if (monitorCheck?.rowCount && monitorCheck?.rowCount > 1) {
    throw createError({
      statusCode: 400,
      message: "This monitor was already paired!",
    });
  }

  // 2. Update the unpaired_monitor
  const updateResult = await pool.query(
    `
    UPDATE "unpaired_monitor"
    SET paired = $1,
        monitor_id = $2
    WHERE code = $3
    RETURNING *
    `,
    [body.paired, body.monitorId, code]
  );

  const unpaired = updateResult.rows[0];

  if (!unpaired) {
    throw createError({
      statusCode: 404,
      message: "Unpaired monitor not found",
    });
  }

  // 4. If still not paired, delete the entry
  if (!unpaired.paired) {
    await pool.query(`DELETE FROM "unpaired_monitor" WHERE code = $1`, [code]);
  }

  return { unpaired };
});
