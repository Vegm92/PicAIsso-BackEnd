import "./loadEnvironment.js";
import mongoose from "mongoose";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDataBase from "./database/connectDataBase.js";

const debug = createDebug("picaisso:index");

const port = process.env.PORT ?? 4001;
const mongoDbUrl = process.env.MONGODB_CONNECTION_URL!;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectDataBase(mongoDbUrl);
  debug("Connected to data base");

  await startServer(+port);
  debug(`Server listening on 'http://localhost:${port}'`);
} catch (error) {
  debug(error.message);
}
