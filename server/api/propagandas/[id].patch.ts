import { PrismaClient } from "@prisma/client";
import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { uploadFiles } from "~/server/services/aws-s3-service";
import { generateKey } from "~/utils/aws";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  await requireRole(event, ["admin"]);
  const body = await readBody(event);

  const playlistId = parseInt(body.playlistId);

  if (!playlistId) {
    throw createError({
      statusCode: 404,
      message: "Playlist not found",
    });
  }

  const id = parseInt(getRouterParam(event, "id") as string);

  const key = generateKey({
    prefix: "uploads",
    originalName: "propaganda",
    extension: "png",
  });

  const uploadedUrls = await uploadFiles(key, body.url as string[]);

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const advertisementUpdated = await prisma.advertisement.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      playlistId,
    },
  });

  await prisma.advertisementImage.createMany({
    data: uploadedUrls.map((url) => ({
      advertisementId: advertisementUpdated.id,
      url,
    })),
  });

  return setResponseStatus(event, 200);
});
