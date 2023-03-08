import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  type NextFunction,
  type Request,
  type Response,
} from "express-serve-static-core";
import { type UserCredentials } from "../../types.js";
import { type CustomJwtPayload } from "./types.js";
import User from "../../database/models/User.js";
import CustomError from "../../CustomError/CustomError.js";
import errors from "../../constants/errors.js";

const hashingPasswordLength = 10;

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  const userToFind = username.toString();

  try {
    const user = await User.findOne({ username: userToFind }).exec();

    if (!user) {
      const error = new CustomError(
        errors.unauthorized.message,
        errors.unauthorized.statusCode,
        errors.unauthorized.publicMessage
      );
      next(error);

      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        errors.unauthorized.message,
        errors.unauthorized.statusCode,
        errors.unauthorized.publicMessage
      );

      next(error);

      return;
    }

    const jwtPayload: CustomJwtPayload = {
      sub: user?._id.toString(),
      username: user.username,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
