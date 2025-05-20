import { getCookie, createError, type H3Event } from "h3";
import jwt from "jsonwebtoken";
import { UserRole } from "~/types/role";
import { pool } from "./db";
import dayjs from "dayjs";

export async function getAuthUser(event: H3Event) {
  const config = useRuntimeConfig();
  const token = getCookie(event, "ad-auth");

  if (!token) {
    throw createError({ statusCode: 401, message: "Not authenticated" });
  }

  const decoded = jwt.verify(token, config.jwtSecret) as { userId: number };

  const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [
    decoded.userId,
  ]);

  const user = result.rows[0];

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return user;
}

export async function requireRole(event: H3Event, allowedRoles: UserRole[]) {
  const user = await getAuthUser(event);

  const result = await pool.query(`SELECT name FROM "role" WHERE id = $1`, [
    user.role_id,
  ]);

  const role = result.rows[0];

  if (!role) {
    throw createError({ statusCode: 404, message: "Role not found" });
  }

  if (!allowedRoles.includes(role.name as UserRole)) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  return user;
}

export async function activeSubscription(event: H3Event) {
  const user = await getAuthUser(event);

  if (!user.organization_id) {
    throw createError({
      statusCode: 403,
      message: "Usuário não está associado a uma organização",
    });
  }

  const orgResult = await pool.query(
    `SELECT subscription_status FROM organization WHERE id = $1`,
    [user.organization_id]
  );

  const organization = orgResult.rows[0];

  if (!organization || organization.subscription_status !== "active") {
    throw createError({
      statusCode: 403,
      message: "Você precisa estar com uma assinatura ativa",
    });
  }
}
