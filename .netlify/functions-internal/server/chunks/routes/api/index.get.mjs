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
  await getAuthUser(event);
  await requireRole(event, ["admin", "employee"]);
  const estabelecimentos = await prisma.establishment.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true
    },
    orderBy: {
      id: "asc"
    }
  });
  return { estabelecimentos };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
