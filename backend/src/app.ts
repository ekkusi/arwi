import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { HELMET_OPTIONS, SESSION_OPTIONS } from "./config";
import initAuth from "./routes/auth";
import { checkSessionTimeout, checkTokens } from "./middleware/auth";
import graphqlServer from "./graphql/server";
import { errorHandler, notFoundHandler } from "./middleware/errors";
import "express-async-errors";
import { CustomContext } from "./types/contextTypes";
import prisma from "@/prismaClient";
import loaders from "./graphql/dataLoaders";

const app = express();

app.use(helmet(HELMET_OPTIONS));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// TODO: Configure redis (or other) session store
app.use(session(SESSION_OPTIONS));
app.use(checkSessionTimeout);

const createApp = async (contextOverrides?: Partial<CustomContext>) => {
  const { router, OIDCClient } = await initAuth();

  if (OIDCClient) app.use(checkTokens(OIDCClient));

  app.use("/auth", router);

  app.get("/", (_, res) => {
    res.send("Welcome to the Arwi API! Head to /graphql for the main GraphQL API.");
  });

  // Must be called before setting graphql middleware
  await graphqlServer.start();

  app.use(
    "/graphql",
    json(),
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        // const authHeader = req.headers.authorization || "";
        // const user = parseAndVerifyToken(authHeader);
        const user = req.session?.userInfo;
        return {
          prisma: contextOverrides?.prisma || prisma,
          user: contextOverrides?.user || user,
          dataLoaders: loaders,
          req: contextOverrides?.req || req,
          res: contextOverrides?.res || res,
          OIDCClient: contextOverrides?.OIDCClient || OIDCClient,
        };
      },
    })
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
