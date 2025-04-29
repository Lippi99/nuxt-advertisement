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
  const advertisements = await prisma.advertisement.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          images: true
        }
      },
      createdAt: true
    },
    orderBy: {
      id: "asc"
    }
  });
  return { advertisements };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
