import {
  ClassParticipationCollection,
  ClassParticipationEvaluation,
  CollectionTypeCategory,
  DefaultCollection,
  DefaultEvaluation,
  EducationLevel,
  LearningObjectiveType,
  TokenUseWarning,
} from "./generated";

type CollectionOnlyTypename = Pick<ClassParticipationCollection | DefaultCollection, "__typename">;

export function isClassParticipationCollection<T extends CollectionOnlyTypename>(collection: CollectionOnlyTypename): collection is T {
  // eslint-disable-next-line no-underscore-dangle
  return collection.__typename === "ClassParticipationCollection";
}

export function isDefaultCollection<T extends CollectionOnlyTypename>(collection: CollectionOnlyTypename): collection is T {
  // eslint-disable-next-line no-underscore-dangle
  return collection.__typename === "DefaultCollection";
}

type EvaluationOnlyTypename = Pick<ClassParticipationEvaluation | DefaultEvaluation, "__typename">;

export function isClassParticipationEvaluation<T extends EvaluationOnlyTypename>(evaluation: EvaluationOnlyTypename): evaluation is T {
  // eslint-disable-next-line no-underscore-dangle
  return evaluation.__typename === "ClassParticipationEvaluation";
}

export function isDefaultEvaluation<T extends EvaluationOnlyTypename>(evaluation: EvaluationOnlyTypename): evaluation is T {
  // eslint-disable-next-line no-underscore-dangle
  return evaluation.__typename === "DefaultEvaluation";
}

export function hasRequiredField<T, K extends keyof T>(obj: T, field: K): obj is T & Required<Pick<T, K>> {
  return obj[field] !== undefined && obj[field] !== null;
}

type ValidateEducationLevel<A extends readonly EducationLevel[]> = EducationLevel extends A[number] ? A : never;

export function checkEducationLevelCoverage<A extends readonly EducationLevel[]>(a: ValidateEducationLevel<A>): A {
  return a;
}

type ValidateTokenUseWarning<A extends readonly TokenUseWarning[]> = TokenUseWarning extends A[number] ? A : never;

export function checkTokenUseWarningCoverage<A extends readonly TokenUseWarning[]>(a: ValidateTokenUseWarning<A>): A {
  return a;
}

type ValidateLearningObjectiveType<A extends readonly LearningObjectiveType[]> = LearningObjectiveType extends A[number] ? A : never;

export function checkLearningObjectiveTypeCoverage<A extends readonly LearningObjectiveType[]>(a: ValidateLearningObjectiveType<A>): A {
  return a;
}

type ValidateCollectionTypeCategory<A extends readonly CollectionTypeCategory[]> = CollectionTypeCategory extends A[number] ? A : never;

export function checkCollectionTypeCategoryCoverage<A extends readonly CollectionTypeCategory[]>(a: ValidateCollectionTypeCategory<A>): A {
  return a;
}
