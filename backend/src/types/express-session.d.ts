import { SessionOptions as ExpressSessionOptions } from "express-session";
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
  export interface SessionOptions extends ExpressSessionOptions {
    headerName?: string;
    typeHeaderName?: string;
  }
}
