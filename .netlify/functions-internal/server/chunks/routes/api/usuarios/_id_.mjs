import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/prisma-service.mjs';
import { r as requireRole, g as getAuthUser } from '../../../_/auth-service.mjs';
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
import 'jsonwebtoken';

const _id_ = defineEventHandler(async (event) => {
  await requireRole(event, ["admin"]);
  await getAuthUser(event);
  const id = parseInt(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer"
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User doesn't exist"
    });
  }
  return { user };
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
