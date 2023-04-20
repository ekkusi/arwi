import { Rating } from "@/gql/graphql";

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
