import { Router } from "express";
import {
  deleteImages,
  getAllImages,
  getImageById,
  getUserImages,
} from "../../controllers/imagesControllers/imagesControllers.js";
import auth from "../../middlewares/auth/auth.js";

const getImagesRoute = "/";
const getUserCollectionRoute = "/my-collection";
const deleteImagesRoute = "/delete/:idImage";
const getImageByIdRoute = "/:idImage";

const imagesRouter = Router();

imagesRouter.get(getImagesRoute, getAllImages);
imagesRouter.get(getImageByIdRoute, getImageById);
imagesRouter.get(getUserCollectionRoute, auth, getUserImages);
imagesRouter.delete(deleteImagesRoute, auth, deleteImages);

export default imagesRouter;
