import {
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { base64ToBuffer } from "~/utils/image";
import { pool } from "./db";

const MAX_STORAGE_BYTES = 1_000_000_000; // 1gb

const runtimeConfig = useRuntimeConfig();

const client = new S3Client({
  credentials: {
    accessKeyId: runtimeConfig.awsAccessKey,
    secretAccessKey: runtimeConfig.awsSecretKey,
  },
  region: runtimeConfig.awsRegion,
});

async function createBucket() {
  try {
    const command = new CreateBucketCommand({
      Bucket: runtimeConfig.awsBucketName,
      CreateBucketConfiguration: {
        LocationConstraint: runtimeConfig.awsRegion as any,
      },
    });
    const bucketExists = await checkIfBucketExists(runtimeConfig.awsBucketName);
    if (!bucketExists) {
      await client.send(command);
    }
  } catch (error) {
    console.error("Error creating bucket: ", error);
  }
}

async function checkIfBucketExists(bucketName: string) {
  try {
    const command = new HeadBucketCommand({ Bucket: bucketName });
    await client.send(command);
    console.log("✅ Bucket exists!");
    return true;
  } catch (err: any) {
    if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) {
      console.log("Bucket does not exist.");
      return false;
    } else if (err.name === "Forbidden") {
      console.log("Bucket exists but you don't have access.");
      return true; // It exists, but access is denied
    } else {
      console.error("❗ Unexpected error:", err);
      throw err;
    }
  }
}

export async function uploadFiles(
  organizationId: number,
  files: string[],
  organizationName: string
): Promise<string[]> {
  await createBucket();

  console.log(organizationName);

  const urls: string[] = [];

  // Sanitizar nome da organização como pasta
  const sanitizedOrg = organizationName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-"); // espaços => hífens

  // Calcular tamanho total
  const uploadSizes = files.map((f) => base64ToBuffer(f).buffer.length);
  const totalUploadSize = uploadSizes.reduce((acc, size) => acc + size, 0);

  // Verificar limite de uso
  const orgUsageResult = await pool.query(
    `SELECT COALESCE(SUM(file_size_bytes), 0) AS total FROM organization_files WHERE organization_id = $1`,
    [organizationId]
  );

  const usedBytes = Number(orgUsageResult.rows[0].total);

  if (usedBytes + totalUploadSize > MAX_STORAGE_BYTES) {
    throw createError({
      statusCode: 400,
      message: "Limite de armazenamento da organização atingido.",
    });
  }

  // Upload
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { buffer, contentType } = base64ToBuffer(file);

    const key = `${sanitizedOrg}/propaganda-${Date.now()}-${i}.png`;

    const command = new PutObjectCommand({
      Bucket: runtimeConfig.awsBucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    try {
      await client.send(command);

      await pool.query(
        `INSERT INTO organization_files (organization_id, file_name, file_size_bytes, s3_key) VALUES ($1, $2, $3, $4)`,
        [organizationId, key, buffer.length, key]
      );

      urls.push(generateUrl(key));
    } catch (caught) {
      console.error(`❌ Falha no upload do arquivo ${i}:`, caught);
      throw caught;
    }
  }

  return urls;
}

export async function deleteFile(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: runtimeConfig.awsBucketName,
      Key: key,
    });

    await client.send(command);
    console.log(`🗑️ File deleted: ${key}`);
  } catch (error) {
    console.error(`❌ Failed to delete file "${key}":`, error);
    throw error;
  }
}

export function generateKey({
  prefix,
  userId,
}: {
  prefix: string;
  userId: string;
  originalName: string;
  extension: string;
}) {
  const safeDate = new Date().toISOString().replace(/[:.]/g, "-");
  const sanitizedId = userId.replace(/\s+/g, "-");

  return `${prefix}/${sanitizedId}-${safeDate}`;
}

function generateUrl(fileName: string) {
  const URL = `https://${runtimeConfig.awsBucketName}.s3-${runtimeConfig.awsRegion}.amazonaws.com/${fileName}`;
  return URL;
}
