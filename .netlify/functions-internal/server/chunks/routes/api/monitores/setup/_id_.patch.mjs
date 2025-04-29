import { d as defineEventHandler, r as readBody, a as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { g as getAuthUser, r as requireRole } from '../../../../_/auth-service.mjs';
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
  await requireRole(event, ["admin", "employee"]);
  const body = await readBody(event);
  const code = getRouterParam(event, "id");
  const monitorAlreadyPaired = await prisma.unpairedMonitor.findMany({
    where: {
      id: body.monitorId,
      paired: true
    }
  });
  if (monitorAlreadyPaired.length > 1) {
    throw createError({
      statusCode: 400,
      message: "This monitor was already paired!"
    });
  }
  const unpaired = await prisma.unpairedMonitor.update({
    where: {
      code
    },
    data: {
      paired: body.paired,
      monitorId: body.monitorId
    }
  });
  if (!unpaired.paired) {
    await prisma.unpairedMonitor.delete({
      where: {
        code
      }
    });
  }
  return { unpaired };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
