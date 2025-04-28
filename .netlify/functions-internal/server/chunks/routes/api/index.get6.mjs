import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { p as prisma } from '../../_/prisma-service.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const usuarios = await prisma.user.findMany({
    where: {
      id: {
        not: user.id
      }
    },
    select: {
      id: true,
      email: true,
      name: true,
      lastName: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      id: "asc"
    }
  });
  return { usuarios };
});

export { index_get as default };
//# sourceMappingURL=index.get6.mjs.map
