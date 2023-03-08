import "./loadEnvironment.js";
import type cors from "cors";

const localHost = [
  `${process.env.LOCAL_HOST!}`,
  `${process.env.DEPLOY_ORIGIN_URL!}`,
];

const options: cors.CorsOptions = {
  origin: localHost,
};

export default options;
