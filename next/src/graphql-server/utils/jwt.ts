import { addDays } from "date-fns";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next/types";
import AuthenticationError from "../errors/AuthenticationError";
import { UserInfo } from "../types/contextTypes";

export const SALT_ROUNDS = 10;

export const checkIfIsUser = (user: any): user is UserInfo => {
  if (
    typeof user !== "object" ||
    user.name === undefined ||
    user.isPrivate === undefined ||
    user.email === undefined ||
    !Array.isArray(user.finishedAndCheckedParticipations)
  )
    return false;
  return true;
};

export const createAccessToken = (user: UserInfo): string => {
  const token = jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!, {
    expiresIn: "15min",
  });
  return token;
};

const REFRESH_TOKEN_EXPIRATION_IN_DAYS = 30;

export const createRefreshToken = (user: UserInfo): string => {
  const token = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY!, {
    expiresIn: `${REFRESH_TOKEN_EXPIRATION_IN_DAYS}d`,
  });
  return token;
};

export const createRefreshTokenCookie = (token: string, res: Response) => {
  res.cookie("jubbiduu", token, {
    httpOnly: true,
    expires: addDays(new Date(), REFRESH_TOKEN_EXPIRATION_IN_DAYS),
  });
};

export const createRefreshAndAccessTokens = (user: UserInfo, res: Response): string => {
  createRefreshTokenCookie(createRefreshToken(user), res);
  return createAccessToken(user);
};

export const parseAndVerifyToken = (bearerToken: string): UserInfo | null => {
  const parsedToken = bearerToken.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(parsedToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!) as any;
    const user = decoded?.user;
    if (!checkIfIsUser(user)) {
      throw new AuthenticationError("Access token keksi ei palauttanut oikeita tietoja");
    }
    return user;
  } catch (error) {
    return null;
  }
};
