import { getAuthUser } from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const { organization } = await readBody(event);

  if (!organization) {
    throw createError({
      status: 400,
      message: "Organization name is required",
    });
  }

  const organizationCreated = await pool.query(
    `
    INSERT INTO "organization" (name, created_at, updated_at) 
    VALUES ($1, now(), now())
    RETURNING name, id
    `,
    [organization]
  );

  await pool.query(
    `
      UPDATE "user"
        SET organization_id = $1
      WHERE id = $2
    `,
    [organizationCreated.rows[0].id, user.id]
  );

  return setResponseStatus(event, 201);
});
