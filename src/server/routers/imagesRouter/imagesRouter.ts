import { Router } from "express";
import {
  getAllImages,
  getUserImages,
} from "../../controllers/imagesControllers/imagesControllers.js";
import auth from "../../middlewares/auth/auth.js";

const getImagesRoute = "/";
const getUserCollectionRoute = "/my-collection";

const imagesRouter = Router();

imagesRouter.get(getImagesRoute, getAllImages);
imagesRouter.get(getUserCollectionRoute, auth, getUserImages);

export default imagesRouter;
