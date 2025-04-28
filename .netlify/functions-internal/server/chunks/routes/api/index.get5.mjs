import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { g as getAuthUser, r as requireRole } from '../../_/auth-service.mjs';
import { p as prisma } from '../../_/prisma-service.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const roles = await prisma.role.findMany();
  if (!roles) {
    throw createError({
      statusCode: 404,
      message: "Role not found"
    });
  }
  return {
    roles
  };
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
