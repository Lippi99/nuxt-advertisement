import { d as defineEventHandler, a as getRouterParam, c as createError, b as setResponseStatus } from '../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const id = parseInt(getRouterParam(event, "id"));
  const establishmentToBeDeleted = await prisma.establishment.findUnique({
    where: { id }
  });
  if (!establishmentToBeDeleted) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found"
    });
  }
  if (establishmentToBeDeleted.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to update this establishment"
    });
  }
  const establishment = await prisma.establishment.delete({
    where: {
      id
    }
  });
  if (!establishment) {
    throw createError({
      statusCode: 404,
      message: "Establishment not found"
    });
  }
  return setResponseStatus(event, 200);
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
