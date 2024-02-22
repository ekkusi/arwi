import { GraphQLError } from "graphql";

export default class AuthorizationError extends GraphQLError {
  constructor(m?: string) {
    super(m || "Sinulla ei ole oikeuksia haettuun resurssiin", {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
