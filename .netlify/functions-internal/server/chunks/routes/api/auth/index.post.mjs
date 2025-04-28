import { d as defineEventHandler, r as readBody, u as useRuntimeConfig, c as createError, s as setCookie } from '../../../nitro/nitro.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { p as prisma } from '../../../_/prisma-service.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'unhead/server';
import 'unhead/utils';
import 'vue';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'node:url';
import 'ipx';
import '@prisma/client';

const index_post = defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials"
      });
    }
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7
      // 7 days
    });
    setCookie(event, "ad-auth", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });
    const role = await prisma.role.findUnique({
      where: { id: user.roleId }
    });
    if (!role) {
      throw createError({
        statusCode: 404,
        message: "Role not found"
      });
    }
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: role.name
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
