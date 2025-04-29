import { d as defineEventHandler, r as readBody, c as createError, a as getRouterParam, b as setResponseStatus } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { g as getAuthUser, r as requireRole } from '../../../_/auth-service.mjs';
import { u as uploadFiles } from '../../../_/aws-s3-service.mjs';
import { g as generateKey } from '../../../_/aws.mjs';
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
import '@aws-sdk/client-s3';

const prisma = new PrismaClient();
const _id__patch = defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const body = await readBody(event);
  const playlistId = parseInt(body.playlistId);
  if (!playlistId) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found"
    });
  }
  const id = parseInt(getRouterParam(event, "id"));
  const key = generateKey({
    prefix: "uploads",
    originalName: "propaganda",
    extension: "png"
  });
  const uploadedUrls = await uploadFiles(key, body.url);
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer"
    });
  }
  const advertisementUpdated = await prisma.advertisement.update({
    where: {
      id
    },
    data: {
      name: body.name,
      playlistId
    }
  });
  await prisma.advertisementImage.createMany({
    data: uploadedUrls.map((url) => ({
      advertisementId: advertisementUpdated.id,
      url
    }))
  });
  return setResponseStatus(event, 200);
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
