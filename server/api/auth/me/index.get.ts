// server/api/auth/me.get.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { requireRole } from "~/server/services/auth-service";
import { User } from "~/server/models/user";
import { pool } from "~/server/services/db";

interface AuthTokenPayload extends JwtPayload {
  userId: number;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "ad-auth");

  if (!token) {
    throw createError({ statusCode: 401, message: "No token provided" });
  }

  await requireRole(event, ["admin", "employee"]);

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthTokenPayload;

    const result = await pool.query(
      `
      SELECT u.id, u.email, u.name, u.last_name, r.name AS role
      FROM "user" u
      JOIN "role" r ON u.role_id = r.id
      WHERE u.id = $1
      `,
      [decoded.userId]
    );

    const user = result.rows[0];

    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.last_name,
        role: user.role,
      } as User,
    };
  } catch (e) {
    console.error(e);
    throw createError({ statusCode: 500, message: "Internal Server Error" });
  }
});
