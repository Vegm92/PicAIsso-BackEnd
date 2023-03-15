import { type Response, type Request, type NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type UserCredentials } from "../../../types";
import User from "../../../database/models/User/User";
import { loginUser } from "./usersControllers";
import CustomError from "../../../CustomError/CustomError";

const req: Partial<Request> = {};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  const mockUser: UserCredentials = {
    email: "kent@gmail.com",
    password: "C.Dots",
  };

  describe("When it receives a request with a email 'kent@gmail.com' and password 'C.Dots' and the user is not registered in the database", () => {
    test("Then it should call its next method with a status code 401 and the message 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "Unauthorized: User or password not found.",
        401,
        "Wrong credentials"
      );
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await loginUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with a email `kent@gmail.com` and a password `C.Dots` and the user is registered in the database", () => {
    test("Then it should call its status method with status code 200 and its json method with a token", async () => {
      const expectedStatusCode = 200;
      req.body = mockUser;
      const expectedBodyResponse = { token: "asdfdsfg" };

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("asdfdsfg");

      await loginUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedBodyResponse);
    });
  });

  describe("When it receives a request with a email `kent@gmail.com` and password `C.Dots` and the user is registered in the database but the passwords don't match", () => {
    test("Then it should call its next method with a status 401 and the message `Wrong credentials`", async () => {
      const expectedError = new CustomError(
        "Unauthorized: User or password not found.",
        401,
        "Wrong credentials"
      );
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
