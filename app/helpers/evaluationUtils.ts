export const parseFloatToGradeString = (number: number) => {
  "worklet";

  const base = Math.floor(number + 0.25);
  const remainder = number - base;
  let suffix = "";
  if (remainder < 0) {
    suffix = "-";
  } else if (remainder > 0 && remainder < 0.5) {
    suffix = "+";
  } else if (remainder >= 0.5 && remainder < 0.75) {
    suffix = "½";
  }
  return `${base.toString()}${suffix}`;
};
