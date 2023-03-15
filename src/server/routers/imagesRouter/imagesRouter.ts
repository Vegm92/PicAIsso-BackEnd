import { Router } from "express";

const getImagesRoute = "/";
const getUserCollectionRoute = "/my-collection";

const imagesRouter = Router();

imagesRouter.get(getImagesRoute);
imagesRouter.get(getUserCollectionRoute);

export default imagesRouter;
