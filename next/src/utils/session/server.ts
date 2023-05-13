import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getSessionOrRedirect(context?: GetServerSidePropsContext, redirectUrl = "/login") {
  let session;
  if (context) session = await getServerSession(context.req, context.res, authOptions);
  else session = await getServerSession(authOptions);

  if (!session) {
    redirect(redirectUrl);
  }

  return session;
}
