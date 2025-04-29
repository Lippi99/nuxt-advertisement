import { d as defineEventHandler, r as readBody, c as createError, b as setResponseStatus } from '../../nitro/nitro.mjs';
import { u as uploadFiles } from '../../_/aws-s3-service.mjs';
import { g as generateKey } from '../../_/aws.mjs';
import { g as getAuthUser, r as requireRole } from '../../_/auth-service.mjs';
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
import '@aws-sdk/client-s3';
import 'jsonwebtoken';

const prisma = new PrismaClient();
const index_post = defineEventHandler(async (event) => {
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
  const key = generateKey({
    prefix: "uploads",
    originalName: `${playlistId}-${body.name}`,
    extension: "png"
  });
  const uploadedUrls = await uploadFiles(key, body.url);
  const advertisementCreated = await prisma.advertisement.create({
    data: {
      name: body.name,
      playlistId
    }
  });
  await prisma.advertisementImage.createMany({
    data: uploadedUrls.map((url) => ({
      advertisementId: advertisementCreated.id,
      url
    }))
  });
  return setResponseStatus(event, 201);
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
