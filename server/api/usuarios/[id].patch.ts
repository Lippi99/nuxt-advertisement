import bcrypt from "bcryptjs";
import {
  activeSubscription,
  getAuthUser,
  requireRole,
} from "~/server/services/auth-service";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const authUser = await getAuthUser(event);
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

  // Verifica se o usuário a ser atualizado pertence à mesma organização
  const orgCheck = await pool.query(
    `SELECT id FROM "user" WHERE id = $1 AND organization_id = $2`,
    [id, authUser.organization_id]
  );
  if (orgCheck.rowCount === 0) {
    throw createError({
      statusCode: 403,
      message: "Usuário não pertence à sua organização",
    });
  }

  // Verifica se o role existe
  const roleCheck = await pool.query(`SELECT id FROM "role" WHERE id = $1`, [
    parsedRoleId,
  ]);
  if (roleCheck.rowCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  // Verifica se o email já está em uso por outro usuário
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

  // Monta a query dinamicamente
  const values = [name, lastName, email];
  let setQuery = `
    name = $1,
    last_name = $2,
    email = $3,
  `;

  if (hashedPassword) {
    setQuery += `password = $4,`;
    values.push(hashedPassword);
  }

  values.push(parsedRoleId, new Date(birth), id);

  const roleParam = hashedPassword ? 5 : 4;
  const birthParam = hashedPassword ? 6 : 5;
  const idParam = hashedPassword ? 7 : 6;

  const updateResult = await pool.query(
    `
    UPDATE "user"
    SET ${setQuery}
        role_id = $${roleParam},
        birth = $${birthParam},
        updated_at = now()
    WHERE id = $${idParam}
    RETURNING name, last_name, email, role_id, birth
    `,
    values
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
