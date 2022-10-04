import { User } from "../../models/User";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import client from "../../database";

dotenv.config();
const request = supertest(app);

describe("User Endpoints", () => {
  const user = {
    firstname: "testUser",
    lastname: "testUser",
    password: "testPassword",
  };
  let token: string;
  it("should create a user and return valid token", async (): Promise<void> => {
    await request
      .post("/api/users")
      .send(user)
      .expect(201)
      .then((res) => {
        token = res.body.token;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as User;
        expect(decoded.firstname).toEqual("testUser");
        expect(decoded.lastname).toEqual("testUser");
        expect(
          bcrypt.compareSync(
            user.password + process.env.BCRYPT_PASSWORD,
            decoded.password
          )
        ).toBe(true);
        expect(decoded.firstname).toEqual("testUser");
      });
  });
  it("should't get a specific user with an invalid token", async (): Promise<void> => {
    const id = 1;
    await request
      .get(`/api/users/${id}`)
      .set("authorization", "Bearer invalidToken")
      .expect(401);
  });
  it("should get the correct user with a valid token", async (): Promise<void> => {
    const id = 1;
    await request
      .get(`/api/users/${id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });
  it("should't get all users with an invalid token", async (): Promise<void> => {
    await request
      .get("/api/users")
      .set("authorization", "Bearer invalidToken")
      .expect(401);
  });
  it("should get all users with valid token", async (): Promise<void> => {
    await request
      .get("/api/users")
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });
  it("should't get orders for a specific user with an invalid token", async (): Promise<void> => {
    const userId = 1;
    await request
      .get(`/api/users/${userId}/orders`)
      .set("authorization", "Bearer invalidToken")
      .expect(401);
  });
  it("should't get orders for a specific user with a valid token but for the wrong user", async (): Promise<void> => {
    const userId = 2;
    await request
      .get(`/api/users/${userId}/orders`)
      .set("authorization", `Bearer ${token}`)
      .expect(401);
  });
  it("should get orders for a specific user with a valid token for the correct user", async (): Promise<void> => {
    const userId = 1;
    await request
      .get(`/api/users/${userId}/orders`)
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });
});
