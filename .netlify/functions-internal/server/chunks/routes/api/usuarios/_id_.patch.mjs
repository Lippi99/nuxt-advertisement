import { d as defineEventHandler, r as readBody, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import { g as getAuthUser, r as requireRole } from '../../../_/auth-service.mjs';
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
import 'jsonwebtoken';
import '@prisma/client';

const _id__patch = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const { name, lastName, email, roleId, birth, password } = await readBody(
    event
  );
  const id = parseInt(getRouterParam(event, "id"));
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
  if (!id || !name || !email || !lastName || !roleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields"
    });
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: {
          not: id
        }
      }
    });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Este e-mail j\xE1 est\xE1 em uso por outro usu\xE1rio."
      });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : void 0;
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        lastName,
        email,
        ...password && {
          password: hashedPassword
        },
        roleId,
        birth: new Date(birth)
      }
    });
    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      birth: new Date(user.birth)
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

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
