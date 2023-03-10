import "./loadEnvironment.js";
import type cors from "cors";

const allowedOrigins = [
  `${process.env.LOCAL_HOST!}`,
  `${process.env.DEPLOY_ORIGIN_URL!}`,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
