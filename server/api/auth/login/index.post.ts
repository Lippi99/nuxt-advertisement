import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRole } from "~/types/role";
import { pool } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();

  const userResult = await pool.query(
    `SELECT id, email, name, last_name, password, role_id
       FROM "user"
       WHERE email = $1`,
    [email]
  );

  const user = userResult.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ userId: user.id }, config.jwtSecret as string, {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
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
    },
  };
});
