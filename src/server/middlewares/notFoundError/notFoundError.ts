import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};
