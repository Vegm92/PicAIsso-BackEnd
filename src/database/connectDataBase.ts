import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("picaisso:database:connectDB");

const connectDataBase = async (url: string) => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);

  try {
    await mongoose.connect(url);
  } catch (error) {
    debug(error);
  }
};

export default connectDataBase;
