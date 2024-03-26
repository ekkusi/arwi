import { ImageSourcePropType } from "react-native";
import { SubjectMinimal } from "arwi-backend/src/types/codegenOverrides";

export const subjectToIcon = (subject: SubjectMinimal): ImageSourcePropType => {
  switch (subject.code) {
    case "KU":
      return require("../assets/subjects/art.png");
    case "LI":
      return require("../assets/subjects/sport.png");
    case "PY":
      return require("../assets/subjects/psychology.png");
    case "BI":
      return require("../assets/subjects/biology.png");
    case "FY":
      return require("../assets/subjects/physics.png");
    case "KE":
      return require("../assets/subjects/chemistry.png");
    case "GE":
      return require("../assets/subjects/geoscience.png");
    case "MA":
      return require("../assets/subjects/math.png");
    case "MU":
      return require("../assets/subjects/music.png");
    case "KA":
      return require("../assets/subjects/handicraft.png");
    case "KI":
      return require("../assets/subjects/language.png");
    case "KO":
      return require("../assets/subjects/kotitalous.png");
    case "US":
      return require("../assets/subjects/religion.png");
    case "TE":
      return require("../assets/subjects/health.png");
    case "HI":
      return require("../assets/subjects/history.png");
    case "EL":
      return require("../assets/subjects/elamankatsomus.png");
    case "YH":
      return require("../assets/subjects/yhteiskuntaoppi.png");
    case "YM":
      return require("../assets/subjects/environmental-studies.png");
    case "FI":
      return require("../assets/subjects/philosophy.png");
    case "EA":
      return require("../assets/subjects/philosophy-of-life.png");
    default:
      return require("../assets/subjects/language.png");
  }
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

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

export function removeNulls<T extends {}, V = Valuable<T>>(obj: T): V {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => !(v === null || typeof v === "undefined"))) as V;
}
