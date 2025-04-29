import { getCookie, createError, type H3Event } from "h3";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UserRole } from "~/types/role";

const prisma = new PrismaClient();

export async function getAuthUser(event: H3Event) {
  const config = useRuntimeConfig();
  const token = getCookie(event, "ad-auth");

  if (!token) {
    throw createError({ statusCode: 401, message: "Not authenticated" });
  }

  const decoded = jwt.verify(token, config.jwtSecret) as { userId: number };

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return user;
}

export async function requireRole(event: H3Event, allowedRoles: UserRole[]) {
  const user = await getAuthUser(event);

  const role = await prisma.role.findUnique({
    where: {
      id: user.roleId,
    },
  });

  if (!role) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  if (!allowedRoles.includes(role.name as UserRole)) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }
  return user;
}
