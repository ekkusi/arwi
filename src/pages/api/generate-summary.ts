import { generateStudentSummary } from "@/utils/openAiUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Invalid method" });
  }

  const { notes, summaryLength: _summaryLength } = JSON.parse(req.body);

  if (!notes) {
    return res.status(400).json({ message: "No notes found on request" });
  }

  const summaryLength = Number(_summaryLength) || 50;

  try {
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"

    const summary = await generateStudentSummary(notes, summaryLength);
    return res.json({ summary });
  } catch (err) {
    return res
      .status(500)
      .send("Unknown error with generating student summary");
  }
}
