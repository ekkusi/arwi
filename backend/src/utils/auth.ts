import e, { Request, Response } from "express";
import { TokenSetParameters } from "openid-client";
import { COOKIE_DOMAIN, SESSION_NAME } from "../config";
import { UserInfo, UserSessionInfo } from "../types/contextTypes";

export const logOut = (req: Request, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.session?.destroy((err) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME, { domain: COOKIE_DOMAIN });
      resolve();
    });
  });
};

export const initSession = (req: Request, userInfo: UserSessionInfo, tokenSet?: TokenSetParameters) => {
  req.session.tokenSet = tokenSet;
  req.session.userInfo = userInfo;
  req.session.createdAt = Date.now();
};

const HEADER_AUTH_API_TOKENS = process.env.HEADER_AUTH_API_TOKENS?.split(",") || [];

export const isValidApiToken = (apiToken: string): boolean => {
  return HEADER_AUTH_API_TOKENS.includes(apiToken);
};

export const checkIsUserVerified = (userInfo: UserInfo): boolean => {
  if (!userInfo.email) return !!userInfo.mPassID; // In case of mPassID, we don't have email
  if (userInfo.verifiedEmails.includes(userInfo.email)) return true;
  return false;
};
