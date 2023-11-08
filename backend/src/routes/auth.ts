import { Request, Router } from "express";
import dotenv from "dotenv";
import { Issuer, Client as OpenIDClient } from "openid-client";
import { initSession, logOut } from "../utils/auth";
import prisma from "../prismaClient";
import BadRequestError from "../errors/BadRequestError";
import { checkAuth } from "../middleware/auth";

dotenv.config();

const router = Router();

const { MPASSID_CLIENT_SECRET, MPASSID_CLIENT_ID } = process.env;
const MPASSID_ISSUER_URL = "https://mpass-proxy-test.csc.fi";

if (!MPASSID_CLIENT_SECRET || !MPASSID_CLIENT_ID) {
  if (process.env.NODE_ENV === "production") throw new Error("MPASSID_CLIENT_SECRET or MPASSID_CLIENT_ID is missing from environment variables");
  else console.warn("MPASSID_CLIENT_SECRET or MPASSID_CLIENT_ID is missing from environment variables, MPassID auth will not work");
}

type AuthorizeParams = {
  redirect_uri?: string;
  type?: "code_only" | "full_auth";
};

// const code_verifier = generators.codeVerifier();
// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
// it should be httpOnly (not readable by javascript) and encrypted.

// const code_challenge = generators.codeChallenge(code_verifier);

export const grantToken = async (client: OpenIDClient, code: string) => {
  const redirectUri = client.metadata.redirect_uris?.[0];
  if (!redirectUri) throw new Error("Something went wrong, redirect uri is missing");
  let tokenSet;
  try {
    tokenSet = await client.callback(redirectUri, { code });
  } catch (error) {
    console.error(error);
  }
  // const tokenSet = await client.callback(redirectUri, { code });

  if (!tokenSet?.access_token) throw new Error("Something went wrong, access_token not found from token set");
  const userInfo = await client.userinfo(tokenSet.access_token);

  return {
    tokenSet,
    userInfo,
  };
};

export const grantAndInitSession = async (client: OpenIDClient, code: string, req: Request) => {
  const { tokenSet, userInfo } = await grantToken(client, code);
  let user = await prisma.teacher.findFirst({
    where: {
      mPassID: userInfo.sub,
    },
  });
  const isNewUser = !user;
  if (!user) {
    user = await prisma.teacher.create({
      data: {
        mPassID: userInfo.sub,
      },
    });
  }
  initSession(req, { ...user, type: "mpass-id" }, tokenSet);
  return {
    isNewUser,
    tokenSet,
    user,
  };
};

const initAuth = async () => {
  const mPassIDIssuer = await Issuer.discover(MPASSID_ISSUER_URL);

  let client: OpenIDClient | null = null;

  if (MPASSID_CLIENT_ID && MPASSID_CLIENT_SECRET) {
    client = new mPassIDIssuer.Client({
      client_id: MPASSID_CLIENT_ID,
      client_secret: MPASSID_CLIENT_SECRET,
      token_endpoint_auth_method: "client_secret_basic",
      redirect_uris: ["http://localhost:4000/auth/mpassid-callback"],
      response_types: ["code"],
    });
  }
  // const googleIssuer = await Issuer.discover("https://accounts.google.com");
  // const client = new googleIssuer.Client({
  //   client_id: GOOGLE_CLIENT_ID,
  //   client_secret: GOOGLE_CLIENT_SECRET,
  //   redirect_uris: ["http://localhost:4000/auth/mpassid-callback"],
  //   response_types: ["code"],
  // });

  router.use("/mpassid-callback", async (req, res) => {
    if (!client) throw new Error("Something went wrong, OIDC client is not initialized");

    const params = client.callbackParams(req);

    if (!params.code) throw new Error("Something went wrong in auth callback, no code found");

    const { redirect_uri, type = "full_auth" }: AuthorizeParams = JSON.parse(decodeURIComponent(params.state as string));
    const redirectUri = redirect_uri;
    if (!redirectUri) throw new Error("Something went wrong, no app_redirect_uri found from state in auth callback");
    // If only_code is true, we only redirect with the code without running token grant
    if (type === "code_only") {
      return res.redirect(`${redirectUri}?code=${encodeURIComponent(params.code)}`);
    }
    const { isNewUser } = await grantAndInitSession(client, params.code, req);
    return res.redirect(`${redirectUri}?new_user=${encodeURIComponent(isNewUser)}`);
  });

  // router.use("/mpassid-login", async (req, res) => {
  //   console.log("MPASSID_LOGIN");
  //   console.log("Sessino id", req.sessionID);

  //   if (!client) throw new Error("Something went wrong, OIDC client is not initialized");

  //   if (!req.query.code) throw new BadRequestError("Query parameter code is missing from login request");
  //   const code = decodeURIComponent(req.query.code as string);

  //   const { isNewUser } = await grantAndInitSession(client, code, req);
  //   return res.send({ msg: "Login successful!", new_user: isNewUser }).json();
  // });

  // router.use("/mpassid-connect", checkAuth, async (req, res) => {
  //   if (!client) throw new Error("Something went wrong, OIDC client is not initialized");
  //   let user = req.session.userInfo!; // checkAuth middleware ensures that user is not null
  //   if (user.mPassID) throw new BadRequestError("User is already connected to mpass-id");
  //   if (!req.query.code) throw new BadRequestError("Query parameter code is missing from connect request");
  //   const code = decodeURIComponent(req.query.code as string);
  //   const { userInfo } = await grantToken(client, code);
  //   user = req.session.userInfo!;
  //   if (!user.mPassID) throw new Error("Something went wrong, mpass-id not found from user");
  //   const matchingUser = await prisma.teacher.findFirst({ where: { mPassID: user.mPassID } });
  //   if (matchingUser) throw new BadRequestError("MPassID is already connected to another user");
  //   await prisma.teacher.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       mPassID: user.mPassID,
  //     },
  //   });
  //   return res.json({ msg: "MPassID connected successfully!" });
  // });

  router.use("/authorize", async (req, res) => {
    console.log("MPASSID authorize");
    console.log("Session id", req.sessionID);

    if (!client) throw new Error("Something went wrong, OIDC client is not initialized");

    const { query } = req;

    if (!query.redirect_uri) throw new BadRequestError("Query parameter redirect_uri is missing from authorize request");

    const redirectUri = client.metadata.redirect_uris?.[0];
    if (!redirectUri) throw new Error("Something went wrong, redirect uri is missing");

    const result = client.authorizationUrl({
      scope: "openid profile",
      redirect_uri: redirectUri,
      state: encodeURIComponent(JSON.stringify(query)),
    });

    return res.redirect(result);
  });

  router.use("/logout", async (req, res) => {
    await logOut(req, res);
    const { redirect_uri } = req.query;
    if (redirect_uri) return res.redirect(redirect_uri as string);
    return res.json({ msg: "Logout succesful!" });
  });

  return {
    router,
    OIDCClient: client,
  };
};

export default initAuth;
