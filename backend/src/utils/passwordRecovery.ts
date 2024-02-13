export const generateCode = (length: number) => {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};
