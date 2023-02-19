import { headers } from "next/headers";

type SessionData = {
  user: { email: string; name: string; id: string };
  expires: string;
};

export async function getSession(): Promise<SessionData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`,
    {
      headers: {
        cookie: headers().get("cookie") ?? "",
      },
    }
  );

  const session = await response.json();
  return Object.keys(session).length > 0 ? session : null;
}
