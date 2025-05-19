import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const body = await readBody(event);

  await pool.query(
    `
    INSERT INTO "playlist" (name, organization_id, created_at, updated_at)
    VALUES ($1, $2, now(), now())
    `,
    [body.name, user.organization_id]
  );

  return setResponseStatus(event, 201);
});
