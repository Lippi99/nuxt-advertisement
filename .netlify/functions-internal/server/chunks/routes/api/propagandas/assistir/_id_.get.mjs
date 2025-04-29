import { d as defineEventHandler, a as getRouterParam } from '../../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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

const prisma = new PrismaClient();
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
