import { RequestHandler } from "express";
import { Client } from "openid-client";
import { logOut } from "../utils/auth";
import { SESSION_ABSOLUTE_TIMEOUT_MS } from "../config";

export const checkAuth = (): RequestHandler => {
  return async (req, res, next) => {
    if (!req.session.userInfo) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  };
};

const TEN_MINUTES_MS = 1000 * 60 * 9 + 1000 * 55;

export const checkTokens = (client: Client): RequestHandler => {
  return async (req, res, next) => {
    const { userInfo, tokenSet } = req.session;
    if (tokenSet?.expires_at && userInfo?.type === "mpass-id") {
      const expiryDate = tokenSet.expires_at * 1000;

      const currentDate = Date.now();

      if (expiryDate < currentDate) {
        if (tokenSet.refresh_token) {
          try {
            const response = await client.refresh(tokenSet.refresh_token);
            req.session.tokenSet = {
              ...tokenSet, // Keep old token set values as base because refresh token isn't always returned from refresh
              ...response,
            };
          } catch (error) {
            console.error("Error refreshing token", error);
            await logOut(req, res);
          }
        } else {
          await logOut(req, res);
        }
      }
    }
    next();
  };
};

export const checkSessionTimeout: RequestHandler = async (req, res, next) => {
  if (req.session && req.session.createdAt) {
    const { createdAt } = req.session;

    const currentDate = Date.now();
    if (currentDate > createdAt + SESSION_ABSOLUTE_TIMEOUT_MS) {
      await logOut(req, res);
    }
  }

  next();
};
