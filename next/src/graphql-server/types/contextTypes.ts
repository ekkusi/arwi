import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export type CustomContext = {
  prisma: PrismaClient;
  req?: NextApiRequest;
  res?: NextApiResponse;
  user?: Session["user"];
};
