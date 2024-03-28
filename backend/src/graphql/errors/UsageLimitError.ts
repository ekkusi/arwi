import { GraphQLError } from "graphql";

export default class UsageLimitError extends GraphQLError {
  constructor(m?: string) {
    super(m || "Olet ylittänyt käyttörajasi kyseiselle toiminnolle.", {
      extensions: {
        code: "USAGE_LIMIT_EXCEEDED",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, UsageLimitError.prototype);
  }
}
