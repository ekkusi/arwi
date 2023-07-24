import { LearningObjective, SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
import { ImageSourcePropType } from "react-native";
import { LearningObjectiveType, Rating } from "../gql/graphql";

export const subjectToIcon = (subject: SubjectMinimal): ImageSourcePropType => {
  switch (subject.code) {
    case "KU":
      return require("../assets/art.png");
    case "LI":
      return require("../assets/sport.png");
    case "PY":
      return require("../assets/psychology.png");
    case "BI":
      return require("../assets/biology.png");
    case "FY":
      return require("../assets/physics.png");
    case "KE":
      return require("../assets/chemistry.png");
    case "GE":
      return require("../assets/geoscience.png");
    case "MA":
      return require("../assets/math.png");
    case "MU":
      return require("../assets/music.png");
    case "KA":
      return require("../assets/handicraft.png");
    case "KI":
      return require("../assets/language.png");
    case "KO":
      return require("../assets/kotitalous.png");
    case "US":
      return require("../assets/religion.png");
    case "TE":
      return require("../assets/health.png");
    case "HI":
      return require("../assets/history.png");
    case "EL":
      return require("../assets/elamankatsomus.png");
    case "YH":
      return require("../assets/yhteiskuntaoppi.png");
    default:
      return require("../assets/language.png");
  }
};

const palette = [
  "#513667",
  "#74352e",
  "#cb4d78",
  "#b089ce",
  "#799ec4",
  "#c84ac2",
  "#6443bf",
  "#caae46",
  "#d35933",
  "#76b9a9",
  "#7bcc40",
  "#3f483d",
  "#c69782",
  "#6bc57a",
  "#5c7534",
];
export const getPredefinedColors = (count: number) => {
  return palette.slice(0, count);
};

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
