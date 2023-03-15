import { type JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayloadUsername extends JwtPayload {
  username: string;
  sub: string;
}
