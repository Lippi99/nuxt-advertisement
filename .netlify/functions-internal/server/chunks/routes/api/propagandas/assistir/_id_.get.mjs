import { d as defineEventHandler, a as getRouterParam } from '../../../../nitro/nitro.mjs';
import { p as prisma } from '../../../../_/prisma-service.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const monitor = await prisma.unpairedMonitor.findFirst({
    where: {
      code: id,
      paired: true
    },
    include: {
      monitor: {
        select: {
          name: true,
          playlist: {
            include: {
              advertisements: {
                select: {
                  id: true,
                  images: true
                }
              }
            }
          }
        }
      }
    }
  });
  return { monitor };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
