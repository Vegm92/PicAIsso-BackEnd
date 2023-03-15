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

export interface ImageData {
  id: string;
  tittle: string;
  description: string;
  image: string;
  prompt: string;
  category: string;
}

export type ImagesData = ImageData[];

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export interface CustomRequest extends Request {
  promptedBy: string;
}
