import { type InferSchemaType } from "mongoose";
import { type imageSchema } from "../../database/models/ImagesModel/Images";

export interface ImageDataStructure {
  id: string;
  title: string;
  subject: string;
  description: string;
  image: string;
  prompt: string;
  category: string;
}

export type ImagesData = ImageDataStructure[];

export type ImageStructure = InferSchemaType<typeof imageSchema>;
