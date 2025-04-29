import { uploadFiles } from "@/server/services/aws-s3-service";
import { generateKey } from "~/utils/aws";
import { getAuthUser, requireRole } from "~/server/services/auth-service";
import { PrismaClient } from "@prisma/client";

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

  const key = generateKey({
    prefix: "uploads",
    originalName: `${playlistId}-${body.name}`,
    extension: "png",
  });

  const uploadedUrls = await uploadFiles(key, body.url as string[]);

  const advertisementCreated = await prisma.advertisement.create({
    data: {
      name: body.name,
      playlistId,
    },
  });

  await prisma.advertisementImage.createMany({
    data: uploadedUrls.map((url) => ({
      advertisementId: advertisementCreated.id,
      url,
    })),
  });

  return setResponseStatus(event, 201);
});
