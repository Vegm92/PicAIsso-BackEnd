import "./loadEnvironment.js";
import type cors from "cors";

const localHost = [
  "http://localhost:4000",
  `${process.env.DEPLOY_ORIGIN_URL!}`,
];

const options: cors.CorsOptions = {
  origin: localHost,
};

export default options;
