import { prisma } from "@/server/services/prisma-service";
import { uploadFiles } from "@/server/services/aws-s3-service";
import { generateKey } from "~/utils/aws";
import { getAuthUser } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);
  const body = await readBody(event);
  const monitorId = parseInt(body.monitorId);

  const key = generateKey({
    prefix: "uploads",
    userId: `monitor-${monitorId.toString()}`,
    originalName: "propaganda",
    extension: "png",
  });

  const uploadedUrls = await uploadFiles(key, body.url as string[]);

  const advertisementCreated = await prisma.advertisement.create({
    data: {
      name: body.name,
      monitorId,
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
