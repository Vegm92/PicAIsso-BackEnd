import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalError } from "./middlewares/generalError/generalError.js";
import { notFoundError } from "./middlewares/notFoundError/notFoundError.js";

import usersRouter from "./routers/usersRouters/usersRouters.js";

export const app = express();

app.disable("x-powered-by");

const localHostPort = process.env.LOCAL_HOST!;
const deployUrl = process.env.DEPLOY_ORIGIN_URL!;

const allowedOrigins = [localHostPort, deployUrl];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);
