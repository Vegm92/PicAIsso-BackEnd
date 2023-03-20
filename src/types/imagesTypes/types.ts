import { type InferSchemaType } from "mongoose";
import { type imageSchema } from "../../database/models/ImagesModel/Images";

export interface ImageDataStructure {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
  image: string;
}

export type ImagesData = ImageDataStructure[];

export type ImageStructure = InferSchemaType<typeof imageSchema>;
