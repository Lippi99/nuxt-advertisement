import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';
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
const index_post = defineEventHandler(async () => {
  const code = v4();
  await prisma.unpairedMonitor.create({
    data: {
      code,
      paired: false
    }
  });
  return { code };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
