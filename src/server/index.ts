import cors from "cors";
import express from "express";
import morgan from "morgan";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
