import { d as defineEventHandler } from '../../nitro/nitro.mjs';
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
const index_get = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
  const playlists = await prisma.playlist.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true
    },
    orderBy: {
      id: "asc"
    }
  });
  return { playlists };
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
