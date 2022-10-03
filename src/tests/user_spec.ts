import { ShopUser } from "../models/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const shopUser = new ShopUser();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(shopUser.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(shopUser.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(shopUser.create).toBeDefined();
  });

  it("create method should add a user and return a valid token", async (): Promise<void> => {
    const result = await shopUser.create({
      firstname: "testUser",
      lastname: "testUserLastName",
      password: "testPassword",
    });
    expect(Number(result.id)).toEqual(2);
    expect(result.firstname).toEqual("testUser");
    expect(result.lastname).toEqual("testUserLastName");
    expect(
      bcrypt.compareSync(
        "testPassword" + process.env.BCRYPT_PASSWORD,
        result.password
      )
    ).toEqual(true);
  });

  it("index method should return list of users", async (): Promise<void> => {
    const result = await shopUser.index();
    expect(Number(result[0].id)).toEqual(1);
    expect(result[0].firstname).toEqual("testUser");
    expect(result[0].lastname).toEqual("testUserLastName");
    expect(
      bcrypt.compareSync(
        "testPassword" + process.env.BCRYPT_PASSWORD,
        result[0].password
      )
    ).toEqual(true);
  });
  it("show method should return the correct user ", async (): Promise<void> => {
    const id = "1";
    const result = await shopUser.show(id);
    expect(Number(result.id)).toEqual(Number(id));
    expect(result.firstname).toEqual("testUser");
    expect(result.lastname).toEqual("testUserLastName");
    expect(
      bcrypt.compareSync(
        "testPassword" + process.env.BCRYPT_PASSWORD,
        result.password
      )
    ).toEqual(true);
  });
});
