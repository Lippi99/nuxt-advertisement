import { d as defineEventHandler, a as getRouterParam, c as createError, b as setResponseStatus } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
import 'node:url';
import 'ipx';
import 'jsonwebtoken';

const prisma = new PrismaClient();
const _id__delete = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const id = parseInt(getRouterParam(event, "id"));
  const user = await prisma.user.delete({
    where: {
      id
    }
  });
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found"
    });
  }
  return setResponseStatus(event, 200);
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
