import crypto from "crypto";
import redis from "@/redis";

export const generateCode = (length: number) => {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const EMAIL_VERIFICATION_PREFIX = "email-verification";

export const generateAndSetEmailVerificationToken = async (email: string) => {
  const token = crypto.randomBytes(20).toString("hex");
  await redis?.set(`${EMAIL_VERIFICATION_PREFIX}:${email}`, token, "EX", ONE_DAY_IN_SECONDS);
  return token;
};

export const getEmailVerificationToken = (email: string) => {
  return redis?.get(`${EMAIL_VERIFICATION_PREFIX}:${email}`);
};

export const deleteEmailVerificationToken = (email: string) => {
  return redis?.del(`${EMAIL_VERIFICATION_PREFIX}:${email}`);
};
