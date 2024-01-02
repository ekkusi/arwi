import { ClassParticipationCollection, ClassParticipationEvaluation, DefaultCollection, DefaultEvaluation } from "./generated";

type CollectionOnlyTypename = Pick<ClassParticipationCollection | DefaultCollection, "__typename">;

export function isClassParticipationCollection(collection: CollectionOnlyTypename): collection is ClassParticipationCollection {
  // eslint-disable-next-line no-underscore-dangle
  return collection.__typename === "ClassParticipationCollection";
}

export function isDefaultCollection(collection: CollectionOnlyTypename): collection is DefaultCollection {
  // eslint-disable-next-line no-underscore-dangle
  return collection.__typename === "DefaultCollection";
}

type EvaluationOnlyTypename = Pick<ClassParticipationEvaluation | DefaultEvaluation, "__typename">;

export function isClassParticipationEvaluation<T extends EvaluationOnlyTypename>(evaluation: EvaluationOnlyTypename): evaluation is T {
  // eslint-disable-next-line no-underscore-dangle
  return evaluation.__typename === "ClassParticipationEvaluation";
}

export function isDefaultEvaluation(evaluation: any): evaluation is DefaultEvaluation {
  // eslint-disable-next-line no-underscore-dangle
  return evaluation.__typename === "DefaultEvaluation";
}
