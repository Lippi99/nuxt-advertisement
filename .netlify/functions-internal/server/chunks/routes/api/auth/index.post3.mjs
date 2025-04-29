import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { g as getAuthUser } from '../../../_/auth-service.mjs';
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
import 'jsonwebtoken';

const prisma = new PrismaClient();
const index_post = defineEventHandler(async (event) => {
  await getAuthUser(event);
  const { name, lastName, email, roleId, birth, password } = await readBody(
    event
  );
  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(roleId)
    }
  });
  if (!role) {
    throw createError({
      statusCode: 404,
      message: "Role not found"
    });
  }
  if (!name || !email || !password || !lastName || !roleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields"
    });
  }
  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: "Password must be at least 8 characters long"
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Email already registered"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        roleId,
        birth: new Date(birth)
      }
    });
    return {
      user
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 400,
        message: "Email already registered"
      });
    }
    throw error;
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
