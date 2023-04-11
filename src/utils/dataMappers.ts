import { Rating } from "@/gql/graphql";

export const formatRatingString = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "Erinomainen";
    case Rating.Great:
      return "Kiitettävä";
    case Rating.Good:
      return "Hyvä";
    case Rating.Fair:
      return "Tyydyttävä";
    default:
      return "Välttävä";
  }
};

export const formatRatingNumber = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return 10;
    case Rating.Great:
      return 9;
    case Rating.Good:
      return 8;
    case Rating.Fair:
      return 7;
    default:
      return 6;
  }
};

export const formatRatingNumberString = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "10";
    case Rating.Great:
      return "9";
    case Rating.Good:
      return "8";
    case Rating.Fair:
      return "7";
    default:
      return "< 6";
  }
};

export const getRatingEmoji = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "🤩";
    case Rating.Great:
      return "😊";
    case Rating.Good:
      return "🙂";
    case Rating.Fair:
      return "😕";
    default:
      return "🙁";
  }
};

export const formatRatingStringWithNull = (
  rating: Rating | null | undefined
) => {
  return rating ? formatRatingNumberString(rating) : "Ei arvioitu";
};

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

export function removeNulls<T extends {}, V = Valuable<T>>(obj: T): V {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => !(v === null || typeof v === "undefined")
    )
  ) as V;
}
