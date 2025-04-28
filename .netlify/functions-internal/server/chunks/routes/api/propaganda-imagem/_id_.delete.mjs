import { d as defineEventHandler, a as getRouterParam, c as createError, b as setResponseStatus } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/prisma-service.mjs';
import { g as getAuthUser, r as requireRole } from '../../../_/auth-service.mjs';
import { d as deleteFile } from '../../../_/aws-s3-service.mjs';
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
import '@aws-sdk/client-s3';

const _id__delete = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const id = parseInt(getRouterParam(event, "id"));
  const advertisementImage = await prisma.advertisementImage.delete({
    where: {
      id
    }
  });
  if (!advertisementImage) {
    throw createError({
      statusCode: 404,
      message: "Image or video not found"
    });
  }
  const url = new URL(advertisementImage.url);
  const key = decodeURIComponent(url.pathname.slice(1));
  await deleteFile(key);
  return setResponseStatus(event, 200);
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
