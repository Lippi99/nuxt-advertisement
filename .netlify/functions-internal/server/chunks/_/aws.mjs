function generateKey(options) {
  const timestamp = Date.now();
  const parts = [];
  if (options.prefix) parts.push(options.prefix);
  if (options.userId) parts.push(options.userId);
  const baseFileName = `${timestamp}-${options.originalName || "file"}`;
  const fullName = options.extension ? `${baseFileName}.${options.extension.replace(/^\./, "")}` : baseFileName;
  parts.push(fullName);
  return parts.join("/");
}

export { generateKey as g };
//# sourceMappingURL=aws.mjs.map
