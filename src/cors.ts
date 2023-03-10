import "./loadEnvironment.js";
import type cors from "cors";

const localHostPort = process.env.LOCAL_HOST!;
const deployUrl = process.env.DEPLOY_ORIGIN_URL!;

const allowedOrigins = [localHostPort, deployUrl];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
