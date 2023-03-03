import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export type CustomContext = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
};
