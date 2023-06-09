import createDebug from "debug";
import mongoose from "mongoose";
import { type NextFunction, type Request, type Response } from "express";
import errors from "../../../constants/errors.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type CustomRequest } from "../../../types/userTypes/types.js";
import { Image } from "../../../database/models/ImagesModel/Images.js";
import { type ImageStructure } from "../../../types/imagesTypes/types.js";

export const debug = createDebug("picaisso:server:controller:images");

export const getAllImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const images = await Image.find().exec();

    res.status(200).json({ images });
    debug("Succeded getting images");
  } catch (error) {
    debug(error.message);
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
    const images = await Image.find({ promptedBy: req.userId }).exec();

    res.status(200).json({ images });
    debug("Succeded getting images");
  } catch (error) {
    debug(error.message);

    const customError = new CustomError(
      errors.badRequest.message,
      errors.badRequest.statusCode,
      errors.serverError.getImagesError
    );

    next(customError);
  }
};

export const getImageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idImage } = req.params;

  try {
    const image = await Image.findById(idImage).exec();

    res.status(200).json({ image });
  } catch (error) {
    debug(error.message);

    const customError = new CustomError(
      error.message as string,
      errors.serverError.statusCode,
      "Couldn't retrieve an image."
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
      promptedBy: req.userId,
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

export const createImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, category, description, userPrompt, image } =
    req.body as ImageStructure;
  const { userId } = req;

  try {
    const newImage: ImageStructure = {
      title,
      category,
      description,
      userPrompt,
      image,
      promptedBy: new mongoose.Types.ObjectId(userId),
    };

    const createdImage = await Image.create(newImage);

    res.status(201).json({ image: createdImage });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create the image",
      400,
      "Couldn't create the image"
    );

    next(customError);
  }
};
