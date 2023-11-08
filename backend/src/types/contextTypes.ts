import { PrismaClient, Teacher } from "@prisma/client";
import { Request, Response } from "express";
import { BaseClient } from "openid-client";

export type UserInfo = Omit<Teacher, "passwordHash">;
export type UserSessionInfo = UserInfo & {
  type?: "mpass-id" | "local";
};

export type CustomContext = {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user?: UserSessionInfo;
  OIDCClient?: BaseClient;
};
