import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { app } from "../..";
import { Image } from "../../../database/models/ImagesModel/Images";
import connectDataBase from "../../../database/connectDataBase";
import {
  type ImageStructure,
  type ImageDataStructure,
} from "../../../types/imagesTypes/types";

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mongodbServer.getUri();

  await connectDataBase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await Image.deleteMany();
});

afterEach(() => {
  jest.clearAllMocks();
});

const okStatus = 200;
const mockImagePrompted: ImageDataStructure = {
  id: "",
  title: "papagayo",
  subject: "papagayo",
  description: "a papagayo bird flying",
  image: "apapagayoflying.jpg",
  prompt: "papagayo",
  category: "birds",
};

describe("Given a GET '/images' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200", async () => {
      const imagesUrl = "/images";

      await request(app).get(imagesUrl).expect(okStatus);
    });
  });
});

describe("Given a POST '/create' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 201", async () => {
      const urlCreate = "/images/create";
      const expectedStatus = 201;

      const userId = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValue({ sub: userId });

      const response: { body: { image: ImageDataStructure } } = await request(
        app
      )
        .post(urlCreate)
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDE3MDYyMzIxNTA3ZDU3ZTUyMDUyYTMiLCJ1c2VybmFtZSI6InZpYzEiLCJpYXQiOjE2NzkzMTUxNDMsImV4cCI6MTY3OTU3NDM0M30.HpqoeEwVFAXYQkV8RbevFeupYqtd_uyfb-ESOXud2xs"
        )
        .set("content-type", "multipart/form-data")
        .field("title", mockImagePrompted.title)
        .field("subject", mockImagePrompted.subject)
        .field("description", mockImagePrompted.description)
        .field("category", mockImagePrompted.category)
        .attach("image", Buffer.from("uploads"), {
          filename: "apapagayoflying.jpg",
        })
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("image");
    });
  });
});
