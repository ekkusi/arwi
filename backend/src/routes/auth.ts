import { Request, Router } from "express";
import dotenv from "dotenv";
import { Issuer, Client as OpenIDClient, UserinfoResponse } from "openid-client";
import { initSession, logOut } from "../utils/auth";
import prisma from "@/prismaClient";
import BadRequestError from "../errors/BadRequestError";
import { APP_ENV } from "../config";
import { hasAgreement } from "@/utils/sanity";
import { fetchParentOids } from "@/utils/organizationApi";
import UnauthorizedError from "@/errors/UnauthorizedError";

dotenv.config();

const router = Router();

const { MPASSID_CLIENT_SECRET, MPASSID_CLIENT_ID, NODE_ENV } = process.env;
const MPASSID_ISSUER_URL = NODE_ENV === "production" ? "https://mpass-proxy.csc.fi" : "https://mpass-proxy-test.csc.fi";

if (!MPASSID_CLIENT_SECRET || !MPASSID_CLIENT_ID) {
  if (APP_ENV === "production") throw new Error("MPASSID_CLIENT_SECRET or MPASSID_CLIENT_ID is missing from environment variables");
  else console.warn("MPASSID_CLIENT_SECRET or MPASSID_CLIENT_ID is missing from environment variables, MPassID auth will not work");
}

type AuthorizeParams = {
  redirect_uri?: string;
  type?: "code_only" | "full_auth";
};

export type MPassIDResponseFields = {
  "urn:oid:1.3.6.1.4.1.16161.1.1.27"?: string;
  "urn:mpass.id:schoolInfo"?: string[];
};

export type MpassIDUserInfo = UserinfoResponse<{
  "urn:oid:1.3.6.1.4.1.16161.1.1.27"?: string;
  "urn:mpass.id:schoolInfo"?: string[];
}>;

const parseOrganizationId = (userInfo: MpassIDUserInfo) => {
  const organizationString = userInfo?.["urn:mpass.id:schoolInfo"]?.[1];
  const oid = organizationString?.split(";")[0];
  return oid;
};

export const grantToken = async (client: OpenIDClient, code: string) => {
  const redirectUri = client.metadata.redirect_uris?.[0];

  if (!redirectUri) throw new Error("Something went wrong, redirect uri is missing");
  const tokenSet = await client.callback(redirectUri, { code });

  if (!tokenSet?.access_token) throw new Error("Something went wrong, access_token not found from token set");
  const userInfo = await client.userinfo<MPassIDResponseFields>(tokenSet.access_token);

  const mPassID = userInfo["urn:oid:1.3.6.1.4.1.16161.1.1.27"];
  const organizationID = parseOrganizationId(userInfo);
  if (!mPassID || !organizationID) throw new Error("Something went wrong, mPassID or organizationID is missing from MPassID response");
  // Skip authorization check in development
  if (NODE_ENV !== "development") {
    const isAuthorized = await checkIsAuthorized(organizationID);
    if (!isAuthorized)
      throw new UnauthorizedError(
        "Koulullasi tai kunnallasi ei ole vielä sopimusta Arwin kanssa MPassID-palvelun käytöstä, joten sen kautta kirjautuminen ei valitettavasti vielä ole tunnuksillasi mahdollista. Mikäli haluaisit MPassID-kirjautumisen käyttöön, voit kehottaa koulusi tai kuntasi vastaavan olemaan yhteydessä meihin info@arwi.fi. \n\nSillä välin voit luoda omat tunnukset ja käyttää Arwia normaalisesti. Voit myöhemmin linkittää tilisi ja tietosi MPassID:n tunnuksiin, kun MPassID-kirjautuminen on saatavilla koulullesi."
      );
  }

  return {
    tokenSet,
    userInfo: {
      ...userInfo,
      mPassID,
      organizationID,
    },
  };
};

export const checkIsAuthorized = async (oid: string) => {
  const parentOids = await fetchParentOids(oid);
  const isAuthorized = await hasAgreement(parentOids);
  return isAuthorized;
};

export const grantAndInitSession = async (client: OpenIDClient, code: string, req: Request) => {
  const { tokenSet, userInfo } = await grantToken(client, code);
  let user = await prisma.teacher.findFirst({
    where: {
      mPassID: userInfo.mPassID,
    },
  });
  const isNewUser = !user;
  if (!user) {
    user = await prisma.teacher.create({
      data: {
        mPassID: userInfo.mPassID,
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

const getRedirectUri = () => {
  const redirectPath = "/auth/mpassid-callback";
  switch (APP_ENV) {
    case "production":
      return `https://api.arwi.fi${redirectPath}`;
    case "staging":
      return `https://staging-api.arwi.fi${redirectPath}`;
    default:
      return `http://localhost:4000${redirectPath}`;
  }
};

const initAuth = async () => {
  const mPassIDIssuer = await Issuer.discover(MPASSID_ISSUER_URL);

  let client: OpenIDClient | undefined;

  if (MPASSID_CLIENT_ID && MPASSID_CLIENT_SECRET) {
    client = new mPassIDIssuer.Client({
      client_id: MPASSID_CLIENT_ID,
      client_secret: MPASSID_CLIENT_SECRET,
      token_endpoint_auth_method: NODE_ENV === "production" ? "client_secret_basic" : "client_secret_post",
      redirect_uris: [getRedirectUri()],
      response_types: ["code"],
    });
  }

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

  router.use("/authorize", async (req, res) => {
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
