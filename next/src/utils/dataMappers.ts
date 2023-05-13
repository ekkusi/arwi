import { LearningObjectiveType, Rating } from "@/gql/graphql";
import { LearningObjective } from "./subjectUtils";

export const formatRatingString = (rating: Rating) => {
  switch (rating) {
    case Rating.EXCELLENT:
      return "Erinomainen";
    case Rating.GREAT:
      return "Kiitettävä";
    case Rating.GOOD:
      return "Hyvä";
    case Rating.FAIR:
      return "Tyydyttävä";
    default:
      return "Välttävä";
  }
};

export const formatRatingNumber = (rating: Rating) => {
  switch (rating) {
    case Rating.EXCELLENT:
      return 10;
    case Rating.GREAT:
      return 9;
    case Rating.GOOD:
      return 8;
    case Rating.FAIR:
      return 7;
    default:
      return 6;
  }
};

export const formatRatingNumberString = (rating: Rating) => {
  switch (rating) {
    case Rating.EXCELLENT:
      return "10";
    case Rating.GREAT:
      return "9";
    case Rating.GOOD:
      return "8";
    case Rating.FAIR:
      return "7";
    default:
      return "< 6";
  }
};

export const getRatingEmoji = (rating: Rating) => {
  switch (rating) {
    case Rating.EXCELLENT:
      return "🤩";
    case Rating.GREAT:
      return "😊";
    case Rating.GOOD:
      return "🙂";
    case Rating.FAIR:
      return "😕";
    default:
      return "🙁";
  }
};

export const formatObjectiveLabel = (learningObjective: LearningObjective) => {
  return `${learningObjective.code}: ${learningObjective.label}`;
};

export const formatObjectiveTypeLabel = (type: LearningObjectiveType) => {
  switch (type) {
    case LearningObjectiveType.SKILLS:
      return "Taidot";
    case LearningObjectiveType.BEHAVIOUR:
      return "Työskentely";
    case LearningObjectiveType.NOT_EVALUATED:
      return "Ei arvioitava tavoite";
    default:
      throw new Error("Unknown learning objective type");
  }
};

export const formatRatingStringWithNull = (rating: Rating | null | undefined) => {
  return rating ? formatRatingNumberString(rating) : "Ei arvioitu";
};

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

export function removeNulls<T extends {}, V = Valuable<T>>(obj: T): V {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => !(v === null || typeof v === "undefined"))) as V;
}

export const formatAmountString = (value: number) => {
  return value === 1 ? "kerta" : "kertaa";
};
