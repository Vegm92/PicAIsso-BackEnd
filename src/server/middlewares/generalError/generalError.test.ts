import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError } from "./generalError";
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a generalError middleware", () => {
  describe("When it receives an error with status 500", () => {
    test("Then it shoudl call its status method with a 500", () => {
      const statusCode = 500;
      const error = new CustomError(
        "There was an error",
        500,
        "Somethig went wrong"
      );

      generalError(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});