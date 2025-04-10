import { prisma } from "@/server/services/prisma-service";
import { uploadFiles } from "~/server/services/aws-s3-service";
import { generateKey } from "~/utils/aws";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const monitorId = parseInt(body.monitorId);
  const id = parseInt(getRouterParam(event, "id") as string);

  const key = generateKey({
    prefix: "uploads",
    userId: `monitor-${monitorId.toString()}`,
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
      monitorId,
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
