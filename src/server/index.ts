import cors from "cors";
import express from "express";
import morgan from "morgan";
import options from "../cors.js";
import { generalError } from "./middlewares/generalError/generalError.js";
import { notFoundError } from "./middlewares/norFoundError/notFoundError.js";

import usersRouter from "./routers/usersRouters/usersRouters.js";

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);
