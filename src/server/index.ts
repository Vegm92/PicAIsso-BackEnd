import cors from "cors";
import express from "express";
import morgan from "morgan";
import options from "../cors.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());

app.use(notFoundError);
app.use(generalError);
