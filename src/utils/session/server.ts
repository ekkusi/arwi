import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getSessionOrRedirect(redirectUrl = "/login") {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(redirectUrl);
  }

  return session;
}
