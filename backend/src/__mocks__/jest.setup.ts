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
// jest.mock("../../prismaClient");
// jest.mock("../../../prismaClient");
// jest.mock("../../../../prismaClient");
