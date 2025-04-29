import { d as defineEventHandler, g as getCookie, c as createError, u as useRuntimeConfig, s as setCookie } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
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
const index_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const token = getCookie(event, "ad-auth");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "No token provided"
      });
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
    setCookie(event, "ad-auth", "", {
      maxAge: -1,
      path: "/",
      httpOnly: true
    });
    return {
      success: true,
      message: "Logged out successfully"
    };
  } catch (error) {
    console.error("Logout error:", error);
    throw createError({
      statusCode: 500,
      message: "Error during logout"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
