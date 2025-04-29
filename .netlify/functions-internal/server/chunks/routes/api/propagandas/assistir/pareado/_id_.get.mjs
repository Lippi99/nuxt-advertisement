import { d as defineEventHandler, a as getRouterParam, e as setResponseHeaders } from '../../../../../nitro/nitro.mjs';
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
  setResponseHeaders(event, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  event.node.res.write(":\n\n");
  const interval = setInterval(async () => {
    var _a;
    try {
      const monitor = await prisma.unpairedMonitor.findFirst({
        where: { code: id }
      });
      const paired = (_a = monitor == null ? void 0 : monitor.paired) != null ? _a : false;
      event.node.res.write(`data: ${JSON.stringify({ paired })}

`);
    } catch (err) {
      event.node.res.write(`event: error
data: ${JSON.stringify(err)}

`);
    }
  }, 1e3);
  event.node.req.on("close", () => {
    clearInterval(interval);
  });
  event.node.req.on("close", () => {
    clearInterval(interval);
  });
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
