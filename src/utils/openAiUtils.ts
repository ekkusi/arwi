import openAIClient from "@/openAIClient";

export async function generateStudentSummary(
  notes: string[] | string,
  length: number = 50
) {
  const startMessage =
    "Seuraavat rivit ovat muistiinpanoja opettajan huomioista erään oppilaan työskentelystä eri tunneilla:\n\n";
  const notesJoined = Array.isArray(notes) ? notes.join("\n") : notes;
  const endMessage = `\n\nKirjoita oppilaalle noin ${length} sanan pituinen palaute näiden muistiinpanojen pohjalta`;
  const prompt = startMessage + notesJoined + endMessage;

  try {
    const completion = await openAIClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    if (completion.data.choices[0]?.message?.content) {
      return completion.data.choices[0].message.content;
    }
    throw new Error(`Error with generateSumamry: no message found from result`);
  } catch (error: any) {
    console.error("error", error?.response?.data);
    throw new Error(`Unknown error: ${error?.response?.data?.error}` || "");
  }
}
