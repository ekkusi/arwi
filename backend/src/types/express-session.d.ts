import "express-session";
import { TokenSetParameters } from "openid-client";
import { UserSessionInfo } from "./contextTypes";

declare module "express-session" {
  export interface SessionData {
    tokenSet?: TokenSetParameters;
    userInfo?: UserSessionInfo;
    createdAt?: number;
    recoveryCodeInfo?: {
      userId: string;
      codeHash: string;
      createdAt: number;
      amountsTried: number;
    };
  }
}
