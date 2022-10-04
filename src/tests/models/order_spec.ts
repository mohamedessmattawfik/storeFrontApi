import { Cart } from "../../models/Order";
import dotenv from "dotenv";
import { ShopUser } from "../../models/User";
// import bcrypt from "bcrypt";

dotenv.config();

const ShoppingCart = new Cart();
const shopUser = new ShopUser();

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(ShoppingCart.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(ShoppingCart.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(ShoppingCart.create).toBeDefined();
  });

  it("create method should add an order", async (): Promise<void> => {
    const user = await shopUser.create({
      firstname: "testUser",
      lastname: "testUserLastName",
      password: "testPassword",
    });
    const result = await ShoppingCart.create({
      user_id: user.id!,
      status: "inProgress",
    });
    expect(Number(result.id)).toEqual(Number("2"));
    expect(Number(result.user_id)).toEqual(Number(user.id));
    expect(result.status).toEqual("inProgress");
  });

  it("index method should return all orders available", async (): Promise<void> => {
    const result = await ShoppingCart.index();
    expect(Number(result[0].id)).toEqual(1);
    expect(Number(result[0].user_id)).toEqual(1);
    expect(result[0].status).toEqual("inProgress");
  });

  it("show method should return the correct order with the specified id", async (): Promise<void> => {
    const result = await ShoppingCart.show("2");

    expect(Number(result.id)).toEqual(Number(2));
    expect(Number(result.user_id)).toEqual(4);
    expect(result.status).toEqual("inProgress");
  });
});
