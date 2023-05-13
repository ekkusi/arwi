export async function testAsyncDuration<T>(promise: Promise<T>, funcName: string = "testAsyncDuration") {
  const start = Date.now();
  const result = await Promise.resolve(promise);
  const end = Date.now();
  // eslint-disable-next-line
  console.log(`${funcName} took:`, end - start, "ms");

  return result;
}
