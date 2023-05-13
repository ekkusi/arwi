import { NextApiResponse } from "next";

export default async function revalidateIfProd(res: NextApiResponse, path: string) {
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

export const revalidateGroupData = async (res: NextApiResponse, id: string) => {
  const promises = [];
  promises.push(revalidateIfProd(res, `/group/${id}`));
  promises.push(revalidateIfProd(res, `/group/${id}/edit`));
  promises.push(revalidateIfProd(res, `/group/${id}/create-collection`));
  return Promise.all(promises);
};

export const revalidateStudentData = async (res: NextApiResponse, id: string) => {
  const promises = [];
  promises.push(revalidateIfProd(res, `/student/${id}`));
  return Promise.all(promises);
};

export const revalidateCollectionData = async (res: NextApiResponse, id: string) => {
  const promises = [];
  promises.push(revalidateIfProd(res, `/collection/${id}`));
  promises.push(revalidateIfProd(res, `/collection/${id}/edit`));
  promises.push(revalidateIfProd(res, `/collection/${id}/edit-evaluations`));
  return Promise.all(promises);
};
