import { RequestHandler } from "express";
import { Client } from "openid-client";
import * as Sentry from "@sentry/node";
import { isValidApiToken, logOut } from "../utils/auth";
import { API_TOKEN_HEADER_NAME, SESSION_ABSOLUTE_TIMEOUT_MS, SESSION_TYPE_HEADER_NAME } from "../config";
import { teacherLoader } from "@/graphql/dataLoaders/teacher";

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

export const fetchSessionUserInfo: RequestHandler = async (req, _, next) => {
  if (req.session.userInfo) {
    try {
      const userInfo = await teacherLoader.load(req.session.userInfo.id);
      req.session.userInfo = { ...req.session.userInfo, ...userInfo };
    } catch (error) {
      console.error("No user info found for session", error);
      req.session.userInfo = undefined;
      req.session.tokenSet = undefined;
      Sentry.captureException(error);
    }
  }
  next();
};

export const checkAuthHeaders: RequestHandler = async (req, res, next) => {
  // Allow requests to pass through in development mode
  if (process.env.NODE_ENV === "development") {
    return next();
  }

  const apiToken = req.get(API_TOKEN_HEADER_NAME);
  const sessionType = req.get(SESSION_TYPE_HEADER_NAME) === "header" ? "header" : "cookie";

  if (apiToken) {
    // If the session type is set to cookie, the API token should not be used
    if (sessionType === "cookie") {
      return res.status(400).json({
        message: "Invalid request. Cannot use API token (header auth) and session cookie at the same time. Please use one or the other.",
      });
    }
    // If the session type is set to header, the API token should be valid
    if (!isValidApiToken(apiToken)) {
      return res.status(401).json({
        message: "Unauthorized. The provided API token is invalid.",
      });
    }
    // If the session type is header and the API token should be set
  } else if (sessionType === "header") {
    return res.status(401).json({
      message: `Unauthorized. An API token is required for header auth. Please set the ${API_TOKEN_HEADER_NAME} header with a valid API token or switch to cookie based auth by removing ${SESSION_TYPE_HEADER_NAME} header (or setting it to 'cookie').`,
    });
  }

  next();
};
