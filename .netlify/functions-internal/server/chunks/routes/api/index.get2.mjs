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
  const monitores = await prisma.monitor.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      establishment: {
        select: {
          name: true
        }
      },
      unpairedMonitors: {
        take: 1,
        orderBy: { id: "desc" },
        select: {
          code: true,
          paired: true
        }
      }
    },
    orderBy: {
      id: "asc"
    }
  });
  const monitoresComFlatPaired = monitores.map((monitor) => {
    var _a, _b, _c, _d;
    return {
      ...monitor,
      code: (_b = (_a = monitor.unpairedMonitors[0]) == null ? void 0 : _a.code) != null ? _b : "",
      paired: (_d = (_c = monitor.unpairedMonitors[0]) == null ? void 0 : _c.paired) != null ? _d : false
    };
  });
  return { monitores: monitoresComFlatPaired };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
