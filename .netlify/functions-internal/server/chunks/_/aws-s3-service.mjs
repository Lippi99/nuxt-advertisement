import { u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { DeleteObjectCommand, S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3';

function base64ToBuffer(base64) {
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }
  const contentType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  return { buffer, contentType };
}

const runtimeConfig = useRuntimeConfig();
const client = new S3Client({
  credentials: {
    accessKeyId: runtimeConfig.awsAccessKey,
    secretAccessKey: runtimeConfig.awsSecretKey
  }
});
async function createBucket() {
  try {
    const command = new CreateBucketCommand({
      Bucket: runtimeConfig.awsBucketName,
      CreateBucketConfiguration: {
        LocationConstraint: runtimeConfig.AWS_REGION
      }
    });
    const bucketExists = await checkIfBucketExists(runtimeConfig.awsBucketName);
    if (!bucketExists) {
      await client.send(command);
    }
  } catch (error) {
    console.error("Error creating bucket: ", error);
  }
}
async function checkIfBucketExists(bucketName) {
  var _a;
  try {
    const command = new HeadBucketCommand({ Bucket: bucketName });
    await client.send(command);
    console.log("\u2705 Bucket exists!");
    return true;
  } catch (err) {
    if (err.name === "NotFound" || ((_a = err.$metadata) == null ? void 0 : _a.httpStatusCode) === 404) {
      console.log("Bucket does not exist.");
      return false;
    } else if (err.name === "Forbidden") {
      console.log("Bucket exists but you don't have access.");
      return true;
    } else {
      console.error("\u2757 Unexpected error:", err);
      throw err;
    }
  }
}
async function uploadFiles(baseKey, files) {
  await createBucket();
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { buffer, contentType } = base64ToBuffer(file);
    const keyFolder = baseKey;
    const key = `${keyFolder}-propaganda-${i}.png`;
    const command = new PutObjectCommand({
      Bucket: runtimeConfig.awsBucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType
    });
    try {
      await client.send(command);
      const url = generateUrl(key);
      urls.push(url);
    } catch (caught) {
      console.error(`\u274C Failed to upload file ${i}:`, caught);
      throw caught;
    }
  }
  return urls;
}
async function deleteFile(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: runtimeConfig.awsBucketName,
      Key: key
    });
    await client.send(command);
    console.log(`\u{1F5D1}\uFE0F File deleted: ${key}`);
  } catch (error) {
    console.error(`\u274C Failed to delete file "${key}":`, error);
    throw error;
  }
}
function generateUrl(fileName) {
  const URL = `https://${runtimeConfig.awsBucketName}.s3-${runtimeConfig.awsRegion}.amazonaws.com/${fileName}`;
  return URL;
}

export { deleteFile as d, uploadFiles as u };
//# sourceMappingURL=aws-s3-service.mjs.map
