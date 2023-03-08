import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { app } from "../..";
import User from "../../../database/models/User";
import { type UserCredentials } from "../../../types";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDataBase from "../../../database/connectDataBase";

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

describe("Given a POST '/users/login' endpoint", () => {
  const loginUrl = "/users/login";
  const mockUser: UserCredentials = {
    username: "Kent",
    password: "Cdots12345",
  };
  describe("When it receives a request with username 'Kent' and password 'Cdots12345'", () => {
    test("Then it should respond with a status code 200 and with an object in its body with the property 'token'", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "asdfasdfasdfgsadf3242345",
      }));
      const expectedStatus = 200;
      const hashedpassword = await bcrypt.hash(mockUser.password, 10);

      await User.create({
        ...mockUser,
        password: hashedpassword,
        email: "asdfadsf",
      });

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receive a request with a new, not registered, username 'Victor' and a password 'Granda1992'", () => {
    beforeAll(async () => {
      await User.create({ ...mockUser, email: "vic@gmail.com" });
    });
    test("Then it should respond a code status 401 and with an error message 'Wrong credentials'", async () => {
      const expectedMessage = "Unauthorized: User not found.";
      const expectedStatusCode = 401;
      const mockVictor: UserCredentials = {
        username: "Victor",
        password: "Granda1992",
      };

      const response = await request(app)
        .post(loginUrl)
        .send(mockVictor)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
