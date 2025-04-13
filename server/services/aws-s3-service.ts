import {
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { base64ToBuffer } from "~/utils/image";

const runtimeConfig = useRuntimeConfig();

const client = new S3Client({
  credentials: {
    accessKeyId: runtimeConfig.awsAccessKey,
    secretAccessKey: runtimeConfig.awsSecretKey,
  },
});

async function createBucket() {
  try {
    const command = new CreateBucketCommand({
      Bucket: runtimeConfig.awsBucketName,
      CreateBucketConfiguration: {
        LocationConstraint: runtimeConfig.AWS_REGION,
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
  baseKey: string,
  files: string[]
): Promise<string[]> {
  await createBucket();

  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { buffer, contentType } = base64ToBuffer(file);
    const keyFolder = baseKey;

    const key = `${keyFolder}-propaganda-${i}.png`;

    const command = new PutObjectCommand({
      Bucket: runtimeConfig.awsBucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    try {
      await client.send(command);
      const url = generateUrl(key);
      urls.push(url);
    } catch (caught) {
      console.error(`❌ Failed to upload file ${i}:`, caught);
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
  originalName,
  extension,
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
