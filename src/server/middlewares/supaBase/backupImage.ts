import "../../../loadEnvironment.js";
import { createClient } from "@supabase/supabase-js";
import { type NextFunction, type Response } from "express";
import path from "path";
import fs from "fs/promises";
import { type CustomRequest } from "../../../types/userTypes/types.js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

const backupImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageName = req.file?.filename;

    const imagePath = path.join("uploads", imageName!);

    const image = await fs.readFile(imagePath);

    await supabase.storage.from("images").upload(imageName!, image);

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(imageName!);

    req.body.image = publicUrl;
    req.body.backupImage = imagePath;

    next();
  } catch (error) {
    const customError = new Error("Failed to upload image");

    next(customError);
  }
};

export default backupImage;
