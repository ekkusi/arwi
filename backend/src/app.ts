import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import * as Sentry from "@sentry/node";
import { APP_ENV, HELMET_OPTIONS, SESSION_OPTIONS, getAllowedOrigins } from "./config";
import initAuth from "./routes/auth";
import { checkAuthHeaders, checkSessionTimeout, checkTokens } from "./middleware/auth";
import graphqlServer from "./graphql/server";
import { errorHandler, notFoundHandler } from "./middleware/errors";
import "express-async-errors";
import { CustomContext } from "./types/contextTypes";
import prisma from "@/prismaClient";
import loaders from "./graphql/dataLoaders";
import { getAgreements, hasAgreement } from "./utils/sanity";
import { fetchParentOids } from "./utils/organizationApi";

const app = express();

const ADVANCED_SENTRY_LOGGING = process.env.ADVANCED_SENTRY_LOGGING === "true";

if (process.env.NODE_ENV === "production" && !process.env.SENTRY_URL) throw new Error("Missing SENTRY_URL env var");

Sentry.init({
  dsn: process.env.SENTRY_URL,
  enabled: process.env.NODE_ENV === "production",
  environment: APP_ENV,
  integrations: ADVANCED_SENTRY_LOGGING
    ? [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
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

// Trust the first proxy, necessary for express-session to work behind a reverse proxy
app.set("trust proxy", 1);

app.use(helmet(HELMET_OPTIONS));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: getAllowedOrigins() }));

app.use(checkAuthHeaders);
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
