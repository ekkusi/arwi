import { generateStudentSummary } from "@/utils/openAiUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  // Check for secret to confirm this is a valid request
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Invalid method" });
  }

  const { evaluations } = JSON.parse(req.body);

  if (!evaluations) {
    return res.status(400).json({ message: "No notes found on request" });
  }

  try {
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"

    const summary = await generateStudentSummary(evaluations);
    return res.json({ summary });
  } catch (err) {
    return res
      .status(500)
      .send("Unknown error with generating student summary");
  }
}
