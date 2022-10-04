import { ProductStore } from "../../models/Product";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const productStore = new ProductStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(productStore.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(productStore.create).toBeDefined();
  });

  it("create method should add a product", async (): Promise<void> => {
    const result = await productStore.create({
      name: "testProduct",
      price: 150,
      category: "testCategory",
    });
    expect(result).toEqual({
      id: 1,
      name: "testProduct",
      price: 150,
      category: "testCategory",
    });
  });

  it("index method should return all products available", async (): Promise<void> => {
    const result = await productStore.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "testProduct",
        price: 150,
        category: "testCategory",
      },
    ]);
  });

  it("show method should return the correct product with the specified id", async (): Promise<void> => {
    const result = await productStore.show("1");
    expect(result).toEqual({
      id: 1,
      name: "testProduct",
      price: 150,
      category: "testCategory",
    });
  });
});
