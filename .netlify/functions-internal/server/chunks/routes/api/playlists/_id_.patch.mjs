import { d as defineEventHandler, r as readBody, a as getRouterParam, c as createError, b as setResponseStatus } from '../../../nitro/nitro.mjs';
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
const _id__patch = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const body = await readBody(event);
  const id = parseInt(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer"
    });
  }
  await prisma.playlist.update({
    where: {
      id
    },
    data: {
      name: body.name
    }
  });
  return setResponseStatus(event, 200);
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
