type SessionData = {
  user: { email: string; name: string; id: string };
  expires: string;
};

export async function getSession(cookie: string): Promise<SessionData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();
  return Object.keys(session).length > 0 ? session : null;
}

export async function signOut(cookie?: string): Promise<any> {
  const headers: HeadersInit = {};
  if (cookie) headers.cookie = cookie;
  const csrfResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/csrf`,
    {
      headers,
    }
  );
  let csrfToken;
  try {
    const json = await csrfResponse.json();
    csrfToken = json.csrfToken;
  } catch (error) {
    throw new Error("CSRF TOKEN FETCH ERROR");
  }

  const formData = new FormData();
  formData.append("csrfToken", csrfToken);
  formData.append("json", "true");
  formData.append("callbackUrl", "/auth/login");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`,
    {
      method: "GET",
      body: formData,
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response;
}
