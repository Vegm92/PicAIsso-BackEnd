import { type NextFunction, type Request, type Response } from "express";
import { ValidationError, type errors } from "express-validation";
import CustomError from "../../../CustomError/CustomError";
import { generalError } from "./generalError";
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
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

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When it receives an error object generated due to missing password in credentials", () => {
    test("Then the erro public message will be '\"password\" is required'", () => {
      const error: errors = {
        body: [
          {
            name: "ValidationError",
            isJoi: true,
            annotate(stripColors) {
              return "";
            },
            _original: "",
            message: "'password' is required",
            details: [
              {
                message: "",
                path: [""],
                type: "",
              },
            ],
          },
        ],
      };

      const publicMessage = "'password' is required";
      const newError = new ValidationError(error, {});

      generalError(
        newError as unknown as CustomError,
        req as Request,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });
});
