import { createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";

import schema from "@/graphql-server";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const prismaClient = new PrismaClient();

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  context: () => {
    return {
      prisma: prismaClient,
    };
  },
});
