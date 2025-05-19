import bcrypt from "bcryptjs";
import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  await activeSubscription(event);

  const { name, lastName, email, roleId, birth, password } = await readBody(
    event
  );
  const id = parseInt(getRouterParam(event, "id") as string);
  const parsedRoleId = parseInt(roleId);

  if (!id || !name || !email || !lastName || !parsedRoleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  // Check if role exists
  const roleCheck = await pool.query(`SELECT id FROM "role" WHERE id = $1`, [
    parsedRoleId,
  ]);
  if (roleCheck.rowCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  // Check for email conflict
  const emailCheck = await pool.query(
    `SELECT id FROM "user" WHERE email = $1 AND id <> $2`,
    [email, id]
  );
  if (emailCheck.rowCount && emailCheck.rowCount > 0) {
    throw createError({
      statusCode: 400,
      message: "Este e-mail já está em uso por outro usuário.",
    });
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  // Update user
  const updateResult = await pool.query(
    `
    UPDATE "user"
    SET name = $1,
        last_name = $2,
        email = $3,
        ${hashedPassword ? "password = $4," : ""}
        role_id = $5,
        birth = $6,
        updated_at = now()
    WHERE id = $7
    RETURNING name, last_name, email, role_id, birth
    `,
    hashedPassword
      ? [
          name,
          lastName,
          email,
          hashedPassword,
          parsedRoleId,
          new Date(birth),
          id,
        ]
      : [name, lastName, email, parsedRoleId, new Date(birth), id]
  );

  const user = updateResult.rows[0];

  return {
    name: user.name,
    lastName: user.last_name,
    email: user.email,
    roleId: user.role_id,
    birth: new Date(user.birth),
  };
});
