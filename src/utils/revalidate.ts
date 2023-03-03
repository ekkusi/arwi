import { NextApiResponse } from "next";

export default async function revalidateIfProd(
  res: NextApiResponse,
  path: string
) {
  let revalidated = false;
  if (process.env.NODE_ENV !== "production") return { revalidated: false };
  try {
    await res.revalidate(path);
    revalidated = true;
  } catch (error) {
    console.error("Error revalidating in revalidate: ", error);
  }
  return {
    revalidated,
  };
}
