import { Evaluation as BaseEvaluation } from "../gql/graphql";
import { formatRatingNumber } from "./dataMappers";
import { median, mode, stdev } from "./mathUtilts";

type EvaluationResult = {
  skillsAverage: number;
  skillsMedian: number;
  skillsMode: number;
  skillsStdev: number;
  behaviourAverage: number;
  behaviourMedian: number;
  behaviourMode: number;
  behaviourStdev: number;
  absencesAmount: number;
  presencesAmount: number;
  gradeSuggestion: number;
  isStellarCount: number;
};

type Evaluation = Pick<BaseEvaluation, "skillsRating" | "behaviourRating" | "wasPresent" | "isStellar">;

export const analyzeEvaluations = (evaluations: Evaluation[]) => {
  const result: EvaluationResult = {
    skillsAverage: 0,
    skillsStdev: 0,
    skillsMedian: 0,
    skillsMode: 0,
    behaviourAverage: 0,
    behaviourMedian: 0,
    behaviourMode: 0,
    behaviourStdev: 0,
    absencesAmount: 0,
    presencesAmount: 0,
    gradeSuggestion: 0,
    isStellarCount: 0,
  };
  const skillsArray: number[] = [];
  const behaviourArray: number[] = [];
  const skillEnvironmentMeans: { [id: string]: number } = {};
  evaluations.forEach((evaluation) => {
    if (evaluation.skillsRating) {
      const rating = formatRatingNumber(evaluation.skillsRating);
      result.skillsAverage += rating;
      skillsArray.push(rating);
    }
    if (evaluation.behaviourRating) {
      const rating = formatRatingNumber(evaluation.behaviourRating);
      result.behaviourAverage += rating;
      behaviourArray.push(rating);
    }
    if (evaluation.wasPresent) {
      result.presencesAmount += 1;
    } else {
      result.absencesAmount += 1;
    }
    if (evaluation.isStellar) {
      result.isStellarCount += 1;
    }
  });
  result.skillsAverage /= skillsArray.length;
  result.behaviourAverage /= behaviourArray.length;
  result.skillsStdev = stdev(skillsArray, result.skillsAverage);
  result.skillsMedian = median(skillsArray);
  result.skillsMode = mode(skillsArray);
  result.behaviourMedian = median(behaviourArray);
  result.behaviourMode = mode(behaviourArray);
  result.behaviourStdev = stdev(behaviourArray, result.behaviourAverage);
  if (result.behaviourAverage > 0 && result.skillsAverage > 0)
    result.gradeSuggestion = Math.round((result.behaviourAverage + result.skillsAverage) / 2);
  return result;
};
