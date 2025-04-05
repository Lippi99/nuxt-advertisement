export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export function base64ToBuffer(base64: string): {
  buffer: Buffer;
  contentType: string;
} {
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  const contentType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  return { buffer, contentType };
}
