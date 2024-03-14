import { GraphQLError } from "graphql";

export default class OpenAIGraphQLError extends GraphQLError {
  constructor(m?: string) {
    super(m || "Something went wrong with OpenAI API.", {
      extensions: {
        code: "OPENAI_ERROR",
      },
    });

    // Set the prototype explicitly. Because of some TS issue.
    Object.setPrototypeOf(this, OpenAIGraphQLError.prototype);
  }
}
