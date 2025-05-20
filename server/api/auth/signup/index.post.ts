import bcrypt from "bcryptjs";
import { pool } from "~/server/services/db";
import { defineEventHandler, getHeader } from "h3";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const {
    name,
    lastName,
    email,
    roleId,
    birth,
    password,
    organization_id: bodyOrganizationId,
  } = await readBody(event);

  // 1. Validação dos campos obrigatórios
  if (!name || !email || !password || !lastName || !roleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: "Password must be at least 8 characters long",
    });
  }

  const roleCheck = await pool.query(`SELECT id FROM "role" WHERE id = $1`, [
    parseInt(roleId),
  ]);
  if (roleCheck.rowCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  const userExists = await pool.query(
    `SELECT id FROM "user" WHERE email = $1`,
    [email]
  );
  if (userExists.rowCount && userExists.rowCount > 0) {
    throw createError({
      statusCode: 400,
      message: "Email already registered",
    });
  }

  // 4. Determina organization_id: interno (usuário logado) ou externo (cadastro público)
  let finalOrganizationId = bodyOrganizationId;

  try {
    const authUser = await getAuthUser(event);
    if (authUser?.organization_id) {
      finalOrganizationId = authUser.organization_id;
    }
  } catch {
    // Ignora se não estiver autenticado (cadastro público)
  }

  // 5. Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. Cria o usuário
  const result = await pool.query(
    `
    INSERT INTO "user" (
      name, last_name, email, password, role_id, birth, organization_id, created_at, updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())
    RETURNING id, name, last_name, email, role_id, birth, organization_id
    `,
    [
      name,
      lastName,
      email,
      hashedPassword,
      parseInt(roleId),
      new Date(birth),
      finalOrganizationId,
    ]
  );

  const user = result.rows[0];

  return {
    user: {
      ...user,
      lastName: user.last_name,
      roleId: user.role_id,
    },
  };
});
