import { d as defineEventHandler, g as getCookie, c as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { r as requireRole } from '../../../_/auth-service.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';

const prisma = new PrismaClient();
const index_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "ad-auth");
  if (!token) {
    throw createError({ statusCode: 401, message: "No token provided" });
  }
  await requireRole(event, ["admin", "employee"]);
  try {
    const decoded = jwt.verify(
      token,
      config.jwtSecret
    );
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        role: {
          select: {
            name: true
          }
        }
      }
    });
    if (!user) throw new Error("User not found");
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name
      }
    };
  } catch (e) {
    console.log(e);
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
