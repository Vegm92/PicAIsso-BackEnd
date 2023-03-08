import { type NextFunction, type Request, type Response } from "express";
import { notFoundError } from "./notFoundError";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its next method", () => {
      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
