export function generateKey(options: {
  userId?: string;
  prefix?: string;
  originalName?: string;
  extension?: string;
}) {
  const timestamp = Date.now();
  const parts: string[] = [];

  if (options.prefix) parts.push(options.prefix);
  if (options.userId) parts.push(options.userId);

  const baseFileName = `${timestamp}-${options.originalName || "file"}`;
  const fullName = options.extension
    ? `${baseFileName}.${options.extension.replace(/^\./, "")}`
    : baseFileName;

  parts.push(fullName);

  return parts.join("/");
}
