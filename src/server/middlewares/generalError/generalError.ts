import debug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import { ValidationError } from "express-validation";
import type CustomError from "../../../CustomError/CustomError.js";

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    error.publicMessage = error.details
      .body!.map((error) => error.message)
      .join(" & ")!;
  }

  debug(error.message);

  const statusCode = error.statusCode || 500;
  const publicMessage = error.publicMessage || "Something went wrong";

  res.status(statusCode).json({ error: publicMessage });
};
