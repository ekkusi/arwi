import { GraphQLError } from "graphql";

export default class ValidationError extends GraphQLError {
  constructor(m: string) {
    super(m, {
      extensions: {
        code: "VALIDATION_ERROR",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
