import { Router } from "express";
import { validate } from "express-validation";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { imageSchema } from "../../../database/models/ImagesModel/Images.js";
import {
  createImage,
  deleteImages,
  getAllImages,
  getImageById,
  getUserImages,
} from "../../controllers/imagesControllers/imagesControllers.js";
import auth from "../../middlewares/auth/auth.js";
import backupImage from "../../middlewares/supaBase/supaBase.js";
import imagesSchemaJoi from "../../schemas/imagesSchema.js";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callBack) {
    const suffix = crypto.randomUUID();

    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);

    const filename = `${basename}-${suffix}${extension}`;

    callBack(null, filename);
  },
});

const upload = multer({ storage, limits: { fileSize: 10000000 } });

const getImagesRoute = "/";
const getUserCollectionRoute = "/my-collection";
const deleteImagesRoute = "/delete/:idImage";
const getImageByIdRoute = "/detail/:idImage";
const createImageRoute = "/create";

const imagesRouter = Router();

imagesRouter.get(getImagesRoute, getAllImages);
imagesRouter.get(getImageByIdRoute, auth, getImageById);
imagesRouter.get(getUserCollectionRoute, auth, getUserImages);
imagesRouter.delete(deleteImagesRoute, auth, deleteImages);

imagesRouter.post(
  createImageRoute,
  auth,
  upload.single("image"),
  validate(imagesSchemaJoi, {}, { abortEarly: false }),
  backupImage,
  createImage
);

export default imagesRouter;
