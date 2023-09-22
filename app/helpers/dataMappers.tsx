import { LearningObjective, SubjectMinimal } from "arwi-backend/src/types/subject";
import { ImageSourcePropType } from "react-native";
import { LearningObjectiveType } from "../gql/graphql";

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

export const GRADE_COLORS: { [grade: number]: string } = {
  4: "#ff0000",
  5: "#ff6600",
  6: "#ff9900",
  7: "#ffcc00",
  8: "#ffff00",
  9: "#66cc00",
  10: "#009900",
};
export const getColorForGrade = (grade: number) => {
  if (GRADE_COLORS[grade]) {
    return GRADE_COLORS[grade];
  }
  return "#000000";
};

export const getTextColorForGrade = (grade: number) => {
  if (grade === 8 || grade === 7) {
    return "black";
  }
  return "white";
};

export const getFontWeightForGrade = (grade: number) => {
  if (grade === 8 || grade === 7) {
    return "normal";
  }
  return "bold";
};

export const formatRatingKey = (rating: number) => {
  switch (rating) {
    case 10:
      return "excellent";
    case 9:
      return "great";
    case 8:
      return "good";
    case 7:
      return "fair";
    case 6:
      return "poor";
    case 5:
      return "passable";
    default:
      return "failed";
  }
};

export const formatObjectiveLabel = (learningObjective: LearningObjective) => {
  return `${learningObjective.code}: ${learningObjective.label.fi}`;
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

export const formatRatingStringWithNull = (rating: number | null | undefined) => {
  return rating ? `${rating}` : "Ei arvioitu";
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
