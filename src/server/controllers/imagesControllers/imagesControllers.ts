import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type CustomRequest } from "../../../types.js";
import errors from "../../../constants/errors.js";
import { Image } from "../../../database/models/ImagesModel/Images.js";

export const getAllImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const images = await Image.find().exec();

    res.status(200).json({ images });
  } catch (error) {
    const customError = new CustomError(
      errors.badRequest.message,
      errors.badRequest.statusCode,
      "Couldn't retrieve images"
    );

    next(customError);
  }
};

export const getUserImages = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const images = await Image.find({ promptedBy: req.promptedBy }).exec();

    res.status(200).json({ images });
  } catch (error) {
    const customError = new CustomError(
      errors.badRequest.message,
      errors.badRequest.statusCode,
      errors.serverError.getImagesError
    );

    next(customError);
  }
};

export const deleteImages = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { idImage } = req.params;

  try {
    const image = await Image.findByIdAndDelete({
      _id: idImage,
      promptedBy: req.promptedBy,
    }).exec();

    res.status(200).json({ image });
  } catch (error) {
    const customError = new CustomError(
      errors.serverError.message,
      errors.serverError.statusCode,
      errors.serverError.deleteImagesError
    );

    next(customError);
  }
};
