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

  const decoded = jwt.verify(token, config.jwtSecret) as AuthTokenPayload;

  // Buscar usuário e role
  const result = await pool.query(
    `
    SELECT 
      u.id, u.email, u.name, u.last_name, u.organization_id, u.birth,
      r.name AS role
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

  // Verifica status da assinatura da organização
  let isSubscribed = false;

  if (user.organization_id) {
    const orgResult = await pool.query(
      `
      SELECT subscription_status 
      FROM "organization" 
      WHERE id = $1
      `,
      [user.organization_id]
    );

    isSubscribed =
      orgResult.rows[0]?.subscription_status === "active" ||
      orgResult.rows[0]?.subscription_status === "canceled";

    console.log(user.organization_id);
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.last_name,
      role: user.role,
      birth: user.birth,
      organization: user.organization_id,
      isSubscribed,
      hasOrganization: !!user.organization_id,
    } as User,
  };
});
