import { PrismaClient, Teacher } from "@prisma/client";
import { Request, Response } from "express";

export type UserInfo = Omit<Teacher, "passwordHash">;

export type CustomContext = {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user?: UserInfo;
};
