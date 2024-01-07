/* eslint-disable import/newline-after-import  */
/* eslint-disable import/first  */
// Set up paths for built JS code. Has to be done manually because of monorepo
// NOTE: These need to be updated in case of new aliases are added to tsconfig.json
import moduleAlias from "module-alias";
import path from "path";
moduleAlias.addAlias("@", path.join(__dirname, "..", "lib"));

import dotenv from "dotenv";
import createApp from "./app";

dotenv.config();

if (!process.env.APP_VERSION)
  throw new Error("Something went wrong, APP_VERSION env var is not set. This should come automatically from package.json version.");

const PORT = process.env.PORT || 4000;

createApp().then((app) => {
  app.listen(PORT, () => {
    console.info(`Started version ${process.env.APP_VERSION} of Arwi backend. Listening on port ${PORT}. GraphQL API can be found at /graphql.`);
  });
});
