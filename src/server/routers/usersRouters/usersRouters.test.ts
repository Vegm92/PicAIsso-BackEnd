import "../../../loadEnvironment.js";
import request from "supertest";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { app } from "../..";
import User from "../../../database/models/User/User.js";
import { type UserStructure, type UserCredentials } from "../../../types.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDataBase from "../../../database/connectDataBase.js";

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongoServerUrl = mongodbServer.getUri();

  await connectDataBase(mongoServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUserDb: UserStructure = {
  email: "victor@gmail.com",
  password: "patatasfritas",
  username: "victor",
};

describe("Given a POST '/users/login' endpoint", () => {
  const user: UserCredentials = {
    email: "victor@gmail.com",
    password: "patatasfritas",
  };
  const loginPath = "/users/login";

  describe("When it receives a request with an email 'victor@gmail.com' and a password 'patatasfritas'", () => {
    test("Then it should respond with status 200 and an object in its body with the property 'token'", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "asdfasdfasdfgsadf3242345",
      }));
      const expectedStatus = 200;
      const hashedPassword = await bcryptjs.hash(user.password, 10);

      await User.create({
        ...mockUserDb,
        password: hashedPassword,
      });

      const response = await request(app)
        .post(loginPath)
        .send(user)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });
});
