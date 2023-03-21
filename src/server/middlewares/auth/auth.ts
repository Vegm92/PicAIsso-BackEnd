import "../../../loadEnvironment.js";
import { type NextFunction, type Response } from "express";
import errors from "../../../constants/errors.js";
import {
  type CustomJwtPayload,
  type CustomRequest,
} from "../../../types/userTypes/types.js";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const headerAuth = req.header("Authorization");

    if (!headerAuth) {
      throw new Error(errors.authenticationError.missingHeader);
    }

    if (!headerAuth.startsWith("Bearer ")) {
      throw new Error(errors.authenticationError.missingBearer);
    }

    const token = headerAuth.replace(/^Bearer\s*/, "");

    const { sub: promptedBy } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.userId = promptedBy;

    next();
  } catch (error: unknown) {
    const tokenError = new CustomError(
      (error as Error).message,
      errors.unauthorized.statusCode,
      errors.authenticationError.invalidToken
    );

    next(tokenError);
  }
};

export default auth;
