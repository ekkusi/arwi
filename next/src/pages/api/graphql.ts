import { createYoga, YogaServerOptions } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";

import schema from "@/graphql-server";
import prisma from "@/graphql-server/prismaClient";
import { CustomContext } from "@/graphql-server/types/contextTypes";
import { ADMIN_USER } from "@/config";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export type ServerContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const options: YogaServerOptions<ServerContext, CustomContext> = {
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  context: async ({ req, res }) => {
    // const session = await getServerSession(req, res, authOptions);

    return {
      prisma,
      req,
      res,
      user: ADMIN_USER,
    };
  },
  logging: "debug",
};

const yoga = createYoga<ServerContext, CustomContext>(options);

export default yoga;
