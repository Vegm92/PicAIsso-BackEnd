import { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";

export interface UserStructure {
  username: string;
  password: string;
  email: string;
}

export type UserCredentials = Pick<UserStructure, "email" | "password">;
export interface UserRegisterCredentials extends UserStructure {
  passwordConfirmation: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
