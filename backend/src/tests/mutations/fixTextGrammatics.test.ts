import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import { createTestUserAndLogin } from "../testHelpers";

const query = graphql(`
  mutation FixTextGrammatics($text: String!) {
    fixTextGrammatics(text: $text) {
      result
    }
  }
`);

describe("fixTextGrammatics", () => {
  let graphqlRequest: TestGraphQLRequest;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    await createTestUserAndLogin(graphqlRequest);
  });

  it("should successfully fix text grammatics", async () => {
    const text = "Test text with grammatical errors";
    const response = await graphqlRequest(query, { text });

    expect(response.data?.fixTextGrammatics).toBeDefined();
    expect(response.data?.fixTextGrammatics.result).toEqual("Mock response from OpenAI");
  });

  it("should handle empty text input gracefully", async () => {
    const response = await graphqlRequest(query, { text: "" });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Tekstiä ei ole annettu. Tyhjää tekstiä ei voida korjata.");
  });
});
