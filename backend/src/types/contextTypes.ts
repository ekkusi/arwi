import { PrismaClient, Teacher } from "@prisma/client";
import { Request, Response } from "express";
import { BaseClient } from "openid-client";
import loaders from "../graphql/dataLoaders";

export type UserInfo = Omit<Teacher, "passwordHash" | "passwordResetTries" | "passwordResetStartedAt" | "monthlyTokensUsed">;
export type UserSessionInfo = UserInfo & {
  type: "mpass-id" | "local";
};

export type CustomContext = {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  dataLoaders: typeof loaders;
  user?: UserSessionInfo;
  OIDCClient?: BaseClient;
};
