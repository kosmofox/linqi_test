export function generateRandomName(prefix: string = "Process"): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomString}`;
}
