import { Feedback } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";

// Defining a type for the compound key
type FeedbackKey = {
  studentId: string;
  moduleId: string;
};

// Utility function to serialize FeedbackKey for caching
const serializeFeedbackKey = (key: FeedbackKey): string => `${key.studentId}-${key.moduleId}`;

// CustomDataLoader is similar to DataLoader but might have some custom handling, adjust as needed.
export const feedbacksLoader = new CustomDataLoader<FeedbackKey, Feedback[], string>(
  async (keys) => {
    // Convert the array of compound keys into separate lists of studentIds and moduleIds
    const studentIds = keys.map((key) => key.studentId);
    const moduleIds = keys.map((key) => key.moduleId);

    // Fetch all feedbacks that match any of the studentId and moduleId pairs
    const feedbacks = await prisma.feedback.findMany({
      where: {
        AND: [{ studentId: { in: studentIds } }, { moduleId: { in: moduleIds } }],
      },
      orderBy: {
        createdAt: "desc", // Assumes you want the latest feedback
      },
    });

    // Map feedbacks to their corresponding (studentId, moduleId) pair
    const feedbackMap: Record<string, Feedback[]> = {};
    feedbacks.forEach((feedback) => {
      const key = serializeFeedbackKey({ studentId: feedback.studentId, moduleId: feedback.moduleId });
      if (!feedbackMap[key]) {
        feedbackMap[key] = [];
      }
      feedbackMap[key].push(feedback);
    });

    // Return the feedbacks in the same order as the keys
    return keys.map((key) => feedbackMap[serializeFeedbackKey(key)] || []);
  },
  {
    cacheKeyFn: serializeFeedbackKey, // Use the serialize function for cache keys
  }
);

export default {
  feedbacksLoader,
};
