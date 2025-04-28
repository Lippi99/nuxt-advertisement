import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/prisma-service.mjs';
import { g as getAuthUser, r as requireRole } from '../../../_/auth-service.mjs';
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
  const user = await getAuthUser(event);
  const id = parseInt(getRouterParam(event, "id"));
  await requireRole(event, ["admin"]);
  const establishment = await prisma.establishment.findUnique({
    where: { id }
  });
  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found"
    });
  }
  if (establishment.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to update this establishment"
    });
  }
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer"
    });
  }
  const estabelecimento = await prisma.establishment.findUnique({
    where: {
      id
    }
  });
  if (!estabelecimento) {
    throw createError({
      statusCode: 404,
      statusMessage: "Establishment doesn't exist"
    });
  }
  return { estabelecimento };
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
