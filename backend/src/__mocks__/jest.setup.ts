import { CallbackParamsType } from "openid-client";
import { MOCK_TOKEN_SET, MOCK_USER_INFO_RESPONSE, MOCK_VALID_CODE } from "../tests/testHelpers";

jest.mock("@/prismaClient");

jest.mock("@/openAIClient", () => ({
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue({
        choices: [{ message: { content: "Mock response from OpenAI" } }],
      }),
    },
  },
}));

jest.mock("@/utils/mail", () => ({
  sendMail: jest.fn(),
}));

jest.mock("openid-client", () => {
  const originalModule = jest.requireActual("openid-client");

  // Create a mock Client class
  class MockClient {
    callback: jest.Mock<any, any, any>;

    userinfo: jest.Mock<any, any, any>;

    metadata: { redirect_uris: string[] };

    constructor() {
      this.callback = jest.fn().mockImplementation((redirectUri: string, { code }: CallbackParamsType) => {
        if (code !== MOCK_VALID_CODE) throw new Error("Invalid code");

        return Promise.resolve(MOCK_TOKEN_SET);
      });
      this.userinfo = jest.fn().mockResolvedValue(MOCK_USER_INFO_RESPONSE);

      this.metadata = {
        redirect_uris: ["http://localhost:4000/auth/mpassid-callback"],
      };
    }
  }

  return {
    __esModule: true,
    ...originalModule,
    Issuer: {
      ...originalModule.Issuer,
      discover: jest.fn().mockResolvedValue({
        Client: MockClient,
      }),
    },
  };
});
