import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../..";
import { Image } from "../../../database/models/ImagesModel/Images";
import connectDataBase from "../../../database/connectDataBase";

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

describe("Given a GET '/images' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatus = 200;
      const imagesUrl = "/images";

      await request(app).get(imagesUrl).expect(expectedStatus);
    });
  });
});
