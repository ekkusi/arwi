import { GraphQLError } from "graphql";

export default class OpenIDError extends GraphQLError {
  constructor(m?: string) {
    super(m || "Something went wrong with OpenID authentication.", {
      extensions: {
        code: "OPENID_ERROR",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, OpenIDError.prototype);
  }
}
