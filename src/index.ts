import "./loadEnvironment.js";
import chalk from "chalk";
import mongoose from "mongoose";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDataBase from "./database/connectDataBase.js";

export const debug = createDebug("picaisso:startServer");

const port = process.env.PORT ?? 4000;
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
  debug(chalk.green("Connected to data base"));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
