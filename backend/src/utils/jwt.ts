import { addDays } from "date-fns";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { UserInfo } from "../types/contextTypes";

const JWT_ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY || "access_token_secret";
const JWT_REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY || "refresh_token_secret";
export const REFRESH_TOKEN_KEY = "ref-token";

// Map user to make sure no additional fields are added to the token
const mapUser = (user: UserInfo): UserInfo => ({
  id: user.id,
  email: user.email,
});

export const checkIfIsUser = (user: any): user is UserInfo => {
  if (typeof user !== "object" || user.email === undefined) return false;
  return true;
};

export const createAccessToken = (user: UserInfo): string => {
  const token = jwt.sign({ user: mapUser(user) }, JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "15m",
  });
  return token;
};

const REFRESH_TOKEN_EXPIRATION_IN_DAYS = 30;

export const createRefreshToken = (user: UserInfo): string => {
  const token = jwt.sign({ user: mapUser(user) }, JWT_REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: `${REFRESH_TOKEN_EXPIRATION_IN_DAYS}d`,
  });
  return token;
};

export const createRefreshTokenCookie = (token: string, res: Response) => {
  res.cookie(REFRESH_TOKEN_KEY, token, {
    httpOnly: true,
    expires: addDays(new Date(), REFRESH_TOKEN_EXPIRATION_IN_DAYS),
  });
};

export const createRefreshAndAccessTokens = (user: UserInfo, res: Response): string => {
  createRefreshTokenCookie(createRefreshToken(user), res);
  return createAccessToken(user);
};

export const parseAndVerifyToken = (authHeader: string, type: "access" | "refresh" = "access"): UserInfo | undefined => {
  const parsedToken = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(parsedToken, type === "access" ? JWT_ACCESS_TOKEN_SECRET_KEY : JWT_REFRESH_TOKEN_SECRET_KEY);
    const user = typeof decoded === "object" ? decoded.user : null;
    if (!checkIfIsUser(user)) return undefined;
    return user;
  } catch (error) {
    return undefined;
  }
};
