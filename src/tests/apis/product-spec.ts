import supertest from "supertest";
import jwt from "jsonwebtoken";
import { Product } from "../../models/Product";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
const request = supertest(app);

describe("Product Endpoints", () => {
  let token: string;
  beforeAll(async (): Promise<void> => {
    await request
      .post("/api/users")
      .send({
        firstname: "testUser",
        lastname: "testUser",
        password: "testPassword",
      })
      .then((res) => {
        token = res.body.token;
      });
  });
  it("should get all the products available", async (): Promise<void> => {
    await request.get("/api/products").expect(200);
  });
  it("should't create a product with invalid token", async (): Promise<void> => {
    const product: Product = {
      name: "testProduct",
      price: 5,
      category: "testCategory",
    };
    await request
      .post("/api/products")
      .send({
        name: product.name,
        price: product.price,
        category: product.category,
      })
      .set("authorization", "invalidToken")
      .expect(401);
  });
  it("should create a product with valid token", async (): Promise<void> => {
    const product: Product = {
      name: "testProduct",
      price: 5,
      category: "testCategory",
    };
    await request
      .post("/api/products")
      .send({
        name: product.name,
        price: product.price,
        category: product.category,
      })
      .set("authorization", `Bearer ${token}`)
      .expect(201);
  });
  it("should show the correct product with the specified id", async (): Promise<void> => {
    const productId = 1;
    await request
      .get(`/api/products/${productId}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: "testProduct",
          price: 150,
          category: "testCategory",
        });
      });
  });
});
