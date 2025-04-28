import { c as createError, u as useRuntimeConfig, g as getCookie } from '../nitro/nitro.mjs';
import jwt from 'jsonwebtoken';
import { p as prisma } from './prisma-service.mjs';

async function getAuthUser(event) {
  const config = useRuntimeConfig();
  const token = getCookie(event, "ad-auth");
  if (!token) {
    throw createError({ statusCode: 401, message: "Not authenticated" });
  }
  const decoded = jwt.verify(token, config.jwtSecret);
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }
  return user;
}
async function requireRole(event, allowedRoles) {
  const user = await getAuthUser(event);
  const role = await prisma.role.findUnique({
    where: {
      id: user.roleId
    }
  });
  if (!role) {
    throw createError({
      statusCode: 404,
      message: "Role not found"
    });
  }
  if (!allowedRoles.includes(role.name)) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }
  return user;
}

export { getAuthUser as g, requireRole as r };
//# sourceMappingURL=auth-service.mjs.map
