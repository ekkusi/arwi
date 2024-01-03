import { TranslatedString } from "arwi-backend/src/types";
import { median, mode, stdev } from "./mathUtilts";
import { ClassParticipationEvaluation } from "../gql/graphql";

type EvaluationResultSimple = {
  skillsAverage: number;
  behaviourAverage: number;
  absencesAmount: number;
  presencesAmount: number;
  gradeSuggestion: number;
  isStellarCount: number;
};

type EvaluationResult = EvaluationResultSimple & {
  skillsMedian: number;
  skillsMode: number;
  skillsStdev: number;
  skillsEnvironmentMeans: { [id: string]: number };
  skillsMeanByEnvironments: number;
  behaviourMedian: number;
  behaviourMode: number;
  behaviourStdev: number;
  behaviourEnvironmentMeans: { [id: string]: number };
  behaviourMeanByEnvironments: number;
};

type EvaluationSimple = Pick<ClassParticipationEvaluation, "skillsRating" | "behaviourRating" | "wasPresent">;

type Evaluation = EvaluationSimple & {
  collection: {
    id: string;
    environment: {
      code: string;
      label: TranslatedString;
    };
  };
};
export const analyzeEvaluationsSimple = (evaluations: EvaluationSimple[]) => {
  const result: EvaluationResultSimple = {
    skillsAverage: 0,
    behaviourAverage: 0,
    absencesAmount: 0,
    presencesAmount: 0,
    gradeSuggestion: 0,
    isStellarCount: 0,
  };
  const skillsArray: number[] = [];
  const behaviourArray: number[] = [];
  evaluations.forEach((evaluation) => {
    if (evaluation.skillsRating) {
      const rating = evaluation.skillsRating;
      result.skillsAverage += rating;
      skillsArray.push(rating);
    }
    if (evaluation.behaviourRating) {
      const rating = evaluation.behaviourRating;
      result.behaviourAverage += rating;
      behaviourArray.push(rating);
    }
    if (evaluation.wasPresent) {
      result.presencesAmount += 1;
    } else {
      result.absencesAmount += 1;
    }
  });
  result.skillsAverage /= skillsArray.length;
  result.behaviourAverage /= behaviourArray.length;

  if (result.behaviourAverage > 0 && result.skillsAverage > 0)
    result.gradeSuggestion = Math.round((result.behaviourAverage + result.skillsAverage) / 2);
  return result;
};

export const parseFloatToGradeString = (number: number) => {
  const base = Math.floor(number + 0.25);
  const remainder = number - base;
  let suffix = "";
  if (remainder < 0) {
    suffix = "-";
  } else if (remainder > 0 && remainder < 0.5) {
    suffix = "+";
  } else if (remainder >= 0.5 && remainder < 0.75) {
    suffix = "½";
  }
  return `${base.toString()}${suffix}`;
};

export const analyzeEvaluations = (evaluations: Evaluation[]) => {
  const result: EvaluationResult = {
    skillsAverage: 0,
    skillsStdev: 0,
    skillsMedian: 0,
    skillsMode: 0,
    skillsEnvironmentMeans: {},
    skillsMeanByEnvironments: 0,
    behaviourAverage: 0,
    behaviourMedian: 0,
    behaviourMode: 0,
    behaviourStdev: 0,
    behaviourEnvironmentMeans: {},
    behaviourMeanByEnvironments: 0,
    absencesAmount: 0,
    presencesAmount: 0,
    gradeSuggestion: 0,
    isStellarCount: 0,
  };
  const { skillsAverage, behaviourAverage, absencesAmount, presencesAmount, isStellarCount } = analyzeEvaluationsSimple(evaluations);
  const skillsArray: number[] = [];
  const behaviourArray: number[] = [];
  const skillEnvironmentSums: { [id: string]: number } = {};
  const skillEnvironmentCounts: { [id: string]: number } = {};
  const skillEnvironmentMeans: { [id: string]: number } = {};
  const behaviourEnvironmentSums: { [id: string]: number } = {};
  const behaviourEnvironmentCounts: { [id: string]: number } = {};
  const behaviourEnvironmentMeans: { [id: string]: number } = {};
  evaluations.forEach((evaluation) => {
    const envCode = evaluation.collection.environment.code;
    if (evaluation.skillsRating) {
      const rating = evaluation.skillsRating;
      skillsArray.push(rating);
      if (skillEnvironmentSums[envCode]) skillEnvironmentSums[envCode] += rating;
      else skillEnvironmentSums[envCode] = rating;
      if (skillEnvironmentCounts[envCode]) skillEnvironmentCounts[envCode] += 1;
      else skillEnvironmentCounts[envCode] = 1;
    }
    if (evaluation.behaviourRating) {
      const rating = evaluation.behaviourRating;
      behaviourArray.push(rating);
      if (behaviourEnvironmentSums[envCode]) behaviourEnvironmentSums[envCode] += rating;
      else behaviourEnvironmentSums[envCode] = rating;
      if (behaviourEnvironmentCounts[envCode]) behaviourEnvironmentCounts[envCode] += 1;
      else behaviourEnvironmentCounts[envCode] = 1;
    }
  });
  Object.keys(skillEnvironmentSums).forEach((key) => {
    const environmentMean = skillEnvironmentSums[key] / skillEnvironmentCounts[key];
    skillEnvironmentMeans[key] = environmentMean;
    result.skillsMeanByEnvironments += environmentMean;
  });
  Object.keys(behaviourEnvironmentSums).forEach((key) => {
    const environmentMean = behaviourEnvironmentSums[key] / behaviourEnvironmentCounts[key];
    behaviourEnvironmentMeans[key] = environmentMean;
    result.behaviourMeanByEnvironments += environmentMean;
  });
  result.absencesAmount = absencesAmount;
  result.presencesAmount = presencesAmount;
  result.isStellarCount = isStellarCount;
  result.skillsEnvironmentMeans = skillEnvironmentMeans;
  result.behaviourEnvironmentMeans = behaviourEnvironmentMeans;
  result.skillsAverage = skillsAverage;
  result.behaviourAverage = behaviourAverage;
  result.skillsStdev = stdev(skillsArray, result.skillsAverage);
  result.skillsMedian = median(skillsArray);
  result.skillsMode = mode(skillsArray);
  result.skillsMeanByEnvironments /= Object.keys(skillEnvironmentMeans).length;

  result.behaviourMedian = median(behaviourArray);
  result.behaviourMode = mode(behaviourArray);
  result.behaviourStdev = stdev(behaviourArray, result.behaviourAverage);
  result.behaviourMeanByEnvironments /= Object.keys(behaviourEnvironmentMeans).length;
  if (result.behaviourAverage > 0 && result.skillsAverage > 0)
    result.gradeSuggestion = Math.round((result.behaviourAverage + result.skillsAverage) / 2);
  return result;
};
