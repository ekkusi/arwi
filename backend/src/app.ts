import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { SESSION_OPTIONS } from "./config";
import initAuth from "./routes/auth";
import { checkSessionTimeout, checkTokens } from "./middleware/auth";
import prisma from "./prismaClient";
import graphqlServer from "./graphql/server";
import { errorHandler, notFoundHandler } from "./middleware/errors";
import "express-async-errors";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// TODO: Configure redis (or other) session store
app.use(session(SESSION_OPTIONS));
app.use(checkSessionTimeout);

const createApp = async () => {
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
          prisma,
          user,
          req,
          res,
          OIDCClient,
        };
      },
    })
  );

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};

export default createApp;
