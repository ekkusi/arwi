import { ClassParticipationEvaluation, CollectionType, DefaultEvaluation, TranslatedString } from "../types/graphql";
import { median, mode, stdev } from "./mathUtilts";

type EvaluationResult = {
  skillsMean: number;
  behaviourMean: number;
  absencesAmount: number;
  presencesAmount: number;
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
const BASE_RESULT: EvaluationResult = {
  skillsMean: 0,
  behaviourMean: 0,
  absencesAmount: 0,
  presencesAmount: 0,
};

export const analyzeEvaluations = (evaluations: EvaluationSimple[]) => {
  const result = { ...BASE_RESULT };
  const skillsArray: number[] = [];
  const behaviourArray: number[] = [];
  evaluations.forEach((evaluation) => {
    if (evaluation.skillsRating) {
      const rating = evaluation.skillsRating;
      result.skillsMean += rating;
      skillsArray.push(rating);
    }
    if (evaluation.behaviourRating) {
      const rating = evaluation.behaviourRating;
      result.behaviourMean += rating;
      behaviourArray.push(rating);
    }
    if (evaluation.wasPresent) {
      result.presencesAmount += 1;
    } else {
      result.absencesAmount += 1;
    }
  });
  result.skillsMean /= skillsArray.length;
  result.behaviourMean /= behaviourArray.length;

  return result;
};

type EvaluationResultAdvanced = EvaluationResult & {
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

const BASE_RESULT_ADVANCED: EvaluationResultAdvanced = {
  ...BASE_RESULT,
  skillsMedian: 0,
  skillsMode: 0,
  skillsStdev: 0,
  skillsEnvironmentMeans: {},
  skillsMeanByEnvironments: 0,
  behaviourMedian: 0,
  behaviourMode: 0,
  behaviourStdev: 0,
  behaviourEnvironmentMeans: {},
  behaviourMeanByEnvironments: 0,
};

export const analyzeEvaluationsAdvanced = (evaluations: Evaluation[]) => {
  const result = { ...BASE_RESULT_ADVANCED };
  const { skillsMean, behaviourMean, absencesAmount, presencesAmount } = analyzeEvaluations(evaluations);
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
  result.skillsEnvironmentMeans = skillEnvironmentMeans;
  result.behaviourEnvironmentMeans = behaviourEnvironmentMeans;
  result.skillsMean = skillsMean;
  result.behaviourMean = behaviourMean;
  result.skillsStdev = stdev(skillsArray, result.skillsMean);
  result.skillsMedian = median(skillsArray);
  result.skillsMode = mode(skillsArray);
  result.skillsMeanByEnvironments /= Object.keys(skillEnvironmentMeans).length;

  result.behaviourMedian = median(behaviourArray);
  result.behaviourMode = mode(behaviourArray);
  result.behaviourStdev = stdev(behaviourArray, result.behaviourMean);
  result.behaviourMeanByEnvironments /= Object.keys(behaviourEnvironmentMeans).length;

  return result;
};

export type MinimalDefaultEvaluation = Pick<DefaultEvaluation, "rating"> & { collection: { id: string } };

export type GradeSuggestionMeanValue =
  | number
  | {
      value: number;
      weight: number;
    };

type MinimalCollectionType = Pick<CollectionType, "id" | "category" | "weight"> & {
  defaultTypeCollection?: Maybe<{
    id: string;
  }>;
};

export const calculateGradeSuggestion = (
  skillsMean: number,
  behaviourMean: number,
  collectionTypes: MinimalCollectionType[],
  defaultTypeEvaluations: MinimalDefaultEvaluation[],
  options?: { skillsWeight: number; behaviourWeight: number }
) => {
  const { skillsWeight, behaviourWeight } = options || { skillsWeight: 0.5, behaviourWeight: 0.5 };
  // Validate the options, must sum up to 1
  if (skillsWeight + behaviourWeight !== 1) throw new Error("The sum of the weights must be 1");

  const classParticipationGrade = skillsMean * skillsWeight + behaviourMean * behaviourWeight;
  let weightSum = 0;
  let weightedRating = 0;
  collectionTypes.forEach((colType) => {
    if (colType.category === "CLASS_PARTICIPATION") {
      weightSum += colType.weight;
      weightedRating += classParticipationGrade * colType.weight;
    } else if (colType.defaultTypeCollection != null) {
      const collEvaluation = defaultTypeEvaluations.find((ev) => ev.collection.id === colType.defaultTypeCollection!.id);
      if (collEvaluation?.rating) {
        weightSum += colType.weight;
        weightedRating += colType.weight * collEvaluation.rating;
      }
    }
  });
  const gradeSuggestion = weightedRating / weightSum;
  return gradeSuggestion;
};
