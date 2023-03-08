import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import errors from "../../../constants/errors.js";
import CustomError from "../../../CustomError/CustomError.js";

export const debug = createDebug("picaisso:server:errorMiddlewares");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    errors.notFound.pathMessage,
    errors.notFound.statusCode,
    errors.notFound.endPointMessage
  );

  next(error);
};
