import dotenv from "dotenv";
import createApp from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

createApp().then((app) => {
  app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}. GraphQL API can be found at /graphql.`);
  });
});
