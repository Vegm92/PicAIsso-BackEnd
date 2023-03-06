import cors from "cors";
import express from "express";
import morgan from "morgan";
import options from "../cors";

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());
