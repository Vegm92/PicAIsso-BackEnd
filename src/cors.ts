import type cors from "cors";

const localHost = "http://localhost:4000";
const allowedOrigins = [localHost];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
