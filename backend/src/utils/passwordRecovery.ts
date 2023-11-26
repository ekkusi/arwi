import { hash } from "bcryptjs";
import { SessionData } from "express-session";
import { BRCRYPT_SALT_ROUNDS } from "../config";

const FIVE_MINUTES_MS = 1000 * 60 * 5;

export const generateCode = (length: number) => {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export const checkCode = async (code: string, session: SessionData) => {
  if (!session.recoveryCodeInfo) return false;
  const hashedCode = await hash(code, BRCRYPT_SALT_ROUNDS);
  if (session.recoveryCodeInfo.codeHash !== hashedCode) return false;
  if (session.recoveryCodeInfo.createdAt + FIVE_MINUTES_MS < Date.now()) return false;
  return true;
};
