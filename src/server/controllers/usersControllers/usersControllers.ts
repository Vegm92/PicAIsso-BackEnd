import "../../../loadEnvironment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  type NextFunction,
  type Request,
  type Response,
} from "express-serve-static-core";
import { type UserCredentials } from "../../../types/userTypes/types.js";
import { type CustomJwtPayloadUsername } from "../types.js";
import User from "../../../database/models/User/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import errors from "../../../constants/errors.js";
import createDebug from "debug";
const hashingPasswordLength = 10;

const debug = createDebug("picaisso:server:controllers:users");

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      const error = new CustomError(
        errors.unauthorized.message,
        errors.unauthorized.statusCode,
        errors.unauthorized.publicMessage
      );
      throw error;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        errors.unauthorized.message,
        errors.unauthorized.statusCode,
        errors.unauthorized.publicMessage
      );

      throw error;
    }

    const jwtPayload: CustomJwtPayloadUsername = {
      sub: user?._id.toString(),
      username: user.username,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });

    res.status(200).json({ token });
    debug("Login successfull");
  } catch (error) {
    debug(error.message);

    next(error);
  }
};
