/* eslint-disable import/newline-after-import  */
/* eslint-disable import/first  */
// Set up paths for built JS code. Has to be done manually because of monorepo
// NOTE: These need to be updated in case of new aliases are added to tsconfig.json
import moduleAlias from "module-alias";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.TS_NODE_DEV) moduleAlias.addAlias("@", path.join(__dirname, "..", "lib"));

import createApp from "./app";

if (!process.env.APP_VERSION)
  throw new Error("Something went wrong, APP_VERSION env var is not set. This should come automatically from package.json version.");

const PORT = process.env.PORT || 4000;
const APP_ENV = process.env.APP_ENV || "development";

createApp().then((app) => {
  app.listen(PORT, () => {
    console.info(
      `Started version ${process.env.APP_VERSION} of Arwi backend. Running on ${APP_ENV} environment. Listening on port ${PORT}. GraphQL API can be found at /graphql.`
    );
  });
});
