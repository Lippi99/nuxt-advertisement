import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const code = uuidv4();

  await prisma.unpairedMonitor.create({
    data: {
      code,
      paired: false,
    },
  });

  return { code };
});
