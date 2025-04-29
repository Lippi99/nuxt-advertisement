import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { g as getAuthUser, r as requireRole } from '../../../_/auth-service.mjs';
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
const _id_ = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const id = parseInt(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer"
    });
  }
  const playlist = await prisma.playlist.findUnique({
    where: {
      id
    }
  });
  if (!playlist) {
    throw createError({
      statusCode: 404,
      statusMessage: "Playlist doesn't exist"
    });
  }
  return { playlist };
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
