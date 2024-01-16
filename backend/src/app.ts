import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
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

const ADVANCED_SENTRY_LOGGING = process.env.ADVANCED_SENTRY_LOGGING === "true";

if (process.env.NODE_ENV === "production" && !process.env.SENTRY_URL) throw new Error("Missing SENTRY_URL env var");

Sentry.init({
  dsn: process.env.SENTRY_URL,
  environment: process.env.NODE_ENV === "production" ? "production" : "development",
  integrations: ADVANCED_SENTRY_LOGGING
    ? [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        new ProfilingIntegration(),
      ]
    : undefined,
  // Performance Monitoring
  tracesSampleRate: ADVANCED_SENTRY_LOGGING ? 1.0 : undefined, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: ADVANCED_SENTRY_LOGGING ? 1.0 : undefined,
});

if (ADVANCED_SENTRY_LOGGING) {
  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}

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

  // To be used in tests only
  if (process.env.NODE_ENV === "test") {
    app.get("/test/reset-session", (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("Could not reset session");
        }
        res.status(200).send("Session reset");
      });
    });
  }

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

  // The Sentry error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  app.use(errorHandler);

  return app;
};

export default createApp;
