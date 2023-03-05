import { Rating } from "@/gql/graphql";

export const formatRatingString = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "Erinomainen";
    case Rating.Good:
      return "Kiitettävä";
    case Rating.Fair:
      return "Hyvä";
    default:
      return "Välttävä";
  }
};

export const formatRatingNumberString = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "(10)";
    case Rating.Good:
      return "(9)";
    case Rating.Fair:
      return "(7-8)";
    default:
      return "(5-6)";
  }
};

export const formatRatingNumber = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return 10;
    case Rating.Good:
      return 9;
    case Rating.Fair:
      return 7.5;
    default:
      return 5.5;
  }
};

export const getRatingEmoji = (rating: Rating) => {
  switch (rating) {
    case Rating.Excellent:
      return "🤩";
    case Rating.Good:
      return "😊";
    case Rating.Fair:
      return "🙂";
    default:
      return "🙁";
  }
};
