import { GraphQLError } from "graphql";

export default class AuthenticationError extends GraphQLError {
  constructor(code: "UNAUTHENTICATED" | "EMAIL_NOT_VERIFIED" = "UNAUTHENTICATED", m?: string) {
    const defaultMessage =
      code === "UNAUTHENTICATED" ? "Sinun pitää olla kirjautunut sisään tätä operaatiota varten" : "Sähköpostisi ei ole vahvistettu";
    super(m || defaultMessage, {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
