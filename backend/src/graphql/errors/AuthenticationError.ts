import { GraphQLError } from "graphql";

export default class AuthenticationError extends GraphQLError {
  constructor(m?: string) {
    super(m || "Sinun pitää olla kirjautunut sisään tätä operaatiota varten", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
