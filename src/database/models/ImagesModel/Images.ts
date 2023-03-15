import { model, Schema } from "mongoose";

const Imageschema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  promptedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Image = model("Image", Imageschema, "images");
