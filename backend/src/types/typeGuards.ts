import { ClassParticipationCollection, ClassParticipationEvaluation, DefaultCollection, DefaultEvaluation } from "./generated";

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
