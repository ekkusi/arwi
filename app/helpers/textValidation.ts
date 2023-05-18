export const nameValidator = (name: string) => {
  if (name.length <= 0) {
    return "Nimi ei saa olla tyhjä";
  }
  return undefined;
};
