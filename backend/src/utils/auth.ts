import { Request, Response } from "express";
import { TokenSetParameters } from "openid-client";
import { SESSION_NAME } from "../config";
import { UserSessionInfo } from "../types/contextTypes";

export const logOut = (req: Request, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });
};

export const initSession = (req: Request, userInfo: UserSessionInfo, tokenSet?: TokenSetParameters) => {
  req.session.tokenSet = tokenSet;
  req.session.userInfo = userInfo;
  req.session.createdAt = Date.now();
};
