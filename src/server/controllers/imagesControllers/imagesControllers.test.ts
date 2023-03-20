import { type Request, type Response } from "express";
import errors from "../../../constants/errors";
import CustomError from "../../../CustomError/CustomError";
import { Image } from "../../../database/models/ImagesModel/Images";
import {
  type ImageDataStructure,
  type ImagesData,
} from "../../../types/imagesTypes/types";
import { type CustomRequest } from "../../../types/userTypes/types";
import {
  createImage,
  deleteImages,
  getAllImages,
  getImageById,
  getUserImages,
} from "./imagesControllers";

const mockImage: ImageDataStructure = {
  subject: "",
  title: "qwert",
  category: "",
  description: "",
  id: "",
  prompt: "",
  image: "",
};

const mockImageVariation: ImageDataStructure = {
  subject: "",
  title: "",
  category: "",
  description: "",
  id: "",
  prompt: "",
  image: "",
};

const mockImagesList: ImagesData = [mockImage, mockImageVariation];

beforeEach(() => jest.restoreAllMocks());

const expectedStatusCode = 200;
const next = jest.fn();

describe("Given getImages controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImagesList),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      Image.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockImagesList),
      }));

      await getAllImages(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImagesList),
      };
      const req: Partial<Request> = {};

      Image.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockImagesList),
      }));

      await getAllImages(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ images: mockImagesList });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<Request> = {};

      const expectedError = new CustomError(
        "Bad Request: Request has wrong format.",
        400,
        "Couldn't retrieve Images"
      );

      req.body = {};

      Image.find = jest.fn().mockReturnValue(undefined);

      await getAllImages(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a getImageById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImage),
      };

      const req: Partial<Request> = {
        params: { id: `${mockImage.id}` },
      };
      const next = jest.fn();
      const expectedStatusCode = 200;

      Image.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockImage),
      }));

      await getImageById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImage),
      };
      const req: Partial<Request> = {
        params: { id: `${mockImage.id}` },
      };
      const next = jest.fn();

      Image.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockImage),
      }));

      await getImageById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ image: mockImage });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };

      const req: Partial<CustomRequest> = {};

      req.params = {};

      const expectedError = new CustomError(
        errors.serverError.message,
        errors.serverError.statusCode,
        errors.serverError.databaseError
      );

      Image.findById = jest.fn().mockReturnValue(undefined);

      await getImageById(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the getUserImages controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImagesList),
      };
      const req: Partial<Request> = {};
      req.body = { postedBy: "213i21309213891jkdk" };

      Image.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({ postedBy: "12324324fdsvsdafsg45" }),
      }));

      await getUserImages(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImagesList),
      };
      const req: Partial<Request> = {};
      req.params = { postedBy: "213i21309213891jkdk" };

      Image.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockImagesList),
      }));

      await getUserImages(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ images: mockImagesList });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        "Bad Request: Request has wrong format.",
        400,
        "Couldn't retrieve Images"
      );

      req.body = {};

      Image.find = jest.fn().mockReturnValue(undefined);

      await getUserImages(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the deleteImages controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with code 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImage.id),
      };

      const req: Partial<CustomRequest> = {
        params: { id: `${mockImage.id}` },
      };

      Image.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockImage),
      }));

      await deleteImages(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };

      const req: Partial<CustomRequest> = {};

      req.params = {};

      const expectedError = new CustomError(
        errors.serverError.message,
        errors.serverError.statusCode,
        errors.serverError.databaseError
      );

      Image.findByIdAndDelete = jest.fn().mockReturnValue(undefined);

      await deleteImages(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a createImage controller", () => {
  describe("When it receives a response", () => {
    test("Then it should respond with status 201", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImage),
      };
      const req: Partial<CustomRequest> = {};
      const next = jest.fn();
      req.body = mockImage;
      const expectedStatusCode = 201;

      Image.create = jest.fn().mockReturnValue(mockImage);

      await createImage(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockImage),
      };
      const req: Partial<CustomRequest> = {};
      const next = jest.fn();
      req.body = mockImage;

      Image.create = jest.fn().mockReturnValue(mockImage);

      await createImage(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ image: mockImage });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should throw an error", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<CustomRequest> = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        "Couldn't create the image",
        409,
        "Couldn't create the image"
      );
      req.body = {};

      Image.create = jest.fn().mockRejectedValue(undefined);

      await createImage(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
