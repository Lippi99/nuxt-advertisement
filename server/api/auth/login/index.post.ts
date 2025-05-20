import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "~/server/services/db";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();

  // Buscar usuário com organization_id
  const userResult = await pool.query(
    `SELECT id, email, name, last_name, password, role_id, organization_id
     FROM "user"
     WHERE email = $1`,
    [email]
  );

  const user = userResult.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Credenciais inválidas",
    });
  }

  let isSubscribed = false;

  if (user.organization_id) {
    const orgResult = await pool.query(
      `SELECT subscription_status FROM "organization" WHERE id = $1`,
      [user.organization_id]
    );

    isSubscribed = orgResult.rows[0]?.subscription_status === "active";
  }

  const token = jwt.sign({ userId: user.id }, config.jwtSecret as string, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  setCookie(event, "ad-auth", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  const roleResult = await pool.query(`SELECT name FROM "role" WHERE id = $1`, [
    user.role_id,
  ]);

  const role = roleResult.rows[0];

  if (!role) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.last_name,
      role: role.name,
      isSubscribed,
      hasOrganization: !!user.organization_id,
    },
  };
});
