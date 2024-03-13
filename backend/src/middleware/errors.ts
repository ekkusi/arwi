import { NextFunction, Request, RequestHandler, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import UnauthorizedError from "@/errors/UnauthorizedError";

export const notFoundHandler: RequestHandler = (_, res) => {
  res.status(404).json({ message: "Not found" });
};

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err);
  if (err instanceof BadRequestError || err instanceof UnauthorizedError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
};
