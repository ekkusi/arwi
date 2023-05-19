import { getSession } from "next-auth/react";

export async function getSessionClient() {
  const session = await getSession();
  if (!session) throw new Error("No session found");
  return session;
}
