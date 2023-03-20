import { model, Schema } from "mongoose";

export const imageSchema = new Schema({
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
  },

  userPrompt: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  promptedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Image = model("Image", imageSchema, "images");
