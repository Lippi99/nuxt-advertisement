import { getCookie, createError, type H3Event } from "h3";
import jwt from "jsonwebtoken";
import { prisma } from "@/server/services/prisma-service";

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
