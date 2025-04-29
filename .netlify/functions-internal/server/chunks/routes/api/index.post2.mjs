import { d as defineEventHandler, r as readBody, b as setResponseStatus } from '../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { g as getAuthUser, r as requireRole } from '../../_/auth-service.mjs';
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
  await requireRole(event, ["admin"]);
  const body = await readBody(event);
  const establishmentId = parseInt(body.establishmentId);
  const playlistId = parseInt(body.playlistId);
  await prisma.monitor.create({
    data: {
      name: body.name,
      establishmentId,
      playlistId
    }
  });
  return setResponseStatus(event, 201);
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
