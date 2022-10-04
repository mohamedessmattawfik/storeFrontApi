import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../../server";
import { User } from "../../models/User";
import dotenv from "dotenv";
import { Product, ProductStore } from "../../models/Product";

dotenv.config();
const request = supertest(app);

describe("Order Endpoints", () => {
  let token: string;
  let user: User;
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
    user = jwt.verify(token, process.env.TOKEN_SECRET!) as User;
  });
  it("should get all the orders available", async (): Promise<void> => {
    await request.get("/api/orders").expect(200);
  });
  it("should't create an order with invalid token", async (): Promise<void> => {
    await request
      .post("/api/orders")
      .send({
        user_id: user.id,
        status: "inProgress",
      })
      .set("authorization", "Bearer invalidToken")
      .expect(401);
  });
  it("should create an order with valid token", async (): Promise<void> => {
    await request
      .post("/api/orders")
      .send({
        user_id: user.id,
        status: "inProgress",
      })
      .set("authorization", `Bearer ${token}`)
      .expect(201);
  });
  it("should't get products for an order with invalid token ", async (): Promise<void> => {
    const orderId = 1;
    await request
      .get(`/api/orders/${orderId}/products`)
      .set("authorization", "invalidToken")
      .expect(401);
  });
  it("should get products for an order with valid token ", async (): Promise<void> => {
    const orderId = 1;
    await request
      .get(`/api/orders/${orderId}/products`)
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });
  it("should't add a product to an order with an invalid token", async (): Promise<void> => {
    const orderId = 1;
    const product: Product = {
      name: "testProduct",
      price: 150,
      category: "testCategory",
    };
    await request
      .post(`/api/orders/${orderId}/products`)
      .send({
        productId: product.id,
        quantity: 10,
      })
      .set("authorization", "invalidToken")
      .expect(401);
  });
  it("should add a product to an order with an valid token", async (): Promise<void> => {
    const orderId = 1;
    const productStore = new ProductStore();
    const product: Product = await productStore.create({
      name: "testProduct",
      price: 150,
      category: "testCategory",
    });
    await request
      .post(`/api/orders/${orderId}/products`)
      .send({
        productId: product.id,
        quantity: 10,
      })
      .set("authorization", `Bearer ${token}`)
      .expect(201);
  });
});
